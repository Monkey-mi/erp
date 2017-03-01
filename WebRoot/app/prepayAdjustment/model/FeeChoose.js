Ext.define('erp.prepayAdjustment.model.FeeChoose', {
			extend : 'Ext.data.Model',
			idProperty : 'fydh',
			fields : [
				{name : 'fydh',type : 'float'}, 
				{name : 'hsbm'},
				{name : 'fyh'},
				{name : 'fyxh',type : 'float'},
				{name : 'fyrq',type : 'date',dateFormat : 'Y-m-d H:i:s'},
				{name : 'fysl',type : 'float'},
				{name : 'fydj',type : 'float'},
				{name : 'fyje',type : 'float'},
				{name : 'sqje',type : 'float'}
			]
		});