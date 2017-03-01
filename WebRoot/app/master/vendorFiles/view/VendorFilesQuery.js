Ext.define('erp.master.vendorFiles.view.VendorFilesQuery',{
         extend: 'erp.ux.Window',
          requires : ['erp.ux.SearchCombobox',
                     'erp.master.vendorFiles.store.VendorFiles'],
         alias: 'widget.win_VFQuery',
         title : '厂商档案管理筛选条件',
         iconCls:'page_find',
         modal:true,
         frame:true,
         width: 330,
         height:450,
         prefix:'csxxb.',
         initComponent : function() {
		var me=this;
		me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
		me.argColumns=erp.Util.getColumns(me.argStore.getModel());
		Ext.apply(me,{
		     layout: 'fit',
		     overflowY:'auto',
		     items:[{
		       xtype: 'form',
		       frame: true,
		       height:50,
		       layout:'column',
		       defaults:{padding:5,labelWidth:60,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
				}},
				items:[{
				    xtype : 'tbtext',
				    text:'基础筛选',
				    columnWidth:1
				},{
				    name : 'checkbox_csmc',
				    itemId : 'checkbox_csmc',
				    xtype : 'checkbox',
				    columnWidth : 0.1
				},{
				    fieldLabel:'厂商名称',
				    name: 'csmc',
				    itemId : 'csmc',
				    columnWidth:.9,
				    xtype:'selectfield',
				         openconfig:{
					       modal:true,
					       title:'参数选取',
					       singleSelect:true,
					       editable:true,
					       diaplayField:'csmc',
					       valueField:'csmc',
					       insert:true,
					       width:500,
					       height:600,
					       columns:me.argColumns,
					       store:me.argStore
				     },
					listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_csmc').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
				},{
				    name : 'checkbox_cglb',
				    itemId : 'checkbox_cglb',
				    xtype : 'checkbox',
				    columnWidth : 0.1
				},{
				    fieldLabel : '采购类别',
				    name : 'cglb',
				    itemId : 'cglb',
				    xtype : 'comboxTree',
				    queryMode : 'local',
				    store : Ext.create('erp.view.master.category.store.CategoryTree'),
				    displayField : 'text',
					valueField: 'nodeId',                  
				    columnWidth: 0.9,
				    listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_cglb').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
				},{
				    name : 'checkbox_cslb',
				    itemId : 'checkbox_cslb',
				    xtype : 'checkbox',
				    columnWidth : 0.1
				},{
				   fieldLabel : '厂商类别',
				   name : 'cslb',
				   itemId : 'cslb',
				   xtype : 'tps_searchcbo',
				   store : Ext.create('erp.master.vendorFiles.store.VendorFiles'),
				                   displayField:'cslb',
				   columnWidth: 0.9,
				  listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_cslb').setValue(true);
							  		me.store= Ext.create('erp.master.vendorFiles.store.VendorFiles');
						            me.store.loadPage(1,
       	  				    		{
           	  				    	params:{
           	  				    		search:me.down('#cslb').getValue()
           	  				    	}
       	  				    	});
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}		          
				},{
				        xtype: 'tbtext', 
				        text: '扩展筛选',
				       	columnWidth:1
				       },{
						name      : 'checkbox_hggf',
						itemId:'checkbox_hggf',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					    },{
					    fieldLabel : '合格供方',
					    name : 'hggf',
					    itemId : 'hggf',
					    xtype : 'combo',
					    store : [[0,'否'],[1,'是']],
					    columnWidth:.9,
					    listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_hggf').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
				},{
				    name : 'checkbox_wbdh',
				    itemId : 'checkbox_wbdh',
				    xtype : 'checkbox',
				    columnWidth : 0.1
				},{
				   fieldLabel : '币种',
				   name : 'wbdh',
				   itemId : 'wbdh',
				   xtype : 'tps_searchcbo',
				   store : Ext.create('erp.master.foreigncurrency.store.foreignCurrency'),
				                   displayField:'wbdh',
				                   valueField:'wbbh',
				    columnWidth: 0.9,
				  listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_wbdh').setValue(true);
							  		me.store= Ext.create('erp.master.foreigncurrency.store.foreignCurrency');
						            me.store.loadPage(1,
       	  				    		{
           	  				    	params:{
           	  				    		search:me.down('#wbdh').getValue()
           	  				    	}
       	  				    	});
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}		          
				}/*{
						name      : 'checkbox_wbdh',
						itemId:'checkbox_wbdh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					    },{
					    fieldLabel:'币种',
						name: 'wbdh',
						itemId: 'wbdh',
						xtype : 'tps_searchcbo',
				        store : Ext.create('erp.master.foreigncurrency.store.foreignCurrency'),
				                   displayField:'wbdh',
				                   valueField: 'wbbh',
						columnWidth:0.9,
						 listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_wbdh').setValue(true);
							  		me.store= Ext.create('erp.master.foreigncurrency.store.foreignCurrency');
						            me.store.loadPage(1,
       	  				    		{
           	  				    	params:{
           	  				    		search:me.down('#wbdh').getValue()
           	  				    	}
       	  				    	});
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}		
					    }*/,{
						name      : 'checkbox_fkts',
						itemId:'checkbox_fkts',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					    },{
					    fieldLabel:'付款天数',
						name:'fkts',
						xtype:'numberfield',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fkts').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
				},{
						name      : 'checkbox_xyed',
						itemId:'checkbox_xyed',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					    },{
					    fieldLabel:'信用额度',
						name:'xyed',
						xtype:'numberfield',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_xyed').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					    },{
						name      : 'checkbox_zgrd',
						itemId:'checkbox_zgrd',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					    },{
					    fieldLabel:'资格认定',
						name:'zgrd',
						xtype:'combo',
						store : [['船公司','船公司'],['无船承运人','无船承运人'],['非无船承运人','非无船承运人']],
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_zgrd').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					    },{
					    name      : 'checkbox_tdrd',
						itemId:'checkbox_tdrd',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1	
					    },
					    {
					    fieldLabel:'提单认定',
						name:'tdrd',
						xtype:'combo',
						store : [['船公司提单','船公司提单'],['无船承运人提单','无船承运人提单'],['非无船承运人提单','非无船承运人提单']],
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_tdrd').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					    }],
			buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
				handler:me.doQuery
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
			}]  
		     });
		     this.callParent(arguments);
		     me.down('form').loadRecord(me.rec);
         },
         doQuery:function(){
		   Ext.apply(me.mainstore.proxy.extraParams, 
		 	  {
				 condition:me.getQueryCondition()
			  }
		 );
		 me.mainview.loadMain();
		 me.close();
	    },
	    getQueryCondition:function(){
		var me=this;
		var condition=null;
		var form=me.down('form');
		 if (form.getForm().isDirty()){
		    var rec = form.getRecord();
		    form.updateRecord(rec);
		    var obj=rec.getChanges();
			var arr=[];
			for(var x in obj){
			      if(!Ext.isEmpty(obj[x]))
			      {
			       if(x=='csmc' && obj['checkbox_csmc']){
			           arr.push(me.prefix+"csmc like '%"+obj[x]+"%'");
			       }else if(x=='cglb' && obj['checkbox_cglb']){
			           arr.push(me.prefix+"cglb = '"+obj[x]+"'");
			       }else if(x=='cslb' && obj['checkbox_cslb']){
			           arr.push(me.prefix+"cslb = '"+obj[x]+"'");
			       }else if(x=='hggf' && obj['checkbox_hggf']){
			           arr.push(me.prefix+"psbj = '"+obj[x]+"'");
			       }else if(x=='wbdh' && obj['checkbox_wbdh']){
			           arr.push(me.prefix+"wbbh = '"+obj[x]+"'");
			       }else if(x=='fkts' && obj['checkbox_fkts']){
			           arr.push(me.prefix+"fkts = '"+obj[x]+"'");
			       }else if(x=='xyed' && obj['checkbox_xyed']){
			           arr.push(me.prefix+"xyed = '"+obj[x]+"'");
			       }else if(x=='zgrd' && obj['checkbox_zgrd']){
			           arr.push(me.prefix+"zgrd = '"+obj[x]+"'");
			       }else if(x=='tdrd' && obj['checkbox_tdrd']){
			           arr.push(me.prefix+"tdrd = '"+obj[x]+"'");
			       }
			      }
			}
			condition=arr.join(' and ');
		 }
		 return condition;
		 }
});