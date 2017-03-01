Ext.define('erp.bi.view.EditDatasourceParam', {
			extend : 'erp.ux.Window',
			alias : 'widget.edt_dsparam',
			title : '数据源参数维护',
			iconCls:'page_attach',
			modal:true,
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
							defaults:{padding:5},		
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
											padding:3,
											anchor : '95%',
											readOnly : me.isEdit,
											labelWidth : 80,
											msgTarget : 'qtip'
										},
										items : [{
													fieldLabel : '名字',
													name : 'name'
												}, {
													fieldLabel : '代码',
													name : 'code'
												}, 
													/*{
													xtype : 'helpField',
													fieldLabel : '数据类型',
													name : 'datatype',
													allowBlank:false,
													blankText:'请选择数据类型',
													code : erp.Const.FIELD_DATATYPE
													}, */
													{
														fieldLabel:'数据类型',
														xtype:'combo',
														name:'datatype',
														displayField:'name',
														valueField:'value',
														blankText:'请选择数据类型',
														queryMode: 'Local',
														store:erp.DataUtil.getComboStore(erp.Const.FIELD_DATATYPE)
													},
													{
													xtype : 'numberfield',
													fieldLabel : '序号',
													name:'seq'
												},
												{
													xtype : 'helpField',
													fieldLabel : "基础数据",
													name : 'basic_code',
													hidden:true,
													code : erp.DataConst.CODE_CONFIG
												},
												{
													fieldLabel : "默认值",
													name : 'default_value'
												}
												]
									}]
						});
				me.callParent(arguments);
			}
		});