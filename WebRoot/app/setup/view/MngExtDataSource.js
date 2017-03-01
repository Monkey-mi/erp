Ext.define('erp.setup.view.MngExtDataSource',{
	extend:'erp.ux.Panel',
	alias : 'widget.mng_ExtDataSource',
	title:'数据源清单',
//	iconCls : 'application_view_listIcon',
	uses:['erp.setup.store.ExtDataSource'],
	defaults: {
        autoScroll:true,
        containerScroll:true,
        layout: 'fit'
    },
    initComponent:function(){
    	var store=Ext.create('erp.setup.store.ExtDataSource');
    	Ext.apply(this,{
    		items:[{
    			tbar: [     
	  		            {text: '新增',	iconCls:'database_add',		itemId:'FUNC_ITEMID_BTN_ADD'},
	  		            {text: '修改',	iconCls:'database_edit',	itemId:'FUNC_ITEMID_BTN_EDT'},//	disabled:true},
	  		            {text: '删除',	iconCls:'database_delete',	itemId:'FUNC_ITEMID_BTN_DEL'},//	disabled:true},
	  				    {text: '刷新',	iconCls:'database_refresh',	itemId:'FUNC_ITEMID_BTN_REFRESH'}
	  				],
	  				xtype:'gridpanel',
	  				store: store,
	  				columnLines:true,
	  				columns:[{
	  							text:'',
  				         		xtype:'rownumberer',
  				         		width:40,
  				         		sortable:false,
  				         		align:'center'
	         				},{
	         					text:'id',
	         					dataIndex:'id',
	         					hidden:true,
	         					flex:1
	         				},{
	         					text:'数据源类型',
         						dataIndex:'dstype',
         						flex:1
	         				},{
	         					text:'数据源代码',
	         					dataIndex:'dscode',
	         					flex:1
	         				},{
	         					text:'数据源名称',
	         					dataIndex:'dsname',
	         					flex:1
	         				},{
	         					text:'服务器地址',
	         					dataIndex:'srvaddr',
	         					flex:1
	         				},{
	         					text:'服务器端口',
	         					dataIndex:'srvport',
	         					flex:1
	         				},/*{
	         					text:'登录用户名',
	         					dataIndex:'srvlogin',
     							flex:1
	         				},{
	         					text:'登录密码',
	         					dataIndex:'srvpwd',
	         					flex:1
	         				},*/{
	         					text:'默认数据库名',
         						dataIndex:'dbname'
	         				}
  				         	
		         	]
	  				
    		}]
    	});
    	this.callParent(arguments); 
    }
});