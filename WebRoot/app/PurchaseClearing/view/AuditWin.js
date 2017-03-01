Ext.define('erp.PurchaseClearing.view.AuditWin',{
   extend: 'erp.ux.Window',
   alias: 'widget.win_Audit',
   title: '入库单价核查',
   modal: true,
   width:  900,
   height: 650,
    initComponent: function(){
      var me = this;
      Ext.apply(me,{
          layout : {
          	    type:'vbox',
				align:'stretch'
          },
           defaults:{padding:5},	
           items : [{
             xtype : 'grid',
             itemId : 'grd_Audit',
             overflowY:'auto',
			 overflowX:'auto',
			 columns : [
			   {header : '仓库名称',width:100 ,dataIndex : 'ckbh'},
			   {header : '入库单号',width: 80,dataIndex : 'rkdh'},
			   {header : '序号',width: 40,dataIndex : 'rkxh'},
			   {header : '入库日期',width: 100,dataIndex : 'rkrq',xtype:'datecolumn',format:'Y-m-d'},
			   {header : '厂商名称',width: 250,dataIndex : 'csmc'},
			   {header : '材料货号',width: 100,dataIndex : 'clhh'},
			   {header : '材料名称',width: 200,dataIndex : 'clmc'},
			   {header : '单位',width: 60,dataIndex : 'jldw'},
			   {header : '当前控价',width: 80,dataIndex : 'kzdj'},
			   {header : '采购控价',width: 80,dataIndex : 'cgkj'},
			   {header : '采购单价',width: 80,dataIndex : 'cgdj'},
			   {header : '入库单价',width: 80,dataIndex : 'rkdj'},
			   {header : '合同号',width: 100,dataIndex : 'hth'},
			   {header : '票据日期',width: 100,dataIndex : 'pjrq',xtype:'datecolumn',format:'Y-m-d'}
			   ]
			   ,store : me.hcStore,
		     	plugins:Ext.create('Ext.grid.plugin.CellEditing', {
						        clicksToEdit : 1,
						        autoCancel: false,
						        itemId:'cellEditing',
						        listeners:{
						        	'beforeedit':function(field,e){
						        			if (!(me.isAdd||me.isEdit)){
						        				e.cancel=true;
						        			}
						        	},
						        	'edit':function(field,e){
						        	}
						}})
			}
           ]
      });
        me.callParent(arguments);
    }
})