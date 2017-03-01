Ext.define('erp.view.master.caterialPriceApproval.CaterialPriceApproval',{
	extend:'erp.ux.Panel',
	alias:'widget.CaterialPriceApproval',
	requires:[
		'erp.view.master.caterialPriceApproval.CaterialPriceApprovalCtl',
		'erp.ux.PagingBar',
		'erp.ux.SelectField',
		'erp.view.master.caterialPriceApproval.store.CaterialPriceApproval',
		'erp.view.master.caterialPriceApproval.CaterialPriceApprovalModel',
		'erp.view.master.caterialPriceApproval.store.CaterialPriceCompany',
		'erp.view.master.caterialPriceApproval.store.CaterialPriceDetail'
	],
	controller:'CaterialPriceApprovalCtl',
	xtype: 'CaterialPriceApproval',
	layout: {
        type: 'border'
    },
    viewModel: {
        type: 'caterialPriceApproval'
    },
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.caterialPriceApproval.store.CaterialPriceApproval');
		me.store.on({
			'load':function(s,recs){
				var grid=me.down('#CaterialPriceApprovalGrid');
				//grid初始化选中第一项
				erp.Util.gridSelect(grid,recs);
			}
		});
		me.store.load();
		me.ct=me.getController();
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		me.dStore=Ext.create('erp.view.master.caterialPriceApproval.store.CaterialPriceDetail');
		me.dStore.on({
			'load':function(s,recs){
				var grid=me.down('#CaterialPriceDetailGrid');
				//自适应列宽
				//erp.Util.gridAutoColumnsWidth(grid);
				//grid初始化选中第一项
				erp.Util.gridSelect(grid,recs);
			}
		})
		me.cStore=Ext.create('erp.view.master.caterialPriceApproval.store.CaterialPriceCompany');
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'CaterialPriceApprovalBar',
	    	items:[{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
			   	  {text: '修改',	iconCls:'page_edit',	itemId:erp.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
			   	  {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
			   	   '-',
			   	  {text: '锁定',iconCls:'permssion',itemId:'lock',disabled:true},
			   	  {text: '签发', iconCls:'email_edit',itemId:'BTN_SIGN', disabled:true},
				   '-',
				  {text: '归档',	iconCls:'book_next',xtype:'button',	itemId:'BTN_BACKUP',disabled:true},
	   	  		  {text: '历史',	iconCls:'book_open',xtype:'button',	itemId:'BTN_HISTORY'},
				  {text: '刷新控价',iconCls:'',itemId:'refreshPrice', disabled:true}
			]
	    			}],
		this.items= [{
		        region: 'center',
		        xtype:'grid',
		        reference:'CaterialPriceApprovalGrid',
		        itemId:'CaterialPriceApprovalGrid',
				columns:me.MainColumns,
				store:me.store,
				flex:2,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				dockedItems:[{
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
								me.loadDetail(recs[0]);
							} else {
								me.dStore.load({params:{jlbh:-1}});
								me.setMainBtnStatus(true);
							}
						},
						itemdblclick:function(t,rec,item,index){
							var ctl=me.getController(); 
							ctl.edtShow(rec,false,true);
						}
				}
			},{
				xtype:'panel',
				region: 'south',
				split:true,
				flex:1,
				layout: {
			        type: 'border'
			    },
			    items:[{
			    	xtype:'grid',
			    	region: 'center',
			    	reference:'CaterialPriceDetailGrid',
		        	itemId:'CaterialPriceDetailGrid',
			    	flex:1,
			    	columns:[
						{header:'序号',dataIndex:'jlxh',width:40},
			   	  	  	{header:'',dataIndex:'spjg1',width:80,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg1.text}',
						    	 hidden:'{spjg1.hidden}'
						    }
		   	  	  		},
		   	  	  		{header:'',dataIndex:'spjg2',width:80,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg2.text}',
						    	 hidden:'{spjg2.hidden}'
						    }
		   	  	  		},
		   	  	  		{header:'',dataIndex:'spjg3',width:80,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg3.text}',
						    	 hidden:'{spjg3.hidden}'
						    }
		   	  	  		},
		   	  	  		{header:'',dataIndex:'spjg4',width:80,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg4.text}',
						    	 hidden:'{spjg4.hidden}'
						    }
		   	  	  		},
		   	  	  		{header:'',dataIndex:'spjg5',width:80,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg5.text}',
						    	 hidden:'{spjg5.hidden}'
						    }
		   	  	  		}
		   	  	  	],
		   	  	  	store:me.dStore,
			    	listeners : {
							selectionchange : function(grid, recs) {
								var rec=recs[0];
								if (recs.length > 0&&rec.get('jlxh')!=null) {
									me.down('#CaterialPriceCompanyGrid').getSelectionModel().deselectAll();
									me.cStore.load({params:{jlbh:rec.get('jlbh'),jlxh:rec.get('jlxh')}});
								} else {
									me.cStore.load({params:{jlbh:-1}});
								}
							}
					}
			    },{
			    	xtype:'grid',
			    	split:true,
			    	region: 'east',
			    	reference:'CaterialPriceCompanyGrid',
		        	itemId:'CaterialPriceCompanyGrid',
			    	flex:1,
			    	columns:[
						{header:'厂商编号',dataIndex:'csbh',width:90},
			   	  	  	{header:'厂商名称',dataIndex:'csmc',width:200}
		   	  	  	],
		   	  	  	store:me.cStore
			    }]
			}]
		this.callParent();
	},
	//设置按钮状态
	setMainBtnStatus:function(sts){
		var me=this;
		var tool=me.down('#CaterialPriceApprovalBar');
		tool.down('#BTN_EDT').setDisabled(sts);
		tool.down('#BTN_DEL').setDisabled(sts);
		tool.down('#lock').setDisabled(sts);
		tool.down('#BTN_SIGN').setDisabled(sts);
		tool.down('#BTN_BACKUP').setDisabled(sts);
		tool.down('#refreshPrice').setDisabled(sts);
	},
	loadDetail:function(rec){
		var me=this;
		var dgrid=me.down('#CaterialPriceDetailGrid');
		//必须先去除选择
		dgrid.getSelectionModel().deselectAll();
		var vm=me.getViewModel();
		var column=me.ct.getColumnState(rec.get('gsbh'));
		if(column!=true){
			vm.setData(column);
		}
		me.dStore.load({params:{jlbh:rec.get('jlbh')}});
	}
})