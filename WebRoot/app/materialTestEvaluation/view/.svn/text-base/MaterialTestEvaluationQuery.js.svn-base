Ext.define('erp.materialTestEvaluation.view.MaterialTestEvaluationQuery',{
    extend: 'erp.ux.Window',
	alias: 'widget.query_MaterialTest',
	title: '筛选条件',
	resizable : true,
	width:420,
	height:260,
	frame:true,
	modal : true,
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
						fieldLabel:'委托日期',
						itemId :'wtrq',
						name:'wtrq',
						columnWidth:.5,
						xtype:'datefield',
						format: 'Y-m-d',
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
						name:'wtrqw',
						itemId :'wtrqw',
						labelWidth:20,
						xtype:'datefield',
						format: 'Y-m-d',
						columnWidth:.5
					},
					
					{
						fieldLabel:'委托单号',
						name:'wtdh',
						itemId :'wtdh', 
						columnWidth:.5,
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
						name:'wtdhw',
						itemId :'wtdhw',
						labelWidth:20,
						columnWidth:.5
					},
					{
						fieldLabel:'供应厂商',
      					name:'csbh',
      					itemId: 'csbh',
						columnWidth:1
					},
					{
						fieldLabel:'委托人',
      					name:'wtrm',
      					itemId: 'wtrm',
						columnWidth:1
					},
					{
						fieldLabel:'材料名称',
						name:'clmc',
						itemId:'clmc',
						columnWidth:1,
						xtype:'helpField',
						width:230,
						code : erp.DataConst.MATEINFO,
						forceSelection:false,
						enableKeyEvents :true
					}
				],
			buttons:[{text:'重置',iconCls:'reset',itemId:'btn_reset'},'->',{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'page_error',handler:function(){me.close()}}]
			}]
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
	},
	getQueryCondition:function(){
	  var me = this;
	  var form=me.down('form');
	  var rec = form.getValues();
	  console.log(rec)
	  var strWhere ='';
	  if(rec.wtdh!=null&&rec.wtdh!=''){
	     strWhere+="  and ( left(wtdh,len('"+rec.wtdh+"'))>= '"+rec.wtdh+"')" 
	  }
	  if(rec.wtdhw!=null&&rec.wtdhw!=''){
	     strWhere+="  and ( left(wtdh,len('"+rec.wtdhw+"'))<= '"+rec.wtdhw+"')"
	  }
	  console.log(me.down('#wtrq').getValue());
	 
	  if(rec.wtrq!=null&&rec.wtrq!=''){
	  	 var qsrq = rec.wtdh
	     strWhere+="  and ( wtrq>='"+Ext.Date.format(me.down('#wtrq').getValue(),'Y.m.d H:i:s')+"')"
	  }
	  if(rec.wtrqw!=null&&rec.wtrqw!=''){
	  	  var wtrqw = me.down('#wtrqw').getValue();
		  wtrqw.setHours(23);
	      wtrqw.setMinutes(59);
	      wtrqw.setSeconds(59);
	     strWhere+="  and ( wtrq<='"+Ext.Date.format(wtrqw,'Y.m.d H:i:s')+"')"
	  }
	  if(rec.clmc!=null&&rec.clmc!=''){
	     strWhere+="  and (indexOf(clmc,'"+rec.clmc+"')>=0)"
	  }
	  if(rec.wtrm!=null&&rec.wtrm!=''){
	     strWhere+="  and (indexOf(wtrm,'"+rec.wtrm+"')>=0)"
	  }
	  if(rec.csbh!=null&&rec.csbh!=''){
	     strWhere+="  and (indexOf(csmc,'"+rec.csbh+"')>=0)"
	  }
	  console.log(strWhere)
	  return strWhere;
	}
})