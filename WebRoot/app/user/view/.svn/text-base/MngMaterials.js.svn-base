Ext.define('erp.user.view.MngMaterials',{
	extend:'Ext.panel.Panel',
	alias : 'widget.mng_Materials',
	requires:['erp.master.operator.store.Operator',
	          'erp.ux.PagingBar'],
	title:'材料类别管理',
	isEdit:true,
	layout: 'fit',
	defaults: {
        autoScroll:true,
        containerScroll:true,
        layout: 'fit'
    },
    listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		 }
	},
    initComponent:function(){
    	var me=this;
    	me.userStore=Ext.create('erp.master.operator.store.Operator');
    	Ext.apply(me.userStore.proxy.extraParams.usePaging = true);
        /*if(!erp.UInfo.isAdmin)
		      roleStore.getProxy().extraParams.create_ou=erp.UInfo.currentUser.ou_code;*/  
		me.userStore.load();
    	Ext.apply(this,{
    		items:[
		         {
		    	   tbar: [     
  	  		            /*{text: '新增',action:'ACT_ADD',iconCls:'role_add',itemId:'addBtn'},
  	  		            {text: '修改',action:'ACT_EDIT',iconCls:'role_edit',itemId:'edtBtn',disabled:true},
  	  		            {text: '删除',action:'ACT_DELETE',iconCls:'role_delete',itemId:'delBtn',disabled:true},*/
		    	        {itemId : 'search',fieldLabel:'姓名',
		    	         emptyText:'请输入姓名或ID查询..',
		    	         labelWidth : 60,
		                 xtype :'textfield',
		                 listeners : {
		                     specialkey: function(){
		                         Ext.apply(me.userStore.proxy.extraParams,{
					              search : me.down('#search').getValue()
					           })
					           me.userStore.load();
		                     }
		                 }
		    	        },
		    	         {text:'查询',iconCls:'query',
		                     handler:function(){
					           Ext.apply(me.userStore.proxy.extraParams,{
					              search : me.down('#search').getValue()
					           })
					           me.userStore.load();
				             }
		                 },
		                 {
		                 text:'重置',
   	  		             iconCls:'refresh_backwards',
   	  		             handler:function(){
   	  		                me.down('#search').setValue("");
   	  		                delete me.userStore.proxy.extraParams.search;
   	  		                me.userStore.load();
		                 }
		               },
  	  				    {text: '刷新',action:'ACT_REFRESH',iconCls:'arrow_refresh',
  	  				    handler : function(){
  	  				      me.userStore.reload();
  	  				    }},
  	  				    {text: '保存授权',action:'ACT_SAVE',iconCls: 'role_save',itemId:'saveBtn',disabled:true}
  	  				], 
	  				layout: 'border',
	  				items:[
	  				    {
	  				    	title: '用户',
	  				    	xtype:'gridpanel',
	  				    	itemId:'user_grid',
	  				    	region:'north',
	  				    	flex:1,
	  		  				store: me.userStore,
	  						columnLines:true,
	  				        columns:[
	  							{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
	  							{text: '用户ID',dataIndex: 'czy_gh',flex:1},
	  							{text: '姓名',dataIndex: 'czy_xm',flex:2},
	  							{header: '所属部门 ',dataIndex: 'bmmc',flex: 2},												
						        {header: '工作岗位 ',dataIndex: 'gzgw',flex: 2}
	  		           		],
	  		           		listeners:{
	  						   selectionchange:function(selModel, selections){
	  							   	var n = selections.length||0;
	  								this.down('#saveBtn').setDisabled(n==0);
	  						   },
	  						   scope:this
	  					   },
	  					 dockedItems:[
									    {
										    xtype : 'pagingbar',
                                            stateId : 'd5c2e307-ae16-4015-a164-17f82626511f',
											store : me.userStore,
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
	  				    	store : Ext.create('erp.user.store.MaterialTree'),
	  				    	itemId : 'materials_tree',
	  				    	//disabled: true,
	  				    	region:'west',
	  				    	flex:1,
	  				    	border:true,
	  						useArrows:false,//是否显示小箭头  
	  					    lines:true, //节点之间虚线  
	  					    rootVisible : true,
	  					    expand : true,
	  					    listeners:{
	  					       beforerender : function(c){
	  					          /*var picker=c.getPicker();
	  					          console.log(picker)*/
	  					       }
                                 } 
	  				    },
	  				    {   xtype:'tabpanel',
	  				    	itemId:'web_tab',
	  				    	flex:1,
	  				    	/*title:'HTTP授权服务',*/
	  				    	region:'center'/*,
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
	  				    	       ]*/
	  				    //右边服务列表
	  				    
	  				    }
	  				]
	  				
		        }
    	    ]
    	});
    	this.callParent(arguments); 
    }
});