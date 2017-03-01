Ext.define('erp.PurchaseClearing.view.GjClearing',{
     extend : 'erp.ux.Window',
     alias: 'widget.win_Gjjs',
     title : '钢价结算',
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
             itemId : 'grd_Gjjs',
         /*    overflowY:'auto',
			 overflowX:'auto',*/
			 features: [{
					ftype: 'summary',
				    summaryType: 'count',
					dock: 'bottom'
				}],
			columns : [
		     	{header : '送货日期',width: 100,dataIndex: 'shsj',xtype:'datecolumn',format:'Y-m-d' },
		     	{header : '送货单号',width: 100,dataIndex: 'shdh' },
		     	{header : '入库日期',width: 100,dataIndex: 'rkrq',xtype:'datecolumn',format:'Y-m-d' },
		     /*	{header : '费用日期',width: 100,dataIndex: 'fyrq',xtype:'datecolumn',format:'Y-m-d',hidden:true },*/
		     	{header : '入库单号',width: 80,dataIndex: 'rkdh' },
		     	{header : '合同号',width: 100,dataIndex: 'hth' , 
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
		     	{header : '采计号',width: 80,dataIndex: 'cgh' },
		     	{header : '关联合同编号',width: 100,dataIndex: 'glht' },
		     	{header : '材料货号',width: 80,dataIndex: 'clhh' },
		     	{header : '材料名称',width: 280,dataIndex: 'clmc' },
		     	{header : '规格尺寸',width: 150,dataIndex: 'cltx1' },
		     	{header : '备注说明',width: 280,dataIndex: 'bzsm' },
		     	{header : '单位',width: 50,dataIndex: 'jldw' },
		     	{header : '采购数量',width: 80,dataIndex: 'cgsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            }},
		     	{header : '入库数量',width: 80,dataIndex: 'rksl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            } },
		     	/*{header : 'PONO',width: 100,dataIndex: 'sxdy09' },*/
		        {header : '含税单价',width : 100,dataIndex: 'rkdj'},
				{header : '含税金额',width : 100,dataIndex: 'rkje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
		     	{header : '仓库名称',width : 100,dataIndex: 'ckmc'},
		     	{header : '仓库编号',width : 100,dataIndex: 'ckbh',hidden : true},
		     	{header : '加工单价',width: 100,dataIndex: 'jgdj' },
		     	{header : '加工金额',width: 100,dataIndex: 'jgje' },
		     	{header : '五金件单套价',width : 80,dataIndex: 'wjdj'},
		     	{header : '五金件金额',width : 80,dataIndex: 'wjje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
		     	{header : '管材单套价',width : 80,dataIndex: 'gcdj'},
		     	{header : '管材金额',width : 80,dataIndex: 'gcje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
		     	{header : '操作员',width: 80,dataIndex: 'czym' },
		     	{header : '操作时间',width: 100,dataIndex: 'czsj' ,xtype:'datecolumn',format:'Y-m-d'}
				],store : me.store 	
             }]
         });
          me.callParent(arguments); 
      }
})