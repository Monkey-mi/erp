Ext.define('erp.master.purchaseCost.view.SendImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_Send',
     modal:true,
     width:1050,
     requires : ['erp.master.purchaseCost.store.SaleType'],
     height: 0.7 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.master.purchaseCost.store.SendImp');
        me.store.load({
        	params : {
        	}
        });
        me.saletypeStore = Ext.create('erp.master.purchaseCost.store.SaleType');
            me.saletypeStore.load();
        var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
            itemId : 'queryjjdh',fieldLabel : '寄件单号',labelWidth : 60,xtype :'textfield'
        },{
            text:'查询',iconCls:'query',
             handler: function(btn){
                me.store.loadPage(1,{
                    params : {
                       sjdh : me.down('#queryjjdh').getValue()
                    }
                }) 
             }
        },{
            text:'重置',
   	  	    iconCls:'refresh_backwards',
   	  	    handler:function(){
   	  	        me.down('#queryjjdh').setValue("");
   	  	        me.store.reload() 
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
			      {header: '记录编号', width  :100 ,dataIndex: 'jlbh'},
			      {header: '销售类别', width  : 120,dataIndex: 'xslb',
		                    renderer: function(value){
		                          var rec = me.saletypeStore.findRecord('lbbh',value);
		                          return Ext.isEmpty(rec)?value:rec.get('lbmc');
		                        }},
			      {header: '寄件单号',width : 100,dataIndex : 'sjdh'},
			      {header: '寄件日期',width : 100,dataIndex : 'jjrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '快递公司',width : 200,dataIndex : 'csmc'},
			      {header: '公司编号',width : 100,dataIndex : 'csbh',hidden : true},
			      {header: '递送方式',width : 100,dataIndex : 'dsfs',
			      renderer : function(v){
			               if(v==1){
			                   return '加快'
			               }else if(v==2){
			                   return '特快'
			               }else if(v==3){
			                   return '普通'
			               }else if(v==4){
			                   return '经济型'
			               }
			           }},
			      {header: '计费重量',width : 100,dataIndex : 'jfzl'},
			      {header: '递送费用',width : 100,dataIndex : 'dsfy'},
			      {header: '未导费用',width : 100,dataIndex : 'wdje'},
			      {header: '付款方式',width : 100,dataIndex : 'fkfs',
			      renderer : function(v){
			            if(v==1){ 
			             return '月结'
			            }else if(v==2){
			             return '现付'
			            }
			       }},
			      {header: '付费方式',width : 100,dataIndex : 'fffs',
			      renderer : function(v){
			            if(v==1){ 
			             return '预付'
			            }else if(v==3){
			             return '第三付款'
			            }else if(v==4){
			             return '垫付'
			            }else if(v==5){
			             return '客户到付'
			            }
			         }},
			      {header: '委托人',width : 100,dataIndex : 'wtrm'},
			      {header: '收件单位',width : 200,dataIndex : 'sjdw'}
			    ],store:me.store,
			   dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : "pagingbar"+Ext.id(),
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
					        /*Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.store.remove(rec);
							});*/
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
			 {header: '记录编号', width  :100 ,dataIndex: 'jlbh'},
			      {header: '销售类别', width  : 120,dataIndex: 'xslb',
		                    renderer: function(value){
		                          var rec = me.saletypeStore.findRecord('lbbh',value);
		                          return Ext.isEmpty(rec)?value:rec.get('lbmc');
		                        }},
			      {header: '寄件单号',width : 100,dataIndex : 'sjdh'},
			      {header: '寄件日期',width : 100,dataIndex : 'jjrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '快递公司',width : 200,dataIndex : 'csmc'},
			      {header: '递送方式',width : 100,dataIndex : 'dsfs',
			           renderer : function(v){
			               if(v==1){
			                   return '加快'
			               }else if(v==2){
			                   return '特快'
			               }else if(v==3){
			                   return '普通'
			               }else if(v==4){
			                   return '经济型'
			               }
			           }
			      },
			      {header: '计费重量',width : 100,dataIndex : 'jfzl'},
			      {header: '递送费用',width : 100,dataIndex : 'dsfy'},
			      {header: '未导费用',width : 100,dataIndex : 'wdje'},
			      {header: '付款方式',width : 100,dataIndex : 'fkfs',
			       renderer : function(v){
			            if(v==1){ 
			             return '月结'
			            }else if(v==2){
			             return '现付'
			            }
			       }
			      },
			      {header: '付费方式',width : 100,dataIndex : 'fffs',
			       renderer : function(v){
			            if(v==1){ 
			             return '预付'
			            }else if(v==3){
			             return '第三付款'
			            }else if(v==4){
			             return '垫付'
			            }else if(v==5){
			             return '客户到付'
			            }
			         }
			      },
			      {header: '委托人',width : 100,dataIndex : 'wtrm'},
			      {header: '收件单位',width : 200,dataIndex : 'sjdw'}
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