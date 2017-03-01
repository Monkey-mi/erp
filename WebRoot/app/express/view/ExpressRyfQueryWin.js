/*筛选查询*/
Ext.define('erp.express.view.ExpressRyfQueryWin',{
	extend:'erp.ux.Window',
	alias:'widget.expressRyfQueryWin',
	iconCls:'page_find',
	title:'筛选条件',
	width:400,
	height:270,
	frame:true,
	modal:true,
	prefix:'kd_ryf',
	initComponent : function() {
		var me=this;
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
						//文本框可以为空，沈洪根20150826
						forceSelection:false,
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
						name      : 'checkbox_nf',
						itemId:'checkbox_nf',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						columnWidth:0.9,
				    	xtype: 'numberfield',
				    	fieldLabel : '年份',
						name : 'nf',
						decimalPrecision :0,
    					step:1,
    					maxValue: 2100,
       					minValue: 2015
       					,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_nf').setValue(true);
								}
							}
						}
					},
					{
						name      : 'checkbox_yf',
						itemId:'checkbox_yf',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						columnWidth:0.9,
				    	xtype: 'numberfield',
				    	fieldLabel : '月份',
						name : 'yf',
						decimalPrecision :0,
    					step:1,
    					maxValue: 12,
       					minValue: 1
       					,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_yf').setValue(true);
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
						 	if(x=='csbh' && obj['checkbox_csbh']){
						 		arr.push("csbh ='"+obj[x]+"' ");
						 	}else if(x=='nf' && obj['checkbox_nf']){
						 		arr.push("nf ="+obj[x]+" ");
					 		}else if(x=='yf' && obj['checkbox_yf']){
						 		arr.push("yf = "+obj[x]+" ");
					 		}
						}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
})