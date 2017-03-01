Ext.define('erp.materialQualityTesting.view.Checked', {
    extend: 'erp.ux.Window',
    alias: 'widget.mng_Checked',
    title: '批量审核',
    width: 400,
    height: 260,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.FormKey',
        'erp.materialQualityTesting.store.MaterialQualityManager'
    ],
    modal: true,
    initComponent: function () {
            var me = this;
            var ndate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
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
                    itemId: 'SHForm',
                    plugins: {
                        ptype: 'FormKey'
                    },
                    store: me.store,                   
                    collapsible: false,
                    defaults: {
                        anchor: '100%',
                        labelWidth: 72,
                        margin: '10 5 5 5',
                        columnWidth: 1
                    },
                    margin: 10,
                    padding: 5,
                    items: [{
                        xtype: 'fieldset',
                        autoScroll: true,
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
                            fieldLabel: '审核结论',
                            itemId: 'jyjg',
                            name: 'jyjg',
                            columnWidth: 1,
                            xtype: 'combo',
                            store: [
                                [2, '合格'],
                                [3, '不合格'],
                                [4, '让步接收'],
                                [5, '改为他用']
                            ]
                        }, {
                            fieldLabel: '审核日期',
                            name: 'zjrq',
                            xtype: 'datefield',
                            value: Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.MONTH), "Y-m-d"),
                            format: 'Y年m月d日',
                            renderer : Ext.util.Format.dateRenderer('Y年m月d日'),
                            readonly: true,
                            columnWidth: 1
                        }, {
                            fieldLabel: '审核说明',
                            columnWidth: 1,
                            xtype: 'textareafield',
                            grow: true,
                            itmeId: 'shsm',
                            name: 'shsm'
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
            var form = me.down('#SHForm');
            return form.getValues();
        }
});