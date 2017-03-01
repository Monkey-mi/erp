Ext.define('erp.master.vendorFiles.view.VendorFilesManger',{
     extend: 'erp.ux.Panel',
     alias: 'widget.mng_VendorFiles',
     
     initComponent:function(){
		var me=this;
		me.store = Ext.create('erp.master.vendorFiles.store.VendorFiles');
		me.fjStore = Ext.create('erp.master.vendorFiles.store.VendorAttachment');
		me.useStore = Ext.create('erp.master.vendorFiles.store.UseVendorFiles');
		me.hisStore = Ext.create('erp.master.vendorFiles.store.historyVendorFiles');
		var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items:[{
		     xtype : 'tps_searchcbo',itemId:'search',fieldLabel:'快速查询',
		     emptyText:'输入厂商编号或名称搜索..',LabelWidth:120,
		     hideTrigger:true,
   	  	     store:Ext.create('erp.master.vendorFiles.store.VendorFiles'),
   	  	     displayField:'csmc',
		     valueField:'csbh'
		},
		      {text:'查询',iconCls:'query',
		      handler: function(btn){
		         me.store.loadPage(1,{
		         params:{
		             search:me.down('#search').getValue()
		         }
		         });
		      }
		      },
		      {
		       text:'重置',
   	  		   iconCls:'refresh_backwards',
   	  		   handler:function(){
   	  		   me.down('#search').setValue("");
   	  		   me.store.loadPage(1);
		      }
		      }
		]});
	    Ext.apply(me.store.proxy.extraParams,{usePaging:true});
	    Ext.apply(me,{
	         layout:{
		     type: 'border',
		     padding : 2
		     },
		     dockedItems: [{
		      xtype: 'toolbar',
			  dock: 'top',
			  itemId: 'function_btn',
			  items: [
			  {text : '添加', iconCls:'page_add', itemId:'btn_add'},
			  {text : '编辑', iconCls:'page_edit', itemId:'btn_edt'},
			  {text : '删除', iconCls:'page_delete', itemId:'btn_del'},
			  {text : '恢复', iconCls:'', itemId:'btn_recover'},
			  {text : '归档', iconCls:'', itemId:'btn_archive'},
			  {text : '筛选',glyph:0xf002,itemId:'btn_query'},
			  {text : '审批', iconCls:'email_edit', itemId:'btn_appro'},
			  {text:'刷新',iconCls:'refresh_backwards',
			   	  				    handler:function(){
			   	  				    	me.store.loadPage(1);
			   	  				    }}]
		     },sec_bar],
		  items:[
		    {
		    	xtype: 'grid',
		    	region: 'center',
		    	itemId: 'grd_VendorFiles',
		    	overflowY:'auto',
				overflowX:'auto',
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize : 50,
			    		displayInfo:true
			    	  }],
			    columns:[
			    {header: '审批',width:40,dataIndex: 'spbj',
			    renderer: erp.Util.Staterenderer},
			    {header: '合格供方',width:80,dataIndex: 'psbj',
			    renderer: erp.Util.Staterenderer},
			    {header: '考评',width:40,dataIndex: 'kpbj',
			    renderer: erp.Util.Staterenderer},
			    {header: '检验',width:40,dataIndex: 'jybj',
			    renderer: erp.Util.Staterenderer},
			    {header: '考评等级', width:100, dataIndex:'kpdj',
			         renderer : function(v){
			              if(v==1){
			              return 'A'}
			              else if(v==2){
			              return 'B'}
			              else if(v==3){
			              return 'C'}
			              else if(v==4){
			              return 'D'}
			              else{return ''}
			         }
			    },
			    {header: '厂商类型', width:100, dataIndex:'cslx'},
			    {header: '厂商编号', width:100, dataIndex:'csbh'},
			    {header: '厂商简称', width:100, dataIndex:'csjc'},
			    {header: '厂商名称', width:450, dataIndex:'csmc'},
			    {header: '英文名称', width:450, dataIndex:'ywmc'},
			    {header: '发展日期', width:150,xtype:'datecolumn',format:'Y-m-d',
			    dataIndex:'fzrq'},
			    {header: '厂商类别', width:100, dataIndex:'cslb'},
			    {header: '币种', width:60, dataIndex:'wbmc'},
			    {header: '代号', width:60, dataIndex:'wbdh'},
			    {header: '付款天数', width:100, dataIndex:'fkts',
			     renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    {header: '付款条件', width:320, dataIndex:'fktj',
			     renderer:function(v,metaData){
					metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				    return v;
				 }},
			    {header: '信用额度', width:100, dataIndex:'xyed',
			     renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    {header: '地址', width:450, dataIndex:'csdz'},
			    {header: '电话', width:200, dataIndex:'csdh'},
			    {header: '传真', width:200, dataIndex:'cscz'},
			    {header: '联系人名', width:100, dataIndex:'lxrm',
			    renderer:function(v,metaData){
					metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				    return v;
				 }},
			    {header: '邮编', width:120, dataIndex:'csyb'},
			    {header: '开户银行', width:200, dataIndex:'khyh',
			    renderer:function(v,metaData){
					metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				    return v;
			     }},
			    {header: '税号', width:200, dataIndex:'cssh'},
			    {header: '信贷比例', width:150, dataIndex:'xdbl'},
			    {header: '对应客户', width:80, dataIndex:'khbh'},
			    {header: '对应客户', width:350, dataIndex:'khmc'},
			    {header: '汇总厂商', width:350, dataIndex:'hzcs'},
			    {header: '还贷单位', width:350, dataIndex:'hddw'},
			    {header: '备注说明', width:400, dataIndex:'bzsm',
			    renderer:function(v,metaData){
				metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				return v;
			     }},
			    {header: '操作员名', width:100, dataIndex:'czrm'},
			    {header: '操作时间', width:150,xtype:'datecolumn',format:'Y-m-d',
			    dataIndex:'czsj'},
			    {header: '审批人', width:100, dataIndex:'sprm'},
			    {header: '审批时间', width:150,xtype:'datecolumn',format:'Y-m-d', 
			    dataIndex:'spsj'},
			    {header: '资格认定', width:150, dataIndex:'zgrd'},
			    {header: '提单认定', width:150, dataIndex:'tdrd'}/*,
			    {header: '货代性质', width:150, dataIndex:''}*/
			    ],
			    store: me.store	  
		    },{
		      region: 'south',
		      split: true,
		      height:300,
		      xtype:'tabpanel',
		      items:[{
		        itemId:'cswj',
		        title:'厂商文件',
		        items:[{
		            xtype: 'grid',
		        	itemId:'grdAtt',
		        	columns:[
		        	{header:'文件编号',dataIndex:'wjbh',width:100},
		        	{header:'文件名称',dataIndex:'wjmc',width:300},
		        	{header:'创建人名',dataIndex:'cjrm',width:120},
		        	{header:'创建日期',dataIndex:'wjrq',width:200}
		        	],
		        	store : me.fjStore
		        }]
		      },{
		        itemId:'sykh',
		        title:'使用客户',
		        items:[{
		        	xtype: 'grid',
		        	itemId:'grdUse',
		        	columns:[
		        	   {header:'客户编号',dataIndex:'khbh',width:100},
		        	   {header:'客户名称',dataIndex:'khmc',width:300},
		        	   {header:'英文名称',dataIndex:'ywmc',width:300}
		        	   ],
		           store: me.useStore
		        }]
		      },{
		        itemId:'lsmc',
		        title: '历史名称',
		        items:[{
		        	xtype: 'grid',
		        	itemId:'grdHis',
		        	columns:[
		        		{header: '序号',dataIndex:'jlxh',width:80},
		        		{header: '历史名称',dataIndex:'csmc',width:500},
		        		{header: '操作时间',dataIndex:'czsj',
		        		 xtype:'datecolumn',format:'Y.m.d H:m',width:350},
		        		{header: '操作员',dataIndex:'czym',width:150}
		        		],
		          store: me.hisStore
		        }]
		      }]
		    }
		  ]   
	    });
	   me.callParent(arguments); 
	},
	loadMain:function(){
		var me=this;
		me.store.loadPage(1,{
		    callback: function(records, operation, success) {
		        if(records.length>0){
		        	me.down('#grd_VendorFiles').getSelectionModel().select(records[0]);
		        }		        
		    }
		});
	}
})