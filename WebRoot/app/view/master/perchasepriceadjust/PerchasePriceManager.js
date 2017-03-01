Ext.define('erp.view.master.perchasepriceadjust.PerchasePriceManager',{
	extend:'erp.ux.Panel',
	alias:'widget.PerchasePriceManager',
	requires:[
	    'erp.view.master.perchasepriceadjust.view.SubmitPeople',
	    'erp.view.master.perchasepriceadjust.view.PerchasePriceMaintain',
	    'erp.view.master.perchasepriceadjust.view.MainQuery',
		'erp.view.master.perchasepriceadjust.PerchasePriceCtl',
		'erp.view.master.perchasepriceadjust.PerchasePriceModel',
		'erp.view.master.perchasepriceadjust.view.ProcurementImp',
		'erp.view.master.perchasepriceadjust.view.WareHouseImp',
		'erp.view.master.perchasepriceadjust.view.PerchasePriceMaintainEdit',
		'erp.ux.PagingBar',
		'erp.ux.SelectField',
		'erp.ux.ComboxTree'
	],
	controller:'PerchasePriceCtl',
	layout: {
        type: 'border'
    },
    viewModel: {
        type: 'perchaseViewModel'
    },
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.perchasepriceadjust.store.Cgjgtzb');
		me.dStore=Ext.create('erp.view.master.perchasepriceadjust.store.Cgjgtzmxb');
		var isCgy=false;
		Ext.each(erp.Util.currentUser.roleList,function(role){
				if(role.role_name=='采购员'){
				isCgy=true;
				return false;
		}
	   })
		if(!erp.Util.currentUser.isAdmin&&isCgy){
		    			//判断当前操作员是否为采购员
				me.store.proxy.extraParams.search="  and (cgjgtzb.czym like '%"+erp.Util.currentUser.name+"%')";
		}
		me.store.load({callback:function(records,operation,success){
			me.down('#PerchasePriceGrid').getSelectionModel().select(records[0]);
		}});
		me.ct=me.getController();
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		me.DetailColumns=erp.Util.getColumns(me.dStore.getModel());
		Ext.apply(me,{
			items:[{
				region:'center',
				layout:'border',
				items:[{
	    			xtype:'treepanel',
	    			region:'west',
	    			reference:'perchasetree',
	    			collapsible:true,
	    			width:200,
	    			split:true,
	    			store : Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree',{autoLoad:true}),
	    			listeners:{
	    			  'itemclick':function(t,rec){
	    			  		if(rec.get('nodeId')!=0){
	    			  			me.store.proxy.extraParams.hsbm=rec.get('nodeId');
	    			  			me.store.loadPage(1);
	    			  		}else{
	    			  			delete me.store.proxy.extraParams.hsbm;
	    			  			me.store.loadPage(1);
	    			  		}
	    			  }
	    			}
	    	},{
					region: 'center',
			        xtype:'grid',
			        reference:'PerchasePriceGrid',
			        itemId:'PerchasePriceGrid',
					columns:me.MainColumns,
					store:me.store,
					flex:1,
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					dockedItems:[{
				    	xtype: 'toolbar',
				    	dock: 'top',
				    	itemId:'PerchasepriceMainToolBar',
				    	items:[{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
						   	  {text: '修改',	iconCls:'page_edit',	itemId:erp.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
						   	  {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
						   	   '-',
						   	  {text: '锁定',iconCls:'permssion',itemId:'lock',disabled:true},
						   	  {text: '提交', iconCls:'stamp',itemId:'BTN_REFER', disabled:true},
						   	  {text: '签发', iconCls:'email_edit',itemId:'BTN_SIGN', disabled:true,hidden:true},
							   '-',
							  {text: '归档',	iconCls:'book_next',xtype:'button',	itemId:'BTN_BACKUP',disabled:true},
				   	  		  {text: '历史',	iconCls:'book_open',xtype:'button',	itemId:'BTN_HISTORY'},
				   	  		  {text: '筛选', glyph:0xf002,xtype:'button',itemId:'BTN_QUERY'},
				   	  		  {text:'刷新',iconCls:'refresh_backwards',
			   	  				    handler:function(){
			   	  				    	me.store.loadPage(1);
			   	  				    }},
							  {text: '退出',iconCls:'',itemId:'btn_out', handler:function(){me.close();}}
				   	  		  ]
				    			},{
					    		xtype : 'pagingbar',
			                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
					    		dock:'bottom',
					    		displayInfo:true,
					    		defaultPageSize : 50,
					    		store:me.store
					    	}],
			    	listeners : {
							selectionchange : function(grid, recs) {
								if (recs.length > 0) {
									me.setMainBtnStatus(false);
									me.dStore.load({params:{tjdh:recs[0].get('tjdh')}});
								} else {
									me.dStore.load({params:{tjdh:-1}});
									me.setMainBtnStatus(true);
								}
							},
							itemdblclick:function(t,rec,item,index){
								var isEdit=true;
								var czym=erp.Util.currentUser.userInfo.name;
								if(czym!=Ext.String.trim(rec.get('czym'))&&!erp.Util.currentUser.isAdmin){
				    				Ext.toastInfo("非本合同操作员不能编辑!");
									return ;
				    			}
								if(rec.get('sdbj')==1){
									isEdit=false;
								}
								erp.Util.addContentTab({
									xtype:'PerchasePriceMaintain',
									itemId:'PerchasePriceMaintain',
									title : '采购价格调整单编辑',
									isAdd : false,
									isEdit : isEdit,
									mainPanel:this.down('#PerchasePriceGrid'),
									store : me.store,
									rec:rec,
									closable : true
								});
							}
					}
				}]
		        },{
				xtype:'grid',
				region: 'south',
				features: [{
			        	ftype: 'summary',
			        	dock : 'bottom'
			    	}],
			    columns:[
			    	{ dataIndex: 'tjxh',header:'序号',width:45,
						sumaryType : 'count',
						summaryRenderer : function(value,summaryData, dataIndex) {
						return '合计';
						}},
						{ dataIndex: 'csmc' ,header:'供应厂商',width:200},
						{ dataIndex: 'rkrq', xtype:'datecolumn',format:'Y-m-d' ,header:'入库日期',width:90},
						{ dataIndex: 'clhh' ,header:'材料货号',width:80},
						{ dataIndex: 'clmc' ,header:'材料名称',width:310},
						{ dataIndex: 'cltx1' ,header:'规格尺寸',width:80},
						{ dataIndex: 'jldw' ,header:'单位',width:45},
						{ dataIndex: 'rksl',header:'入库数量',width:80,
						  summaryType: 'sum',
						  summaryRenderer: function(value, summaryData, dataIndex) {
						  return Ext.util.Format.number(value,'0,000.000');
						}},
						{ dataIndex: 'rkdj',header:'入库单价',width:80 },
						{ dataIndex: 'rkje', header:'入库金额',width:80,
						    summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value,'0,000.00');
						}},
						{ dataIndex: 'rkdb_yl_wbdj',header:'外币单价',width:80 },
						{ dataIndex: 'rkdb_yl_wbje',header:'外币金额',width:80 },
						{ dataIndex: 'thdj', header:'调后单价',width:80},
						{ dataIndex: 'thje',header:'调后金额',width:80,
							summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value,'0,000.00');
						}},
						{ dataIndex: 'wbdh' ,header:'币种',width:45},
						{ dataIndex: 'wbhl',header:'汇率',width:50},
						{ dataIndex: 'wbdj', header:'调后外币单价',width:100},
						{ dataIndex: 'wbje', header:'调后外币金额',width:100},
						{ dataIndex: 'bzsm' ,header:'调价说明',width:290},
						{ dataIndex: 'ckmc' ,header:'仓库',width:90},
						{ dataIndex: 'rkdh', header:'入库单号',width:80},
						{ dataIndex: 'rkxh', header:'入库序号',width:80},
						{ dataIndex: 'cpmc' ,header:'产品名称',width:120},
						{ dataIndex: 'zcpmc' ,header:'主产品名称',width:260}
			    ],
//				columns:me.DetailColumns,
				reference:'PerchasepriceSouthGrid',
				split:true,
				flex:1,
				store:me.dStore
			}]
		});
		this.callParent();
	},
	//设置按钮状态
	setMainBtnStatus:function(sts){
		var me=this;
		var tool=me.down('#PerchasepriceMainToolBar');
		tool.down('#BTN_EDT').setDisabled(sts);
		tool.down('#BTN_DEL').setDisabled(sts);
		tool.down('#lock').setDisabled(sts);
		tool.down('#BTN_REFER').setDisabled(sts);
		tool.down('#BTN_SIGN').setDisabled(sts);
		tool.down('#BTN_BACKUP').setDisabled(sts);
	}
});