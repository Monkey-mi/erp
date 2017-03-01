Ext.define('erp.materialInventory.view.MaterialInventoryQuery', {
    extend: 'erp.ux.Window',
    alias: 'widget.MaterialInventory_Search',
    iconCls: 'page_find',
    title: '材料入库单管理筛选条件',
    frame: true,
    modal: true,
    width: 460,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.CommonTrigger',
        'erp.ux.SearchCombobox',
        'erp.ux.SelectField',
        'erp.materialInventory.store.MaterialInventoryManager',
        'erp.materialInventory.store.MaterialInventoryManagerBufferrd',
        'erp.master.prematerial.store.Companyname',
        'erp.materialQualityTesting.store.Ckmc',
        'erp.view.master.purchaseDetail.window.MateCombo',
        'erp.master.caterialPricePurchase.store.MaterialClass',
        'erp.materialQualityTesting.view.MaterialName',
        'erp.materialInventory.store.Rklb'
    ],
    height: 680,
    frame: true,
    resizable: false,
    initComponent: function () {
            var me = this;
            var date = new Date();
            date.setDate(01);
            me.csStore = Ext.create('erp.master.prematerial.store.Companyname');
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
                                        me.down('#checkbox_rkdh').setValue(false);
                                        me.down('#checkbox_rkrq').setValue(false);
                                        me.down('#checkbox_csbh').setValue(false);
                                        me.down('#checkbox_clmc').setValue(false);
                                        me.down('#checkbox_csbh').setValue(false);
                                        me.down('#checkbox_htbh').setValue(false);
                                        me.down('#checkbox_dhdh').setValue(false);
                                        me.down('#checkbox_rklb').setValue(false);
                                        me.down('#checkbox_wgbj').setValue(false);
                                        me.down('#checkbox_hwbh').setValue(false);
                                        me.down('#checkbox_pcbh').setValue(false);                                        
                                        me.down('#checkbox_jhh').setValue(false);
                                        me.down('#checkbox_zzrq').setValue(false);
                                        me.down('#checkbox_bzsm').setValue(false);
                                        me.down('#checkbox_ycrk').setValue(false);
                                    }
                                }
                            }
                        },
                        //入库单号
                        {
                            name: 'checkbox_rkdh',
                            itemId: 'checkbox_rkdh',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '入库单号',
                            name: 'rkdh1',
                            xtype: 'numberfield',
                            columnWidth: 0.52,
                            listeners: {
                                'change': function (obj, value) {
                                        me.down('#rkdh2').setValue(value);
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_rkdh').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	  me.getCondition();
                                        }
                                    }
                            }
                        }, {
                            itemId: 'rkdh2',
                            name: 'rkdh2',
                            xtype: 'numberfield',
                            fieldLabel: '至',
                            labelWidth: 20,
                            columnWidth: 0.38,
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == e.ENTER) {
//                                        me.doQuery();
                                    	me.getCondition();
                                    }
                                }
                            }
                        },
                        //入库日期
                        {
                            name: 'checkbox_rkrq',
                            itemId: 'checkbox_rkrq',
                            xtype: 'checkbox',
                            columnWidth: .1
                        }, {
                            fieldLabel: '入库日期',
                            name: 'rkrq1',
                            xtype: 'datefield',
                            value: date,
                            format: 'Y.m.d',
        					renderer : Ext.util.Format.dateRenderer('Y.m.d'),
                            columnWidth: .52,
                            listeners: {
                                'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_rkrq').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                            }
                        }, {
                            fieldLabel: '至',
                            name: 'rkrq2',
                            value: new Date(),
                            format: 'Y.m.d',
        					renderer : Ext.util.Format.dateRenderer('Y.m.d'),
                            labelWidth: 20,
                            xtype: 'datefield',
                            columnWidth: .38
                        },
                        //供应厂商
                        {
                            name: 'checkbox_csbh',
                            itemId: 'checkbox_csbh',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '供应厂商',
                            xtype: 'tps_searchcbo',
                            name: 'csbh',
                            itemId: 'search',
                            store: me.csStore,
                            displayField: 'csmc',
                            valueField: 'csbh',
                            columnWidth: 0.9,
                            listeners: {
                                'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_csbh').setValue(true);
                                            me.store = Ext.create('erp.master.prematerial.store.Companyname');
                                            me.store.loadPage(1, {
                                                params: {
                                                    usePaging: true,
                                                    search: me.down('#search').getValue()
                                                }
                                            });
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
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
                        },
                        {
                            xtype: 'tbtext',
                            text: '扩展筛选',
                            columnWidth: 1
                        },
                      //合同号
                        {
                            name: 'checkbox_htbh',
                            itemId: 'checkbox_htbh',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '合同号',
                            name: 'htbh1',
                            xtype: 'numberfield',
                            columnWidth: 0.52,
                            listeners: {
                                'change': function (obj, value) {
                                        me.down('#htbh2').setValue(value);
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_htbh').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                            }
                        }, {
                            itemId: 'htbh2',
                            name: 'htbh2',
                            xtype: 'numberfield',
                            fieldLabel: '至',
                            labelWidth: 20,
                            columnWidth: 0.38,
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == e.ENTER) {
//                                        me.doQuery();
                                    	me.getCondition();
                                    }
                                }
                            }
                        },
                      //到货号
                        {
                            name: 'checkbox_dhdh',
                            itemId: 'checkbox_dhdh',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '到货号',
                            name: 'dhdh1',
                            xtype: 'numberfield',
                            columnWidth: 0.52,
                            listeners: {
                                'change': function (obj, value) {
                                        me.down('#dhdh2').setValue(value);
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_dhdh').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                            }
                        }, {
                            itemId: 'dhdh2',
                            name: 'dhdh2',
                            xtype: 'numberfield',
                            fieldLabel: '至',
                            labelWidth: 20,
                            columnWidth: 0.38,
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == e.ENTER) {
//                                        me.doQuery();
                                    	me.getCondition();
                                    }
                                }
                            }
                        },
                        //入库类别
                        {
                            name: 'checkbox_rklb',
                            itemId: 'checkbox_rklb',
                            xtype: 'checkbox',
                            columnWidth: 0.1},
                        {
    				        fieldLabel: '入库类别',
    					    itemId:'rklb',
    						name : 'rklb',
    					    columnWidth: .9,    					    
    					    xtype : 'combo',    
    					    store: Ext.create('erp.materialInventory.store.Rklb', {autoLoad: true}),
    					    displayField : 'rklb',
    					    valueField: 'lbbh',
    					    listeners: {
    							'select': function(obj, value) {
    								if (!Ext.isEmpty(value)) {
    									me.down('#checkbox_rklb').setValue(true);
    								}
    							},
    							specialkey: function(field, e) {
    								if (e.getKey() == e.ENTER) {
//    									me.doQuery();
    									me.getCondition();
    								}
    							}
    						}
    				        },
    				      //成品外购
                            {
                                name: 'checkbox_wgbj',
                                itemId: 'checkbox_wgbj',
                                xtype: 'checkbox',
                                columnWidth: .1
                            }, {
                                fieldLabel: '成品外购',
                                xtype: 'fieldcontainer',
                                columnWidth: .9,
                                defaultType: 'radiofield',
                                defaults: {
                                    flex: 1
                                },
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [{
                                    checked: true,
                                    columnWidth: .45,
                                    name: 'wgbj',
                                    boxLabel: '是',
                                    inputValue: 1,
                                    listeners: {
                                        'change': function (obj, value) {
                                            if (!Ext.isEmpty(value)) {
                                                me.down('#checkbox_wgbj').setValue(true);
                                            }
                                        }
                                    }
                                }, {
                                    columnWidth: .45,
                                    name: 'wgbj',
                                    boxLabel: '否',
                                    inputValue: 0,
                                    listeners: {
                                        'change': function (obj, value) {
                                            if (!Ext.isEmpty(value)) {
                                                me.down('#checkbox_wgbj').setValue(true);
                                            }
                                        }
                                    }
                                }]
                            },
                            //货位号
                            {
                                name: 'checkbox_hwbh',
                                itemId: 'checkbox_hwbh',
                                xtype: 'checkbox',
                                columnWidth: 0.1
                            }, {
                                fieldLabel: '货位号',
                                name: 'hwbh',
                                itemId: 'hwbh',
                                xtype: 'textfield',
                                columnWidth: .9,
                                listeners: {
                                    'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_hwbh').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                                }
                            },
                          //生产批次
                            {
                                name: 'checkbox_pcbh',
                                itemId: 'checkbox_pcbh',
                                xtype: 'checkbox',
                                columnWidth: 0.1
                            }, {
                                fieldLabel: '生产批次',
                                name: 'pcbh',
                                itemId: 'pcbh',
                                xtype: 'textfield',
                                columnWidth: .9,
                                listeners: {
                                    'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_pcbh').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                                }
                            },
                          //计划号
                            {
                                name: 'checkbox_jhh',
                                itemId: 'checkbox_jhh',
                                xtype: 'checkbox',
                                columnWidth: 0.1
                            }, {
                                fieldLabel: '计划号',
                                name: 'jhh',
                                itemId: 'jhh',
                                xtype: 'textfield',
                                columnWidth: .9,
                                listeners: {
                                    'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_jhh').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                                }
                            },
                          //制造日期
                            {
                                name: 'checkbox_zzrq',
                                itemId: 'checkbox_zzrq',
                                xtype: 'checkbox',
                                columnWidth: .1
                            }, {
                                fieldLabel: '制造日期',
                                name: 'zzrq1',
                                xtype: 'datefield',
                                value: date,
                                format: 'Y.m.d',
            					renderer : Ext.util.Format.dateRenderer('Y.m.d'),
                                columnWidth: .52,
                                listeners: {
                                    'change': function (obj, value) {
                                            if (!Ext.isEmpty(value)) {
                                                me.down('#checkbox_zzrq').setValue(true);
                                            }
                                        },
                                        specialkey: function (field, e) {
                                            if (e.getKey() == e.ENTER) {
//                                                me.doQuery();
                                            	me.getCondition();
                                            }
                                        }
                                }
                            }, {
                                fieldLabel: '至',
                                name: 'zzrq2',
                                labelWidth: 20,
                                value: new Date(),
                                format: 'Y.m.d',
            					renderer : Ext.util.Format.dateRenderer('Y.m.d'),
                                xtype: 'datefield',
                                columnWidth: .38
                            },
                            //备注说明
                            {
                                name: 'checkbox_bzsm',
                                itemId: 'checkbox_bzsm',
                                xtype: 'checkbox',
                                columnWidth: 0.1
                            }, {
                                fieldLabel: '备注说明',
                                name: 'bzsm',
                                itemId: 'bzsm',
                                xtype: 'textfield',
                                columnWidth: .9,
                                listeners: {
                                    'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_bzsm').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                                }
                            },
                          //操作时间>打印时间
//                            {
//                                name: 'checkbox_czsjdysj',
//                                itemId: 'checkbox_czsjdysj',
//                                xtype: 'checkbox',
//                                columnWidth: 0.1
//                            }, {
//                                fieldLabel: '操作时间>打印时间',
//                                labelWidth: 300,
//                                name: 'czsjdysj',
//                                itemId: 'czsjdysj',                              
//                                columnWidth: .9,
//                                listeners: {
//                                    'change': function (obj, value) {
//                                        if (!Ext.isEmpty(value)) {
//                                            me.down('#checkbox_czsjdysj').setValue(true);
//                                        }
//                                    },
//                                    specialkey: function (field, e) {
//                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
//                                        }
//                                    }
//                                }
//                            },
                            //延迟入库
                            {
                                name: 'checkbox_ycrk',
                                itemId: 'checkbox_ycrk',
                                xtype: 'checkbox',
                                columnWidth: 0.1
                            }, {
                                fieldLabel: '延迟入库',
                                name: 'ycrk',
                                itemId: 'ycrk',
                                xtype: 'textfield',             
                                value: 15,
                                columnWidth: .3,
                                listeners: {
                                    'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_ycrk').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
//                                            me.doQuery();
                                        	me.getCondition();
                                        }
                                    }
                                }
                            },
                            {
                            xtype : 'displayfield',
                            id:'dayDisplay',
                            value : "天"
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
        clmcCallback : function (view, rec, recs){
        	var me = this;
			var form = me.down('form');
			var formrec=form.getRecord();
			formrec.set('clmc',rec.get('clmc'));
			formrec.set('clhh',rec.get('clhh'));
			formrec.set('jldw',rec.get('jldw'));
			formrec.set('ysmc',rec.get('ysmc'));
			formrec.set('yshh',rec.get('yshh'));
			formrec.set('bcpbj',rec.get('bcpbj'));
			form.loadRecord(formrec);
        },
        doQuery: function () {
         var me=this;
         Ext.apply(me.mainstore.proxy.extraParams, 
     			{
     				condition:me.getQueryCondition()
     			 }
     		);
     		me.mainstore.reload();
//       	 me.mainstore.load({params:{condition:me.getQueryCondition()}});//用此方法会加载整个初始grid
            me.close();
        },
        getCondition : function(btn) {
    		var me = this;
    		var form = me.down('form');
    		form.updateRecord(me.rec);
    		var rec=form.getValues();
    		var strWhere ='';
    		if(rec.checkbox_rkdh!=null){
    			strWhere+=" and (rkdb_yl.rkdh >= '"+rec.rkdh1+"' and rkdb_yl.rkdh <= '"+rec.rkdh2+"' )";
    		}
    		if(rec.checkbox_rkrq!=null){
    			var rkrq1 = rec.rkrq1 + ' 00:00:00';
    			var rkrq2 = rec.rkrq2 + ' 23:59:59';
    			strWhere+=" and (rkdb_yl.rkrq >= '"+rkrq1+"' and rkdb_yl.rkrq <= '"+rkrq2+"' )";
    		}
    		if(rec.checkbox_csbh!=null){
    			strWhere+=" and (rkdb_yl.csbh = '"+rec.csbh+"' )";
    		}
    		if(rec.checkbox_clmc!=null){
    			strWhere+=" and (clbmb.clmc like '%"+rec.clmc+"%' )";
    		}
    		if(rec.checkbox_htbh!=null){
    			strWhere+=" and (rkdb_yl.htbh >= '"+rec.htbh1+"' and rkdb_yl.htbh <= '"+rec.htbh2+"' )";
    		}
    		if(rec.checkbox_dhdh!=null){
    			strWhere+=" and (rkdb_yl.dhdh >= '"+rec.dhdh1+"' and rkdb_yl.dhdh <= '"+rec.dhdh2+"' )";
    		}
    		if(rec.checkbox_rklb!=null){
    			strWhere+=" and (rkdb_yl.rklb = '"+rec.rklb+"' )";
    		}
    		if(rec.checkbox_wgbj!=null){
    			strWhere+=" and (rkdb_yl.wgbj = '"+rec.wgbj+"' )";
    		}
    		if(rec.checkbox_hwbh!=null){
    			strWhere+=" and (rkdb_yl.hwbh = '"+rec.hwbh+"' )";
    		}
    		if(rec.checkbox_hth!=null){
    			strWhere+=" and (hth >= '"+rec.hth1+"' and hth <= '"+rec.hth2+"' )";
    		}
    		if(rec.checkbox_pcbh!=null){
    			strWhere+=" and (rkdb_yl.pcbh = '"+rec.pcbh+"' )";
    		}
    		if(rec.checkbox_jhh!=null){
    			strWhere+=" and (jhh = '"+rec.jhh+"' )";
    		}
    		if(rec.checkbox_zzrq!=null){
    			var zzrq1 = rec.zzrq1 + ' 00:00:00';
    			var zzrq2 = rec.zzrq2 + ' 23:59:59';
    			strWhere+=" and (rkdb_yl.zzrq >= '"+zzrq1+"' and rkdb_yl.zzrq <= '"+zzrq2+"' )";
    		}
    		if(rec.checkbox_ycrk!=null){
    			strWhere+=" and (case when a.dhrq is not null then datediff(day,a.dhrq,rkdb_yl.rkrq) else 0 end = "+rec.ycrk+" )";
    		}
    		if(rec.checkbox_bzsm!=null){
    			strWhere+=" and (rkdb_yl.bzsm like '%"+rec.bzsm+"%' )";
    		}
    		if(strWhere==''){
    			delete 	me.mainstore.proxy.extraParams.sf_condition;
    		}else{
    			me.mainstore.proxy.extraParams.sf_condition=strWhere;
    		}
    		me.mainstore.load();
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
                        if (x == 'rkdh1' && obj['checkbox_rkdh']) {
                            arr.push("rkdb_yl.rkdh >= '" + obj[x] + "' ");
                        } else if (x == 'rkdh2' && obj['checkbox_rkdh']) {
                            arr.push("rkdb_yl.rkdh <= '" + obj[x] + "' ");
                        } else if (x == 'rkrq1' && obj['checkbox_rkrq']) {
                            arr.push("rkdb_yl.rkrq >= '" + Ext.Date.format(obj[x], 'Y-m-d H:i:s') + "' ");
                        } else if (x == 'rkrq2' && obj['checkbox_rkrq']) {
                            arr.push("rkdb_yl.rkrq <= '" + Ext.Date.format(obj[x], 'Y-m-d H:i:s') + "' ");                       
                        } else if (x == 'csbh' && obj['checkbox_csbh']) {
                            arr.push("rkdb_yl.csbh = '" + obj[x] + "'");
                        } else if (x == 'clmc' && obj['checkbox_clmc']) {
                            arr.push("clbmb.clmc like '%" + obj[x] + "%'");                           
                        } else if (x == 'htbh1' && obj['checkbox_htbh']) {
                            arr.push("rkdb_yl.htbh >= '" + obj[x] + "' ");
                        } else if (x == 'htbh2' && obj['checkbox_htbh']) {
                            arr.push("rkdb_yl.htbh <= '" + obj[x] + "' ");                             
                        } else if (x == 'dhdh1' && obj['checkbox_dhdh']) {
                            arr.push("rkdb_yl.dhdh >= '" + obj[x] + "' ");
                        } else if (x == 'dhdh2' && obj['checkbox_dhdh']) {
                            arr.push("rkdb_yl.dhdh <= '" + obj[x] + "' ");                             
                        } else if (x == 'rklb' && obj['checkbox_rklb']) {
                            arr.push("rkdb_yl.rklb = " + obj[x] );
                        } else if (x == 'wgbj' && obj['checkbox_wgbj']) {
                            arr.push("rkdb_yl.wgbj = " + obj[x]);
                        } else if (x == 'hwbh' && obj['checkbox_hwbh']) {
                            arr.push("rkdb_yl.hwbh = '" + obj[x] + "' ");
                        } else if (x == 'hth1' && obj['checkbox_hth']) {
                            arr.push("hth >= '" + obj[x] + "' ");
                        } else if (x == 'hth2' && obj['checkbox_hth']) {
                            arr.push("hth <= '" + obj[x] + "' ");
                        } else if (x == 'pcbh' && obj['checkbox_pcbh']) {  
                            arr.push("rkdb_yl.pcbh = '" + obj[x] + "' ");
                        } else if (x == 'jhh' && obj['checkbox_jhh']) {  
                            arr.push("jhh = '" + obj[x] + "' ");
                        } else if (x == 'zzrq1' && obj['checkbox_zzrq']) {
                            arr.push("rkdb_yl.zzrq >= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
                        } else if (x == 'zzrq2' && obj['checkbox_zzrq']) {
                            arr.push("rkdb_yl.zzrq <= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");                       
                        } else if (x == 'bzsm' && obj['checkbox_bzsm']) {  
                            arr.push("rkdb_yl.bzsm like '%" + obj[x] + "%' ");
                        } else if (x == 'ycrk' && obj['checkbox_ycrk']) {  
                            arr.push("ycrk = '" + obj[x] + "' ");
                        }
                    }
                }
                condition = arr.join(' and ');
            }
            return condition;
        }
});