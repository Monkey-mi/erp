Ext.define('erp.setup.view.SelectRolePanel',{
	   extend: 'Ext.panel.Panel',
	   layout: 'border',
	   initComponent: function() {
		   var me = this;
		   var sm = Ext.create('Ext.selection.CheckboxModel');
		   me.items = [
					me.roleGrid = Ext.widget('grid', {
					  region: 'center',
   					  itemId: 'roleGrid',
   					  selModel: sm,
   					  allowDeselect: true,
   					  store: Ext.create('erp.user.store.Roles').load(),
   					  columns: [{text: '选择角色', dataIndex: 'role_name', flex: 1}]	,
	   				  listeners: {
			            	selectionchange: function(model, selected){
			            		me.records = selected;
			            	}
			            }
				   })
		   ];
		   me.callParent(arguments);
	   },
	   getSelectedRecords: function() {
		   var me = this;
		   return me.records;
	   },
	   setRecId:function(rec){
	   	  var me=this;
	      var str=null;
	      var role_id=null;
	      for(var i=0;i<me.records.length;i++){
	      	role_id=me.records[i].get('role_id');
	        str=str?str+','+me.records[i].get('role_id'):role_id;
	      }
	       rec.set('role_id',str);
	   }
});