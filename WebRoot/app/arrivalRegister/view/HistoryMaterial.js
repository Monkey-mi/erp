Ext.define('erp.arrivalRegister.view.HistoryMaterial',{
    extend : 'erp.ux.Panel',
    alias : 'widget.History_Material',
    closable : true,
     initComponent : function(){
        var me =this;
        
/*        me.lsStore.load({
            params : {
                condition : me.condition,
                ckbh : me.ckbh
            }}
        );*/
        Ext.apply(me.lsStore.proxy.extraParams,{
          	condition : me.condition,
                ckbh : me.ckbh
          });
        me.lsStore.load();  
        Ext.apply(me,{
             layout : {
                type: 'border',
		         padding : 2
            },
         dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId: 'function_btn',
			items:[    
            {text: '取消退货',itemId:'btn_cancelth',iconCls:''},
            {text: '取消中止',itemId:'btn_cancelzz',iconCls:''},
            {text: '入库单查询',itemId:'btn_rkdquery',iconCls:''},
            {text: '筛选',itemId:'btn_query',iconCls:''},
            {text: '打印',itemId:'btn_print',iconCls:''},
            {text: '时间刷新',itemId:'btn_refreshtime',iconCls:''}]
             }],
            items : [
               {
               	 region: 'center',
                 xtype : 'grid',
                 itemId : 'grdHistory',
                 overflowY:'auto',
				 overflowX:'auto', 
                 selModel:Ext.create('Ext.selection.CheckboxModel'),
                 features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }], 
			     columns : [ 
					  	{header : '中止',width:40,dataIndex: 'zzbj',renderer: erp.Util.Staterenderer,
				          renderer: erp.Util.Staterenderer,
				         sumaryType: 'count',
				         summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
					  	{header : '外协',width:40,dataIndex: 'wxbj',renderer: erp.Util.Staterenderer },
					  	{header : '加急',width:40,dataIndex: 'jjbj',renderer: erp.Util.Staterenderer },
					 
					  	{header : '状态',width:55,dataIndex: 'ztbj',
					  	renderer : function(v){
					  	   if(v==1){return '到货'}
					  	   else if(v==2){return '已退'}
					  	   else if(v==3){return '已入'}
					  	   else if(v==4){return '<p style="font-size:12px;color:blue">待入</p>'}
					  	   else if(v==5){return '<p style="font-size:12px;color:red">待退</p>'}
					  	}},
					  	{header : '判定结论',width:55,dataIndex: 'jyjg',
					  	renderer : function(v){
					  	   if(v==1){return '待检'}
					  	   else if(v==2){return '<p style="font-size:12px;color:green">合格</p>'}
					  	   else if(v==3){return '<p style="font-size:12px;color:red">不合格</p>'}
					  	   else if(v==4){return '让步接收'}
					  	   else if(v==5){return '改为他用'}		
					  	}
					  	},
					  	{header : '到货单号',width:70,dataIndex: 'dhdh' },
					  	{header : '序号',width:40,dataIndex: 'dhxh' },
					  	{header : '委托单号',width:80,dataIndex: 'wtdh' },
					  	{header : '质检结论',width:65,dataIndex: 'zzjl' },
					  	{header : '质检单号',width:65,dataIndex: 'zjdh' },
					  	{header : '判定日期',width:65,dataIndex: 'zjrq',xtype:'datecolumn',format:'Y-m-d'},
					  	{header : '退货单号',width:65,dataIndex: 'thdh' },
					  	{header : '退货日期',width:80,dataIndex: 'thrq',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '物控交期',width:80,dataIndex: 'wkjq',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '上线日期',width:80,dataIndex: 'sxrq',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '交货日期',width:80,dataIndex: 'jhrq',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '到货日期',width:120,dataIndex: 'dhrq',xtype:'datecolumn',format:'Y-m-d h-m' },
					  	{header : '入库日期',width:120,dataIndex: 'rksj',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '锁定时间',width:120,dataIndex: 'sdsj_rk',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '供应厂商',width:210,dataIndex: 'csmc' },
					  	{header : '材料货号',width:80,dataIndex: 'clhh' },
					  	/*{header : '事物特性',width:,dataIndex: 'plmtx' },*/
					  	{header : '材料名称',width:210,dataIndex: 'clmc' },
					  	{header : '材料图号',width:100,dataIndex: 'clth' },
					  	/*{header : '材料特性',width:,dataIndex: 'cltx1' },*/
					  	{header : '单位',width:50,dataIndex: 'jldw' },
					  	{header : '货位',width:80,dataIndex: 'hwbh' },
					  	{header : '生产批次',width:70,dataIndex: 'pcbh' },
					  	{header : '供货批次',width:70,dataIndex: 'ghpc' },
					  	{header : '到货数量',width:80,dataIndex: 'dhsl',
					  	summaryType: 'sum',
				      summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					  }, 
					  renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            } },
					  	{header : '辅助单位',width:50,dataIndex: 'fzdw' },
					  	{header : '辅助数量',width:80,dataIndex: 'fzsl',
					  	summaryType: 'sum',
				      summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					  }, 
					  renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            } },
					  	{header : '已入/已退',width:80,dataIndex: 'yrsl' },
					  	{header : '判断日期',width:80,dataIndex: 'zjrq',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '质检备注',width:200,dataIndex: 'zjbz' },
					  	{header : '待判原因',width:200,dataIndex: 'dpyy' },
					  	{header : '合同号',width:100,dataIndex: 'hth' },
					  	{header : '合同编号',width:100,dataIndex : 'htbh',hidden : true},
					  	{header : '合同序号',width:100,dataIndex : 'htxh',hidden : true},
					  	{header : '外协号',width:70,dataIndex: 'wxh' },
					  	{header : '外协单号',width:70,dataIndex: 'wxdh',hidden : true },
					  	{header : '外协序号',width:70,dataIndex: 'wxxh',hidden : true },
					  	{header : '计划号',width:100,dataIndex: 'jhh' },
					  	{header : '订单号',width:100,dataIndex: 'ddh' },
					  	{header : '计划编号',width:100,dataIndex: 'jhbh',hidden : true},
					  	{header : '计划序号',width:100,dataIndex: 'jhxh',hidden : true},
					  	{header : '客户名称',width:160,dataIndex: 'khmc' },
					  	{header : '产品名称',width:160,dataIndex: 'cpbh' },
					  	{header : '产品编号',width:70,dataIndex: 'plmth_cp' },
					  	/*{header : '事物特性',width:,dataIndex: 'plmtx_cp' },*/
					  	{header : '主产品名称',width:160,dataIndex: 'zcpbh' },
					  	{header : '生产单号',width:100,dataIndex: 'jhbz' },
					  	{header : '送货单号',width:100,dataIndex: 'shdh' },
					  	{header : '制造日期',width:80,dataIndex: 'zzrq',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '备注说明',width:210,dataIndex: 'bzsm' },
					  	{header : '交库人名',width:70,dataIndex: 'jkrm' },
					  	{header : '票据日期',width:80,dataIndex: 'pjrq',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '中止人',width:70,dataIndex: 'zzrm' },
					  	{header : '中止时间',width:80,dataIndex: 'zzsj',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '操作员名',width:70,dataIndex: 'czym' },
					  	{header : '操作时间',width:80,dataIndex: 'czsj',xtype:'datecolumn',format:'Y-m-d' }			     
			     ],store : me.lsStore,
				   	dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.lsStore
				}]	    
               }
            ]
        });
        me.callParent(arguments);
     }
})