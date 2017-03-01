Ext.define('erp.master.manufacturer.view.StartStopTime', {
	extend: 'erp.ux.Window',
	alias: 'widget.win_StartStopTime',
	requires: ['erp.master.manufacturer.view.ManufAccountDetial', 
	           'erp.ux.FormKey', 
	           'erp.master.manufacturer.store.Sysxxb', 
	           'erp.master.manufacturer.model.TimeQueryParam'],
	title: '起止日期',
	width: 320,
	height: 360,
	iconCls: 'page_go',
	modal: true,
	initComponent: function() {
		var me = this;
		var date=new Date();
		var year = date.getYear() + 1900;
		var startDate = year + '-01-01 00:00:00';
		startDate = Ext.Date.parse(startDate, "Y-m-d H:i:s");
		me.rec = Ext.create('erp.master.manufacturer.model.TimeQueryParam');	
		Ext.apply(me, {
			layout: {
				type: 'fit',
				pack: 'start',
				align: 'stretch'
			},
			defaults: {
				padding: 5
			},
			items: [{
				itemId: 'TimeChooseForm',
				xtype: 'form',
				plugins: {
					ptype: 'FormKey'
				},
				store: me.store,
				layout: {
					type: 'column',
					pack: 'start',
					align: 'stretch'
				},
				defaults: {
					anchor: '95%',
					labelWidth: 72,
					margin: '5 5 5 5',
					columnWidth: 1
				},
				items: [{
					fieldLabel: '起始日期',
					name: 'qsrq',
					itemId: 'qsrq',
					xtype: 'datefield',
					columnWidth: 1,
					value:startDate,
					format: 'Y年m月d日',
					renderer : Ext.util.Format.dateRenderer('Y年m月d日')
				},
				{
					fieldLabel: '截止日期',
					name: 'jzrq',
					itemId: 'jzrq',
					xtype: 'datefield',
					columnWidth: 1,
					value: new Date(),
					format: 'Y年m月d日',
					renderer : Ext.util.Format.dateRenderer('Y年m月d日')
				},
				{
					fieldLabel: '统计类别',
					itemId: 'tjlb',
					name: 'tjlb',
					columnWidth: 1,
					xtype: 'combo',
					store: [[0, '区分事业部'], [1, '汇总厂商']]
				},
				{
					fieldLabel: '所属用户',
					itemId: 'yhbh',
					name: 'yhbh',
					columnWidth: 1,
					xtype: 'combo',
					store: Ext.create('erp.master.manufacturer.store.Sysxxb', {
						autoLoad: true
					}),
					displayField: 'yhjc',
					valueField: 'yhbh',
					emptyText: '全部用户'
				},
				{
					fieldLabel: '核算部门',
					itemId: 'hsbm',
					name: 'hsbm',
					columnWidth: 1,
					xtype: 'comboxTree',
					queryMode: 'local',
					store: Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree'),
					displayField: 'text',
					valueField: 'nodeId',
					emptyText: '全部部门'
				},
				{
					fieldLabel: '币种选择',
					xtype: 'fieldcontainer',
					columnWidth: 1,
					defaultType: 'radiofield',
					defaults: {
						flex: 1
					},
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						checked: true,
						name: 'wbbj',
						boxLabel: '本币',
						inputValue: 0
					},
					{
						columnWifth: .45,
						name: 'wbbj',
						boxLabel: '外币',
						inputValue: 1
					}]
				}],
				buttons: [{
					text: '重置',
					glyph: 0xf112,
					itemId: 'btn_reset',
					handler: function(btn) {
						var form = me.down('form');
						form.form.reset();
						var rec = form.getRecord();
						form.updateRecord(rec);
					}
				},
				'->', {
					text: '确认',
					glyph: 0xf058,
					itemId: 'btn_confirm',
					handler: me.doManufAccount
				},
				{
					text: '关闭',
					glyph: 0xf057,
					handler: function() {
						me.close();
					}
				}]
			}]
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
	},
	doManufAccount: function() {
		var form = me.down('form');
		var rec = form.getRecord();
		form.updateRecord(rec);
		var nf = rec.get('qsrq').getYear() + 1900;
		var qcqs = nf + '-01-01 00:00:00';
		var qsrq = rec.get('qsrq');
		var jzrq = rec.get('jzrq');
		var jzrqY = jzrq.getYear() + 1900; //结束年份
		var jzrqM = jzrq.getMonth() + 1; //结束月份
		var jzrqD = jzrq.getDate(); //结束天数
		if(jzrqD<10){
			jzrqD = '0'+jzrqD;
		}		
		if (jzrqM < 10) {
			var n_jzrq = jzrqY + '-0' + jzrqM + '-' + jzrqD + ' ' + '23:59:59';
		} else {
			var n_jzrq = jzrqY + '-' + jzrqM + '-' + jzrqD + ' ' + '23:59:59';
		}
		var qcqs = Ext.Date.parse(qcqs, "Y-m-d H:i:s");
		var s_jzrq = Ext.Date.parse(n_jzrq, "Y-m-d H:i:s");
		var s_qynf = erp.Const.callServiceMethodSync('manufacturer/util.act?method=getQynf',{});
		var s_jzzt = 0;
		if(nf>s_qynf){
			s_jzzt = erp.Const.callServiceMethodSync('manufacturer/util.act?method=getJzzt',{nd:nf-1});
			if(s_jzzt==0){
				Ext.Msg.alert("提示",""+(nf - 1)+"年12月份应付没结账转年，不能查询应付帐");
				me.close();
				return;					
			}
		}
		var condition;
		var gdbj = 0;//当前厂商
		var tjlb = rec.get('tjlb');
		var yhbh = rec.get('yhbh');
		var hsbm = rec.get('hsbm');
		var s_yhmc = erp.Const.callServiceMethodSync('manufacturer/util.act?method=getYhmc',{yhbh:yhbh});
		var s_bmmc = erp.Const.callServiceMethodSync('manufacturer/util.act?method=getBmmc',{hsbm:hsbm});
		var wbbj = rec.get('wbbj');
		var czyh = erp.UInfo.currentUser.u_id;
		var bzmc;
		var store = Ext.create('erp.master.manufacturer.store.Viewcsyf');
		if (tjlb == 0 && wbbj == 0) {
			var canShow1 = false;
			var canShow2 = true;
			bzmc = '本币';			
		} else if (tjlb == 0 && wbbj == 1) {
			var canShow1 = true;
			var canShow2 = false;
			bzmc = '外币';			
		} else if (tjlb == 1 && wbbj == 0) {
			var canShow1 = false;
			var canShow2 = true;
			bzmc = '本币';			
		} else if (tjlb == 1 && wbbj == 1) {
			var canShow1 = true;
			var canShow2 = false;
			bzmc = '外币';			
		}
		me.close();
		var panel = erp.Util.addContentTab({
			xtype: 'mng_manufAccount',
			itemId: 'PayAccountManger',
			title: '厂商应付总账',
			store: store.load({
				params: {
					condition:condition,
					qcqs: qcqs,
					qsrq: qsrq,
					nf: nf,
					s_jzrq: s_jzrq,
					tjlb: tjlb,
					yhbh: yhbh,
					hsbm: hsbm,
					wbbj: wbbj,
					gdbj: gdbj,
					usePaging: true
				}
			}),
			nf: nf,
			s_jzrq: s_jzrq,
			s_yhmc: s_yhmc,
			s_bmmc: s_bmmc,
			qcqs: qcqs,
			qsrq: qsrq,
			jzrq: jzrq,
			tjlb: tjlb,
			yhbh: yhbh,
			hsbm: hsbm,
			wbbj: wbbj,
			bzmc: bzmc,
			gdbj: gdbj,
			canShow1 : canShow1,
			canShow2 : canShow2,
			closable: true
		});
	}
});