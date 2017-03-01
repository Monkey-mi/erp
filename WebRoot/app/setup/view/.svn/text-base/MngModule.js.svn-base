
Ext.define('erp.setup.view.MngModule',{
	extend:'erp.ux.Panel',
	requires:['erp.setup.store.ModuleTrees',
	          'erp.setup.store.Modules'
	         ],
	alias : 'widget.mng_Module',
	title:'菜单管理设置',
	layout: 'border',
	defaults: {
        split: true,
        autoScroll:true,
        useSplitTips: true,
        containerScroll:true,
        layout: 'fit'
    },
    
	initComponent:function(){
		Ext.apply(this,{
			items: [{
		    	//左边菜单菜单树
				title: '功能菜单树',
		        region:'west',
		        width: 200,
		        tools:[
			           {type:'refresh',tooltip:'刷新'}
			    ],
			    iconCls : 'layout_content',
			    xtype:'treepanel',
				border:true,
				useArrows:true,//是否显示小箭头  
			    store :Ext.create('erp.setup.store.ModuleTrees'),
			    rootVisible : true
		       
		    },{
		    	//右边菜单菜单信息列表
		    	title: '菜单列表',
		    	region: 'center',
		    	tbar:[     
	  		            {text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
	  		            {text: '修改',	iconCls:'page_edit',	itemId:erp.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
	  		            {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL,	disabled:true}
	        	  ],
				iconCls : 'application_view',
				xtype:'gridpanel',
				store: Ext.create('erp.setup.store.Modules'),
		        columnLines:true,
		        columns:[
					{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
					{text: '节点',dataIndex: 'id',width:50},
					{text: '父节点',dataIndex: 'parentId',width:60},
					{text: '菜单名称',dataIndex: 'text',width:100},
					/*{text: '名称样式',dataIndex: 'textCls',flex:1},*/
					{text: '菜单代码',dataIndex: 'mod_code',width:80},
					{text: '菜单类别',dataIndex: 'mod_type',width:80,renderer:function(v){
						return erp.Util.getFormatText(erp.Const.MODULE_TYPE,v);
					}},
					{text: '展开',dataIndex: 'expanded',width:40,renderer:function(v){
						return erp.Util.getFormatText(erp.Const.YESNO_TYPE,v);
					}},
					{text: '叶节点',dataIndex: 'leaf',width:60,renderer:function(v){
						return erp.Util.getFormatText(erp.Const.YESNO_TYPE,v);
					}},
					{text: '有效',dataIndex: 'isvalid',width:40,renderer:function(v){
						return erp.Util.getFormatText(erp.Const.YESNO_TYPE,v);
					}},
					{text: '请求类型',dataIndex: 'urltype',width:80,renderer:function(v){
						return erp.Util.getFormatText(erp.Const.URL_TYPE,v);
					}},
					/*{text: '请求路径',hidden:true,dataIndex: 'url',flex:2},*/
					/*{text: '请求目标',dataIndex: 'urltarget',width:40},
					{text: '节点图标',hidden:true,dataIndex: 'icon',flex:2},
					{text: '图标样式',hidden:true,dataIndex: 'iconCls',flex:2},*/
					/*{text: 'QuickTip',dataIndex: 'qtip',flex: 1},
					{text: 'QuickTitle',dataIndex: 'qtitle',flex: 1},*/
					{text: '排序',dataIndex: 'order_seq',width:40},
					{text: '备     注',hidden:true,dataIndex: 'remark',width:100},
					{text: '创建日期',dataIndex: 'create_date',width:100,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
					{text: '修改日期',dataIndex: 'modify_date',width:100,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
		        ]
		    }]
		});
		this.callParent(arguments); 
	}
});

