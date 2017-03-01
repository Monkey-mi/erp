Ext.define('erp.materialQualityTesting.view.MaterialQualityManager', {
    extend: 'erp.ux.Panel',
    alias: 'widget.mng_MaterialQuality',
    requires: ['erp.ux.SelectField',
               'erp.materialQualityTesting.store.MaterialQualityManagerBufferrd'],
    layout: {
       type: 'border',padding : 2
    },
    initComponent: function () {
            var me = this;
            me.can_use_btn = true;
            me.store = Ext.create('erp.materialQualityTesting.store.MaterialQualityManagerBufferrd');
            me.store.proxy.extraParams.ckbh = me.ckbh;
           
            me.store.on({
    			load:function(s,recs){
    				var grid=me.down('#grd_MaterialQuality');
    				if(recs.length>0){
    					erp.Util.gridSelect(grid,recs);
    					grid.view.bufferedRenderer.scrollTo(-1, true);
    				}else{
    					grid.getStore().removeAll();
    				}				
    			},
    			totalcountchange:function onStoreSizeChange() {
    				var grid=me.down('#grd_MaterialQuality');
    		        grid.down('#status').update({count: me.store.getTotalCount()});
    		    }
    		});
//            Ext.apply(me.store.proxy.extraParams, {
//                ckbh: me.ckbh,
//                usePaging: true
//            });
            Ext.apply(me, {
            	listeners:{
    	    		afterrender:function(cmp){
    	    			cmp.store.loadPage(1);
    	    		}
    	    	},
//                layout: {
//                    type: 'border',
//                    padding: 2
//                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'function_btn',
                    items: [{
                        text: '质检判定',
                        iconCls: '',
                        itemId: 'btn_judgment'
                    }, {
                        text: '批量判定',
                        iconCls: '',
                        itemId: 'btn_judgmentAll'
                    }, {
                        text: '待判原因',
                        iconCls: '',
                        itemId: 'btn_judgmentResion'
                    }, {
                        text: '审核',
                        iconCls: 'email_edit',
                        itemId: 'btn_aud'
                    }, {
                        text: '历史判定',
                        iconCls: '',
                        itemId: 'btn_historyJudgment'
                    }, {
                        text: '生成委托单',
                        iconCls: '',
                        itemId: 'btn_create'
                    }, {
                        text: '刷新',
                        iconCls: 'refresh_backwards',
                        handler: function () {
                            me.store.loadPage(1);
                        }
                    }, {
                        text: '筛选',
                        iconCls: 'page_find',
                        itemId: 'btn_query'
                    }, {
                        text: '打印',
                        iconCls: '',
                        itemId: 'btn_print'
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
                    itemId: 'grd_MaterialQuality',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    selModel: Ext.create('Ext.selection.CheckboxModel'),
                    dockedItems: [
//                        {xtype: 'pagingbar',
//                        stateId : "pagingbar"+Ext.id(),
//                        store: me.store,
//                        dock: 'bottom',
//                        defaultPageSize: 50,
//                        displayInfo: true}
                          {xtype: 'component',
		                  itemId: 'status',
		                  tpl: '记录总数: {count}'}
                        ],
                        plugins: [{ptype: 'bufferedrenderer'},
				    	            {ptype:'gridfilters',menuFilterText:'筛选条件'}],
				    	  
//                    features: [{
//                        ftype: 'summary',
//                        summaryType: 'count',
//                        dock: 'bottom'
//                    }],
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
                            header: '审核',
                            width: 40,
                            dataIndex: 'shbj',
                            renderer: function (shbj) {
                                if (shbj == "true" || shbj == "1") {
                                    return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
                                } else {
                                    return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}'  />";
                                }
                            }
                        }, {
                            header: '仓库名称',
                            width: 80,
                            dataIndex: 'ckmc'
                        }, //
                        {
                            header: '状态',
                            width: 40,
                            dataIndex: 'ztmc'                          
                        }, //
                        {
                            header: '质检结论名称',
                            width: 50,
                            dataIndex: 'jlmc',
                            hidden : true
                        }, //
                        {
                            header: '质检结论',
                            width: 50,
                            dataIndex: 'jyjg',
                            renderer : function(v){
                            	if(v==1){return '待检';}
                            	else if(v==2){return '合格';}
                            	else if(v==3){return '<p style="font-size:12px;color:red">不合格</p>';}
                            	else if(v==4){return '让步接收';}
                            	else if(v==5){return '改为他用';}
                            }
                        }, //
                        {
                            header: '到货单号',
                            width: 50,
                            dataIndex: 'dhdh'
                        }, {
                            header: '序号',
                            width: 30,
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
                            width: 60,
                            dataIndex: 'lbmc'
                        }, {
                            header: '材料货号',
                            width: 60,
                            dataIndex: 'clhh'
                        }, {
                            header: '材料图号',
                            width: 50,
                            dataIndex: 'clth'
                        }, {
                            header: '材料名称',
                            width: 100,
                            dataIndex: 'clmc'
                        }, {
                            header: '规格尺寸',
                            width: 80,
                            dataIndex: 'cltx1'                         
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
                            width: 80,
                            dataIndex: 'pcbh'
                        }, {
                            header: '供货批次',
                            width: 80,
                            dataIndex: 'ghpc'
                        }, {
                            header: '到货数量',
                            width: 50,
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
                            width: 80,
                            dataIndex: 'fzsl',
                            renderer: function (v) {
                                    return Ext.util.Format.number(v, '0,000.000');
                                },
                                summaryType: 'sum',
                            summaryRenderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000.000');
                                },
                                renderer: function (value, summaryData, dataIndex) {
                                    return Ext.util.Format.number(value, '0,000.000');
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
                        }, //
                        {
                            header: '合同号',
                            width: 100,
                            dataIndex: 'hth'
                        }, {
                            header: '外协号',
                            width: 80,
                            dataIndex: 'wxh'
                        }, {
                            header: '计划号',
                            width: 80,
                            dataIndex: 'jhh'
                        }, {
                            header: '产品名称',
                            width: 100,
                            dataIndex: 'cpmc'
                        }, //
                        {
                            header: '主产品名称',
                            width: 80,
                            dataIndex: 'zcpmc'
                        }, {
                            header: '生产单号',
                            width: 80,
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
                            width: 80,
                            dataIndex: 'zjrm'
                        }, {
                            header: '判定日期',
                            width: 100,
                            dataIndex: 'zjrq',
                            xtype: 'datecolumn',
                            format: 'Y-m-d H:i:s'
                        }, {
                            header: '审核人',
                            width: 80,
                            dataIndex: 'shrm'
                        }, {
                            header: '审核时间',
                            width: 100,
                            dataIndex: 'shsj',
                            xtype: 'datecolumn',
                            format: 'Y-m-d H:i:s'
                        }, {
                            header: '审核结果',
                            width: 80,
                            dataIndex: 'shjg'
                        }, {
                            header: '审核说明',
                            width: 80,
                            dataIndex: 'shsm'
                        }, {
                            header: '客户名称',
                            width: 100,
                            dataIndex: 'khmc'
                        }, //
                        {
                            header: '客户型号',
                            width: 100,
                            dataIndex: 'khxh'
                        }, {
                            header: '交库人名',
                            width: 80,
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