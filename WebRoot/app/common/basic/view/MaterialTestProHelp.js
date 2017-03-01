/**
 * 测试项目帮助窗口
 */
Ext.define('erp.common.basic.view.MaterialTestProHelp', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.MaterialTestPro_help',
	title : '测试项目帮助窗口',
	requires : ['erp.materialInspection.store.MaterialTestPro'],
	width : 800,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.materialInspection.store.MaterialTestPro');
		Ext.apply(me.store.proxy.extraParams,{usePaging:true});
		me.store.load();
		//修改：窗口关闭后清除筛选条件
		this.on('beforedestroy',function(){
 			delete me.store.proxy.extraParams.condition;
 		});
		Ext.apply(this, {
					layout:{type:'hbox',align: 'stretch',defaultMargins:{right:5}},
					items : [
						{ 
								xtype : 'panel',
								layout : 'fit',
								flex:2,
								items : [{
											xtype : 'grid',
											store : me.store,
											columns : [{
														text : '项目编号',
														dataIndex : 'xmbh',
														width:100
													}, {
														text : '测试类别',
														dataIndex : 'cslb',
														width:100
													},{
													   text : '测试标准',
														dataIndex : 'xmmc',
														width:500
													}
													],
											dockedItems : [{
														xtype : 'pagingtoolbar',
														store : me.store,
														dock : 'bottom',
														displayInfo : true
													}]

										}]
							}]
				});
		this.callParent(arguments);
	},
	doFilter:function( panel,rec){
		this.store.load();
	}
});