Ext.define('erp.logManager.view.LogManager', {
    extend: 'erp.ux.Panel',
    alias: 'widget.logManager',
    autoScroll: 'true',
    listeners: {
        'close': function(cmp) {
            cmp.destroy();
        }
    },
    initComponent: function() {
        var me = this;
        me.syStore = Ext.create('erp.logManager.store.TSysLog');
        me.jsStore = Ext.create('erp.logManager.store.JsLog');
        Ext.apply(me, {
            items: [{
                xtype: 'panel',
                itemId: 'pllogManager',
                layout: {
                    type: 'border'
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'top_bar2',
                    margin: '0 20 0 0',
                    items: [{
                            text: '<font color="red">' + '修改' + '</font>',
                            iconCls: 'page_edit',
                            itemId: erp.def.Const.FUNC_ITEMID_BTN_EDT,
                            disabled: true
                        }, {
                            text: '<font color="red">' + '删除' + '</font>',
                            iconCls: 'page_delete',
                            itemId: erp.def.Const.FUNC_ITEMID_BTN_DEL,
                            disabled: true,
                            margin: '0 30 0 0'
                        },
                        //   	  		   		     "-",
                        //   	  		   		    {text:'筛选',iconCls:'page_find',itemId:'btn_queryMore'},
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            itemId: 'top_bar',
                            items: [{
                                    xtype: 'textfield',
                                    itemId: 'search',
                                    fieldLabel: '快速查询',
                                    emptyText: '日志ID搜索...',
                                    enableKeyEvents: true,
                                    labelWidth: 60,
                                    width: 200
                                }, {
                                    xtype: 'datefield',
                                    itemId: 'qsrq',
                                    fieldLabel: '日志时间',
                                    value: new Date(),
                                    format: 'Y-m-d H:i:s',
                                    labelWidth: 60,
                                    width: 220
                                }, {
                                    fieldLabel: '至',
                                    itemId: 'jsrq',
                                    format: 'Y-m-d H:i:s',
                                    value: new Date(),
                                    labelWidth: 20,
                                    xtype: 'datefield',
                                    width: 180
                                },
                                "-", {
                                    fieldLabel: 'IP地址',
                                    itemId: 'ip',
                                    labelWidth: 60,
                                    xtype: 'textfield',
                                    width: 160
                                }, {
                                    fieldLabel: '登录ID',
                                    itemId: 'loginId',
                                    labelWidth: 60,
                                    xtype: 'textfield',
                                    width: 160
                                }, {
                                    fieldLabel: '用户名',
                                    itemId: 'name',
                                    labelWidth: 60,
                                    xtype: 'textfield',
                                    width: 160
                                }, {
                                    text: '<font color="red">' + '查询' + '</font>',
                                    glyph: 0xf002,
                                    itemId: 'btn_search'
                                }
                            ]
                        }, {
                            xtype: 'toolbar',
                            dock: 'top',
                            itemId: 'top_bar3',
                            items: [{
                                    xtype: 'textfield',
                                    itemId: 'search1',
                                    fieldLabel: '快速查询',
                                    emptyText: '日志ID搜索...',
                                    enableKeyEvents: true,
                                    labelWidth: 60,
                                    width: 200
                                }, {
                                    xtype: 'datefield',
                                    itemId: 'qsrq1',
                                    fieldLabel: '日志时间',
                                    value: new Date(),
                                    format: 'Y-m-d H:i:s',
                                    labelWidth: 60,
                                    width: 200
                                }, {
                                    fieldLabel: '至',
                                    itemId: 'jsrq1',
                                    format: 'Y-m-d H:i:s',
                                    value: new Date(),
                                    labelWidth: 20,
                                    xtype: 'datefield',
                                    width: 160
                                },
                                "-", {
                                    fieldLabel: 'IP地址',
                                    itemId: 'ip1',
                                    labelWidth: 60,
                                    xtype: 'textfield',
                                    width: 160
                                }, {
                                    fieldLabel: '登录ID',
                                    itemId: 'loginId1',
                                    labelWidth: 60,
                                    xtype: 'textfield',
                                    width: 160
                                }, {
                                    fieldLabel: '方法名称',
                                    itemId: 's_method',
                                    labelWidth: 60,
                                    xtype: 'textfield',
                                    width: 160
                                }, {
                                    text: '<font color="red">' + '查询' + '</font>',
                                    glyph: 0xf002,
                                    itemId: 'btn_search'
                                }
                            ]
                        }
                    ]
                }],
                items: [
                    /*{
                                title: '筛选',
                                region:'west',
                                floatable: false,
                                collapsible: true,
                                split: true,
                                bodyPadding: 10,
                                margin: '5 0 0 0',
                                width: 125,
                                minWidth: 100,
                                maxWidth: 250,
                                html: '<p>Secondary content like navigation links could go here</p>'
                                },*/
                    {
                        xtype: 'tabpanel',
                        itemId: 'log_tab',
                        region: 'center',
                        autoScroll: 'true',
                        items: [{
                            xtype: 'grid',
                            region: 'center',
                            itemId: 'grd_Leading',
                            store: me.jsStore,
                            title: '前端',
                            //			   	  	  	flex:3,
                            listeners: {
                                selectionchange: function(m, recs) {
                                    if (recs.length > 0) {
                                        me.setBtnStatus(false);
                                    } else {
                                        me.setBtnStatus(true);
                                    }
                                }
                            },
                            selModel: Ext.create('Ext.selection.CheckboxModel'),
                            dockedItems: [{
                                xtype: 'pagingbar',
                                stateId: '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
                                store: me.jsStore,
                                dock: 'bottom',
                                displayInfo: true,
                                defaultPageSize: 50
                            }],
                            columns: [{
                                header: '日志ID',
                                dataIndex: 'logid',
                                align: 'center',
                                width: 60
                            }, {
                                header: '错误信息',
                                dataIndex: 'msg',
                                align: 'center',
                                width: 400
                            }, {
                                header: 'URL',
                                dataIndex: 'url',
                                align: 'center',
                                width: 450
                            }, {
                                header: '行数',
                                dataIndex: 'lineNumber',
                                align: 'center',
                                width: 80
                            }, {
                                header: '列数',
                                dataIndex: 'columnNumber',
                                align: 'center',
                                width: 80
                            }, {
                                header: '错误详情',
                                dataIndex: 'errorObj',
                                align: 'center',
                                width: 400
                            }, {
                                header: 'IP',
                                dataIndex: 'ip',
                                align: 'center',
                                width: 80
                            }, {
                                header: '登录ID',
                                dataIndex: 'loginId',
                                align: 'center',
                                width: 80
                            }, {
                                header: '用户名',
                                dataIndex: 'name',
                                align: 'center',
                                width: 80
                            }, {
                                header: '日志时间',
                                dataIndex: 'n_date',
                                align: 'center',
                                width: 160,
                                xtype: 'datecolumn',
                                format: 'Y-m-d H:i:s'
                            }]
                        }, {
                            xtype: 'grid',
                            itemId: 'grd_backend',
                            region: 'center',
                            autoScroll: 'true',
                            store: me.syStore,
                            title: '后端',
                            listeners: {
                                selectionchange: function(m, recs) {
                                    if (recs.length > 0) {
                                        me.setBtnStatus(false);
                                    } else {
                                        me.setBtnStatus(true);
                                    }
                                }
                            },
                            selModel: Ext.create('Ext.selection.CheckboxModel'),
                            dockedItems: [{
                                xtype: 'pagingbar',
                                stateId: '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
                                store: me.syStore,
                                dock: 'bottom',
                                displayInfo: true,
                                defaultPageSize: 50
                            }],
                            columns: [{
                                header: '日志ID',
                                dataIndex: 'logid',
                                align: 'center',
                                width: 60
                            }, {
                                header: '日志时间',
                                dataIndex: 'logdtm',
                                align: 'center',
                                width: 160,
                                xtype: 'datecolumn',
                                format: 'Y-m-d H:i:s'
                            }, {
                                header: 'IP',
                                dataIndex: 'clientip',
                                align: 'center',
                                width: 100
                            }, {
                                header: '登录ID',
                                dataIndex: 'login_id',
                                align: 'center',
                                width: 100
                            }, {
                                header: 'mod_id',
                                dataIndex: 'mod_id',
                                align: 'center',
                                width: 100
                            }, {
                                header: 'mod_name',
                                dataIndex: 'mod_name',
                                align: 'center',
                                width: 100
                            }, {
                                header: 's_name',
                                dataIndex: 's_name',
                                align: 'center',
                                width: 100
                            }, {
                                header: '路径',
                                dataIndex: 's_path',
                                align: 'center',
                                width: 250
                            }, {
                                header: '方法名称',
                                dataIndex: 's_method',
                                align: 'center',
                                width: 100
                            }, {
                                header: '数据',
                                dataIndex: 's_data',
                                align: 'center',
                                width: 400
                            }]
                        }]
                    }
                ]
            }]

        })
        me.callParent(arguments);
    },
    /* 修改按钮状态*/
    setBtnStatus: function(sts) {
        var me = this;
        me.down('#BTN_EDT').setDisabled(sts);
        me.down('#BTN_DEL').setDisabled(sts);
    }
})