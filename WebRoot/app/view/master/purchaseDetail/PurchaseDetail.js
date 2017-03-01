Ext.define('erp.view.master.purchaseDetail.PurchaseDetail',{
	extend:'erp.ux.Panel',
	alias:'widget.PurchaseDetail',
	requires:[
		'erp.view.master.purchaseDetail.PurchaseDetailCtl',
		'erp.ux.PagingBar',
		'erp.ux.SelectField',
		'erp.view.master.purchaseDetail.store.PlanCategoryTree',
		'erp.view.master.purchaseDetail.store.PurchaseDetail',
		'erp.view.master.purchaseDetail.model.MaterialDetail',
		'erp.view.master.purchaseDetail.model.PurchaseDetailSearch',
		'erp.view.master.purchaseDetail.store.PurchaseDetailBuffered',
		'erp.ux.SupcanGrid',
		'erp.ux.BakCombox'
	],
	controller:'PurchaseDetailCtl',
	xtype: 'PurchaseDetail',
	layout: {
        type: 'border'
    },
	initComponent:function(){
		var me=this;
		me.params={gdbj:0,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		me.store=Ext.create('erp.view.master.purchaseDetail.store.PurchaseDetailBuffered');
		me.DetailSum=Ext.create('erp.view.master.purchaseDetail.model.PurchaseDetail');
		/*me.store.on({
			'load':function(s,recs){
				var grid=me.down('#PurchaseDetailGrid');
				//刷新之后情况取消选中项
				grid.getSelectionModel().deselectAll();
				var srecs=grid.getSelectionModel().getSelection();
				if(recs.length>0){
					//console.log(me.store.getCount());
					//console.log(grid.getScrollY());
					//console.log(grid.view);
					//console.log(grid.view.bufferedRenderer);
					//grid.getView().focusRow(recs[0]);
					//grid.reconfigure(me.store);
					if(recs.length<20){
						grid.view.bufferedRenderer.scrollTo(recs[recs.length-1], true);
					}else{
						grid.view.bufferedRenderer.scrollTo(recs[20], true);
					}
				}else{
					grid.getStore().removeAll();
				}
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
					'purchasedetail/purchasedetail.act?method=getPurchaseDetailCount', params);
				if(recs!=null&&recs.length>0&&recs[0]!=null){
					Ext.apply(me.DetailSum.data,recs[0]);
				}else{
					me.DetailSum=Ext.create('erp.view.master.purchaseDetail.model.PurchaseDetail');
				}
			},
			totalcountchange:function onStoreSizeChange() {
				var grid=me.down('#PurchaseDetailGrid');
		        grid.down('#status').update({count: me.store.getTotalCount()});
		    }
		});*/
		me.search=Ext.create('erp.view.master.purchaseDetail.model.PurchaseDetailSearch');
		me.materialCateTreeStore = Ext.create('erp.view.master.purchaseDetail.store.MaterialCateTree',{
			proxy: {
		        type: 'ajax',
		        actionMethods : {'read' : 'post'},
		        url : 'purchasedetail/purchasedetail.act?method=getMaterialCateTreeList',
		        extraParams:me.params,
		        reader: {
					type: 'json',
					rootProperty: 'data',
					messageProperty: 'message'
				}
		    }
		});//材料类别
		me.ct=me.getController();
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'PurchaseDetailBar',
	    	items:[{text:'生成合同',iconCls:'page_edit',itemId:'CreateContract',disabled:true},
			   	  {text:'生成外协',iconCls:'page_edit',itemId:'CreateOutsource',disabled:true,hidden:true},
			   	  {text:'批量修改',iconCls:'page_edit',itemId:'BatchEdit', disabled:true,menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_Batch',
	   	  		    	items:[
	   	  		    		{text:'分配采购员',itemId:'allotBuyer'},
	   	  		    		{text:'分配供应商',itemId:'allotProduct'},
	   	  		    		{text:'分配采购组',itemId:'allotBuyerGroup'}
	   	  		    	]
	   	  		  })},
			   	  {text:'历史采计',iconCls:'book_open',itemId:'HistoryPurchase'},
			   	  {text:'到货/入库',iconCls:'email_edit',itemId:'AogBps', disabled:true},
				  {text:'更改查询',iconCls:'query',itemId:'EditQuery',disabled:true},
	   	  		  {text:'分配',iconCls:'',itemId:'Allot',disabled:true},
	   	  		  {text:'中止',iconCls:'',itemId:'Discontinue',disabled:true},
	   	  		  {text:'有误',iconCls:'',itemId:'Error',disabled:true},
	   	  		  {text:'供应商查询-规格',iconCls:'query',itemId:'normsQuery',disabled:true},
	   	  		  {text:'供应商查询',iconCls:'query',itemId:'ProviderQuery',disabled:true},
	   	  		  {text:'更新',iconCls:'query',itemId:'Search',menu: new Ext.menu.Menu({
	   	  		    			itemId:'Refresh',
	   	  		    			items:[
	   	  		    				{text:'刷新供应商',itemId:'RefreshProvider',disabled:true}
	   	  		    			]
	   	  		  })},
	   	  		  {text: '筛选', iconCls:'page_find',itemId:'btn_query' }
	   	  		  /*,1957 1.采购计划明细总表，增加供应商查询-规格 按钮（原供应商查询条件下加规格条件），去掉刷新与重置按钮！
	   	  		  {text: '刷新',	iconCls:'arrow_refresh',itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH,handler:function(){
   	  				    	me.loadBySynthesize();
   	  		      }},
   	  			  {text:'重置',iconCls:'refresh_backwards',handler:function(){
   	  			  		me.down('#PurchaseDetailGrid').filter('');
   	  		      }}*/
			]
	    },{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'PurchaseDetailBar1',
	    	items:[{
			    	xtype:'bakcombo',
			    	table:'cgjhmxb',
			    	listeners : {
						'change' : function(t, newValue, oldValue, eOpts) {
							//更换数据库查询参数
							if(newValue!='当前'){
								me.params.table=newValue;
							}else{
								delete me.params.table;
							}
							//me.loadBySynthesize();
						}
					}},'-',
				  {xtype:'textfield',itemId:'synthesize',fieldLabel:'综合查询',emptyText:'客户名称搜索..',enableKeyEvents:true,labelWidth:60,width:560,listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.loadBySynthesize();
    	                    }
    	                }
					}},
				  {text:'查询',glyph:0xf002,itemId:'btn_search',handler:function(btn){
				  		 me.loadBySynthesize();
				  }}
			]
	    }],
		this.items= [{
			xtype:'tabpanel',
			region:'west',
			collapsible:true,
			collapseMode:"mini",
			width:200,
			split:true,
			items:[{
				title:'计划类别',
	    		xtype:'treepanel',
	    		reference:'PlanCategoryTree',
	    		itemId:'PlanCategoryTree',
	    		selModel:Ext.create('Ext.selection.CheckboxModel'),
	    		header:false,
	    		store:Ext.create('erp.view.master.purchaseDetail.store.PlanCategoryTree'),
	    		listeners:{
	    			 itemclick:function(RowModel,record){
	    			 	if(record.get('nodeId')==0){
	    			 		var selModel=me.down('#PlanCategoryTree').getSelectionModel();
	    			 		if(selModel.isSelected(record)){
	    			 			selModel.selectAll();
	    			 		}else{
	    			 			selModel.deselectAll();
	    			 		}
	    			 	}
	    			 }
	    		}
	    	},{
				title:'材料类别',
	    		xtype:'treepanel',
	    		selModel:Ext.create('Ext.selection.CheckboxModel'),
	    		reference:'MaterialCategoryTree',
	    		itemId:'MaterialCategoryTree',
	    		header:false,
	    		store:me.materialCateTreeStore,
	    		listeners:{
	    			 itemclick:function(RowModel,record){
	    			 	if(record.get('nodeId')==0){
	    			 		var selModel=me.down('#MaterialCategoryTree').getSelectionModel();
	    			 		if(selModel.isSelected(record)){
	    			 			selModel.selectAll();
	    			 		}else{
	    			 			selModel.deselectAll();
	    			 		}
	    			 	}
	    			 },
	    			 afteritemexpand:function(t){
	    			 	var tree=me.down('#MaterialCategoryTree');
	    			 	if(!t.data.root){
	    			 		var root=t.parentNode;
	    			 		tree.collapseNode(root);
	    			 		tree.expandNode(root);
	    			 	}
	    			 }
	    		}
	    	}]
		},{
		        region: 'center',
		        xtype:'SupcanGrid',
		        reference:'PurchaseDetailGrid',
		        itemId:'PurchaseDetailGrid',
		        mainModel:Ext.create('erp.view.master.purchaseDetail.model.PurchaseDetail'),
		        MainColumns:me.MainColumns,
		        Properties:{curSelMode:'rows',displayMask:'textColor=if(len(cgrq)=0,red,if(compareDate(cgrq,now())=-1,red,black))'},
		        url:'purchasedetail/purchasedetailforSupcan.act?method=getPurchaseDetailList',
		        params:me.params,
		        onSupcanReady: function(id) {
					var me = this;
					switch(id){
					// 根据id判断，只处理与自己相关的报表控件
					case me.supcanId:
						var af=me.getSupcan();
				    	if(!af||af==null||typeof af.func=='function'){
							//延迟1秒执行，初次加载界面还没有渲染好，会报错！！
						 	var task = new Ext.util.DelayedTask(function(){
								af.func("Build",me.xml);
							    //插入一列表示是否选择
							    if(me.Properties.curSelMode){
							    	af.func("InsertCol", "9 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
							    }
							    url=me.url;
							});
						 	task.delay(500);
						}else{
							af.func("Build",me.xml);
					    	//插入一列表示是否选择
					    	if(me.Properties.curSelMode){
					    		af.func("InsertCol", "9 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
					    	}
					    	url=me.url;
						}
				    	//params=me.params||{czy_gh:'wj',gdbj:0};
				    	//me.load(params);
						break;
					}
				},
		        onSupcanEvent: function(id, event, p1, p2, p3, p4) {
					var SupcanGrid = this;
					//console.log(arguments);
					var af=SupcanGrid.getSupcan();
					if(id==SupcanGrid.supcanId){
						switch(event){
							case 'MenuClicked':
								if(p1==4001){
									Ext.toastErrorInfo("当前界面共有记录条数"+af.func("getRows", "")+"条!");
								}
							break;
							case 'MenuBeforePopup':
							    var enable="true";
							    if(p1 != "-1") { //鼠标点在某行
							    }
							    else { //鼠标点在标题区或空白区
							      enable="false";
							    }
							
							    //拼装成菜单串
							    var menu = "id=4001; text='记录条数'; icon=''; detail='当前界面共有记录条数"+af.func("getRows", "")+"条!';";
							    menu += "enabled=" +enable+ "\r\n";
							    af.func("AddMenu", menu);
							break;
							case 'UserEvent':
								//SupcanGrid.getSupcan().func("CloseLoadMask");
							break;
							case 'SelChanged':
								me.setMainBtnStatus(false);
							break;
							case 'Clicked':
								if(p1!=-1&&p2=='checked'){
									var str =SupcanGrid.getCurrentRow();
									var value=SupcanGrid.getCellData(p1,p2);
									if(value==1){
										value=0;
									}else{
										value=1;
									}
									var strArr=str.split(',');
									var start=parseInt(strArr[0]),
									end=parseInt(strArr[strArr.length-1]),
									len=strArr.length;
									;
									//在连续时使用多列修改
									if(len>1&&((end-start)==len-1)||((start-end)==len-1)){
										if(start>end){
											start=strArr[len-1];
											end=strArr[0];
										}
										SupcanGrid.setColCellData(p2,value,start,end);
									}else{
										SupcanGrid.setCellData(p1,p2,value);
									}
									//设置值
									var rstr=SupcanGrid.findAll("checked=1");
									if(Ext.isEmpty(rstr)&&SupcanGrid.getCurrentRow()==''){
										me.setMainBtnStatus(true);
									}else{
										me.setMainBtnStatus(false);
									}
								}
								if(p1!=-1){
									erp.Util.SearchPanel.grid=SupcanGrid;
									erp.Util.SearchPanel.cellIndex=p2;
									erp.Util.SearchPanel.value=SupcanGrid.getCellData(p1,p2);
								}else{
									erp.Util.SearchPanel.grid=SupcanGrid;
								}
							break;
							case 'EditChanged':
								//获取选中数据
							break;
						}
					}
				}
				/*store:me.store,
				flex:2,
		    	viewConfig:{
			     	getRowClass:function(rec,rowIndex,store){
			     		if(rec.get('gzbj')!=0){
			     			return 'x-grid-record-green';
			     		}
			     	}
			    },
				columns:me.MainColumns,
				selModel:Ext.create('Ext.selection.CheckboxModel',{
					mode:'MULTI',
					checkOnly:true
				}),
				plugins:[
					{ptype: 'bufferedrenderer'},
					{ptype:'gridfilters',menuFilterText:'筛选条件'}
				],
				dockedItems:[{
				    		xtype : 'pagingbar',
		                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
				    		dock:'bottom',
				    		displayInfo:true,
				    		defaultPageSize : 50,
				    		store:me.store
				    	},{
	                xtype: 'component',
	                itemId: 'status',
	                tpl: '记录总数: {count}',
	                style: 'margin-right:5px'
	            }],
	            features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				}],
		    	listeners : {
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.setMainBtnStatus(false);
							} else {
								me.setMainBtnStatus(true);
							}
						}
				}*/
			}]
		this.callParent();
	},
	//设置按钮状态
	setMainBtnStatus:function(sts){
		var me=this;
		var tool=me.down('#PurchaseDetailBar');
		tool.down('#CreateContract').setDisabled(sts);
		tool.down('#CreateOutsource').setDisabled(sts);
		tool.down('#BatchEdit').setDisabled(sts);
		tool.down('#AogBps').setDisabled(sts);
		tool.down('#EditQuery').setDisabled(sts);
		tool.down('#Allot').setDisabled(sts);
		tool.down('#Discontinue').setDisabled(sts);
		tool.down('#Error').setDisabled(sts);
		tool.down('#Allot').setDisabled(sts);
		tool.down('#normsQuery').setDisabled(sts);
		tool.down('#ProviderQuery').setDisabled(sts);
		tool.down('#RefreshProvider').setDisabled(sts);
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
	loadBySynthesize:function(){
		var me=this;
		jhlbArr=me.down('#PlanCategoryTree').getSelection();
		cllbArr=me.down('#MaterialCategoryTree').getSelection();
		var jhlbStr=new Array();
		var bool=false;
		Ext.each(jhlbArr,function(jhlb){
			jhlb=jhlb.get('nodeId');
			if(jhlb!=0){
				jhlbStr.push("left(cgjhb.jhlb,len('"+jhlb+"'))='"+jhlb+"'");
			}else{
				bool=true;
				return false;
			}
		})
		if(jhlbStr.length>0&&!bool){
			me.params.jhlb="("+jhlbStr.join(" or ")+")";
		}else{
			delete me.params.jhlb
		}
		bool=false;
		var cllbStr=new Array();
		Ext.each(cllbArr,function(cllb){
			cllb=cllb.get('nodeId');
			if(cllb!=0){
				cllbStr.push("left(clbmb.lbbh,len('"+cllb+"'))='"+cllb+"'")
			}else{
				bool=true;
				return false;
			}
		})
		if(cllbStr.length>0&&!bool){
			me.params.cllb="("+cllbStr.join(" or ")+")";
		}else{
			delete me.params.cllb
		}
		var value=me.down('#synthesize').getValue();
		if(Ext.isEmpty(value)){
			delete me.params.synthesize;
		}else{
			me.params.synthesize=value;
		}
		var supcanGrid=me.down('#PurchaseDetailGrid');
		supcanGrid.load(me.params);
	}
})