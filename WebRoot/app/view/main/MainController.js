/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('erp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox',
        'Ext.window.Toast'
        //'erp.view.main.region.AccountInfoWin',
        //'erp.view.main.region.ResetPasswordWin'
    ],

    alias: 'controller.main',
    doSearch:function(btn){
    	var panel=erp.Util.SearchPanel;
    	var grid=panel.grid;
    	if(grid==null){
    		Ext.Msg.alert('提示','请先选择数据窗口');
    		return ;
    	}
    	//如果是supcan窗口另外处理
    	if(grid.xtype=='SupcanGrid'){
    		var filters=grid.filters;
    		var property=erp.Util.SearchPanel.cellIndex;
    		var datatype=erp.Util.SearchPanel.type;
    		switch(btn.tooltip){
	    		case '回退一步':
	    			var filter =filters.last();
	    			if(filter!=null){
	    				filters.remove(filter);
	    			}
	    			bool=true;
	    		break;
	    		case '全部回退':
	    			filters.clear();
	    			bool=true;
	    		break;
	    	}
	    	var value=erp.Util.SearchPanel.value;
	    	if(value!=null){
		    	switch(btn.text){
		    		case 'like':
			    		var filter = new Ext.util.Filter({
			    			id:Ext.id(),
						    property: property,
						    value   : value,
						    datatype:datatype,
						    operator:'like'
						});
						filters.add(filter)
		    		break;
		    		case '=':
		    			var filter = new Ext.util.Filter({
		    				id:Ext.id(),
						    property: property,
						    value   : value,
						    datatype:datatype,
						    operator:'='
						});
						filters.add(filter)
		    		break;
		    		case '＞':
		    			var filter = new Ext.util.Filter({
		    				id:Ext.id(),
						    property: property,
						    datatype:datatype,
						    value   : value,
						    operator:'>'
						});
						filters.add(filter)
		    		break;
		    		case '≥':
		    			var filter = new Ext.util.Filter({
		    				id:Ext.id(),
						    property: property,
						    value   : value,
						    datatype:datatype,
						    operator:'>='
						});
						filters.add(filter)
		    		break;
		    		case '＜':
		    			var filter = new Ext.util.Filter({
		    				id:Ext.id(),
						    property: property,
						    value   : value,
						    datatype:datatype,
						    operator:'<'
						});
						filters.add(filter)
		    		break;
		    		case '≤':
		    			var filter = new Ext.util.Filter({
		    				id:Ext.id(),
						    property: property,
						    value   : value,
						    datatype:datatype,
						    operator:'<='
						});
						filters.add(filter)
		    		break;
		    		case '≠':
		    			var filter = new Ext.util.Filter({
		    				id:Ext.id(),
						    property: property,
						    value   : value,
						    datatype:datatype,
						    operator:'!='
						});
						filters.add(filter)
		    		break;
		    	}
	    	}
	    	delete grid.querywin;//删除之前筛选界面条件
	    	grid.filterOnAll();
    	}else if(!grid.getStore().buffered&&!grid.getStore().remoteFilter){
	    	var store=grid.getStore();
	    	if(!store){
	    		Ext.Msg.alert('提示','请先选择数据窗口');
    			return ;
	    	}
	    	var bool=false;
	    	switch(btn.tooltip){
	    		case '回退一步':
	    			var filter =store.getFilters().last();
	    			if(filter!=null){
	    				store.removeFilter(filter);
	    			}
	    			bool=true;
	    		break;
	    		case '全部回退':
	    			store.clearFilter();
	    			bool=true;
	    		break;
	    	}
	    	if(bool){
	    		return ;
	    	}
	    	var cellIndex=panel.cellIndex;
	    	var columns=grid.columnManager.columns;
	    	/*//查出显示正常的列
	    	for(i=0;i<grid.columnManager.columns.length;i++){
	    		//刷出已经显示的所有列
	    		if(!grid.columnManager.columns[i].isHidden()&&grid.columnManager.columns[i].dataIndex!=''){
	    			columns.push(grid.columnManager.columns[i]);
	    		}
	    	}*/
	    	if(!columns[cellIndex]||columns[cellIndex].dataIndex==''){
	    		Ext.Msg.alert('提示','请先选择数据窗口');
    			return ;
	    	}
	    	var property=columns[cellIndex].dataIndex;
	    	var record=panel.record;
	    	var value=record.get(property);
	    	switch(btn.text){
	    		case 'like':
		    		var filter = new Ext.util.Filter({
		    			id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'like',
						filterFn: function(item) {
						    return item.get(property).toString().indexOf(value.toString());
						}
					});
					store.filter(filter);
	    		break;
	    		case '=':
	    		     //时间字段如果有时分秒去掉时分秒再比较
	    		    /*if(Ext.isDate(value) && !value.toString().endsWith('00:00:00 GMT+0800')){
	    		    property = 	'CONVERT(CHAR(10), '+columns[cellIndex].dataIndex+', 120)';
	    		    value = Ext.Date.format(value,'Y-m-d');
	    		    }*/
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'=',
						filterFn: function(item) {
							if(Ext.isDate(value) && value.toString().endsWith('00:00:00 GMT+0800')){
				    		   return Ext.Date.isEqual(item.get(property),value);
				    		}
						    return item.get(property) == value;
						}
					});
					store.filter(filter);
	    		break;
	    		case '＞':
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'>',
						filterFn: function(item) {
						    return item.get(property) > value;
						}
					});
					store.filter(filter);
	    		break;
	    		case '≥':
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'>=',
						filterFn: function(item) {
							if(Ext.isDate(value) && value.toString().endsWith('00:00:00 GMT+0800')){
				    		   return item.get(property) > value||Ext.Date.isEqual(item.get(property),value);
				    		}
						    return item.get(property) > value||item.get(property) == value;
						}
					});
					store.filter(filter);
	    		break;
	    		case '＜':
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'<',
					    filterFn: function(item) {
						    return item.get(property) < value;
						}
					});
					store.filter(filter);
	    		break;
	    		case '≤':
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'<=',
						filterFn: function(item) {
							if(Ext.isDate(value) && value.toString().endsWith('00:00:00 GMT+0800')){
				    		   return item.get(property) < value||Ext.Date.isEqual(item.get(property),value);
				    		}
						    return item.get(property) < value||item.get(property) == value;
						}
					});
					store.filter(filter);
	    		break;
	    		case '≠':
	    			var filters =store.getFilters();
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'!=',
						filterFn: function(item) {
							if(Ext.isDate(value) && value.toString().endsWith('00:00:00 GMT+0800')){
				    		   return !Ext.Date.isEqual(item.get(property),value);
				    		}
						    return item.get(property) != value;
						}
					});
					store.filter(filter);
	    		break;
	    	}
    	}else{
	    	var store=grid.getStore();
	    	if(!store){
	    		Ext.Msg.alert('提示','请先选择数据窗口');
    			return ;
	    	}
	    	var bool=false;
	    	switch(btn.tooltip){
	    		case '回退一步':
	    			var filter =store.getFilters().last();
	    			if(filter!=null){
	    				store.removeFilter(filter);
	    			}
	    			bool=true;
	    		break;
	    		case '全部回退':
	    			store.clearFilter();
	    			bool=true;
	    		break;
	    	}
	    	if(bool){
	    		return ;
	    	}
	    	var cellIndex=panel.cellIndex;
	    	var columns=grid.columnManager.columns;
	    	//查出显示正常的列
	    	/*for(i=0;i<grid.columnManager.columns.length;i++){
	    		//刷出已经显示的所有列
	    		if(!grid.columnManager.columns[i].isHidden()&&grid.columnManager.columns[i].dataIndex!=''){
	    			columns.push(grid.columnManager.columns[i]);
	    		}
	    	}*/
	    	if(!columns[cellIndex]||columns[cellIndex].dataIndex==''){
	    		Ext.Msg.alert('提示','请先选择数据窗口');
    			return ;
	    	}
	    	var property=columns[cellIndex].dataIndex;
	    	var record=panel.record;
	    	var value=record.get(property);
	    	switch(btn.text){
	    		case 'like':
		    		var filter = new Ext.util.Filter({
		    			id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'like'
					});
					store.filter(filter);
	    		break;
	    		case '=':
	    		     //时间字段如果有时分秒去掉时分秒再比较
	    		    if(Ext.isDate(value) && !value.toString().endsWith('00:00:00 GMT+0800')){
	    		    property = 	'CONVERT(CHAR(10), '+columns[cellIndex].dataIndex+', 120)';
	    		    value = Ext.Date.format(value,'Y-m-d');
	    		    }
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'='
					});
					store.filter(filter);
	    		break;
	    		case '＞':
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'>'
					});
					store.filter(filter);
	    		break;
	    		case '≥':
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'>='
					});
					store.filter(filter);
	    		break;
	    		case '＜':
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'<'
					});
					store.filter(filter);
	    		break;
	    		case '≤':
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'<='
					});
					store.filter(filter);
	    		break;
	    		case '≠':
	    			var filters =store.getFilters();
	    			var filter = new Ext.util.Filter({
	    				id:Ext.id(),
					    property: property,
					    value   : value,
					    operator:'!='
					});
					store.filter(filter);
	    		break;
	    	}
    	}
    	erp.Util.SearchPanel={};
    },
	onModTreeClicked:function(item){
		//this.getLeftTab().count=0;
		var record=Ext.create('erp.setup.model.ModuleTree',item.rec);
     	var leaf  = record.get('leaf');
		if(leaf){
//			this.getLeftTab().collapse();
			var extra='{'+record.get('extraCfg')+'}';
			if(extra!=null&&extra!=''){
				var extra = Ext.decode(extra);
				if(extra.show=='mvvm'){
					erp.Util.loadModuleMvvm(record);
					return;
				}
			}
			erp.Util.loadModuleMC(record);
			
		}
	},
    refreshMenuToolbar:function(e,v){
    	var mac=this.getView().down('LeftMenu').down('mainmenuaccordion');
    	mac.removeAll();
    	mac.loadTotalModuleTree(mac);
    },
    //主界面菜单头部响应
	onTopbarClicked:function(btn){
				 switch (btn.itemId){
				 	case 'btn_accountInfo':
				 		erp.Util.loadModule('010402');
				 		break;
				 	case 'btn_logout':
				 		Ext.Msg.confirm('提示','你确定要注销登陆吗?',function(btn){
				 			if(btn=='yes'){
				 				erp.Util.doLogout();
				 			}
				 		})
				 		break;
				 	case 'btn_pwdReset':
				 		erp.Util.loadModule('010403');
				 		break;
				 	case 'btn_help':
				 		
				 		break;
				 }
	},
    // 如果窗口的大小改变了，并且顶部和底部都隐藏了，就要调整显示顶和底的那个控件的位置
	onMainResize : function() {
				if (this.showButton && !this.showButton.hidden) {
					this.showButton.setX(document.body.clientWidth - 32);
				}
			},
	// 显示菜单条，隐藏左边菜单区域和顶部的按钮菜单。
	showMainMenuToolbar : function(button) {
		this.getView().getViewModel().set('menuType.value', 'toolbar');
	},
	// 显示左边菜单区域,隐藏菜单条和顶部的按钮菜单。
	showLeftMenuRegion : function(button) {
		this.getView().getViewModel().set('menuType.value', 'tree');
	},
	// 显示顶部的按钮菜单,隐藏菜单条和左边菜单区域。
	showButtonMenu : function(button) {
		this.getView().getViewModel().set('menuType.value', 'button');
	},	
	// 隐藏顶部和底部的按钮事件
	hiddenTopBottom : function() {
				// 如果要操纵控件，最好的办法是根据相对路径来找到该控件，用down或up最好，尽量少用getCmp()函数。
				this.getView().down('MainTop').hide();
				this.getView().down('MainBottom').hide();
				if (!this.showButton) { // 显示顶部和底部的一个控件，在顶部和底部隐藏了以后，显示在页面的最右上角
					this.showButton = Ext.widget('component', {
								glyph : 0xf013,
								view : this.getView(),
								floating : true,
								x : document.body.clientWidth - 32,
								y : 0,
								height : 4,
								width : 26,
								style : 'background-color:#cde6c7',
								listeners : {
									el : {
										click : function(el) {
											var c = Ext.getCmp(el.target.id); // 取得component的id值
											c.view.down('MainTop').show();
											c.view.down('MainBottom').show();
											c.hide();
										}
									}
								}
							})
				};
				this.showButton.show();
			},
	onSaveUserInfo:function(btn){
		var win=btn.up('window');
		var form=win.down('form');
		if (form.getForm().isValid()&&form.getForm().isDirty()){
			var rec=form.getRecord();
			form.updateRecord(rec);
			Ext.Ajax.request({
				url:'user/Users.do?method=updateCurrentUserInfo',
				params:rec.getData(),
				mothed:'post',
				success:function(){
					Ext.apply(erp.Util.currentUser.userInfo,rec.getData());
					Ext.Msg.alert('提示','保存成功,信息将在下一次登陆后生效!');
					
				},
				failure:function(){
					Ext.Msg.alert('提示','保存失败');
				}
			});
		}
	},		
	'onBeforeTabChange':function(panel,newCard,oldCard){
		//取消是否退出监测
		/*if(oldCard&&oldCard.isEdit&&!oldCard.isClose){
			return confirm("当前正在编辑界面，是否继续退出?");
		}*/
	},
	'onAfterTabChange':function(panel,newCard,oldCard){
		if(oldCard&&oldCard.isEdit){
			/*if(oldCard.task!=null){
				oldCard.task.destroy();
			}
			if(oldCard.bills_num!=null&&oldCard.bills_id!=null){
				erp.Util.deleteExclusive(oldCard.bills_num,oldCard.bills_id);
			}*/
		}
	}	
});
