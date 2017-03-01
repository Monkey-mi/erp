Ext.define('erp.materialInspection.view.ImpQuery',{
    extend: 'erp.ux.Window',
	alias: 'widget.query_Imp',
	title: '筛选条件',
	resizable : false,
	width:450,
	height:220,
	frame:true,
	modal : true,
	prefix:'dhdjb_yl.'
	,/*listeners: {
	    beforeclose: function(cmp) {
	        if(cmp.store.proxy.extraParams.condition!=''){
	           delete cmp.store.proxy.extraParams.condition
	        }
	    }
	},*/
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'form',
				heigth:50,	
				layout:'column',
				defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.down('#btn_confirm').fireEvent('click',me.down('#btn_confirm'));
    	                    }
    	                }
					}},
				items:[
					{
						fieldLabel:'到货单号',
						name:'dhh',
						itemId :'dhh', 
						columnWidth:1,
						listeners:{
						/*change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
	                    	},*/
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.down('#btn_confirm').fireEvent('click',me.down('#btn_confirm'));
    	                    }
    	                }
						}
					},
					{
						fieldLabel:'合同编号',
						name:'hth',
						itemId :'hth', 
						columnWidth:1,
						listeners:{
						/*change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
	                    	},*/
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.down('#btn_confirm').fireEvent('click',me.down('#btn_confirm'));
    	                    }
    	                }
						}
					},
					{
						fieldLabel:'到货日期',
						itemId :'dhrq',
						name:'dhrq',
						columnWidth:.5,
						xtype:'datefield',
						listeners:{
						change :function(o,  newValue,  oldValue,  eOpts){
								this.nextSibling().setValue(newValue);
	                    	},
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.down('#btn_confirm').fireEvent('click',me.down('#btn_confirm'));
    	                    }
    	                }
						}
					},
					{
						fieldLabel:'至',
						name:'dhrqw',
						itemId :'dhrqw',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.5
					},
					{
						fieldLabel:'材料名称',
						name:'clmc',
						itemId:'clmc',
						columnWidth:1,
						xtype:'helpField',
						width:230,
						code : erp.DataConst.MATEINFO,
						//文本框可以为空，沈洪根20150826
						forceSelection:false,
						enableKeyEvents :true
					}
				],
			buttons:[{text:'重置',iconCls:'reset',itemId:'btn_reset'},'->',{text:'确认',iconCls:'accept',itemId:'btn_confirm',handler:function(){me.doQuery();}},
				{text:'关闭',iconCls:'page_error',handler:function(){me.close()}}]
			}]
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
	},
	doQuery : function(){
	   var me = this;
	   delete me.store.proxy.extraParams.condition;
	   if(me.getQueryCondition()!='' && me.getQueryCondition()!=null ){
	   	console.log(me.getQueryCondition());
	   Ext.apply(me.store.proxy.extraParams,
       {
        condition:me.getQueryCondition()
       })
	   }
       me.store.load(); 		
	   me.close();
	},
	getQueryCondition:function(){
	   var me = this;
	   var condition = null;
	   var form=me.down('form'); 
	   console.log(form);
	   if(form.getForm().isDirty()){
	       var rec=form.getRecord();
	       form.updateRecord(rec);
		   var obj=rec.getChanges();
		   var arr=[];
		   console.log(rec);
		   console.log(obj);
		   for(var x in obj){
		         if(!Ext.isEmpty(obj[x]))
					{ 
					  if(x=='dhh' && obj['dhh']!=''){
					      arr.push(me.prefix+"dhdh = '"+obj[x]+"'");
					  }else if(x=='hth' && obj['hth']!=''){
					  	arr.push(me.prefix+"htbh = '"+obj[x]+"'");
					  }else if(x=='clmc' && obj['clmc']){
					      arr.push("clbmb.clmc like '%"+obj[x]+"%'");
					  }else if(x=='dhrq' && obj['dhrq']!=''){
					      arr.push(me.prefix+"dhrq >= '"+Ext.Date.format(obj[x],'Y-m-d')+"'");
					  }else if(x=='dhrqw' && obj['dhrqw']!=''){
					      arr.push(me.prefix+"dhrq <= '"+Ext.Date.format(obj[x],'Y-m-d')+"'");
					  }
					} 
		   }
		   condition=arr.join(' and ');
		   console.log(condition);
	   }
	   return condition;
	}
})