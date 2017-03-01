Ext.define('erp.master.caterialPricePurchase.view.MaterialPriceQuery',{
    extend: 'erp.ux.Window',
    /* requires :['erp.ux.SearchCombobox'],*/
     alias : 'widget.Query_MaterialPrice',
     title : '材料采购价格管理筛选条件',
     iconCls:'page_find',
	 modal:true,
     frame:true,
     width: 350,
     height:190,
     prefix:'clbmb.',
     	initComponent : function() {
		var me=this;
		Ext.apply(me,{
		    layout:'fit',
			overflowY:'auto',
			items : [{
			    xtype : 'form',
			    frame:true,
				heigth:50,
				layout:'column',
				padding : 10,
				defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
					}},
		items : [{
			       name : 'checkbox_clmc',
			       itemId:'checkbox_clmc',
                   xtype 	  :'checkbox',
                    columnWidth:0.1
		          },{
		           fieldLabel : '材料名称',
		           ItemId : 'clmc',
		           name : 'clmc',
		           xtype:'commonTrigger',
		           emptyText : '输入材料名称或编号',
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
			       },{
					name      : 'checkbox_csxh',
					itemId:'checkbox_csxh',
                    xtype 	  :'checkbox',
	                columnWidth:0.1
				   },{
				    fieldLabel : '厂商型号',
				    itemId : 'csxh',
				    name : 'csxh',
				    xtype : 'textfield',
				    columnWidth:0.9,
				    	listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_csxh').setValue(true);
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
				handler:function(){
					me.doQuery();
				}
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]  
			}]
		});
		 this.callParent(arguments);
		 me.down('form').loadRecord(me.rec);
     	},
         
    doQuery:function(){
    	var me = this;
	    /*Ext.apply(me.mainstore.proxy.extraParams, 
			{
				condition:me.getQueryCondition()
			 }
		);*/
		me.mainstore.load({params:{condition:me.getQueryCondition(),
		csbh:me.csbh}});
		me.close();
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
						   if(x=='clmc' &&  obj['checkbox_clmc']){
						 	 arr.push(me.prefix+"clmc like '%"+obj[x]+"%' or "+me.prefix+"clhh = '"+obj[x]+"'");
						   }else if(x=='csxh'  &&  obj['checkbox_csxh']){
			                 arr.push("csjjb.csxh = '"+obj[x]+"'");
			               }
						}
				}
				condition=arr.join(' and ');
	   }
	    return condition;
	 }  
})