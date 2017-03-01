/*筛选查询*/
Ext.define('erp.express.view.TdfdQuery',{
	extend:'tp.ux.Window',
	alias:'widget.tdfdQueryWin',
	iconCls:'page_find',
	title:'提单放单管理筛选条件',
	width:400,
	height:320,
	frame:true,
	modal:true,
	prefix:'cyjhb',
	initComponent : function() {
		var me=this;
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
						name      : 'checkbox_cybh1',
						itemId:'checkbox_cybh1',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'出运编号',
						name:'cybh1',
						columnWidth:0.45,
						listeners:{
							'change':function(obj,value){
							  	me.down('#cybh2').setValue(value);
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_cybh1').setValue(true);
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
						itemId:'cybh2',
						name:'cybh2',
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
						name      : 'checkbox_khmc',
						itemId:'checkbox_khmc',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'客户名称',
						name:'khmc',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_khmc').setValue(true);
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
						name      : 'checkbox_chje1',
						itemId:'checkbox_chje1',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'出货金额',
						name:'chje1',
						columnWidth:0.45,
						listeners:{
							'change':function(obj,value){
							  	me.down('#chje2').setValue(value);
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_chje1').setValue(true);
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
						itemId:'chje2',
						name:'chje2',
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
						name      : 'checkbox_tdhm',
                    	xtype 	  :'checkbox',
                    	itemId:'checkbox_tdhm',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'提单号码',
						name:'tdhm',
						columnWidth:.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_tdhm').setValue(true);
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
						name      : 'checkbox_kcrq1',
                    	xtype 	  :'checkbox',
                    	itemId:'checkbox_kcrq1',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'开船日期',
						name:'kcrq1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_kcrq1').setValue(true);
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
						name:'kcrq2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.45
					},
					{
						name      : 'checkbox_yjdg1',
                    	xtype 	  :'checkbox',
                    	itemId:'checkbox_yjdg1',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'到港日期',
						name:'yjdg1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_yjdg1').setValue(true);
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
						name:'yjdg2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.45
					},
					
					{
						name      : 'checkbox_fdbj',
						itemId:'checkbox_fdbj',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'放单标记',
						name:'fdbj',
						xtype:'combo',
						store:[
						[1,'是'],[0,'否']
						],
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fdbj').setValue(true);
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
						 	if(x=='cybh1' && obj['checkbox_cybh1']){
						 		arr.push("cybh >= "+obj[x]+" ");//出货编号作为数值筛选而不是作为字符串筛选
					 		}else if(x=='cybh2' && obj['checkbox_cybh1']){
					 			arr.push("cybh <= "+obj[x]+" ");
					 		}else if(x=='khmc' && obj['checkbox_khmc']){
						 		arr.push("khmc like '%"+obj[x]+"%' ");
						 	}else if(x=='chje1' && obj['checkbox_chje1']){
						 		arr.push("chje >= '"+obj[x]+"' ");
					 		}else if(x=='chje2' && obj['checkbox_chje1']){
					 			arr.push("chje <= '"+obj[x]+"' ");
					 		}else if(x=='tdhm' && obj['checkbox_tdhm']){
						 		arr.push("tdhm like '"+obj[x]+"%' ");					 	
					 		}else if(x=='kcrq1' && obj['checkbox_kcrq1']){
						 		arr.push("kcrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='kcrq2' && obj['checkbox_kcrq1']){
					 			arr.push("kcrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}else if(x=='yjdg1' && obj['checkbox_yjdg1']){
						 		arr.push("yjdg >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='yjdg2' && obj['checkbox_yjdg1']){
					 			arr.push("yjdg <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}else if(x=='fdbj' && obj['checkbox_fdbj']){
						 		arr.push("fdbj = '"+obj[x]+"' ");
						 	}
						}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
})