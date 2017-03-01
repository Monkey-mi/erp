Ext.define('erp.supplyInvoice.view.SupplyInvoiceQuery',{
	extend:'erp.ux.Window',
	alias:'widget.supplyInvoiceQuery',
	iconCls:'page_find',
	title:'供应发票管理筛选条件',
	width:400,
	height:500,
	frame:true,
	modal:true,
	requires : ['erp.ux.SelectField'],
	prefix:'gyfpb.',
	initComponent : function() {
		var me=this;
		me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
		me.argColumns=erp.Util.getColumns(me.argStore.getModel());
		me.MianUnit=Ext.create('erp.basicdata.mianUnit.store.MianUnit');
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'form',
				frame:true,
				heigth:50,
				layout:'column',
				defaults:{padding:5,xtype:'textfield',labelWidth:80,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
					}},
				items:[
					{
						name      : 'checkbox_fplx',
						itemId:'checkbox_fplx',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'发票类型',
						name:'fplx',
						columnWidth:0.9,
						xtype: 'combo',
						store: [['01', '专用发票'], ['02', '普通发票'], ['03', '出口发票'], ['04', '运输发票'], ['05', '储运发票'], ['06', '无据支出'], ['07', '虚拟发票']],
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fplx').setValue(true);
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
						name      : 'checkbox_fphm',
						itemId:'checkbox_fphm',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'发票号码',
						name:'fphm',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_fphm').setValue(true);
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
						name      : 'checkbox_kprq',
						itemId:'checkbox_kprq',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'开票日期',
						name:'kprq1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_kprq').setValue(true);
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
						name:'kprq2',
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
						fieldLabel:'厂商名称',
						name:'csmc',
						itemId: 'csmc',
						columnWidth:0.9,
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
					},
					{
						name      : 'checkbox_yfbj',
						itemId:'checkbox_yfbj',
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
			                name:'yfbj',
			                boxLabel:'是',
			                inputValue:1
			                },{
			                columnWidth:.45,
			                name:'yfbj',
			                boxLabel:'否',
			                inputValue:0
			                }],
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_yfbj').setValue(true);
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
						name      : 'checkbox_shbj',
						itemId:'checkbox_shbj',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'审核',
						xtype:'fieldcontainer',
						columnWidth:.9, 
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
			                name:'shbj',
			                boxLabel:'是',
			                inputValue:1
			                },{
			                columnWidth:.45,
			                name:'shbj',
			                boxLabel:'否',
			                inputValue:0
			                }],
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_shbj').setValue(true);
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
						name      : 'checkbox_jzrq',
						itemId:'checkbox_jzrq',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'记账日期',
						name:'jzrq1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jzrq').setValue(true);
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
						name:'jzrq2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.45
					},
					{
						name      : 'checkbox_wbbh',
						itemId:'checkbox_wbbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'币种',
						name:'wbbh',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_wbbh').setValue(true);
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
						name      : 'checkbox_bzsm',
						itemId:'checkbox_bzsm',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'备注说明',
						name:'bzsm',
						columnWidth:0.9,
						listeners:{
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
					},
					{
						name      : 'checkbox_ztdw',
						itemId:'checkbox_ztdw',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'主体单位',
						name:'ztdw',
						columnWidth:0.9,
						xtype: 'combo',
						store: me.MianUnit,
						displayField: 'ztmc',
						valueField: 'ztbh',
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_ztdw').setValue(true);
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
						name      : 'checkbox_pzh',
						itemId:'checkbox_pzh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'财务凭证号',
						name:'pzh',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_pzh').setValue(true);
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
						name      : 'checkbox_cgy',
						itemId:'checkbox_cgy',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'采购员',
						name:'cgym',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_cgy').setValue(true);
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
						 	if(x=='fplx' && obj['checkbox_fplx']){
						 		arr.push('fplxb.'+"fplx = '"+obj[x]+"' ");
					 		}else if(x=='fphm' && obj['checkbox_fphm']){
						 		arr.push(me.prefix+"fphm like '%"+obj[x]+"%'");
					 		}else if(x=='kprq1' && obj['checkbox_kprq']){
						 		arr.push(me.prefix+"kprq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='kprq2' && obj['checkbox_kprq']){
					 			arr.push(me.prefix+"kprq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}else if(x=='csmc' && obj['checkbox_csmc']){
						 		arr.push(me.prefix+"csmc like '%"+obj[x]+"%'");
						 	}
						 	else if(x=='yfbj' && obj['checkbox_yfbj']){
						 		arr.push(me.prefix+"yfbj = '"+obj[x]+"'");
						 	}
						 	else if(x=='shbj' && obj['checkbox_shbj']){
						 		arr.push(me.prefix+"shbj = '"+obj[x]+"'");
						 	}
						 	else if(x=='jzrq1' && obj['checkbox_jzrq']){
						 		arr.push(me.prefix+"jzrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}
						 	else if(x=='jzrq2' && obj['checkbox_jzrq']){
						 		arr.push(me.prefix+"jzrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}
						 	else if(x=='wbbh' && obj['checkbox_wbbh']){
						 		arr.push('wbmcb.'+"wbdh like '%"+obj[x]+"%'");
						 	}
						 	else if(x=='bzsm' && obj['checkbox_bzsm']){
						 		arr.push(me.prefix+"bzsm like '%"+obj[x]+"%'");
						 	}
						 	else if(x=='ztdw' && obj['checkbox_ztdw']){
						 		arr.push('ztdwb.'+"ztmc like '%"+obj[x]+"%'");
						 	}
						 	else if(x=='pzh' && obj['checkbox_pzh']){
						 		arr.push(me.prefix+"pzh like '%"+obj[x]+"%'");
						 	}
						 	else if(x=='cgym' && obj['checkbox_cgy']){
						 		arr.push(me.prefix+"cgym like '%"+obj[x]+"%'");
						 	}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
}});