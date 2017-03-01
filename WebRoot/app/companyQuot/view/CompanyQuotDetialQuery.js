Ext.define('erp.companyQuot.view.CompanyQuotDetialQuery',{
         extend: 'erp.ux.Window',
         alias: 'widget.DetialQuery',
         title : '报价明细',
         modal:true,
         width : 0.75 * window.screen.width,
	     height:0.8 * window.screen.height,
         initComponent : function(){
             var me = this;
             me.store = Ext.create('erp.companyQuot.store.QuotDetailBufferrd');
             me.store.on({
                 'load':function(s,recs){
	    	      var grid = me.down('#grdDetial');
	    	       if(recs.length>0){
	    	          grid.view.bufferedRenderer.scrollTo(-1, true);
	    	       }else{
	    	          grid.getStore().removeAll();
	    	       }
	    	   },
	    	totalcountchange:function onStoreSizeChange() {
				var grid=me.down('#grdDetial');
		        grid.down('#status').update({count: me.store.getTotalCount()});
		    }
             });
             me.store.load();
             Ext.apply(me,{
              layout: 'fit',
                items : [
                {
                   xtype : 'grid',
                   itemId : 'grdDetial',
                   overflowY:'auto',
			       overflowX:'auto',
			       selModel:Ext.create('Ext.selection.CheckboxModel'),
                   /*features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],*/
				   columns : [
				    {header: '审批', width : 38,dataIndex: 'spbj',
				    renderer: erp.Util.Staterenderer/*,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }*/},
				    {header: '审核', width : 38,dataIndex: 'shbj',renderer: erp.Util.Staterenderer},
				    {header: '锁定', width : 38,dataIndex: 'sdbj',renderer: erp.Util.Staterenderer},
				    {header: '材料货号', width : 80,dataIndex: 'clhh'},
				    {header: '材料名称', width : 250,dataIndex: 'clmc'},
				    {header: '单位', width : 65,dataIndex: 'jldw'},
				    {header: '报价单号', width : 80,dataIndex: 'bjdh'},
				    {header: '报价日期', width : 80,dataIndex: 'bjrq',xtype:'datecolumn',format:'Y-m-d'},
				    {header: '厂商编号', width : 80,dataIndex: 'csbh'},
				    {header: '厂商名称', width : 250,dataIndex: 'csmc'},
				    {header: '厂商出价', width : 250,dataIndex: 'jzj',renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
				    {header: '材料控价', width : 80,dataIndex: 'csbj',renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
				    {header: '辅助单位', width : 80,dataIndex: 'fzdw'},
				    {header: '辅助控价', width : 80,dataIndex: 'fzkj',renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
				    {header: '币种', width : 80,dataIndex: 'wbdh'},
				    {header: '外币报价', width : 80,dataIndex: 'wbbj',renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
				    {header: '备注说明', width : 250,dataIndex: 'mxbz'},
				    {header: '审核人', width : 70,dataIndex: 'shrm'},
				    {header: '审批时间', width : 85,dataIndex: 'shsj',xtype:'datecolumn',format:'Y-m-d'}
				   ],store : me.store,
				    plugins: [{ptype: 'bufferedrenderer'}],
			        dockedItems:[{
			   	       xtype: 'component',
	                   itemId: 'status',
	                   tpl: '记录总数: {count}'
				      }]
                   }
                ]
              })
              me.callParent(arguments);  
             }
         })