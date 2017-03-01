Ext.define('erp.materialQualityTesting.view.HistoryJudgment', {
    extend: 'erp.ux.Window',
    alias: 'widget.mng_HistoryJudgment',
    requires: ['erp.ux.SelectField'],
    title: '历史判定',
    width: 1200,
    height: 800,
    modal: true,
    initComponent: function () {
            var me = this;
            Ext.apply(me.store.proxy.extraParams, {
                qsrq: me.qsrq,
                jsrq: me.jsrq,
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
                        text: '取消判定',
                        iconCls: 'page_delete',
                        itemId: 'btn_cancel'
                    }, {
                        text: '修改',
                        iconCls: 'page_edit',
                        itemId: 'btn_modify'
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
                    itemId: 'grd_HistoryJudgment',
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
                            header: '打印',
                            width: 40,
                            dataIndex: 'dybj',
                            renderer: function (dybj) {
                                    if (dybj == "true" || dybj == "1") {
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
                            width: 40,
                            dataIndex: 'wxbj',
                            renderer: function (wxbj) {
                                if (wxbj == "true" || wxbj == "1") {
                                    return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
                                } else {
                                    return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}'  />";
                                }
                            }
                        }, {
                            header: '加急',
                            width: 40,
                            dataIndex: 'jjbj',
                            renderer: function (jjbj) {
                                if (jjbj == "true" || jjbj == "1") {
                                    return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
                                } else {
                                    return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}'  />";
                                }
                            }
                        }, {
                            header: '仓库名称',
                            width: 100,
                            dataIndex: 'ckmc'
                        }, 
                        {
                            header: '状态',
                            width: 100,
                            dataIndex: 'ztmc'
                        }, 
                        {
                            header: '质检结论',
                            width: 100,
                            dataIndex: 'jlmc'
                        }, 
                        {
                            header: '到货单号',
                            width: 100,
                            dataIndex: 'dhdh'
                        }, {
                            header: '序号',
                            width: 100,
                            dataIndex: 'dhxh'
                        }, {
                            header: '委托单号',
                            width: 100,
                            dataIndex: 'wtdh'
                        }, {
                            header: '到货日期',
                            width: 100,
                            dataIndex: 'dhrq',
                            xtype: 'datecolumn',
                            format: 'Y-m-d H:i:s'
                        }, {
                            header: '类别名称',
                            width: 100,
                            dataIndex: 'lbmc'
                        }, {
                            header: '材料货号',
                            width: 100,
                            dataIndex: 'clhh'
                        }, {
                            header: '材料图号',
                            width: 100,
                            dataIndex: 'clth'
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
                            header: '辅助单位',
                            width: 50,
                            dataIndex: 'fzdw'
                        }, {
                            header: '辅助数量',
                            width: 100,
                            dataIndex: 'fzsl',
                            renderer: function (v) {
                                    return Ext.util.Format.number(v, '0,000.00');
                                },
                                summaryType: 'sum',
                            summaryRenderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000.00');
                                },
                                renderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                        }, {
                            header: '待判原因',
                            width: 100,
                            dataIndex: 'dpyy'
                        }, {
                            header: '质检备注',
                            width: 100,
                            dataIndex: 'zjbz'
                        }, {
                            header: '备注说明',
                            width: 100,
                            dataIndex: 'bzsm'
                        }, {
                            header: '供应厂商',
                            width: 100,
                            dataIndex: 'csmc'
                        }, 
                        {
                            header: '合同号',
                            width: 100,
                            dataIndex: 'hth'
                        }, {
                            header: '外协号',
                            width: 100,
                            dataIndex: 'wxh'
                        }, {
                            header: '计划号',
                            width: 100,
                            dataIndex: 'jhh'
                        }, {
                            header: '产品名称',
                            width: 100,
                            dataIndex: 'cpmc'
                        }, 
                        {
                            header: '主产品名称',
                            width: 100,
                            dataIndex: 'zcpmc'
                        }, {
                            header: '生产单号',
                            width: 100,
                            dataIndex: 'jhbz'
                        }, {
                            header: '上线日期',
                            width: 100,
                            dataIndex: 'sxrq',
                            xtype: 'datecolumn',
                            format: 'Y-m-d H:i:s'
                        }, {
                            header: '最终结论',
                            width: 100,
                            dataIndex: 'zzjl'
                        }, {
                            header: '质检单号',
                            width: 100,
                            dataIndex: 'zjdh'
                        }, {
                            header: '判定人',
                            width: 100,
                            dataIndex: 'zjrm'
                        }, {
                            header: '判定日期',
                            width: 100,
                            dataIndex: 'zjrq',
                            xtype: 'datecolumn',
                            format: 'Y-m-d H:i:s'
                        }, {
                            header: '审核人',
                            width: 100,
                            dataIndex: 'shrm'
                        }, {
                            header: '审核时间',
                            width: 100,
                            dataIndex: 'shsj',
                            xtype: 'datecolumn',
                            format: 'Y-m-d H:i:s'
                        }, {
                            header: '审核结果',
                            width: 100,
                            dataIndex: 'shjg'
                        }, {
                            header: '审核说明',
                            width: 100,
                            dataIndex: 'shsm'
                        }, {
                            header: '客户名称',
                            width: 100,
                            dataIndex: 'khmc'
                        }, 
                        {
                            header: '客户型号',
                            width: 100,
                            dataIndex: 'khxh'
                        }, {
                            header: '交库人名',
                            width: 100,
                            dataIndex: 'jkrm'
                        }, {
                            header: '材料类别',
                            width: 100,
                            dataIndex: 'lbbh',
                            hideable: false,
                            hidden: true
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