Ext.define('erp.express.view.AddExpressRyf',{
	extend: 'erp.ux.Window',
	alias: 'widget.addExpressRyf',
	resizable : true,
	width:400,
	height:160,
	modal : true,
	title:'新增',
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[
		     {  
		    	 xtype:'form',
		    	 itemId:'AddForm',
		    	 bodyPadding: 10,
		    	 frame:false,
		    	 plugins:{
			          ptype: 'FormKey'
		    	 },
		    	
		    	 items : [{
					xtype : 'fieldset',
					layout:'column',
			    	defaults:{labelWidth:60,xtype:'textfield',padding:3},
			    	
					items:[					
					{
						fieldLabel:'快递公司',
						name:'csbh',
						itemId:'csbh',
						columnWidth:1,
						code:erp.DataConst.FACTORYINFO,
						xtype : 'helpField',
						winParam:{cslx:'快递',gdbj:0,spbj:1},
						filterParams:{cslx:'快递',gdbj:0,spbj:1},
						allowBlank:false,
						listeners: {
							change:function(obj,value){
								if(obj.displayTplData!=null && !Ext.isEmpty(obj.displayTplData[0] )){
									var form=me.down('form').getForm();	
									var csmcfield=form.findField('csmc');
									var csmc=obj.displayTplData[0].csmc;
									csmcfield.setValue(csmc);
								}								
							},
							select:function(obj,recs){
								if(recs.length>0){
									var form=me.down('form').getForm();
									var csmcfield=form.findField('csmc');
									var csmc=recs[0].get('csmc');
									csmcfield.setValue(csmc);
								}
							}
						}
					},
					{	
						columnWidth:0.5,
						name:'csmc',
						itemId:'csmc',
						xtype: 'hiddenfield'
					},										
					{
						columnWidth:0.5,
				    	xtype: 'numberfield',
				    	fieldLabel : '年份',
						name : 'nf',
						decimalPrecision :0,
    					step:1,
    					allowBlank:false,
    					value:(new Date).getFullYear(),
    					maxValue: 2100,
       					minValue: 2015
					},
					{	
						columnWidth:0.5,
						xtype: 'numberfield',
				    	fieldLabel : '月份',
						name : 'yf',
						decimalPrecision :0,
    					step:1,
    					allowBlank:false,
    					value:(new Date).getMonth()+1,
    					maxValue: 12,
       					minValue: 1
					}
					,{	
						columnWidth:1,
						xtype: 'numberfield',
				    	fieldLabel : '燃油费率',
						name : 'ryf',
						decimalPrecision :4,
    					allowBlank:false
					}
					]
				}
				]
		     }
		    
			],
			buttons:[
		 		{
		 		    text: '保存',
		 		    iconCls: 'page_save',
		 		    action: 'ACT_SAVE'
		 		},
		 		{
		 		    text: '退出',
		 		    iconCls: 'page_error',
				    action:'ACT_CLOSE',
	    				handler:function(){
	    					me.close();	
	    			}
		 		}
			]	
		
		})
		
		this.callParent(arguments); 
	}
});