Ext.define('erp.arrivalRegister.view.Return',{
    extend : 'erp.ux.Window',
    alias: 'widget.Return_goods',
    title : '退货处理',
    model : true,
    width : 290,
    height : 170,
    initComponent : function(){
        var me = this;
        Ext.apply(me,{
	       layout : {
	          type : 'vbox'
	       },
	      defaults:{padding:20},
	      items:[{
	         xtype : 'form',
	         itemId : 'returnForm',
	         items : [{
	             fieldLabel : '退货单号',
	             labelWidth : 60,
	             xtype : 'textfield',
	             itemId : 'thdh',
	             name : 'thdh',
	             value : me.thdh
	         },{
	            fieldLabel : '退货日期',
	            labelWidth : 60,
	            xtype : 'datefield',
	            itemId : 'thrq',
	            name : 'thrq',
	            value : new Date()
	         }],
	         buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,action:'BTN_SAVE'
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
	      }]
	   });
	   this.callParent(arguments);
    },
    getData: function(){
           var me = this;
           var form = me.down('#returnForm');
           return form.getValues();
        }
})