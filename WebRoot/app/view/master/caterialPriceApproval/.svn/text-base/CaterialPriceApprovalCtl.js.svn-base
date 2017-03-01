Ext.define('erp.view.master.caterialPriceApproval.CaterialPriceApprovalCtl', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'erp.ux.ComboxTree',
        'erp.view.master.caterialPriceApproval.view.EdtCaterialPriceApproval',
        'erp.view.master.caterialPriceApproval.window.CompanyImp',
        'erp.view.master.company.store.CompanyShow'
    ],
	control:{
		'CaterialPriceApproval #CaterialPriceApprovalBar button':{
			click:'onClickButton'			
		},
		'EdtCaterialPriceApproval #EdtCaterialPriceApprovalBar button':{
			click:'onEdtClickButton'
		}
	},
    alias: 'controller.CaterialPriceApprovalCtl',
	onEdtClickButton:function(btn){
		var mStore=this.getView().store;
		var dGrid=this.lookupReference('CaterialPriceDetailGrid');
		var drecs=dGrid.getSelectionModel().getSelection();
		var dStore=dGrid.getStore();
		var cGrid=this.lookupReference('CaterialPriceCompanyGrid');
		var cStore=cGrid.getStore();
		var edtPanel=this.getView();
		switch(btn.itemId){
			case 'priceAdd':
				var jlxh=dStore.max('jlxh');
				if(jlxh==null){
					jlxh=1
				}else{
					jlxh++;
				}
				var r=Ext.create('erp.view.master.caterialPriceApproval.model.CaterialPriceDetail',{
					jlbh:0,
					jlxh:jlxh
				});
				r.phantom=true;
				dStore.add(r);
			break;
			case 'companyAdd':
				if(drecs.length==0){
					Ext.Msg.alert('提示','请选择至少一条明细！');
					break;
				}
				var drec=drecs[0];
				var win=Ext.create('erp.view.master.caterialPriceApproval.window.CompanyImp');
				win.down('#btn_confirm').on({
					click:function(btn){
						var win=btn.up('window');
						if(win.selStore.length==0){
							Ext.Msg.alert('提示','请至少选择一条记录！');
							return ;
						}
						var bool=false;
						win.selStore.each(function(rec){
							cStore.each(function(cr){
								if(cr.get('csbh')==rec.get('csbh')){
									Ext.Msg.alert('提示','【'+rec.get('csmc')+'】已存在,添加失败！');
									bool=true;
									return false;
								}
							});
							if(bool){
								return false;
							}
							var r=Ext.create('erp.view.master.caterialPriceApproval.model.CaterialPriceCompany',{
								jlbh:drec.get('jlbh'),
								jlxh:drec.get('jlxh'),
								csbh:rec.get('csbh'),
								csmc:rec.get('csmc')
							});
							r.phantom=true;
							cStore.add(r);
						});
						if(bool){
								return ;
						}
						win.close();
					}
				})
				win.show();
			break;
			case 'priceDel':
				Ext.Msg.confirm('提示','是否确认删除所选记录?',function(btn){
					if (btn=='yes'){
						Ext.each(drecs,function(r){
							crecs=cStore.getRange();
							Ext.each(crecs,function(cr){
								if(r.get('jlxh')==cr.get('jlxh')){
									cStore.remove(cr);
								}
							})
						})
						dStore.remove(drecs);
					}			
				});
			break;
			case 'companyDel':
				var recs=cGrid.getSelectionModel().getSelection();
				Ext.Msg.confirm('提示','是否确认删除所选记录?',function(btn){
					if (btn=='yes'){
						cStore.remove(recs);
					}			
				});
			break;
			case 'BTN_SAVE':
				var form =this.lookupReference('CaterialPriceApprovalForm');
				var rec=form.getRecord();
				form.updateRecord(rec);
				var vm=this.getViewModel();
				var vDate=vm.getData(); 
				var bool=false;
				dStore.each(function(dr){
					if(!vDate.spjg1.hidden){
						if(dr.get('spjg1')==0){
							Ext.Msg.alert('提示','序号为【'+dr.get('jlxh')+'】的记录【'+vDate.spjg1.text+'】不能为空');
							bool=true;
							return false
						}
					}
					if(!vDate.spjg2.hidden){
						if(dr.get('spjg2')==0){
							Ext.Msg.alert('提示','序号为【'+dr.get('jlxh')+'】的记录【'+vDate.spjg2.text+'】不能为空');
							bool=true;
							return false
						}
					}
					if(!vDate.spjg3.hidden){
						if(dr.get('spjg3')==0){
							Ext.Msg.alert('提示','序号为【'+dr.get('jlxh')+'】的记录【'+vDate.spjg3.text+'】不能为空');
							bool=true;
							return false
						}
					}
					if(!vDate.spjg4.hidden){
						if(dr.get('spjg4')==0){
							Ext.Msg.alert('提示','序号为【'+dr.get('jlxh')+'】的记录【'+vDate.spjg4.text+'】不能为空');
							bool=true;
							return false
						}
					}
					if(!vDate.spjg5.hidden){
						if(dr.get('spjg5')==0){
							Ext.Msg.alert('提示','序号为【'+dr.get('jlxh')+'】的记录【'+vDate.spjg5.text+'】不能为空');
							bool=true;
							return false
						}
					}
				})
				if(bool){
					break;
				}
				Ext.Msg.confirm('提示','是否确认保存?',function(btn){
					if (btn=='yes'){
						rec.set('czrm',erp.Util.currentUser.userInfo.name);
						rec.set('czrq',new Date());
						if(edtPanel.isAdd){
							mStore.add(rec);
							mStore.sync({callback:function(batch,option){
								var nrecs=option.operations.create;
								console.log(option);
								if(nrecs.length>0){
									var nrec=nrecs[0];
									dStore.each(function(dr){
										dr.set('jlbh',nrec.get('jlbh'));
									});
									cStore.each(function(cr){
										cr.set('jlbh',nrec.get('jlbh'));
									});
									dStore.sync();
									cStore.sync();
									mStore.loadPage(1);
									edtPanel.close();
								}
							}});
						}else{
							//mStore.Update(rec);
							mStore.sync({callback:function(batch,option){
								dStore.each(function(dr){
									dr.set('jlbh',rec.get('jlbh'));
								});
								cStore.each(function(cr){
									cr.set('jlbh',rec.get('jlbh'));
								});
								dStore.sync();
								cStore.sync();
								mStore.load();
								edtPanel.close();
							}});
						}
					}			
				});
			break;
		}
	},
    onClickButton: function (btn) {
    	var me=this;
    	var mainGrid=this.lookupReference('CaterialPriceApprovalGrid');
    	switch(btn.itemId){
			case 'BTN_ADD':
				var r = Ext.create('erp.view.master.caterialPriceApproval.model.CaterialPriceApproval', {
					jlbh:0,
					czrm:erp.Util.currentUser.userInfo.name,
					jlrq:new Date()
				});
				r.phantom=true;
				this.edtShow(r,true,true);
			break;
			case 'BTN_EDT':
				var rec=mainGrid.getSelectionModel().getSelection()[0];
				if(rec==null){
					Ext.Msg.alert('提示','请选择需要修改的明细!');
					break;
				}
				this.edtShow(rec,false,true);
			break;
			case 'BTN_DEL':
				var store=mainGrid.getStore();
				var recs=mainGrid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请选择需要删除的明细!');
					break;
				}
				var bool =false;
				Ext.each(recs,function(rec){
					if(rec.get('sdbj')==1){
						Ext.Msg.alert('提示','【'+rec.get('jlbh')+'】号记录已经锁定，不能删除!');
						bool=true;
						return false;
					}
				});
				if(bool){
					break;
				}
				Ext.Msg.confirm('提示','是否确认删除所选记录?',function(btn){
					if (btn=='yes'){
						store.remove(recs);
						store.sync({
							callback:function(){
								store.load();
							}
						});
					}			
				});
			break;
			case 'lock':
				var store=mainGrid.getStore();
				var recs=mainGrid.getSelectionModel().getSelection();
				if(recs==0){
					Ext.Msg.alert('提示','请至少选择一条记录!');
					break;
				}
				var rec=recs[0];
				var sdbj=1;
				var bb='确认';
				var czym=erp.Util.currentUser.userInfo.name;
				
				if(rec.get('sdbj')==1){
					sdbj=0;
					bb='取消';
					if(rec.get('qfbj')==1){
						Ext.Msg.alert('提示','【'+rec.get('jlbh')+'】号记录已签发，不能解锁定！');
						break;
					}
				}
				Ext.Msg.confirm('提示','是否'+bb+'锁定【'+rec.get('jlbh')+'】?',function(btn){
					if (btn=='yes'){
						rec.set('sdbj',sdbj);
						rec.set('sdrm',czym);
						rec.set('sdrq',new Date());
						store.sync({
							callback:function(){
								store.load();
							}
						});
					}			
				});
				break;
				case 'BTN_SIGN':
					var store=mainGrid.getStore();
					var recs=mainGrid.getSelectionModel().getSelection();
					if(recs==0){
						Ext.Msg.alert('提示','请至少选择一条记录!');
						break;
					}
					var rec=recs[0];
					var qfbj=1;
					var bb='确认';
					var czym=erp.Util.currentUser.userInfo.name;
					if(rec.get('qfbj')==1){
						qfbj=0;
						bb='取消';
						if(rec.get('qybj')==1){
							Ext.Msg.alert('提示','【'+rec.get('jlbh')+'】号记录已启用，不能解签发！');
							break;
						}
					}else{
						if(rec.get('sdbj')==0){
							Ext.Msg.alert('提示','【'+rec.get('jlbh')+'】号记录未锁定，不能签发！');
							break;
						}
					}
					//签发前判断数据
					var recordData = "["; //参数
					var a=false;
					Ext.each(recs, function(rec) {
							if (a) {
								recordData += ",";
							}
							recordData += Ext.encode(rec.data);
							a = true;
						})
					recordData += "]";
					var result = erp.Const.callServiceMethodSync(
							'caterialpriceapproval/caterialpriceapproval.act?method=getBeforSign', {
								recordData : recordData
							});
					var data = Ext.decode(result);
					if (data.bool == false) {
						Ext.Msg.alert('提示', data.msg)
						break;
					}
					Ext.Msg.confirm('提示','是否'+bb+'签发【'+rec.get('jlbh')+'】?',function(btn){
						if (btn=='yes'){
							rec.set('qfbj',qfbj);
							rec.set('qfrm',czym);
							rec.set('qfrq',new Date());
							store.sync({
								callback:function(){
									store.load();
								}
							});
						}			
					});
				break;
				case 'BTN_BACKUP':
					var store=mainGrid.getStore();
					var recs=mainGrid.getSelectionModel().getSelection();
					var czym=erp.Util.currentUser.userInfo.name;
					Ext.Msg.confirm('提示',"真的要归档/恢复所选记录?",function(btn){
						if (btn=="yes"){
							Ext.each(recs,function(rec){
								if(rec.get('gdbj')==1){
									rec.set('gdbj',0);
									rec.set('gdrq',new Date());
									rec.set('gdrm',czym);
								}
								else{
									rec.set('gdbj',1);
									rec.set('gdrq',new Date());
									rec.set('gdrm',czym);
								}
							});
							store.sync({
								callback:function(){
									store.load();
								}
							});
						}
					});
				break;
				case 'BTN_HISTORY':
					var panel=this.getView();
					var store=mainGrid.getStore();
					var recs=mainGrid.getSelectionModel().getSelection();
					var btnBackup=panel.down('#BTN_BACKUP');
					if (btn.getText()=="历史")
					{	
						btn.setText('当前');
						btnBackup.setText('恢复');
						btnBackup.setIconCls('book_previous');
						Ext.apply(store.proxy.extraParams,{history:1});
					}
					else{
						btnBackup.setText('归档');
						btnBackup.setIconCls('book_next');
						btn.setText('历史');
						Ext.apply(store.proxy.extraParams,{history:0});
					}
					store.load();
				break;
				case 'refreshPrice':
					var store=mainGrid.getStore();
					var recs=mainGrid.getSelectionModel().getSelection();
					if(recs==0){
						Ext.Msg.alert('提示','请至少选择一条记录!');
						break;
					}
					var rec=recs[0];
					if(rec.get('qfbj')==0){
						Ext.Msg.alert('提示','【'+rec.get('jlbh')+'】号记录未签发，不能刷新！')
						break;
					}
					if(rec.get('qybj')==1){
						Ext.Msg.alert('提示','【'+rec.get('jlbh')+'】号记录已启用，不能再次刷新！')
						break;
					}
					//签发前判断数据
					var recordData = "["; //参数
					var a=false;
					Ext.each(recs, function(rec) {
							if (a) {
								recordData += ",";
							}
							recordData += Ext.encode(rec.data);
							a = true;
						})
					recordData += "]";
					Ext.Ajax.setTimeout(12000000);
		            Ext.getBody().mask('正在进行刷新，请等待......');
					var result = erp.Const.callServiceMethodSync(
							'caterialpriceapproval/caterialpriceapproval.act?method=getBeforRefreshPrice', {
								recordData : recordData
							});
					var data = Ext.decode(result);
					Ext.getBody().unmask();
					if (data.bool == false) {
						Ext.Msg.confirm('提示', data.msg,function(btn){
							if (btn=="yes"){
								me.refreshPrice(rec);
							}
						})
					}else{
						me.refreshPrice(rec);
					}
				break;
    	}
    },
	edtShow:function(rec,isAdd,isEdit){
		var me=this;
		var mainGrid=this.lookupReference('CaterialPriceApprovalGrid');
		if(rec.get('sdbj')==1){
			isEdit=false;
		}
		var vm=me.getViewModel();
		var vmData=vm.getData();
		erp.Util.addContentTab({
			xtype:'EdtCaterialPriceApproval',
			itemId:'EdtCaterialPriceApproval',
			title : '材料审批价格编辑',
			isAdd : isAdd,
			isEdit : isEdit,
			vmData:vmData,
			mainPanel:this.getView(),
			store : mainGrid.getStore(),
			rec:rec,
			closable : true
		});
	},
	getColumnState:function(gsbh){
		//获取显示字段和显示名
		var result = erp.Const.callServiceMethodSync(
				'caterialpriceapproval/caterialpriceapproval.act?method=getColumnState', {
				gsbh : gsbh
		});
		var data = Ext.decode(result);
		if (data.bool == false) {
			Ext.Msg.alert('提示', data.msg)
			return true;
		}
		return data.column;
	},
	refreshPrice:function(rec){
		var me = this;
		var vm = me.getViewModel();
		var vDate = vm.getData();
		var jggs = vDate.jggs;
		var dStore = me.getView().dStore;
		var spjg1 = 0;
		var spjg2 = 0;
		var spjg3 = 0;
		var spjg4 = 0;
		var spjg5 = 0;
		if (dStore.getCount() > 0) {
			var dr = dStore.getAt(0);
			spjg1 = dr.get('spjg1');
			spjg2 = dr.get('spjg2');
			spjg3 = dr.get('spjg3');
			spjg4 = dr.get('spjg4');
			spjg5 = dr.get('spjg5');
		}
		if (!vDate.spjg1.hidden) {
			var regExp = new RegExp(vDate.spjg1.text, 'g');
			jggs = jggs.replace(regExp, spjg1);
		}
		if (!vDate.spjg2.hidden) {
			var regExp = new RegExp(vDate.spjg2.text, 'g');
			jggs = jggs.replace(regExp, spjg2);
		}
		if (!vDate.spjg3.hidden) {
			var regExp = new RegExp(vDate.spjg3.text, 'g');
			jggs = jggs.replace(regExp, spjg3);
		}
		if (!vDate.spjg4.hidden) {
			var regExp = new RegExp(vDate.spjg4.text, 'g');
			jggs = jggs.replace(regExp, spjg4);
		}
		if (!vDate.spjg5.hidden) {
			var regExp = new RegExp(vDate.spjg5.text, 'g');
			jggs = jggs.replace(regExp, spjg5);
		}
		//console.log(jggs);
		Ext.Ajax.setTimeout(12000000);
		Ext.getBody().mask('正在进行刷新，请等待......');
		var result = erp.Const.callServiceMethodSync('caterialpriceapproval/caterialpriceapproval.act?method=getRefreshPrice',
			{s_jggs : jggs,s_gsbh:rec.get('gsbh'),s_jlbh:rec.get('jlbh'),czrm:erp.Util.currentUser.userInfo.name});
		var data = Ext.decode(result);
		Ext.getBody().unmask();
		if (data.bool == false) {
			Ext.Msg.alert('提示',data.msg);
			return ;
		}
		var mainGrid=me.lookupReference('CaterialPriceApprovalGrid');
		mainGrid.getStore().load();
	}
});