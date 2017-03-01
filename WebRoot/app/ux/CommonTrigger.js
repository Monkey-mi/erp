Ext.define('erp.ux.CommonTrigger', {
    extend: 'Ext.form.field.Text',
    alternateClassName:'ux.form.field.commonTrigger',
    xtype: 'commonTrigger',
	requires:['erp.ux.GridSearchPanel',
		'erp.ux.PagingBar',
		'erp.ux.GridSearchField'
	],
	hiddenField:null, //隐藏组件
    selWin:null,
    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            weight: 1,
            handler: 'onSelect'
        }
    },
    
    initComponent:function(){
    	var me = this;
	    var triggers = me.getTriggers();
    	triggers['search'].handler = me.onSelect;
		this.callParent();
    },
    
    onRender:function(ct, position){
		var me = this;
		me.hiddenField = new Ext.form.field.Hidden({name:me.hiddenName});
		me.up('panel').add(me.hiddenField);
		me.superclass.onRender.call(this, ct, position);
    },
    onSelect:function(){
    	var me=this;
    	me.selWin=Ext.create(me.win,{
    		field:me
    	});
    	me.selWin.show();
    }
});