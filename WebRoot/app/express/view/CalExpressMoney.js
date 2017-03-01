Ext.define('erp.express.view.CalExpressMoney',{
	extend: 'erp.ux.Window',
	alias:'widget.calExpressMoney',
	resizable : true,
	width:800,
	height:500,
	title:'运费计算',
	modal : true,
	initComponent:function(){
		var me=this;
		var tjzlarray=[];//体积重量 和 毛重 最大的那个 的数组
		me.countrystore=Ext.create('erp.basicdata.enumType.store.EnumType');
 		Ext.apply(me.countrystore.proxy.extraParams, {usePaging:false,mjbh:'0807'});
 		me.countrystore.load();
 		me.linkstore=Ext.create('erp.express.store.Countrycity');
 		me.moneystore=Ext.create('erp.express.store.ExpressMoney');
 		me.dsfsStore=Ext.create('erp.express.store.Dsfs'/*,{autoLoad:true}*/);
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align:'stretch'
			},
			
			items:[{
				height:180,
				xtype:'form',
				plugins:{
			          ptype: 'FormKey'
			   },
				bodyPadding: 10,
				autoScroll:true,
				store:me.mainstore,
				layout:'column',
				items:[
				
					{xtype:'fieldset',title:'计算参数',columnWidth:1,
					 defaultType: 'numberfield',
       				 layout: 'column',
       				 defaults:{padding:3,labelWidth:60},
					items:[   
							{name:'chang',itemId:'chang',columnWidth:.2,fieldLabel:'长(cm)',nextTargetId : 'kuan'},
							  {name:'kuan',itemId:'kuan',columnWidth:.2,fieldLabel:'宽(cm)',nextTargetId : 'gao'},
							  {name:'gao',itemId:'gao',columnWidth:.2,fieldLabel:'高(cm)',nextTargetId : 'zl' },
							   {name:'tjzl',itemId:'tjzl',columnWidth:.2,fieldLabel:'体积重量',readOnly:true,fieldStyle:'background:#E6E6E6'},
							   
							   {fieldLabel:'毛重(kg)',name:'zl',itemId:'zl',columnWidth:0.2},
							   {fieldLabel:'公式',name:'gs',itemId:'gs',columnWidth:1,xtype:'displayfield',value:'0'},
							  {fieldLabel:'国别',name:'country',itemId:'country',columnWidth:.5,
							  		xtype:'combo',
									displayField:'mjms',
									valueField:'zzid',
									queryMode : 'local',
									typeAhead:true,
									store:me.countrystore,
									listeners:{
										'select':function(cbo,recs){
											me.linkstore.load({params:{country_id:recs[0].get('zzid')}});															 	
										}
									}
							  },
							  {fieldLabel:'城市',name:'city',itemId:'city',columnWidth:.5,
							  		xtype:'combo',
									displayField:'name',
									valueField:'city_id',
									queryMode: 'local',
									store:me.linkstore
							  }
							  ]
				
				}
			]
			,buttons:[
				{text:'累加',iconCls:'add',itemId:'btn_add_cal',
					handler:function(btn){	
							var form=me.down('form').getForm();
							var tjzlfield=form.findField('tjzl');
							var tjzl=tjzlfield.getValue();
							var zl=form.findField('zl').getValue();
							var gsfield=form.findField('gs');
							var gs=gsfield.getValue();
							var chang=form.findField('chang').getValue();
							var kuan=form.findField('kuan').getValue();
							var gao=form.findField('gao').getValue();
							if(	Ext.isEmpty(chang) || Ext.isEmpty(kuan) ||Ext.isEmpty(gao) ||Ext.isEmpty(zl) ){
								Ext.Msg.alert('提示','长宽高和毛重不允许为空');
								return;
							}
							var temptjzl=Ext.util.Format.round(parseFloat(chang)*parseFloat(kuan)*parseFloat(gao)/6000,2);
							if(temptjzl>zl){
								tjzl=tjzl+temptjzl;
								gsfield.setValue(gs+'+'+temptjzl+'(=round('+chang+'*'+kuan+'*'+gao+'/6000))');
								tjzlarray.push(temptjzl);
							}else{
								tjzl=tjzl+zl;
								gsfield.setValue(gs+'+'+zl);
								tjzlarray.push(zl);
							}
							tjzlfield.setValue(tjzl); 
							form.findField('chang').setValue(null);
							form.findField('kuan').setValue(null);
							form.findField('gao').setValue(null);
							form.findField('zl').setValue(null);
	       	  			}
				},
				{ xtype: 'tbspacer', width: 100 },
				{text:'回退',iconCls:'add',itemId:'btn_add_return',
					handler:function(btn){	
							var form=me.down('form').getForm();
							var tjzlfield=form.findField('tjzl');
							var tjzl=tjzlfield.getValue();
							var gsfield=form.findField('gs');
							var gs=gsfield.getValue();
							if(tjzlarray.length>0){
								var temptjzl=tjzlarray[tjzlarray.length-1];
								//减去上一次的体积重量
								tjzl=tjzl-temptjzl;
								tjzlfield.setValue(tjzl); 
								form.findField('chang').setValue(null);
								form.findField('kuan').setValue(null);
								form.findField('gao').setValue(null);
								form.findField('zl').setValue(null);
								//公式减掉最后一个 +后面的字符串
								gs=gs.substring(0,gs.lastIndexOf('+'));
								gsfield.setValue(gs);
								//减掉最后一个数
								tjzlarray.pop();
							}else{
								Ext.Msg.alert('提示','已清空-_-!');
								return;
							}
							
	       	  			}
				},
				{ xtype: 'tbspacer', width: 100 },
				{text:'计算',iconCls:'accept',itemId:'btn_confirm',
					handler:function(btn){		
							var form=me.down('form').getForm();
							var country_id=form.findField('country').getValue();
							var city_id=form.findField('city').getValue();
							var tjzl=form.findField('tjzl').getValue();
							var max_zl=tjzl;
							var round_zl=Ext.util.Format.round(max_zl,0);//四舍五入到各个位
							if(round_zl<max_zl){//四舍
								round_zl=round_zl+0.5;//+0.5
							}else if(round_zl-max_zl==0.5){//0.5被五入
								round_zl=max_zl;
							}else{//其他五入和原数
								//不变
							}
							if(Ext.isEmpty(country_id) || Ext.isEmpty(city_id) || Ext.isEmpty(max_zl)){
								Ext.Msg.alert('提示','请输入必要信息');
								return;
							}
							me.moneystore.removeAll();
							var date=new Date();
							var temparay=erp.Const.callServiceMethodSync('es/expressCountry.crm?method=getExpressMoneyListForCal',{
							    	country_id:country_id,
	       	  						city_id:city_id,
	       	  						zl:round_zl,
	       	  						nf:date.getFullYear(),
	       	  						yf:date.getMonth()+1
							 	}).data;
	       	  				me.moneystore.add(temparay);
	       	  			}
				},
				{ xtype: 'tbspacer', width:100 },
				{text:'重置',iconCls:'reset',itemId:'btn_reset',
					handler:function(btn){	
							var form=me.down('form');
							form.form.reset();
	       	  			}
				},
				{ xtype: 'tbspacer', width: 100 }//用来移动按钮位置
				]
			},{
						flex:1,
						xtype:'grid',
						itemId:'grdExpressDetail',
						title:'快递费用',
						tbar:[{text:'确认',iconCls:'accept',itemId:'btn_confirm1'}],
						columns:[{
							header:'',xtype:'rownumberer',width:25
						},
							{header:'快递公司',dataIndex:'csmc',flex:1},
							{header:'类型',dataIndex:'special',width:100,
								renderer: function(value, meta, record) {
                                      var rec=me.dsfsStore.findRecord('cid',value,0,false,false,true);
									  return rec? rec.get('display'):"";
                                 }
							},
							{header:'重量',dataIndex:'zl',width:100,
								renderer: function(value, meta, record) {
                                      return value;
                                 }
							},
							{header:'费用',dataIndex:'fy',width:100,
								renderer: function(value, meta, record) {
                                      return value;
                                 }
							},
							{header:'费用(含油费)',dataIndex:'zfy',width:100,
								renderer: function(value, meta, record) {
                                      return value;
                                 }
							}
							],
							store:me.moneystore					    						
				}]			
			});
		me.callParent(arguments);		
	}
});