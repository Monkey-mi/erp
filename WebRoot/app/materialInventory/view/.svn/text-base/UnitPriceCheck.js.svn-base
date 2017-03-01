Ext.define('erp.materialInventory.view.UnitPriceCheck', {
    extend: 'erp.ux.Window',
    alias: 'widget.mng_unitPrice',
    requires: ['erp.ux.SelectField'],
    title: '入库单核查',
    width: 1200,
    height: 800,
    modal: true,
    initComponent: function () {
            var me = this;
            me.store = Ext.create('erp.materialInventory.store.UnitPriceCheck');
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
                            header: '仓库名称',
                            width: 100,
                            dataIndex: 'ckmc'
                        }, {
                            header: '入库单号',
                            width: 100,
                            dataIndex: 'rkdh'
                        }, {
                            header: '入库序号',
                            width: 100,
                            dataIndex: 'rkxh'
                        },{
                            header: '入库日期',
                            width: 100,
                            dataIndex: 'rkrq',
                            xtype: 'datecolumn',
                            format: 'Y-m-d H:i:s'
                        }, {
                            header: '厂商名称',
                            width: 100,
                            dataIndex: 'csmc'
                        },{
                            header: '材料货号',
                            width: 100,
                            dataIndex: 'clhh'
                        }, {
                            header: '材料名称',
                            width: 100,
                            dataIndex: 'clmc'
                        }, {
                            header: '单位',
                            width: 50,
                            dataIndex: 'jldw'
                        }, {
                            header: '当前控价',
                            width: 50,
                            dataIndex: 'kzdj'
                        }, {
                            header: '采购控价',
                            width: 100,
                            dataIndex: 'cgkj'
                        }, {
                            header: '采购单价',
                            width: 100,
                            dataIndex: 'cgdj'
                        }, {
                            header: '入库单价',
                            width: 100,
                            dataIndex: 'rkdj'
                        }, {
                            header: '合同号',
                            width: 100,
                            dataIndex: 'hth'
                        }, {
                            header: '票据日期',
                            width: 100,
                            dataIndex: 'pjrq',
                            xtype: 'datecolumn',
                            format: 'Y.m.d'
                        }
                    ],
                    store: me.store
                }]
            });
            me.callParent(arguments);
        },
        loadData: function(unt_rec){
        	var me = this;
        	me.store.load({params:{
        		ckbh: unt_rec.get('ckbh'),
            	rkdh: unt_rec.get('rkdh'),
                rkxh: unt_rec.get('rkxh'),
                rkrq: unt_rec.get('rkrq'),
                csbh: unt_rec.get('csbh'),
                clhh: unt_rec.get('clhh'),
                htbh: unt_rec.get('htbh'),
                htxh: unt_rec.get('htxh'),
                rkdj: unt_rec.get('rkdj'),
                pjrq: unt_rec.get('pjrq'),
                wbbh: unt_rec.get('wbbh'),
                wbdj: unt_rec.get('wbdj'),
                count: 1
        	}});
        },
        loadMain: function () {
            var me = this;
            me.store.loadPage(1, {
                callback: function (records, operation, success) {}
            });
        }
});