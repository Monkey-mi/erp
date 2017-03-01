Ext.define('erp.materialQualityTesting.view.CreateLeadSearch', {
    extend: 'erp.ux.Window',
    alias: 'widget.CreateLead_Search',
    iconCls: 'page_find',
    title: '筛选条件',
    frame: true,
    modal: true,
    width: 400,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.CommonTrigger',
        'erp.ux.SearchCombobox',
        'erp.materialQualityTesting.store.CreateLead',
        'erp.view.master.purchaseDetail.window.MateCombo'
    ],
    height: 260,
    frame: true,
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
                                    me.doQuery();
                                }
                            }
                        }
                    },
                    //基础筛选
                    items: [{
                            xtype: 'tbtext',
                            text: '基础筛选',
                            columnWidth: 1
                        },
                        //全部记录
                        {
                            boxLabel: '全部记录',
                            name: 'checkbox_qbjl',
                            inputValue: '1',
                            padding: '0 0 0 5',
                            itemId: 'checkbox_qbjl',
                            xtype: 'checkbox',
                            columnWidth: 1,
                            listeners: {
                                change: function (form, newValue, oldValue, eOpts) {
                                    if (newValue == true) {
                                        me.down('#checkbox_dhh').setValue(false);
                                        me.down('#checkbox_dhrq').setValue(false);
                                        me.down('#checkbox_hth').setValue(false);
                                        me.down('#checkbox_clmc').setValue(false);
                                    }
                                }
                            }
                        },
                        //到货单号
                        {
                            name: 'checkbox_dhh',
                            itemId: 'checkbox_dhh',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '到货单号',
                            name: 'dhh',                      
                            xtype: 'textfield',
                            columnWidth: 0.9,
                            listeners: {
                                'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_dhh').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
                                            me.doQuery();
                                        }
                                    }
                            }
                        },

                        //到货日期
                        {
                            name: 'checkbox_dhrq',
                            itemId: 'checkbox_dhrq',
                            xtype: 'checkbox',
                            columnWidth: .1
                        }, {
                            fieldLabel: '到货日期',
                            name: 'dhrq1',
                            xtype: 'datefield',
                            columnWidth: .52,
                            listeners: {
                                'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_dhrq').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
                                            me.doQuery();
                                        }
                                    }
                            }
                        }, {
                            fieldLabel: '至',
                            name: 'dhrq2',
                            labelWidth: 20,
                            xtype: 'datefield',
                            columnWidth: .38
                        },
                        //质检单号
                        {
                            name: 'checkbox_hth',
                            itemId: 'checkbox_hth',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '合同号',
                            name: 'hth',
                            xtype: 'textfield',
                            columnWidth: 0.9,
                            listeners: {
                                'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_hth').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
                                            me.doQuery();
                                        }
                                    }
                            }
                        },
                        //材料名称
                        {
                            name: 'checkbox_clmc',
                            itemId: 'checkbox_clmc',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, 
                        {
          		          fieldLabel : '材料名称',
          		           ItemId : 'clmc',
          		           name : 'clmc',
          		           xtype:'commonTrigger',
          		           selModel:'SINGLE',
          			       win:'erp.view.master.purchaseDetail.window.MateCombo',
          		           columnWidth:0.9,
          		           	listeners:{
          							'change':function(obj,value){
          								if(!Ext.isEmpty(value)){
          							  		me.down('#checkbox_clmc').setValue(true);
          								}
          							},
          	                    	specialkey: function(field, e){
          	    	                    if (e.getKey() == e.ENTER) {
          	    	                        me.doQuery();
          	    	                    }
          	    	                }
          						}
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
                            handler: function(){me.doQuery();}
                        }, {
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
        doQuery: function () {
        	var me = this;
        	me.mainstore.load({params:{ ckbh: me.ckbh,csbh: me.csbh,condition:me.getQueryCondition()}});
            me.close();
        },
        getQueryCondition: function () {
            var me = this;
            var condition = null;
            var form = me.down('form');
            if (form.getForm().isDirty()) {
                var rec = form.getRecord();
                form.updateRecord(rec);
                var obj = rec.getChanges();
                var arr = [];
                for (var x in obj) {
                    if (!Ext.isEmpty(obj[x])) {
                        if (x == 'dhh' && obj['checkbox_dhh']) {
                            arr.push("dhh = " + obj[x] + "^ ");//dhh ^作为后台substring截取条件
                        } else if (x == 'hth' && obj['checkbox_hth']) {
                            arr.push("dhdjb_yl.htbh like '%" + obj[x] + "%' ");
                        } else if (x == 'dhrq1' && obj['checkbox_dhrq']) {
                            arr.push("dhdjb_yl.dhrq >= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
                        } else if (x == 'dhrq2' && obj['checkbox_dhrq']) {
                            arr.push("dhdjb_yl.dhrq <= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
                        } else if (x == 'clmc' && obj['checkbox_clmc']) {
                            arr.push("clbmb.clmc like '%" + obj[x] + "%'");
                        }
                    }
                }
                condition = arr.join(' and ');
            }
            condition = ''+condition;
            return condition;
        }
});