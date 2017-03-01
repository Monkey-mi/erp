Ext.define('erp.basicdata.enumType.view.EnterprisePropertyManager',{
	extend:'erp.ux.Window',
    alias:'widget.mng_EnterprisePropertyManager',
    //iconCls:'box',
    requires:[	
    			'erp.basicdata.enumType.store.EnumType',
    			'erp.ux.PagingBar',
    			'erp.ux.QueryPanel',
    			'erp.ux.SearchCombobox'
    		],
    width:620,
    frame:true,
    modal : true,
    layout:{
     type: 'fit',
     pack: 'start',
     align: 'stretch'
    },
    initComponent:function(){
    		var me =this;
 		var mjbh;
 		var title;
 		me.store=Ext.create('erp.basicdata.enumType.store.EnumType');
 		this.on("afterrender",function(cmp){
					mjbh=cmp.mjbh;
					me.setTitle(cmp.modName);//设置window标题
					me.down('#grd_EP').columns[1].setText(cmp.modName.replace('维护',''));
					//me.setPosition(document.body.clientWidth/4,document.body.clientHeight/5);
					Ext.apply(me.store.proxy.extraParams, {usePaging:true,mjbh:mjbh//后台判断是哪个表单访问数据
					});
					me.store.load();
					me.store.sort('mjxl','ASC');
 		});
 		var rowEditing=Ext.create('Ext.grid.plugin.RowEditing', {
					        clicksToMoveEditor: 1,
					        autoCancel: false,
					        itemId:'rowEditing',
					        listeners: {
					        	//编辑时事件
					        	'edit':function(editor, e) {
					        		if(e.record.get('oo')=='000'){
					        			var rec=e.record
					        			rec.phantom =true;//标记这条记录在store中不存在
					        			e.grid.getStore().sync({
					        					success : function(e1, batch) {
													Ext.Msg.alert('提示', '新增成功！');
													me.store.load();
					        						e.record.commit();
					        						me.store.sort();
												},
												failure : function(batch, options) {
													Ext.Msg.alert('提示', '新增失败！');
												}
					        			});
					        		}
					        		else{
								    // 编辑完成后，提交更改
								    e.grid.getStore().sync({
								    success : function(e, batch) {
													Ext.Msg.alert('提示', '修改成功！');
												},
												failure : function(batch, options) {
													Ext.Msg.alert('提示', '修改失败！');
												}
								    });
								    e.record.commit();
					        		}
									},
								//取消编辑是触发
								'canceledit':function(editor, e){
									if(e.record.get('oo')=='000'){
										e.grid.getStore().remove(e.record);
									}
								}
					        }
    				});
    	Ext.apply(me,{
			items:[
   	  	  	{
   	  	  	//flex:2,
   	  	  	xtype:'panel',
   	  	  	itemId:'EPButton',
   	  	  	title:title,
   	  	  	frame:true,
   	  	  	layout:{type:'fit'},
   	  	  items:[
	   	  	{
	   	  		tbar:[
		  		{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
   	  		    {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true},'-',
   	  		    {xtype:'tps_searchcbo',itemId:'search',fieldLabel:'快速查询',emptyText:'输入序号或名称搜索..',labelWidth:60,width:320,
   	  				hideTrigger:true,
   	  			 	store:me.store,
		    	 	displayField:'mjms',
		    	 	valueField:'mjxl'
   	  			},
   	  			{text:'查询',iconCls:'query',
       	  				   handler:function(btn){
       	  				    	//加载给定 'page' 的数据,通过适当地设置 start 以及 limit 的值. 在本方法内部只是 传入计算后的 'start' 与 'limit' 配置项 执行一个普通的 load 操作.
       	  				    	me.store.loadPage(1,
       	  				    		{
           	  				    	params:{
           	  				    		search:me.down('#search').getValue()
           	  				    	}
       	  				    	});
       	  				    }
   	  			 },'-',
   	  			{
   	  				    text:'重置',
   	  				    iconCls:'refresh_backwards',
   	  				    handler:function(){
   	  				    	me.down('#search').setValue("");
   	  				    	me.store.loadPage(1);
   	  				    }
   	  			}
   	  			],
   	  	  	xtype:'grid',
   	  	  	itemId:'grd_EP',
   	  	  	flex:2,
   	  	  	height:520,
   	  	  	store:me.store,
   	  	  	multiSelect:true,
   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'),
   	  	  	dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }],
   	  	  	plugins: [
   	  	  			rowEditing
   	  	  	],
   	  	  	columns:[
   	  	  			{header: '编号',dataIndex: 'mjxl',width:50},
   	  	  			{header: '描述',dataIndex: 'mjms',width:200,editor:{ 
   	  	  				allowBlank:false,
   	  	  				blankText:'描述不能为空',
   	  	  				emptyText:'该选项为必填项',
   	  	  				maxLength:50
                        }},
					{header: '备注',dataIndex: 'mjbz',width:300,editor:{ 
						maxLength:250
                        }}
   	  	  			]
   	  	  			}]
   	  	  }]		
		});		
 		me.callParent(arguments);
 	}
});
