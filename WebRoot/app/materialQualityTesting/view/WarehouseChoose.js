Ext.define('erp.materialQualityTesting.view.WarehouseChoose', {
    extend: 'erp.ux.Window',
    alias: 'widget.win_WarehouseChoose',
    requires: ['erp.materialQualityTesting.view.MaterialQualityManager',
        'erp.ux.FormKey',
        'erp.common.basic.view.field.HelpField',
        'erp.materialQualityTesting.model.Ckmc'
    ],
    title: '仓库选择',
    width: 300,
    height: 120,
    iconCls: 'page_go',
    modal: true,
    initComponent: function () {
            var me = this;
            var czyh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;//工号
            var ckStore = Ext.create('erp.materialQualityTesting.store.Ckmc').load({params:{czyh:czyh}});
            me.rec = Ext.create('erp.materialQualityTesting.model.Ckmc');
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
                    itemId: 'WarehouseChooseForm',
                    xtype: 'form',
                    plugins: {
                        ptype: 'FormKey'
                    },
                    store: me.store,
                    layout: {
                        type: 'column',
                        pack: 'start',
                        align: 'stretch'
                    },
                    defaults: {
                        anchor: '95%',
                        labelWidth: 72,
                        margin: '5 5 5 5',
                        columnWidth: 1
                    },
                    items: [{
                        fieldLabel: '仓库名称',
                        itemId: 'ckbh',
                        name: 'ckbh',
                        columnWidth: 1,
                        xtype: 'combo',
                        queryMode : 'local',//ComboBox加载本地数据
						allowBlank:false,
						selectOnFocus:true,//true当表单项获得输入焦点时，将会自动选中所有存在的表单项文本
						fieldConfig:{forceSelection:true},//forceSelection 所选择的值限制在一个列表中的值,false时，允许用户设置任意的文本字段
						store : ckStore,
                        displayField: 'ckmc',
                        valueField: 'ckbh'
                    }],
                    buttons: [{
                        text: '确认',
                        glyph: 0xf058,
                        itemId: 'btn_confirm',
                        handler: me.doMaterialQuality
                    }, '->', {
                        text: '关闭',
                        glyph: 0xf057,
                        handler: function () {
                            me.close();
                        }
                    }]
                }]
            });
            this.callParent(arguments);
            me.down('form').loadRecord(me.rec);
        },
        doMaterialQuality: function () {
            var form = me.down('form');
            var rec = form.getRecord();
            form.updateRecord(rec);
            var ckbh = rec.get('ckbh');
            var czyh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;//工号
		     //仓库权限	     
		     var count = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCkCountMaterialTest',{czyh:czyh,ckbh:ckbh});
		     if(count==0){
		    	 Ext.Msg.alert('提示','没有该仓库管理权限！');
		    	 me.close();
		    	 return;
		     }
            var store = Ext.create('erp.materialQualityTesting.store.MaterialQualityManagerBufferrd');
            me.close();
            var panel = erp.Util.addContentTab({
                xtype: 'mng_MaterialQuality',
                itemId: 'Material_Quality',
                title: '材料入库质检判定',
                store: store.load({
                    params: {
                        ckbh: ckbh,
                        usePaging: true
                    }
                }),
                ckbh: ckbh,
                closable: true
            });
        }
});