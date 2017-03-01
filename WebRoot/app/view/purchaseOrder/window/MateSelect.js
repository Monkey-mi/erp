/**
 * 材料选择帮助窗口
 */
Ext.define('erp.view.purchaseOrder.window.MateSelect', {
	extend : 'erp.ux.Window',
	alias : 'widget.MateSelect_Help',
	title : '材料选择帮助窗口',
	//iconCls:'box',
	//modal : true,
	requires : [
		'erp.view.master.purchaseDetail.store.MaterialCateTree',
		'erp.view.master.purchaseDetail.store.MaterialDetail'
	],
	width : 900,
	height : 0.6 * window.screen.height,
	initComponent : function() {
		var me = this;
		me.Treestore = Ext.create('erp.view.master.purchaseDetail.store.MaterialCateTree');
		me.store = Ext.create('erp.view.master.purchaseDetail.store.MaterialDetail');
		me.store.load();
		Ext.apply(this, {
					items : [{
								buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES',handler:function(){
									var tgrid=me.down('#Material');
									var recs=tgrid.getSelectionModel().getSelection();
									var rec=recs[0];
									if(recs.length==0){
										Ext.Msg.alert('提示','请至少选择一条记录');
										return ;
									}
									me.onSubmit(rec,recs);
									me.close();
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
											width:140,
											xtype:'treepanel',
											store:me.Treestore,
											listeners:{
												select:function(row,rec){
													var lbbh=rec.get('nodeId');
													me.store.proxy.extraParams.lbbh=lbbh;
													me.store.loadPage(1);
												},
								    			 afteritemexpand:function(t){
								    			 	var tree=me.down('#kind');
								    			 	if(!t.data.root){
								    			 		var root=t.parentNode;
								    			 		tree.collapseNode(root);
								    			 		tree.expandNode(root);
								    			 	}
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
													me.close();
												}
											},
											selModel:Ext.create('Ext.selection.CheckboxModel'),
											columns : [{
														text : '质检',
														dataIndex : 'zjbj',
														width:40,
														renderer:erp.Util.Staterenderer
													}, {
														text : '半成品',
														dataIndex : 'bcpbj',
														width:45,
														renderer:erp.Util.Staterenderer
													}, {
													    text:'材料货号',
													    dataIndex:'clhh',
													    width:60
													}, {
													    text:'材料图号',
													    dataIndex:'clth',
													    width:60
													},
													{
													    text:'材料名称',
													    dataIndex:'clmc',
													    width:410
													},
													{
													    text:'单位',
													    dataIndex:'jldw',
													    width:40
													},
													{
													    text:'原始货号',
													    dataIndex:'yshh',
													    width:100
													},
													{
													    text:'原始名称',
													    dataIndex:'ysmc',
													    width:180
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
	}
});