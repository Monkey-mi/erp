Ext.define('erp.materialQualityTesting.controller.MaterialQualityController', {
    extend: 'Ext.app.Controller',
    requires: ['erp.ux.PagingBar',
        'Ext.ux.TreePicker',
        'Ext.window.MessageBox',
        'erp.ux.ComboxTree',
        'erp.materialQualityTesting.model.MaterialQualityManager',
        'erp.materialQualityTesting.store.MaterialQualityManager',
        'erp.materialQualityTesting.store.MaterialQualityManagerBufferrd',
        'erp.materialQualityTesting.model.Ckmc',
        'erp.materialQualityTesting.store.Ckmc',
        'erp.materialQualityTesting.model.TimeQueryParam',
        'erp.materialQualityTesting.store.HistoryJudgment',
        'erp.materialQualityTesting.store.Wtjycssqb',
        'erp.materialQualityTesting.store.Wtjycssqclmxb',
        'erp.materialQualityTesting.store.Wtjycssqmxb',
        'erp.materialQualityTesting.model.Wtjycssqb',
        'erp.materialQualityTesting.model.Wtjycssqclmxb',
        'erp.materialQualityTesting.model.Wtjycssqmxb',
        'erp.materialQualityTesting.store.Cghtb',
        'erp.materialQualityTesting.model.Cghtb',
        'erp.materialQualityTesting.store.CreateLead',
        'erp.materialQualityTesting.model.CreateLead',
        'erp.materialQualityTesting.model.LeadQueryParam',
        'erp.materialQualityTesting.model.Clbmb',
        'erp.materialQualityTesting.store.Clbmb'
    ],
    views: ['erp.materialQualityTesting.view.MaterialQualityManager',
        'erp.materialQualityTesting.view.WarehouseChoose',
        'erp.materialQualityTesting.view.WaitingJudgmentReason',
        'erp.materialQualityTesting.view.Checked',
        'erp.view.master.purchaseDetail.window.MateCombo',
        'erp.materialQualityTesting.view.MaterialChooseType',
        'erp.materialQualityTesting.view.MaterialQualitySearch',
        'erp.materialQualityTesting.view.JudgementAll',
        'erp.materialQualityTesting.view.QualityJudgment',
        'erp.materialQualityTesting.view.HistoryJudgment',
        'erp.materialQualityTesting.view.HistoryJudgmentTime',
        'erp.materialQualityTesting.view.HistoryJudgmentModify',
        'erp.materialQualityTesting.view.HistoryJudgmentQuery',
        'erp.materialQualityTesting.view.CreateLead',
        'erp.materialQualityTesting.view.CreateLeadSearch',
        'erp.materialQualityTesting.view.MaterialName',
        'erp.materialQualityTesting.view.CreateCommissionOrders'
    ],
    refs: [{
        ref: 'mngMaterialQuality',
        selector: 'mng_MaterialQuality'
    }, {
        ref: 'grdMaterialQuality',
        selector: 'mng_MaterialQuality #grd_MaterialQuality'
    }, {
        ref: 'mngwaitJudgeReason',
        selector: 'mng_waitJudgeReason'
    }, {
        ref: 'mngChecked',
        selector: 'mng_Checked'
    }, {
        ref: 'mngJudgementAll',
        selector: 'mng_JudgementAll'
    }, {
        ref: 'mngQualityJudgment',
        selector: 'mng_QualityJudgment'
    }, {
        ref: 'mngHistoryJudgment',
        selector: 'mng_HistoryJudgment'
    }, {
        ref: 'grdHistoryJudgment',
        selector: 'mng_HistoryJudgment #grd_HistoryJudgment'
    }, {
        ref: 'mngHistoryJudgmentModify',
        selector: 'mng_HistoryJudgmentModify'
    }, {
        ref: 'winCreateCommissionOrder',
        selector: 'win_CreateCommissionOrder'
    }, {
        ref: 'mnglead',
        selector: 'mng_lead'
    }, {
        ref: 'grdlead',
        selector: 'mng_lead #grd_Lead'
    }, {
        ref: 'CCOForm1',
        selector: 'win_CreateCommissionOrder CCOForm1'
    }],
    init: function () {
            var me = this;
            if (me.isInited)
                return;
            me.control({
                'mng_MaterialQuality': {
                    afterrender: function () {
                        me.panel = me.getMngMaterialQuality();
                        me.grdmain = me.getGrdMaterialQuality();
                        me.grdStore = me.panel.store;
                        me.query_rec = Ext.create('erp.materialQualityTesting.model.QueryParams');
                        me.lquery_rec = Ext.create('erp.materialQualityTesting.model.LeadQueryParam');
                    }
                },
                'mng_MaterialQuality button': {
                    click: me.doAction
                },
                'mng_MaterialQuality #grd_MaterialQuality': {
                    itemdblclick: function (grid, rec) {
                        me.addQualityJudgment();
                    }
                },
                'mng_waitJudgeReason button': {
                    click: me.doJudgeReasAction
                },
                'mng_Checked button': {
                    click: me.doCheckedAction
                },
                'mng_JudgementAll button': {
                    click: me.doJudgementAllAction
                },
                'mng_QualityJudgment button': {
                    click: me.doQualityJudgmentAction
                },
                'mng_HistoryJudgment button': {
                    click: me.doHistoryJudgmentAction
                },
                'mng_HistoryJudgmentModify button': {
                    click: me.doHJModifyAction
                },
                'win_CreateCommissionOrder #grdApplyDetail': {
                    cellclick : function(a,td,cellIndex,record){
                           var cr_panel = me.getWinCreateCommissionOrder();
                           var form1 = cr_panel.down('#CCOForm1');
                           form1.down('#cghtyq').setValue(record.get('cghtyq'));
                          }                                           
                },
                'win_CreateCommissionOrder button': {
                    click: me.doCommissionOrderAction
                },
                'mng_lead button': {
                    click: me.doLeadAction
                }
            });
            me.isInited = true;
        },
        doAction: function (btn) {
            var me = this;
            switch (btn.itemId) {
            case 'btn_judgment':
                this.addQualityJudgment();
                break;
            case 'btn_judgmentAll':
                this.addJudgmentAll();
                break;
            case 'btn_judgmentResion':
                this.addJudgmentResion();
                break;
            case 'btn_aud':
                this.addCheched();
                break;
            case 'btn_historyJudgment':
                this.addHistoryJudgmentTime();
                break;
            case 'btn_create':
                this.addCommissionOrder();
                break;
            case 'btn_query':
                var win = Ext.widget('MaterialQuality_Search', {
                    itemId: 'materialQualitySearch',
                    store: me.grdStore,
                    mainview: me.panel,
                    rec: me.query_rec
                });
                win.show();
                break;
            case 'btn_print':
                Ext.Msg.alert('提示', '打印');
                break;
            }
        },
        //导入窗口按钮事件
        doLeadAction: function (btn) {
            var me = this;
            var pal_CommissionOrder = me.getWinCreateCommissionOrder();
            var form = pal_CommissionOrder.down('#CCOForm');
            var rec = form.getRecord();
            var grid_rec = me.grdmain.getSelectionModel().getSelection()[0];
            var csbh = rec.get('csbh');
            var ckbh = grid_rec.get('ckbh');
            switch (btn.itemId) {
            case 'btn_query':
                var Grdlead = me.getGrdlead();
                me.win = me.getMnglead();
                me.LeadStore = me.win.store;
                var lead_win = Ext.widget('CreateLead_Search', {
                    itemId: 'up_lead',
                    mainstore: me.LeadStore,
                    mainview: me.win,
                    rec: me.lquery_rec,
                    ckbh: ckbh,
                    csbh: csbh
                });
                lead_win.show();
                break;
            }
        },
        //打开生成委托单窗口
        addCommissionOrder: function () {
            var me = this;
            var wcmStore = me.panel.down('#grdApplyDetail');
            var recs = me.grdmain.getSelectionModel().getSelection();
//            var isEdit = true;//是否退出编辑窗口
            if(recs.length<1){
               Ext.Msg.alert('提示', '请选中某行再使用此功能！');
               return;
            }
            var csbh = recs[0].get('csbh');
            var newwtxh = 1;
            var wtrq = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
            var czsj = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
            var wtrm = erp.UInfo.currentUser.name;
            var czym = erp.UInfo.currentUser.name;
            Ext.Ajax.request({
                url: 'materialQuality/wtjycssqb.act?method=getMaxwtdh',
                async: false,
                success: function (response, opts) {
                        var obj = Ext.decode(response.responseText);
                        newwtdh = obj.data;
                    },
                    method: "POST",
                scope: this
            });
            var wtdh = parseInt(newwtdh);
            var n_rec = new Array();
            var bool = false;
            Ext.each(recs,function(rec){
	            if (rec.get('ztbj') == 2 || rec.get('ztbj') == 3) {
	                Ext.Msg.alert('提示', '已经入库或者退库的记录不能生成委托测试单!');
	                bool = true;
	                return;
	            }
	            if (rec.get('csbh') != csbh){
	                Ext.Msg.alert('提示','所选记录的厂商名称不一致，不能生成委托测试单!');
	                bool = true;
	                return;
	            }
	            var cghtyq = erp.Const.callServiceMethodSync('materialQuality/wtjycssqclmxb.act?method=getCghtb', {
		          htbh: rec.get('htbh')
		         });
	            var r = Ext.create('erp.materialQualityTesting.model.Wtjycssqclmxb', {
	            	wtxh: newwtxh,
				    wtdh: wtdh,
				    cghtyq: cghtyq,
				    clhh: rec.get('clhh'),
				    htxh: rec.get('htxh'),
				    hth: rec.get('hth'),
				    sjsl: rec.get('dhsl'),
				    dhdh: rec.get('dhdh'),
				    dhxh: rec.get('dhxh'),
				    dhh: rec.get('dhh'),
				    jldw: rec.get('jldw'),
				    llrq: rec.get('dhrq'),
				    clmc: rec.get('clmc')
	            });
	            n_rec.push(r);	            
	            newwtxh++;
            });
            if(bool){
             return;
            }
            
            var wcq_rec = Ext.create('erp.materialQualityTesting.model.Wtjycssqb', {
                wtdh: wtdh,
                wtrm: wtrm,
                wtrq: wtrq,
                csbh: recs[0].get('csbh'),
                csmc: recs[0].get('csmc'),
                bzsm: recs[0].get('bzsm'),
                czym: czym,
                czsj: czsj
            });
            var win = erp.Util.addContentTab({
            	xtype : 'win_CreateCommissionOrder', 
                itemId: 'up_CreateCommissionOrder',
                title: '材料委托检验测试申请单编辑',
                wcq_rec: wcq_rec,
                n_rec: n_rec
//                isEdit:isEdit
            });
            win.show();
            win.loadData(n_rec,wcq_rec);
        },
        //委托单窗口按钮事件
        doCommissionOrderAction: function (btn) {
            var me = this;
            var pal_CommissionOrder = me.getWinCreateCommissionOrder();
            var form = pal_CommissionOrder.down('#CCOForm');
            var form1 = pal_CommissionOrder.down('#CCOForm1');
            var grid_detail = pal_CommissionOrder.down('#grdApplyDetail');
            var grid_detail2 = pal_CommissionOrder.down('#grdApplyDetail2');
            var wcmStore = pal_CommissionOrder.wcmStore;
            var wcbStore = pal_CommissionOrder.wcbStore;
            switch (btn.itemId) {
            case 'btn_lead':
//                var rec_1 = form1.getRecord();
                var rec = form.getRecord();
                var grid_rec = me.grdmain.getSelectionModel().getSelection()[0];
                var csbh = rec.get('csbh');
                var ckbh = grid_rec.get('ckbh');
                var store = Ext.create('erp.materialQualityTesting.store.CreateLead');
                if (csbh == null) {
                    csbh = '';
                }
                if (csbh == '') {
                    Ext.Msg.alert('提示:', '厂商不能为空!');
                    return;
                }
                var win = Ext.widget('mng_lead', {
                    itemId: 'up_lead',
                    title: '导入',
                    store: store.load({
                        params: {
                            csbh: csbh,
                            ckbh: ckbh,
                            usePaging: true
                        },
                        csbh: csbh,
                        ckbh: ckbh
                    })
                });
                win.down('#btn_confirm').on({
                    click: function (btn) {
                        var win = btn.up('window');
                        var grid = win.down('#grd_Lead');
//                        var recc = grid.getSelectionModel().getSelection()[0];
                        var recs = grid.getSelectionModel().getSelection();
//                        if (Ext.isEmpty(recs)) {
//                            Ext.Msg.alert('提示', '请选择至少一条需要导入的记录');
//                            return;
//                        }
                        var nrecs =new Array();
						var wtxh =wcmStore.max('wtxh') == null ? 1 : wcmStore.max('wtxh') + 1;						
                        for(x in recs){
                        	 var cghtyq = erp.Const.callServiceMethodSync('materialQuality/wtjycssqclmxb.act?method=getCghtb', {
					          htbh: recs[x].get('htbh')
					         });
                        	 var r = Ext.create('erp.materialQualityTesting.model.Wtjycssqclmxb', {
                             	wtdh: rec.get('wtbh'),
                             	wtxh: wtxh,
//                             	wtxh: wcmStore.max('wtxh') == null ? 1 : wcmStore.max('wtxh') + 1,
                     			ckbh: recs[x].get('ckbh'),
                                clhh: recs[x].get('clhh'),
                                htxh: recs[x].get('htxh'),
                                hth: recs[x].get('hth'),
                                sjsl: recs[x].get('dhsl'),
                                dhdh: recs[x].get('dhdh'),
                                dhxh: recs[x].get('dhxh'),
                                dhh: recs[x].get('dhh'),
                                jldw: recs[x].get('jldw'),
                                llrq: recs[x].get('dhrq'),
                                clmc: recs[x].get('clmc'),
                                cghtyq: cghtyq
                             });
                             nrecs.push(r);
                             wtxh++;
//                        	 if (!Ext.isEmpty(rec)) {
//                                 r.phantom = true;
//                                 wcmStore.add(r);
//                        }
                       
//                        var maxwtxh = wcmStore.max('wtxh');
//                        maxwtxh = Ext.isEmpty(maxwtxh) ? 1 : (maxwtxh + 1);
//                        var r = Ext.create('erp.materialQualityTesting.model.wtjycssqclmxb', {
//                            wtdh: rec.get('wtbh'),
//                            wtxh: maxwtxh,
//                            ckbh: recc.get('ckbh'),
//                            clhh: recc.get('clhh'),
//                            htxh: recc.get('htxh'),
//                            hth: recc.get('hth'),
//                            sjsl: recc.get('dhsl'),
//                            dhdh: recc.get('dhdh'),
//                            dhxh: recc.get('dhxh'),
//                            dhh: recc.get('dhh'),
//                            jldw: recc.get('jldw'),
//                            llrq: recc.get('dhrq'),
//                            clmc: recc.get('clmc'),
//                            cghtyq: rec_1.get('cghtyq')
//                        });
//                        if (!Ext.isEmpty(rec)) {
//                            r.phantom = true;
//                            wcmStore.add(r);
                        }
                        wcmStore.add(nrecs);
                        win.close();
                    }
                });
                win.show();
                break;
            case 'btn_add':
                var rec = form.getRecord();
                var maxwtxh = wcmStore.max('wtxh');
                maxwtxh = Ext.isEmpty(maxwtxh) ? 1 : (maxwtxh + 1);
                var newrec = Ext.create('erp.materialQualityTesting.model.Wtjycssqclmxb', {
                    wtxh: maxwtxh,
                    wtdh: rec.get('wtdh')
                });
                newrec.phantom = true;
                wcmStore.add(newrec);
                break;
            case 'btn_del':
                var toBeDeleteFileArray = pal_CommissionOrder.toBeDeleteFileArray;
                var sel_recs = grid_detail.getSelectionModel().getSelection();
                if (Ext.isEmpty(sel_recs)) {
                    Ext.Msg.alert('提示', '请先选中至少一条明细');
                    return;
                }
                for (var i = 0; i < sel_recs.length; i++) {
                    toBeDeleteFileArray.push(sel_recs[i].get('attched'));
                }
                wcmStore.remove(sel_recs);
                break;
            case 'btn_mxadd':
                var rec = form.getRecord();
                var maxwtsqxh = wcbStore.max('wtsqxh');
                maxwtsqxh = Ext.isEmpty(maxwtsqxh) ? 1 : (maxwtsqxh + 1);
                var newrec = Ext.create('erp.materialQualityTesting.store.Wtjycssqclmxb', {
                    wtsqxh: maxwtsqxh
                });
                newrec.phantom = true;
                wcbStore.add(newrec);
                break;
            case 'btn_mxdel':
                var toBeDeleteFileArray = pal_CommissionOrder.toBeDeleteFileArray;
                var sel_recs = grid_detail2.getSelectionModel().getSelection();
                if (Ext.isEmpty(sel_recs)) {
                    Ext.Msg.alert('提示', '请先选中至少一条明细');
                    return;
                }
                for (var i = 0; i < sel_recs.length; i++) {
                    toBeDeleteFileArray.push(sel_recs[i].get('attched'));
                }
                wcbStore.remove(sel_recs);
                break;
            case 'btn_mxcopy':
                Ext.Msg.alert('明细复制');
                break;
            case 'BTN_SAVE':
                this.SaveCommissionOrder();
                break;
            }
        },
        //生成委托单保存
        SaveCommissionOrder: function () {
            var me = this;
            var grid_rec = me.grdmain.getSelectionModel().getSelection()[0];
            var ckbh = grid_rec.get('ckbh');
            var pal_CommissionOrder = me.getWinCreateCommissionOrder();
            var form = pal_CommissionOrder.down('#CCOForm');
            var form1 = pal_CommissionOrder.down('#CCOForm1');
            var grid_detail = pal_CommissionOrder.down('#grdApplyDetail');
            var wcmStore = pal_CommissionOrder.wcmStore;
            var rec = form.getRecord();
            var rec1 = form1.getRecord();
            form1.updateRecord(rec1);
            form.updateRecord(rec);
            rec.set('wtrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
            if (Ext.isEmpty(rec.get('wtdh'))) {
                Ext.Msg.alert('提示', '委托单号不能为空');
                return;
            }
            if (rec.get('wtlb') == null || rec.get('wtlb') == "") {
                Ext.Msg.alert('提示', '委托部门不能为空,请重新选择!');
                return;
            }
            Ext.Msg.confirm('提示', '是否确认保存(Y/N)?', function (btn) {
                if (btn == 'yes') {
                    rec.phantom = true;
                    form.store.add(rec);
                    var bool = false; //不设置不会跳出提示
                    var cghtyq = rec1.get('cghtyq');
                    if (Ext.isEmpty(rec1.get('cghtyq'))) {
                        cghtyq = '';
                    }
                    wcmStore.each(function (record) {
                        record.set('wtdh', rec.get('wtdh'));
                        record.set('cghtyq', cghtyq);
                        record.set('ckbh', ckbh);
                        record.phantom = true;
                        if (Ext.isEmpty(record.get('clmc'))) {
                            bool = true;
                            Ext.Msg.alert('提示', "材料名称不能为空！");
                            return false;
                        }
                    });
                    if (bool) {
                        return
                    }
                    wcmStore.sync({
                        success: function () {
                            wcmStore.reload({
                                params: {
                                    wtdh: rec.get('wtdh')
                                }
                            });
                        }
                    });
                    form.store.sync();
                    Ext.Msg.alert('提示', '保存成功');
                    pal_CommissionOrder.close();
                } else {}
            });
        },
        //打开历史判定窗口
        addHistoryJudgmentTime: function () {
            var me = this;
            me.panel = me.getMngMaterialQuality();            
            var ckbh = me.panel.ckbh;
            var rec = Ext.create('erp.materialQualityTesting.model.TimeQueryParam',{ckbh:ckbh});
            var win = Ext.widget('win_HistoryJudgmentTime', {
                itemId: 'up_HistoryJudgmentTime',
                title: '历史判定',
                rec: rec
            });
            win.show();
            win.loadData(rec);
        },
        //历史判定窗口按钮事件
        doHistoryJudgmentAction: function (btn) {
            var me = this;
            switch (btn.itemId) {
            case 'btn_cancel':
                this.cancelJudgment();
                break;
            case 'btn_modify':
                this.modifyHistoryJudgment();
                break;
            case 'btn_query':
                this.queryHistoryJudgment();
            }
        },
        //历史判定筛选窗口
        queryHistoryJudgment: function () {
            var me = this;
            var gridHistory = me.getGrdHistoryJudgment();
            me.win = me.getMngHistoryJudgment();
            me.HisStore = me.win.store;
            var hj_win = Ext.widget('mng_HistoryJudgmentQuery', {
                itemId: 'up_HistoryJudgmentQuery',
                mainstore: me.HisStore,
                mainview: me.win,
                rec: me.query_rec
            });
            hj_win.show();
        },
        //历史判定取消判定
        cancelJudgment: function () {
            var me = this;
            var gridHistory = me.getGrdHistoryJudgment();
            me.win = me.getMngHistoryJudgment();
            me.HisStore = me.win.store;
            var recs = gridHistory.getSelectionModel().getSelection();
            if (Ext.isEmpty(recs)) {
                Ext.Msg.alert('提示', '请选中要取消判定的记录(可多选)!');
                return;
            }
            Ext.Msg.confirm(
                '提示', '是否确认对所选记录取消质检判定？', function (btn) {
                    if (btn == 'yes') {
                        var bool = false;
                        for (x in recs) {
                            var ckbh = recs[x].get('ckbh');
                            var dhdh = recs[x].get('dhdh');
                            var dhxh = recs[x].get('dhxh');
                            var ztbj = recs[x].get('ztbj');
                            var count = erp.Const.callServiceMethodSync('materialQuality/materialquality.act?method=getHistoryJudgmentCount', {
                                ckbh: ckbh,
                                dhdh: dhdh,
                                dhxh: dhxh
                            });
                            if (count > 0) {
                                bool = true;
                                Ext.Msg.alert('提示', '到货单号为' + dhdh + '到货序号为' + dhxh + '已入库，不能取消质检！');
                                return;
                            }
                            if (ztbj == 2 || ztbj == 3) {
                                bool = true;
                                Ext.Msg.alert('提示', '入库单已经退货或入库,不能取消质检');
                                return;
                            }
                        }
                        if (bool) {
                            return;
                        };
                        Ext.each(recs, function (rec) {
                            rec.set('ztbj', 1);
                            rec.set('jyjg', 1);
                        });
                        me.HisStore.sync();
                        me.HisStore.reload();
                        Ext.Msg.alert('提示', '取消判定成功!');
                    }
                }
            );
        },
        //打开历史判定修改窗口
        modifyHistoryJudgment: function () {
            var me = this;
            var recs = me.grdmain.getSelectionModel().getSelection();
            if (Ext.isEmpty(recs)) {
                Ext.Msg.alert('提示', '请至少选中一条记录');
                return;
            }
            var win = Ext.widget('mng_HistoryJudgmentModify', {
                itemId: 'up_HJModify',
                title: '备注说明',
                rec: recs
            });
            win.show();
        },
        //历史判定修改判定按钮
        doHJModifyAction: function (btn) {
            var me = this;
            var gridHistory = me.getGrdHistoryJudgment();
            me.win = me.getMngHistoryJudgment();
            me.HisStore = me.win.store;
            me.hiswin = me.getMngHistoryJudgmentModify();
            var recs = gridHistory.getSelectionModel().getSelection();
            if (btn.action == 'BTN_SAVE') {
                var values = me.getMngHistoryJudgmentModify().getData();
                var bzsm = values.bzsm;
                if (Ext.isEmpty(recs)) {
                    Ext.Msg.alert('提示', '请选中某行或多行再使用此功能！');
                    return;
                }
                if (values.bzsm == null) {
                    bzsm = '';
                }
                Ext.each(recs, function (rec) {
                    rec.set('bzsm', bzsm);
                });
                me.HisStore.sync();
                me.HisStore.reload();
                me.hiswin.close();
                Ext.Msg.alert('提示', '批量修改成功!');
            }
        },
        //打开质检判定处理窗口
        addQualityJudgment: function () {
            var me = this;
            var rec = me.grdmain.getSelectionModel().getSelection()[0];
            if (Ext.isEmpty(rec)) {
                Ext.Msg.alert('提示', '请选中一条记录');
                return;
            }
            if (rec.get('jyjg') != 1) {
                Ext.Msg.alert('提示', '已经判定过的记录不允许再判定，请用审核功能修改!');
                return;
            }
            var win = Ext.widget('mng_QualityJudgment', {
                itemId: 'up_QualityJudgment',
                title: '质检判定处理',
                rec: rec[0]
            });
            win.show();
            win.loadData(rec);
        },
        //质检判定处理窗口按钮事件
        doQualityJudgmentAction: function (btn) {
            var me = this;
            var winQualityJudgment = me.getMngQualityJudgment();
            var form = winQualityJudgment.down('#QJForm');
            var rec = form.getRecord();
            var grid = me.getGrdMaterialQuality();
            var recs = grid.getSelectionModel().getSelection()[0];
            if (btn.action = 'BTN_SAVE') {
                var values = me.getMngQualityJudgment().getData();
                var zjrm = erp.UInfo.currentUser.name;
                var jyjg = values.jyjg;
                var zjdh = values.zjdh;
                var zjrq = values.zjrq;
                var zjbz = values.zjbz;
                var ckbh = rec.get('ckbh');
                var dhdh = rec.get('dhdh');
                if (values.zjrq == null || values.zjrq == '') {
                    Ext.Msg.alert('提示', '请输入判定日期');
                    return;
                }
                if (values.zjrq < values.dhrq) {
                    Ext.Msg.alert('提示', '判定日期不能小于到货日期!');
                    return;
                }
                if (values.dhsl == null || values.dhsl == 0) {
                    Ext.Msg.alert('提示', '到货数量不能为0!');
                    return;
                }
                if (values.jysl == null || values.jysl == 0) {
                    Ext.Msg.alert('提示', '送检数量不能为0!');
                    return;
                }
                if (values.jysl > values.dhsl) {
                    Ext.Msg.alert('提示', '送检数量不能大于到货数量!');
                    return;
                }
                if (values.hgsl > values.jysl) {
                    Ext.Msg.alert('提示', '合格数量不能大于送检数量!');
                    return;
                }
                if (values.jyjg == 2 && values.hgsl <= 0) {
                    Ext.Msg.alert('提示', '合格数量不能等于零！');
                    return;
                }
                if (rec.get('ztbj') != 1 && rec.get('ztbj') != 5) {
                    Ext.Msg.alert('提示', '该到货单已经被判定为' + rec.get('ztmc') + '状态，如与主界面不一致，请刷新主界面，如需再判定请先取消判定');
                    return;
                }
                if (values.hgsl != 0 && values.bhgs != 0) {
                    var newdhxh = null;
                    Ext.Ajax.request({
                        url: 'materialQuality/materialquality.act?method=getMaxDhxh',
                        async: false,
                        params: {
                            ckbh: ckbh,
                            dhdh: dhdh
                        },
                        success: function (response, opts) {
                                var obj = Ext.decode(response.responseText);
                                newdhxh = obj.data;
                            },
                            method: "POST",
                        scope: this
                    });
                    switch (jyjg) {
                    case 2:
                        //修改不合格记录
                        rec.set('ztbj', 5);
                        rec.set('jyjg', 3);
                        rec.set('dhxh', parseInt(newdhxh));
                        rec.set('dhsl', values.bhgs);
                        rec.set('zjrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        rec.set('zjrm', zjrm);
                        rec.set('czym', '自动拆分');
                        rec.set('zjbz', zjbz);
                        form.store.add(rec);
                        form.store.sync();
                        //修改原记录
                        rec.set('ztbj', 1);
                        rec.set('jyjg', 1);
                        rec.set('dhxh', parseInt(newdhxh) + 1);
                        rec.set('dhsl', values.dhsl - values.jysl);
                        rec.set('zjrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        rec.set('zjrm', zjrm);
                        rec.set('zjbz', zjbz);
                        form.store.add(rec);
                        form.store.sync();
                        //修改合格记录
                        Ext.each(recs, function (rec) {
                            rec.set('ztbj', 4);
                            rec.set('jyjg', 2);
                            rec.set('dhsl', values.hgsl);
                            rec.set('zjrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            rec.set('zjrm', zjrm);
                            rec.set('zjbz', zjbz);
                        });
                        winQualityJudgment.close();
                        me.grdStore.sync();
                        me.grdStore.reload();
                        Ext.Msg.alert('提示', '判定成功!');
                    }
                } else {
                    var newdhxh = null;
                    Ext.Ajax.request({
                        url: 'materialQuality/materialquality.act?method=getMaxDhxh',
                        params: {
                            ckbh: ckbh,
                            dhdh: dhdh
                        },
                        async: false,
                        success: function (response, opts) {
                                var obj = Ext.decode(response.responseText);
                                newdhxh = obj.data;
                            },
                            method: "POST",
                        scope: this
                    });
                    switch (jyjg) {
                    case 2:
                        //生成待检记录
                        rec.set('ztbj', 1);
                        rec.set('jyjg', 1);
                        rec.set('dhxh', parseInt(newdhxh));
                        rec.set('dhsl', values.dhsl - values.jysl);
                        rec.set('zjrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        rec.set('zjrm', zjrm);
                        rec.set('zjbz', zjbz);
                        form.store.add(rec);
                        form.store.sync();
                        //修改合格记录
                        Ext.each(recs, function (rec) {
                            rec.set('ztbj', 4);
                            rec.set('jyjg', 2);
                            rec.set('dhsl', values.hgsl);
                            rec.set('zjrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            rec.set('zjrm', zjrm);
                            rec.set('zjbz', zjbz);
                        });
                        winQualityJudgment.close();
                        me.grdStore.sync();
                        me.grdStore.reload();
                        Ext.Msg.alert('提示', '判定成功!');
                        break;
                    case 3:
                        //生成待检记录
                        rec.set('ztbj', 1);
                        rec.set('jyjg', 1);
                        rec.set('dhxh', parseInt(newdhxh));
                        rec.set('dhsl', values.dhsl - values.jysl);
                        rec.set('zjrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        rec.set('zjrm', zjrm);
                        rec.set('zjbz', zjbz);
                        form.store.add(rec);
                        form.store.sync();
                        //修改不合格记录
                        Ext.each(recs, function (rec) {
                            rec.set('ztbj', 5);
                            rec.set('jyjg', 3);
                            rec.set('dhsl', values.bhgs);
                            rec.set('zjrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                            rec.set('zjrm', zjrm);
                            rec.set('zjbz', zjbz);
                        });
                        winQualityJudgment.close();
                        me.grdStore.sync();
                        me.grdStore.reload();
                        Ext.Msg.alert('提示', '判定成功!');
                        break;
                    }
                }
            }
        },
        //打开批量判定窗口
        addJudgmentAll: function () {
            var me = this;
            var ja_recs = me.grdmain.getSelectionModel().getSelection();
            if (Ext.isEmpty(ja_recs)) {
                Ext.Msg.alert('提示', '请至少选中一条记录');
                return;
            }
            for (x in ja_recs) {
                if (ja_recs[x].get('jyjg') == null || ja_recs[x].get('jyjg') == '') {
                    ja_recs[x].set('jyjg', 0);
                }
                if (ja_recs[x].get('jyjg') != 1) {
                    Ext.Msg.alert('提示', '所选记录有已经判定过记录，不允许进行批量判定，请用审核功能修改!');
                    return;
                }
            }
            var win = Ext.widget('mng_JudgementAll', {
                itemId: 'up_JudgementAll',
                title: '批量判定',
                rec: ja_recs
            });
            win.show();
        },
        //打开批量审核窗口
        addCheched: function () {
            var me = this;
            var ck_recs = me.grdmain.getSelectionModel().getSelection();
            if (Ext.isEmpty(ck_recs)) {
                Ext.Msg.alert('提示', '请至少选中一条记录');
                return;
            }
            //判断是否为不合格状态
            for (x in ck_recs) {
                if (ck_recs[x].get('jyjg') != 3) {
                    Ext.Msg.alert('提示', '审核时所选记录质检结论必须为不合格!');
                    return;
                }
            }
            var win = Ext.widget('mng_Checked', {
                itemId: 'up_Checked',
                title: '批量审核',
                rec: ck_recs
            });
            win.show();
        },
        //批量判定窗口按钮事件
        doJudgementAllAction: function (btn) {
            var me = this;
            var win_JudgementAll = me.getMngJudgementAll();
            if (btn.action == "BTN_SAVE") {
                var values = me.getMngJudgementAll().getData();
                var zjrq = values.zjrq;
                var jyjg = values.jyjg;
                var zjbz = values.zjbz;
                if (zjrq == null || zjrq == '') {
                    Ext.Msg.alert('提示', '请输入判定日期');
                    return;
                }
                var zjrm = erp.UInfo.currentUser.name;
                var grid = me.getGrdMaterialQuality();
                var recs = grid.getSelectionModel().getSelection();
                var bool = false;
                for (x in recs) {
                    if (recs[x].get('ztbj') != 5 && recs[x].get('ztbj') != 1) {
                        bool = true;
                        Ext.Msg.alert('提示', '到货单号:' + recs[x].get('dhdh') + '到货序号:' + recs[x].get('dhxh') + '已经被判定为' + recs[x].get('ztmc') + '状态，如与主界面不一致，请刷新主界面，如需再判定请先取消判定！');
                        return false;;
                    }
                }
                if (bool) {
                    return;
                }
                Ext.each(recs, function (rec) {
                    if (jyjg != "") {
                        rec.set('jyjg', jyjg);
                    }
                    if (zjbz != "") {
                        rec.set('zjbz', zjbz);
                    }
                    rec.set('zjrm', zjrm);
                    rec.set('zjrq', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                });
                win_JudgementAll.close();
                me.grdStore.sync();
                me.grdStore.reload();
                Ext.Msg.alert('提示', '判定成功!');
            }
        },
        //批量审核窗口按钮事件
        doCheckedAction: function (btn) {
            var me = this;
            var Mngchecked = me.getMngChecked();
            if (btn.action == "BTN_SAVE") {
                var values = me.getMngChecked().getData();
                var zjrq = values.zjrq;
                var jyjg = values.jyjg;
                var shsm = values.shsm;
                if (zjrq == null || zjrq == '') {
                    Ext.Msg.alert('提示', '请输入审核日期');
                    return;
                }
                var shrm = erp.UInfo.currentUser.name;
                var grid = me.getGrdMaterialQuality();
                var recs = grid.getSelectionModel().getSelection();
                var bool = false;
                for (x in recs) {
                    if (recs[x].get('ztbj') != 5) {
                        bool = true;
                        Ext.Msg.alert('提示', '到货单号:' + recs[x].get('ztmc') + '到货序号' + recs[x].get('dhxh') + '已经被判定为' + recs[x].get('ztmc') + '状态，如与主界面不一致，请刷新主界面，如需再判定请先取消判定！');
                        return false;;
                    }
                }
                if (bool) {
                    return;
                }
                Ext.each(recs, function (rec) {
                    if (jyjg != "") {
                        rec.set('jyjg', jyjg);
                    }
                    if (shsm != "") {
                        rec.set('shsm', shsm);
                    }
                    rec.set('shrm', shrm);
                    rec.set('shsj', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                });
                Mngchecked.close();
                me.grdStore.sync();
                me.grdStore.reload();
                Ext.Msg.alert('提示', '审核成功!');
            }
        },
        //打开待判原因窗口
        addJudgmentResion: function () {
            var me = this;
            var rec;
            var rec = me.grdmain.getSelectionModel().getSelection()[0];
            if (Ext.isEmpty(rec)) {
                Ext.Msg.alert('提示', '请先选中一条记录');
                return;
            }
            var win = Ext.widget('mng_waitJudgeReason', {
                itemId: 'wait_JudgeReason',
                title: '待判原因',
                mainview: me.panel,
                rec: rec
            });
            win.loadData(rec);
            win.show();
        },
        //待判原因窗口按钮事件
        doJudgeReasAction: function (btn) {
            var me = this;
            var MngwaitJudgeReason = me.getMngwaitJudgeReason();
            var form = MngwaitJudgeReason.down('#WJRForm');
            var mainview = me.panel;
            var wjrstore = me.grdStore;
            switch (btn.itemId) {
            case 'btn_confirm':
                var rec = form.getRecord();
                form.updateRecord(rec);
                wjrstore.sync();
                mainview.loadMain();
                MngwaitJudgeReason.close();
                break;
            }
        }
});