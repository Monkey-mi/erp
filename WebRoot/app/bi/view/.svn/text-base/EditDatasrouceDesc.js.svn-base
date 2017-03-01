Ext.define('erp.bi.view.EditDatasrouceDesc', {
			extend : 'erp.ux.Window',
			alias : 'widget.edt_desc',
			iconCls:"page_key",
			title : '数据源字段描述维护',
			initComponent : function() {
				var me = this;
				Ext.apply(me, {
							buttons : [{
										text : '保存',
										iconCls : 'page_save',
										action : 'ACT_SAVE',
										hidden : me.isEdit
									}, {
										text : '退出',
										iconCls : 'page_error',
										action : 'ACT_CLOSE',
										hidden : me.isEdit
									}],
							items : [{
										xtype : 'form',
										bodyPadding : 10,
										frame:false,
										plugins : {
											ptype : 'FormKey'
										},
										defaults : {
											xtype : 'textfield',
											labelAlign : 'right',
											anchor : '95%',
											labelWidth : 80,
											readOnly : me.isEdit,
											msgTarget : 'qtip'
										},
										items : [ {
													fieldLabel : '字段名',
													name : 'col_name'
												}, {
													fieldLabel : '字段代码',
													name : 'col_code'
												}, {
														fieldLabel:'数据类型',
														xtype:'combo',
														name:'datatype',
														displayField:'name',
														valueField:'value',
														blankText:'请选择数据类型',
														queryMode: 'Local',
														store:erp.DataUtil.getComboStore(erp.Const.FIELD_DATATYPE)
													}]
									}]
						});
				me.callParent(arguments);
			}
		});