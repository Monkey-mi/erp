Ext.define('erp.view.purchaseUrge.window.MainSearchForCount',{
	extend:'erp.ux.Window',
	alias:'widget.MainSearchForCount',
	iconCls:'page_find',
	title:'采购汇总追催管理筛选条件',
	modal:true,
	width:500,
	requires:[
		'erp.view.master.purchaseDetail.window.MateCombo',
		'erp.common.basic.view.field.HelpField',
		'erp.ux.CommonTrigger',
		'erp.view.master.purchaseDetail.store.MainUnit'
	],
	height:750,
	frame:true,
	initComponent : function() {
		var me=this;
		var form=Ext.create('Ext.form.Panel',{
			xtype : 'fieldset',
			frame:true,
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
	                    			me.down('#topping3').setValue(true);
	                    			me.down('#topping4').setValue(true);
	                    			me.down('#topping5').setValue(true);
	                    			me.down('#topping6').setValue(true);
	                    			me.down('#topping7').setValue(true);
	                    			me.down('#topping8').setValue(true);
	                    			me.down('#topping9').setValue(true);
	                    			me.down('#topping10').setValue(true);
	                    			me.down('#topping12').setValue(true);
	                    		}else{
	                    			me.down('#topping1').setValue(false);
	                    			me.down('#topping2').setValue(false);
	                    			me.down('#topping3').setValue(false);
	                    			me.down('#topping4').setValue(false);
	                    			me.down('#topping5').setValue(false);
	                    			me.down('#topping6').setValue(false);
	                    			me.down('#topping7').setValue(false);
	                    			me.down('#topping8').setValue(false);
	                    			me.down('#topping9').setValue(false);
	                    			me.down('#topping10').setValue(false);
	                    			me.down('#topping12').setValue(false);
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
					flex:1,
					fieldLabel:'厂商名称',
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
					defaults:{anchor:'95%',padding:5},
					items:[{
	                    name      : 'topping3',
	                    xtype 	  :'checkbox',
	                    inputValue: '1',
	                    itemId      : 'topping3'
                	},{
						xtype : 'commonTrigger',
						name : 'clmc',
						itemId : 'clmc',
						labelWidth : 60,
						flex:1,
						fieldLabel : '材料名称',
						win : 'erp.view.master.purchaseDetail.window.MateCombo',
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
					defaults:{anchor:'95%',padding:5,xtype : 'datefield',format:'Y.m.d'},
					items:[{
                    name      : 'topping4',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping4'
                	},{
					name : 'jhrq',
					labelWidth : 60,
					itemId:'jhrq',
					flex:1,
					fieldLabel:'交货日期',
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
					name : 'jhrqw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					itemId:'jhrqw',
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
	                    itemId     : 'topping5',
	                    labelWidth : 60
                	},{
						name : 'jzrq',
						labelWidth : 130,
						itemId:'jzrq',
						flex:1,
						fieldLabel:'采购追催   截至日期',
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
				  },{
				  	xtype: 'displayfield',
				  	padding:'0 0 0 5',
				  	value:'<font color="red">注：截止到设定日期应到/入库完毕，但未完的采购合同明细。</font>'
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
					name : 'jzrq2',
					labelWidth : 130,
					itemId:'jzrq2',
					flex:1,
					fieldLabel:'物控追催   截止日期',
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
				  	xtype: 'displayfield',
				  	padding:'0 0 0 5',
				  	value:'<font color="red">注：截止到设定日期应到/入库完毕，但未完的采购合同明细。</font>'
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
						name : 'jhbz',
						itemId:'jhbz',
						fieldLabel:'生产单号',
						labelWidth : 60,
						typeAhead:true,
						xtype:'textfield',
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
					name : 'jhh',
					labelWidth : 60,
					itemId:'jhh',
					fieldLabel:'计划号',
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
                    name      : 'topping9',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping9'
                	},{
					name : 'cgh',
					labelWidth : 60,
					itemId:'cgh',
					fieldLabel:'采计号',
					xtype:'textfield',
					listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								me.down('#topping9').setValue(true);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                    	me.down('#topping9').setValue(true);
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
                    name      : 'topping10',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId     : 'topping10'
                	},{
					name : 'hqjq',
					labelWidth : 60,
					itemId:'hqjq',
					flex:1,
					fieldLabel:'回签交期',
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
					name : 'hqjqw',
					labelWidth : 20,
					fieldLabel:'至',
					flex:1,
					itemId:'hqjqw',
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
				  },{
				  	xtype: 'displayfield',
				  	padding:'0 0 0 5',
				  	value:'<font color="red">注：交货日期大于任务上线且确认交期也大于任务上线的记录。</font>'
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
                    name      : 'topping12',
                    xtype 	  :'checkbox',
                    inputValue: '1',
                    itemId      : 'topping12'
                	},{
						name : 'cgym',
						itemId : 'cgym',
						fieldLabel : '采购员名',
						labelWidth : 60,
						xtype : 'helpField',
						code : erp.DataConst.PurGroupMan,
						fieldConfig : {
							forceSelection : false
						},
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
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
	                    name      : 'x_wkww',
	                    xtype 	  :'checkbox',
	                    fieldLabel : '物控交期未完成',
						labelWidth : 120,
	                    inputValue: '1',
	                    itemId      : 'x_wkww'
                	},{
						name      : 'x_wkwwyz',
	                    xtype 	  :'checkbox',
	                    fieldLabel : '未来一周需追催',
						labelWidth : 120,
	                    inputValue: '1',
	                    itemId      : 'x_wkwwyz'
					}]
				  },{
					layout : {
							type : 'hbox',
							align : 'stretch'
					},
					xtype:'container',
					defaults:{anchor:'95%',padding:5},
					items:[{
	                    name      : 'x_wkjqyc',
	                    xtype 	  :'checkbox',
	                    inputValue: '1',
	                    fieldLabel : '更新后采购交期未满足物控交期',
						labelWidth : 200,
	                    itemId      : 'x_wkjqyc'
                	},{
						name      : 'x_cjqfrq',
	                    xtype 	  :'checkbox',
	                    inputValue: '1',
	                    fieldLabel : '采购日期<采计签发日期',
						labelWidth : 180,
	                    itemId      : 'x_cjqfrq'
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
		var strWhere ='';
		if(rec.topping1!=null){
			strWhere+=" and (htmxb.htbh >= '"+rec.htbh+"' and htmxb.htbh <= '"+rec.htbhw+"' )"
		}
		if(rec.topping2!=null){
			strWhere+="  and (cghtb.csbh = '"+rec.csmc+"' or csxxb.csmc like '%"+rec.csmc+"%')" 
		}
		//按材料名称过滤
		if(rec.topping3!=null){
			strWhere+="  and ( clbmb.clmc  like '%"+rec.clmc+"%' or htmxb.clhh ='"+rec.clmc+"')" 
		}
		//按交货日期段过滤
		if(rec.topping4!=null){
			strWhere+=" and (htmxb.jhrq >= '"+rec.jhrq+"' and htmxb.jhrq <= '"+rec.jhrqw+"' )"
		}
		//按采购追催过滤
		if(rec.topping5!=null){
			strWhere+="  and ( (case when isnull(htmxb.cgsl,0) - isnull(htmxb.dhrk,0)>0 then isnull(htmxb.cgsl,0) - isnull(htmxb.dhrk,0) else 0 end)>0 and htmxb.qrjq <='"+rec.jzrq+"')" 
		}
		//按物控追催过滤
		if(rec.topping6!=null){
			strWhere+="  and ( (case when isnull(htmxb.cgsl,0) - isnull(htmxb.dhrk,0)>0 then isnull(htmxb.cgsl,0) - isnull(htmxb.dhrk,0) else 0 end)>0 and htmxb.wkjq <='"+rec.jzrq2+"')" 
		}
		if(rec.topping7!=null){
			strWhere+="  and (jhmxb.jhbz like '"+rec.jhbz+"%')" 
		}
		if(rec.topping8!=null){
			strWhere+="  and ( ltrim(rtrim(str(htmxb.jhbh)))+'-'+ltrim(rtrim(str(htmxb.jhxh))) like '%"+rec.jhh+"%')" 
		}
		if(rec.topping9!=null){
			strWhere+="  and ( ltrim(rtrim(str(htmxb.cgbh)))+'-'+ltrim(rtrim(str(htmxb.cgxh))) like '%"+rec.cgh+"%')" 
		}
		//按回签交期过滤
		if(rec.topping10!=null){
			strWhere+="  and (htmxb.hqjq >= '"+rec.hqjq+"' and htmxb.hqjq <= '"+rec.hqjqw+"')";
		}
		if(rec.topping12!=null){
			strWhere+="  and (cghtb.cgym like '%"+rec.cgym+"%')";
		}
		if(rec.x_wkww!=null){
			strWhere+="  and ( (case when htmxb.wcbj=0 and datediff(day,htmxb.wkjq,getdate())>0 then 1 else 0 end) = 1 )";
		}
		if(rec.x_wkwwyz!=null){
			strWhere+="  and ( (case when htmxb.wcbj=0 and datediff(day,getdate(),htmxb.wkjq)>0 and datediff(day,getdate(),htmxb.wkjq)<7 then 1 else 0 end) = 1 )";
		}
		if(rec.x_wkjqyc!=null){
			strWhere+="  and ( (CONVERT(varchar(100),(case when htmxb.qrjq is null  then  case when htmxb.hqjq is null then htmxb.jhrq else htmxb.hqjq end else htmxb.qrjq end), 102))  >( (CONVERT(varchar(100), htmxb.wkjq, 102)) ) )  ";
		}
		if(rec.x_cjqfrq!=null){
			strWhere+="  and (((CONVERT(varchar(100),cghtb.cgrq, 102))) < (CONVERT(varchar(100), cgjhmxb.qfsj, 102)) )  ";
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