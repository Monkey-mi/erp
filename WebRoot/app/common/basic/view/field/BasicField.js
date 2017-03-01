/**
 * 字典下拉
 */
Ext.define('erp.common.basic.view.field.BasicField', {
	extend: 'erp.common.basic.view.field.BaseField',
	alias: 'widget.basicfield',
	/**
	 * 种类代码
	 */
	code: null,
	displayField: 'name',
	valueField: 'value',
	/**
	 * 配置
	 */
	helprec: null,
	store: null,
	// 隐藏按钮
	hideTrigger: false,
	queryMode: 'remote',
	queryDelay:1,
	/**
	 * 下拉组件的宽度
	 */
	pickerWidth: 300,
	/**
	 * 是否与field长度一致
	 */
	matchFieldWidth: true,
	/**
	 * 隐藏列名
	 */
	hideHeaders: false,
	/**
	 * 初始化组件
	 */
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		var btn = me.createButton();
		/* me.add(btn); */
	},
	createButton: function() {
		var me = this;
		var button = Ext.widget('button', {
			iconCls: 'basic-data',
			tooltip: '基础数据帮助查询',
			handler: function(btn) {/*
									 * me.onWindow();
									 */
			}
		});
		return button;
	},
	afterrender: function() {
		var me = this;
		me.callParent(arguments);
	},
	/**
	 * 事件初始化
	 */
	initEvents: function() {
		var me = this;
		this.callParent(arguments);
		this.on('keydown', me.onKeyDown);
	},
	onKeyUp: function(e, t) {
		var me = this;
		this.callParent(arguments);
	},
	// 键盘按下事件
	onKeyDown: function(e, o) {
		this.oldValue = this.getValue();
	},
	/**
	 * 
	 */
	createColumns: function() {
		var me = this;
		var column = [];
		if(me.nameVisible){
			column.push({
				dataIndex: me.displayField,
				flex: 1,
				text: '名称'
			});
		}
		if(me.valueVisible){
			column.push({
				dataIndex: me.valueField,
				flex: 1,
				text: '值'
			});
		}
		return column;
	},
	/**
	 * 选择界面构造
	 */
	createPicker: function() {
		var fields;
		var me = this;
		var picker;
		var width=200;
		if(me.getWidth()){
		width=me.getWidth()
		}
		var columns = me.createColumns();
		picker = me.picker =Ext.create('Ext.grid.Panel', {
			ownerCt: me.ownerCt,
			store: me.store,
			columns: columns,
			width:width,
			height:100,
			bbar: me.blind ? [me.blind] : null,
			layout: 'fit',
			selModel: {
				mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
			},
			floating: true,
			focusOnShow: true,
			focusOnToFront: false,
			pickerField: me,
			hideHeaders: me.hideHeaders,
			columnLines: false,
			listeners:{
			 afterrender:function(){
			 }
			}
		});
		me.callParent(arguments);
		return picker;
	},
	/**
	 * 初始化数据源
	 */
	createStore: function() {
		var me = this;
		me.store =erp.DataUtil.getComboStore(me.code);
		me.store.getProxy().extraParams = {
			type_code: me.code,
			mode: "Screening"
		};
	}
});