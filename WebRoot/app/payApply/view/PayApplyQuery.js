Ext.define('erp.payApply.view.PayApplyQuery',{
	extend:'erp.ux.Window',
	alias:'widget.PayApplyQuery',
	iconCls:'page_find',
	requires : ['erp.ux.SearchCombobox','erp.master.prematerial.store.Companyname'],
	title:'付款申请单管理筛选条件',
	width:500,
	height:500,
	frame:true,
	modal:true,
	prefix:'fksqspb.',
	initComponent : function() {
		var me=this;
		me.skdwStore = Ext.create('erp.master.prematerial.store.Companyname');
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
				//全部记录
					{
						boxLabel: '全部记录',
						name: 'checkbox_qbjl',
						inputValue: '1',
						padding: '0 0 0 5',
						itemId: 'checkbox_qbjl',
						xtype: 'checkbox',
						columnWidth: 1,
						listeners: {
							change: function(form, newValue, oldValue, eOpts) {
								if (newValue == true) {
									me.down('#checkbox_sqbh').setValue(false);
									me.down('#checkbox_sqrq').setValue(false);
									me.down('#checkbox_csmc').setValue(false);
									me.down('#checkbox_yfkbj').setValue(false);
									me.down('#checkbox_skdw').setValue(false);
									me.down('#checkbox_khyh').setValue(false);
									me.down('#checkbox_fkfs').setValue(false);
									me.down('#checkbox_htbh').setValue(false);
									me.down('#checkbox_hsbm').setValue(false);
									me.down('#checkbox_sqbm').setValue(false);
									me.down('#checkbox_sqrm').setValue(false);
								}
							}
						}
					},
					{
						name      : 'checkbox_sqbh',
						itemId:'checkbox_sqbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'申请编号',
						name:'sqbh1',
						columnWidth:0.45,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_sqbh').setValue(true);
							  		me.down('#sqbh2').setValue(value);
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
						name:'sqbh2',
						itemId : 'sqbh2',
						labelWidth:20,
						columnWidth:.45
					},
					{
						name      : 'checkbox_sqrq',
						itemId:'checkbox_sqrq',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'申请日期',
						name:'sqrq1',
						xtype:'datefield',
						format:'Y-m-d',
						value: new Date(),
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_sqrq').setValue(true);
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
						name:'sqrq2',
						format:'Y-m-d',
						value: new Date(),
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.45
					},
					{
						name      : 'checkbox_yfkbj',
						itemId:'checkbox_yfkbj',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'入账',
	                    columnWidth:0.9,
						xtype:'fieldcontainer',
						defaultType: 'radiofield',
						defaults: {
			                flex: 1
			            },
			            layout: {
			                type: 'hbox',
			                align: 'stretch'
			            },
						items:[{
			                checked:true,
			                name:'yfkbj',
			                boxLabel:'是',
			                inputValue:1
			                },{
			                columnWidth:.45,
			                name:'yfkbj',
			                boxLabel:'否',
			                inputValue:0
			                }],
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_yfkbj').setValue(true);
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
						name      : 'checkbox_csmc',
						itemId:'checkbox_csmc',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'厂商名称',
						name:'csmc',
						columnWidth:0.9,
						xtype: 'tps_searchcbo',
						itemId: 'csmc',
						store: me.skdwStore,
						displayField: 'csmc',
						valueField: 'csbh',
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_csmc').setValue(true);
							  		me.cstore = Ext.create('erp.master.prematerial.store.Companyname');
									me.cstore.loadPage(1, {
										params: {
											usePaging: true,
											search: me.down('#csmc').getValue()
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
					},
					{
						name      : 'checkbox_skdw',
						itemId:'checkbox_skdw',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'收款单位',
						name:'skdw',
						columnWidth:0.9,
						xtype: 'tps_searchcbo',
						itemId: 'skdw',
						store : me.skdwStore,
						displayField : 'csmc',
						valueField: 'csbh',
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_skdw').setValue(true);
							  	
							  	me.skdwstore = Ext.create('erp.master.prematerial.store.Companyname');
								me.skdwstore.loadPage(1, {
									params: {
										usePaging: true,
										search: me.down('#skdw').getValue()
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
					},
					{
						name      : 'checkbox_khyh',
						itemId:'checkbox_khyh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'开户银行',
						name:'khyh',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_khyh').setValue(true);
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
						name      : 'checkbox_fkfs',
						itemId:'checkbox_fkfs',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'付款方式',
						name:'fkfs',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fkfs').setValue(true);
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
						name      : 'checkbox_htbh',
						itemId:'checkbox_htbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'合同编号',
						name:'htbh1',
						columnWidth:0.45,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_htbh').setValue(true);
							  		me.down('#htbh2').setValue(value);
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
						itemId:'htbh2',
						name:'htbh2',
						labelWidth:20,
						columnWidth:.45
					},
					{
						name      : 'checkbox_hsbm',
						itemId:'checkbox_hsbm',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'核算部门',
						name:'hsbm',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_hsbm').setValue(true);
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
						name      : 'checkbox_sqbm',
						itemId:'checkbox_sqbm',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'申请部门',
						name:'sqbm',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_sqbm').setValue(true);
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
						name      : 'checkbox_sqrm',
						itemId:'checkbox_sqrm',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'申请人',
						name:'sqrm',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_sqrm').setValue(true);
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
						form.reset();
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
		me.down('form').loadRecord(me.rec);
	},
	doQuery:function(){
		var form = me.down('form');
		var rec=form.getRecord();
		form.updateRecord(rec);
		if(rec.get('checkbox_sqrm')!=true||(Ext.String.trim(rec.get('sqrm'))!=Ext.String.trim(erp.Util.currentUser.userInfo.name)&&rec.get('checkbox_sqrm')==true)){
			delete me.mainstore.proxy.extraParams.sqrm;
		}
		
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
						 	if(x=='sqbh1' && obj['checkbox_sqbh']){
						 		arr.push(me.prefix+"sqbh >= '"+obj[x]+"' ");
					 		}else if(x=='sqbh2' && obj['checkbox_sqbh']){
						 		arr.push(me.prefix+"sqbh <= '"+obj[x]+"'");
					 		}else if(x=='sqrm' && obj['checkbox_sqrm']){
						 		arr.push(me.prefix+"sqrm = '"+obj[x]+"'");
						 	}else if(x=='sqrq1' && obj['checkbox_sqrq']){
						 		arr.push(me.prefix+"sqrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='sqrq2' && obj['checkbox_sqrq']){
					 			arr.push(me.prefix+"sqrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}else if(x=='yfkbj' && obj['checkbox_yfkbj']){
						 		arr.push(me.prefix+"yfkbj = '"+obj[x]+"'");
						 	}else if(x=='csmc' && obj['checkbox_csmc']){
						 		arr.push(me.prefix+"csbh = '"+obj[x]+"'");
						 	}else if(x=='skdw' && obj['checkbox_skdw']){
						 		arr.push(me.prefix+"skdw like '%"+obj[x]+"%'");
						 	}else if(x=='khyh' && obj['checkbox_khyh']){
						 		arr.push(me.prefix+"khyh like '%"+obj[x]+"%'");
						 	}else if(x=='fkfs' && obj['checkbox_fkfs']){
						 		arr.push(me.prefix+"fkfs = '"+obj[x]+"'");
						 	}else if(x=='htbh2' && obj['checkbox_htbh']){
						 		arr.push(me.prefix+"htbh >= '"+obj[x]+"'");
					 		}else if(x=='htbh2' && obj['checkbox_htbh']){
						 		arr.push(me.prefix+"htbh <= '"+obj[x]+"'");
					 		}else if(x=='hsbm' && obj['checkbox_hsbm']){
						 		arr.push(me.prefix+"hsbm = '"+obj[x]+"'");
						 	}else if(x=='sqbm' && obj['checkbox_sqbm']){
						 		arr.push(me.prefix+"sqbm = '"+obj[x]+"'");
						 	}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
}});