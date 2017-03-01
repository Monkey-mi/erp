//供应商业务信息页面
Ext.define('erp.supplierManager.view.AccSupplierBusShow',{
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
	alias:'widget.AccSupplierBusShow',
	//company_id:-1,
	overflowY: 'auto',
	//height:300,
	initComponent:function(){
		var  me=this;
		//发票抬头store
		me.invoicestore=Ext.create('erp.supplierManager.store.AppInvoiceTitle');
		me.invoicestore.proxy.api.read='supplierAccess/common.srm?method=getAccInvoiceTitleOutList';
		//主要设备明细store
		me.devicelistStore=Ext.create('erp.supplierManager.store.AppDevicelist');
		me.devicelistStore.proxy.api.read='supplierAccess/common.srm?method=getAccDeviceOutList';
		//公司产品主要用料表
		me.metarialStore=Ext.create('erp.supplierManager.store.AppMetarial');
		me.metarialStore.proxy.api.read='supplierAccess/common.srm?method=getAccMetarialOutList';
		//公司主要客户
		me.maincustomerStore=Ext.create('erp.supplierManager.store.AppMainCustomer');
		me.maincustomerStore.proxy.api.read='supplierAccess/common.srm?method=getAccMainCustomerOutList';
		//公司主要竞争对手
		me.competitorStore=Ext.create('erp.supplierManager.store.AppCompetitor');
		me.competitorStore.proxy.api.read='supplierAccess/common.srm?method=getAccCompetitorOutList';
		//公司银行账号
		me.bankAccountStore=Ext.create('erp.supplierManager.store.AppBankAccount');
		me.bankAccountStore.proxy.api.read='supplierAccess/common.srm?method=getAccBankAccountOutList';
		//公司产品
		me.goodsStore=Ext.create('erp.supplierManager.store.AppGoods');
		me.goodsStore.proxy.api.read='supplierAccess/common.srm?method=getAccGoodsOutList';
		
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
    			columns:[
	    			{header:'序号',xtype:'rownumberer',width:60},
	    			{header:'<div style="text-align:center"><span style="color:red;">*</span>设备名称</div>',dataIndex:'device_name',width:150},
	    			{header:'<div style="text-align:center">设备规格</div>',dataIndex:'format',width:150},
	    			{header:'<div style="text-align:center">设备产地</div>',dataIndex:'place',width:150,maxLength:150},
	    			{header:'设备价值(万元)',dataIndex:'price',align:'right',width:140,maxLength:150},
	    			{header:'<div style="text-align:center">设备购买日期</div>',dataIndex:'buy_day',width:120,xtype:'datecolumn',format:'Y-m-d',align:'center'},
		   	  	  	{header:'设备数量',dataIndex:'device_num',align:'center',width:80},
	    			{header:'<div style="text-align:center">设备先进性</div>',dataIndex:'advanced',width:150,maxLength:150}
    			],
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
					itemId:'grdMaterialsDetails',
					border:true,
					x:2,
    				y:2,
    				width:800,
					columns:[
		    			{header:'序号',xtype:'rownumberer',width:60},
		    			{header:'<div style="text-align:center">材料名称</div>',dataIndex:'material_name',flex:1},
		    			{header:'<div style="text-align:center">材料品牌</div>',dataIndex:'material_brand',flex:1}
		    		],
		    		store:me.metarialStore
				}]
				
    	},{
    		title:'公司主要产品及品牌',
    		itemId:'plproductDetails',
    		layout:'absolute',
			overflowY: 'auto',
    		overflowX:'auto',
			items:[{
					xtype:'grid',
					itemId:'grdproductDetails',
					border:true,
    				width:800,
					columns:[
		    			{header:'序号',xtype:'rownumberer',width:60},
		    			{header:'<div style="text-align:center">产品名称</div>',dataIndex:'goods_name',flex:1},
		    			{header:'<div style="text-align:center">产品品牌</div>',dataIndex:'goods_brand',flex:1}
		    		],
		    		store:me.goodsStore
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
					columns:[
		    			{header:'序号',xtype:'rownumberer',width:60},
		    			{header:'<div style="text-align:center">客户名称</div>',dataIndex:'customer_name',flex:1}
		    		],
		    		store:me.maincustomerStore
			}]
    	},{
    		title:'公司主要竞争对手',
    		itemId:'plcompeteDetails',
    		layout:'absolute',
			items:[{
					xtype:'grid',
					itemId:'grdCompeteDetails',
					border:true,
    				width:800,
					columns:[
		    			{header:'序号',xtype:'rownumberer',width:60},
		    			{header:'<div style="text-align:center">对手</div>',dataIndex:'competitor_name',flex:1}
		    		],
		    		store:me.competitorStore
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
				columns:[
		    			{header:'序号',xtype:'rownumberer',width:60},
		    			{header:'<div style="text-align:center">开户银行</div>',dataIndex:'account_name',flex:1},
		    			{header:'<div style="text-align:center">银行账号</div>',dataIndex:'account_code',width:200},
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
    			itemId:'grdInvoiceDetails',
    			border:true,
    			x:2,
    			y:2,
    			width:800,
				columns:[
		    			{header:'序号',xtype:'rownumberer',width:60,align:'center'},
		    			{header:'<div style="text-align:center">发票抬头名称</div>',dataIndex:'invoice_title_name',flex:1},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype:'checkcolumn',
							renderer:erp.Util.Staterenderer
						}
		    	],
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
			if(rec.get('company_id')>0){
				//发票抬头store
				me.invoicestore.load({
					params:{
						record_id:rec.get('company_id')
					}
				});
				//主要设备明细
				me.devicelistStore.load({
					params:{
						record_id:rec.get('company_id')
					}
				});
				//公司产品主要用料表
				me.metarialStore.load({
					params:{
						record_id:rec.get('company_id')
					}
				});
				//公司主要客户maincustomerStore
				me.maincustomerStore.load({
					params:{
						record_id:rec.get('company_id')
					}
				});
				//公司主要竞争对手
				me.competitorStore.load({
					params:{
						record_id:rec.get('company_id')
					}
				});
				//公司银行账号
				me.bankAccountStore.load({
					params:{
						record_id:rec.get('company_id')
					}
				});
				me.goodsStore.load({
					params:{
						record_id:rec.get('company_id')
					}
				});
			}
		}
});