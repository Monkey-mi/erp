/*筛选查询*/
Ext.define('erp.express.view.ExpressMoneyQueryWin',{
	extend:'erp.ux.Window',
	alias:'widget.expressMoneyQueryWin',
	iconCls:'page_find',
	title:'快递费用筛选条件',
	width:400,
	height:240,
	frame:true,
	modal:true,
	prefix:'kd_money',
	initComponent : function() {
		var me=this;
		me.linkstore=Ext.create('erp.express.store.Countrycity');
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'form',
				frame:true,
				heigth:50,
				layout:'column',
				 plugins:{
			          ptype: 'FormKey'
		    	 },
				defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true},
				items:[
					{
						name      : 'checkbox_country',
						itemId:'checkbox_country',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'国别',
						columnWidth:0.45,
						name:'country',
						itemId:'country',
				  		xtype:'combo',
						displayField:'mjms',
						valueField:'zzid',
						store:me.countrystore,
						listeners:{
							'select':function(cbo,recs){
									me.linkstore.load({params:{country_id:recs[0].get('zzid')}});
									if(!Ext.isEmpty(value)){
								  		me.down('#checkbox_country').setValue(true);
									}
							}
						}
					},
					{	
						fieldLabel:'城市',
						columnWidth:0.45,
						name:'city',
						itemId:'city',
				  		xtype:'combo',
						displayField:'name',
						valueField:'city_id',
						queryMode: 'local',
						store:me.linkstore
					},
					{
						name      : 'checkbox_csbh',
						itemId:'checkbox_csbh',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'快递公司',
						name:'csbh',
						itemId:'csbh',
						columnWidth:0.9,
						code:erp.DataConst.FACTORYINFO,
						xtype : 'helpField',
						winParam:{cslx:'快递',gdbj:0,spbj:1},
						filterParams:{cslx:'快递',gdbj:0,spbj:1}
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_csbh').setValue(true);
								}
							}
						}
					},	
					{
						name      : 'checkbox_special',
						itemId:'checkbox_special',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{	
						fieldLabel:'类型',
						columnWidth:0.9,
						name:'special',
						itemId:'special',
				  		xtype:'combo',
						displayField:'display',
						valueField:'cid',
						queryMode:'local',
						store:me.dsfsStore
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_special').setValue(true);
								}
							}
						}
					},
					{
						name      : 'checkbox_zl',
						itemId:'checkbox_zl',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						columnWidth:0.45,
				    	xtype: 'numberfield',
				    	fieldLabel : '重量',
						name : 'start_zl',
						decimalPrecision :1,
    					step:1,
						listeners:{
							'change':function(cbo,value){
							  	me.down('#end_zl').setValue(value);
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_zl').setValue(true);
								}
							}
						}
					},
					{	
						columnWidth:0.45,
						xtype: 'numberfield',
						itemId:'end_zl',
				    	fieldLabel : '至',
				    	labelWidth:20,
						name : 'end_zl',
						decimalPrecision :1,
    					step:1
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
				handler:function(btn){		  	  								
						Ext.apply(me.mainstore.proxy.extraParams, 
							{
       	  						condition:me.getQueryCondition()
           	  				 }
						);
       	  				me.mainstore.loadPage(1);
       	  			}
			},
			{text:'关闭',iconCls:'page_error',handler:function(){me.close()}}
			]
			}]
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
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
						 	if(x=='country' && obj['checkbox_country']){
						 		arr.push("country_id = '"+obj[x]+"' ");
					 		}else if(x=='jlbh2' && obj['checkbox_country']){
					 			arr.push("city_id = '"+obj[x]+"' ");
					 		}else if(x=='csbh' && obj['checkbox_csbh']){
						 		arr.push("csbh ='"+obj[x]+"' ");
						 	}else if(x=='special' && obj['checkbox_special']){
						 		arr.push("special ='"+obj[x]+"' ");
					 		}else if(x=='start_zl' && obj['checkbox_zl']){
						 		arr.push("zl >= '"+obj[x]+"' ");
					 		}else if(x=='end_zl' && obj['checkbox_zl']){
					 			arr.push("zl <= '"+obj[x]+"' ");
						 	}
						}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
})