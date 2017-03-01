Ext.define('erp.main.view.ContentPermit',{
	extend:'erp.ux.Panel',
	alias : 'widget.ContentPermit',
	requires :['Ext.ux.CheckColumn',
	           'erp.main.model.ContentPermit',
	           'erp.main.store.ContentPermits',
//	           'tp.hr.store.Position',
	           'erp.main.view.PublicRestrictWin'
	           ],
	title: '业务授权',           
	initComponent: function(){
		var me = this;
		Ext.apply(this,{
			layout:'fit',
			items:[{
				tbar : [
				{
					text : '保存',
					iconCls : 'save',
					action : "ACT_SAVE"
				},
				'|',
				{
					text : '新增',
					iconCls : 'key_add',
					action:'ACT_ADD'
				},{
					text : '删除',
					iconCls : 'key_delete',
					action:'ACT_DELETE'
				}],
				itemId :'permitGrid',
				xtype: 'gridpanel',
				store: Ext.create('erp.main.store.ContentPermits'),
				columns:[
					{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
					{text: '目标类型',dataIndex:'tar_type',flex:2,
					 renderer:function(v){
					   switch(v){
					     case 'R':
					     return '角色';
					     break;
					     case 'P':
					     return '职位';
					     break;
					     case 'U':
					     return '用户';
					     break;
					     case 'O':
					     return '组织';
					     break;
					   }
					 }},
					{text: '授权目标',dataIndex:'tar_id',flex:2,
					renderer:function(v,meta,rec){
					  return rec.get('tar_name');
					}},
					{xtype: 'checkcolumn',text: '新增',dataIndex:'cp_add',flex:1},
					{xtype: 'checkcolumn',text: '修改',dataIndex:'cp_modify',flex:1},
					{xtype: 'checkcolumn',text: '删除',dataIndex:'cp_delete',flex:1},
					{xtype: 'checkcolumn',text: '订阅',dataIndex:'cp_view',flex:1},
					{xtype: 'checkcolumn',text: '授权',dataIndex:'cp_grant',flex:1}
			    ]
		    }],
		    //初始化
		    listeners: {
		    	afterrender : function(cmp){
		    		me.permitStore = me.down('#permitGrid').getStore();
		    		
		    	}
		    }
		});
		this.callParent(arguments);
	},
	saveAllCP : function(btn){
		var me  = btn.up('ContentPermit');
	},
	doAddCP : function(btn){
		var me  = btn.up('ContentPermit');
		var win=Ext.widget('publicRestrict',{
		   isAddNew:true
		});
		win.show();
	},
	doDeleteCP : function(btn){
		var me  = btn.up('ContentPermit');
	},
	
	getTargetWin : function(){
		//角色面板
		var rolePanel = {
	    	xtype:'gridpanel',
	    	itemId:'role_grid',
	    	flex:1,
	    	title:'角色',
	        columnLines:true,
	        store: Ext.create('erp.main.store.ContentPermits'),
	        columns:[
				{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
				{text: '角色ID',dataIndex:'tar_id',flex:1},
				{text: '角色名称',dataIndex:'tar_name',flex:1}
       		],
       		deSelect : function(){
       			this.getSelectionModel().deselectAll();
       		},
       		getSelectRole : function(){
       			var recs = this.getSelectionModel().getSelection();
       			if(recs.length>0){
       				return recs[0];
       			}else{
       				return null;
       			}
       		}
		};
		//用户面板
		var userPanel = {
	    	xtype:'gridpanel',
	    	itemId:'user_grid',
	    	flex:1,
	    	title:'用户',
	        columnLines:true,
	        store: Ext.create('erp.main.store.ContentPermits'),
	        columns:[
				{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
				{text: '用户ID',dataIndex:'tar_id',flex:1},
				{text: '用户名称',dataIndex:'tar_name',flex:1}
       		],
       		deSelect : function(){
       			this.getSelectionModel().deselectAll();
       		},
       		getSelectUser : function(){
       			var recs = this.getSelectionModel().getSelection();
       			if(recs.length>0){
       				return recs[0];
       			}else{
       				return null;
       			}
       		}
		}; 
		
		//职位面板
		var positionTree = {
				 xtype:'treepanel',
				 title:'职位',
				 itemId:'position_tree',
		    	 store:Ext.create('erp.hr.store.Position',{
		    		 proxy: {
		    		        type: 'ajax',
		    		        actionMethods : 'post',
		    		        extraParams:{
		    		        	login_id : erp.Util.currentUser.userInfo.login_id
		    		        },
		    		        url : 'main/HR.do?method=getSubPositionListByLoginId',
		    		        reader: {
		    					type: 'json',
		    					root: 'data',
		    					messageProperty: 'message'
		    				}
		    		    },
		    		 root: {
		    			  id:0,
						  parentId:"a",
						  text:"职位体系",
						  leaf:false
		    			}
	    	   }),
	    	   border : true,
			   useArrows : false,//是否显示小箭头  
			   lines : true, //节点之间虚线  
			   rootVisible : true,
			   deSelect : function(){
	       			this.getSelectionModel().deselectAll();
	       		},
			   getSelectPosition : function(){
				   var recs = this.getSelectionModel().getSelection();
	       			if(recs.length>0){
	       				return recs[0];
	       			}else{
	       				return null;
	       			}
			   }
			};
		var tarStore =Ext.create('erp.main.store.ContentPermits', {
            extraParams:{user_id : erp.Util.currentUser.userInfo.login_id},
            proxy: {
                type: 'ajax',
                actionMethods : 'post',
                url: 'main/Content.do?method=getTarList',
                reader: {
                	type: 'json',
        			root: 'data',
        			successProperty: 'success',
        			messageProperty: 'message'
                }
            }
        });
		 var tarWin = Ext.create('Ext.window.Window',{
				/*layout: {
			        type: 'hbox',
			        align: 'stretch'
			    },*/
			    height:300,
			    width:400,
			    tarStore : tarStore,
			    closeAction:'hide',
			    layout:'fit',
				items:[
				{
					xtype: 'tabpanel',
					items:[
					   rolePanel,
					   userPanel
//					   positionTree
					   
					]
				}
				],
				listeners:{
					afterrender:function(cmp){
						
						tarStore.load({
							params:{
								login_id : erp.Util.currentUser.userInfo.login_id
							},
							callback:function(recs){
								tarStore.clearFilter();
								tarStore.filter({property:'tar_type',value:erp.Const.PERMIT_TARTYPE_ROLE});
								tarWin.down('#role_grid').getStore().loadData(tarStore.getRange());
								tarStore.clearFilter();
								tarStore.filter({property:'tar_type',value:erp.Const.PERMIT_TARTYPE_USER});
								tarWin.down('#user_grid').getStore().loadData(tarStore.getRange());
						}});
					},
					scope:this
				}
			});
		return tarWin;
	},
	
	/*******************供外部调用的方法******************/
	/**
	 * 指定授权内容
	 * 参数: {
	 * 		cp_module    : 'modxxx',  //内容模块
	 *      cp_table     : 'tblxxx',  //内容表
	 *      cp_table_key : 'tbl_idxxx'//内容id
	 * }
	 */
	setContent : function(content){
		this.content = content;
		this.permitStore.load({params:this.content});
	},
	setCurrentRec : function(rec){
	    var me=this;
	    var currentUser = erp.Util.currentUser;
			var role = [];
			for(var i=0;i<currentUser.roleList.length;i++){
				role[i]={role_id : currentUser.roleList[i]['role_id']};
			}
			var position = [];
			Ext.Ajax.request({
	    	    url: 'main/HR.do?method=getPositionInfoByLoginId',
	    	    async : false,
	    	    params: {
	    	    	login_id : erp.Util.currentUser.loginId
	    	    },
	    	    success: function(response){
	    	         var recs =  Ext.decode(response.responseText).data;
	    	         if(recs&&recs.length>0){
	    	        	 for(var i=0;i<recs.length;i++){
	    	        		 position[i]={ role_id: recs[i]['id']};
	    	        	 }
	    	         }
	    	    }
	    	});
			var info = this.getUserInfo();
			return this.getContentByPermitAndInfo(c_table,c_module,tar_mod, permit, info);
	}
});