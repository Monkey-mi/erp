Ext.define('erp.user.view.MngUserInfo' , {
 extend:'erp.ux.Panel',
 alias : 'widget.mng_UserInfo',
 title: '用户清单',
 requires: ['erp.user.store.UserInfos'
            ,'erp.user.store.Roles'
            ,'erp.ux.PagingBar'],
 layout:'border',
 initComponent:function(){
 	var me=this;
 	var store=erp.DataUtil.createStoreFactory('erp.user.store.UserInfos');
 	store.getProxy().api.read="main/Users.do?method=getUserByDefault";
 	var currentOuCode = erp.Util.currentUser.isAdmin?'':erp.getCurrentOuCode();
 	var extraP = erp.Util.currentUser.isAdmin?{usePaging:true}:{usePaging:true,ou_code:currentOuCode};
    erp.Util.applyNull(store.proxy.extraParams,extraP);
	Ext.apply(this,{
		  items:[   {
		        	    tbar:[     
   	  		            {text: '新增',	iconCls:'user_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
   	  		            {text: '修改',	iconCls:'user_edit',	itemId:erp.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
   	  		            {text: '删除',	iconCls:'user_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
   	  				    {text: '刷新',	iconCls:'arrow_refresh',	itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH},
   	  				    {hidden:true,text: '平台映射',	iconCls:'',	itemId:'accountsMapping'},
   	  				    '-',
   	  				    {text: '重置密码',iconCls:'reset',itemId:erp.Const.FUNC_ITEMID_BTN_RESET,disabled:true},
   	  				    '-',
   	  				    {xtype:'textfield',itemId:'search',emptyText:'输入用户ID或姓名搜索',
						listeners:{
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        store.loadPage(1,{
           	  				    	params:{
           	  				    		search:me.down('#search').getValue()
           	  				    	}
       	  				    	});
	    	                    }
	    	                }
						}},
   	  				    {text:'查询',iconCls:'query',
       	  				    handler:function(btn){
       	  				    	store.loadPage(1,
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
   	  				    	store.loadPage(1);
   	  				    }
   	  				    }
		        	  ],
		        	  region: 'center',
				      xtype:'gridpanel',
				      itemId:'userinfo_grid',
				      multiSelect:true,
				      store:store ,
					  columnLines:true,
					  dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					  columns:[
					           //Ext.create(m 'Ext.grid.RowNumberer',{header:'',width:35}),
					           {header:'',xtype:'rownumberer',width:35},
					           {header: '用户ID',dataIndex: 'login_id',fixed: true},
					           {header: '姓名',dataIndex: 'name',flex: 1},
					           {header: '性别',dataIndex: 'sex',flex: 1,renderer:function(v){
									return erp.Util.getFormatText(erp.Const.SEX_TYPE,v);
								}},
							   {header: '出生日期',dataIndex: 'birthday',flex: 1,
				                    renderer: Ext.util.Format.dateRenderer('Y-m-d')},
					           {header: '电子邮件(Email)',dataIndex: 'email',flex: 1},
				               {header: '创建日期',dataIndex: 'create_dt',flex: 1,
				                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
			                   {header: '最近登录',dataIndex: 'last_login',flex: 1,
				                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
				               {header:'昵称',dataIndex:'nickname',flex:1},
				               {header:'有效状态',dataIndex:'is_valid',flex:1,renderer:function(v){
                                    return erp.Util.getFormatText(erp.Const.YESNO_TYPE,v);
                                }},
				               {header:'头像号',dataIndex:'nick_portrait',flex:1,hidden:true}
					  ]
		        }
		         ]
	 });
	 this.callParent(arguments);
  }
});