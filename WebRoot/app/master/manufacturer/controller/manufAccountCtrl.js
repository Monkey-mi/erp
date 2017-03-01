Ext.define('erp.master.manufacturer.controller.manufAccountCtrl', {
	extend: 'Ext.app.Controller',
	requires: ['erp.ux.PagingBar', 
	           'Ext.window.MessageBox', 
	           'Ext.ux.TreePicker', 
	           'erp.master.manufacturer.model.Viewcsyf', 
	           'erp.master.manufacturer.store.Viewcsyf',
	           'erp.master.manufacturer.model.Sysxxb', 
	           'erp.master.manufacturer.store.Sysxxb', 
	           'erp.master.manufacturer.model.TimeQueryParam', 
	           'erp.master.manufacturer.model.QueryParams', 
	           'erp.master.manufacturer.store.BillDetail',
	           'erp.master.manufacturer.model.BillDetail', 
	           'erp.master.manufacturer.model.CreatePayPlanForm', 
	           'erp.master.manufacturer.store.CreatePayPlanForm', 
	           'erp.master.manufacturer.store.CreatePayPlanGrid', 
	           'erp.master.manufacturer.model.CreatePayPlanGrid', 
	           'erp.master.manufacturer.store.NoUpInStorage', 
	           'erp.master.manufacturer.store.NoUpPayment', 
	           'erp.master.manufacturer.model.NoUpInStorage', 
	           'erp.master.manufacturer.store.NoUpPayment', 
	           'erp.master.manufacturer.model.Csmc', 
	           'erp.master.manufacturer.store.Csmc', 
	           'erp.master.manufacturer.model.InvoiceDetail',
	           'erp.master.manufacturer.store.InvoiceDetail',
	           'erp.master.foreigncurrency.store.foreignCurrency', 
	           'erp.master.foreigncurrency.model.foreignCurrency', 
	           'erp.master.manufacturer.model.WDQueryParams'],
	views: ['erp.master.manufacturer.view.ManufAccountDetial', 
	        'erp.ux.ComboxTree', 
	        'erp.master.manufacturer.view.StartStopTime', 
	        'erp.master.manufacturer.view.ManufAccountSearch', 
	        'erp.master.manufacturer.view.BillDetail', 
	        'erp.master.manufacturer.view.CreatePayPlan', 
	        'erp.master.manufacturer.view.Location', 
	        'erp.master.manufacturer.view.NoUpTo', 
	        'erp.master.manufacturer.view.NoUpToSearch', 
	        'erp.master.manufacturer.view.CsmcSearch',
	        'erp.master.manufacturer.view.InvoiceDetail'],
	refs: [{
		ref: 'manufAccount',
		selector: 'mng_manufAccount'
	},
	{
		ref: 'StartStopTime',
		selector: 'win_StartStopTime'
	},
	{
		ref: 'grdManufAccount',
		selector: 'mng_manufAccount #grd_ManufAccount'
	},
	{
		ref: 'billdetail',
		selector: 'billDetail'
	},
	{
		ref: 'createpayplan',
		selector: 'createpayPlan'
	},
	{
		ref: 'grdPayPlan',
		selector: 'createpayPlan #grdPayPlan'
	},
	{
		ref: 'location',
		selector: 'mng_location'
	},
	{
		ref: 'location',
		selector: 'mng_location'
	},
	{
		ref: 'mngNoUpTo',
		selector: 'mng_NoUpTo'
	},
	{
		ref: 'grdnoUpPayment',
		selector: 'mng_NoUpTo #grdNoUpPayment'
	},
	{
		ref: 'grdnoUpInStorage',
		selector: 'mng_NoUpTo #grdNoUpInStorage'
	}],
	init: function() {
		var me = this;
		if (me.isInited) return;
		me.control({
			//主面板注册
			'mng_manufAccount': {
				afterrender: function() {
					me.panel = me.getManufAccount();
					me.gridmain = me.panel.down('#grd_ManufAccount');
					me.grdstore = me.panel.store;
					me.cpStore = me.panel.cpStore;
					me.cc_Store = me.panel.cc_Store;
					var grid = me.getGrdManufAccount();
					me.grdStore = grid.getStore();
					me.query_rec = Ext.create('erp.master.manufacturer.model.QueryParams');
					me.bill_rec = Ext.create('erp.master.manufacturer.model.Viewcsyf');
				},
				beforedestroy: function(th) {
					delete me.grdstore.proxy.extraParams.condition;
				}
			},
			//主面板按钮注册
			'mng_manufAccount button': {
				click: me.doAction
			},
			//grid注册
			'mng_manufAccount #grd_ManufAccount': {
				selectionchange: function(grid, rec) {
					if (rec.length > 0) {
						me.cpStore.loadRecords(rec);
					}
				},
				itemdblclick: function(grid, rec) {
					me.addInvoiceDetail();
				}
			},
			//生成付款计划窗口
			'createpayPlan button': {
				click: me.doEditAction
			},
			//未达筛选窗口
			'mng_NoUpTo button': {
				click: me.doNoUpToSearchAction
			}
		});
		me.isInited = true;
	},
	doNoUpToSearchAction: function(btn) {
		var me = this;
		me.wdpanel = me.getMngNoUpTo();
		me.wdfStore = me.wdpanel.wdfStore;
		me.wdrStore = me.wdpanel.wdrStore;
		me.query_wd = Ext.create('erp.master.manufacturer.model.WDQueryParams');
		switch (btn.itemId) {
		case 'BTN_SEARCH':
			var win = Ext.widget('NoUpTo_Search', {
				itemId: 'NoUpToSearch',
				wdfStore: me.wdfStore,
				wdrStore: me.wdrStore,
				wdview: me.wdpanel,
				rec: me.query_wd
			});
			win.show();
			break;
		}
	},
	//主窗口菜单栏事件
	doAction: function(btn) {
		var me = this;
		switch (btn.itemId) {
			//定位
		case 'btn_location':
			var win = Ext.widget('mng_location', {
				itemId: 'mng_location1',
				mainstore: me.grdStore,
				mainview: me.panel,
				rec: me.query_rec,
				gdbj:me.panel.gdbj
			});
			win.show();
			break;
			//筛选
		case 'btn_query':
			var win = Ext.widget('manufAccount_Search', {
				itemId: 'manufAccount_Search',
				mainstore: me.grdstore,
				mainview: me.panel,
				rec: me.query_rec,
				gdbj:me.panel.gdbj
			});
			win.show();
			break;
			//生成付款计划
		case 'btn_payplan':
			this.EdtPurchaseCost();
			break;
		case 'btn_hismanuf':
			var store = me.grdStore;
			if (btn.getText() == '历史厂商') {
				btn.setText('当前厂商');
				me.grdStore.loadPage(1, {
					params: {
						gdbj: 1
					}
				});
				me.panel.gdbj = 1;
			} else {
				btn.setText('历史厂商');
				me.grdStore.loadPage(1, {
					params: {
						gdbj: 0
					}
				});
				me.panel.gdbj = 0;
			}
			break;
			//未达
		case 'btn_weida':
			this.addNoUpTo();
			break;
			//票据明细
		case 'btn_pjmx':
			this.addBillDetail();
			break;
		case 'btn_print':
			Ext.Msg.alert("打印");
			break;
		}
	},
	//付款计划编辑：
	EdtPurchaseCost: function() {
		var me = this;
		var rec;
		var panel = me.getManufAccount();
		var jzrq = panel.s_jzrq;
		var wbbj = panel.wbbj;
		var grid =me.getGrdManufAccount();
		var cp_rec = grid.getSelectionModel().getSelection()[0];
		if (Ext.isEmpty(cp_rec)) {
			Ext.Msg.alert('提示', '请先选中一条记录');
			return;
		}
		var newjhbh = null;
		var today = new Date();
		today.setDate(01);
		Ext.Ajax.request({
			url: 'manufacturer/createPayPlanGrid.act?method=getMaxjhbh',
			async: false,
			success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				newjhbh = obj.data;
			},
			method: "POST",
			scope: this
		});
		var rec = Ext.create('erp.master.manufacturer.model.CreatePayPlanForm', {
			jhbh: parseInt(newjhbh),
			qsrq: today,
			jzrq: jzrq,
			czym: erp.UInfo.currentUser.name,
			czsj: today,
			bzsm: '',
			wbbj: wbbj
		});
		rec.phantom = true;
		var win = Ext.widget('createpayPlan', {
			itemId: 'create_payPlan1',
			title: '付款计划编辑',
			rec: rec,
			cp_rec: cp_rec
		});
		win.loadData(rec, cp_rec);
		win.show();
	},
	//未达panel
	addNoUpTo: function() {
		var me = this;
		var rec;
		var grid = me.getGrdManufAccount();
		var rec = grid.getSelectionModel().getSelection()[0];
		if (Ext.isEmpty(rec)) {
			Ext.Msg.alert('提示', '请先选中一条记录');
			return;
		}
		var win = Ext.widget('mng_NoUpTo',{
			xtype: 'mng_NoUpTo',
			itemId: 'i_NoUpTo',
			title:'未达明细查询',
			rec: rec[0]
		});
		win.loadData(rec);
		win.show();
	},
	//打开厂商往来明细账窗口（双击）
	addInvoiceDetail:function(){
		var me = this;
		var panel = me.getManufAccount();
		var nf = panel.nf;
		var rq = nf + '.01.01';
		var wbbj = panel.wbbj;
		var tjlb = panel.tjlb;
		var grid = me.getGrdManufAccount();
		var idStore = Ext.create('erp.master.manufacturer.store.InvoiceDetail');
		var recs = grid.getSelectionModel().getSelection()[0];
		var rec = Ext.create('erp.master.manufacturer.model.InvoiceDetail',{
			csbh : recs.get('csbh'),
			hsbm : recs.get('hsbm'),
			tjlb : tjlb,
			nf : nf,
			rq : rq,
			wbbj: wbbj
		});
		var win = Ext.widget('invoiceDetail',{
			xtype: 'invoicedetail',
			itemId: 'invoice_Detail',
			title: '厂商往来明细账',
			rec: rec,
			idStore: idStore,
			closable: true
		});
		win.loadGridData(rec);
		win.show();
	},
	//打开票据明细：
	addBillDetail: function() {
		var me = this;
		var recs;
		var panel = me.getManufAccount();
		var nf = panel.nf;
		var rq = nf + '.01.01';
		var grid = me.getGrdManufAccount();
		var bdStore = Ext.create('erp.master.manufacturer.store.BillDetail');
		recs = grid.getSelectionModel().getSelection()[0];
		var rec = Ext.create('erp.master.manufacturer.model.BillDetail',{
			csbh : recs.get('csbh'),
			hsbm : recs.get('hsbm'),
			nf : nf,
			rq : rq
		});
		var win = Ext.widget('billDetail',{
			xtype: 'billDetail',
			itemId: 'bill_Detail',
			title: '票据明细',
			rec: rec,
			bdStore: bdStore,
			closable: true
		});
		win.loadGridData(rec);
		win.show();
	},
	//生成付款计划菜单事件
	doEditAction: function(btn) {
		var me = this;
		var create_payplan = me.getCreatepayplan();
		var form = create_payplan.down('#P1Form');
		var grid_detail = create_payplan.down('#grdPayPlan');
		var cpStore = create_payplan.cpStore;
		switch (btn.itemId) {
		case 'BTN_SAVE':
			Ext.Msg.confirm('提示', '是否确认保存?',
			function(btn) {
				if (btn == 'yes') {
					var rec = form.getRecord();
					form.updateRecord(rec);
					rec.set('czym', erp.UInfo.currentUser.name);
					rec.set('czsj', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));					
					form.store.add(rec);					
					var bool=false;//不设置不会跳出提示
					cpStore.each(function(record){
						if(Ext.isEmpty(record.get('csbh'))){
							bool=true;
							Ext.Msg.alert('提示',"厂商编号不能为空！");
							return false;
						}
					});
					if(bool){
						return
					}
					
					cpStore.sync({
						success : function(batch, options) {}
					});
					form.store.sync();
					Ext.Msg.alert('提示', '保存成功');
				} else {}
			});
			break;
		case 'btn_cp_add':
			var rec = form.getRecord();
			var maxxh = cpStore.max('jhxh');
			maxxh = Ext.isEmpty(maxxh) ? 1 : (maxxh + 1);
			var newrec = Ext.create('erp.master.manufacturer.model.CreatePayPlanGrid', {
				jhbh: rec.get('jhbh'),
				jhxh: maxxh,
//				wbbh: " ",
				bzsm: " "
			});
			newrec.phantom = true;
			cpStore.add(newrec);
			break;
		case 'btn_cp_del':
			var toBeDeleteFileArray = create_payplan.toBeDeleteFileArray;
			var sel_recs = grid_detail.getSelectionModel().getSelection();
			if (Ext.isEmpty(sel_recs)) {
				Ext.Msg.alert('提示', '请先选中至少一条明细');
				return;
			}
			for (var i = 0; i < sel_recs.length; i++) {
				toBeDeleteFileArray.push(sel_recs[i].get('attched'));
			}
			cpStore.remove(sel_recs);
			break;
		}
	}

});