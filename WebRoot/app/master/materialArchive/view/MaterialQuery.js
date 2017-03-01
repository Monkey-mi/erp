Ext.define('erp.master.materialArchive.view.MaterialQuery',{
    extend:'erp.ux.Window',
    alias:'widget.MaterialQuery',
    iconCls:'page_find',
    title:'材料档案管理筛选条件',
    modal:true,
    frame:true,
    width:350,
    height:300,
    prefix:'clbmb.',
    requires:['erp.ux.CommonTrigger','erp.ux.ComboxTree','erp.view.master.purchaseDetail.window.MateCombo'],
    frame:true,
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
			       name : 'all',
			       itemId:'all',
                   xtype :'checkbox',
                   boxLabel: '全选',
                    columnWidth:1,
                    listeners:{
                       change : function(form,  newValue,  oldValue,  eOpts){
                          if(newValue==true){
                          	me.down('#checkbox_clmc').setValue(true);
                          	me.down('#checkbox_cllb').setValue(true);
                          	me.down('#checkbox_fzdw').setValue(true);
                          	me.down('#checkbox_zhxs').setValue(true);
                          }else{
                            me.down('#checkbox_clmc').setValue(false);
                          	me.down('#checkbox_cllb').setValue(false);
                          	me.down('#checkbox_fzdw').setValue(false);
                          	me.down('#checkbox_zhxs').setValue(false);
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
		          },{
		          name      : 'checkbox_cllb',
				  itemId:'checkbox_cllb',
                  xtype 	  :'checkbox',
	              columnWidth:0.1
		          },{
		          fieldLabel : '材料类别',
		          itemId : 'cllb',
		          name : 'cllb',
		          columnWidth:0.9,
		          xtype : 'comboxTree',
		          store : Ext.create('erp.master.caterialPricePurchase.store.MaterialClass'),
		                             displayField : 'text',
					                 valueField: 'nodeId',
		          listeners:{
							'select':function(obj,value){
								if(!Ext.isEmpty(value)){
									var sql = " select mjbz  from cllbb where lbbh="+value.id+";";
									var result = erp.Const.callServiceMethodSync(
    								'materialInventory/materialInventory.act?method=getStringFromSql', {
    								 sql:sql
    							   });
    							   var data = Ext.decode(result);
    							   if(data.val!=1){
    							       Ext.Msg.alert('提示','该材料类别不是末级类别，请重新选择!');
    							       return;
    							   }
							  		me.down('#checkbox_cllb').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
		          },{
		           name      : 'checkbox_fzdw',
				  itemId:'checkbox_fzdw',
                  xtype 	  :'checkbox',
	              columnWidth:0.1
		          },{
		          fieldLabel : '辅助单位',
		          itemId : 'fzdw',
		          name : 'fzdw',
		          xtype : 'combo',
		          columnWidth:0.9,
		          store : Ext.create('erp.master.materialArchive.store.Jldw'),
		                             displayField : 'jldw',
					                 valueField: 'jldw',
		          listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fzdw').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
		          },/*{
		          fieldLabel : 'aaa', 	
		          itemId : 'blank',
		          name : 'blank',
		          hidden : true,
		          columnWidth:0.45
		          },*/{
		          name      : 'checkbox_zhxs',
				  itemId:'checkbox_zhxs',
                  xtype 	  :'checkbox',
	              columnWidth:0.1
		          },{
		          fieldLabel : '转换系数',
		          itemId : 'zhxs1',
		          name : 'zhxs1',
		          xtype : 'numberfield',
		          columnWidth:0.5,
		           listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_zhxs').setValue(true);
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
		          itemId : 'zhxs2',
		          name : 'zhxs2',
		          xtype : 'numberfield',
		          columnWidth:0.4,
		          labelWidth : 22,
		           listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_zhxs').setValue(true);
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
	 /*loadData : function(rec,mainstore,mainview){
		var me =this;
		var form =  me.down('form');
		form.loadRecord(me.rec);
	},*/
	  doQuery:function(){
	  	var me=this;
	  	Ext.apply(me.store.proxy.extraParams, 
			{
				condition:me.getQueryCondition()
			 }
		);
		 me.store.load();
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
	            if(x=='clmc' &&  obj['checkbox_clmc']){
	              arr.push(me.prefix+"clmc like '%"+obj[x]+"%' or "+me.prefix+"clhh like '%"+obj[x]+"%'");
	            }else if(x=='cllb' && obj['checkbox_cllb']){
	              arr.push(me.prefix+"lbbh = '"+obj[x]+"'");
	            }else if(x=='zhxs1'&& obj['checkbox_zhxs']){
	             arr.push(me.prefix+"zhxs >= '"+obj[x]+"'");    
	            }else if(x=='zhxs2'&& obj['checkbox_zhxs']){
	             arr.push(me.prefix+"zhxs <= '"+obj[x]+"'"); 
	             }else if(x=='fzdw'&& obj['checkbox_fzdw']){
	             arr.push(me.prefix+"jldw = '"+obj[x]+"'");
	             } 
	           }
	         }
	         condition=arr.join(' and ');
	   	}
	   	 return condition;
	  }
})