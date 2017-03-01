//单位选择窗口
Ext.define('erp.PurchaseClearing.view.DwChoose',{
    extend:'erp.ux.Window',
	alias:'widget.Choose_Dw',
	width : 300,
	title : '单位输入',
	iconCls:'page_go',
	height : 160,
	modal:true,
	initComponent:function(){
	   var me = this;
	    Ext.apply(me,{
	       layout : {
	          type : 'fit'
	       },
	       defaults:{padding:20},
	       items:[{
	          xtype : 'form',
	          itemId: 'DwChooseForm',
	          items : [{
	             fieldLabel : '单位',
	             labelWidth : 60,
	             xtype : 'combo',
	             itemId : 'jldw',
	             name : 'jldw',
	             store : [[me.jldw,me.jldw],[me.fzdw,me.fzdw]]
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
           var form = me.down('#DwChooseForm');
           return form.getValues();
        },
      getRec : function(){
          var me = this;
          return me.rec
      }  
})