/*供应商变更审批界面*/
Ext.define('erp.supplierAccess.view.SupplierChangeManage',{
	extend:'erp.ux.Panel',
	alias:'widget.mng_supplierChange',
	listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	},
	requires:['erp.supplierAccess.view.WestTab'],
 	initComponent:function(){
 		var me =this;
 		me.store=Ext.create('erp.supplierAccess.store.PfAuthcationUpdate',{
			
 		});
 		Ext.apply(me,{
 			layout:'fit',
			items:[{
   	  	    //region:'center',
   	  	  	//flex:2,
   	  	  	xtype:'panel',
   	  	  	itemId:'supplierChange',
   	  	  	layout:{type:'border'},
   	  	  	dockedItems:[
   	  	  	{xtype:'toolbar',dock:'top',itemId:'top_bar',items:[
   	  		    {xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入供应商中文或英文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search'},
   	  		    {text:'审核通过',glyph:0xf0e3,itemId:'btn_AuditPass',disabled:true},
   	  		    {text:'审核不通过',glyph:0xf0e3,itemId:'btn_AuditUnPass',disabled:true}
   	  		]}],
   	  	  items:[{
   	  	  	xtype:'grid',
   	  	  	itemId:'grd_SupplierChange',
   	  	  	//flex:2,
   	  	  	region:'center',
   	  	  	layout:'fit',
   	  	  	overflowX:'auto',
   	  	  	overflowY:'auto',
   	  	  	//height:800,
   	  	  	title:'供应商变更信息一栏',
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
   	  	  			{header: '变更单号',dataIndex: 'auth_update_id',align:'center',width:100},
   	  	  			{header: '供应商代码',dataIndex: 'company_id',align:'center',width:100},
   	  	  			{header: '变更状态',dataIndex:'state',align:'center',width:100,
   	  	  				renderer:function(value){
   	  	  					var sts='';
   	  	  					if(value==0){
   	  	  						sts='保存未提交';
   	  	  					}
   	  	  					else if(value==1)
   	  	  					{
   	  	  						sts='提交待审核';
   	  	  					}
   	  	  					else if(value==2)
   	  	  					{
   	  	  						sts='审核通过';
   	  	  					}
   	  	  					else if(value==3)
   	  	  					{
   	  	  						sts='审核不通过';
   	  	  					}
   	  	  					return sts;
   	  	  			}},
   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
   	  	  			{header: '<div style="text-align:center">企业类型</div>',dataIndex: 'nature_name',width:160},
					{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
					{header: '<div style="text-align:center">经营模式</div>',dataIndex: 'industry_name',align:'center',width:100},
					{header: '所属行业',dataIndex: 'class_name',align:'center',width:100},
					{header: '主营业务',dataIndex: 'key_remark',align:'center',width:100},
					{header: '<div style="text-align:center">注册资本</div>',dataIndex: 'reg_fund',align:'center',width:100},
					{header: '<div style="text-align:center">注册币种</div>',dataIndex: 'currency_name',align:'center',width:100},
					{header: '成立日期',dataIndex: 'establish_dt',align:'center',width:100,renderer : Ext.util.Format.dateRendererOne},
					{header: '联系地址',dataIndex: 'contact_addr',flex:1,minWidth:100},
					{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
					{header: '企业简介',dataIndex: 'company_introduction',align:'center',width:160},
					{header: '创建时间',dataIndex: 'created_dt',align:'center',width:100,renderer : Ext.util.Format.dateRendererOne}
   	  	  			]
   	  	  	
   	  	  		}]
   	  	  }]		
		});
 		me.callParent(arguments);
 		}
 });