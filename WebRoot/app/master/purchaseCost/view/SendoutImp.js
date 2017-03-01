Ext.define('erp.master.purchaseCost.view.SendoutImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_Sendout',
     modal:true,
     width : 0.75 * window.screen.width,
	 height:0.8 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.master.purchaseCost.store.SendoutImp');
        me.store.load({
                params : {
                    qsrq : me.qsrq,
                     jzrq : me.jzrq
                 }
        });
        Ext.apply(me.store.proxy.extraParams,{
		   qsrq : me.qsrq,
		   jzrq : me.jzrq
		});
		 var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
		     itemId : 'queryfhdh',fieldLabel : '发货单号:',labelWidth : 60,xtype :'textfield'
		 },{
		 	 itemId : 'querycpmc',fieldLabel : '产品名称:',labelWidth : 60,xtype :'textfield'
		 },{
            text:'查询',iconCls:'query',
             handler: function(btn){
                   Ext.apply(me.store.proxy.extraParams,
                    {
                         fhdh : me.down('#queryfhdh').getValue(),
                         cpmc : me.down('#querycpmc').getValue(),
                         qsrq : me.qsrq,
		                 jzrq : me.jzrq
                      })
                    me.store.load();   
             }
		   },{
		    text:'重置',
   	  	    iconCls:'refresh_backwards',
   	  	    handler:function(){
   	  	       me.down('#queryfhdh').setValue("");
   	  	       me.down('#querycpmc').setValue("");
   	  	       delete me.store.proxy.extraParams.fhdh;
   	  	       delete me.store.proxy.extraParams.cpmc;
   	  	       me.store.reload({params : { qsrq : me.qsrq,
		       jzrq : me.jzrq}})
   	  	     }
		   }  
		 ]})
        Ext.apply(me,{
            layout:{type:'vbox',align: 'stretch'},
            tbar : sec_bar,
            items :[{
               xtype : 'grid',
               itemId : 'grdUnSelData',
               flex : 1,
               flex:1,
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
			      {header: '仓库名称', width  :200 ,dataIndex: 'ckmc'},
			      {header: '发货单号', width  :100 ,dataIndex: 'fhdh'},
			      {header: '序号', width  :60 ,dataIndex: 'fhxh'},
			      {header: '发货日期', width  :100 ,dataIndex: 'fhrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '产品名称', width  :150 ,dataIndex: 'cpmc'},
			      {header: '产品特性', width  :100 ,dataIndex: 'cptx1'},
			      {header: '单位', width  :80 ,dataIndex: 'jldw'},
			      {header: '发货数量', width  :100 ,dataIndex: 'fhsl'},
			      {header: '箱数', width  :100 ,dataIndex: 'fhxs'},
			      {header: '箱体积', width  :100 ,dataIndex: 'mxtj'},
			      {header: '总体积', width  :100 ,dataIndex: 'hjtj'},
			      {header: '未导体积', width  :100 ,dataIndex: 'wdtj'},
			      {header: '备注说明', width  :150 ,dataIndex: 'bzsm'}
			    ],store:me.store,
			   dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.store
				}]
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
						me.store.insert(me.store.getCount(),rec);
				 }
				}, 

			  columns : [
			       {header: '仓库名称', width  :200 ,dataIndex: 'ckmc'},
			      {header: '发货单号', width  :100 ,dataIndex: 'fhdh'},
			      {header: '序号', width  :60 ,dataIndex: 'fhxh'},
			      {header: '发货日期', width  :100 ,dataIndex: 'fhrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '产品名称', width  :150 ,dataIndex: 'cpmc'},
			      {header: '产品特性', width  :100 ,dataIndex: 'cptx1'},
			      {header: '单位', width  :80 ,dataIndex: 'jldw'},
			      {header: '发货数量', width  :100 ,dataIndex: 'fhsl'},
			      {header: '箱数', width  :100 ,dataIndex: 'fhxs'},
			      {header: '箱体积', width  :100 ,dataIndex: 'mxtj'},
			      {header: '总体积', width  :100 ,dataIndex: 'hjtj'},
			      {header: '未导体积', width  :100 ,dataIndex: 'wdtj'},
			      {header: '备注说明', width  :150 ,dataIndex: 'bzsm'}
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