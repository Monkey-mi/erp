Ext.define('erp.materialQualityTesting.view.HistoryJudgmentTime', {
    extend: 'erp.ux.Window',
    alias: 'widget.win_HistoryJudgmentTime',
    requires: ['erp.materialQualityTesting.view.HistoryJudgment',
        'erp.materialQualityTesting.store.HistoryJudgment',
        'erp.ux.FormKey',
        'erp.materialQualityTesting.model.TimeQueryParam'
    ],
    title: '起止日期',
    width: 320,
    height: 160,
    iconCls: 'page_go',
    modal: true,
    initComponent: function () {
            var me = this;
            me.rec = Ext.create('erp.materialQualityTesting.model.TimeQueryParam');
            var date = new Date();
            date.setDate(01);   
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
                        value: date,
                        format: 'Y年m月d日',
                        renderer: Ext.util.Format.dateRenderer('Y年m月d日')
                    }, {
                        fieldLabel: '截止日期',
                        name: 'jsrq',
                        itemId: 'jsrq',
                        xtype: 'datefield',
                        columnWidth: 1,
                        value: new Date(),
                        format: 'Y年m月d日',
                        renderer: Ext.util.Format.dateRenderer('Y年m月d日')
                    }],
                    buttons: [{
                        text: '确认',
                        glyph: 0xf058,
                        itemId: 'btn_confirm',
                        handler: me.doPurchaseCost
                    }, '->', {
                        text: '关闭',
                        glyph: 0xf057,
                        handler: function () {
                            me.close();
                        }
                    }]
                }]
            });
            this.callParent(arguments);
        },
        loadData: function (rec) {
            var me = this;
            var hjform = me.down('form');
            hjform.loadRecord(rec);
        },
        doPurchaseCost: function () {
            var form = me.down('form');
            var rec = form.getRecord();
            form.updateRecord(rec);
            var qsrq = rec.get('qsrq');
            var jsrq = rec.get('jsrq');
            var ckbh = rec.get('ckbh');
            var czyh = erp.UInfo.currentUser.u_id;
            var store = Ext.create('erp.materialQualityTesting.store.MaterialQualityManager');
            me.close();
            var win = Ext.widget('mng_HistoryJudgment', {
                itemId: 'mngHistoryJudgment',
                title: '历史判定',
                store: store.load({
                    params: {
                        qsrq: qsrq,
                        jsrq: jsrq,
                        ckbh: ckbh,
                        usePaging: true
                    }
                }),
                ckbh: ckbh,
                qsrq: qsrq,
                jsrq: jsrq,
                closable: true
            });
            win.show();
        }
});