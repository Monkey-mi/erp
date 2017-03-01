Ext.define('erp.PurchaseCostDetial.view.PurchaseCostDetialManger',{
     extend: 'erp.ux.Panel',
     title : '采购费用明细',
     alias: 'widget.mng_PurchaseCostDetial',
     listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
     initComponent:function(){
		var me=this;
		me.store  = Ext.create('erp.PurchaseCostDetial.store.PurchaseCostDetialBufferrd');
		me.store.on({
		     'load':function(s,recs){
		      var grid = me.down('#grd_PurchaseCostDetial');
		      grid.getSelectionModel().deselectAll();
		      if(recs.length>0){
		         grid.view.bufferedRenderer.scrollTo(-1, true);
		      }else{
					grid.getStore().removeAll();
			  }
		    }
		});
		Ext.apply(me,{
		     layout:{
		        xtype : 'vbox',
		        padding : 2
		     },
		      dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId: 'function_btn',
			    items: [
			    {text : '筛选',glyph:0xf002,itemId:'btn_query'}
			    ]
		      }],
		      items : [
		      {
		         xtype : 'grid',
	    		 itemId : 'grd_PurchaseCostDetial',
	    		 store : me.store,
	    		 selModel:Ext.create('Ext.selection.CheckboxModel'),
	    		 plugins: [{ptype: 'bufferedrenderer'}],
	    		 dockedItems:[{
				     	xtype: 'component',
	                    itemId: 'status',
	                    tpl: '记录总数: {count}'
			    	  }],
	    		/*dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize : 50,
			    		displayInfo:true
			    	  }], */
	  	       	columns : [
	  	       	   {header : '核销',width: 35, dataIndex: 'hxbj',
				          renderer: erp.Util.Staterenderer,
				         summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
	  	       	   {header : '结账',width: 35, dataIndex: 'jzzt',
				          renderer: erp.Util.Staterenderer},
	  	       	   {header : '分组号',width: 60, dataIndex: 'fzhm'},
	  	       	   {header : '费用单号',width: 60, dataIndex: 'fydh'},
	  	       	   {header : '序号',width: 40, dataIndex: 'fyxh'},
	  	       	   {header : '费用日期',width: 80, dataIndex: 'fyrq',xtype:'datecolumn',format:'Y.m.d'},
	  	       	   {header : '所属用户',width: 120, dataIndex: 'yhjc'},
	  	       	   {header : '供应厂商',width: 250, dataIndex: 'csmc',
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	  	       	   {header : '费用摘要',width: 150, dataIndex: 'fyzy',
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	  	       	   {header : '数量',width: 60, dataIndex: 'fysl'},
	  	       	   {header : '箱数',width: 60, dataIndex: 'fyxs'},
	  	       	   {header : '含税单价',width: 80, dataIndex: 'fydj'},
	  	       	   {header : '含税金额',width: 80, dataIndex: 'fyje'},
	  	       	   {header : '税率',width: 60, dataIndex: 'zzsl'},
	  	       	   {header : '除税单价',width: 80, dataIndex: 'csje'},
	  	       	   {header : '税额',width: 80, dataIndex: 'zzse'},
	  	       	   {header : '汇率',width: 60, dataIndex: 'wbhl'},
	  	       	   {header : '外币金额',width: 80, dataIndex: 'wbje'},
	  	       	   {header : '计划号',width: 80, dataIndex: 'jhh'},
	  	       	   {header : '合同号',width: 80, dataIndex: 'hth'},
	  	       	   {header : '任务号',width: 80, dataIndex: 'rwh'},
	  	       	   {header : '上级支付类别',width: 110, dataIndex: 'sjzflbmc'},
	  	       	   {header : '支付类别',width: 80, dataIndex: 'zflbmc'},
	  	       	   {header : '备注说明',width: 180, dataIndex: 'bzsm',
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	  	       	   {header : '所属部门',width: 80, dataIndex: 'ssbmmc'},
	  	       	   {header : '操作员',width: 70, dataIndex: 'czym'},
	  	       	   {header : '操作时间',width: 80, dataIndex: 'czsj',xtype:'datecolumn',format:'Y.m.d'},
	  	       	   {header : '锁定人',width: 70, dataIndex: 'sdrm'},
	  	       	   {header : '锁定时间',width: 80, dataIndex: 'sdsj',xtype:'datecolumn',format:'Y.m.d'},
	  	       	   {header : '被拆序号',width: 80, dataIndex: 'cfxh'},
	  	       	   {header : '通知单号',width: 80, dataIndex: 'tzdh'},
	  	       	   {header : '发票类别',width: 80, dataIndex: 'fplbmc'},
	  	       	   {header : '发票号码',width: 80, dataIndex: 'fphm'},
	  	       	   {header : '核销日期',width: 80, dataIndex: 'hxrq',xtype:'datecolumn',format:'Y.m.d'}      	  
	  	       	]        
		      }
		      ]
		});
		me.callParent(arguments);
	}
})