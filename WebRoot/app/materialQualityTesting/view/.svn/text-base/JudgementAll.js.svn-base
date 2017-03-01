Ext.define('erp.materialQualityTesting.view.JudgementAll', {
    extend: 'erp.ux.Window',
    alias: 'widget.mng_JudgementAll',
    title: '批量判定',
    width: 400,
    height: 270,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.FormKey',
        'erp.materialQualityTesting.store.MaterialQualityManager'
    ],
    modal: true,
    initComponent: function () {
            var me = this;
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
                    itemId: 'JAForm',
                    plugins: {
                        ptype: 'FormKey'
                    },
                    store: me.store,
                    frame: true,
                    defaults: {
                        anchor: '100%',
                        labelWidth: 72,
                        margin: '5 5 5 5',
                        columnWidth: 1
                    },
                    items: [{
                        xtype: 'fieldset',   
                        layout: 'column',
                        collapsible: false,
                        defaults: {
                            anchor: '90%',
                            padding: '2,0,2,0',
                            labelWidth: 60
                        },
                        margin: 10,
                        padding: 5,
                        items: [{
                            fieldLabel: '质检结论',                            
                            itemId: 'jyjg',
                            name: 'jyjg',
                            columnWidth: 1,
                            xtype: 'combo',
                            store: [
                                [2, '合格'],
                                [3, '不合格']
                            ]
                        }, {
                            fieldLabel: '判定日期',                          
                            name: 'zjrq',
                            xtype: 'datefield',
                            value: Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.MONTH), "Y-m-d"),
                            format: 'Y年m月d日',
                            renderer : Ext.util.Format.dateRenderer('Y年m月d日'),
                            readonly: true,
                            columnWidth: 1
                        }, {                            
                            fieldLabel: '质检备注',
                            columnWidth: 1,
                            xtype: 'textareafield',
                            grow: true,
                            itmeId: 'zjbz',
                            name: 'zjbz'
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
            var form = me.down('#JAForm');
            return form.getValues();
        }
});