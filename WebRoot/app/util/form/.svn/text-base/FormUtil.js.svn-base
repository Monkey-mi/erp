Ext.define('erp.util.form.FormUtil',{
	requires:['erp.def.Const'],

	init:function(){
		
	},
	/**
	 * 表单参数构造
	 */
	getParams:function(option){
		var me=this;
		var params=option.params || {},
		 isDef = Ext.isDefined,
	    page = option.page,
        start = option.start,
        limit = option.limit,
        pageParam = me.pageParam,
        startParam = me.startParam,
        limitParam = me.limitParam;
		if(option.action=='read'){
			params.data=Ext.encode(erp.SupcanUtil.initParams(me,me.tbl,me.fld.getRange()));
		}
	 if (pageParam && isDef(page)) {
            params[pageParam] = page;
        }

        if (startParam && isDef(start)) {
            params[startParam] = start;
        }

        if (limitParam && isDef(limit)) {
            params[limitParam] = limit;
        }
        return params;
	},
	/**
	 * 创造查询参数对象
	 * @param tbl单据表名或表对象
	 * @param fld单据字段集合
	 * @param where_str查询条件
	 * @returns json 完成的查询参数
	 */
	initLoadParams:function(tbl,fld,where_str,page){
		var me,
		 selectData,
		 selectJson,
		 tablename;
		 me=this;
		 selectData={};
		 json={};
		 //tbl传进来的可能是一个model，对象或者是string不同类型不同方法来赋值
		 if(tbl.get){
			 tablename=tbl.get('code');
		 }else{
			 tablename=tbl.code||tbl;
		 }
		 selectData[erp.Const.TABLE_NAME]=erp.Const.TABLE_PREFIX+tablename;
		 selectData[erp.Const.TABLE_FIELDS]=[];
		 //这里需判断传入的字段参数类型，是obj对象还是Ext.data.Model
		 if(fld[0]&&fld[0].$className){
			 Ext.each(fld,function(field){
					var a={};
					a[erp.Const.FIELD_CODE]=field.get("code");
					selectData[erp.Const.TABLE_FIELDS].push(a);
				 });
		 }else{
			 Ext.each(fld,function(field){
					var a={};
					a[erp.Const.FIELD_CODE]=field.code||field.name;
					selectData[erp.Const.TABLE_FIELDS].push(a);
				 });
		 }
		 //查询条件
		 if(where_str){
			 selectData['WHERE_STR']=where_str;
		 }
		 if(page){
			 selectData['limit']=page.limit;
			 selectData['start']=page.start;
		 }
		json[erp.Const.SELECT_DATA]=selectData;
		return json;
	},
	/**
	 * 根据传入参数构造表单数据仓库store
	 * @param tbl 传入表名或者是表对象
	 * @param flelds传入已经构造好的fields或是表单字段数组
	 * @returns store 返回已构造好的对象
	 */
	createFormStore: function(tbl,fields){
		var store,
		    model,
		    tbl=tbl,
		    me=this;
		var fields=fields;
		var items=[];
		if(!Ext.isArray(fields)){
			var item=null;
			Ext.each(fields.getRange(),function(field){
				item={
						name:field.get('code')
				};
				if(field.get("datatype")=="int"||field.get("datatype")=="decimal"||field.get("datatype")=="integer"){
					item["type"]="int";
    			}
    			else if(field.get("datatype")=="date"){
    				item["type"]="date";
    				item["dateFormat"]="Y-m-d H:i:s";
    			}	
				items.push(item);
			});
		}
		var model=Ext.define('Ext.data.Model.ImplicitModel-'+Ext.id(),{
			extend: 'Ext.data.Model',
			fields:items,
			idProperty:'pk_id'
		});
		var className="Ext.data.Store.ImplicitStore-"+Ext.id();
		var store=Ext.define(className,{
			extend:'Ext.data.Store',
			model:model,
			proxy:{
				type:'ajax',
				tbl:tbl,
				fld:fields,
				actionMethods:'post',
				api:{
					create:"form/FormService.do?method=submitFormData",
					update:"form/FormService.do?method=submitFormData",
					read:"form/FormService.do?method=selectFormData",
					destroy:"form/FormService.do?method=submitFormData"
				},reader: {
					type: 'json',
					root: 'data.TABLE_DATA',
					messageProperty: 'message'
				}
			}
		});
		var respStore=Ext.create(store.$className);
		//指定store load，sync所使用的参数构造函数
		respStore.proxy.getParams=me.getParams;
		/*store.proxy.doRequest=function(operation, callback, scope){
	            var request = this.buildRequest(operation, callback, scope);
	        Ext.apply(request, {
	            headers       : this.headers,
	            timeout       : this.timeout,
	            scope         : this,
	            callback      : this.createRequestCallback(request, operation, callback, scope),
	            method        : this.getMethod(request),
	            disableCaching: false 
	        });
	        Ext.Ajax.request(request);
	        return request;
		};*/
		return respStore;
	},
	/**
	 * @private 私有方法，不对外开放
	 * @param operation Ext.data.Operation参数集合包括action，和record
	 * @param tbl 单据表名或单据表对象
	 * @param fields 字段集合
	 * @returns params json对象
	 */
	getFormParamsInStore:function(operation,tbl,fields,scope){
		var params = operation.params||{},
		    scope=scope,
            isDef = Ext.isDefined,
	        groupers = operation.groupers,
	        sorters = operation.sorters,
	        filters = operation.filters,
	        page = operation.page,
	        start = operation.start,
	        limit = operation.limit,
	        simpleSortMode = scope.simpleSortMode,
	        simpleGroupMode = scope.simpleGroupMode,
	        pageParam = scope.pageParam,
	        startParam = scope.startParam,
	        limitParam = scope.limitParam,
	        groupParam = scope.groupParam,
	        groupDirectionParam = scope.groupDirectionParam,
	        sortParam = scope.sortParam,
	        filterParam = scope.filterParam,
	        directionParam = scope.directionParam,
	        actionData=operation.action,
	        paging={},
		    records=operation.records;
		   if (pageParam && isDef(page)) {
	            params[pageParam] = page;
	        }
	        if (startParam && isDef(start)) {
	        	paging["start"]=start;
	            params[startParam] = start;
	        }
	        if (limitParam && isDef(limit)) {
	        	paging["limit"]=limit;
	            params[limitParam] = limit;
	            
	        }
	        if (groupParam && groupers && groupers.length > 0) {
	            if (simpleGroupMode) {
	                params[groupParam] = groupers[0].property;
	                params[groupDirectionParam] = groupers[0].direction || 'ASC';
	            } else {
	                params[groupParam] = scope.encodeSorters(groupers);
	            }
	        }
	        if (sortParam && sorters && sorters.length > 0) {
	            if (simpleSortMode) {
	                params[sortParam] = sorters[0].property;
	                params[directionParam] = sorters[0].direction;
	            } else {
	                params[sortParam] = scope.encodeSorters(sorters);
	            }
	        }
	        if (filterParam && filters && filters.length > 0) {
	            params[filterParam] = scope.encodeFilters(filters);
	        }
	        //params中data参数有没有被构造好，如果没有则重新构造一边
	        if(!params.data){
	        	if(actionData == "read"){
	        		params.data=Ext.encode(erp.FormUtil.initLoadParams(tbl,fields));
	        	}
	        	else{
	        		
	        	}
	        }
	        return params;
	},
	/**
	 * 通用窗口关闭方法
	 * @param btn
	 */
	editWinClose:function(btn){
		var win=btn.up('window');
		win.close();
	},
	/**
	 * 向后台请求，获得这些数组的数据表集合与字段集合
	 */
	gridLoad:function(tbls){
		var tbls=tbls;
		var tblNames=[];
		/**
		 * 先构造所需要载入的表单数据的freg_id数组
		 */
		Ext.each(tbls,function(tbl){
			var flds=tbl.frmFldsStore.getRange();
			Ext.each(flds,function(fld){
				if(fld.get("code_type")!=""&&fld.get("code_type")!=null){
					var rec=erp.DataUtil.findConfig(fld.get("code_type"));
					//此处由于升级后数据与程序之间不统一造成rec可能为null
					if(rec!=null&&rec.get('type')==erp.DataConst.FORM_CODE){
						var table_name=rec.get('code');
						var helpRec=erp.DataUtil.findConfig("code",table_name);
						if(helpRec){
							//基础数据源
							var testStore=erp.DataUtil.getStoreByStoreManager(helpRec.get('code'));
							//基础数据字段源
							var fldStore=erp.DataUtil.getStoreByStoreManager(table_name+"frmfld");
							if(!fldStore){
								fldStore=erp.DataUtil.createStoreFactory('erp.common.form.store.FrmFlds');	
								fldStore.loadData(tbl.frmFldsStore.getRange());
								fldStore.storeId=table_name+"frmfld";
								erp.DataUtil.setStoreToStoreManager(fldStore);
							}
							//当数据store不存在时
							if(!testStore){
								var fields=[];
								if(!fldStore){
									fldStore=Ext.create('erp.common.form.store.FrmFlds');	
									fldStore.loadData(tbl.frmFldsStore.getRange());
								}
								testStore=erp.FormUtil.createFormStore(tbl.get('code'),fldStore);
								testStore.load({
									async:false,
									params:{
										async:false
									},
									callback:function(){
										testStore.storeId=helpRec.get('code');
										erp.DataUtil.setStoreToStoreManager(testStore);
									}
								});
							}
						}
					}
				}
			});
	});
	},
	/**
	 * 根据单据代码生成具体的store
	 */
	createStore:function(code){
		var me=this;
		var store=erp.DataUtil.findStore(code);
		if(!store){
			var reg=erp.DataUtil.findRecByStore(erp.DataConst.FRMREG_STOREID,'code',code);
			var tbl=erp.DataUtil.findRecByStore(erp.DataConst.FRMTBL_STOREID,'freg_id',reg.get('freg_id'));
			var store=me.createFormStore(tbl.get('code'), tbl.frmFldsStore);
		}
	    return store;
	},
	createfield:function(fields){
		var fieldList=[];
		Ext.each(fields.getRange(),function(fld){
			var field={
					name:fld.get('code')
			};
			if(fld.get("datatype")=="int"||fld.get("datatype")=="decimal"||fld.get("datatype")=="integer"){
				field["type"]="int";
			}
			else if(fld.get("datatype")=="date"){
				field["type"]="date";
				field["dateFormat"]="Y-m-d H:i:s";
			}
			fields.push(field);
		});
		return fieldList;
	},
	/**
	 * 创造model
	 * @params fields字段仓库 class为"erp.form.store.FrmFlds"
	 */
	createModel:function(fields){
	    var me=this;
		var fields=fields;
		var items=[];
		if(!Ext.isArray(fields)){
			var item=null;
			Ext.each(fields.getRange(),function(field){
				item={
						name:field.get('code')
				};
				if(field.get("datatype")=="int"||field.get("datatype")=="decimal"||field.get("datatype")=="integer"){
					item["type"]="int";
				}
				else if(field.get("datatype")=="date"){
					item["type"]="date";
					item["dateFormat"]="Y-m-d H:i:s";
				}	
				items.push(item);
			});
	}
	var model=Ext.define('Ext.data.Model.ImplicitModel-'+Ext.id(),{
		extend: 'Ext.data.Model',	
		fields:items,
		idProperty:'pk_id'
	});
	return model;
	},
	/**
	 * 构造grid
	 * params
	 */
	createGrid:function(fields,store){
		var config={};
		var fld=fields.getRange?fields.getRange():fields;
		var column=[];
		Ext.each(fld,function(rec){
			var dataIndex=rec.get?rec.get('code'):rec.code;
			var text=rec.get?rec.get('name'):rec.name;
			var code_type=rec.get?rec.get('code_type'):rec.code_type;
			var selcolumn={
					dataIndex:dataIndex,
					text:text,
					flex:1
			};
			if(code_type!=null&&code_type!=""){
				selcolumn.renderer=function(v){
					var config=erp.DataUtil.findConfig(code_type);
					var value=null;
					if(config){
						value=erp.DataUtil.findNameValue(code_type,v,config.get('valueField'),config.get('displayField'));
					}
					return value;
				};
			}
			column.push(selcolumn);
		});
		config.columns=column;
		config.xtype='grid';
		config.store=store;
		config.columnLines=true;
		return config;
	},
	/**
	 * 
	 */
	initSubmitParams:function(Obj,tblName,dscode){
		var rec=Obj.data?Obj.data:Obj;
		var tableDs = {
				TABLE_NAME: erp.Const.TABLE_PREFIX + tblName,
				DATASOURCE_CODE: dscode||"",
				TABLE_FIELDS: []
		};
		for(var field in rec){
			tableDs.TABLE_FIELDS.push({
				FIELD_CODE: field,
				FIELD_VALUE: rec[field]
		});
		}
		return tableDs;
	}
},
function(){
	erp.FormUtil=erp.util.form.FormUtil=new erp.util.form.FormUtilImpl();
	erp.FormUtil.init();
});