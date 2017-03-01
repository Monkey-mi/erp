Ext.define('erp.bi.view.DatasourceCenter',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.datasourceCenter',
	requires:['erp.bi.store.DatasourceCenters','erp.bi.view.EditDatasourceCenter'],
	columnLines: true,
	initComponent: function() {
		var me = this;
		me.store = Ext.create('erp.bi.store.DatasourceCenters');
		Ext.apply(me, {
			title:'多数据源列表',
			store: me.store,
			columns: [{
				text: "ID",
				align: 'center',
				dataIndex: 'ds_id',
				width: 60
			}, {
				text: "代码",
				dataIndex: "code",
				width: 60
			}, {
				text: "名称",
				dataIndex: "name",
				width: 80
			}, {
				text: "描述",
				dataIndex: "tip",
				width: 80
			}],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: me.store,
				dock: 'bottom',
				displayInfo: true
			},{
			xtype:'toolbar',
			dock:'top',
			itemId:'top_bar',
			items:[
			
				{
				text: '新增',
				iconCls: 'page_add',
				itemId: erp.Const.FUNC_ITEMID_BTN_ADD
			}, {
				text: '修改',
				iconCls: 'page_edit',
				itemId: erp.Const.FUNC_ITEMID_BTN_EDT,
				disabled: true
			}, {
				text: '删除',
				iconCls: 'page_delete',
				itemId: erp.Const.FUNC_ITEMID_BTN_DEL,
				disabled: true
			}, {
				text: '刷新',
				iconCls: 'page_refresh',
				itemId: erp.Const.FUNC_ITEMID_BTN_REFRESH
			}]
			
			}],
			listeners: {
				selectionchange: function() {
					me.down('#' + erp.Const.FUNC_ITEMID_BTN_EDT).setDisabled(false);
					me.down('#' + erp.Const.FUNC_ITEMID_BTN_DEL).setDisabled(false);
				}
			}
		});
		me.callParent(arguments);
	},
	InitParentId:function(list_id){
		var me = this;
		me.store.getProxy().setExtraParam("list_id", list_id);
		}
	});