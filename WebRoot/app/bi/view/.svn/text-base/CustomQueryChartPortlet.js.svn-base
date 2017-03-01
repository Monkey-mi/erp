Ext.define('erp.bi.view.CustomQueryChartPortlet', {
    extend: 'erp.common.portal.view.Portlet',
    alias: 'widget.customQueryChartPortlet',
    title: '图形分析',
    iconCls: 'chart-display',
    itemId:'winAChart',
    requires: ['erp.report.engine.view.CustomUtil',
               'erp.report.engine.util.AnalysisFun',
               'erp.report.engine.store.CustomQueryCdtion',
               'erp.report.engine.store.CustomReportResult'
               ],
    layout: 'fit',
    resizable: false,
    initComponent: function(){
    	var me = this;
    	Ext.apply(this,{
    		listeners:{
    			afterrender : function(){
    				var param = me.params;
    			    var list_id = param.queryId;
    			    var resultStore = Ext.create('erp.report.engine.store.CustomReportResult');
    			    var cdtionStore = Ext.create('erp.report.engine.store.CustomQueryCdtion');
    			    resultStore.load({
    			    	  params : {list_id : list_id},
    					  callback : function(results){
    					  	  if(!Ext.isEmpty(results)){
    						  if(results[0].get('report_type')=='单表报表'){
    							  cdtionStore.load({
        	    					  params : {l_id : list_id},
        	    					  callback : function(codtions){
        	    						  var myparam = results[0].get('ope');
        	    					      myparam = Ext.JSON.decode(myparam);
        	    					      var cdtions = erp.CustomUtil.makeCodtions(codtions,myparam.data);
        	    					      myparam.cdtions = cdtions.cdtions;
        	    					      var descs =  myparam.data;
        	    					      var postParam = {
        	    					    	        data: Ext.JSON.encode(myparam.data),
        	    					    	        tables: Ext.JSON.encode(myparam.tables),
        	    					    	        cdtions: Ext.JSON.encode(myparam.cdtions)
        	    					      };
        	    					      erp.CustomUtil.customQuery("form/FormService.do?method=cusFromQuery",
        	    					          postParam,
        	    					          descs,
    	    					    		  function(recs,fields,p){
        	    					    	  for(var i=0;i<fields.length;i++){
        	    					    		  fields[i].ffName = fields[i].ftName+'_'+fields[i].ffName;
          	    					    	  }
        	    					    	      var tarStore = erp.CustomUtil.makeFiledStore(recs,fields);
        	    					    	      var charPanel = erp.AnalysisFun.callAndDisplay(p.funType,p.display,tarStore,p.field);
        	    					    	      me.add(charPanel);
        	    					          },
    	    					    		  param
    	    					    	   );
        	    				      }
        	    				  });
    						  }else if(results[0].get('report_type')=='SQL报表'){
    							  var result = erp.CustomUtil.exe_sql(results[0].get('ope'),null);
    							  var tarStore = erp.CustomUtil.makeFiledStore(result.DATA_ROWS,result.DATA_FIELDS);
    							  var charPanel = erp.AnalysisFun.callAndDisplay(param.funType,param.display,tarStore,param.field);
					    	      me.add(charPanel);
    						  }
    					  }
    					  }
    				  });
    			}
    		}
    	});
    	me.tools = [{
			type : 'gear',
			itemId:'gear',
			tooltip: '图形设置'
		}];
    	me.callParent(arguments);
    }
});