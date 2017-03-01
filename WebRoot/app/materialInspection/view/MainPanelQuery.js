Ext.define('erp.materialInspection.view.MainPanelQuery',{
    extend: 'erp.ux.Window',
	alias: 'widget.query_MainPanel',
	title: '筛选条件',
	resizable : false,
	width:450,
	height:220,
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
						fieldLabel:'委托部门',
      					name:'wtlb',
      					itemId: 'wtlb',
      					xtype:'comboxTree',
      					queryMode : 'local',
      					store : Ext.create('erp.materialInspection.store.WtbhTree'),
      					displayField : 'text',
      					valueField: 'nodeId',
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
	  if(rec.wtrq!=null&&rec.wtrq!=''){
	     strWhere+="  and ( wtrq>='"+Ext.Date.format(me.down('#wtrq').getValue(),'Y.m.d H:i:s')+"')"
	  }
	  if(rec.wtrqw!=null&&rec.wtrqw!=''){
	     strWhere+="  and ( wtrq<='"+Ext.Date.format(me.down('#wtrqw').getValue(),'Y.m.d H:i:s')+"')"
	  }
	  if(rec.clmc!=null&&rec.clmc!=''){
	     strWhere+="  and (indexOf(clmc,'"+rec.clmc+"')>=0)"
	  }
	  if(rec.wtlb!=null&&rec.wtlb!=''){
	     strWhere+="  and (indexOf(wtlb,'"+rec.wtlb+"')>=0)"
	  }
	  console.log(strWhere)
	  return strWhere;
	}
})