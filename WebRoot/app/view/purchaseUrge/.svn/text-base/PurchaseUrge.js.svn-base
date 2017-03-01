Ext.define('erp.view.purchaseUrge.PurchaseUrge',{
	extend:'erp.ux.Panel',
	alias:'widget.PurchaseUrge',
	requires:[
		'erp.ux.PagingBar',
		'erp.view.master.purchaseDetail.store.MaterialCateTree',
		'erp.view.purchaseUrge.store.PurchaseUrge',
		'erp.view.purchaseUrge.store.PurchaseUrgeDetail',
		'erp.view.purchaseUrge.PurchaseUrgeModel',
		'erp.view.purchaseUrge.store.PurchaseUrgeOth',
		'erp.view.purchaseUrge.store.PurchaseUrgeBuffered'
	],
	controller:'PurchaseUrgeCtl',
	viewModel:{
		type:'PurchaseUrgeModel'
	},
	layout: {
        type: 'border'
    },
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseUrge.store.PurchaseUrgeBuffered');
		if(me.cglb!=0){
			me.store.proxy.extraParams.cglb=me.cglb;
		}
		me.DetailSum=Ext.create('erp.view.master.purchaseDetail.model.PurchaseDetail');
		me.countUrl='purchaseurge/purchaseurge.act?method=getPurchaseUrgeCount';
		me.store.on({
    	 	 load:function(s,recs){
    	 	 	var grid=me.down('#PurchaseUrgeGrid');
				if(recs.length>0){
					//grid.view.bufferedRenderer.scrollTo(recs[recs.length-1], true);
					erp.Util.gridSelect(grid,recs);
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
					'purchaseurge/purchaseurge.act?method=getPurchaseUrgeCount', params);
				if(recs!=null&&recs.length>0&&recs[0]!=null){
					Ext.apply(me.DetailSum.data,recs[0]);
				}else{
					me.DetailSum=Ext.create('erp.view.master.purchaseDetail.model.PurchaseDetail');
				}
    	 	 },
			totalcountchange:function onStoreSizeChange() {
				var grid=me.down('#PurchaseUrgeGrid');
		        grid.down('#status').update({count: me.store.getTotalCount()});
		    }
    	});
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		//字段颜色处理
		Ext.each(me.MainColumns,function(c){
			switch(c.dataIndex){
				case 'zhsl':
				case 'rkzs':
				case 'wdzs':
				case 'fzdw':
				case 'fzsl':
					c.hidden=true;
				break;
				case 'qdsj':
				case 'czsj':
				case 'dysj':
				case 'cjjhrq':
				case 'cgrq':
				case 'hqjq':
				case 'qrjq':
					c.renderer=function(v,metaData){
							var rec=metaData.record;
							if(rec.get('bj')==1){
								metaData.style='color:red;'
							}
							return Ext.util.Format.date(v, 'Y-m-d');;
						}
				break;
				case 'czym':
				case 'sdckmc':
				case 'cgh':
				case 'jhh':
				case 'drsl':
				case 'khjc':
				case 'cgww':
				case 'dhrk':
				case 'cgsl':
				case 'jldw':
				case 'bzsm':
				case 'csmc':
				case 'cgyxm':
				case 'jhbz':
					c.renderer=function(v,metaData){
						var rec=metaData.record;
						if(rec.get('bj')==1){
							metaData.style='color:red;'
						}
						return v;
					}
				break;
				case'htxh':
				case'htbh':
					c.renderer=function(v,metaData){
						var rec=metaData.record;
						if(rec.get('lsbj')==1){
							metaData.style='color: blue;'
						}else{
							if(!Ext.Date.isEqual(rec.get('jhrq'),rec.get('cjjhrq')) || rec.get('bj')==1){
								metaData.style='color: red;'
							}
						}
						return v;
					}
				break;
				case'clmc':
				case'clhh':
					c.renderer=function(v,metaData){
						var rec=metaData.record;
						if(rec.get('jlsl')>0){
							metaData.style='color: green;'
						}
						return v;
					}
				break;
			}
		});
		me.dStore=Ext.create('erp.view.purchaseUrge.store.PurchaseUrgeDetail');
		
		me.dStore=Ext.create('erp.view.purchaseUrge.store.PurchaseUrgeDetail');
		me.dColumns=erp.Util.getColumns(me.dStore.getModel());
		me.oStore=Ext.create('erp.view.purchaseUrge.store.PurchaseUrgeOth');
		me.oColumns=erp.Util.getColumns(me.oStore.getModel());
		Ext.apply(me,{
			listeners:{
	    		afterrender:function(cmp){
	    			var isCgy=false;
					Ext.each(erp.Util.currentUser.roleList,function(role){
						if(role.role_name=='采购员'){
							isCgy=true;
							return false;
						}
					})
					if(!erp.Util.currentUser.isAdmin&&isCgy){
		    			//判断当前操作员是否为采购员
						var czy_gh=erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;
						var sql = "	select cgybh from cgyb where czy_gh='"+czy_gh+"'";
						var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',{
							sql : sql
						});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return ;
						}
						if(data.val!=null){
							cmp.getController().searchModel.set('cgym',data.val);
							cmp.store.proxy.extraParams.search="  and (cghtb.cgym like '%"+data.val+"%')";
						}
					}
	    			cmp.store.loadPage(1);
	    		}
	    	},
	    	dockedItems:[{
		    	xtype: 'toolbar',
		    	dock: 'top',
		    	itemId:'PurchaseUrgeBar',
		    	items:[
		    		  {text:'中止', iconCls:'stop', itemId:'btn_suspend',disabled:true},
				   	  {text: '取消中止',	iconCls:'play_green',itemId:'btn_cannel',	disabled:true,hidden:true},
				   	  {text: '确定到货',	iconCls:'',itemId:'btn_AOG', disabled:true},
				   	  {text: '操作功能',iconCls:'menu_dropdown',itemId:'btn_op_menu', disabled:true,menu: new Ext.menu.Menu({
		   	  		    	itemId:'menu_op',
		   	  		    	items:[
		   	  		    		{text:'确认交期',itemId:'btn_op1'},
		   	  		    		{text:'滚动输出',itemId:'btn_op2'},
		   	  		    		{text:'确认交期导入',itemId:'btn_op3'},
		   	  		    		{text:'回复物控',itemId:'btn_op4'},
		   	  		    		{text:'合同拆分',itemId:'btn_op5'},
		   	  		    		{text:'入库日期刷新',itemId:'btn_op6'}
		   	  		    	]
		   	  		  })},
					  {text: '历史',	iconCls:'book_open',xtype:'button',	itemId:'BTN_HISTORY'},
					  {text: '其他操作',iconCls:'menu_dropdown',itemId:'btn_oop_menu', disabled:true,menu: new Ext.menu.Menu({
		   	  		    	itemId:'menu_oop',
		   	  		    	items:[
		   	  		    		{text:'铝管追催',itemId:'btn_oop1'},
		   	  		    		{text:'支数计算',itemId:'btn_oop2',hidden:true},
		   	  		    		{text:'合并追催',itemId:'btn_oop3'},
		   	  		    		{text:'钢架材料',itemId:'btn_oop4'},
		   	  		    		{text:'确认交期同步物控交期',itemId:'btn_oop5'}
		   	  		    	]
		   	  		  })},
		   	  		  {text:'批量修改',iconCls:'page_edit',itemId:'BatchEdit'},
					  {text: '更改查询',iconCls:'',itemId:'btn_change',disabled:true},
					  {text: '筛选', iconCls:'page_find',itemId:'btn_query'},
					  {text: '协同追催',iconCls:'',itemId:'menu_synergy', disabled:true,menu: new Ext.menu.Menu({
		   	  		    	itemId:'menu_synergyUrge',
		   	  		    	items:[
		   	  		    		{text:'追催发送',itemId:'btn_oop1'},
		   	  		    		{text:'追催接收',itemId:'btn_oop2'}
		   	  		    	]
		   	  		  })},
					  {text: '刷新',	iconCls:'arrow_refresh',itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH,handler:function(){
	   	  				    	me.store.loadPage(1);
	   	  		      }},
	   	  			  {text:'重置',iconCls:'refresh_backwards',handler:function(){
	   	  			  			delete me.store.proxy.extraParams.search;
	   	  				    	me.store.loadPage(1);
	   	  		      }},
	   	  		      {text: '颜色说明', iconCls:'',itemId:'btn_ColorDescription'},
	   	  		      {text: '确认交期导入模板',	iconCls:'page_excel',		itemId:'BTN_EXCEL_OUT_WG',handler:function(){
	   	  	  				window.open('ftp://'+tp_ftpUrl+'/temp/ConfirmTimeImp.xlsx', 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
	   	  	  		  }}
				]
		    }],
		    items:[{
	    			xtype:'treepanel',
	    			region:'west',
	    			reference:'materialCateTree',
	    			itemId:'MaterialCategoryTree',
	    			collapsible:true,
	    			header:false,
	    			collapseMode:"mini",
	    			width:200,
	    			split:true,
	    			store:Ext.create('erp.view.master.purchaseDetail.store.MaterialCateTree'),
	    			listeners:{
	    			  'itemclick':function(t,rec){
	    			  		if(rec.get('nodeId')!=0){
	    			  			me.store.proxy.extraParams.lbbh=rec.get('nodeId');
	    			  			me.store.loadPage(1);
	    			  		}else{
	    			  			delete me.store.proxy.extraParams.lbbh;
	    			  			me.store.loadPage(1);
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
	    	},{
		        region: 'center',
		        xtype:'grid',
		        reference:'PurchaseUrgeGrid',
		        itemId:'PurchaseUrgeGrid',
				columns:me.MainColumns,
				store:me.store,
				flex:4,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				dockedItems:[/*{
				    		xtype : 'pagingbar',
		                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
				    		dock:'bottom',
				    		displayInfo:true,
				    		defaultPageSize : 50,
				    		store:me.store
				    	},*/{
	                xtype: 'component',
	                itemId: 'status',
	                tpl: '记录总数: {count}'/*,
	                style: 'margin-right:5px'*/
	            }],
	            viewConfig: {
		            trackOver: false
		        },
	            plugins: {ptype: 'bufferedrenderer'},
	            features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				}],
		    	listeners : {
					selectionchange : function(grid, recs) {
						if (recs.length > 0) {
							me.setMainBtnStatus(false);
							me.loadDetail(recs[0]);
						} else {
							me.setMainBtnStatus(true);
							me.loadDetail(false);
						}
					}
				}
			},{
		        region: 'south',
		        xtype:'tabpanel',
		        reference:'tabpanel',
				split:true,
				flex:1,
				items:[{
					title:'追催记录',
					xtype:'grid',
					columns:me.dColumns,
					store:me.dStore
				},{
					title:'回复物控',
					xtype:'grid',
					columns:me.oColumns,
					store:me.oStore
				}]
		    }]
		});
		this.callParent();
	},
	//设置按钮状态
	setMainBtnStatus:function(sts){
		var me=this;
		var bar=me.down('#PurchaseUrgeBar');
		bar.down('#btn_suspend').setDisabled(sts);
		bar.down('#btn_cannel').setDisabled(sts);
		bar.down('#btn_AOG').setDisabled(sts);
		bar.down('#btn_op_menu').setDisabled(sts);
		bar.down('#BTN_HISTORY').setDisabled(sts);
		bar.down('#btn_change').setDisabled(sts);
		bar.down('#btn_oop_menu').setDisabled(sts);
		bar.down('#menu_synergy').setDisabled(sts);
	},
	loadDetail:function(rec){
		var me=this;
		if(rec){
			me.dStore.load({params:{htbh:rec.get('htbh'),htxh:rec.get('htxh')}})
			me.oStore.load({params:{htbh:rec.get('htbh'),htxh:rec.get('htxh')}})
		}else{
			me.dStore.load({params:{htbh:-1,htxh:-1}})
			me.oStore.load({params:{htbh:-1,htxh:-1}})
		}
	},
	btnHideForHb:function(sts){
		var me=this;
		if(sts){
			me.down('#btn_AOG').hide();
			me.down('#BTN_HISTORY').hide();
			me.down('#btn_op1').hide();
			me.down('#btn_op3').hide();
			me.down('#btn_op5').hide();
			me.down('#btn_op6').hide();
			me.down('#btn_oop1').hide();
		}else{
			me.down('#btn_AOG').show();
			me.down('#BTN_HISTORY').show();
			me.down('#btn_op1').show();
			me.down('#btn_op3').show();
			me.down('#btn_op5').show();
			me.down('#btn_op6').show();
			me.down('#btn_oop1').show();
		}
	}
})