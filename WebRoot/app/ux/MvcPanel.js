//
Ext.define('erp.ux.MvcPanel',{
	extend : 'Ext.panel.Panel',
	alternateClassName : 'erp.MvcPanel',
	layout : 'fit',
	isClose:false,	//是否关闭
	modFuncsDisabled : {},
	listeners : {
		beforeclose:function(panel){
			//Extjs5 关闭前清空所有内容，否则再次打开数据就会异常
			panel.removeAll();
			//为了检验编辑界面中，是否为关闭动作
			this.isClose=true;
			//编辑界面如果有父级菜单则设置设为disable
			/*if(panel.isEdit){
				if(panel.mainPanel!=null){
					panel.mainPanel.enable();
				}
			}*/
		},
		afterrender : function(cmp) {
			//编辑界面如果有父级菜单则设置设为disable
			/*if(cmp.isEdit){
				if(cmp.mainPanel!=null){
					console.log(cmp.mainPanel);
					cmp.mainPanel.disable();
				}
			}*/
			// 根据modFuncsDisabled设置按钮的disable/enable
			for (prop in cmp.modFuncsDisabled) {
//				console.log(prop+":"+cmp.modFuncsDisabled[prop]);
				btn = cmp.down('#' + prop);
				var result=cmp.modFuncsDisabled[prop];
				if (btn) {
					// 设置按钮初始状态
//					if (cmp.modFuncsDisabled[prop])
//						btn.hide();
					if (result==1){//禁用
						btn.disable();
					}else if(result==2){//可用
						
					}else if(result){//不显示 result==3
						btn.hide();
					}else{//显示result==0
						
					}	
				}
			}
			// 自动设置grid控件中的行选择变化时的功能按钮变化
			// 因为按钮ID可以是自定义的，所以这里就只能管到预定义的几个
			// 其余的需要模块自行处理
			var gridpanels = cmp.query('gridpanel');
			Ext.each(gridpanels, function(grid) {
				/*grid.on ('itemcontextmenu',function(grd,rec,item,idx,e){
					 Ext.create('Ext.menu.Menu',{
					 	width: 150,
					    margin: '0 0 10 0',
//					    floating: false,  // 通常你想设置这个为真 (默认的)
					    items: [
//					    	{
//					        text: '组合筛选',
//					        iconCls:'query',handler:function(){
//					        	tp.GridEvent.doFilterQuery(cmp,grid);	
//					        }},
					    {text: '导出Excel',iconCls:'page_excel',
					      	  handler:function(){
					      	  	 erp.GridEvent.doExportToExcel(cmp,grid);
					      	  }
					      },
					      {text: '自定义显示字段',iconCls:'field',handler:function(){
					      		erp.GridEvent.doCustomFields(cmp,grid);				      	
					      }},
					      '-',
//					      {text: '复制行记录',iconCls:'page_copy'},
					      {text:'全选',iconCls:'checkbox',handler:function(){
					      		var selModel=grid.getSelectionModel();
					      		if(selModel)
					      			selModel.selectAll();
					      }},
					      {text:'全清',iconCls:'un_checkbox',handler:function(){
					      	var selModel=grid.getSelectionModel();
					      	if(selModel)
					      			selModel.deselectAll();
					      	
					      }},
					      {text:'全清',iconCls:'un_checkbox',handler:function(){
					      	var selModel=grid.getSelectionModel();
					      	if(selModel)
					      			selModel.deselectAll();
					      	
					      }},
					      {
	   	  				    iconCls:'autosize',
	   	  				    text:'自动调整列宽',
	   	  				    handler:function(){
	   	  				    	Ext.suspendLayouts();
								Ext.Array.forEach(grid.getView().headerCt.items.items,
										function(group) {
											if (!group.resizeDisabled)
												group.autoSize();
										})
								Ext.resumeLayouts(true);
	   	  				    }}]
					 }).showAt(e.getPoint());				
				});	*/
				grid.on('selectionchange', function(selModel,
						selections) {
					var n = selections.length || 0;
					var btn = grid.down('#'+ erp.Const.FUNC_ITEMID_BTN_DEL);
					// 删除按钮必须是选中一些行时有效
					if (btn){
						btn.setDisabled(n == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_EDT);
					// 编辑时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_RESET);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_PRINT);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_STOP);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_ACC);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_BACKUP);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_DESC);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_SUBMIT);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_COPY);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_LOCK);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_SIGN);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_RESIGN);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_DISACC);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_MDF);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_SYN);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_PERMIT);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
				}, cmp);
			});
		}
	},
	initComponent : function() {
//		this.addEvents(
//    			/**
//    			 * 呼叫帮助
//    			 * param: 	scope
//    			 * 					help_id
//    			 */
//    			'callHelp'
//		);
//		this.addCls('tp_grid_header');
		
		this.callParent(arguments);
	},
	isDirty: Ext.emptyFn
});
