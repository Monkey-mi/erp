Ext.define('erp.view.purchaseOrder.window.TopSearch',{
	extend:'erp.ux.Window',
	alias:'widget.PurchaseOrder_TopSearch',
	iconCls:'page_find',
	title:'采购合同管理筛选条件',
	modal:true,
	width:500,
	requires:[
		'erp.view.master.purchaseDetail.window.MateCombo',
		'erp.common.basic.view.field.HelpField',
		'erp.ux.CommonTrigger',
		'erp.view.master.purchaseDetail.store.MainUnit'
	],
	height:400,
	frame:true,
	resizable:false,
	initComponent : function() {
		var me=this;
		me.MainUnitStore=Ext.create('erp.view.master.purchaseDetail.store.MainUnit');
		me.MainUnitStore.load();
		var curDate=new Date();
		curDate.setDate(1);
		var nDate=new Date();
		var form=Ext.create('Ext.form.Panel',{
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
						name      : 'topping9',
                    	xtype 	  :'checkbox',
	                    inputValue: '1',
	                    padding:'0 0 0 5',
	                    itemId    : 'topping9',
	                    listeners:{
	                    	change :function(form,  newValue,  oldValue,  eOpts){
	                    		if(newValue==true){
	                    			me.down('#topping1').setValue(true);
	                    			me.down('#topping2').setValue(true);
	                    			me.down('#topping4').setValue(true);
	                    			me.down('#topping5').setValue(true);
	                    			me.down('#topping6').setValue(true);
	                    			me.down('#topping7').setValue(true);
	                    			me.down('#topping8').setValue(true);
	                    		}else{
	                    			me.down('#topping1').setValue(false);
	                    			me.down('#topping2').setValue(false);
	                    			me.down('#topping4').setValue(false);
	                    			me.down('#topping5').setValue(false);
	                    			me.down('#topping6').setValue(false);
	                    			me.down('#topping7').setValue(false);
	                    			me.down('#topping8').setValue(false);
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
					name : 'htbh',
					labelWidth : 60,
					itemId:'htbh',
					flex:1,
					fieldLabel:'合同编号',
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
					name : 'htbhw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					itemId:'htbhw',
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
					name : 'csmc',
					labelWidth : 60,
					itemId:'csmc',
					fieldLabel:'供应厂商',
					xtype:'helpField',
					code : erp.DataConst.FACTORYINFO,
					fieldConfig:{forceSelection:false},
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping2').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping2').setValue(true);
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
					defaults:{anchor:'95%',padding:5,xtype : 'datefield',format:'Y.m.d'},
					items:[{
                    name      : 'topping4',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping4'
                	},{
					name : 'cgrq',
					labelWidth : 60,
					itemId:'cgrq',
					flex:1,
					fieldLabel:'采购日期',
					value:curDate,
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
								me.down('#topping4').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping4').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					},{
					name : 'cgrqw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					value:nDate,
					itemId:'cgrqw',
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
				  },
				  {
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5,xtype : 'datefield',format:'Y.m.d'},
					items:[{
                    name      : 'topping5',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping5'
                	},{
					name : 'qfsj',
					labelWidth : 60,
					itemId:'qfsj',
					flex:1,
					value:curDate,
					fieldLabel:'签发日期',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
								me.down('#topping5').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping5').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					},{
					name : 'qfsjw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					value:nDate,
					itemId:'qfsjw',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping5').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping5').setValue(true);
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
					defaults:{anchor:'95%',padding:5,xtype : 'datefield',format:'Y.m.d'},
					items:[{
                    name      : 'topping6',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping6'
                	},{
					name : 'hqsj',
					labelWidth : 60,
					itemId:'hqsj',
					flex:1,
					fieldLabel:'回签日期',
					value:curDate,
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
								me.down('#topping6').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping6').setValue(true);
    	                        me.getCondition();
    	                    }
    	                }
					}
					},{
					name : 'hqsjw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					value:nDate,
					itemId:'hqsjw',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping6').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping6').setValue(true);
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
                    name      : 'topping7',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping7'
                	},{
						name : 'ztdw',
						itemId:'ztdw',
						fieldLabel:'主体单位',
						labelWidth : 60,
						typeAhead:true,
						xtype:'combo',
						queryMode : 'local',
						displayField:'ztmc',
						valueField:'ztbh',
						selectOnFocus:true,
						store:me.MainUnitStore,
						fieldConfig:{forceSelection:true},
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
									me.down('#topping7').setValue(true);
		                    	},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                    	me.down('#topping7').setValue(true);
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
                    name      : 'topping8',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping8'
                	},{
					name : 'cgbz',
					labelWidth : 60,
					itemId:'cgbz',
					fieldLabel:'备注说明',
					xtype:'textfield',
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
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping10',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping10'
                	},{
					name : 'czym',
					labelWidth : 60,
					itemId:'czym',
					fieldLabel:'操作员',
					xtype:'textfield',
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
				strWhere+=" and (cghtb.htbh >= '"+rec.htbh+"' and cghtb.htbh <= '"+rec.htbhw+"' )"
			}
			if(rec.topping2!=null){
				strWhere+="  and (cghtb.csbh = '"+rec.csmc+"' or csxxb.csmc like '%"+rec.csmc+"%')" 
			}
			/*if(rec.topping3!=null){
				strWhere+="  and (cgjhmxb.csbh like '%"+rec.csmc+"%' or csxxb.csmc like '%"+rec.csmc+"%')" 
			}*/
			if(rec.topping4!=null){
				strWhere+="  and ( cghtb.cgrq >='"+rec.cgrq+"' and cghtb.cgrq <='"+rec.cgrqw+"')" 
			}
			if(rec.topping5!=null){
				strWhere+="  and ( cghtb.qfsj >='"+rec.qfsj+"' and cghtb.qfsj <='"+rec.qfsjw+"')" 
			}
			if(rec.topping6!=null){
				strWhere+="  and ( cghtb.hqsj >='"+rec.hqsj+"' and cghtb.hqsj <='"+rec.hqsjw+"')" 
			}
			if(rec.topping7!=null){
				strWhere+="  and (cghtb.ztdw = '"+rec.ztdw+"' or ztdwb.ztmc like '%"+rec.ztdw+"%')"
			}
			if(rec.topping8!=null){
				strWhere+="  and (cghtb.cgbz like '%"+rec.cgbz+"%')" 
			}
			if(rec.topping10!=null){
				strWhere+="  and (cghtb.czym like '%"+rec.czym+"%')" 
			}
			if(strWhere==''){
				delete 	me.store.proxy.extraParams.search;
			}else{
				me.store.proxy.extraParams.search=strWhere;
			}
			me.store.load();
			me.close();
		}
})