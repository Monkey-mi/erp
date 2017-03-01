
Ext.define('erp.ux.BaseHelpField', {
	extend: 'Ext.form.field.Text',
	alias : 'widget.basehelpfield',
	triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            handler: 'onSearchClick',
            scope: 'this'
        }
    },
    hasSearch : false,
    paramName : 'query',
	initComponent:function(){
		var me=this;
		this.callParent(arguments);
		
		me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onSearchClick();
            }
        });
        me.helprec = erp.DataUtil.findConfig(me.code);
		me.type = me.helprec ? me.helprec.get('type') : erp.DataConst.BASIC_CODE;
	},
	listeners:{
		afterrender:function(field){
			var me=this;
			if(me.type=erp.DataConst.BASIC_CODE){
				var storeName = erp.DataConst.Config.findRecord('code', me.code, 0, false, false, true).get('store');
				var store=Ext.create(storeName).load();
			}
		}
	},
	 onClearClick : function(){
        var me = this;
//        activeFilter = me.activeFilter;
//
//        if (activeFilter) {
            me.setValue('');
//          me.store.getFilters().remove(activeFilter);
            me.activeFilter = null;
            me.getTrigger('clear').hide();
            me.updateLayout();
//        }
    },
	onSearchClick:function(){
			var me=this;
			if(me.type=erp.DataConst.BASIC_CODE){
				var windowType = erp.DataConst.Config.findRecord('code', me.code, 0, false, false, true).get('xtype');
				var win=Ext.widget(windowType);
			}	
			me.getTrigger('clear').show();
			me.updateLayout();
			win.show();
	}
});