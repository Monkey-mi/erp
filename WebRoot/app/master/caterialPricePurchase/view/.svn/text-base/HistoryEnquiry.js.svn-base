Ext.define('erp.master.caterialPricePurchase.view.HistoryEnquiry',{
    extend : 'erp.ux.Window',
    alias : 'widget.mng_HistoryEnquiry',
    requires : ['erp.ux.PagingBar'],
    iconCls:'',
    model: true,
     width : 0.6 * window.screen.width,
	 height:0.5 * window.screen.height,
    initComponent : function(){
        var me=this;
        /*me.hpStore = Ext.create('erp.master.caterialPricePurchase.store.PurchasePrice');*/
        Ext.apply(me.hpStore.proxy.extraParams,{clhh:me.clhh,usePaging:true});
        me.hpStore.loadPage(1); 
        Ext.apply(me.bjStore.proxy.extraParams,{clhh:me.clhh,usePaging:true});
        me.bjStore.loadPage(1);
        Ext.apply(me.kjStore.proxy.extraParams,{clhh:me.clhh,usePaging:true});
        me.kjStore.loadPage(1);
        Ext.apply(me,{
            layout:{ 
             type : 'fit',	
             padding: 4
		      },
		      items : [{   
		      xtype : 'tabpanel',
		          items : 
		          [{
		            title : '历次进价',
		            itemId : 'panel_PurchasePrice',
		            layout : {type : 'fit'},
		            dockedItems:[{
			              xtype : 'pagingbar',
			              stateId : "pagingbar"+Ext.id(),
			              store:me.hpStore,
			              dock:'bottom',
			              defaultPageSize : 200,
			              displayInfo:true
			    	  }],	 
		            items : [{
		               xtype : 'grid',
		               itemId : 'grd_PurchasePrice',
		               /*overflowY:'auto',
				       overflowX:'auto', 
				       height : 800,*/
			    	  columns : [
			    	  	{header : '核销',width:38, dataIndex:'hxbj',
			    	     renderer: erp.Util.Staterenderer     },
			    	  	{header : '合同号',width:70, dataIndex:'hth' },
			    	  	{header : '入库单号',width:80, dataIndex:'rkdh' },
			    	  	{header : '序号',width:50, dataIndex: 'rkxh'},
			    	  	{header : '入库日期',width:100, dataIndex: 'rkrq',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
			    	  	{header : '供应厂商',width :320, dataIndex: 'csmc',
			    	         renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
				           }
			    	  	},
			    	  	{header : '采购员',width :80, dataIndex:'cgyxm'},
			    	  	{header : '入库数量',width :80, dataIndex:'rksl'},
			    	  	{header : '单位',width :50, dataIndex:'jldw'},
			    	  	{header : '入库单价',width :80, dataIndex:'rkdj'},
			    	  	{header : '币种',width :50, dataIndex:'wbdh'},
			    	  	{header : '外币单价',width :80, dataIndex:'wbdj'},
			         	{header : '备注说明',width :300, dataIndex:'bzsm',
			         	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }}
			    	  	],
			    	  	store : me.hpStore
		            }]
		          },{
		          title : '历次报价',
		          itemId : 'panel_Quote',
		          dockedItems:[{
			              xtype : 'pagingbar',
			              stateId : "pagingbar"+Ext.id(),
			              store:me.hpStore,
			              dock:'bottom',
			              defaultPageSize : 200,
			              displayInfo:true
			    	  }],	
			      layout : {type : 'fit'}, 	  
		           items : [{
		               xtype : 'grid',
		               itemId : 'grd_PurchasePrice',
		               /*overflowY:'auto',
				       overflowX:'auto', 
				       height : 400,*/
			    	    columns : [
			    	    	{header : '报价单号',flex :1 ,dataIndex:'bjdh' },
			    	    	{header : '报价日期',flex :2 ,dataIndex:'bjrq' ,
	    			      	xtype:'datecolumn',format:'Y-m-d'},
			    	    	{header : '厂商名称',flex :4 ,dataIndex: 'csmc'},
			    	    	{header : '厂商报价',flex :2 ,dataIndex: 'csbj'},
			    	    	{header : '币种',flex :1 ,dataIndex: 'wbdh'},
			    	    	{header : '外币报价',flex : 2,dataIndex:'wbbj' },
			    	    	{header : '备注说明',flex : 3,dataIndex: 'bzsm'}
			    	    ],
			    	    store : me.bjStore
		          }] 
		        },{
		           title : '历次控价',
		           itemId : 'panel_Ctl',
		           layout : {type : 'fit'},
		           dockedItems:[{
			              xtype : 'pagingbar',
			              stateId : "pagingbar"+Ext.id(),
			              store:me.hpStore,
			              dock:'bottom',
			              defaultPageSize : 200,
			              displayInfo:true
			    	  }],	 
		            items :[{
		               xtype : 'grid',
		               itemId : 'grd_PurchasePrice',
		               /*overflowY:'auto',
				       overflowX:'auto', 
				       height : 400,*/
				        columns : [
				        {header : '厂商编号',flex :1,dataIndex : 'csbh'},
				        {header : '厂商名称',flex :4,dataIndex : 'csmc'},
				        {header : '单位',flex :0.5,dataIndex : 'jldw'},
				        {header : '控制单价',flex :1 ,dataIndex : 'kzdj'},
				        {header : '辅助单价',flex :1 ,dataIndex : 'fzdj'},
				        {header : '币种',flex :1 ,dataIndex : 'wbdh'},
				        {header : '备注说明',flex :4 ,dataIndex : 'bzsm'},
				        {header : '操作员名',flex :1 ,dataIndex : 'czym'},
				        {header : '操作时间',flex :1 ,dataIndex : 'czsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'}
				        ],
				        store : me.kjStore
		            }]
		        }] 
		      }]  
         })
            me.callParent(arguments);
     }
})