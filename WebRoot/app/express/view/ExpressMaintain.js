Ext.define('erp.express.view.ExpressMaintain',{
	extend:'erp.ux.Panel',
	alias:'widget.edt_Express',
	iconCls:'express',
	listeners:{
		/*beforeclose:function(){
			var mes=confirm('真的要关闭此页面吗?');
			return mes;
		}*/
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	},
    requires:['erp.ux.CommonTrigger'], 
	initComponent:function(){
		var me=this;
		me.detailStore=Ext.create('erp.express.store.ExpressDetail');
		me.issueStore=Ext.create('erp.express.store.ExpressIssue');
		me.dsfsStore=Ext.create('erp.express.store.Dsfs'/*,{autoLoad:true}*/);
		 me.salesmanStore=Ext.create('erp.express.store.Salesman');
		 me.salesmanStore.proxy.extraParams.usePaging=false;
		 me.currencyStore=Ext.create('erp.basicdata.currency.store.Currency',{autoLoad:true});
		 me.cityStore2=Ext.create('erp.express.store.City');
		 me.Loadquery_rec=Ext.create('erp.express.model.QueryParams');
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align:'stretch'
			},
			tbar:[{text:'导入',iconCls:'page_gear',itemId:'BTN_CHJHDR'},
					{text:'运费计算',iconCls:'calculator',itemId:'BTN_CAL_FEE',
						handler:function(){
						  
					  }
					},
					'-',
	    			{text:'保存',iconCls:'save',itemId:'BTN_SAVE'},
	    			{text:'关闭',iconCls:'page_error',
	    				handler:function(){
	    					me.close();	
	    				}
	    			}],
			items:[{
			//height:430,
			xtype:'form',
			flex:3,
			bodyPadding: 10,
			autoScroll:true,
			store:me.mainstore,
			layout:'column',
			items:[
				{xtype:'fieldset',title:'基础信息',columnWidth:1,
				layout: 'column',
       			defaults:{labelWidth:70,xtype:'textfield',padding:3},
				items:[
				
				{fieldLabel:'记录编号',name:'jlbh',itemId:'jlbh',columnWidth:.25,disabled:true},
				{fieldLabel:'销售类别',name:'xslb',itemId:'xslb',xtype : 'helpField',allowBlank:false,
					blankText:'请选择销售类别',code : erp.DataConst.SELLKIND,columnWidth:.25,emptyText:'(必填)',	
					fieldConfig:{forceSelection:false},
					listeners:{
							change:function(cbo,value){
								 console.log(cbo)
								 console.log(value)
							 	 me.salesmanStore.load({params:{xslb:value}});
							},
							select:function(obj,recs){
								console.log(recs)
								if(recs.length>0){
									var form=me.down('form').getForm();
									var ywymfield=form.findField('ywym');
									ywymfield.setValue("");																										
								}
							}
						}
				},
				{fieldLabel:'收件单位',name:'sjdw',itemId:'sjdw',columnWidth:.5,
					xtype:'helpField',code:erp.DataConst.RECEIVER,
					allowBlank:false,emptyText:'(必填)',	
					listeners: {
						change:function(obj,value){
							if(obj.displayTplData!=null && !Ext.isEmpty(obj.displayTplData[0] )){
								var form=me.down('form').getForm();	
								var sjdzfield=form.findField('sjdz');
								sjdzfield.setValue(obj.displayTplData[0].sjdz);
							}
							
						},
						select:function(obj,recs){
							if(recs.length>0){
								var form=me.down('form').getForm();
								var sjdzfield=form.findField('sjdz');
								sjdzfield.setValue(recs[0].get('sjdz'));																										
							}
						}
					}
				},
				{fieldLabel:'委托人',name:'wtrm',itemId:'wtrm',columnWidth:.25,
					xtype:'helpField',code:erp.DataConst.OPERATOR_XM,allowBlank:false,emptyText:'(必填)',	
					listeners: {
						change:function(obj,value){
							if(obj.displayTplData!=null && !Ext.isEmpty(obj.displayTplData[0] )){
								var form=me.down('form').getForm();	
								var ssbmfield=form.findField('ssbm');
								ssbmfield.setValue(obj.displayTplData[0].ssbm);
							}
							
						},
						select:function(obj,recs){
							if(recs.length>0){
								var form=me.down('form').getForm();
								var ssbmfield=form.findField('ssbm');
								ssbmfield.setValue(recs[0].get('ssbm'));																										
							}
						}
					}
				},
				{fieldLabel:'委托电话',name:'wtrdh',itemId:'wtrdh',columnWidth:.25,maxLength:20,maxLengthText:'输入范围最大为20个数字！'},
				{fieldLabel:'所属部门',name:'ssbm',itemId:'ssbm',columnWidth:.25,
					readOnly:true,
					fieldStyle:'background:#E6E6E6',
					xtype:'combo',
					displayField:'lbmc',
					valueField:'lbbh',
					store:me.czybmlbbStore					
				},
				{fieldLabel:'收件地址',name:'sjdz',itemId:'sjdz',columnWidth:.25,maxLength:200,maxLengthText:'输入范围最大值为100个汉字或者200个字母、数字！'},
				{fieldLabel : '客户名称',name : 'khbh',itemId : 'khbh',
//						allowBlank:false,emptyText:'(必填)',	
						columnWidth:.25,								
						xtype : 'helpField',
						code : erp.DataConst.CUSTOMER,
						blankText:'请选择客户名称',
						filterParams:{spbj:1,khzt:1},
						winParam:{spbj:1,khzt:1},
						listeners: {
							change:function(obj,value){
								if(obj.displayTplData!=null && !Ext.isEmpty(obj.displayTplData[0] )){
									var form=me.down('form').getForm();	
									//var sjdzfield=form.findField('sjdz');
									//sjdzfield.setValue(obj.displayTplData[0].khdz);
									var dfzhfield=form.findField('dfzh');
									dfzhfield.setValue(obj.displayTplData[0].dfzh);									
								}
								
							},
							select:function(obj,recs){
								if(recs.length>0){
									var form=me.down('form').getForm();
									//var sjdzfield=form.findField('sjdz');
									//sjdzfield.setValue(recs[0].get('khdz'));	
									var dfzhfield=form.findField('dfzh');
									dfzhfield.setValue(recs[0].get('dfzh'));	
								}
							}
						}
				},
				{fieldLabel:'收件人',name:'sjrm',itemId:'sjrm',columnWidth:.25,maxLength:50,maxLengthText:'输入范围最大值为25个汉字或者50个字母、数字！'},
				{fieldLabel:'收件电话',name:'sjrdh',itemId:'sjrdh',columnWidth:.25,maxLength:20,maxLengthText:'输入范围最大为20个数字！'},
				{
					columnWidth:0.25,
					itemId:'ywym',
					name:'ywym',
					xtype:'combo',
					fieldLabel:'业务员',
					displayField:'ywym',
					valueField:'ywybh',
					queryMode: 'local',
					store:me.salesmanStore,
					editable:false,
					//allowBlank:false,//业务员信息允许为空
					//blankText:'请选择业务员',
					listeners:{						
						'expand':function( field,eOpts){
							if(me.salesmanStore.getRange()==0){
								Ext.Msg.alert('提示','请先选择一个销售部门');
							}
						}
					}
				},
				
				{fieldLabel:'递送方式',name:'dsfs',itemId:'dsfs',columnWidth:.25,editable:false,
						allowBlank:false,emptyText:'(必填)',
						xtype:'combo',
						displayField:'display',
						valueField:'cid',
						queryMode:'local',
						store:me.dsfsStore
					},
				{fieldLabel:'箱数',name:'dsxs',itemId:'dsxs',xtype:'numberfield',columnWidth:.25,maxValue:9999999.99,maxValueText:'输入范围最大值为9999999.99'},
				{fieldLabel:'出运编号',name:'cybh',itemId:'cybh',columnWidth:.25,
					xtype : 'helpField',
					fieldConfig:{forceSelection:false},
					code : erp.DataConst.IMPORTCYJH2			
				},
				{fieldLabel:'申请日期',name:'sqrq',itemId:'sqrq',xtype:'datefield',columnWidth:.25},
				{fieldLabel:'付费方式',name:'fffs',itemId:'fffs',columnWidth:.25,xtype:'combo',
					allowBlank:false,emptyText:'(必填)',editable:false,
					store:[[1,'预付'],
							[3,'第三方付款'],
							[4,'垫付'],
							[5,'客户到付'],
							[6,'我司到付']],
					listeners:{						
						'change':function( field,nv,ov){
							var form=me.down('form').getForm();
							var dfzhfield=me.down('form').down('#dfzh');
							var fphmfield=form.findField('fphm');
							if(nv!=5){
								dfzhfield.setReadOnly(true);
								dfzhfield.setFieldStyle('background:#E6E6E6');
							}else{
								dfzhfield.setReadOnly(false);
								dfzhfield.setFieldStyle('background:#ffffff');
							}
						}
					}
				},
				{fieldLabel:'到付账号',name:'dfzh',itemId:'dfzh',columnWidth:.25,maxLength:40,maxLengthText:'输入范围最大值为20个中文或者40个英文、数字！'},
				{fieldLabel:'快递公司',name:'csbh',itemId:'csbh',columnWidth:.5,
					code:erp.DataConst.FACTORYINFO,xtype : 'helpField',
					winParam:{cslx:'快递',gdbj:0,spbj:1},filterParams:{cslx:'快递',gdbj:0,spbj:1},
					allowBlank:false,emptyText:'(必填)'/*,	
					listeners: {
							change:function(obj,value){
								if(obj.displayTplData!=null && !Ext.isEmpty(obj.displayTplData[0] )){
									var form=me.down('form').getForm();	
									var wbbhfield=form.findField('wbbh');
									var wbbh=obj.displayTplData[0].wbbh;
									wbbhfield.setValue(wbbh);	
									
									var bool=(wbbh==null || wbbh=='');
									var wbfyfield=form.findField('wbfy');								
									wbfyfield.setReadOnly(bool);
									wbfyfield.setFieldStyle(bool?'background:#E6E6E6':'background:#ffffff');
									var wbhlfield=form.findField('wbhl');
									wbhlfield.setReadOnly(bool);
									wbhlfield.setFieldStyle(bool?'background:#E6E6E6':'background:#ffffff');
									if(!bool){
										//获取操作时间点所有效的汇率并折算本币金额
										var rateDay=new Date();								
										var result=erp.Const.callServiceMethodSync('crm/exchangerate.crm?method=getExchangeRateList',
												{wbbh:wbbh,nf:rateDay.getFullYear(),yf:rateDay.getMonth()+1});
										if (result.data.length>0){
											var wbhl=result.data[0].wbhl;
											wbhlfield.setValue(wbhl);
											var dsfy=form.findField('dsfy').getValue();
											if(dsfy>0){
												var wbfy=Ext.util.Format.round(parseFloat(dsfy)*parseFloat(wbhl),2);
												wbfyfield.setValue(wbfy);
											}
											
										}																	
									}
								}
								
							},
							select:function(obj,recs){
								if(recs.length>0){
									var form=me.down('form').getForm();
									var wbbhfield=form.findField('wbbh');
									var wbbh=recs[0].get('wbbh');
									wbbhfield.setValue(wbbh);
									
									var bool=(wbbh==null || wbbh=='');
									var wbfyfield=form.findField('wbfy');								
									wbfyfield.setReadOnly(bool);
									wbfyfield.setFieldStyle(bool?'background:#E6E6E6':'background:#ffffff');
									var wbhlfield=form.findField('wbhl');
									wbhlfield.setReadOnly(bool);
									wbhlfield.setFieldStyle(bool?'background:#E6E6E6':'background:#ffffff');
									if(!bool){
										//获取操作时间点所有效的汇率并折算本币金额
										var rateDay=new Date();								
										var result=erp.Const.callServiceMethodSync('crm/exchangerate.crm?method=getExchangeRateList',
												{wbbh:wbbh,nf:rateDay.getFullYear(),yf:rateDay.getMonth()+1});
										if (result.data.length>0){
											var wbhl=result.data[0].wbhl;
											wbhlfield.setValue(wbhl);
											var dsfy=form.findField('dsfy').getValue();
											if(dsfy>0){
												var wbfy=Ext.util.Format.round(parseFloat(dsfy)*parseFloat(wbhl),2);
												wbfyfield.setValue(wbfy);
											}
											
										}																	
									}
								}
							}
						}*/
				},
				{fieldLabel:'快递方式',name:'kdlx',itemId:'kdlx',columnWidth:.25,editable:false,
					xtype:'combo',store:[['寄件','寄件'],['寄单','寄单'],['其他','其他']],
					allowBlank:false,emptyText:'(必填)',
					listeners:{						
						'change':function( field,nv,ov){
							var form=me.down('form').getForm();
							var cybhfield=me.down('form').down('#cybh');
							var fphmfield=form.findField('fphm');
							if(me.firstload)
							{if(nv=='寄单'){
								cybhfield.setReadOnly(true);
								cybhfield.getField().setFieldStyle('background:#E6E6E6');
								cybhfield.setValue(null);
								fphmfield.setReadOnly(false);
								fphmfield.setFieldStyle('background:#ffffff');
							}else if(nv=='寄件'){
								cybhfield.setReadOnly(me.issueStore.getRange().length>0);//出运明细不为空
								cybhfield.getField().setFieldStyle(me.issueStore.getRange().length>0?'background:#E6E6E6':'background:#ffffff');
								fphmfield.setReadOnly(true);
								fphmfield.setFieldStyle('background:#E6E6E6');
								fphmfield.setValue(null);
							}else{
								cybhfield.setReadOnly(me.issueStore.getRange().length>0);//出运明细不为空
								cybhfield.getField().setFieldStyle(me.issueStore.getRange().length>0?'background:#E6E6E6':'background:#ffffff');
							}
							}else{
							me.firstload = true;
							}
							me.down('#BTN_CHJHDR').setDisabled(nv!='寄单');
						}
					}
				},
				{fieldLabel:'发票号码',name:'fphm',itemId:'fphm',maxLength:20,columnWidth:.25,xtype:'combo',typeAhead:false,
					enableKeyEvents:true, 
					triggerCls: 'x-form-search-trigger',
					listeners:{
    	                expand:function(){
    	                	var win =Ext.create('erp.express.view.LoadToSend');
    	                	win.down('#btn_query').on({
    	                		click:function(btn){
    	                			var win=Ext.create('erp.express.view.TdfdQuery',{
										itemId:'tdfdQueryWin',
										mainstore:btn.up('window').store,
										mainview:btn.up('window'),
										rec:me.Loadquery_rec
									});
									win.show();
    	                		}
    	                	})
    	                	win.down('#grdTdfd').on({
    	                		itemdblclick:function(v,r){
    	                			me.down('#fphm').setValue(r.get('cybh'));
    	                			win.close();
    	                		}
    	                	})
    	                	win.down('#btn_confirm').on({
    	                		click:function(btn){
    	                			var grid=win.down('#grdTdfd');
    	                			var recs=grid.getSelectionModel().getSelection();
    	                			if(recs.length>0){
    	                				var fphm='';
    	                				for(var i=0;i<recs.length;i++){
    	                					if(i!=0){
    	                						fphm+=',';
    	                					}
    	                					fphm+=recs[i].get('cybh');
    	                				}
    	                				me.down('#fphm').setValue(fphm);
    	                				win.close();
    	                			}else{
    	                				Ext.Msg.alert('提示','请至少选择一条记录！');
    	                			}
    	                		}
    	                	})
		   	  	  			win.show();
    	                }
					}},
				{fieldLabel:'单据类型',name:'djlx',itemId:'djlx',columnWidth:.25,editable:false,allowBlank:false,emptyText:'(必填)'
				,xtype:'combo',store:[
				['',''],
				['整套正本单据','整套正本单据'],
				['1/3套正本单据','1/3套正本单据'],
				['1/3提单','1/3提单'],
				['正本发票','正本发票'],
				['产地证正本','产地证正本'],
				['除提单外其他单据','除提单外其他单据'],
				['其他副本单据','其他副本单据']]
				},
				{fieldLabel:'快递员',name:'kdry',itemId:'kdry',columnWidth:.25,maxLength:8,maxLengthText:'输入范围最大值为4个汉字或者8个英文、数字！'},				
				{fieldLabel:'寄件单号',name:'sjdh',itemId:'sjdh',allowBlank:false,emptyText:'(必填)',columnWidth:.5,maxLength:35,maxLengthText:'输入范围最大值为20个汉字或者40个英文、数字！'},
				{fieldLabel:'寄件日期',name:'sjrq',itemId:'sjrq',xtype:'datefield',columnWidth:.25},
				{fieldLabel:'要求寄件',name:'jjrq',itemId:'jjrq',xtype:'datefield',columnWidth:.25},
				{fieldLabel:'备注说明',name:'dsyq',itemId:'dsyq',columnWidth:.75,maxLength:200,maxLengthText:'输入范围最大值为100个汉字或者200个英文、数字！'},
				{fieldLabel:'寄件地',name:'sendloc',itemId:'sendloc',columnWidth:.25,forceSelection:true,allowBlank:false,emptyText:'(必填)',
					xtype:'combo',store:[['杭州','杭州'],['德清西区','德清西区'],['德清东区','德清东区']]
				},
				{fieldLabel:'国内外',name:'gjgn',itemId:'gjgn',columnWidth:.25,editable:false			
					,xtype:'combo',allowBlank:false,
					store:[
					[2,'国内'],
					[1,'国际']],
					listeners:{						
						'change':function( field,nv,ov){
							var form=me.down('form').getForm();
							var provincefield=me.down('form').down('#province');
							var cityfield=me.down('form').down('#city');
							var yjddsjfield=me.down('form').down('#yjddsj');
							var gbdqfield=me.down('form').down('#gbdq');
							if(nv==1){								
								provincefield.hide();
								provincefield.setValue(null);
								cityfield.setValue(null);
								
								yjddsjfield.setReadOnly(false);
								yjddsjfield.setFieldStyle('background:#ffffff');
								gbdqfield.show();
								if(gbdqfield.getValue()=='CHINA'){
									gbdqfield.setValue(null);
								}
							}else if(nv==2){								
								provincefield.show();
								
								yjddsjfield.setValue(null);
								yjddsjfield.setReadOnly(true);
								yjddsjfield.setFieldStyle('background:#E6E6E6');
								gbdqfield.hide();
								gbdqfield.setValue('CHINA');
							}
							
						}
					}
				},
				{fieldLabel:'递送国别',name:'gbdq',itemId:'gbdq',columnWidth:.25,
					xtype:'helpField',code:erp.DataConst.SYSPARAM,
					/*allowBlank:false,emptyText:'(必填)',*/	
					filterParams:{mjbh:'0807'},winParam:{mjbh:'0807'}
				},
				{fieldLabel:'省份',name:'province',itemId:'province',columnWidth:.25,
					xtype:'combo',
					displayField:'name',
					valueField:'id',
					queryMode:'local',
					store:me.provinceStore
				},
				{fieldLabel:'市',name:'city',itemId:'city',columnWidth:.25,hidden:true,
					xtype:'combo',
					displayField:'name',
					valueField:'id',
					queryMode:'local',
					store:me.cityStore2,
					listeners:{						
						'expand':function( field,eOpts){
							if(me.cityStore2.getRange()==0){
								Ext.Msg.alert('提示','请先选择一个省');
							}
						}
					}
				},
				{fieldLabel:'要求到达',name:'yjddsj',itemId:'yjddsj',xtype:'datefield',columnWidth:.5}
				]},
				{xtype:'fieldset',title:'结算信息',columnWidth:1,
					 defaultType: 'numberfield',
       				 layout: 'column',
       				 defaults:{padding:3,labelWidth:60},
					items:[{fieldLabel:'重量(kg)',name:'ypzl',itemId:'ypzl',columnWidth:.2,decimalPrecision :3,maxValue:'999999999.999'},
							  {fieldLabel:'递送费用',name:'dsfy',itemId:'dsfy',columnWidth:.2,maxValue:'9999999999.99',disabled:me.rec.get('ydfy')>0?true:false},
							 /* {fieldLabel:'外币费用',name:'wbfy',itemId:'wbfy',columnWidth:.2,readOnly:true,editable:false,maxValue:'9999999999.99'},
							  {fieldLabel:'币种',name:'wbbh',itemId:'wbbh',columnWidth:.2,readOnly:true,
							  		xtype:'combo',
									displayField:'wbdh',
									valueField:'wbbh',
									store:me.currencyStore
							  },
							  {fieldLabel:'汇率',name:'wbhl',itemId:'wbhl',columnWidth:.2,decimalPrecision :6,readOnly:true,editable:false,maxValue:'9999.999999',
							  		listeners:{						
										'change':function( field,nv,ov){
											var form=me.down('form').getForm();
											var dsfy=form.findField('dsfy').getValue();
											if(dsfy>0){
												var wbfy=Ext.util.Format.round(parseFloat(dsfy)*parseFloat(nv),2);
												var wbfyfield=form.findField('wbfy');
												wbfyfield.setValue(wbfy);
											}
											
										}
									}
							  },*/
							  
							  {fieldLabel:'计费重量',name:'jfzl',itemId:'jfzl',columnWidth:.2,decimalPrecision :3,maxValue:'9999999.999',disabled:me.rec.get('ydfy')>0?true:false},
							  {fieldLabel:'体积',name:'tj',itemId:'tj',columnWidth:.2,decimalPrecision :4,maxValue:'9999.9999'},
							  {fieldLabel:'预计费用',name:'yjyf',itemId:'yjyf',columnWidth:.2,decimalPrecision :2,maxValue:'99999999.99'},
							  {fieldLabel:'备注说明',name:'bzsm',itemId:'bzsm',xtype:'textfield',columnWidth:1,maxLength:255,maxLengthText:'输入范围最大值为127个汉字或者255个英文、数字！'}
							  ]
				
				}
			]},{xtype:'splitter'},{
					xtype:'tabpanel',
					flex:3,
					items:[{
						xtype:'grid',
						itemId:'grdExpressDetail',
						title:'递送明细',
						selModel:Ext.create('Ext.selection.CheckboxModel'),
						tbar:[{text:'增加',iconCls:'page_add',itemId:'btn_Expressdetaill_add'},
							{text:'删除',iconCls:'page_delete',itemId:'btn_Expressdetaill_del',disabled:true}
						],
						features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
						columns:[{
							header:'',xtype:'rownumberer',width:25
						},
							{header:'收费',dataIndex:'sfbj',width:40,renderer:function(v){
									return v==1?'是':'否';
								},
								field:{
				   	  	  			xtype:'combo',
				   	  	  			store:[['1','是'],['2','否']]
				   	  	  		},
				   	  	  		summaryType: 'count',
				   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }
							},
							{header:'序号',dataIndex:'jlxh',flex:1},
							{header:'产品编号',dataIndex:'cpbh',width:40,hidden:true},
							{header:'产品名称',dataIndex:'cpmc',flex:2
								,field:{
				   	  	  			xtype : 'commonTrigger',
									flex:1,
									name : 'cpmc',
									itemId : 'cpmc',
									selModel:'MULTI',
									cusConfig:{
									/*type:'Production',*/
									field:'cpmc',
									indexNum:4,
									callback:function(v,rec,recs){
										me.cpmcCallback(v,rec,recs);
									}
								},
								win:'erp.express.view.ProductionCombo'
				   	  	  		}
							},
							{header:'单位',dataIndex:'jldw',flex:1,field:{}},
							{header:'数量',dataIndex:'ypsl',flex:1,xtype:'numbercolumn'
								,summaryType: 'sum',
				   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },renderer:function(v){
					            	return Ext.util.Format.number(v,'0,000');
					            }
							},
							{header:'实发数量',dataIndex:'sfsl',flex:1,xtype:'numbercolumn',
								summaryType: 'sum',
				   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
					            renderer:function(v){
					            	return Ext.util.Format.number(v,'0,000');
					            }},
							{header:'制作号',dataIndex:'zzhm',flex:1,field:{}},
							{header:'打样号',dataIndex:'dyy',flex:1},
							{header:'订单号',dataIndex:'ddh',flex:1}
							],
							store:me.detailStore,
					    	plugins:Ext.create('Ext.grid.plugin.CellEditing', {
								        clicksToEdit : 2,
								        autoCancel: false,
								        itemId:'cellEditing',
								        listeners: {
								           edit:function(editor,con,e){
								           }
								        }
					        }),
					        listeners: {
								selectionchange: function(grid, rec) {
									if (rec.length>0){
										me.down('#btn_Expressdetaill_del').setDisabled(false);
									 }else{
									 	me.down('#btn_Expressdetaill_del').setDisabled(true);
									 }
								}
							}
					},{
						xtype:'grid',
						itemId:'grdIssueDetail',
						title:'寄单明细',
						selModel:Ext.create('Ext.selection.CheckboxModel'),
						tbar:[{text:'增加',iconCls:'page_add',itemId:'btn_Issuedetaill_add'},
							{text:'删除',iconCls:'page_delete',itemId:'btn_Issuedetaill_del',disabled:true}
						],
						columns:[
							{header:'',xtype:'rownumberer',width:25},
							{header:'序号',dataIndex:'jlxh',width:40},
							{header:'出运编号',dataIndex:'cybh',width:80,field:{}},
							{header:'出货日期',dataIndex:'chrq',width:100,xtype:'datecolumn',format:'Y-m-d',
								field:{
									xtype: 'datefield',
									format:"Y-m-d"
								}
							},
							{header:'开船日期',dataIndex:'kcrq',width:100,xtype:'datecolumn',format:'Y-m-d',
								field:{
									xtype: 'datefield',
									format:"Y-m-d"
								}
							},
							{header:'议付金额',dataIndex:'yfje',width:100,xtype:'numbercolumn',field:{}}
							],
							store:me.issueStore,
					    	plugins:Ext.create('Ext.grid.plugin.CellEditing', {
								        clicksToEdit : 1,
								        autoCancel: false,
								        itemId:'cellEditing2',
								        listeners:{
								        	 'edit' :function(editor, e){
								        		rec=e.record;
								        		console.log(rec)
								        		switch (e.field){
								        			case 'cybh':
								        			var cybh=rec.get('cybh');
								        			console.log(cybh.length)
								        			if(cybh.length==6){
								        				if(cybh==null||cybh==''){
								        				cybh='1';
									        			}
									        			var result=erp.Const.callServiceMethodSync('es/express.crm?method=getExpShipList',
														{cybh:cybh});
														var m=result.data[0];
														if(m!=null){
															rec.set('chrq',m['chsj']);
															rec.set('kcrq',m['kcrq']);
															rec.set('yfje',m['yfje']);
															if(e.rowIdx==0){
																me.down('#khbh').setValue(m['khbh']);
																me.down('#sjdz').setValue(m['khdz']);
																me.down('#dfzh').setValue(m['dfzh']);
															}
														}
								        			}else{
								        				alert('请输入6位数出运编号，不足6位前面补零！')
								        			}								        			
								        			break;
								        		}
								        	}
								        }
					        }),
					        listeners: {
								selectionchange: function(grid, rec) {
									if (rec.length>0){
										me.down('#btn_Issuedetaill_del').setDisabled(false);
									 }else{
									 	me.down('#btn_Issuedetaill_del').setDisabled(true);
									 }
								}
							}
					}]
				}]
			
			});
		me.callParent(arguments);
		
	},
	//加载数据,页面初始化
	loadData:function(rec,old_jlbh){
		var me=this;
		me.firstload = false;
		console.log(rec)
		me.down('form').loadRecord(rec);
		if(!Ext.isEmpty(old_jlbh)){
			if(!me.isCopy){//不是复制
				me.detailStore.load({params:{jlbh:old_jlbh}});
				me.issueStore.load({
					params:{jlbh:old_jlbh},
					callback: function(records, operation, success) {			        							 	
//		 				me.updatecybhstatus();
					}
				});
			}else{//是复制
//				me.detailStore.load({params:{jlbh:-1}});
//				me.issueStore.load({
//					params:{jlbh:-1}
//				});
				//不需要复制明细20150901wq
				/*var detailarray=erp.Const.callServiceMethodSync('es/express.crm?method=getExpressDetailList',
						{jlbh:old_jlbh}).data;
				for(var i=0;i<detailarray.length;i++){
					var newrec=Ext.create('erp.express.model.ExpressDetail',detailarray[i]);
					newrec.set('jlbh',null);
					me.detailStore.add(newrec);
				}	
				var issuearray=erp.Const.callServiceMethodSync('es/express.crm?method=getExpressIssueList',
						{jlbh:old_jlbh}).data;
				for(var i=0;i<issuearray.length;i++){
					var newrec=Ext.create('erp.express.model.ExpressIssue',issuearray[i]);
					newrec.set('jlbh',null);
					me.issueStore.add(newrec);
				}*/
			}			
		}
		//按钮控制
		var form=me.down('form');
		if(me.isCopy){
			//do nothing
		}else if(me.isAdd){
			//do nothing
			me.down('#BTN_CHJHDR').setDisabled(true);
		}else if(me.isEdit){
			 var gdbj=rec.get('gdbj');
			 var qfbj=rec.get('qfbj');
			 var sdbj=rec.get('sdbj');
			 if(gdbj /*|| qfbj || sdbj*/){
			 	me.down('#BTN_SAVE').setDisabled(true);
			 }
			 if(rec.get('kdlx')!='寄单'){
			 	me.down('#BTN_CHJHDR').setDisabled(true);
			 }
		}
		var cityfield=form.getForm().findField('city');
		if(rec.get('city')==0){
			cityfield.setValue("");	
		}
		var provincefield=form.getForm().findField('province');
		if(rec.get('province')==0){
			provincefield.setValue("");	
		}
		var gjgnfield=form.getForm().findField('gjgn');
		var yjddsjfield=form.getForm().findField('yjddsj');
		console.log(gjgnfield)
		console.log(yjddsjfield)
		var gbdqfield=me.down('form').down('#gbdq');
		if(/*rec.get('gbdq')!='CHINA' || */rec.get('gjgn')==1){//国际
			gbdqfield.show();			
			gjgnfield.setValue(1);
			provincefield.hide();
			yjddsjfield.setReadOnly(false);
			yjddsjfield.setFieldStyle('background:#ffffff');
		}else{//国内
			gbdqfield.hide();
			gjgnfield.setValue(2);
			provincefield.show();
			yjddsjfield.setReadOnly(true);
			yjddsjfield.setFieldStyle('background:#E6E6E6');
		}
		//付费方式，控制到付账号
		var dfzhfield=form.getForm().findField('dfzh');
		if(rec.get('fffs')!=5){
			dfzhfield.setReadOnly(true);
			dfzhfield.setFieldStyle('background:#E6E6E6');
		}else{
			dfzhfield.setReadOnly(false);
			dfzhfield.setFieldStyle('background:#ffffff');
		}
		//shgadd20150908,快递方式，控制出运编号,发票号码编辑状态
		var cybyfield=form.getForm().findField('cybh');
		var fhhmfield=form.getForm().findField('fphm');
		if(rec.get('kdlx')!='寄单'){
			cybyfield.setReadOnly(false);
			cybyfield.setFieldStyle('background:#ffffff');
		}else{
			cybyfield.setReadOnly(true);
			cybyfield.setFieldStyle('background:#E6E6E6');
		}
		if(rec.get('kdlx')!='寄件'){
			fhhmfield.setReadOnly(false);
			fhhmfield.setFieldStyle('background:#ffffff');
		}else{
			fhhmfield.setReadOnly(true);
			fhhmfield.setFieldStyle('background:#E6E6E6');
		}		
	}, 
	resetsomeinfo:function(){
		var me=this;
		var rec=me.issueStore.first();
		if(Ext.isEmpty(rec)){
			return;
		}
		var cybh=rec.get('cybh');
		var khxx_rec=erp.Const.callServiceMethodSync('es/express.crm?method=getKhxxBycybh',{
		    	cybh:cybh
		 }).data;
		 var form=me.down('form').getForm();
		 var khbhfield=form.findField('khbh');
//		 var sjdzfield=form.findField('sjdz');//因为监听函数里面有同样的设置
//		 var dfzhfield=form.findField('dfzh');
		 if(!Ext.isEmpty(khxx_rec)){
		 	khbhfield.setValue(khxx_rec.khbh?khxx_rec.khbh:null);
//			sjdzfield.setValue(khxx_rec.khdz?khxx_rec.khdz:'');			
//			dfzhfield.setValue(khxx_rec.dfzh?khxx_rec.dfzh:'');	
		 }
		 
	},
	updatecybhstatus:function(){
		var me=this;
		var form=me.down('form').getForm();
		var _records=me.issueStore.getRange();		        	
		var cybhfield=form.findField('cybh');
		console.log(_records.length>0);
		console.log(cybhfield);
		cybhfield.setReadOnly(_records.length>0);
		cybhfield.setFieldStyle(_records.length>0?'background:#E6E6E6':'background:#ffffff');
	},
	 cpmcCallback : function(v,rec,recs){
        var me = this;
	    var grid = me.down('#grdExpressDetail');
	    var srec = grid.getSelectionModel().getSelection()[0];
	    console.log(rec.get('cpmc'))
	    console.log(rec.get('cpbh'))
	    srec.set('cpmc',rec.get('cpmc'));
	    srec.set('cpbh',rec.get('cpbh'));
	 }   
});