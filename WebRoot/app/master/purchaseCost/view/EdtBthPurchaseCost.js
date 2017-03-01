Ext.define('erp.master.purchaseCost.view.EdtBthPurchaseCost',{
       extend: 'erp.ux.Window',
	   alias: 'widget.edtbth_PurchaseCost',
	   requires:['erp.ux.FormKey'],
	   title: '批量修改',
	   modal: true,
	   width: 300,
	   height:150,
	   initComponent: function(){
        	var me = this;
        Ext.apply(me,{
             layout:{
				type:'vbox',
				align:'stretch'
			},
		 defaults:{padding:5},	
		 items:[{
		    itemId:'BthForm',
		    xtype: 'form',
		    plugins:{
				ptype: 'FormKey'
		    },
		     layout:'column',
			defaults: {
				anchor: '95%',
				labelWidth: 80,
				xtype: 'textfield',
				margin:'5 5 5 5'
			},
			items: [
			    {
				 name      : 'checkbox_zflb',
				 itemId:'checkbox_zflb',
                 xtype 	  :'checkbox',
	             columnWidth: .2
				},
				{
			     fieldLabel:'支付类别',
			     itemId: 'zflb',
			     name: 'zflb',
			     xtype : 'comboxTree',
			  /*   allowBlank:false,
				 blankText : '支付类别不能为空',*/
			     queryMode : 'local',
				 store : Ext.create('erp.master.purchaseCost.store.PayCategoryTree',{autoLoad:true}),
				 displayField : 'text',
			     valueField: 'nodeId',
			     columnWidth:.8,
						listeners:{
							'select':function(obj,value){
								if(!Ext.isEmpty(value)){
									var sql = " select mjbz from zjzflbb where lbbh = "+value.id+";";
		                                     var result = erp.Const.callServiceMethodSync(
    								        'materialInventory/materialInventory.act?method=getStringFromSql', {
    								         sql:sql
    							          });
    							          var data = Ext.decode(result);
    							          if(data.val!=1){
    							          Ext.Msg.alert('提示','该支付类别不是末级类别，请重新选择!');
    							          me.down('#zflb').setValue('');
    							          return;}
							  		me.down('#checkbox_zflb').setValue(true);
								}
							}
						}
			 /*    store : Ext
			             .create('erp.master.purchaseCost.store.PayCategory'),
			     displayField : 'lbmc',
			     valueField: 'lbbh'*/
			},
				{
				 name      : 'checkbox_sybm',
				 itemId:'checkbox_sybm',
                 xtype 	  :'checkbox',
	             columnWidth: .2
				},{
			     fieldLabel: '受益部门',
			     itemId: 'sybm',
			     name: 'sybm',
			     xtype : 'comboxTree',
			   /*  allowBlank:false,
				 blankText : '支付类别不能为空',*/
			     queryMode : 'local',
				 store : Ext.create('erp.master.purchaseCost.store.BenefitDeptTree',{autoLoad:true}),
				 displayField : 'text',
			     valueField: 'nodeId',
			     columnWidth:.8,
						listeners:{
							'select':function(obj,value){
								if(!Ext.isEmpty(value)){
		                             var sql = " select mjbz from clfbx_fsbmb where bmbh = "+value.id+";";
		                             var result = erp.Const.callServiceMethodSync(
    								 'materialInventory/materialInventory.act?method=getStringFromSql', {
    								  sql:sql
    							     });
    							     var data = Ext.decode(result);
    							     if(data.val!=1){
    							      Ext.Msg.alert('提示','该部门类别不是末级类别，请重新选择!');
    							      me.down('#sybm').setValue('');
    							      return;
    							     }
							  		me.down('#checkbox_sybm').setValue(true);
								}
							}
						}
			/*     store:  Ext
			             .create('erp.master.purchaseCost.store.BenefitDept'),
			     displayField : 'bmmc',
			     valueField : 'bmbh'*/
			}], 
			buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'保存',iconCls:'page_save',action:'BTN_SAVE'},
			{text:'取消',iconCls:'page_error',handler:function(){
					me.close();
			}}]
		 }]
        }) 
        me.callParent(arguments);
     },
        getData: function(){
           var me = this;
           var form = me.down('#BthForm');
           return form.getValues();
        },
     
        loadRecord:function(rec){
		var me=this;
		me.down('#GroupForm').loadRecord(rec);
	}
})