Ext.define('erp.arrivalRegister.view.OutSideImp',{
    extend : 'erp.ux.Window',
    alias : 'widget.Imp_OutSide',
    modal:true,
    width:1050,
    listeners:{
		   'close':function(cmp){
			cmp.destroy();
		   }
	     },
    height: 0.7 * window.screen.height,
    initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.arrivalRegister.store.OutSideImp');
        me.wxStore.load({
            params : {
                hsbm : me.hsbm
            }
        });
         var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items:[{
         	 itemId : 'Queryjhh', fieldLabel :'计划编号 :',labelWidth : 60,
            xtype :'textfield'
         },{
            itemId: 'Querywxbh',fieldLabel : '外协编号 :',labelWidth : 80,
            xtype : 'textfield'
         },{
            itemId: 'Queryclmc',fieldLabel : '材料名称 :',labelWidth : 80,
            xtype : 'textfield'
         },{
            text:'查询',iconCls:'query',
             handler: function(btn){
                me.wxStore.loadPage(1,{
                 params:{
                 	jhh : me.down('#Queryjhh').getValue(),
                 	wxh : me.down('#Querywxbh').getValue(),
                 	search : me.down('#Queryclmc').getValue(),
                 	hsbm : me.hsbm
                 } 
                })
             }
         },{
           text:'重置',
   	  	   iconCls:'refresh_backwards',
   	  	   handler:function(){
   	  	      me.down('#Queryjhh').setValue("");
   	  	      me.down('#Queryclmc').setValue("");
   	  	      me.down('#Querywxbh').setValue("");
   	  	      me.wxStore.reload({
         	  params:{hsbm : me.hsbm
         	  }})
   	  	   }
         }
         ]});         
        Ext.apply(me,{
           layout:{type:'vbox',align: 'stretch'},
            tbar:[sec_bar],
             items:[{
               xtype : 'grid',
               itemId : 'grdUnSelData',
               overflowY:'auto',
			   overflowX:'auto',
			   flex : 1,
			   height : 400,
               selModel:Ext.create('Ext.selection.CheckboxModel'),
               listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.wxStore.remove(rec);
					  }
			    },
			    features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
			   columns : [
			   {header : '外协号',dataIndex:'wxh',width:80,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			   {header : '厂商编号',dataIndex:'csbh',width:160,hidden : true},
			   {header : '厂商名称',dataIndex:'csmc',width:160},
			   {header : '材料货号',dataIndex:'clhh',width:80},
			   {header : '材料名称',dataIndex:'clmc',width:160},
			   {header : '材料特性',dataIndex:'cltx1',width:100},
			   {header : '单位',dataIndex:'jldw',width:50},
			   {header : '进货编号',dataIndex: 'jhbh',hidden : true },
			   {header : '进货序号',dataIndex: 'jhxh',hidden : true },
			   {header : '辅助单位',dataIndex:'fzdw',width:50},
			   {header : '加工数量',dataIndex:'jgsl',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			   {header : '已到数量',dataIndex:'dhrk',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			   {header : '未到数量',dataIndex:'wdsl',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			   {header : '计划号',dataIndex:'jhh',width:80},
			   {header : '外协日期',dataIndex:'wxrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
			   {header : '完成日期',dataIndex:'wcrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
			   {header : '产品名称',dataIndex:'cpmc',width:160},
			   {header : '主产品名称',dataIndex:'zcpmc',width:160},
			   {header : '客户型号',dataIndex:'khxh',width:80},
			   {header : '生产单号',dataIndex:'jhbz',width:80},
			   {header : '备注说明',dataIndex:'bzsm',width:80}
			   ],store:me.wxStore,
			   dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.wxStore
				}]			   
            },{
              xtype:'container',
		      width : 400,
		      align : 'center',  
		      layout:{type:'hbox',align:'stretch',pack:'center',defaultMargins:5},
		          items:[{
		              itemIditemId:'btn_sel',
					  xtype:'button',
					  tooltip:'选择',
					  text:'选择',
					  iconCls:'control-270',
					  listeners:{
					     click:function(but,  e,  eOpts){
					     	recs=me.down('#grdUnSelData').getSelectionModel().getSelection();
					        me.selStore.add(recs);
					        me.wxStore.remove(recs);
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
							recs=me.wxStore.getRange();
							me.selStore.add(recs);
					        me.wxStore.remove(recs);
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
							    me.wxStore.insert(me.wxStore.getCount(),recs);
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
							me.wxStore.insert(me.wxStore.getCount(),recs);
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
						me.wxStore.insert(me.wxStore.getCount(),rec);
				 }
				}, 

			  columns : [
			   	{header : '外协号',dataIndex:'wxh',width:100,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			   {header : '厂商编号',dataIndex:'csbh',width:200,hidden : true},
			   {header : '厂商名称',dataIndex:'csmc',width:200},
			   {header : '材料货号',dataIndex:'clhh',width:100},
			   {header : '材料名称',dataIndex:'clmc',width:200},
			   {header : '材料特性',dataIndex:'cltx1',width:120},
			   {header : '单位',dataIndex:'jldw',width:60},
			   {header : '进货编号',dataIndex: 'jhbh',hidden : true },
			   {header : '进货序号',dataIndex: 'jhxh',hidden : true },
			   {header : '辅助单位',dataIndex:'fzdw',width:60},
			   {header : '加工数量',dataIndex:'jgsl',width:100,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			   {header : '已到数量',dataIndex:'dhrk',width:100,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			   {header : '未到数量',dataIndex:'wdsl',width:100,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			   {header : '计划号',dataIndex:'jhh',width:100},
			   {header : '外协日期',dataIndex:'wxrq',width:100,xtype:'datecolumn',format:'Y-m-d'},
			   {header : '完成日期',dataIndex:'wcrq',width:100,xtype:'datecolumn',format:'Y-m-d'},
			   {header : '产品名称',dataIndex:'cpmc',width:200},
			   {header : '主产品名称',dataIndex:'zcpmc',width:200},
			   {header : '客户型号',dataIndex:'khxh',width:100},
			   {header : '生产单号',dataIndex:'jhbz',width:100},
			   {header : '备注说明',dataIndex:'bzsm',width:100}
			   ],store : me.selStore
            }],
             buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
        })
       me.callParent(arguments);  
    }
})