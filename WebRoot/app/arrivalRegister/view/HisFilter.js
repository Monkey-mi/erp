Ext.define('erp.arrivalRegister.view.HisFilter',{
    extend : 'erp.ux.Window',
    alias: 'widget.filter_his',
    title :  '起止日期',
    width : 320,
    height : 420,
    prefix:'dhdjb_yl.',
    requires: ['erp.ux.CommonTrigger','erp.ux.SelectField'],
    iconCls:'page_go',
    model : true,
      initComponent : function(){
         var me=this;/*
         me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
	     me.argColumns=erp.Util.getColumns(me.argStore.getModel());	*/
          Ext.apply(me,{
              layout : {
                type : 'vbox',
                align : 'stretch'
             },
              defaults:{padding:5},
              items : [
                  {
                  xtype: 'form',
                  layout:'column',
                  defaults : {
				  anchor: '95%',
				  labelWidth: 72,
				  margin:'5 5 5 5',
				  columnWidth: 1
			      },
			      items : [
			       {
					     name     : 'checkbox_qsrq',
				         itemId   : 'checkbox_qsrq',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },
			       {
			         fieldLabel : '起始日期',
			         xtype : 'datefield',
			         itemId : 'qsrq',
			         name : 'qsrq',
	                 columnWidth:.9,
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_qsrq').setValue(true);
								}
							}
						}
			       },
			       {
					     name     : 'checkbox_jzrq',
				         itemId   : 'checkbox_jzrq',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },
			       {
			         fieldLabel : '截止日期',
			         xtype : 'datefield',
			         itemId : 'jzrq',
			         name : 'jzrq',
			         columnWidth:.9,
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jzrq').setValue(true);
								}
							}
						}
			       },
			       {
					     name     : 'checkbox_dhdh',
				         itemId   : 'checkbox_dhdh',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },
			       {
			         fieldLabel : '到货单号',
			         xtype : 'numberfield',
			         itemId : 'dhdh',
			         name : 'dhdh',
			         columnWidth:.9,
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_dhdh').setValue(true);
								}
							}
						}
			       },
			       {
					     name     : 'checkbox_jhbz',
				         itemId   : 'checkbox_jhbz',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },
			       {
			         fieldLabel : '生产单号',
			         xtype : 'numberfield',
			         itemId : 'jhbz',
			         name : 'jhbz',
			         columnWidth:.9,
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jhbz').setValue(true);
								}
							}
						}
			       },
			       {
					     name     : 'checkbox_zjdh',
				         itemId   : 'checkbox_zjdh',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },
			       {
			         fieldLabel : '质检单号',
			         xtype : 'numberfield',
			         itemId : 'zjdh',
			         name : 'zjdh',
			         columnWidth:.9,
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_zjdh').setValue(true);
								}
							}
						}
			       },
			       {
					     name     : 'checkbox_jhh',
				         itemId   : 'checkbox_jhh',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },
			       {
			         fieldLabel : '计划编号',
			         xtype : 'textfield',
			         itemId : 'jhh',
			         name : 'jhh',
			         columnWidth:.9,
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_jhh').setValue(true);
								}
							}
						}
			       },
			       {
					     name     : 'checkbox_ddh',
				         itemId   : 'checkbox_ddh',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },
			       {
			         fieldLabel : '订单编号',
			         xtype : 'textfield',
			         itemId : 'ddh',
			         name : 'ddh',
			         columnWidth:.9, 
					      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_ddh').setValue(true);
								}
							}
						}
			       },
			       {
					     name     : 'checkbox_csmc',
				         itemId   : 'checkbox_csmc',
                         xtype 	  : 'checkbox',
	                     columnWidth:0.1
					   },
			       {
			         fieldLabel : '厂商名称',
			         xtype : 'selectfield',
			         itemId : 'csmc',
			         name : 'csmc',
			         columnWidth:0.9,
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
			       },
			       {
		                  name : 'checkbox_clhh',
			              itemId:'checkbox_clhh',
                          xtype 	  :'checkbox',
                          columnWidth:0.1
		                },
		                {
		                  fieldLabel : '材料编号',
		                  itemId : 'clhh',
		                  name : 'clhh',
		                  xtype : 'textfield',
		                  columnWidth:0.9,
		                  listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_clhh').setValue(true);
								}
							}
							}
		                },{
		                  fieldLabel : '材料名称',
		                  itemId : 'clmc',
		                  name : 'clmc',
		                  xtype:'commonTrigger',
		                  selModel:'SINGLE',
		                  columnWidth:1,
		                   cusConfig:{
					         type:'QuotDetail',
					         field:'clmc',
					         indexNum:3,
					         callback : function(v,rec,recs){
									  me.clmcCallback(v,rec,recs);
									}
					     },
			              win:'erp.view.master.purchaseDetail.window.MateCombo',
		                	listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_clhh').setValue(true);
								}
							}
						  }
		               }/*,{
		                   name : 'checkbox_cpmc',
			               itemId:'checkbox_cpmc',
                           xtype 	  :'checkbox',
                           columnWidth:0.1
		               },{
		                  fieldLabel : '产品名称',
		                  name : 'cpmc',
		                  itemId : 'cpmc',
		                  xtype : 'textfield',
		                  columnWidth:.9,
		                  listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_cpmc').setValue(true);
								}
							}
						}
		               },{
		                name : 'checkbox_khmc',
			            itemId:'checkbox_khmc',
                        xtype 	  :'checkbox',
                        columnWidth:0.1
		               },{
		                 fieldLabel : '客户名称',
		                  name : 'khmc',
		                  itemId : 'khmc',
		                  xtype : 'textfield',
		                  columnWidth:.9,
		                  listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_khmc').setValue(true);
								}
							}
						}
		            }*/],
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
                }
              ]
          });this.callParent(arguments);
          me.down('form').getForm().loadRecord(me.rec);
      },
      doQuery : function(){
          var me = this; 	
          var lsStore = Ext.create('erp.arrivalRegister.store.HistoryArrival');
          /*Ext.apply(lsStore.proxy.extraParams,
                       {
                       condition : me.getQueryCondition(),
                       ckbh : me.ckbh
                       })*/
          var condition = me.getQueryCondition();
          if(!Ext.isEmpty(condition)){
             condition = ' and '+me.getQueryCondition();
          }
          var panel  = erp.Util.addContentTab({
               xtype : 'History_Material',
               itemId : 'HistoryMaterial',
               condition: condition,
               ckbh : me.ckbh,
               title : '历史到货单查询',
               lsStore : lsStore
               /*lsStore : lsStore.load({
                  params : {
                   condition : me.getQueryCondition(),
                   ckbh : me.ckbh
                  }
               })*/
          })
          me.close();
      },
       clmcCallback : function(v,rec,recs){
          var me= this;
          var clhh = rec.get('clhh');
          me.down('#clhh').setValue(clhh);
      },
         getQueryCondition : function(){
         var me = this;
         var condition = '';
         var form=me.down('form');
        
            if (form.getForm().isDirty()){
              var rec = form.getRecord();
               form.updateRecord(rec);
              
             var obj=rec.getChanges();
             var arr=[];
             var arrs = [];
             for(var x in obj){
                if(!Ext.isEmpty(obj[x])){
                	if(x=='qsrq' && obj['checkbox_qsrq']){
                	    arr.push(me.prefix+"dhrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ")
                	}else if(x=='jzrq' && obj['checkbox_jzrq']){
                	    arr.push(me.prefix+"dhrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ")
                	}else if(x=='dhdh' && obj['checkbox_dhdh']){
                	    arr.push(me.prefix+"dhdh = '"+obj[x]+"'")
                	}else if(x=='jhbz' && obj['checkbox_jhbz']){
                	    arr.push("jhmxb.jhbz like '%"+obj[x]+"%'")
                	}else if(x=='csmc' && obj['checkbox_csmc']){
                	    arr.push(me.prefix+"csbh = '"+obj[x]+"'")
                	}else if(x=='clhh' && obj['checkbox_clhh']){
                	    arr.push(me.prefix+"clhh = '"+obj[x]+"'")
                	}else if(x=='zjdh' && obj['checkbox_zjdh']){
                	    arr.push(me.prefix+"zjdh like '%"+obj[x]+"%'")
                	}else if(x=='jhh' && obj['checkbox_jhh']){
                	    arr.push(me.prefix+"jhbh  = '"+obj[x]+"'")
                	}else if(x=='ddh' && obj['checkbox_ddh']){
                	    arr.push("jhmxb.ddbh like '%"+obj[x]+"%'")
                	}/*else if(x=='cpmc' && obj['checkbox_cpmc']){
                	    arr.push("cpbmb.cpmc like '%'"+obj[x]+"%'")
                	}else if(x=='khmc' && obj['checkbox_khmc']){
                	   arr.push("khmc like '%'"+obj[x]+"%'")
                	}*/
                }
              }
         condition=arr.join(' and ');
            }
            return condition;
	   	  
         }
})