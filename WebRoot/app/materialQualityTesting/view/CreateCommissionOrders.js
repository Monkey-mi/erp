Ext.define('erp.materialQualityTesting.view.CreateCommissionOrders',{
	extend: 'erp.ux.Panel',
	alias: 'widget.win_CreateCommissionOrder',
	requires: ['erp.ux.SelectField',
	           'erp.common.basic.view.field.HelpField',
	           'erp.materialQualityTesting.view.MaterialName',
	           'erp.ux.CommonTrigger',
	           'erp.ux.SearchCombobox'],
    title: '生成委托单',
    closable : true,
    //初始化组件模板
    initComponent: function(){
    	var me = this;
        me.wtbmStore = Ext.create('erp.materialQualityTesting.store.Department');
        me.argStore = Ext.create('erp.view.master.company.store.CompanyShow');
        me.argColumns = erp.Util.getColumns(me.argStore.getModel());
        me.cgStore = Ext.create('erp.materialQualityTesting.store.MaterialQualityManager');
        me.wcqStore = Ext.create('erp.materialQualityTesting.store.Wtjycssqb');
        me.wcmStore = Ext.create('erp.materialQualityTesting.store.Wtjycssqclmxb');
        me.wcbStore = Ext.create('erp.materialQualityTesting.store.Wtjycssqmxb');
        me.toBeDeleteFileArray = [];
        //将配置的所有属性都复制到指定的对象
        Ext.apply(me,{
        	//布局纵向
        	layout : {type: 'vbox', align: 'stretch'},
        	//工具栏
        	tbar: [{text: '导入', iconCls: '', itemId: 'btn_lead'},
        	       {text: '增加', iconCls: 'page_add', itemId: 'btn_add'},
        	       {text: '删除', iconCls: 'page_delete', itemId: 'btn_del'},
        	       {text: '明细增加', iconCls: '', itemId: 'btn_mxadd'},
        	       {text: '明细删除', iconCls: '', itemId: 'btn_mxdel'},
        	       {text: '明细复制', iconCls: '', itemId: 'btn_mxcopy', disabled: true},
        	       {text: '明细粘贴', iconCls: '', itemId: 'btn_mxpaste', disabled: true},
        	       {text: '保存', glyph: 0xf0c7, itemId: 'BTN_SAVE'},
        	       {text: '退出', glyph: 0xf057, handler: function(){ 
        	    	   me.close(); 
        	    	   }
        	       }],
        	//主体部分
            items : [
                     //表单部分：头部
                     {xtype: 'form',
                      flex: 2,
                      itemId: 'CCOForm',
                      bodyPadding: 10,
                      store: me.wcqStore,
                      layout: 'column',
                      autoScroll: true,
                      defaults:{labelWidth: 80,
                                padding: 5,
                                xtype: 'textfield'
                      },
                      items: [
                              {
                               fieldLabel: '委托单号',
	                           itemId: 'wtdh',
	                           name: 'wtdh',
	                           xtype: 'textfield',
	                           columnWidth: .2,
	                           fieldStyle: 'background:#E6E6E6'
	                          },{
                        	   fieldLabel:'委托部门',
      						   name:'wtlb',
      						   itemId: 'wtlb',
      						   xtype:'comboxTree',
      						   queryMode : 'local',
      						   store : Ext.create('erp.materialQualityTesting.store.WtbhTree'),
      						   displayField : 'text',
      					       valueField: 'nodeId',
      						   columnWidth:.2    		   
	                          },{
                        	   fieldLabel: '委  托  人',
                               itemId: 'wtrm',
                               name: 'wtrm',
                               xtype: 'textfield',
                               columnWidth: .2	  
	                          },{
                        	   fieldLabel: '委托日期',
                               itemId: 'wtrq',
                               name: 'wtrq',
                               xtype: 'datefield',
                               columnWidth: .2  
	                          },{
                        	   fieldLabel: '测试类型',
                               itemId: 'cslx',
                               name: 'cslx',
                               xtype: 'textfield',
                               columnWidth: .2  
	                          },{
                        	   fieldLabel: '供应厂商',
                               itemId: 'csmc',
                               name: 'csmc',
                               columnWidth: .5,
                               allowBlank: false,
                               blankText: '厂商名称不能为空',
                               emptyText: '(必填)',
                               xtype: 'selectfield',
                               openconfig: {
                                  modal: true,
                                  title: '参数选取',
                                  singleSelect: true,
                                  editable: true,
                                  diaplayField: 'csmc',
                                  valueField: 'csbh',
                                  idKey: true,
                                  insert: true,
                                  width: 500,
                                  height: 600,
                                  columns: me.argColumns,
                                  store: me.argStore
                              },
                              listeners: {
                                  'selectchange': function () {
                                      var csbh = me.down('#csmc').getValue();
                                      me.down('#csbh').setValue(csbh);
                                  }
                              }  
	                          },{
                        	  fieldLabel: '测试机构',
                              itemId: 'csjg',
                              name: 'csjg',
                              xtype: 'textfield',
                              columnWidth: .5 
	                          },{
                        	  fieldLabel: '测试目的',
                              itemId: 'csmd',
                              name: 'csmd',
                              xtype: 'textfield',
                              columnWidth: 1
	                          },{
                        	  fieldLabel: '备注说明',
                              itemId: 'bzsm',
                              name: 'bzsm',
                              xtype: 'textfield',
                              columnWidth: 1  
	                          }	                          
	                         ]
                     },
                     //申请明细grid部分
                     {
                    	 xtype: 'tabpanel',
                         flex: 2,                        
                         items: 
                        	[{
                        	  xtype: 'grid',
                        	  itemId: 'grdApplyDetail',
                        	  title: '申请明细',
                        	  selModel: Ext.create('Ext.selection.CheckboxModel'),
                        	  features: [{
                                  ftype: 'summary',
                                  summaryType: 'count',
                                  dock: 'bottom'
                              }],
                              columns: [{
                            	  header: '序号',	 
                            	  dataIndex: 'wtxh',
                                  width: 100,
                                  sumaryType: 'count',
                                  summaryRenderer: function (value, summaryData, dataIndex) {
                                      return '合计';
                                  }
                              },{
                            	  header: '材料货号',
                                  dataIndex: 'clhh',
                                  width: 220,
                                  editor: {} 
                              },{
                            	  header: '材料名称',
                                  dataIndex: 'clmc',
                                  width: 300,                              
                                  editor:{
                      				    xtype:'commonTrigger',
                      					name:'clmc',
                      					itemId:'clmc',
                      					selModel:'SINGLE',
                      				    cusConfig:{
                      					   type:'QuotDetail',
                      					   field:'clmc',
                      					   indexNum:3,
                      					   callback : function(v,rec,recs){
                      										me.clmcCallback(v,rec,recs);
                      									}
                      					},
                      					 win:'erp.materialQualityTesting.view.MaterialName'
                      				  },
                      				  renderer:function(v,metaData){
                					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
                				            return v;
                				     }                     
                              },{
                            	  header: '送检数量',
                                  dataIndex: 'sjsl',
                                  width: 220,
                                  xtype: 'numbercolumn',
                                  editor: {},
                                  summaryType: 'sum',
                                  summaryRenderer: function (value, summaryData, dataIndex) {
                                          return Ext.util.Format.number(value, '0,000');
                                      },
                                      renderer: function (value, summaryData, dataIndex) {
                                          return Ext.util.Format.number(value, '0,000');
                                      }
                              },{
                            	  header: '合同号',
                                  dataIndex: 'hth',
                                  width: 220
                              },{
                            	  header: '到货号',
                                  dataIndex: 'dhh',
                                  width: 220
                              },{
                            	  header: '单位',
                                  dataIndex: 'jldw',
                                  width: 220
                              },{
                            	  header: '来料日期',
                                  dataIndex: 'llrq',
                                  width: 220,
                                  xtype: 'datecolumn',
                                  format: 'Y-m-d'
                              }],
                              store: me.wcmStore,
                              plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                                  clicksToEdit: 1,
                                  autoCancel: false,
                                  itemId: 'cellEditing'
                              })
                            }]
                     },
                     //编辑明细部分
                     {
                    	 xtype: 'tabpanel',
                    	 flex: 2,
                    	 items: [{
                    		 xtype: 'grid',
                             itemId: 'grdApplyDetail2',
                             title: '编辑明细',
                             selModel: Ext.create('Ext.selection.CheckboxModel'),
                             columns: [{
                            	 header: '序号',
                                 dataIndex: 'wtsqxh',
                                 width: 100
                             },{
                            	 header: '测试项目',
                                 dataIndex: 'csxm',
                                 width: 120,
                                 editor: {} 
                             },{
                            	 header: '测试标准及方法',
                                 dataIndex: 'csbz',
                                 width: 150,
                                 editor: {}
                             },{
                            	 header: '测试单价',
                                 dataIndex: 'csjg',
                                 width: 120,
                                 xtype: 'numbercolumn' 
                             },{
                            	 header: '备注说明',
                                 dataIndex: 'bzsm',
                                 width: 120,
                                 editor: {}
                             },{
                            	 header: '测试结论',
                                 dataIndex: 'jyjg',
                                 width: 120 
                             },{
                            	 header: '测试值',
                                 dataIndex: 'csz',
                                 width: 120 
                             },{
                            	 header: '紧急度',
                                 dataIndex: 'jjcd',
                                 width: 120
                             },{
                            	 header: '评审人',
                                 dataIndex: 'psrm',
                                 width: 120
                             },{
                            	 header: '评审交期',
                                 dataIndex: 'psjq',
                                 width: 120,
                                 xtype: 'datecolumn',
                                 format: 'Y-m-d' 
                             },{
                            	 header: '处理人',
                                 dataIndex: 'clrm',
                                 width: 120 
                             },{
                            	 header: '附件名称',
                                 dataIndex: 'wjmc',
                                 width: 120
                             },{
                            	 header: '要求交期',
                                 dataIndex: 'yqjq',
                                 width: 120,
                                 xtype: 'datecolumn',
                                 format: 'Y-m-d',
                                 editor: {}
                             }],
                             store: me.wcbStore,
                             plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                                 clicksToEdit: 1,
                                 autoCancel: false,
                                 itemId: 'cellEditing'
                             })
                    	 }]
                     },
                     //底部form部分
                     {
                    	 xtype: 'form',
                         flex: 1,
                         itemId: 'CCOForm1', 
                         bodyPadding: 10,
                         store: me.wcmStore, 
                         layout: 'column',
                         defaults: {
                             labelWidth: 80,
                             padding: 5,
                             xtype: 'textfield'
                         },
                         items: [{
                             itemId: 'cghtyq',
                             name: 'cghtyq',
                             columnWidth: 1,
                             xtype: 'textareafield',
                             grow: true,
                             anchor: '100%'
                         }]
                     }
            ]  	       
        
        });
        me.callParent(arguments);
    },
    clmcCallback : function(view,rec,recs){
        var me = this;
        var grid = me.down('#grdApplyDetail');
        var srec = grid.getSelectionModel().getSelection()[0];
        var store = grid.getStore();
        srec.set('clhh',rec.get('clhh'));
        srec.set('clmc', rec.get('clmc'));
        srec.set('jldw', rec.get('jldw'));
      },
    loadData: function (n_rec,wcq_rec) {
       var me = this;
       var form = me.down('#CCOForm');
       form.loadRecord(wcq_rec);
       var wcmStore = me.wcmStore;
       wcmStore.add(n_rec);
       var cc_rec = Ext.create('erp.materialQualityTesting.model.Cghtb', {
       cghtyq: n_rec[0].get('cghtyq'),
       htbh: n_rec[0].get('htbh')
       });
       var form1 = me.down('#CCOForm1');
       form1.loadRecord(cc_rec);
//       var form1 = me.down('#CCOForm1');
//       form1.loadRecord(n_rec);
//       var cghtyq = erp.Const.callServiceMethodSync('materialQuality/wtjycssqclmxb.act?method=getCghtb', {
//          htbh: rec.get('htbh')
//       });
//       var cc_rec = Ext.create('erp.materialQualityTesting.model.Cghtb', {
//          cghtyq: cghtyq,
//          htbh: rec.get('htbh')
//       });
//       var form1 = me.down('#CCOForm1');
//       form1.loadRecord(cc_rec);
// 
//       var wcmStore = me.wcmStore;
//       wcmStore.load({
//           params: {
//              dhdh: rec.get('dhdh'),
//              dhxh: rec.get('dhxh')
//          }
//       });
//       var maxwtxh = wcmStore.max('wtxh');
//       maxwtxh = Ext.isEmpty(maxwtxh) ? 1 : (maxwtxh + 1);
//       var newrec = Ext.create('erp.materialQualityTesting.model.Wtjycssqclmxb', {
//          wtxh: maxwtxh,
//          wtdh: wcq_rec.get('wtdh'),
//          cghtyq: cghtyq,
//          clhh: rec.get('clhh'),
//          htxh: rec.get('htxh'),
//          hth: rec.get('hth'),
//          sjsl: rec.get('dhsl'),
//          dhdh: rec.get('dhdh'),
//          dhxh: rec.get('dhxh'),
//          dhh: rec.get('dhh'),
//          jldw: rec.get('jldw'),
//          llrq: rec.get('dhrq'),
//          clmc: rec.get('clmc')
//       });
//       newrec.phantom = true;
//       wcmStore.add(newrec);
  }
});