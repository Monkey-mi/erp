Ext.define('erp.materialDistributeAccount.view.MaterialAccoutSearch', {
	extend: 'erp.ux.Window',
    alias: 'widget.MaterialDisAccout_Search',
	iconCls: 'page_find',
    title: '筛选条件',
    frame: true,
    modal: true,
    width: 450,
    height: 400,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.CommonTrigger',
        'erp.ux.SearchCombobox',
        'erp.ux.SelectField',
        'erp.view.master.purchaseDetail.window.MateCombo',
        'erp.master.caterialPricePurchase.store.MaterialClass'
    ],
    resizable: false,
    initComponent: function () {
            var me = this;
            Ext.apply(me, {
            	layout: 'fit',
                overflowY: 'auto',
                items: [{
                    xtype: 'form',
                    frame: true,
                    heigth: 50,
                    layout: 'column',
                    defaults: {
                        padding: 5,
                        xtype: 'textfield',
                        labelWidth: 60,
                        selectOnFocus: true,
                        listeners: {
                            specialkey: function (field, e) {
                                if (e.getKey() == e.ENTER) {
//                                    me.doQuery();
                                	me.getCondition();
                                }
                            }
                        }
                    },
                    items:[
                    {
                            xtype: 'tbtext',
                            text: '基础筛选',
                            columnWidth: 1
                        },
                    { boxLabel: '全部记录',
                            name: 'checkbox_qbjl',
                            inputValue: '1',
                            padding: '0 0 0 5',
                            itemId: 'checkbox_qbjl',
                            xtype: 'checkbox',
                            columnWidth: 1,
                            listeners: {
                            change: function (form, newValue, oldValue, eOpts) {
                                    if (newValue == true) {
                                        me.down('#checkbox_clmc').setValue(false);
                                        me.down('#checkbox_sykc').setValue(false);
                                        me.down('#checkbox_bykc').setValue(false);
                                        me.down('#checkbox_dhsl').setValue(false);                                       
                                    }
                                }
                            }
                        },  
                        {
                            name: 'checkbox_clmc',
                            itemId: 'checkbox_clmc',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '材料名称',                        
                            columnWidth: 0.9,
                            xtype: 'commonTrigger',
							name: 'clmc',
							itemId: 'clmc',
							selModel: 'SINGLE',
							win: 'erp.view.master.purchaseDetail.window.MateCombo',
                            listeners: {
                                'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_clmc').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                            }
                        },{
                            xtype: 'tbtext',
                            text: '扩展筛选',
                            columnWidth: 1
                        },{
                            name: 'checkbox_sykc',
                            itemId: 'checkbox_sykc',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        },{
                            xtype : 'displayfield',
                            id:'x_sykc',
                            value : "未被任何产品BOM表调用的材料，即绝对剩余库存",
                            columnWidth: 0.9
                        } ,{name: 'checkbox_bykc',
                            itemId: 'checkbox_bykc',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        },{
                            xtype : 'displayfield',
                            id:'x_bykc',
                            value : "本月库存大于0",
                            columnWidth: 0.9
                        },{name: 'checkbox_dhsl',
                            itemId: 'checkbox_dhsl',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        },{
                            xtype : 'displayfield',
                            id:'x_dhsl',
                            value : "到货数量大于0",
                            columnWidth: 0.9
                        }
                    ],
                    buttons: [{
                            text: '重置',
                            glyph: 0xf112,
                            itemId: 'btn_reset',
                            handler: function (btn) {
                                var form = me.down('form');
                                form.form.reset();
                                var rec = form.getRecord();
                                form.updateRecord(rec);
                            }
                        },
                        '->', {
                            text: '确认',
                            glyph: 0xf058,
                            itemId: 'btn_confirm',
                            handler:function(){me.getCondition();}
//                            handler: function () {me.doQuery();}
                        }, {
                            text: '关闭',
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
    getCondition : function(btn) {
    		var me = this;
    		var form = me.down('form');
    		form.updateRecord(me.rec);
    		var rec=form.getValues();
    		var strWhere ='';
    		if(rec.checkbox_clmc!=null){
    			strWhere+=" and (view_kchz.clhh = '"+rec.clmc+"' )";
    		}
    		if(rec.checkbox_sykc!=null){
    			strWhere+=" and kcsl>0 and view_kchz.clhh<>'' ";
    		}
    		if(rec.checkbox_bykc!=null){
    			strWhere+=" and kcsl>0 ";
    		}
    		if(rec.x_dhsl!=null){
    			strWhere+=" and (djsl>0 or drsl>0 or dtsl>0) ";
    		}    		
    		if(strWhere==''){
    			delete 	me.mainstore.proxy.extraParams.condition;
    		}else{
    			me.mainstore.proxy.extraParams.condition=strWhere;
    		}
    		me.store.load();
			me.close();
        }
})