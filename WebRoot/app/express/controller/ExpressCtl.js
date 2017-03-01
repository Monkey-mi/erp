Ext.define('erp.express.controller.ExpressCtl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar',
				'erp.ux.QueryPanel',
				'erp.ux.FormKey',
				'erp.express.store.Express',
				'erp.express.store.ExpressDetail',
				'erp.express.store.ExpressIssue'
				,'erp.express.store.Fkfs'
				,'erp.express.store.Dsfs'
				,'erp.express.store.Province'
				,'erp.express.store.City'
				,'erp.master.operator.store.OperatorDept'
				,'erp.express.model.QueryParam'
				,'erp.express.store.Salesman'
				,'erp.basicdata.currency.store.Currency'
				,'erp.express.store.Chjhdr'
				,'erp.express.store.Countrycity'
				,'erp.express.store.ExpressMoney'
				],
	views:[
			'erp.express.view.SellKindTree',
			'erp.express.view.ExpressManager',
			'erp.express.view.ExpressMaintain',
			'erp.express.view.ExpressQueryWin',
			'erp.express.view.ChjhdrWin',
			'erp.express.view.CalExpressMoney'
			,'erp.express.view.ExpressCalWin'
			,'erp.express.view.UpExpressFee'
		],
	refs:[{ref:'mngExpress',selector:'mng_Express'},
			{ref:'edtExpress',selector:'edt_Express'},
			{ref:'chjhdrWin',selector:'chjhdrWin'},
			{ref:'expressCalWin',selector:'expressCalWin'},
			{ref:'upExpressfee',selector:'upExpressfee'}
			],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'mng_Express':{
				afterrender:function(cmp){
					me.panel=me.getMngExpress();
					me.grdmain=me.panel.down('#grdExpress');
					me.grdStore=me.panel.store;
					me.detailStore=me.panel.detailStore;
					me.issueStore=me.panel.issueStore;
					me.czybmlbbStore=me.panel.czybmlbbStore;
					me.provinceStore=me.panel.provinceStore;
					me.panel.loadMain();
					me.query_rec=Ext.create('erp.express.model.QueryParam');
					erp.Util.setMenuFunc(me.panel.down('#BTN_PRINT'),cmp.modId,me);
				}
			},
			'mng_Express treepanel':{
				selectionchange:function(tree,recs){
						if(recs.length>0){
							me.grdStore.proxy.extraParams.xslb=recs[0].get('nodeId');
							me.panel.loadMain();
						}
				}
			},
			/*编辑界面相关事件
			 * wq
			 * 20150617
			 * */
			'edt_Express':{
						afterrender:function(th){
							me.getMngExpress().disable();
						},
						beforeclose:function(th){
							me.getMngExpress().enable();
							var rec=th.down('form').getRecord();
							if(rec.phantom==false){
								me.detailStore.load({params:{jlbh:rec.get('jlbh')}});
								me.issueStore.load({params:{jlbh:rec.get('jlbh')}});
							}
						}
			},
			'mng_Express #grdExpress':{
				selectionchange:function(grid,recs){
					if(recs.length>0){
						me.detailStore.load({params:{jlbh:recs[0].get('jlbh')}});
						me.issueStore.load({params:{jlbh:recs[0].get('jlbh')}});
					}
				},
				itemdblclick:function(grid,rec){
					if(!me.getMngExpress().checkStatus(erp.Const.FUNC_ITEMID_BTN_EDT)){
						return;
					}
					me.doMaintainAction(erp.Const.FUNC_ITEMID_BTN_EDT);
				}
			},
			'mng_Express button':{
				click:me.doAction
			},
			
			'edt_Express button':{
				click:me.doEditAction
			},
			'chjhdrWin button':{
				click:me.dochjhdrAction
			},
			'expressCalWin button':{
				click:me.docalAction
			},
			'upExpressfee button':{
				click:me.doupExpressfee
			}
		});
		me.isInited=true;
	},
	/**
	 * 
	 * @param {} 入参item:打印选项
	 * @return {}	 出参recs：选择记录或NULL
	 */
	PrintProcess:function(item){
		var me=this;
		var grid=me.getMngExpress().down('#grdExpress');
		var recs=grid.getSelectionModel().getSelection();
		return recs;
	},
	doAction:function(btn){
		var me=this;
		if(btn.itemId==erp.Const.FUNC_ITEMID_BTN_COPY || btn.itemId==erp.Const.FUNC_ITEMID_BTN_DEL
			|| btn.itemId==erp.Const.FUNC_ITEMID_BTN_LOCK || btn.itemId==erp.Const.FUNC_ITEMID_BTN_ACC
			|| btn.itemId==erp.Const.FUNC_ITEMID_BTN_RESIGN
			|| btn.itemId==erp.Const.FUNC_ITEMID_BTN_SIGN || btn.itemId==erp.Const.FUNC_ITEMID_BTN_STOP){
			if(!me.getMngExpress().checkStatus(btn.itemId)){
				return;
			}
		}
		switch (btn.itemId){
			case erp.Const.FUNC_ITEMID_BTN_ADD:
			case erp.Const.FUNC_ITEMID_BTN_COPY:					
				me.doMaintainAction(btn.itemId);
				break;
			case erp.Const.FUNC_ITEMID_BTN_DEL:
				me.dodeleteAction();
				break;
			case erp.Const.FUNC_ITEMID_BTN_LOCK:
				me.dolockAction();
				break;
			case erp.Const.FUNC_ITEMID_BTN_ACC:
				me.doaccAction();
				break;
			case erp.Const.FUNC_ITEMID_BTN_RESIGN:
				me.domakesureAction();
				break;
			case erp.Const.FUNC_ITEMID_BTN_SIGN://结算
				me.dosign();
				break;
			case erp.Const.FUNC_ITEMID_BTN_STOP://批量结算
				me.dobatchsign();
				break;
			case 'btn_query':
				var win=Ext.widget('expressQueryWin',{
					itemId:'expressQueryWin',
					mainstore:me.grdStore,
					mainview:me.panel,
					rec:me.query_rec
				});
				win.show();
				break;
			case erp.Const.FUNC_ITEMID_BTN_BACKUP:
				var me = this;
				var recs=me.grdmain.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选中一条记录');
					return;
				}
				var gdbj=recs[0].get('gdbj');
				var alertmsg="是否"+(gdbj==0?'归档':'恢复')+"确认所选记录?";
				Ext.Msg.confirm('提示',alertmsg,function(btn){
					if (btn=="yes"){									
						Ext.each(recs,function(rec){
							var gdbj;
							if(rec.get('gdbj')==1){
								rec.set('gdbj',0);
							}
							else{
								rec.set('gdbj',1);
							}						
						});
						me.grdStore.sync({
							success: function(batch,options) {
								 me.grdStore.reload();
							}
						});					
					}
				});
				break;
			case erp.Const.FUNC_ITEMID_BTN_HISTORY:
				var me = this;
				var panel=me.getMngExpress();				
				var btnBackup=panel.down('#'+erp.Const.FUNC_ITEMID_BTN_BACKUP);
				if (btn.getText()=="历史")
				{	
					btn.setText('当前');
					btnBackup.setText('恢复');
					btnBackup.setIconCls('book_previous');
					Ext.apply(me.grdStore.proxy.extraParams,{gdbj:1});
				}
				else{
					btnBackup.setText('归档');
					btnBackup.setIconCls('book_next');
					btn.setText('历史');
					Ext.apply(me.grdStore.proxy.extraParams,{gdbj:0});
				}
				me.grdStore.reload();
				break;
			case erp.Const.FUNC_ITEMID_BTN_REFRESH:
				var grid = me.getMngExpress().down('#grdExpress');
				var recs=grid.getSelectionModel().getSelection();
				me.grdStore.load({callback:function(records,operation,success){
					if(recs.length!=0){
						me.detailStore.load({params:{jlbh:recs[0].get('jlbh')}});
						me.issueStore.load({params:{jlbh:recs[0].get('jlbh')}});
					}else if(records.length>0){
						grid.getSelectionModel().select(records[0]);
					}
				}})
				break;
			case 'upExpressfee_btn':
				var win=Ext.widget('upExpressfee',{
				  	itemId:'upExpressfee'
				});	
				win.show();
				break;
		}
	},
	doMaintainAction:function(type){
		var me=this;
		var rec;
		var isAdd=isEdit=isCopy=false;
		var old_jlbh=-1;
		switch(type){
			case erp.Const.FUNC_ITEMID_BTN_ADD:
					isAdd=true;
					isEdit=false;
					var ywybh='';
					var sellKind=null;
					var node=me.getMngExpress().down('treepanel').getSelectionModel().getSelection()[0]
					if (node!=null&&!Ext.isEmpty(node)&&node.get('nodeId')!=0){
							sellKind=node.get('nodeId');						
						}
					
					if(!erp.Util.currentUser.isAdmin){
						var wro=erp.Const.callServiceMethodSync('essell/salesman.crm?method=getSalesmanList',{
											    	czy_gh:erp.Util.currentUser.accountMap[0].ref_u_id
											}).data;
						if(wro!=null&&wro.length>0){
							if(sellKind==null||sellKind==''){
								sellKind=wro[0].xslb
							}
							if(sellKind==wro[0].xslb){
								 ywybh=wro[0].ywybh
							}
						}
					}
					var today=new Date();
					rec=Ext.create('erp.express.model.Express',{
						jlbh: 0,
						sqrq:today,
						sjrq:today,
						jjrq:today,
						xslb:sellKind,
						ywym:ywybh
					});
					console.log(node)
					if(node){
						rec.set('xslb',node.get('nodeId').toString());
					}
					break;
			case erp.Const.FUNC_ITEMID_BTN_EDT:
					isAdd=false;
					rec=me.grdmain.getSelectionModel().getSelection()[0];
					old_jlbh=rec.get('jlbh');
					isEdit=true;
					break;
			case erp.Const.FUNC_ITEMID_BTN_COPY:
					var node=me.getMngExpress().down('treepanel').getSelectionModel().getSelection()[0];
					var old_rec = me.grdmain.getSelectionModel().getSelection()[0];
					old_jlbh=old_rec.get('jlbh');
					rec=old_rec.copy();
					rec.phantom=true; 
					//申请日期、寄件日期、要求寄件应该为当天20150901wq
					rec.set('sqrq',new Date());
					rec.set('sjrq',new Date());
					rec.set('jjrq',new Date());
					//刚复制过来的快递寄送单，编辑状态上界面的结算信息应为空20150901wq
					rec.set('ypzl',0);
					rec.set('dsfy',0);
//					rec.set('wbfy',0);
//					rec.set('wbbh','');
//					rec.set('wbhl',0);
					rec.set('jfzl',0);
					rec.set('tj',0);
					rec.set('bzsm',0);
					rec.set('jlbh',0);
					rec.set('jsbj',0);
					rec.set('gdbj',0);
					rec.set('qfbj',0);
					rec.set('sfbj',0);
					rec.set('sdbj',0);
					rec.set('yjbj',0);
					rec.set('czsj',new Date());
					rec.set('czrm',erp.Util.currentUser.userInfo.name);
					rec.set('ydfy',0);//已导费用复制否值为0
					isAdd = true;
					isEdit = false;
					isCopy=true;
					if(node){
						rec.set('xslb',node.get('nodeId'));
					}
					break;
		}
		var panel = erp.Util.addContentTab({
			xtype : 'edt_Express',
			itemId:'edt_Express',
			title : '快递寄送维护',
			isAdd : isAdd,
			isEdit : isEdit,
			isCopy:isCopy,
			rec:rec,
			mainstore:me.grdStore,
			czybmlbbStore:me.czybmlbbStore,
			provinceStore:me.provinceStore,
			closable : true
		});
		console.log(panel)
		console.log(rec)
		panel.loadData(rec,old_jlbh);
		
		
	},
	
	doEditAction:function(btn){
		var me=this;
		var edtExpress=me.getEdtExpress();
		var grdExpressDetail=edtExpress.down('#grdExpressDetail');
		var detailStore=grdExpressDetail.getStore();
		var grdIssueDetail=edtExpress.down('#grdIssueDetail');
		var issueStore=grdIssueDetail.getStore();
		
		var form=edtExpress.down('form');
		switch(btn.itemId){
			case 'BTN_CHJHDR':
				var win=Ext.widget('chjhdrWin',{
					itemId: 'chjhdrWin',
					closable: true
				});
				win.show();
				break;
			case 'BTN_CAL_FEE':
				var win=Ext.widget('calExpressMoney',{
					itemId: 'calExpressMoney',
					closable: true
				});
				win.down('#btn_confirm1').on({
					click:function(btn){
						var grid =win.down('#grdExpressDetail');
						var rec=grid.getSelectionModel().getSelection()[0];
						form.down('#csbh').setValue(rec.get('csbh'));
						form.down('#yjyf').setValue(rec.get('zfy'));
						win.close();
					}
				})
				win.show();				
				break;
			case 'btn_Expressdetaill_add':
				 var rec =  form.getRecord();
	             form.updateRecord(rec);
	             var maxxh = detailStore.max('jlxh');
	             maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
				var newrec=Ext.create('erp.express.model.ExpressDetail',{
					jlbh : rec.get('jlbh'),
					cpbh:'',
					jlxh:maxxh,
					sfbj:2
				});
				detailStore.add(newrec)
				/*detailStore.insert(detailStore.getCount(),newrec);*/
				break;	
			case 'btn_Issuedetaill_add':
				var cybh=form.down('#cybh').getValue();
				if(cybh!=null && cybh!=''){
					Ext.Msg.alert('提示','上界面已有出运编号，不允许增加寄单明细');
					return;
				}
				var maxxh = issueStore.max('jlxh');
				maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
				var newrec=Ext.create('erp.express.model.ExpressIssue',{
					cybh:'',
					jlxh:maxxh
				});
				issueStore.add(newrec);
				edtExpress.updatecybhstatus();
				break;
			case 'btn_Expressdetaill_del':
			 	var recs=grdExpressDetail.getSelectionModel().getSelection();
			 	Ext.Msg.confirm("提示", "真的要删除所选择的项目吗?", function(btn) {
					if (btn == "yes") {
						Ext.Array.each(recs,function(rec){
							grdExpressDetail.getStore().remove(rec);// 从 Store 中删除给定的记录,
						});
					}
				})
				break;
			case 'btn_Issuedetaill_del':
			 	var recs=grdIssueDetail.getSelectionModel().getSelection();
			 	Ext.Msg.confirm("提示", "真的要删除所选择的项目吗?", function(btn) {
					if (btn == "yes") {
						Ext.Array.each(recs,function(rec){
							grdIssueDetail.getStore().remove(rec);// 从 Store 中删除给定的记录,
						});
						edtExpress.resetsomeinfo();
						edtExpress.updatecybhstatus();
					}
				});				
				break;
			case 'BTN_SAVE':
				var xslb=form.down('#xslb').getValue();
				var wtrm=form.down('#wtrm').getValue();
				var ssbm=form.down('#ssbm').getValue();
				var csbh=form.down('#csbh').getValue();
				var sjdh=form.down('#sjdh').getValue();
				var sjdw=form.down('#sjdw').getValue();
				var gbdq=form.down('#gbdq').getValue();
			 	var gjgn=form.down('#gjgn').getValue();
			 	var khbh=form.down('#khbh').getValue();
			 	var dsfs=form.down('#dsfs').getValue();
			 	var fffs=form.down('#fffs').getValue();
			 	var wtrdh=form.down('#wtrdh').getValue();
			 	var sjdz=form.down('#sjdz').getValue();
			 	var sjrm=form.down('#sjrm').getValue();
			 	var sjrdh=form.down('#sjrdh').getValue();
			 	var dfzh=form.down('#dfzh').getValue();
			 	var fphm=form.down('#fphm').getValue();
			 	var kdry=form.down('#kdry').getValue();
			 	var sjdh=form.down('#sjdh').getValue();
			 	var bzsm=form.down('#bzsm').getValue();
			 	var dsyq=form.down('#dsyq').getValue();
				if(form.getForm().isValid()&&form.getForm().isDirty()){
					if(dsyq!=null && erp.Util.gettextlength(dsyq)>200){
						Ext.Msg.alert('提示',"上界面的备注说明输入范围最大值为100个中文或者200个英文、数字！");
						return;
					}
					if(bzsm!=null && erp.Util.gettextlength(bzsm)>255){
						Ext.Msg.alert('提示',"备注说明输入范围最大值为127个中文或者255个英文、数字！");
						return;
					}
					if(kdry!=null && erp.Util.gettextlength(kdry)>40){
						Ext.Msg.alert('提示',"寄件单号输入范围最大值为20个中文或者40个英文、数字！");
						return;
					}
					if(kdry!=null && erp.Util.gettextlength(kdry)>8){
						Ext.Msg.alert('提示',"快递员输入范围最大值为4个中文或者8个英文、数字！");
						return;
					}
					if(dfzh!=null && erp.Util.gettextlength(dfzh)>40){
						Ext.Msg.alert('提示',"到付账号输入范围最大值为20个中文或者40个英文、数字！");
						return;
					}
					if(sjrm!=null && erp.Util.gettextlength(sjrm)>50){
						Ext.Msg.alert('提示',"收件人输入范围最大值为25个汉字或者50个字母、数字！");
						return;
					}
					if(fphm!=null && erp.Util.gettextlength(fphm)>20){
						Ext.Msg.alert('提示',"发票号码输入范围最大为20个数字！");
						return;
					}
					if(fphm==null||fphm==''){
						form.down('#fphm').setValue(' ');
					}
					if(wtrdh!=null && erp.Util.gettextlength(wtrdh)>20){
						Ext.Msg.alert('提示',"委托电话输入范围最大为20个数字！");
						return;
					}
					if(sjrdh!=null && erp.Util.gettextlength(sjrdh)>20){
						Ext.Msg.alert('提示',"收件电话输入范围最大为20个数字！");
						return;
					}
					if(sjdz!=null && erp.Util.gettextlength(sjdz)>200){
						Ext.Msg.alert('提示',"收件地址输入范围最大值为100个汉字或者200个字母、数字！");
						return;
					}
					if(dsfs==0){
				 		Ext.Msg.alert('提示','请选择递送方式');
						return;
				 	}
				 	if(fffs==0){
				 		Ext.Msg.alert('提示','请选择付费方式');
						return;
				 	}
				 	if(gbdq=='CHINA' && gjgn!=2){
			 			Ext.Msg.alert('提示','中国应设置为国内');
						return;
			 		}
					var detail_recs=detailStore.getRange();
					
					for(var i=0;i<detail_recs.length;i++){
						var cpbh=detail_recs[i].get('cpbh');
						if(Ext.isEmpty(cpbh)){
							Ext.Msg.alert('提示','第'+(i+1)+'行产品不存在!');
							return;
						}					
					}
					
					var cybh=form.down('#cybh').getValue();
					if(!Ext.isEmpty(cybh)){
						var wro=erp.Const.callServiceMethodSync('es/express.crm?method=checkData',{
					    	cybh:cybh
					 	});
					 	console.log(wro)
					 	if(wro.flag==0){
					 		Ext.Msg.alert('提示',wro.msg);
							return;
					 	}					
					}
					
				 	var issue_count=issueStore.getCount();
				 	if(!Ext.isEmpty(cybh) && issue_count>0){
				 		Ext.Msg.alert('提示','上界面出运编号与寄单明细不能同时存在');
						return;
				 	}
			 		
				}else{					
					if(Ext.isEmpty(xslb)){
				 		Ext.Msg.alert('提示','销售类别不能为空');
						return;
				 	}				 	
					if(Ext.isEmpty(wtrm)){
				 		Ext.Msg.alert('提示','委托人不允许空');
						return;
				 	}				 	
					if(Ext.isEmpty(ssbm)){
				 		Ext.Msg.alert('提示','所属部门不能为空,请重新选择委托人');
						return;
				 	}			 	
//					if(Ext.isEmpty(khbh)){
//				 		Ext.Msg.alert('提示','请重新选择客户');
//						return;
//				 	}				 	
					if(Ext.isEmpty(csbh)){
				 		Ext.Msg.alert('提示','快递公司不能为空，请重新选择!');
						return;
				 	}				 	
					if(Ext.isEmpty(sjdh)){
				 		Ext.Msg.alert('提示','寄件单号不能为空!');
						return;
				 	}				 	
					if(Ext.isEmpty(sjdw)){
				 		Ext.Msg.alert('提示','收件单位不能为空!');
						return;
				 	}				 	
			 		if(Ext.isEmpty(gbdq)){
				 		/*Ext.Msg.alert('提示','递送国别不能为空!');*/
						return;
				 	}
			 		
					Ext.Msg.alert('提示','请检查数据');
					return;
				}
				//以上均为验证
				var isAdd=edtExpress.isAdd;
				var isEdit=edtExpress.isEdit;
				var rec=form.getRecord();
				form.updateRecord(rec);
				var issue_recs=issueStore.getRange();
				var cybharray='';
				for(var i=0;i<issue_recs.length;i++){
					var cybh=issue_recs[i].get('cybh');
					cybharray=cybharray+(cybh+",");				
				}
				rec.set('cybh_hz',cybharray.length>0?cybharray.substring(0,cybharray.length-1):'');
				rec.set('czym',erp.Util.currentUser.userInfo.name);
				rec.set('czsj',new Date());
				if(Ext.isEmpty(rec.get('cybh'))){
					rec.set('cybh','');
				}
				if(Ext.isEmpty(rec.get('gbdq'))){
					rec.set('gbdq','');
				}
				if(Ext.isEmpty(rec.get('khbh'))){
					rec.set('khbh','');
				}
				Ext.getBody().mask('正在保存,请稍候...');				
				if(me.grdStore.indexOf(rec) >= 0&&rec.get('jlbh')!=0){
						me.grdStore.sync(
						{
							success: function(batch,options) {	
								//edtExpress.close();
							}
						}
					);
					me.doupdateData(rec,detailStore,issueStore);
					Ext.getBody().unmask();
					me.grdStore.reload();
				}else{
					//防止增加多笔数据  20150630 wq
					rec.phantom =true;//表示新增
					me.grdStore.add(rec);
	    			me.grdStore.sync(
						{
							success : function(e, batch) {
								 var newRec=batch.operations.create[0];
								 form.loadRecord(newRec);
								 me.doupdateData(newRec,detailStore,issueStore);
								 Ext.getBody().unmask();
								 me.grdStore.reload();
								 //edtExpress.close();
							}
						}
					);
				}				
				break;
		}
				
	},
	doupdateData:function(newRec,detailStore,issueStore){
		var me=this;
		detailStore.each(function(record){
  			record.set('jlbh',newRec.get('jlbh'));
  		});
  		detailStore.sync();
  		issueStore.each(function(record){
  			record.set('jlbh',newRec.get('jlbh'));
  		});
  		issueStore.sync();
		 //me.grdStore.reload();//会取消掉form中记录和store的关联关系
		 erp.Const.callServiceMethodSync('es/express.crm?method=updateOthData',{
	    	jlbh:newRec.get('jlbh')
	 	})
		 Ext.Msg.alert('提示','保存成功!');
	},
	dochjhdrAction:function(btn){
		var me=this;
		var win=me.getChjhdrWin(); 
		var gridchjh=win.down('grid');
		
		var edtExpress=me.getEdtExpress();
		
		var grdIssueDetail=edtExpress.down('#grdIssueDetail');
		var issueStore=grdIssueDetail.getStore();		
		var form=edtExpress.down('form');
		
		if (btn.itemId=='btn_confirm'){
			var cybh=form.down('#cybh').getValue();
			if(!Ext.isEmpty(cybh)){
				Ext.Msg.alert('提示','上界面已有出运编号，不允许增加寄单明细');
				return;
			}
			var sel_recs=gridchjh.getSelectionModel().getSelection();
			if(sel_recs.length==0){
				Ext.Msg.alert('提示','请选择一条或多条记录再进行操作！');
				return;
			}
			var old_count=issueStore.max('jlxh')==null?1:issueStore.max('jlxh')+1;
			for(var i=0;i<sel_recs.length;i++){
				if(old_count==0){
					form.down('#khbh').setValue(m['khbh']);
					form.down('#sjdz').setValue(m['khdz']);
					form.down('#dfzh').setValue(m['dfzh']);
				}
				var newrec=Ext.create('erp.express.model.ExpressIssue',{					
					jlxh:old_count,
					cybh:sel_recs[i].get('cybh'),
					chrq:sel_recs[i].get('chsj'),
					yfje:sel_recs[i].get('yfje')
				});
				issueStore.add(newrec);
			}
			edtExpress.resetsomeinfo();
			edtExpress.updatecybhstatus();
			win.close();
		}
	},
	dodeleteAction:function(){
		var me=this;
		var sel_rec = me.grdmain.getSelectionModel().getSelection()[0];
		if(Ext.isEmpty(sel_rec)){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var jsbj=sel_rec.get('jsbj');
		var sdbj=sel_rec.get('sdbj');
		var jlbh=sel_rec.get('jlbh');
		if(jsbj==1){
			Ext.Msg.alert('提示','该记录已经结算，不能删除！');
			return;
		}
		if(sdbj==1){
			Ext.Msg.alert('提示','该记录已经锁定，不能删除！');
			return;
		}
		Ext.Msg.confirm("提示","确认删除记录?",function(btn){
			if (btn=="yes")
			{	
				me.grdStore.remove(sel_rec);
				me.grdStore.sync({
					success: function(batch,options) {
						 me.grdStore.reload();
					}
				});																	
			}//if (btn=="yes")
		})
	},
	dolockAction:function(){
		var me=this;
		var bool=false;
		var recs=me.grdmain.getSelectionModel().getSelection();
		var sel_rec = recs[0];
		if(recs.length<1){
			Ext.Msg.alert('提示','请先选中一条记录');
			bool=true;
			return;
		}
		var sdbj=sel_rec.get('sdbj');
		var qfbj=sel_rec.get('qfbj');
		Ext.each(recs,function(rec){
			if(rec.get('sdbj')!=sdbj){
				Ext.Msg.alert('提示','锁定标记不一致，请重试！');	
				bool=true;
			}
		})
		if(sdbj==1){
			Ext.each(recs,function(rec){
				if(rec.get('qfbj')==1){
					Ext.Msg.alert('提示','所选记录记录编号'+rec.get('jlbh')+'已邮寄,不能取消锁定!');	
					bool=true;
				}
			})
		}
		if(bool){
			return;
		}
		var alertmsg="是否"+(sdbj==0?'':'取消')+"锁定所选记录?";
				
		Ext.Msg.confirm("提示",alertmsg,function(btn){
			if (btn=="yes")
			{	
				Ext.each(recs,function(rec){
					if(sdbj==0){
						rec.set('sdbj',1);	
					}else{
						rec.set('sdbj',0);
					}
					rec.set('sdsj',new Date());
					rec.set('sdrm',erp.Util.currentUser.userInfo.name);
				})

				me.grdStore.sync({
				success: function(batch,options) {
					  me.grdStore.reload({
					        callback: function(records, operation, success) {
					        	me.grdmain.getSelectionModel().select(recs[0]);
					        }
					 });
				}
				});	
			}//if (btn=="yes")
		})
	
	},
	doaccAction:function(){
		var me=this;
		var bool=false;
		var recs=me.grdmain.getSelectionModel().getSelection();
		var sel_rec = recs[0];
		if(Ext.isEmpty(sel_rec)){
			Ext.Msg.alert('提示','请先选中一条记录');
			bool=true;
			return;
		}
		var sdbj=sel_rec.get('sdbj');
		var qfbj=sel_rec.get('qfbj');//这个是邮寄
		var jsbj=sel_rec.get('jsbj');
		Ext.each(recs,function(rec){
			if(rec.get('qfbj')!=qfbj){
				Ext.Msg.alert('提示','邮寄标记不一致，请重试！');	
				bool=true;
				return;
			}
		})
		//邮寄前检查所选记录是否已锁定
		if(qfbj==0){
			Ext.each(recs,function(rec){
				if(rec.get('sdbj')==0){
					Ext.Msg.alert('提示','所选记录记录编号'+rec.get('jlbh')+'未锁定,不能邮寄!');	
					bool=true;
					return;
				}
			})
		}else{
			Ext.each(recs,function(rec){
				if(rec.get('jsbj')==1){
					Ext.Msg.alert('提示','所选记录记录编号'+rec.get('jlbh')+'已经结算，不能取消邮寄!');	
					bool=true;
					return;
				}
			})
		}
		if(bool){
			return;
		}
		var alertmsg="是否"+(qfbj==0?'':'取消')+"邮寄所选记录?";
				
		Ext.Msg.confirm("提示",alertmsg,function(btn){
			if (btn=="yes")
			{	
				Ext.each(recs,function(rec){
					if(qfbj==0){
						rec.set('qfbj',1);	
					}else{
						rec.set('qfbj',0);
					}
				})					
				me.grdStore.sync({
				success: function(batch,options) {
					 me.grdStore.reload();
				}
				});	
			}//if (btn=="yes")
		})
	
	},
	domakesureAction:function(){
		var me=this;
		var sel_rec = me.grdmain.getSelectionModel().getSelection()[0];
		if(Ext.isEmpty(sel_rec)){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var sdbj=sel_rec.get('sdbj');
		var yjbj=sel_rec.get('yjbj');//这个是确认，也是回签
		var alertmsg="是否"+(yjbj==0?'':'取消')+"确认所选记录?";
				
		Ext.Msg.confirm("提示",alertmsg,function(btn){
			if (btn=="yes")
			{	
				if(yjbj==0){
					if(sdbj==0){
						Ext.Msg.alert('提示','所选记录未锁定,不能确认!');
						return;
					}
					sel_rec.set('yjbj',1);	
				}else{					
					sel_rec.set('yjbj',0);
				}				
				me.grdStore.sync({
					success: function(batch,options) {
						 me.grdStore.reload();
					}
				});	
			}//if (btn=="yes")
		})
	},
	dobatchsign:function(){
		var me=this;
		var sel_recs = me.grdmain.getSelectionModel().getSelection();
		if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var flag_jsbj=sel_recs[0].get('jsbj');
		for(var i=0;i<sel_recs.length;i++){
			if(sel_recs[i].get('qfbj')==0){
				Ext.Msg.alert('提示','有记录尚未邮寄,不能结算!');
				return;
			}
			if(flag_jsbj!=sel_recs[i].get('jsbj')){
				Ext.Msg.alert('提示','结算标记不统一');
				return;
			}
		}
		
		var alertmsg="是否"+(flag_jsbj==0?'':'取消')+"结算所选记录?";
				
		Ext.Msg.confirm("提示",alertmsg,function(btn){
			if (btn=="yes")
			{	
				if(flag_jsbj==0){
					for(var i=0;i<sel_recs.length;i++){
						sel_recs[i].set('jsbj',1);	
					}
				}else{					
					for(var i=0;i<sel_recs.length;i++){
						sel_recs[i].set('jsbj',0);	
					}
				}				
				me.grdStore.sync({
					success: function(batch,options) {
						 me.grdStore.reload();
					}
				});	
			}//if (btn=="yes")
		})
	},
	dosign:function(){
		var me=this;
		var sel_rec = me.grdmain.getSelectionModel().getSelection()[0];
		if(sel_rec.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var flag_jsbj=sel_rec.get('jsbj');		
		if(sel_rec.get('qfbj')==0){
			Ext.Msg.alert('提示','有记录尚未邮寄,不能结算!');
			return;
		}
		var win=Ext.widget('expressCalWin',{
			itemId:'expressCalWin',
			rec:sel_rec
		});
		win.show();
	},
	docalAction:function(btn){
		var me=this;
		if(btn.itemId=='BTN_SAVE'){
			var win=me.getExpressCalWin();
		
			var form=win.down('form');
			var rec=form.getRecord();
			form.updateRecord(rec);
			me.grdStore.sync({
				success: function(batch,options) {
					me.grdStore.reload();
					 
					var detail_recs=me.detailStore.getRange();
					var flag=false;
					for(var i=0;i<detail_recs.length;i++){
						if(!Ext.isEmpty(detail_recs[i].get('zzhm')) && detail_recs[i].get('zzhm').indexOf('-')>0){
							flag=true;
							break;
						}
					}
					if(flag){
						//更新递送标记
						erp.Const.callServiceMethodSync('es/express.crm?method=updateOtherdsbj',{
					    	jlbh:rec.get('jlbh')
					 	})
					}
					win.close();
				}
			});
			
		}
	},
	doupExpressfee:function(btn){
		var me=this;
		var upFileWin=me.getUpExpressfee();
		var form=upFileWin.down('form');
		
		if(btn.itemId=='btn_save' && form.getForm().isValid()){						
			 form.submit({
                    url : 'es/upExpressfee.crm',
                    method:'POST',
                    timeout : 10,
                    params: {},
                    waitMsg : '正在上传解析文件...',
                    success : function(form, action) {
                    	Ext.Msg.alert('提示', action.result.msg);
                    	me.grdStore.reload();
                    	if(action.result.flag==1){
                    		upFileWin.close();
                    	}                 	
                    },
                    failure : function() {
                        Ext.Msg.alert("提示", "上传解析失败");
                    }
             });
		}
	}
})