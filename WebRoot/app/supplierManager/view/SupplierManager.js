/*供应商档案管理界面*/
Ext.define('erp.supplierManager.view.SupplierManager',{
	extend:'erp.ux.Panel',
	alias:'widget.SupplierManager',
	autoScroll :'true',
	requires:[
		'erp.supplierManager.store.AppSupplierAccessLoop'
	],
	listeners:{
	   'close':function(cmp){
		   cmp.destroy();
	    }
    },
 	initComponent:function(){
 		var me =this;
 		//me.customflag=0;
 		me.store=Ext.create('erp.supplierManager.store.SupplierFile');
 		//准入受理
 		me.outStore=Ext.create('erp.supplierManager.store.SupplierFile',{
			model: 'erp.supplierAccess.model.SupplierFileShow',
			proxy: {
				type: 'ajax',
				actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
				extraParams:{usePaging:true,access_status:2},
				api: {
					read: 'supplierAccess/common.srm?method=getAccessApplicationRecord'
				},
				reader: {
					type: 'json',
					rootProperty: 'data',
					totalProperty: 'total',
					messageProperty: 'message'
				}
			}
 		});
 		//准入邀请
 		me.outSupStore=Ext.create('erp.supplierManager.store.SupplierFile',{
			model: 'erp.supplierAccess.model.SupplierFileShow',
			proxy: {
				type: 'ajax',
				actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
				extraParams:{usePaging:true,apply_sts:15,history:0,is_archive:0,is_delete:0},
				api: {
					read: 'supplierAccess/common.srm?method=getSupplierFileList'
				},
				reader: {
					type: 'json',
					rootProperty: 'data',
					totalProperty: 'total',
					messageProperty: 'message'
				}
			}
 		});
 		//归档
 		me.Archivestore=Ext.create('erp.supplierManager.store.ArchiveSupplierFile');
 		//厂商类别，三级
 		me.materialClassStore_1=Ext.create('erp.supplierManager.store.MaterialClass');
		me.materialClassStore_2=Ext.create('erp.supplierManager.store.MaterialClass');
		me.materialClassStore_3=Ext.create('erp.supplierManager.store.MaterialClass');
		me.materialClassStore_1.proxy.extraParams.is_archive=0;
		me.materialClassStore_1.proxy.extraParams.f_id=0;
		me.materialClassStore_2.proxy.extraParams.is_archive=0;
		me.materialClassStore_3.proxy.extraParams.is_archive=0;
		me.materialClassStore_1.load();
 		//准入流水
		me.SupLoopStore=Ext.create('erp.supplierManager.store.AppSupplierAccessLoop');
 		//me.treeStore=Ext.create('erp.basicdata.level.store.MaterialLevel');
/*删除功能由物理删除改成逻辑删除，则不删除相关联的信息
 		//发票抬头store
		me.invoicestore=Ext.create('erp.supplierManager.store.AppInvoiceTitle');
		//主要设备明细store
		me.devicelistStore=Ext.create('erp.supplierManager.store.AppDevicelist');
		//公司产品主要用料表
		me.metarialStore=Ext.create('erp.supplierManager.store.AppMetarial');
		//公司主要客户
		me.maincustomerStore=Ext.create('erp.supplierManager.store.AppMainCustomer');
		//公司主要竞争对手
		me.competitorStore=Ext.create('erp.supplierManager.store.AppCompetitor');
		//公司银行账号
		me.bankAccountStore=Ext.create('erp.supplierManager.store.AppBankAccount');
		//公司产品
		me.goodsStore=Ext.create('erp.supplierManager.store.AppGoods');
		//附件store
		me.registerAttchedStore=Ext.create('erp.supplierManager.store.AppRegisterAttched');
 		//附件自定义上传store
		me.customAttchedStore=Ext.create('erp.supplierManager.store.AppRegisterAttched');
*/		
 		Ext.apply(me,{
			items:[{
   	  	  	xtype:'panel',
   	  	  	itemId:'plSupplier',
   	  	  	layout:{type:'border'},
   	  	  	dockedItems:[{
   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar2',
   	  	  			items:[
   	  	  			{text: '新增',iconCls:'page_add',itemId:erp.def.Const.FUNC_ITEMID_BTN_ADD},
   	  		    	{text: '修改',iconCls:'page_edit',itemId:erp.def.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
   	  		    	{text: '删除',iconCls:'page_delete',itemId:erp.def.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
   	  		   		 "-",
   	  		    	{text: '受理',iconCls:'email_edit',itemId:'btn_Accept', disabled:true},
					{text:'审核通过',iconCls:'email_edit',itemId:'btn_AuditPass',disabled:true},
   	  				{text:'不合格',iconCls:'email_edit',itemId:'btn_AuditUnPass',disabled:true},
   	  				{text:'归档',iconCls:'book_next',itemId:'btn_Archive',disabled:true},
   	  				{text:'邀请',itemId:'btn_accessInvite',disabled:true},
   	  				"-",
   	  				{text:'刷新',iconCls:'arrow_refresh',itemId:'btn_reflash'},
   	  				{text:'筛选',iconCls:'page_find',itemId:'btn_queryMore'},
   	  				'-',
   	  				{text:'准入评估',itemId:'btn_accessEvaluate',disabled:true},
   	  				{text:'准入审核',iconCls:'email_edit',itemId:'btn_SupAuditPass',disabled:true},
   	  				{text:'打印',iconCls:'printer',itemId:erp.Const.FUNC_ITEMID_BTN_PRINT,disabled:true,
		    		  menu: new Ext.menu.Menu({
		   	  		    	itemId:'menu_printer'
		   	  		})},
   	  				{text:'其他',iconCls:'',itemId:'btn_fun',menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_fun',
	   	  		    	items:[
	   	  		    		{text:'平台资料管理',itemId:'btn_fun1'}
	   	  		    	]
	   	  		  	})}
   	  	  			]
   	  	  		},
   	  	  		{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  		items:[
				{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'供应商中文或英文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260},
 				{xtype:'combo',itemId:'applysts_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:140,
 					store:[[0,'全部'],[5,'已提交'],[10,'审核中'],[15,'审核通过'],[20,'不合格']]
 				},
 				{xtype:'combo',itemId:'materialClass_1_search',fieldLabel:'厂商类别',labelWidth:70,labelAlign:'right',width:170,displayField:'mc_name',valueField:'mc_id',store:me.materialClassStore_1,
 					queryMode:'local',
					forceSelection:true,
 					listeners:{
 						'change':function(th,newValue,oldValue,eOpts)
 						{
 							if(!Ext.isEmpty(newValue))
 							{
 							me.down('#materialClass_2_search').setValue('');
 							me.materialClassStore_2.load({params:{f_id:newValue}});
 							}
 						}
 					}
 				},
 				{xtype:'combo',itemId:'materialClass_2_search',width:100,displayField:'mc_name',valueField:'mc_id',store:me.materialClassStore_2,
 					queryMode:'local',
					forceSelection:true,
 					listeners:{
 						'change':function(th,newValue,oldValue,eOpts)
 						{
 							if(!Ext.isEmpty(newValue))
 							{
 							me.down('#materialClass_3_search').setValue('');
 							me.materialClassStore_3.load({params:{f_id:newValue}});
 							}
 						}
 					}
 				},
 				{xtype:'combo',itemId:'materialClass_3_search',width:100,displayField:'mc_name',valueField:'mc_id',store:me.materialClassStore_3,queryMode:'local',
					forceSelection:true},
   	  	  		{text:'查询',glyph:0xf002,itemId:'btn_search'}
		  		]
   	  	  		},
   	  	  		{xtype:'toolbar',dock:'top',itemId:'top_bar4',
   	  	  		  items:[
				  {xtype:'textfield',itemId:'search4',fieldLabel:'快速查询',emptyText:'供应商中文或英文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260},
				  {text:'查询',glyph:0xf002,itemId:'btn_search'}]
   	  	  		}
   	  	  		],
   	  	  items:[{
	   	  		 xtype:'mng_WestTab',
   	  	  		 itemId:'westTab',
   	  	  		 region:'west',
   	  	  		 layout:'fit',
   	  	  	 	 split:true,
   	  	  	 	 collapsible: true,
   	  	  		 width:200,
   	  	  		 tools:[
			           {type:'refresh',tooltip:'刷新',handler:function(event,toolEl,panel){
			           		me.down('#westTab').levstore.load();
			           		me.down('#westTab').matstore.load();
			           }}
			    ],
   	  	  		 title:'导航查询'
	   	  	  },{
	   	  		xtype:'tabpanel',
	   	  		itemId:'supplier_tab',
	   	  		region:'center',
   	  	  		autoScroll :'true',
	   	  		items:[{
		   	  		xtype:'panel',
		   	  		title:'当前供应商',
		   	  		itemId:'Supplier',
		   	  		layout:{type:'border'},
		   	  		items:[{
		   	  			xtype:'grid',
		   	  			region:'center',
		   	  	  		itemId:'grd_Supplier',
			   	  	  	store:me.store,
			   	  	  	flex:3,
			   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
			   	  	  	dockedItems:[{
						    		xtype : 'pagingbar',
			                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
						    		store:me.store,
						    		dock:'bottom',
						    		displayInfo:true,
						    		defaultPageSize:25
						    	  }],
			   	  	  	columns:[
					   	  	  	{header: '编号',dataIndex: 'company_id',align:'center',width:60},					   	  	  	
					   	  	  	{header: '状态',dataIndex:'apply_sts',align:'center',width:100,
					   	  	  				renderer:function(value){
					   	  	  					var sts='';
					   	  	  					if(value==5)
					   	  	  					{
					   	  	  						sts='已提交';
					   	  	  					}
					   	  	  					else if(value>5&&value<=10)
					   	  	  					{
					   	  	  						sts='审核中';
					   	  	  					}
					   	  	  					else if(value==15)
					   	  	  					{
					   	  	  						sts='审核通过';
					   	  	  					}
					   	  	  					else if(value==20)
					   	  	  					{
					   	  	  						sts='不合格';
					   	  	  					}
					   	  	  					return sts;
					   	  	  	}},
			   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
			   	  	  			{header:'<div style="text-align:center">厂商类别</div>',dataIndex:'mc_name_1',width:100},
			   	  	  			{header:'<div style="text-align:center">一级子类别</div>',dataIndex:'mc_name_2',width:160},
			   	  	  			{header:'<div style="text-align:center">二级子类别</div>',dataIndex:'mc_name_3',width:160,renderer:function(v,metaData){
									metaData.tdAttr='data-qtip="'+v+'"';
									return v;
								}},
								{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
								{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
								
								{header: '联系人',dataIndex: 'contacts',align:'center',width:100},
								{header: '<div style="text-align:center">手机号</div>',dataIndex: 'm_phone',align:'center',width:100
								},
								{header: '<div style="text-align:center">E-Mail</div>',dataIndex: 'email',align:'center',width:100},
								{header: '传真',dataIndex: 'fax',align:'center',width:100},
								{header: '<div style="text-align:center">注册地址</div>',dataIndex: 'reg_addr',flex:1,minWidth:100},
								{header:'操作员',dataIndex:'operator',align:'center',width:80},
								{header:'操作时间',dataIndex:'operater_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
								{header:'审核员',dataIndex:'auditor',align:'center',width:80},
								{header:'审核时间',dataIndex:'audit_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
								{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:160}
		   	  	  			]
		   	  	  		},{
		   	  			xtype:'grid',
		   	  			region:'south',
		   	  			flex:1,
		   	  			title:'准入评估历史记录',
		   	  	  		itemId:'grd_SupplierLoop',
			   	  	  	store:me.SupLoopStore,
			   	  	  	split:true,
   	  	  	 	 		collapsible: true,
			   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
			   	  	  	dockedItems:[{
						    		xtype : 'pagingbar',
			                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
						    		store:me.SupLoopStore,
						    		dock:'bottom',
						    		displayInfo:true,
						    		defaultPageSize:25
						    	  }],
			   	  	  	columns:[
			   	  	  			{header: '审核',dataIndex:'assess_sts',renderer:erp.Util.Staterenderer,width:35},
			   	  	  			{header: '审核人',dataIndex:'assess_sts_op',width:100},
			   	  	  			{header: '审核日期',dataIndex: 'assess_sts_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
					   	  	  	{header: '供评估日期',dataIndex: 'assess_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
					   	  	  	{header: '主任审核员',dataIndex:'head_audit',width:100},
			   	  	  			{header: '操作员',dataIndex: 'operator',width:80},
			   	  	  			{header:'操作时间',dataIndex:'operator_dt',width:85,xtype: 'datecolumn',format:'Y-m-d'},
			   	  	  			{header:'记录号',dataIndex:'loop_id',width:80},
			   	  	  			{header:'',dataIndex:'record_id',width:80,hidden:true}
		   	  	  			]
		   	  	  		}]
	   	  		},
	   	  		{
	   	  			xtype:'grid',
   	  	  			itemId:'grd_ArchiveSupplier',
		   	  	  	region:'center',
		   	  	  	autoScroll :'true',
		   	  	  	//overflowY:'auto',
		   	  	  	//height:800,
		   	  	  	title:'归档供应商',
		   	  	  	store:me.Archivestore,
		   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
		   	  	  	dockedItems:[{
					    		xtype : 'pagingbar',
		                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
					    		store:me.Archivestore,
					    		dock:'bottom',
					    		displayInfo:true,
					    		defaultPageSize:25
					    	  }],
		   	  	  	columns:[ 	  	  			
		   	  	  			{header: '编号',dataIndex: 'company_id',align:'center',width:60},
		   	  	  			{header: '状态',dataIndex:'apply_sts',align:'center',width:100,
		   	  	  				renderer:function(value){
		   	  	  					var sts='';
		   	  	  					if(value==5)
		   	  	  					{
		   	  	  						sts='已提交';
		   	  	  					}
		   	  	  					else if(value>5&&value<=10)
		   	  	  					{
		   	  	  						sts='审核中';
		   	  	  					}
		   	  	  					else if(value==15)
		   	  	  					{
		   	  	  						sts='审核通过';
		   	  	  					}
		   	  	  					else if(value==20)
		   	  	  					{
		   	  	  						sts='不合格';
		   	  	  					}
		   	  	  					return sts;
		   	  	  				}},
		   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
		   	  	  			{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:160},
							{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
							{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
							{header: '联系人',dataIndex: 'contacts',align:'center',width:100},
							{header: '<div style="text-align:center">手机号</div>',dataIndex: 'm_phone',align:'center',width:100},
							{header: '<div style="text-align:center">E-Mail</div>',dataIndex: 'email',align:'center',width:100},
							{header: '传真',dataIndex: 'fax',align:'center',width:100},
							{header: '<div style="text-align:center">注册地址</div>',dataIndex: 'reg_addr',flex:1,minWidth:100},
							{header:'操作员',dataIndex:'operator',align:'center',width:80},
							{header:'操作时间',dataIndex:'operater_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
							{header:'审核员',dataIndex:'auditor',align:'center',width:80},
							{header:'审核时间',dataIndex:'audit_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'}
   	  	  				]
	   	  		},
	   	  		{
	   	  			xtype:'grid',
   	  	  			itemId:'OutSupplierInvite',
		   	  	  	region:'center',
		   	  	  	title:'准入邀请',
		   	  	  	//hidden:
		   	  	  	store:me.outSupStore,
		   	  	  	listeners:{
		   	  	  		afterrender:function(cmp){
							me.outSupStore.load();
						}
		   	  	  	},
		   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
		   	  	  	dockedItems:[{
					    		xtype : 'pagingbar',
		                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
					    		store:me.outSupStore,
					    		dock:'bottom',
					    		displayInfo:true,
					    		defaultPageSize:25
					    	  }],
		   	  	  	columns:[ 	  	  			
		   	  	  			{header: '供应商代码',dataIndex: 'company_id',align:'center',width:100},
		   	  	  			{header:'邀请状态',dataIndex: 'invite_status',align:'center',width:60,
					   	  	  	 renderer : function(value){
		   	  	  					if (value == 0 || value == 1) {
										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									} else {
										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}
					   	  	  	 }
					   	  	  	},
		   	  	  			{header: '状态',dataIndex:'apply_sts',align:'center',width:100,
		   	  	  				renderer:function(value){
		   	  	  					var sts='';
		   	  	  					if(value==5){
		   	  	  						sts='已提交';
		   	  	  					}
		   	  	  					else if(value>5&&value<=10)
		   	  	  					{
		   	  	  						sts='审核中';
		   	  	  					}
		   	  	  					else if(value==15)
		   	  	  					{
		   	  	  						sts='审核通过';
		   	  	  					}
		   	  	  					else if(value==20)
		   	  	  					{
		   	  	  						sts='不合格';
		   	  	  					}
		   	  	  					return sts;
		   	  	  			}},
		   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
		   	  	  			{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:160},
							{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
							{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
							
							{header: '联系人',dataIndex: 'contacts',align:'center',width:100},
							{header: '<div style="text-align:center">手机号</div>',dataIndex: 'm_phone',align:'center',width:100
							},
							{header: '<div style="text-align:center">E-Mail</div>',dataIndex: 'email',align:'center',width:100},
							{header: '传真',dataIndex: 'fax',align:'center',width:100},
							{header: '<div style="text-align:center">注册地址</div>',dataIndex: 'reg_addr',flex:1,minWidth:100}
   	  	  			]
	   	  		},
	   	  		{
	   	  			xtype:'grid',
   	  	  			itemId:'OutSupplier',
		   	  	  	title:'准入受理',
		   	  	  	store:me.outStore,
		   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
		   	  	  	listeners:{
		   	  	  		afterrender:function(cmp){
							me.outStore.load();
						}
		   	  	  	},
		   	  	  	dockedItems : [{
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
									store : me.outStore,
									dock : 'bottom',
									displayInfo : true,
									defaultPageSize : 25
					}],
		   	  	  	columns:[ 	  	  			
		   	  	  			{header: '供应商代码',dataIndex: 'company_id',align:'center',width:100},
		   	  	  			{header: '状态',dataIndex:'apply_sts',align:'center',width:100,
		   	  	  				renderer:function(value){
		   	  	  					var sts='';
		   	  	  					if(value==0){
		   	  	  						sts='';
		   	  	  					}
		   	  	  					else if(value==1)
		   	  	  					{
		   	  	  						sts='已保存';
		   	  	  					}
		   	  	  					else if(value==2)
		   	  	  					{
		   	  	  						sts='已提交';
		   	  	  					}
		   	  	  					else if(value==3)
		   	  	  					{
		   	  	  						sts='已通过';
		   	  	  					}
		   	  	  					return sts;
		   	  	  			}},
		   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
		   	  	  			{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:160},
							{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
							{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
							{header: '联系人',dataIndex: 'contacts',align:'center',width:100},
							{header: '<div style="text-align:center">手机号</div>',dataIndex: 'm_phone',align:'center',width:100},
							{header: '<div style="text-align:center">E-Mail</div>',dataIndex: 'email',align:'center',width:100},
							{header: '传真',dataIndex: 'fax',align:'center',width:100},
							{header: '<div style="text-align:center">注册地址</div>',dataIndex: 'reg_addr',flex:1,minWidth:100}
   	  	  			]
	   	  		}]
   	  	  	}]
   	  	  }]		
		});
 		me.callParent(arguments);
 		
 	 }
 	 ,loadMain:function(){
		var me=this;
		me.store.loadPage(1,{//修改，翻页后再去筛选，不查找前页的数据
		    callback: function(records, operation, success) {
		        if(records.length>0){
		        	me.down('#grd_Supplier').getSelectionModel().select(records[0]);
		        }		        
		    }
		});
	}
 	 
 	 //加载目录节点
	 ,loadGridByTreeNodeId: function(rec,tabflag){
		    	var me = this;		    	
		    	var store = me.store;
		    if (!Ext.isEmpty(rec.get('id'))){
		    	if(tabflag==1){
		    		me.store.load({params:{level_id:rec.get('id')}});
		    	}else if(tabflag==2){
		    		me.store.load({params:{mc_id:rec.get('id')}});	
		    	}	
		    } 
	 	}
 	});