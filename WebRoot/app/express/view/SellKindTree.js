Ext.define('erp.express.view.SellKindTree',{
	extend:'Ext.tree.Panel',
	alias:'widget.tre_sellKind',
	minWidth:150,
	relateCtl:null,
	requires:['erp.express.store.SellkindTree'],
	initComponent:function(){
 		var me =this;
 		var store=Ext.create('erp.express.store.SellkindTree');
 	
// 		var items=Ext.create('Ext.tree.Panel',{title:'销售类别选择',
//	collapsible:true,useArrows:true,store:store});	
 		Ext.apply(me,{title:'销售类别选择',collapsible:true,useArrows:true,store:store});
 		me.callParent(arguments);
 	}
});