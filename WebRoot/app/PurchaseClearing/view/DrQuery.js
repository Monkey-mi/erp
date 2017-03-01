Ext.define('erp.PurchaseClearing.view.DrQuery',{
     extend : 'erp.ux.Window',
     alias : 'widget.query_Dr',
     iconCls:'page_find',
     title:'筛选条件',
     modal:true,
     width:420,
     height : 600,
     prefix:'rkdb_yl.',
     requires:['erp.ux.CommonTrigger'],
     frame:true,
     resizable:false,
     initComponent : function() {
       var me=this;
       var curDate=new Date();
	   curDate.setDate(1);
	   var nDate=new Date();
       Ext.apply(me,{
           layout:{
			     type: 'vbox',//垂直分布
			     align: 'stretch'
	    	},
	    	overflowY:'auto',
	        items : [{
	            xtype : 'form',
	    	    frame:true,
	    	    padding : 10,
	    	    items : [
	    	    	{
	    	    	name : 'all',
			        itemId:'all',
                    xtype :'checkbox',
                    boxLabel: '<span style="color:#008cd6">全选</span>',
                      listeners:{
                       change : function(form,  newValue,  oldValue,  eOpts){
                          if(newValue==true){
                          	me.down('#checkbox_rkdh').setValue(true);
                          	me.down('#checkbox_rkrq').setValue(true);
                          	me.down('#checkbox_htbh').setValue(true);
                          	me.down('#checkbox_csmc').setValue(true);
                          	me.down('#checkbox_clmc').setValue(true);
                          	me.down('#checkbox_rklb').setValue(true);
                          	me.down('#checkbox_fzhm').setValue(true);
                          	me.down('#checkbox_tzdh').setValue(true);
                          	me.down('#checkbox_bzsm').setValue(true);
                          	me.down('#checkbox_shdh').setValue(true);
                          	me.down('#checkbox_shsj').setValue(true);
                          }else{
                            me.down('#checkbox_rkdh').setValue(false);
                          	me.down('#checkbox_rkrq').setValue(false);
                          	me.down('#checkbox_htbh').setValue(false);
                          	me.down('#checkbox_csmc').setValue(false);
                          	me.down('#checkbox_clmc').setValue(false);
                          	me.down('#checkbox_rklb').setValue(false);
                          	me.down('#checkbox_fzhm').setValue(false);
                          	me.down('#checkbox_tzdh').setValue(false);
                          	me.down('#checkbox_bzsm').setValue(false);
                          	me.down('#checkbox_shdh').setValue(false);
                          	me.down('#checkbox_shsj').setValue(false);
                          }
                       }
                     }	
	    	    	},{ xtype:'fieldset',
    				title:'<span style="color:#008cd6">基础筛选</span>',
					collapsible: true,
					layout:'column',
					defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
		      	     listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                 }
					  }
	    	    	},
	    	    	   items:[
	    	    	   {
	    	    	   	    name : 'checkbox_rkdh',
							itemId: 'checkbox_rkdh',
						    xtype 	  :'checkbox',
                            columnWidth:0.1
	    	    	   },{
	    	    	        fieldLabel : '入库单号',
						    itemId : 'rkdh1',
						    name : 'rkdh1',
						    columnWidth:0.5,
							listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
									me.down('#rkdh2').setValue(value);
							  		me.down('#checkbox_rkdh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						  }
	    	    	     },{
	    	    	        fieldLabel : '至',
						    itemId : 'rkdh2',
						    name : 'rkdh2',
						    columnWidth:0.4,
						    labelWidth : 20,
						    listeners:{
							  'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_rkdh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                 }
						   }
	    	    	     },{
	    	    	       name     : 'checkbox_rkrq',
				           itemId   : 'checkbox_rkrq',
                           xtype 	  : 'checkbox',
	                       columnWidth:0.1
	    	    	     },{
	    	    	       fieldLabel : '入库日期',
						   itemId : 'rkrq1',
						   name : 'rkrq1',
						   xtype:'datefield',
						   format: 'Y-m-d',
						   columnWidth:.52
						   ,listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
								 	me.down('#rkrq2').setValue(value);
							  		me.down('#checkbox_rkrq').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                  }
						    }
	    	    	     },{
	    	    	       fieldLabel : '至',
						   itemId : 'rkrq2',
						   name : 'rkrq2',
						   xtype:'datefield',
						   format: 'Y-m-d',
						   labelWidth:20,
						   columnWidth : .38,
						   listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_rkrq').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                  }
						    }
	    	    	     },{
	    	    	       name : 'checkbox_htbh',
						   itemId: 'checkbox_htbh',
						   xtype 	  :'checkbox',
                           columnWidth:0.1
	    	    	     },{
	    	    	       fieldLabel : '合同编号',
						   itemId : 'htbh1',
						   name : 'htbh1',
						   columnWidth:0.5,
							 listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
								 	 me.down('#htbh2').setValue(value);
							  		 me.down('#checkbox_htbh').setValue(true);
								 }
							 },
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                      }
	    	                  }
						  }
	    	    	     },{
	    	    	       fieldLabel : '至',
						   itemId : 'htbh2',
						   name : 'htbh2',
						   columnWidth:0.4,
						   labelWidth : 20,
						   listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_htbh').setValue(true);
								 }
							 },
	                    	 specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                     }
	    	                  }
						    }
	    	    	     },{
                           name      : 'checkbox_csmc',
						   itemId:     'checkbox_csmc',
                    	   xtype 	  :'checkbox',
	                       columnWidth:0.1	    	    	     
	    	    	     },{
	    	    	       fieldLabel:'供应厂商',
					       name: 'csmc',
					       itemId: 'csmc',
					       columnWidth:.9,
					       xtype:'helpField',
				           code : erp.DataConst.FACTORYINFO,
					       fieldConfig:{forceSelection:false},
					   listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
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
						   name : 'checkbox_clmc',
			               itemId:'checkbox_clmc',
                           xtype 	  :'checkbox',
                           columnWidth:0.1
						 },{
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
						 } 
	    	    	   ]
	    	    	},{
	    	    	xtype:'fieldset',
    			    title:'<span style="color:#008cd6">拓展筛选</span>',
    			    collapsible: true,
    			    layout:'column',
    			    defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
		      	       listeners:{
                    	  specialkey: function(field, e){
    	                     if (e.getKey() == e.ENTER) {
    	                         me.doQuery();
    	                     }
    	                 }
					  }},
					  items : [
					    {
					     name : 'checkbox_rklb',
			             itemId:'checkbox_rklb',
                         xtype 	  :'checkbox',
                         columnWidth:0.1
					    },{
					     fieldLabel : '入库类别',
		                 name : 'rklb',
		                 itemId : 'rklb',
		                 columnWidth:.9,
		                  listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
							  		 me.down('#checkbox_rklb').setValue(true);
								 }
							 },
	                    	 specialkey: function(field, e){
	    	                     if (e.getKey() == e.ENTER) {
	    	                         me.doQuery();
	    	                     }
	    	                  }
					    	}
					     },{
		                  name  : 'checkbox_fzhm',
			              itemId:'checkbox_fzhm',
                          xtype :'checkbox',
                          columnWidth:0.1					     
					     },{
					      fieldLabel : '分组号码',
		                  name : 'fzhm',
		                  itemId : 'fzhm',
		                  columnWidth:.9,
		                  listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
							  		 me.down('#checkbox_fzhm').setValue(true);
								 }
							 },
	                    	 specialkey: function(field, e){
	    	                     if (e.getKey() == e.ENTER) {
	    	                         me.doQuery();
	    	                     }
	    	                  }
					    	}					     
					     },{
					     name     : 'checkbox_tzdh',
				         itemId   : 'checkbox_tzdh',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					     },{
						 fieldLabel : '开票通知号',
						 itemId : 'tzdh1',
						 name : 'tzdh1',
						 labelWidth:72,
						 columnWidth:.52
						 ,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
									me.down('#tzdh2').setValue(value);
							  		me.down('#checkbox_tzdh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						 }					     
					     },{
					      fieldLabel : '至',
						  itemId : 'tzdh2',
						  name : 'tzdh2',
						  columnWidth:0.38,
						   labelWidth : 20,
						   listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_tzdh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						  }
					     },{
		                  name : 'checkbox_bzsm',
			              itemId:'checkbox_bzsm',
                          xtype 	  :'checkbox',
                          columnWidth:0.1
		                 },{
		                  fieldLabel : '备注说明',
		                  itemId : 'bzsm',
		                  name : 'bzsm',
		                  columnWidth : .9,
		                  listeners:{
		                  'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_bzsm').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                  }
						   }
		                 },{
		                 name : 'checkbox_shdh',
			             itemId:'checkbox_shdh',
                         xtype 	  :'checkbox',
                         columnWidth:0.1		                 
		                 },{
   						 fieldLabel : '送货单号',
						 itemId : 'shdh',
						 name : 'shdh',
						 columnWidth:0.9,
							 listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
							  		 me.down('#checkbox_shdh').setValue(true);
								 }
							 },
	                    	 specialkey: function(field, e){
	    	                     if (e.getKey() == e.ENTER) {
	    	                         me.doQuery();
	    	                     }
	    	                 }
						   }		                 
		                 },{
		                   name     : 'checkbox_shsj',
				           itemId   : 'checkbox_shsj',
                           xtype 	  : 'checkbox',
	                       columnWidth:0.1
		                },{
		                   fieldLabel : '送货日期',
						   itemId : 'shsj1',
						   name : 'shsj1',
						   xtype:'datefield',
						   format: 'Y-m-d',
						   columnWidth:.52
						   ,listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
								 	 me.down('#shsj2').setValue(value);
							  		 me.down('#checkbox_shsj').setValue(true);
								 }
							 },
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                 }
						   }
		                 },{
		                   fieldLabel : '至',
						   itemId : 'shsj2',
						   name : 'shsj2',
						   xtype:'datefield',
						   format: 'Y-m-d',
						   columnWidth : .38,
						   labelWidth:20
						     ,listeners:{
							 'change':function(obj,value){
								 if(!Ext.isEmpty(value)){
							  		 me.down('#checkbox_shsj').setValue(true);
								 }
							 },
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                 }
						   }
		                 }
					  ]
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
			              	handler:function(){me.doQuery()}
			          },
			           {text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			           ] 
	        }]	
	    });
	    this.callParent(arguments);
	    var form = me.down('form');
		form.loadRecord(me.search);
     },
      doQuery:function(btn){
      	var me = this;
		var form = me.down('form');
		form.updateRecord(me.search);
		var rec=form.getValues();
		var strWhere =''
		if(rec.checkbox_rkdh!=null){
	strWhere+="and ( left(rkdh,len('"+rec.rkdh1+"'))>= '"+rec.rkdh1+"' and left(rkdh,len('"+rec.rkdh2+"')) <='"+rec.rkdh2+"')";	
		}
		if(rec.checkbox_rkrq!=null){
			strWhere+=" and ( compareDate(rkrq,'"+rec.rkrq1+"')>=0 and compareDate(rkrq,'"+rec.rkrq2+" 23:59:59"+"')<=0 and rkrq!='')";
		}
		if(rec.checkbox_htbh!=null){
			strWhere+=" and ( left(htbh,len('"+rec.htbh1+"'))>= '"+rec.htbh1+"' and left(htbh,len('"+rec.htbh2+"')) <='"+rec.htbh2+"')";
		}
		if(rec.checkbox_csmc!=null&&rec.csmc!=null){
			strWhere+=" and (indexOf(csmc,'"+rec.csmc+"')>=0)";
		}
		if(rec.checkbox_clmc!=null&&rec.clmc!=null){
			strWhere+=" and (indexOf(clmc,'"+rec.clmc+"')>=0)";
		}
		if(rec.checkbox_rklb!=null&&rec.rklb!=null){
			strWhere+=" and (indexOf(rklbmc,'"+rec.rklb+"')>=0)";
		}
		if(rec.checkbox_fzhm!=null){
			strWhere+=" and (indexOf(fzhm,'"+rec.fzhm+"')>=0)";
		}
		if(rec.checkbox_tzdh!=null&&rec.tzdh!=null){
			strWhere+=" and ( left(tzdh,len('"+rec.tzdh1+"'))>= '"+rec.tzdh1+"' and left(tzdh,len('"+rec.tzdh2+"')) <='"+rec.tzdh2+"')";
		}
		if(rec.checkbox_bzsm!=null&&rec.bzsm!=null){
			strWhere+=" and (indexOf(bzsm,'"+rec.bzsm+"')>=0)";
		}
		if(rec.checkbox_shdh!=null&&rec.shdh!=null){
			strWhere+=" and (indexOf(shdh,'"+rec.shdh+"')>=0)";
		}
		if(rec.checkbox_shsj!=null){
			strWhere+=" and ( compareDate(shsj,'"+rec.shsj1+"')>=0 and compareDate(shsj,'"+rec.shsj2+" 23:59:59"+"')<=0 and shsj!='')";
		}
		if(strWhere==''){
				me.mainGrid.querywin='';
		}else{
				me.mainGrid.querywin=strWhere;
		}
		me.mainGrid.filterOnAll();
		me.close();
      /* me.mainstore.load({params:
			{    
				csbh : me.csbh,
				hsbm : me.hsbm,
				condition:me.getQueryCondition()
			 }
       });*/
      }
})