/**
 *ERP模板维护窗口
 */
Ext.define('erp.common.basic.view.TemplateHelp', {
	extend : 'erp.ux.Window',
	alias : 'widget.tpl_help',
	title : '模板帮助窗口',
	iconCls:'template',
	requires : ['erp.master.desctemplate.store.TemplateWithoutDetail'],
	width : 600,
	height :800,
	//resizable : false,
	modal : true,
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
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.master.desctemplate.store.TemplateWithoutDetail');
		Ext.apply(me.store.getProxy().extraParams,me.winParam);
		Ext.apply(this, {
					listeners:{
			    		afterrender:function(cmp){
			    			cmp.store.loadPage(1);
			    		}
			    	},
					items : [{
								xtype : 'panel',
								layout : {type:'vbox',
									align: 'stretch'
								},
								tbar:[{text:'新增',iconCls:'page_add',action:'add',handler:me.doAction},
										{text:'修改',iconCls:'page_edit',action:'edit',itemId:erp.Const.FUNC_ITEMID_BTN_EDT,handler:me.doAction,disabled:true},
										{text:'删除',iconCls:'page_delete',action:'del',itemId:erp.Const.FUNC_ITEMID_BTN_DEL,handler:me.doAction,disabled:true},
										'-',{
											xtype : 'button',
											iconCls:'arrow_refresh',
											text : '刷新',
											handler:me.refreshClick
										},
										{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入模版名称或序号..',labelWidth:60,width:240,enableKeyEvents:true,listeners: {
							                keypress: function(field, e){
							                    if (e.getKey() == e.ENTER) {
							                    	me.store.getProxy().extraParams.condition=me.down('#search').getValue();
							                        me.store.loadPage(1);
							                    }
							                }
							            }},
						   	  			{text:'查询',iconCls:'query',
				       	  				    handler:function(btn){
				       	  				    	//加载给定 'page' 的数据,通过适当地设置 start 以及 limit 的值. 在本方法内部只是 传入计算后的 'start' 与 'limit' 配置项 执行一个普通的 load 操作.
				       	  				    	me.store.getProxy().extraParams.condition=me.down('#search').getValue();
							                    me.store.loadPage(1);
				       	  				    }
				   	  				    }
								      ],
								items : [{
											xtype : 'grid',
											flex:2,
											store : me.store,
											dockedItems:[{
											    		xtype : 'pagingbar',
									                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
											    		dock:'bottom',
											    		displayInfo:true,
											    		defaultPageSize : 50,
											    		store:me.store
											    	}],
											columns : [{
														text : '序号',
														dataIndex : 'mbxh',
														width:50
													}, {
														text : '模板名称',
														dataIndex : 'mbmc',
														flex : 1
													}],
													
											listeners:{
												selectionchange:function(gird,recs){
													if(recs.length>0)
													{
														me.down('textarea').setValue(recs[0].get('mbnr'));
														me.down('#'+erp.Const.FUNC_ITEMID_BTN_EDT).setDisabled(false);
														me.down('#'+erp.Const.FUNC_ITEMID_BTN_DEL).setDisabled(false);
													}
												},
												itemdblclick:me.itemDblClick
											}
										},
										{
											xtype:'textarea',
											flex:1
										}]
							}]
				});
		this.callParent(arguments);
	},
	doAction:function(btn){
		var me=this;
		var win=me.up('window');
		var grid=win.down('grid');
		switch (me.action){
			case 'add':
				var rec=Ext.create('erp.master.desctemplate.model.TemplateWithoutDetail',
							{mbbh:win.winParam.mbbh,mbxh:win.store.max('mbxh')?win.store.max('mbxh')+1:1});	
				var newWin=win.createWindow(rec);
				newWin.show();
				break;
			case 'edit':
				var rec=grid.getSelectionModel().getSelection()[0];
				var newWin=win.createWindow(rec);
				newWin.show();
				break;
			case 'del':
				var rec=grid.getSelectionModel().getSelection()[0];
				Ext.Msg.confirm('提示','你确认要删除模板名称【'+rec.get('mbmc')+'】吗？',function(btn){
					if(btn=='yes')
					{
						win.store.remove(rec);
						win.store.sync({
							success:function(){
								win.down('textarea').setValue('');
								Ext.Msg.alert('提示','删除成功!');
							}
						});
					}
				});
				break;
				
		}
	},
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
	createWindow:function(rec){
	var me=this;
	var newWin=Ext.create('erp.ux.Window',{
					title:'新增模板',
					width:500,
					height:420,
					modal:true,
					//iconCls:'box',
					defaults:{labelWidth:60,xtype:'textfield'},
					layout:'fit',
					items:[
					{	xtype:'form',
						layout:{type:'column'},
						defaults:{columnWidth:.5,xtype:'textfield',padding:5},
						items:[
							{fieldLabel:'序号',name:'mbxh',disabled:true},
							{fieldLabel:'模板名称',name:'mbmc',allowBlank:false,blankText:'请输入模板名称'},
							{xtype:'textarea',name:'mbnr',height:300,columnWidth:1}
						]
					}],
					buttons:[{text:'保存',iconCls:'save',handler:function(){
							var form=this.up('window').down('form');
							if(form.getForm().isDirty()&&form.getForm().isValid()){
								var updRec=form.getRecord();
								form.updateRecord(updRec);
								if (Ext.isEmpty(updRec.get('mbnr')))
									updRec.set('mbnr',' ');
								if (me.store.indexOf(updRec)<0)
									me.store.add(updRec);
									
								me.store.sync({
									success:function(){
										newWin.close();
										Ext.Msg.alert('提示','保存成功');
										me.store.reload();
									}
								});
							}
						}},
						{text:'关闭',iconCls:'page_error',handler:function(){newWin.close()}}]
				});
		  newWin.down('form').loadRecord(rec);		
		  return newWin;
	},
	refreshClick : function(btn) {
		var grid = btn.up('window').down('grid');
		grid.getStore().load();
	},
	itemDblClick:function(view,record){
	   var me=this.up('window');
	   me.sureValue();
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
	initWindow:function(callback,displayField,trigger){
		var panel=this.down('grid')||this.down('treepanel');
		this.displayField=displayField;
		this.callbackFn=callback;
		this.trigger=trigger;
		this.show();
	}
});