Ext.define('erp.ux.Panel',{
	extend : 'Ext.panel.Panel',
	alternateClassName : 'erp.Panel',
	layout : 'fit',
	collapseMode:"mini",//关闭状态
	isClose:false,	//是否关闭
	modFuncsDisabled : {},
	listeners : {
		beforeclose:function(panel){
			//为了检验编辑界面中，是否为关闭动作
			this.isClose=true;
			if(panel.isEdit){
				if(!confirm("当前正在编辑界面，是否继续关闭?")){
					return false;
				};
			}
			/*//Extjs5 关闭前清空所有内容，否则再次打开数据就会异常
			panel.removeAll();*/
			//编辑界面如果有父级菜单则设置设为enable
			if(panel.isEdit){
				if(panel.mainPanel!=null){
					panel.mainPanel.enable();
				}
			}
			//如果有定时器停止
			/*if(panel.task!=null){
				panel.task.destroy();
			}
			if(panel.bills_num!=null&&panel.bills_id!=null){
				erp.Util.deleteExclusive(panel.bills_num,panel.bills_id);
			}*/
		},
		close:function(panel){
			//如果有定时器停止
			if(panel.task!=null){
				panel.task.destroy();
				delete panel.task;
			}
			if(panel.bills_num!=null&&panel.bills_id!=null){
				erp.Util.deleteExclusive(panel.bills_num,panel.bills_id);
			}
			//编辑界面如果有父级菜单则设置设为enable
			if(panel.isEdit){
				if(panel.mainPanel!=null){
					panel.mainPanel.enable();
				}
			}
			//为避免界面关闭时 close 时 不触发销毁方法在关闭时主动销毁界面
			/*
			 * 此处注释  每次页面销毁 会使配置差的电脑容易卡死
			 * wuqia
			 * */
			/*if(panel){
				panel.destroy();
			}*/
		},
		destroy:function(panel){
			//如果有定时器停止
			if(panel.task!=null){
				panel.task.destroy();
				delete panel.task;
			}
			if(panel.bills_num!=null&&panel.bills_id!=null){
				erp.Util.deleteExclusive(panel.bills_num,panel.bills_id);
			}
			//编辑界面如果有父级菜单则设置设为enable
			if(panel.isEdit){
				if(panel.mainPanel!=null){
					panel.mainPanel.enable();
				}
			}
		},
		afterrender : function(cmp) {
			//编辑界面如果有父级菜单则设置设为disable
			if(cmp.isEdit){
				if(cmp.mainPanel!=null){
					cmp.mainPanel.disable();
				}
			}
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
				grid.on ('cellclick',function(tab, td, cellIndex, record, tr, rowIndex, e, eOpts){
					erp.Util.SearchPanel.grid=tab.up('grid');
					erp.Util.SearchPanel.cellIndex=cellIndex;
					erp.Util.SearchPanel.record=record;
					var columns=tab.up('grid').columnManager.columns;
					var property=columns[cellIndex].dataIndex;
			    	erp.Util.SearchPanel.value=record.get(property);
				});
				grid.on ('containerclick',function(v, e){
					erp.Util.SearchPanel.grid=v.up('grid');
				});
				grid.on ('itemcontextmenu',function(grd,rec,item,idx,e){
					 var menu= Ext.create('Ext.menu.Menu',{
					 	width: 150,
					    margin: '0 0 10 0',
					    closable:true,
//					    floating: false,  // 通常你想设置这个为真 (默认的)
					    items: [{
					        text: '复制单元格',
					        xtype:'',
					        iconCls:'page_copy',handler:function(){
					        	if(Ext.isEmpty(erp.Util.SearchPanel.value)){
					        		Ext.toastInfo('请选择需要复制的单元格！');
					        		return ;
					        	}
					        },
					    	listeners:{
					    		afterrender:function(c){
					    			clip = new ZeroClipboard.Client();
					    			ZeroClipboard.setMoviePath( "resources/js/zeroclipboard/ZeroClipboard.swf" ); 
									clip.setHandCursor( true );
									clip.addEventListener('load', function (client) {
									});
									clip.addEventListener('mouseOver', function (client) {
										// update the text on mouse over
										clip.setText(erp.Util.SearchPanel.value);
									});
									clip.addEventListener('complete', function (client, text) {
									});
									
									clip.glue(c.id+'-itemEl',c.id);
					    		}
					    	}
					    },
					    {text: '导出Excel',iconCls:'page_excel',
					    	menu:Ext.create('Ext.menu.Menu',{
					    		items:[{text: '全部',iconCls:'page_excel',
						    		handler:function(){
						      	  	 	erp.GridEvent.onExportClick(grid.getStore(),grid);
						      	  	}
						    	},{text: '全部(2007)',iconCls:'page_excel',
						    		handler:function(){
						      	  	 	erp.GridEvent.onExportClick(grid.getStore(),grid,'2007');
						      	  	}
						    	},{text: '预览',iconCls:'page_excel',
						    		handler:function(){
						      	  	 	erp.GridEvent.doExportToExcel(cmp,grid);
						      	  	}
						    	}]
					    	})
					      },
					      {text: '自定义显示字段',iconCls:'field',handler:function(){
					      		erp.GridEvent.doCustomFields(cmp,grid);				      	
					      }},
					      {text: '记录条数',iconCls:'',handler:function(){
					      		Ext.toastInfo("当前界面共有记录条数"+grid.getStore().getCount()+"条!");				      	
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
					 })
					 menu.showAt(e.getPoint());
				});
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
