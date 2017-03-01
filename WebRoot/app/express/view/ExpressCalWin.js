/*筛选查询*/
Ext.define('erp.express.view.ExpressCalWin',{
	extend:'erp.ux.Window',
	alias:'widget.expressCalWin',
	title:'快递寄送结算',
	width:800,
	height:400,
	modal:true,
	
	initComponent : function() {
		var me=this;
		me.dsfsStore=Ext.create('erp.express.store.Dsfs'/*,{autoLoad:true}*/);
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align:'stretch'
			},
			tbar:[
	    			{text:'保存',iconCls:'save',itemId:'BTN_SAVE'},"-",
	    			{text:'关闭',iconCls:'page_error',
	    				handler:function(){
	    					me.close();	
	    			}
	    	}],
			items:[{
			flex:1,
			xtype:'form',
			bodyPadding: 10,
			autoScroll:true,
			store:me.mainstore,
			layout:'column',
			items:[
				{xtype:'fieldset',title:'基础信息',columnWidth:1,
				layout: 'column',
       			defaults:{labelWidth:60,xtype:'textfield',padding:3},
				items:[
				
				{fieldLabel:'记录编号',name:'jlbh',itemId:'jlbh',columnWidth:.25,readOnly:true},
				{fieldLabel:'销售类别',name:'xslb',itemId:'xslb',xtype : 'helpField',readOnly:true,
					code : erp.DataConst.SELLKIND,columnWidth:.25
				},
				{fieldLabel:'收件单位',name:'sjdw',itemId:'sjdw',columnWidth:.5,readOnly:true,
					xtype:'helpField',code:erp.DataConst.RECEIVER,fieldConfig:{forceSelection:false}
				},
				
				{fieldLabel:'委托人',name:'wtrm',itemId:'wtrm',columnWidth:.25,readOnly:true,
					xtype:'helpField',code:erp.DataConst.OPERATOR_XM},
				{fieldLabel:'所属部门',name:'ssbm',itemId:'ssbm',columnWidth:.25,readOnly:true,
					xtype:'combo',
					displayField:'lbmc',
					valueField:'lbbh',
					store:me.czybmlbbStore					
				},
				{fieldLabel:'收件地址',name:'sjdz',itemId:'sjdz',columnWidth:.5,readOnly:true},
								
				{fieldLabel:'收件人',name:'sjrm',itemId:'sjrm',columnWidth:.25,readOnly:true},
				{fieldLabel:'申请日期',name:'sqrq',itemId:'sqrq',xtype:'datefield',columnWidth:.25,readOnly:true},
				{fieldLabel:'出运编号',name:'cybh',itemId:'cybh',columnWidth:.25,readOnly:true},
				{fieldLabel:'要求寄件',name:'jjrq',itemId:'jjrq',xtype:'datefield',columnWidth:.25,readOnly:true},
								
				{fieldLabel : '客户名称',name : 'khbh',itemId : 'khbh',readOnly:true,columnWidth:.5,								
						xtype : 'helpField',
						code : erp.DataConst.CUSTOMER,
						filterParams:{spbj:1,khzt:1},
						winParam:{spbj:1,khzt:1}
				},
				{fieldLabel:'到付账号',name:'dfzh',itemId:'dfzh',columnWidth:.25,readOnly:true},
				{fieldLabel:'寄件单号',name:'sjdh',itemId:'sjdh',columnWidth:.25,readOnly:true},
				
				{fieldLabel:'递送方式',name:'dsfs',itemId:'dsfs',columnWidth:.25,readOnly:true,
						xtype:'combo',
						displayField:'display',
						valueField:'cid',
						queryMode:'local',
						store:me.dsfsStore
					},					
				{fieldLabel:'递送单位',name:'dsdw',itemId:'dsdw',columnWidth:.5,readOnly:true},
				{fieldLabel:'寄件日期',name:'sjrq',itemId:'sjrq',xtype:'datefield',columnWidth:.25,readOnly:true},
				
				{fieldLabel:'付费方式',name:'fffs',itemId:'fffs',columnWidth:.25,xtype:'combo',readOnly:true,
					store:[[1,'预付'],
							[3,'第三方付款'],
							[4,'垫付'],
							[5,'客户到付'],
							[6,'我司到付']]
				},
				{fieldLabel:'递送要求',name:'dsyq',itemId:'dsyq',columnWidth:.75,readOnly:true}
				]},
				
				{xtype:'fieldset',title:'结算信息',columnWidth:1,
					 defaultType: 'numberfield',
       				 layout: 'column',
       				 defaults:{padding:3,labelWidth:60},
					items:[
					  {fieldLabel:'结算标记',name:'jsbj',itemId:'jsbj',columnWidth:0.25,
						xtype:'combo',
						store:[[1,'是'],[0,'否']]
						},
					  {xtype:'displayfield',name:'display_1',columnWidth:0.75},
					  
					  {fieldLabel:'重量(kg)',name:'ypzl',itemId:'ypzl',columnWidth:.3,decimalPrecision :3,
					  	listeners:{						
							'change':function( field,nv,ov){
								var form=me.down('form').getForm();
								var tj=form.findField('tj').getValue();
								var jfzlfield=form.findField('jfzl');
								if(tj>0 && nv>0){
									var jfzl=Ext.util.Format.round(parseFloat(tj)*6000/parseFloat(nv),3);									
									jfzlfield.setValue(jfzl);
								}else{
									jfzlfield.setValue(0);
								}
								
							}
						}
					  },
					  {fieldLabel:'体积',name:'tj',itemId:'tj',columnWidth:.3,decimalPrecision :3,
					  	listeners:{						
							'change':function( field,nv,ov){
								var form=me.down('form').getForm();
								var ypzl=form.findField('ypzl').getValue();
								var jfzlfield=form.findField('jfzl');
								if(nv>0 && ypzl>0){
									var jfzl=Ext.util.Format.round(parseFloat(nv)*6000/parseFloat(ypzl),3);									
									jfzlfield.setValue(jfzl);
								}else{
									jfzlfield.setValue(0);
								}
								
							}
						}
					  },
					  {fieldLabel:'计费重量',name:'jfzl',itemId:'jfzl',columnWidth:.4,decimalPrecision :3},
					  
					  {fieldLabel:'付款方式',name:'fkfs',itemId:'fkfs',columnWidth:.3,
					  	xtype:'combo',
						store:[[1,'月结'],[2,'现付']]
					  },
					  {fieldLabel:'递送费用',name:'dsfy',itemId:'dsfy',columnWidth:.3,decimalPrecision :3},					  					  
					  {fieldLabel:'经办人',name:'jbrm',itemId:'jbrm',xtype:'textfield',columnWidth:0.4}
					]
				
				}
			]}]
						
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
		var form=me.down('form').getForm();
		var jbrmfield=form.findField('jbrm');
		if(Ext.isEmpty(me.rec.get('jbrm')) || (me.rec.get('jbrm')!=null && me.rec.get('jbrm').trim()=="")){
			jbrmfield.setValue(erp.Util.currentUser.userInfo.name);
		}
	}
})