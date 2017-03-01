/*筛选查询*/
Ext.define('erp.master.prematerial.view.PrematerialQuery',{
       extend : 'erp.ux.Window',
       requires : ['erp.ux.SearchCombobox','erp.master.manufacturer.store.Ckmcb_yl'],
       alias :'widget.Query_Prematerial',
       title :'待处理材料汇总筛选条件',
       iconCls:'page_find',
       modal:true,
       frame:true,
       width: 330,
       height:530,
       prefix:'d.',
	initComponent : function() {
		var me=this;
		/*var csStore = Ext.create('erp.master.prematerial.store.Companyname');*/
		Ext.apply(me,{
			layout:'fit',
			overflowY:'auto',
			items:[{
				xtype:'form',
				frame:true,
				heigth:50,
				layout:'column',
				defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
					}},
				items:[
				  /* {
						name      : 'checkbox_id',
						itemId:'checkbox_id',
                    	xtype 	  :'checkbox',
	                    columnWidth:1,
	                    boxLabel:'全部记录'
					      },*/
				       {
				        xtype: 'tbtext', 
				        text: '基础筛选',
				       	columnWidth:1
				       },
					 	{
						name      : 'checkbox_dhdh',
						itemId:'checkbox_dhdh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					      },
					      {
						fieldLabel:'到货单号',
						name:'dhdh1',
						columnWidth:0.45,
						listeners:{
							'change':function(obj,value){
							  	me.down('#dhdh2').setValue(value);
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_dhdh').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},{
						itemId:'dhdh2',
						name:'dhdh2',
						fieldLabel : '至',
						labelWidth:20,
						columnWidth:0.45,
						listeners:{
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_dhrq',
						itemId:'checkbox_dhrq',
                    	xtype 	  :'checkbox',
	                    columnWidth:.1
					},{
						fieldLabel:'到货日期',
						name:'dhrq1',
						xtype:'datefield',
						columnWidth:.5
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_dhrq').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						fieldLabel:'至',
						name:'dhrq2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.4
					}	
					,{
						name      : 'checkbox_csbh',
						itemId:'checkbox_csbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
						fieldLabel:'供应厂商',
						columnWidth:0.9,
						name: 'csmc',
					    itemId: 'csmc',
					    xtype:'helpField',
				        code : erp.DataConst.FACTORYINFO,
					    fieldConfig:{forceSelection:false}
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_csbh').setValue(true);
							}
							}/*,
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }*/
						}		
					},{
						name      : 'checkbox_clmc',
						itemId:'checkbox_clmc',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
						fieldLabel:'材料名称',
						name:'clmc',
						xtype : 'helpField',
				        code : erp.DataConst.MATEINFO,
					    fieldConfig:{forceSelection:false},
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_clmc').setValue(true);
								}
							}
						}		
					   },{
				        xtype: 'tbtext', 
				        text: '扩展筛选',
				       	columnWidth:1
				       },{
						name      : 'checkbox_ztbj',
						itemId:'checkbox_ztbj',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					    },{
						fieldLabel:'状态',
					
						name:'ztbj',
						xtype:'combo',
						store : [[1, '到货'], [2, '已退'],[3, '已入'],[4, '待入'],[5, '待退']],
						columnWidth:.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_ztbj').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},   {
						name      : 'checkbox_jyjg',
						itemId:'checkbox_jyjg',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					      }, 
					      {
						fieldLabel:'校验结论',
						name:'jyjg',
						xtype:'combo',
						store : [[1, '待检'], [2, '合格'],[3, '不合格'],[4, '让步接收'],[5, '改为他用']],
						columnWidth:.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jyjg').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
						{
						name      : 'checkbox_zjdh',
						itemId:'checkbox_zjdh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
						fieldLabel:'质检单号',
						name:'zjdh1',
						xtype:'numberfield',
						columnWidth:.5
						,listeners:{
							'change':function(obj,value){
								me.down('#zjdh2').setValue(value);
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_zjdh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						fieldLabel:'至',
						itemId: 'zjdh2',
						name:'zjdh2',
						labelWidth:20,
						xtype:'numberfield',
						columnWidth:.4
					},{
						name      : 'checkbox_htbh',
						itemId:'checkbox_htbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
						fieldLabel:'合同号',
						name:'htbh1',
						columnWidth:.5
						,listeners:{
							'change':function(obj,value){
								me.down('#htbh2').setValue(value);
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_htbh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						fieldLabel:'至',
						itemId: 'htbh2',
						name:'htbh2',
						labelWidth:20,
						columnWidth:.4
					},{
					    name : 'checkbox_pcbh',
						itemId:'checkbox_pcbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'生产批次',
						name:'pcbh',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_pcbh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}		
					},{
					    name : 'checkbox_ckbh',
						itemId:'checkbox_ckbh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},{
					   fieldLabel:'仓库名称',
					   name : 'ckbh',
					   xtype : 'combo',
					   columnWidth:.9,
					   store : Ext.create('erp.master.manufacturer.store.Ckmcb_yl'),
					    displayField : 'ckmc',
					    valueField: 'ckbh'
					    ,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_ckbh').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}		
					},{
					    name : 'checkbox_bzsm',
						itemId:'checkbox_bzsm',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'备注说明',
						name:'bzsm',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_bzsm').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}		
					}/*{
					    name : 'checkbox_jlpp',
						itemId:'checkbox_jlpp',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'结论匹配',
						name:'jlpp',
						xtype: 'radiogroup',
						items: [{
						    name:'sex',
						    inputValue : '0',
						    boxLabel :'是',
						    checked : true  
						    },{
						    name: 'sex',
						    inputValue : '1',
						    boxLabel : '否'
						    }],
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jlpp').setValue(true);
								}
							}}}*/
				],
					
			
			buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
				handler:function(){
				var win = this.up('#Query_Prematerial');
				me.doQuery(win);
				}
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
			}]
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
	},
	 doQuery:function(win){
        	Ext.apply(win.mainstore.proxy.extraParams,
        		{
        			condition:win.getQueryCondition()
        		})
        win.mainview.loadMain();
        win.close();
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
						 if(x=='dhdh1'&& obj['checkbox_dhdh']){
							   arr.push(me.prefix+"dhdh >= '"+obj[x]+"' ");
							}else if(x=='dhdh2' && obj['checkbox_dhdh']){
								arr.push(me.prefix+"dhdh <='"+obj[x]+"' " );
							}else if(x=='dhrq1' && obj['checkbox_dhrq']){
						 		arr.push(me.prefix+"dhrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='dhrq2' && obj['checkbox_dhrq']){
					 			arr.push(me.prefix+"dhrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}else if(x=='csmc' && obj['checkbox_csbh']){
						 		arr.push(me.prefix+"csbh ='"+obj[x]+"'");
						    }else if(x=='clmc' && obj['checkbox_clmc']){
						 		arr.push("clmc like '%"+obj[x]+"%'");
						    }else if(x=='ztbj'  && obj['checkbox_ztbj']){
						        arr.push(me.prefix+"ztbj ='"+obj[x]+"'");
						    }else if(x=='jyjg'  && obj['checkbox_jyjg']){
						        arr.push(me.prefix+"jyjg ='"+obj[x]+"'");
						    }else if(x=='zjdh1' && obj['checkbox_zjdh']){
								arr.push(me.prefix+"zjdh >='"+obj[x]+"' " );
						    }else if(x=='zjdh2' && obj['checkbox_zjdh']){
								arr.push(me.prefix+"zjdh <='"+obj[x]+"' " );
						    }else if(x=='htbh1' && obj['checkbox_htbh']){
								arr.push(me.prefix+"htbh >='"+obj[x]+"' " );
						    }else if(x=='htbh2' && obj['checkbox_htbh']){
								arr.push(me.prefix+"htbh <='"+obj[x]+"' " );
						    }else if(x=='pcbh1' && obj['checkbox_pcbh']){
								arr.push(me.prefix+"pcbh >='"+obj[x]+"' " );
						    }else if(x=='pcbh2' && obj['checkbox_pcbh']){
								arr.push(me.prefix+"pcbh <='"+obj[x]+"' " );
						    }else if(x=='bzsm' && obj['checkbox_bzsm']){
						 		arr.push(me.prefix+"bzsm like '%"+obj[x]+"%'");
						    }else if(x=='ckbh' && obj['checkbox_ckbh']){
						 		arr.push(me.prefix+"ckbh = '"+obj[x]+"'");
						    }		
						}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
});