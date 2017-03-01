Ext.define('erp.bi.view.EditDatasourceCenter', {
	extend : 'erp.ux.Window',
	alias : 'widget.edt_dscenter',
	requires : ['erp.ux.FormKey','erp.ux.RemoteValidator'],
	title : '多数据源维护',
	iconCls:"link",
	initComponent : function() {
		var me = this;
		var fieldValid = {
			isChange : me.isAddNews
		}
		cmbStore=Ext.create('erp.common.form.store.FrmTbls',{freg_id:me.list_id,type:erp.Const.FRMTBL_TYPE_REPORT});
		cmbSubStore=Ext.create('erp.common.form.store.FrmFlds');
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
				plugins:{ ptype: 'FormKey' },
				defaults : {
					xtype : 'textfield',
					labelAlign : 'right',
					anchor : '95%',
					labelWidth : 80,
					msgTarget : 'qtip'
				},
				items : [
						{
							fieldLabel : '名字',
							name : 'name',
							readOnly : me.isEdit
						}, {
							fieldLabel : '代码',
							name : 'code',
							allowBlank : false,
							plugins : {
								ptype : 'RemoteValidator',
								rvOptions : {
									url : 'dc/dsCenterCheck.do?method=isExistDc',
									passIsValid : false, // 已存在反而是校验不通过
									vTexts : ["数据源代码已存在!", "数据源代码不存在!"]
								},
								fieldValid : fieldValid
							},
							listeners : {
								change : function() {
									fieldValid.isChange = true;
								}
							},
							readOnly : me.isEdit
						},
						{
							xtype:'combo',
							fieldLabel:'统计表名',
						   	name:'ft_id',
						   	allowBlank : !(me.reportType==erp.Const.BIZ_TYPE_STATS),
						   	blankText:'请选择统计报表名!',
							hidden:!(me.reportType==erp.Const.BIZ_TYPE_STATS),
							store:cmbStore,
							displayField:'name',
							valueField:'ft_id',
							listeners:{
								select:function(combo,recs){
									cmbSubStore.load({params:{ft_id:recs[0].get('ft_id')}});
								}
							}
						},{
							fieldLabel:'统计字段名',
							blankText:'请选择统计字段!',
							name:'fd_code',
							itemId:'stats_field',
							xtype:'combo',
							store:cmbSubStore,
							displayField:'name',
							valueField:'code',
							queryMode: 'local',
							//报表类型为“统计报表”，并且周期不为空时，统计字段必须选择，否则可以不选
							allowBlank :!(me.reportType==erp.Const.BIZ_TYPE_STATS&&me.cycleType!=erp.Const.STATS_CYCLE_NONE),
							hidden:!(me.reportType==erp.Const.BIZ_TYPE_STATS)
						},
						{
							fieldLabel : '提示',
							name : 'tip',
							readOnly : me.isEdit
						},{
							fieldLabel : '数据描述链接',
							name : 'desc_url',
							readOnly : me.isEdit
						}]
			}]
		});
		me.callParent(arguments);
	}
});