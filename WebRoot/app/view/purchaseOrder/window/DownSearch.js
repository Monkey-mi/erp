Ext.define('erp.view.purchaseOrder.window.DownSearch',{
	extend:'erp.ux.Window',
	alias:'widget.PurchaseOrder_DownSearch',
	iconCls:'page_find',
	title:'采购合同管理筛选条件',
	modal:true,
	width:500,
	requires:[
		'erp.common.basic.view.field.HelpField',
		'erp.ux.CommonTrigger',
		'erp.view.master.purchaseDetail.store.MainUnit',
		'erp.view.master.purchaseDetail.window.MateCombo'
	],
	height:200,
	resizable:false,
	initComponent : function() {
		var me=this;
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
						name      : 'topping5',
                    	xtype 	  :'checkbox',
	                    inputValue: '1',
	                    padding:'0 0 0 5',
	                    itemId    : 'topping5',
	                    listeners:{
	                    	change :function(form,  newValue,  oldValue,  eOpts){
	                    		if(newValue==true){
	                    			me.down('#topping1').setValue(true);
	                    			me.down('#topping2').setValue(true);
	                    			me.down('#topping3').setValue(true);
	                    			me.down('#topping4').setValue(true);
	                    		}else{
	                    			me.down('#topping1').setValue(false);
	                    			me.down('#topping3').setValue(false);
	                    			me.down('#topping2').setValue(false);
	                    			me.down('#topping4').setValue(false);
	                    		}
	                    	}
	                    }
					},{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping1',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping1'
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
								me.down('#topping1').setValue(true);
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
                    name      : 'topping2',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping2'
                	},{
					name : 'ddh',
					labelWidth : 60,
					itemId:'ddh',
					fieldLabel:'订单号',
					width:445,
					xtype:'textfield',
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
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping3',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping3'
                	},{
						name : 'jhh',
						itemId:'jhh',
						fieldLabel:'计划号',
						width:440,
						labelWidth : 60,
						typeAhead:true,
						xtype:'textfield',
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
					name : 'cgh',
					labelWidth : 60,
					itemId:'cgh',
					fieldLabel:'采购号',
					width:440,
					xtype:'textfield',
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
				strWhere+=" and (htmxb.clhh = '"+rec.clmc+"' or clbmb.clmc like '%"+rec.clmc+"%' )"
			}
			if(rec.topping2!=null){
				strWhere+="  and (ltrim(rtrim(str(htmxb.ddbh)))+'-'+ltrim(rtrim(str(htmxb.ddxh))) like '%"+rec.ddh+"%')" 
			}
			if(rec.topping3!=null){
				strWhere+="  and (ltrim(rtrim(str(htmxb.jhbh)))+'-'+ltrim(rtrim(str(htmxb.jhxh))) like '%"+rec.jhh+"%')" 
			}
			if(rec.topping4!=null){
				strWhere+="  and ( ltrim(rtrim(str(htmxb.cgbh)))+'-'+ltrim(rtrim(str(htmxb.cgxh))) like '%"+rec.cgh+"%')" 
			}
			if(strWhere==''){
				me.store.load();
			}else{
				me.store.load({params:{search:strWhere}});
			}
			me.close();
		}
})