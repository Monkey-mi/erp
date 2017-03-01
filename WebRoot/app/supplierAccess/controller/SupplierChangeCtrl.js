Ext.define('erp.supplierAccess.controller.SupplierChangeCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
		'erp.ux.PagingBar'
	],
	views : [
		'erp.supplierAccess.view.SupplierChangeManage',
		'erp.supplierAccess.view.SupplierChangeShow'
	],
	refs : [
			{ref : 'mng_panel',selector : 'mng_supplierChange'},
			{ref : 'mng_grid',selector : 'mng_supplierChange #grd_SupplierChange'}
	],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
				'mng_supplierChange':{
					afterrender:function(cmp){	
						cmp.store.load();
						me.mainpanel=cmp;
					}
				},
				'mng_supplierChange #top_bar button':{
					click:me.doAction
				},
				//查询框回车事件
				'mng_supplierChange #top_bar #search':{
					'keypress':function(field,key){
						if(key.getKey()==13)
						{
							me.doQuery();
						}
					}
				},
				'mng_supplierChange #grd_SupplierChange':{
					selectionchange:function(grid, rec){
						if (rec.length > 0) {
							me.setBtnStatus(false);
						}
						else
						{
							me.setBtnStatus(true);
							
						}
					},
					itemdblclick : function(grid, rec) {
						var win =Ext.create('erp.supplierAccess.view.SupplierChangeShow',{
							supplierRec:rec,
							glyph:0xf0f0,
							isAdd:false,
							isEdit:false,
							closable:true
						});
						win.show();
					}
				}
		});
		// controller初始化完成
		this.isInited = true;
	},
	doAction:function(btn){
		var me=this;
		var grid=me.getMng_grid();
		var recs=grid.getSelectionModel().getSelection();
		switch (btn.itemId) {
			case 'btn_AuditPass':
				if(recs.length==0){
					Ext.Msg.alert('提示','请至少选择一条记录');
					break;
				}
				Ext.Msg.confirm('提示', '是否确认所选厂商变更信息，审核通过？', function(btn) {
					if (btn == 'yes') {
						var ids=new Array();
						Ext.each(recs,function(rec){
							ids.push("'"+rec.get('auth_update_id')+"'");
						})
						var myMask = new Ext.LoadMask({
								    target : grid
						});
						myMask.mask('数据导入中...');
						var result = erp.Const.callServiceMethodSync(
						'supplierAccess/common.srm?method=updateSupplierChangeStateByWS',
						{ids : ids.join(','),state:2});
						myMask.unmask();
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						grid.getStore().load();
						Ext.toastInfo('修改成功');
					}
				})
			break;
			case 'btn_AuditUnPass':
				if(recs.length==0){
					Ext.Msg.alert('提示','请至少选择一条记录');
					break;
				}
				Ext.Msg.confirm('提示', '是否确认所选厂商变更信息，审核不通过？', function(btn) {
					if (btn == 'yes') {
						var ids=new Array();
						Ext.each(recs,function(rec){
							ids.push("'"+rec.get('auth_update_id')+"'");
						})
						var myMask = new Ext.LoadMask({
								    target : grid
						});
						myMask.mask('数据导入中...');
						var result = erp.Const.callServiceMethodSync(
						'supplierAccess/common.srm?method=updateSupplierChangeStateByWS',
						{ids : ids.join(','),state:3});
						myMask.unmask();
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						grid.getStore().load();
						Ext.toastInfo('修改成功');
					}
				})
			break;
			case 'btn_search':
				this.doQuery();
			break;
		}
	}/*查询列表页面功能*/
	,doQuery:function(){
		var me=this;
		var panel=me.getMng_panel();
		var condition=panel.down('#search').getValue();
		panel.store.proxy.extraParams.condition=condition;
		panel.store.loadPage(1);
	},/* 修改按钮状态*/
	setBtnStatus : function(sts) {
		var me = this;
		var panel = me.getMng_panel();
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
	}
});