Ext.define('erp.master.purchaseCost.view.AbnormalImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_Abnormal',
     modal:true,
    width : 0.75 * window.screen.width,
	height:0.8 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.master.purchaseCost.store.AbnormalImp');
        me.store.load();
        var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
            itemId : 'queryycdh',fieldLabel :'异常单号:',labelWidth : 60,xtype :'textfield'
        },{
            itemId : 'querykhmc',fieldLabel : '客户名称',labelWidth : 60,xtype :'textfield'
        },{
            itemId : 'querycpmc',fieldLabel : '产品名称',labelWidth : 60,xtype :'textfield'
        },{
            text:'查询',iconCls:'query',
             handler: function(btn){
                 Ext.apply(me.store.proxy.extraParams,
                     {
                          ycdh : me.down('#queryycdh').getValue(),
                          khmc : me.down('#querykhmc').getValue(),
                          cpmc : me.down('#querycpmc').getValue()
                      })
                     me.store.load(); 
             }
        },{
           text:'重置',
   	  	   iconCls:'refresh_backwards',
   	  	   handler:function(){
   	  	      me.down('#queryycdh').setValue("");
   	  	      me.down('#querykhmc').setValue("");
   	  	      me.down('#querycpmc').setValue("");
   	  	      delete me.store.proxy.extraParams.ycdh;
   	  	      delete me.store.proxy.extraParams.khmc;
   	  	      delete me.store.proxy.extraParams.cpmc;
   	  	      me.store.reload();
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
			      {header: '异常单号', width  :100 ,dataIndex: 'ycdh'},
			      {header: '序号', width  :60 ,dataIndex: 'jlxh'},
			      {header: '计划类别', width  :100 ,dataIndex: 'jhlb',hidden : true},
			      {header: '计划类别', width  :100 ,dataIndex: 'jhlbmc'},
			      {header: '客户名称', width  :200 ,dataIndex: 'khmc'},
			      {header: '生产单号', width  :100 ,dataIndex: 'scdh'},
			      {header: '产品名称', width  :200 ,dataIndex: 'cpmc'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '异常类型', width  :100 ,dataIndex: 'yclx'},
			      {header: '异常主题', width  :100 ,dataIndex: 'yczt'},
			      {header: '异常金额', width  :100 ,dataIndex: 'ycje'},
			      {header: '异常描述', width  :100 ,dataIndex: 'ycms'},
			      {header: '供应厂商', width  :200 ,dataIndex: 'csmc'},
			      {header: '厂商编号', width  :200 ,dataIndex: 'csbh',hidden : true},
			      {header: '订单号', width  :100 ,dataIndex: 'ddh'},
			      {header: '计划号', width  :100 ,dataIndex: 'jhh'},
			      {header: '打样号', width  :100 ,dataIndex: 'dyh'},
			      {header: '出运号', width  :100 ,dataIndex: 'cyh'},
			      {header: '责任人', width  :100 ,dataIndex: 'zrrm'},
			      {header: '申请人', width  :100 ,dataIndex: 'sqrm'},
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
			  {header: '异常单号', width  :100 ,dataIndex: 'ycdh'},
			      {header: '序号', width  :60 ,dataIndex: 'jlxh'},
			      {header: '计划类别', width  :100 ,dataIndex: 'jhlb'},
			      {header: '客户名称', width  :200 ,dataIndex: 'khmc'},
			      {header: '生产单号', width  :100 ,dataIndex: 'scdh'},
			      {header: '产品名称', width  :200 ,dataIndex: 'cpmc'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '异常类型', width  :100 ,dataIndex: 'yclx'},
			      {header: '异常主题', width  :100 ,dataIndex: 'yczt'},
			      {header: '异常金额', width  :100 ,dataIndex: 'ycje'},
			      {header: '异常描述', width  :100 ,dataIndex: 'ycms'},
			      {header: '供应厂商', width  :200 ,dataIndex: 'csmc'},
			      {header: '厂商编号', width  :200 ,dataIndex: 'csbh',hidden : true},
			      {header: '订单号', width  :100 ,dataIndex: 'ddh'},
			      {header: '计划号', width  :100 ,dataIndex: 'jhh'},
			      {header: '打样号', width  :100 ,dataIndex: 'dyh'},
			      {header: '出运号', width  :100 ,dataIndex: 'cyh'},
			      {header: '责任人', width  :100 ,dataIndex: 'zrrm'},
			      {header: '申请人', width  :100 ,dataIndex: 'sqrm'},
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