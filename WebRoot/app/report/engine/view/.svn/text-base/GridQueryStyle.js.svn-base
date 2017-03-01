Ext.define('erp.report.engine.view.GridQueryStyle', {
	alias : 'widget.gridQueryStyle',
	extend : 'erp.report.engine.view.QueryStyle',
	layout:'fit',
/*  url:'',
 *  param:'',
 *  Desc:'',
 *  tarStore:'
 */
	initComponent : function() {
		var me = this; 
	    me.callParent(arguments);
    },
    myCallBack : function(recs,descs,me,direct){
//    	if(!direct){
//    		descs = me.makeDescParam(descs);
//    	}
   	    me.makeGridPanel(recs,descs,direct);
    },
    makeGridPanel : function(mydata,descs){
    	var me = this;
		var mycolumns = [];
        var mystore;
		
		for(var i=0;i<descs.length;i++){
			mycolumns[mycolumns.length] = {text : descs[i].cusName,dataIndex : descs[i].ffName};
		}
		
		me.tarStore = mystore = erp.CustomUtil.makeFiledStore(mydata,descs);
		
		me.add({  
	        xtype : 'grid',
	        border : false,
	        height: document.body.clientHeight-130,
	        layout : 'fit',
	        columns : mycolumns,                
	        store : mystore,
	        scroll : true
	    });
    }
})