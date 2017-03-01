Ext.define('erp.materialQualityTesting.view.MaterialName1',{
	extend: 'erp.ux.Window',
	alias: 'widget.MaterialName_Help',
	title: '材料选择',
	requires: ['erp.materialQualityTesting.store.Clbmb',
	           'erp.materialQualityTesting.store.CllbTree'],
	width: 1000,
	height: 0.65 * window.screen.height,
	initComponent: function() {
		var me = this;
		me.store = Ext.create('erp.materialQualityTesting.store.Clbmb');
		me.CllbTreeStore=Ext.create('erp.materialQualityTesting.store.CllbTree');
		var val = me.field.getValue();
		if (val != null) {
			me.store.proxy.extraParams.xsbjsearch = val.replace(/\s+/g, "");
		}
		me.store.load();
		Ext.apply(this, {
			items: [{
				buttons: [{
					text: '确定',
					iconCls: 'accept',
					itemId: 'BTN_YES',
					handler: function() {
						var editor = me.field.editor;
						var cusConfig = me.field.cusConfig;
						var tgrid = me.down('#Material');
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
					text: '退出',
					iconCls: 'cancel',
					handler: function() {
						me.close();
					}
				}],
				xtype: 'panel',
				layout: 'border',
				items: [{															
					xtype: 'grid',
					region: 'center',
					itemId: 'Material',
					store: me.store,
					listeners: {
						itemdblclick: function(th, rec, item) {
							me.onSubmit(rec);
						}
					},
					selModel: Ext.create('Ext.selection.CheckboxModel', {
						mode: me.field.selModel
					}),
					columns: [
//                    {
//                      header: '质检',
//                      width: 40,
//                      dataIndex: 'zjbj',
//                      renderer: function (dybj) {
//                      if (zjbj == "true" || zjbj == "1") {
//                       return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
//                       } else {
//                      return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}'  />";
//                       }
//                      }   
//                     },
                     {
                         header: '半成品',
                         width: 80,
                         dataIndex: 'bcpbj',
                         renderer: function (bcpbj) {
                         if (bcpbj == "true" || bcpbj == "1") {
                          return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
                          } else {
                         return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}'  />";
                          }
                         }   
                        },
					    {
						text: '材料货号',
						dataIndex: 'clhh',
						width: 110
					},
					{
						text: '材料名称',
						dataIndex: 'clmc',
						width: 210
					},
					{
						text: '单位',
						dataIndex: 'jldw',
						width: 110

					},
					{
						text: '原始货号',
						dataIndex: 'yshh',
						width: 80
					},
					{
						text: '原始名称',
						dataIndex: 'ysmc',
						width: 110
					}],					
					dockedItems: [{
						xtype: 'pagingbar',
						stateId: '8081d6f3-9db7-470d-b764-dasddbb70c5e81b1',
						dock: 'bottom',
						displayInfo: true,
						defaultPageSize: 25,
						store: me.store
					}]
				},
				{
	    			xtype:'treepanel',
	    			region:'west',
	    			reference:'cllbtree',
	    			collapsible:true,
	    			width:200,
	    			split:true,
	    			store:me.CllbTreeStore,
	    			listeners:{
	    			  'itemclick':function(t,rec){
	    			  		if(rec.get('nodeId')!=0){
	    			  			me.store.proxy.extraParams.lbbh=rec.get('nodeId');
	    			  			me.store.loadPage(1);
	    			  			me.cglb=rec.get('nodeId');
	    			  		}else{
	    			  			delete me.store.proxy.extraParams.lbbh;
	    			  			me.store.loadPage(1);
	    			  			me.lbbh='';
	    			  		}
	    			  }
	    			}
	    	}
				]
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
		me.field.setValue(rec.get('clmc'));
	}
	me.close();
}
});