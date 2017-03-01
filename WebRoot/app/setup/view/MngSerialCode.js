/**
 * 编码规则管理view
 * 作者：华慧
 * 创建日期: 2015.1.13
 */
Ext.define('erp.setup.view.MngSerialCode',{
	extend:'erp.ux.Panel',
	alias : 'widget.mng_SerialRule',
	requires:['erp.setup.store.SerialRule'
	          ,'Ext.ux.CheckColumn'
	          ,'erp.ux.PagingBar'],
	title:'序列管理',
	layout: 'fit',
	defaults: {
        autoScroll:true,
        containerScroll:true,
        layout: 'fit'
    },
    initComponent:function(){
    	var store = Ext.create('erp.setup.store.SerialRule');
    	store.getProxy().extraParams.usePaging = true;
    	//暂时用不到组织
//    	if(!tp.UInfo.isAdmin)
//              store.getProxy().extraParams.create_ou=tp.UInfo.currentUser.ou_code;  
    	Ext.apply(this,{
    		items:[
	           {
	        	   tbar: [     
		  		            {text: '新增',	iconCls:'pin_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
		  		            {text: '修改',	iconCls:'pin_edit',	itemId:erp.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
		  		            {text: '删除',	iconCls:'pin_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL,	disabled:true},
		  		            '-',
		  		            {text: '启用',  iconCls:'accept',     itemId:erp.Const.FUNC_ITEMID_BTN_ENABLE,disabled:true},
		  		            {text: '停用',  iconCls:'stopIcon',     itemId:erp.Const.FUNC_ITEMID_BTN_DISABLED,disabled:true},
		  		            '-',
		  				    {text: '刷新',	iconCls:'arrow_refresh',	itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH}
		  				],
	  				//iconCls : 'application_view_listIcon',
	  				xtype:'gridpanel',
	  				store: store,
					//selModel:Ext.create('Ext.selection.CheckboxModel'),
			        columnLines:true,
			        dockedItems:[{
                        xtype : 'pagingbar',
                        stateId : '6a9299f2-c855-435f-96b4-862fe30010fc',
                        store:store,
                        dock:'bottom',
                        displayInfo:true
                    }],
			        columns:[
						{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
						{text: '代码',dataIndex: 'code',flex:1},
						{text: '名称',dataIndex: 'name',flex:2},
						{text: '总长度',dataIndex: 'len',flex:1,align:'center'},
						{text: '有效',dataIndex: 'status_flg',flex:1,align:'center',renderer:function(v){
							return erp.Util.getFormatText(erp.Const.YESNO_TYPE,v);
						}},
                        {text: '创建人',dataIndex: 'creator',flex:1},
                        {text: '创建日期',dataIndex: 'create_dtm',flex:2,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
	           		]
	           }
    	    ]
    	});
    	this.callParent(arguments); 
    }
});