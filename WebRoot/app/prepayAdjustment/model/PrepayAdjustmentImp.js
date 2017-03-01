Ext.define('erp.prepayAdjustment.model.PrepayAdjustmentImp', {
			extend : 'Ext.data.Model',
			idProperty : 'sqbh' + 'sqxh',
			fields : [
				{name : 'sqbh',type : 'float'},
				{name : 'sqxh',type : 'float'},
				{name : 'hsbm'},
				{name : 'bmmc'},
				{name : 'csbh'},
				{name : 'wbbh'},
				{name : 'wbdh'},
				{name : 'htbh',type : 'float'},
				{name : 'fydh'},
				{name : 'htze',type : 'float'},
				{name : 'sqje',type : 'float'}, 
				{name : 'hxje',type : 'float'},
				{name : 'whxje',type : 'float'}, 
				{name : 'wbze',type : 'float'},
				{name : 'wbje',type : 'float'},
				{name : 'whxje_wb',type : 'float'}
			]
		});