Ext.define('erp.master.purchaseCost.view.EdtPurchaseCostDetial',{
        extend: 'Ext.tab.Panel',
        alias: 'widget.mng_Edtdetial',
        requires: ['erp.master.purchaseCost.store.purchaseCostSum',
                   'erp.master.purchaseCost.store.PurchaseCost',
                   'erp.master.purchaseCost.store.purchaseCostDetial'],
        initComponent: function(){
		var me = this;
		var bar=[];
		/*me.bzStore = Ext.create('');*/
		me.cgStore = Ext.create('erp.master.purchaseCost.store.PurchaseCost');
		me.fyStore = Ext.create('erp.master.purchaseCost.store.purchaseCostSum');
		me.fjStore = Ext.create('erp.master.purchaseCost.store.purchaseCostDetial');
		
		Ext.apply(me,{
		   defaults:{layout:'fit'},
		   items: [{
		                 itemId:'PurchaseCostPl',
		                 title: '采购费用',
		                
		                 items:[{
		                    xtype: 'grid',
		                    itemId:'grdPurchaseCostPl',
		                   	overflowY:'auto',
				            overflowX:'auto',
		                    columns:[
		                    {header: '序号',datIndex: 'fyxh',width:50},
		                    {header: '费用摘要', dataIndex:'fyzy',width:300},
		                    {header: '数量',dataIndex:'fysl',width:100},
		                    {header: '箱数',dataIndex:'fyxs',width:50},
		                    {header: '含税单价',dataIndex:'fydj',width:100},
		                    {header: '含税金额',dataIndex:'fyje',width:100},
		                    {header: '税率',dataIndex:'zzsl',width:50},
		                    {header: '除税单价',dataIndex:'csdj',width:100},
		                    {header: '除税金额',dataIndex:'csje',width:100},
		                    {header: '税额',dataIndex:'zzse',width:80},
		                    {header: '外币单价',dataIndex:'wbdj',width:100},
		                    {header: '币种',dataIndex:'wbbh',width:60},
		                    {header: '汇率',dataIndex:'wbhl',width:50},
		                    {header: '外币金额',dataIndex:'wbje',width:100},
		                    {header: '支付类别',dataIndex:'zflb',width:100},
		                    {header: '受益部门',dataIndex:'fsbm',width:100},
		                    {header: '分摊系数',dataIndex:'ftxs',width:100},
		                    {header: '销售类别',dataIndex:'xslb',width:100},
		                    {header: '生产工序',dataIndex:'gxbh',width:100},
		                    {header: '生产单号',dataIndex:'jhbz',width:100},
		                    {header: '计划号',dataIndex:'jhh',width:80},
		                    {header: '合同号',dataIndex:'hth',width:80},
		                    {header: '异常号',dataIndex:'ych',width:80},
		                    {header: '发货仓库',dataIndex:'fhck',width:100},
				            {header: '发货号',width: 100,dataIndex: 'fhh'},
				            {header: '调出仓库',width: 100,dataIndex: 'ckbh'},
				            {header: '调出号',width: 80,dataIndex: 'dbh'},
				            {header: '调出日期',width: 120,dataIndex: 'dcrq',xtype:'datecolumn',format:'Y-m-d'},
				            {header: '材料委托号',width: 100,dataIndex: 'clwth'},
				            {header: '产品委托号',width: 100,dataIndex: 'cpwth'},
				            {header: '手工通知号',width: 100,dataIndex: 'sgtzh'},
				            {header: '运输记录号',width: 100,dataIndex: 'ysjlh'},
				            {header: '转运人',width: 80,dataIndex: 'zyrm'},
				            {header: '出货编号',width:100 ,dataIndex: 'chbh'},
				            {header: '厂商名称',width:350,dataIndex: 'csmc'},
				            {header: '记录编号',width:60 ,dataIndex: 'jlbh'},
				            {header: '备注说明',width:300 ,dataIndex: 'bzsm'}
		                    ],
		                    store : me.cgStore   }]
		             },{
		         itemId:'fyPl',
		         title: '费用汇总',
		         items:[{
		            xtype: 'grid',
		            itemId:'grdCost',
		            columns: [
		            {header:'序号',dataIndex:'xmxh',flex: 1 },
		            {header: '费用项目',dataIndex:'fyxm',flex:6},
		            {header: '费用金额',dataIndex:'fyje',flex:3}
		            ],
		            store: me.fyStore }]
		         }, {
		         	itemId: 'fjPl',
		         	title: '附件明细',
		         	items:[{
		         	   xtype:'grid',
		         	   itemId: 'grdAccessory',
		         	   columns:[
		         	   {header: '文件编号',dataIndex:'wjbh',felx:2},
		         	   {header: '文件名称',dataIndex:'wjmc',felx:2},
		         	   {header: '创建人名',dataIndex:'cjrm',felx:1},
		         	   {header: '创建日期',dataIndex:'cjrq',felx:1}
		         	   ],
		         	   store: me.fjStore  }]
		         }]
		})
		me.callParent(arguments);
		},
   loadGridData : function(rec){
		var me=this;
		me.cgStore.load({params:{
		       fydh: rec.get('fydh')
		}});
		me.fyStore.load({params:{
		       fydh: rec.get('fydh')
		}});
			me.fjStore.load({params:{
		       fydh: rec.get('fydh')
		}});
		 }
})