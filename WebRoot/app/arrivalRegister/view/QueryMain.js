Ext.define('erp.arrivalRegister.view.QueryMain',{
    extend : 'erp.ux.Window',
    alias : 'widget.Query_Main',
    iconCls:'page_find',
    title:'到货登记管理筛选条件',
    modal:true,
    width:470,
    height:560,
    prefix:'dhdjb_yl.',
    requires:['erp.ux.CommonTrigger','erp.ux.SelectField'],
    frame:true,
    resizable:false,
    initComponent : function() {
       var me = this;
       Ext.apply(me,{
           layout:{
			     type: 'vbox',//垂直分布
			     align: 'stretch'
	    	},
	    	overflowY:'auto',
	    	items: [
	    		{
	    	       xtype : 'form',
	    	       padding : 10,
	    	       items : [
	    	       {
	    	        name : 'all',
			        itemId:'all',
                    xtype :'checkbox',
                    boxLabel: '全选',
                    listeners:{
                       change : function(form,  newValue,  oldValue,  eOpts){
                          if(newValue==true){
                          	me.down('#checkbox_csmc').setValue(true);
                          	me.down('#checkbox_dhdh').setValue(true);
                          	me.down('#checkbox_dhrq').setValue(true);
                          	me.down('#checkbox_clmc').setValue(true);
                          	me.down('#checkbox_ztbj').setValue(true);
                          	me.down('#checkbox_jyjg').setValue(true);
                          	me.down('#checkbox_zjdh').setValue(true);
                          	me.down('#checkbox_htbh').setValue(true);
                          	me.down('#checkbox_pcbh').setValue(true);
                          	me.down('#checkbox_bzsm').setValue(true);
                          	/*me.down('#checkbox_jlpp').setValue(true);*/
                          }else{
                            me.down('#checkbox_csmc').setValue(false);
                          	me.down('#checkbox_dhdh').setValue(false);
                          	me.down('#checkbox_dhrq').setValue(false);
                          	me.down('#checkbox_clmc').setValue(false);
                          	me.down('#checkbox_ztbj').setValue(false);
                          	me.down('#checkbox_jyjg').setValue(false);
                          	me.down('#checkbox_zjdh').setValue(false);
                          	me.down('#checkbox_htbh').setValue(false);
                          	me.down('#checkbox_pcbh').setValue(false);
                          	me.down('#checkbox_bzsm').setValue(false);
                          /*	me.down('#checkbox_jlpp').setValue(false);*/
                          }
                       }
	    	        }
	    	       },{
	    	          xtype:'fieldset',
    				  title:'<span style="color:#008cd6">基础筛选</span>',
					  collapsible: true,
					  layout:'column',
					  defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
		      	      listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
					}
					},
					items : [
					   {
					      name      : 'checkbox_dhdh',
						  itemId:     'checkbox_dhdh',
                    	  xtype 	  :'checkbox',
	                      columnWidth:0.1
					   },{
					      fieldLabel : '到货单号',
					      itemId : 'dhdh1',
					      name : 'dhdh1',
					      columnWidth:0.5,
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_dhdh').setValue(true);
							  		me.down('#dhdh2').setValue(value);
								}
							}
						}
					   },{
					     fieldLabel : '至',
						  itemId : 'dhdh2',
						  name : 'dhdh2',
						  xtype : 'numberfield',
						  columnWidth:0.4,
						   labelWidth : 22,
						   listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_dhdh').setValue(true);
								}
							}
						 }
					   },{
					     name     : 'checkbox_dhrq',
				         itemId   : 'checkbox_dhrq',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },{
					     fieldLabel : '到货日期',
						 xtype : 'datefield',
						 itemId : 'dhrq1',
						 name : 'dhrq1',
						 columnWidth:.52
						 ,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_dhrq').setValue(true);
								}
							}
						 }
					   },{
					   	 fieldLabel : '至',
					   	 labelWidth : 22,
						 itemId : 'dhrq2',
						 name : 'dhrq2',
						 xtype:'datefield',
						 columnWidth : .38
					   },{
						name      : 'checkbox_csmc',
						itemId:     'checkbox_csmc',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					   },{
					   fieldLabel:'供应厂商',
					   name: 'csmc',
					   itemId: 'csmc',
					   columnWidth:.9,
					   xtype:'helpField',
				       code : erp.DataConst.FACTORYINFO,
					   fieldConfig:{forceSelection:true},
					   listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_csmc').setValue(true);
								}
							}
						} 
						},{
		                  name : 'checkbox_clmc',
			              itemId:'checkbox_clmc',
                          xtype 	  :'checkbox',
                          columnWidth:0.1
		                },{
		                  fieldLabel : '材料名称',
		                  ItemId : 'clmc',
		                  name : 'clmc',
		                  xtype:'commonTrigger',
		                  selModel:'SINGLE',
			              win:'erp.view.master.purchaseDetail.window.MateCombo',
		                  columnWidth:0.9,
		                	listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_clmc').setValue(true);
								}
							}
						  }
		               }    
					]
	    	       },{
	    	     xtype:'fieldset',
    			 title:'<span style="color:#008cd6">拓展筛选</span>',
    			 collapsible: true,
    			 layout:'column',
    			 defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
		      	     listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
					}},
					items : [
					  {
		                 name : 'checkbox_ztbj',
			             itemId:'checkbox_ztbj',
                         xtype 	  :'checkbox',
                         columnWidth:0.1
		             },{
		                fieldLabel : '状态',
		                name : 'ztbj',
		                itemId : 'ztbj',
		                columnWidth:.9,
		                xtype : 'combo',
		                store : [[1,'到货'],[2,'已退'],[3,'已入'],[4,'待入'],[5,'待退']],
		                listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_ztbj').setValue(true);
								}
							}
					    }
		             },{
		                name : 'checkbox_jyjg',
			            itemId:'checkbox_jyjg',
                        xtype 	  :'checkbox',
                        columnWidth:0.1
		             },{
		                fieldLabel : '质检结论',
		                name : 'jyjg',
		                itemId : 'jyjg',
		                columnWidth:.9,
		                xtype : 'combo',
		                store : [[1,'待检'],[2,'合格'],[3,'不合格'],[4,'让步接收'],[5,'改为他用']],
		                listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jyjg').setValue(true);
								}
							}
					    }
		             },{
		                name : 'checkbox_zjdh',
			            itemId:'checkbox_zjdh',
                        xtype 	  :'checkbox',
                        columnWidth:0.1
		             },{
		                fieldLabel : '质检单号',
						itemId : 'zjdh1',
						name : 'zjdh1',
						xtype : 'numberfield',
						columnWidth:0.5,
						listeners:{
						   'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_zjdh').setValue(true);
								}
							}
						}
		             },{
		             	fieldLabel : '至',
						itemId : 'zjdh2',
						name : 'zjdh2',
						xtype : 'numberfield',
						columnWidth:0.4,
						labelWidth : 22,
						listeners:{
						   'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_zjdh').setValue(true);
								}
							}
						}
		             },{
		               name     : 'checkbox_htbh',
				       itemId   : 'checkbox_htbh',
                       xtype 	  : 'checkbox',
	                   columnWidth:0.1
		             },{
		                fieldLabel : '合同编号',
						itemId : 'htbh1',
						name : 'htbh1',
						xtype : 'numberfield',
						columnWidth:0.5,
						listeners:{
						   'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_htbh').setValue(true);
								}
							}
						}
		             },{
		               fieldLabel : '至',
					   itemId : 'htbh2',
					   name : 'htbh2',
					   xtype : 'numberfield',
					   columnWidth:0.4,
					   labelWidth : 22,
					   listeners:{
						   'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_htbh').setValue(true);
								}
							}
						}
		             },{
		               name     : 'checkbox_pcbh',
				       itemId   : 'checkbox_pcbh',
                       xtype 	  : 'checkbox',
	                   columnWidth:0.1
		             },{
		                fieldLabel : '生产批次',
		                name : 'pcbh',
		                itemId : 'pcbh',
		                columnWidth:.9,
		                listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_pcbh').setValue(true);
								}
							}
					    }
		             },{
		              name     : 'checkbox_bzsm',
				      itemId   : 'checkbox_bzsm',
                      xtype 	  : 'checkbox',
	                  columnWidth:0.1
		             },{
		                fieldLabel : '备注说明',
		                name : 'bzsm',
		                itemId : 'bzsm',
		                columnWidth:.9,
		                listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_bzsm').setValue(true);
								}
							}
					    }
		             }/*,{
		               name     : 'checkbox_jlpp',
				       itemId   : 'checkbox_jlpp',
                       xtype 	  : 'checkbox',
	                   columnWidth:0.1
		             },{
		               xtype : 'radiogroup',
		               itemId : 'jlpp',
		               name : 'jlpp',
		               fieldLabel : '结论匹配',
		               items : [
		               {name : 'jl',inputValue : '0',boxLabel: '是',width:90},
		               {name : 'jl',inputValue : '1',boxLabel: '否',width:90}
		               ],
		               columnWidth: .9
		             }*/
					]
	    	       }
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
					          me.doQuery();
				            }
			          },
			           {text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			           ] 
	    	    }]
       });this.callParent(arguments);
       me.down('form').getForm().loadRecord(me.rec);
     },
      doQuery:function(){
       var me = this; 	
      /* var panel = Ext.widget('mng_ArrivalRegisterManger');
       var recs = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getSumArrivalRegister',{
	    			    ckbh : me.ckbh,
	    			    condition:me.getQueryCondition()
	    			});
	   if(recs.length>0){
		   Ext.apply(panel.Sum.data,recs[0]);
	   }else{
	       panel.Sum = Ext.create('erp.PurchaseClearing.store.JsRkdbImp');
	   } 	
	     console.log(panel.Sum);*/
       Ext.apply(me.mainstore.proxy.extraParams,
        {
        	ckbh : me.ckbh,
        	condition:me.getQueryCondition()
        })
        me.mainstore.load();
         me.close();
      },
      getQueryCondition : function(){
         var me = this;
         var condition = null;
         var form=me.down('form');
         if (form.getForm().isDirty()){
             var rec = form.getRecord();
             form.updateRecord(rec);
             var obj=rec.getChanges();
             var arr=[];
             for(var x in obj){
                if(!Ext.isEmpty(obj[x])){
                   if(x=='dhdh1' && obj['checkbox_dhdh']){
                      arr.push(me.prefix+"dhdh >= '"+obj[x]+"'")
                   }else if(x=='dhdh2' && obj['checkbox_dhdh']){
                      arr.push(me.prefix+"dhdh<= '"+obj[x]+"'")
                   }else if(x=='dhrq1'&& obj['checkbox_dhrq']){
				     arr.push(me.prefix+"dhrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
				   }else if(x=='dhrq2'&& obj['checkbox_dhrq']){
					 arr.push(me.prefix+"dhrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
				   }else if(x=='csmc' && obj['checkbox_csmc']){
					 arr.push(me.prefix+"csbh = "+obj[x]+"");
				   }else if(x=='clmc' && obj['checkbox_clmc']){
					 arr.push("clmc like '%"+obj[x]+"%'");
				   }else if(x=='ztbj' && obj['checkbox_ztbj']){
				     arr.push(me.prefix+"ztbj = "+obj[x]+"");
				   }else if(x=='jyjg' && obj['checkbox_jyjg']){
				     arr.push(me.prefix+"jyjg = "+obj[x]+"");
				   }else if(x=='zjdh1' && obj['checkbox_zjdh']){
                     arr.push(me.prefix+"zjdh >= '"+obj[x]+"'")
                   }else if(x=='zjdh2' && obj['checkbox_zjdh']){
                     arr.push(me.prefix+"zjdh <= '"+obj[x]+"'")
                   }else if(x=='htbh1' && obj['checkbox_htbh']){
                     arr.push(me.prefix+"htbh >= '"+obj[x]+"'")
                   }else if(x=='htbh2' && obj['checkbox_htbh']){
                     arr.push(me.prefix+"htbh <= '"+obj[x]+"'")
                   }else if(x=='pcbh' && obj['checkbox_pcbh']){
				     arr.push(me.prefix+"pcbh = '"+obj[x]+"'");
				   }else if(x=='bzsm' && obj['checkbox_bzsm']){
					 arr.push("bzsm like '%"+obj[x]+"%'");
				   }
                }
             }
            
	         condition=arr.join(' and ');
         }
        return condition;
	   	
      }
})