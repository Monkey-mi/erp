Ext.define('erp.PurchaseClearing.view.UnDetialQuery',{
     extend : 'erp.ux.Window',
     alias : 'widget.query_UnDetial',
     iconCls:'page_find',
     title:'筛选条件',
     modal:true,
     width:370,
     height:380,
     prefix:'',
     requires:['erp.ux.CommonTrigger'],
     frame:true,
     resizable:false,
     initComponent : function() {
       var me=this;
       me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
	   me.argColumns=erp.Util.getColumns(me.argStore.getModel());
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
                          	me.down('#checkbox_csmc').setValue(true);
                          	me.down('#checkbox_cglb').setValue(true);
                          	me.down('#checkbox_bz').setValue(true);
                          	me.down('#checkbox_cslb').setValue(true);
                          }else{
                            me.down('#checkbox_csmc').setValue(false);
                          	me.down('#checkbox_cglb').setValue(false);
                          	me.down('#checkbox_bz').setValue(false);
                          	me.down('#checkbox_cslb').setValue(false);
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
						name      : 'checkbox_csmc',
						itemId:     'checkbox_csmc',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
					   fieldLabel:'厂商名称',
					   name: 'csmc',
					   itemId: 'csmc',
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
						}/*,{
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
		                 name : 'checkbox_cglb',
			             itemId:'checkbox_cglb',
                         xtype 	  :'checkbox',
                         columnWidth:0.1
		             },{
		             	fieldLabel : '采购类别',
		                name : 'cglb',
		                itemId : 'cglb',
		              /*  xtype : '',*/
		                columnWidth:.9,
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
		                 name : 'checkbox_bz',
			             itemId:'checkbox_bz',
                         xtype 	  :'checkbox',
                         columnWidth:0.1
		             },{
		               fieldLabel : '币种',
		               itemId : 'wbbh',
		               name : 'wbbh',
		                columnWidth:.9
		             },{
		                name : 'checkbox_cslb',
			            itemId:'checkbox_cslb',
                        xtype 	  :'checkbox',
                        columnWidth:0.1
		             },{
		                fieldLabel : '厂商类别',
		                itemId : 'cslb',
		                name : 'cslb',
		                columnWidth : .9
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
				handler:me.doQuery
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			] 
	      }]
       	});
       	this.callParent(arguments);
     /*  	 console.log('form  '+me.down('form'))
       	 console.log(me.rec);
		 me.down('form').getForm().loadRecord(me.rec);
		 console.log('---------------')*/
      },
        doQuery:function(){
        me.mainstore.load({params:{condition:me.getQueryCondition()}});
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
	                    if(x=='tzdh1' && obj['checkbox_tzdh']){
	                       arr.push(me.prefix+"tzdh >= '"+obj[x]+"'");
	                    }else if(x=='tzdh2' && obj['checkbox_tzdh']){
	                       arr.push(me.prefix+"tzdh <= '"+obj[x]+"'");
	                    }else if(x=='tzrq1'&& obj['checkbox_tzrq']){
						     arr.push(me.prefix+"tzrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						}else if(x=='tzrq2'&& obj['checkbox_tzrq']){
						     arr.push(me.prefix+"tzrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						}else if(x=='csmc' && obj['checkbox_csmc']){
						 	 arr.push("csmc like '%"+obj[x]+"%'");
						}
	                 }
	             }
	             condition=arr.join(' and ');
              }
            return condition;
         }
})