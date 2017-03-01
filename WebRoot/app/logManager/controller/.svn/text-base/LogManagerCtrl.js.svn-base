Ext.define('erp.logManager.controller.LogManagerCtrl', {
    extend: 'Ext.app.Controller',
    requires: [
        'erp.ux.PagingBar',
        'erp.logManager.store.TSysLog',
        'erp.logManager.store.JsLog'
    ],
    views: ['erp.logManager.view.LogManager',
        'erp.logManager.view.EditLogManager'
    ],
    refs: [{
            ref: 'logManager',
            selector: 'logManager'
        }, //主页面
        {
            ref: 'logTab',
            selector: 'logManager #log_tab'
        }, //tab页
        {
            ref: 'logManagerLead',
            selector: 'logManager #grd_Leading'
        }, //前端页Grid
        {
            ref: 'logManagerBackEnd',
            selector: 'logManager #grd_backend'
        }, {
            ref: 'editlogManager',
            selector: 'win_logManager'
        }
    ], //编辑页面
    init: function() {
        // controller只初始化一次
        var me = this;
        //该函数将最先执行，甚至先于 appliction.launch
        if (me.isInited)
            return;
        //处理所有view上面的交互
        me.control({
            'logManager': {
                afterrender: function() {
                    me.panel = me.getLogManager();
                    me.panel.down('#top_bar3').hide();
                    me.grdLead = me.getLogManagerLead();
                    me.grdLeadStore = me.getLogManagerLead().getStore();
                    me.grdBack = me.getLogManagerBackEnd();
                    me.grdBackStore = me.getLogManagerBackEnd().getStore();
                    var logTab = me.getLogTab();
                    var activeTab = logTab.getActiveTab();
                    if (activeTab.itemId == 'grd_Leading') {
                        me.grdLeadStore.load();
                    } else if (activeTab.itemId == 'grd_backend') {
                        me.grdBackStore.load();
                    }

                }
            },
            'logManager #grd_Leading': {
                itemdblclick: function(grid, rec) {
                    var logTab = me.getLogTab();
                    var activeTab = logTab.getActiveTab();
                    me.EditLogAction(rec, activeTab);
                }
            },
            'logManager #grd_backend': {
                itemdblclick: function(grid, rec) {
                    var logTab = me.getLogTab();
                    var activeTab = logTab.getActiveTab();
                    me.EditLogAction(rec, activeTab);
                }
            },
            'logManager #log_tab tab': {
                click: function(button, e, eOpts) {
                    var panel = me.getLogManager();
                    switch (button.title) {
                        case '前端':
                            me.grdLeadStore.proxy.extraParams.condition = null;
                            me.grdLeadStore.load();
                            me.grdBack.getSelectionModel().deselectAll(); //切换时取消选择的record
                            panel.down('#top_bar3').hide();
                            panel.down('#top_bar').show();
                            break;
                        case '后端':
                            me.grdBackStore.proxy.extraParams.condition = null;
                            me.grdBackStore.load();
                            me.grdLead.getSelectionModel().deselectAll(); //切换时取消选择的record
                            panel.down('#top_bar').hide();
                            panel.down('#top_bar3').show();
                            break;
                    }
                }
            },
            'logManager #pllogManager button': {
                click: me.DoAction
            },
            'win_logManager button': {
                click: me.doSaveAction
            }
        })
        this.isInited = true;
    },
    //编辑界面按钮事件
    doSaveAction: function(btn) {
        var me = this;
        var editPanel = me.getEditlogManager();
        var form;
        var store;
        if (editPanel.tabId == 'grd_Leading') {
            form = editPanel.down('#EdtLeadLog');
            //	 	    store = me.grdLeadStore;
        } else if (editPanel.tabId == 'grd_backend') {
            form = editPanel.down('#EdtBackEndLog');
            //	 	    store = me.grdBackStore;
        }
        var rec = form.getRecord();
        form.updateRecord(rec);
        switch (btn.itemId) {
            case 'BTN_SAVE':
                if (form.getForm().isValid() && form.getForm().isDirty()) {
                    Ext.Msg.confirm('提示', '你确定要保存吗?', function(btn) {
                        if (btn == 'yes') {
                            form.store.add(rec);
                            form.store.sync({
                                success: function(e, batch) {
                                    Ext.Msg.alert('提示', '保存成功!');
                                },
                                failure: function(batch, options) {
                                    Ext.Msg.alert('提示', '保存失败!');
                                    return;
                                }
                            });
                        } else {}
                    })

                }
                break;
        }
    },
    //主界面按钮事件
    DoAction: function(btn) {
        var me = this;
        var logTab = me.getLogTab();
        var activeTab = logTab.getActiveTab();
        var grid;
        var store;
        if (activeTab.itemId == 'grd_Leading') {
            grid = me.getLogManagerLead();
            store = me.getLogManagerLead().getStore();
        } else if (activeTab.itemId == 'grd_backend') {
            grid = me.getLogManagerBackEnd();
            store = me.getLogManagerBackEnd().getStore();
        }
        var recs = grid.getSelectionModel().getSelection();

        switch (btn.itemId) {
            case erp.def.Const.FUNC_ITEMID_BTN_EDT:
                var rec = recs[0];
                if (rec.length < 1) {
                    Ext.Msg.alert('提示', '请选择一条记录!');
                    return;
                }
                this.EditLogAction(rec, activeTab);
                break;
            case erp.def.Const.FUNC_ITEMID_BTN_DEL:
                var len = recs.length;
                if (len < 1) {
                    Ext.Msg.alert('提示', '请选择一条或多条记录!');
                    return;
                }
                Ext.Msg.confirm("提醒", "你确定要删除此【 " + len + " 】条记录吗？", function(btn) {
                    if (btn == "yes") {
                        store.remove(recs);
                        store.sync({
                            success: function() {
                                store.load();
                            },
                            failure: function() {
                                Ext.Msg.alert('提示', '删除失败!');
                            }
                        });
                    }
                })
                break;
            case 'btn_search':
                this.doQuery();
                break;
        }
    },
    EditLogAction: function(rec, activeTab) {
        var isEdit = true;
        var win = Ext.widget('win_logManager', {
            xtype: 'win_logManager',
            itemId: 'win_logManager',
            title: '日志详细',
            LogRec: rec,
            isEdit: isEdit,
            tabId: activeTab.itemId,
            closable: true
        });
        win.show();
    },
    doQuery: function() {
        var me = this;
        var logTab = me.getLogTab();
        var activeTab = logTab.getActiveTab();
        var logid = me.panel.down('#search').getValue();
        var condition = "";
        if (activeTab.itemId == 'grd_Leading') {
            if (!Ext.isEmpty(me.panel.down('#search').getValue())) {
                condition += " and logid = " + me.panel.down('#search').getValue();
            }
            if (!Ext.isEmpty(me.panel.down('#qsrq').getValue())) {
                var qsrq = me.panel.down('#qsrq').getValue();
                var s_qsrq = Ext.util.Format.date(qsrq,'Y-m-d H:i:s');
                /*var year = qsrq.getYear() + 1900;
                var month = qsrq.getMonth() + 1;
                var day = qsrq.getDate();
                var ksrq;
                if (month < 10) {
                    ksrq = year + '-0' + month + '-' + day + ' 00:00:00';
                } else {
                    ksrq = year + '-' + month + '-' + day + ' 00:00:00';
                }*/
                condition += " and n_date >= '" + s_qsrq + "'";
            }
            if (!Ext.isEmpty(me.panel.down('#jsrq').getValue())) {
                var jsrq = me.panel.down('#jsrq').getValue();
                var s_jsrq = Ext.util.Format.date(jsrq,'Y-m-d H:i:s');
                /*var year = jsrq.getYear() + 1900;
                var month = jsrq.getMonth() + 1;
                var day = jsrq.getDate();
                var jzrq;
                if (month < 10) {
                    jzrq = year + '-0' + month + '-' + day + ' 23:59:59';
                } else {
                    jzrq = year + '-' + month + '-' + day + ' 23:59:59';
                }*/
                condition += " and n_date <= '" + s_jsrq + "'";
            }
            if (!Ext.isEmpty(me.panel.down('#ip').getValue())) {
                condition += " and ip = '" + me.panel.down('#ip').getValue() + "'";
            }
            if (!Ext.isEmpty(me.panel.down('#loginId').getValue())) {
                condition += " and loginId like '%" + me.panel.down('#loginId').getValue() + "%'";
            }
            if (!Ext.isEmpty(me.panel.down('#name').getValue())) {
                condition += " and name like '%" + me.panel.down('#name').getValue() + "%'";
            }
            me.grdLeadStore.proxy.extraParams.condition = condition;
            me.grdLeadStore.loadPage(1);
        } else if (activeTab.itemId == 'grd_backend') {
            if (!Ext.isEmpty(me.panel.down('#search1').getValue())) {
                condition += " and logid = " + me.panel.down('#search1').getValue();
            }
            if (!Ext.isEmpty(me.panel.down('#qsrq1').getValue())) {
                var qsrq = me.panel.down('#qsrq1').getValue();
                var s_qsrq = Ext.util.Format.date(qsrq,'Y-m-d H:i:s');
                /*var year = qsrq.getYear() + 1900;
                var month = qsrq.getMonth() + 1;
                var day = qsrq.getDate();
                var ksrq;
                if (month < 10) {
                    ksrq = year + '-0' + month + '-' + day + ' 00:00:00';
                } else {
                    ksrq = year + '-' + month + '-' + day + ' 00:00:00';
                }*/
                condition += " and logdtm >= '" + s_qsrq + "'";
            }
            if (!Ext.isEmpty(me.panel.down('#jsrq1').getValue())) {
                var jsrq = me.panel.down('#jsrq1').getValue();
                var s_jsrq = Ext.util.Format.date(jsrq,'Y-m-d H:i:s');
                /*var year = jsrq.getYear() + 1900;
                var month = jsrq.getMonth() + 1;
                var day = jsrq.getDate();
                var jzrq;
                if (month < 10) {
                    jzrq = year + '-0' + month + '-' + day + ' 23:59:59';
                } else {
                    jzrq = year + '-' + month + '-' + day + ' 23:59:59';
                }*/
                condition += " and logdtm <= '" + s_jsrq + "'";
            }
            if (!Ext.isEmpty(me.panel.down('#ip1').getValue())) {
                condition += " and clientip = '" + me.panel.down('#ip1').getValue() + "'";
            }
            if (!Ext.isEmpty(me.panel.down('#loginId1').getValue())) {
                condition += " and login_id like '%" + me.panel.down('#loginId1').getValue() + "%'";
            }
            if (!Ext.isEmpty(me.panel.down('#s_method').getValue())) {
                condition += " and s_method like '%" + me.panel.down('#s_method').getValue() + "%'";
            }
            me.grdBackStore.proxy.extraParams.condition = condition;
            me.grdBackStore.loadPage(1);
        }
    }
})