Ext.define('erp.materialQualityTesting.view.CreateLead', {
    extend: 'erp.ux.Window',
    alias: 'widget.mng_lead',
    requires: ['erp.ux.SelectField'],
    title: '导入',
    width: 1200,
    height: 800,
    modal: true,
    initComponent: function () {
            var me = this;
            Ext.apply(me.store.proxy.extraParams, {
                csbh: me.csbh,
                ckbh: me.ckbh,
                usePaging: true
            });
            Ext.apply(me, {
                layout: {
                    type: 'border',
                    padding: 2
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'function_btn',
                    items: [{
                        text: '确定',
                        glyph: 0xf058,
                        itemId: 'btn_confirm'
                    }, {
                        text: '筛选',
                        iconCls: 'page_find',
                        itemId: 'btn_query'
                    }, {
                        text: '退出',
                        iconCls: '',
                        itemId: 'btn_out',
                        handler: function () {
                            me.close();
                        }
                    }]
                }],
                items: [{
                    flex: 1,
                    region: 'center',
                    xtype: 'grid',
                    itemId: 'grd_Lead',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    selModel: Ext.create('Ext.selection.CheckboxModel'),
                    dockedItems: [{
                        xtype: 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
                        store: me.store,
                        dock: 'bottom',
                        defaultPageSize: 50,
                        displayInfo: true
                    }],
                    features: [{
                        ftype: 'summary',
                        summaryType: 'count',
                        dock: 'bottom'
                    }],
                    columns: [{
                            header: '加急',
                            width: 50,
                            dataIndex: 'jjbj',
                            renderer: function (jjbj) {
                                    if (jjbj == "true" || jjbj == "1") {
                                        return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
                                    } else {
                                        return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}'  />";
                                    }
                                },
                                sumaryType: 'count',
                            summaryRenderer: function (value, summaryData, dataIndex) {
                                return '合计';
                            }
                        }, {
                            header: '外协',
                            width: 50,
                            dataIndex: 'wxbj',
                            renderer: function (wxbj) {
                                if (wxbj == "true" || wxbj == "1") {
                                    return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
                                } else {
                                    return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}'  />";
                                }
                            }
                        }, {
                            header: '到货号',
                            width: 100,
                            dataIndex: 'dhh'
                        }, {
                            header: '合同号',
                            width: 100,
                            dataIndex: 'hth'
                        }, {
                            header: '到货日期',
                            width: 100,
                            dataIndex: 'dhrq',
                            xtype: 'datecolumn',
                            format: 'Y-m-d H:i:s'
                        }, {
                            header: '供应厂商',
                            width: 100,
                            dataIndex: 'csmc'
                        }, //
                        {
                            header: '生产单号',
                            width: 100,
                            dataIndex: 'jhbz'
                        }, {
                            header: '材料货号',
                            width: 100,
                            dataIndex: 'clhh'
                        }, {
                            header: '材料名称',
                            width: 100,
                            dataIndex: 'clmc'
                        }, {
                            header: '材料特性1',
                            width: 100,
                            dataIndex: 'cltx1',
                            hideable: false,
                            hidden: true
                        }, {
                            header: '材料特性2',
                            width: 100,
                            dataIndex: 'cltx2',
                            hideable: false,
                            hidden: true
                        }, {
                            header: '材料特性3',
                            width: 100,
                            dataIndex: 'cltx3',
                            hideable: false,
                            hidden: true
                        }, {
                            header: '主产品名称',
                            width: 100,
                            dataIndex: 'zcpmc'
                        }, {
                            header: '单位',
                            width: 50,
                            dataIndex: 'jldw'
                        }, {
                            header: '生产批次',
                            width: 100,
                            dataIndex: 'pcbh'
                        }, {
                            header: '供货批次',
                            width: 100,
                            dataIndex: 'ghpc'
                        }, {
                            header: '到货数量',
                            width: 100,
                            dataIndex: 'dhsl',
                            summaryType: 'sum',
                            summaryRenderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000');
                                },
                                renderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000');
                                },
                                renderer: function (v) {
                                    if (v == 0) {
                                        return ' ';
                                    } else {
                                        return v;
                                    }
                                }
                        }, {
                            header: '已入数量',
                            width: 100,
                            dataIndex: 'yrsl',
                            summaryType: 'sum',
                            summaryRenderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000');
                                },
                                renderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000');
                                },
                                renderer: function (v) {
                                    if (v == 0) {
                                        return ' ';
                                    } else {
                                        return v;
                                    }
                                }
                        }, {
                            header: '未入数量',
                            width: 100,
                            dataIndex: 'wrsl',
                            summaryType: 'sum',
                            summaryRenderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000');
                                },
                                renderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000');
                                },
                                renderer: function (v) {
                                    if (v == 0) {
                                        return ' ';
                                    } else {
                                        return v;
                                    }
                                }
                        }, {
                            header: '送货单号',
                            width: 100,
                            dataIndex: 'shdh'
                        }, {
                            header: '交库人',
                            width: 100,
                            dataIndex: 'jkrm'
                        }
                    ],
                    store: me.store
                }]
            });
            me.callParent(arguments);
        },
        loadMain: function () {
            var me = this;
            me.store.loadPage(1, {
                callback: function (records, operation, success) {}
            });
        }
});