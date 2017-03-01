Ext.define('erp.materialConfirmation.controller.MaterialConfirmationCtrl',{
	extend:'Ext.app.Controller',
	requires:[	'erp.ux.PagingBar',
				'erp.materialConfirmation.store.MaterialConfirmation',
				'erp.materialConfirmation.store.MaterialCheckDetail'
				,'erp.supplier.store.SupplierFile'
				,'erp.materialConfirmation.store.MaterialCheckclass'
				,'erp.materialConfirmation.store.MaterialSample'],
	views:[
			'erp.supplierManager.view.WestTab',
			'erp.materialConfirmation.view.ConfirmManager',
			'erp.materialConfirmation.view.ConfirmMainInfo',
			'erp.materialConfirmation.view.MaterialSample'],
	refs:[{ref : 'mng_Confirm',selector : 'mng_MaterialConfirm'},//管理页面
			{ref:'mng_Confirmgrid',selector:'mng_MaterialConfirm #grd_MaterialConfirm'},
			{ref:'panel_SamplyDetails',selector:'MaterialSample'},//样品明细及检测详细页面
			{ref:'panel_ConfirmInfo',selector:'panel_ConfirmMainInfo'},
			{ref:'confirmCheckForm',selector:'MaterialSample #confirmCheckForm'}
		],
	init:function(){
	// controller只初始化一次
		var me = this;
		//该函数将最先执行，甚至先于 appliction.launch
		if (me.isInited)
			return;
		//处理所有view上面的交互
		me.control({
			//评估准入管理页面中供应商档案列表Grid初始化
			'mng_MaterialConfirm':{
				beforerender:function(cmp){
					var bar2=cmp.down('#top_bar');
					erp.Util.setMenuFunc(bar2.down('#BTN_PRINT'),cmp.modId,cmp);
				},
				afterrender:function(cmp){
					var store=me.getMng_Confirmgrid().getStore();
					var grid=me.getMng_Confirmgrid();
					me.grdConfirmStore=store;
//					me.grdConfirmStore.proxy.extraParams.usePaging=true;
					
//					me.grdConfirmStore.loadPage(1);
					me.modFuncsDisabled=cmp.modFuncsDisabled;
				},
				beforedestory:function(){
					me.grdConfirmStore.proxy.extraParams.history=0;
					//todo:删除检索条件变量的值
					delete me.grdConfirmStore.proxy.extraParams.condition;
					
				}
			},
			//查询框回车事件
			'mng_MaterialConfirm #plMaterialConfirm #search':{
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.doQuery();
					}
				}
			},
			'mng_MaterialConfirm #grd_MaterialConfirm':{
				selectionchange:function(grid, rec){
					//列表有数据
					if (rec.length > 0) {
						me.setBtnStatus(false);
						var panel=me.getMng_Confirm();
						panel.loadCheckDetailsData(rec[0]);
					}
					//列表记录为空
					else
					{
						me.setBtnStatus(true);
						
					}
				},
				itemdblclick : function(grid, rec) {
					me.EditConfirmInfo(erp.def.Const.FUNC_ITEMID_BTN_EDT);
				}
			},
			//
			'mng_MaterialConfirm #plMaterialConfirm button':{
				click:me.doAction
			},
			'panel_ConfirmMainInfo':{
				afterrender:function(){
						var me =this;
						var panel = me.getPanel_ConfirmInfo();
						var detail_panel = me.getPanel_SamplyDetails();
						var grid=me.getMng_Confirmgrid();
						var rec=grid.getSelectionModel().getSelection()[0];
						if(!panel.isAdd && !Ext.isEmpty(rec.get('final_confirrmor'))){							
							panel.down('#BTN_SAVE').setDisabled(true);
						   	detail_panel.down('#top_bar2').setDisabled(true);
						   	detail_panel.down('#btn_confirm').setDisabled(true);
						   	detail_panel.down('#confirm_btn_add').setDisabled(true);
						   	detail_panel.down('#confirm_btn_del').setDisabled(true);
						   	detail_panel.down('#btn_upload').setDisabled(true);						
						}
						
				}				
			},
			'panel_ConfirmMainInfo #panelMainInfo button':{
				click:me.btnEditformAction
			},
			//物料确认样品明细guid选择改变事件
			'MaterialSample #sampleGrid':{
				selectionchange:function(grid, rec){
					var samplePanel=me.getPanel_SamplyDetails();
					if(rec.length>0)
					{
						//加载检测明细
						samplePanel.checkDetailStore.load({
						params:{sample_id:rec[0].get('sample_id')}});
						
					}
				}
			},
			'MaterialSample #confirmCheckPanel button':{
			   click:me.doCheckPanelAction
			}
		});
		// controller初始化完成
	me.isInited=true;
	},
	/*物料与技术要求符合确认情况确认按钮*/
	doCheckPanelAction:function(btn){
		var me =this;
		var panel = me.getPanel_ConfirmInfo();
		var detail_panel = me.getPanel_SamplyDetails();
	   var form = panel.down('#panelMainInfo');
	   var form_qr = me.getConfirmCheckForm();
	   var rec = form.getRecord();
	   var qr_rec = form_qr.getRecord();
	   var confirmation_id = rec.get('confirmation_id');
	   var sample_grid = detail_panel.down('#sampleGrid');
	   var sample_rec = sample_grid.getSelectionModel().getSelection()[0];
		switch(btn.itemId){
			case 'btn_confirm' :	
			   var sample_store =  sample_grid.getStore();
			   var bool = false;
			   sample_store.each(function(record){
			   		var confirm_result = record.get('confirm_result');			   		
			   		if((confirm_result==null&&confirm_result!=0) || (confirm_result==''&&confirm_result!=0)){
			   			bool = true;
			   		}			   		
			   })
			   if(bool){
			   			Ext.Msg.alert('提示','物料样品明细中【最终结论】存在为空的记录');
			   			return;
			   		}
			   /*var confirm_result = form_qr.down('#confirm_result_combo').getValue();			   
			   if(Ext.isEmpty(confirm_result)){
			      Ext.Msg.alert('提示','【最终结论】不能为空！');
			      return;
			   }*/
			   detail_panel.down('#final_confirrmor').setValue(erp.Util.currentUser.userInfo.name);
			   detail_panel.down('#confirm_date').setValue(new Date());
			   var result = erp.Const.callServiceMethodSync('materialConfirmation/MaterialConfirmation.srm?method=getMaterialComfirmation',
			   {confirmation_id : confirmation_id,sample_id:sample_rec.get('sample_id'),
			    final_confirrmor:erp.Util.currentUser.userInfo.name});
			   
			   
			  /* var sql  =" update t_app_material_sample set confirm_result="+confirm_result+",final_confirrmor='"+erp.Util.currentUser.userInfo.name+"',confirm_date = getdate() where  confirmation_id = "+confirmation_id;
			   var result = erp.Const.callServiceMethodSync('supplier/supplierFile.srm?method=getStringFromSql',
			   {sql : sql});*/
			   var data = Ext.decode(result);
			   if (data.bool) {
			   	detail_panel.materialSampleStore.reload();
				Ext.toastErrorInfo('确认成功');				
			   	panel.down('#BTN_SAVE').setDisabled(true);
			   	detail_panel.down('#top_bar2').setDisabled(true);
			   	detail_panel.down('#btn_confirm').setDisabled(true);
			   	detail_panel.down('#confirm_btn_add').setDisabled(true);
			   	detail_panel.down('#confirm_btn_del').setDisabled(true);
			   	detail_panel.down('#btn_upload').setDisabled(true);
			   }else{
			   	Ext.toastErrorInfo('确认失败');	
			   	return;
			   }
			break;
			case 'btn_cancel_confirm':
				var czym = Ext.String.trim(erp.Util.currentUser.name);
				var final_confirrmor = Ext.String.trim(detail_panel.down('#final_confirrmor').getValue());
				if(czym!=final_confirrmor){
					Ext.Msg.alert('提示','操作员【'+czym+'】与确认人【'+final_confirrmor+'】不一致！');
			        return;
				}
			   var sql  =" update t_app_material_confirmation set final_confirrmor=null,confirm_date = null where  confirmation_id = "+confirmation_id;
			   var result = erp.Const.callServiceMethodSync('supplier/supplierFile.srm?method=getStringFromSql',
			   {sql : sql});
			   var data = Ext.decode(result);
			   if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
				return ;
			   }else{
			   	detail_panel.down('#final_confirrmor').setValue(null);
			    detail_panel.down('#confirm_date').setValue(null);
			    detail_panel.materialSampleStore.reload();
			   	Ext.toastErrorInfo('取消确认成功');
			   	panel.down('#BTN_SAVE').setDisabled(false);
			   	detail_panel.down('#top_bar2').setDisabled(false);
			   	detail_panel.down('#btn_confirm').setDisabled(false);
			   	detail_panel.down('#confirm_btn_add').setDisabled(false);
			   	detail_panel.down('#confirm_btn_del').setDisabled(false);
			   	detail_panel.down('#btn_upload').setDisabled(false);
			   }
			break;
		}
	},
	/*主面板按钮响应*/
	doAction : function(btn) {
		var me=this;
		switch (btn.itemId) {
			//物料确认打开窗口按钮事件
			//管理页面的新增、修改按钮事件
			case erp.def.Const.FUNC_ITEMID_BTN_ADD:
			case erp.def.Const.FUNC_ITEMID_BTN_EDT:
				me.EditConfirmInfo(btn.itemId);
				break;
			case erp.def.Const.FUNC_ITEMID_BTN_DEL:
				me.doDelete();
				break;
			case 'btn_search':
				this.doQuery();
			break;
		}
	},
	/*修改、新增物料确认按钮事件*/
	EditConfirmInfo:function(itemId)
	{
		var me=this;
		var rec,isAdd;
		var grid=me.getMng_Confirmgrid();
		var u_id=erp.Util.currentUser.userInfo.login_id;
		var apply_companyname = erp.Const.callServiceMethodSync('materialConfirmation/ApplyDepartment.oa?method=getOAdepartmentName',
			   {loginid : u_id});
		//为其他同类页面何用做准备，如编辑，复制
		switch(itemId){
			case erp.def.Const.FUNC_ITEMID_BTN_ADD://新增按钮
				rec=Ext.create('erp.materialConfirmation.model.MaterialConfirmation',{
//				confirm_date:new Date(),
				apply_companyname:apply_companyname,
				confirmation_status:0
				});
				isAdd=true;
				break;
			case erp.def.Const.FUNC_ITEMID_BTN_EDT:
				rec=grid.getSelectionModel().getSelection()[0];
				isAdd=false;
				break;
		}
		var opentitle='新增物料确认';
		var openglyph=0xf044;
		if(!isAdd)
		{
			opentitle='修改物料确认';
			openglyph=0xf044;
		}
		var win=Ext.widget('panel_ConfirmMainInfo',{
			//新增、修改页面
			xtype:'panel_ConfirmMainInfo',
			itemId:'panelConfirmMainInfo',
			title:opentitle,
			glyph:openglyph,
			ConfirmRec:rec,
			company_id:rec.get('company_id'),
			confirmation_id:rec.get('confirmation_id'),
			isAdd:isAdd,
			store:grid.getStore(),
			modFuncsDisabled:me.modFuncsDisabled,
			closable:true
			
		});
		win.show();
	},
	btnEditformAction:function(btn)
	{
		var me=this;
		var mainPanel=me.getPanel_ConfirmInfo();
		//是否新增
		var isAdd=mainPanel.isAdd;
		var form=mainPanel.down('form');
		var rec=form.getRecord();
		form.updateRecord(rec);
		//样品明细及确认详细检测信息页面
		var detailPanel=me.getPanel_SamplyDetails();//me.getPanel_CheckDetails();
		switch(btn.itemId)
		{
			case 'BTN_SAVE':
			if(form.getForm().isValid()&&form.getForm().isDirty())
			{
				 Ext.Msg.confirm('提示','你确定要保存物料确认报告及相关检测信息吗?',function(btn){
				 	if(btn=='yes')
				 	{
				 		if(Ext.String.trim(rec.get('proposer'))!= Ext.String.trim(erp.Util.currentUser.name)){
				 			Ext.Msg.alert('提示','当前操作员【'+erp.Util.currentUser.name+'】与申请人【'+rec.get('proposer')+'】不一致');
				 			return;
				 		} 
				 		//提交原因为其它时，获取界面自定义的原因
				 		var submitReson=rec.get('submit_reason');
				 		if(submitReson=='其它')
				 		{
				 			var otherReson=mainPanel.down('#submit_reason_other').getValue();
				 		
				 			rec.set('submit_reason',otherReson);
				 		}
				 		var submitItem=rec.get('submit_item');
				 		if(submitItem==null){
				 			Ext.toastInfo("提交材料不能为空!");
				 			return;
				 		}
				 		//提交材料多选组装赋值
				 		var submitItemArray=submitItem[0];
				 		for(var i=0;i<submitItem.length;i++)
				 		{
				 			if(i>0)
				 			{
				 				submitItemArray+=','+submitItem[i];
				 			}
				 		}
				 		
				 		rec.set('submit_item',submitItemArray);
				 		//材料类别树下拉列表
						var treepicker=mainPanel.down('#classComboTree');
						//材料类别赋值
				 		var mc_id=treepicker.getValue();
						var mc_name=treepicker.getRawValue();
						
						rec.set('mc_id',mc_id);
						rec.set('mc_name',mc_name);
						
				 		if(isAdd)
				 		{
				 			
				 			rec.set('company_id',mainPanel.company_id);
				 			rec.set('company_name',mainPanel.company_name);
//				 			rec.set('integrity_status',null);
//				 			rec.set('confirm_result',null);
//			 				rec.set('confirm_date',new Date());
			 					//rec.set('assess_person',erp.Util.currentUser.name);
				 			//me.grdConfirmStore.add(rec);
			 				mainPanel.store.add(rec);
				 			mainPanel.store.sync({
				 				success:function(e,batch){
				 					var newConfirm=batch.operations.create[0];
				 					if(newConfirm!=null)
				 					{
				 						//重新加载
										form.loadRecord(newConfirm);
										mainPanel.confirmation_id=newConfirm.get('confirmation_id');
										//将返回的主键confirmation_id赋值给详细检测信息store
				 						detailPanel.setconfirmationIdToSimply(newConfirm.get('confirmation_id'));
				 						
				 						detailPanel.materialSampleStore.sync({
				 							success:function(){
				 								
				 							},
				 							failure : function(batch, options) {
											
												}
				 						});
				 						detailPanel.checkDetailStore.sync({
				 							success:function(){
				 								
				 							},
				 							failure : function(batch, options) {
												
												}
				 						});
				 					}
				 					Ext.Msg.alert('提示', '新增成功!');
				 					me.grdConfirmStore.reload();
										
				 				},
				 				failure:function(e,batch){
				 					Ext.Msg.alert('提示', '保存失败!');
											return;
				 				}
				 			});
				 			mainPanel.isAdd=false;
				 			return;
				 		}
				 		else
				 		{
				 			
				 			mainPanel.store.sync({
				 				success:function(e,batch){
				 					
				 				},
				 				failure:function(e,batch){
				 					Ext.Msg.alert('提示', '保存失败!');
									return;
				 				}
				 			});
				 			detailPanel.materialSampleStore.sync({
				 							success:function(){
				 								
				 							},
				 							failure : function(batch, options) {
												
												}
				 						});
				 						detailPanel.checkDetailStore.sync({
				 							success:function(){
				 								
				 							},
				 							failure : function(batch, options) {
												
												}
				 						});
				 			
				 			Ext.Msg.alert('提示','修改成功！');
				 		}
				 		
				 	}
				 });
			}
			break;
		}
	},
	/* 修改按钮状态*/
	setBtnStatus : function(sts) {
		var me = this;
		var panel = me.getMng_Confirm();
		panel.down('#BTN_EDT').setDisabled(sts);
		panel.down('#BTN_DEL').setDisabled(sts);
	},
	/*查询列表页面功能*/
	doQuery:function(){
		var me=this;
		var panel=me.getMng_Confirm();
		var condition=panel.down('#search').getValue();
		
		panel.store.proxy.extraParams.condition=condition;
		panel.store.proxy.extraParams.usePaging=true;
		panel.store.loadPage(1);
	}
	,doDelete:function()
	{
		var me=this;
		var grid=me.getMng_Confirmgrid();
		var rec=grid.getSelectionModel().getSelection()[0];
		var Panel=me.getMng_Confirm();
		//确认详细检测信息页面
		//var detailPanel=me.getPanel_CheckDetails();
		if(!rec.get('final_confirrmor')==null&& !rec.get('confirm_date')==null){
			Ext.Msg.alert('提示','该数据已确认不能删除');
			return;
		}
		var isAdmin = erp.Util.currentUser.isAdmin
		if(Ext.String.trim(rec.get('proposer'))!= Ext.String.trim(erp.Util.currentUser.name) && !isAdmin){
			Ext.Msg.alert('提示','非管理员或者非本人申请的单据不能删除！');
			return;
		}
		Ext.Msg.confirm("提示","你确定要删除当前物料确认记录吗？",function(btn){
			if(btn=='yes')
			{
				me.grdConfirmStore.remove(rec);
				me.grdConfirmStore.sync({
					success:function(e,batch){
					    var result = erp.Const.callServiceMethodSync('materialConfirmation/MaterialConfirmation.srm?method=getDeleteMaterialComfirmation',
					   {confirmation_id : rec.get('confirmation_id')});
					   var data = Ext.decode(result);
					   if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return ;
					   }else{
					   	Ext.Msg.alert('提示','删除成功！');
					   }
//						Panel.checkDetailStore.removeAll();
//						Panel.checkDetailStore.sync({success:function(){}});
//						Ext.Msg.alert('提示','删除成功！');
					},
					failure : function(batch, options) {
						Ext.Msg.alert('提示', '删除失败!');
					}
							
				});
			}
		});
	}
});