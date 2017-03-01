Ext.define('erp.prepayAdjustment.model.PrepayAgreementChoose', {
			extend : 'Ext.data.Model',
			idProperty : 'htbh',
			fields : [
				{name : 'cglb'},
				{name : 'hsbm'},
				{name : 'cgrq',type : 'date',dateFormat : 'Y-m-d H:i:s'},
				{name : 'htbh',type : 'float'},
				{name : 'csbh'},
				{name : 'wbbh'},
				{name : 'htzs',type : 'float'},
				{name : 'htze',type : 'float'},
				{name : 'wbze',type : 'float'},
				{name : 'sqje',type : 'float'},
				{name : 'yfje',type : 'float'},
				{name : 'wyfje',type : 'float'},
				{name : 'wyfje_wb',type : 'float'}
			]
		});