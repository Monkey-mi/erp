/*筛选查询*/
Ext.define('erp.express.view.ExpressQueryWin',{
	extend:'erp.ux.Window',
	alias:'widget.expressQueryWin',
	iconCls:'page_find',
	title:'快递寄送管理筛选条件',
	width:400,
	height:300,
	frame:true,
	modal:true,
	prefix:'ypdsb',
	initComponent : function() {
		var me=this;
		me.dsfsStore=Ext.create('erp.express.store.Dsfs'/*,{autoLoad:true}*/);
		Ext.apply(me,{
			layout:'fit',
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
						name      : 'checkbox_jlbh1',
						itemId:'checkbox_jlbh1',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'记录编号',
						name:'jlbh1',
						columnWidth:0.45,
						listeners:{
							'change':function(obj,value){
							  	me.down('#jlbh2').setValue(value);
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jlbh1').setValue(true);
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
						itemId:'jlbh2',
						name:'jlbh2',
						fieldLabel : '至',
						labelWidth:20,
						columnWidth:0.45,
						listeners:{
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_dsfs',
						itemId:'checkbox_dsfs',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'递送方式',
						name:'dsfs',
						columnWidth:0.9,
						xtype:'combo',
						displayField:'display',
						valueField:'cid',
						queryMode:'local',
						store:me.dsfsStore
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_dsfs').setValue(true);
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
						name      : 'checkbox_sjdw',
						itemId:'checkbox_sjdw',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'收件单位',
						name:'sjdw',
						xtype : 'helpField',
						code:erp.DataConst.RECEIVER,
						//文本框可以为空，沈洪根20150826
						forceSelection:false,
						fieldConfig:{forceSelection:false},
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_sjdw').setValue(true);
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
						name      : 'checkbox_sjrq1',
                    	xtype 	  :'checkbox',
                    	itemId:'checkbox_sjrq1',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'收件日期',
						name:'sjrq1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_sjrq1').setValue(true);
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
						name:'sjrq2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.45
					},
					{
						name      : 'checkbox_csmc',
						itemId:'checkbox_csmc',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'递送单位',
						name:'csmc',
						xtype : 'helpField',
						code:erp.DataConst.FACTORYINFO_CSMC,
						fieldConfig:{forceSelection:false},
						//文本框可以为空，沈洪根20150826
						forceSelection:false,
						columnWidth:0.9
						,listeners:{
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
					},
					{
						name      : 'checkbox_sjdh',
						itemId:'checkbox_sjdh',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'寄件单号',
						name:'sjdh',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_sjdh').setValue(true);
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
						name      : 'checkbox_wtrm',
						itemId:'checkbox_wtrm',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},{
						fieldLabel:'委托人',
						name:'wtrm',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_wtrm').setValue(true);
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
			
			buttons:[{text:'重置',iconCls:'reset',itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',iconCls:'accept',itemId:'btn_confirm',
				handler:me.doQuery
			},
			{text:'关闭',iconCls:'page_error',handler:function(){me.close()}}
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
				var rec=form.getRecord();
				form.updateRecord(rec);
				var obj=rec.getChanges();
				var arr=[];
				for(var x in obj){
						if(!Ext.isEmpty(obj[x]))
						{							
						 	if(x=='jlbh1' && obj['checkbox_jlbh1']){
						 		arr.push("ypdsb.jlbh >= '"+obj[x]+"' ");
					 		}else if(x=='jlbh2' && obj['checkbox_jlbh1']){
					 			arr.push("ypdsb.jlbh <= '"+obj[x]+"' ");
					 		}else if(x=='dsfs' && obj['checkbox_dsfs']){
						 		arr.push("dsfs ='"+obj[x]+"' ");
						 	}else if(x=='sjdw' && obj['checkbox_sjdw']){
						 		arr.push("(sjdw ='"+obj[x]+"' or sjdw like '%"+obj[x]+"%')");
					 		}else if(x=='sjrq1' && obj['checkbox_sjrq1']){
						 		arr.push("sjrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='sjrq2' && obj['checkbox_sjrq1']){
					 			arr.push("sjrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}else if(x=='csmc' && obj['checkbox_csmc']){
						 		arr.push("csmc like '%"+obj[x]+"%' ");
						 	}else if(x=='sjdh' && obj['checkbox_sjdh']){
						 		arr.push("REPLACE ( sjdh , ' ' , '' ) like '%"+obj[x].replace(/ /g,'')+"%' ");
						 	}else if(x=='wtrm' && obj['checkbox_wtrm']){
						 		arr.push("wtrm like '%"+obj[x]+"%' ");
						 	}
						}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
})