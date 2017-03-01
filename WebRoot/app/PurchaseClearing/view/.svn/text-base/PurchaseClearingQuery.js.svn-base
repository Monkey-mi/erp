Ext.define('erp.PurchaseClearing.view.PurchaseClearingQuery',{
     extend : 'erp.ux.Window',
     alias : 'widget.query_PurchaseClearing',
     iconCls:'page_find',
     title:'采购结算核对管理筛选条件',
     modal:true,
     width:370,
     height:280,
     prefix:'kptzb.',
     requires:['erp.ux.CommonTrigger'],
     frame:true,
     resizable:false,
     initComponent : function() {
       var me=this;
     /*  me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');*/
	   /*me.argColumns=erp.Util.getColumns(me.argStore.getModel());*/
       Ext.apply(me,{
           layout:{
			     type: 'vbox',//垂直分布
			     align: 'stretch'
	    	},
	    	overflowY:'auto',
	    	items: [
	    	{
	    	    xtype : 'form',
	    	    frame:true,
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
                          	me.down('#checkbox_tzdh').setValue(true);
                          	me.down('#checkbox_tzrq').setValue(true);
                          	me.down('#checkbox_csmc').setValue(true);
                          	me.down('#checkbox_czym').setValue(true);
                          }else{
                            me.down('#checkbox_tzdh').setValue(false);
                            me.down('#checkbox_tzrq').setValue(false);
                            me.down('#checkbox_csmc').setValue(false);
                            me.down('#checkbox_czym').setValue(false);
                          }
                       }
                     }
	    	        },
	    	    	{
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
					}},
					items : [
						{
							name : 'checkbox_tzdh',
							itemId: 'checkbox_tzdh',
						    xtype 	  :'checkbox',
                            columnWidth:0.1
						},{
						fieldLabel : '通知单号',
						itemId : 'tzdh1',
						name : 'tzdh1',
						xtype : 'numberfield',
						columnWidth:0.5,
							listeners:{
							'change':function(obj,value){
								me.down('#tzdh2').setValue(value);
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
						  fieldLabel : '至',
						  itemId : 'tzdh2',
						  name : 'tzdh2',
						  xtype : 'numberfield',
						  columnWidth:0.4,
						   labelWidth : 22,
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
						 name     : 'checkbox_tzrq',
				         itemId   : 'checkbox_tzrq',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
						},{
						 fieldLabel : '通知日期',
						 xtype : 'datefield',
						 itemId : 'tzrq1',
						 name : 'tzrq1',
						 columnWidth:.52
						 ,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_tzrq').setValue(true);
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
						   itemId : 'tzrq2',
						   name : 'tzrq2',
						   xtype:'datefield',
						   labelWidth : 20,
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
						name      : 'checkbox_czym',
						itemId:     'checkbox_czym',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
						},{
						fieldLabel : '操作员名',
						itemId : 'czym',
						name : 'czym',
						xtype:'textfield',
						columnWidth : .9,
						 listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_czym').setValue(true);
								}
							}
						  }
						}
						/*,{
						fieldLabel : '厂商编号',
						itemId : 'csbh',
						name : 'csbh',
						hidden : true
						}*//*,{
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
		               }*/
						]
	    	    }/*,{
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
		                 name : 'checkbox_hth',
			             itemId:'checkbox_hth',
                         xtype 	  :'checkbox',
                         columnWidth:0.1
		             },{
		             	fieldLabel : '合同号',
		                name : 'hth1',
		                itemId : 'hth1',
		                columnWidth:.52,
		                 listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_hth').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
		             },{
		             fieldLabel: '至',
		             itemId : 'hth2',
		             name : 'hth2',
		             columnWidth:0.38,
		             labelWidth : 22,
		               listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_hth').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
		             },{
		                 name : 'checkbox_rklb',
			             itemId:'checkbox_rklb',
                         xtype 	  :'checkbox',
                         columnWidth:0.1
		             },{
		               fieldLabel : '入库类别',
		               itemId : 'rklb',
		               name : 'rklb',
		                columnWidth:.9
		             },{
		                name : 'checkbox_bzsm',
			            itemId:'checkbox_bzsm',
                        xtype 	  :'checkbox',
                        columnWidth:0.1
		             },{
		                fieldLabel : '备注说明',
		                itemId : 'bzsm',
		                name : 'bzsm',
		                columnWidth : .9
		             }
					]
	    	    }*/],
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
				var win = this.up('#query_PurchaseClearing');
				me.doQuery(win);}
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			] 
	      }]
       	});
       	this.callParent(arguments);
		 me.down('form').getForm().loadRecord(me.rec);
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
             	var rec = form.getRecord();
             	form.updateRecord(rec);
	            var obj=rec.getChanges();
	            var arr=[];
	            for(var x in obj){
	                 if(!Ext.isEmpty(obj[x])){
	                    if(x=='tzdh1' && obj['checkbox_tzdh']){
	                       arr.push(me.prefix+"tzdh >= '"+obj[x]+"'");
	                    }else if(x=='tzdh2' && obj['checkbox_tzdh']){
	                       arr.push(me.prefix+"tzdh <= '"+obj[x]+"'");
	                    }else if(x=='tzrq1'&& obj['checkbox_tzrq']){
						     arr.push(me.prefix+"tzrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						}else if(x=='tzrq2'&& obj['checkbox_tzrq']){
						     arr.push(me.prefix+"tzrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
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