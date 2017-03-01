Ext.define('erp.arrivalRegister.view.PlanImp',{
    extend : 'erp.ux.Window',
    alias : 'widget.Imp_Plan',
    modal:true,
    width:1050,
    height: 0.7 * window.screen.height,
    initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.arrivalRegister.store.PlanImp');
        me.jhStore.load({
            params : {
                hsbm : me.hsbm
            }
        })
         var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items:[{
         	 itemId : 'Queryjhh', fieldLabel :'计划编号 :',labelWidth : 60,
            xtype :'textfield'
         },{
            itemId: 'Queryclmc',fieldLabel : '材料名称 :',labelWidth : 80,
            xtype : 'textfield'
         },{
            text:'查询',iconCls:'query',
             handler: function(btn){
                me.jhStore.loadPage(1,{
                 params:{
                 	jhh : me.down('#Queryjhh').getValue(),
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
   	  	      me.jhStore.reload({
         	  params:{hsbm : me.hsbm
         	  }})
   	  	   }
         }
         ]}); 
        Ext.apply(me,{
            layout:{type:'vbox',align: 'stretch'},
            tbar:[sec_bar],
            items :[{
               xtype : 'grid',
               itemId : 'grdUnSelData',
               flex:1,
               overflowY:'auto',
			   overflowX:'auto',
			   height : 400,
               selModel:Ext.create('Ext.selection.CheckboxModel'),
               listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.jhStore.remove(rec);
					  }
			    },
			   columns : [
			   {header: '计划号',dataIndex: 'jhh',width:80},
			   {header: '物控交期',dataIndex: 'wkjq',width:80,xtype:'datecolumn',format:'Y-m-d'},
			   {header: '材料货号',dataIndex: 'clhh',width:80},
			   {header: '生产单号',dataIndex: 'jhbz',width:80},
			   {header: '材料名称',dataIndex: 'clmc',width:160},
			   {header: '主产品名称',dataIndex: 'zcpmc',width:160},
			   {header: '单位',dataIndex: 'jldw',width:50},
			   {header: '计划数量',dataIndex: 'jhsl',width:80},
			   {header: '已入库/到库数',dataIndex: 'yrsl',width:80,renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			   {header: '未到货数',dataIndex: 'wrsl',width:80}
			   ],store:me.jhStore,
			   dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.jhStore
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
					        me.jhStore.remove(recs);
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
							recs=me.jhStore.getRange();
							me.selStore.add(recs);
					        me.jhStore.remove(recs);
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
							    me.jhStore.insert(me.jhStore.getCount(),recs);
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
							me.jhStore.insert(me.jhStore.getCount(),recs);
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
						me.jhStore.insert(me.jhStore.getCount(),rec);
				 }
				}, 
			  columns : [
			     {header: '计划号',dataIndex: 'jhh',width:80},
			   {header: '物控交期',dataIndex: 'wkjq',width:80,xtype:'datecolumn',format:'Y-m-d'},
			   {header: '材料货号',dataIndex: 'clhh',width:80},
			   {header: '生产单号',dataIndex: 'jhbz',width:80},
			   {header: '材料名称',dataIndex: 'clmc',width:160},
			   {header: '主产品名称',dataIndex: 'zcpmc',width:160},
			   {header: '单位',dataIndex: 'jldw',width:50},
			   {header: '计划数量',dataIndex: 'jhsl',width:80},
			   {header: '已入库/到库数',dataIndex: 'yrsl',width:80,renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			   {header: '未到货数',dataIndex: 'wrsl',width:80}
			   ],store : me.selStore
            }],
             buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
        })
       me.callParent(arguments);  
    }
})