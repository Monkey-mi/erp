/*准入评估信息页面*/
Ext.define('erp.supplierAccess.view.AccessMainInfo',{
	extend:'erp.ux.Window',
	alias:'widget.access_MainInfo',
	requires:['erp.supplierAccess.view.AccessBaseInfo'
			,'erp.supplierAccess.view.EvaluateManager'
			],
	overflowY: 'auto',
	modal:true,
	isAdd:false,
	isEdit:false,
	listeners:{
		
	},
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			height:document.body.clientHeight<800?document.body.clientHeight:800,
			width:document.body.clientWidth<1200?document.body.clientWidth:1200,
			layout:{
		     	type: 'vbox',//垂直分布
		     	align: 'stretch'
    		},
			items:[{
			//准入评估基本信息
				xtype:'access_BaseInfo',
				itemId:'accessBaseInfo',
				tbar:[{text:'保存(审核信息)',iconCls:'page_save',itemId:'BTN_SAVE'}]
				//height:136
			},{
				
//				//13项评估具体页面
				flex:1,
				height:document.body.clientHeight-136,
				padding:'0 4 0 0',
				overflowY: 'auto',
				xtype:'access_EvaluateManager',
				itemId:'access_EvaluateManager',
				accessScore:me.accessScore,
				company_id:me.supplierLoopRec.get('company_id'),
				loop_id:me.loop_id
			}]
		});
	me.callParent(arguments);
	me.loadRec(me.supplierRec,me.supplierLoopRec);
	},
	loadRec:function(supplierRec,supplierLoopRec){
		var me=this;
		var accessBaseInfo=me.down('#accessBaseInfo')
		accessBaseInfo.down('#SupplierInfo').loadRecord(supplierRec);
		accessBaseInfo.down('#plEvaluateExamineInfo').loadRecord(supplierLoopRec);
	}
});