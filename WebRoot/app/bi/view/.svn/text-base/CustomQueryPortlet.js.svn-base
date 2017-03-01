Ext.define('erp.bi.view.CustomQueryPortlet', {
	extend : 'erp.common.portal.view.Portlet',
	alias : 'widget.customQueryPortlet',
	title : '我的报表',
	iconCls : 'report',
	/*collapsible: true,
    animCollapse: true,*/
	requires : ['erp.report.engine.view.CustomUtil',
			'erp.report.engine.view.QueryStyle',
			'erp.report.engine.store.CustomQueryCdtion',
			'erp.report.engine.store.CustomReportResult',
			'erp.report.engine.store.CommonCustomQuery',
			'erp.report.engine.view.CustomReportQuery'],
	layout : 'fit',
	resizable : false,
	initComponent : function() {
		var me = this;
		var nameStore = Ext.create('erp.report.engine.store.CustomReportResult');
		var myuseStore = Ext.create('erp.report.engine.store.CommonCustomQuery', {
//					extraParams:{user_id : tp.Util.currentUser.userInfo.u_id,user_type : 'people'},
					pageSize : 20
				});
		Ext.apply(myuseStore.proxy.extraParams,	{user_id : erp.Util.currentUser.userInfo.u_id});
		me.modelHelpStore = Ext.create('erp.setup.store.Modules');
		me.modelHelpStore.load();	
		Ext.apply(this, {
			items : [{
				dockedItems : [{
							xtype : 'pagingtoolbar',
							dock : 'bottom',
							store : myuseStore,
							displayInfo : 'true'
						}],
				store : myuseStore,
				xtype : 'gridpanel',
				columnLines : true,
				columns : [{
							text : '序号',
							xtype : 'rownumberer',
							flex : 0.5,
							sortable : false,
							align : 'center'
						}, {
							text : '名称',
							flex : 2,
							dataIndex : 'l_name'
						},{
							text:'报表描述',
							flex:3,
							dataIndex:'l_desc'
						}],
				listeners : {
					afterrender : function() {
						Ext.Ajax.request({
							url : 'main/ModuleService.do?method=getModuleWithCtrllerAndView',
							params : {
								data : Ext.JSON.encode([{
									ctrller : 'erp.report.engine.controller.CustomReportQuery',
									view : '%CustomReportQuery%'
								}])
							},
							success : function(response) {
								var obj = Ext.decode(response.responseText);
								var recs = obj.data;
								if (recs) {
									for (var i = 0; i < recs.length; i++) {
										if (recs[i]['ctrller'] == 'erp.report.engine.controller.CustomReportQuery') {
											me.tar_mod = recs[i];
										}
									}
								}
								myuseStore.load();
							}
						});
					},
					itemclick : function(view, rec) {
						nameStore.load({
							scope : this,
							params : {
								// mylist : Ext.encode([{list_id :
								// rec.get('l_id')}])
								list_id : rec.get('l_id')
							},
							callback : function() {
								rec = nameStore.findRecord('list_id', rec.get('l_id'));
								if (rec) {
									switch(rec.get('report_type'))
									{
									case erp.Const.BIZ_TYPE_SINGLE:
										if (Ext.isEmpty(rec.get('tpl_type'))){
											erp.AnalysisFun.doquery(rec, null);
										}
										else{
											rec.set('tpl_type','04');
											erp.report.engine.view.QueryStyle.openReport(rec);	
										}
										break;
									case rec.get('report_type') == erp.Const.BIZ_TYPE_FRM:
										var param = rec.get('ope');
										var list_id = rec.get('list_id');
										var style = rec.get('default_style');
										var creater = rec.get('creater');
										param = Ext.JSON.decode(param);
										me.makeParamCdtion(list_id, param,
												style, creater);
										break;		
									case erp.Const.BIZ_TYPE_MUTLI:
										rec.set('tpl_type','04');
										erp.report.engine.view.QueryStyle.openReport(rec);
										break;
									case erp.Const.BIZ_TYPE_STATS:
										erp.Util.loadModule('02006',{srcRec:rec.getData()});
										break;
									default:
										Ext.Msg.alert('提示', '无对应操作');
									}
								} 
								else {
									Ext.Msg.alert('提示', '无对应操作');
								}
							}
						});
					}
				}
			}

			]
		});
		me.tools = [/*{
			type : 'gear',
			itemId : 'gear',
			tooltip : '报表订阅',
			handler : me.openGear
		}, */{
			type : 'refresh',
			handler : function() {
				myuseStore.load();
			}
		},{
			type : 'icon-remove-sign',
			handler : function() {
				me.close();
			}
		}];
		me.callParent(arguments);
	},
	openGear : function(){
		erp.Util.addContentTab({
				xtype:'CustomReportQuery',
				closable : true
			});
		/*var me = this;	
		console.log(me);
		console.log(me.up('panel'));
		console.log(me.up('panel').modelHelpStore);
    	var recs = me.up('panel').modelHelpStore.findRecord('mod_code','0204');
    	console.log(recs);
    	erp.Util.loadModuleMC(recs,'');*/
	},
	makeParamCdtion : function(listId, param, style, creater) {
		var me = this;
		var isOk = true;
		if (isOk) {
			erp.CustomUtil.getCodtions(listId, function(recs, myparam) {
						var p = myparam.p;
						var cdtions = erp.CustomUtil.makeCodtions(recs, p.data);
						p.cdtions = cdtions.cdtions;
						erp.report.engine.view.QueryStyle.createStyle("form/FormService.do?method=cusFromQuery", p, p.data, myparam.style, myparam.id);
					}, {
						p : param,
						id : listId,
						style : style
					});
		} else {
			Ext.Msg.alert('提示', '您没有权限!');
		}
	}
});