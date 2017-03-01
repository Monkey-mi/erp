Ext.define('erp.PurchaseCostDetial.view.FilterWin',{
    extend: 'erp.ux.Window',
    alias: 'widget.win_Filter',
    requires: ['erp.ux.FormKey'],
    title : '筛选条件',
    width:  350,
    height: 250,
    iconCls:'page_go',
    modal:true,
    initComponent : function(){
       var me=this;
       me.rec=Ext.create('erp.PurchaseCostDetial.model.FilterParam');
       Ext.apply(me,{
           layout: {
              	 type: 'fit',
              	 pack: 'start',
		         align: 'stretch'
           },
           defaults:{padding:5},
           items : [{
               itemId : 'FilterForm',
               xtype: 'form',
               plugins:{
				 ptype: 'FormKey'
			   },
			   layout:{
			     type: 'column',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	  defaults: {
				 anchor: '95%',
				 labelWidth: 72,
				 margin:'5 5 5 5',
				 columnWidth: 1
			},
			items : [
			    {
			     fieldLabel: '核算部门',
			     itemId : 'hsbm',
			     name : 'hsbm',
			     columnWidth: 1,
			     displayField : 'bmmc',
				 valueField: 'hsbm',
			     xtype : 'comboxTree',
				 queryMode : 'local',
				 store : Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree'),
			     displayField : 'text',
				 valueField: 'nodeId'
			    },{
			     fieldLabel : '费用日期',
			     name : 'fyrq1',
			     itemId : 'fyrq1',
			     xtype : 'datefield',
			     columnWidth:.57
			    },{
			     fieldLabel : '至',
			     name : 'fyrq2',
			     itemId : 'fyrq2',
			     labelWidth:20,
			     /*value : Ext.util.Format.date(new Date(), "Y-m-d"),*/
				 xtype:'datefield',
				 columnWidth:.43
			    },{
			     fieldLabel : '厂商名称',
			     name: 'csmc',
				 itemId: 'csmc',
				 columnWidth: 1,
				 xtype:'helpField',
				 code : erp.DataConst.FACTORYINFO,
				 fieldConfig:{forceSelection:false}
			    },{
			     fieldLabel : '操作员',
			     name : 'czym',
			     itemId:'czym',
			     value : erp.UInfo.currentUser.name,
			     columnWidth: 1,
			     xtype:'textfield'
			    }
			],
			      buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.reset();
						me.down('#hsbm').setValue('');
						me.down('#fyrq1').setValue('');
						me.down('#fyrq2').setValue('');
						me.down('#csmc').setValue('');
						me.down('#czym').setValue('');
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
			    handler:me.loadPanel
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
           }]
       });
       this.callParent(arguments);
       me.down('form').loadRecord(me.rec);
    },
    loadPanel : function(){
        var form = me.down('form');
		var rec=form.getRecord();
		form.updateRecord(rec);
		me.close();
		var panel = erp.Util.addContentTab({
		     xtype : 'mng_PurchaseCostDetial',
		     itemId : 'PurchaseCostDetialManger',
		     rec : rec,
		     closable : true
		})
    }
})