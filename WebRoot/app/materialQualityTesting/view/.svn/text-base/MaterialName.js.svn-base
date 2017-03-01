/**
 * 材料选择帮助窗口
 */
Ext.define('erp.materialQualityTesting.view.MaterialName', {
	extend : 'erp.ux.Window',
	alias : 'widget.H_MaterialName',
	title : '材料选择帮助窗口',
	//iconCls:'box',
	//modal : true,
	requires : [
	'erp.materialQualityTesting.store.CllbTree',
	'erp.materialQualityTesting.store.Clbmb'
	],
	width : 840,
	height : 0.6 * window.screen.height,
	initComponent : function() {
		var me = this;
		me.Treestore = Ext.create('erp.materialQualityTesting.store.CllbTree');
		me.store = Ext.create('erp.materialQualityTesting.store.Clbmb');
		me.field=me.field||{};
		var val=me.field.getValue();
		if(val!=null){
			me.store.proxy.extraParams.xsbjsearch=val.replace(/\s+/g,"");
		}
		me.store.load();
		Ext.apply(this, {
					items : [{
								buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES',handler:function(){
									var editor=me.field.editor;
									var cusConfig=me.field.cusConfig;
									var tgrid=me.down('#Material');
									var recs=tgrid.getSelectionModel().getSelection();
									var rec=recs[0];
									var grid = editor.grid;
									var srec = grid.getSelectionModel().getSelection()[0];
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
												fieldLabel:'材料名称或材料货号',
												labelWidth:140,
												focusWidth:280,
												blurWidth:160,
												width:200,
												store:me.store}],
											xtype : 'grid',
											region:'center',
											itemId:'Material',
											store : me.store,
											listeners:{
												itemdblclick:function(th,rec,item){
													me.onSubmit(rec);
												}
											},
											selModel:Ext.create('Ext.selection.CheckboxModel',{
												mode:me.field.selModel
											}),
											columns : [{
														text : '质检',
														dataIndex : 'zjbj',
														width:40,
														renderer:erp.Util.Staterenderer
													}, {
														text : '半成品',
														dataIndex : 'bcpbj',
														width:60,
														renderer:erp.Util.Staterenderer
													}, {
													    text:'材料货号',
													    dataIndex:'clhh',
													    width:80
													}, {
													    text:'材料图号',
													    dataIndex:'clth',
													    width:80
													},
													{
													    text:'材料名称',
													    dataIndex:'clmc',
													    width:180
													},
													{
													    text:'单位',
													    dataIndex:'jldw',
													    width:80
													},
													{
													    text:'原始货号',
													    dataIndex:'yshh',
													    width:100
													},
													{
													    text:'原始名称',
													    dataIndex:'ysmc',
													    flex:1
													}
													],
											dockedItems:[{
									    		xtype : 'pagingbar',
							                    stateId : '8081d6f3-9db7-470d-b764-dasddbb70c5e81b1',
									    		dock:'bottom',
									    		displayInfo:true,
									    		defaultPageSize : 25,
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
			} else if (cusConfig.type == 'ContractDetail') {
				me.forSetGrid(rec, recs);
			}
			me.field.setValue(rec.get(field));
		}else{
			me.field.setValue(rec.get('clmc'));
		}
		me.close();
	}
});