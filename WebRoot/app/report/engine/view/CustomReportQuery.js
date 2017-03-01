Ext.define('erp.report.engine.view.CustomReportQuery',{
	extend:'erp.ux.Panel',
	alias : 'widget.CustomReportQuery',
	requires:[
              'erp.report.engine.store.CustomReportResult',
              'erp.common.function.store.CurrentTreeR',
              'erp.report.engine.store.CommonCustomQuery',
              'erp.report.engine.model.CommonCustomQuery',
              'erp.report.engine.view.QueryStyle',
              'erp.report.engine.view.CustomUtil'
	         ],
	listeners:{
			'close':function(cmp){
				cmp.destroy();
			  }
	},
    initComponent:function(){
    	var me=this;
    	
    	var mystore = Ext.create('erp.report.engine.store.CustomReportResult');
    	var rList = me.panels.reportList;
    	rList['dockedItems'][0]['store'] = mystore;
    	rList['store'] = mystore;
    	
    	var myuseStore = Ext.create('erp.report.engine.store.CommonCustomQuery');
    	var myList = me.panels.myReportList;
    	myList['dockedItems'][0]['store'] = myuseStore;
    	myList['store'] = myuseStore;
    	
    	Ext.apply(this,{
    		layout: 'fit',
    		items:[
				{
					//报表目录和报表列表面板
					xtype:'container',
					border: false,
					layout: {
					    type: 'hbox',
					    align: 'stretch'
					},
					region: 'center',
					items:[
						     me.panels.reportDocTree,
						     {
						    	xtype:'container',
							    border: false,
							    flex: 7,
								layout: {
								    type: 'hbox',
									align: 'stretch'
								},
								items : [
                                   rList,
                                   myList
								]
						     }
					      ]
				}
     		]
    	});
    	this.callParent(arguments);
    },
    //afterrander后，可以做一些初始化操作
    myInit : function(){
    	var me = this;
    	me.treePanel = me.down("#docuTree");
    	me.reportList = me.down("#result_list");
    	me.myList = me.down("#my_list");
    	
    	me.treePanel.setRootPanel(me);
    	me.reportList.setRootPanel(me);
    	me.myList.setRootPanel(me);
    },
    //加载数据
    myload: function(isadmin,nodeId){
    	var me = this;
    	me.nodeId = nodeId;
    	var store = me.down("#result_list").getStore();
		var params;
		
		var mylist = [];
		
		if(nodeId){
			var proxy = store.getProxy();
			proxy.setExtraParam("docId",Ext.encode(nodeId));
			proxy.setExtraParam("creater",erp.Util.currentUser.userInfo.u_id);
			store.load({
	    	    scope: this,
	    	    callback: function() {
	    	    	
	    	    }
	    	});
		}else{
			
		}
    },
    //进行查询
    doquery: function(rec,ppanel){
    	if (Ext.isEmpty(rec.get('tpl_xml'))){
    		//简单结果集预览
	    	var param = rec.get('ope');
	    	var list_id = rec.get('list_id');
	    	var style = rec.get('default_style');
			param = Ext.JSON.decode(param);
			this.makeParamCdtion(list_id,param,style);
		}else{
			//报表模板预览
			rec.set('tpl_type','04');
			erp.report.engine.view.QueryStyle.openReport(rec);
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
    panels : {
		//我的报表目录
		reportDocTree : {
			xtype:'treepanel',
			itemId:'docuTree',
		    rootVisible: false,
		    store:Ext.create('erp.common.function.store.CurrentTreeR'),
		    flex:2,
		    useArrows: true,
		    tbar: [
		           {text:'刷新',   iconCls:'arrow_refresh', itemId:'docu_refresh'}
		          ],
		    listeners :{
		    	itemexpand : function(node){
		    	}
		    },
		    //加载报表目录节点
		     //加载报表目录节点
		    loadDocu : function(Id){
		    	var store = this.store;
		    	store.load({
		    		params:{
		    			nodeId:Id,
		    			type:'report'
				    },
            		scope: this,
            		callback: function(records, operation, success){
            		      //alert(success);
            		}
		    	});
		    },
		    //刷新报表目录
		    refesh : function(){
		    	this.loadDocu(0);
		    },
		    //获取当前选中的目录
		    getSelectDocu : function(){
		    	var selectModel = this.getSelectionModel();
		    	var recs = selectModel.getSelection();
		    	return recs.length>0?recs[0]:null;
		    },
		  //设置父容器
       		setRootPanel : function(panel){
       			this.rootPanel = panel;
       		}
	  },
	  //报表目录下的报表列表
	  reportList : {
		    title:'报表列表',
		    iconCls:'report',
			dockedItems:[{
				xtype:'pagingtoolbar',
				dock:'bottom',
				displayInfo:'true',
				itemId:'result_paging'
			},{
			    xtype: 'toolbar',
				dock: 'top',
				itemId:'top_bar',
				items: [
				   {text:'查看',   iconCls:'zoom', itemId:'reportlist_query'}
				]
			}],
			itemId:'result_list',
			xtype:'grid',
	        columnLines:true,
	        flex: 5,
	        columns:  [
	   				{xtype:'rownumberer',flex:.5,sortable:false,align:'center',
	 				   renderer:function(value,metaData,record ,rowIndex){
	                  	   return rowIndex+1;
	                    }
	 				},
	 				{text: '名称',dataIndex:'name',flex:1},
	 				{text: '报表描述',dataIndex:'description',flex:2},
	 				{text: '报表类型',dataIndex:'report_type',flex:2},
	 				{text: '创建人',dataIndex:'userName',flex:1},
	 				{
   			         xtype:'actioncolumn',
   			         flex:1,
   			         align:'center',
   			         text: '选择',
   			         items: [{
   			        	  iconCls: 'select_rec',
   			              tooltip: 'Select',
   			              handler: function(grid, rowIndex, colIndex) {
   			            	  var tar = grid.getStore().getAt(rowIndex);
   			            	  var root = grid.findParentByType('grid').rootPanel;
   			            	  root.myList.addData(tar);
   			              }
   			            }]
	   			    }
	      		],
	        clear : function(){
	   	    	  this.getStore().removeAll();
	   	    },
	   	    //设置父容器
       		setRootPanel : function(panel){
       			this.rootPanel = panel;
       		}
	  },
	  //我的常用列表
	  myReportList : {
      	    title:'订阅列表',
			itemId:'my_list',
			xtype:'grid',
			iconCls:'feed',
	        columnLines:true,
	        dockedItems:[{
				xtype:'pagingtoolbar',
				dock:'bottom',
				displayInfo:'true'
			}],
	        flex: 3,
	        tbar: [
		        Ext.create('Ext.Action',{
		        	 text: '上移',
		        	 itemId:'upRec',
		        	 iconCls: 'arrow_large_up'
		        }),
		        Ext.create('Ext.Action',{
		        	 text: '下移',
		        	 itemId:'downRec',
		        	 iconCls: 'arrow_large_down'
		        })
          ],
          columns:[
		         {xtype:'rownumberer',flex:1,sortable:false,align:'center'},
		         {text:'名称',flex: 7,dataIndex:'l_name'},
		         {xtype:'actioncolumn',flex:2,align:'center',text: '取消',
		             items: [{
			        	  iconCls: 'delete',
			              tooltip: 'disSelect',
			              handler: function(grid, rowIndex, colIndex) {
			            	  var tar = grid.getStore().getAt(rowIndex);
			            	  var root = grid.findParentByType('grid').rootPanel;
			            	  root.myList.removeData(tar);
			              }
		             }]
			    }
         ],
         //增加我的常用报表
	     addData : function(source){
	    	    var me = this;
		    	var store = me.getStore();
		    	var num = store.getCount();
		    	var last = store.last();
		    	if(!me.hasData(source)){
		    		store.add(Ext.create('erp.report.engine.model.CommonCustomQuery',{
			    		'l_id' :  source.get('list_id'),
			    		'l_name': source.get('name'),
			    		'user_id' :erp.Util.currentUser.userInfo.u_id,
			    		'user_type' : 'people',
			    		'sequence' : last?(last.get('sequence')+1):0
			    	}));
			    	store.sync({
			    		success:function(batch,options){
			    			 if(last){
			    				 me.resetSequence();
			    			 }
						},
						failure:function(batch,options){
						      
						},
						scope:this
			    	});
		    	}
	     },
	     //在我的报表中是否有指定的报表
	     hasData : function(rec){
	    	 var me = this;
	    	 var result = false;
	    	 Ext.Ajax.request({
		    	    url: 'form/FormService.do?method=getCommonCustomQuery',
		    	    async : false,
		    	    params: {
		    	    	l_id      : rec.get('list_id'),
		    	    	user_id   : erp.Util.currentUser.userInfo.u_id,
		    			user_type : 'people'
		    	    },
		    	    success: function(response){
		    	    	recs = Ext.decode(response.responseText).data;
		    	    	if(recs&&recs.length>0){
		    	    		result = true;
		    	    	}
		    	    }
		    	});
	    	 return result;
	     },
	     //删除我的常用报表
	     removeData : function(rec){
		    	var store = this.getStore();
		    	store.remove(rec);
		    	store.sync({
		    		success:function(batch,options){
		    			 
					},
					failure:function(batch,options){
					      
					},
					scope:this
		    	});
	     },
	     loadData : function(page){
		    	var store = this.getStore();
		    	var mypage = page?page:1;
		    	store.load({
		    		params:{
		    			user_id : erp.Util.currentUser.userInfo.u_id,
		    			user_type :'people',
		    			page : mypage
				    },
		    		scope: this,
		    	    callback: function() {
		    	    	 
		    	    }
		    	});
	     },
	    /**
	     * 同步我的报表顺序
	     */
	     resetSequence : function(){
	    	    var me = this;
		    	var store = this.getStore();
		    	store.each(function(rec,index){
		    		rec.set('sequence',index);
		    	});
		    	store.sync({
		    		success:function(batch,options){
		    			
					},
					failure:function(batch,options){
					      
					},
					scope:this
		    	});
	     },
	     //调整我的列表顺序
	     shiftRecord : function(direct){
    		 var me = this;
    		 var store = me.getStore();
    		 var sm = me.getSelectionModel();
             var recs = sm.getSelection();
             if(recs.length>0){
            	 var rec = recs[0];
            	 var d = 1;
 				if(direct=='up'){
 					d = -1;
 				}else if(direct=='down'){
 					d = 1;
 				}
 				
 				var index = store.find('use_id',rec.get('use_id'));
 				if(index+d>-1&&index+d<store.getCount()){
 				  var tar = store.getAt(index+d);
 				  var tempseq = tar.get('sequence');
 				  tar.set('sequence',rec.get('sequence'));
 				  rec.set('sequence',tempseq);
 				  store.sync({
 						success:function(batch,options){
 							store.sort('sequence', 'ASC')
 						},
 						failure:function(batch,options){
 							
 						},
 						scope:this
 					});
 				} 	 
             }
		},
	   //设置父容器
    	 setRootPanel : function(panel){
    		 this.rootPanel = panel;
    	 }
      }
	}
})