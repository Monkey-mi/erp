Ext.define('erp.master.purchaseCost.view.TaskImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_Task',
     modal:true,
     width : 0.9 * window.screen.width,
	 height:0.8 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.store = Ext.create('erp.master.purchaseCost.store.TaskImp');
        me.selStore = Ext.create('erp.master.purchaseCost.store.TaskImp');
        me.store.load({
           params : {
              hsbm : me.hsbm
           }
        });
        var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
            itemId : 'queryrwh',fieldLabel : '任务号:',labelWidth : 60,xtype :'textfield'
        },{
            itemId : 'queryscdh',fieldLabel : '生产单号:',labelWidth : 70,xtype :'textfield'
        },{
            itemId : 'querycpmc', fieldLabel :'产品名称:',labelWidth : 70,xtype : 'textfield'
        },{
            itemId : 'querywxcs', fieldLabel : '外协厂商:',labelWidth : 70,xtype : 'textfield'
        },{
            text:'查询',iconCls:'query',
             handler: function(btn){
                   Ext.apply(me.store.proxy.extraParams,
        		  {
                          rwh : me.down('#queryrwh').getValue(),
                          jhbz : me.down('#queryscdh').getValue(),
                          cpmc : me.down('#querycpmc').getValue(),
                          csmc : me.down('#querywxcs').getValue(),
                          hsbm : me.hsbm
                      })
                      me.store.load();
             }
        },{
          text:'重置',
   	  	  iconCls:'refresh_backwards',
   	  	  handler:function(){
   	  	     me.down('#queryrwh').setValue("");
   	  	     me.down('#queryscdh').setValue("");
   	  	     me.down('#querycpmc').setValue("");
   	  	     me.down('#querywxcs').setValue("");
   	  	     delete me.store.proxy.extraParams.rwh;
   	  	     delete me.store.proxy.extraParams.jhbz;
   	  	     delete me.store.proxy.extraParams.cpmc;
   	  	     delete me.store.proxy.extraParams.csmc;
   	  	     me.store.reload({params : {hsbm : me.hsbm}})
   	  	  }
        }]})
        Ext.apply(me,{
            layout:{type:'vbox',align: 'stretch'},
            tbar : sec_bar,
            items :[{
               xtype : 'grid',
               itemId : 'grdUnSelData',
               flex : 1,
               overflowY:'auto',
			   overflowX:'auto',
			   height : 400,
               selModel:Ext.create('Ext.selection.CheckboxModel'),
               listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.store.remove(rec);
					  }
			    },
			    features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
			    columns : [
			      {header: '控价工序', width  :100 ,dataIndex: 'kjbj',
				               renderer: erp.Util.Staterenderer,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '计划类别', width  :100 ,dataIndex: 'jhlbmc'},
			      {header: '计划类别编号', width  :100 ,dataIndex: 'jhlb',hidden: true},
			      {header: '任务号', width  :100 ,dataIndex: 'wxh'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '事物特性', width  :100 ,dataIndex: 'plmth'},
			      {header: '主产品编号', width  :150 ,dataIndex: 'zcpbh',hidden : true},
			      {header: '主产品名称', width  :150 ,dataIndex: 'zcpmc'},
			      {header: '产品名称', width  :150 ,dataIndex: 'cpmc'},
			      {header: '样板编号', width  :100 ,dataIndex: 'ybbh'},
			      {header: '产品图号', width  :100 ,dataIndex: 'cpth'},
			      {header: '生产单号', width  :100 ,dataIndex: 'jhbz'},
			      {header: '工序', width  :100 ,dataIndex: 'gxmc'},
			      {header: '工序编号', width  :100 ,dataIndex: 'gxbh'},
			      {header: '客户名称', width  :150 ,dataIndex: 'khmc'},
			      {header: '单位', width  :100 ,dataIndex: 'jldw'},
			      {header: '计件数量', width  :100 ,dataIndex: 'fcsl',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '已计数量', width  :100 ,dataIndex: 'yrsl',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '未计数量', width  :100 ,dataIndex: 'drsl',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '工序工价', width  :100 ,dataIndex: 'bzgj'},
			      {header: '工价系数', width  :100 ,dataIndex: 'gjxs'},
			      {header: '结算单价', width  :100 ,dataIndex: 'jsdj'},
			      {header: '结算金额', width  :100 ,dataIndex: 'jgje',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '外协厂商', width  :200 ,dataIndex: 'csmc'},
			      {header: '厂商', width  :200 ,dataIndex: 'csbh',hidden: true},
			      {header: '计划号', width  :100 ,dataIndex: 'jhh'},
			      {header: '作业号', width  :100 ,dataIndex: 'zyh'},
			      {header: '主计号', width  :100 ,dataIndex: 'zjh'},
			      {header: '备注说明', width  :200 ,dataIndex: 'bzsm'}
			      
			    ],store:me.store/*,
			   dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.store
				}]*/
		     },{
              xtype:'container',
		      width : 400,
		      align : 'center',  
		      layout:{type:'hbox',align:'stretch',pack:'center',defaultMargins:5},
		          items:[{
		              itemId:'btn_sel',
					  xtype:'button',
					  tooltip:'选择',
					  text:'选择',
					  iconCls:'control-270',
					  listeners:{
					     click:function(but,  e,  eOpts){
					     	recs=me.down('#grdUnSelData').getSelectionModel().getSelection();
					        me.selStore.add(recs);
					        me.store.remove(recs);
					      }
					    }
		          },{
                     itemId:'btn_selAll',
					 xtype:'button',
					 tooltip:'全选',
					 text:'全选',
					 iconCls:'control-double-270',
					 listeners:{
						click:function(but,  e,  eOpts){
							recs=me.store.getRange();
							me.selStore.add(recs);
					        me.store.remove(recs);
						 }
					  }                
                   },{
                    itemId:'btn_unSel',
					tooltip:'取消选择',
					text:'取消选择',
					xtype:'button',
					iconCls:'control-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#proofimelData').getSelectionModel().getSelection();
							    me.store.insert(me.store.getCount(),recs);
								me.selStore.remove(recs);
						}
					}
                   },{
                    itemId:'btn_unSelAll',
					tooltip:'全不选',
					text:'全不选',
					xtype:'button',
					iconCls:'control-double-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.selStore.getRange();
							me.store.insert(me.store.getCount(),recs);
							me.store.reload();
							me.selStore.removeAll();
						}
					} 
                   }]  
            },{
               xtype : 'grid',
		       itemId : 'proofimelData',
		       overflowY:'auto',
			   overflowX:'auto',
			   flex : 1,
			   selModel:Ext.create('Ext.selection.CheckboxModel'),
				 listeners:{
					  'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
				 }
				}, 
               features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
			   columns : [
			      {header: '控价工序', width  :100 ,dataIndex: 'kjbj',
				               renderer: erp.Util.Staterenderer,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '计划类别', width  :100 ,dataIndex: 'jhlb'},
			      {header: '任务号', width  :100 ,dataIndex: 'wxh'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '事物特性', width  :100 ,dataIndex: 'plmth'},
			      {header: '主产品名称', width  :150 ,dataIndex: 'zcpmc'},
			      {header: '产品名称', width  :150 ,dataIndex: 'cpmc'},
			      {header: '样板编号', width  :100 ,dataIndex: 'ybbh'},
			      {header: '产品图号', width  :100 ,dataIndex: 'cpth'},
			      {header: '生产单号', width  :100 ,dataIndex: 'jhbz'},
			      {header: '工序', width  :100 ,dataIndex: 'gxbh'},
			      {header: '客户名称', width  :150 ,dataIndex: 'khmc'},
			      {header: '单位', width  :100 ,dataIndex: 'jldw'},
			      {header: '计件数量', width  :100 ,dataIndex: 'fcsl',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '已计数量', width  :100 ,dataIndex: 'yrsl',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '未计数量', width  :100 ,dataIndex: 'drsl',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '工序工价', width  :100 ,dataIndex: 'bzgj'},
			      {header: '工价系数', width  :100 ,dataIndex: 'gjxs'},
			      {header: '结算单价', width  :100 ,dataIndex: 'jsdj'},
			      {header: '结算金额', width  :100 ,dataIndex: 'jgje',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '外协厂商', width  :200 ,dataIndex: 'csmc'},
			      {header: '厂商', width  :200 ,dataIndex: 'csbh',hidden: true},
			      {header: '计划号', width  :100 ,dataIndex: 'jhh'},
			      {header: '作业号', width  :100 ,dataIndex: 'zyh'},
			      {header: '主计号', width  :100 ,dataIndex: 'zjh'},
			      {header: '备注说明', width  :200 ,dataIndex: 'bzsm'}
			  ],store : me.selStore
			  }
		     ],
		      buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
        })
         me.callParent(arguments);  
     }
})