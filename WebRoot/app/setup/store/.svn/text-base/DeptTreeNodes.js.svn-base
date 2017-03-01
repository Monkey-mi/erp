Ext.define('erp.setup.store.DeptTreeNodes', {
	extend : 'Ext.data.TreeStore',
	requires : [ 'erp.setup.model.DeptTreeNode' ],
	model : 'erp.setup.model.DeptTreeNode',
	proxy : {
		type : 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		url:'main/Orgs.do?method=getDeptTreeNodeWithParentByUser',
		reader : {
			type : 'json',
			rootProperty : 'data',
			messageProperty : 'message'
		}
	},
	sorters : [ {
		property : 'id',
		direction : 'ASC'
	}, {
		property : 'order_seq',
		direction : 'ASC'
	}],
	autoLoad: false
});