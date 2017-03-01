Ext.define('erp.setup.view.SelectUserPanel',{
	   extend: 'Ext.panel.Panel',
	   layout: 'border',
	   initComponent: function() {
		   var me = this;
		   var sm = Ext.create('Ext.selection.CheckboxModel');
		   me.store=Ext.create('erp.user.store.UserInfos');
		   me.items = [
					me.roleGrid = Ext.widget('grid', {
					  region: 'center',
   					  itemId: 'userGrid',
   					  selModel: sm,
   					  allowDeselect: true,
   					  store: me.store,
   					  columns: [{text: '登陆名称', dataIndex: 'login_id', flex: 1},{text: '用户名称', dataIndex: 'name', flex: 1}]	,
	   				  tbar:[{xtype:'textfield',itemId:'search',emptyText:'输入用户ID或姓名搜索'},
			   	  			 {text:'查询',iconCls:'query',
			       	  				    handler:function(btn){
			       	  				    	me.store.loadPage(1,
			       	  				    		{
			           	  				    	params:{
			           	  				    		search:me.down('#search').getValue()
			           	  				    	}
			       	  				    	});
			       	  				    }
			   	  				    },
			   	  				    {
			   	  				    text:'重置',
			   	  				    iconCls:'refresh_backwards',
			   	  				    handler:function(){
			   	  				    	me.down('#search').setValue("");
			   	  				    	me.store.loadPage(1);
			   	  				    }
   	  				    }],
	   				  dockedItems:[{
								xtype:'pagingtoolbar',
								dock:'bottom',
								displayInfo:'true',
								store:me.store,
								itemId:'result_paging'
							}],
	   				  listeners: {
			            	selectionchange: function(model, selected){
			            		me.records = selected;
			            	}
			            }
				   })
		   ];
		   me.store.load();
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
	      	role_id=me.records[i].get('login_id');
	        str=str?str+','+me.records[i].get('login_id'):role_id;
	      }
	       rec.set('login_id',str);
	   }
});