Ext.define('erp.materialDistributeAccount.view.MaterialAccountManagerDetail',{
     extend: 'erp.ux.Panel',
     title : '材料分布库存账明细',
     alias: 'widget.mng_MaterialAccDetial',
     listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
     initComponent:function(){
		var me=this;
		me.store  = Ext.create('erp.materialDistributeAccount.store.MaterialAccountManagerDetail'/*,
			{ckbh:me.ckbh,nf:me.nf,clhh:me.clhh,cltx1:me.cltx1,cltx2:me.cltx2,cltx3:me.cltx3}*/);
		/*me.store.on({
		     'load':function(s,recs){
		      var grid = me.down('#grd_MaterialAccDetial');
		      grid.getSelectionModel().deselectAll();
		      if(recs.length>0){
		         grid.view.bufferedRenderer.scrollTo(-1, true);
		      }else{
				 grid.getStore().removeAll();
			  }
		    }
		});*/
			Ext.apply(me.store.proxy.extraParams,{ckbh:me.ckbh,nf:me.nf,clhh:me.clhh,cltx1:me.cltx1,cltx2:me.cltx2,cltx3:me.cltx3});
		me.store.load();
		Ext.apply(me,{
		     layout:{
		        xtype : 'vbox',
		        padding : 2
		     },
		      /*dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId: 'function_btn',
			    items: [
			    {text : '退出',handler:function(){
			    	me.close();
			    }}
			    ]
		      }],*/
		      items : [
		      {
		         xtype : 'grid',
	    		 itemId : 'grd_MaterialAccDetial',
	    		 store : me.store,
	    		 selModel:Ext.create('Ext.selection.CheckboxModel'),	    		
	    		 dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize : 50,
			    		displayInfo:true
			    	  }], 
			    features: [{
							ftype : 'summary',
							dock : 'bottom'
							},
							{
							ftype: 'groupingsummary',
							summaryType: 'count',
							dock: 'bottom',
							groupHeaderTpl: me.nf+'年{name}月份'
							}],
	  	       	columns : [
	  	       	   {header : '日期',width: 120, dataIndex: 'rq',
	  	       	   		summaryType: 'count',
	  	       	   		summaryRenderer: function(value,summaryData, dataIndex) {
							return '合计';
						}/*,
	  	       	   		summaryRenderer: function(value, summaryData, dataIndex) {
			                 	return '合计';
	            	}*/},
	  	       	   {header : '单据类型',width: 120, dataIndex: 'djlx'},
	  	       	   {header : '单号',width: 120, dataIndex: 'dh'},
	  	       	   {header : '入库数量',width: 120, dataIndex: 'rksl',summaryType: 'sum',summaryRenderer: function(value, summaryData, dataIndex) {
		   	  	  				return Ext.util.Format.number(value,'0,000.00');
			            	}},
	  	       	   {header : '出库数量',width: 120, dataIndex: 'llsl',summaryType: 'sum',summaryRenderer: function(value, summaryData, dataIndex) {
		   	  	  				return Ext.util.Format.number(value,'0,000.00');
			            	}},
	  	       	   {header : '库存数量',width: 120, dataIndex: 'kcsl'},
	  	       	   {header : '类别',width: 120, dataIndex: 'lb'},
	  	       	   {header : '跟踪编号',width: 120, dataIndex: 'bh'},
	  	       	   {header : '备注说明',width: 120, dataIndex: 'bzsm'}	  	       	   	  	       	    	  
	  	       	]        
		      }
		      ]
		});
		me.callParent(arguments);
	}
})