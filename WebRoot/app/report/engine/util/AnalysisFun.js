Ext.define('erp.report.engine.util.AnalysisFun',{
	  requires : ['erp.def.Const'],
	  //函数类别
	  funStyle : [
	              {"name":"GroupSum", "value":"GroupSum"}
	             ],
	                       
	  //图形展示类型
	  displayStyle :  [{
			chartName : '区域图',
			chartCode : 'areaChart'
		}, {
			chartName : '条形图',
			chartCode : 'barChart'
		}, {
			chartName : '柱线图',
			chartCode : 'columnChart'
		}, {
			chartName : '仪表图',
			chartCode : 'gaugeChart'
		}, {
			chartName : '折线图',
			chartCode : 'lineChart'
		}, {
			chartName : '混合图',
			chartCode : 'mixedChart'
		}, {
			chartName : '饼图',
			chartCode : 'pieChart'
		}, {
			chartName : '雷达图',
			chartCode : 'radarChart'
		}, {
			chartName : '散布图',
			chartCode : 'scatterChart'
		}],
	  init : function(){
			
	  },
	  
	  sqlResult:null,
	  /**
	   * 获取函数类型
	   * store:{name:'函数名称',value:'函数代码'}
	   */
	  getFunStyles : function(){
		  var me = this;
		  return Ext.create('Ext.data.Store',{
	    	      	fields: ['name', 'value'],
			    	data : me.funStyle
	             });
	  },
	  /**
	   * 获取展示类型
	   */
	  getDisplayStyle : function(){
		  var me = this;
		  return Ext.create('Ext.data.Store', {
				fields : ['chartName', 'chartCode'],
				data : me.displayStyle
			});
	  },
	  /**
	   * 调用统计函数
	   */
	  callFunc : function(funstyle,store,field,param){
		  var me = this;
		  return me[funstyle](store,field,param);
	  },
	  /**
	   * 统计并展示
	   */
	  callAndDisplay : function(funstyle,displaystyle,store,field,param){
		  var me = this;
		  var result = me.callFunc(funstyle,store,field,param);
		  return me.makeCharPanel(displaystyle,result);
	  },
	  /**
	   * 生成图形统计chart
	   *@param  displayStyle
	   *@param result统计结果fields,data
	   */
	  makeCharPanel : function(displayStyle,result){
		  var charPanel =  Ext.create('erp.common.form.view.ChartTypePortlet',{
	    		store: Ext.create('Ext.data.Store',{
			    	  fields: result.fields,
			    	  data : result.data
			    }),
			    numeric_fields : ['rresult'],
			    non_numeric_fields:'rname'
	       });
	       charPanel.setChartTypeWindow(displayStyle);
	       return charPanel;
	  },
	  /******************************下面是统计函数****************************************************/
	  //返回值，fields,data
	  GroupSum : function(store,field){
		    store.group(field);
	    	var groups = store.getGroups();
	    	var groupResult = [];
	    	for(var i=0;i<groups.length;i++){
	    		groupResult.push({"rname":((groups[i].name==""?"空":groups[i].name)),"rresult":groups[i].children.length});
	    	}
	    	return {fields:['rname', 'rresult'],data:groupResult};
	  },
	 
	  
	  
	  
	//图形预览
		chartPreview: function(SqlGridPanel){
			var me = this;
			//var SqlGridPanel = me.getSqlPreviewGrid();
	    	var alytar =  SqlGridPanel.down('#alytar').getValue();
	    	var alyfun =  SqlGridPanel.down('#alyfun').getValue();
	    	var funstyle = SqlGridPanel.down('#funstyle').getValue();
	    	var tarStore = erp.CustomUtil.makeFiledStore(me.sqlResult.DATA_ROWS,me.sqlResult.DATA_FIELDS);
	    	var charPanel = erp.AnalysisFun.callAndDisplay(alyfun,funstyle,tarStore,alytar);
	    	
	    	var portlet_type = 'customQueryChartPortlet';
	    	var portlet_class = 'erp.oa.view.CustomQueryChartPortlet';
	    	var mybuttons = [];
	    	if(SqlGridPanel.customQueryId){
	    		mybuttons.push(
				{text: '保存为桌面',
	             handler:function(){
	            	 Ext.Ajax.request({
							url: 'oa/OA.do?method=getPortalConfig',
							params: {
								user_code: erp.Util.currentUser.loginId
								//portlet_type : portlet_type
							},
							success: function(response) {
								var obj = Ext.JSON.decode(response.responseText);
								var portlets = obj.data;
								var col = 0;
								var row = 0;
								for(var i=0;i<portlets.length;i++){
									if(portlets[i].row > row){
										row = portlets[i].row;
										col = portlets[i].col;
									}else if(portlets[i].row == row){
										col = (portlets[i].col>col)?portlets[i].col:col;
									}
								}
								if(col==2){
									col = 0;
									row+=1;
								}else{
									col+=1;
								}
								 Ext.Ajax.request({
										url: 'oa/OA.do?method=addPortalConfig2',
										params: {
										   user_code : erp.Util.currentUser.loginId,
										   portlet_type : portlet_type,
										   portlet_class: portlet_class,
										   row : row,
										   col : col,
										   params : Ext.JSON.encode({
											   queryId:SqlGridPanel.customQueryId,
											   field:alytar,
											   funType:alyfun,
											   display:funstyle})
										},
										success: function(response) {
										    Ext.Msg.alert('提示','保存成功');
								    	}				
								    });		 
					    	}				
					    });		  
	             }
	            });
	    	}
	    	
	        Ext.create('Ext.window.Window',{
				  height: 400,
				      width: 500,
				      border: false, 
				      layout: {
				        type: 'fit'
				      },
				  items: charPanel,
				  buttons: mybuttons
			}).show();
		},
	//显示图形分析生成窗口方法
		doquery: function(rec,ppanel){
	    	var me = this;
	    	//var panel = ppanel;
	    	if(rec.get('report_type')=='单表报表'){
	    		var param = rec.get('ope');
	        	var list_id = rec.get('list_id');
	        	var style = rec.get('default_style');
	    		param = Ext.JSON.decode(param);
	    		me.makeParamCdtion(list_id,param,style);
	    	}else if(rec.get('report_type')=='单SQL报表'){
	    		var sql = Ext.JSON.decode(rec.get('ope')).editSql;
	        	var list_id = rec.get('list_id');
	        	var style = rec.get('default_style');
	        	me.sqlResult = me.exe_sql(sql,(rec.get('dsId')=='0'?"":rec.get('dsId')));
	        	me.sqlPreview(style,list_id);
	    	}else if(rec.get('report_type')=='SYS'){
	    		//TODO
	    		if (Ext.isEmpty(rec.get('sql_text'))){
	    		  Ext.Msg.alert("提示","打印模板未设置完成,请联系管理员");
	    		  return;
	    		  }
	    		else
	    		{
	    			var sql = Ext.JSON.decode(rec.get('sql_text')).editSql;
	    			var list_id = rec.get('mod_id');
		        	var style = rec.get('default_style');
		        	me.sqlResult = me.exe_sql(sql,(rec.get('ds_id')=='0'?"":rec.get('ds_id')));
		        	me.sqlPreview(style,list_id);
	    		}
	        	
	    	}
	    },
	    /**
		 * 获取查询条件并查询
		 */
		makeParamCdtion : function(listId,param,style){
			erp.CustomUtil.getCodtions(listId,
		      function(recs,myparam){
				var p = myparam.p;
				var cdtions = erp.CustomUtil.makeCodtions(recs,p.data);	
				p.cdtions = cdtions.cdtions;
				erp.report.engine.view.QueryStyle.createStyle("form/FormService.do?method=cusFromQuery",p,p.data, myparam.style,myparam.id);
			  },
			  {p:param,id:listId,style:style}
		    );
		},
	 //执行打印模板的sql语句请求
	    exe_sqlForSys: function(qry_sql,ds_code,list_id){
	    	  var qryResult =erp.Const.callServiceMethodSyncDate(
	    	    'dc/DataCenterService.do?method=execSqlQuery',
	    	    {
	    	      QUERY_SQL:qry_sql,
	    	      DATASOURCE_CODE:ds_code,
	    	      data_type:'SYS',
	    	       EXEC_TYPE:'D',
	    	      list_id:list_id
	    	    }
	    	  );
	    	  if(qryResult.data){
	    		this.sqlResult = qryResult.data;
	    	    return qryResult.data;
	    	  }else{
	    	  	 var data={"DATA_FIELDS":[{"ff_id":0,"ft_id":0,"name":"error","code":"name","alias":"SQL执行错误","datatype":"varchar","len":60,"prec":0,"ispk":null,"isfk":null,"isidx":null,"nullable":"true","default_value":null,"ishide":null,"editable":null,"value_gen":null,"isbuildin":null,"order_seq":0,"code_type":null,"db_TYPE":null}],
	    	  	 "DATA_ROWS":[{"error":qryResult.message,"row_num":1}]};
	    	  	 Ext.MessageBox.show({title:'SQL错误',msg:"错误信息:"+qryResult.message,icon:Ext.MessageBox.WARNING,buttons: Ext.MessageBox.OK});
	    	  	 return data;
	    	  }
	    },
		
	  //执行sql语句请求
	    exe_sql: function(qry_sql,ds_code){
	    	  var qryResult =erp.Const.callServiceMethodSyncDate(
	    	    'form/FormService.do?method=executeQuery',
	    	    {
	    	      QUERY_SQL:qry_sql,
	    	      DATASOURCE_CODE:ds_code,
	    	      EXEC_TYPE:'D'
	    	    }
	    	  );
	    	  if(qryResult.data){
	    		this.sqlResult = qryResult.data;
	    	    return qryResult.data;
	    	  }else{
	    	  	 var data={"DATA_FIELDS":[{"ff_id":0,"ft_id":0,"name":"error","code":"name","alias":"SQL执行错误","datatype":"varchar","len":60,"prec":0,"ispk":null,"isfk":null,"isidx":null,"nullable":"true","default_value":null,"ishide":null,"editable":null,"value_gen":null,"isbuildin":null,"order_seq":0,"code_type":null,"db_TYPE":null}],
	    	  	 "DATA_ROWS":[{"error":qryResult.message,"row_num":1}]};
	    	  	 Ext.MessageBox.show({title:'SQL错误',msg:"错误信息:"+qryResult.message,icon:Ext.MessageBox.WARNING,buttons: Ext.MessageBox.OK});
	    	  	 return data;
	    	  }
	    },
	      getSQLFields: function(qry_sql,ds_code){
	    	  var qryResult =erp.Const.callServiceMethodSyncDate(
	    	    'form/FormService.do?method=executeQuery',
	    	    {
	    	      QUERY_SQL:qry_sql,
	    	      DATASOURCE_CODE:ds_code,
	    	      EXEC_TYPE:'F'
	    	    }
	    	  );
	    	  if(qryResult.data){
	    		this.sqlResult = qryResult.data;
	    	    return qryResult.data;
	    	  }else{
	    	  	 var data={"DATA_FIELDS":[{"ff_id":0,"ft_id":0,"name":"error","code":"name","alias":"SQL执行错误","datatype":"varchar","len":60,"prec":0,"ispk":null,"isfk":null,"isidx":null,"nullable":"true","default_value":null,"ishide":null,"editable":null,"value_gen":null,"isbuildin":null,"order_seq":0,"code_type":null,"db_TYPE":null}],
	    	  	 "DATA_ROWS":[{"error":qryResult.message,"row_num":1}]};
	    	  	 Ext.MessageBox.show({title:'exe_sql函数执行错误',msg:"错误信息:"+qryResult.message,icon:Ext.MessageBox.WARNING,buttons: Ext.MessageBox.OK});
	    	  	 return data;
	    	  }
	    },
	    
	    //展示方式预览
		sqlPreview: function(style,list_id) { 
		    var me = this;
			if(me.sqlResult!=null){
				 switch(style){
					case 'gridQueryStyle':
						me.sqlPreviewGrid(list_id);
						break;
					case null:
						me.sqlPreviewGrid(list_id);
						break;
					case 'supacnReportStyle':
						me.sqlPreviewSupacn();
						break;
					case 'supcanTreeListStyle':
						me.sqlPreviewTree();
						break;				
					default:
						me.sqlPreviewGrid(list_id);
						break;
				 }
			}else{
				Ext.Msg.alert("提示","请先执行查询后再预览!");
			}
			
		},
		//创建sql查询结果表
		createTable: function(result){
			var arrField =[];
			var arrClu = [];
			for (var i = 0; i < result.DATA_FIELDS.length; i++){
			    var f = {name:result.DATA_FIELDS[i].name};
			    var c = {
		                text     : result.DATA_FIELDS[i].name,
		                flex     : 1,
		                dataIndex: result.DATA_FIELDS[i].name
		            };
			    arrField[i]=f;
			    arrClu[i] = c;
			};
			var store = Ext.create('Ext.data.Store', {
			        fields: arrField,
			        data:result.DATA_ROWS
			});
			var selectresult = Ext.create('Ext.grid.Panel',{
				itemId:'sel_result',
				plugins: {
				        ptype: 'bufferedrenderer',
				        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
				        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
				    },
//				dockedItems:[{
//					xtype:'pagingtoolbar',
//					dock:'bottom',
//					store:store,
//					displayInfo:'true'
//				}],
				store:store,
				columns:arrClu
	         });
			return selectresult;
		},
		//显示普通表格
		sqlPreviewGrid: function(list_id){
			 var me = this;
			 var selectresult = me.createTable(me.sqlResult);
			 var resultpreview = Ext.create('erp.report.engine.view.SqlPreviewGrid',{
	     			itemId: 'SqlPreview',
	     			closable: true,
	     			customQueryId:list_id
	     	 });
			 resultpreview.down('#alytar').store = Ext.create('Ext.data.Store', {
				fields : [
		            'name',
		            'code',
		            'datatype'
			    ],
			    data : me.sqlResult.DATA_FIELDS
			 });
	     	 resultpreview.down('#sql_preview').add(selectresult);
			 if(me.displayPanel) {
				 erp.Util.closeContentTab(me.displayPanel);
			 }
			 me.displayPanel = erp.Util.addContentTab(resultpreview);
		},
		//显示电子表格
		sqlPreviewSupacn: function(){
			 var me = this;
			 me.createSqlPreview('erp.report.engine.view.SqlSupcanStyle','SqlSupcanPreview');
		},
		
		//显示树列表
		sqlPreviewTree: function(){
			 var me = this;
			 me.createSqlPreview('erp.report.engine.view.SqlTreeStyle','SqlTreePreview');
		},
		//创建展示电子表格视图、树视图
		createSqlPreview: function(v,id){
			 var me = this;
			 var result = me.sqlResult;
			 var tableField =[];
			 var treeField =[];
			 for (var i = 0; i < result.DATA_FIELDS.length; i++){
			     var f = {
			            name     : result.DATA_FIELDS[i].name,
			            type     : result.DATA_FIELDS[i].datatype,
			            value    : result.DATA_FIELDS[i].name
			     };
			     var t = {
			    		codeType: null,
			    	    condition: null,
			    		cusName: result.DATA_FIELDS[i].name,
			    		datatype: result.DATA_FIELDS[i].datatype,
			    		ffName: result.DATA_FIELDS[i].name,
			    		ftName: result.DATA_FIELDS[i].name
		         };
			     tableField[i]=f;
			     treeField[i]=t;
			 };
			 var supacnpreview = Ext.create(v,{
	     			itemId: id,
	     			closable: true
	     	 });
			 if(id=='SqlSupcanPreview'){
				 supacnpreview.makeListPanel(result.DATA_ROWS,tableField,null);
			 }else{
				 supacnpreview.makeListPanel(result.DATA_ROWS,treeField,null);
			 }
			 if(me.displayPanel) {
				 erp.Util.closeContentTab(me.displayPanel);
			 }
			 me.displayPanel = erp.Util.addContentTab(supacnpreview);
		}
},function(){
	erp.AnalysisFun = erp.report.engine.util.AnalysisFun =  Ext.create('erp.report.engine.util.AnalysisFun');
	erp.AnalysisFun.init();
});