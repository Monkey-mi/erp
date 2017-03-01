Ext.define('erp.view.purchaseOrder.PurchaseOrder',{
	extend:'erp.ux.Panel',
	alias:'widget.PurchaseOrder',
	requires:[
		'erp.view.purchaseOrder.PurchaseOrderCtl',
		'erp.ux.PagingBar',
		'erp.ux.SelectField',
		'erp.view.purchaseOrder.view.PurOrderSouthTab',
		'erp.view.master.category.store.CategoryTree',
		'erp.view.purchaseOrder.store.PurchaseOrder',
		'erp.view.purchaseOrder.model.TopSearch',
		'erp.view.purchaseOrder.model.DownSearch',
		'erp.view.purchaseOrder.store.PurchaseOrderBufferrd'
	],
	controller:'PurchaseOrderCtl',
	xtype: 'PurchaseOrder',
	layout: {
        type: 'border'
    },
    cglb:'',
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseOrder.store.PurchaseOrderBufferrd');
		me.DetailSum=Ext.create('erp.view.purchaseOrder.model.PurchaseOrder');
		me.store.on({
			'load':function(s,recs){
				var grid=me.down('#PurchaseOrderGrid');
				//grid初始化选中第一项
				//erp.Util.gridSelect(grid,recs);
				//刷新之后情况取消选中项
				grid.getSelectionModel().deselectAll();
				if(recs.length>0){
					grid.view.bufferedRenderer.scrollTo(-1, true);
				}else{
					grid.getStore().removeAll();
				}
				if(recs.length==0){
					me.setMainBtnStatus(true);
					me.loadDetail(null);
					me.store.removeAll();//如果导入记录为空手动删除所有记录
				}
				//me.loadSum();
			},
			totalcountchange:function onStoreSizeChange() {
				var grid=me.down('#PurchaseOrderGrid');
				me.loadSum();
		        grid.down('#status').update({count: me.store.getTotalCount()});
		    }
		});
		me.cateTreeStore=Ext.create('erp.view.master.category.store.CategoryTree');
		var curDate=new Date();
		curDate.setDate(1);
		var nDate=new Date();
		me.search=Ext.create('erp.view.purchaseOrder.model.TopSearch',{
			cgrq:curDate,
			cgrqw:nDate,
			qfsj:curDate,
			qfsjw:nDate,
			hqsj:curDate,
			hqsjw:nDate
		});
		me.detailSearch=Ext.create('erp.view.purchaseOrder.model.DownSearch');
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		me.ct=me.getController();
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'PurchaseBar',
	    	items:[{text:'新增',iconCls:'page_add',itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
			   	   {text:'复制',iconCls:'page_copy',itemId:'btn_copy',disabled:true},
			   	   {text:'删除',iconCls:'page_delete',itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
			   	   '-',
			   	   {text: '筛选', iconCls:'page_find',itemId:'btn_query',menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_Btnquery',
	   	  		    	items:[
	   	  		    		{text:'上界面',itemId:'btn_query1'},
	   	  		    		{text:'下界面',itemId:'btn_query2'}
	   	  		    	]
	   	  		   })},
			   	   '-',
			   	   {text: '锁定', iconCls:'permssion',itemId:'btn_lock', disabled:true},
			   	   {text: '签发', iconCls:'email_edit',itemId:'btn_issue', disabled:true},
			   	   {text: '回签', iconCls:'email_edit',itemId:'btn_issueback', disabled:true},
			   	   {text: '中止', iconCls:'stop',itemId:'btn_suspend', disabled:true},
			   	   {text: '取消中止', iconCls:'play_green',itemId:'btn_cannel', disabled:true,hidden:true},
			   	   {text: '控制', iconCls:'',itemId:'btn_ctl', disabled:true},
			   	   '-',
	   	  		   {text: '归档',	iconCls:'book_next',xtype:'button',	itemId:'BTN_BACKUP',disabled:true},
	   	  		   {text: '历史',	iconCls:'book_open',xtype:'button',	itemId:'BTN_HISTORY'},
	   	  		   {text:'到货/入库',iconCls:'',itemId:'btn_arrival', disabled:true,menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_arrival',
	   	  		    	items:[
	   	  		    		{text:'合同到货/入库明细',itemId:'btn_arrival1'},
	   	  		    		{text:'材料到货/入库明细',itemId:'btn_arrival2'},
	   	  		    		{text:'更改明细',itemId:'btn_arrival3'}
	   	  		    	]
	   	  		  })},
	   	  		  {text:'合同检测',iconCls:'',itemId:'btn_purcheck',hidden:true},
	   	  		  {text:'数据更新',iconCls:'',itemId:'btn_sync', disabled:true,menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_sync',
	   	  		    	items:[
	   	  		    		{text:'订单信息',itemId:'btn_sync1'},
	   	  		    		{text:'核算部门预付标记更新',itemId:'btn_sync2',hidden:true},
	   	  		    		{text:'采购类别修改',itemId:'btn_sync2'},
	   	  		    		{text:'产品细节确认',itemId:'btn_sync3'}
	   	  		    	]
	   	  		  })},
	   	  		  {text:'打印',iconCls:'printer',itemId:erp.Const.FUNC_ITEMID_BTN_PRINT,disabled:true,
	    		  menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_printer'
	   	  		  })},
	   	  		  {text: '刷新',	iconCls:'arrow_refresh',itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH,handler:function(){
   	  				    	me.store.loadPage(1);
   	  		      } },
   	  			  {text:'重置',iconCls:'refresh_backwards',handler:function(){
   	  			  			delete me.store.proxy.extraParams.search;
   	  				    	me.store.loadPage(1);
   	  		      }},{text : '发布', iconCls:'',itemId : 'synergy',disabled : false,menu: new Ext.menu.Menu({
   	  		           itemId : 'menu_syne',
   	  		           items : [
   	  		           	   {text : '合同信息协同',itemId:'btn_syne_con',menu: new Ext.menu.Menu({
		   	  		           itemId : 'menu_syneout',
		   	  		           items : []
		   	  		      })},
   	  		           	   {text : '附件同步',itemId:'btn_syne_file'},
   	  		           	   {text : '协同回签',itemId:'btn_syne_back'}/*,
   	  		           	   {text : '附件取消',itemId:'btn_file_cancel'}*/
   	  		           	   ]
   	  		      })}
			]
	    	}/*,{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'PurchaseBarOne',
	    	items:[
	    		  {
				        xtype: 'displayfield',
				        itemId: 'tips',
				        value: '<font color="red">合同编号显红色：采购合同明细的交货日期与采购计划的交货日期不一致。</font> <font color="green">合同明细显绿色：采购明细材料进行过BOM更正。</font>'
				    }
	   	  		  ]
	    		}*/],
	    Ext.apply(me,{
	    	listeners:{
	    		afterrender:function(cmp){
	    			//判断当前操作员是否为采购员
					var czy_gh='admin';
					//判断是否是采购员角色
					var isCgy=false;
					Ext.each(erp.Util.currentUser.roleList,function(role){
						if(role.role_name=='采购员'){
							isCgy=true;
							return false;
						}
					})
					if(!erp.Util.currentUser.isAdmin&&isCgy){
						var sql = "	select cgyxm from cgyb where czy_gh='"+erp.Util.currentUser.accountMap[0].ref_u_id+"'";
						var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',{
							sql : sql
						});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return ;
						}
						if(data.val!=null){
							czy_gh=data.val;
							cmp.search.set('czym',czy_gh);
							cmp.store.proxy.extraParams.search="  and (cghtb.czym like '%"+czy_gh+"%')";
						}
					}/*else{
						cmp.search.set('czym',czy_gh);
						cmp.store.proxy.extraParams.search="  and (cghtb.czym like '%"+czy_gh+"%')";
					}*/
	    			cmp.store.loadPage(1);
	    			//me.loadSum();
	    		}
	    	},
	    	items:[{
	    			xtype:'treepanel',
	    			region:'west',
	    			reference:'categorytree',
	    			collapsible:true,
	    			header:false,
	    			collapseMode:"mini",
	    			width:200,
	    			split:true,
	    			store:me.cateTreeStore,
	    			listeners:{
	    			  'itemclick':function(t,rec){
	    			  		if(rec.get('nodeId')!=0){
	    			  			me.store.proxy.extraParams.lbbh=rec.get('nodeId');
	    			  			me.store.load();
	    			  			me.cglb=rec.get('nodeId');
	    			  		}else{
	    			  			delete me.store.proxy.extraParams.lbbh;
	    			  			me.store.load();
	    			  			me.cglb='';
	    			  		}
	    			  }
	    			}
	    	},{
		        region: 'center',
		        xtype:'grid',
		        reference:'PurchaseOrderGrid',
		        itemId:'PurchaseOrderGrid',
				store:me.store,
				//collapsible:true,
				flex:5,
		    	viewConfig:{
		    		enableTextSelection:true,
			     	getRowClass:function(rec,rowIndex,rowParams,store){
				     	if(rec.get('wcbj')==1&&rec.get('gdbj')==0){
						     return 'x-grid-record-gray';
						}
			     	}
			    },
				columns:me.MainColumns,
				selModel:Ext.create('Ext.selection.CheckboxModel',{
					mode:'MULTI'
				}),
				features: [{
			        ftype: 'summary',
			        dock:'bottom'
			    }],
				plugins: [{ptype: 'bufferedrenderer'}],
				dockedItems:[/*{
				    		xtype : 'pagingbar',
		                    stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				    		dock:'bottom',
				    		displayInfo:true,
				    		defaultPageSize : 50,
				    		maxPageSize:2000,
				    		store:me.store
				    	},*/{
	                xtype: 'component',
	                itemId: 'status',
	                tpl: '记录总数: {count}'/*,
	                style: 'margin-right:5px'*/
	            }],
		    	listeners : {
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.setMainBtnStatus(false);
								me.loadDetail(recs[0]);
							} else {
								me.setMainBtnStatus(true);
							}
						},
						itemdblclick:'mainitemdblclick'
				}
			},{
				region: 'south',
				split:true,
				flex:3,
				collapsible:true,
				header:false,
				collapseMode:"mini",
				xtype:'mng_SouthTab',
				itemId:'mng_SouthTab'
			}]
	    });
		this.callParent();
	},
	loadDetail:function(rec){
		if(rec==null){
			rec=Ext.create('erp.view.purchaseOrder.model.PurchaseOrder');
		}
		this.down('#mng_SouthTab').loadDate(rec);
	},
	//设置按钮状态
	setMainBtnStatus:function(sts){
		var me=this;
		var tool=me.down('#PurchaseBar');
		tool.down('#btn_copy').setDisabled(sts);
		tool.down('#BTN_DEL').setDisabled(sts);
		tool.down('#btn_lock').setDisabled(sts);
		tool.down('#btn_issue').setDisabled(sts);
		tool.down('#btn_suspend').setDisabled(sts);
		tool.down('#btn_issueback').setDisabled(sts);
		tool.down('#btn_cannel').setDisabled(sts);
		tool.down('#BTN_BACKUP').setDisabled(sts);
		tool.down('#btn_arrival').setDisabled(sts);
		tool.down('#btn_sync').setDisabled(sts);
		tool.down('#btn_ctl').setDisabled(sts);
		me.down('#BTN_PRINT').setDisabled(sts);
	},
	//设置按钮状态
	setHistoreBtnStatus:function(sts){
		var me=this;
		var tool=me.down('#PurchaseDetailBar');
		if(sts){
			tool.down('#CreateContract').hide(sts);
			tool.down('#CreateOutsource').hide(sts);
			tool.down('#BatchEdit').hide(sts);
		}else{
			tool.down('#CreateContract').show();
			tool.down('#CreateOutsource').show();
			tool.down('#BatchEdit').show();
		}
	},
	/**
	 * @description 打印模板回调函数，用于页面中打印前处理
	 * @param {} 入参item:打印选项
	 * @return {}	 出参recs：选择记录或NULL
	 */
	PrintProcess:function(item){
		var me=this;
		var recs;
		var grid = me.down('#PurchaseOrderGrid');
		recs=grid.getSelectionModel().getSelection();
		if(recs.length==0){
			Ext.Msg.alert("提示","请至少选择一条数据");
			return ;
		}
		//此回调函数用于刷新相关打印标记
		var callback=function(recs,scope){
			var sql  =" update cghtb set dybj=1,dysj=getdate() where htbh='"+recs[0].get('htbh')+"' ";
			scope.refreshPrintInfo(sql);
			recs[0].set('dybj',1);
			recs[0].set('dysj',new Date());
			recs[0].commit();
		};//是否需要刷新相关数据
		recs[0].callback=callback;
		return recs;
	},
	loadSum:function(){
		var me=this;
		var params={};
				var store =me.store;
				Ext.apply(params,store.getProxy().extraParams);
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
				var recs = erp.Const.callServiceMethodSync(
					'purchaseorder/purchaseorder.act?method=getPurchaseOrderSum', params);
				if(recs!=null&&recs.length>0&&recs[0]!=null){
					Ext.apply(me.DetailSum.data,recs[0]);
				}else{
					me.DetailSum=Ext.create('erp.view.purchaseOrder.model.PurchaseOrder');
				}
	}
})