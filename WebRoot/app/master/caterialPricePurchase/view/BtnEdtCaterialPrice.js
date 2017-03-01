Ext.define('erp.master.caterialPricePurchase.view.BtnEdtCaterialPrice',{
       extend: 'erp.ux.Window',
	   alias: 'widget.edtbth_CaterialPrice',
	   requires:['erp.ux.FormKey'],
	   title: '批量修改',
	   modal: true,
	   width: 300,
	   height:260,
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
		      layout:{
				type:'vbox',
				align:'stretch'
			},
			defaults: {
				anchor: '95%',
				labelWidth: 80,
				xtype: 'textfield',
				margin:'5 5 5 5'
			},
			items: [{
			     fieldLabel:'控制单价',
			     itemId: 'kzdj',
			     name: 'kzdj'
			},{
			     fieldLabel: '辅助控价',
			     itemId: 'fzkj',
			     name : 'fzkj'
			},{
				fieldLabel:'计划单价',
				itemId : 'jhdj',
				name : 'jhdj'
			},{
				xtype : 'datefield',
				fieldLabel:'起始生效',
				itemId : 'qssxsj',
				name : 'qssxsj'
				
			},{
				xtype : 'datefield',
			    fieldLabel:'截止生效',
				itemId : 'jzsxsj',
				name : 'jzsxsj'
				
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
        getQssx : function(){
           var qssx = me.down('#qssxsj').getValue(); 
           return qssx;
        },
        getJzsx : function(){
           var jzsx = me.down('#jzsxsj').getValue(); 
           return jzsx;
        },
        loadRecord:function(rec){
		var me=this;
		me.down('#BthForm').loadRecord(rec);
	}
})