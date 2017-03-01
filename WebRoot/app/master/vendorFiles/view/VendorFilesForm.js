//新增厂商表单
Ext.define('erp.master.vendorFiles.view.VendorFilesForm',{
     extend : "Ext.form.Panel",
     alias : 'widget.edt_vendorfilesform',
     plugins : {
		ptype : 'FormKey'
	},
	initComponent : function() {
		var me = this;
		me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
		me.argColumns=erp.Util.getColumns(me.argStore.getModel());
		var canEdit = !(me.isAdd || me.isEdit);
	Ext.apply(me, {
			defaults : {
				xtype : 'textfield',
				labelAlign : 'right',
				anchor : '95%',
				labelWidth : 100,
				labelStyle : 'font-weight:bold',
				msgTarget : 'side',
				autoFitErrors : true,
				autoScroll: true
			},
			layout : {
				type : 'hbox',/*
								 * 此布局是将所有子组件在容器中水平排列.
								 * 此布局会选择性将可用的水平空间分配给包含'flex'数值的子组件.
								 * 此布局也可以通过给子组件配置align参数的方式来设置高度.
								 */
				align : 'stretch',
				padding : 5
			},
			items : [{
				flex : 1,
				xtype : 'container',
				layout : {
					type : 'vbox',
					align : 'stretch',
					padding : '0 5 0 0',
					autoScroll : true
				},
				items : [{
					flex : 1,
					xtype : 'fieldset',
					title : '基础信息',
					autoScroll: true,
					defaults : {
						xtype : 'container',
						layout : {
							type : 'hbox',
							align : 'stretch'
						},
					   defaults : {
							anchor : '95%',
							labelWidth : 80,
							padding : '10 5 0 0',
							xtype : 'textfield',
							readOnly : canEdit
						}
					},
				   //厂商信息
					items : [{
							  items : [{    
	                          flex : 2,
	                          itemId: 'csbh',
	                          name: 'csbh',
	                          fieldLabel : '厂商编号',
	                          xtype : 'textfield'
	                        },{
	                           flex : 1,
	                           itemId: 'hggf',
	                           name: 'hggf',
	                           xtype: 'combo',
	                           fieldLabel : '合格供方',
	                           store : [[1,'是'],[2,'否']]
	                        }]
							}, {
							 items : [{
	         		         flex : 1,
	         	             itemId : 'csjc',
	         	             name: 'csjc',
	         	             fieldLabel : '厂商简称'
	         	          },{
	         	             flex : 1,
	         	             itemId : 'cslx',
	         	             name : 'cslx',
	         	             xtype : 'combo',
	         	             fieldLabel : '厂商类型',
	         	             store : [[1,'厂商'],[2,'货代'],[3,'快递'],[4,'运输公司']]
	         	         }]
							}, {
							 items : [{
	                         itemId : 'csmc',
	                         name: 'csmc',
	                         fieldLabel : '厂商名称',
	                         allowBlank : false,
	                         blankText : '厂商名称不能为空'
	                      }]
							}, {
							items : [{
	                        itemId : 'ywmc',
	                        name: 'ywmc',
	                        fieldLabel : '英文名称',
					        allowBlank : false,
					        blankText : '名称不能为空'					      
	                        }]
							}, {	
						    items : [{
	                        flex : 1,
	                        itemId : 'hzcs',
	                        name : 'hzcs',
	                        fieldLabel : '汇总厂商',
	                        xtype:'selectfield',
	                       openconfig:{
	                            modal:true,
					            title:'参数选取',
					            singleSelect:true,
					            editable:true,
					            diaplayField:'csmc',
					            valueField:'csmc',
					            insert:true,
					            width:500,
					            height:600,
					            columns:me.argColumns,
					            store:me.argStore
	                          }
	                         }]
							}]
				}, {
					flex : 2,
					xtype : 'fieldset',
					title : '业务信息',
					autoScroll: true,
					defaults : {
						xtype : 'container',
						layout : {
							type : 'hbox',
							align : 'stretch'
						},
						defaults : {
							anchor : '95%',
							labelWidth : 80,
							padding : '10 5 0 0',
							xtype : 'textfield',
							readOnly : canEdit
						}
					},
					items : [{
								items : [{
	                              flex : 1,
	                              itemId : 'cslb',
	                              name : 'cslb',
	                              xtype : 'combo',
	                              fieldLabel : '客户状态',
	                              store : []
	                       },{
	                              flex : 1,
	                              itemId : 'fzrq',
	                              name : 'fzrq',
	                              xtype : 'datefield',
	                              fieldLabel : '发展日期'
	                       }]
							}, {
								items : [{
	                             flex : 4,
	                             itemId : 'fkts',
	                             name : 'fkts',
	                             xtype : 'textfield',
	                             fieldLabel : '付款天数'
	                              },{
	                              flex:1,	
	                              xtype : 'displayfield',
                                  id:'dw',
                                  value : "天"
	                              },{
	                  	         flex : 4,
	                  	         itemId : 'xxed',
	                  	         name : 'xxed',
	                  	         xtype : 'textfield',
	                  	         fieldLabel : '信用额度'
	                             },{
	                              flex:1,	
	                              xtype : 'displayfield',
                                  id:'dwt',
                                  value : "万"
	                              }]
							}, {
								items : [{
	                 	        flex : 1,
	                 	        xtype : 'checkbox',
	                 	        itemId : 'wbhs',
	                 	        name : 'wbhs',
	                 	        fieldLabel : '外币核算',
	                 	        listeners:{
	                 	        'change' : function(obj,value){
	                 	          if(value){
                                   me.down('#csbz').setDisabled(false);	                 	        
	                 	            }
	                 	          else{
	                 	          me.down('#csbz').setDisabled(true);
	                 	          }  
	                 	           }
	                 	        }
	                              },{
	                 	         flex : 2,
	                 	         itemId : 'csbz',
	                 	         name: 'csbz',
	                             xtype : 'textfield',
	                             fieldLabel : '币种',
	                             disabled:true
	                             },{
	                 	        flex : 3,
	                 	        itemId : 'wbdh',
	                 	        name : 'wbdh',
	                 	        xtype : 'textfield',
	                 	        fieldLabel : '外币代号'
	                             }]
							}, {
								items :[{
							   flex :1,		
	                           xtype : 'textfield',
	                           itemId : 'dykh',
	                           name : 'dykh',
	                           fieldLabel : '对应客户'
	                           }] 
							}, {
					            items:[{
	                           xtype : 'combo',	
	                           itemId : 'zgrd',
	                           name : 'zgrd',
	                           fieldLabel : '资格认定',
	                           store : [['','船公司'],['','无船承运人'],['','非无船承运人']] 
	                      },{
	                            xtype : 'combo',	
	                            itemId : 'tdrd',
	                            name : 'tdrd',
	                            fieldLabel : '提单认定',
	                            store : [['','船公司提单'],['','无船承运人提单'],['','非无船承运人提单']] 
	                            }]				
							}, {
								items : [{
	                            xtype : 'combo',
	                            itemId : 'hdxz',
	                            name : 'hdxz',
	                            fieldLabel : '货代性质'
	                             },{
	                            xtype : 'textfield',
	                            ItemId : 'xdbl',
	                            name : 'xdbl',
	                            fieldLabel : '信贷比例'
	                              }]
							}, {
								items : [{
	                            flex : 1,
	                            itemId : 'hddw',
	                            name : 'hddw',
	                            fieldLabel : '还贷单位',
	                            xtype:'selectfield',
	                            openconfig:{
	                              modal:true,
					              title:'参数选取',
					              singleSelect:true,
					              editable:true,
					              diaplayField:'csmc',
					              valueField:'csmc',
					              insert:true,
					              width:500,
					              height:600,
					              columns:me.argColumns,
					              store:me.argStore
	                             }
	                             }] 
							}, {
							    items : [{
							   flex:1, 	
	                           xtype:'textareafield',
	                           itemId : 'fktj',
	                           name : 'fktj',
	                           fieldLabel : '付款条件'
	                             }]
							}]
				}]
			}, {
				flex : 1,
				xtype : 'container',
				autoScroll: true,
				layout : {
					type : 'vbox',
					align : 'stretch',
					padding : '0 5 0 0'
				},
				items : [{
							flex : 3,
							xtype : 'fieldset',
							title : '联系方式',
							autoScroll: true,
							defaults : {
								anchor : '95%',
								labelWidth : 80,
								margins : '10 5 0 0',
								xtype : 'textfield',
								readOnly : canEdit
							},
				  items : [{
					    name : 'csdz',
					    itemId : 'csdz',
					    fieldLabel : '地址'
					},{
						name : 'csdh',
				        itemId : 'csdh',
						fieldLabel : '电话'
					},{
						name : 'cscz',
						itemId : 'cscz',
						fieldLabel : '传真'
					}, {
						name : 'lxrm',
						itemId : 'lxrm',
						fieldLabel : '联系人'
					}, {
						name : 'csyb',
						itemId : 'csyb',
						fieldLabel : '邮编'
					},{
					    name : 'khyh',
					    itemId : 'khyh',
					    fieldLabel : '开户银行'
					},{
						name : 'yhzh',
						itemId : 'yhzh',
						fieldLabel : '银行账号'
					},{
						name : 'cssh',
						itemId : 'cssh',
						fieldLabel : '税号'
					}]
						}, {
							flex : 2,
							xtype : 'fieldset',
							title : '其它资料',
							autoScroll: true,
							defaults : {
								xtype : 'container',
								layout : {
									type : 'hbox',
									align : 'stretch'
								},
								defaults : {
									anchor : '95%',
									labelWidth : 120,
									padding : '10 5 0 0',
									xtype : 'textfield',
									readonly : canEdit
								}
							},
							items : [{
								items : [{
											flex : 1,
											xtype : 'textareafield',
											itmeId : 'bzsm',
											name : 'bzsm',
											fieldLabel : '备注说明'
										}]
							}]
						}]
			}]
		});
		this.callParent(arguments); 
   }
})