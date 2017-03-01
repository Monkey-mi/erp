 Ext.define('erp.hr.store.EmpPositionWithLoginId',{
	extend: 'Ext.data.Store', 
	requires: [
	           'erp.hr.model.EmpPosition'
	],
	model: 'erp.hr.model.EmpPosition',
    proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        api : {
			create : '',
			update : '',
			read : 'main/HR.do?method=getManList',
			destroy : ''
		},
        reader: {
			type: 'json',
			root: 'data',
			messageProperty: 'message'
		}
    }
});