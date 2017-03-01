Ext.define('erp.express.store.Fkfs', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Dsfs'],
	model: 'erp.express.model.Dsfs',
	data : [
         {cid: 1,    display: '月结'},
         {cid: 2,    display: '现付'}
     ]
});
