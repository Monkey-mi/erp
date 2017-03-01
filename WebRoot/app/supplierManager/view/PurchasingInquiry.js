//采购询价单明细页面
Ext.define('erp.supplierManager.view.PurchasingInquiry',{
	extend:'Ext.tab.Panel',
	alias:'widget.PurchasingInquiryDetails',
	requires:['erp.supplierManager.view.purchasingInquiry.GeneralTemplate',
				'erp.supplierManager.view.purchasingInquiry.CaiheTemplate',
				'erp.supplierManager.view.purchasingInquiry.HechenggeTemplate',
				'erp.supplierManager.view.purchasingInquiry.MianliaoTemplate',
				'erp.supplierManager.view.purchasingInquiry.WangbuTemplate',
				'erp.supplierManager.view.purchasingInquiry.ZhixiangTemplate'],
	initComponent:function(){
		var  me=this;
		Ext.apply(me,{
			defaults:{padding:2},
			
    	items:[
    	{
    		title:'通用版',
    		xtype:'Pi_GeneralTemplate'
    	},{
    		//
				title:'彩盒',
				xtype:'Pi_CaiheTemplate'
    	},{
    		
    		title:'合成革',
    		xtype:'Pi_HechenggeTemplate'
    	}
    	,{
    		//
				title:'面料',
				xtype:'Pi_MianliaoTemplate'
    	},{
    		
    		title:'网布',
    		xtype:'Pi_WangbuTemplate'
    	},{
    		
    		title:'纸箱',
    		xtype:'Pi_ZhixiangTemplate'
    	}]
		});
		this.callParent(arguments);
		
	}
});