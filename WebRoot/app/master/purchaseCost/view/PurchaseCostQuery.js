Ext.define('erp.master.purchaseCost.view.PurchaseCostQuery',{
         extend: 'erp.ux.Window',
         alias: 'widget.win_PCQuery',
         title: '采购费用单管理筛选条件',
         iconCls:'page_find',
         modal:true,
         frame:true,
         width: 330,
         height:380,
         prefix:'cgfyb.',
         initComponent : function() {
		var me=this;
		/*me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
		me.argColumns=erp.Util.getColumns(me.argStore.getModel());*/
		Ext.apply(me,{
		     layout: 'fit',
		     overflowY:'auto',
		     items:[{
		       xtype:'form',
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
				}},
				items:[
				  {
				        xtype: 'tbtext', 
				        text: '基础筛选',
				       	columnWidth:1
				       },
					 	{
						name      : 'checkbox_fydh',
						itemId:'checkbox_fydh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					      },
					      {
						fieldLabel:'费用单号',
						name:'fydh1',
						xtype:'numberfield',
						columnWidth:0.52,
						listeners:{
							'change':function(obj,value){
							  	me.down('#fydh2').setValue(value);
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fydh').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},{
						itemId:'fydh2',
						name:'fydh2',
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
						name      : 'checkbox_fyrq',
						itemId:'checkbox_fyrq',
                    	xtype 	  :'checkbox',
	                    columnWidth:.1
					},{
						fieldLabel:'费用日期',
						name:'fyrq1',
						xtype:'datefield',
						columnWidth:.52
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fyrq').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						fieldLabel:'至',
						name:'fyrq2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.38
					},{
						name      : 'checkbox_csmc',
						itemId:'checkbox_csmc',
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
				        xtype: 'tbtext', 
				        text: '扩展筛选',
				       	columnWidth:1
				    },{
						name      : 'checkbox_cglb',
						itemId:'checkbox_cglb',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					    },{
						fieldLabel:'采购类别',
						name:'cglb',
						itemId: 'cglb',
						xtype:'comboxTree',
						queryMode : 'local',
						store : Ext.create('erp.view.master.category.store.CategoryTree'),
						displayField : 'text',
					    valueField: 'nodeId',
						columnWidth:.9,
						listeners:{
							'select':function(obj,value){
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
						name      : 'checkbox_jhbh',
						itemId:'checkbox_jhbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
						fieldLabel:'计划号',
						name:'jhbh1',
						xtype:'numberfield',
						columnWidth:.52
						,listeners:{
							'change':function(obj,value){
								me.down('#jhbh2').setValue(value);
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jhbh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						fieldLabel:'至',
						itemId: 'jhbh2',
						name:'jhbh2',
						labelWidth:20,
						xtype:'numberfield',
						columnWidth:.38
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
					    name : 'checkbox_bzsm',
						itemId:'checkbox_bzsm',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'备注说明',
						name:'bzsm',
						columnWidth:0.9
						,listeners:{
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
				var win = this.up('#win_PCQuery');
				me.doQuery(win);}
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
		     }]  
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
        },
     doQuery:function(win){
        	Ext.apply(win.mainstore.proxy.extraParams,
        		{
        			condition:win.getQueryCondition()
        		})
        win.mainview.loadMain();
        win.close();
        },
	getQueryCondition : function(){
	   var me = this;
	   var condition = null;
	   var form=me.down('form'); 
	   if (form.getForm().isDirty()){
				var rec=form.getRecord();
				form.updateRecord(rec);
				var obj=rec.getChanges();
				var arr=[];
				for(var x in obj){
					    
						if(!Ext.isEmpty(obj[x]))
						{
						   if(x=='fydh1'&& obj['checkbox_fydh']){
						     arr.push(me.prefix+"fydh >= '"+obj[x]+"' ");
						   }else if(x=='fydh2'&& obj['checkbox_fydh']){
						     arr.push(me.prefix+"fydh <= '"+obj[x]+"' ");
						   }else if(x=='fyrq1'&& obj['checkbox_fyrq']){
						     arr.push(me.prefix+"fyrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						   }else if(x=='fyrq2'&& obj['checkbox_fyrq']){
						     arr.push(me.prefix+"fyrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						   }else if(x=='csmc' && obj['checkbox_csmc']){
						 	 arr.push(me.prefix+"csbh = '"+obj[x]+"'");
						   }else if(x=='cglb' && obj['checkbox_cglb']){
						 	 arr.push(me.prefix+"cglb = '"+obj[x]+"'");
						   }else if(x=='jhbh1'&& obj['checkbox_jhbh']){
						     arr.push("jhbh >= '"+obj[x]+"' ");
						   }else if(x=='jhbh2'&& obj['checkbox_jhbh']){
						     arr.push("jhbh <= '"+obj[x]+"' ");
						   }else if(x=='bzsm' && obj['checkbox_bzsm']){
						 	 arr.push(me.prefix+"bzsm like '%"+obj[x]+"%'");
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
}})