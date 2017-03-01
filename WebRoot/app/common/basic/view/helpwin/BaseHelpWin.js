/**
 * 基础数据弹出帮助基类
 */
Ext.define('erp.common.basic.view.helpwin.BaseHelpWin',{
    extend:'erp.ux.Window',
    alias:"widget.base_hpwin",
    /**
     * 反填的显示字段
     * @type 
     */
    displayField:null,
    alwaysOnTop:true,//打开时窗口为第一级
    /**
     * 触发组件
     * @type 
     */
    trigger:null,
    /**
     * 回调函数
     */
    callbackFn:Ext.emptyFn,
    modal:true,
    buttons:[
    {
		text : '确定',
		iconCls : 'accept',
		action : 'ACT_SAVE',
		handler:function(btn){
			var win=btn.up('window');
			win.BtnClick(btn);
		}
	}, {
		text : '退出',
		iconCls : 'cancel',
		action : 'ACT_CLOSE',
		handler:function(btn){
			var win=btn.up('window');
			win.BtnClick(btn);
		}
	}
    ],
    initComponent:function(){
    	var me=this;
    	me.callParent(arguments);
    	me.initEvent();
    },
    	//初始化窗口，参数:回调函数,数值域,所触发组件
	initWindow:function(callback,displayField,trigger){
		var panel=this.down('grid')||this.down('treepanel');
		this.displayField=displayField;
		this.callbackFn=callback;
		this.trigger=trigger;
		this.show();
		panel.on({
		 selectionchange:function(selModel,selected,opts){
		 	this.trigger.fireEvent('winselectionchange',trigger,selected,this);
		},
		scope:this
		});
	},
	/**
	 * 按钮按键事件
	 */
	BtnClick:function(btn){
		var me=this;
		switch(btn.action){
			case 'ACT_SAVE':
			me.sureValue();
			break;
			case 'ACT_CLOSE':
			me.close()
			break;
		}
	},
	/**
	 * 确认按钮
	 */
	sureValue:function(){
		var me=this;
		var panel=me.down('grid')||me.down('treepanel');
		var rec=panel.getSelectionModel().getSelection()[0];
		if(rec){
	    this.callbackFn(rec.get(this.displayField),this.trigger);
		this.close();	
		}else{
			this.close();  
		}
	},
	/**
	 * 回车按键事件
	 * @param {} field
	 * @param {} e
	 * @param {} o
	 */
	onKeyup:function(field,e,o){
		var selModel=field.up('window').down('grid').getSelectionModel();
		if(e.getKey()==e.ENTER){
			var store=this.up('window').store;
			store.getProxy().extraParams.condition=field.getValue();
			store.getProxy().extraParams.mode='allSearch';
			store.loadPage(1,{ 
				callback:function(recs){
					if(recs.length>0){
					selModel.select(0);
					}
				}
			});
		}
	},
	initEvent:function(){
	    var me=this;
	    var panel=me.down('grid')||me.down('treepanel');
	    panel.on({
	     itemdblclick:me.itemDblClick,
	     scope:me
	    });
	},
	itemDblClick:function(view,record){
	   var me=this;
	   me.sureValue();
	},
	setFilter:function(params){
	   var me=this;
	   var grid=me.down('grid')||me.down('treepanel');
	   if(grid&&params){
	    Ext.apply(grid.getStore().getProxy().extraParams,params);
	   }
	  grid.getStore().load();
	},
	searchClick : function() {
		var searchText = this.up('window').down('#searchfield');
		var grid = this.up('window').down('grid');
		var columns = grid.columns;
		var selModel = grid.getSelectionModel();
		var reg = "/" + searchText.getValue() + "/";
		this.up('window').store.getProxy().extraParams.condition=searchText.getValue();
		this.up('window').store.loadPage(1,{
					callback : function(recs) {
						if (recs.length > 0) {
							selModel.select(0);
						}
					}
				});
	},
	refreshClick : function(btn) {
		var grid = btn.up('window').down('grid');
		grid.getStore().load();
	}
	
});