Ext.define('erp.master.caterialPricePurchase.view.VendorPriceQuery',{
    extend: 'erp.ux.Window',
     requires :['erp.ux.SearchCombobox'],
     alias : 'widget.Query_VendorPrice',
     title : '材料采购价格管理筛选条件',
     iconCls:'page_find',
	 modal:true,
     frame:true,
     width: 350,
     height:250,
     prefix:'csxxb.',
     	initComponent : function() {
		var me=this;
		/*me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
		me.argColumns=erp.Util.getColumns(me.argStore.getModel());*/
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
			        name      : 'checkbox_cglb',
				    itemId:   'checkbox_cglb',
                    xtype 	  :'checkbox',
	                columnWidth:0.1
			        },{
				    fieldLabel : '采购类别',
				    name : 'cglb',
				    itemId : 'cglb',
				    xtype : 'comboxTree',
				    queryMode : 'local',
				    store : Ext.create('erp.view.master.category.store.CategoryTree'),
				    displayField : 'text',
					valueField: 'nodeId',                  
				    columnWidth:0.9,
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
				    name : 'checkbox_csmc',
				    itemId : 'checkbox_csmc',
				    xtype 	  :'checkbox',
				    columnWidth : 0.1
				},{
				    fieldLabel:'厂商名称',
				    name: 'csmc',
				    itemId : 'csmc',
				    columnWidth:.9,
				   xtype:'helpField',
		           code : erp.DataConst.FACTORYINFO,
				   fieldConfig:{forceSelection:true},
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
				    name : 'checkbox_wbbh',
				    itemId : 'checkbox_wbbh',
				    xtype : 'checkbox',
				    columnWidth : 0.1
				},{
				   fieldLabel : '币种',
				   name : 'wbbh',
				   itemId : 'wbbh',
				   xtype : 'tps_searchcbo',
				   store : Ext.create('erp.master.foreigncurrency.store.foreignCurrency'),
				                   displayField:'wbdh',
				                   valueField:'wbbh',
				    columnWidth: 0.9,
				  listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_wbbh').setValue(true);
							  		me.store= Ext.create('erp.master.foreigncurrency.store.foreignCurrency');
						            me.store.loadPage(1,
       	  				    		{
           	  				    	params:{
           	  				    		search:me.down('#wbbh').getValue()
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
		me.mainstore.load({params:{condition:me.getQueryCondition(),clhh:me.clhh}});
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
						   if(x=='cglb' && obj['checkbox_cglb']){
						     arr.push(me.prefix+"cglb = '"+obj[x]+"'");
						   }else if(x=='csmc' && obj['checkbox_csmc']){
						 	 arr.push(me.prefix+"csmc like '%"+obj[x]+"%'");
						 	/* arr.push(me.prefix+"csmc like '%"+obj[x]+"%' or "+me.prefix+"csbh = '"+obj[x]+"'");*/
						   }else if(x=='wbbh' && obj['checkbox_wbbh'] ){
			                 arr.push(me.prefix+"wbbh = '"+obj[x]+"'");
			               }else if(x=='csxh' && obj['checkbox_csxh']){
			                 arr.push("csjjb.csxh = '"+obj[x]+"'");
			               }
						}
				}
				condition=arr.join(' and ');
	   }
	    return condition;
	 }  
})