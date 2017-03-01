Ext.define('erp.master.contractStop.view.ContractWin',{
       extend : 'erp.ux.Window',
        alias : 'widget.win_Contract',
        requires :['erp.ux.PagingBar'],
        title: '合同终止类型维护',
        iconCls:'report',
        model: true,
        width: 600,
        height: 450,
        initComponent : function(){
            var me=this;
            me.store=Ext.create('erp.master.contractStop.store.ContractType');
            me.store.load();
             var tbar = [
         {
           text: '添加',
           iconCls: 'page_add',
           itemId:erp.Const.FUNC_ITEMID_BTN_ADD
         },
          '-',
         {
           text: '编辑',
           iconCls: 'page_edit',
           itemId:erp.Const.FUNC_ITEMID_BTN_EDT,
           disabled : true	
         },
          '-',
         {
         	text: '删除',
         	iconCls: 'page_delete',
         	itemId:erp.Const.FUNC_ITEMID_BTN_DEL,
         	disabled: true
         }]
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
				        type : 'fit',
				        pack: 'start',
                        align: 'stretch' 
				    },
				    items: [{
				        xtype: 'grid',
				        itemId: 'grd_Contract',
				        store: me.store,
				        overflowY:'auto',
				        selModel:Ext.create('Ext.selection.CheckboxModel'),
			        columns:[
			    	   {header:'',xtype:'rownumberer',width:35},
			    	   {header: '类型编号',dataIndex: 'lxbh',flex : 2},
			    	   {header: '类型名称',dataIndex: 'lxmc',flex : 3},
			    	   {header: '备注说明',dataIndex: 'bzsm',flex : 5}
			           ]
				     
				    }]
          }) 
          me.callParent(arguments);
        }/*,
      loadGridData:function(rec){
		var me=this;
		me.store.load({params:{
			 lxbh : rec.get('lxbh')
			}
		});
	}*/
})