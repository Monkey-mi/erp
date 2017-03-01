Ext.define('erp.materialQualityTesting.view.HistoryJudgmentModify', {
    extend: 'erp.ux.Window',
    alias: 'widget.mng_HistoryJudgmentModify',
    title: '备注说明',
    width: 500,
    height: 200,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.FormKey',
        'erp.materialQualityTesting.store.HistoryJudgment'
    ],
    modal: true,
    initComponent: function () {
            var me = this;
            me.hjm_Store = Ext.create('erp.materialQualityTesting.store.HistoryJudgment');
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
                    xtype: 'form',
                    itemId: 'HJMForm',
                    plugins: {
                        ptype: 'FormKey'
                    },
                    store: me.hjm_Store,
                    frame: true,
                    items: [{
                        layout: 'column',
                        pack: 'start',
                        align: 'stretch',
                        defaults: {
                            anchor: '90%',
                            padding: '2,0,2,0',
                            labelWidth: 60
                        },
                        margin: 10,
                        padding: 5,
                        items: [{
                            itemId: 'bzsm',
                            name: 'bzsm',
                            xtype: 'textareafield',
                            columnWidth: 1
                        }]
                    }],
                    buttons: [{
                            text: '确认',
                            glyph: 0xf058,
                            action: 'BTN_SAVE'
                        },
                        '->', {
                            text: '退出',
                            glyph: 0xf057,
                            handler: function () {
                                me.close();
                            }
                        }
                    ]
                }]
            });
            this.callParent(arguments);
        },
        getData: function () {
            var me = this;
            var form = me.down('#HJMForm');
            return form.getValues();
        }
});