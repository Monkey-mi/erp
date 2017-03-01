Ext.define('erp.ux.SupcanPanel',{
	extend:'Ext.panel.Panel',
	alias : 'widget.supcan_panel',
	alternateClassName :'erp.SupcanPanel',
	requires:[/*'resources.supcan.dynaload'
	          ,*/'erp.util.form.Supcan'],
	hideMode:'offsets',  
	layout:'fit',
	config:{
		supcanType:'',
		supcanAFId:'',
		curFrndRec:null,
		curDataRec:null
	},
	constructor: function(cfg) {
		this.callParent(arguments); 
		this.initConfig(cfg);
    },
    defaults:{
    	layout:'fit'
    }
});