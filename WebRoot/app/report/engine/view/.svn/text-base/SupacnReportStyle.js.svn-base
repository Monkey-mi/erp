Ext.define('erp.report.engine.view.SupacnReportStyle', {
	alias : 'widget.supacnReportStyle',
	extend : 'erp.report.engine.view.QueryStyle',
	//extend : 'gp.def.ui.Panel',
	layout:'fit',
	requires:['erp.ux.SupcanPanel','erp.util.form.SCReport'],
/*  url:'',
 *  param:'',
 *  Desc:'',
 *  tarStore:'
 */
	initComponent : function() {
		var me = this; 
		me.toolConfig = ['funTool'];
	    me.callParent(arguments);
    },
    myCallBack : function(recs,descs,me,direct){
    	 me.makeSupacnReportPanel(recs,descs,direct);
    },
    makeSupacnReportPanel : function(mydata,descs,direct){
    	     var me = this;
    	     var pdescs = me.makeNaVals(descs);
    	    	 me.makeSReportCallBack(mydata,pdescs,direct);
        	     /**************************下面的store用于非控件的统计函数************************************/
        	     me.tarStore = erp.CustomUtil.makeFiledStore(mydata,descs);
 //   	    }
    	    
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
			   		  erp.SCReportUtil.makeReportByData(editor,'json',[JSON.stringify(data)
			   		                                                  ],[pdescs]);
		   		      if(direct){
		   		    	editor.func('callfunc','301\r\n3');
		   		      }else{  
		     		     editor.func('SetCellData','A1\r\n=headRow("ds0")');
		  			     editor.func('SetCellData','A2\r\n=dataRow("ds0")');
		  			     editor.func('callfunc','163\r\n163');
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
    		 naVals.push({name:descs[i].ffName,value:descs[i].cusName,type:erp.CustomUtil.getSupcanDataType(descs[i].datatype)});
    	 }
    	 return naVals;
    }
})