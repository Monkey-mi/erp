Ext.define('erp.express.view.AddExpressMoney',{
	extend: 'erp.ux.Window',
	alias: 'widget.addExpressMoney',
	resizable : true,
	width:640,
	height:320,
	modal : true,
	title:'新增',
	initComponent:function(){
		var me=this;
		me.linkstore=Ext.create('erp.express.store.Countrycity');
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
						fieldLabel:'国别',
						columnWidth:0.5,
						name:'country',
						itemId:'country',
				  		xtype:'combo',
						displayField:'mjms',
						valueField:'zzid',
						allowBlank:false,
						store:me.countrystore,
						listeners:{
							'select':function(cbo,recs){
									me.linkstore.load({params:{country_id:recs[0].get('zzid')}});															 	
							}
						}
					},
					{	
						fieldLabel:'城市',
						columnWidth:0.5,
						name:'city',
						itemId:'city',
				  		xtype:'combo',
						displayField:'name',
						valueField:'city_id',
						allowBlank:false,
						queryMode: 'local',
						store:me.linkstore
					},
					
					{
						fieldLabel:'快递公司',
						name:'csbh',
						itemId:'csbh',
						columnWidth:.5,
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
						fieldLabel:'快递类型',
						columnWidth:0.5,
						name:'special',
						itemId:'special',
				  		xtype:'combo',
						displayField:'display',
						valueField:'cid',
						queryMode:'local',
						store:me.dsfsStore
					},
					{
						columnWidth:0.5,
				    	xtype: 'numberfield',
				    	fieldLabel : '重量',
						name : 'start_zl',
						decimalPrecision :1,
    					step:1,
    					allowBlank:false,
						listeners:{
							'change':function(cbo,value){
							  	me.down('#end_zl').setValue(value);
							}
						}
					},
					{	
						columnWidth:0.5,
						xtype: 'numberfield',
						itemId:'end_zl',
				    	fieldLabel : '至',
				    	labelWidth:20,
						name : 'end_zl',
						decimalPrecision :1,
    					step:1,
    					allowBlank:false
					},
					{
						columnWidth:0.5,
				    	xtype: 'numberfield',
				    	fieldLabel : '首重价',
						name : 'first_fy',
						decimalPrecision :1,
    					step:1,
    					allowBlank:false
					},
					{	
						columnWidth:0.5,
						xtype: 'numberfield',
				    	fieldLabel : '续重价',
						name : 'xu_fy',
						decimalPrecision :1,
    					step:1,
    					allowBlank:false
					}
					]
				},
				{
					xtype : 'fieldset',
					title:'说明',
		        	layout : {  
                        type : 'table',  
                        columns : 1 
                    },  
                    collapsible : false,// 是否可折叠  
                    defaultType : 'label',// 默认的Form表单组件  
                    items : [ {  
                        html : '1、批量新增指定重量范围的记录.'  
                    }, {  
                        html : '2、第一条重量=首重，费用=首重价；第N条重量=首重+（N-1）*0.5，第N条费用=首重价+（N-1）*续重价'  
                    } ]
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