Ext.define('erp.user.view.EditRole',{
	extend: 'erp.ux.Window',
	alias: 'widget.edt_Role',
	requires:['erp.util.Util',
	          'erp.ux.FormKey',
	          'erp.ux.RemoteValidator',
	          'erp.user.store.UserInfos',
	          'erp.user.view.MngRoleCon'],
	title: '角色信息维护',
	iconCls:'role_setup',
	height: 400,
	width : 500,
	resizable : true,
	modal : true,
	doInit:function(){
		var roleRec = this.down('form').getRecord();
		//载入该角色所辖用户列表
		var userStore= this.down('#user_grid').getStore();
		userStore.load({
			params:{
				role_id:roleRec.get('role_id')
			}
		});
		//载入角色配置情况
		var roleCon=this.down('mng_rolecon');
		roleCon.doInit(roleRec);
	},
	doSave:function(){
		this.down('mng_rolecon').save();
	},
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			buttons:[
                {
                    text: '保存',
                    iconCls: 'page_save',
                    itemId:'SAVE',
                    action: 'ACT_SAVE',
                    hidden: !me.isEdit
                },
                {
                    text: '退出',
                    itemId:'CLOSE',
                    iconCls: 'page_error',
                    action:'ACT_CLOSE'
                }
            ],
			items:[  {
				xtype : 'tabpanel',
				activeTab : 0,	
				items:[
				       {  
					    	 xtype:'form',
					    	 title: '角色信息',
					    	 iconCls:'role',
					    	 bodyPadding: 10,
					    	 frame:false,
					    	 height:300,
					    	 plugins:{
						          ptype: 'FormKey'
					    	 },
					    	 defaults: {
				    	    	xtype: 'textfield',
						    	labelAlign : 'right',
						    	anchor:'95%',
				    			labelWidth : 80,
				    			labelStyle : 'font-weight:bold',
				    			msgTarget: 'qtip',
					            autoFitErrors: true
					    	 },
					    	 items:[
					    	        
									{
								    	fieldLabel : '角色名称',
										name : 'role_name',
										itemId : 'firstFocusOn',
										iconCls:'role',
										allowBlank : false,
										blankText : '角色名称不允许为空!',
										disabled:!me.isAddNew
									},
									{
								    	fieldLabel : '描述',
										name : 'role_desc',
										xtype: 'textareafield'
									},
                                    {
                                        fieldLabel : '排序',
                                        name : 'order_seq',
                                        xtype: 'numberfield'
                                    },
									{
									    boxLabel  : '拥有所有查询组织的项目权限',
									    name      :  'has_prj',
									    xtype     : 'checkboxfield'
									}
						  ]
					     },{
							title: '用户信息',
							region: 'center',
							itemId:'user_grid',
							iconCls:'user',
							xtype:'gridpanel',
							height:300,
							store: Ext.create('erp.user.store.UserInfos',{
								proxy: {
									type: 'ajax',
									actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
									//extraParams:{usePaging:true},
									api: {
										create: 'main/Users.do?method=addUser',
										update: 'main/Users.do?method=updateUser',
										read:	'main/Users.do?method=getUserListByRoles',
										destroy:'main/Users.do?method=deleteUser'
									},
									reader: {
										type: 'json',
										rootProperty: 'data',
										successProperty: 'success',
										messageProperty: 'message',
										totalProperty:'total'
									},
									writer: {
										type: 'json',
										rootProperty: 'data',    //返回数据可以用post_data=[xxx]的形式包装
										encode: true,
										writeAllFields:true,
										allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
									},
									sorters: [   
							                  {   
							                      property: 'create_dtm',   
							                      direction: 'ASC'  
							                  },
							                  {   
							                      property: 'login_id',   
							                      direction: 'ASC'  
							                  }
							        ]
										
								}
							}),
							columnLines:true,
							flex:1,
							defaults: {
						        autoScroll:true,
						        containerScroll:true,
						        layout: 'fit'
						    },
							columns:[
							         {header:'行号',xtype:'rownumberer',width:40,sortable:false,align:'center'},
							         {header: '用户名',dataIndex: 'name',flex:1},
							         {header: '登陆号',dataIndex: 'login_id',flex:1, editor: {allowBlank : false} }
							         ]
						},{
							xtype:'mng_rolecon',
							height:300,
							title:'角色归属',
							iconCls:'role_link',
							role:me.role,
							disabled:me.isAddNew
						}
				       ]
			}
				]
		});
		this.callParent(arguments);
	},
	/**
	 * 初始化
	 */
	initEdit:function(){
		this.callParent(arguments);
	}
		
});