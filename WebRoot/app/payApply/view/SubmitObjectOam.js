Ext.define('erp.payApply.view.SubmitObjectOam', {
	extend : 'erp.ux.Window',
	 requires : [
      'erp.payApply.view.SubmitObjectAdd'
      ],
	alias : 'widget.SubmitObjectOam',
	width : 600,
	title : '提交对象维护',
	iconCls : 'page_go',
	height : 800,
	modal: true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.SubmitObject');
		me.store.load();
		Ext.apply(me, {
					layout : {
						type : 'border',
						align : 'stretch'
					},
					dockedItems : [{
						xtype : 'toolbar',
						dock : 'top',
						itemId : 'EdtPayApplyBar',
						items : [{
									text : '增加',
									iconCls : 'page_add',
									itemId : 'add',
									handler : function() {
										me.addSubmitObject();
									}
								}, {
									text : '删除',
									iconCls : 'page_delete',
									itemId : 'delete',
									handler : function() {
										me.delSubmitObject();
									}
								}, {
									text : '退出',
									iconCls : 'page_error',
									itemId : 'btn_out',
									handler : function() {
										me.close();
									}
								}]
					}],
					items : [{
	    					xtype:'treepanel',
	    					region:'west',
	    					itemId:'Operatortree',
	    					collapsible:true,
	    					width:200,
	    					split:true,
	    					store : Ext.create('erp.view.master.perchasepriceadjust.store.CzybmListTree',{autoLoad:true}),
	    					listeners:{
	    				    	'itemclick':function(t,rec){
	    				  			if(rec.get('nodeId')!=0){
	    				  				me.store.proxy.extraParams.ssbm=rec.get('nodeId');
	    				  				me.store.loadPage(1);
	    				  			}else{
	    				  				delete me.store.proxy.extraParams.ssbm;
	    				  				me.store.loadPage(1);
	    				  			}
	    			 		 	}
	    					}
	    				},{
						region : 'center',
						xtype : 'grid',
						itemId : 'SubmitObject',
						flex : 1,
						overflowY : 'auto',
						overflowX : 'auto',
						columns : [{
							dataIndex : 'czy_gh',
							header : '工号',
							width : 80
						}, {
							dataIndex : 'czy_xm',
							header : '姓名',
							width : 80
						}, {
							dataIndex : 'lbmc',
							header : '所属部门',
							width : 120
						}, {
							dataIndex : 'gzgw',
							header : '工作岗位',
							width : 100
						}],
						store : me.store
					}]
				});
		me.callParent(arguments);
	},
	addSubmitObject : function() {
		var me = this;
		var treeGrid=me.down('#Operatortree');
		var trees = treeGrid.getSelectionModel().getSelection();
		if(Ext.isEmpty(trees)){
			Ext.Msg.alert('提示', '请先选择部门后再维护提交对象!');
		}else{
		var tr = trees[0];
		var bmbh=tr.get('nodeId');
		var win = Ext.widget('SubmitObjectAdd',{});	
		win.down('#btn_confirm').on({
						click : function(btn) {
						var win = btn.up('window');
						var grid = win.down('#Operator');
						var rec = grid.getSelectionModel().getSelection()[0];
						var r = Ext.create('erp.payApply.model.SubmitObject',
							{
								czy_gh : rec.get('czy_gh'),
								czy_xm : rec.get('czy_xm'),
								ssbm : bmbh,
								gzgw : rec.get('gzgw')
							});
						r.phantom=true;	
						me.store.add(r);
						me.store.sync({
										success : function(batch, options) {
											me.store.reload();
										}
									});
						win.close();
					}
				});
		win.show();
		}
	},
	delSubmitObject : function() {
		var me = this;
		var rec = me.down('#SubmitObject').getSelectionModel().getSelection();
		if (Ext.isEmpty(rec)) {
			Ext.Msg.alert('提示', '请先选中一条记录');
			return;
		}
		// 删除前验证

/*		for (x in rec) {
			if (rec[x].get('sdbj') == "1") {
				Ext.Msg.alert("提示", "" + rec[x].get('tzdh') + "预付调整单已锁定不能删除!");
				return;
			}
		}*/
		Ext.Msg.confirm("提示", "确认删除记录?", function(btn) {
					if (btn == "yes")
						me.store.remove(rec);
					me.store.sync({
								success : function(batch, options) {
									me.store.reload();
								}
							});
				})
	}
});