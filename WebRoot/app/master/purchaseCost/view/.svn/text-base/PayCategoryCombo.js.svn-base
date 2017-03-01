//PayCategoryCombo
Ext.define('erp.master.purchaseCost.view.PayCategoryCombo',{
   extend : 'erp.ux.Window',
   alias : 'widget.PCCombo_Help',
   title : '支付类别选择',
   requires : ['erp.master.purchaseCost.store.PayCategoryTree'],
   width : 350,
   height : 400,
    initComponent : function() {
		var me = this;
	    me.store = Ext.create('erp.master.purchaseCost.store.PayCategoryTree'),
	    me.field=me.field||{};
	    var val=me.field.getValue();
	    Ext.apply(me,{
    		layout:{
			     type: 'fit',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	items:[{
	    	   xtype:'treepanel',
	    	   itemId:'paycategorytree',
	    	   width:200,
	    	   split:true,
	    	   store:me.store,
	    	   listeners:{
	    			  'itemdblclick':function(t,rec){
	    			  		me.onSubmit();
	    			  }
	    			}
	    	}]
	    });
	    this.callParent(arguments);
	},
	onSubmit : function() {
		var me = this;
		var tree = me.down('#paycategorytree');
		var recs = tree.getSelectionModel().getSelection();
		if(recs.length==0){
			Ext.toastInfo('请至少选择一个支付类别');
		}else{
		var rec=recs[0];	
		var cusConfig=me.field.cusConfig;
		var lbbh = rec.get('nodeId');
		var sql = " select mjbz from zjzflbb where lbbh = "+lbbh+";";
		var result = erp.Const.callServiceMethodSync(
    		'materialInventory/materialInventory.act?method=getStringFromSql', {
    		 sql:sql
    	});
    	var data = Ext.decode(result);
    		if(data.val!=1){
    			Ext.Msg.alert('提示','该支付类别不是末级类别，请重新选择!');
    			return;
    	}
		if(cusConfig!=null){
		    var field=cusConfig.field;
			var callback = cusConfig.callback;
			if (Ext.isFunction(callback)) {
				callback(this, rec,recs);
			}
			me.field.setValue(rec.field);
		}
		me.field.setValue(rec.get('nodeId'));}
		me.close();
	    }
	}
)