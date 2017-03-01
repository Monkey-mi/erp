//供应商基本信息页面
Ext.define('erp.supplierManager.view.AccSupplierBaseShow',{
	extend:'erp.ux.Panel',
	alias:'widget.AccSupplierBaseShow',
	requires:[
			  'erp.supplierManager.view.AccSupplierBusShow'
			],
	overflowY: 'auto',
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			defaults:{padding:0},
			//layout:'border',
			layout:{
			     type: 'vbox',//垂直分布
			     align: 'stretch'
	    	},
    	
			items:[{
				//title:'基本信息',
				border:true,
				autoScroll:true,
				//height:480,
				//region:'center',
				//flex:2,
				xtype:'form',
				itemId:'PanelBaseInfo',
    			items:[{
    				xtype:'fieldset',
    				title:'<span style="color:#008cd6">基本信息</span>',
					collapsible: true,
					padding:4,
					layout:'column',
					defaults : {
						labelWidth : 100,
						xtype:'textfield',
						labelStyle : 'font-weight:nomal;text-align:left;color:#000',
						padding:'0 4 4 4',
						msgTarget : 'side',
						autoFitErrors : true,
						readOnly:true
					},
					items:[{
						fieldLabel:'公司中文名称',
						allowBlank:false,
						name:'cpyname_cn',
						itemId:'cpyname_cn',
						emptyText:'(供应商名称)',
						maxLength:150,
						columnWidth:1/3
					},{
						itemId:'cpyname_en',
						name:'cpyname_en',
						fieldLabel:'公司英文名称',
						maxLength:150,
						columnWidth:1/3
					},
					{
						itemId:'corporation',
						name:'corporation',
						fieldLabel:'公司法人代表',
						columnWidth:1/3
					},
					{
						itemId:'is_chinese',
						name:'is_chinese',
						fieldLabel:'是否国内',
						xtype:'combo',
						allowBlank:false,
						emptyText:'(必填项)',
						store:[[0,'国内'],[1,'国外']],
						columnWidth:2/9
					},
					
					{
						fieldLabel:'注册地址',
						itemId:'reg_addr_all',
						name:'reg_addr_all',
						columnWidth:4/9
					},
					{
						itemId:'reg_addr',
						name:'reg_addr',
						fieldLabel:'详细注册地址',
						columnWidth:1/3
					},
					{	
						itemId:'f_phone',
						name:'f_phone',
						fieldLabel:'公司固定电话',
						
						columnWidth:2/9
						
					},

					{
						itemId:'contact_addr_all',
						fieldLabel:'联系地址',
						name:'contact_addr_all',
						columnWidth:4/9
					},
					{
						itemId:'contact_addr',
						name:'contact_addr',
						fieldLabel:'详细联系地址',
						columnWidth:1/3
					},
					//厂商类别一级
					{
 						fieldLabel:'厂商类别',
						name:'mc_name_1',
						itemId:'mc_name_1',
						columnWidth:2/9
 					},
 					//厂商类别二级
 					{
 						itemId:'mc_name_2',
 						name:'mc_name_2',
						columnWidth:2/9
 					},
 					//厂商类别三级
 					{
 						itemId:'mc_name_3',
 						name:'mc_name_3',
						columnWidth:2/9
 					},
					{
						itemId:'fax',
						name:'fax',
						fieldLabel:'公司传真号',
						columnWidth:1/3
					},
					
					{
						itemId:'contacts',
						name:'contacts',
						fieldLabel:'联系人',
						
						columnWidth:1/3
					}
					,
					{
						itemId:'m_phone',
						name:'m_phone',
						fieldLabel:'联系人手机号',
						columnWidth:1/3
					},
					
					{
						itemId:'email',
						name:'email',
						fieldLabel:'E-Mail',
						columnWidth:1/3
					},
					{
						itemId:'industry_name',
						name:'industry_name',
						fieldLabel:'行业性质',
						columnWidth:1/3
					},
					{
						itemId:'nature_name',
						name:'nature_name',
						fieldLabel:'企业性质',
						forceSelection:true,
						columnWidth:1/3
					},
					{
						itemId:'taxman_name',
						name:'taxman_name',
						fieldLabel:'纳税人类别',
						columnWidth:1/3
					},
					{
						fieldLabel:'营业执照号',
						itemId:'bus_license',
						name:'bus_license',
						columnWidth:1/3
					},
					{
						fieldLabel:'公司税籍编号',
						itemId:'tax_no',
						name:'tax_no',
						columnWidth:1/3
					},
					{
						xtype:'panel',
						layout:{type:'hbox',align:'stretch'},
						items:[
							{fieldLabel:'注册资金(万元)',
							itemId:'reg_fund',
							name:'reg_fund',
							xtype:'numberfield',
							readOnly:true,
							labelStyle : 'font-weight:nomal;text-align:left;color:#000000',
							allowBlank:false,
							emptyText:'(必填项)',
							step:1,
							minValue: 0,
							decimalPrecision :2,
							flex:3},
							{
								itemId:'currency_name',
								name:'currency_name',
								xtype:'textfield',
//								forceSelection:true,
								flex:1
							}],
						columnWidth:1/3
					},
					{
						fieldLabel:'成立日期',
						itemId:'establish_dt',
						name:'establish_dt',
						xtype:'datefield',
						format:'Y-m-d',
						columnWidth:1/3
					}
					,
					{
	           			fieldLabel:"租赁/自建",
	           			itemId:'factory_owner',
						name:'factory_owner',
						xtype:'combo',
						editable:false,
						store : [[1, '租赁'],
						[2, '自建']],
						columnWidth:1/3
	           		},
					{
						xtype:'panel',
								layout:{type:'hbox',align:'stretch'},
								items:[
								{
									fieldLabel:'营业额(万元)',
									name:'turnover',
									xtype:'numberfield',
									labelStyle : 'font-weight:nomal;text-align:left;color:#000000',
									step:1,
									minValue: 0,
									readOnly:true,
									decimalPrecision :2,
									flex:3
								},{
									itemId:'turnover_currency_name',
									name:'turnover_currency_name',
									xtype:'textfield',
//									forceSelection:true,
									flex:1
								}],
						columnWidth:1/3
					},
	           		
					{
						fieldLabel:'主体单位',
						itemId:'ztdw',
						name:'ztdw',
						xtype:'combo',
						store:me.mainUnitStore,
						queryMode : 'local',
						allowBlank:false,
						forceSelection:true,
						displayField:'ztmc',
						valueField:'ztbh',
						selectOnFocus:true,
						typeAhead:true,
						columnWidth:1/3
					},
	           		{
	           			fieldLabel:"认证体系",
	           			itemId:'certification_system',
	           			name:'certification_system',
	           			xtype:'combo',
	           			store:[['ISO9000','ISO9000'],['ISO14000','ISO14000']],
	           			columnWidth:1/3
	           		},
					{
	           			fieldLabel:'付款天数(天)',
	           			//labelWidth:60,
	           			itemId:'fkts',
						name:'fkts',
						xtype:'numberfield',
						step:1,
						minValue: 0,
						decimalPrecision :0,
						columnWidth:1/3
	           		},
					
	           		{
	           			fieldLabel:"付款条件",
	           			itemId:'fktj',
	           			name:'fktj',
	           			xtype:'textfield',
	           			columnWidth:1/3
	           		},
	           		{
	           			fieldLabel:"信用额度（万）",
	           			itemId:'xyed',
						name:'xyed',
						xtype:'numberfield',
						columnWidth:1/3,
						step:1,
						minValue: 0,
						decimalPrecision :2
	           		},
	           		{
	           			fieldLabel:"信贷比例",
	           			itemId:'xdbl',
						name:'xdbl',
						xtype:'numberfield',
						columnWidth:1/3,
						step:0.1,
						minValue: 0,
						maxValue: 1
	           		}
	           		
	           		,
	           		{
	           			fieldLabel:"ERP编号",
	           			itemId:'csbh',
						name:'csbh',
						columnWidth:1/4,
						readOnly:true
	           		},
	           		{
	           			fieldLabel:"服务类型",
	           			labelWidth:60,
	           			itemId:'fwlx',
	           			multiSelect:true,
						name:'fwlx',
						columnWidth:1/4,
						itemTpl : Ext.create('Ext.XTemplate','<input type=checkbox />{mc_name}'),
 						listeners:{
 							itemclick:function(view, record, item, index, e, eOpts ){  
 							 	var isSelected = view.isSelected(item);  
 								var checkboxs = item.getElementsByTagName("input");  
 				 			 	if(checkboxs!=null)  
  							 	{  
      								var checkbox = checkboxs[0];  
      								if(!isSelected)  
     							 	{  
         							 checkbox.checked = true;  
      								}else{  
          							checkbox.checked = false;  
      								}  
  							 	}  
 							}	  
 						},
						xtype:'combo',
						store:[['厂商','厂商'],['货代','货代'],['快递','快递'],['运输公司','运输公司']]
	           		},
	           		{
	           			fieldLabel:"外币核算",
	           			itemId:'wbhs',
	           			labelWidth:60,
						name:'wbhs',
						xtype:'checkbox',
						columnWidth:1/8
	           		},
	           		{
	           			fieldLabel:"币种",
	           			itemId:'wbbh',
						name:'wbbh',
						xtype:'combo',
						labelWidth:60,
						store:me.wbStore,
						queryMode : 'local',
						displayField:'wbmc',
						valueField:'wbbh',
						selectOnFocus:true,
						typeAhead:true,
						columnWidth:1/4
	           		}/*,
	           		{
	           			fieldLabel:"不合格原因",
	           			itemId:'auditopinion',
						name:'auditopinion',
						xtype:'textarea',
						columnWidth:1
	           		}*/
				]
				},{
    				xtype:'fieldset',
    				title:'<span style="color:#008cd6">其他信息</span>',
					collapsible: true,
					collapsed:true,//默认收缩
					padding:4,
					layout:'column',
					defaults : {
						labelWidth : 100,
						xtype:'textfield',
						labelStyle : 'font-weight:nomal;text-align:left;color:#000',
						padding:'0 4 4 4',
						msgTarget : 'side',
						autoFitErrors : true
					},
					items:[
						{
							fieldLabel:'公司总人数',
							itemId:'emplyees',
							name:'emplyees',
							xtype:'numberfield',
							step:1,
							minValue: 0,
							decimalPrecision :0,
							
							columnWidth:1/3
						},{
		           			fieldLabel:'厂房面积(m²)',
		           			//labelWidth:60,
		           			itemId:'factory_area',
							name:'factory_area',
							xtype:'numberfield',
							step:1,
							minValue: 0,
							decimalPrecision :0,
							columnWidth:1/3
		           		},{
				           	fieldLabel:'操作工人数',
							itemId:'op_num',
							name:'op_num',
							xtype:'numberfield',
							decimalPrecision :0,
							columnWidth:1/3,
							step:1,
							value:0,
							minValue: 0
				        },{
							fieldLabel:'开发技术人数',
							itemId:'tech_num',
							name:'tech_num',
							xtype:'numberfield',
							decimalPrecision :0,
							columnWidth:1/3,
							step:1,
							value:0,
							minValue: 0		           	
			           	},{
							fieldLabel:'专职检验人数',
							itemId:'qc_num',
							name:'qc_num',
							xtype:'numberfield',
							decimalPrecision :0,
							columnWidth:1/3,
							step:1,
							value:0,
							minValue: 0
						},{
							fieldLabel:'间接员工人数',
							itemId:'staff_num',
							name:'staff_num',
							xtype:'numberfield',
							decimalPrecision :0,
							columnWidth:1/3,
							step:1,
							value:0,
							minValue: 0
						},{
							fieldLabel:'大专以上人数',
							itemId:'college_num',
						    name:'college_num',
							xtype:'numberfield',
							decimalPrecision :0,
							columnWidth:1/3,
							step:1,
							value:0,
							minValue: 0
						},{
							fieldLabel:'内审员资格人数',
							itemId:'qe_num',
							name:'qe_num',
							xtype:'numberfield',
							decimalPrecision :0,
							columnWidth:1/3,
							step:1,
							value:0,
							minValue: 0
						},{
							fieldLabel:"公司面积(m²)",
							itemId:'company_area',
							name:'company_area',
							xtype:'numberfield',
							step:1,
							minValue: 0,
							decimalPrecision :0,
							columnWidth:1/3
						},{
		           			fieldLabel:'使用年限',
		           			labelWidth:100,
		           			xtype:'datefield',
		           			itemId:'use_begintime',
							name:'use_begintime',
		           			format:'Y-m-d',
		           			columnWidth:1/3
		           		},{
		           			fieldLabel:'至',
		           			labelStyle:'text-align:center;color:#000',
		           			labelWidth:100,
		           			xtype:'datefield',
		           			itemId:'use_endtime',
							name:'use_endtime',
		           			format:'Y-m-d',
		           			columnWidth:1/3
		           		}
					]
				}]
			},
			{xtype:'splitter'}
			,{//业务信息
				title:'业务信息',
				border:true,
				autoScroll :'true',
				flex:1,
				itemId:'AccSupplierBusShow',
				xtype:'AccSupplierBusShow'
			}
			]
		});
		me.callParent(arguments);
	},
	loadBaseData:function(rec){
		var me=this;
		console.log(rec);
		if(rec.get('factory_owner')=="null"){
		rec.set('factory_owner','');
		}
		me.down('#PanelBaseInfo').loadRecord(rec);
		//加载业务数据
		me.down('#AccSupplierBusShow').loadbusData(rec);
	}
});