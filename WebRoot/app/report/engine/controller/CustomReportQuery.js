Ext.define('erp.report.engine.controller.CustomReportQuery',{
	extend:'Ext.app.Controller',
	requires:[
               'erp.report.engine.view.CustomReportQuery'
	         ],
	views:['erp.report.engine.view.CustomReportQuery'],
	refs: [
           {ref:'customReportQuery',selector:'CustomReportQuery'},
	       {ref:'docuTree',selector:'CustomReportQuery #docuTree'},
	       {ref:'resultList',selector:'CustomReportQuery #result_list'},
	       {ref:'myList',selector:'CustomReportQuery #my_list'}
	      ],
    init:function(app){
    	var me = this;
		//controller只初始化一次
		if(me.isInited) {
			return;
		}
    	me.control({
    		'CustomReportQuery':{
    			afterrender: function(cmp){
    				me.getCustomReportQuery().myInit();
    				me.getDocuTree().loadDocu();
    				me.getMyList().loadData();
    			}
    		},
    		'CustomReportQuery #docuTree':{
    			select : function(rowModel,rec){
    				var p = me.getCustomReportQuery();
    				p.myload(p.isadmin,rec.get('nodeId'));
    			}
    		},
    		'CustomReportQuery #docuTree button':{
    			click : function(btn){
    				switch(btn.itemId){
    				case 'docu_refresh':
    					me.getDocuTree().refesh();
    					me.getResultList().clear();
    					break;
    				}
    			}
    		},
    		'CustomReportQuery #result_list #top_bar button':{
    			click : function(btn){
    				var panel = me.getCustomReportQuery();
    				var recs = me.getResultList().getSelectionModel().getSelection();
    				var docRec = me.getDocuTree().getSelectDocu();
	    				if(recs.length>0){
	    					switch(btn.itemId){
	        				case 'reportlist_query':
	        				    if(recs[0].get('report_type')=="单SQL报表"){
	        				    	panel.doquery(recs[0]);
	        				    }else if(recs[0].get('report_type')=="单表报表"){
	        				    	panel.doquery(recs[0]);
	        				    }else if(recs[0].get('report_type')=="多数据源报表"){
	        				    	panel.doquery(recs[0]);
	        				    }
	        					break;
	        			    }
	    				}else{
	    					Ext.Msg.alert('提示','请选择一条记录!');
	    				}
    			}
    		},
    		'CustomReportQuery #result_list pagingtoolbar' : {
    			beforechange : function(bar,page){
    				var panel = me.getCustomReportQuery();
    				var doc = me.getDocuTree().getSelectDocu();
					if(doc){
						panel.myload(null,doc.get('nodeId'));
					}
					return false;
				}
    		},
    		'CustomReportQuery #result_list' : {
    			itemdblclick : function(view,rec){
    				var panel = me.getCustomReportQuery();
    				panel.doquery(rec);
    			}
    		},
    		'CustomReportQuery #my_list button' : {
    			click : function(btn){
    				switch(btn.itemId){
    				case 'upRec':
    					me.getMyList().shiftRecord('up');
    				   break;
    				case 'downRec':
    					me.getMyList().shiftRecord('down');
    				   break;
    				}
    			}
    		}
    	});
    	//初始化完成
    	this.isInited = true;
    }
});