Ext.define('erp.view.master.purchaseDetail.PurchaseDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.purchaseDetailModel',
    data: {
    	disabled:true,
    	iswb:true
    },
    formulas: {
	     xy: function (get) {
	     	return get('x') * get('y'); 
	     }
	 }
});