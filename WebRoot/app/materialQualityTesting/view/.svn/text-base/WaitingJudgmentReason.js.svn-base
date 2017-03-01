Ext.define('erp.materialQualityTesting.view.WaitingJudgmentReason', {
    extend: 'erp.ux.Window',
    alias: 'widget.mng_waitJudgeReason',
    title: '待判原因',
    frame: true,
    modal: true,
    width: 400,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.materialQualityTesting.store.MaterialQualityManager'
    ],
    height: 200,
    frame: true, //True 为 Panel 填充画面,默认为false.
    resizable: false, //默认指定为'true'来适应这个组件渲染之后Resizer,也可以指定一个配置对象被传递到覆盖任何默认的构造函数 默认情况下,组件的最大化,最小化使用 'false'
    initComponent: function () {
            var me = this;
            Ext.apply(me, {
                layout: 'fit',
                overflowY: 'auto',
                items: [{
                    xtype: 'form',
                    frame: true,
                    itemId: 'WJRForm',
                    heigth: 190,
                    defaults: {
                        padding: 5,
                        xtype: 'textfield'
                    },
                    
                        items: [{
                            flex: 1,
                            xtype: 'textareafield',
                            grow: true,
                            anchor: '100%',
                            itmeId: 'dpyy',
                            name: 'dpyy'
                       
                    }],
                    buttons: [{
                            text: '确认',
                            glyph: 0xf058,
                            itemId: 'btn_confirm'
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
            me.down('form').loadRecord(me.rec);
        },
        loadData: function (rec) {
            var me = this;
            var wjrform = me.down('#WJRForm');
            wjrform.loadRecord(rec);
        }
});