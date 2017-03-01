Ext.define('erp.prepayAdjustment.model.InvoiceChoose', {
			extend : 'Ext.data.Model',
			idProperty : 'fplb' + 'fphm',
			fields : [
				{name : 'fplx'},
				{name : 'fplb'},
				{name : 'fphm'},
				{name : 'kprq',type : 'date',dateFormat : 'Y-m-d H:i:s'},
				{name : 'jzrq',type : 'date',dateFormat : 'Y-m-d H:i:s'},
				{name : 'csmc'},
				{name : 'fpje',type : 'float'},
				{name : 'csje',type : 'float'},
				{name : 'wbbh'},
				{name : 'wbdh'},
				{name : 'wbhl',type : 'float'},
				{name : 'wbje',type : 'float'},
				{name : 'yfkje',type : 'float'},
				{name : 'sqje',type : 'float'},
				{name : 'wqje',type : 'float'}
			]
		});