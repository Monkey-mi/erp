Ext.define('erp.materialQualityTesting.view.MaterialChooseType', {
    extend: 'erp.ux.Window',
    alias: 'widget.win_MaterialChooseType',
    title: '材料类别选择',
    width: 280,
    height: 630,
    iconCls: 'page_go',
    views: ['erp.materialQualityTesting.view.MaterialChooseType'],
    refs: [{
        ref: 'treepanel',
        selector: 'ChooseMaterialClass treepanel'
    }],
    modal: true,
    initComponent: function () {
            var me = this;
            /*  me.store=Ext.create('erp.master.caterialPricePurchase.store.MaterialClass');*/
            me.treeStore = Ext.create('erp.master.caterialPricePurchase.store.MaterialClass');
            /* me.rec=Ext.create();*/
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
                    /* 	xtype : 'conboxTree',
             	itemId : 'tree_materialClass',
             	fieldLabel : '采购类别',
             	queryMode : 'local',
             	store : me.treeStore,
             	displayField : 'text',
				valueField: 'nodeId'*/
                    split: true,
                    title: '类别',
                    tools: [{
                        type: 'refresh',
                        tooltip: '刷新'
                    }],
                    /* reference:'caterialclass',*/
                    collapsible: true,
                    xtype: 'treepanel',
                    itemId: 'tree_materialClass',
                    name: 'tree_materialClass',
                    width: 200,
                    useArrows: true,
                    store: me.treeStore,
                    listeners: {
                        'itemclick': function (t, rec) {
                            var lbbh = rec.get('nodeId');
                            var czygh = erp.UInfo.currentUser.u_id;
                            me.onSubmit(rec);
                        }
                    }
                }],
                buttons: [{
                    text: '确认',
                    glyph: 0xf058,
                    itemId: 'btn_confirm',
                    handler: function () {
                        var editor = me.field.editor;
                        var cusConfig = me.field.cusConfig;
                        var treepanel = me.getTreepanel();
                        var rec = treepanel.getSelectionModel().getSelection()[0];
                        var lbbh = rec.get('nodeId');
                        me.onSubmit(rec);
                    }
                }, {
                    text: '关闭',
                    glyph: 0xf057,
                    handler: function () {
                        me.close();
                    }
                }]

            });
            this.callParent(arguments);
            /*  me.down('form').loadRecord(me.rec);*/
        },
        onSubmit: function (rec) {
            var me = this;
            var cusConfig = me.field.cusConfig;
            if (cusConfig != null) {
                var field = cusConfig.field;
                var callback = cusConfig.callback;
                if (Ext.isFunction(callback)) {
                    callback(this, rec);
                }
                me.field.setValue(rec.get(field));
            } else {
                me.field.setValue(rec.get('lbbh'));
            }
            me.close();
        }
});