Ext.define('erp.report.engine.view.CustomReportSql', {
	extend : 'erp.ux.Panel',
	alias : 'widget.CustomReportSql',
	requires : [ 'erp.common.form.store.FrmRegs' ,
	             'erp.report.engine.view.GridQueryStyle',
		          'erp.report.engine.view.SupacnReportStyle',
		          'erp.report.engine.model.CustomQueryCdtion',
		          'erp.setup.store.ExtDataSource'],
	objStore:[],	          
    initComponent : function(){
		var me = this;
		me.tempMap = Ext.create('Ext.util.HashMap');//用来存ft_id:{}(ft_id对应的表信息)
		me.fieldNameMap = Ext.create('Ext.util.HashMap');//存用户对字段的自定义名
		var fregStore;
//		var sql=Ext.JSON.decode(me.prec.get('ope')).sql;
//		if (!Ext.isEmpty(sql)){
//			var fldData=erp.AnalysisFun.getSQLFields(sql,me.prec.get('dsId'));
//			var data=[]
//			Ext.each(fldData.DATA_FIELDS,function(rec){
//				data.push({type:rec.datatype,name:rec.name,code:rec.code,len:rec.len,prec:rec.prec});
//			});
//			me.objStore=Ext.create('Ext.data.Store',{
//				fields:['type','name','code','len','prec'],
//				data:data
//			});
//		}
		Ext.apply(me,{
			items : [ {
				xtype: 'container',
				itemId:'sql_report',
				layout : 'border',
				defaults : {
					collapsible : true,
					//split : true,
					bodyStyle : 'padding:1px'
				},
				items : [ 
				    {
						itemId:'sql_win',
					    rootVisible: false,
				    	title: 'SQL编辑器',
			    	    region:'west',
			    	    flex: 2 ,
			    	    layout : 'fit',
			    	    items : [
			    	        {
			    	        	xtype     : 'textareafield',
			    	        	itemId:'sql_edit',
			    	            autoScroll: true,
			    	            name      : 'message'
			    	           // , value:'select * from code_type'
			    	            
			    	        }     
			    	    ]
				    },
					{
						title : '自定义筛选条件',
						collapsible : false,
						itemId : 'custFilter',
						region : 'center',
						flex: 1,
						layout : 'fit',
			    	    items : [
			    	        {
								   xtype : 'grid',
								   flex : 3,
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
													 me.down('#customFilter').addEmptyModel(5);
												 },
												 iconCls: 'book_add'
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
														    	使用范围：自定义单据<br/><br/>\
														    	@org,@dept,@position,@me: 代表登入者的组织,部门,职位,loginId<br/><br/>\
														    	@group@org,@group@dept: 代表用户所在群组的组织和部门<br/><br/>\
														    	当对象为时间类型时，时间格式：y-m-d h:s:m<br/><br/>\
														    	过滤条件是报表的限制条件（一定会加上），查询条件，指表报查看时的条件（用户使用才加）'
														}).show();
												 },
												 iconCls: 'book_error'
											}),{
									        	xtype : 'combobox',
									        	fieldLabel: '条件类别',
									        	itemId:'conditionStyle',
									        	store: Ext.create('Ext.data.Store', {
										        	     fields: ['value', 'name'],
										        	     data : [
										        	         {"value":"filterCd", "name":"过滤条件"}
//										        	         ,
//										        	         {"value":"queryCd", "name":"查询条件"}
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
									        			//var rec = me.getToFrmFld().getRecs();
														   var id;
														   var ids = [];
//														   for(var i=0;i<rec.length;i++){
//																  id = me.generateCdtionId(rec[i]);
//																  ids.push(id);
//													       }
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
											    store: me.objStore,
											    queryMode:'local',
											    displayField:'name',
											    valueField:'code',
											    listeners:{
											    	'focus':function(combo){
											    		if (me.down('#sql_edit').isDirty()){
																me.freshConditionStore();								    			
											    		}
											    	}
											    }
//											    lazyRender: true
											})
//										renderer: function(v, meta, rec){
//											var p = me.down('#customFilter');
//											var moldes = me.objStore;
//											var val;
//											for(var i=0;i<moldes.length;i++){
//												if(moldes[i][0]==v){
//													val = moldes[i][1];
//													break;
//												}
//											}
//										    return val?val:v;
//									    }
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
												           {'value':'>=', 'name':'>=','type':'num'},
												           {'value':'<=', 'name':'<=','type':'num'},
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
									  {id:'optValue',text:'值',dataIndex:'opeVal',flex:2,  editor: {}}
								   ],
								   plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
						    	        clicksToEdit: 1,
						    	        listeners:{
						    	        	'beforeedit':function(editor,e){
						    	        		if(e.field=='opeVal')
													me.changeCtl(e.record.get('ft_ff_id'),e);
						    	        	}
						    	        }
						    	   })],
						    	   listeners:{
//							    		   afterrender:function(cmp){
//							    			   cmp.collapse(Ext.Component.DIRECTION_BOTTOM,true);
//							    		   }  
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
									   //var rec = me.getToFrmFld().getRecs();
//									   var id;
//									   var ids = [];
//									   for(var i=0;i<rec.length;i++){
//											  id = me.generateCdtionId(rec[i]);
//											  ids.push(id);
//								       }
									   store.filterBy(
											   function(){
//										    var result = false;
//										    var myid = rec.get('ft_ff_id');
//										    var ope  = rec.get('ope');
//										    var opeVal = rec.get('opeVal');
//										    if(myid&&myid!=""&&(p.isUseful(myid,ids))&&ope&&ope!=""&&opeVal&&opeVal!=""){
//										    	result = true;
//										    }
//										    return result;
										    return true;
									   });
									   var recs = store.getRange();
									   
									   store.clearFilter(true);
									   if(store.getCount()== 0){
										   this.addEmptyModel(5);
									   }
									 //  p.filterStore(ids);
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
					} ,
					{
						title : '执行结果',
						itemId:'select_result',
						region : 'south',
						flex : 1,
						tbar:[
							{
								xtype : 'combobox',
					        	fieldLabel: '展示方式',
					        	itemId:'displayStyle',
					        	store: erp.report.engine.view.QueryStyle.getStyles(),
					        	queryMode: 'local',
					        	displayField: 'name',
					        	valueField: 'value'
							},
							{text: '预览',	iconCls:'preview',     itemId:'docu_preview'}
				        ],
				        layout : 'fit'
					}]
			}
			],
			tbar: [
				{text: '保存',	iconCls:'page_save',     itemId:'docu_save'},
				'|',
				{text: '执行',	iconCls:'sql_exec',     itemId:'docu_add'    },
				{text: '清空',	iconCls:'clear',		itemId:'docu_del'    },
				{
					xtype : 'combobox',
					iconCls:'database_connect',
					fieldLabel: '数据源',
					id:'dataSourse',
					itemId:'dataSourse',
					store: Ext.create('erp.setup.store.ExtDataSource').load(),
					queryMode: 'local',
					fieldWidth:70,
					displayField: 'dsname',
					valueField: 'id',
					margin: '0 0 0 20'
				},
			    {
			      xtype: 'textfield',
			      id: 'queryName',
			      fieldLabel: '模板名称',
			      labelWidth: 60,
			      allowBlank: false,
			      width:300,
			      itemId:'queryName',
			      margin: '0 0 0 10'
			    }
			
			]
		});
		 this.callParent(arguments); 
    },
	setTarModel: function(rec){
		var name1 = this.down('#queryName').setValue(rec.get('name'));
		var name3 = this.down('#displayStyle').setValue(rec.get('default_style'));
		if (rec.get('dsId')!="0"){
			var name4 = this.down('#dataSourse').setValue(rec.get('dsId'));
//			this.down('#custFilter').disable();	
		}	
		if(rec.get('ope')!=''&&rec.get('ope')!=null){
			var name2 = this.down('#sql_edit').setValue(Ext.JSON.decode(rec.get('ope')).sql);
			this.getcusFilterPanel().getStore().loadData(Ext.JSON.decode(rec.get('ope')).data);
		}else{
			var name2 = this.down('#sql_edit').setValue('');
			this.getcusFilterPanel().getStore().loadData('');
		}
	},
	  //同步试图和负责传输的store
    sysncCdtion : function(recs,opeType){
    	var store = this.cdtionStore;
    	if(recs&&recs.length>0){
    		if(opeType == "delete"){
    			for(var i=0;i<recs.length;i++){
//    				if(store.indexOf((recs[i]))>-1){
//    					store.remove(recs[i]);
//    				}
    			}
    		}
    	}
    },
    //刷新ComboBox,Store
    freshConditionStore:function(){
    	var me=this;
    	var sql=me.down('#sql_edit').getValue();
		if (!Ext.isEmpty(sql)){
			var fldData=erp.AnalysisFun.getSQLFields(sql,me.down('#dataSourse').getValue());
			var data=[]
			Ext.each(fldData.DATA_FIELDS,function(rec){
				data.push({type:rec.datatype,name:rec.name,code:rec.code,len:rec.len,prec:rec.prec});
			});
			me.objStore.loadRawData(data);
		}
    },
    //变更值控件类型
    changeCtl:function(value,e){
    	var me=this;
    	var ctl=Ext.getCmp('optValue');
		ctl.renderer='';
		var rec=me.objStore.findRecord('code',value,false,true,true);
		if (!rec){
			ctl.setEditor(new Ext.form.field.Text());
			return;
		}
		switch(rec.get('type')){
				case 'datetime':
				case 'date':
						ctl.setEditor( new Ext.form.field.Date({format:'Y-m-d',value:Ext.Date.format(e.record.get('opeVal'),'Y-m-d')}));
						ctl.renderer=Ext.util.Format.dateRenderer('Y-m-d');
						break;
				case 'integer':		
				case 'decimal':
						ctl.setEditor( new Ext.form.field.Number({allowDecimals: rec.get('prec')>0,decimalPrecision:rec.get('prec'),value:e.record.get('opeVal')}));
						break;
				case 'varchar':
				case 'char':
						ctl.setEditor(new Ext.form.field.Text({maxLength:rec.get('len'),value:e.record.get('opeVal')}));
						break;
				default:
						ctl.setEditor(new Ext.form.field.Text());
					}
			   e.record.set('field_type',rec.get('type'));	
    },
    
    //选择的字段面板
    getToFrmFld: function(){
    	return this.down("#to_FrmFld");
    },
	//自定义条件面板
    getcusFilterPanel: function(){
    	return this.down("#customFilter");
    }
});