/**
 * 厂商帮助窗口
 */
Ext.define('erp.master.manufacturer.view.CsmcSearch', {
	extend: 'erp.ux.Window',
	alias: 'widget.CsmcSearch_Help',
	title: '厂商名称选择帮助窗口',
	requires: ['erp.master.manufacturer.store.Csmc'],
	width: 840,
	height: 0.6 * window.screen.height,
	initComponent: function() {
		var me = this;
		me.store = Ext.create('erp.master.manufacturer.store.Csmc');
		var val = me.field.getValue();//me.field是一个Object:erp.ux.CommonTrigger
		if (val != null) {
			me.store.proxy.extraParams.xsbjsearch = val.replace(/\s+/g, "");//搜索框查询条件\s： space， 空格 +： 一个或多个 /g：global， 全局
		}
		me.store.load();
		Ext.apply(this, {
			items: [{
				buttons: [{
					text: '确定',
					iconCls: 'accept',
					itemId: 'BTN_YES',
					handler: function() {
						var editor = me.field.editor;//Ext.grid.CellEditor
						var cusConfig = me.field.cusConfig;//CreatePayPlan视图中colcumns中csmc中的cusConfig属性
						var tgrid = me.down('#Factory');
						var recs = tgrid.getSelectionModel().getSelection();
						var rec = recs[0];
						var grid = editor.grid;
						var srec = grid.getSelectionModel().getSelection()[0];
						if (recs.length == 0) {
							Ext.Msg.alert('提示', '请至少选择一条记录');
							return;
						}
						me.onSubmit(rec, recs);
					}
				},
				{
					text: '关闭',
					iconCls: 'cancel',
					handler: function() {
						me.close();
					}
				}],
				xtype: 'panel',
				layout: 'border',
				items: [{
					tbar: [{
						xtype: 'gridsearchfield',
						fieldLabel: '厂商名称或厂商编号',
						labelWidth: 140,
						focusWidth: 280,
						blurWidth: 160,
						width: 200,
						store: me.store
					}],
					xtype: 'grid',
					region: 'center',
					itemId: 'Factory',
					store: me.store,
					listeners: {
						itemdblclick: function(th, rec, item) {
							me.onSubmit(rec);
						}
					},
					selModel: Ext.create('Ext.selection.CheckboxModel', {
						mode: me.field.selModel
					}),
					columns: [{
						text: '厂商编号',
						dataIndex: 'csbh',
						width: 110
					},
					{
						text: '厂商简称',
						dataIndex: 'csjc',
						width: 110
					},
					{
						text: '厂商名称',
						dataIndex: 'csmc',
						width: 150

					},
					{
						text: '外币编号',
						dataIndex: 'wbbh',
						width: 80,
						hidden:true
					},
					{
						text: '外币名称',
						dataIndex: 'wbdh',
						width: 80
					},
					{
						text: '厂商类型',
						dataIndex: 'cslx',
						width: 110
					},
					{
						text: '厂商类别',
						dataIndex: 'cslb',
						width: 110
					}],
					dockedItems: [{
						xtype: 'pagingbar',
						stateId: '8081d6f3-9db7-470d-b764-dasddbb70c5e81b1',
						dock: 'bottom',
						displayInfo: true,
						defaultPageSize: 50,
						store: me.store
					}]
				}]
			}]
		});
		this.callParent(arguments);
	},
	onSubmit: function(rec, recs) {
		var me = this;
		var cusConfig = me.field.cusConfig;
		if (cusConfig != null) {
			var field = cusConfig.field;
			var callback = cusConfig.callback;
			if (Ext.isFunction(callback)) {
				callback(this, rec, recs);
			}
			me.field.setValue(rec.get(field));
		} else {
			me.field.setValue(rec.get('csmc'));
		}
		me.close();
	}

});