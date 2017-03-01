Ext.define('erp.arrivalRegister.view.QueryArrivalRegister',{
     extend : 'erp.ux.Panel',
     alias: 'widget.Query_ArrivalRegister',
     requires : ['erp.arrivalRegister.store.Rkd'],
     closable : true,
     initComponent:function(){
        var me = this;
        me.store = Ext.create('erp.arrivalRegister.store.Rkd');
        Ext.apply(me.store.proxy.extraParams,{ckbh : me.ckbh,dhdh: me.dhdh,dhxh: me.dhxh});
        me.store.load();
        Ext.apply(me,{
           layout:{
                 type : 'fit',
                 padding : 2
              },
              items : [
                { 
                  xtype : 'grid',
                  itemId : 'grd_rkdquery',
                  overflowY:'auto',
			      overflowX:'auto',
			      features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }], 
			      columns:[
			      {header: '核销',width:40,dataIndex:'hxbj',renderer: erp.Util.Staterenderer, 
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '结账',width:40,dataIndex:'jzzt',renderer: erp.Util.Staterenderer},
			      {header: '锁定',width:40,dataIndex:'sdbj',renderer: erp.Util.Staterenderer},
			      {header: '红冲',width:60,dataIndex:'hcbj',renderer: erp.Util.Staterenderer},
			      {header: '分组号',width: 60,dataIndex:'fzhm'},
			      {header: '仓库名称',width : 100,dataIndex: 'ckmc'},
			      {header: '入库单号',width: 80,dataIndex: 'rkdh'},
			      {header: '序号',width: 60,dataIndex: 'rkxh'},
			      {header: '入库日期',width: 100,dataIndex: 'rkrq',xtype:'datecolumn',format:'Y-m-d' },
			      {header: '供应厂商',width : 250,dataIndex:'csmc'},
			      {header: '材料货号',width: 80,dataIndex: 'clhh' },
			      {header: '材料名称',width: 280,dataIndex: 'clmc'},
			      {header: '规格尺寸',width: 150,dataIndex: 'cltx1'},
			      {header: '单位',width: 50,dataIndex: 'jldw'},
			      {header: '入库数量',width: 80,dataIndex: 'rksl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            }},
			      {header: '含税单价',width : 100,dataIndex: 'rkdj'},
			      {header: '含税金额',width : 100,dataIndex: 'rkje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
			      {header: '税率',width :80,dataIndex: 'zzsl',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2},
			   	  	  		 renderer : Ext.util.Format.percentRenderer},
			      {header: '除税单价',width :100,dataIndex: 'csdj'},
			      {header: '除税金额',width :100,dataIndex: 'csje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
			      {header: '税额',width :80,dataIndex: 'zzse',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
			      {header: '币种',width :80,dataIndex: 'wbbh'},
			      {header: '汇率',width :80,dataIndex: 'wbhl',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2},
			   	  	  		 renderer : Ext.util.Format.percentRenderer},
			      {header: '外币单价',width :100,dataIndex: 'wbdj'},
			      {header: '外币金额',width :100,dataIndex: 'wbje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
			      {header: '入库类别',width : 80,dataIndex: 'rklbmc'},
			      {header: '合同号',width: 80,dataIndex:'hth'},
			      {header: '到货号',width:80,dataIndex:'dhh'},
			      {header: '备注说明',width:200,dataIndex:'bzsm'},
			      {header: '操作员',width:80,dataIndex:'czym'},
			      {header: '操作时间',width:100,dataIndex:'czsj'},
			      {header: '核销日期',width:100,dataIndex:'hxrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '发票类别',width:80,dataIndex:'fplb'},
			      {header: '发票号码',width:80,dataIndex:'fphm'},
			      {header: '核销人名',width:80,dataIndex:'hxrm'},
			      {header: '核销时间',width:100,dataIndex:'hxsj',xtype:'datecolumn',format:'Y-m-d'}
			      ],store: me.store
                 }
              ]
        })
         me.callParent(arguments); 
     }
})