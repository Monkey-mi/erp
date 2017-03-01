Ext.define('erp.materialQualityTesting.view.QualityJudgment', {
    extend: 'erp.ux.Window',
    alias: 'widget.mng_QualityJudgment',
    title: '质检判定处理',
    width: 800,
    height: 500,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.FormKey',
        'erp.materialQualityTesting.store.MaterialQualityManager'
    ],
    modal: true,
    initComponent: function () {
            var me = this;
            me.cc_Store = Ext.create('erp.materialQualityTesting.store.MaterialQualityManager');
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
                    itemId: 'QJForm',
                    plugins: {
                        ptype: 'FormKey'
                    },
                    store: me.cc_Store,
                    frame: true,
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
                        title: '送检信息',
                        defaultType: 'textfield',
                        items: [{
                                fieldLabel: '到货号',
                                itemId: 'dhh',
                                name: 'dhh',
                                xtype: 'textfield',
                                columnWidth: .3,
                                readOnly: true,
                                fieldStyle: 'background:#E6E6E6'
                            }, {
                                fieldLabel: '到货日期',
                                itemId: 'dhrq',
                                name: 'dhrq',
                                xtype: 'datefield',
                                format: 'Y年m月d日',
                                renderer : Ext.util.Format.dateRenderer('Y年m月d日'),
                                columnWidth: .4,
                                readOnly: true,
                                fieldStyle: 'background:#E6E6E6'
                            }, {
                                fieldLabel: '材料货号',
                                itemId: 'clhh',
                                name: 'clhh',
                                xtype: 'textfield',
                                columnWidth: .3,
                                readOnly: true,
                                fieldStyle: 'background:#E6E6E6'
                            },

                            {
                                fieldLabel: '材料图号',
                                itemId: 'clth',
                                name: 'clth',
                                xtype: 'textfield',
                                columnWidth: .5,
                                readOnly: true,
                                fieldStyle: 'background:#E6E6E6'
                            }, {
                                fieldLabel: '材料名称',
                                itemId: 'clmc',
                                name: 'clmc',
                                xtype: 'textfield',
                                columnWidth: .5,
                                readOnly: true,
                                fieldStyle: 'background:#E6E6E6'
                            },

                            {
                                fieldLabel: '供应厂商',
                                itemId: 'csmc',
                                name: 'csmc',
                                xtype: 'textfield',
                                columnWidth: .5,
                                readOnly: true,
                                fieldStyle: 'background:#E6E6E6'
                            }, {
                                fieldLabel: '生产批次',
                                itemId: 'pcbh',
                                name: 'pcbh',
                                xtype: 'textfield',
                                columnWidth: .5,
                                readOnly: true,
                                fieldStyle: 'background:#E6E6E6'
                            },

                            {
                                fieldLabel: '备注说明',
                                itemId: 'bzsm',
                                name: 'bzsm',
                                xtype: 'textfield',
                                columnWidth: 1,
                                readOnly: true,
                                fieldStyle: 'background:#E6E6E6'
                            }
                        ]
                    }, {
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
                        title: '质检信息',
                        defaultType: 'textfield',
                        items: [{
                            fieldLabel: '质检结论',
                            itemId: 'jyjg',
                            name: 'jyjg',
                            columnWidth: .3,
                            xtype: 'combo',
                            store: [
                                [0, '请选择(必选项)'],
                                [2, '合格'],
                                [3, '不合格']
                            ],
                            listeners: {
                                'change': function (obj, value) {
                                    var d2 = me.down('#jysl').getValue();
                                    if (value == 2) {
                                        me.down('#hgsl').setValue(d2);
                                    }
                                    if (value == 3) {
                                        me.down('#hgsl').setValue(0);
                                    }
                                }
                            }
                        }, {
                            fieldLabel: '质检单号',
                            itemId: 'zjdh',
                            name: 'zjdh',
                            columnWidth: .4,
                            xtype: 'textfield',
                            readOnly: true,
                            fieldStyle: 'background:#E6E6E6'
                        }, {
                            fieldLabel: '判定日期',
                            itemId: 'zjrq',
                            name: 'zjrq',
                            columnWidth: .3,
                            xtype: 'datefield',
                            format: 'Y年m月d日',
                            renderer : Ext.util.Format.dateRenderer('Y年m月d日'),
                            readOnly: true,
                            fieldStyle: 'background:#E6E6E6'
                        }, {
                            fieldLabel: '到货数量',
                            itemId: 'dhsl',
                            name: 'dhsl',
                            columnWidth: .3,
                            xtype: 'numberfield',
                            readOnly: true,
                            fieldStyle: 'background:#E6E6E6'
                        }, {
                            fieldLabel: '送检数量',
                            itemId: 'jysl',
                            name: 'jysl',
                            columnWidth: .4,
                            xtype: 'numberfield',
                            listeners: {
                                'change': function (obj, value) {
                                    var d1 = me.down('#hgsl').getValue();
                                    me.down('#bhgs').setValue(value - d1);
                                }
                            }
                        }, {
                            fieldLabel: '合格数量',
                            itemId: 'hgsl',
                            name: 'hgsl',
                            columnWidth: .3,
                            xtype: 'numberfield',
                            listeners: {
                                'change': function (obj, value) {
                                    var d2 = me.down('#jysl').getValue();
                                    me.down('#bhgs').setValue(d2 - value);
                                }
                            }
                        }, {
                            fieldLabel: '不合格数',
                            itemId: 'bhgs',
                            name: 'bhgs',
                            columnWidth: 1,
                            xtype: 'numberfield',
                            readOnly: true,
                            fieldStyle: 'background:#E6E6E6'
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
        loadData: function (rec) {
            var me = this;
            var qjform = me.down('#QJForm');
            var dhh = rec.get('dhdh') + '-' + rec.get('dhxh');
            var zjrq = new Date();
            var jysl = rec.get('dhsl');
            var hgsl = rec.get('dhsl');
            var fzsl = rec.get('dhsl') - jysl;
            var qj_rec = Ext.create('erp.materialQualityTesting.model.MaterialQualityManager', {
                dybj: rec.get('dybj'),
                wxbj: rec.get('wxbj'),
                jjbj: rec.get('jjbj'),
                shbj: rec.get('shbj'),
                ckmc: rec.get('ckmc'),
                ztmc: rec.get('ztmc'),
                jlmc: rec.get('jlmc'),
                dhdh: rec.get('dhdh'),
                dhxh: rec.get('dhxh'),
                wtdh: rec.get('wtdh'),
                lbmc: rec.get('lbmc'),
                clhh: rec.get('clhh'),
                clth: rec.get('clth'),
                clmc: rec.get('clmc'),
                cltx1: rec.get('cltx1'),
                cltx2: rec.get('cltx2'),
                cltx3: rec.get('cltx3'),
                jldw: rec.get('jldw'),
                ghpc: rec.get('ghpc'),
                fzdw: rec.get('fzdw'),
                fzsl: rec.get('fzsl'),
                dpyy: rec.get('dpyy'),
                bzsm: rec.get('bzsm'),
                hth: rec.get('hth'),
                wxh: rec.get('wxh'),
                jhh: rec.get('jhh'),
                cpmc: rec.get('cpmc'),
                jhbz: rec.get('jhbz'),
                sxrq: rec.get('sxrq'),
                zzjl: rec.get('zzjl'),
                zjrm: rec.get('zjrm'),
                shrm: rec.get('shrm'),
                shjg: rec.get('shjg'),
                shsm: rec.get('shsm'),
                khmc: rec.get('khmc'),
                khxh: rec.get('khxh'),
                jkrm: rec.get('jkrm'),
                lbbh: rec.get('lbbh'),
                pjrq: rec.get('pjrq'),
                dhdh: rec.get('dhdh'),
                dhxh: rec.get('dhxh'),
                dhrq: rec.get('dhrq'),
                clhh: rec.get('clhh'),
                clth: rec.get('clth'),
                clmc: rec.get('clmc'),
                csbh: rec.get('csbh'),
                csmc: rec.get('csmc'),
                pcbh: rec.get('pcbh'),
                bzsm: rec.get('bzsm'),
                zjdh: rec.get('zjdh'),
                zjbz: rec.get('zjbz'),
                dhsl: rec.get('dhsl'),
                ztbj: rec.get('ztbj'),
                ztmc: rec.get('ztmc'),
                ckbh: rec.get('ckbh'),
                htxh: rec.get('htxh'),
                jhbh: rec.get('jhbh'),
                jhxh: rec.get('jhxh'),
                czym: rec.get('czym'),
                czsj: rec.get('czsj'),
                zjbj: rec.get('zjbj'),
                shdh: rec.get('shdh'),
                htbh: rec.get('htbh'),
                dhh: dhh,
                zjrq: zjrq,
                jysl: jysl,
                hgsl: hgsl,
                fzsl: fzsl,
                bhgs: jysl - hgsl
            });
            qjform.loadRecord(qj_rec);
        },
        getData: function () {
            var me = this;
            var form = me.down('#QJForm');
            return form.getValues();
        }
});