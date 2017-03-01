Ext.define('erp.report.engine.view.SqlSupcanStyle', {
	alias : 'widget.SqlSupacnStyle',
	extend : 'erp.ux.Panel',
	layout:'fit',
	title:'SQL结果电子表格预览',
	requires:['erp.ux.SupcanPanel','erp.util.form.SCReport','erp.report.engine.view.QueryStyle'],
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
    	     me.makeSReportCallBack(mydata,pdescs,direct);
    	     me.add(Ext.create('widget.supcan_panel',{
				   hidden: false,
				   border: false,
				   height: document.body.clientHeight-100,
				   supcanId: me.supcanId,
				   html: erp.SupcanUtil.getSupcanHtml(me.supcanId,erp.SupcanUtil.TYPE_REPORTDESIGNER)
    		     })
    		);
    },
    makeSReportCallBack : function(data,pdescs,direct){
    	 var me = this;
	   	 me.supcanId = Ext.id();
	   	 if(erp.report.engine.view.QueryStyle.isBindFuc.report){
	   		erp.Const.application.removeListener('supcanReady',erp.CustomUtil.ReportReadyFunc, erp.CustomUtil);
	   	 }
	   	erp.report.engine.view.QueryStyle.isBindFuc.report = true;
	   	erp.CustomUtil.ReportReadyFunc = function(id){
	   			var myId = me.getCurrentId();
	   			if(id==myId){
		   			 var editor = erp.SupcanUtil.getSupcanById(myId);
			   		  erp.SCReportUtil.makeReportByData(editor,'json',[JSON.stringify(data)],[pdescs]);
		   		      if(direct){
		   		    	editor.func('callfunc','301\r\n3');
		   		      }else{  
		   		      	 //计算需要插入的列数 默认列数24列，字段从0 开始故完整列数需要+1
		   		      	 var num=pdescs.length-20;
		   		      	 if(num>0)
		   		      	 	editor.func('InsertCols','-1\r\n'+num);
		     		     editor.func('SetCellData','A1\r\n=headRow("ds0")');
		  			     editor.func('SetCellData','A2\r\n=dataRow("ds0")');
		  			     editor.func('callfunc','163\r\n163');
		  			  }
		   		 }
		   	 }
	   	erp.Const.application.addListener ('supcanReady', erp.CustomUtil.ReportReadyFunc, erp.CustomUtil);
    },
     makeSReportCallBackForMulti : function(data,pdescs,id,direct){
    	 var me = this;
//	   	 me.supcanId = Ext.id();
    	 me.supcanId=id;
	   	 if(erp.report.engine.view.QueryStyle.isBindFuc.report){
	   		erp.Const.application.removeListener('supcanReady',erp.CustomUtil.ReportReadyFunc, erp.CustomUtil);
	   	 }
	   	erp.report.engine.view.QueryStyle.isBindFuc.report = true;
	   	erp.CustomUtil.ReportReadyFunc = function(id){
	   			var myId = me.getCurrentId();
	   			if(id==myId){
		   			 var editor = erp.SupcanUtil.getSupcanById(myId);
			   		  erp.SCReportUtil.makeReportByData(editor,'json',[JSON.stringify(data)],[pdescs]);
		   		      if(direct){
		   		    	editor.func('callfunc','301\r\n3');
		   		      }
		   		 }
		   	 }
	   	erp.Const.application.addListener ('supcanReady', erp.CustomUtil.ReportReadyFunc, erp.CustomUtil);
    },
    
    getCurrentId : function(){
    	return this.supcanId;
    },
    //生成名称值对
    makeNaVals : function(descs){
    	var naVals = [];
    	 for(var i=0;i<descs.length;i++){
    		 naVals.push({name:descs[i].name,value:descs[i].value,type:erp.CustomUtil.getSupcanDataType(descs[i].type)});
    	 }
    	 return naVals;
    }
})