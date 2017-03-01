Ext.define('erp.ux.BakCombox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.bakcombo',
	queryMode : 'local',
	displayField : 'show',
	editable : false,
	value:'当前',
	valueField : 'show',
	fieldLabel : '年度',
	labelWidth : 40,
	width:120,
	store:[['当前','当前'],['历史','历史']],
    initComponent: function() { 
        var me = this; 
       /* //历史数据日志表
        this.store=Ext.create('erp.master.bakTable.store.BakTable');
		var result = erp.Const.callServiceMethodSync('baktable/baktable.act?method=getBakTableList',{
			table_name:me.table||'cgjhmxb'
		});
		var data=new Array();
		//封装数组
		Ext.each(result,function(m){
			data.push(Ext.create('erp.master.bakTable.model.BakTable',m));
		})
		//新增当前
		data.push(Ext.create('erp.master.bakTable.model.BakTable',{show:'当前',bak_table_name:'cgjhmxb',bak_begin_dt:new Date()}));
		this.store.add(data);*/
        me.callParent(arguments); 
    } 
}); 