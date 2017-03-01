//供应商业务信息页面
Ext.define('erp.supplierAccess.view.SupplierBusShow',{
	extend:'Ext.tab.Panel',
	requires:['erp.basicdata.materialClass.store.MaterialClassTreeChk',
			'erp.supplierManager.store.MaterialClass',
			'erp.supplierManager.store.AppDevicelist',
			'erp.supplierManager.store.AppMetarial',
			'erp.supplierManager.store.AppMainCustomer',
			'erp.supplierManager.store.AppCompetitor',
			'erp.supplierManager.store.AppBankAccount',
			'erp.supplierManager.store.AppGoods',
			'Ext.ux.TreePicker'],
	alias:'widget.SupplierBusShow',
	//company_id:-1,
	overflowY: 'auto',
	//height:300,
	initComponent:function(){
		var  me=this;
		//发票抬头store
		me.invoicestore=Ext.create('erp.supplierManager.store.AppInvoiceTitle');
		me.invoicestore.proxy.api.read='supplierAccess/common.srm?method=getInvoiceTitleOutList';
		//主要设备明细store
		me.devicelistStore=Ext.create('erp.supplierManager.store.AppDevicelist');
		me.devicelistStore.proxy.api.read='supplierAccess/common.srm?method=getDeviceOutList';
		//公司产品主要用料表
		me.metarialStore=Ext.create('erp.supplierManager.store.AppMetarial');
		me.metarialStore.proxy.api.read='supplierAccess/common.srm?method=getMetarialOutList';
		//公司主要客户
		me.maincustomerStore=Ext.create('erp.supplierManager.store.AppMainCustomer');
		me.maincustomerStore.proxy.api.read='supplierAccess/common.srm?method=getMainCustomerOutList';
		//公司主要竞争对手
		me.competitorStore=Ext.create('erp.supplierManager.store.AppCompetitor');
		me.competitorStore.proxy.api.read='supplierAccess/common.srm?method=getCompetitorOutList';
		//公司银行账号
		me.bankAccountStore=Ext.create('erp.supplierManager.store.AppBankAccount');
		me.bankAccountStore.proxy.api.read='supplierAccess/common.srm?method=getBankAccountOutList';
		//公司产品
		me.goodsStore=Ext.create('erp.supplierManager.store.AppGoods');
		me.goodsStore.proxy.api.read='supplierAccess/common.srm?method=getGoodsOutList';
		
		Ext.apply(me,{
		defaults:{padding:5,layout:'fit'},	
		border:false,
    	items:[
    	{
    		title:'主要设备明细',
    		itemId:'plEquipmentDetails',
    		layout:'absolute',
    		overflowY: 'auto',
    		overflowX:'auto',
    		items:[
    		{
    			xtype:'grid',
    			border:true,
    			itemId:'grdEquipmentDetails',
    			x:2,
    			y:2,
    			multiSelect:true,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
    			columns:[
    			{header:'序号',xtype:'rownumberer',width:40},
    			{header:'<div style="text-align:center"><span style="color:red;">*</span>设备名称</div>',dataIndex:'device_name',editor:{xtype:'textfield',allowblank:false},width:150},
    			{header:'<div style="text-align:center">设备规格</div>',dataIndex:'format',editor:{xtype:'textfield'},width:150},
    			{header:'<div style="text-align:center">设备产地</div>',dataIndex:'place',editor:{xtype:'textfield'},width:150,maxLength:150},
    			{header:'设备价值(万元)',dataIndex:'price',align:'right',editor:{xtype:'textfield'},width:100,maxLength:150},
    			{header:'<div style="text-align:center">设备购买日期</div>',dataIndex:'buy_day',width:120,xtype:'datecolumn',format:'Y-m-d',
    				renderer:function(value){
						if(value!=null){
							return Ext.Date.format(value, 'Y-m-d');  
						}},field:{
							xtype:'datefield',
							maxValue:new Date()
						},
						align:'center'
//						,
//						allowBlank:false,
//	   	  	  			blankText:'请选择购买日期'
	   	  	  	},
	   	  	  	{header:'设备数量',dataIndex:'device_num',editor:{xtype:'numberfield',minValue: 0},align:'center',width:80},
    			{header:'<div style="text-align:center">设备先进性</div>',dataIndex:'advanced',editor:{xtype:'textfield'},width:150,maxLength:150}
    			],
    			plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1   
					    },
		    	store:me.devicelistStore
    		}
    		]
    	},{
				title:'原材料及品牌',
				itemId:'plmaterialsDetails',
				layout:'absolute',
				overflowY: 'auto',
    			overflowX:'auto',
				items:[{
					xtype:'grid',
					//minHeight:100,
					itemId:'grdMaterialsDetails',
					border:true,
					//anchor:'70%',
					x:2,
    			y:2,
    			width:800,
					multiSelect:true,
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">材料名称</div>',dataIndex:'material_name',editor:{allowblank:false},flex:1},
		    			{header:'<div style="text-align:center">材料品牌</div>',dataIndex:'material_brand',editor:{},flex:1}
		    			],
		    		store:me.metarialStore,
		    		plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					    }
				}]
				
    	},{
    		title:'公司主要产品及品牌',
    		itemId:'plproductDetails',
    		layout:'absolute',
			overflowY: 'auto',
    		overflowX:'auto',
			items:[{
					xtype:'grid',
					//minHeight:100,
					itemId:'grdproductDetails',
					border:true,
					//anchor:'70%',
					x:2,
    				y:2,
    				width:800,
					multiSelect:true,
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">产品名称</div>',dataIndex:'goods_name',editor:{allowblank:false},flex:1},
		    			{header:'<div style="text-align:center">产品品牌</div>',dataIndex:'goods_brand',editor:{},flex:1},
		    			{header:'<div style="text-align:center">类别</div>',dataIndex:'mc_id',width:150,
		    				editor:{
		    					xtype : 'treepicker',    
							    displayField : 'text',
							    valueField: 'id',
							    store:me.treepickerStore,
							    rootVisible:false,
							    maxPickerWidth:240,
							    listeners:{
							'select':function(picker,record,eOpts)
							{
								if(!record.get('leaf'))
								{
									
									Ext.Msg.alert('提示','请选择最后一级类别！');
									picker.setValue('');
									
									return;
								}
							}
						}
		    				}
		    				,
		    				renderer:function(value, metaData, record, rowIndex, colIndex, store){
		    					var return_value='';
								me.materialClassStore.load();
								var rec=me.materialClassStore.findRecord('mc_id',value);
								if(!Ext.isEmpty(rec))
								{
									return_value=rec.get('mc_name');
								}
								return return_value;
		   	  	  			}
		    			}
		    			],
		    		store:me.goodsStore,
		    		plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					    }
			}]
    	},{
    		title:'公司主要客户',
    		itemId:'plcustomerDetails',
    		layout:'absolute',
    		overflowY: 'auto',
    		overflowX:'auto',
			items:[{
					xtype:'grid',
					itemId:'grdcustomerDetails',
					border:true,
					x:10,
    			y:10,
    			width:800,
					multiSelect:true,
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">客户名称</div>',dataIndex:'customer_name',editor:{},flex:1}
		    			],
		    		store:me.maincustomerStore,
		    		plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					    }
			}]
    	},{
    		title:'公司主要竞争对手',
    		itemId:'plcompeteDetails',
    		layout:'absolute',
    		overflowY: 'auto',
    		overflowX:'auto',
			items:[{
					xtype:'grid',
					itemId:'grdCompeteDetails',
					border:true,
					x:2,
    			y:2,
    			width:800,
					multiSelect:true,
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">对手</div>',dataIndex:'competitor_name',editor:{},flex:1}
		    			],
		    		store:me.competitorStore,
		    		plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					    } 
			}]
    	},{
    		title:'银行账号',
    		itemId:'plbankDetails',
    		layout:'absolute',
    		overflowY: 'auto',
    		overflowX:'auto',
			items:[{
				xtype:'grid',
				itemId:'grdBankDetails',
    			border:true,
    			x:2,
    			y:2,
    			width:800,
				multiSelect:true,
				//selModel:Ext.create('Ext.selection.CheckboxModel'),
				columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">开户银行</div>',dataIndex:'account_name',editor:{},flex:1},
		    			{header:'<div style="text-align:center">银行账号</div>',dataIndex:'account_code',editor:{},width:200},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype: 'checkcolumn',stopSelection: false,
		    				renderer:function(value){
									if(value=="true"||value=="1"){//是否默认
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}
		    			}
		    			],
		    	plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					        
					    },
		    	store:me.bankAccountStore
			}]
    	},{
    		title:'发票抬头',
    		itemId:'plinvoiceDetails',
    		layout:'absolute',
    		overflowY: 'auto',
    		overflowX:'auto',
    		items:[{
    			xtype:'grid',
    			//minHeight:100,
    			itemId:'grdInvoiceDetails',
    			border:true,
    			//anchor:'70%',
    			x:2,
    			y:2,
    			width:800,
				multiSelect:true,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				columns:[
		    			{header:'序号',xtype:'rownumberer',width:40,align:'center'},
		    			{header:'<div style="text-align:center">发票抬头名称</div>',dataIndex:'invoice_title_name',editor:{},flex:1},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype:'checkcolumn',
							renderer:function(value){
									if(value=="true"||value=="1"){
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}
		    			}
		    			],
		    	plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					        
					    },
		    	store:me.invoicestore
    		}]
    	}
		]	
		});
		this.callParent(arguments);
		},
		//加载业务数据
		loadbusData:function(rec)
		{
			var me=this;
			
			me.company_id=-1;
			if(rec.get('company_id')>0)
			{
				me.company_id=rec.get('company_id');
				//发票抬头store
			me.invoicestore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//主要设备明细
			me.devicelistStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司产品主要用料表
			me.metarialStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司主要客户maincustomerStore
			me.maincustomerStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司主要竞争对手
			me.competitorStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司银行账号
			me.bankAccountStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			me.goodsStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			}
			else
			{
			me.invoicestore.load({
				params:{
					company_id:0
				}
			});
			//主要设备明细
			me.devicelistStore.load({
				params:{
					company_id:0
				}
			});
			//公司产品主要用料表
			me.metarialStore.load({
				params:{
					company_id:0
				}
			});
			//公司主要客户maincustomerStore
			me.maincustomerStore.load({
				params:{
					company_id:0
				}
			});
			//公司主要竞争对手
			me.competitorStore.load({
				params:{
					company_id:0
				}
			});
			//公司银行账号
			me.bankAccountStore.load({
				params:{
					company_id:0
				}
			});
			me.goodsStore.load({
				params:{
					company_id:0
				}
			});
			}
		}
});