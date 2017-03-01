/*供应商准入评估管理界面*/
Ext.define('erp.supplierAccess.view.SupplierAccessManager',{
	extend:'erp.ux.Panel',
	alias:'widget.mng_supplierAccess',
	requires:['erp.supplierAccess.view.WestTab','erp.supplierAccess.model.SupplierFileShow'],
	layout:{
	type:'border',
	padding:0
	},
	listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	},
 	initComponent:function(){
 		var me =this;
 		me.store=Ext.create('erp.supplierManager.store.SupplierFile',{
			model: 'erp.supplierAccess.model.SupplierFileShow',
			proxy: {
				type: 'ajax',
				actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
				extraParams:{usePaging:true,history:0,is_archive:0,is_delete:0},
				api: {
					create: 'supplier/supplierFile.srm?method=addSupplierFile',
					update: 'supplier/supplierFile.srm?method=updateSupplierFile',
					read: 'supplier/supplierFile.srm?method=getSupplierFileList',
					//read: 'supplierAccess/common.srm?method=getSupplierFileList',
					destroy: 'supplier/supplierFile.srm?method=deleteSupplierFile'
				},
				reader: {
					type: 'json',
					rootProperty: 'data',
					totalProperty: 'total',
					messageProperty: 'message'
				},
				writer: {
					type: 'json',
					rootProperty: 'data',
					writeAllFields:true,
					encode: true,
					allowSingle: false
				}
			}
 		});
 		Ext.apply(me,{
 			layout:'fit',
			items:[
   	  	  	{
   	  	    //region:'center',
   	  	  	//flex:2,
   	  	  	xtype:'panel',
   	  	  	itemId:'plSupplierAccess',
   	  	  	layout:{type:'border'},
   	  	  	dockedItems:[{xtype:'toolbar',dock:'top',itemId:'top_bar',items:[
   	  		    {xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入供应商中文或英文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search'},
   	  		    //{text: '准入申请',glyph:0xf15c,itemId:'btn_accessApply',disabled:true},
   	  		    {text: '准入评估',glyph:0xf02b,itemId:'btn_accessEvaluate',disabled:true},
   	  		    {text:'审核通过',glyph:0xf0e3,itemId:'btn_AuditPass',disabled:true},
   	  			{text:'不合格',glyph:0xf0e3,itemId:'btn_AuditUnPass',disabled:true},
   	  		    {text: '导入',itemId:'btn_load',disabled:true}
   	  			]}],
   	  		
   	  	  items:[{
	   	  		 xtype:'mng_AcessWestTab',
   	  	  		 itemId:'accesswestTab',
   	  	  		 region:'west',
   	  	  	 	 split:true,
   	  	  	 	 collapsible: true,
   	  	  		 width:200,
   	  	  		 title:'导航查询'
	   	  	  	}
	   	  	,{
   	  	  	xtype:'grid',
   	  	  	itemId:'grd_Supplier',
   	  	  	flex:3,
   	  	  	region:'center',
   	  	  	layout:'fit',
   	  	  	overflowX:'auto',
   	  	  	overflowY:'auto',
   	  	  	//height:800,
   	  	  	title:'供应商信息一栏',
   	  	  	store:me.store,
   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
   	  	  	dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
   	  	  	columns:[
   	  	  			{header: '供应商代码',dataIndex: 'company_id',align:'center',width:100},
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
						{header: '<div style="text-align:center">注册地址</div>',dataIndex: 'reg_addr',flex:1,minWidth:100}//,
					//{header: '<div style="text-align:center">不合格原因</div>',dataIndex: 'auditopinion',flex:1,minWidth:100}
   	  	  			]
   	  	  	
   	  	  		}]
   	  	  }]		
		});
 		me.callParent(arguments);
 		}
 		,
		//加载目录节点
	    loadGridByTreeNodeId: function(rec,tabflag){
		    	var me = this;
		    	var store = me.store;
		    if (!Ext.isEmpty(rec.get('id'))){
		    	//var root=me.down('#westTab').getActiveTab().getRootNode().get('text');
		    	if(tabflag==1){
		    		me.store.load({params:{level_id:rec.get('id')}});
		    	}else if(tabflag==2){
		    		me.store.load({params:{mc_id:rec.get('id')}});
		    	}
		    	
		    }
		    
	 	}
 	});