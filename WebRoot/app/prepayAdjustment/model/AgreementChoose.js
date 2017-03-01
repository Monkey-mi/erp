Ext.define('erp.prepayAdjustment.model.AgreementChoose', {
			extend : 'Ext.data.Model',
			idProperty : 'htbh',
			fields : [
				{name : 'cglb'}, 
				{name : 'hsbm'},
				{name : 'cgrq',type : 'date',dateFormat : 'Y-m-d H:i:s'}, 
				{name : 'htbh',type : 'float'}, 
				{name : 'csbh'}, 
				{name : 'htzs',type : 'float'},
				{name : 'htze',type : 'float'}, 
				{name : 'wbze',type : 'float'},
				{name : 'sqje',type : 'float'}
			]
		});