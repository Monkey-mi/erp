Ext.define('erp.bi.view.MultiDatasource',{
	extend: 'erp.ux.Panel',
	alias: 'widget.MultiDatasource',
	requires:['erp.bi.view.DatasourceCenter','erp.bi.view.DatasourceParams','erp.bi.view.DsSqlScript'],
	layout: 'border',
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype:'panel',
				region: 'west',
				layout:'border',
				width:300,
				collapsible:true,
				split:true,
				items:[
					{	
						itemId:'dsCenter',
						//id:'dsCenter',
						xtype: 'datasourceCenter',
						region: 'center',
						flex:1
					},
					{
						xtype: 'datasourceParams',
						itemId:'dsParams',
						region: 'south',
						flex: 1
				}]
			}, {
				xtype: 'panel',
				itemId:'sqlDefine',
				region: 'center',
				split:true,
				disabled:true,
				border: false,
				width: 300,
				layout: 'border',
				items: [{
					xtype: 'ds_sqlscript',
					itemId:'Sql_script',
					region: 'center',
					title:'SQL执行器',
					flex: 1
				}]
			}/*,{
				xtype:'dsdesc',
				itemId:'sqlDesc',
				region:'east',
				collapsible:true,
				split:true,
				disabled:true,
				flex:.5
			}*/]
		});
		me.callParent(arguments);
	},
	setTarModel: function(rec){
		var me = this;
		me.listId=rec.get('list_id');
		me.reportType=rec.get('report_type');
		me.cycleType=rec.get('cycle');
		me.down('#dsCenter').InitParentId(rec.get('list_id'));
		me.down('#dsParams').InitParentId(rec.get('list_id'));
	}
});