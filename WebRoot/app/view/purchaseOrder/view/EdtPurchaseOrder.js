Ext.define('erp.view.purchaseOrder.view.EdtPurchaseOrder',{
	extend:'erp.ux.Panel',
	alias:'widget.EdtPurchaseOrder',
	requires:[
		'erp.view.master.purchaseDetail.window.MateCombo',
		'erp.view.master.purchaseDetail.store.MainUnit',
		'erp.view.master.category.store.CategoryTree',
		'erp.view.master.purchaseDetail.store.AccountDeptTree',
		'erp.common.basic.view.TemplateHelp',
		'erp.view.master.purchaseDetail.store.StoreQuote',
		'erp.view.purchaseOrder.store.PurchaseOrderDetailBuffered',
		'erp.view.purchaseOrder.store.OutSourcePicking',
		'erp.view.purchaseOrder.PurchaseOrderModel',
		'erp.view.purchaseOrder.window.MaterialFactoryInfoHelp'
	],
	controller:'PurchaseOrderCtl',
	xtype: 'EdtPurchaseOrder',
	layout: {
        type: 'border'
    },
    viewModel: {
        type: 'purchaseOrderModel'
    },
	initComponent:function(){
		var me=this;
		me.isinit=me.isAdd;
		me.isSave=false;//如果是在保存是触发厂商更新则略过
		me.callSearch = {};
		me.MainUnitStore=Ext.create('erp.view.master.purchaseDetail.store.MainUnit');
		me.MainUnitStore.load();
		me.ProDescStore=Ext.create('erp.view.purchaseOrder.store.OrderDescribe');
		me.DetailStore=Ext.create('erp.view.purchaseOrder.store.PurchaseOrderDetail',{
			listeners:{
				'load':function(s,recs){
					if(recs.length>0){
						me.down('#ContractDetailGrid').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid1').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid2').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid3').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid4').getSelectionModel().select(recs[0]);
					}
				},
				beforeload:function(store){
					erp.Util.storeSync(store);
				}
			}
		});
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		me.DetailStore.proxy.extraParams.usePaging=true;
		me.DetailStore.proxy.extraParams.login_id=login_id;
		me.DetailStore.proxy.extraParams.ip=ip;
		me.DetailStore.proxy.api.read='purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailListForEdt';
		me.subsidiaryStore=Ext.create('erp.view.purchaseOrder.store.OrderSubsidiary',{
			listeners:{
				'load':function(s,recs){
					if(recs.length>0){
						me.down('#ContractSubsidiaryGrid').show();
					}else{
						me.down('#ContractSubsidiaryGrid').hide();
					}
				},
				beforeload:function(store){
					erp.Util.storeSync(store);
				}
			}
		});
		me.subsidiaryStore.proxy.extraParams.login_id=login_id;
		me.subsidiaryStore.proxy.extraParams.ip=ip;
		me.subsidiaryStore.proxy.api.read='purchaseorder/purchaseorderdetail.act?method=getOrderSubsidiaryForEdtList';
		me.FileStore=Ext.create('erp.view.purchaseOrder.store.PurchaseFile');
		me.BomStore=Ext.create('erp.view.purchaseOrder.store.PurBom',{
			proxy: {
				type: 'ajax',
				actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
				api: {
					create: 'purchaseorder/purchaseorderdetail.act?method=addPurBom',
					update: 'purchaseorder/purchaseorderdetail.act?method=updatePurBom',
					read: 'purchaseorder/purchaseorderdetail.act?method=getPurBomForEdtList',
					destroy: 'purchaseorder/purchaseorderdetail.act?method=deletePurBom'
				},
				reader: {
					type: 'json',
					rootProperty: 'data',
					totalProperty: 'total',
					messageProperty: 'message'
				},
				writer: {
					type: 'json',
					rootProperty: 'data',
					encode: true,
					allowSingle: false,
					writeAllFields:true
				}
			},
			listeners:{
				beforeload:function(store){
					erp.Util.storeSync(store);
				}
			}
		});
		me.BomStore.proxy.extraParams.login_id=login_id;
		me.BomStore.proxy.extraParams.ip=ip;
		me.LinkStore=Ext.create('erp.view.purchaseOrder.store.Component');
		me.outSourceStore=Ext.create('erp.view.purchaseOrder.store.OutSourcePicking',{
			listeners:{
				beforeload:function(store){
					erp.Util.storeSync(store);
				}
			}
		});
		me.outSourceStore.proxy.api.read='purchaseorder/outsourcepicking.act?method=getOutSourcePickingForEdtList';
		me.outSourceStore.proxy.extraParams.login_id=login_id;
		me.outSourceStore.proxy.extraParams.ip=ip;
		me.accountDeptStore=Ext.create('erp.view.master.purchaseDetail.store.AccountDeptTree');
		me.storeQuote=Ext.create('erp.view.master.purchaseDetail.store.StoreQuote');
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'EdtPurchaseBar',
	    	hidden:!me.isEdit,
	    	items:[
	    		  {text: '导入',iconCls:'page_go',itemId:'orderImp',menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_orderImp',
	   	  		    	items:[
	   	  		    		{text:'采计导入',itemId:'orderImp1'},
	   	  		    		//{text:'需求导入',itemId:'orderImp2'},
	   	  		    		{text:'订单导入',itemId:'orderImp3'},
	   	  		    		//{text:'零散审购',itemId:'orderImp4'},
	   	  		    		//{text:'BOM导入',itemId:'orderImp5'},
	   	  		    		{text:'计划导入',itemId:'orderImp6'}
	   	  		    	]
	   	  		   })},
	   	  		  {text: '产品描述导入',iconCls:'page_go',itemId:'descImp', disabled:true},
	   	  		  {text: '钢架BOM导入',iconCls:'page_go',itemId:'bomImp', disabled:true},
	   	  		  {text: '材料导入',iconCls:'page_go',itemId:'materialImp', disabled:true},
	   	  		  {text: '材料复制',iconCls:'page_go',itemId:'materialCopy', disabled:true},
	   	  		  {text: '材料粘贴',iconCls:'page_go',itemId:'materialPaste', disabled:true},
	   	  		  {text: '增加',	iconCls:'page_add',		itemId:'Add'},
	   	  		  {text: '辅助增加',	iconCls:'page_add',		itemId:'subAdd',hidden:true},
			   	  {text: '删除',	iconCls:'page_delete',		itemId:'Del'},
			   	  {text: '辅助删除',	iconCls:'page_delete',		itemId:'subDel', disabled:true,hidden:true},
			   	  {text: '模版导入/维护',	iconCls:'template',		itemId:'template'},
			   	  {text: '箱唛导入',iconCls:'page_go',itemId:'markImp',disabled:true, menu: new Ext.menu.Menu({
	   	  		    			itemId:'menu_MarkImp',
	   	  		    			items:[
	   	  		    				{text:'箱唛导入',itemId:'MarkImp1'},
			   	  		    		{text:'箱唛备注导入',itemId:'MarkImp2'}
	   	  		    			]}
	   	  		  )}
			]
	    },{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'EdtPurchaseBar2',
	    	hidden:!me.isEdit,
	    	items:[
			   	 {text: '单价信息同步',iconCls:'',itemId:'PriceSync', menu: new Ext.menu.Menu({
	   	  		    			itemId:'menu_PriceSync',
	   	  		    			items:[
	   	  		    				{text:'控制单价',itemId:'PriceSync1'},
			   	  		    		{text:'入库单价',itemId:'PriceSync2'},
			   	  		    		{text:'合同单价',itemId:'PriceSync3'},
			   	  		    		{text:'模具号',itemId:'PriceSync4'},
			   	  		    		{text:'采计数量',itemId:'PriceSync5'},
			   	  		    		{text:'定额工价刷新',itemId:'PriceSync6',hidden:true}
	   	  		    			]}
	   	  		 )},
	    		{text: '价格计算',iconCls:'',itemId:'PriceCal',hidden:true},
	   	  		{text: '汇总调整',	iconCls:'',		itemId:'Collect'},
				{text: '单价查询',	iconCls:'',		itemId:'priceSearch'},
				{text:'批量修改',iconCls:'page_edit',itemId:'BatchEdit',handler:function(){
			   	  		var myMask = new Ext.LoadMask({
							target : me
						});
						var dGrid=me.down('#ContractDetailGrid');
						var gjGrid=me.down('#BomGrid');
						var recs=dGrid.getSelectionModel().getSelection();
						var gj_recs=gjGrid.getSelectionModel().getSelection();
						if(recs.length==0){
							Ext.toastInfo('请选中某行或多行再使用此功能！');
	   	  		    		return ;
						}
						var rec=recs[0];
					    var cglx=me.down('#cglx').getValue();
					    var vmd=me.getViewModel(); 
					    var iswb=vmd.getData().iswb;
					    var tabpanel = me.down('#south');
					    var active_panel_title = tabpanel.activeTab.title;
					    if(active_panel_title=='钢架计价'&&gj_recs.length==0){
							Ext.toastInfo('请选中某行或多行再使用此功能！');
	   	  		    		return ;
						}
						var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
							width:400,
		    				height:400,
		    				title:'批量编辑',
		    				lay:'column',
		    				item:[{
			                    name      : 'kjlx_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'kjlx_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'kjlx',
			                    fieldLabel:'控价类型',
			                    name:'kjlx',
			   	  	  			store:[[0,'主控价'],[1,'辅控价']],
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'jhrq_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    hidden:cglx=='常规',
			                    itemId     : 'jhrq_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    hidden:cglx=='常规',
			                    itemId: 'jhrq',
			                    xtype:'datefield',
			   	  	  			format:'Y.m.d',
			                    fieldLabel:'交货日期',
			                    name:'jhrq',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	{
			                    name      : 'sdck_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'sdck_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'sdck',
			                    fieldLabel:'送达仓库',
			                    name:'sdck',
			                    xtype:'combo',
			   	  	  			typeAhead:true,
			   	  	  			store:me.storeQuote,
								queryMode : 'local',
								displayField:'ckmc',
								valueField:'ckbh',
								selectOnFocus:true,
			                    columnWidth: 0.8,
			                    listeners:{
			                    	focus:function(){
			                    		var win=this.up('window');
			                    		var hsbm=win.down('#hsbm').getValue();
			                    		if(rec.get('hsbm')==null||rec.get('hsbm')==''){
			                    			if(hsbm==null||hsbm==''){
										        Ext.Msg.alert('提示','请先选择核算部门');
										        return false;
										    }
									    }
									    if(hsbm!=''&&hsbm!=null){
									        me.storeQuote.load({params:{hsbm:hsbm}});
									    }else{
									        me.storeQuote.load({params:{hsbm:rec.get('hsbm')}});
									    }
									},
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'cgrq_c',
			                    hidden:cglx=='常规',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'cgrq_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    hidden:cglx=='常规',
			                    itemId: 'cgrq',
			                    xtype:'datefield',
			   	  	  			format:'Y.m.d',
			                    fieldLabel:'应采购日期',
			                    name:'cgrq',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'cgdj_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'cgdj_c',
			                    hidden:!iswb,
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'cgdj',
			                    xtype:'numberfield',
			   	  	  			decimalPrecision:4,
			   	  	  			hidden:!iswb,
			                    fieldLabel:'采购单价',
			                    name:'cgdj',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	{
			                    name      : 'wbdj_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    hidden:iswb,
			                    itemId     : 'wbdj_c',
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'wbdj',
			                    xtype:'numberfield',
			   	  	  			decimalPrecision:4,
			                    fieldLabel:'外币单价',
			                    name:'wbdj',
			                    hidden:iswb,
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'cgbz_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'cgbz_c',
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'cgbz',
			                    xtype:'textfield',
			   	  	  			decimalPrecision:4,
			                    fieldLabel:'备注说明',
			                    name:'cgbz',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'zzsl_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'zzsl_c',
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'zzsl',
			                    xtype:'numberfield',
			   	  	  			decimalPrecision:4,
			                    fieldLabel:'税率',
			                    name:'zzsl',
			                    columnWidth: 0.8,
			                    maxValue:1,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'hsbm_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'hsbm_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'hsbm',
			                    fieldLabel:'核算部门',
			                    xtype:'comboxTree',
			   	  	  			store:me.accountDeptStore,
			   	  	  			displayField : 'text',
						   		valueField: 'nodeId',
			                    columnWidth: 0.8,
			                    listeners:{
			                    	beforerender:function(c){
										var picker=c.getPicker();
										picker.expandAll();//展开所有，加载所有
						   			},
			                    	select:function(o,  newValue,  oldValue,  eOpts){
			                    		if(this.previousSibling()){
											this.previousSibling().setValue(true);
			                    		}	
			                    	},
									change :function(o,  newValue,  oldValue,  eOpts){
										this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	{
			                    name      : 'csbh_c',
			                    xtype 	  :'checkbox',
			                    hidden:active_panel_title!='钢架计价',
			                    inputValue: '1',
			                    itemId     : 'csbh_c',
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'csbh',
			                    xtype:'helpField',
								code : erp.DataConst.FACTORYINFO,
								fieldConfig:{forceSelection:true},
			                    hidden:active_panel_title!='钢架计价',
			                    fieldLabel:'材料厂商',
			                    name:'csbh',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){										
										this.up('window').down('#csbh_c').setValue(true);
				                   	}			                    	
								}
		                	},
		                	{
			                    name      : 'xdrq_c',
			                    hidden:active_panel_title!='钢架计价',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'xdrq_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    hidden:active_panel_title!='钢架计价',
			                    itemId: 'xdrq',
			                    xtype:'datefield',
			   	  	  			format:'Y.m.d',
			                    fieldLabel:'下单日期',
			                    name:'xdrq',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	}
		                	]
						});
						win.down('#BTN_YES').on({
							click:function(btn){
								var csbh=me.down('#csbh').getValue();
								var win=btn.up('window');
								var kjlx_c=win.down('#kjlx_c').getValue();
								var jhrq_c=win.down('#jhrq_c').getValue();
								var sdck_c=win.down('#sdck_c').getValue();
								var cgrq_c=win.down('#cgrq_c').getValue();
								var cgdj_c=win.down('#cgdj_c').getValue();
								var cgbz_c=win.down('#cgbz_c').getValue();
								var zzsl_c=win.down('#zzsl_c').getValue();
								var wbdj_c=win.down('#wbdj_c').getValue();
								if(active_panel_title=='钢架计价'){
									var csbh_c = win.down('#csbh_c').getValue();
									var xdrq_c = win.down('#xdrq_c').getValue();
									var grid=me.down('#MaterialGrid3');
					        		var mrec=grid.getSelectionModel().getSelection()[0];
									if(csbh_c){
										var csbh = win.down('#csbh').getValue();
										/*var csmc = win.down('#csbh').getRawValue();*/
										
										Ext.each(gj_recs,function(rec){											
											rec.set('csbh',csbh);
											/*rec.set('csmc',csmc);*/
											
									   		//刷新材料价格
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCljeAndWithOut',
											{
												recstr : Ext.encode(rec.data)
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('clje',cd.clje);
												rec.set('gjdj',cd.gjdj);
											}
											var ls_ewje=rec.get('ewje');
											var ls_gjdj=rec.get('gjdj');
											var ls_gjdj_new =me.round((ls_gjdj+ls_ewje/1000),4);
											rec.set('gjdj_new',ls_gjdj_new);
											me.djjs(mrec);
										});
									}
									if(xdrq_c){
										var xdrq = win.down('#xdrq').getValue();
										Ext.each(gj_recs,function(rec){											
											rec.set('xdrq',xdrq);
											//刷新材料价格
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCljeAndWithOut',
											{
												recstr : Ext.encode(rec.data)
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('clje',cd.clje);
												rec.set('gjdj',cd.gjdj);
											}
											var ls_ewje=rec.get('ewje');
											var ls_gjdj=rec.get('gjdj');
											var ls_gjdj_new =me.round((ls_gjdj+ls_ewje/1000),4);
											rec.set('gjdj_new',ls_gjdj_new);
											me.djjs(mrec);
										});
									}
								}
								
								
								var login_id=erp.Util.currentUser.loginId;
    							var ip=erp.Util.currentUser.IP;
    							var s_htbh=me.down('#htbh').getValue();
    							var hsbm_c=win.down('#hsbm_c').getValue();
								//如果全选刷新所有数据
								if(me.DetailStore.getCount()==recs.length){
									var sql="	update htmxb_tmp set htxh =htxh ";
						    		if(zzsl_c){
						    			sql+=" ,zzsl ='"+win.down('#zzsl').getValue()+"'";
									}
									if(hsbm_c){
										sql+=" ,hsbm ='"+win.down('#hsbm').getValue()+"'";
									}
									if(cgbz_c){
										sql+=" ,bzsm ='"+win.down('#cgbz').getValue()+"'";
									}
									if(cgdj_c){
						        		sql+=" ,cgdj ='"+win.down('#cgdj').getValue()+"'";
									}
									if(wbdj_c){
										var wbdj=win.down('#wbdj').getValue();
										sql+=" ,wbdj ="+wbdj;
										sql+=" ,cgdj = case when cgsl>0 then "
										sql+="	case when kjlx =0 then "
										sql+="	round(round(round(cgsl*"+wbdj+",2)*wbhl,2)/cgsl,4) "
										sql+="		else case when fzsl >0 then "
										sql+="	round(round(round(cgsl*"+wbdj+",2)*wbhl,2)/fzsl,4) "
										sql+="		else cgdj end end "
										sql+="	else cgdj end "
									}
									if(kjlx_c){
										var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getKjlxWithOutAll',
										{
											htbh :"'"+s_htbh+"'",
											ip:ip,
											login_id:login_id,
											csbh : csbh,
											kjlx:win.down('#kjlx').getValue()
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
									}
									if(jhrq_c){
										var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getGhzqWithOutAll',{
											htbh :"'"+s_htbh+"'",
											ip:ip,
											login_id:login_id,
											csbh : csbh,
											jhrq:Ext.util.Format.date(win.down('#jhrq').getValue(),'Y-m-d H:i:s')
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
									}
									if(sdck_c){
										sql+=" ,sdck ="+win.down('#sdck').getValue();
									}
									if(cgrq_c){
										var cgrq=win.down('#cgrq').getValue();
										var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCgrqWithOutAll',
										{
											htbh :"'"+s_htbh+"'",
											ip:ip,
											login_id:login_id,
											csbh : csbh,
											cgrq:Ext.util.Format.date(win.down('#cgrq').getValue(),'Y-m-d H:i:s')
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
									}
									sql+=" where htbh='"+me.down('#htbh').getValue()+"'";
						    		sql+=" and ip ='"+ip+"' and login_id='"+login_id+"'";
									var result = erp.Const.callServiceMethodSync(
										'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
										sql:sql
									});
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return;
									}
									dGrid.getStore().load();
								}else{
									Ext.each(recs,function(r){
										if(zzsl_c){
											r.set('zzsl',win.down('#zzsl').getValue());
										}
										if(cgbz_c){
											r.set('bzsm',win.down('#cgbz').getValue());
										}
										if(hsbm_c){
											r.set('hsbm',win.down('#hsbm').getValue());
										}
										if(kjlx_c){
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getKjlxWithOut',
											{
												recstr : Ext.encode(r.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												r.set('kzdj',cd.kzdj);
												r.set('wbbh',cd.wbbh);
												r.set('wbhl',cd.wbhl);
												r.set('cgdj',cd.cgdj);
												r.set('wbje',cd.wbje);
												r.set('wbdj',cd.wbdj);
												r.set('cgje',cd.cgje);
											}
											r.set('kjlx',win.down('#kjlx').getValue());
										}
										if(cgdj_c){
											r.set('cgdj',win.down('#cgdj').getValue());
											var s_kjlx=r.get('kjlx'),
						        			s_cgsl=r.get('cgsl'),
						        			s_fzsl=r.get('fzsl'),
						        			s_cgdj=r.get('cgdj');
						        			var s_cgje=0;
						        			if(s_kjlx!=1){
						        				s_cgje=me.round(s_cgsl*s_cgdj,2);
						        			}else{
						        				s_cgje=me.round(s_fzsl*s_cgdj,2);
						        			}
						        			r.set('cgje',s_cgje);
										}
										if(wbdj_c){
											var s_kjlx=r.get('kjlx'),
					        				s_cgsl=r.get('cgsl'),
					        				s_fzsl=r.get('fzsl'),
					        				s_wbhl=r.get('wbhl'),
					        				s_wbje=r.get('wbje'),
					        				s_wbdj=win.down('#wbdj').getValue();
					        				if(s_kjlx!=1){
					        					s_wbje=me.round(s_cgsl*s_wbdj,2);
					        				}else{
					        					s_wbje=me.round(s_fzsl*s_wbdj,2);
					        				}
					        				s_cgje=me.round(s_wbje*s_wbhl,2);
					        				if(s_cgsl!=0){
					        					if(s_kjlx!=1){
					        						s_cgdj=me.round(s_cgje/s_cgsl,4);
					        					}else{
					        						s_cgdj=me.round(s_cgje/s_fzsl,4);
					        					}
					        				}
					        				r.set('wbdj',win.down('#wbdj').getValue());
					        				r.set('cgdj',s_cgdj);
					        				r.set('cgje',s_cgje);
					        				r.set('wbje',s_wbje);
										}
										
										if(jhrq_c){
											r.set('jhrq',win.down('#jhrq').getValue());
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getGhzqWithOut',
												{
													recstr : Ext.encode(r.data),
													csbh : csbh
												});
												var data = Ext.decode(result);
												if (!data.bool) {
													Ext.toastErrorInfo(data.msg);
													return;
												}
												var cd=data.cd;
												if(cd!=null){
													r.set('cgje',cd.cgje);
													r.set('cgdj',cd.cgdj);
													r.set('wbhl',cd.wbhl);
													r.set('cgrq',cd.cgrq);
												}
										}
										if(sdck_c){
											var sdck=win.down('#sdck').getValue();
											var srec=me.storeQuote.findRecord('ckbh',sdck);
											r.set('sdck',sdck);
						        			if(srec!=null){
						        				r.set('sdckmc',srec.get('ckmc'));
						        			}
										}
										if(cgrq_c){
											var cgrq=win.down('#cgrq').getValue();
											r.set('cgrq',cgrq);
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCgrqWithOut',
												{
													recstr : Ext.encode(r.data),
													csbh : csbh
												});
												var data = Ext.decode(result);
												if (!data.bool) {
													Ext.toastErrorInfo(data.msg);
													return;
												}
												var cd=data.cd;
												if(cd!=null){
													r.set('cgje',cd.cgje);
													r.set('cgdj',cd.cgdj);
													r.set('wbhl',cd.wbhl);
												}
										}
									})
//									dGrid.getStore().load();//批量修改之后实时保存数据
								}
								win.close();
							}
						})
						win.show();
				  }},
				{text: '保存',iconCls:'page_save',itemId:'BTN_SAVE',disabled:!me.isEdit}
	    	]
	    }],
	    Ext.apply(me,{
	    	items:[{
		        region: 'center',
		        xtype:'form',
		        reference:'PurchaseContractForm',
		        itemId:'PurchaseContractForm',
				store:me.store,
				flex:170,
				//collapsible:true,
				layout:'fit',
				items:[{
					xtype:'fieldset',
					autoScroll:true,
					margin:'5 5 5 5',
					layout:'column',
			    	defaults: {
						xtype: 'textfield',
						readOnly:!me.isEdit,
						margin:'5 5 5 5',
						labelWidth:65,
						columnWidth: .12
					},
					items:[{
			  			fieldLabel:'合同编号',
			  			itemId:'htbh',
					   	name : 'htbh',
					   	readOnly:true
			  		},{
			  			itemId:'http',
					   	name : 'http',
					   	xtype:'textfield',
					   	hidden:true
			  		},{
			  			fieldLabel:'合同类型',
			  			itemId:'cglx',
					   	name : 'cglx',
					   	forceSelection:true,
					   	allowBlank:false,
					   	xtype:'combo',
					   	store:[['常规','常规'],['双经销','双经销'],['外协','外协'],['特殊','特殊'],[1,'空']]
			  		},{
			  			fieldLabel:'合同规则',
			  			itemId:'htgz',
					   	name : 'htgz',
					   	xtype:'combo',
					   	forceSelection:true,
					   	allowBlank:false,
					   	store:[['常规','常规'],['最低采购量','最低采购量']]
			  		},{
			  			fieldLabel:'取整规则',
			  			itemId:'qzgz',
			  			name:'qzgz',
					   	xtype:'combo',
					   	allowBlank:false,
					   	forceSelection:true,
					   	store:[['常规','常规'],['十位取整','十位取整']]
			  		},
			  		{
			  			fieldLabel:'采购类别',
			  			itemId:'cglb',
			  			name:'cglb',
			  			xtype:'comboxTree',
			  			allowBlank:false,
						forceSelection:false,
						columnWidth: .25,
						store : me.cateTreeStore,
						displayField : 'text',
						valueField: 'nodeId',
						listeners:{
							beforerender:function(c){
								var picker=c.getPicker();
								picker.expandAll();//展开所有，加载所有
							},
						   	'select':function(obj,rec){
						   		if(rec!=null){
						   			var lbbh = rec.get('nodeId');
    		                        if(!rec.get('leaf')){
    			                       Ext.Msg.alert('提示','该采购类别不是末级类别，请选择末级列别!');
    			                       me.down('#cglb').setValue("");
    			                       return;
    	                            }
						   		}
						   	}
						}
			  		},{
						name : 'cglx_fk',
						itemId:'cglx_fk',
						fieldLabel:'采购类型',
						xtype:'combo',
						store:[[0,'正常采购'],[1,'零星采购']],
						fieldConfig:{forceSelection:false},
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
			  		},{
						name : 'cgym',
						itemId:'cgym',
						fieldLabel:'采购员名',
						columnWidth: .15,
						allowBlank:false,
						xtype:'helpField',
						code : erp.DataConst.PurGroupMan,
						fieldConfig:{forceSelection:false},
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
			  		},
			  		
			  		{
						name : 'ztdw',
						itemId:'ztdw',
						fieldLabel:'主体单位',
						columnWidth: .3,
						typeAhead:true,
						xtype:'combo',
						queryMode : 'local',
						allowBlank:false,
						displayField:'ztmc',
						valueField:'ztbh',
						selectOnFocus:true,
						store:me.MainUnitStore,
						fieldConfig:{forceSelection:true},
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
			  		},{
			  			fieldLabel:'供货厂商',
			  			itemId:'csbh',
			  			name:'csbh',
			  			xtype:'helpField',
			  			allowBlank:false,
						code : erp.DataConst.FACTORYINFO,
						fieldConfig:{forceSelection:true},
						columnWidth: .4,
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(o.displayTplData!=null){
									var data=o.displayTplData;
									if(data.length>0){
										var rec=data[0];
										var vmd=me.getViewModel(); 
										if(rec.wbdh!=null&rec.wbdh!=''){
											vmd.setData({iswb:false});
										}else{
											vmd.setData({iswb:true});
										}
										if(me.isinit){
											me.loadCglbStore(rec.cglb);
											if(rec.cglb!=null&&rec.cglb!=''){
												me.down('#cglb').setValue(rec.cglb);
											}
											me.down('#cslxr').setValue(rec.lxrm);
											me.down('#ztdw').setValue(rec.ztdw);
										}
									}
								}
								console.log(newValue);
								if(newValue!=null&&newValue!=''&&me.isinit&&!me.isSave){
									me.csbhChange(newValue);
								}
								me.isinit=true;
		                    }
						}
			  		},{
						name : 'cslxr',
						itemId:'cslxr',
						fieldLabel:'厂商联系人',
						labelWidth:70,
						columnWidth: .3,
						xtype:'textfield'
			  		},
			  		
			  		{
						name : 'cgbz',
						itemId:'cgbz',
						fieldLabel:'备注说明',
						columnWidth: .4,
						xtype:'textfield'
			  		},{
	           			fieldLabel:"专利费",
	           			itemId:'zlbj',
	           			labelWidth:60,
						name:'zlbj',
						xtype:'checkbox',
						inputValue:'1',
						columnWidth:.08,
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(newValue){
									me.down('#zlcsbh').setVisible(true);
								}else{
									me.down('#zlcsbh').setVisible(false);
									//取消币种和专利单价
									me.down('#zlwbmc').setValue('');
									me.down('#zlcsbh').setValue('');
									me.cancelZldj();
								}
		                    }
						}
	           		},
	           		{
	           			fieldLabel:"专利币种",
	           			itemId:'zlwbmc',
						name:'zlwbmc',
						readOnly:true,
						xtype:'textfield',
						columnWidth:.12
	           		},
	           		{
	           			fieldLabel:"专利厂商",
			  			itemId:'zlcsbh',
			  			name:'zlcsbh',
			  			xtype:'helpField',
			  			allowBlank:false,
						code : erp.DataConst.FACTORYINFO,
						fieldConfig:{forceSelection:true},
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(o.displayTplData!=null){
									var recs=o.displayTplData;
									if(recs[0]!=null){
										me.down('#zlwbmc').setValue(recs[0].wbmc);
									}
								}
		                    }
						},
						columnWidth:.4
	           		}]
				}]
			},{
				xtype:'tabpanel',
				region: 'south',
				split:true,
				itemId:'south',
				flex:680,
				listeners:{
					tabchange:function(tabPanel,newCard,oldCard){
						var title=newCard.title;
						//取消所有按钮状态
						var btns=me.down('#EdtPurchaseBar').items.items;
						Ext.each(btns,function(btn){
							btn.setDisabled(true);
						});
						switch(title){
							case '合同明细':
								me.down('#Add').setDisabled(false);
								me.down('#Del').setDisabled(false);
								me.down('#subAdd').setDisabled(false);
								me.down('#subDel').setDisabled(false);
								me.down('#PriceSync').setDisabled(false);
								me.down('#orderImp').setDisabled(false);
							break;
							case '领料明细':
								me.down('#Add').setDisabled(false);
								me.down('#Del').setDisabled(false);
								me.down('#materialImp').setDisabled(false);
								me.down('#materialCopy').setDisabled(false);
								me.down('#materialPaste').setDisabled(false);
							break;
							case '合同条款':
								me.down('#template').setDisabled(false);
							break;
							case '采购要求':
								me.down('#descImp').setDisabled(false);
								me.down('#template').setDisabled(false);
								me.down('#Add').setDisabled(false);
								me.down('#Del').setDisabled(false);
								me.down('#markImp').setDisabled(false);
							break;
							case '产品细节':
								me.down('#descImp').setDisabled(false);
							break;
							case '附件信息':
								me.down('#Add').setDisabled(false);
								me.down('#Del').setDisabled(false);
							break;
							case '钢架计价':
								me.down('#bomImp').setDisabled(false);
								me.down('#Del').setDisabled(false);
							break;
						}
					}
				},
			    items:[{
			    	title:'合同明细',
			    	xtype:'panel',
			    	layout: {
				        type: 'vbox',
				        align: 'stretch'
				    },
			    	items:[{
						xtype:'grid',
				    	reference:'ContractDetailGrid',
			        	itemId:'ContractDetailGrid',
				    	flex:2,
				    	selModel:Ext.create('Ext.selection.CheckboxModel'),
				    	viewConfig:{
					     	getRowClass:function(rec,rowIndex,store){
						     		if(rec.get('kzdj')<rec.get('cgdj')){
						     			return 'x-grid-record-red';
						     		}
						     	}
					    },
				    	plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		var vmd=me.getViewModel();
					        		switch(field){
					        			case 'cgdj':
					        			case 'cgje':
					        				var vmd=me.getViewModel(); 
					        				var iswb=vmd.getData().iswb;
					        				if(!iswb){
					        					return false;
					        				}
					        			break;
					        			case 'jhrq':
					        			case 'cgrq':
					        				var cglx=me.down('#cglx').getValue();
					        				if(cglx=='常规'){
					        					return false;
					        				}
					        			break;
					        			case 'fzsl':
					        				if(rec.get('fzzbj')==0){
					        					return false;
					        				}
					        			break;
					        			case 'sdck':
					        				if(rec.get('hsbm')==null||rec.get('hsbm')==''){
					        					Ext.Msg.alert('提示','请先选择核算部门');
					        					return false;
					        				}else{
					        					me.storeQuote.load({params:{hsbm:rec.get('hsbm')}});
					        				}
					        			break;
					        			case 'hsbm':
					        				
					        			break;
					        			case 'zldj':
					        				var zlbj=me.down('#zlbj').getValue();
					        				if(!zlbj){
					        					return false;
					        				}
					        			break;
					        			case 'cgdj':
					        			case 'cgje':
					        				if(!vmd.getData().iswb){
					        					return false;
					        				}
					        			break;
					        			case 'cgsl':
					        				if(rec.get('requestid')!=null){
					        					return false;
					        				}
					        			break;
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		var s_kjlx,s_clhh,s_cgsl,s_fzsl,s_cgdj,s_cgje,s_wbhl,s_wbje;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var csbh=me.down('#csbh').getValue();
					        		switch(field){
					        			case 'hsbm':
					        				var srec=me.accountDeptStore.findRecord('nodeId',con.value);
					        				if(srec!=null){
					        					rec.set('hsbmmc',srec.get('text'));
					        				}
					        			break;
					        			case 'sdck':
					        				var srec=me.storeQuote.findRecord('ckbh',con.value);
					        				if(srec!=null){
					        					rec.set('sdckmc',srec.get('ckmc'));
					        				}
					        			break;
					        			case 'clmc':
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getClmcWithOut',
											{
												recstr : Ext.encode(rec.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												//rec.set('clmc',cd.clmc);
												rec.set('clth',cd.clth);
												rec.set('wbbh',cd.wbbh);
												rec.set('wbhl',cd.wbhl);
												rec.set('cgdj',cd.cgdj);
												rec.set('cgje',cd.cgje);
												rec.set('wbdj',cd.wbdj);
												rec.set('wbje',cd.wbje);
												rec.set('cgrq',cd.cgrq);
												rec.set('fzsl',cd.fzsl);
												rec.set('cgsl',cd.cgsl);
												rec.set('ghzq',cd.ghzq);
												rec.set('txgz',cd.txgz);
												rec.set('zzhxs',cd.zzhxs);
												rec.set('fzzbj',cd.fzzbj);
												rec.set('fzdw',cd.fzdw);
												rec.set('fzzbj',cd.fzzbj);
												rec.set('zzhxs',cd.zzhxs);
												rec.set('clhh',cd.clhh);
												rec.set('clmc',cd.clmc);
												rec.set('jldw',cd.jldw);
												rec.set('fzdw',cd.fzdw);
											}
					        			break;
					        			case 'kjlx':
					        				if(con.originalValue==con.value){
					        					break;
					        				}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getKjlxWithOut',
											{
												recstr : Ext.encode(rec.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('kzdj',cd.kzdj);
												rec.set('wbbh',cd.wbbh);
												rec.set('wbhl',cd.wbhl);
												rec.set('cgdj',cd.cgdj);
												rec.set('wbje',cd.wbje);
												rec.set('wbdj',cd.wbdj);
												rec.set('cgje',cd.cgje);
											}
					        			break;
					        			case 'cgrq':
					        				if(con.originalValue==con.value){
					        					break;
					        				}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCgrqWithOut',
											{
												recstr : Ext.encode(rec.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgje',cd.cgje);
												rec.set('cgdj',cd.cgdj);
												rec.set('wbhl',cd.wbhl);
											}
					        			break;
					        			case 'jhrq':
					        			case 'ghzq':
					        				if(con.originalValue==con.value){
					        					break;
					        				}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getGhzqWithOut',
											{
												recstr : Ext.encode(rec.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgje',cd.cgje);
												rec.set('cgdj',cd.cgdj);
												rec.set('cgrq',cd.cgrq);
											}
					        			break;
					        			case 'cgsl':
					        				if(con.originalValue==con.value){
					        					break;
					        				}
						        			var dgyl=0;
						        			var rowCount=me.subsidiaryStore.getCount();
		   	  		    					if(rowCount>0){
		   	  		    						dgyl=me.subsidiaryStore.getAt(0).get('dgyl');
		   	  		    					}
		   	  		    					var recd=rec.copy();
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCgslWithOut',
											{
												recstr : Ext.encode(recd.data),
												csbh : csbh,
												dgyl : dgyl
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgdj',cd.cgdj);
												rec.set('dlgs',cd.dlgs);
												rec.set('cgje',cd.cgje);
												rec.set('wbje',cd.wbje);
												rec.set('ycgl',cd.ycgl);
												rec.set('fzsl',cd.fzsl);
											}
					        			break;
					        			case 'cgdj':
					        				s_kjlx=rec.get('kjlx');
					        				s_cgsl=rec.get('cgsl');
					        				s_fzsl=rec.get('fzsl');
					        				s_cgdj=rec.get('cgdj');
					        				var s_cgje=0;
					        				if(s_kjlx!=1){
					        					s_cgje=me.round(s_cgsl*s_cgdj,2);
					        				}else{
					        					s_cgje=me.round(s_fzsl*s_cgdj,2);
					        				}
					        				rec.set('cgje',s_cgje);
					        			break;
					        			case 'cgje':
					        				s_kjlx=rec.get('kjlx');
					        				s_cgsl=rec.get('cgsl');
					        				s_fzsl=rec.get('fzsl');
					        				s_cgje=rec.get('cgje');
					        				if(s_cgsl>0){
					        					if(s_kjlx!=1){
					        						s_cgdj=me.round(s_cgje/s_cgsl,4);
					        					}else{
					        						s_cgdj=me.round(s_cgje/s_fzsl,4);
					        					}
					        				}
					        				rec.set('cgdj',s_cgdj);
					        			break;
					        			case 'wbhl':
					        				s_kjlx=rec.get('kjlx');
					        				s_cgsl=rec.get('cgsl');
					        				s_fzsl=rec.get('fzsl');
					        				s_wbhl=rec.get('wbhl');
					        				s_wbje=rec.get('wbje');
					        				s_cgje=me.round(s_wbje/s_cgsl,4);
					        				if(s_cgsl!=0){
					        					if(s_kjlx!=1){
					        						s_cgdj=me.round(s_cgje/s_cgsl,4);
					        					}else{
					        						s_cgdj=me.round(s_cgje/s_fzsl,4);
					        					}
					        				}else{
					        					s_cgdj=0;
					        				}
					        				rec.set('cgdj',s_cgdj);
					        				rec.set('cgje',s_cgje);
					        			break;
					        			case 'wbdj':
					        				s_kjlx=rec.get('kjlx');
					        				s_cgsl=rec.get('cgsl');
					        				s_fzsl=rec.get('fzsl');
					        				s_wbhl=rec.get('wbhl');
					        				s_wbje=rec.get('wbje');
					        				s_wbdj=rec.get('wbdj');
					        				if(s_kjlx!=1){
					        					s_wbje=me.round(s_cgsl*s_wbdj,2);
					        				}else{
					        					s_wbje=me.round(s_fzsl*s_wbdj,2);
					        				}
					        				s_cgje=me.round(s_wbje*s_wbhl,2);
					        				if(s_cgsl!=0){
					        					if(s_kjlx!=1){
					        						s_cgdj=me.round(s_cgje/s_cgsl,4);
					        					}else{
					        						s_cgdj=me.round(s_cgje/s_fzsl,4);
					        					}
					        				}
					        				rec.set('cgdj',s_cgdj);
					        				rec.set('cgje',s_cgje);
					        				rec.set('wbje',s_wbje);
					        			break;
					        			case 'fzsl':
					        				var recd=rec.copy();
					        				var cltx1=rec.get('cltx1');
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getFzslWithOut',
											{
												recstr : Ext.encode(recd.data),
												csbh : csbh,
												dgyl : dgyl
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgdj',cd.cgdj);
												rec.set('dlgs',cd.dlgs);
												rec.set('cgje',cd.cgje);
												rec.set('wbje',cd.wbje);
												rec.set('ycgl',cd.ycgl);
												rec.set('fzsl',cd.fzsl);
												rec.set('cgsl',cd.cgsl);
											}
					        			break;
					        			case 'cltx1':
					        				var recd=rec.copy();
					        				var cltx1=rec.get('cltx1');
	   	  		    						var rowCount=me.subsidiaryStore.getCount();
		   	  		    					var dgyl=0;
		   	  		    					var jhsl=0;
		   	  		    					var gjsl=0;
		   	  		    					subRec=me.subsidiaryStore.getAt(0);
		   	  		    					if(rowCount>0){
		   	  		    						dgyl=subRec.get('dgyl');
		   	  		    						jhsl=subRec.get('jhsl');
		   	  		    						gjsl=subRec.get('gjsl');
		   	  		    					}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCltxWithOut',
											{
												recstr : Ext.encode(recd.data),
												csbh : csbh,
												dgyl : dgyl,
												jhsl : jhsl,
												gjsl : gjsl,
												rowCount:rowCount
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgdj',cd.cgdj);
												rec.set('dlgs',cd.dlgs);
												rec.set('cgje',cd.cgje);
												rec.set('wbje',cd.wbje);
												rec.set('ycgl',cd.ycgl);
												rec.set('fzsl',cd.fzsl);
												rec.set('cgsl',cd.cgsl);
											}
					        			break;
					        			case 'zldj':
					        			break;
					        			case 'dlgs':
					        				var recd=rec.copy();
					        				var cltx1=rec.get('cltx1');
	   	  		    						var rowCount=me.subsidiaryStore.getCount();
		   	  		    					var dgyl=0;
		   	  		    					var jhsl=0;
		   	  		    					subRec=me.subsidiaryStore.getAt(0);
		   	  		    					if(rowCount>0){
		   	  		    						dgyl=subRec.get('dgyl');
		   	  		    						jhsl=subRec.get('jhsl');
		   	  		    					}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getDlgsWithOut',
											{
												recstr : Ext.encode(recd.data),
												csbh : csbh,
												dgyl : dgyl,
												jhsl : jhsl,
												rowCount:rowCount
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('fzsl',cd.fzsl);
												rec.set('cgsl',cd.cgsl);
												rec.set('ycgl',cd.ycgl);
												rec.set('cgje',cd.cgje);
												rec.set('wbje',cd.wbje);
											}
					        			break;
					        		}
					        		//me.DetailStore.sync();
					        	}
					        },
					        clicksToEdit: 1
					    }),
					    features: [{
					       ftype: 'summary',
				           dock:'bottom'
					    }],
				    	columns:[
				    		{header:'首次',dataIndex: 'scbj',width:35,renderer:erp.Util.Staterenderer,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
							{header:'序号',dataIndex:'htxh',width:45,align:'center'},
							{header:'排序',dataIndex:'pxxh',width:45,align:'center',field:{
								xtype:'numberfield',
								decimalPrecision:0
							}},
				   	  	  	{header:'材料货号',dataIndex:'clhh',width:60,align:'center'},
			   	  	  		{header:'材料名称',dataIndex:'clmc',width:160,field:{
			   	  	  			xtype:'commonTrigger',
			   	  	  			name:'clmc',
								itemId:'clmc',
								selModel:'MULTI',
								cusConfig:{
									type:'ContractDetail',
									field:'clmc',
									indexNum:4,
									callback:function(v,rec,recs){
										me.clmcCallback(v,rec,recs);
									}
								},
								win:'erp.view.master.purchaseDetail.window.MateCombo',
								listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
										//console.log(o);
										//console.log(newValue);
				                    }
								}
			   	  	  		}},
			   	  	  		{header:'规格尺寸',dataIndex:'cltx1',width:120,align:'center',field:{
			   	  	  			xtype:'textfield'
			   	  	  		}},
			   	  	  		{header:'短料规格',dataIndex:'dgyl',width:60},
			   	  	  		{header:'备注说明',dataIndex:'bzsm',width:140,field:{
			   	  	  			xtype:'textfield'
			   	  	  		}},
			   	  	  		{header:'单位',dataIndex:'jldw',align:'center',width:60,field:{
			   	  	  			xtype:'textfield'
			   	  	  		}},
			   	  	  		{header:'采计数量',dataIndex:'cjsl',align:'right',width:80,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
			   	  	  		{header:'采购数量',dataIndex:'cgsl',align:'right',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:3
			   	  	  		},align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        },renderer:function(v,r){
					        	var rec=r.record;
					        	if(rec.get('cgsl')!=rec.get('ycgl')&&rec.get('ycgl')>0){
					               r.css='x-grid-record-red'; 
								}
								return v;
					        }},
			   	  	  		{header:'控制单价',dataIndex:'kzdj',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'采购单价',dataIndex:'cgdj',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:4
			   	  	  		},align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'税率',dataIndex:'zzsl',width:60,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2
			   	  	  		},align:'right',renderer : Ext.util.Format.percentRenderer},
			   	  	  		{header:'采购金额',dataIndex:'cgje',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:7
			   	  	  		},align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');
					        },renderer:Ext.util.Format.floatRendererOne},
					        {header:'币种',dataIndex:'wbdh',bind:{
						    	 hidden:'{iswb}'
						    }},
			   	  	  		{header:'汇率',dataIndex:'wbhl',align:'right',bind:{
						    	 hidden:'{iswb}'
						    }},
			   	  	  		{header:'外币单价',dataIndex:'wbdj',width:80,bind:{
						    	 hidden:'{iswb}'
						    },field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:4
			   	  	  		},align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'外币金额',dataIndex:'wbje',width:80,bind:{
						    	 hidden:'{iswb}'
						    },field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:7
			   	  	  		},align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');
					        },renderer:Ext.util.Format.floatRendererOne},
			   	  	  		{header:'短料根数',dataIndex:'dlgs',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:0
			   	  	  		},align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'专利单价',dataIndex:'zldj',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:4
			   	  	  		},align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'采计交期',dataIndex:'wkjq',align : 'center',width:100,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'评审交期',dataIndex:'psjq',align : 'center',width:100,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'交货日期',dataIndex:'jhrq',align : 'center',width:100,renderer : Ext.util.Format.dateRendererOne,field:{
			   	  	  			xtype:'datefield',
			   	  	  			format:'Y.m.d'
			   	  	  		}},
			   	  	  		{header:'生产单号',dataIndex:'htbz',width:120},
			   	  	  		{header:'产品名称',dataIndex:'cpmc',width:240},
			   	  	  		{header:'计划号',dataIndex:'jhh',width:60},
			   	  	  		{header:'采计号',dataIndex:'cgh',width:70},
			   	  	  		{header:'应采购日期',dataIndex:'cgrq',align:'center',width:100,renderer : Ext.util.Format.dateRendererOne,field:{
			   	  	  			xtype:'datefield',
			   	  	  			format:'Y.m.d'
			   	  	  		}},
			   	  	  		{header:'客户简称',dataIndex:'khjc',width:120},
			   	  	  		{header:'核算部门',dataIndex:'hsbm',width:180,renderer:function(v,r){
			   	  	  			return r.record.get('hsbmmc')
			   	  	  		},field:{
			   	  	  			xtype:'comboxTree',
			   	  	  			store:me.accountDeptStore,
			   	  	  			displayField : 'text',
						   		valueField: 'nodeId',
						   		listeners:{
						   			beforerender:function(c){
											var picker=c.getPicker();
											var rec=me.down('#ContractDetailGrid').getSelectionModel().getSelection()[0];
											var node=rec.get('hsbm');
											picker.expandAll();//展开所有，加载所有
						   			}
						   		}
			   	  	  		}},
			   	  	  		{header:'送达仓库',dataIndex:'sdck',width:90,renderer:function(v,r){
			   	  	  			return r.record.get('sdckmc')
			   	  	  		},field:{
			   	  	  			xtype:'combo',
			   	  	  			typeAhead:true,
			   	  	  			store:me.storeQuote,
								queryMode : 'local',
								displayField:'ckmc',
								valueField:'ckbh',
								selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'模具号',dataIndex:'mjh',width:60,field:{
			   	  	  		
			   	  	  		}},
			   	  	  		{header:'辅助单位',dataIndex:'fzdw',width:60},
			   	  	  		{header:'辅助数量',dataIndex:'fzsl',align:'right',width:80,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.##');;
					        },renderer:Ext.util.Format.floatRenderer,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:3
			   	  	  		}},
			   	  	  		{header:'控价类型',dataIndex:'kjlx',width:60,field:{
			   	  	  			xtype:'combo',
			   	  	  			store:[[0,'主控价'],[1,'辅控价']]
			   	  	  		},renderer:function(v){
			   	  	  			return v==0?'主控件':'辅控价'
			   	  	  		}},
			   	  	  		{header:'主转换系数',dataIndex:'zzhxs',width:70,renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'供货周期',dataIndex:'ghzq',width:80/*,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:0
			   	  	  		}*/,align:'right'},
			   	  	  		{header:'订单号',dataIndex:'ddh',width:60},
			   	  	  		{header:'需求号',dataIndex:'sqh',width:60},
			   	  	  		{header:'申购号',dataIndex:'sgh',width:60},
			   	  	  		{header:'主合同号',dataIndex:'zxhth',width:60},
			   	  	  		{header:'中止原因',dataIndex:'zzyx',width:60},
			   	  	  		{header:'原采购量',dataIndex:'ycgl',width:80,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
			   	  	  		{header:'原规格尺寸',dataIndex:'ysgg',width:140},
			   	  	  		{header:'拆分号',dataIndex:'cfh',width:60},
			   	  	  		{header:'英文描述',dataIndex:'ywms',width:180},
			   	  	  		{header:'PO.NO.:',dataIndex:'pono',width:100},
			   	  	  		{header:'FAC.NO.:',dataIndex:'fach',width:100},
			   	  	  		{header:'客户型号',dataIndex:'khxh',width:80},
			   	  	  		{header:'箱唛补充信息',dataIndex:'xmsjbc',width:80},
			   	  	  		{header:'OA申请ID',dataIndex:'requestid',width:80}
			   	  	  	],
				    	listeners : {
								selectionchange : function(grid, recs) {
									var rec=recs[0];
									if (recs.length > 0) {
										me.down('#Del').setDisabled(false);
										me.subsidiaryStore.load({params:{htbh:rec.get('htbh'),htxh:rec.get('htxh')}});
									} else {
										me.subsidiaryStore.load({params:{htbh:-1,htxh:-1}});
										me.down('#Del').setDisabled(true);
									}
								}
						},
						dockedItems : [{
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
									dock : 'bottom',
									displayInfo : true,
									defaultPageSize : 100,
									store : me.DetailStore
								}],
			   	  	  	store:me.DetailStore			    		
			    	},{
			    		xtype:'splitter'
			    	},{
				    	xtype:'grid',
				    	reference:'ContractSubsidiaryGrid',
			        	itemId:'ContractSubsidiaryGrid',
				    	flex:1,
				    	selModel:Ext.create('Ext.selection.CheckboxModel'),
				    	plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field,
					        		rec=con.record,
					        		mrec=me.down('#ContractDetailGrid').getSelectionModel().getSelection()[0],
					        		ls_clhh=mrec.get('clhh'),
					        		ls_cltx1=mrec.get('cltx1');
					        		var myMask = new Ext.LoadMask({
										target : me
									});
					        		myMask.mask('正在获取数据，请等待......');
					        		var sql  =" select fzzbj  from clbmb where clhh= '"+ls_clhh+"'";
									var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
									{sql : sql});
									myMask.unmask();
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return ;
									}
									var ls_fzzbj =data.val;
									if(ls_fzzbj==null){
										ls_fzzbj=0;
									}
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var dgyl=rec.get('dgyl');
					        		switch(field){
					        			case 'yxgg':
					        				var s_yxgg=rec.get('yxgg');
					        				if(me.round(s_yxgg/dgyl,0)!=1){
					        					if(ls_fzzbj!=6){
					        						rec.set('zhgg',me.round((0.005+dgyl)*me.round(s_yxgg/(0.005+dgyl),0),3));
					        					}else{
					        						rec.set('zhgg',me.round(0.05+dgyl*me.round(s_yxgg/(dgyl),0),3));
					        					}
					        				}else{
					        					rec.set('zhgg',dgyl);
					        				}
					        				var s_zhgg=rec.get('zhgg');
					        				if(dgyl>0 && Math.floor(s_zhgg/dgyl)>0){
					        					if(Math.floor(s_zhgg/(dgyl+0.005))>0){
					        						rec.set('zhsl',Math.ceil(rec.get('fdxs')*((rec.get('gjsl')*rec.get('jhsl'))/Math.floor(s_zhgg/(dgyl+0.005)))));
					        					}else{
					        						rec.set('zhsl',Math.ceil(rec.get('fdxs')*((rec.get('gjsl')*rec.get('jhsl'))/1)));
					        					}
					        				}
					        				var s_zhsl=rec.get('zhsl');
					        				rec.set('fzsl',me.round(s_zhsl*s_zhgg,3));
					        				myMask.mask('正在获取数据，请等待......');
							        		var sql  =" select case when zzhxs>0 then round(zhxs/zzhxs,6) else 0 end  from clbmb where clhh= '"+ls_clhh+"'";
											var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
											{sql : sql});
											myMask.unmask();
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return ;
											}
											var s_zhxs= data.val;
											if(s_zhxs==null){
												s_zhxs=0;
											}
											if(s_zhxs!=0){
												rec.set('cgsl',me.round(rec.get('fzsl')/s_zhxs,3));
											}
											//辅助数量变则短料变
											if (ls_fzzbj==5 || ls_fzzbj==6){
												var s_cgbh=mrec.get('cgbh');
												var s_cgxh=mrec.get('cgxh');
												if(s_cgbh==null){
													s_cgbh=0;
												}
												if(s_cgxh==null){
													s_cgxh=0;
												}
												myMask.mask('正在获取数据，请等待......');
								        		var sql  =" select dlgs  from cgjhmxb where cgbh= '"+s_cgbh+"' and cgxh= '"+s_cgxh+"'";
												var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
												{sql : sql});
												myMask.unmask();
												var data = Ext.decode(result);
												if (!data.bool) {
													Ext.toastErrorInfo(data.msg);
													return ;
												}
												var s_dlgs= data.val;
												if(s_dlgs==null){
													s_dlgs=0;
												}
												var ls_djyl=rec.get('dgyl');
												var s_fzsl=rec.get('fzsl');
												var cltx1=mrec.get('cltx1');
			   	  		    					var s_clgg=0;
			   	  		    					if(cltx1!=null){
		   	  		    							s_clgg=eval(cltx1.replaceAll("[A-Za-z]",""));//规格尺寸
						        				}
						        				if(s_clgg!=0 && ls_djyl!=0 && s_dlgs!=0 ){//排除未算出短料的采计部分
						        					mrec.set('dlgs',Math.floor(s_clgg/ls_djyl)*me.round((s_fzsl/s_clgg),0));
						        				}
											}
					        			break;
					        		}
					        		var s_cgsl_hz=0,s_fzsl_hz=0,s_zhgg_max=0;
					        		me.subsidiaryStore.each(function(r){
					        			s_cgsl_hz+=r.get('cgsl');
					        			s_fzsl_hz+=r.get('fzsl');
					        			var zhgg=r.get('zhgg');
					        			if(s_zhgg_max<zhgg){
					        				s_zhgg_max=r.get('zhgg');
					        			}
					        		})
					        		mrec.set('fzsl',s_fzsl_hz);
					        		mrec.set('cgsl',s_cgsl_hz);
					        		mrec.set('ycgl',s_cgsl_hz);
					        		mrec.set('cgje',me.round(s_cgsl_hz*mrec.get('cgdj'),2));
					        		if(mrec){
					        			var s_fzzbj=mrec.get('fzzbj');
					        			if(s_fzzbj==2  || s_fzzbj==5 || s_fzzbj==6){
					        				mrec.set('cltx1',Ext.String.trim(me.f_szzh(s_zhgg_max))+Ext.String.trim(rec.get('fzdw')));
					        			}
					        		}
					        	}
					        },
					        clicksToEdit: 1
					    }),
				    	columns:[
							{header:'构件名称/使用部位',dataIndex:'cggg',width:120,summaryType: 'count',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
				   	  	  	{header:'(1+放大系数)',dataIndex:'fdxs',width:140},
				   	  	  	{header:'单个用量',dataIndex:'dgyl',width:60,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'x 构件数量',dataIndex:'gjsl',width:160,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'= 构件用量',dataIndex:'gjyl',width:160,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'x 计划数量',dataIndex:'jhsl',width:160,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'= 生产需求',dataIndex:'scxq',width:160,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'计量单位',dataIndex:'fzdw_sc',width:90,align:'center'},
				   	  	  	{header:'预想规格',dataIndex:'yxgg',width:90,align:'right',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:6
			   	  	  		}},
				   	  	  	{header:'转换规格',dataIndex:'zhgg',width:90,align:'right'},
				   	  	  	{header:'转换数量',dataIndex:'zhsl',width:90,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'转化计量',dataIndex:'zhjl',width:90,align:'center'},
				   	  	  	{header:'辅助数量',dataIndex:'fzsl',width:90,align:'right'},
				   	  	  	{header:'辅助单位',dataIndex:'fzdw',width:90,align:'center'},
				   	  	  	{header:'采购数量',dataIndex:'cgsl',width:90,align:'right'},
				   	  	  	{header:'计量单位',dataIndex:'jldw',width:90,align:'center'}
			   	  	  	],
			   	  	  	store:me.subsidiaryStore,
			   	  	  	listeners : {
								selectionchange : function(grid, recs) {
									if (recs.length > 0) {
									} else {
									}
								}
			   	  	  	}
				    }]
			    },{
		    	title:'领料明细',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'outSouce',
		    	useArrows: true,
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid4',
					xtype:'grid',
					store:me.DetailStore,
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.outSourceStore.load({params:{htbh:recs[0].get('htbh')+'',htxh:recs[0].get('htxh')+''}});
							} else {
								me.outSourceStore.load({params:{htbh:-1,htxh:-1}});
							}
						}
					},
					dockedItems : [{
							xtype : 'pagingbar',
							stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
							dock : 'bottom',
							displayInfo : true,
							defaultPageSize : 100,
							store : me.DetailStore
					}],
					columns:[
	   	  	  			{header:'序号',dataIndex:'htxh',width:60,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:35},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'箱只数',dataIndex:'mxzs',width:60,renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
		    		itemId:'outSourcePicking',
		    		xtype:'grid',
		    		flex:1,
					autoScroll:true,
		    		split:true,
					region:'east',
					store:me.outSourceStore,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
				    plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var mgrid=me.down('#MaterialGrid4');
					        		var mrec=mgrid.getSelectionModel().getSelection()[0];
					        		var s_jgsl=mrec.get('cgsl')
					        		switch(field){
					        			case 'jgyl':
					        			case 'jsbl':
					        				var s_jgyl=rec.get('jgyl'),
					        				s_jsbl=rec.get('jsbl'),
					        				s_csdj=rec.get('csdj');
					        				rec.set('tzll',me.round(s_jgyl*s_jsbl,3));
					        				rec.set('csje',me.round(s_csdj*s_jgyl*s_jsbl,2));
					        				if(s_jgsl!=0){
					        					rec.set('dhyl',me.round(s_jgyl/s_jgsl,3));
					        				}else{
					        					rec.set('dhyl',0);
					        				}
					        			break;
					        			case 'tzll':
					        				var s_tzll=rec.get('tzll'),
					        				s_jgyl=rec.get('jgyl'),
					        				s_csdj=rec.get('csdj');
					        				if(s_jgyl!=0){
					        					rec.set('jsbl',me.round(s_csdj*s_tzll,2));
					        				}
					        				rec.set('csje',me.round(s_csdj*s_tzll,2));
					        			break;
					        			case 'csdj':
					        				var s_csdj=rec.get('csdj'),
					        				s_tzll=rec.get('tzll');
					        				
					        				rec.set('csje',me.round(s_csdj*s_tzll,2));
					        			break;
					        			case 'djyl':
					        				var s_djyl=rec.get('djyl'),
					        				s_jsbl=rec.get('jsbl'),
					        				s_csdj=rec.get('csdj');
					        				rec.set('jgyl',me.round(s_djyl*s_jgsl,3));
					        				rec.set('tzll',me.round(s_djyl*s_jgsl*s_jsbl,3));
					        				rec.set('csje',me.round(s_csdj*s_djyl*s_jgsl*s_jsbl,2));
					        			break;
					        		}
					        	}
					        },
					      	clicksToEdit: 1
					  }),
					columns:[
						{header:'序号',dataIndex:'tzxh',width:35},
						{header:'材料类别',dataIndex:'lbmc',width:120},
						{header:'材料货号',dataIndex:'clhh',width:60},
						{header:'材料名称',dataIndex:'clmc',width:180},
						{header:'规格尺寸',dataIndex:'cltx1',width:60,field:{}},
						{header:'单位',dataIndex:'jldw',width:45},
						{header:'单件用量',dataIndex:'djyl',width:60,field:{
							xtype:'numberfield',
							decimalPrecision:6
						}},
						{header:'加工用量',dataIndex:'jgyl',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer,field:{
							xtype:'numberfield',
							decimalPrecision:3
						}},
						{header:'×(1+损耗率)',dataIndex:'jsbl',width:80,field:{
							xtype:'numberfield',
							decimalPrecision:4
						}},
						{header:'=通知领料',dataIndex:'tzll',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer,field:{
							xtype:'numberfield',
							decimalPrecision:3
						}},
						{header:'出售单价',dataIndex:'csdj',width:60},
						{header:'出售金额',dataIndex:'csje',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'备注说明',dataIndex:'bzsm',width:160,field:{
						}}
					]
		    	}]
		    },{
			    	title:'材料描述',
		   	  	  	xtype:'panel',
		   	  	  	split:true,
		   	  	  	hidden:true,
		   	  	  	itemId:'MaterialDesc',
			    	layout:'border',
			    	items:[{
						itemId:'MaterialGrid',
						xtype:'grid',
						store:me.DetailStore,
						dockedItems : [{
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
									dock : 'bottom',
									displayInfo : true,
									defaultPageSize : 100,
									store : me.DetailStore
								}],
						listeners:{
							selectionchange : function(grid, recs) {
								if (recs.length > 0) {
									me.down('#Material_Clbz').setValue(recs[0].get('clbz'));
								} else {
									me.down('#Material_Clbz').setValue('');
								}
							}
						},
						region:'center',
						flex:1,
						features: [{
					        ftype: 'summary',
				        	dock:'bottom'
					    }],
						autoScroll:true,
						columns:[
		   	  	  			{header:'确认',dataIndex:'xjqrbj',width:35,renderer:erp.Util.Staterenderer,summaryType: 'count',
			   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
				                 return '合计';
				            }},
		   	  	  			{header:'序号',dataIndex:'htxh',width:45},
		   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
		   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
		   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
		   	  	  			{header:'单位',dataIndex:'jldw',width:35},
		   	  	  			{header:'采购数量',dataIndex:'cgsl',width:60,summaryType: 'sum',align:'right',
			   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
				                return value>0? Ext.util.Format.number(value,'0,000'):'';
				            },renderer:Ext.util.Format.floatRenderer}
			    		]
			    	},{
						region:'east',
						split:true,
						flex:1,
						itemId:'Material_Clbz',
						xtype:'textarea',
						readOnly:true,
						minwidth:450
					}]
			    },{
			    	title:'合同条款',
			    	xtype:'textarea',
			    	itemId:'httk',
			    	name:'httk'
			    },{
			    	title:'采购要求',
			    	xtype:'panel',
			    	layout: 'border',
			    	items:[{
			    		region: 'center',
			    		xtype:'textarea',
			    		itemId:'cgyq',
			    		name:'cgyq',
			    		flex:1
			    	},{
			    		region:'east',
			    		xtype:'image',
			    		flex:1,
			    		split: true,
			    		itemId:'httpPic',
			    		autoScroll:true,
			    		src:null,
						style:"position:absolute;left:0;top:0;width:100%;height:100%;"
			    	}]
			    },{
		    	title:'业务描述',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'Traffic',
		    	useArrows: true,
		    	layout:'border',
		    	items:[{
					itemId:'TrafficGrid',
					xtype:'grid',
					store:me.DetailStore,
					plugins: [{ptype: 'bufferedrenderer'}],
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.ProDescStore.load({params:{ddbh:recs[0].get('ddbh')+'',ddxh:recs[0].get('ddxh')+''}});
							} else {
								me.ProDescStore.load({params:{ddbh:-1,ddxh:-1}});
							}
						}
					},
					columns:[
	   	  	  			{header:'序号',dataIndex:'htxh',width:60,
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:40},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		   	  	  			var v=me.DetailSum.get('cgsl');
			                return v!=0? Ext.util.Format.number(v,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'箱只数',dataIndex:'mxzs',width:60,renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
		    		itemId:'Traffic_Desc',
		    		xtype:'grid',
		    		flex:1,
					autoScroll:true,
		    		split:true,
					region:'east',
					store:me.ProDescStore,
					columns:[
						{header:'确定',dataIndex:'qrbj',width:35,renderer:erp.Util.Staterenderer},
						{header:'顺序',dataIndex:'pxxh',width:35},
						{header:'描述项目',dataIndex:'xmmc',width:60},
						{header:'重要程度',dataIndex:'zycd',width:60,renderer:function(v){
							if(v==0){
							 return '普通';
							}else{
							 return '重要';
							}
						}},
						{header:'样品描述(业务)',dataIndex:'xmms',width:300,renderer: function(value, meta, record) {
                                 meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
                                          		'white-space: nowrap;white-space:normal;line-height:20px;';   
                                   return value;   
                        }},
						{header:'样品描述(研发)',dataIndex:'xmms_yf',width:300,renderer: function(value, meta, record) {
                                          meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';   
                                          return value;   
                        }
                    }]
		    	}]
		    },/*{
		    	title:'业务描述',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'businessDes',
		    	useArrows: true,
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid8',
					xtype:'grid',
					store:me.DetailStore,
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.outBusinessDesStore.load({params:{ddbh:recs[0].get('ddbh'),ddxh:recs[0].get('ddxh')}});
							} else {
								me.outBusinessDesStore.load({params:{ddbh:-1,ddxh:-1}});
							}
						}
					},
					dockedItems : [{
							xtype : 'pagingbar',
							stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
							dock : 'bottom',
							displayInfo : true,
							defaultPageSize : 100,
							store : me.DetailStore
					}],
					columns:[
	   	  	  			{header:'序号',dataIndex:'htxh',width:60,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
			            {header:'排序',dataIndex:'pxxh',width:60},
			            {header:'材料货号',dataIndex:'clhh',width:60},
			            {header:'材料货号',dataIndex:'plmth',width:60},
			            {header:'事物特性',dataIndex:'plmtx',width:60},
			            {header:'材料名称',dataIndex:'clmc',width:60},
			            {header:'材料特性1',dataIndex:'cltx1',width:60},
			            {header:'材料特性2',dataIndex:'cltx2',width:60},
			            {header:'材料特性3',dataIndex:'cltx3',width:60},
			            {header:'单位',dataIndex:'jldw',width:60},
			            {header:'采购数量',dataIndex:'cgsl',width:60},
			            {header:'箱只数',dataIndex:'mxzs',width:60},
			            {header:'计划号',dataIndex:'jhh',width:60},
			            {header:'拆分号',dataIndex:'cfh',width:60}
		    		]
		    	},{
		    		itemId:'outSourcePicking',
		    		xtype:'grid',
		    		flex:1,
					autoScroll:true,
		    		split:true,
					region:'east',
					store:me.outBusinessDesStore,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
				    plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var mgrid=me.down('#MaterialGrid4');
					        		var mrec=mgrid.getSelectionModel().getSelection()[0];
					        		var s_jgsl=mrec.get('cgsl')
					        		switch(field){
					        			case 'jgyl':
					        			case 'jsbl':
					        				var s_jgyl=rec.get('jgyl'),
					        				s_jsbl=rec.get('jsbl'),
					        				s_csdj=rec.get('csdj');
					        				rec.set('tzll',me.round(s_jgyl*s_jsbl,3));
					        				rec.set('csje',me.round(s_csdj*s_jgyl*s_jsbl,2));
					        				if(s_jgsl!=0){
					        					rec.set('dhyl',me.round(s_jgyl/s_jgsl,3));
					        				}else{
					        					rec.set('dhyl',0);
					        				}
					        			break;
					        			case 'tzll':
					        				var s_tzll=rec.get('tzll'),
					        				s_jgyl=rec.get('jgyl'),
					        				s_csdj=rec.get('csdj');
					        				if(s_jgyl!=0){
					        					rec.set('jsbl',me.round(s_csdj*s_tzll,2));
					        				}
					        				rec.set('csje',me.round(s_csdj*s_tzll,2));
					        			break;
					        			case 'csdj':
					        				var s_csdj=rec.get('csdj'),
					        				s_tzll=rec.get('tzll');
					        				
					        				rec.set('csje',me.round(s_csdj*s_tzll,2));
					        			break;
					        			case 'djyl':
					        				var s_djyl=rec.get('djyl'),
					        				s_jsbl=rec.get('jsbl'),
					        				s_csdj=rec.get('csdj');
					        				rec.set('jgyl',me.round(s_djyl*s_jgsl,3));
					        				rec.set('tzll',me.round(s_djyl*s_jgsl*s_jsbl,3));
					        				rec.set('csje',me.round(s_csdj*s_djyl*s_jgsl*s_jsbl,2));
					        			break;
					        		}
					        	}
					        },
					      	clicksToEdit: 1
					  }),
					columns:[
						{header:'确认',dataIndex:'qrbj',width:35,renderer:erp.Util.Staterenderer,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
						{header:'顺序',dataIndex:'pxxh',width:35},
						{header:'项目',dataIndex:'xmmc',width:120},
						{header:'重要程度',dataIndex:'zycd',width:60},
						{header:'产品描述（业务）',dataIndex:'xmms',width:180},
						{header:'产品描述（研发）',dataIndex:'xmms_yf',width:180}
					]
		    	}]
		    },*/{
		    	title:'产品细节',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'ProDesc',
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid1',
					xtype:'grid',
					store:me.DetailStore,
						dockedItems : [{
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
									dock : 'bottom',
									displayInfo : true,
									defaultPageSize : 100,
									store : me.DetailStore
								}],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.down('#Material_Cpxj').setValue(recs[0].get('cpxj'));
							} else {
								me.down('#Material_Cpxj').setValue('');
							}
						}
					},
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
					columns:[
	   	  	  			{header:'确认',dataIndex:'xjqrbj',width:35,renderer:erp.Util.Staterenderer,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'序号',dataIndex:'htxh',width:60},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:35},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
					region:'east',
					split:true,
					flex:1,
					itemId:'Material_Cpxj',
					xtype:'textarea',
//					readOnly:true,
					minwidth:450,
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								if(newValue!=null&&newValue!=''&&newValue!=oldValue){
									var rec = me.down('#MaterialGrid1').getSelectionModel().getSelection()[0];
									console.log(rec);
									rec.set('cpxj',newValue);
								}
		                    }
					}
				}]
		    },{
		    	title:'包装信息',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'PackDesc',
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid2',
					xtype:'grid',
					store:me.DetailStore,
						dockedItems : [{
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
									dock : 'bottom',
									displayInfo : true,
									defaultPageSize : 100,
									store : me.DetailStore
								}],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.down('#Pack_Bzxx').setValue(recs[0].get('bzxx'));
							} else {
								me.down('#Pack_Bzxx').setValue('');
							}
						}
					},
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			      	 	dock:'bottom'
				    }],
				    plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		switch(field){
					        			case 'mxzs':
					        				
					        			break;					        			
					        		}
					        	}
					        },
					      	clicksToEdit: 1
					  }),
					columns:[
	   	  	  			{header:'确认',dataIndex:'xjqrbj',width:35,renderer:erp.Util.Staterenderer,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'序号',dataIndex:'htxh',width:60},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:35},	   			
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'箱只数',dataIndex:'mxzs',width:160,field:{
							xtype:'numberfield',
							decimalPrecision:0
						}}
		    		]
		    	},{
					region:'east',
					split:true,
					flex:1,
					itemId:'Pack_Bzxx',
					xtype:'textarea',
//					readOnly:true,
					minwidth:450,
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								if(newValue!=null&&newValue!=''&&newValue!=oldValue){
									var rec = me.down('#MaterialGrid2').getSelectionModel().getSelection()[0];
									console.log(rec);
									rec.set('bzxx',newValue);
								}
		                    }
					}
				}]
		    },{
		    	title:'附件信息',
				layout:{type:'hbox',align:'stretch'},
				overflowY:'auto',
				overflowX:'hidden',
		    	items : [{
		    	flex:1,	
		    	xtype:'grid',
		    	border:false,
		    	store:me.FileStore,
		    	itemId:'PurFile',
				columns:[
					{header:'文件编号',dataIndex:'wjbh',width:60},
					{header:'文件名称',dataIndex:'wjmc',width:300},
					{header:'创建人名',dataIndex:'cjrm',width:60},
					{header:'创建日期',dataIndex:'scrq',width:120,renderer : Ext.util.Format.dateRendererOne},
					{header:'文件路径',dataIndex:'wjlj',width:330},
					{header:'附件类型',dataIndex:'fjlx',width:100,
					renderer : function(value){
					   if(value ==0){
					      return '采购方提交'
					   }else if(value ==1){
					      return '回签合同'
					   }
					 }
					},
					{header : '附件状态',width :100 ,dataIndex: 'fjzt',
	                renderer:function(value){
	                if(value == 0){
	                return '未提交';  
	                }else if(value == 1){
	                 return '已提交';
	                }else if(value == 2){
	                 return '已接受';
	                }
	                }},
					{header: '操作',xtype:'actioncolumn',width:150,
					   items : [
					   {iconCls:'download',tooltip:'下载',
					   handler: function(grid,rowIndex,colIndex){
					      var rec = grid.getStore().getAt(rowIndex);
					      if(Ext.isEmpty(rec.get('wjlj')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');
								return;
							}
						 file_path=rec.get('wjlj');
							window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
					   }}/*,{
					      tooltip:'预览',
							iconCls:'application_view_list',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								var file_path=rec.get('wjlj');
								if(!Ext.isEmpty(file_path)){
									var suffixIndex=rec.get('wjmc').lastIndexOf('.');
	                            	var suffixStr=rec.get('wjmc').substring(suffixIndex+1).toLowerCase();
	                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif'){
	                            		me.showPic(file_path,'PIC1');
	                            	}
	                            	else{
	                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
										return;
	                            	}
								}
								else{
									Ext.Msg.alert('提示','当前还没有上传文件');
									return;
								}
							}
					   }*/
					   ]
					}
				]}/*,{
				    xtype:'image',
				    width:600,
				    itemId:'PIC1',
				    border:true,
				    height:'100%',
				    src:'',
				    style:"position:absolute;left:0;top:0;"
				}*/]
		    },{
		    	title:'钢架计价',
		    	xtype:'panel',
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid3',
					xtype:'grid',
					store:me.DetailStore,
						dockedItems : [{
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
									dock : 'bottom',
									displayInfo : true,
									defaultPageSize : 100,
									store : me.DetailStore
								}],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.BomStore.load({params:{htbh:recs[0].get('htbh')+'',htxh:recs[0].get('htxh')+''}});
							} else {
								me.BomStore.load({params:{htbh:-1,htxh:-1}});
							}
						}
					},
					region:'west',
					flex:1,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
				    split:true,
				    selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[
	   	  	  			{header:'确认',dataIndex:'xjqrbj',width:35,renderer:erp.Util.Staterenderer,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'序号',dataIndex:'htxh',width:45},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:35},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
		    		itemId:'BomGrid',
		    		xtype:'grid',
		    		flex:1,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
					region:'center',
					store:me.BomStore,
					viewConfig:{
			     	getRowClass:function(rec,rowIndex,store){
				     		if(rec.get('mjbz')==0&&rec.get('bjbb')==''){
				     			return 'x-grid-record-blue';
				     		}
				     	}
				    },
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.LinkStore.load({
									params:{
										cpbh:recs[0].get('cpbh'),
										cptx1:recs[0].get('cptx1'),
										cptx2:recs[0].get('cptx2'),
										cptx3:recs[0].get('cptx3'),
										bbbh:recs[0].get('bbbh'),
										jgbh:recs[0].get('jgbh')
									},callback:function(recs){
										if(recs.length>0){
											me.down('#LinkGrid').show();
										}else{
											me.down('#LinkGrid').hide();
										}
									}
								});
							} else {
								me.LinkStore.load({
									params:{
										cpbh:-1,
										cptx1:-1,
										cptx2:-1,
										cptx3:-1,
										bbbh:-1,
										jgbh:-1
									}
								})
								me.down('#LinkGrid').hide();
							}
						}
					},
					plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record,
					        		jgbh=rec.get('jgbh');
					        		var grid=me.down('#MaterialGrid3');
					        		var mrec=grid.getSelectionModel().getSelection()[0];
					        		switch(field){
					        			case 'cllx':
					        			case 'wxsh':
					        				if(jgbh==''){
					        					return false;
					        				}
					        			break;
					        			case 'clje':
					        			case 'gjdj':
					        				if(jgbh!=''){
					        					return false;
					        				}
					        			break;
					        			case 'csbh':
										var t_clhh = rec.get('clhh');
										var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getMaterialGridLbbh',
										{clhh : t_clhh});
										var data = Ext.decode(result);
										if(data.csbh!=''&&data.csbh!='其他'){
											rec.set('csbh',data.csbh);
											rec.set('csmc',data.csmc);
											me.callSearch.t_clhh=t_clhh;
											me.callSearch.storeType = data.storeType;
										}else{
											if(data.csbh=='其他'){
												t_clhh='';
											}
											me.callSearch.t_clhh=t_clhh;
											me.callSearch.storeType = data.storeType;
										var win  = Ext.widget('MaterialfactoryInfo_help',{
					        		    	       callSearch : me.callSearch
					        		    	 });
					        		     win.down('#btn_confirm').on({
	                                                 click : function(btn){
	                                                   var win =  btn.up('window');
	                                                   var bool = false;
	                                                   var trec = win.down('#grd_MaterialFac').getSelectionModel().getSelection()[0];
	                                                   if(Ext.isEmpty(trec)){
	                                                   		Ext.Msg.alert('提示','请选择一条数据');
	                                                   		return;
	                                                   }
	                                                   rec.set('csbh',trec.get('csbh'));
													   rec.set('csmc',trec.get('csmc'));
	                                                   win.close();
	                                                   //刷新材料价格
	                                                   
								        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCljeAndWithOut',
														{
															recstr : Ext.encode(rec.data)
														});
														var data = Ext.decode(result);
														if (!data.bool) {
															Ext.toastErrorInfo(data.msg);
															return;
														}
														var cd=data.cd;
														if(cd!=null){
															rec.set('clje',cd.clje);
															rec.set('gjdj',cd.gjdj);
														}
														var ls_ewje=rec.get('ewje');
														var ls_gjdj=rec.get('gjdj');
														var ls_gjdj_new =me.round((ls_gjdj+ls_ewje/1000),4);
														rec.set('gjdj_new',ls_gjdj_new);
														me.djjs(mrec);
	                                                  }
						        		    	 })
						        		    	 win.show();
										 }
						        		break;
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var ls_kjlx=rec.get('kjlx'),
					        		ls_cgsl=rec.get('cgsl'), 
					        		ls_fzsl=rec.get('fzsl'),
					        		ls_wbhl=rec.get('wbhl'),
					        		grid=me.down('#MaterialGrid3'),
					        		mrec=grid.getSelectionModel().getSelection()[0],
					        		s_wbbh=mrec.get('wbbh'),
					        		ls_cgje=0,ls_wbdj=0,ls_wbje=0,
					        		ls_cgdj=me.round(me.LinkStore.sum('dgyl'),4),
					        		ls_clje=0;
					        		var myMask = new Ext.LoadMask({
										target : me
									});
					        		switch(field){
					        			case 'csbh':
					        			case 'xdrq':
					        				//刷新材料价格
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCljeAndWithOut',
											{
												recstr : Ext.encode(rec.data)
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('clje',cd.clje);
												rec.set('gjdj',cd.gjdj);
											}
											var ls_ewje=rec.get('ewje');
											var ls_gjdj=rec.get('gjdj');
											var ls_gjdj_new =me.round((ls_gjdj+ls_ewje/1000),4);
											rec.set('gjdj_new',ls_gjdj_new);
											me.djjs(mrec);
					        			break;
					        			case 'gjdj':
					        			case 'wxsh':
					        			case 'ewje':
					        				var ls_gjdj=rec.get('gjdj'),
											ls_wxsh=rec.get('wxsh'),
											ls_jgbh=rec.get('jgbh'),
											ls_djyl=rec.get('djyl');
											if(ls_djyl==0){
												ls_djyl=1;
											}
											if(ls_wxsh==0){
												ls_wxsh=1;
											}
											ls_ewje=rec.get('ewje');
											if(ls_jgbh==null){
												ls_jgbh='';
											}
											if (ls_jgbh!=''){
												var ls_gjdj_new =me.round((ls_gjdj+ls_ewje/1000),4);
												rec.set('gjdj_new',ls_gjdj_new);
												ls_clje=me.round(ls_djyl*ls_gjdj_new*ls_wxsh,4);
												rec.set('clje',ls_clje);
											}
											
											//f_djjs
											me.djjs(mrec);
					        			break;
					        		}
					        		if(field=='clje'){
					        			var ls_cgh=mrec.get('cgh'),
					        			ls_jhbh=mrec.get('jhbh'),
					        			ls_jhxh=mrec.get('jhxh'),
					        			s_gxgs=0;
					        			if(ls_cgh==null){
					        				ls_cgh='';
					        			}
					        			if(ls_jhbh==null||ls_jhbh==''){
					        				ls_jhbh=0;
					        			}
					        			if(ls_jhxh==null||ls_jhxh==''){
					        				ls_jhxh=0;
					        			}
					        			//外协加工费控制，有采计号的不控制，没有采计号的增加管控，计划定额中维护了定额工价的，外协加工费不允许超过定额工价
					        			if(ls_cgh==''){
					        				myMask.mask('正在更新，请等待......');
					        				var sql  =" select sum(gxgs)  from scbomgxdeb where jhbh="+ls_jhbh+" and jhxh="+ls_jhxh+" ";
											var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
											{sql : sql});
											myMask.unmask();
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return ;
											}
											if(data.val==null){
												s_gxgs=0;
											}else{
												s_gxgs=data.val;
											}
											ls_clje=rec.get('clje');
											if(ls_clje>s_gxgs){
												Ext.toastErrorInfo('外协加工费不允许超过计划定额工价，取值将调整为最大定额工价！');
												rec.set('clje')=s_gxgs;
											}
					        			}
					        		}
					        		//me.BomStore.sync();//编辑完成之后实时保存数据
					        	}
					       },
					       clicksToEdit: 1
					}),
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[
						{header:'序号',dataIndex:'jlxh',width:35,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
						{header:'材料类别',dataIndex:'lbmc',width:120},
						{header:'材料类型',dataIndex:'cllx',width:60,renderer:function(v){
							if(v==1){
								return "小五金类";
							}else if(v==2){
								return "管材类";
							}else{
								return "";
							}
						},field:{
							xtype:'combo',
							store:[[0,'空'],[1,'小五金类'],[2,'管材类']],
							forceSelection:true
						}},
						{header:'材料厂商',dataIndex:'csbh',width:160,field:{
							xtype:'textfield'/*,*/
							/*xtype:'helpField',
							code : erp.DataConst.FACTORYINFO,
							fieldConfig:{forceSelection:true},
							columnWidth: .4,*/
							/*listeners:{
								change :function(o,  newValue,  oldValue,  eOpts){
									if(o.displayTplData!=null){
										var data=o.displayTplData;
										if(data.length>0){
											var rec=data[0];
											var mrec=me.down('#BomGrid').getSelectionModel().getSelection()[0];
											mrec.set('csmc',rec.csmc);
										}
			                    }
							}
						}*/},renderer:function(v,r){return r.record.get('csmc')}},
						{header:'下单日期',dataIndex:'xdrq',width:80,renderer : Ext.util.Format.dateRendererOne,field:{
			   	  	  		xtype:'datefield',
			   	  	  		format:'Y.m.d'
			   	  	  	}},
						{header:'部件或材料名称',dataIndex:'clmc',width:240,renderer:function(v,r){
		   	  	  				var rec=r.record;
		   	  	  				var jgbh = rec.get('jgbh');
								if (jgbh.length == 0) {
									for (i = 0; i < 14; i++) {
										v = '&nbsp' + v;
									}
								} else {
									for (i = 0; i < jgbh.length; i++) {
										v = '&nbsp' + v;
									}
								}
		   	  	  				return v;
		   	  	  		}},
						{header:'规格尺寸',dataIndex:'cltx1',width:80},
						{header:'米重',dataIndex:'zzhxs',width:50,align:'right',renderer:Ext.util.Format.floatRenderer},
						{header:'版本',dataIndex:'bjbb',width:35},
						{header:'单位',dataIndex:'jldw',width:35},
						{header:'单件用量',dataIndex:'djyl',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
						{header:'单价',dataIndex:'gjdj',width:80,align:'right',renderer:Ext.util.Format.floatRenderer,hidden:true},
			            {header:'单价',dataIndex:'gjdj_new',width:60,align:'right',renderer:Ext.util.Format.floatRenderer/*,field:{
							xtype:'numberfield',
			   	  	  		decimalPrecision:6
						}*/},//2221 1.采购合同钢架计价界面 2.单价为不允许修改
						{header:'外协损耗',dataIndex:'wxsh',width:80,align:'right',renderer:Ext.util.Format.floatRenderer,field:{
							xtype:'numberfield',
			   	  	  		decimalPrecision:6
						}},
						{header:'额外金额',dataIndex:'ewje',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.00'):'';
			            },renderer:Ext.util.Format.floatRenderer,field:{
							xtype:'numberfield',
			   	  	  		decimalPrecision:6
						}},
						{header:'材料金额',dataIndex:'clje',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.00'):'';
			            },renderer:Ext.util.Format.floatRenderer,field:{
							xtype:'numberfield',
			   	  	  		decimalPrecision:6
						}},
			            {header:'备注说明',dataIndex:'bzsm',width:60,field:{
							xtype:'textfield'
						}},
			            {header:'操作员名',dataIndex:'czym',width:60},
						{header:'操作时间',dataIndex:'czsj',width:60,renderer : Ext.util.Format.dateRendererOne}
					]
		    	},{
		    		itemId:'LinkGrid',
		    		xtype:'grid',
		    		flex:1,
		    		split:true,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
					region:'south',
					weight:-70,
					store:me.LinkStore,
					columns:[
						{header:'序号',dataIndex:'gjxh',width:35,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
						{header:'构件名称/使用部位',dataIndex:'gjmc',width:180,align:'center'},
						{header:'预想规格',dataIndex:'yxgg',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
						{header:'单个用量',dataIndex:'dgyl',width:80,align:'right',renderer:Ext.util.Format.floatRenderer,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            }},
						{header:'构件数量',dataIndex:'gjsl',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'=构件用量',dataIndex:'gjyl',width:100,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'*材料周长',dataIndex:'clzc',width:100,align:'right',renderer:Ext.util.Format.floatRenderer},
						{header:'=喷塑面积',dataIndex:'psmj',width:80,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'主辅单位',dataIndex:'fzdw',width:60},
			            {header:'构件图号',dataIndex:'gjth',width:60},
			            {header:'备注说明',dataIndex:'bzsm',width:120}
					]
		    	}]
		    }]
			}],
			listeners:{
	    		afterrender:function(me){
	    			me.loadRecord(me.mrec);
					me.FileStore.load({params:{htbh:me.mrec.get('htbh')}});
	    		}
	    	}
	    })
		this.callParent();
	},
	loadRecord:function(rec){
		var me=this;
		if(me.isAdd){
			rec.set('cgym',rec.get('czym'));
			me.down('#csbh').setValue('1');
			me.down('#csbh').setValue('');
		}
		me.down('#PurchaseContractForm').loadRecord(rec);
		me.DetailStore.proxy.extraParams.htbh=rec.get('htbh');
   		me.DetailStore.load(/*{params:{htbh:rec.get('htbh')}}*/);
   		me.down('#httk').setValue(rec.get('httk'));
   		me.down('#cgyq').setValue(rec.get('cgyq'));
   		var http =rec.get('http');
   		if(http!=null&&Ext.String.trim(http)!=''){
   			me.down('#httpPic').setSrc('ftp://'+tp_ftpUrl+http);
   		}else{
   			me.down('#httpPic').setSrc(null);
   		}
   		if(rec.get('zlbj')==1){
			me.down('#zlcsbh').setVisible(true);
		}else{
			me.down('#zlcsbh').setVisible(false);
		}
	},
	// 编辑前，加载类别树，不然不显示文本内容，虽然value存在
	loadJhlbStore:function(node){
		var me=this;
		if(node!=null && node!="" && node!=0){//加载树
			var picker=me.down('#jhlb').getPicker();
			var path="";
			for(var i=0;i<node.length/2-1;i++){
				path+=node.substring(i*2,(i+1)*2);
			}
			picker.expandPath(path,{field:'nodeId',separator:'/',select:true,focus:true,
			callback:function(success,record,node){}});
			//picker.expandAll();//展开所有，加载所有
		}
	},
	loadCglbStore:function(node){
		var me=this;
		if(node!=null && node!="" && node!=0){//加载树
			var picker=me.down('#cglb').getPicker();
			var path="";
			for(var i=0;i<node.length/2-1;i++){
				if(i>0){
					path+="/";
				}
				path+=node.substring(i*2,(i+1)*2);
			}
			picker.expandPath(path,{field:'nodeId',separator:'/',select:true,focus:true,
			callback:function(success,record,node){}});
		}
	},
	round:function(v,l){
		return Ext.util.Format.round(v,l);
	},//厂商编号更新同步刷新所有明细信息
	clmcCallback : function(view,rec,recs) {
		var me = this;
		var grid = me.down('#ContractDetailGrid');
		var srec = grid.getSelectionModel().getSelection()[0];
		var store = grid.getStore();
		var form = me.down('#PurchaseContractForm');
		var csbh = form.down('#csbh').getValue();
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		var materialDetail = '[';
		if (recs != null && recs.length != 0) {
			var a = false;
			Ext.each(recs, function(r) {
						if (a) {
							materialDetail += ',';
						}
						materialDetail += Ext.encode(r.data);
						a = true;
					})
		} else {
			materialDetail += Ext.encode(rec.data);
		}
		materialDetail += ']';
		var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getMaterialDetailLoad',{
			csbh : csbh,
			materialDetail : materialDetail,
			contractDetail : Ext.encode(srec.data),
			login_id:login_id,ip:ip
		});
		var data = Ext.decode(result);
		if (data.bool == false) {
			Ext.Msg.alert('提示', data.msg)
			return;
		}
		store.load();
	},
	//控制外币相关字段是够显示
	showForeignCurrency:function(btn){
		
	},
	csbhChange:function(csbh){
		var me=this;
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		var htbh=me.down('#htbh').getValue();
		//判断记录是否需要同步
		var toCreate = me.DetailStore.getNewRecords(),
        toUpdate = me.DetailStore.getUpdatedRecords(),
        toDestroy = me.DetailStore.getRemovedRecords();
		me.DetailStore.sync({callback:function(batch,options){
			var myMask = new Ext.LoadMask({
			    msg    : '明细数据刷新中...',
			    target : me
			});
			myMask.mask('明细数据刷新中...');
			var result = erp.Const.callServiceMethodSync(
				'purchaseorder/purchaseorderdetail.act?method=getUpdatePurchaseOrderDetailFromCsbh', {
				htbh:htbh,csbh:csbh,
				login_id:login_id,ip:ip
			});
			myMask.unmask();
			me.DetailStore.load();
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
				return;
			}
		}});
		if (toCreate.length==0&&toUpdate==0&&toDestroy==0){
			var myMask = new Ext.LoadMask({
			    msg    : '明细数据刷新中...',
			    target : me
			});
			myMask.mask('明细数据刷新中...');
			var result = erp.Const.callServiceMethodSync(
				'purchaseorder/purchaseorderdetail.act?method=getUpdatePurchaseOrderDetailFromCsbh', {
				htbh:htbh,csbh:csbh,
				login_id:login_id,ip:ip
			});
			myMask.unmask();
			me.DetailStore.load();
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
				return;
			}
		}
	},
	//取消专利单价
	cancelZldj:function(){
		var me=this;
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		var htbh=me.down('#htbh').getValue();
		me.DetailStore.sync({callback:function(batch,options){
				//console.log(batch);
				//console.log(options);
		}});
		var myMask = new Ext.LoadMask({
			 msg    : '明细数据刷新中...',
			 target : me
		});
		myMask.mask('明细数据刷新中...');
		var sql  =" update dbo.htmxb_tmp set zldj = 0 where htbh='"+htbh+"' and login_id ='"+login_id+"' and ip ='"+ip+"' ";
		var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
		{sql : sql});
		myMask.unmask();
		me.DetailStore.load();
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
	},
	f_szzh:function(f_zhgg){
		var i=0,j;
		f_zhgg=f_zhgg.toString();
		if (f_zhgg.indexOf('.')>0){
			for (i=f_zhgg.lenght;i>-1;i--){
				j=f_zhgg.substring(i-1,i);
				if (j=='0') {
					f_zhgg=f_zhgg.replace(f_zhgg,'');
				}
				else if (j=='.'){
					f_zhgg=f_zhgg.replace(f_zhgg,'');
					return Ext.String.trim(f_zhgg);
				}
				else{
					return Ext.String.trim(f_zhgg);
				}
			}
		}
		return Ext.String.trim(f_zhgg)
	},
	djjs:function(rec){
		var me=this;
		//console.log(me);
		var bomStore=me.BomStore;
		var ls_cgdj=me.round(bomStore.sum('clje'),4);
		var ls_cgsl,ls_fzsl,ls_cgje,ls_wbje,ls_wbhl,ls_wbdj,ls_cgdj;
		var ls_kjlx=rec.get('kjlx'),
		ls_cgsl=rec.get('cgsl'),
		ls_fzsl=rec.get('fzsl'),
		ls_wbhl=rec.get('wbhl'),
		s_wbbh=rec.get('wbbh')
		if(s_wbbh==null){
			s_wbbh="";
		}else{
			s_wbbh=Ext.String.trim(s_wbbh);
		}
		if(ls_kjlx!=1){
			if(ls_cgsl!=0){
				if(s_wbbh!=''){
					ls_cgje=me.round(ls_cgsl*ls_cgdj,2);
					if(ls_wbhl!=0){
						ls_wbje=me.round(ls_cgje/ls_wbhl,2);
					}else{
						ls_wbje=0;
					}
					if(ls_cgsl!=0){
						ls_wbdj=me.round(ls_wbje/ls_cgsl,6);
					}else{
						ls_wbdj=0;
					}
				}else{
					ls_cgje=me.round(ls_cgsl*ls_cgdj,2);
					ls_wbje=0;
					ls_wbdj=0;
				}
			}
		}else{
			if(ls_fzsl!=0){
				if(s_wbbh!=''){
					ls_cgje=me.round(ls_fzsl*ls_cgdj,2);
					if(ls_wbhl!=0){
						ls_wbje=me.round(ls_cgje/ls_wbhl,2);
					}else{
						ls_wbje=0;
					}
					if(ls_fzsl!=0){
						ls_wbdj=me.round(ls_wbje/ls_cgsl,6);
					}else{
						ls_wbdj=0;
					}
				}else{
					ls_cgje=me.round(ls_fzsl*ls_cgdj,2);
					ls_wbje=0;
					ls_wbdj=0;
				}
			}else{
				if(s_wbbh!=''){
					ls_cgje=0;
					ls_wbje=0;
				}else{
					ls_cgje=0
				}
			}
		}
		rec.set('cgdj',ls_cgdj);
		rec.set('cgje',ls_cgje);
		rec.set('wbdj',ls_wbdj);
		rec.set('wbje',ls_wbje);
	}
	,//图片展示
   		showPic:function(file_path,id){
   				var me=this;
   				var panel=me.down('#'+id);
   				console.log(panel)
   				if(file_path!=null&&file_path!=''){
   					var file_path=encodeURIComponent(encodeURIComponent(file_path));
   					console.log(file_path);
   					var src='supplier/downloadAttched.do?file_path='+file_path+'&isimg=true';
   					console.log(src)
   					panel.setSrc(src);
   					console.log(panel)
   					//panel.setHeight(390);
   				}
   		}
})