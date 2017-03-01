/*
 * Text 添加快捷清空功能
 * time:20160229
 * auth:wuqia
 * ,{
				"path" : "overrides/Text.js"
			}
 */
Ext.define('overrides.Text', {
    override :'Ext.form.field.Text',
    requires:['erp.ux.Clear'],
    constructor:function(config){
        var me = this;
        if(config.allowBlank==false && !Ext.isEmpty(config.fieldLabel)){
        	config.fieldLabel += "<font color='red'>*</font>";
        }
        /*if(!config.triggers){
        	config.triggers = {};
        }
        if(config.triggers.clear == false){
        	delete config.triggers.clear;
        }else{
        	config.triggers.clear = {type:'clear',hideWhenMouseOut: true};
        }*/
        me.callParent(arguments);
    },
    
    applyTriggers: function(triggers) {
    	if(triggers && triggers.picker){
    		var picker = triggers.picker;
    		delete triggers.picker;
    		triggers["picker"] = picker;
    	}
        return this.callParent(arguments);
    }
});
