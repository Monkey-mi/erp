Ext.define('erp.report.engine.view.CustomReportList',{
	extend:'erp.ux.Panel',
	alias : 'widget.CustomReportList',
	requires:['erp.report.engine.store.CustomReportResult',
	          'erp.report.engine.store.CustomQueryCdtion',
	          'erp.report.engine.store.CommonCustomQuery',
	          'erp.user.store.Roles',
	          'erp.user.model.Role',
	          'erp.report.engine.view.CustomReport',
	          'erp.report.engine.view.QueryStyle',
	          'erp.report.engine.view.CustomUtil',
	          'erp.report.engine.model.CommonCustomQuery',
	          'erp.report.engine.model.ReportDocTree',
	          'erp.common.function.store.CurrentTreeR',
	          'erp.report.engine.view.TemplateDesigner',
	          'erp.main.view.ContentPermit',
	          'erp.report.engine.view.CustomReportScript',
	          'erp.common.form.view.TableRegister'
	          ],
	
    initComponent:function(){
    	var me=this;
    	var mystore = Ext.create('erp.report.engine.store.CustomReportResult');
//    	var rList = me.panels.reportList;
    	var rowEditing1 = Ext.create('Ext.grid.plugin.RowEditing', {
							clicksToMoveEditor: 1,
							autoCancel: false,
							pluginId: 'rowedit1',
							listeners: {
								edit: function(editor, obj, eopts) {
									me.fireEvent('rowedit1', editor);
								}
							}
						});
    	var rList = {
    			dockedItems:[
//    				{
//    				xtype:'pagingtoolbar',
//    				dock:'bottom',
//    				//store: mystore,
//    				displayInfo:'true'
//    			},
    				{
    			    xtype: 'toolbar',
    				dock: 'top',
    				itemId:'top_bar',
    				items: [
    				    {text: '新增',	iconCls:'page_add',     itemId:'reportlist_add'},
    		            {text: '修改',	iconCls:'page_edit',	itemId:'reportlist_modify',       disabled : true,hidden:true},
    		            {text: '删除',	iconCls:'page_delete',		itemId:'reportlist_delete',   disabled : true},
    		            {text: '保存',	iconCls:'page_save',		itemId:'reportlist_save',   disabled : true,hidden:true},
    		            {text: '取消',	iconCls:'page_error',		itemId:'reportlist_cancel',   disabled : true,hidden:true},
    		            '|',
    		            {text:'刷新',   iconCls:'arrow_refresh', itemId:'reportlist_refresh'}
    				]
    			}],
    		//	store: mystore,
    			region: 'center',
    			itemId:'result_list',
    			xtype:'grid',
    			columnLines:true,
    	        flex: 4,
    	        selModel:Ext.create('Ext.selection.CheckboxModel'),
    	        columns:  [
    	 				{header: '业务名称',
    		 				 dataIndex:'name',
    		 				 width:100,
    		 				 editor: {}
    		 			},{
    		 				header:'业务描述',
    		 				dataIndex:'description',
    		 				width:100,
    		 				editor:{}
    		 			},
    		 			{header: '业务类型',
    		 				 dataIndex:'report_type',
    		 				 width:80,
    		 				 editor: {
    		 				 xtype: 'combobox',
    		 	             selectOnTab: true,
    		 	             store:erp.Util.getCombxStore(erp.Const.BIZ_TYPE),
							 queryMode: 'local',
							 displayField: 'name',
							 valueField: 'value',
   		 	                 renderer:function(v){
					            	return erp.Util.getFormatText(erp.Const.BIZ_TYPE,v);
					            }
    		 				 },
    		 				 renderer:function(v){
					            	return erp.Util.getFormatText(erp.Const.BIZ_TYPE,v);
					            } 
    		 			},
    		 			{header: '统计周期',
    		 			 dataIndex:'cycle',
    		 			 width:80,
    		 			 editor: {
	    		 			  xtype: 'combobox',
	    		 	          selectOnTab: true,
	    		 	          store:erp.Util.getCombxStore(erp.Const.STATS_CYCLE),
							  queryMode: 'local',
							  displayField: 'name',
							  valueField: 'value'
    		 			  },
    		 			  renderer:function(v){
					            	return erp.Util.getFormatText(erp.Const.STATS_CYCLE,v);
					     } 
    		 			},
    		 			{header: '创建人',
    		 				 dataIndex:'userName',
    		 				 width:60,
    		 				 editor: {}
    		 			},
    		 			{	xtype:'actioncolumn',
    	 		            width:100,
    	 		            align:'center',
    	 		            header:'脚本/数据字典',
    	 		            items:[{iconCls:'script_code',tooltip:'用于存储业务使用到的视图、存储过程或表脚本',
		 		    	 	  handler: function(grid, rowIndex, colIndex) {
		 		    	 	      var rec = grid.getStore().getAt(rowIndex);
		 		    	 	      if(rec.get('report_type')==erp.Const.BIZ_TYPE_STATS)
		 		    	 	      	me.openTableWin(rec)
		 		    	 	      else
		 		    	 	      	me.openScriptWin(rec);
		 		    	 	  }
		 		    	 }]
		 		    	 },
    	 				 {
    	 		            xtype:'actioncolumn',
    	 		            width:100,
    	 		            header: '数据源设置',
    	 		            align:'center',
    	 		            items: [{
    	 		                iconCls: 'cog_edit',  // Use a URL in the icon config
    	 		                tooltip: '编辑函数',
    	 		                handler: function(grid, rowIndex, colIndex) {
    	 		                   var root = grid.findParentByType('grid').rootPanel;
    	 		                   var docRec = root.down("#docuTree").getSelectDocu();
    	 		                   var rec = grid.getStore().getAt(rowIndex);
    	 		                   var type = rec.get('report_type');
    	 		                   if(type==erp.Const.BIZ_TYPE_FRM){
    		 		                  root.addupdateItem1(grid,root,docRec,rec);
    	 		                   }else if(type==erp.Const.BIZ_TYPE_SINGLE){
    	 		                   		
    	 		                	  root.addupdateItem2(grid,root,docRec,rec);
    	 		                   }
    	 		                   else if(type==erp.Const.BIZ_TYPE_MUTLI){
    	 		                	  root.addupdateItem3(grid,root,docRec,rec);
    	 		                   }
    	 		                   else if (type==erp.Const.BIZ_TYPE_STATS){
    	 		                   		root.addupdateItem3(grid,root,docRec,rec);
    	 		                   }
    	 		                    else if (type==erp.Const.BIZ_TYPE_TRANS){
    	 		                   		root.addupdateItem3(grid,root,docRec,rec);
    	 		                   }
    	 		                }
    	 		            }]
    		 		     },
    		 		    {
    		 		     xtype:'actioncolumn',	
    		 		     header: '样式设计',
    		 		     align:'center',
    		 			 width:80,
		 		    	 items:[{iconCls:'report_edit',tooltip:'编辑业务样式',
		 		    	 	  handler: function(grid, rowIndex, colIndex) {
		 		    	 	      var rec = grid.getStore().getAt(rowIndex);
								  me.openDesigner(rec);
		 		    	 	  }
		 		    	 }]     		 		     	
    		 		     },
    		 		     {
	    		 		     xtype:'checkcolumn',	
	    		 		     header: '是否发布',
	    		 		     align:'center',
	    		 		     dataIndex:'is_active',
	    		 			 width:80,
	    		 			 hidden:true
    		 		     }
    		 		     
    		 		    
    	      		],
    	      plugins: [rowEditing1],		
    	      //设置操作按钮是否可用
    	      setBarDisable : function(disable,tarId){
    	    	 var bars =  this.getDockedItems('toolbar[dock="top"]')[0].items;
    	    	 if(tarId=='all'){
    	    		 bars.get('reportlist_add').setDisabled(disable);
    	    		 bars.get('reportlist_modify').setDisabled(disable);
    	    		 bars.get('reportlist_delete').setDisabled(disable);
    	    		 bars.get('reportlist_save').setDisabled(!disable);
    	    		 bars.get('reportlist_cancel').setDisabled(!disable);
    	    		 bars.get('reportlist_refresh').setDisabled(disable);
    	    	 }else if (tarId=='normal'){
    	    	 	 bars.get('reportlist_add').setDisabled(!disable);
    	    		 bars.get('reportlist_modify').setDisabled(disable);
    	    		 bars.get('reportlist_delete').setDisabled(disable);
    	    		 bars.get('reportlist_save').setDisabled(disable);
    	    		 bars.get('reportlist_cancel').setDisabled(disable);
    	    		 bars.get('reportlist_refresh').setDisabled(!disable);
    	    	 	
    	    	 }else{
    	    		 bars.get(tarId).setDisabled(disable);
    	    	 }
    	      },
    	      clear : function(){
    	    	  this.getStore().removeAll();
    	      },
    	      setRootPanel : function(panel){
    	    		 this.rootPanel = panel;
    	    	 }
    	  };
    	rList['dockedItems'][0]['store'] = mystore;
    	rList['store'] = mystore;
//    	var cellEditing=Ext.create('Ext.grid.plugin.CellEditing',{
//			clicksToEdit: 2,
//	        pluginId:'rowedit'
//	    });
    	Ext.apply(me,{
    		layout:{type:'border',align: 'stretch'},
    		items:[{
					//业务目录和业务列表面板
					flex:2,
					region: 'center',
					xtype:'panel',
					border: false,
					layout: {
					    type: 'border',
					    align: 'stretch',
					    defaultMargins:{
					    	right:5,
					    	buttom:5
					    }
					},
					region: 'center',
					items:[me.panels.reportDocTree,rList]
				},{
					xtype:'tabpanel',
			        region: 'south',
			        split:true,
			        flex:1,
			        items:[{
		    	    	xtype:'ContentPermit'
			        }]
		       }]
    	});
    	this.callParent(arguments);
    },
    cdtionStore : Ext.create('erp.report.engine.store.CustomQueryCdtion'),
   //业务列表面板
    getResultList : function(){
    	return this.reportList;
    },
    //权限面板
    getContentPermission : function(){
    	return this.contentPermission;
    },
    //从后台加载数据
    myload: function(isadmin,nodeId){
    	var me = this;
    	//console.log(me);
    	var store = me.down("#result_list").getStore();
		var params;
		
		
		if(nodeId){
			var proxy = store.getProxy();
			proxy.setExtraParam("docId",Ext.encode(nodeId));
			proxy.setExtraParam("creater",erp.Util.currentUser.userInfo.u_id);
			//proxy.setExtraParam("mylist",Ext.encode(mylist));
			store.load({
	    		params: params,
	    	    scope: this,
	    	    callback: function() {
	    	    	//me.getContentPermission().clearContent();
	    	    }
	    	});
		}else{
			
		}
    },
    //获取这个内容的权限
    getContentPermit : function(rec){
    	
    	
    },
    //设置当前选中的内容，并获取操作权限
    setCurrentRec : function(rec){
    	var me = this;
    	me.resultRec = rec;
    	me.getResultList().setBarDisable(true,'all');
    	if(me.resultRec.get('creater') == erp.Util.currentUser.userInfo.u_id){
    		me.getResultList().setBarDisable(false,'all');
    	}else{
    	   	var opes;
    	   	for(var i=0;i<me.others.length;i++){
    	   		if(rec.get('list_id') == me.others[i].c_table_key){
    	   			opes = me.others[i].details;
    	   			break;
    	   		}
    	   	}
    	   	if(opes){
    	   		for(var i=0;i<opes.length;i++){
        	   		if(opes[i].fun_name=="新增"){
        	   			me.getResultList().setBarDisable(false,'reportlist_add');
        	   		}else if(opes[i].fun_name=="删除"){
        	   			me.getResultList().setBarDisable(false,'reportlist_del');
        	   		}else if(opes[i].fun_name=="修改"){
        	   			me.getResultList().setBarDisable(false,'reportlist_edt');
        	   		}else if(opes[i].fun_name=="查询"){
        	   			me.getResultList().setBarDisable(false,'reportlist_query');
        	   		}
        	   	}	
    	   	}
    	}
    },
    syncResultRec : function(level){
    	var me = this;
    	if(me.resultRec){
      	   me.resultRec.set('level',Ext.JSON.encode(level));
      	   me.getResultList().store.sync();
  	    }
    },
    /**
     * 初始化业务列表
     * 如果用户角色是admin，为业务设置界面
     * 如果是普通角色，为表报查看界面
     */
    initMyPanel : function(){
    	var me = this;
    	 me.reportList = me.down('#result_list');
    	 me.contentPermission = me.down('ContentPermission');
    	 me.reportList.setRootPanel(me);
         
    	 Ext.Ajax.request({
	    	    url: 'main/ModuleService.do?method=getModuleWithCtrllerAndView',
	    	    async : false,
	    	    params: {
	    	    	data : Ext.JSON.encode([{
	    	        	ctrller : 'erp.report.engine.controller.CustomReportList',
	    	        	view    : '%CustomReportList%'
	    	        },{
	    	        	ctrller : 'erp.report.engine.controller.CustomReportQuery',
	    	        	view    : '%CustomReportQuery%'
	    	        }])
	    	    },
	    	    success: function(response){
	    	    	var obj = Ext.decode(response.responseText);
	    	    	var recs = obj.data;
	    	    	if(recs){
	    	    		me.tar_mods = recs;
	    	    		for(var i=0;i<recs.length;i++){
	    	    			if(recs[i]['ctrller']=='erp.report.engine.controller.CustomReportList'){
	    	    				me.c_module = recs[i];
	    	    			}
	    	    		}
	    	    	}
	    	    }
	       });
    },
    getC_module : function(){
    	return this.c_module;
    },
    getTar_mod : function(){
    	return this.tar_mods;
    },
    //同步记录
    syncData: function(ope,recs){
    	var me = this;
    	var store = this.down("#result_list").getStore();
    	store.sync({
			success:function(batch,options){
				if(ope=='add'){
				   Ext.Msg.alert('保存成功!');
				}else if(ope=='update'){
					Ext.Msg.alert('修改成功!');
				}else if(ope=='delete'){
					 Ext.Msg.alert('提示','删除成功!');
				}else{
					Ext.Msg.alert('同步成功!');
				}
			},
			failure:function(batch,options){
				if(ope=='add'){
					   Ext.Msg.alert('保存失败!');
				}else if(ope=='update'){
					Ext.Msg.alert('修改失败!');
				}else if(ope=='delete'){
					Ext.Msg.alert('删除失败!');
				}else{
					Ext.Msg.alert('同步失败!');
				}
			},
			scope:this
		});
    },
  //删除记录
	deletData : function(recs){
		var store = this.down("#result_list").getStore();
    	store.remove(recs);
    	this.syncData('delete',recs);
	},
    //进行查询
    doquery: function(rec,ppanel){
    	if(rec.get('report_type')=='单表业务'){
    		var param = rec.get('ope');
        	var list_id = rec.get('list_id');
        	var style = rec.get('default_style');
    		param = Ext.JSON.decode(param);
    		this.makeParamCdtion(list_id,param,style);
    	}else if(rec.get('report_type')=='单SQL业务'){
    		
    	}
    	
    },
    /**
	 * 获取查询条件并查询
	 */
	makeParamCdtion : function(listId,param,style){
		erp.CustomUtil.getCodtions(listId,
	      function(recs,myparam){
			var p = myparam.p;
			var cdtions = erp.CustomUtil.makeCodtions(recs,p.data);	
			p.cdtions = cdtions.cdtions;
			erp.report.engine.view.QueryStyle.createStyle("form/FormService.do?method=cusFromQuery",p,p.data, myparam.style,myparam.id);
		  },
		  {p:param,id:listId,style:style}
	    );
	},
    //新增或修改记录
    addupdateItem1: function(grid,ppanel,model,docRec){
    	if(ppanel.lastOpenTab) {
			erp.Util.closeContentTab(ppanel.lastOpenTab);
		}
		ppanel.makeReportPanel1(grid,ppanel,model,docRec);
		ppanel.lastOpenTab = erp.Util.addContentTab(ppanel.report);		
	},
	
	addupdateItem2: function(grid,ppanel,model,docRec){
    	if(ppanel.lastOpenTab) {
			erp.Util.closeContentTab(ppanel.lastOpenTab);
		}
		
		ppanel.makeReportPanel2(grid,ppanel,model,docRec);
		ppanel.lastOpenTab = erp.Util.addContentTab(ppanel.report);		
	},
	
	addupdateItem3: function(grid,ppanel,model,docRec){
    	if(ppanel.lastOpenTab) {
			erp.Util.closeContentTab(ppanel.lastOpenTab);
		}
		ppanel.makeReportPanel3(grid,ppanel,model,docRec);
		ppanel.lastOpenTab = erp.Util.addContentTab(ppanel.report);		
	},
	
	//业务设置制作界面
	makeReportPanel1: function(grid,parent,model,rec){
		parent.report =  Ext.create('erp.report.engine.view.CustomReport',{
 			itemId: 'CustomReport',
 			closable: true,
 			title: '单表定义查询操作',
 			setGridRecord : function(displayStyle,result,freg_id,name,dscode) {
					rec.set('default_style', displayStyle);
					rec.set('ope', result);
					rec.set('freg_id', freg_id);
					rec.set('name', name);
					
					grid.getStore().sync({
						success : function(){
							parent.report.addCdtion(rec,parent.report.getCdtions());
			    		},
			    		scope:this
					});
					rec.commit();
			}
 	    });
		if(rec.get('list_id')==0){
			parent.report.setTarget(parent);
			parent.report.setTarModel(null,null);
		}else{
			var CodtionStore = erp.CustomUtil.getCodtionsInit(rec.get('list_id'));
			parent.report.setCodtionStore(CodtionStore);
			parent.report.setTarget(parent);
			parent.report.setTarModel(rec,model);
		}
	},
	
	makeReportPanel2: function(grid,parent,model,rec){
		parent.report =  Ext.create('erp.report.engine.view.CustomReportSql',{
 			itemId: 'CustomReportSql',
 			closable: true,
 			prec:rec,
 			title: 'SQL定义查询操作',
 			setGridRecord : function(displayStyle,result,name,dsId) {
				rec.set('default_style', displayStyle);
				rec.set('ope', result);
				rec.set('freg_id', 1);
				rec.set('name', name);
				rec.set('dsId',dsId);
				grid.getStore().sync({
					success : function(){
						Ext.Msg.alert('提示','保存成功!');;
		    		},
		    		scope:this
				});
				rec.commit();
 			}
 	    });
		parent.report.setTarModel(rec);
	},
	
	makeReportPanel3: function(grid,parent,model,rec){
		parent.report =  Ext.create('erp.bi.view.MultiDatasource',{
				itemId: 'MultiDatasource',
				closable: true,
				title: '多数据源定义',
				setGridRecord:function(){
					rec.set('ope', ' ');
					rec.set('freg_id', 1);
					grid.getStore().sync();
					rec.commit();
					
				}
		    });
		parent.report.setTarModel(rec);
	},
	
	/*************************************mkp*****************************************/
	addItem: function(reportList,panel,reportListStore,docRec){
		
  		 var rowEditing = reportList.getPlugin('rowedit1');
  		 var rec = this.down("#docuTree").getSelectionModel().getSelection( );
  		 var docId = rec[0].get('nodeId');
  		 var r = Ext.create('erp.report.engine.model.CustomReportResult', {
  			    name: '',
  			    creater: erp.Util.currentUser.userInfo.u_id,
  			    userName:erp.Util.currentUser.userInfo.login_id,
//  			   	tpl_type:'01',
  			    creatTime: new Date(),
  			    orgunit: erp.Util.currentUser.ou_code?erp.Util.currentUser.ou_code:'',
  			    docId:docId
              });
  		rowEditing.cancelEdit();
  		reportListStore.insert(0,r);
  		rowEditing.startEdit(0,0); 
//  		 cellEditing.startEditByPosition({row: 0, column: 1});
	},
	
	updateItem: function(rec,reportList){
  		 var cellEditing = reportList.getPlugin('rowedit');
  		 cellEditing.startEditByPosition({row: rec, column: 1});
	},
	/*********************************************************************************/
	
	/**********************当前组件的子组件列表（子组件相当于一个对象，使用时，通过提供的方法使用，不要直接访问，这样结构清楚）********************************************************************/
	panels : {
		//我的业务目录
		reportDocTree : {
			xtype:'treepanel',
			split:true,
			itemId:'docuTree',
			region: 'west',
		    rootVisible: false,
		    useArrows: true,
		    store:Ext.create('erp.common.function.store.CurrentTreeR'),
		    flex:1,
		    tbar: [
		           {text: '新增',	iconCls:'page_add',     itemId:'docu_add'    },
		           {text: '删除',	iconCls:'page_delete',		itemId:'docu_del'},
		           {text: '重命名',	iconCls:'page_edit',	itemId:'docu_edt'    },
		           {text:'刷新',   iconCls:'arrow_refresh', itemId:'docu_refresh'}
		         ],
		    //加载业务目录节点
		    loadDocu : function(Id,rec){
		    	
		    	var me = this;
		    	var store = me.store;
		    	store.load({
		    		params:{
		    			nodeId:Id,
		    			type:'report'
				    },
            		scope: this,
            		callback: function(records, operation, success){
            			//
            			
            		}
		    	});
		    },
		    //新增业务目录
		    addDocu : function(){
		    	var me = this;
		    	var rec = me.getSelectDocu();
		    	
//		    	var reportList = me.getResultList(); 
		    	if(rec!=null){
		    	   var func = function(value){
		    		   Ext.Msg.prompt('新增目录','新目录名称',function(obj,str){
			    	    	if(obj=='ok'){
			    	    		str = str.replace(/(^\s*)|(\s*$)/g, "");
			    	    		if(str==''){
			    	    			func('目录名称不能为空!');
			    	    		}else{
			    	    			Ext.Ajax.request({
					    	    	    url: 'report/Reports.do?method=addCurrentTree',
					    	    	    params: {
					    	    	        data:  Ext.JSON.encode([{
					    	    	         'parentId'    : rec.get('nodeId'),
					   		    	    	 'text'        : str,
					   		    	    	 'create_date' : new Date(),
					   		    	    	 'modify_date' : '',
					   		    	    	 'expanded'    : false,
					   		    	    	 'leaf'        : true,
					   		    	    	 'order_seq'   : 0 ,
					   		    	    	 'type':'report'
					    	    	        }])
					    	    	    },
					    	    	    success: function(response){
					    	    	    	me.loadDocu(0);
					    	    	    }
					    	       });	
			    	    		}
			    	    	}
			    	     },this,false,value);
		    	   }
		    	   func('');
		    	   
		    	}else{
		    	   Ext.Msg.alert('提示','请选择一个目录!');
		    	}
		    },
		    //删除业务目录
		    deleteDocu : function(){
		       	
		    	var me = this;
		    	var rec = me.getSelectDocu();
		    	
		    	if(rec!=null){
		    		Ext.Ajax.request({
	    	    	    url: 'report/ReportService.do?method=deleteCurrentTree',
	    	    	    params: {
	    	    	        data:  Ext.JSON.encode({
	    	    	         'nodeId'   : rec.get('nodeId'),
	    	    	         'parentId' : rec.get('parentId'),
	    	    	         'type'     : rec.get('type')
	    	    	        })
	    	    	    },
	    	    	    success: function(response){
	    	    	    	var text = Ext.decode(response.responseText);
	    	    	    	if(text.message){
	    	    	    		Ext.Msg.alert("提示",text.message);
	    	    	    	}else{
	    	    	    		me.loadDocu(0);	
	    	    	    	}
	    	    	    }
	    	       });
		    	}
		    },
		    //修改业务目录
		    updateDocu : function(){
		    	var me = this;
		    	var rec = me.getSelectDocu();
		    	if(rec!=null){
		    	   var func = function(value){
		    		   Ext.Msg.prompt('修改目录','新名称',function(obj,str){
			    	    	if(obj=='ok'){
			    	    		str = str.replace(/(^\s*)|(\s*$)/g, "");
			    	    		if(str==''){
			    	    			func('目录名称不能为空!');
			    	    		}else{
			    	    			Ext.Ajax.request({
					    	    	    url: 'report/Reports.do?method=updateCurrentTree',
					    	    	    params: {
					    	    	        data:  Ext.JSON.encode([{
					    	    	         'nodeId'       : rec.get('nodeId'), 
					    	    	         'parentId'    : rec.get('parentId'),
					   		    	    	 'text'        : str,
					   		    	    	 'create_date' : rec.get('create_date'),
					   		    	    	 'modify_date' : new Date(),
					   		    	    	 'expanded'    : rec.get('expanded'),
					   		    	    	 'leaf'        : rec.get('leaf'),
					   		    	    	 'order_seq'   : rec.get('order_seq'),
					   		    	    	 'type'		   :'report'
					    	    	        }])
					    	    	    },
					    	    	    success: function(response){
					    	    	    	me.loadDocu(0);
					    	    	    }
					    	       });	
			    	    		}
			    	    	}
			    	     },this,false,value);
		    	   }
		    	   func('');
		    	}else{
		    	   Ext.Msg.alert('提示','请选择一个目录!');
		    	}
		    },
		    //刷新业务目录
		    refesh : function(){
		    	this.loadDocu(0);
		    },
		    //获取当前选中的目录
		    getSelectDocu : function(){
		    	var selectModel = this.getSelectionModel();
		    	var recs = selectModel.getSelection();
		    	return recs.length>0?recs[0]:null;
		    },
		    //选中目录
		    selectDocu : function(recs){
		    	var selectModel = this.getSelectionModel();
		    	selectModel.select(recs);
		    }
	  }
	},
	setContent : function(opts) {
		var me = this;
		me.opts = opts;
		me.setContentBtn('add');
		me.setContentBtn('modify');
		me.setContentBtn('delete');

		// 业务目录下的业务列表
		// reportList : {}
	},
	setContentBtn : function(cp_type) {
		var me = this;
		var rec = me.opts.findRecord('cp_' + cp_type, false, 0, false, false,true);
		var flag = rec ? false : true;
		me.getResultList().setBarDisable(!flag, 'reportlist_' + cp_type);
	},
	setContentContainer : function() {
		var me = this;
		var rec = me.opts.findRecord('cp_grant', false, 0, false, false, true);
		var flag = rec ? false : true;
		me.down('ContentPermit').setDisabled(!flag);
	},
	openDesigner : function(rec) {
		var me = this;
		if (rec) {
			var tab = erp.Util.addContentTab({
						xtype : 'dc_tpldesigner',
						itemId : 'dc_tpldesigner',
						title : rec.get('name') + ' 样式设计',
						tplRec : rec,
						closable : true
					});
		}
	},
	openUserDesigner : function(rec) {
		var me = this;
		if (rec) {
			var tab = erp.Util.addContentTab({
						xtype : 'dc_userdesigner',
						itemId : 'dc_userdesigner',
						title : rec.get('name') + ' 样式设计',
						tplRec : rec,
						closable : true
					});
		}
	},
	openScriptWin : function(rec) {
		var me = this;
		var win = Ext.create('erp.report.engine.view.CustomReportScript');
		win.show();
		win.setValue(rec);
	},
	openTableWin : function(rec) {
		var me = this;
		var win = Ext.widget('tableScript', {
					from_attr : erp.Const.FRMTBL_TYPE_REPORT,
					fregId : rec.get('list_id')
				});
		win.show();
	}	
});