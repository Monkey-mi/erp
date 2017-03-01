Ext.define('erp.util.GridEvent', {
	MakExcelUrl:'main/MakeExcel.do',
	ExportUrl:'main/downloadExcel.do',
	requires:['erp.common.form.model.FilterCondition','erp.report.engine.view.SqlSupcanStyle'],
	doFilterQuery:function(cmp,grid){
		var win=this.showFilterWin(cmp.modId,grid);
		if (win)
			win.show();
	},
	onExportClick:function(store,grid){
		var me=this;
		var win=me.getSelectionFieldsWin(store,grid);
		if (win){
			win.down('#btn_confirm').on('click',function(){
	   			var recs=win.down('#grid_Selection').getStore().getRange();
	   			var result={};
				for(var idx in recs){
					result[recs[idx].get('fd_name')]=recs[idx].get('attr_name');
				}
				var fields = Ext.JSON.encode(result);
				
	   			if (!Ext.isEmpty(recs))
	   			{
	   				me.doFreeExportToExcel(grid,store,win,fields,null,excel);
	   			}
	   			else
	   				Ext.Msg.alert("提示","请选择导出字段");
	   		});
			win.show();
		}	
	},
	doFreeExportToExcel:function(grid,store,win,fields,usePaging,excel){
		win.close();
		if(usePaging==null){
			usePaging=false;
		}
//		var loadMask = new Ext.LoadMask(grid.getView(), {msg:"正在生成导出数据,请稍后..."});
//		loadMask.show();
		if(store.getCount()==0)
   		{
//			loadMask.hide();
   			Ext.Msg.alert('提示','没有可导出的数据!');
   			return;
   		}
   		//获取读取数据的URL
   		var url=store.getProxy().api.read;
   		//获取导出字段
//   	var fields=ehr.Util.getFields(store.getModel());
		//获取store 额外参数信息
		var params={};
		Ext.apply(params,store.getProxy().extraParams);
		if(store.lastOptions){
			Ext.apply(params,store.lastOptions.params);
		}
		var proxy=store.getProxy(),
		filterParam=proxy.filterParam,
		sortParam=proxy.sortParam;
		if(store.remoteFilter){
	        filters = store.getFilters().items;
	        if (filterParam && filters && filters.length > 0) {
	            params[filterParam] = proxy.encodeFilters(filters);
	        }
		 }
		 if(store.remoteSort){
		 	sorters = store.getSorters().items;
		 	if (sorters&&sorters.length > 0) {
	            params[sortParam] = proxy.encodeSorters(sorters);
	        }
		 }
		 var tmpParam = Ext.clone(store.lastOptions); //此处克隆了原网格数据源的参数信息
		if(tmpParam){
			params.limit=tmpParam.limit;
			params.start=tmpParam.start;
			params.page=tmpParam.page;
		}
			 //删除分页参数
			if(usePaging){
				params.usePaging=true;
			}else{
				params.usePaging=false;
			}
		params[erp.Const.FIELDTITLE]=fields;
		params[erp.Const.USE_EXCEL]=true;
		var myMask = new Ext.LoadMask({
			target : grid
		});
		if(excel){
			params['excel']=excel;
		}
		myMask.mask('正在生成导出数据,请稍后...');
		Ext.Ajax.request({
			url:url,
			method:'post',
			timeout:1200000,	//设置一分钟响应时间；
			params:params,
			success:function(response, opts){
				myMask.unmask();
				var obj = Ext.decode(response.responseText);
				//用完后删除导出标记和列标题
				delete params[erp.Const.FIELDTITLE];
				delete params[erp.Const.USE_EXCEL];
				var url="main/downloadFile.do?"+erp.Const.AJAX_SERVICE_FILENAME+"="+obj[erp.Const.AJAX_SERVICE_FILENAME];
			 	window.open (url,'文件下载','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')   
			}
		});
	},
	doExportToExcel:function(cmp,grid){
		var me=this;
		var win=me.getSelectionFieldsWin(cmp.modId,grid,{showMode:'local'});
		if (win){
			win.down('#btn_confirm').on('click',function(){
	   			var recs=win.down('#grid_Selection').getStore().getRange();
	   			if (!Ext.isEmpty(recs))
	   			{
	   				erp.GridEvent.doExport(grid,win,recs);
	   			}
	   			else
	   				Ext.Msg.alert("提示","请选择导出字段");
	   		});
			win.show();
		}	
	},
	doExportToExcelPart:function(cmp,grid){
		var me=this;
		var win=me.getSelectionFieldsWin(cmp.modId,grid,{showMode:'local'});
		if (win){
			win.down('#btn_confirm').on('click',function(){
	   			var recs=win.down('#grid_Selection').getStore().getRange();
	   			if (!Ext.isEmpty(recs))
	   			{
	   				erp.GridEvent.doExport(grid,win,recs,true);
	   			}
	   			else
	   				Ext.Msg.alert("提示","请选择导出字段");
	   		});
			win.show();
		}	
	},
	doCustomFields:function(cmp,grid){
		var me=this;
		var win=me.getSelectionFieldsWin(cmp.modId,grid,{showMode:'local'});
		if (win){
				win.down('#btn_confirm').on('click',function(){
				var recs=win.down('#grid_unSelection').getStore().getRange();
				Ext.each(grid.columns,function(col){
					for(var i=0;i<recs.length;i++){
						if (col.text!=""&&col.text==recs[i].get('attr_name')){
							col.hide();
							break;
						}else{
							col.show();
						}
					}
				});
				win.close();
			});
			win.show();
		}	
	},
	/**
	 * @param {目标表格空间} grid
	 * @param {传入对话框窗口} win
	 * @param {传入选择字段清单} fields
	 */
	doExport:function(grid,win,fields,usePaging){
		var me=this;
		win.close();
		var loadMask = new Ext.LoadMask({
		    msg:"正在生成导出数据,请稍后...",
		    target : grid
		});
		loadMask.show();
		//获取grid对应的Store
		var store=grid.getStore();
		//获取store中的read 后台链接
		var url=store.getProxy().api.read;
		//获取store 额外参数信息
		var params={};
		Ext.apply(params,store.getProxy().extraParams);
		if(store.lastOptions){
			Ext.apply(params,store.lastOptions.params);
		}
		var proxy=store.getProxy(),
		filterParam=proxy.filterParam,
		sortParam=proxy.sortParam;
		if(store.remoteFilter){
	        filters = store.getFilters().items;
	        if (filterParam && filters && filters.length > 0) {
	            params[filterParam] = proxy.encodeFilters(filters);
	        }
		 }
		 if(store.remoteSort){
		 	sorters = store.getSorters().items;
		 	if (sorters&&sorters.length > 0) {
	            params[sortParam] = proxy.encodeSorters(sorters);
	        }
		 }
		 var tmpParam = Ext.clone(store.lastOptions); //此处克隆了原网格数据源的参数信息
			 if(tmpParam){
				 params.limit=tmpParam.limit;
				 params.start=tmpParam.start;
				 params.page=tmpParam.page;
			 }
			 //删除分页参数
			if(usePaging){
				params.usePaging=true;
			}else{
				params.usePaging=false;
			}
		//访问后台方法，获取结果集		
//		var retObj=tp.Const.callServiceMethodSync(url,extraParams);
		Ext.Ajax.request({
				url:url+"&_dc="+new Date().getTime(),
				timeout:30000000,
				params:params,
				method:'POST',
				success:function(resp){
					loadMask.hide();
					var data=Ext.JSON.decode(resp.responseText).data;
					var tableField=[];
					for (var i = 0; i < fields.length; i++){
				     var f = {
				            value     : fields[i].get('attr_name'),
				            type     : fields[i].get('data_type'),
				            name    : fields[i].get('fd_name')
				     	};
				     	tableField.push(f);
					}
					var filterData=[];
					Ext.each(data,function(rec){
						var o ={};
						for(var i=0;i<fields.length;i++){
							var fname=fields[i].get('fd_name');
							o[fname]=rec[fname];
						}
						filterData.push(o);
					});
					//生成一个新的Panel
					var supacnpreview = Ext.create('erp.report.engine.view.SqlSupcanStyle',{
		     			itemId: Ext.id(),
		     			title:'导出Excel',
		     			iconCls:'page_excel',
		     			closable: true
		     		 });
					 supacnpreview.makeListPanel(filterData,tableField,null);
					 if(me.displayPanel) {
						 erp.Util.closeContentTab(me.displayPanel);
					 }
				 		me.displayPanel = erp.Util.addContentTab(supacnpreview);
				}
		});
	},
	/**
	 * @param {} modId
	 * @param {} grid
	 * @param {} eOpts
	 */
	showFilterWin:function(modId,grid,eOpts){
		var me=this;
		var data=null;
		var table_name=grid.getSelectionModel().getSelection()[0].get('tablename');
		if (tp.UInfo.currentUser.isAdmin)
				var params={modId:modId,tbl_name:table_name};
			else
				var params={modId:modId,tbl_name:table_name,u_id:tp.UInfo.currentUser.uinfo.u_id};

			var retObj=tp.Const.callServiceMethodSync('main/Buzobj.do?method=getBuzFieldsListByModId',params);
			
			if (Ext.isEmpty(retObj.data))
				{	
					Ext.Msg.alert('提示',"没有配置元数据请联系管理员！");
					return null;
				}
			data=retObj.data;
			var store=Ext.create('Ext.data.ArrayStore',{
					model:'tp.common.form.model.FilterCondition',
					pageSize:10
				});
			var win=Ext.create('Ext.window.Window',{
				title:'组合筛选',
				iconCls:'query',
				width:400,
				height:300,
				modal:true,
				layout:'fit',
				tbar:[{text:'增加条件',tooltip:'增加条件',iconCls:'add',handler:function(){
					var grdStore=win.down('grid').getStore();
					var rec=Ext.create('tp.common.form.model.FilterCondition');
						grdStore.insert(grdStore.getCount(),rec);
				}},
				{text:'删除条件',tooltip:'删除条件',iconCls:'delete'}
				],
				items:[{xtype:'grid',
					columns:[{xtype:'rownumberer',width:20},
					{header:'过滤对象',dataIndex:'cdt_obj',flex:2,editor:{
						xtype:'combo',
						store:Ext.create('Ext.data.Store',{
							fields:['attr_name','fd_name','fd_type'],
							data:data,
							displayField:'attr_name',
							valueField:'fd_name'
						})
					}},
					{header:'条件',flex:1,dataIndex:'cdt_flg',editor:{
						xtype:'combo',
						store: me.opeStore = Ext.create('Ext.data.Store', {
								 fields : ['value', 'name','type'],
								 data : [
										{'value':'>', 'name':'>','type':'num'},
										{'value':'<', 'name':'<','type':'num'},
										{'value':'>=', 'name':'>=','type':'num'},
										{'value':'<=', 'name':'<=','type':'num'},
										{'value':'=', 'name':'=','type':'normal'},
										{'value':'!=', 'name':'!=','type':'normal'},
										{'value':'like', 'name':'like','type':'char'}]
									})
					}},
					{header:'值',flex:2,dataIndex:'cdt_value',editor:{
					}},
					{header:'组合方式',flex:1,dataIndex:'cdt_logic',editor:{
						xtype:'combo',
						store:[['and','且'],['or','或']]
					}}
					],
				store:store,	
				plugins: [
				        Ext.create('Ext.grid.plugin.CellEditing', {
				            clicksToEdit: 1,
				            pluginId: 'rowedit'
				        })
				    ]
				}],
				buttons:[{text:'确认',iconCls:'accept'},{text:'关闭',iconCls:'cancel',handler:function(){
	   				win.close();
	   			}}]
			});
			return win;
	},
	
	
	
	/**
	 * @param {功能菜单ID号} modId
	 * @param {传入表格控件} grid
	 * @param {其他项参数,showMode:{remote,local}} eOpts
	 * @return Excel 对象名
	 */
	getSelectionFieldsWin:function(modId,grid,eOpts){
		var me=this;
		var data=[];
		/*var cfg=eOpts;
			switch(cfg.showMode){
				case 'remote':
					var table_name=grid.getSelectionModel().getSelection()[0].get('tablename');
					if (tp.UInfo.currentUser.isAdmin)
						var params={modId:modId,tbl_name:table_name};
					else
						var params={modId:modId,tbl_name:table_name,u_id:tp.UInfo.currentUser.uinfo.u_id};

					var retObj=tp.Const.callServiceMethodSync('main/Buzobj.do?method=getBuzFieldsListByModId',params);
					
					if (Ext.isEmpty(retObj.data))
					{	
						Ext.Msg.alert('提示',"没有配置元数据请联系管理员！");
						return null;
					}
					data=retObj.data;
					break;
				case 'local':*/
				  	var cols=grid.columns;
				  	Ext.each(cols,function(col){
				  		if (col.text!='')
				  		{
				  			var field={};
				  			field.fd_name=col.dataIndex;
				  			field.attr_name=col.text;
				  			field.tbl_name='';
				  			//数据类型
				  			switch(col.xtype){
				  				case 'datecolumn':
				  					field.data_type='date';
				  					break;
				  				case 'numbercolumn':
				  					field.data_type='float';
				  					break;
				  				default:
				  					field.data_type='string';
				  			}
				  			data.push(field);
				  		}
				  	});
					/*break;
		}*/
		var store=Ext.create('Ext.data.JsonStore',{
			fields:['attr_name','fd_name','tbl_name','data_type'],
			data:data
		});
		var win=Ext.create('erp.ux.Window',{
			width:500,
			height:300,
			title:'导出字段选择',
			modal:true,
			iconCls:'page_excel',
			layout:{type:'hbox',align:'stretch'},
			items:[{
				xtype:'grid',
				flex:1,
				itemId:'grid_unSelection',
				title:'可选列',
				selModel:Ext.create('Ext.selection.CheckboxModel'), 
				columns:[/*{header:'',xtype:'rownumberer',width:35},*/{
					header:'列名',dataIndex:'attr_name',flex:1}],
				store:store,
				listeners:{
					itemdblclick:function(v,rec){
						win.down('#grid_Selection').getStore().add(rec);
	   					win.down('#grid_unSelection').getStore().remove(rec);
					}
				}
				},
				{
	   				xtype:'container',
	   				width:40,
	   				itemId:'ctnr_Buttons',
	   				layout:{type:'vbox',align:'stretch',pack:'center',defaultMargins:5},
	   				items:[{xtype:'button',text:'>',tooltip:'选择',itemId:'btn_import',handler:function(){
	   						var recs=win.down('#grid_unSelection').getSelectionModel().getSelection();
	   						win.down('#grid_Selection').getStore().add(recs);
	   						win.down('#grid_unSelection').getStore().remove(recs)
	   						
	   				}},
	   					   {xtype:'button',text:'>>',tooltip:'全选',itemId:'btn_importAll',handler:function(){
	   					   	var recs=win.down('#grid_unSelection').getStore().getRange();
	   						win.down('#grid_Selection').getStore().add(recs);
	   						win.down('#grid_unSelection').getStore().remove(recs)
	   					   }},
	   					   {xtype:'button',text:'<',tooltip:'消除',itemId:'btn_clear',handler:function(){
	   					   	var recs=win.down('#grid_Selection').getSelectionModel().getSelection();
	   						win.down('#grid_unSelection').getStore().add(recs);
	   						win.down('#grid_Selection').getStore().remove(recs)
	   					   }},
	   					   {xtype:'button',text:'<<',tooltip:'全部消除',itemId:'btn_clearAll',handler:function(){
	   					   		var recs=win.down('#grid_Selection').getStore().getRange();
	   							win.down('#grid_unSelection').getStore().add(recs);
	   							win.down('#grid_Selection').getStore().remove(recs)
	   					   }}
	   					   ]
	   			},
	   			{
	   			xtype:'grid',
				flex:1,
				title:'已选列',
				itemId:'grid_Selection',
				listeners:{
					itemdblclick:function(v,rec){
						win.down('#grid_Selection').getStore().remove(rec);
	   					win.down('#grid_unSelection').getStore().add(rec);
					}
				},
				selModel:Ext.create('Ext.selection.CheckboxModel'), 
				columns:[/*{header:'',xtype:'rownumberer',width:35},*/{
					header:'列名',dataIndex:'attr_name',flex:1
				}],
				store:Ext.create('Ext.data.JsonStore',{
					fields:['attr_name','fd_name','tbl_name','data_type']})
	   			}],
	   		buttons:[{text:'确认',itemId:'btn_confirm',iconCls:'accept'},{text:'关闭',iconCls:'cancel',handler:function(){
	   			win.close();
	   		}}]
		});
		return win;
	}
},
function(){
    erp.GridEvent = erp.util.GridEvent= new this();
});