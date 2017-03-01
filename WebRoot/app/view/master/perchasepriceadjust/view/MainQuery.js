Ext.define('erp.view.master.perchasepriceadjust.view.MainQuery',{
      extend: 'erp.ux.Window',
      alias: 'widget.win_MainQuery',
      title: '采购价格调整单筛选',
      iconCls:'page_find',
      frame:true,
      width: 300,
      height:150,
      prefix : '',
      controller:'PerchasePriceCtl',
      viewModel: {
        type: 'perchaseViewModel'
      },
      initComponent : function() {
         var me = this;
          Ext.apply(me,{
          layout: 'fit',
          items: [{
             xtype : 'form',
                 frame:true,
		         heigth:50,
			     layout:'column',
			       defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
				}
              }
              ,items:[
                   /* {
                      name : 'checkbox_czym',
                      itemId: 'checkbox_czym',
                      xtype : 'checkbox',
                      columnWidth: .1
                    },*/{
                      fieldLabel : '操作员名',
                      name:'czym',
                      itemId : 'czym',
                      xtype:'textfield',
                      columnWidth:1,
                      listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
								}
							}
                        }
                    }]
            }],
            buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						delete me.mainstore.proxy.extraParams.czym;
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
				handler:function(){
				var win = this.up('#win_MainQuery');
				me.doQuery(win);}
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			] 
          });
          this.callParent(arguments);
		 me.down('form').loadRecord(me.rec);
      },
      doQuery:function(win){
      	var form=me.down('form'); 
      	var rec = form.getRecord();
	    form.updateRecord(rec);
	    Ext.apply(win.mainstore.proxy.extraParams,{
	       czym : rec.data.czym
	    })
	    win.mainstore.load();
	    win.close();
      }
})