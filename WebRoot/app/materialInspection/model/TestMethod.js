Ext.define('erp.materialInspection.model.TestMethod', {
	extend: 'Ext.data.Model',
	idProperty: 'xmbh,jlxh',
	fields: [
	    {name: 'xmbh'},
	    {name: 'jlxh'},
	    {name: 'xmbz'},
	    {name: 'csjg'},
	    {name: 'xsjbj',type:'int'}
	]
});