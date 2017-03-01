Ext.define('erp.PurchaseCostDetial.view.CostQuery',{
    extend : 'erp.ux.Window',
    alias : 'widget.Query_Cost',
    iconCls:'page_find',
    title:'费用明细筛选',
    modal:true,
    width:470,
    height:410,
    prefix:'cgfyb.',
    requires:[],
    frame:true,
    resizable:false,
    initComponent : function() {
       var me = this;
        Ext.apply(me,{
            layout:{
               type: 'vbox',//垂直分布
			   align: 'stretch'
            },
            overflowY:'auto',
            items : [
              {
                 xtype : 'form',
	    	     padding : 10,
	    	     items : [
	    	     	{
	    	     	   name : 'all',
			        itemId:'all',
                    xtype :'checkbox',
                    boxLabel: '全选',
                    listeners:{
                       change : function(form,  newValue,  oldValue,  eOpts){
                          if(newValue==true){
                          	me.down('#checkbox_fydh').setValue(true);
                          	me.down('#checkbox_fyrq').setValue(true);
                          	me.down('#checkbox_csmc').setValue(true);
                          	me.down('#checkbox_jhh').setValue(true);
                          	me.down('#checkbox_hsbm').setValue(true);
                          	me.down('#checkbox_czym').setValue(true);
                          	me.down('#checkbox_bzsm').setValue(true);
                          }else{
                            me.down('#checkbox_fydh').setValue(false);
                          	me.down('#checkbox_fyrq').setValue(false);
                          	me.down('#checkbox_csmc').setValue(false);
                          	me.down('#checkbox_jhh').setValue(false);
                          	me.down('#checkbox_hsbm').setValue(false);
                          	me.down('#checkbox_czym').setValue(false);
                          	me.down('#checkbox_bzsm').setValue(false);
                          }
                      }
	    	     	}
	    	     },{
	    	          xtype:'fieldset',
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
					items : [
					   {
					      name      : 'checkbox_fydh',
						  itemId:     'checkbox_fydh',
                    	  xtype 	  :'checkbox',
	                      columnWidth:0.1
					   },{
					      fieldLabel : '费用单号',
					      itemId : 'fydh1',
					      name : 'fydh1',
					      columnWidth:0.5,
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fydh').setValue(true);
								}
							}
						}
					   },{
					     fieldLabel : '至',
						  itemId : 'fydh2',
						  name : 'fydh2',
						  xtype : 'numberfield',
						  columnWidth:0.4,
						   labelWidth : 22,
						   listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fydh').setValue(true);
								}
							}
						 }
					   },{
					     name     : 'checkbox_fyrq',
				         itemId   : 'checkbox_fyrq',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },{
					     fieldLabel : '费用日期',
						 xtype : 'datefield',
						 itemId : 'fyrq1',
						 name : 'fyrq1',
						 columnWidth:.52
						 ,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fyrq').setValue(true);
								}
							}
						 }
					   },{
					   	 fieldLabel : '至',
					   	 labelWidth : 22,
						 itemId : 'fyrq2',
						 name : 'fyrq2',
						 xtype:'datefield',
						 columnWidth : .38
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
					   fieldConfig:{forceSelection:true},
					   listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_csmc').setValue(true);
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
						name      : 'checkbox_hsbm',
						itemId:'checkbox_hsbm',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					    },{
			            fieldLabel: '核算部门',
			            itemId : 'hsbm',
			            name : 'hsbm',
			            columnWidth: .9,
			            displayField : 'bmmc',
				        valueField: 'hsbm',
			            xtype : 'comboxTree',
				        queryMode : 'local',
				        store : Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree'),
			            displayField : 'text',
				        valueField: 'nodeId',
					    listeners:{
							'select' :function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_hsbm').setValue(true);
								}
							}
						} 
			    },{
		                name : 'checkbox_jhh',
			            itemId:'checkbox_jhh',
                        xtype 	  :'checkbox',
                        columnWidth:0.1
		             },{
		                fieldLabel : '计划号',
						itemId : 'jhh1',
						name : 'jhh1',
						xtype : 'numberfield',
						columnWidth:0.5,
						listeners:{
						   'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jhh').setValue(true);
								}
							}
						}
		             },{
		             	fieldLabel : '至',
						itemId : 'jhh2',
						name : 'jhh2',
						xtype : 'numberfield',
						columnWidth:0.4,
						labelWidth : 22,
						listeners:{
						   'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jhh').setValue(true);
								}
							}
						}
		             },{
					    name : 'checkbox_czym',
						itemId:'checkbox_czym',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
					    fieldLabel : '操作员名',
					    name : 'czym',
					    itemId : 'czym',
					    columnWidth:0.9,
					    listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_czym').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},{
		              name     : 'checkbox_bzsm',
				      itemId   : 'checkbox_bzsm',
                      xtype 	  : 'checkbox',
	                  columnWidth:0.1
		             },{
		                fieldLabel : '备注说明',
		                name : 'bzsm',
		                itemId : 'bzsm',
		                columnWidth:.9,
		                listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_bzsm').setValue(true);
								}
							}
					    }
		             }
					]
	    	       }
	    	       ],
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
				               /* console.log(this);	
				                var win = this.up('#Query_Cost');
				                console.log(win)*/
				                me.doQuery();
				                }
			          },
			           {text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			           ] 
	    	    }]
       });this.callParent(arguments);
       me.down('form').getForm().loadRecord(me.rec);
     },
      doQuery:function(){
      var me = this;	
      Ext.apply(me.mainstore.proxy.extraParams,
        {
        	condition:me.getQueryCondition()
        })
      me.mainstore.load();  
      me.close();
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
                   if(x=='fydh1' && obj['checkbox_fydh']){
                      arr.push(me.prefix+"fydh >= '"+obj[x]+"'")
                   }else if(x=='fydh2' && obj['checkbox_fydh']){
                      arr.push(me.prefix+"fydh<= '"+obj[x]+"'")
                   }else if(x=='fyrq1'&& obj['checkbox_fyrq']){
				     arr.push(me.prefix+"fyrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
				   }else if(x=='fyrq2'&& obj['checkbox_fyrq']){
					 arr.push(me.prefix+"fyrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
				   }else if(x=='csmc' && obj['checkbox_csmc']){
					 arr.push("csmc like '%"+obj[x]+"%'");
				   }else if(x=='hsbm' && obj['checkbox_hsbm']){
				   	 console.log(obj[x])
				     arr.push( "left(cgfyb.hsbm,len('"+obj[x]+"')) ='"+obj[x]+"'");
				   }else if(x=='jhh1' && obj['checkbox_jhh']){
                     arr.push(me.prefix+"jhbh >= '"+obj[x]+"'")
                   }else if(x=='jhh2' && obj['checkbox_jhh']){
                     arr.push(me.prefix+"jhbh <= '"+obj[x]+"'")
                   }else if(x=='bzsm' && obj['checkbox_bzsm']){
					 arr.push("bzsm like '%"+obj[x]+"%'");
				   }else if(x=='czym' && obj['checkbox_czym']){
					 arr.push(me.prefix+"czym like '%"+obj[x]+"%'");
				   }
                }
             }
	         condition=arr.join(' and ');
         }
        return condition;
      }
})