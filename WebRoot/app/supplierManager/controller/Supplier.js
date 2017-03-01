/*供应商基本信息控制页*/
Ext.define('erp.supplierManager.controller.Supplier',{
	extend:'Ext.app.Controller',
	requires:['erp.supplierManager.store.SupplierFile',
			  'erp.supplierManager.store.ArchiveSupplierFile',
			  'erp.ux.PagingBar',
			  'erp.supplierManager.store.AppInvoiceTitle',
			  'erp.supplierManager.store.AppDevicelist',
			  'erp.supplierManager.store.AppMetarial',
			  'erp.supplierManager.store.AppCompetitor',
			  'erp.supplierManager.store.AppBankAccount',
			  'erp.supplierManager.store.AppGoods',
			  'erp.supplierManager.store.AppRegisterAttched',
			  'erp.supplierManager.store.AppCustomAttched',
			  'erp.supplierManager.store.AppMainCustomer',
			  'erp.supplierManager.store.AccessScoreSummary',
			  'erp.supplierManager.store.SupplierAccessScoreDetails',
			  'erp.materialConfirmation.store.MaterialCheckclass',
			  'erp.materialConfirmation.store.MaterialCheckDetail',
			  'erp.materialConfirmation.store.MaterialConfirmation',
			  'erp.materialConfirmation.store.MaterialSample',
			  'erp.supplierManager.store.SupplierMaterialSub1',
			  'erp.master.foreigncurrency.store.foreignCurrency',
			  'erp.supplierAccess.model.SupplierFileShow',
			  'erp.supplierAccess.store.SupplierAccessScore'
	],
	views:[
	    'erp.supplierManager.view.SupplierManager'
	 	,'erp.supplierManager.view.WestTab'
	    ,'erp.supplierManager.view.SupplierBaseInfo'
	    ,'erp.supplierManager.view.SupplierMainInfo'
	    ,'erp.supplierManager.view.SupplierFileInfo'	  
		,'erp.supplierManager.view.PurchasingInquiryList'
		,'erp.supplierManager.view.accessToEvaluate.EvaluateMain'
		,'erp.supplierManager.view.materialConfirm.SupplierMaterialConfirm'
		,'erp.supplierManager.view.SupplierQuery'
		,'erp.supplierAccess.view.AccessMainInfo'
		,'erp.supplierAccess.view.SupplierShow'
		,'erp.supplierManager.view.OutFileManager'
	   ],
	refs : [{ref:'mng_panelSupplier',selector : 'SupplierManager'},//管理页面
			{ref:'mng_SupplierTab',selector:'SupplierManager #supplier_tab'},//供应商列表Tab
			{ref:'mng_Suppliergrid',selector:'SupplierManager #grd_Supplier'},//管理页面的供应商列表
			{ref:'mng_ArchivesSuppliergrid',selector:'SupplierManager #grd_ArchiveSupplier'},//归档列表
			{ref:'mng_SupplierPanel',selector:'SupplierManager #plSupplier'},//管理页面的供应商
			{ref:'panelMainInfo',selector:'SupplierMainInfo'},
			{ref:'panel_BaseInfo',selector:'SupplierMainInfo #supplierBaseInfo'},
			{ref:'baseInfo_form',selector:'SupplierBaseInfo #PanelBaseInfo'},//基本信息form
			{ref:'busform_Tab',selector:'SupplierBaseInfo #supplierBusInfo'},//基本信息下界面的业务信息Tab页面
			{ref:'panel_Attched',selector:'SupplierMainInfo #supplierFileInfo'},
			{ref:'panel_materialConfirm',selector:'panel_materialConfirmInfo'},//物料确认Tab信息页面
			{ref:'panel_materalSample',selector:'panel_materialConfirmInfo #materialSample'},
			{ref:'jform',selector:'access_EvaluateBaseInfo  #plEvaluateExamineInfo'},//审核信息
			{ref:'edt_jform',selector:'access_BaseInfo  #plEvaluateExamineInfo'},//审核信息
			{ref:'tree_evaluateNav',selector:'access_EvaluateManager treepanel'},
			{ref:'panl_evaluateDetails',selector:'access_EvaluateItemDetails'}//评估项页面
	],
			
	init:function(){
	
		// controller只初始化一次
		var me = this;
		//该函数将最先执行，甚至先于 appliction.launch
		if (me.isInited)
			return;
		//处理所有view上面的交互
		me.control({
			'access_EvaluateManager treepanel':{
				select:function(rowModel,rec){
					me.onSelectNode(rec);
				}
			},
			//评估信息保存
			'access_EvaluateItemDetails button':{
				click:me.EvaluateDoAction
			},
			//供应商档案列表Grid初始化
			'SupplierManager':{
				afterrender:function(cmp){
					var panel=me.getMng_panelSupplier();
					panel.down('#top_bar4').hide();
					me.mainpanel=panel;
					var store=me.getMng_Suppliergrid().getStore();
					var grid=me.getMng_Suppliergrid();
					me.grdStore=store;

					//归档供应商列表
					me.grdArchiveStore=me.getMng_ArchivesSuppliergrid().getStore();
					var supplierTab=me.getMng_SupplierTab();
					var activeTab=supplierTab.getActiveTab();
					me.supplierTab=0;
					if(activeTab.itemId=='Supplier')
 	 				{
 	 				//当前tab是当前供应商列表
 	 					me.grdStore.proxy.extraParams.usePaging=true;
						me.grdStore.proxy.extraParams.is_delete=0;
						me.grdStore.proxy.extraParams.is_archive=0;
						me.grdStore.load();
						//panel.down('#btn_Archive').setText('归档');
 	 				}
 	 				else if(activeTab.itemId=='grd_ArchiveSupplier')
 	 				{
 	 					me.supplierTab=1;
 	 					//当前tab为归档供应商列表
 	 					me.grdArchiveStore.proxy.extraParams.usePaging=true;
 	 					me.grdArchiveStore.proxy.extraParams.is_delete=0;
						me.grdArchiveStore.proxy.extraParams.is_archive=1;
						me.grdArchiveStore.load();
						//panel.down('#btn_Archive').setText('取消归档');
 	 				}
 	 				
					//功能权限设置
					me.modFuncsDisabled=cmp.modFuncsDisabled;
				},
				beforedestory:function(){
					me.grdStore.proxy.extraParams.history=0;
					//todo:删除检索条件变量的值
					delete me.grdStore.proxy.extraParams.condition;
					delete me.grdStore.proxy.extraParams.is_delete;
					delete me.grdStore.proxy.extraParams.is_archive;
					//归档供应商
					me.grdArchiveStore.proxy.extraParams.history=0;
					delete me.grdArchiveStore.proxy.extraParams.condition;
					delete me.grdArchiveStore.proxy.extraParams.is_delete;
					delete me.grdArchiveStore.proxy.extraParams.is_archive;
				}
			},
			//审核信息保存s
			'access_BaseInfo button':{
				click:me.AccessBaseInfoDoAction
			},
			//编辑新增页面加载、关闭事件
			'SupplierMainInfo':{
				afterrender:function(cmp){
					//新增/修改页面打开时，管理页面禁用
					//me.getMng_panelSupplier().disable();
					
				},
				beforeclose:function(th){
					var grid=me.getMng_Suppliergrid();
					
					var panelBaseInfo=th.down('#supplierBaseInfo');
					if(panelBaseInfo!=null)
					{
					var rec=th.down('#supplierBaseInfo').down('#PanelBaseInfo').getRecord();
					if(rec!=null)
					{
						me.grdStore.reload();
						grid.getSelectionModel().select(me.grdStore.find('company_id',rec.get('company_id')));
					}
					}
				}
				
				
			},
			//新增编辑页面提交按钮事件
			'SupplierBaseInfo #PanelBaseInfo button':{
				click:me.btnEditformAction
			},
			//附件保存按钮事件
			'SupplierFileInfo button':{
				click:me.saveFileUpload
			},
			
			//供应商档案管理界面的按钮事件，如新增、修改、删除
			'SupplierManager #plSupplier button':{
				click:me.doAction
			},
			//其他按钮监控
			'SupplierManager #plSupplier #menu_fun':{
				click:me.doMenuAction
			},
			'SupplierManager #grd_Supplier':{
				selectionchange:function(grid, rec){
					//列表有数据
					if (rec.length > 0) {
						me.setBtnStatus1(false);
						me.setBtnText(rec[0].get('apply_sts'));
						me.mainpanel.SupLoopStore.proxy.extraParams.company_id=rec[0].get('company_id');
						me.mainpanel.SupLoopStore.load();
						//选择某条记录时加载其相关联的业务信息和附件信息，用作删除操作时获取数据
//						var panel=me.getMng_panelSupplier();
//						panel.loadSingleData(rec[0]);
					}
					//列表记录为空
					else
					{
						me.setBtnStatus1(true);
					}
				},
				itemdblclick : function(grid, rec) {
					me.EditSupplierInfo(erp.def.Const.FUNC_ITEMID_BTN_EDT,false);
				}
			},
			'SupplierManager #OutSupplier':{
				itemdblclick : function(grid, rec) {
					var win =Ext.create('erp.supplierManager.view.AccSupplierShow',{
						supplierRec:rec,
						title:'详情查看',
						glyph:0xf0f0,
						isAdd:false,
						isEdit:false,
						closable:true
					});
					win.show();
				}
			},
			'SupplierManager #OutSupplierInvite':{
				itemdblclick : function(grid, rec) {
					var win =Ext.create('erp.supplierAccess.view.SupplierShow',{
						supplierRec:rec,
						title:'供应商查看',
						glyph:0xf0f0,
						isAdd:false,
						isEdit:false,
						closable:true
					});
					win.show();
				}
			},
			'SupplierManager #grd_SupplierLoop':{
				selectionchange:function(grid, rec){
					var panel=me.getMng_panelSupplier();
					//列表有数据
					if (rec.length > 0) {
						panel.down('#btn_SupAuditPass').setDisabled(false);
					}else{
						panel.down('#btn_SupAuditPass').setDisabled(true);
					}
				},
				itemdblclick : function(grid, rec) {
					var grid=me.getMng_Suppliergrid();
					var mrec=grid.getSelectionModel().getSelection()[0];
					if(rec.get('assess_sts')==1){
						Ext.toastInfo('该记录已经审核，不能编辑！');
						return ;
					}
					me.doAccessEvaluateInfo(rec,false,true,mrec)
				}
			},
			'SupplierManager #supplier_tab tab':{
				click:function(button,e,eOpts){
					var panel=me.getMng_panelSupplier();
					var tbar=panel.down('#top_bar2');
					var grid=me.getMng_Suppliergrid();
					switch(button.title){
						case '当前供应商':
							me.supplierTab=0;
							me.grdStore.proxy.extraParams.usePaging=true;
							me.grdStore.proxy.extraParams.is_delete=0;
							me.grdStore.proxy.extraParams.is_archive=0;
							me.grdStore.load();
							panel.down('#btn_Archive').setText('归档');
							panel.down('#btn_Archive').setIconCls('book_next');
							panel.down('#BTN_ADD').setDisabled(false);
							var recs=grid.getSelectionModel().getSelection();
							if(recs.length>0){
								me.setBtnStatus1(false);
								me.setBtnText(recs[0].get('apply_sts'));
							}else{
								me.setBtnStatus1(true);
							}
							panel.down('#top_bar').show();
							panel.down('#top_bar4').hide();
							panel.down('#btn_fun').setDisabled(false);
						break;
						case '归档供应商':
							me.supplierTab=1;
	 	 					//当前tab为归档供应商列表
	 	 					me.grdArchiveStore.proxy.extraParams.usePaging=true;
	 	 					me.grdArchiveStore.proxy.extraParams.is_delete=0;
							me.grdArchiveStore.proxy.extraParams.is_archive=1;
							me.grdArchiveStore.load();
							panel.down('#btn_Archive').setText('取消归档');
							panel.down('#btn_Archive').setIconCls('book_previous');
							panel.down('#BTN_ADD').setDisabled(true);
							panel.down('#BTN_EDT').setDisabled(true);
							panel.down('#BTN_DEL').setDisabled(true);
							//受理
							panel.down('#btn_Accept').setDisabled(true);
							panel.down('#btn_AuditPass').setDisabled(true);
							panel.down('#btn_AuditUnPass').setDisabled(true);
							//取消归档
							panel.down('#btn_Archive').setDisabled(false);
							panel.down('#btn_accessInvite').setDisabled(true);
							panel.down('#btn_accessEvaluate').setDisabled(true);
							panel.down('#BTN_PRINT').setDisabled(true);
							panel.down('#btn_fun').setDisabled(true);
							panel.down('#top_bar').hide();
//							panel.down('#top_bar4').setVisible(true);
							panel.down('#top_bar4').show();
							var grid=panel.down('#grd_ArchiveSupplier');
							var recs=grid.getSelectionModel().getSelection();
							if(recs.length>0){
								me.setBtnStatus2(false);
							}else{
								me.setBtnStatus1(true);
							}
						break
						case '准入邀请':
							me.supplierTab=2;
							panel.down('#BTN_ADD').setDisabled(true);
							panel.down('#BTN_EDT').setDisabled(true);
							panel.down('#BTN_DEL').setDisabled(true);
							//受理
							panel.down('#btn_Accept').setDisabled(true);
							panel.down('#btn_AuditPass').setDisabled(true);
							panel.down('#btn_AuditUnPass').setDisabled(true);
							//取消归档
							panel.down('#btn_Archive').setDisabled(true);
							panel.down('#btn_accessInvite').setDisabled(false);
							panel.down('#btn_accessEvaluate').setDisabled(true);
							panel.down('#BTN_PRINT').setDisabled(true);
							panel.down('#btn_fun').setDisabled(true);
							panel.down('#top_bar').hide();
							panel.down('#top_bar4').show();
						break;
						case '准入受理':
							me.supplierTab=3;
							panel.down('#BTN_ADD').setDisabled(true);
							panel.down('#BTN_EDT').setDisabled(true);
							panel.down('#BTN_DEL').setDisabled(true);
							//受理
							panel.down('#btn_Accept').setText('受理');
							panel.down('#btn_Accept').setDisabled(false);
							panel.down('#btn_AuditPass').setDisabled(true);
							panel.down('#btn_AuditUnPass').setDisabled(false);
							//取消归档
							panel.down('#btn_Archive').setDisabled(true);
							panel.down('#btn_accessInvite').setDisabled(true);
							panel.down('#btn_accessEvaluate').setDisabled(true);
							panel.down('#BTN_PRINT').setDisabled(true);
							panel.down('#btn_fun').setDisabled(true);
							panel.down('#top_bar').hide();
							panel.down('#top_bar4').show();
						break;
					}
				}
			}
			,
			//归档列表
			'SupplierManager #grd_ArchiveSupplier':{
				selectionchange:function(grid, rec){
					if(rec.length>0)
					{
						me.setBtnStatus2(false);
					}
					else
					{
						me.setBtnStatus2(true);
					}
				}
			},
			//物料确认列表选择事件
			'panel_materialConfirmInfo #grd_materialConfirm':{
				selectionchange:function(grid, rec){
					//列表有数据
					if(rec.length > 0)
					{
						var mateConfirmlPanel=me.getPanel_materialConfirm();
					
						mateConfirmlPanel.loadCheckDetailsByConfirmId(rec[0].get('confirmation_id'));
					}
				}
			}
			,'panel_materialConfirmInfo #materialSample #sampleGrid':{
			selectionchange:function(grid, rec){
					var samplePanel=me.getPanel_materalSample();
					if(rec.length>0)
					{
						
						//加载检测明细
						samplePanel.checkDetailStore.load({
						params:{sample_id:rec[0].get('sample_id')},
						callback:function(records){
						
							}});
						
					}
				}
			}
			,
			//查询框回车事件
			'SupplierManager #plSupplier #search':{
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.doQuery();
					}
				}
			},
			'mng_WestTab #levelclass' : {
						select : function(rowModel, rec) {
							
							var panel = me.getMng_panelSupplier();
							panel.loadGridByTreeNodeId(rec,1);
						}
					},
			'mng_WestTab #materialclass' : {
						select : function(rowModel, rec) {
							//叶节点
							if(rec.get('leaf')==true)
							{
								var panel = me.getMng_panelSupplier();
								panel.loadGridByTreeNodeId(rec,2);
							}
						}
					}
			
		});
		// controller初始化完成
		this.isInited = true;
	},
	doMenuAction:function(menu,btn){
		var me=this;
		var panel=me.getMng_panelSupplier();
		var czym=erp.UInfo.currentUser.name;
		var tabPanel=panel.down('#supplier_tab');
		var supLoopStore = panel.SupLoopStore;
		switch (btn.itemId) {
			case 'btn_fun1':
				var grid=me.getMng_Suppliergrid();
				var recs=grid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.toastInfo('请至少选择一条记录！')
					break;
				} 				
				var rec=recs[0];
				var record_id=rec.get('record_id');
				if(record_id==null||record_id==0){
					Ext.toastInfo('【'+rec.get('cpyname_cn')+'】,无平台信息！')
					break;
				}
				var win=Ext.create('erp.supplierManager.view.OutFileManager',{
					record_id:record_id,
					company_id:rec.get('company_id'),
					company_out_id:rec.get('company_out_id')
				});
				win.show();
			break;
		}
	},	
	/*主面板按钮响应*/
	doAction : function(btn) {
		var me=this;
		var panel=me.getMng_panelSupplier();
		var czym=erp.UInfo.currentUser.name;
		var tabPanel=panel.down('#supplier_tab');
		switch (btn.itemId) {
			//管理页面的新增、修改按钮事件
			case erp.def.Const.FUNC_ITEMID_BTN_ADD:
			case erp.def.Const.FUNC_ITEMID_BTN_EDT:
				this.EditSupplierInfo(btn.itemId,true);
				break;
			case erp.def.Const.FUNC_ITEMID_BTN_DEL:
				this.doDeleteSupplier();
				break;
			case 'btn_search':
				this.doQuery();
				break;
			//修改供应商状态
			case 'btn_Accept':
			case 'btn_AuditPass':
			case 'btn_AuditUnPass':
				var activeTab=tabPanel.activeTab;
				var tabTitle=activeTab.title;
				switch(tabTitle){
					case '当前供应商':
						this.doSupplierStatus(btn);
					break;
					case '准入受理':
						this.doAccStatus(btn);
					break;
				}
				
			case 'btn_Archive':
				this.doArchive(btn);
				break;
			case 'btn_reflash':
				this.doReflash();
				break;
			case 'btn_queryMore':
				var activeTab=tabPanel.activeTab;
				var tabTitle=activeTab.title;
				switch(tabTitle){
					case '当前供应商':
						var win=Ext.widget('supplierMoreQuery',{
							itemId:'supplierMoreQuery',
							mainstore:me.grdStore,
							mainview:me.mainpanel,
							rec:Ext.create('erp.supplierManager.model.supplierQueryParam')
						});
						win.show();
					break;
				}
				break;
			case 'btn_accessEvaluate':
			    
				var grid=me.getMng_Suppliergrid();
				var mrec=grid.getSelectionModel().getSelection()[0];
//				var loop_id = 0;
//				var result = erp.Const.callServiceMethodSync('supplier/appSupplierAccessLoop.srm?method=getAppSupplierAccessLoopList',{company_id:mrec.get('company_id')});
//			    if(result!=null){
//			       var data = Ext.decode(result);
//			       loop_id = data.loop_id;
//			    }
//			    
//			    console.log(data.loop_id);
//			    console.log(loop_id);
				var rec=Ext.create('erp.supplierManager.model.AppSupplierAccessLoop',{
					loop_id:0,
					company_id:mrec.get('company_id'),
					assess_dt:new Date()
				});
				rec.phantom=true;
				me.doAccessEvaluateInfo(rec,true,true,mrec);
			break;
			case 'btn_SupAuditPass':
				var grid=panel.down('#grd_SupplierLoop');
				var store=grid.getStore();
				var recs=grid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.toastInfo('请至少选择一条准入评估历史记录！')
					break;
				}
				var rec=recs[0];
				var assess_sts=rec.get('assess_sts');
				var bool=false;
				var bb='确认';
				var loop_ids=new Array();
				Ext.each(recs,function(rec){
					if(assess_sts!=rec.get('assess_sts')){
						Ext.toastInfo('请选择审核状态一致的记录！');
						bool=true;
						return false;
					}
					loop_ids.push("'"+rec.get('loop_id')+"'");
				})
				if(bool){
					break;
				}
				if(assess_sts==1){
    				assess_sts=0;
    				bb='取消';
    			}else{
    				assess_sts=1;
    			}
    			Ext.Msg.confirm('提示', '是否'+bb+'审核所选记录？', function(btn) {
					if (btn == 'yes') {
						var sql  =" update t_app_supplier_access_loop set assess_sts="+assess_sts+",assess_sts_op='"+czym+"',assess_sts_dt=getdate() where  loop_id in ("+loop_ids.join(',')+")  ";
						var result = erp.Const.callServiceMethodSync('supplier/supplierFile.srm?method=getStringFromSql',
						{sql : sql});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return ;
						}
						Ext.each(recs,function(rec){
							rec.set('assess_sts_dt',new Date());
							rec.set('assess_sts_op',czym);
							rec.set('assess_sts',assess_sts);
							rec.commit();
						})
					}
    			})
			break;
			case 'btn_accessInvite':
				var grid=panel.down('#OutSupplierInvite');
				var recs=grid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.toastInfo('请至少选择一条供应商记录！');
			   		break ;
				}
				Ext.Msg.confirm('提示','你确定要邀请所选供应商?',function(btn){
				 	if(btn=='yes'){
				 		var companyStr=new Array();
				 		Ext.each(recs,function(r){
				 			companyStr.push(r.get('cpyname_cn'));
				 		})
				 		var companyId=erp.Const.companyId;//供应商id
				 		var accountMap=erp.UInfo.currentUser.accountMap;
				 		var login_id='';
				 		if(accountMap!=null){
				 			Ext.each(accountMap,function(acc){
				 				if(acc.sys_name=='SRM'){
				 					login_id=acc.ref_u_id;
				 				}
				 			})
				 		}
				 		if(login_id==''){
				 			Ext.toastInfo('请分配平台对应账户！');
							return ;
				 		}
				 		var result = erp.Const.callServiceMethodSync('supplierAccess/common.srm?method=getAccessInvite',
						{companyId : companyId,companyStr:companyStr.join(";"),login_id:login_id});
						var data = Ext.decode(result);
						if (data.message) {							
							Ext.toastInfo(data.message);
							return ;
						}else{
							Ext.each(recs,function(r){
			 					r.set('invite_status',1);
			 				})							
						}						
				 	}
				})
			break;
		}
	},
	/*修改、新增供应商按钮事件*/
	EditSupplierInfo:function(itemId,isEdit){
		var me=this; 
		var rec,isAdd;
		var grid=me.getMng_Suppliergrid();
		//为其他同类页面何用做准备，如编辑，复制
		switch(itemId){
			case erp.def.Const.FUNC_ITEMID_BTN_ADD://新增按钮
				var today=Ext.Date.format(new Date(),'Y-m-d H:i:s');
				rec=Ext.create('erp.supplierManager.model.SupplierFile',{
				 	//申请状态,5:外部是已提交未审核，作为内部新增的状态
				 	apply_sts:5,
				 	create_dt:today,
				 	version:0,
				 	//行业类目编号
				 	class_id:0,
				 	//企业性质编号
				 	nature_id:0
				 });
				isAdd=true;
				isEdit=true;
				break;
			case erp.def.Const.FUNC_ITEMID_BTN_EDT:
				rec=grid.getSelectionModel().getSelection()[0];
				isAdd=false;
			break;
		}
		var opentitle='新增供应商';
		var openglyph=0xf234;
		if(!isAdd&&isEdit){
			opentitle='修改供应商';
			openglyph=0xf0f0;
			//增加管控只有【已提交】与【审核中】状态下的记录才允许进行修改编辑。
			var value=rec.get('apply_sts');
			if(value<5||value>10)
			{
				Ext.toastInfo('只有【已提交】与【审核中】状态下的记录才允许进行修改编辑');
			   	return ;  	  						
			}
		}else if(!isAdd||!isEdit){
			opentitle='查看供应商';
			openglyph=0xf0f0;
		}
		var win=Ext.widget('SupplierMainInfo',{
			//新增、修改页面
			itemId:'supplierMainInfo',
			title:opentitle,
			glyph:openglyph,
			supplierRec:rec,
			isAdd:isAdd,
			isEdit:isEdit,
			store:grid.getStore(),
			modFuncsDisabled:me.modFuncsDisabled,
			closable:true
		});
		win.show();
	},
	
	/*供应商提交、修改保存表单*/
	btnEditformAction:function(btn){
		
		var me=this;
		var mainPanel=me.getPanelMainInfo();
		var formpanel=me.getPanel_BaseInfo();
		var isAdd=mainPanel.isAdd;
		var isEdit=mainPanel.isEdit;
		//基本信息form
		var form=me.getBaseInfo_form();
		//获取界面数据
		var rec=form.getRecord();		
		//联系地址 省市县+详细地址
		var province = form.down('#area_pro_contact').getRawValue();
		var city = form.down('#area_city_contact').getRawValue();
		var county = form.down('#contact_addr_code').getRawValue();
		var realtedAddress = province+city+county+rec.get('contact_addr');
		rec.set('realtedAddress',realtedAddress);
		var recc;
		if(isEdit){
		var grid=me.getMng_Suppliergrid();
		recc=grid.getSelectionModel().getSelection()[0];		
		}
		//业务信息Tab页面
		var buspanel=me.getBusform_Tab();
		//附件
		var registerAttchedPanl=me.getPanel_Attched();
		
		switch(btn.itemId){
			case 'BTN_SAVE':
			form.updateRecord(rec);	
			var count=erp.Const.callServiceMethodSync('supplier/supplierFile.srm?method=getCountByName',{
				cpyname_cn:rec.get('cpyname_cn'),company_id:rec.get('company_id')
			 });
			 if(count>0){
			 	Ext.Msg.alert('提示','当前名称的供应商已存在，不能重名！');
				return;
			 }
			if(form.getForm().isValid()&&form.getForm().isDirty())
			{
				//厂商类别是否选到最末级
				if(!formpanel.isLastMaterialClass)
			 	{
			 		Ext.Msg.alert('提示','厂商类别请选到最末级！');
					return;
			 	}
			 Ext.Msg.confirm('提示','你确定要保存供应商基本信息及业务信息吗?',function(btn){
			 	if(btn=='yes')
			 	{
			 		//更新数据到数据库
			 		var is_chinese=rec.get('is_chinese');
			 		//如果是国外供应商，则把注册地址联系地址的地区基础数据设置为空
			 		if(is_chinese!=0)
			 		{
			 			rec.set('reg_addr_code',null);
			 			rec.set('contact_addr_code',null);
			 		}
			 		var reg_fund=rec.get('reg_fund');
			 		if(reg_fund<=0)
			 		{
			 			Ext.Msg.alert('提示','注册资金不为空且大于零！');
						return;
			 		}
			 		
			 		//前端业务信息数据判断
			 		//银行账号默认值只能设置一个
			 		var bankaccountRecs=buspanel.bankAccountStore.getRange();
			 		var bankDefaultCount=0;
			 		for(var i=0;i<bankaccountRecs.length;i++)
			 		{
			 			var current= bankaccountRecs[i].get('default_id');				
						if(current==true||current==1)
						{
							bankDefaultCount++;
						}
						
			 		}
			 		
					if(bankDefaultCount>1)
					{
						Ext.Msg.alert('提示','银行账号的默认只有一个，请重新设置！');
						return;
					}
					//发票抬头的默认只能设置一个
			 		var invoiceRecs=buspanel.invoicestore.getRange();
			 		var invoiceDefaultCount=0;
			 		for(var i=0;i<invoiceRecs.length;i++)
			 		{
			 			var current= invoiceRecs[i].get('default_id');				
						if(current==true||current==1)
						{
							invoiceDefaultCount++;
						}
						
			 		}
					if(invoiceDefaultCount>1)
					{
						Ext.Msg.alert('提示','发票抬头的默认只有一个，请重新设置！');
						return;
					}
					//设置操作人和操作时间
					rec.set('operator',erp.UInfo.currentUser.name);
					rec.set('operater_dt',new Date());
					//厂商类别改成三级联动，最后一级可多选
					var materialClass_1=formpanel.down('#materialClass_1');
					var materialClass_2=formpanel.down('#materialClass_2');
			 		var materialClass_3=formpanel.down('#materialClass_3');
			 		
					var mc_id_2_str='';
			 		//第三级可为空
			 		var mc_id_3_str='';
			 		//先清空第二级、第三级存放的store表
			 		formpanel.supplierMaterialSub1Store.removeAll();
			 		
			 		
			 		//第三级下拉不为空,取第三级
					if(!Ext.isEmpty(materialClass_3.value)&&materialClass_3.value.length>0)
					{
			 			mc_id_3_str=materialClass_3.value[0];
			 			for(var i=0;i<materialClass_3.value.length;i++)
			 			{
			 				if(i>0)
			 				{
			 					mc_id_3_str+=','+materialClass_3.value[i];
				 			}
				 			var s_m_model=Ext.create('erp.supplierManager.model.SupplierMaterialSub1',{
				 				mc_id:materialClass_3.value[i],
				 				create_dt:new Date()
				 			});
				 			//将界面上的第三级下拉列表框中选择的选项逐个添加到supplierMaterialInfoStore中
				 			formpanel.supplierMaterialSub1Store.add(s_m_model);
			 			}
			 			
					}
					//取第二级作为最末级材料类别存入关联表中
					else
					{
						if(!Ext.isEmpty(materialClass_2.value)&&materialClass_2.value.length>0)
			 			{
			 				mc_id_2_str=materialClass_2.value[0];
			 				for(var i=0;i<materialClass_2.value.length;i++)
			 				{
			 					if(i>0)
			 					{
			 						mc_id_2_str+=','+materialClass_2.value[i];
			 					}
			 					var s_m_model1=Ext.create('erp.supplierManager.model.SupplierMaterialSub1',{
				 				mc_id:materialClass_2.value[i],
				 				create_dt:new Date()
				 				});
				 				formpanel.supplierMaterialSub1Store.add(s_m_model1);
			 				}
			 			}
					}
					if(mc_id_2_str=='')
					{
						//保存第二级id
						if(!Ext.isEmpty(materialClass_2.value)&&materialClass_2.value.length>0)
			 			{
			 				mc_id_2_str=materialClass_2.value[0];
			 				for(var i=0;i<materialClass_2.value.length;i++)
			 				{
			 					if(i>0)
			 					{
			 						mc_id_2_str+=','+materialClass_2.value[i];
			 					}
			 					
			 				}
			 			}
					}
			 		rec.set('mc_id_1',materialClass_1.value);
			 		rec.set('mc_name_1',materialClass_1.rawValue);
			 		rec.set('mc_id_2',mc_id_2_str);
			 		rec.set('mc_name_2',materialClass_2.rawValue);
			 		rec.set('mc_id_3',mc_id_3_str);
			 		rec.set('mc_name_3',materialClass_3.rawValue);
					var reg_fund=rec.get('reg_fund');
			 		var fwlx=rec.get('fwlx');
					var name=''
					Ext.Array.each(fwlx,function(s,index){
						name+=s;
						if(index<fwlx.length-1){
							name+=','
						}
					});
					rec.set('fwlx',name);
			 		//新增保存
					
					if(isAdd)
					{
						//将新增的记录添加到store
						formpanel.store.add(rec);
						//me.grdStore.add(rec);
						formpanel.store.sync({
							success:function(e,batch){
								var newSupplier=batch.operations.create[0];
								if(newSupplier!=null)
								{
									//重新加载新增的供应商信息，包括后台生成的Company_id等后台生成字段信息
									form.loadRecord(newSupplier);
									var array_2=[];
									array_2=newSupplier.get('mc_id_2').split(',');
									formpanel.down('#materialClass_2').setValue(array_2);
									var array_3=[];
									array_3=newSupplier.get('mc_id_3').split(',');
									formpanel.down('#materialClass_3').setValue(array_3);
									
									registerAttchedPanl.company_id=newSupplier.get('company_id');
									registerAttchedPanl.SaveAttchedData(newSupplier);
									//将新增的供应商Id赋值给供应商材料类别第三级下拉列表store中
									formpanel.setCIdToSupplierMaterial(newSupplier);
									//业务信息company_id设置
									buspanel.SavebusData(newSupplier);
									
									//业务信息保存数据
									buspanel.devicelistStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
			 						buspanel.invoicestore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.metarialStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
									buspanel.maincustomerStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.competitorStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.bankAccountStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.goodsStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						formpanel.supplierMaterialSub1Store.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
								}
								//todo:业务信息的保存
								Ext.Msg.alert('提示','新增成功！');
//								me.grdStore.reload();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败!');
											return;
										}
						});
						mainPanel.isAdd=false;
						formpanel.isEdit=true;
						return;
					}
					//修改保存
					else
					{
						
						formpanel.store.sync({
							success:function(e,batch){
								
								var updateSupplier=batch.operations.update[0];
								formpanel.setCIdToSupplierMaterial(updateSupplier);
								formpanel.supplierMaterialSub1Store.each(function(ss){
			 						  ss.set('record_id',updateSupplier.get('record_id'));
			 						});
								formpanel.supplierMaterialSub1Store.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
//								form.loadRecord(newSupplier);
//								me.grdStore.reload();
			 					//Ext.Msg.alert('提示','修改成功！');
							},
							failure : function(batch, options) {
								
								Ext.Msg.alert('提示', '保存失败!');
								return;
							}
						});
						
					
					//业务信息保存数据
						            buspanel.devicelistStore.each(function(der){
			 						  der.set('record_id',recc.get('record_id'));
			 						});
									buspanel.devicelistStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.invoicestore.each(function(inr){
			 						  inr.set('record_id',recc.get('record_id'));
			 						});
			 						buspanel.invoicestore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.metarialStore.each(function(mer){
			 						  mer.set('record_id',recc.get('record_id'));
			 						});
			 						buspanel.metarialStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.maincustomerStore.each(function(mr){
			 						  mr.set('record_id',recc.get('record_id'));
			 						});
									buspanel.maincustomerStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						//TODO
			 						buspanel.competitorStore.each(function(dr){
										dr.set('record_id',recc.get('record_id'));
									});
			 						buspanel.competitorStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.bankAccountStore.each(function(bar){
			 						  bar.set('record_id',recc.get('record_id'));
			 						});
			 						buspanel.bankAccountStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.goodsStore.each(function(gr){
			 						  gr.set('record_id',recc.get('record_id'));
			 						});
			 						buspanel.goodsStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
			 						Ext.Msg.alert('提示','修改成功！');
					}
			 	}
			 	var panel=me.getMng_panelSupplier();
				panel.down('#search').setValue('');
				delete me.grdStore.proxy.extraParams.condition;
			 });
			}
		break;
		}
	}
	
	,/* 修改按钮状态*/
	setBtnStatus1 : function(sts) {
		var me = this;
		var panel = me.getMng_SupplierPanel();
		panel.down('#BTN_EDT').setDisabled(sts);
		panel.down('#BTN_DEL').setDisabled(sts);
		//受理
		panel.down('#btn_Accept').setDisabled(sts);
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
		//归档
		panel.down('#btn_Archive').setDisabled(sts);
		//准入评估
		panel.down('#btn_accessEvaluate').setDisabled(sts);
	},
	/*归档列表为当前列表时的按钮状态修改*/
	setBtnStatus2:function(sts)
	{
		var me = this;
		var panel = me.getMng_SupplierPanel();
		//取消归档
		panel.down('#btn_Archive').setDisabled(sts);
	}
	,
	/*供应商状态变化操作按钮导致的状态变化，如受理、审核通过、不合格*/
	setBtnText:function(apply_sts)
	{
		var me = this;
		var panel = me.getMng_SupplierPanel();
		if(apply_sts>=5&&apply_sts<10)
		{
			panel.down('#btn_Accept').setText('受理');
			panel.down('#btn_AuditPass').setText('审核通过');
			panel.down('#btn_AuditUnPass').setText('不合格');
			panel.down('#btn_AuditPass').setDisabled(true);
			panel.down('#btn_AuditUnPass').setDisabled(true);
			panel.down('#btn_Archive').setDisabled(true);
		}
		else if(apply_sts>=10&&apply_sts<15)
		{
			panel.down('#btn_Accept').setText('取消受理');
			panel.down('#btn_AuditPass').setText('审核通过');
			panel.down('#btn_AuditUnPass').setText('不合格');
		}
		else if(apply_sts=15)
		{
			panel.down('#btn_Accept').setText('受理');
			panel.down('#btn_AuditPass').setText('取消审核');
			panel.down('#btn_AuditUnPass').setText('不合格');
			panel.down('#btn_Accept').setDisabled(true);
			panel.down('#btn_AuditUnPass').setDisabled(true);
		}
		else if(apply_sts=20)
		{
			panel.down('#btn_Accept').setText('受理');
			panel.down('#btn_AuditPass').setText('审核通过');
			panel.down('#btn_AuditUnPass').setText('取消审核');
			panel.down('#btn_Accept').setDisabled(true);
			panel.down('#btn_AuditPass').setDisabled(true);
		}
	}
	
	,
	/*保存附件store到数据库*/
	saveFileUpload:function(btn){
		var me=this;
		
		var attchedPanel=me.getPanel_Attched();
		
		switch(btn.itemId){
			case 'BTN_SAVE':
			
				Ext.Msg.confirm('提示','你确定要保存上传的附件吗?',function(btn){
			 	if(btn=='yes')
			 	{
//					var recs=attchedPanel.registerAttchedStore.getRange();
//					var company_id=recs[0].get('company_id');

			 		var company_id=attchedPanel.company_id;
					
			 		attchedPanel.registerAttchedStore.sync({
			 			success:function(){
			 				
			 				attchedPanel.registerAttchedStore.load({params:{company_id:company_id,iscustom:0}});
			 				//放里面，防止attchedstore新增没完成时customAttchedStore获取到的ID值不是最大值而导致插入失败
//			 				attchedPanel.customAttchedStore.sync({
//			 					success:function(){
//			 						attchedPanel.customAttchedStore.load({params:{company_id:company_id,iscustom:1}});
//			 						
//			 					},
//			 					failure : function(batch, options) {
//											Ext.Msg.alert('提示', '保存失败!');
//											return;
//										}
//			 					});
			 				
			 			},
			 			failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败!');
											return;
										}
			 		});
			 		attchedPanel.customAttchedStore.sync({
			 					success:function(){
			 						attchedPanel.customAttchedStore.load({params:{company_id:company_id,iscustom:1}});
			 						
			 					},
			 					failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败!');
											return;
										}
			 					});
			 		//删除附件文件
			 		attchedPanel.deleteUploadFile();
			 		Ext.Msg.alert('提示','保存成功！');
			 		return;
			 	}
			 	});
			
			break;
		}
	},
	/*准入受理状态*/
	doAccStatus:function(btn){
		var me=this;
		var panel=me.getMng_panelSupplier();
		var grid=panel.down('#OutSupplier');
		var store=grid.getStore();
		var recs=grid.getSelectionModel().getSelection();
		var access_status=3;
		if(recs.length==0){
			Ext.toastInfo('请至少选择一条明细！');
			return ;
		}
		var records=erp.Util.ModelsToJson(recs);
		switch(btn.itemId){
			//受理
			case 'btn_Accept':
				Ext.Msg.confirm('提示', '是否确认受理所选厂商？', function(btn) {
					if (btn == 'yes') {
						me.doSupplierAccessChange(records,access_status,'');
					}
				})
			break;
			//不合格
			case 'btn_AuditUnPass' :
				access_status=4;
				var win=Ext.create('erp.supplierAccess.view.AuditUnPassReason');
				win.down('#btn_confirm').on({
					click:function(btn){
						var win=btn.up('window');
						var audit_opinion=win.down('#reason').getValue();
						win.close();
						Ext.Msg.confirm('提示', '是否确认所选厂商不合格？', function(btn) {
							if (btn == 'yes') {
								me.doSupplierAccessChange(records,access_status,audit_opinion);
							}
						})
					}
				})
				win.show();
			break;	
		}
	},
	doSupplierAccessChange:function(records,access_status,audit_opinion){
		
		var me=this;
		var accountMap = erp.UInfo.currentUser.accountMap;
		var login_id = '';
		if (accountMap != null) {
			Ext.each(accountMap, function(acc) {
				if (acc.sys_name == 'SRM') {
					login_id = acc.ref_u_id;
				}
			})
		}
		if (login_id == '') {
			Ext.toastInfo('请分配平台对应账户！');
			return;
		}
		var panel=me.getMng_panelSupplier();
		var myMask = new Ext.LoadMask({
			target : panel
		});
		myMask.mask('数据导入中，请等待......');
		var result = erp.Const.callServiceMethodSync(
				'supplierAccess/common.srm?method=getSupplierAccessChange', {
					company_id : erp.Const.companyId,
					login_id : login_id,
					access_status : access_status,
					audit_opinion:audit_opinion,
					records:records
				});
		myMask.unmask();
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
		Ext.toastInfo('操作成功！');
		panel.outStore.load();
	},
	/* 修改供应商状态按钮操作 */
	doSupplierStatus:function(btn)
	{
		var me=this;
		//mng_Suppliergrid
		var grid=me.getMng_Suppliergrid();
		var store=grid.getStore();
		//获取当前选择项，可多选
		var recs=grid.getSelectionModel().getSelection();
		var apply_sts=0;
		var panel = me.getMng_SupplierPanel();
		switch(btn.itemId)
		{
			//受理
			case '':
				if(btn.getText()=='受理')
				{
					btn.setText('取消受理');
					apply_sts=10;
					panel.down('#btn_AuditPass').setDisabled(false);
					panel.down('#btn_AuditUnPass').setDisabled(false);
					panel.down('#btn_Archive').setDisabled(false);
				}
				else
				{
					apply_sts=5;
					btn.setText('受理');
					panel.down('#btn_AuditPass').setDisabled(true);
					panel.down('#btn_AuditUnPass').setDisabled(true);
					panel.down('#btn_Archive').setDisabled(true);
					
				}
				break;
			case 'btn_AuditPass':
				if(btn.getText()=='审核通过')
				{
					var cpynamearray = [];
					for(var i=0;i<recs.length;i++){
						if(recs[i].get('csbh')==null||Ext.String.trim(recs[i].get('csbh'))==''){
					    	cpynamearray.push(recs[i].get('cpyname_cn'));
					    }
					}
					var json = erp.Const.callServiceMethodSync('supplier/supplierFile.srm?method=ifRepeatName',{
					   cpynamearray : cpynamearray.join(',')
					})
					var result = Ext.decode(json).result;
					if(result!=''){//检查是否被审批
	       	          Ext.Msg.alert('提示','厂商'+result+'在ERP厂商档案中已存在，不能审核通过');
	       	          return;
	                }
					btn.setText('取消审核');
					apply_sts=15;
					panel.down('#btn_AuditUnPass').setDisabled(true);
					panel.down('#btn_Accept').setDisabled(true);
				}
				else
				{
					apply_sts=10;
					btn.setText('审核通过');
					panel.down('#btn_AuditUnPass').setDisabled(false);
					panel.down('#btn_Accept').setDisabled(false);
				}
				
				break;
			case 'btn_AuditUnPass':
				if(btn.getText()=='不合格')
				{
					btn.setText('取消审核');
					apply_sts=20;
					panel.down('#btn_AuditPass').setDisabled(true);
					panel.down('#btn_Accept').setDisabled(true);
				}
				else
				{
					apply_sts=10;
					btn.setText('不合格');
					panel.down('#btn_AuditPass').setDisabled(false);
					panel.down('#btn_Accept').setDisabled(false);
				}
				break;	
		}
		if(apply_sts!=0)
		{
		//将供应商当前的状态apply_sts设置成10，表示受理完成，当前状态为审核中
		for(var i=0;i<recs.length;i++){
			recs[i].set('apply_sts',apply_sts);
			//设置操作人、操作时间、审核人、审核时间
			recs[i].set('operator',erp.UInfo.currentUser.name);
			recs[i].set('auditor',erp.UInfo.currentUser.name);
			recs[i].set('operater_dt',new Date());
			recs[i].set('audit_dt',new Date());
		}
		store.sync({
			 		success:function(){
			 				//Ext.Msg.alert('提示','操作成功！');
			 		},
			 		failure : function(batch, options) {
							Ext.Msg.alert('提示', '操作失败!');
						}
			 		});
		}
	}
	,doReflash:function(){
		var me=this;
		var panel=me.getMng_panelSupplier();
		var tabPanel = panel.down('#supplier_tab');
		var activeTab=tabPanel.activeTab;
				var tabTitle=activeTab.title;
				switch(tabTitle){
					case '当前供应商':
						var store = tabPanel.down('#grd_Supplier').getStore();
						delete store.proxy.extraParams.condition;
						store.loadPage(1);
					break;
					case '归档供应商':
						var store = tabPanel.down('#grd_ArchiveSupplier').getStore();
						delete store.proxy.extraParams.condition;
						store.loadPage(1);
					break;
					case '准入邀请':
						var store = tabPanel.down('#OutSupplierInvite').getStore();
						delete store.proxy.extraParams.condition;
						store.loadPage(1);
					break;
					case '准入受理':
						var store = tabPanel.down('#OutSupplier').getStore();
						delete store.proxy.extraParams.condition;
						store.loadPage(1);
					break;
				}
//		delete panel.store.proxy.extraParams.condition;
//		panel.store.loadPage(1);
	}
	
	/*查询列表页面功能*/
	,doQuery:function(){
		var me=this;
		var panel=me.getMng_panelSupplier();
		var tabPanel = panel.down('#supplier_tab'); 
		var condition=panel.down('#search').getValue();
		var apply_stsSearch=panel.down('#applysts_search').getValue();
		var materialClass_1_search=panel.down('#materialClass_1_search').getValue();
		var materialClass_2_search=panel.down('#materialClass_2_search').getValue();
		var materialClass_3_search=panel.down('#materialClass_3_search').getValue();
		var supplierTab=me.getMng_SupplierTab();
		//当前供应商
		if(me.supplierTab==0)
		{
		//panel.store.proxy.extraParams.condition=condition;
		Ext.apply(panel.store.proxy.extraParams,{
			usePaging:true,condition:condition,apply_sts:apply_stsSearch,mc_id_1:materialClass_1_search,mc_id_2:materialClass_2_search,mc_id_3:materialClass_3_search});
		panel.store.loadPage(1);
		}
		//归档供应商
		else if(me.supplierTab==1)
		{
		//Archivestore
			
			//Ext.apply(panel.Archivestore.extraParams,{usePaging:true,condition:condition,apply_sts:apply_stsSearch});
			//panel.Archivestore.loadPage(1);
			me.grdArchiveStore.proxy.extraParams.condition=panel.down('#search4').getValue();
//			me.grdArchiveStore.proxy.apply_sts=apply_stsSearch;
			me.grdArchiveStore.loadPage(1);
		}
		else if(me.supplierTab==2){
			var zr_store = tabPanel.down('#OutSupplierInvite').getStore();
			zr_store.proxy.extraParams.condition=panel.down('#search4').getValue();
			zr_store.loadPage(1);
		}else if(me.supplierTab==3){
			var sl_store = tabPanel.down('#OutSupplier').getStore();
			sl_store.proxy.extraParams.cpyname_cn=panel.down('#search4').getValue();
			sl_store.loadPage(1);
		}
	},
	/*删除供应商*/
	doDeleteSupplier : function() {
		var me = this;
		var grid = me.getMng_Suppliergrid();
		var rec = grid.getSelectionModel().getSelection()[0];		
		var managerPanel=me.getMng_panelSupplier();

		
		Ext.Msg.confirm("提醒", "你确定要删除供应商:【" + rec.get('cpyname_cn') + "】的所有信息吗?", function(
						btn) {
					if (btn == "yes") {
						rec.set('is_delete',true);
						
						rec.set('operator',erp.UInfo.currentUser.name);
						rec.set('operater_dt',new Date());
						
						me.grdStore.sync({
							success:function(){
								
								me.grdStore.load();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '删除失败!');
										}
						});
						
						/*物理删除改成逻辑删除
						me.grdStore.remove(rec);// 从 Store 中删除给定的记录,
												// 对每条删除的记录都会触发一次 'remove' 事件.
												// 在此次的所有数据删除完成后,会触发一次
												// 'datachanged' 事件.
						
												
						me.grdStore.sync({
							success:function(){
								
								//发票抬头
								managerPanel.invoicestore.removeAll();
								managerPanel.invoicestore.sync(
								{
									success:function(){}
								});
								//主要设备明细
								managerPanel.devicelistStore.removeAll();
								managerPanel.devicelistStore.sync(
								{
									success:function(){}
								});
								//公司产品主要用料表
								managerPanel.metarialStore.removeAll();
								managerPanel.metarialStore.sync(
								{
									success:function(){}
								});
								//公司主要客户
								managerPanel.maincustomerStore.removeAll();
								managerPanel.maincustomerStore.sync(
								{
									success:function(){}
								});
								//公司主要竞争对手
								managerPanel.competitorStore.removeAll();
								managerPanel.competitorStore.sync(
								{
									success:function(){}
								});
								//公司银行账号
								managerPanel.bankAccountStore.removeAll();
								managerPanel.bankAccountStore.sync(
								{
									success:function(){}
								});
								//公司产品
								managerPanel.goodsStore.removeAll();
								managerPanel.goodsStore.sync(
								{
									success:function(){}
								});
								//附件
								//先删除文件在删数据库记录
								var attchedstore=managerPanel.registerAttchedStore;
								var customattchedstore=managerPanel.customAttchedStore;
								
								var patharray=[];
								for(var i=0;i<attchedstore.getCount();i++)
								{
									var record=attchedstore.getAt(i);
									
									patharray.push(record.get('file_path'));
								}
								for(var i=0;i<customattchedstore.getCount();i++)
								{
									var record=customattchedstore.getAt(i);
									patharray.push(record.get('file_path'));
								}
//								
								erp.Const.callServiceMethodSync('supplier/deleteAttchedByPath.do',{
											patharray:patharray.join(',')
									});
								
								managerPanel.registerAttchedStore.removeAll();
								managerPanel.registerAttchedStore.sync(
								{
									success:function(){}
								});
								
								managerPanel.customAttchedStore.removeAll();
								managerPanel.customAttchedStore.sync(
								{
									success:function(){}
								});
								Ext.Msg.alert('提示','删除成功！');
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '删除失败!');
										}
							}
						);
						//end
						 */
					}
				});
	}
	//归档与取消归档操作
	,doArchive:function(btn){
		var me=this;
		
		if(btn.text=='归档')
		{
			var grid=me.getMng_Suppliergrid();
			var recs=grid.getSelectionModel().getSelection();
			if(recs.length==0)
			{
				Ext.Msg.alert('提示','请先选择归档记录！');
				return;
			}
			for(var i=0;i<recs.length;i++){
			recs[i].set('is_archive',true);
			//设置操作人、操作时间、审核人、审核时间
			recs[i].set('operator',erp.UInfo.currentUser.name);
			recs[i].set('auditor',erp.UInfo.currentUser.name);
			recs[i].set('operater_dt',new Date());
			recs[i].set('audit_dt',new Date());
			}
			me.grdStore.sync({
							success:function(){
								
								me.grdStore.load();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '归档失败!');
										}
						});
		}
		else if(btn.text=='取消归档')
		{
			
			var grid=me.getMng_ArchivesSuppliergrid();
			var recs=grid.getSelectionModel().getSelection();
			if(recs.length==0)
			{
				Ext.Msg.alert('提示','请先选择归档记录！');
				return;
			}
			for(var i=0;i<recs.length;i++){
			recs[i].set('is_archive',false);
			//设置操作人、操作时间、审核人、审核时间
			recs[i].set('operator',erp.UInfo.currentUser.name);
			recs[i].set('auditor',erp.UInfo.currentUser.name);
			recs[i].set('operater_dt',new Date());
			recs[i].set('audit_dt',new Date());
			}
			me.grdArchiveStore.sync({
							success:function(){
								
								me.grdArchiveStore.load();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '取消归档失败!');
										}
						});
		}
	},
	getNewNum : function(loop_id,form) {
		//审核信息
		var me=this;
		var jForm=me.getJform();
		if(form!=null){
			jForm=form;
		}
		//获取最新计算结果
		var result = erp.Const.callServiceMethodSync(
						'supplierAccess/SupplierAccessScoreSummary.srm?method=getSupplierScoreCorrelation',
						{
							loop_id : loop_id
						});
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
		var rec=Ext.create('erp.supplierManager.model.AppSupplierAccessLoop',data.rec);
		jForm.down('#real').setValue(data.real);
		jForm.down('#max').setValue(data.max);
		jForm.down('#keyReal').setValue(data.keyreal);
		//jForm.down('#maxReal').setValue(data.keyMax);
		jForm.down('#rank').setValue(data.rank);
	},
	//打开准入评估页面
	doAccessEvaluateInfo:function(rec,isAdd,isEdit,mrec){
		var me=this;
		var mainPanel=me.getMng_panelSupplier();
		var grid=me.getMng_Suppliergrid();
		if(!isAdd&&isEdit){
			//检测单据是否被打开
			var bool=erp.Util.checkExclusive(mainPanel.itemId,rec.get('company_id'));
	    	if(bool){
				return ;    	
	    	}
		}
		var accessScore=Ext.create('erp.supplierAccess.store.SupplierAccessScore',{});
		accessScore.load({params:{loop_id:rec.get('loop_id')}});
		var win=Ext.widget('access_MainInfo',{
			xtype:'access_MainInfo',
			itemId:'accessMainInfo',
			title:'评估详细',
			supplierLoopRec:rec,
			supplierRec:mrec,
			loopStore:mainPanel.SupLoopStore,
			accessScore:accessScore,
			loop_id:rec.get('loop_id'),
			bills_num:mainPanel.itemId,
			bills_id:rec.get('loop_id'),
			isEdit : isEdit,
			isAdd:isAdd,
			closable:true
		});
		if(!isAdd&&isEdit){
			//添加排他表进程
			erp.Util.addTask(win,mainPanel.itemId,rec.get('loop_id'));
			me.getNewNum(rec.get('loop_id'),me.getEdt_jform());
		}
		win.show();
	},
	AccessBaseInfoDoAction:function(btn){
		var me=this;
		var form= me.getEdt_jform();
		var rec=form.getRecord();
		var win=form.up('window');
		var mainPanel=me.getMng_panelSupplier();
		form.updateRecord(rec);
		switch(btn.itemId){
			case 'BTN_SAVE':
				rec.set('operator',erp.Util.currentUser.name);
				rec.set('operator_dt',new Date());
				var sql  =" select count(1) from t_app_supplier_access_loop  where company_id='"+rec.get('company_id')+"' and assess_dt='"+Ext.Date.format(rec.get('assess_dt'),'Y-m-d')+"' and loop_id <>'"+rec.get('loop_id')+"'  ";
				var result = erp.Const.callServiceMethodSync('supplier/supplierFile.srm?method=getStringFromSql',
				{sql : sql});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return ;
				}
				if(data.val>0){
					Ext.toastInfo('供评估日期已存在，请重新选择！');
					break;
				}
				if(form.getForm().isValid()){
					Ext.Msg.confirm('提示','你确定要保存当前审核信息吗?',function(btn){
						if(btn=='yes'){
							if(win.isAdd){
								win.loopStore.add(rec);
								win.loopStore.sync({success:function(e,batch){
								var newAccessScore=batch.operations.create[0];
								if(newAccessScore!=null){
									form.loadRecord(newAccessScore);
								}
								win.isAdd=false;
								win.loop_id=newAccessScore.get('loop_id');
								erp.Util.addTask(win,mainPanel.itemId,newAccessScore.get('loop_id'));
							}});
						}else{
								win.loopStore.sync({success:function(e,batch){
									var newAccessScore=batch.operations.update[0];
									if(newAccessScore!=null){
											form.loadRecord(newAccessScore);
										}
								}});
							}
						}
					})
				}
			break;
		}
	},
	//提交评估信息
	EvaluateDoAction:function(btn){
		var me=this;
		//评估页面		
		
		var detailsPanel=me.getPanl_evaluateDetails();
		var isAdd=detailsPanel.isAdd;
		var loopForm=me.getEdt_jform();
		var loopRec=loopForm.getRecord();
		loopForm.updateRecord(loopRec);
		var loop_id=loopRec.get('loop_id');
		var item_id=detailsPanel.item_id;
		var item_fid=detailsPanel.item_fid;
		//表单上的得分
		if(detailsPanel.down('#assess_score').getChecked()[0]==null){
			Ext.Msg.alert('提示','请选择分数！');
			return ;
		}
		var assess_score=detailsPanel.down('#assess_score').getChecked()[0].inputValue;
		var currentUser=erp.Util.currentUser.name;
		//基本信息form
		var form=me.getPanl_evaluateDetails().down('form');
		//获取界面数据
		var rec=form.getRecord();
		switch(btn.itemId)
		{
			case 'BTN_SAVE':
				if(loop_id==null||loop_id<=0){
					Ext.toastInfo('请先保存审核信息！');
					break;
				}
				if(form.getForm().isValid()&&form.getForm().isDirty())
				{
					if(item_id!=null&&item_id>=0&&item_fid!=null&&item_fid>=0)
					{
					Ext.Msg.confirm('提示','你确定要保存当前评估明细吗?',function(btn){
						if(btn=='yes')
						{
							//更新form绑定的model
			 				form.updateRecord(rec);
			 				//将上传的图片路径保存到评估打分表的assess_view1字段中，用'逗号'隔开
			 				var imgView='';
			 				for(var i=0;i<detailsPanel.accessUploadImgStore.getCount();i++)
			 				{
			 					var file_path=detailsPanel.accessUploadImgStore.getAt(i).get('file_path');
			 					if(file_path!=null&&file_path!='')
			 					{
			 						if(imgView=='')
			 						{
			 							imgView=file_path;
			 						}
			 						else
			 						{
			 						imgView+=','+file_path;
			 						}
			 					}
			 				}
			 				
			 				//新增
			 				if(isAdd)
			 				{
			 					//得分赋值
			 					rec.set('assess_score',assess_score);
			 					rec.set('assess_date',new Date());
			 					rec.set('assess_person',erp.Util.currentUser.name);
			 					rec.set('company_id',detailsPanel.company_id);
			 					rec.set('assess_view1',imgView);
			 					rec.set('loop_id',loop_id);
			 					detailsPanel.accessScore.add(rec);
			 					detailsPanel.accessScore.sync({
			 						success:function(e,batch){
			 							var newAccessScore=batch.operations.create[0];
										if(newAccessScore!=null)
										{
											//重新加载新增的评估明细
											form.loadRecord(newAccessScore);
											//将新记录的主键编号赋值给上传图片的store中
											detailsPanel.setScoreIdToImgStore(newAccessScore.get('score_id'));
											detailsPanel.accessUploadImgStore.sync({
												success:function(){
			 										
			 									},
			 									failure : function(batch, options) {
													
												}
											});
											Ext.Msg.alert('提示','保存成功！');
											me.getNewNum(loop_id,loopForm);
										}
			 						},
			 						failure:function(batch,options)
			 						{
			 							Ext.Msg.alert('提示', '保存失败!');
										return;
			 						}
			 					});
			 				}
			 				else{
			 					recs=detailsPanel.accessScore.getRange();
			 					if(recs==null||recs.length<=0){
			 						Ext.Msg.alert('提示', '修改失败,请重新选择评估项!');
			 						return;
			 					}
			 					//得分修改后赋值给当前store中的记录
			 					recs[0].set('assess_score',assess_score);
			 					//图片路径的保存
			 					recs[0].set('assess_view1',imgView);
			 					recs[0].set('company_id',detailsPanel.company_id);
			 					detailsPanel.accessScore.sync({
			 						success:function(e,batch){
			 							me.getNewNum(loop_id,loopForm);
			 						},
			 						failure:function(batch,options)
			 						{
			 							Ext.Msg.alert('提示', '修改失败!');
										return;
			 						}
			 					});
			 					detailsPanel.accessUploadImgStore.sync({
									success:function(){
			 									
			 						},
			 						failure : function(batch, options) {
												
									}
			 					});
			 					Ext.Msg.alert('提示','修改成功！');
			 					return;
			 				}
						}
					});
					}
					else{
						Ext.Msg.confirm('提示','请选择具体的评估项！');
					}
				}
			break;
			case 'BTN_DEL':
				if(item_id!=null&&item_id>=0&&item_fid!=null&&item_fid>=0)
				{
					//编辑状态时删除
					if(isAdd==false)
					{
						Ext.Msg.confirm('提示','你确定要删除当前评估明细吗?',function(btn){
							if(btn=='yes')
							{
								detailsPanel.accessScore.remove(rec);
								detailsPanel.accessScore.sync({
									success:function(){
										//删除图片的上传文件
										var imgStore=detailsPanel.accessUploadImgStore;
										var patharray=[];
										for(var i=0;i<imgStore.getCount();i++)
										{
											var imgRecord=imgStore.getAt(i);
											patharray.push(imgRecord.get('file_path'));
										}
										erp.Const.callServiceMethodSync('common/deleteFileByPath.do',{
											patharray:patharray.join(',')
										});
										detailsPanel.accessUploadImgStore.removeAll();
										detailsPanel.accessUploadImgStore.sync({
											success:function(){
											
											}
										});
										Ext.Msg.alert('提示','删除成功！');
										//表单重置清空
										form.reset();
										me.getNewNum(loop_id,loopForm);
									},
									failure : function(batch, options) {
											Ext.Msg.alert('提示', '删除失败!');
										}
							
								});
							}
						});
					}
				}
			break;
		}
	},
	onSelectNode:function(rec){
		var me=this;
		var treepanel=me.getTree_evaluateNav();
		//var rec=treepanel.getSelectionModel().getSelection()[0];
		var id=rec.get('id');
		var parentId=rec.get('parentId');

		var panlevaluateDetails=me.getPanl_evaluateDetails();
		if(rec.get('leaf')==true)
		{
			me.setEvaluateBtnStatus(false);
			panlevaluateDetails.setAccessScoreData(id,parentId);
		}
		else
		{
			me.setEvaluateBtnStatus(true);
		}
	},
	setEvaluateBtnStatus:function(sts){
		var me = this;
		var detailsPanel = me.getPanl_evaluateDetails();
		detailsPanel.down('#PanelEvaluateInfo').down('#BTN_SAVE').setDisabled(sts);
		detailsPanel.down('#PanelEvaluateInfo').down('#BTN_DEL').setDisabled(sts);
	},
	setImgBtnStatus:function(sts)
	{
		var me=this;
		var detailsPanel = me.getPanl_evaluateDetails();
		detailsPanel.down('#delPicture').setDisabled(sts);
		detailsPanel.down('#downloadPicture').setDisabled(sts);
	}
});