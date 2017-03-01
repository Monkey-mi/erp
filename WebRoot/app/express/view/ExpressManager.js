Ext.define('erp.express.view.ExpressManager',{
	extend:'erp.ux.Panel',
	alias:'widget.mng_Express',
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.express.store.Express'); 
		me.detailStore=Ext.create('erp.express.store.ExpressDetail');
		me.issueStore=Ext.create('erp.express.store.ExpressIssue');
		me.provinceStore=Ext.create('erp.express.store.Province',{autoLoad:true});
		me.cityStore=Ext.create('erp.express.store.City',{autoLoad:true});
//		me.currencyStore=Ext.create('erp.master.basicData.currency.store.Currency',{autoLoad:true});
		me.dsfsStore=Ext.create('erp.express.store.Dsfs'/*,{autoLoad:true}*/);
		me.fkfsStore=Ext.create('erp.express.store.Fkfs'/*,{autoLoad:true}*/);
		me.czybmlbbStore=Ext.create('erp.master.operator.store.OperatorDept',{autoLoad:true});
		Ext.apply(me.czybmlbbStore.proxy.extraParams,{usePaging:false});
		me.store.proxy.extraParams.usePaging=true;
		me.store.proxy.extraParams.gdbj=0;
		this.on('beforedestroy',function(){
 			this.deleteExtraParams();
 		});
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
					width:200,
					xtype:'tre_sellKind'
				},
				{
				flex:1,
				xtype:'grid',
				region:'center',
				itemId:'grdExpress',
				tbar:[
						{text: '新增',   iconCls:'page_add',itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
						{text: '删除',   iconCls:'page_delete',itemId:erp.Const.FUNC_ITEMID_BTN_DEL,disabled:true},
						'-',
						{text: '复制', iconCls:'page_copy',itemId:erp.Const.FUNC_ITEMID_BTN_COPY, disabled:true},
						{text: '锁定', iconCls:'permssion',itemId:erp.Const.FUNC_ITEMID_BTN_LOCK, disabled:true},
	   	  		    	{text: '邮寄', iconCls:'email_go',itemId:erp.Const.FUNC_ITEMID_BTN_ACC, disabled:true},
						{text: '结算', iconCls:'money_yen',itemId:erp.Const.FUNC_ITEMID_BTN_SIGN, disabled:true},
						{text: '批量结算', iconCls:'money-coin',itemId:erp.Const.FUNC_ITEMID_BTN_STOP, disabled:true},
						{text: '确认', iconCls:'confirm',itemId:erp.Const.FUNC_ITEMID_BTN_RESIGN, disabled:true},
						{text: '筛选', iconCls:'page_find',itemId:'btn_query'},
						'-',
						{text: '归档',	iconCls:'book_next',xtype:'button',	itemId:erp.Const.FUNC_ITEMID_BTN_BACKUP,disabled:true},
	   	  		    	{text: '历史',	iconCls:'book_open',xtype:'button',	itemId:erp.Const.FUNC_ITEMID_BTN_HISTORY},
				    	'-',
				    	{text: '打印',	iconCls:'printer',xtype:'splitbutton',	itemId:erp.Const.FUNC_ITEMID_BTN_PRINT,disabled:true},
	   	  				{text: '刷新',	iconCls:'arrow_refresh',	itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH },
	   	  				'-',
	   	  				{text:'导入费用',iconCls:'page_excel',itemId:'upExpressfee_btn'}
					],
				selModel:Ext.create('Ext.selection.CheckboxModel'),	
				columns:[
					{header:'',xtype:'rownumberer',width:25},
					{header: '结算',dataIndex: 'jsbj',width:40,
		   	  	  			renderer:function(value){
									if(value=="true"||value=="1"){
										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}else {
										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}
		   	  	  			}},
		   	  	  	{header: '邮寄',dataIndex: 'qfbj',width:40,//字段qfbj 就是对应 邮寄
		   	  	  			renderer:function(value){
									if(value=="true"||value=="1"){
										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}else {
										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}
		   	  	  			}},	
		   	  	  	{header: '回签',dataIndex: 'yjbj',width:40,//字段yjbj 就是对应 回签
		   	  	  			renderer:function(value){
									if(value=="true"||value=="1"){
										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}else {
										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}
		   	  	  			}},		
		   	  	  	{header: '锁定',dataIndex: 'sdbj',width:40,
		   	  	  			renderer:function(value){
									if(value=="true"||value=="1"){
										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}else {
										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}
		   	  	  			}},
		   	  	  	{header: '收费',dataIndex: 'sfbj',width:40,
		   	  	  			renderer:function(value){
									if(value=="true"||value=="1"){
										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}else {
										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
									}
		   	  	  			}},		
		   	  	 	{header:'记录编号',dataIndex:'jlbh',width:80},
	   	  	  		{header:'销售类别',dataIndex:'lbmc',width:80},
	   	  	  		{header:'出货编号',dataIndex:'cybh',width:80},
	   	  	  		{header:'出货编号汇总',dataIndex:'cybh_hz',width:100},
	   	  	  		{header:'收件单位',dataIndex:'sjdw',width:240},
	   	  	  		
	   	  	  		{header:'递送方式',dataIndex:'dsfs',width:80,
	   	  	  			renderer:function(v){
	   	  	  				var rec=me.dsfsStore.findRecord('cid',v,0,false,false,true);
							return rec? rec.get('display'):"";
	   	  	  			}
	   	  	  		},
	   	  	  		
	   	  	  		{header:'寄件日期',dataIndex:'sjrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'快递公司',dataIndex:'csmc',width:280},
	   	  	  		{header:'寄件单号',dataIndex:'sjdh',width:120},
	   	  	  			   	  	  		
	   	  	  		{header:'收件人',dataIndex:'sjrm',width:100},
	   	  	  		{header:'收件人电话',dataIndex:'sjrdh',width:100},
	   	  	  		{header:'国际国内',dataIndex:'gjgn',width:80,
	   	  	  			renderer:function(v){	   	  	  				
							return v==1? "国际":(v==2?"国内":"");
	   	  	  			}
	   	  	  		},
	   	  	  		{header:'递送国别',dataIndex:'gbdq',width:80},
	   	  	  		{header:'省',dataIndex:'province',width:80,
	   	  	  			renderer:function(v){
	   	  	  				var rec=me.provinceStore.findRecord('id',v,0,false,false,true);
							return rec? rec.get('name'):"";
	   	  	  			}
	   	  	  		},
//	   	  	  		{header:'市',dataIndex:'city',width:80,
//	   	  	  			renderer:function(v){
//	   	  	  				var rec=me.cityStore.findRecord('id',v,0,false,false,true);
//							return rec? rec.get('name'):"";
//	   	  	  			}
//	   	  	  		},
	   	  	  		{header:'备注说明',dataIndex:'dsyq',width:180},
	   	  	  		{header:'寄件地',dataIndex:'sendloc',width:80},
	   	  	  		{header:'重量(kg)',dataIndex:'ypzl',width:80,xtype:'numbercolumn'},
	   	  	  		{header:'体积',dataIndex:'tj',width:60,xtype:'numbercolumn'},
	   	  	  		{header:'箱数',dataIndex:'dsxs',width:60,xtype:'numbercolumn'},
	   	  	  		{header:'计费重量',dataIndex:'jfzl',width:80,xtype:'numbercolumn'},
	   	  	  		{header:'递送费用',dataIndex:'dsfy',width:80,xtype:'numbercolumn'},
	   	  	  		{header:'已导费用',dataIndex:'ydfy',width:80,xtype:'numbercolumn'},
	   	  	  		{header:'付款方式',dataIndex:'fkfs',width:80,
	   	  	  			renderer:function(v){
	   	  	  				var rec=me.fkfsStore.findRecord('cid',v,0,false,false,true);
							return rec? rec.get('display'):"";
	   	  	  			}
	   	  	  		},
	   	  	  		{header:'付费方式',dataIndex:'fffsmc',width:80},
	   	  	  		{header:'经办人',dataIndex:'jbrm',width:80},
	   	  	  		{header:'委托人',dataIndex:'wtrm',width:80},
	   	  	  		{header:'委托人电话',dataIndex:'wtrdh',width:80},
	   	  	  		{header:'所属部门',dataIndex:'ssbm',width:80,
	   	  	  			renderer:function(v){
	   	  	  				var rec=me.czybmlbbStore.findRecord('lbbh',v,0,false,false,true);
							return rec? rec.get('lbmc'):v;
	   	  	  			}},
	   	  	  		{header:'快递员',dataIndex:'kdry',width:60},
	   	  	  		{header:'核算部门',dataIndex:'hsbm',width:80},
	   	  	  		{header:'客户名称',dataIndex:'khmc',width:180},
	   	  	  		{header:'业务员名',dataIndex:'ywymc',width:80},
	   	  	  		{header:'到付账号',dataIndex:'dfzh',width:100},
	   	  	  		{header:'收件地址',dataIndex:'sjdz',width:180},
	   	  	  		{header:'要求寄件',dataIndex:'jjrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'申请日期',dataIndex:'sqrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'操作员',dataIndex:'czym',width:80},
	   	  	  		{header:'操作日期',dataIndex:'czsj',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'锁定人',dataIndex:'sdrm',width:80},
	   	  	  		{header:'锁定日期',dataIndex:'sdsj',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'邮寄人员',dataIndex:'yjrm',width:80},
	   	  	  		{header:'邮寄时间',dataIndex:'yjsj',width:80,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'备注说明',dataIndex:'bzsm',width:180},
	   	  	  		{header:'快递类型',dataIndex:'kdlx',width:80},
	   	  	  		{header:'单据类型',dataIndex:'djlx',width:80},
	   	  	  		{header:'发票号码',dataIndex:'fphm',width:80}
					],
					dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					store:me.store
			}]
			},
			{
					region:'south',
					split:true,
					xtype:'tabpanel',
					flex:1,
					items:[{
						xtype:'grid',
						itemId:'grdExpressDetail',
						title:'递送明细',
						columns:[{
							header:'',xtype:'rownumberer',width:25
						},
							{header:'收费',dataIndex:'sfbj',width:40,
							renderer:function(v){
								return v==1?'是':'否';
							}
							},
							{header:'序号',dataIndex:'jlxh',flex:1},
							{header:'产品编号',dataIndex:'cpbh',flex:1},
							{header:'产品名称',dataIndex:'cpmc',flex:2},
							{header:'单位',dataIndex:'jldw',flex:1},
							{header:'数量',dataIndex:'ypsl',flex:1,xtype:'numbercolumn',
					            renderer:function(v){
					            	return Ext.util.Format.number(v,'0,000');
					            }},
				            {header:'实发数量',dataIndex:'sfsl',flex:1,xtype:'numbercolumn',
					            renderer:function(v){
					            	return Ext.util.Format.number(v,'0,000');
					            }},
							{header:'制作号',dataIndex:'zzhm',flex:1},
							{header:'打样号',dataIndex:'dyy',flex:1},
							{header:'订单号',dataIndex:'ddh',flex:1}
							],
							store:me.detailStore
					},{
						xtype:'grid',
						itemId:'grdIssueDetail',
						title:'寄单明细',
						columns:[{
							header:'',xtype:'rownumberer',width:25
						},
							{header:'序号',dataIndex:'jlxh',width:40},
							{header:'出运编号',dataIndex:'cybh',width:80},
							{header:'出货日期',dataIndex:'chrq',width:100,xtype:'datecolumn',format:'Y-m-d'},
							{header:'开船日期',dataIndex:'kcrq',width:100,xtype:'datecolumn',format:'Y-m-d'},
							{header:'议付金额',dataIndex:'yfje',width:100,xtype:'numbercolumn'}
							],
						store:me.issueStore
					}]
				}]
		});
		me.callParent(arguments);
	},
	deleteExtraParams:function(){
		var me=this;
		delete me.store.proxy.extraParams.xslb;
	}
	//归档，控制代码
	,checkStatus:function(itemId){
		var me=this;
		var gridmain=me.down('#grdExpress');			
	 	var rec=gridmain.getSelectionModel().getSelection()[0];
		if(Ext.isEmpty(rec)){
			Ext.Msg.alert('提示','请先选中一条主记录');
	 		return false;
		}
		
		if(rec.get('gdbj')){
			Ext.Msg.alert('提示','已归档');
			return false;
		}		
		return true;
				
	},
	loadMain:function(){
		var me=this;
		me.store.loadPage(1,{//修改，翻页后再去筛选，不查找前页的数据
		    callback: function(records, operation, success) {
		        if(records.length>0){
		        	me.down('#grdExpress').getSelectionModel().select(records[0]);
		        }		        
		    }
		});
	}
});