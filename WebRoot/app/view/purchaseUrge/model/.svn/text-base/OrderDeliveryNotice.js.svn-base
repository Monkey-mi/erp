Ext.define('erp.view.purchaseUrge.model.OrderDeliveryNotice', {
	extend: 'Ext.data.Model',
	idProperty: 'delivery_notice_id',
	fields: [
		{ name: 'delivery_notice_id', type: 'int' ,hidden:true},
		{ name: 'delivery_notice_bh' ,header:'通知单号',columnWidth:160},
		{ name: 'htbh',header:'合同编号',columnWidth:120},
		{ name: 'notice_dt',header:'通知时间',columnWidth:145, type: 'date', dateFormat: 'Y-m-d H:i:s',renderer:function(v){
			return Ext.util.Format.date(v, 'Y-m-d H:i:s');
		}},
		{ name: 'notice_status',header:'通知状态',columnWidth:145, type: 'int',renderer:function(v){
			switch(v){
				case 0:
					return "提交";
				break;
				case 1:
					return "修改";
				break;
				case 2:
					return "确认";
				break;
			}	
		}},
		{ name: 'source_type', type: 'int' ,hidden:true},
		{ name: 'creator_id', type: 'int' ,hidden:true},
		{ name: 'creator_name' ,header:'创建人',columnWidth:75}
	]
});
