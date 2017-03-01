Ext.define('erp.materialInspection.view.WareHouseTree',{
	extend:'Ext.tree.Panel',
	alias:'widget.tree_warehouse',
	minWidth:150,
	relateCtl:null,
	requires:['erp.materialInspection.store.WareHouse'],
	initComponent:function(){
 		var me =this;
 		var store=Ext.create('erp.materialInspection.store.WareHouse');
 	
 		Ext.apply(me,{title:'仓库类别选择',collapsible:true,useArrows:true,store:store});
 		me.callParent(arguments);
 	}
});