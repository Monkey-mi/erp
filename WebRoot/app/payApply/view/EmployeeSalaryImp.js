Ext.define('erp.payApply.view.EmployeeSalaryImp', {
			extend : 'erp.ux.Panel',
			alias : 'widget.Imp_EmployeeSalary',
			initComponent : function() {
				var me = this;
				me.can_use_btn = true;
				Ext.apply(me.store.proxy.extraParams, {
							gznf : me.year,
							gzyf : me.month,
							msbh : me.msbh,
							gzxm : me.gzxm,
							czyh : me.czyh,
							usePaging : true
						});
				Ext.apply(me, {
							layout : {
								type : 'border',
								padding : 2
							},
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'top',
										itemId : 'function_btn',
										items : [

												{
													text : '确定',
													iconCls : 'accept',
													itemId : 'btn_confirm'
												}
												 ,
												{
													text : '退出',
													iconCls : 'page_error',
													itemId : 'btn_out',
													handler : function() {
														me.close();
													}
												}]
									}],

							items : [{
	    						xtype:'treepanel',
	    						region:'west',
	    						itemId:'Employeetree',
	    						collapsible:true,
	    						width:200,
	    						split:true,
	    						store : Ext.create('erp.payApply.store.EmployeeDeptTree',{autoLoad:true}),
	    						listeners:{
	    				 		   	'itemclick':function(t,rec){
	    				  				if(rec.get('nodeId')!=0){
	    				  					me.store.proxy.extraParams.bzbh=rec.get('nodeId');
	    				  					me.store.loadPage(1);
	    				 	 			}else{
	    				  					delete me.store.proxy.extraParams.bzbh;
	    				  					me.store.loadPage(1);
	    				  				}
	    			 			 	}
	    						}
	    					},{
								flex : 1,
								region : 'center',
								xtype : 'grid',
								itemId : 'grd_EmployeeSalary',
								overflowY : 'auto',
								overflowX : 'auto',
								features : [{
											ftype : 'summary',
											summaryType : 'count',
											dock : 'bottom'
										}],
								/*
								 * listeners : { selectionchange :
								 * function(grid, recs) { if (recs.length > 0) {
								 * me.setMainBtnStatus(false);
								 * me.dStore.load({params:{tjdh:recs[0].get('tjdh')}}); }
								 * else { me.dStore.load({params:{tjdh:-1}});
								 * me.setMainBtnStatus(true); } },
								 * itemdblclick:function(t,rec,item,index){ var
								 * isEdit=true; if(rec.get('sdbj')==1){
								 * isEdit=false; } erp.Util.addContentTab({
								 * xtype:'edt_PrepayAdjustment',
								 * itemId:'edt_PrepayAdjustment', title :
								 * '预付调整单编辑', isAdd : false, isEdit : isEdit,
								 * mainPanel:this.down('#grd_PrepayAdjustment'),
								 * store : me.store, rec:rec, closable : true
								 * }); } },
								 */
								columns : [ {
									header : '职工工号',
									dataIndex : 'zggh',
									width : 100
								}, {
									header : '姓名',
									dataIndex : 'zgxm',
									width : 100
								}, {
									header : '核算部门',
									dataIndex : 'hsbm',
									width : 100
								}, {
									header : '所属部门',
									dataIndex : 'bzbh',
									width : 100
								}, {
									header : '实发工资',
									dataIndex : 'gzxm',
									width : 100
								}],
								dockedItems : [{
											xtype : 'pagingbar',
											stateId : "pagingbar"+Ext.id(),
											store : me.store,
											dock : 'bottom',
											defaultPageSize : 50,
											displayInfo : true
										}],
								store : me.store
							}

							]
						});
				me.callParent(arguments);
			}
		});