Ext.define('erp.materialTestEvaluation.view.MaterialTestEvaluationChoose',{
	extend: 'erp.ux.Window',
	alias: 'widget.win_MaterialEvaluationChoose',
	requires : ['erp.ux.FormKey',
				'erp.ux.ComboxTree',
	            'erp.materialTestEvaluation.model.MaterialTestEvaluationChoose'],
	title : '起止日期',
	width:  300,
    height: 200,
    iconCls:'page_go',
    modal:true,
    initComponent : function(){
    	var me = this;
    	me.rec = Ext.create('erp.materialTestEvaluation.model.MaterialTestEvaluationChoose');
    	var myDate = new Date();
    	myDate.setDate(01);
    	myDate.setHours(0);
    	myDate.setMinutes(0);
    	myDate.setSeconds(0);
    	var jzrq = new Date();
    	jzrq.setHours(23);
    	jzrq.setMinutes(59);
    	jzrq.setSeconds(59);
	    var czyh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;//工号
        var ckStore = Ext.create('erp.materialInventory.store.Ckmc').load({params:{czyh:czyh}});
	    Ext.apply(me,{
	    	layout : {type: 'fit',pack: 'start',align: 'stretch'},
	    	defaults:{padding:5},
	    	 items:[{
	    		 itemId: 'MaterialEvaluationForm',
             	 xtype: 'form',
             	 plugins:{ptype: 'FormKey'},
				 store: me.store,
				 layout:{ type: 'column',pack: 'start',align: 'stretch'},
				 defaults: {anchor: '95%',labelWidth: 72,margin:'5 5 5 5',columnWidth: 1},
				 items: [
				 		{fieldLabel : '送检类别',
						itemId : 'wtsjlb',
						name : 'wtsjlb',
						xtype:'comboxTree',
						emptyText:'全部',
						queryMode : 'local',
						store : Ext.create('erp.materialInspection.store.WtbhTree'),
						displayField : 'text',
					    valueField: 'nodeId',
						columnWidth : 1,
						listeners:{
							'select' : function(field,v,o){
								console.log(field);
								console.log(v);
								if(v){
//								var lbbh = record.get('nodeId');
								var result = erp.Const.callServiceMethodSync('materialTestEvaluation/MaterialTestEvaluation.act?method=getWtsjlbqxb',{
								wtsjlb:	v.lbbh,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id
								});
								var data = Ext.decode(result)
								console.log(Ext.decode(result));
								if(!data.bool){
									Ext.Msg.alert('提示',data.msg);
									me.down('#wtsjlb').setValue('');
									return;
								}
								}
							}
						}
						},
				        {fieldLabel:'起始日期',
				         libelWidth: 100,
				         xtype:'datefield',
				         itemId:'qsrq',
				         name:'qsrq',
				         value: myDate,
                         format: 'Y-m-d H:i:s',
                         columnWidth: 1
				        },{
                            fieldLabel: '截止日期',
                            libelWidth: 100,
                            itemId: 'jzrq',
                            name:'jzrq',
                            format: 'Y-m-d H:i:s',
                            value: jzrq,
                            xtype: 'datefield',
                            columnWidth: 1
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
						    handler:me.doMaterialInventory
						},
						{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
						]
	    	 }]
	    });
	    this.callParent(arguments);
	    me.down('form').loadRecord(me.rec);
    },
    doMaterialInventory : function(){
    	
    	 var form = me.down('form');
	     var rec=form.getRecord();	
	     form.updateRecord(rec);
	     if(form.isValid()){
	     var wtsjlbmc = form.down('#wtsjlb').getRawValue();
	     if(Ext.util.Format.trim(wtsjlbmc)==''){
	     	wtsjlbmc = '全部'
	     }
         var ks_rkrq =Ext.util.Format.date(rec.get('qsrq'),'Y-m-d H:i:s') ;
         var jz_rkrq =Ext.util.Format.date(rec.get('jzrq'),'Y-m-d H:i:s') ;
	     var czyh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;//工号
	     var store = Ext.create('erp.materialTestEvaluation.store.MaterialTestEvaluation');
	     var title = '【 委托送检类别：'+wtsjlbmc+'】【 起止日期：'+ks_rkrq+' - '+jz_rkrq +'】';
	     console.log(title);
	     me.close();
	    
	     var panel = erp.Util.addContentTab({
	    	 xtype : 'mng_MaterialTestEvaluation',
	    	 itemId : 'Material_TestEvaluation',
             title: '材料委托判定评审总表',
			 qsrq:rec.get('qsrq'),
			 jzrq:rec.get('jzrq'),
             wtsjlb : rec.get('wtsjlb'),
             titles : title,
             closable : true
	     });
	    } 
    }   
});