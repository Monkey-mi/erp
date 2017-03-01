Ext.define('erp.materialQualityTesting.view.MaterialQualitySearch', {
    extend: 'erp.ux.Window',
    alias: 'widget.MaterialQuality_Search',
    iconCls: 'page_find',
    title: '材料入库质检判定筛选条件',
    frame: true,
    modal: true,
    width: 400,
    requires: ['erp.common.basic.view.field.HelpField',
        'erp.ux.CommonTrigger',
        'erp.ux.SearchCombobox',
        'erp.ux.SelectField',
        'erp.materialQualityTesting.store.MaterialQualityManager',
        'erp.materialQualityTesting.store.MaterialQualityManagerBufferrd',
        'erp.master.prematerial.store.Companyname',
        'erp.view.master.purchaseDetail.window.MateCombo',
        'erp.materialQualityTesting.store.Ckmc',
        'erp.master.caterialPricePurchase.store.MaterialClass',
        'erp.materialQualityTesting.view.MaterialName'
    ],
    height: 550,
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
                                        me.down('#checkbox_dhdh').setValue(false);
                                        me.down('#checkbox_dhrq').setValue(false);
                                        me.down('#checkbox_zjdh').setValue(false);
                                        me.down('#checkbox_zjrq').setValue(false);
                                        me.down('#checkbox_csbh').setValue(false);
                                        me.down('#checkbox_clmc').setValue(false);
                                        me.down('#checkbox_ckbh').setValue(false);
                                        me.down('#checkbox_jyjg').setValue(false);
                                        me.down('#checkbox_pcbh').setValue(false);
                                        me.down('#checkbox_hth').setValue(false);
                                        me.down('#checkbox_cllb').setValue(false);
                                    }
                                }
                            }
                        },
                        //到货单号
                        {
                            name: 'checkbox_dhdh',
                            itemId: 'checkbox_dhdh',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '到货单号',
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
                                            me.doQuery();
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
                            value: date,
                            format: 'Y.m.d',
        					renderer : Ext.util.Format.dateRenderer('Y.m.d'),
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
                            value: new Date(),
                            format: 'Y.m.d',
        					renderer : Ext.util.Format.dateRenderer('Y.m.d'),
                            labelWidth: 20,
                            xtype: 'datefield',
                            columnWidth: .38
                        },
                        //质检单号
                        {
                            name: 'checkbox_zjdh',
                            itemId: 'checkbox_zjdh',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '质检单号',
                            name: 'zjdh1',
                            xtype: 'numberfield',
                            columnWidth: 0.52,
                            listeners: {
                                'change': function (obj, value) {
                                        me.down('#zjdh2').setValue(value);
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_zjdh').setValue(true);
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
                                            me.doQuery();
                                        }
                                    }
                            }
                        }, {
                            itemId: 'zjdh2',
                            name: 'zjdh2',
                            xtype: 'numberfield',
                            fieldLabel: '至',
                            labelWidth: 20,
                            columnWidth: 0.38,
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == e.ENTER) {
                                        me.doQuery();
                                    }
                                }
                            }
                        },
                        //质检日期
                        {
                            name: 'checkbox_zjrq',
                            itemId: 'checkbox_zjrq',
                            xtype: 'checkbox',
                            columnWidth: .1
                        }, {
                            fieldLabel: '质检日期',
                            name: 'zjrq1',
                            value: date,
                            format: 'Y.m.d',
        					renderer : Ext.util.Format.dateRenderer('Y.m.d'),
                            xtype: 'datefield',
                            columnWidth: .52,
                            listeners: {
                                'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_zjrq').setValue(true);
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
                            name: 'zjrq2',
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
                            itemId: 'csbh',
                            store: Ext.create('erp.master.prematerial.store.Companyname'),
                            displayField: 'csmc',
                            valueField: 'csbh',
                            columnWidth: 0.9,
                            listeners: {
                                'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_csbh').setValue(true);
                                            me.csStore = Ext.create('erp.master.prematerial.store.Companyname');
                                            me.csStore.loadPage(1, {
                                                params: {
                                                    usePaging: true,
                                                    search: me.down('#csbh').getValue()
                                                }
                                            });
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
          		          },
                        {
                            xtype: 'tbtext',
                            text: '扩展筛选',
                            columnWidth: 1
                        },
                        //仓库名称
                        {
                            name: 'checkbox_ckbh',
                            itemId: 'checkbox_ckbh',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '仓库名称',
                            name: 'ckbh',
                            itemId: 'ckbh',
                            xtype: 'tps_searchcbo',
                            store: Ext.create('erp.materialQualityTesting.store.Ckmcsx'),
                            displayField: 'ckmc',
                            valueField: 'ckbh',
                            columnWidth: .9,
                            listeners: {
                                'select': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_ckbh').setValue(true);
                                            me.ckStore = Ext.create('erp.materialQualityTesting.store.Ckmcsx');
                                            me.ckStore.loadPage(1, {
                                                params: {
                                                    usePaging: true,
                                                    search: me.down('#ckbh').getValue()
                                                }
                                            });
                                        }
                                    },
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
                                            me.doQuery();
                                        }
                                    }
                            }
                        },
                        //质检结论
                        {
                            name: 'checkbox_jyjg',
                            itemId: 'checkbox_jyjg',
                            xtype: 'checkbox',
                            columnWidth: .1
                        }, {
                            fieldLabel: '质检结论',
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
                                columnWidth: .3,
                                name: 'jyjg',
                                boxLabel: '待检',
                                inputValue: 1,
                                listeners: {
                                    'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_jyjg').setValue(true);
                                        }
                                    }
                                }
                            }, {
                                columnWidth: .3,
                                name: 'jyjg',
                                boxLabel: '合格',
                                inputValue: 2,
                                listeners: {
                                    'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_jyjg').setValue(true);
                                        }
                                    }
                                }
                            }, {
                                columnWidth: .3,
                                name: 'jyjg',
                                boxLabel: '不合格',
                                inputValue: 3,
                                listeners: {
                                    'change': function (obj, value) {
                                        if (!Ext.isEmpty(value)) {
                                            me.down('#checkbox_jyjg').setValue(true);
                                        }
                                    }
                                }
                            }]
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
                            xtype: 'textfield',
                            columnWidth: .9,
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == e.ENTER) {
                                        me.doQuery();
                                    }
                                }
                            }
                        },
                        //合同号
                        {
                            name: 'checkbox_hth',
                            itemId: 'checkbox_hth',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '合同号',
                            name: 'hth1',
                            xtype: 'numberfield',
                            columnWidth: 0.52,
                            listeners: {
                                'change': function (obj, value) {
                                        me.down('#hth2').setValue(value);
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
                        }, {
                            itemId: 'hth2',
                            name: 'hth2',
                            xtype: 'numberfield',
                            fieldLabel: '至',
                            labelWidth: 20,
                            columnWidth: 0.38,
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == e.ENTER) {
                                        me.doQuery();
                                    }
                                }
                            }
                        },
                        //材料类别
                        {
                            name: 'checkbox_cllb',
                            itemId: 'checkbox_cllb',
                            xtype: 'checkbox',
                            columnWidth: 0.1
                        }, {
                            fieldLabel: '材料类别',
                            name: 'lbbh',
                            itemId: 'lbbh',
                            xtype:'comboxTree',
    						queryMode : 'local',
    						store : Ext.create('erp.materialQualityTesting.store.CllbTree'),
    						displayField : 'text',
    					    valueField: 'nodeId',
                            columnWidth: .9,
                            listeners: {
                                'select': function (obj, value) {                               	    
                                        if (!Ext.isEmpty(value)) {
                                        	me.down('#checkbox_cllb').setValue(true);
                                        	var nodeId = me.down('#lbbh').getValue();                                   
                                        	if(nodeId==0){
                                        		Ext.Msg.alert('提示','该类别不是末类级别，请重新选择！');
                                        		return;
                                        	}
                                        	var mjbz =  erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getMjbz',
                                        			{lbbh:nodeId});
                                   		    if(mjbz==0){
                                   		    	Ext.Msg.alert('提示','该类别不是末类级别，请重新选择！');
                                   		    	return;
                                   		    }
                                                                                                                                    
                                        }
                                    },                            
                                    specialkey: function (field, e) {
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
                            handler: function(){
            					me.getCondition();
            				}
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
    		if(rec.checkbox_dhdh!=null){
    			strWhere+=" and (dhdjb_yl.dhdh >= '"+rec.dhdh1+"' and dhdjb_yl.dhdh <= '"+rec.dhdh2+"' )";
    		}
    		if(rec.checkbox_zjdh!=null){
    			strWhere+=" and (dhdjb_yl.zjdh >= '"+rec.zjdh1+"' and dhdjb_yl.zjdh <= '"+rec.zjdh2+"' )";
    		}
    		if(rec.checkbox_dhrq!=null){
    			var dhrq1 = rec.dhrq1 + ' 00:00:00';
    			var dhrq2 = rec.dhrq2 + ' 23:59:59';
    			strWhere+=" and (dhdjb_yl.dhrq >= '"+dhrq1+"' and dhdjb_yl.dhrq <= '"+dhrq2+"' )";
    		}
    		if(rec.checkbox_zjrq!=null){
    			var zjrq1 = rec.zjrq1 + ' 00:00:00';
    			var zjrq2 = rec.zjrq2 + ' 23:59:59';
    			strWhere+=" and (dhdjb_yl.zjrq >= '"+zjrq1+"' and dhdjb_yl.zjrq <= '"+zjrq2+"' )";
    		}
    		if(rec.checkbox_csbh!=null){
    			strWhere+=" and (dhdjb_yl.csbh = '"+rec.csbh +"' )";
    		}
    		if(rec.checkbox_clmc!=null){
    			strWhere+=" and (g.clmc like '%"+rec.clmc+"%' )";
    		}
    		if(rec.checkbox_ckbh!=null){
    			strWhere+=" and (dhdjb_yl.ckbh = '"+rec.ckbh +"' )";
    		}
    		if(rec.checkbox_jyjg!=null){
    			strWhere+=" and (dhdjb_yl.jyjg = '"+rec.jyjg +"' )";
    		}
    		if(rec.checkbox_pcbh!=null){
    			strWhere+=" and (dhdjb_yl.pcbh = '"+rec.pcbh +"' )";
    		}
    		if(rec.checkbox_hth!=null){
    			strWhere+=" and (dhdjb_yl.htbh >= '"+rec.hth1+"' and dhdjb_yl.htbh <= '"+rec.hth2+"' )";
    		}
    		if(rec.checkbox_cllb!=null){
    			strWhere+=" and (g.lbbh = '"+rec.lbbh +"' )";
    		}
    		
    		if(strWhere==''){
    			delete 	me.store.proxy.extraParams.condition;
    		}else{
    			me.store.proxy.extraParams.condition=strWhere;
    		}
    		me.store.load();
			me.close();
        },
        doQuery: function () {    
        	//以下写法才能正常刷新
            Ext.apply(me.store.proxy.extraParams, {
                condition: me.getQueryCondition()
            });
            me.store.reload();
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
                        if (x == 'dhdh1' && obj['checkbox_dhdh']) {
                            arr.push("dhdjb_yl.dhdh >= '" + obj[x] + "' ");
                        } else if (x == 'dhdh2' && obj['checkbox_dhdh']) {
                            arr.push("dhdjb_yl.dhdh <= '" + obj[x] + "' ");
                        } else if (x == 'zjdh1' && obj['checkbox_zjdh']) {
                            arr.push("dhdjb_yl.zjdh >= '" + obj[x] + "' ");
                        } else if (x == 'zjdh2' && obj['checkbox_zjdh']) {
                            arr.push("dhdjb_yl.zjdh <= '" + obj[x] + "' ");
                        } else if (x == 'dhrq1' && obj['checkbox_dhrq']) {
                            arr.push("dhdjb_yl.dhrq >= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
                        } else if (x == 'dhrq2' && obj['checkbox_dhrq']) {
                            arr.push("dhdjb_yl.dhrq <= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
                        } else if (x == 'zjrq1' && obj['checkbox_zjrq']) {
                            arr.push("dhdjb_yl.zjrq >= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
                        } else if (x == 'zjrq2' && obj['checkbox_zjrq']) {
                            arr.push("dhdjb_yl.zjrq <= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
                        } else if (x == 'csbh' && obj['checkbox_csbh']) {
                            arr.push("dhdjb_yl.csbh = '" + obj[x] + "'");
                        } else if (x == 'clmc' && obj['checkbox_clmc']) {
                            arr.push("g.clmc like '%" + obj[x] + "%'");
                        } else if (x == 'ckbh' && obj['checkbox_ckbh']) {
                            arr.push("dhdjb_yl.ckbh = '" + obj[x] + "' ");
                        } else if (x == 'jyjg' && obj['checkbox_jyjg']) {
                            arr.push("dhdjb_yl.jyjg = " + obj[x]);
                        } else if (x == 'pcbh' && obj['checkbox_pcbh']) {
                            arr.push("dhdjb_yl.pcbh = '" + obj[x] + "' ");
                        } else if (x == 'hth1' && obj['checkbox_hth']) {
                            arr.push("dhdjb_yl.htbh >= '" + obj[x] + "' ");
                        } else if (x == 'hth2' && obj['checkbox_hth']) {
                            arr.push("dhdjb_yl.htbh <= '" + obj[x] + "' ");
                        } else if (x == 'lbbh' && obj['checkbox_cllb']) {  
                            arr.push("g.lbbh = '" + obj[x] + "' ");
                        }
                    }
                }
                condition = arr.join(' and ');
            }            
            return condition;
        }
});