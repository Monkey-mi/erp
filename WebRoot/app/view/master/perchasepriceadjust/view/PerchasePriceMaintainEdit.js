Ext.define('erp.view.master.perchasepriceadjust.view.PerchasePriceMaintainEdit', {
    extend: 'erp.ux.Window',
    alias: 'widget.PerchasePriceMaintainEdit',
    iconCls: 'page_edit',
    title: '批量修改',
    width: 300,
    height: 200,
    modal: true,
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            layout: 'fit',
            items: [{
                xtype: 'form',
                heigth: 50,
                layout: 'column',
                defaults: {
                    padding: 5,
                    xtype: 'textfield',
                    labelWidth: 100,
                    selectOnFocus: true,
                    listeners: {
                        specialkey: function(field, e) {
                            if (e.getKey() == e.ENTER) {
                                me.down('#btn_confirm').fireEvent('click', me.down('#btn_confirm'));
                            }
                        }
                    }
                },
                items: [{
                    name: 'checkbox_thdj',
                    itemId: 'checkbox_thdj',
                    xtype: 'checkbox',
                    columnWidth: 0.1
                }, {
                    itemId: 'thdj',
                    name: 'thdj',
                    fieldLabel: '调后单价',
                    columnWidth: 0.9,
                    xtype:'numberfield',
                    decimalPrecision: 6,
			    	allowNegative: false,
			    	minValue : '0',
			    	listeners:{
			    		'blur':function(t,newValue,oldValue,e){
			    			var thdj = me.down('#thdj').getValue();
			    			if(me.wbhl!=0){
			    			me.down('#wbdj').setValue(Ext.util.Format.round(thdj/me.wbhl,6));
			    			}else{
			    			me.down('#wbdj').setValue(0);	    				
			    			}
			    		}
			    	
			    	}
                }, {
                    name: 'checkbox_wbdj',
                    itemId: 'checkbox_wbdj',
                    xtype: 'checkbox',
                    columnWidth: 0.1
                }, {
                    itemId: 'wbdj',
                    name: 'wbdj',
                    fieldLabel: '调后外币单价',
                    columnWidth: 0.9,
                    xtype:'numberfield',
                    decimalPrecision: 6,
			    	allowNegative: false,
			    	minValue : '0',
			    	listeners:{
			    		'blur':function(t,newValue,oldValue,e){
			    			var wbdj = me.down('#wbdj').getValue();
			    			me.down('#thdj').setValue(Ext.util.Format.round(wbdj*me.wbhl,6));
//			    			me.down('#thdj').setValue(Ext.util.Format.round(newValue*me.rec.get('wbhl'),4));
			    		}
			    	
			    	}
                }],
                buttons: [{
                    text: '确定',
                    iconCls: 'accept',
                    itemId: 'btn_confirm'
                }, '->', {
                    text: '退出',
                    iconCls: 'page_error',
                    handler: function() {
                        me.close()
                    }
                }]
            }]
        });
        this.callParent(arguments);
        me.down('form').loadRecord(me.rec);
    }
})