/**
* @类职责简要描述	主要用于枚举类型相关表单的控制
* @author 伍恰
* @time 2014/01/05
* @see erp.basicdata.enumType.controller.EnterprisePropertyCtl
*/
Ext.define('erp.basicdata.enumType.controller.EnterprisePropertyCtl', {
	extend : 'Ext.app.Controller',
	views : [
		'erp.basicdata.enumType.view.EnterprisePropertyManager'
	],
	refs : [
			{ref : 'mng_EPManager',selector : 'mng_EnterprisePropertyManager'},
			{ref : 'grd_EPManager',selector : 'mng_EnterprisePropertyManager #grd_EP'}
			],
	
	init:function(){
		var me = this;
		var mjbh;
		if (me.isInited)
			return;
		me.control({
			/*主界面按钮监测事件*/
			'mng_EnterprisePropertyManager #EPButton button':{
				click : me.doAction
			},
			/* 主界面表格选择事件
			 * 功能：1.判断表格中是否有选中列 调节删除和修改按钮
			 * */
			'mng_EnterprisePropertyManager #grd_EP':{
				selectionchange : function(grid, rec) {
							if (rec.length > 0) {
								me.setBtnStatus(false);
							} else {
								me.setBtnStatus(true);
							}
						}
			}
		});
			// controller初始化完成
			this.isInited = true;
	},
	/*增删方法跳转*/
	doAction:function(btn){
		var me=this;
		switch (btn.itemId) {
			case erp.Const.FUNC_ITEMID_BTN_ADD :
				var grid=me.getGrd_EPManager();
				var rowEditing=grid.plugins[0];
				rowEditing.cancelEdit();
				var r = Ext.create('erp.basicdata.enumType.model.EnumType', {
							mjbh : me.getMng_EPManager().mjbh,
							oo:'000'//标记是否是增加
				});
			                grid.getStore().insert(0, r);
			                rowEditing.startEdit(0, 0);
				break;
			case erp.Const.FUNC_ITEMID_BTN_DEL :
				this.doDeleteEP();
				break;
			
		}
	},
	/* 修改按钮状态*/
	setBtnStatus : function(sts) {
		var me = this;
		var panel = me.getMng_EPManager();
		panel.down('#BTN_DEL').setDisabled(sts);
	},
	/*删除方法*/
	doDeleteEP : function() {
		var me = this;
		var grid=me.getGrd_EPManager();
		var recs = grid.getSelectionModel().getSelection();
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(
						btn) {
					if (btn == "yes") {
						Ext.Array.each(recs,function(rec){
							grid.getStore().remove(rec);// 从 Store 中删除给定的记录,
						});
						grid.getStore().sync({
							success : function(e, batch) {
									Ext.Msg.alert('提示', '删除成功！');
							},
							failure : function(batch, options) {
									Ext.Msg.alert('提示', '删除失败！');
							}
						});
						if(grid.getStore().getCount()==0){
							grid.getStore().loadPage(1);
						}
					}
				})
	}
})