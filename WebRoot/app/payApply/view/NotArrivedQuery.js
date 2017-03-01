Ext.define('erp.payApply.view.NotArrivedQuery',{
	extend:'erp.ux.Window',
	alias:'widget.NotArrivedQuery',
	iconCls:'page_find',
	title:'筛选条件',
	width:400,
	height:500,
	frame:true,
	modal:true,
	prefix:'rkdb_yl.',
	initComponent : function() {
		var me=this;
		me.rec=Ext.create('erp.payApply.model.NotArrivedQueryParams');
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
						name      : 'checkbox_rkdh',
						itemId:'checkbox_rkdh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'入库单号',
						name:'rkdh1',
						columnWidth:0.45,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_rkdh').setValue(true);
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
						name:'rkdh2',
						labelWidth:20,
						columnWidth:.45
					},
					{
						name      : 'checkbox_rkrq',
						itemId:'checkbox_rkrq',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'入库日期',
						name:'rkrq1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_rkrq').setValue(true);
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
						name:'rkrq2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.45
					},
					
					{
						name      : 'checkbox_clmc',
						itemId:'checkbox_clmc',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'材料名称',
						name:'clmc',
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
					},
					{
						name      : 'checkbox_hxbj',
						itemId:'checkbox_hxbj',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'核销未完',
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
			                name:'hxbj',
			                boxLabel:'是',
			                inputValue:1
			                },{
			                columnWidth:.45,
			                name:'hxbj',
			                boxLabel:'否',
			                inputValue:0
			                }],
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_hxbj').setValue(true);
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
						name      : 'checkbox_ckbh',
						itemId:'checkbox_ckbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'仓库名称',
						name:'ckbh',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_ckbh').setValue(true);
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
		me.mainstore.reload();
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
						 	if(x=='rkdh1' && obj['checkbox_rkdh']){
						 		arr.push(me.prefix+"rkdh >= '"+obj[x]+"' ");
					 		}else if(x=='rkdh2' && obj['checkbox_rkdh']){
						 		arr.push(me.prefix+"rkdh <= '"+obj[x]+"'");
					 		}else if(x=='rkrq1' && obj['checkbox_rkrq']){
						 		arr.push(me.prefix+"rkrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='rkrq2' && obj['checkbox_rkrq']){
					 			arr.push(me.prefix+"rkrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}else if(x=='hxbj' && obj['checkbox_hxbj']){
						 		arr.push(me.prefix+"hxbj = '"+obj[x]+"'");
						 	}else if(x=='clmc' && obj['checkbox_clmc']){
						 		arr.push("clbmb."+"clmc like '%"+obj[x]+"%'");
						 	}else if(x=='ckbh' && obj['checkbox_ckbh']){
						 		arr.push("ckmcb_yl."+"ckmc like '%"+obj[x]+"%'");
						 	}else if(x=='wbbh' && obj['checkbox_wbbh']){
						 		arr.push("wbmcb."+"wbdh like '%"+obj[x]+"%'");
						 	}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
}
});