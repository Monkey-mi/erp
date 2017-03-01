Ext.define('erp.user.view.MngRole',{
	extend:'Ext.panel.Panel',
	alias : 'widget.mng_Role',
	requires:['erp.user.store.Roles',
	          'erp.user.store.RoleModules',
	          'erp.setup.store.ModuleTreeAlls',
	          'erp.setup.model.ModuleTreeChk',
	          'erp.setup.store.HttpServices',
	          'erp.ux.PagingBar'],
	title:'角色管理',
	isEdit:true,
	layout: 'fit',
	defaults: {
        autoScroll:true,
        containerScroll:true,
        layout: 'fit'
    },
    initComponent:function(){
    	var me=this;
    	
    	var roleStore=Ext.create('erp.user.store.Roles');
    	/*if(!erp.UInfo.isAdmin)
		      roleStore.getProxy().extraParams.create_ou=erp.UInfo.currentUser.ou_code;*/  
		roleStore.load();
    	Ext.apply(this,{
    		items:[
		         {
		    	   tbar: [     
  	  		            {text: '新增',action:'ACT_ADD',iconCls:'role_add',itemId:'addBtn'},
  	  		            {text: '修改',action:'ACT_EDIT',iconCls:'role_edit',itemId:'edtBtn',disabled:true},
  	  		            {text: '删除',action:'ACT_DELETE',iconCls:'role_delete',itemId:'delBtn',disabled:true},
  	  				    {text: '刷新',action:'ACT_REFRESH',iconCls:'arrow_refresh'},
  	  				    '-',
  	  				    {text: '保存授权',action:'ACT_SAVE',iconCls: 'role_save',itemId:'saveBtn',disabled:true}
  	  				    
  	  				], 
	  				layout: 'border',
	  				items:[
	  				    {
	  				    	title: '角色',
	  				    	xtype:'gridpanel',
	  				    	itemId:'role_grid',
	  				    	region:'north',
	  				    	flex:1,
	  		  				store: roleStore,
	  						columnLines:true,
	  				        columns:[
	  							{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
	  							{text: '角色名称',dataIndex: 'role_name',flex:1},
	  							{text: '角色描述',dataIndex: 'role_desc',flex:2},
	  							{text: '排序',dataIndex: 'order_seq',flex:1}
	  							
	  		           		],
	  		           		listeners:{
	  						   selectionchange:function(selModel, selections){
	  							   	var n = selections.length||0;
	  								this.down('#delBtn').setDisabled(n==0);					
	  								this.down('#edtBtn').setDisabled(n!=1);
	  								this.down('#saveBtn').setDisabled(n==0);
	  						   },
	  						   scope:this
	  					   },
	  					 dockedItems:[
									    {
										    xtype : 'pagingbar',
                                            stateId : 'd5c2e307-ae16-4015-a164-17f82626511f',
											store : roleStore,
											dock : 'bottom',
											displayInfo : true
									    }
					             ]
	  				    },
	  				    {
	  				    //右边列表
	  				    	title: '功能授权',
	  				    	iconCls : 'menu', 
	  				    	xtype:'treepanel',
	  				    	store : Ext.create('erp.setup.store.ModuleTreeAlls'),
	  				    	itemId : 'module_tree',
	  				    	//disabled: true,
	  				    	region:'west',
	  				    	flex:1,
	  				    	border:true,
	  						useArrows:false,//是否显示小箭头  
	  					    lines:true, //节点之间虚线  
	  					    rootVisible : true
		  				    
	  				    },
	  				    {   xtype:'tabpanel',
	  				    	itemId:'web_tab',
	  				    	flex:1,
	  				    	title:'HTTP授权服务',
	  				    	region:'center',
	  				    	//disabled:true,
	  				    	items:[{
	  				    		title: '模块自有HTTP授权服务',
		  				    	iconCls : 'application_view_list', 
		  				    	xtype:'grid',
		  				    	itemId : 'private_service_grid',
		  				    	disabled: false,
		  				    	flex:1,
		  					    store: Ext.create('erp.setup.store.HttpServices'),
		  					    selModel:Ext.create('Ext.selection.CheckboxModel'),
		  					    columns:[
		  					              {header:'',xtype:'rownumberer',width:35},
		  							      {header: '服务名称',dataIndex: 's_name',flex:1},
		  							      {header: '调用路径',dataIndex: 's_path',flex:1},
		  							      {header: '调用方法',dataIndex: 'm_name',flex:1}
		  					    ]
	  				    		
	  				    		
	  				    		
	  				    	},{
	  				    		title: '公共HTTP授权服务',
		  				    	iconCls : 'application_view_list', 
		  				    	xtype:'grid',
		  				    	itemId : 'public_service_grid',
		  				    	//disabled: true,
		  				    	
		  				    	flex:1,
		  					    store: Ext.create('erp.setup.store.HttpServices'),
		  					    selModel:Ext.create('Ext.selection.CheckboxModel'),
		  					    columns:[
		  					              {header:'',xtype:'rownumberer',width:35},
		  							      {header: '服务名称',dataIndex: 's_name',flex:1},
		  							      {header: '调用路径',dataIndex: 's_path',flex:1},
		  							      {header: '调用方法',dataIndex: 'm_name',flex:1}
		  					    ]
	  				    	}
	  				    	       ]
	  				    //右边服务列表
	  				    
	  				    }
	  				]
	  				
		        }
    	    ]
    	});
    	this.callParent(arguments); 
    }
});