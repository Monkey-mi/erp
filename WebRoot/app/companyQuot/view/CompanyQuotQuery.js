Ext.define('erp.companyQuot.view.CompanyQuotQuery',{
         extend: 'erp.ux.Window',
         alias: 'widget.win_CQQuery',
         title: '厂商报价单筛选条件',
         iconCls:'page_find',
         modal:true,
         frame:true,
         width: 360,
         height:250,
         prefix : 'csbjdb.',
         initComponent : function() {
         var me = this;
       /*  me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
		 me.argColumns=erp.Util.getColumns(me.argStore.getModel());*/
         Ext.apply(me,{
              layout: 'fit',
              items: [{
                 xtype : 'form',
                 frame:true,
		         heigth:50,
			     layout:'column',
			       defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
				}
              },items:[
                    {
                    xtype: 'tbtext', 
				    text: '基础筛选',
				    columnWidth:1
                    },{
                    name : 'checkbox_bjdh',
                    itemId: 'checkbox_bjdh',
                    xtype : 'checkbox',
                    columnWidth:0.1
                    },{
                    fieldLabel: '报价单号',
                    name: 'bjdh1',
                    xtype:'numberfield',
                    columnWidth: 0.52,
                    listeners:{
							'change':function(obj,value){
							  	me.down('#bjdh2').setValue(value);
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_bjdh').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
                        } 
                    },{
                      itemId: 'bjdh2',
                      name: 'bjdh2',
                      xtype:'numberfield',
					  fieldLabel : '至',
					  labelWidth:20,
					  columnWidth:0.38,
					  listeners:{
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
                    },{
                      name : 'checkbox_bjrq',
                      itemId: 'checkbox_bjrq',
                      xtype : 'checkbox',
                      columnWidth: .1
                    },{
                      fieldLabel : '询价日期',
                      name:'bjrq1',
                      xtype:'datefield',
                      columnWidth:.52
                      ,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_bjrq').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
                    },{
						fieldLabel:'至',
						name:'bjrq2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.38
					},{
						name      : 'checkbox_csmc',
						itemId:'checkbox_csmc',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
					   fieldLabel:'厂商名称',
					   name: 'csmc',
					   itemId: 'csmc',
					   columnWidth:.9,
					   xtype:'helpField',
				       code : erp.DataConst.FACTORYINFO,
					   fieldConfig:{forceSelection:false},
					   listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_csmc').setValue(true);
								}
							}/*,
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }*/
						}
					},{
                      name : 'checkbox_czym',
                      itemId: 'checkbox_czym',
                      xtype : 'checkbox',
                      columnWidth: .1
                    },{
                      fieldLabel : '操作员名',
                      name:'czym',
                      itemId : 'czym',
                      xtype:'textfield',
                      columnWidth:.9,
                      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_czym').setValue(true);
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
				handler:function(){
				var win = this.up('#win_CQQuery');
				me.doQuery(win);}
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			] 
         });   
         this.callParent(arguments);
		 me.down('form').loadRecord(me.rec);
    },
     doQuery:function(win){
		Ext.apply(win.mainstore.proxy.extraParams, 
			{
				condition:win.getQueryCondition()
			 }
		);
		win.mainstore.reload();
		win.close();
	 },
     getQueryCondition : function(){
	   var me = this;
	   var condition = null;
	   var form=me.down('form'); 
	   if (form.getForm().isDirty()){
	         var rec = form.getRecord();
	         form.updateRecord(rec);
			 var obj=rec.getChanges();
			 var arr=[];
			 for(var x in obj){
			      if(!Ext.isEmpty(obj[x])){
			         if(x=='bjdh1'&& obj['checkbox_bjdh']){
			           arr.push(me.prefix+"bjdh >='"+obj[x]+"' ");
			         }else if(x=='bjdh2'&& obj['checkbox_bjdh']){
			           arr.push(me.prefix+"bjdh <='"+obj[x]+"' ");
			         }else if(x=='bjrq1'&& obj['checkbox_bjrq']){
					   arr.push(me.prefix+"bjrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
				     }else if(x=='bjrq2'&& obj['checkbox_bjrq']){
					   arr.push(me.prefix+"bjrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
				     }else if(x=='csmc' && obj['checkbox_csmc']){
					   arr.push(me.prefix+"csbh = '"+obj[x]+"'");
				     }else if(x=='czym' && obj['checkbox_czym']){
				       arr.push(me.prefix+"czym like '%"+obj[x]+"%'");
				     }else if(!obj['checkbox_czym']){
				        if(!Ext.isEmpty(me.mainstore.proxy.extraParams.search))
				        delete me.mainstore.proxy.extraParams.search;
				     }
			      }
			 }	
			condition=arr.join(' and '); 
	    }
	   return condition; 
	   }
})