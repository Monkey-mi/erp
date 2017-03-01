Ext.define('erp.master.caterialPricePurchase.model.HistoryPriceCtl', {
	extend: 'Ext.data.Model',
	idProperty: 'csbh',
	fields: [
	  {name : 'csbh'},
	  {name : 'csmc'},
	  {name : 'czym'},
	  {name : 'kzdj'},
	  {name : 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s'},
	  {name : 'fzdw'},
	  {name : 'fzkj'},
	  {name : 'wbbh'},
	  {name : 'wbdh'},
	  {name : 'bzsm'},
	  {name : 'jldw'}
	]
});
