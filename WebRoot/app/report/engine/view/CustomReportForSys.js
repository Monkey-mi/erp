Ext.define('erp.report.engine.view.CustomReportForSys',{
		extend:'erp.ux.Panel',
		alias : 'widget.sys_report',
		layout:'border',
		requires:['erp.report.engine.store.SysPrintModel',
					'erp.main.view.ContentPermit',		
					'erp.report.engine.view.TemplateDesignerForSys'
				],
	    initComponent:function(){
    		var me=this;
    		me.store = Ext.create('erp.report.engine.store.SysPrintModel');
    		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
				clicksToMoveEditor: 1,
				autoCancel: false,
				pluginId: 'rowedit'/*,
				listeners: {
					edit: function(editor, obj, eopts) {
						me.fireEvent('rowedit', editor);
					}
				}*/
			});
    		Ext.apply(me,{
    			items: [{
		    	//左边菜单菜单树
				title: '系统菜单',
		        region:'west',
		        width: 200,
		        tools:[
			           {type:'refresh',tooltip:'刷新'}
			    ],
			    iconCls : 'layout_content',
			    xtype:'treepanel',
				border:true,
				useArrows:true,//是否显示小箭头  
			    store :Ext.create('erp.setup.store.ModuleTrees'),
			    rootVisible : true,
			    split:true
		    },{ 
		    	region:'center',
		    	xtype:'panel',
		    	border:false,
		    	layout:{type:'vbox',align: 'stretch'},
		    	items:[{xtype:'grid',
					    	flex:1,
					    	tbar:[{text: '新增',	iconCls:'page_white_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
				  		          {text: '删除',	iconCls:'page_white_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL,	disabled:true},
				  		          '-',
				  		          {text: '刷新',	iconCls:'arrow_refresh',		itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH},
				  		          '-',
				  		          {text: '启用',	iconCls:'accept',		itemId:erp.Const.FUNC_ITEMID_BTN_ACC,disabled:true},
				  		          {text: '停用',	iconCls:'stopIcon',		itemId:erp.Const.FUNC_ITEMID_BTN_DISACC,disabled:true},
				  		          '-',
				  		          {text: '外发',	iconCls:'accept',		itemId:"accept_out"},
				  		          {text: '停止外发',	iconCls:'stopIcon',		itemId:"stop_out"}
				  		          ],
				  		    selModel:Ext.create('Ext.selection.CheckboxModel'),      
					    	columns:[
					    			{xtype:'rownumberer',width:40},				    		
					    			{header:'是否启用',dataIndex:'is_active',flex:1,renderer:function(v){
			                                    return erp.Util.getFormatText(erp.Const.YESNO_TYPE,v);
			                         }
			                     },
			                     {
									header:'是否外发',
									width:80,
									dataIndex:'is_out',
									renderer:erp.Util.Staterenderer,
									field:{xtype:'checkbox'}
								},
			                     {header:'模板排序',dataIndex:'order_seq',
		    		 				flex:1,
		    		 				editor:{
		    		 					xtype: 'numberfield',
		    		 					minValue:0
		    		 				}
			                     },
		                         {header: '模板名称',
		    		 				 dataIndex:'name',
		    		 				 flex:1,
		    		 				 editor: {}
		    		 			},{header:'模板描述',dataIndex:'mod_description',
		    		 				flex:2,editor:{}},
		    		 			{header: '创建人',
		    		 				 dataIndex:'userName',
		    		 				 flex:1,
		    		 				 editor: {}
		    		 			},{xtype:'actioncolumn',	
		    		 		     header: 'SQL脚本编辑',
		    		 		     align:'center',
		    		 			 flex:1,
				 		    	 items:[{iconCls:'page_white_actionscript',tooltip:'SQL脚本编辑',
				 		    	 	  handler: function(grid, rowIndex, colIndex) {
				 		    	 	  	  var root =me;
				 		    	 	      var rec = grid.getStore().getAt(rowIndex);
				 		    	 	      root.addupdateItem(grid,root,rec);
				 		    	 	  }
				 		    	 }]
				 		    	 },
		    		 			{xtype:'actioncolumn',	
		    		 		     header: '模板样式设计',
		    		 		     align:'center',
		    		 			 flex:1,
				 		    	 items:[{iconCls:'page_white_wrench',tooltip:'编辑模板样式',
				 		    	 	  handler: function(grid, rowIndex, colIndex) {
				 		    	 	      var rec = grid.getStore().getAt(rowIndex);
				 		    	 	        
											if(rec){
												rec.set('report_type','SYS');
												rec.set('tpl_type','02');
												var tab = erp.Util.addContentTab({
													xtype: 'sys_tpldesigner',
													itemId: 'sys_tpldesigner',
													title: rec.get('name')+' 模板设计',
													tplRec: rec,
													main:me,
													closable: true
												});
												
												}
				 		    	 	  }
				 		    	 }]
				 		    	 }],
				 		    	 store:me.store,
		    					plugins:[rowEditing]
				 		    	 },{xtype:'splitter'},{flex:1,
				 		    	 title:'打印权限设置',
				    	    	 xtype:'ContentPermit'
		       				}]
		    		}]
    		});
    	   this.callParent(arguments);
    },
    
    addupdateItem: function(grid,ppanel,docRec){
    	if(ppanel.lastOpenTab) {
			erp.Util.closeContentTab(ppanel.lastOpenTab);
		}
		ppanel.makeReportPanel(grid,ppanel,docRec);
		ppanel.lastOpenTab = erp.Util.addContentTab(ppanel.report);		
	},
	
	//报表设置制作界面
	makeReportPanel: function(grid,parent,rec){
			parent.report =  Ext.create('erp.bi.view.MultiDatasource',{
 			itemId: 'SysReportSql',
 			closable: true,
 			title: '系统表单打印--SQL定义',
 			setGridRecord : function(displayStyle,result,myname,ds_id) {
					rec.set('default_style', displayStyle);
					rec.set('sql_text', result);
					rec.set('name', myname);
//					rec.set('ds_id',ds_id);
					grid.getStore().sync({
			    		scope:this
					});
					rec.commit();
			}
 	    });
		parent.report.setTarModel(rec);
	},
    AddNewRecord:function(grid,rec){
    	var rowEditing = grid.getPlugin('rowedit');
  		 var menu_id = rec.get('id');
  		 var r = Ext.create('erp.report.engine.model.SysPrintModel', {
  			    name: '',
  			    creater: erp.Util.currentUser.userInfo.u_id,
  			    userName:erp.Util.currentUser.userInfo.login_id,
  			    menu_id:menu_id,
  			    is_active:'false',
  			    mod_id:0
              });
        r.phantom=true;
    	rowEditing.cancelEdit();
  		grid.getStore().insert(0,r);
  		rowEditing.startEdit(0,0); 
    }
    
});