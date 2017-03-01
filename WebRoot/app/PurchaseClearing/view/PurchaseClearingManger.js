Ext.define('erp.PurchaseClearing.view.PurchaseClearingManger',{
    extend: 'erp.ux.Panel',
    alias: 'widget.mng_PurchaseClearing',
	listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
     initComponent:function(){
		var me=this;
	    me.can_use_btn=true;
	    me.store  = Ext.create('erp.PurchaseClearing.store.Notice');
	    me.cbStore = Ext.create('erp.PurchaseClearing.store.CostBills');
	    Ext.apply(me.store.proxy.extraParams,{
	    		usePaging:true
	    })
	    var isCgy=false;
		Ext.each(erp.Util.currentUser.roleList,function(role){
				if(role.role_name=='采购员'){
				isCgy=true;
				return false;
		}
	   })
		if(!erp.Util.currentUser.isAdmin&&isCgy){
		    			//判断当前操作员是否为采购员
				me.store.proxy.extraParams.search="  and (kptzb.czym like '%"+erp.Util.currentUser.name+"%')";
			}
	    Ext.apply(me,{
	       layout:{
		     type: 'border',
		     padding : 2
		     },
		      dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId: 'function_btn',
			    items: [
			       {text : '添加', iconCls:'page_add', itemId:'btn_add',disabled : false},
			       {text : '编辑', iconCls:'page_edit', itemId:'btn_edt'},
			       {text : '删除', iconCls:'page_delete', itemId:'btn_del',disabled : false},
			       {text : '锁定', iconCls:'lock', itemId:'btn_lock'},
			       {text : '递送', iconCls:'', itemId:'btn_send',disabled : false},
			       {text : '归档', iconCls:'book_next',itemId:'btn_arc'},
			       {text : '历史通知单',iconCls: 'book_open',itemId:'btn_his' },
			       {text : '待开汇总',iconCls: '',itemId:'btn_sum' },
			       {text : '未达明细查询',iconCls:'',itemId: 'btn_not'},
			       {text : '筛选',glyph:0xf002,itemId:'btn_query'},
			       {text:'刷新',iconCls:'refresh_backwards',
			   	  				    handler:function(){
			   	  				    	delete me.store.proxy.extraParams.condition
			   	  				    	me.store.loadPage(1);
			   	  				    }},
			   	   {text:'打印',iconCls:'printer',itemId:erp.Const.FUNC_ITEMID_BTN_PRINT,disabled:false,
	    		    menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_printer'
	   	  		     })}, 				    
			       {text: '退出',iconCls:'',itemId:'btn_out', handler:function(){me.close();}}
			    ]
		     }],
		     items : [
		     {xtype:'treepanel',
	    			region:'west',
	    			reference:'perchasetree',
	    			collapsible:true,
	    			width:200,
	    			split:true,
	    			store : Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree',{autoLoad:true})
	    			,listeners:{
	    			     'itemclick':function(t,rec){
	    			        var hsbm = rec.get('nodeId');
	    			        if(hsbm==0){
	    			            hsbm = 21
	    			        }
	    			  	    me.store.proxy.extraParams.hsbm=hsbm;
	    			  		me.store.loadPage(1);
	    			  		}
	    			   }
	    			},{
	    			     region: 'center',
	    			     title : '开票通知',
	    			     xtype : 'grid',
	    			     itemId : 'grd_Notice',
	    			     overflowY:'auto',
				         overflowX:'auto',
	    			     selModel:Ext.create('Ext.selection.CheckboxModel'),
	    			     dockedItems:[{
			   		       xtype : 'pagingbar',
			   		       stateId : "pagingbar"+Ext.id(),
			   		       store:me.store,
			   		       dock:'bottom',
			   		       defaultPageSize : 200,
		    		       displayInfo:true
	  	       	        }],
	    			     columns : [
	    			        {header : '核算部门',width: 80,dataIndex : 'hsbmmc'},
	    			        {header : '核销',width:40 ,dataIndex : 'hxbj',renderer: erp.Util.Staterenderer},
	    			        {header : '递送',width:40 ,dataIndex : 'dsbj',renderer: erp.Util.Staterenderer},
	    			        {header : '锁定',width:40 ,dataIndex : 'yfbj',renderer: erp.Util.Staterenderer},
	    			        {header : '归档标记',width: 80,dataIndex : 'gdbj',renderer: erp.Util.Staterenderer,hidden : true} ,
	    			        {header : '通知单号',width: 65,dataIndex : 'tzdh'},
	    			        {header : '操作员',width: 65,dataIndex : 'czym'},
	    			        {header : '通知日期',width: 80,dataIndex : 'tzrq',xtype:'datecolumn',format:'Y-m-d'},
	    			        {header : '起始日期',width: 80,dataIndex : 'qsrq',xtype:'datecolumn',format:'Y-m-d'},
	    			        {header : '截止日期',width: 80,dataIndex : 'jzrq',xtype:'datecolumn',format:'Y-m-d'},
	    			        {header : '供应厂商',width: 250,dataIndex : 'csmc',
	    			   	      renderer:function(v,metaData){
					            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			                }},
	    			        {header : '备注说明',width: 210,dataIndex : 'bzsm'},
	    			        {header : '锁定人',width: 65,dataIndex : 'fcrm'},
	    			        {header : '锁定日期',width: 80,dataIndex : 'fcrq',xtype:'datecolumn',format:'Y-m-d'},
	    			        {header : '操作日期',width: 80,dataIndex : 'czsj',xtype:'datecolumn',format:'Y-m-d'}
	    			      ],
	    			      store : me.store
	    			},{
	    			     region : 'south',
	    			     xtype : 'grid',
	    			     itemId : 'grd_CostBills',
	    			     split:true,
	    			     overflowY:'auto',
				         overflowX:'auto',
				         height : 300,
				         features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					     }],
				         columns : [
				           {header : '送货日期',width : 80,dataIndex: 'shsj',xtype:'datecolumn',format:'Y-m-d',
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
				           {header : '送货单号',width : 80,dataIndex: 'shdh'},
				           {header : '入库/费用日期',width :100 ,dataIndex: 'rkrq',xtype:'datecolumn',format:'Y-m-d'},
				           {header : '合同/计划号',width : 90,dataIndex: 'hth'},
				           {header : '材料名称/费用摘要',width : 250,dataIndex: 'clmc'},
				           {header : '单位',width : 40,dataIndex: 'jldw'},
				           {header : '入库/费用数量',width : 90,dataIndex: 'rksl',
	    			    	renderer:function(v){if(v==0){return ' '}else{return v}},
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
					       {header : '单价',width : 80,dataIndex: 'rkdj',
	    			    	renderer:function(v){if(v==0){return ' '}else{return v}}},     
	    			       {header : '金额',width : 80,dataIndex: 'rkje',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},	
					       {header : '仓库名称',width : 80,dataIndex: 'ckmc'},  
					       {header : '入库/费用单号',width : 90,dataIndex: 'rkdh'},
				           {header : '出运编号',width : 65,dataIndex: 'cybh',
	    			    	renderer:function(v){if(v==0){return ' '}else{return v}}},
				           {header : '材料货号',width : 65,dataIndex: 'clhh'},
				           {header : '规格尺寸',width : 100,dataIndex: 'cltx1'},
				           {header : '备注说明',width : 210,dataIndex: 'bzsm'},
				           {header : '采购数量',width : 65,dataIndex: 'cgsl',
	    			    	renderer:function(v){if(v==0){return ' '}else{return v}},
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return value ;
					            }},
				           {header : 'PONO',width : 160,dataIndex: 'sxdy09'},
				           {header : '操作员',width : 65,dataIndex: 'czym'},
				           {header : '操作时间',width : 80,dataIndex: 'czsj',xtype:'datecolumn',format:'Y-m-d'},
				           {header : '核销',width : 50,dataIndex: 'hxbj',renderer: erp.Util.Staterenderer},
				           {header : '数据来源',width : 65,dataIndex: 'sjly'},
				           {header : '发票类别',width : 80,dataIndex: 'fplb'},
				           {header : '发票号码',width : 80,dataIndex: 'fphm'},
				           {header : '序号',width : 50,dataIndex: 'rkxh'},
				           {header : '到货日期',width : 80,dataIndex: 'dhrq',xtype:'datecolumn',format:'Y-m-d'},
				           {header : '到货数量',width : 80,dataIndex: 'dhsl',
	    			     	renderer:function(v){if(v==0){return ' '}else{return v}},
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
				           {header : '币种',width : 50,dataIndex: 'wbmc'},
				           {header : '汇率',width : 70,dataIndex: 'wbhl',
	    			    	renderer:function(v){if(v==0){return ' '}else{return v}}
			   	  	  		 },
				          {header : '外币单价',width : 70,dataIndex: 'wbdj',
	    			    	renderer:function(v){if(v==0){return ' '}else{return v}}},
				          {header : '外币金额',width : 70,dataIndex: 'wbje',
	    			    	renderer:function(v){if(v==0){return ' '}else{return v}},
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
				          {header : '辅助单位',width : 70,dataIndex: 'fzdw'},
				          {header : '辅助数量',width : 70,dataIndex: 'fzsl',
	    			    	renderer:function(v){if(v==0){return ' '}else{return v}},
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00');
					            }},
				          {header : '入库/费用类别',width : 70,dataIndex: 'rklb'}
				            ],
				            store : me.cbStore
	    		 	      }
	    			
		              ]
		     
	    });
	    me.callParent(arguments);
	}
	 ,loadMain:function(){
		var me=this;
		me.store.loadPage(1,{//修改，翻页后再去筛选，不查找前页的数据
		    callback: function(records, operation, success) {
		        if(records.length>0){
		        	me.down('#grd_Notice').getSelectionModel().select(records[0]);
		        }		        
		    }
		});
	},
	/**
	 * @description 打印模板回调函数，用于页面中打印前处理
	 * @param {} 入参item:打印选项
	 * @return {}	 出参recs：选择记录或NULL
	 */
	PrintProcess:function(item){
		var me=this;
	    var recs;
	    var grid = me.down('#grd_CostBills');
	    recs = grid.getSelectionModel().getSelection();
	    if(recs.length==0){
			Ext.Msg.alert("提示","请至少选择一条数据");
			return ;
		}
		return recs;
	    
	}
})