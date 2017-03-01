Ext.define('erp.setup.view.SearchManPanel',{
	   extend: 'erp.ux.Panel',
	   layout: 'border',
	   alias: 'widget.searchManPanel',
	   requires: ['erp.hr.store.EmpPositionWithLoginId'],
	   /**
	    * positionGridCfg: {
    			enableCheck: false,
    			showPstName: false,
    			showLoginId: false,
    			viewConfig: {
    				plugins: {
    					ptype: 'gridviewdragdrop',
    					dragGroup: 'firstGridDDGroup',
    					dropGroup: 'secondGridDDGroup'
    				}
    			}
		    }
	    */
	   positionGridCfg: {},
	   
	   
	   initComponent: function() {
		   var me = this;
		   var sm = Ext.create('Ext.selection.CheckboxModel');
		   me.items = [
		       me.orgCmp = Ext.create('erp.setup.view.MngOrgDept', {
			        	region: 'west',
			    		flex: 1,
			    		or_type: erp.Const.ORG_TYPE_HUMAN_RESOURCES
		       }),me.positionGrid = Ext.widget('gridpanel', {
		        	itemId: 'pstGrid',
		    		region: 'center',
		    		flex: 1,
		    		selModel: me.positionGridCfg.enableCheck == false ? 'rowmodel' : sm,
		    		viewConfig: me.positionGridCfg.viewConfig,
		    		store: me.positionGridStore = Ext.create('erp.hr.store.EmpPositionWithLoginId'),
		    		columns:[
		    				{text:'登录名', dataIndex: 'login_id', flex: 1, sortable:false},
//		 					{text:'工号', dataIndex: 'emp_code', flex: 1, sortable:false, align:'center', hidden: me.positionGridCfg.showEmpCode == false},
		 					{text:'姓名', xtype: 'templatecolumn', tpl: '{lastname} {firstname}', flex: 1, sortable:false}
//		 					{text:'组织', dataIndex: 'ou_name', flex: 1, sortable:false},
//		 					{text:'部门', dataIndex: 'd_name', flex: 1, sortable:false},
//		 					{text:'项目', dataIndex: 'pj_code', flex: 1, sortable:false},
//		 					{text:'职位', dataIndex: 'pst_name', flex: 1, sortable:false, hidden: me.positionGridCfg.showPstName == false},
		 					
		 			],	
		    		dockedItems: [{
		                xtype: 'pagingtoolbar',
		                store: me.positionGridStore,
		                dock: 'bottom',
		                displayInfo: false,
		                beforePageText: '第',
		                afterPageText: '页 共{0}页'
		            }],
		            listeners: {
		            	selectionchange: function(model, selected){
		            		me.records = selected;
		            	}
		            }
		    	})];
		   me.orgCmp.on('ouChange', me.loadUsers, me);
		   me.orgCmp.on('deptChange', me.loadUsers, me);		
		   me.callParent(arguments);
	   },
	   loadUsers: function() {
		   var me = this;
		   Ext.apply(me.positionGridStore.proxy.extraParams,{
			   ou_code: me.orgCmp.currentOu_code,
			   d_code: me.orgCmp.currentD_code,
			   orv_id: me.orgCmp.currentOrv_id,
			   ou_id: me.orgCmp.currentOu_id,
			   d_id: me.orgCmp.currentD_id,
			   od_id: me.orgCmp.currentOd_id
		   });
		   me.positionGridStore.load();
	   },
	   getSelectedRecords: function() {
		   var me = this;
		   return me.records;
	   },
	   setRecId:function(rec){
	      var me=this;
	      var str=null;
	      var login_id=null;
	      for(var i=0;i<me.records.length;i++){
	      	login_id=me.records[i].get('login_id');
	        str=str?str+','+login_id:login_id;
	      }
	      rec.set('login_id',str);
	   }
});