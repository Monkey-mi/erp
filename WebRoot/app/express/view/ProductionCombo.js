/**
 * 产品选择帮助窗口
 */
Ext.define('erp.express.view.ProductionCombo', {
	extend : 'erp.ux.Window',
	alias : 'widget.ProductionCombo_Help',
	title : '产品名称选择帮助窗口',
	alwaysOnTop : true,
	//iconCls:'box',
	//modal : true
	requires : [
	'erp.master.production.store.ProductionTypeTree',
	'erp.master.production.store.Production'
	],
	width : 840,
	height : 0.6 * window.screen.height,
	initComponent : function() {
		var me = this;
		me.Treestore = Ext.create('erp.master.production.store.ProductionTypeTree');
		me.store = Ext.create('erp.master.production.store.Production');
		me.field=me.field||{};
		var val=me.field.getValue();
		if(val!=null){
			me.store.proxy.extraParams.xsbjsearch=val.replace(/\s+/g,"");
		}
		me.store.load();
		Ext.apply(this, {
					items : [{
								buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES',handler:function(){
									
									var tgrid=me.down('#Production');
									var recs=tgrid.getSelectionModel().getSelection();
									var rec=recs[0];
									/*if(cusConfig!=null){
										var editor=me.field.editor;
										console.log()
										var grid = editor.grid;
										var srec = grid.getSelectionModel().getSelection()[0];
									}*/
									if(recs.length==0){
										Ext.Msg.alert('提示','请至少选择一条记录');
										return ;
									}
									me.onSubmit(rec,recs);
								}},{
										text:'关闭',
										iconCls:'cancel',
										handler:function(){
											me.close();
										}
								}],
								xtype : 'panel',
								layout : 'border',
								items : [{
											itemId:'kind',
											region:'west',
											split:true,
											width:200,
											xtype:'treepanel',
											store:me.Treestore,
											listeners:{
												select:function(row,rec){
													var lbbh=rec.get('nodeId');
													me.store.proxy.extraParams.lbbh=lbbh;
													me.store.loadPage(1);
												}
											}
											},{
											tbar:[{xtype : 'gridsearchfield',
												fieldLabel:'产品名称或产品货号',
												labelWidth:140,
												focusWidth:280,
												blurWidth:160,
												width:200,
												store:me.store}],
											xtype : 'grid',
											region:'center',
											itemId:'Production',
											store : me.store,
											listeners:{
												itemdblclick:function(th,rec,item){
													var tgrid=me.down('#Production');
									                var recs=tgrid.getSelectionModel().getSelection();
									                var rec = recs[0]
													me.onSubmit(rec,recs);
												}
											},
											selModel:Ext.create('Ext.selection.CheckboxModel',{
												mode:me.field.selModel
											}),
											columns : [{
														text : '半成品标记',
														dataIndex : 'bcpbj',
														xtype:'checkcolumn',
														width:100
													}, {
														text : '产品编号',
														dataIndex : 'cpbh',
														width:120
													}, {
														text : '产品图号',
														dataIndex : 'cpth',
														width:100
													},{
													    text:'产品名称',
													    dataIndex:'cpmc',
													    width:200
													},{
													    text:'单位',
													    dataIndex:'jldw',
													    width:80
													},
													{
													    text:'客户货号',
													    dataIndex:'khxh',
													    width:100
													},
													{
													    text:'原始编号',
													    dataIndex:'ysbh',
													    width:100
													},
													{
													    text:'原始名称',
													    dataIndex:'ysmc',
													    width:200
													}
													],
											dockedItems:[{
									    		xtype : 'pagingbar',
							                    stateId : '8081d6f3-9db7-470d-b764-dasddbb70c5e81b1',
									    		dock:'bottom',
									    		displayInfo:true,
									    		defaultPageSize : 50,
									    		store:me.store
									    	}]
										}]
							}]
				});
		this.callParent(arguments);
	},
	onSubmit : function(rec,recs) {
		var me = this;
		var cusConfig=me.field.cusConfig;
		if(cusConfig!=null){
			var field=cusConfig.field;
			var callback = cusConfig.callback;
			if (Ext.isFunction(callback)) {
				callback(this, rec,recs);
			}
			/*me.field.setValue(rec.get(field));*/
		}else{
			me.field.setValue(rec.get('cpmc'));
		}
		console.log(me)
		me.close();
		console.log('cc')
	}
});