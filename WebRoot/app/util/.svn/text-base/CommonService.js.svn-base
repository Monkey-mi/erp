Ext.define('erp.util.CommonService',{
	requires:['erp.ux.UploadInsertExcelWin'],
	doExportToExcel:function(store,fileName,url){
   		//获取导出字段
   		var fields=erp.Util.getFields(store.getModel());
		//获取store 额外参数信息
		var params=store.getProxy().extraParams;
		//获取store 最近一次参数信息
		 var tmpParam = Ext.clone(store.lastOptions); //此处克隆了原网格数据源的参数信息
		 for(var key in tmpParam.params)
				params[key]=tmpParam.params[key]
		 //删除分页参数
		delete params.usePaging;
		//参数中加入导出字段名称和文件名称
		params[erp.Const.FIELDTITLE]=fields
		params[erp.Const.FILENAME]=fileName?Ext.encode(fileName):Ext.encode('导出Excel');
		var param=[];
		for(var o in params){
			param.push(o+"="+params[o]);
		}
		window.location.href = url+"?"+param.join("&");
   	},
   	doExportExcel:function(store,opt){
   		if(store.getCount()==0)
   		{
   			Ext.Msg.alert('提示','没有可导出的数据!');
   			return;
   		}
   		var url=store.getProxy().api.read;
   		//获取导出字段
   		var fields=erp.Util.getFields(store.getModel());
		//获取store 额外参数信息
		var params=store.getProxy().extraParams;
		 
		//获取store 最近一次参数信息
		 var tmpParam = Ext.clone(store.lastOptions); //此处克隆了原网格数据源的参数信息
		 for(var key in tmpParam.params)
				params[key]=tmpParam.params[key]
		 //若需要全部记录导出的话，删除分页参数
		if(opt)		
			delete params.usePaging;
		params[erp.Const.FIELDTITLE]=fields	
		params[erp.Const.USE_EXCEL]=true;
		Ext.Ajax.request({
			url:url,
			method:'post',
			params:params,
			success:function(response, opts){
				var obj = Ext.decode(response.responseText);
				//用完后删除导出标记和列标题
				delete params[erp.Const.FIELDTITLE];
				delete params[erp.Const.USE_EXCEL];
				window.location.href="main/downloadFile.do?"+erp.Const.AJAX_SERVICE_FILENAME+"="+obj[erp.Const.AJAX_SERVICE_FILENAME];
			}
		});
		
   	},
   	/**
   	 * 根据模板ID处理处理相应的事务
   	 * function name：ProcessByTemplate
   	 * recs: 传入要处理的记录
   	 * template_id：模板ID
   	 * opt_type:操作类型。opt_add---导入新增，opt_export----按模板导出,opt_print 按模板打印 
   	 * 
   	 * anchor:华慧
   	 * date:2015-11-18
   	 */
   	ProcessByTemplate:function(opt_type,template_id,opt){
   	  	if(!template_id) 
   	  	{
   	  		Ext.Msg.alert('提示','未指定模板文件，请联系系统管理员!');
			return ;
   	  	}
   	  	switch(opt_type){
   	  		case erp.Const.OPT_TYPE_ADD:
   	  			var store=opt.store;
   	  			var win=Ext.widget('imp_InsertByExcel',{imp_id:template_id,store:store});
   	  			win.show();
//   	  		console.log(url);
   	  			break;
   	  		case erp.Const.OPT_TYPE_EXPORT:
   	  			var params={};
   	  			var recs=opt.recs;
   	  			if(recs&&recs.length>0){
	   	  			params.data=Ext.encode(recs[0].getData());
	   	  			params.template_id=template_id;
	   	  			Ext.Ajax.request({
	   	  				url:'main/downloadFileByTemplate.do',
	   	  				method:'post',
	   	  				params:params,
	   	  				success:function(response, opts){
	   	  					var obj = Ext.decode(response.responseText);
	   	  					if(obj[erp.Const.AJAX_SERVICE_FILENAME])
	   	  						window.location.href="main/downloadFile.do?"+erp.Const.AJAX_SERVICE_FILENAME+"="+obj[erp.Const.AJAX_SERVICE_FILENAME];
	   	  					else
	   	  						Ext.Msg.alert('提示',obj[erp.Const.AJAX_SERVICE_MESSAGE]);
	   	  				}
	   	  			});
   	  		  	}else
   	  				Ext.Msg.alert('提示','请选择导出记录!');
   	  			break;
   	  		case erp.Const.OPT_TYPE_PRINT:
   	  			
   	  			break;
   	  	}
   	  
   	  
   	}
},function(){
	erp.CommonService = erp.util.CommonService= new this();
});