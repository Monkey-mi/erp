Ext.define('erp.PurchaseClearing.view.ArriveQueryWin',{
      extend : 'erp.ux.Window',
      alias:'widget.Win_ArriveQuery',
      closable : true,
      width : 0.7 * window.screen.width,
	  height:0.45 * window.screen.height,
	  title : '到货查询',
	  iconCls:'page_go',
	  requires : [
	  'erp.PurchaseClearing.store.ArriveQuery'
	  ],
	   listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	 },
	 initComponent:function(){
	    var me = this;
	    me.store = Ext.create('erp.PurchaseClearing.store.ArriveQuery');
	    Ext.apply(me,{
	    	listeners:{
	    		afterrender:function(cmp){
	    		    me.store.load({
	    		      params : {
	    		         shdh : me.shdh,
	    		         csbh : me.csbh
	    		      }
	    		    })
	    		}
	    	},
	        items : [{
	           xtype : 'grid',
	           itemId : 'grd_rk',
	           store : me.store,
	           /*  selModel:Ext.create('Ext.selection.CheckboxModel',{
					mode:'MULTI',
					checkOnly:true
			   }),
			   multiSelect:true, */
	           columns : [
	           {header : '状态',dataIndex:'ztbj',width:60,
					  	renderer : function(v){
					  	   if(v==1){return '到货'}
					  	   else if(v==2){return '已退'}
					  	   else if(v==3){return '已入'}
					  	   else if(v==4){return '<p style="font-size:12px;color:blue">待入</p>'}
					  	   else if(v==5){return '<p style="font-size:12px;color:red">待退</p>'}
					  	}},
	           {header : '到货结论',dataIndex:'jyjg',width:65,
					  	renderer : function(v){
					  	   if(v==1){return '待检'}
					  	   else if(v==2){return '<p style="font-size:12px;color:green">合格</p>'}
					  	   else if(v==3){return '<p style="font-size:12px;color:red">不合格</p>'}
					  	   else if(v==4){return '让步接收'}
					  	   else if(v==5){return '改为他用'}		
					  	}},
	           {header : '退货单号',dataIndex:'thdh',width:80},
	           {header : '退货日期',dataIndex:'thrq',width:90,xtype:'datecolumn',format:'Y-m-d'},
	           {header : '到货单号',dataIndex:'dhdh',width:80},
	           {header : '到货序号',dataIndex:'dhxh',width:50},
	           {header : '到货日期',dataIndex:'dhrq',width:90,xtype:'datecolumn',format:'Y-m-d'},
	           {header : '送货单号',dataIndex:'shdh',width:80},
	           {header : '合同号',dataIndex:'hth',width:80},
	           {header : '采购员',dataIndex:'czym',width:80},
	           {header : '厂商名称',dataIndex:'csmc',width:250,
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	           {header : '材料号',dataIndex:'clhh',width:80},
	           {header : '材料名称',dataIndex:'clmc',width:300,
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	           {header : '规格',dataIndex:'cltx1',width:80},
	           {header : '单位',dataIndex:'jldw',width:60},
	           {header : '到货数量',dataIndex:'dhsl',width:80},
	           {header : '已入/已退',dataIndex:'yrsl',width:80,
				renderer:function(v){if(v==0){return ' '}else{return v}}
				}
	           ]
	        }]
	    });
        me.callParent(arguments);
	}
})