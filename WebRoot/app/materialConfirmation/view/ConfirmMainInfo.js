Ext.define('erp.materialConfirmation.view.ConfirmMainInfo',{
	extend:'erp.ux.Window',
	requires:['erp.materialConfirmation.view.MaterialSample',
			'erp.ux.ComboxTree',
			'erp.basicdata.materialClass.store.MaterialClassTreeChk',
			'erp.supplierManager.store.SupplierFile',
			'erp.common.basic.view.field.HelpField',
			'Ext.ux.TreePicker'],
	alias:'widget.panel_ConfirmMainInfo',
	height:document.body.clientHeight<800?document.body.clientHeight:800,
	width:document.body.clientWidth<1200?document.body.clientWidth:1200,
	modal:true,
	listeners:{
		beforeclose:function(){
			var mes=confirm('真的要关闭此页面吗?');
			return mes;
		},
		close:function(panel){
			me.store.reload();
		//为避免界面关闭时 close 时 不触发销毁方法在关闭时主动销毁界面
			if(panel){
				panel.destroy();				
			}
		}		
	},
	initComponent:function(){
 		var me =this;
 		me.supplierStore=Ext.create('erp.supplierManager.store.SupplierFile');
 		me.materialClassStore=Ext.create('erp.basicdata.materialClass.store.MaterialClassTreeChk');
 		me.materialClassStore.proxy.extraParams.is_archive=0;
 		Ext.apply(me,{
 			items:[{
 				xtype:'panel',
 			layout:{type:'border'},
 			padding:'0 2 0 4',
 			items:[{
 				region:'north',
 				//flex:1,
 				height:180,
 				split: true,
 				overflowY:'auto',
 				xtype:'form',
 				
 				itemId:'panelMainInfo',
 				tbar:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE'}],
 				layout:'column',
 				defaults:{
 					labelWidth:90,
 					xtype:'textfield',
 					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
 					padding:'0 2 2 2',
					msgTarget : 'side',
					autoFitErrors : true
 				},
 				//基本信息
 				items:[{
 					fieldLabel:'供应商名称',
					name:'company_name',
					hidden:me.isAdd,
					columnWidth:2/4,
					readOnly:true
 					},{
 						fieldLabel:'供应商名称',
						itemId:'company_name',
						xtype:'helpField',
						//readOnly:!me.isAdd,
						hidden:!me.isAdd,
						//disabled:!me.isAdd,
						code : erp.DataConst.Supplier,
						//selectOnFocus:true,
						listeners:{
							'change':function(obj,n,o){								
									if(obj.displayTplData!=null){
										var m=obj.displayTplData[0];
										if(me.isAdd && !Ext.isEmpty(m)){
											console.log(m);
											me.setSupplierInfo(m);
										}
									}								
							}
 							},
						columnWidth:2/4
 				}
 				,{
 					fieldLabel:'供应商状态',
 					name:'apply_sts',
 					itemId:'supplierApplySts',
 					readOnly:true,
					//disabled:true,
 					columnWidth:1/4
 				}
 				,{
 				 		fieldLabel:'联系人',
						name:'contacts',
						itemId:'contacts',
						//readOnly:true,
						columnWidth:1/4
	
 				},{
 						fieldLabel:'地址',
						name:'addr',
						itemId:'addr',
						//readOnly:true,
						columnWidth:2/4
 				},
 				{
 						fieldLabel:'电话',
						name:'f_phone',
						itemId:'f_phone',
						//readOnly:true,
						columnWidth:1/4
 				},{
 						fieldLabel:'传真',
						name:'fax',
						itemId:'fax',
						//readOnly:true,
						columnWidth:1/4
 				},{
 						fieldLabel:'即时通讯',
						name:'m_phone',
						itemId:'m_phone',
						//readOnly:true,
						columnWidth:1/4
 				},{
 						fieldLabel:'申请单位',
						name:'apply_companyname',
						itemId:'apply_companyname',
						columnWidth:1/4
 				},{
 						fieldLabel:'申请人员',
						name:'proposer',
						itemId:'proposer',
						columnWidth:1/4,
						readOnly:true
 				},
 				{
 						fieldLabel:'申请日期',
						name:'apply_date',
						itemId:'apply_date',
						xtype:'datefield',
						format:'Y-m-d',
						columnWidth:1/4
 				}
 				/*,
 				{
 						fieldLabel:'材料类别',
						name:'classComboTree',
						itemId:'classComboTree',
						displayField:'text',
						value:'id',
						xtype:'treepicker',
						minPickerHeight: 300,
						store:me.materialClassStore,
						columnWidth:1/4,
						listeners:{
							'select':function(picker,record,eOpts)
							{
								if(!record.get('leaf'))
								{
									
									Ext.Msg.alert('提示','请选择最后一级类别！');
									picker.setValue('');
									return;
								}
							}
						}
 				}*/
 				, {
					fieldLabel : '材料类别',
					itemId : 'classComboTree',
					name : 'mc_id',
					xtype:'comboxTree',
					queryMode : 'local',
					store : me.materialClassStore,
					displayField:'text',
					value:'id',
					columnWidth:1/4,
					listeners:{
					'select':function(picker,record,eOpts)
					{
						if(record && !record.get('leaf')){
							Ext.Msg.alert('提示','请选择最后一级类别！');
							if(me.ConfirmRec.get('mc_id')!=0){
								picker.setValue(me.ConfirmRec.get('mc_id'));
							}else{
								picker.setValue('');
							}							
							return;
						}
						/*if(!record.get('leaf'))
						{
							
							Ext.Msg.alert('提示','请选择最后一级类别！');
							picker.setValue('');
							return;
						}*/
					}
				}
				}
 				//自定义的特性组合控件结束
 				,{
 				//是否为替代物料
 					xtype:'container',
 					columnWidth:3/4,
 					layout:{type:'hbox'},
 					defaults:{
 						labelWidth:90,xtype:'textfield',
 						labelStyle : 'font-weight:nomal;text-align:left;color:#000'
 						},
 					items:[{
 						flex:1,
 						xtype:'combo',
 						itemId:'isreplace_combo',
 						fieldLabel:'是否替代物料',
 						name:'isreplace_material',
 						store:[['0','否'],['1','是']],
 						listeners:{
 							select:function(combo,records,eOpts){
 								
 								
 								//当前选择的是有
 								if(records.data.field1=='1')
 								{
 									
 									//文本框可见，用show()一样可以
 									me.down('#replace_container').setVisible(true);
 								}
 								else
 								{
 									//文本框置空
 									me.down('#replace_material').setValue('');
 									me.down('#former_suppliername').setValue('');
 									me.down('#replace_container').setVisible(false);
 								}
 							}
 						}
 					},{
 						xtype:'container',
 						layout:{type:'hbox',align: 'stretch'},
 						flex:2,
 						itemId:'replace_container',
 						defaults:{
 							xtype:'textfield',
 							labelStyle : 'font-weight:nomal;text-align:left;color:#000'
 						},
 						hidden:true,
 						items:[{
 							flex:1,
 							//fieldLabel:'原物料品名/规格',
 							emptyText:'原物料品名/规格/描述',
 							name:'replace_material',
 							itemId:'replace_material'
 							
 						},{
 							flex:1,
 							//fieldLabel:'原物料供应商',
 							emptyText:'原物料供应商',
 							name:'former_suppliername',
 							itemId:'former_suppliername'
 							
 						}]
 						
 					}]
 				}//自定义的特性组合控件结束
 				,{
 				//提交原因
 					xtype:'container',
 					columnWidth:1/4,
 					layout:{type:'hbox'},
 					defaults:{
 						labelWidth:90,xtype:'textfield',
 						labelStyle : 'font-weight:nomal;text-align:left;color:#000'
 						},
 					items:[{
 						flex:1,
 						xtype:'combo',
 						itemId:'submitreason_combo',
 						fieldLabel:'提交原因',
 						name:'submit_reason',
 						store:[['首次提交(新物料新供应商)','首次提交(新物料新供应商)'],['首次提交(老物料换新供应商)','首次提交(老物料换新供应商)'],['改为其它选用的结构或材料','改为其它选用的结构或材料'],['设计更改','设计更改'],['偏差校正','偏差校正'],['其它','其它']],
 						listeners:{
 							select:function(combo,records,eOpts){
 								
 								//当前选择的是有
 								if(records.data.field1=='其它')
 								{
 									//文本框可见，用show()一样可以
 									me.down('#submit_reason_other').setVisible(true);
 								}
 								else
 								{
 									//文本框置空
 									me.down('#submit_reason_other').setValue('');
 									me.down('#submit_reason_other').setVisible(false);
 								}
 							}
 						}
 					},{
 						flex:1,
 						//name:'submit_reason',
 						itemId:'submit_reason_other',
 						emptyText:'请说明',
 						hidden:true
 					}]
 				}//
 				,{
 				//提交材料
 					xtype:'combo',
 					name:'submit_item',
 					itemId:'submit_item',
 					fieldLabel:'提交材料',
 					store:[['外观结果','外观结果'],['尺寸结果','尺寸结果'],['材料/功能/理化性能报告','材料/功能/理化性能报告'],['QC工程图','QC工程图'],['过程能力证明','过程能力证明'],['供应商资质','供应商资质'],['其他','其他']],
 					//store:submitItemStore,
 					multiSelect:true,
 					allowBlank:false,
 					valueField:'id',
 					displayField:'name',
 					listConfig:{
 						//itemTpl:'<tpl for="."><div class="x-combo-list-item" onClick="onClick(this)"><span><input type="checkbox" value="{[values.id]}" /> {name}</span></div></tpl>'
 						itemTpl : Ext.create('Ext.XTemplate','<input class="check_submit_item" type=checkbox />{field2}'),
 						listeners:{
 							itemclick:function(view, record, item, index, e, eOpts ){   								
 							 var isSelected = view.isSelected(item);  
 							 var checkboxs = item.getElementsByTagName("input");  
 				 			 if(checkboxs!=null)  
  							 {  
      							var checkbox = checkboxs[0];  
      							if(!isSelected)  
     							 {  
         							 checkbox.checked = true;  
      							}else{  
          							checkbox.checked = false;  
      							}  
  							 }  
 							} 
 							
 						}
 					},
 					columnWidth:2/4/*,
 					listeners:{
 						afterrender:function(e,o){
 							console.log(e);
 							console.log(o);
 							if(!me.isAdd&&!Ext.isEmpty(me.ConfirmRec.get('submit_item'))){
 								var submit_itemarr = me.ConfirmRec.get('submit_item').split(',');
 								var submit_input = document.getElementsByTagName("input");
 								var classobj= new Array();
 								var classint=0;//定义数组的下标 
 								for(var i in submit_input){//对标签进行遍历 
 								if(submit_input[i].getAttribute("class") == "check_submit_item"){
 									classobj[classint] = submit_input[i];
 									classint++; 
 								}
 								}
 								console.log(classobj);
 								for(var i=0;i<submit_itemarr.length;i++){
 									var submit_item = submit_itemarr[i];
 									console.log(submit_item);
 									console.log(document.getElementsByTagName("input"));
 								}
 							}
 						}
 					}*/
 				}//提交材料结束
 				,
 				{
 				xtype:'container',
 					columnWidth:1/4,
 					layout:{type:'hbox'},
 					defaults:{
 						labelWidth:90,xtype:'textfield',
 						labelStyle : 'font-weight:nomal;text-align:left;color:#000'
 						},
 					items:[{
 						flex:1,
 						xtype:'combo',
 						itemId:'ismatch_item_combo',
 						fieldLabel:'是否满足要求',
 						emptyText:'这些结果满足所有图样和规范要求',
 						name:'ismatch_item',
 						store:[['0','是'],['1','否']],
 						listeners:{
 							select:function(combo,records,eOpts){
 								
 								//当前选择的是有
 								if(records.data.field1=='1')
 								{
 									//文本框可见，用show()一样可以
 									me.down('#nomeetexplan_text').setVisible(true);
 								}
 								else
 								{
 									//文本框置空
 									me.down('#nomeetexplan_text').setValue('');
 									me.down('#nomeetexplan_text').setVisible(false);
 								}
 							}
 						}
 					},{
 						flex:1,
 						name:'nomeet_explan',
 						itemId:'nomeetexplan_text',
 						emptyText:'未满足要求请解释',
 						hidden:true
 					}]
 				}//是否满足要求结束
 				/*,{
 				//提供文件的完整性、正确性
 					xtype:'container',
 					columnWidth:1/4,
 					layout:{type:'hbox'},
 					defaults:{
 						labelWidth:90,xtype:'textfield',
 						labelStyle : 'font-weight:nomal;text-align:left;color:#000'
 						},
 					items:[{
 						flex:1,
 						xtype:'combo',
 						itemId:'integritystatus_combo',
 						fieldLabel:'是否完整/正确',
 						emptyText:'提供文件的完整性、正确性',
 						name:'integrity_status',
 						store:[['1','完整、正确'],['2','需补充完善,否则不予发放订单']],
 						listeners:{
// 							 afterRender: function(combo) {
// 							 	if(me.isAdd==true){
//							        　　combo.setValue('');
// 							 	}						        　　
//						      } , 
 							select:function(combo,records,eOpts){
 								
 								//当前选择的是有
 								if(records.data.field1=='2')
 								{
 									//文本框可见，用show()一样可以
 									me.down('#confirmintegritydate').setVisible(true);
 								}
 								else
 								{
 									//文本框置空
 									me.down('#confirmintegritydate').setValue('');
 									me.down('#confirmintegritydate').setVisible(false);
 								}
 							}
 						}
 					},{
 						//flex:1,
 						width:130,
 						name:'confirm_integrity_date',
 						itemId:'confirmintegritydate',
 						xtype:'datefield',
 						format:'Y-m-d ',
 						emptyText:'补充截止日期',
 						hidden:true
 					}]
 				},
 				{
 					//结论
 					xtype:'combo',
 					columnWidth:1/4,
 					itemId:'confirm_result_combo',
 					fieldLabel:'最终结论',
 					name:'confirm_result',
 					store:[['1','合格，可以进行小批试制'],['2','暂时让步接收，可以进行样品试装，样品改进后必须重新送样'],['3','不合格，要求改进后重新送样'],['4','要求补充、完善上栏所列文件']]
// 					listeners:{
//						 afterRender: function(combo) {
//						 	if(me.isAdd==true){
//						        　　combo.setValue('');
//						 	}						        　　
//					      } 
// 					}
 				},
 				{
 					fieldLabel:'最终确认人',
 					name:'final_confirrmor',
 					itemId:'final_confirrmor',
 					columnWidth:1/4
 				},{
 					fieldLabel:'确认时间',
 					name:'confirm_date',
 					itemId:'confirm_date',
 					xtype:'datefield',
 					format:'Y-m-d',
 					columnWidth:1/4
 				}*/]
 			},{
 				//下部分界面
 				region:'center',
 				flex:1,
 				//overflowY:'auto',
 				xtype:'MaterialSample',
 				itemId:'materialSample',
 				company_id:me.company_id,
 				ConfirmRec:me.ConfirmRec,
 				isAdd:me.isAdd,
 				//minHeigth:'500',
 				//有保存权限才可编辑
 				canEdit:me.modFuncsDisabled['BTN_SAVE']==0
 			}]
 			}]
 		});
 		me.callParent(arguments);
 		me.loadMainInfoData(me.ConfirmRec);//,me.materialConfirmStore.getAt(0));
 	},
 	loadMaterialStore:function(node){
		var me=this;
		if(node!=null && node!="" && node!=0){//加载树
			var picker=me.down('#classComboTree').getPicker();
			picker.expandAll();//展开所有，加载所有
		}
	 },
 	loadMainInfoData:function(confirmRec){
 		var me=this;
 		if(me.isAdd==false){
 			me.loadMaterialStore(confirmRec.get('mc_id'));
 		} 		
 		if(me.isAdd==true){
 			confirmRec.set('apply_date',new Date());//申请日期为首次打开日期，保存之后就取保存的日期
 			confirmRec.set('proposer',erp.Util.currentUser.userInfo.name);//申请人默认操作人，不允许修改
 		}
 		me.down('#panelMainInfo').loadRecord(confirmRec);
 		me.confirm_result = confirmRec.get('confirmRec');
 		me.confirmation_id=-1;
 		if(me.isAdd==true)
 		{
 			//加载下界面详细信息
 			me.down('#materialSample').loadDetailData(me.confirmation_id);
 		}
 		else
 		{
 			me.confirmation_id=confirmRec.get('confirmation_id');
 		 	//加载下界面详细信息
 		 	me.down('#materialSample').loadDetailData(confirmRec.get('confirmation_id'));
 			//供应商名称加载
 					//是否为替换物料，1为是
 					if(confirmRec.get('isreplace_material')=='1')
 					{
 						me.down('#replace_container').setVisible(true);
 					}
 					//是否满足要求，1为否
 					if(confirmRec.get('ismatch_item')=='1')
 					{
 						me.down('#nomeetexplan_text').setVisible(true);
 					}
 					if(confirmRec.get('submit_reason')=='其它')
 					{
 						me.down('#submit_reason_other').setVisible(true);
 					}
 					//材料类别树下拉框赋值
// 					if(confirmRec.get('mc_id')!=0&&confirmRec.get('mc_name')!="")
// 					{
// 						me.materialClassStore.load({callback:function(records,operation,success){
// 							me.down('#classComboTree').setValue(confirmRec.get('mc_id'));
// 							me.down('#classComboTree').setRawValue(confirmRec.get('mc_name'));	
// 							
// 						}});
// 						
// 					}
 					var suppliermodel=me.supplierStore.load(
 						{params:{company_id:confirmRec.get('company_id')},
 						callback:function(records)
 						{
 							if(records.length>0){
 								me.setSupplierApplyStsStr(records[0].get('apply_sts'));
 							}
 						}
 					});
 					
 		}
 		
 		
 	}
	,
	/*新增时选择供应商下拉列表时加载供应商基本信息*/
	setSupplierInfo:function(supplierRec)
	{
		var me=this;
	//新增时将供应商相关的基本信息赋值给界面上
 		me.company_id=supplierRec['company_id'];
 		me.company_name=supplierRec['cpyname_cn'];
 		me.down('#contacts').setValue(supplierRec['contacts']);
 		me.down('#f_phone').setValue(supplierRec['f_phone']);
 		me.down('#addr').setValue(supplierRec['contact_addr']);
 		me.down('#fax').setValue(supplierRec['fax']);
 		me.down('#m_phone').setValue(supplierRec['m_phone']);
 		var apply_sts=supplierRec['apply_sts'];
 		me.setSupplierApplyStsStr(apply_sts);
	},
	setSupplierApplyStsStr:function(apply_sts)
	{
		var me=this;
		if(apply_sts==5)
 		{
 			me.down('#supplierApplySts').setValue('已提交');
 		}
 		else if(apply_sts>5&&apply_sts<=10)
 		{
 		me.down('#supplierApplySts').setValue('审核中');
 		}
   	  	else if(apply_sts==15)
   	  	{
   	  	  	me.down('#supplierApplySts').setValue('审核通过');
   	  	}
   	  	else if(apply_sts==20)
   	  	{
   	  	  	me.down('#supplierApplySts').setValue('不合格');
   	  	}
   	  	else
   	  	{
   	  		me.down('#supplierApplySts').setValue('');
   	  	}
	}
});