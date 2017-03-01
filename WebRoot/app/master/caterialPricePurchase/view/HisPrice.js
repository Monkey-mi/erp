Ext.define('erp.master.caterialPricePurchase.view.HisPrice',{
     extend : 'erp.ux.Window',
     alias : 'widget.mng_HisPrice',
     requires : ['erp.ux.PagingBar'],
     iconCls:'',
     model: true,
     width : 0.6 * window.screen.width,
	 height:0.5 * window.screen.height,
     initComponent : function(){
            var me=this;
            me.chsStore=Ext.create('erp.master.caterialPricePurchase.store.CaterialHistoryPriceCtl');
            me.vhsStore=Ext.create('erp.master.caterialPricePurchase.store.VendorHistoryPriceCtl');
            Ext.apply(me.chsStore.proxy.extraParams,{clhh:me.clhh,usePaging:true});
            me.chsStore.loadPage(1); 
            Ext.apply(me.vhsStore.proxy.extraParams,{clhh:me.clhh,usePaging:true});
            me.vhsStore.loadPage(1); 
            Ext.apply(me,{
                 layout:{
		         type : 'fit', 
		         padding: 4
		      },
		       items : [{   
		      xtype : 'tabpanel',
		      items : [{
		             title : '材料历次控价',
		             itemId : 'panel_CaterialHisPriceCtl',
				     layout : {type : 'fit'},
				      dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.chsStore,
			    		dock:'bottom',
			    		defaultPageSize : 200,
			    		displayInfo:true
			    	  }],
				     items:[{
				        xtype : 'grid',
				        itemId : 'grd_CaterialHisPriceCtl',
			    	  columns : [
			    	  	{header: '材料货号',flex : 1,dataIndex :'clhh' },
			    	  	{header: '材料名称',flex : 6,dataIndex :'clmc',
			    	    renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
				        }},
			    	  	{header: '控制单价',flex : 1,dataIndex :'kzdj' },
			    	  	{header: '启用日期',flex : 1,dataIndex :'jlrq',
	    			   	xtype:'datecolumn',format:'Y-m-d' }
			    	  	],
			    	  	store : me.chsStore
				     }]
		          },{
		             title : '厂商历次控价',
		             itemId : 'panel_VendorHisPrice',
		             layout : {type : 'fit'},
		             dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.vhsStore,
			    		dock:'bottom',
			    		defaultPageSize : 200,
			    		displayInfo:true
			    	  }],
		             items : [{
		                xtype : 'grid',
				        itemId : 'grd_VendorHisPriceCtl',
			    	  columns : [
			    	  {header : '采购类别',width : 100 ,dataIndex : 'cglb'},
			    	  {header : '厂商编号',width : 100,dataIndex : 'csbh'},
			    	  {header : '厂商名称',width : 300 ,dataIndex : 'csmc',
			    	  renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
				       }},
			    	  {header : '控制单价',width : 100,dataIndex : 'kzdj'},
			    	  {header : '币种',width : 100,dataIndex : 'wbdh'},
			    	  {header : '供货周期(天)',width : 100,dataIndex : 'ghzq'},
			    	  {header : '最低采购量',width : 100,dataIndex : 'zdcgl'},
			    	  {header : '最小包装量',width : 100,dataIndex : 'zxbzl'},
			    	  {header : '厂商型号',width : 100,dataIndex : 'csxh'},
			    	  {header : '修改时间',width : 120,dataIndex : 'xgsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
			    	  {header : '备注说明',width : 300,dataIndex : 'bzsm',
			    	  renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }}
			    	  ],
			    	  store : me.vhsStore
		             }]
		          }]
		       }]
             })
             me.callParent(arguments);
     }
})