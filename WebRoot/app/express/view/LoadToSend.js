Ext.define('erp.express.view.LoadToSend', {
	extend:'erp.ux.Window',
	alias : 'widget.LoadToSend',
	title : '提单放单导入',
	iconCls:'box',
	requires:[	
    			'erp.ux.PagingBar',
    			'erp.ux.QueryPanel',
    			'erp.ux.SearchComboboxOnlyName'
    ],
	width : 800,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;
		me.store=Ext.create('erp.express.store.Tdfd'); 
		me.store.proxy.extraParams.usePaging=true;
		me.store.proxy.extraParams.tdgdbj=0;
		this.on('beforedestroy',function(){
 			this.deleteExtraParams();
 		});
 		me.store.load();
		Ext.apply(me,{
			layout:{
					type:'border',
					padding:2
				},
			items:[
			{	
				region:'center',
				split:true,
				xtype:'panel',
				flex:3,
				layout:{
					type:'border',
					padding:2
				},
				items:[{
					region:'west',
					split:true,
					width:100,
					xtype:'tre_sellKind',
					listeners:{
						selectionchange:function(tree,recs){
							if(recs.length>0){
								me.store.proxy.extraParams.xslb=recs[0].get('nodeId');
								me.loadMain();
							}
						}
					}
				},
				{
				flex:1,
				xtype:'grid',
				region:'center',
				itemId:'grdTdfd',
				tbar:[	
	   	  		    	{text: '筛选', iconCls:'page_find',itemId:'btn_query'}
					],
				selModel:Ext.create('Ext.selection.CheckboxModel'),	
				columns:[
					{header:'',xtype:'rownumberer',width:25},
					{header: '邮寄',dataIndex: 'yjbj',width:40,
		   	  	  			renderer:function(value){
									if(value=="true"||value=="1"){
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}},	
		   	  	  	{header: '放单',dataIndex: 'fdbj',width:40,
		   	  	  			renderer:function(value){
									if(value=="true"||value=="1"){
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}},		
		   	  	  	
		   	  	  	{header: '单据',dataIndex: 'djbj',width:40,
		   	  	  			renderer:function(value){
									if(value=="true"||value=="1"){
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}},		
		   	  	 	{header:'出货编号',dataIndex:'cybh',width:80},
	   	  	  		{header:'销售类别',dataIndex:'xslbmc',width:80},
	   	  	  		{header:'付款条件',dataIndex:'fktj',width:120},
	   	  	  		{header:'客户编号',dataIndex:'khbh',width:80},
	   	  	  		{header:'客户名称',dataIndex:'khmc',width:180},
	   	  	  		{header:'出货金额',dataIndex:'chje',width:80},
	   	  	  		{header:'议付金额',dataIndex:'yfje',width:80},
	   	  	  		{header:'开船日期',dataIndex:'kcrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'到港日期',dataIndex:'yjdg',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'提单号',dataIndex:'tdhm',width:120},
	   	  	  		{header:'单据时间',dataIndex:'djsj',width:80,xtype:'datecolumn',format:'Y-m-d H:i:s'},
					{header:'提交日期',dataIndex:'tjrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'寄件日期',dataIndex:'yjsj',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'确认日期',dataIndex:'tdqrsj',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'单据人',dataIndex:'djrm',width:100},
	   	  	  		{header:'提交人',dataIndex:'tjrm',width:100},
	   	  	  		{header:'放单人',dataIndex:'fdrm',width:100},
	   	  	  		{header:'确认人',dataIndex:'tdqrrm',width:100},
	   	  	  		{header:'备注说明',dataIndex:'tdbzsm',width:240},
	   	  	  		{header:'归档人',dataIndex:'tdgdrm',width:100},
	   	  	  		{header:'归档时间',dataIndex:'tdgdsj',width:80,xtype:'datecolumn',format:'Y-m-d H:i:s'}
					],
					dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					store:me.store,
					viewConfig: { 
				        stripeRows: false, 
				        getRowClass: function(record) { 
				        	if(record.get('ysbj') == 1){
				        		return 'x-grid-record-red';
				        	}
				            
				        } 
				    } 
			}]
			}],
				buttons:['->',{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
					{text:'关闭',iconCls:'page_error',handler:function(){me.close()}}
				]
		});
		this.callParent(arguments);
	},
	loadMain:function(){
		var me=this;
		me.store.loadPage(1);
	},
	deleteExtraParams:function(){
		var me=this;
		delete me.store.proxy.extraParams.xslb;
	}
});