Ext.define('erp.report.engine.view.CustomUtil',{
	  requires: ['erp.report.engine.store.CustomReportResult',
	             'erp.report.engine.store.CustomQueryCdtion'
	             ],
	  init:function(){
			var me = this;
			 me.resultStore = Ext.create('erp.report.engine.store.CustomReportResult');
			 me.cdtionStore = Ext.create('erp.report.engine.store.CustomQueryCdtion');
		},
	  //是否获取过用户所拥有的群组信息
	  hasGroupMsg : false,
	  //用户所拥有的群组信息:{org,dept}(组织,部门)
	  GroupMsg : {orgs:[],orgs:[]},
	  /**
	   * fun(recs,params)
	   * 获取指定的报表查询模板
	   */
	  getCustomReport : function(list_id,fun,params){
		  var me = this;
		  me.resultStore.load({
			  params : {list_id : list_id},
			  callback : function(records){
		         fun(records,params);
		      }
		  });
	  },
	  /**
	   * 获取指定的报表查询模板的查询条件 
	   */
	  getCodtions : function(list_id,fun,params){
		  var me = this;
		  me.cdtionStore.load({
			  params : {l_id : list_id},
			  callback : function(records){
		         fun(records,params);
		      }
		  });
	  },
	  /**
	   * 获取修改界面的报表查询模板的查询条件 
	   */
	  getCodtionsInit : function(list_id){
		  var me = this;
		  me.cdtionStore.load({
			  params : {l_id : list_id}
		  });
		  return me.cdtionStore;
	  },
	
	  //处理查询条件，非数字类型加''
	  makeCodtions : function(recs,fields){
		  var me = this;
		  var id,rec,cid,wildR,cdtions = [],queryCdtions = [],type;
		  for(var j=0;j<fields.length;j++){
				id = me.generateCdtionId(fields[j]);
				for(var i=0;i<recs.length;i++){
					rec = recs[i];
					cid = rec.get('ft_ff_id');
				    if(id == cid){
				    	wildR = me.dealWildcardCdtions(rec.get('field_type'), rec.get('ope'), rec.get('opeVal'), fields[j].datatype);
						if(wildR.opeVal){
							if(!rec.get('cd_type')||rec.get('cd_type')=='filterCd'){
								cdtions[cdtions.length] = {
										ft_ff_id : cid,
										ope : wildR.ope,
										opeVal : wildR.opeVal,
										field_type : rec.get('field_type')
								}	
							}else{
								queryCdtions[queryCdtions.length] = {
										ft_ff_id : cid,
										ope : wildR.ope,
										opeVal : wildR.opeVal,
										field_type : rec.get('field_type')
								}	
							}
						}
				    }	
				}
			}
		  return {cdtions:cdtions,queryCdtions:queryCdtions};
	  },
	  /**
	   * 对通配条件进行处理
	   */
	  dealWildcardCdtions : function(type,ope,opeVal,datatype){
		  var isWildcard = false;
		  if(isNaN(opeVal)){
			  if(opeVal.indexOf('@group')==0){
				  if(opeVal.indexOf('@org')>-1){
					  isWildcard = true;
					  opeVal = this.getUserGroupOD('orgs');
				  }else if(opeVal.indexOf('@dept')>-1){
					  isWildcard = true;
					  opeVal = this.getUserGroupOD('depts');;
				  }  
			  }
			  else if(opeVal.indexOf('@org')==0){
				  isWildcard = true;
				  opeVal = this.getUserODP('ou_code');
			  }else if(opeVal.indexOf('@dept')==0){
				  isWildcard = true;
				  opeVal = this.getUserODP('d_code');
			  }else if(opeVal.indexOf('@position')==0){
				  isWildcard = true;
				  opeVal = this.getUserODP('pst_code');
			  }else if(opeVal.indexOf('@me')==0){
				  opeVal = erp.Util.currentUser.loginId;
			  }
		  }
		  if(type == 'base'||datatype == 'int'||datatype == 'integer'||datatype == 'numeric'||datatype == 'double'||datatype == 'float'){
			  if(isWildcard){
				  if(opeVal.length==0){
					  opeVal = -111111;
				  }else if(opeVal.length==1){
					  opeVal = opeVal[0];
				  }else if(opeVal.length>1){
					  ope = ' IN';
					  var temp = ' (';
					  for(var i=0;i<opeVal.length-1;i++){
						  temp+=(opeVal[i]+" , ");
					  }
					  temp+=(opeVal[opeVal.length-1]+" ) ");
					  opeVal = temp;
				  }
			  }
			}else{
			  if(isWildcard){
                  if(opeVal.length==0){
                	  opeVal = '-111111';
				  }else if(opeVal.length==1){
					  opeVal = "'"+opeVal[0]+"'";
				  }else if(opeVal.length>1){
					  ope = ' IN';
					  var temp = ' (';
					  for(var i=0;i<opeVal.length-1;i++){
						  temp+=("'"+opeVal[i]+"'"+" , ");
					  }
					  temp+=("'"+opeVal[opeVal.length-1]+"'"+" ) ");
					  opeVal = temp;
				  }
			  }else{
				  opeVal = "'"+opeVal+"'";
			  }
			}
		  return {ope:ope,opeVal:opeVal};
	  },
	  generateCdtionId : function(rec){
	    	return  rec.ftName+"."+rec.ffName;
	  },
	  /***
	   * 获取当前用户所属的组织，部门，职位
	   * 空是返回空数组，
	   * @param str 组织，部门，职位的字段ou_code，d_code，pst_code
	   */
	  getUserODP : function(str){
		  var result = [];
		  var infos = erp.Util.currentUser.pstList;
		  if(infos&&infos.length>0){
			  for(var i=0;i<infos.length;i++){
				  result[result.length] = infos[i][str];
			  }
		  }
		  return result;
	  },
	  /**
	   * 获取用户所拥有群组的组织，部门
	   */
	  getUserGroupOD : function(str){
		  var me = this;
		  if(!me.hasGroupMsg){
			  Ext.Ajax.request({
				    url: 'main/UsersService.do?method=getUserGroupOD ',
				    async: false,
				    params: {
				    	userId : erp.Util.currentUser.u_id,
				    	roles : Ext.encode(erp.Util.currentUser.roleList),
				    	isRepeat : false
				    },
				    success: function(response){
				    	me.hasGroupMsg = true;
				        var text = Ext.decode(response.responseText);
				        var rec = text.data;
				        var depts = [];
				        var ordetails = [];
				        var orgStore = erp.DataUtil.getStoreByStoreManager('orgunit',true);
						 var deptStore = erp.DataUtil.getStoreByStoreManager('dept',true);
				        for(var i=0;i<rec.depts.length;i++){
				        	depts[i] = deptStore.findRecord('d_id',rec.depts[i].d_id).get('d_code');
				        }
				        var orgs;
                        for(var i=0;i<rec.ordetails.length;i++){
                        	orgs = rec.ordetails[i].orgrelDetail;
                        	var org;
                        	for(var k=0;k<orgs.length;k++){
                        		org = orgs[k];
                        		orgStore.each(function(rec){
                            		if(rec.get('ou_id')==org.ou_id){
                            			ordetails[ordetails.length] =  rec.get('ou_code');
                            		}
                            	});
                        	}
				        }
                        me.GroupMsg["depts"] = depts;
                        me.GroupMsg["orgs"] = ordetails;
				   }
			  });
		  }
		  if(str){
			  return me.GroupMsg[str];  
		  }else{
			  return me.GroupMsg;
		  }
	  },
	  /**
	   * 用户是否有这个角色
	   */
	  hasRole : function(roleId){
		  var roles = erp.Util.currentUser.roleList;
		  var result = false;
		  for(var i=0;i<roles.length;i++){
			  if(roleId==roles[i].role_id){
				  result = true;
				  break;
			  }
		  }
		  return result;
	  },
	  //用筛选的字段和条件进行查询
	  customQuery : function(url,queryParam,fields,fun,param){
		  Ext.Ajax.request({
			    url: url,
			    params: queryParam,
			    success: function(response){
			        var text = Ext.decode(response.responseText);
			        //将指标属性代码值用指标属性名称
			        var recs = text.data;
			        var code_type;				    			   
			        var code;
			        for(var i=0;i<fields.length;i++){
			        	code_type = fields[i].codeType;
			        	if(code_type){
		        			code = fields[i].ffName;
		        			var length = recs.length;
		        		    for(var j=0;j<length;j++){
			        		    if(recs[j]&&recs[j][code]&&recs[j][code]!=''){	
										 var mystore = erp.DataUtil.getStoreByType(code_type);
										 var model =  erp.DataUtil.findConfig(code_type);
										 var fname  = model.get('displayField');
										 var fvalue = model.get('valueField');
										 var tar = mystore.findRecord(fvalue,recs[j][code]);
										 recs[j][code] = tar?tar.get(fname):recs[j][code];
			        		    }else if(!recs[j]){
			        		    	//todo:  code_type null时，recs[j]也可能为空
			        		    	recs.splice(j,1);
			        		    	j--;
			        		    	length--;
			        		    }
		        			}				    			        	
		        	    }
			        }
			        fun(recs,fields,param);
			    }
			}); 
	  },
	  //用数据和字段描述生成对应store
	  makeFiledStore : function(data,fields){
		  var myfields = [];
		  var f = fields;
		  var tarStore;
		  if(f[0].ffName){
			  for(var i=0;i<fields.length;i++){
	 				myfields[myfields.length] = fields[i].ffName;
	 		  }
		  }else{
			  for(var i=0;i<fields.length;i++){
	 				myfields[myfields.length] = fields[i].name;
	 		  }
		  }
 	      tarStore = Ext.create('Ext.data.Store',{
 	    	    fields : myfields,
 	        	data:{'items':data},
 	            proxy: {
 	                type: 'memory',
 	                reader: {
 	                    type: 'json',
 	                    root: 'items'
 	                }
 	            }
 	        });
 	      return tarStore;
	  },
	  
	//执行sql语句请求
	    exe_sql: function(qry_sql,ds_code){
	    	  var qryResult =erp.Const.callServiceMethodSync(
	    	    'form/FormService.do?method=executeQuery',
	    	    {
	    	      QUERY_SQL:qry_sql,
	    	      DATASOURCE_CODE:ds_code
	    	    }
	    	  );
	    	  if(qryResult){
	    	    return qryResult;
	    	  }else{
	    	  	Ext.log('exe_sql函数执行错误，'+qryResult.message);
	    	  }
	    },
	  
	  /**
	   * 将数据库数据类型转化为supcan的数据类型
	   */
	  getSupcanDataType : function(datatype){
		  var result = 'String';
		  if(datatype == 'int'||datatype == 'integer'){
			  result = 'Int';  
		  }else if(datatype == 'numeric'||datatype == 'double'||datatype == 'float'){
			  result =  'Decimal'; 
		  }else if(datatype == 'date'){
			  result =  'Date'
		  }else if(datatype == 'datetime'){
			  result = 'Datetime'
		  }
		  return result;
	  }
},function(){
	erp.CustomUtil = erp.report.engine.view.CustomUtil =  Ext.create('erp.report.engine.view.CustomUtil');
	erp.CustomUtil.init();
});
