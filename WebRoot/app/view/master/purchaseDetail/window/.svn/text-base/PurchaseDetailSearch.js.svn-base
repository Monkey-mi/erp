Ext.define('erp.view.master.purchaseDetail.window.PurchaseDetailSearch',{
	extend:'erp.ux.Window',
	alias:'widget.PurchaseDetailSearch',
	iconCls:'page_find',
	title:'采购计划明细总表筛选条件',
	modal:true,
	width:500,
	requires:[
		'erp.view.master.purchaseDetail.window.MateCombo',
		'erp.common.basic.view.field.HelpField',
		'erp.ux.CommonTrigger'
	],
	height:650,
	frame:true,
	resizable:false,
	initComponent : function() {
		var me=this;
		me.materialCateTreeStore = Ext.create('erp.view.master.purchaseDetail.store.MaterialCateTree');
		var form=Ext.create('Ext.form.Panel',{
			xtype : 'fieldset',
			defaults : {
				xtype : 'container',
				anchor:'95%',
					layout : {
							type : 'hbox',
							align : 'stretch'
					}
			},
			items:[{
						boxLabel  : '全选',
						name      : 'topping16',
                    	xtype 	  :'checkbox',
	                    inputValue: '1',
	                    padding:'0 0 0 5',
	                    itemId    : 'topping16',
	                    listeners:{
	                    	change :function(form,  newValue,  oldValue,  eOpts){
	                    		if(newValue==true){
	                    			me.down('#topping1').setValue(true);
	                    			me.down('#topping2').setValue(true);
	                    			me.down('#topping3').setValue(true);
	                    			me.down('#topping4').setValue(true);
	                    			me.down('#topping5').setValue(true);
	                    			me.down('#topping6').setValue(true);
	                    			me.down('#topping7').setValue(true);
	                    			me.down('#topping8').setValue(true);
	                    			me.down('#topping10').setValue(true);
	                    			me.down('#topping11').setValue(true);
	                    			me.down('#topping12').setValue(true);
	                    			me.down('#topping13').setValue(true);
	                    			me.down('#topping14').setValue(true);
	                    			me.down('#topping15').setValue(true);
	                    		}else{
	                    			me.down('#topping1').setValue(false);
	                    			me.down('#topping2').setValue(false);
	                    			me.down('#topping3').setValue(false);
	                    			me.down('#topping4').setValue(false);
	                    			me.down('#topping5').setValue(false);
	                    			me.down('#topping6').setValue(false);
	                    			me.down('#topping7').setValue(false);
	                    			me.down('#topping8').setValue(false);
	                    			me.down('#topping10').setValue(false);
	                    			me.down('#topping11').setValue(false);
	                    			me.down('#topping12').setValue(false);
	                    			me.down('#topping13').setValue(false);
	                    			me.down('#topping14').setValue(false);
	                    			me.down('#topping15').setValue(false);
	                    		}
	                    	}
	                    }
					},{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5,xtype : 'textfield'},
					items:[{
                    name      : 'topping1',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping1'
                	},{
					name : 'cgh',
					labelWidth : 60,
					itemId:'cgh',
					flex:1,
					fieldLabel:'采计号',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
								me.down('#topping1').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping1').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					},{
					name : 'cghw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					itemId:'cghw',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping1').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping1').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping2',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping2'
                	},{
					xtype:'commonTrigger',
					name:'clmc',
					itemId:'clmc',
					flex:1,
					labelWidth : 60,
					selModel:'SINGLE',
					win:'erp.view.master.purchaseDetail.window.MateCombo',
					fieldLabel:'材料名称',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping2').setValue(true);
	                    },
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping3',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping3'
                	},{
					name : 'csmc',
					labelWidth : 60,
					itemId:'csmc',
					fieldLabel:'供应厂商',
					width:300,
					xtype:'helpField',
					code : erp.DataConst.FACTORYINFO,
					fieldConfig:{forceSelection:false},
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping3').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping3').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping4',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping4'
                	},{
					name : 'cgym',
					labelWidth : 60,
					itemId:'cgym',
					fieldLabel:'采购员名',
					width:300,
					xtype:'helpField',
					code : erp.DataConst.PurGroupMan,
					fieldConfig:{forceSelection:false},
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping4').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping4').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping5',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId       : 'topping5'
                	},{
			            xtype      : 'fieldcontainer',
			            fieldLabel : '完成',
			            labelWidth : 60,
			            defaultType: 'radiofield',
			            itemId:'wcbj',
			            defaults: {
			                flex: 1,
			                padding:'0 5 0 5'
			            },
			            layout: 'hbox',
			            items: [
			                {
			                    boxLabel  : '是',
			                    name      : 'wcbj',
			                    inputValue: 1,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											me.down('#topping5').setValue(true);
				                    }
								}
			                }, {
			                    boxLabel  : '否',
			                    name      : 'wcbj',
			                    inputValue: 0,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											me.down('#topping5').setValue(true);
				                    }
								}
			                }
			            ]
			        }]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping6',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId       : 'topping6'
                	},{
			            xtype      : 'fieldcontainer',
			            fieldLabel : '签发',
			            labelWidth : 60,
			            defaultType: 'radiofield',
			            itemId:'qfbj',
			            defaults: {
			                flex: 1,
			                padding:'0 5 0 5'
			            },
			            layout: 'hbox',
			            items: [
			                {
			                    boxLabel  : '是',
			                    name      : 'qfbj',
			                    inputValue: 1,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											me.down('#topping6').setValue(true);
				                    }
								}
			                }, {
			                    boxLabel  : '否',
			                    name      : 'qfbj',
			                    inputValue: 0,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											me.down('#topping6').setValue(true);
				                    }
								}
			                }
			            ]
			        }]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping7',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId       : 'topping7'
                	},{
			            xtype      : 'fieldcontainer',
			            fieldLabel : '分配',
			            labelWidth : 60,
			            defaultType: 'radiofield',
			            itemId:'spbj',
			            defaults: {
			                flex: 1,
			                padding:'0 5 0 5'
			            },
			            layout: 'hbox',
			            items: [
			                {
			                    boxLabel  : '是',
			                    name      : 'spbj',
			                    inputValue: 1,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											me.down('#topping7').setValue(true);
				                    }
								}
			                }, {
			                    boxLabel  : '否',
			                    name      : 'spbj',
			                    inputValue: 0,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											me.down('#topping7').setValue(true);
				                    }
								}
			                }
			            ]
			        }]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping8',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId        : 'topping8'
                	},{
					xtype : 'textfield',
					name : 'hyhm',
					itemId:'hyhm',
					labelWidth : 60,
					width:300,
					fieldLabel:'生产单号',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping8').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping8').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },
				  {
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5,xtype : 'textfield'},
					items:[{
                    name      : 'topping10',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping10'
                	},{
					name : 'jhh',
					labelWidth : 60,
					itemId:'jhh',
					flex:1,
					fieldLabel:'计划号',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
								me.down('#topping10').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping10').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					},{
					name : 'jhhw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					itemId:'jhhw',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping10').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping10').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },
				  {
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5,xtype : 'datefield',format:'Y-m-d'},
					items:[{
                    name      : 'topping11',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping11'
                	},{
					name : 'cgrq',
					labelWidth : 60,
					itemId:'cgrq',
					flex:1,
					fieldLabel:'采购日期',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
								me.down('#topping11').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping11').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					},{
					name : 'cgrqw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					itemId:'cgrqw',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping11').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping11').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },
				  {
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5,xtype : 'datefield',format:'Y-m-d'},
					items:[{
                    name      : 'topping12',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping12'
                	},{
					name : 'jhrq',
					labelWidth : 60,
					itemId:'jhrq',
					flex:1,
					fieldLabel:'交货日期',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
								me.down('#topping12').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping12').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					},{
					name : 'jhrqw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					itemId:'jhrqw',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping12').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping12').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },
				  {
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5,xtype : 'datefield',format:'Y-m-d'},
					items:[{
                    name      : 'topping13',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping13'
                	},{
					name : 'sxrq',
					labelWidth : 60,
					itemId:'sxrq',
					flex:1,
					fieldLabel:'上线日期',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
								me.down('#topping13').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping13').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					},{
					name : 'sxrqw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					itemId:'sxrqw',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping13').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping13').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					}]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
	                    name      : 'topping14',
	                    xtype 	  :'checkbox',
	                    inputValue: '1',
	                    itemId        : 'topping14'
                	},{
			  			fieldLabel:'材料类别',
			  			itemId:'cllb',
			  			name:'cllb',
			  			flex : 1,
			  			labelWidth : 60,
			  			xtype:'comboxTree',
						fieldConfig:{forceSelection:true},
						store : me.materialCateTreeStore,
						displayField : 'text',
						valueField: 'nodeId',
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping14').setValue(true);
		                    },
		                    blur:function(){
		                    	me.down('#topping14').setValue(true);
		                    },
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                    	me.down('#topping14').setValue(true);
	    	                        me.getCondition();
	    	                    }
	    	                }
						}
			  		}]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
	                    name      : 'topping15',
	                    xtype 	  :'checkbox',
	                    inputValue: '1',
	                    itemId        : 'topping15'
                	},{
                	    fieldLabel:'采购组',
                	    itemId:'cgz',
			  			name:'cgz',
			  			flex : 1,
			  			labelWidth : 60,
			  			xtype:'textfield',
			  			listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping15').setValue(true);
		                    },
		                    blur:function(){
		                    	me.down('#topping15').setValue(true);
		                    },
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                    	me.down('#topping15').setValue(true);
	    	                        me.getCondition();
	    	                    }
	    	                }
						}
                	}]
				  },{
				  	name      : 'jhqf',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    labelWidth:200,
                    fieldLabel:'采购计划已签发未生成采购合同',
                    itemId     : 'jhqf'
				  },{
				  	name      : 'htqf',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    hidden:true,
                    labelAlign:'right',
                    labelWidth:200,
                    fieldLabel:'采购计划已签发但采购合同未签发',
                    itemId     : 'htqf'
				  },{
				  	name      : 'dqrq',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    labelAlign:'right',
                    labelWidth:200,
                    fieldLabel:'当前日期大于采购日期',
                    itemId     : 'dqrq'
				  }
				]
		});
		Ext.apply(me,{
			layout:'fit',
			items:[form],
			buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES',handler:function(){me.getCondition()}},{
				text:'关闭',
				iconCls:'cancel',
				handler:function(){
					me.close();
				}
			}]
		});
		this.callParent(arguments);
		var form = me.down('form');
		form.loadRecord(me.search);
	},
	/*筛选按钮响应*/
	getCondition : function(btn) {
		var me = this;
		var form = me.down('form');
		form.updateRecord(me.search);
		var rec=form.getValues();
		var strWhere =''
			if(rec.topping1!=null){
				strWhere+="  and ( left(cgh,len('"+rec.cgh+"'))>= '"+rec.cgh+"' and left(cgh,len('"+rec.cghw+"')) <='"+rec.cghw+"')";
			}
			if(rec.topping2!=null){
				var clmc=rec.clmc;
				var clmcArr=clmc.split('%');
				Ext.each(clmcArr,function(cl){
					strWhere+="  and ( indexOf(clhh,'"+cl+"')>=0 or indexOf(clmc,'"+cl+"')>=0)" ;
				})				
			}
			if(rec.topping3!=null){
				strWhere+="  and ( indexOf(csbh,'"+rec.csmc+"')>=0 or indexOf(csmc,'"+rec.csmc+"')>=0)" 
			}
			if(rec.topping4!=null){
				strWhere+="  and (indexOf(cgym,'"+rec.cgym+"')>=0 or indexOf(cgyxm,'"+rec.cgym+"')>=0)"
			}
			if(rec.topping5!=null){
				if(rec.wcbj!=null){
					strWhere+="  and (wcbj = "+rec.wcbj+")";
				}
			}
			if(rec.topping6!=null){
				if(rec.qfbj!=null){
					strWhere+="  and (qfbj = "+rec.qfbj+")";
				}
			}
			if(rec.topping7!=null){
				if(rec.spbj!=null){
					strWhere+="  and (spbj = "+rec.spbj+")";
				}
			}
			if(rec.topping8!=null){
				strWhere+="  and (indexOf(jhbz,'"+rec.hyhm+"')>=0)" 
			}
			if(rec.topping10!=null){
				strWhere+="  and ( left(jhh,len('"+rec.jhh+"'))>= '"+rec.jhh+"' and left(jhh,len('"+rec.jhhw+"')) <='"+rec.jhhw+"')"
			}
			if(rec.topping11!=null){
				strWhere+="  and ( cgrq>='"+Ext.Date.format(me.down('#cgrq').getValue(),'Y.m.d H:i:s')+"' and cgrq<='"+Ext.Date.format(me.down('#cgrqw').getValue(),'Y.m.d H:i:s')+"')"
			}
			if(rec.topping12!=null){
				strWhere+="  and ( jhrq>='"+Ext.Date.format(me.down('#jhrq').getValue(),'Y.m.d H:i:s')+"' and jhrq<='"+Ext.Date.format(me.down('#jhrqw').getValue(),'Y.m.d H:i:s')+"')"
			}
			if(rec.topping13!=null){
				strWhere+="  and ( sxrq>='"+Ext.Date.format(me.down('#sxrq').getValue(),'Y.m.d H:i:s')+"' and sxrq<='"+Ext.Date.format(me.down('#sxrqw').getValue(),'Y.m.d H:i:s')+"')"
			}
			if(rec.jhqf!=null){
				strWhere+="  and ( qfbj=1 and yzbj=0 and (wxsl + htsl)=0 )" 
			}
			if(rec.htqf!=null){
				strWhere+="  and ( htqf>0 and (wxsl + htsl)>0 and qfbj=1 and htcg>0 )" 
			}
			if(rec.topping14!=null){
				strWhere+="  and ( indexOf(lbbh,'"+rec.cllb+"')>=0 )" ;
			}
			if(rec.topping15!=null){
			    strWhere+="  and  ( indexOf(cgzm,'"+rec.cgz+"')>=0 )" ;
			}
			if(rec.dqrq!=null){
				strWhere+="  and ( compareDate(cgrq,now())<=0 )";
			}
			if(strWhere==''){
				me.mainGrid.querywin='';
			}else{
				me.mainGrid.querywin=strWhere;
			}
			console.log(strWhere);
			me.mainGrid.filterOnAll()
			//me.store.load();
			me.close();
		}
})