Ext.define('erp.master.group.view.GroupManger',{
     extend : 'erp.ux.Window',
     alias : 'widget.mng_GroupManger',
     requires : ['erp.master.group.store.Group',
                 'erp.ux.PagingBar',
                 'erp.master.group.store.GroupOperator'],
     title : '采购组维护',
     iconCls:'group_blue',
     modal:true,
     width: 800,
     height:600,
     initComponent : function(){
         var me = this;
         me.store=Ext.create('erp.master.group.store.Group');
         me.store.load();
         me.opStore = Ext.create('erp.master.group.store.GroupOperator');
         //Ext.apply(me.store.getProxy().extraParams,{usePaging:true});
         
         //me.gstore=Ext.create('erp.master.group.store.Group');
      
         var tbar = [
         {
           text: '添加',
           iconCls: 'group_blue_add',
           itemId:erp.Const.FUNC_ITEMID_BTN_ADD
         },
         {
           text: '编辑',
           iconCls: 'group_blue_edit',
           itemId:erp.Const.FUNC_ITEMID_BTN_EDT,
           disabled : true	
         },
         {
         	text: '删除',
         	iconCls: 'delete',
         	itemId:erp.Const.FUNC_ITEMID_BTN_DEL,
         	disabled: true
         },
         '-',
         {
         	text:'添加操作员',
            iconCls: 'user_add',
            itemId:'Add_Op'
            
         },
         {
         	text:'删除操作员',
         	iconCls:'user_delete',
         	itemId: 'Del_Op',
         	disabled: true
         }
         
         ]
         
         
         Ext.apply(me,{
           tbar:tbar,
           dockedItems:[{
				    		xtype : 'pagingbar',
		                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
				    		dock:'bottom',
				    		displayInfo:true,
				    		defaultPageSize : 50,
				    		store:me.store
				    	}],
         layout:{
              type: 'hbox',
              pack: 'start',
              align: 'stretch' 
           },
             items : [
             {   
                 xtype : 'grid',
                 itemId: 'grd_Group',
                 store:me.store,
                 flex : 2,
                 overflowY:'auto',
                 selModel:Ext.create('Ext.selection.CheckboxModel'),
			     columns:[
			    	  {header:'',xtype:'rownumberer',width:35},
			    	  {header: '采购组号',dataIndex: 'cgzh',flex : 1},
			    	  {header: '采购组名',dataIndex: 'cgzm',flex : 2},
			    	  {header: '备注说明',dataIndex: 'bzsm',flex : 2}
			     ]
			    	  
            },
         	{
              xtype : 'grid',
              itemId: 'grd_Operator',
              
              flex : 1,
              overflowY: 'auto',
              selModel:Ext.create('Ext.selection.CheckboxModel'),
              columns:[
              {header:'',xtype:'rownumberer',width:35},
              {header: '操作员工号', dataIndex: 'czy_gh', flex: 1},
              {header: '操作员姓名',dataIndex: 'czy_xm', flex: 1}
              ],
              store: me.opStore
            
             
            }
         ]})
         me.callParent(arguments);
     },
      loadGridData:function(rec){
		var me=this;
		me.opStore.load({params:{
			 cgzh:rec.get('cgzh')
			}
		});
	
	}
})