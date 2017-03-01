Ext.define('erp.express.store.Dsfs', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Dsfs'],
	model: 'erp.express.model.Dsfs',
	data : [
         {cid: 1,    display: '加快'},
         {cid: 2,    display: '特快'},
         {cid: 3,    display: '普通'},
         {cid: 4,    display: '经济型'},
         
         {cid: 5,    display: '空运型'},
         {cid: 6,    display: '当日型'},
         {cid: 7,    display: '次晨型'},
         {cid: 8,    display: '次日型'},
         
         {cid: 9,    display: '普通型'},
         {cid: 10,    display: '全球特快型'},
         
         {cid: 11,    display: '经济件'},
         {cid: 12,    display: '急件'}
     ]
});
