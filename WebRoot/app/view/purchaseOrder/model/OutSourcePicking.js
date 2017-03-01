Ext.define('erp.view.purchaseOrder.model.OutSourcePicking', {
	extend: 'Ext.data.Model',
	fields: [
		{ name:'htbh'},
		{ name:'htxh'},
		{ name: 'cgbh', type: 'int' },
		{ name: 'cgxh', type: 'int' },
		{ name: 'tzxh', type: 'int' },
		{ name: 'lbbh' },
		{ name: 'clhh' },
		{ name: 'cltx1' },
		{ name: 'cltx2' },
		{ name: 'cltx3' },
		{ name: 'jldw' },
		{ name: 'jgyl', type: 'float' },
		{ name: 'jsbl', type: 'float' },
		{ name: 'tzll', type: 'float' },
		{ name: 'ylsl', type: 'float' },
		{ name: 'bzsm' },
		{ name: 'jgbh' },
		{ name: 'csdj', type: 'float' },
		{ name: 'csje', type: 'float' },
		{ name: 'djyl', type: 'float' },
		{ name: 'plmth' },
		{ name: 'plmtx' },
		{ name: 'lbmc'},
		{ name:'clmc'},
		{ name:'wlsl',type: 'float' ,convert:function(value,record){
			return record.get('tzll') - record.get('ylsl');
		}}
	]
});
