/*准入评估信息页面*/
Ext.define('erp.supplierManager.view.accessToEvaluate.EvaluateMain',{
	extend:'erp.ux.Panel',
	alias:'widget.access_EvaluateMain',
	requires:['erp.supplierManager.view.accessToEvaluate.EvaluateBaseInfo'
			,'erp.supplierManager.view.accessToEvaluate.EvaluateDetails'
			],
	height:800,
	overflowY: 'auto',
	initComponent:function(){
		var me=this;
		me.on('beforedestroy',function(panel){
	 		panel.removeAll();
	 	});
		Ext.apply(me,{
			layout:{
		     type: 'vbox',//垂直分布
		     align: 'stretch'
    		},
			items:[{
			//准入评估基本信息
				xtype:'access_EvaluateBaseInfo',
				itemId:'access_EvaluateBaseInfo',
				supplierRec:me.supplierRec
				//height:200
			},{
				
//				//13项评估具体页面
				flex:1,
				overflowY: 'auto',
				xtype:'access_EvaluateDetails',
				itemId:'access_EvaluateDetails'
			}]
		});
	me.callParent(arguments);}});