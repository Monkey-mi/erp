Ext.define('erp.PurchaseClearing.view.MissCost',{
     extend: 'erp.ux.Panel',
     alias: 'widget.list_MissCost',
     title : '未达明细查询',
     requires:['erp.PurchaseClearing.store.UnStorage',
               'erp.PurchaseClearing.store.UnStorage'],
     initComponent:function(){
         var me=this;
         me.fyStore = Ext.create('erp.PurchaseClearing.store.UnCost');
         me.fyStore.load({params:{csbh:me.csbh,jzrq:me.jzrq}});
         me.rkStore = Ext.create('erp.PurchaseClearing.store.UnStorage');
         me.rkStore.load({params:{csbh:me.csbh,jzrq:me.jzrq}})
         Ext.apply(me,{
              layout:{
		     type: 'border',
		     padding : 2
		     },
		      dockedItems: [{
		           xtype: 'toolbar',
			       dock: 'top',
			       itemId: 'function_btn',
			       items : [
			          {text : '查询',glyph:0xf002,itemId:'btn_mc_query',handler:function(){
			                 var win = Ext.widget('query_UnDetial',{
			                        itemId : 'query_UnDetial'
			                 });
			                 win.show();
			          	}},
			          {text : '刷新',iconCls:'refresh_backwards',
			   	  				    handler:function(){
			   	  				    	me.store.loadPage(1);
			   	  				    }},
			   	  	  {text : '关闭',glyph:0xf00d,handler: function(){me.close()}}  	  				    
			       ]
		      }],
		      items : [
		      {
		         xtype : 'tabpanel',
		         split:true,
		         region:'center',
		         items : [
		         {
		         	xtype : 'grid',
		         	title : '未达入库',
		         	itemId : 'grd_wdrk',
		         	features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
		         	columns : [
	    		  {header : '核销',width:60,dataIndex : 'hxbj',renderer: erp.Util.Staterenderer,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }  },
	    		  {header : '仓库名称', width :120 ,dataIndex: 'ckmc'},
	    		  {header : '入库单号', width :80 ,dataIndex: 'rkdh'},
	    		  {header : '序号', width : 50,dataIndex: 'rkxh'},
	    		  {header : '入库日期', width : 100,dataIndex: 'rkrq',xtype:'datecolumn',format:'Y-m-d'},
	    		  {header : '材料名称', width : 250,dataIndex: 'clmc'},
	    		  {header : '规格尺寸', width : 100,dataIndex: 'cltx1'},
	    		 /* {header : '材料特性2', width : 100,dataIndex: 'cltx2'},
	    		  {header : '材料特性3', width : 100,dataIndex: 'cltx3'},*/
	    		  {header : '单位', width : 50,dataIndex: 'jldw'},
	    		  {header : '入库数量', width : 100,dataIndex: 'rksl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            } },
	    		  {header : '含税单价', width : 80,dataIndex: 'rkdj'},
	    		  {header: '含税金额',dataIndex:'rkje',width:110,xtype:'numbercolumn',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }
		                    },
	    		  {header : '税率', width : 80,dataIndex: 'zzsl',
	    		  field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2},
			   	  	  		 renderer:function(v){
				                if(v==0){
				                 return ' '
				                }else{
				                   Ext.util.Format.percentRenderer
				                  }}},
	    		  {header : '除税单价', width : 80,dataIndex: 'csdj'},
	    		  {header : '除税金额', width : 120,dataIndex: 'csje',
	    		  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					}},
	    		  {header : '税额', width : 120,dataIndex: 'zzse',
	    		  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
				  }},
	    		 /* {header : '币种', width : 80,dataIndex: 'wbbh'},
	    		  {header : '汇率', width : 60,dataIndex: 'wbhl',
	    		      field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2},
			   	  	  		 renderer:function(v){
				                if(v==0){
				                 return ' '
				                }else{
				                   Ext.util.Format.percentRenderer
				                  }}
	    		  },*/
	    		  {header : '外币单价', width : 80,dataIndex: 'wbdj'},
	    		  {header : '外币金额', width : 80,dataIndex: 'wbje'},
	    		  {header : '辅助单位', width : 80,dataIndex: 'fzdw'},
	    		  {header : '辅助数量', width : 80,dataIndex: 'fzsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
	    		  {header : '入库类别', width : 80,dataIndex: 'rklb'}
	    		/*  {header : '递送',width:40 ,dataIndex : 'dsbj',renderer: erp.Util.Staterenderer},
	    		  {header : '锁定',width:40 ,dataIndex : 'yfbj',renderer: erp.Util.Staterenderer},
	    		  {header : '归档标记',width: 100,dataIndex : 'gdbj',renderer: erp.Util.Staterenderer,hidden : true} ,
	    		  {header : '通知单号',width:80 ,dataIndex : 'tzdh'},
	    		  {header : '操作员',width: 80,dataIndex : 'czym'},
	    		  {header : '通知日期',width: 100,dataIndex : 'tzrq',xtype:'datecolumn',format:'Y-m-d'},
	    		  {header : '起始日期',width: 100,dataIndex : 'qsrq',xtype:'datecolumn',format:'Y-m-d'},
	    		  {header : '截止日期',width: 100,dataIndex : 'jzrq',xtype:'datecolumn',format:'Y-m-d'},
	    		  {header : '供应厂商',width: 300,dataIndex : 'csmc'},
	    		  {header : '备注说明',width: 250,dataIndex : 'bzsm'},
	    		  {header : '锁定人',width: 80,dataIndex : 'fcrm'},
	    		  {header : '锁定日期',width: 100,dataIndex : 'fcrq',xtype:'datecolumn',format:'Y-m-d'},
	    		  {header : '操作日期',width: 100,dataIndex : 'czsj',xtype:'datecolumn',format:'Y-m-d'}*/
		         	],store : me.rkStore
		         },{
		            xtype : 'grid',
		            title : '未达费用',
		            itemId : 'grd_wdfy',
		            features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
		            columns : [
		             {header : '核销',width:40 ,dataIndex : 'hxbj',renderer: erp.Util.Staterenderer,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            } },
		             {header : '锁定',width:40 ,dataIndex : 'yfbj',renderer: erp.Util.Staterenderer},
		             {header : '费用单号',width:80 ,dataIndex : 'fydh'}, 
		             {header : '序号',width: 50,dataIndex : 'fyxh'}, 
		             {header : '费用日期',width: 100,dataIndex : 'fyrq',xtype:'datecolumn',format:'Y-m-d'}, 
		             {header : '所属用户',width: 80,dataIndex : 'yhbh'}, 
		             {header : '采购类别',width: 80,dataIndex : 'cglb'}, 
		             {header : '供应厂商',width: 250,dataIndex : 'csmc'}, 
		             {header : '费用摘要',width: 200,dataIndex : 'fyzy'}, 
		             {header : '数量',width: 50,dataIndex : 'fysl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            }}, 
		             {header : '含税单价',width: 80,dataIndex : 'fydj'}, 
		             {header : '含税金额',width: 120,dataIndex : 'fyje',
	    		     summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					}}, 
		             {header : '税率',width: 80,dataIndex : 'zzsl',
		             field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2},
			   	  	  		 renderer:function(v){
				                if(v==0){
				                 return ' '
				                }else{
				                   Ext.util.Format.percentRenderer
				                  }}}, 
		             {header : '除税单价',width: 100,dataIndex : 'csdj'}, 
		             {header : '除税金额',width: 120,dataIndex : 'csje',
	    		     summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					}}, 
		             {header : '税额',width: 120,dataIndex : 'zzse',
	    		     summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					}}, 
		             {header : '计划号',width: 80,dataIndex : 'jhh'}, 
		             {header : '合同号',width: 80,dataIndex : 'hth'}, 
		             {header : '备注说明',width: 200,dataIndex : 'bzsm'}, 
		             {header : '操作员',width: 80,dataIndex : 'czym'}, 
		             {header : '操作时间',width: 100,dataIndex : 'czsj',xtype:'datecolumn',format:'Y-m-d'}, 
		             {header : '锁定人',width: 80,dataIndex : 'sdrm'}, 
		             {header : '锁定时间',width: 100,dataIndex : 'sdsj',xtype:'datecolumn',format:'Y-m-d'}, 
		             {header : '通知单号',width: 80,dataIndex : 'tzdh'}, 
		             {header : '发票类别',width: 80,dataIndex : 'fplb'}, 
		             {header : '发票号码',width: 80,dataIndex : 'fphm'} 
		            ],store : me.fyStore
		         }
		         ]
		      }
		      ]
         });me.callParent(arguments);
     }
})
     
       
     