Ext.define('erp.logManager.view.EditLogManager', {
    extend: 'erp.ux.Window',
    alias: 'widget.win_logManager',
    title: '日志编辑',
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.FormKey',
        'erp.logManager.store.JsLog',
        'erp.logManager.store.TSysLog'
    ],
    width: 1200,
    modal: true,
    initComponent: function() {
        var me = this;
        me.LeadStore = Ext.create('erp.logManager.store.JsLog');
        me.BackStore = Ext.create('erp.logManager.store.TSysLog');
        Ext.apply(me, {
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                itemId: 'EdtPayApplyBar',
                items: [{
                        text: '保存',
                        iconCls: 'page_save',
                        itemId: 'BTN_SAVE'
                    },

                    {
                        text: '退出',
                        iconCls: 'page_error',
                        itemId: 'btn_out',
                        handler: function() {
                            me.close();
                        }
                    }
                ]
            }],
            layout: {
                type: 'vbox', //垂直分布
                align: 'stretch'
            },
            items: [{
                xtype: 'form',
                itemId: 'EdtLeadLog',
                store: me.LeadStore,
                //    		   flex : 1,
                overflowY: 'auto',
                overflowX: 'auto',
                width: 1200,
                height: 300,
                items: [{
                    xtype: 'fieldset',
                    layout: 'column',
                    title: '前端日志',
                    itemId: 'leadingSet',
                    collapsible: true,
                    //					collapsed:true,//默认收缩
                    defaults: {
                        anchor: '90%',
                        padding: '2,0,2,0',
                        labelWidth: 70
                    },
                    margin: 10,
                    padding: 5,
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: '日志编号',
                        itemId: 'logid',
                        name: 'logid',
                        columnWidth: 1 / 4,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: 'URL',
                        itemId: 'url',
                        name: 'url',
                        columnWidth: 1 / 4,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '行数',
                        itemId: 'lineNumber',
                        name: 'lineNumber',
                        columnWidth: 1 / 4,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '列数',
                        itemId: 'columnNumber',
                        name: 'columnNumber',
                        columnWidth: 1 / 4,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: 'IP地址',
                        itemId: 'ip',
                        name: 'ip',
                        columnWidth: 1 / 4,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '登录ID',
                        itemId: 'loginId',
                        name: 'loginId',
                        columnWidth: 1 / 4,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '用户名',
                        itemId: 'name',
                        name: 'name',
                        columnWidth: 1 / 4,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        xtype: 'datefield',
                        fieldLabel: '日志时间',
                        itemId: 'n_date',
                        name: 'n_date',
                        format: 'Y-m-d',
                        columnWidth: 1 / 4,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '错误信息',
                        itemId: 'msg',
                        name: 'msg',
                        columnWidth: 1,
                        xtype: 'textareafield',
                        grow: true,
                        anchor: '100%'
                            //					readOnly : true,
                            //					fieldStyle : 'background:#E6E6E6'	
                    }, {
                        fieldLabel: '错误详情',
                        itemId: 'errorObj',
                        name: 'errorObj',
                        columnWidth: 1,
                        xtype: 'textareafield',
                        grow: true,
                        anchor: '100%'
                            //					readOnly : true,
                            //					fieldStyle : 'background:#E6E6E6'	
                    }]
                }]
            }, {
                xtype: 'form',
                itemId: 'EdtBackEndLog',
                store: me.BackStore,
                //    		   flex : 1,
                overflowY: 'auto',
                overflowX: 'auto',
                items: [{
                    xtype: 'fieldset',
                    layout: 'column',
                    itemId: 'backSet',
                    title: '后端日志',
                    collapsible: true,
                    //					collapsed:true,//默认收缩
                    defaults: {
                        anchor: '90%',
                        padding: '2,0,2,0',
                        labelWidth: 70
                    },
                    margin: 10,
                    padding: 5,
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: '日志编号',
                        itemId: 'logid',
                        name: 'logid',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: 'IP地址',
                        itemId: 'clientip',
                        name: 'clientip',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '登录ID',
                        itemId: 'login_id',
                        name: 'login_id',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: 'mod_id',
                        itemId: 'mod_id',
                        name: 'mod_id',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: 'mod_name',
                        itemId: 'mod_name',
                        name: 'mod_name',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: 's_name',
                        itemId: 's_name',
                        name: 's_name',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        xtype: 'datefield',
                        fieldLabel: '日志时间',
                        itemId: 'logdtm',
                        name: 'logdtm',
                        format: 'Y-m-d',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '路径',
                        itemId: 's_path',
                        name: 's_path',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '方法名称',
                        itemId: 's_method',
                        name: 's_method',
                        columnWidth: 1 / 3,
                        readOnly: true,
                        fieldStyle: 'background:#E6E6E6'
                    }, {
                        fieldLabel: '数据',
                        itemId: 's_data',
                        name: 's_data',
                        columnWidth: 1,
                        xtype: 'textareafield',
                        grow: true,
                        anchor: '100%'
                            //					readOnly : true,
                            //					fieldStyle : 'background:#E6E6E6'	
                    }]
                }]
            }]
        })
        me.callParent(arguments);
        me.loadRec(me.LogRec, me.tabId);
    },
    loadRec: function(LogRec, tabId) {
        var me = this;
        var form1 = me.down('#EdtLeadLog');
        var form2 = me.down('#EdtBackEndLog');
        var leadingSet = form1.down('#leadingSet')
        if (tabId == 'grd_Leading') {
            form1.loadRecord(LogRec);
            form2.hide();
        } else if (tabId == 'grd_backend') {
            form2.loadRecord(LogRec);
            form1.hide();
        }
    }
})