Ext.define('erp.report.engine.view.SqlTreeStyle', {
	alias : 'widget.SqlTreeStyle',
	extend : 'erp.ux.Panel',
	layout:'fit',
	requires:['erp.ux.SupcanPanel','erp.util.form.SCReport'],
	title:'SQL结果电子树预览',
	initComponent : function() {
		var me = this; 
		me.toolConfig = ['funTool'];
	    me.callParent(arguments);
    },
    myCallBack : function(recs,descs,me,direct){
    	 me.makeListPanel(recs,descs,direct);
    	
    },
    makeListPanel : function(mydata,descs,direct){
    	     var me = this;
    	     var pdescs = me.makeNaVals(descs);
    	     me.makeScTreeListCallBack(mydata,pdescs,direct);
    	     me.add(Ext.create('widget.supcan_panel',{
				   hidden: false,
				   border: false,
				   height: document.body.clientHeight-100,
				   supcanId: me.supcanId,
				   html: erp.SupcanUtil.getSupcanHtml(me.supcanId,erp.SupcanUtil.TYPE_TREELIST)
    		     })
    		 );
    },
    makeScTreeListCallBack : function(data,pdescs,direct){
    	 var me = this;
	   	 me.supcanId = Ext.id();
		 if(erp.report.engine.view.QueryStyle.isBindFuc.tree){
		   		erp.Const.application.removeListener('supcanReady',erp.CustomUtil.TreeReadyFunc, erp.CustomUtil);
		   	 }
		 erp.report.engine.view.QueryStyle.isBindFuc.tree = true;
		 erp.CustomUtil.TreeReadyFunc = function(id){
	   			var myId = me.getCurrentId();
		   		 if(id==myId){
		   			 var editor = erp.SupcanUtil.getSupcanById(myId);
			   		 erp.SCReportUtil.makeTreeListByData(editor,data,pdescs);
		   		 }
		   	 };
		erp.Const.application.addListener ('supcanReady', erp.CustomUtil.TreeReadyFunc, erp.CustomUtil);
    },
    getCurrentId : function(){
    	return this.supcanId;
    },
    //生成名称值对
    makeNaVals : function(descs){
    	var naVals = [];
    	 for(var i=0;i<descs.length;i++){
    		 naVals.push({name:descs[i].ffName,value:descs[i].cusName,type:erp.CustomUtil.getSupcanDataType(descs[i].datatype)});
    	 }
    	 return naVals;
    }
})