Ext.define('erp.report.engine.view.CustomReport',{
	extend :'erp.ux.Panel',
	alias : 'widget.CustomReport',
	requires:[
	          'erp.common.form.store.FrmRegs',
	          'erp.report.engine.model.CusFilterFrmFld',
	          'erp.report.engine.model.CustomReportResult',
	          'erp.report.engine.view.GridQueryStyle',
	          'erp.report.engine.view.SupacnReportStyle',
	          'erp.common.form.view.ChartTypePortlet',
	          'erp.common.form.model.FrmFld',
	          'erp.report.engine.model.CustomQueryCdtion',
	          'erp.report.engine.store.CustomQueryCdtion',
	          'erp.report.engine.store.CustomReportResult',
	          'erp.report.engine.view.CustomUtil'
	         ],
	title :'CustomReport',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent : function(){
    	 var me = this;
    	 me.tempMap = Ext.create('Ext.util.HashMap');//用来存ft_id:{}(ft_id对应的表信息)
    	 me.fieldNameMap = Ext.create('Ext.util.HashMap');//存用户对字段的自定义名
    	  
    	 var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    	        clicksToEdit: 2
    	    });
    	 var fregStore;
		 Ext.apply(me,{
			 items: [{
				 xtype: 'container',
				 flex: 4,
				 border: false,
				 layout: {
				        type: 'vbox',
				        align: 'stretch'
				    },
				    items:[{
						 iconCls : 'frm-list',
	 	  				 title:'单据一览',
	 	  				 itemId:'freg_grid',
						 xtype:'grid',
						 flex: 4,
		 		  		 store: fregStore = Ext.create('erp.common.form.store.FrmRegs',{
		 		     		proxy: {
		 		     	        type: 'ajax',
		 		     	        actionMethods : 'post',
		 		     	        extraParams:{
		 		             	  usePaging:true
		 		     	        },
		 		     	        api: {
		 		     	        	read:	'form/Forms.do?method=getFrmRegList'
		 		     			},
		 		     	        reader: {
		 		     				type: 'json',
		 		     				root: 'data',
		 		     				messageProperty: 'message',
		 		     				totalProperty:'total'
		 		     			}
		 		     	    },
		 		     	    pageSize : 15
		 		     	}),
		 		     	dockedItems:[{
		 		  				xtype:'pagingtoolbar',
		 		  				dock:'bottom',
		 		  				store: fregStore,
		 		  				displayInfo:false
		 		  	    }],
	 		  		 columnLines:true,
	 		  	     columns:[
							{text:'',xtype:'rownumberer',sortable:false,align:'center'},
							{text: '编码',dataIndex: 'code',flex:1},
							{text: '名称',dataIndex: 'name',flex:2}
							],
		           		listeners: {
		           			//获取表结构，并将表结构信息存入tempMap
		           			selectionchange : function(selModel,recs,eOpts){
		           				if(recs.length>0){
		           				 me.getFrmflds().clearData();
		           					var fregId = recs[0].get('freg_id');
		           				 me.getFtblgrid().loadDatabyFreg(fregId);
	           					}
		           		   },
		           		   //取消选择字段，才能换单据
		           		beforedeselect : function(){
		           			 var result = me.getToFrmFld().hasRecs();
		           			 if(result){
		           				//Ext.Msg.alert('提示','换表请取消选择字段!');
		           				 me.moveRecords(false,me.getToFrmFld().getRecs()); 
		           			 }
		           			 //return !result;
		           			 return true;
		           		 }
		           		},
		           		/**
		           		 * 加载数据,选中已选着的单据
		           		 */
		           		loadData : function(){
		           			if(me.codtion){
		           			    this.getStore().load(function(recs){
		        					for(var i=0;i<recs.length;i++){
		        						if(recs[i].get('freg_id') == me.codtion.reg.freg_id){
		        							me.getFreggrid().getSelectionModel().select(recs[i]);
		        						}
		        					}
		        				});
		           			}
		           			else{
		           				this.getStore().load();
		           			}
		           		},
		           		//做一些初始设置
		           		initComp : function(){
		           			
		           		},
		           		//获取选择的记录
		           		getSelectRecs: function(isone){
		           			var recs = this.getSelectionModel().getSelection();
		           			if(recs&&recs.length>0){
		           				if(isone){
			           				return recs[0]
			           			}else{
			           				return recs;
			           			}
		           			}else{
		           				return null;
		           			}
		           		}
					 },{
						 title:'表结构',
						 iconCls : 'frm-list',
						 itemId:'ftbl_grid',
						 xtype:'grid',
						 selModel : Ext.create('Ext.selection.CheckboxModel'),
						 flex: 3,
						 store: Ext.create('erp.common.form.store.FrmTbls'),
						 columnLines:true,
					     columns:[
								{text:'',xtype:'rownumberer',sortable:false,align:'center'},
								{text: '名称',dataIndex: 'name',flex:2},
								{text: '表名',dataIndex: 'code',flex:1}
						 ],
						 listeners: {
							 /**
							  * 多个从表判断
							  */
							    beforeselect : function(rowmodel,record){
							    	var recs =  me.getFtblgrid().getSelRecs();
							    	var result = true;
							    	var index = 0;
							    	for(var i=0;i<recs.length;i++){
							    		if(recs[i].get('type') == erp.Const.FRMTBL_TYPE_DETAIL){
							    			index+=1;
							    			break;
							    		}
							    	}
							    	if((record.get('type') == erp.Const.FRMTBL_TYPE_DETAIL)&&index>0){
							    		Ext.Msg.alert('提示',"不能选多个从表.");
							    		result = false;
							    	}
							    	return result;
							    }, 
							 /**
							  * 递归加载单据表结构的字段，并筛选掉已经选择的字段
							  */
			           			selectionchange : function(selModel,recs,eOpts){
			           				var frmfldGrid = me.getFrmflds();
			           				frmfldGrid.clearData();
			           				if(recs.length>0){
			           				    function getMultiRecords(grid,tarRecs,lastRecords,index){
			           				    	grid.loadData({ft_id:tarRecs[index].get('ft_id')},function(){
			           				    		grid.loadRecs(lastRecords,true);
			           							index+=1;
			           							if(index<tarRecs.length){
			           								getMultiRecords(grid,tarRecs,grid.getRecs(),index);
			           							}else{
			           								if(me.codtion){
			           									grid.initValue();
			           									me.freg_id = me.codtion.reg.freg_id;
			           									me.codtion = null;
			           								}else{
			           									var myrecs = me.getToFrmFld().getRecs();
				           								for(var i=0;i<myrecs.length;i++){
				           									var tagrec = grid.getRecBy(myrecs[i]);
				           									if(tagrec){
				           										grid.removeRec(tagrec);
				           									}
				           								}
			           								}
			           							}
			           					  });
			           				    }
				           				getMultiRecords(frmfldGrid,recs,frmfldGrid.getRecs(),0);
			           			    }
			           		   },
			           		   //取消表之前，要取消这个表已经选着的字段
			           		 beforedeselect : function(rowmodel,record){
			           			var result = me.isUsedTable(record,me.getToFrmFld().getRecs());
			           			 if(result){
			           				Ext.Msg.alert('提示','这表的字段已经被选择.');
			           			 }
			           			return !result;
			           		 }
			           		},
			           	//加载数据
			           	 loadData: function(myparams,mycallback){
			           		if(!myparams){
			           			myparams = [];
			           		}
			           		if(!mycallback){
			           			mycallback = null;
			           		}
			           		this.getStore().load({
			           			params: myparams,
			           			callback: mycallback
			           		});
			           	},
			           	//加载单据的表结构，选中已选择的表
			           	loadDatabyFreg : function(fregId){
			           	  this.loadData({freg_id:fregId},function(recs){
        			        	me.resetTempMap(recs);
        			        	if(me.codtion){
        			        		var tabs = me.codtion.tables;
        			        		var sm = me.getFtblgrid().getSelectionModel();
        			        		var mods = [];
        			        		for(var i=0;i<tabs.length;i++){
        			        			for(var j=0;j<recs.length;j++){
        			        				if(tabs[i].ft_id==recs[j].get('ft_id')){
        			        					mods.push(recs[j]);
        			        					break;
        			        				}
        			        			}
        			        		}
        			        		sm.select(mods);
        			        	}
        			        });
			           	},
			           	//获取选择的记录
			           	getSelRecs: function(){
			           		return this.getSelectionModel().getSelection();
			           	}
					 }] 
			 },{
				 title:'字段列表',
				 xtype:'grid',
				 iconCls : 'frm-list',
				 itemId:'frm_flds',
				 flex: 4,
				 autoScroll:true,
				 store: Ext.create('erp.common.form.store.FrmFlds',{groupField:'ft_id'}),
				 columnLines:true,
				 tbar: [ 
				        Ext.create('Ext.Action',{
				        	 text: '全部选择',
				        	 handler: function(){
				        		 me.moveRecords(true,me.getFrmflds().getRecs());   
				        	 },
				        	 iconCls: 'arrow-continue'
				        })
				       ],
			     columns:[
						{text:'',xtype:'rownumberer',sortable:false,align:'center'},
						{text: '名称', dataIndex: 'name', flex:2},
						{text: '字段名',	 dataIndex: 'code',	flex:2},
						{text: '表名', dataIndex: 'ft_id',flex:2,
							renderer: function(v, meta, rec){
							    return me.tempMap.get(rec.get('ft_id')).code;
						    }
						},
						{
				         xtype:'actioncolumn',
				         flex:1,
				         align:'center',
				         text: '选择',
				         items: [{
				        	  iconCls: 'frm-rel-to',
				              tooltip: 'Select',
				              handler: function(grid, rowIndex, colIndex) {
				                   var rec = grid.getStore().getAt(rowIndex);
				                   me.moveRecords(true,[rec]);
				              }
				            }]
				       }
				 ],
				 //清除所有数据
				 clearData : function(){
					 this.getStore().removeAll();
				 },
				 //清除特定数据
				 removeRec : function(rec){
					 this.getStore().remove(rec);
				 },
				 //直接添加数据（不从后台）
				 loadRecs : function(recs,option){
					 this.getStore().loadData(recs,option);
				 },
				//加载数据
	           	 loadData: function(myparams,mycallback){
	           		if(!myparams){
	           			myparams = [];
	           		}
	           		if(!mycallback){
	           			mycallback = null;
	           		}
	           		this.getStore().load({
	           			params: myparams,
	           			callback: mycallback
	           		});
	           	},
	            getRecs: function(){
	            	   return  this.getStore().getRange();
	            },
	            //通过id获取记录
               getRecBy: function(rec){
            	   return  this.getStore().getById(rec.get('ff_id'));
               },
               /**
                * 在表单查询修改状态(非新增)
                * 初始化:选中字段及查询条件
                */
               initValue: function(){
            	   var cd = me.codtion.data;
            	   var recs = this.getRecs();
            	   var models = [];
            	   for(var i=0;i<cd.length;i++){
            		   for(var j=0;j<recs.length;j++){
            			   if(recs[j].get('code')==cd[i].ffName&&(me.tempMap.get(recs[j].get('ft_id')).code)==cd[i].ftName){
            				   models.push(recs[j]);
            				   me.fieldMapPut(me.generateRecId(recs[j]),Ext.create('erp.report.engine.model.CusFilterFrmFld',{
                      				cusName : cd[i].cusName,
                      				condition : cd[i].condition
                      			}), false);
            				   recs.splice(j,1);
            				   break;
            			   }
            		   }
            	   }
            	   me.moveRecords(true,models);
            	   me.initCdtions();
            	   
               }
			 },{
				xtype : 'container',
				border: false,
				layout: {
				        type: 'vbox',
				        align: 'stretch'
				},
				flex : 7,
				items:[
				   {
					   xtype : 'container',
					   border: false,
					   flex : 4,
					   layout: {
					        type: 'hbox',
					        align: 'stretch'
					   },
					   items :[
							{
								 title: '已选字段列表',
								 xtype:'grid',
								 iconCls : 'frm-list',
								 itemId:'to_FrmFld',
								 flex: 4,
								 columnLines:true,
								 store: fldStore = Ext.create('Ext.data.Store',{
									 pageSize : 15,
									 model: 'erp.common.form.model.FrmFld',
									 proxy: {
									        type: 'memory'
									        }}
								 ),
//								 dockedItems:[{
//						  				xtype:'pagingtoolbar',
//						  				dock:'bottom',
//						  				store: fldStore,
//						  				displayInfo:false
//						  	     }],
								 tbar: [
								        Ext.create('Ext.Action',{
								        	 text: '上移',
								        	 handler: function(){
								        		 var p = me.getToFrmFld();
								        		 var store = p.getStore();
								        		 var pSM = p.getSelectionModel();
								                 var recs = pSM.getSelection();
								                 if(recs.length>0)
								                   me.shiftRecord(recs[0],store,'up',pSM);
								        	 },
								        	 iconCls: 'arrow-bup'
								        }),
								        Ext.create('Ext.Action',{
								        	 text: '下移',
								        	 handler: function(){
								        		 var p = me.getToFrmFld();
								        		 var store = p.getStore();
								        		 var pSM = p.getSelectionModel();
								                 var recs = pSM.getSelection();	
								                 if(recs.length>0)
								                    me.shiftRecord(recs[0],store,'down',pSM); 
								        	 },
								        	 iconCls: 'arrow-bdown'
								        }),
								        '->',
								        Ext.create('Ext.Action',{
								        	 text: '全部取消',
								        	 handler: function(){
								        		 me.moveRecords(false,me.getToFrmFld().getRecs());   
								        	 },
								        	 iconCls: 'arrow-continue-back'
								        })
								       ],
								 columns:[
								          {text:'',xtype:'rownumberer',sortable:false,align:'center'},
										  {text: '表名',dataIndex: 'ft_id',flex:1,
												renderer: function(v, meta, rec){
												    return me.tempMap.get(rec.get('ft_id')).code;
										        }
											},
											{text: '字段名',dataIndex: 'code',flex:1},
											{text:'自定义名',dataIndex: 'name', flex:1,editor:{
								                xtype: 'textfield',
								                allowBlank: true
								                }
											},{
										         xtype:'actioncolumn',
										         flex:1,
										         align:'center',
										         text: '取消',
										         items: [{
										        	  iconCls: 'frm-rel-from',
										              tooltip: 'disSelect',
										              handler: function(grid, rowIndex, colIndex) {
										                   var rec = grid.getStore().getAt(rowIndex);
										                   me.moveRecords(false,[rec]);
										              }
										            }]
										       }
							  ],
							  plugins: [cellEditing],
							  listeners:{
							  	beforeedit:function(editor,e,eOpts){
							  		//将原始的字段名称存入fieldNameMap
							  		var map =  me.fieldNameMap;
							  		var rec = e.record;
							  		var id = me.generateRecId(rec);
							  		me.fieldMapPut(id,Ext.create('erp.report.engine.model.CusFilterFrmFld',{
											cusName : rec.get('name')
										}), false);
							  	},
							  	//如果是指标性属性,则显示筛选条件
							  	selectionchange:function(model,selected){
							  		var config = null;
							  		if(selected.length>0){
							  			var tar = selected[0];
							  			   config = {
							  					codeType: tar.get('code_type'),
							          		    dataType:  tar.get("datatype"),
							          		    rec: tar
							          	  };
							  			  me.resetFilterPanel(config);
										}else{
										  me.clearFilterPanel();
										}
							  	}
							  },
							  //是否有选择记录
							  hasRecs: function(){
								   return this.getStore().getCount()>0;
							  },
							  //清除特定数据
								 removeRec : function(rec){
									 this.getStore().remove(rec);
								 },
							  /*//是否存在特定记录
							  hasRec: function(rec){
									var tagrec = this.getStore().getById(rec.get('ff_id'));
									return tagrec?true:false;
							  },
							  //通过id获取记录
							  getRecBy: function(rec){
								   return  this.getStore().getById(rec.get('ff_id'));
							  },*/
							  //获取所有记录
							  getRecs: function(){
								   return  this.getStore().getRange();
							  },
							  loadRecs: function(recs,all){
								   this.getStore().loadData(recs,all);
							  }
							},{
								 title: '指标属性筛选',
								 xtype:'panel',
								 itemId:'fieldFilter',
								 flex : 3,
								 layout:'fit',
								 cdtionStore :  Ext.create('Ext.data.Store', {
									 model:'erp.report.engine.model.CustomQueryCdtion'
								 }),
								 /**
								  * 添加指定指标属性值得grid
								  */
								 addValuePanel: function(ftype,label){
									 var model =  erp.DataUtil.findConfig(ftype);
									 var mystore = erp.DataUtil.getStoreByType(ftype);
									 mystore.pageSize = 10;
									 this.add({
										xtype:'grid',
										itemId:'filtervalue',
										//layout:'fit',
										 tbar: [{
										          xtype: 'textfield',
										          id: 'cText',
										          enableKeyEvents : true,
										          listeners: {
										        	  keydown : function(fieldText,e){
										        		 if(e.getKey()==Ext.event.Event.ENTER){
										        			 mystore.clearFilter(true);
												        	 mystore.filter(model.get('displayField'),fieldText.getValue());
										        		 } 
										        	  }
										          }
										        },{
										          text:'搜索',
										          handler:function(){
										        	  var val = Ext.getCmp('cText').getValue();
										        	  mystore.clearFilter(true);
										        	  mystore.filter(model.get('displayField'),val);
										          }
										        }
										 ],
									    store: mystore,
									    selModel : Ext.create('Ext.selection.CheckboxModel'),
									    columns: [
							               { text: '代码', dataIndex: model.get('valueField'), flex: 1 },
									        { text: '名称',  dataIndex: model.get('displayField') , flex: 1}
									    ],
									    dockedItems:[{
							  				xtype:'pagingtoolbar',
							  				dock:'bottom',
							  				store: mystore,
							  				displayInfo:false
							  	      }],
							  	        listeners:{
							  	        	/**
							  	        	 * 选中和取消指标属性值
							  	        	 */
							  	        	selectionchange : function(){
							  	        		 var filter = me.getFilterPanel();
												 var rec = filter.getRecord();
												 if(rec){
													 var vals = filter.getValue();
													 if(vals.length>0){
														 var field  = model.get('valueField');
														 
														 var param = "";
													     var length = vals.length-1;
														 for(var i=0;i<length;i++){
															 param = param + "'" +vals[i].get(field)+ "',";
														 }
														 param = param + " '" +vals[length].get(field)+ "')";
														 
														 filter.addCdtion(rec,param);
													 }else{
														 filter.removeCdtion(rec);
													 }
												 }else{
													 //
												 }
							  	        	}
							  	        }
									 });
								 },
								 removeValuePanle: function(){
									 this.remove('filtervalue');
								 },
								 //设置当期进行筛选的记录
								 setRecord:function(rec){
									 this.record = rec;
								 },
								 //获取当期进行筛选的记录
								 getRecord:function(){
									 return this.record;
								 },
								 //获取值
								 getValue: function(){
									 var fvalue = this.down('#filtervalue');
									 var vals = fvalue.getSelectionModel().getSelection();
									 return vals.length == fvalue.getStore().getCount()?[]:vals;
								 },
								 //根据参数重置筛选条件面板
								 resetFilterPanel: function(config){
									 if(config){
										 var codeType = config.codeType;
										 var dataType = config.dataType;
										 var rec = config.rec;
										 this.clearFilterPanel();
										 if(codeType){
										//	 this.down("#filterButton").show();
											 this.setRecord(rec);
											// this.addOpePanel(dataType,rec.get('name'));
											 this.addValuePanel(codeType);
										 }else{
											 //Ext.Msg.alert('提示','暂不支持普通字段筛选!');
										 }
									 }else{
										 this.clearFilterPanel();
									 }
								 },
								 //初始化面板值
								 initPanelValue: function(tar){
									//设置用户选择的值
									        var cdtion = this.getCdtion(tar);
										    if(cdtion&&cdtion!=""){
										    	var cdstr = cdtion.get('opeVal');
										    	 var model =  erp.DataUtil.findConfig(tar.get('code_type'));
												 var field  = model.get('valueField');
												 var fvalue = this.down('#filtervalue');
											     var sm = fvalue.getSelectionModel();
											     var store = fvalue.getStore();
									    	  var myrecs = (cdstr.substring(0,cdstr.lastIndexOf(')'))).split(',');
									    	  var val;
									    	  var models = [];
									    	  var model;
									    	  for(var i=0;i<myrecs.length;i++){
									    		val = myrecs[i].substring(myrecs[i].indexOf("'")+1,myrecs[i].lastIndexOf("'"));
									    		model = store.findRecord(field,val);
									    		if(model){
									    			models.push(model);
									    		}
									    	  }
								    	     sm.select(models);
										    }
								 },
								 //清空条件面板
								 clearFilterPanel: function(){
									 if(this.getRecord()){
										 this.setRecord(null);
										 this.removeValuePanle();
										// this.down("#filterButton").hide();
									 }
								 },
								 /**
								  * 获取当前字段的查询条件
								  */
								 getCdtion : function(rec){
									 return this.cdtionStore.findRecord('ft_ff_id',me.generateCdtionId(rec));
								 },
								 getCdtionStore : function(){
									 return this.cdtionStore;
								 },
								 /**
								  * 添加或修改查询条件
								  */
								 addCdtion : function(rec,param){
									 var id = me.generateCdtionId(rec);
									 var cdtion =  this.cdtionStore.findRecord('ft_ff_id',id);
									 if(cdtion){
										 cdtion.set('opeVal',param);
									 }else{
										 this.cdtionStore.loadData([ Ext.create('erp.report.engine.model.CustomQueryCdtion',{
											 'ope' : " In (",
											 'opeVal' : param,
											 'field_type' : 'base',
											 'ft_ff_id' : id
										 })]);
									 }
								 },
								 /**
								  * 在表单查询修改时，初始化查询条件
								  */
								 initCdtions : function(recs){
									   this.cdtionStore.loadData(recs);
								 },
								 getCdtions : function(){
									 return this.cdtionStore.getRange();
								 },
								 /**
								  * 删除查询条件
								  */
								 removeCdtion : function(rec){
									 var id = me.generateCdtionId(rec);
									 var cdtion =  this.cdtionStore.findRecord('ft_ff_id',id);
									 if(cdtion){
										  this.cdtionStore.remove(cdtion);
										  me.sysncCdtion([cdtion],"delete");
									 }
								 }
							}
					   ]
				   },
				   {
					   xtype : 'grid',
					   flex : 3,
					   title : '自定义筛选条件',
					   titleAlign : 'center',
					   itemId : 'customFilter',
					   columnLines:true,
					   cdType : 'filterCd',
					   store :  Ext.create('Ext.data.ArrayStore',{
							 model:'erp.report.engine.model.CustomQueryCdtion',
							 pageSize : 10
					   }),
					   tbar: [
								Ext.create('Ext.Action',{
									 text: '添加',
									 handler: function(){//将选择的筛选条件，记入到对应字段记录
										 me.getcusFilterPanel().addEmptyModel(5);
									 },
									 iconCls: 'add-col'
								}),
								Ext.create('Ext.Action',{
									 text: '说明',
									 handler: function(){
										 Ext.create('Ext.window.Window', {
											    title: '说明',
											    height: 300,
											    width: 600,
											    layout: 'fit',
											    bodyStyle: {
											        background: '#FFFFFF',
											        padding: '10px'
											    },
											    html:'在值这列中可以使用通配符<br/><br/>\
											    	@org,@dept,@position,@me: 代表登入者的组织,部门,职位,loginId<br/><br/>\
											    	@group@org,@group@dept: 代表用户所在群组的组织和部门<br/><br/>\
											    	当对象为时间类型时，时间格式：y-m-d h:s:m<br/><br/>\
											    	过滤条件是报表的限制条件（一定会加上），查询条件，指表报查看时的条件（用户使用才加）'
											}).show();
									 },
									 iconCls: 'label-prompt'
								}),{
						        	xtype : 'combobox',
						        	fieldLabel: '条件类别',
						        	itemId:'displayStyle',
						        	store: Ext.create('Ext.data.Store', {
							        	     fields: ['value', 'name'],
							        	     data : [
							        	         {"value":"filterCd", "name":"过滤条件"},
							        	         {"value":"queryCd", "name":"查询条件"}
							        	     ]
						        	       }),
						        	labelWidth   : 70,
						            value        : 'filterCd',
						        	queryMode    : 'local',
						        	displayField : 'name',
						        	valueField   : 'value',
						        	margin       : '0 0 0 15',
						        	listeners    : {
						        		select : function(cmp,recs){
						        			var p = this.up('grid');
						        			p.setCdType(cmp.getValue());
						        			var rec = me.getToFrmFld().getRecs();
											   var id;
											   var ids = [];
											   for(var i=0;i<rec.length;i++){
													  id = me.generateCdtionId(rec[i]);
													  ids.push(id);
										       }
						        			p.filterStore(ids);
						        		}
						        	}
						        }
					    ],
					   columns:[
				   //     {text:'',xtype:'rownumberer',sortable:false,align:'center'},
						  {text: '对象',dataIndex:'ft_ff_id',flex:2,editor:
							  me.objComboBox = Ext.create('Ext.form.ComboBox', {
									typeAhead: true,
						            selectOnTab: true,
								    store: me.objStore = [['Shade','Shade1']],
								    lazyRender: true
								}),
							renderer: function(v, meta, rec){
								var p = me.getcusFilterPanel();
								var moldes = me.objStore;
								var val;
								for(var i=0;i<moldes.length;i++){
									if(moldes[i][0]==v){
										val = moldes[i][1];
										break;
									}
								}
							    return val?val:v;
						    }
						  },
						  {text: '条件',dataIndex:'ope',flex:1,editor:
							  Ext.create('Ext.form.ComboBox', {
									//	typeAhead: true,
							          //  selectOnTab: true,
									    store: me.opeStore = Ext.create('Ext.data.Store', {
										    storeId :'test'+Ext.id(),
									        fields : ['value', 'name','type'],
									        data : [
									           {'value':'>', 'name':'>','type':'num'},
									           {'value':'<', 'name':'<','type':'num'},
									           {'value':'=', 'name':'=','type':'normal'},
									           {'value':'!=', 'name':'!=','type':'normal'},
									           {'value':'like', 'name':'like','type':'char'}//,
									          // {'value':'@', 'name':'@','type':'special'}
									        ]
									    }) ,
									  //  lazyRender: true,
									    displayField: 'name',
									    valueField: 'value'
									})},
						  {text:'值',dataIndex:'opeVal',flex:2,  editor: {
				                xtype: 'textfield'
				            }}
					   ],
					   plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
			    	        clicksToEdit: 1
			    	   })],
			    	   listeners:{
//			    		   afterrender:function(cmp){
//			    			   cmp.collapse(Ext.Component.DIRECTION_BOTTOM,true);
//			    		   }  
			    	   },
			    	   setCdType : function(type){
			    		   this.cdType = type;
			    	   },
					   resetFilterPanel : function(rec,opeType){
						  this.resetFields(rec, opeType);
						  
					   },
					   /**
					    * 根据选择的查询字段，重设条件字段
					    */
					   resetFields : function(){
						  var rec = me.getToFrmFld().getRecs();
						  var models = [];
						  var ids = [];
						  var id;
						  for(var i=0;i<rec.length;i++){
							  id = me.generateCdtionId(rec[i]);
							  models.push([id,rec[i].get('name')]);
							  ids.push(id);
						  }
						  me.objStore = models;
						  me.objComboBox.bindStore(me.objStore);
						  this.filterStore(ids);
					   },
					   /**
					    * 过滤取消查询的字段的查询条件
					    */
					   filterStore : function(ids){
						   var p = me.getcusFilterPanel();
						   var store = this.getStore();
						   store.clearFilter(true);
						   if(store.getCount()== 0){
							   this.addEmptyModel(5);
						   }else{
							   store.filterBy(function(rec){
								   var result = false;
								   var myid = rec.get('ft_ff_id');
								   var rightType = false;
								   if(rec.get('cd_type')){
									   rightType = (rec.get('cd_type')==p.cdType);
								   }else{
									   rightType = (p.cdType=='filterCd');
								   }
								   result = p.isUseful(myid, ids);
								   return result&&rightType;
							   });
						   }
					   },
					   /**
					    * 字段是否是查询字段
					    */
					   isUseful : function(myid,ids){
						   var result = false;
						   if(myid&&myid!=""){
							   for(var i = 0;i<ids.length;i++){
								   if(ids[i] == myid){
									   result = true;
									   break;
								   }
							   }
						   }else{
							   result = true;
						   }
						   return result;
					   },
					   /**
					    * 添加空行
					    */
					   addEmptyModel : function(num){
						   var cdType = this.cdType;
						   var models = [];
						   for(var i =0;i<num;i++){
							 models[i] = Ext.create('erp.report.engine.model.CustomQueryCdtion',{
								 'type'   : 'normal',
								 'cd_type' : cdType
							 });
						   }
						   this.getStore().loadData(models,true);
					   },
					   //设置当期进行筛选的记录
					   setRecord:function(rec){
						   this.record = rec;
					   },
						 //获取当期进行筛选的记录
					   getRecord:function(){
						   return this.record;
					   },
					   /**
					    * 获取查询条件，将有空字段的无效条件去除
					    */
					   getCdtions : function(){
						   var store = this.getStore();
						   var p = me.getcusFilterPanel();
						   
						   store.clearFilter(true);
						   store.filterBy(function(rec){
							    var result = false;
							    var ft_ff_id = rec.get('ft_ff_id');
							    var ope  = rec.get('ope');
							    var opeVal = rec.get('opeVal');
							    	if(!ft_ff_id||ft_ff_id==""||!ope||ope==""||!opeVal||opeVal==""){
							    		result = true;
							    	}
							    return result;
						   });
						   var removes = store.getRange();
						   store.remove(removes);
						   me.sysncCdtion(removes, "delete");
						   
						   store.clearFilter(true);
						   var rec = me.getToFrmFld().getRecs();
						   var id;
						   var ids = [];
						   for(var i=0;i<rec.length;i++){
								  id = me.generateCdtionId(rec[i]);
								  ids.push(id);
					       }
						   store.filterBy(function(rec){
							    var result = false;
							    var myid = rec.get('ft_ff_id');
							    var ope  = rec.get('ope');
							    var opeVal = rec.get('opeVal');
							    if(myid&&myid!=""&&(p.isUseful(myid,ids))&&ope&&ope!=""&&opeVal&&opeVal!=""){
							    	result = true;
							    }
							    return result;
						   });
						   var recs = store.getRange();
						   
						   store.clearFilter(true);
						   if(store.getCount()== 0){
							   this.addEmptyModel(5);
						   }
						   p.filterStore(ids);
						   return recs;
					   },
					   /**
					    * 在表单查询修改时，初始化条件
					    */
					   initCdtions : function(recs){
						   this.getStore().loadData(recs);
						   if(recs.length<5){
							   this.addEmptyModel(5-recs.length);
						   }
						   this.resetFields();
					   }
				   }
				]
			 }],
			 tbar: [
			        Ext.create('Ext.Action',{
			        	 text: '预览',
			        	 handler: function(){
			        		 /*
					    	  *按已选字段顺序取出查询条件，将数据发送到后台，进行sql拼接 
					    	  */
					    	 var recs = me.getToFrmFld().getRecs();
					    	 var param = me.makeParam(recs);
					    	 param.cdtions = me.makeParamCdtion();
					    	 var displayStyle = me.getDisplayStyle();
					    	 if(recs.length>0){
					    		 me.preview("form/FormService.do?method=cusFromQuery" , param , param.data, displayStyle);
					    	 }  
			        	 },
			        	 iconCls: 'previewIcon'
			        }),
			        Ext.create('Ext.Action',{
			        	 text: '保存',
			        	 handler: function(){
			        		 /**
			        		  * 将操作保存为操作模板
			        		  */
			        		 var recs = me.getToFrmFld().getRecs();
					    	 if(recs.length>0){
						    		var myreg = me.getFreggrid().getSelectRecs(true); 
				    				var myname = me.getDockedItems('toolbar[dock="top"]')[0].down('#queryName').getValue().replace(/(^\s*)|(\s*$)/g, "");
				                    
				    				if(!myname||myname ==''){
				    					resultName.setValue('模板名称不能为空');
				    				}else{
				    					 var param = me.makeParam(recs);
							    		 var result = {
							    				reg: {freg_id:(me.freg_id?me.freg_id:myreg.get('freg_id'))},
							    				data:param.data,
							    				tables:param.tables
							    		 }
							    		 var displayStyle = me.getDisplayStyle();
							    		 var freg_id = me.freg_id?me.freg_id:myreg.get('freg_id');
							    		 me.setGridRecord(displayStyle,Ext.JSON.encode(result),freg_id,myname);
							    			 //修改或增加
//								    		 if(me.tarModel){
//								    			 me.tarModel.set({
//								    				 'name':myname,
//								    				 'creater':tp.Util.currentUser.userInfo.u_id,
//								    				 'creatTime':new Date(),
//								    				 'orgunit': tp.Util.currentUser.ou_code?tp.Util.currentUser.ou_code:'',
//								    				 'default_style': displayStyle,
////								    				 'ope': encodeURI(Ext.JSON.encode(result)),
//								    				 'ope': Ext.JSON.encode(result),
//								    				 'freg_id':(me.freg_id?me.freg_id:myreg.get('freg_id'))
//								    				 });
//								    			 me.updateResult(me.tarModel,me.getCdtions());
//								    		 }else{
//								    			 var paramRec = Ext.create('tp.report.engine.model.CustomReportResult',{
//								    				 name: myname,
//								    				 creater: tp.Util.currentUser.userInfo.u_id,
//								    				 creatTime:new Date(),
//								    				 orgunit: tp.Util.currentUser.ou_code?tp.Util.currentUser.ou_code:'',
//								    				 //ope: encodeURI(Ext.JSON.encode(result)),
//								    			     ope: Ext.JSON.encode(result),
//								    				 default_style: displayStyle,
//								    				 level: Ext.JSON.encode([]),
//								    				 freg_id: (me.freg_id?me.freg_id:myreg.get('freg_id')),
//								    				 docId: me.docRec.get('docId')
//								    			 });
//								    			 me.addResult(paramRec, me.getCdtions());
//								    		 }
				    				}
					    	  }else{
					    		  Ext.Msg.alert('提示','没有选择字段');
					    	  }   
			        	 },
			        	 iconCls: 'page_saveIcon'
			        }),
			        {
			          xtype: 'textfield',
			          id: 'queryName',
			          fieldLabel: '模板名称',
			          labelWidth: 60,
			          allowBlank: false,
			          width:300,
			          itemId:'queryName',
			          margin: '0 0 0 20'
				    },{
			        	xtype : 'combobox',
			        	fieldLabel: '展示方式',
			        	itemId:'displayStyle',
			        	store: erp.report.engine.view.QueryStyle.getStyles(),
			        	queryMode: 'local',
			        	displayField: 'name',
			        	valueField: 'value',
			        	 margin: '0 0 0 20'
			        }
			 ]
        });
       this.callParent(arguments); 
    },
    //保存和修改查询操作的store
    resultStore : Ext.create('erp.report.engine.store.CustomReportResult'),
    //保存和修改查询操作条件的store
    cdtionStore : Ext.create('erp.report.engine.store.CustomQueryCdtion'),
    //保存查询操作
    addResult : function(result,cdtions){
    	var me = this;
    	var resultStore = me.resultStore;
    	resultStore.add(result);
    	resultStore.sync({
    		success : function(){
    			me.addCdtion(result,cdtions);
    		},
    		scope:this
    	});
    },
    //修改查询操作
    updateResult : function(result,cdtions){
    	var me = this;
    	var resultStore = me.resultStore;
    	var param = [];
    	param.push({
    		"list_id" : result.get('list_id'),
    		"name" : result.get('name'),
    		"creater" : result.get('creater'),
    		"creatTime" : result.get('creatTime'),
    		"orgunit" : result.get('orgunit'),
    		"ope" : result.get('ope'),
    		"default_style" : result.get('default_style'),
    		"level" : result.get('level'),
    		'freg_id': result.get('freg_id')
        });
    	Ext.Ajax.request({
    	    url: 'form/Forms.do?method=updateCusReportResult',
    	    params: {
    	        data:  Ext.JSON.encode(param)
    	    },
    	    success: function(response){
    	    	me.updateCdtion(result,cdtions);
    	    }
    	});
    },
    //保存查询条件
    addCdtion : function(result,models){
    	var me = this;
    	var param = [];
		var newRec;
		for(var i=0;i<models.length;i++){
			newRec = models[i];
			param.push({
				"l_id":result.get('list_id'),
				"ope":newRec.get('ope'),
				"opeVal":newRec.get('opeVal'),
				"field_type":newRec.get('field_type'),
				"ft_ff_id":newRec.get('ft_ff_id'),
				'freg_id': newRec.get('freg_id'),
				"cd_type":newRec.get('cd_type')
			});
		}
    	Ext.Ajax.request({
	    url: 'form/Forms.do?method=addCustomQueryCdtion',
	    params: {
	        data:  Ext.JSON.encode(param)
	    },
	    success: function(response){
	       Ext.Msg.alert('提示','添加成功!');
	       if(me.target){
   			me.target.myload(me.target.isadmin,me.docRec.get('docId'));
   		   }
        },
	    failure: function(response, opts) {
	        Ext.Msg.alert('提示','添加失败!');
	    }
	   });
    },
    //修改查询条件
    updateCdtion : function(result,cdtions){
    	var me = this;
    	var store = this.cdtionStore;
    	
    	var removeRecs = store.getRemovedRecords();
    	if(removeRecs.length>0){
    		me.deleteCdtionItem(store,cdtions,result,removeRecs)
    	}else{
    		store.loadData(cdtions);
    		var newRecs = store.getNewRecords();
    		if(newRecs.length>0){
    			me.addCdtionItem(store, cdtions, result, newRecs);
    		}else{
    			var updateRecs = store.getUpdatedRecords();
    	    	if(updateRecs.length>0){
    	    		me.updateCdtionItem(store, cdtions, result, updateRecs);
    	    	}else{
    	    		//Ext.Msg.alert('提示','您未对查询条件进行修改!');
    	    		Ext.Msg.alert('提示','修改成功!');
    	    		if(me.target){
    	    			me.target.myload(me.target.isadmin,me.docRec.get('docId'));
    	    		}
    	    	}		
    		}
    	}
    },
    deleteCdtionItem : function(store,cdtions,result,removeRecs){
    	var me = this;
    	var param = [];
		var removeRec;
		for(var i=0;i<removeRecs.length;i++){
			removeRec = removeRecs[i];
			param.push({
				"c_id":removeRec.get('c_id'),
				"l_id":removeRec.get('l_id'),
				"ope":removeRec.get('ope'),
				"opeVal":removeRec.get('opeVal'),
				"field_type":removeRec.get('field_type'),
				"ft_ff_id":removeRec.get('ft_ff_id'),
				"cd_type":removeRec.get('cd_type')
			});
		}
    	Ext.Ajax.request({
	    url: 'form/Forms.do?method=deleteCustomQueryCdtion',
	    params: {
	        data:  Ext.JSON.encode(param)
	    },
	    success: function(response){
	    	store.loadData(cdtions);
    		var newRecs = store.getNewRecords();
    		if(newRecs.length>0){
    			me.addCdtionItem(store, cdtions, result, newRecs);
    		}else{
    			var updateRecs = store.getUpdatedRecords();
    	    	if(updateRecs.length>0){
    	    		me.updateCdtionItem(store, cdtions, result, updateRecs);
    	    	}else{
    	    		Ext.Msg.alert('提示','修改成功!');
    	    		if(me.target){
    	    			me.target.myload(me.target.isadmin,me.docRec.get('docId'));
    	    		}
    	    	}		
    		}
        },
	    failure: function(response, opts) {
	        Ext.Msg.alert('提示','删除旧条件失败!');
	    }
	   });
    },
    addCdtionItem : function(store,cdtions,result,newRecs){
    	var me = this;
    	var param = [];
		var newRec;
		for(var i=0;i<newRecs.length;i++){
			newRec = newRecs[i];
			param.push({
				"l_id":result.get('list_id'),
				"ope":newRec.get('ope'),
				"opeVal":newRec.get('opeVal'),
				"field_type":newRec.get('field_type'),
				"ft_ff_id":newRec.get('ft_ff_id'),
				"cd_type":newRec.get('cd_type')
			});
		}
    	Ext.Ajax.request({
	    url: 'form/Forms.do?method=addCustomQueryCdtion',
	    params: {
	        data:  Ext.JSON.encode(param)
	    },
	    success: function(response){
	    	var updateRecs = store.getUpdatedRecords();
	    	if(updateRecs.length>0){
	    		me.updateCdtionItem(store, cdtions, result, updateRecs);
	    	}else{
	    		Ext.Msg.alert('提示','修改成功!');
	    		if(me.target){
	    			me.target.myload(me.target.isadmin,me.docRec.get('docId'));
	    		}
	    	}
        },
	    failure: function(response, opts) {
	        Ext.Msg.alert('提示','添加新条件失败!');
	    }
	   });
    },
    updateCdtionItem : function(store,cdtions,result,updateRecs){
    	var me = this;
    	var param = [];
		var updateRec;
		for(var i=0;i<updateRecs.length;i++){
			updateRec = updateRecs[i];
			param.push({
				"c_id":updateRec.get('c_id'),
				"l_id":updateRec.get('l_id'),
				"ope":updateRec.get('ope'),
				"opeVal":updateRec.get('opeVal'),
				"field_type":updateRec.get('field_type'),
				"ft_ff_id":updateRec.get('ft_ff_id'),
				"cd_type":updateRec.get('cd_type')
			});
		}
    	Ext.Ajax.request({
	    url: 'form/Forms.do?method=updateCustomQueryCdtion',
	    params: {
	        data:  Ext.JSON.encode(param)
	    },
	    failure: function(response, opts) {
	        Ext.Msg.alert('提示','修改旧条件失败!');
	    },
	    success: function(response){
	    	Ext.Msg.alert('提示','修改成功!');
	    	if(me.target){
	    		me.target.myload(me.target.isadmin,me.docRec.get('docId'));
    		}
        }
	   });
    },
    //同步试图和负责传输的store
    sysncCdtion : function(recs,opeType){
    	var store = this.cdtionStore;
    	if(recs&&recs.length>0){
    		if(opeType == "delete"){
    			for(var i=0;i<recs.length;i++){
    				if(store.indexOf((recs[i]))>-1){
    					store.remove(recs[i]);
    				}
    			}
    		}
    	}
    },
    //单据面板
    getFreggrid: function(){
    	return this.down("#freg_grid");
    },
    //表结构面板
    getFtblgrid: function(){
    	return this.down("#ftbl_grid");
    },
    //字段面板
    getFrmflds: function(){
    	return this.down("#frm_flds");
    },
    //选择的字段面板
    getToFrmFld: function(){
    	return this.down("#to_FrmFld");
    },
    //筛选条件面板
    getFilterPanel: function(){
    	return this.down("#fieldFilter");
    },
    //自定义条件面板
    getcusFilterPanel: function(){
    	return this.down("#customFilter");
    },
    //重置ftb的tempMap
    resetTempMap: function(recs,params){
			this.fieldNameMap.clear();
			var ftbMap = this.tempMap;
			ftbMap.clear();
		    for(var i=0;i<recs.length;i++){
		    	ftbMap.add(recs[i].get('ft_id'),{
					code:recs[i].get('code'),
					type:recs[i].get('type')
				});
		    }
	},
	//添加选择的字段信息
	fieldMapPut: function(id,rec,isCover){
		var map =  this.fieldNameMap   		
		if(map.get(id)){
   			if(isCover){
   				map.add(id,rec);
   			}
   		}else{
   			map.add(id,rec);
   		}
	},
	/**生成选择参数
	 * @param recs：选择的字段
	 * @return {data:{},tables:{}}(data,字段;tables,相关表信息)
	 */
	makeParam: function(recs){
		 var tmap = this.tempMap;
		 var paramRecs = [];
    	 var paramTables = [];
    	 var rec;
    	 for(var i=0;i<recs.length;i++){
    		 rec = recs[i];
	 			paramRecs[i] = {
	 				ffName : rec.get('code'),
	 				ftName : tmap.get(rec.get('ft_id')).code,
	 				cusName : rec.get('name'),
	 				codeType : rec.get('code_type'),
	 				condition : null,
	 				datatype : rec.get('datatype')
	 			};
             //表参数，两个表获取主外键
     		this.getSelectTable(rec.get('ft_id'),paramTables);
    	 }
    	 return {data:paramRecs,tables:paramTables}
	},
	/**
	 * 生成查询条件
	 */
	makeParamCdtion : function(){
		var tmap = this.tempMap;
		var recs =  this.getCdtions();
		var result = this.getToFrmFld().getRecs();
		var fields = [];
		for(var i=0;i<result.length;i++){
			fields[i] = {
			   ftName :  tmap.get(result[i].get('ft_id')).code,
			   ffName :  result[i].get('code'),
			   datatype : result[i].get('datatype')
			};
		}
		return erp.CustomUtil.makeCodtions(recs,fields).cdtions;
	},
	getCdtions : function(){
		var cd1 = this.getFilterPanel().getCdtions();
		var cd2 = this.getcusFilterPanel().getCdtions();
		return cd1.concat(cd2);
	},
	/**
	 * 设置参数输出目标面板
	 */
	setTarget: function(target){
		this.target = target;
	},
	/**
	 * 设置自定义参数面板
	 */
	setCodtionStore: function(cstore){
		this.getcusFilterPanel().getStore().loadData(cstore);
	},
	/**
	 * 设置参数输出目标model
	 */
	setTarModel: function(tarModel,docRec){
		var me = this;
		me.docRec = docRec;
		if(tarModel){
			me.on('afterrender',function(){
				me.codtion = Ext.JSON.decode(tarModel.get('ope'));
				me.tarModel = tarModel;
				me.resultStore.loadData(me.tarModel);
				me.getFreggrid().hide();
				me.getFtblgrid().loadDatabyFreg(me.codtion.reg.freg_id);
				me.initResultName(me.tarModel.get('name'));
				me.initDisplayStyle(me.tarModel.get('default_style'))
			},me);
	    }else{
            me.on('afterrender',function(){
            	 me.tarModel = null;
            	 me.codtion = null;
            	 me.getFreggrid().loadData();
            	 me.initResultName('自定义查询'+" "+(new Date().toLocaleString()));
			},me);
	    }
	},
	initResultName : function(rec){
		return this.getDockedItems('toolbar[dock="top"]')[0].down('#queryName').setValue(rec);
	},
	initDisplayStyle : function(rec){
		var styleP =  this.getDockedItems('toolbar[dock="top"]')[0].down('#displayStyle');
		styleP.setValue(rec);
	},
	getDisplayStyle : function(){
		var styleP =  this.getDockedItems('toolbar[dock="top"]')[0].down('#displayStyle');
	    return styleP.getValue();	
	},
	/**
	 *初始化条件 
	 */
	initCdtions : function(){
		var me = this;
		me.cdtionStore.load({
			params : {l_id : me.tarModel.get('list_id')},
			callback : function(){
				var store = me.cdtionStore;
				
				store.clearFilter(true);
				store.filterBy(function(rec){
					if(rec.get('field_type')=='base'){
						return true;
					}else{
						return false;
					}
				});
				me.getFilterPanel().initCdtions(store.getRange());
				
				store.clearFilter(true);
				store.filterBy(function(rec){
                    if(rec.get('field_type')=='normal'){
                    	return true;
					}else{
						return false;
					}
				});
				me.getcusFilterPanel().initCdtions(store.getRange());
				
				store.clearFilter(true);
			   //store.removeAll();
			}
		});
	},
    //生成FrmFld在fieldNameMap的Id
    generateRecId : function(rec){
    	return rec.get("ff_id")+" "+rec.get("ft_id");
    },
    generateCdtionId : function(rec){
    	return  this.tempMap.get(rec.get('ft_id')).code+"."+rec.get('code');
    },
    //表是否已经被使用
    isUsedTable : function(tableRec,usedRecs){
    	var result = false;
    	for(var i=0;i<usedRecs.length;i++){
    		if(tableRec.get('ft_id')==usedRecs[i].get('ft_id')){
					result = true;
					break;
		     }
    	}
    	return result;
    },
	//选择或取消字段
	moveRecords : function(iSselect,rec){
			this.getFieldCusName(rec);
			if(iSselect){
				this.getFrmflds().removeRec(rec);
				this.getToFrmFld().loadRecs(rec,true);
				this.getcusFilterPanel().resetFilterPanel(rec,true);
			}else{
				this.getToFrmFld().removeRec(rec);
				this.getFrmflds().loadRecs(rec,true);
				this.getcusFilterPanel().resetFilterPanel(rec,false);
			}
	},
	//调整选定的字段的优先顺序
	shiftRecord : function(rec,store,direct,sm){
			var d = 1;
			if(direct=='up'){
				d = -1;
			}else if(direct=='down'){
				d = 1;
			}
			var index = -1;
			store.each(function(tar,tarIndex){
				if(tar.get('ft_id')==rec.get('ft_id')&&tar.get('ff_id')==rec.get('ff_id')){
					index = tarIndex;
					return false;
				}
			});
			if(index+d>-1&&index+d<store.getCount()){
			  store.remove(rec);
			  store.insert(index+d,rec);
			  sm.select(index+d);
			}
	},
	//获取用户自定义的字段名称
	getFieldCusName : function(records){
		var map =  this.fieldNameMap;
		var oldName;
		var newName;
		var id;
		var item;
		for(var i=0;i<records.length;i++){
			id = this.generateRecId(records[i]);
			item = map.get(id);
			oldName = records[i].get('name');
			newName = item?item.get('cusName'):null;
			if(newName){
				records[i].set('name',newName);
				item.set('cusName',oldName);
			}
		}
	},
	//获取已经使用的表名称，类型，主外键
	getSelectTable : function(ftid,selectTable){
		var has = false;
		
		for(var i=0;i<selectTable.length;i++){
			 if(selectTable[i].ft_id == ftid){
				 has = true;
				 break;
			 }
		}
		
		if(!has){
			var map = this.tempMap.get(ftid);
			selectTable[selectTable.length] = {
			    ft_id : ftid,	
			    code :	map.code,
			    type : map.type,
			    key : (map.type == erp.Const.FRMTBL_TYPE_MASTER)?erp.Const.KEY_FIELDCODE:erp.Const.FKEY_FIELDCODE
			    
			}
		}
	},
	//查看选择查询结果
	preview: function(url,param,descs,style){
		erp.report.engine.view.QueryStyle.createStyle(url,param,descs,style);	
	},
	//设置条件筛选界面
	resetFilterPanel : function(config){
		var me = this;
	    me.getFilterPanel().resetFilterPanel(config);
		//me.getcusFilterPanel().resetFilterPanel(config);
		me.initPanelValue(config);
	},
	//清除条件筛选界面
	clearFilterPanel : function(){
		var me = this;
		me.getFilterPanel().clearFilterPanel();
		//me.getcusFilterPanel().clearFilterPanel();
	},
	initPanelValue : function(config){
		var me = this;
		var p1 = me.getFilterPanel();
	//	var p2 = me.getcusFilterPanel();
		var codeType = config.codeType;
	//	var dataType = config.dataType;
		var rec = config.rec;
		
		if(codeType){
		 	  p1.initPanelValue(rec);
		 }
	}
});