/*供应商具体信息主页面*/
Ext.define('erp.supplierAccess.view.SupplierShow',{
	extend:'erp.ux.Window',
	alias:'widget.SupplierMainInfoShow',
	modal:true,
	autoScroll :'true',
	height:document.body.clientHeight<860?document.body.clientHeight:860,
	width:document.body.clientWidth<1200?document.body.clientWidth:1200,
	requires:[
		'erp.supplierAccess.view.SupplierBaseShow',
		'erp.supplierAccess.view.SupplierFileShow'
	],
//	height:document.body.clientHeight,
//	width:document.body.clientWidth * 0.9>1000?document.body.clientWidth * 0.9:1000,
	isAdd:false,
	isEdit:false,

	initComponent:function(){
		//Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
		var  me=this;
		//公司注册附件
		me.registerAttchedStore=Ext.create('erp.supplierManager.store.AppRegisterAttched');
		Ext.apply(me,{
			
		layout:'fit',
		items:[
		{
			xtype:'tabpanel',
			autoScroll :'true',
			defaults:{padding:2},
			items:[
	    	{
	    		title:'供应商信息',
	    		//height:800,
	    		//autoScroll:true,
	    		isAdd:me.isAdd,
	    		isEdit:me.isEdit,
	    		store:me.store,
	    		itemId:'SupplierBaseShow',
	    		xtype:'SupplierBaseShow'
	    	},{
	    		//附件
					title:'认证文件',
					isAdd:me.isAdd,
	    			isEdit:me.isEdit,
	    			itemId:'SupplierFileShow',
					xtype:'SupplierFileShow',
					height:document.body.clientHeight,
					modFuncsDisabled:me.modFuncsDisabled
	    	}
	    	]
		}
		]
		
		});
		this.callParent(arguments);
		me.loadRec(me.supplierRec);
	},
	loadRec:function(rec){
		var me=this;
		//加载供应商基本信息
		me.down('#SupplierBaseShow').loadBaseData(rec);
		//加载附件信息
		me.down('#SupplierFileShow').loadGridData(rec);
	}
});