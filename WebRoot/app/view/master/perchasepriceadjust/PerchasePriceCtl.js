Ext.define('erp.view.master.perchasepriceadjust.PerchasePriceCtl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PerchasePriceCtl',
    requires: [
        'Ext.window.MessageBox',
        'erp.ux.ComboxTree'
    ],
	control:{
		'PerchasePriceManager #PerchasepriceMainToolBar button':{
			click:'onClickButton'			
		},
		'PerchasePriceMaintain #EdtPerchasepriceBar button':{
			click:'onEdtClickButton'			
		}
	},
    onClickButton:function(btn){

    	var me=this;
    	var mainGrid=this.lookupReference('PerchasePriceGrid');
    	var czym=erp.Util.currentUser.userInfo.name;
    	switch(btn.itemId){
			case 'BTN_ADD':
				var treeGrid=this.lookupReference('perchasetree');
				var trees = treeGrid.getSelectionModel().getSelection();
				var tr = trees[0];
				var hsbm='';
				if(tr!=null){
					hsbm=tr.get('nodeId');
				}
				var r = Ext.create('erp.view.master.perchasepriceadjust.model.Cgjgtzb', {
					tjdh:0,
					hsbm:hsbm,
					czrm:erp.Util.currentUser.userInfo.name,
					czsj:new Date()
				});
				r.phantom=true;
				this.edtShow(r,true,true);
				break;
			case 'BTN_EDT':
				var recs=mainGrid.getSelectionModel().getSelection();
				if(czym!=Ext.String.trim(recs[0].get('czym'))&&!erp.Util.currentUser.isAdmin){
    				Ext.toastInfo("非本合同操作员不能编辑!");
					break;
    			}
				if(recs==null||recs.length<=0){
					Ext.Msg.alert('提示','请选择需要修改的明细!');
					break;
				}
				this.edtShow(recs[0],false,true);
			break;
			case 'BTN_DEL':
				var store=mainGrid.getStore();
				var recs=mainGrid.getSelectionModel().getSelection();
				if(czym!=Ext.String.trim(recs[0].get('czym'))&&!erp.Util.currentUser.isAdmin){
    				Ext.toastInfo("非本合同操作员不能删除!");
					break;
    			}
				if(recs.length==0){
					Ext.Msg.alert('提示','请选择需要删除的明细!');
					break;
				}
				var bool =false;
				Ext.each(recs,function(rec){
					if(rec.get('sdbj')==1){
						Ext.Msg.alert('提示','【'+rec.get('tjdh')+'】号记录已经锁定，不能删除!');
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
								store.loadPage(1);
							}
						});
					}			
				});
			break;
			case 'lock':
				var store=mainGrid.getStore();
				var recs=mainGrid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请选择一条记录!');
					break;
				}
				var rec=recs[0];
				var sdbj=1;
				var bb='确认';
				var czym=erp.Util.currentUser.userInfo.name;
				
				if(rec.get('sdbj')==1){
					sdbj=0;
					bb='取消';
					if(rec.get('tjbj')==1){
						Ext.Msg.alert('提示','【'+rec.get('tjdh')+'】号记录已提交，不能解锁定！');
						break;
					}
				}
				//锁定前判断数据
				var recordData = "["; //参数
				var a=false;
				Ext.each(recs, function(rec) {
						if (a) {
							recordData += ",";
						}
						recordData += Ext.encode(rec.data);
						a = true;
					});
				recordData += "]";
				var result = erp.Const.callServiceMethodSync(
						'perchase/perchase.act?method=check_bj', {
							recordData : recordData
						});
				var data = Ext.decode(result);
				if (data.suc == false) {
					store.reload();
					Ext.Msg.alert('提示', data.msg);
					break;
				}
				Ext.Msg.confirm('提示','是否'+bb+'锁定【'+rec.get('tjdh')+'】号记录?',function(btn){
					if (btn=='yes'){
							Ext.Ajax.request({
								// 将生成的xml发送到服务器端,需特别注意这个页面的地址
								url : 'perchase/perchase.act?method=update_bj',
								async : false,
								timeout : 600000,
								method : 'POST',
								waitMsg : '正在进行数据验证，请耐心等候...',
								success : function(response, opts) {
									store.reload();
								},
								params : {
									sdbj:sdbj,sdrm:czym,sdsj:new Date(),tjdh:rec.get('tjdh')
								}
							});
					}			
				});
				break;
			case 'BTN_QUERY':
			   var query_rec = Ext.create('erp.view.master.perchasepriceadjust.model.QueryParam');
			   var isCgy=false;
					Ext.each(erp.Util.currentUser.roleList,function(role){
						if(role.role_name=='采购员'){
							isCgy=true;
							return false;
						}
					})
			if(!erp.Util.currentUser.isAdmin&&isCgy){
		    			//判断当前操作员是否为采购员
							
							query_rec.set('czym',erp.Util.currentUser.name);
							query_rec.set('checkbox_czym',1);
					}		
            var win = Ext.widget('win_MainQuery',{
                     itemId : 'win_MainQuery',
                     mainstore: mainGrid.getStore(),
                     rec:query_rec
            });
            win.show();
			   break;
			case 'BTN_REFER':
				var store=mainGrid.getStore();
				var recs=mainGrid.getSelectionModel().getSelection();
				if(recs==0){
					Ext.Msg.alert('提示','请至少选择一条记录!');
					break;
				}
				var rec=recs[0];
				var tjbj=1;
				var bb='确认';
				var czygh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;
				var czym=erp.Util.currentUser.userInfo.name;
				if(rec.get('tjbj')==1){
					tjbj=0;
					bb='取消';
					if(rec.get('qfbj')==1){
						Ext.Msg.alert('提示','【'+rec.get('tjdh')+'】号记录已签发，不能取消提交！');
						break;
					}
				}else{
					if(rec.get('sdbj')==0){
						Ext.Msg.alert('提示','【'+rec.get('tjdh')+'】号记录未锁定，不能提交！');
						break;
					}
				}
				//提交前判断数据
				var recordData = "["; //参数
				var a=false;
				Ext.each(recs, function(rec) {
						if (a) {
							recordData += ",";
						}
						recordData += Ext.encode(rec.data);
						a = true;
					});
				recordData += "]";
				var result = erp.Const.callServiceMethodSync(
						'perchase/perchase.act?method=check_bj', {
							recordData : recordData
						});
				var data = Ext.decode(result);
				if (data.suc == false) {
					store.load();
					Ext.Msg.alert('提示', data.msg);
					break;
				}
				Ext.Msg.confirm('提示','是否'+bb+'提交【'+rec.get('tjdh')+'】号记录?',function(btn){
					if (btn=='yes'){
						if(rec.get('tjbj')==0){
							var tjdx='';
							var win=Ext.widget('SubmitPeople',{});
				    		win.down('#btn_confirm').on({
								click:function(btn){
									var win=btn.up('window');
									var grid = win.down('#SubmitPeopleData');
									var recs = grid.getSelectionModel().getSelection();
									if(recs!=null&&recs.length>0){
										tjdx=recs[0].get('czy_gh');
									}
									Ext.Ajax.request({
										// 将生成的xml发送到服务器端,需特别注意这个页面的地址
										url : 'perchase/perchase.act?method=update_bj',
										async : false,
										timeout : 600000,
										method : 'POST',
										waitMsg : '正在进行数据验证，请耐心等候...',
										success : function(response, opts) {
											store.reload();
										},
										params : {
											tjbj:tjbj,tjrm:czym,tjsj:new Date(),tjdh:rec.get('tjdh'),tjdx:tjdx
										}
									});
										var ll_id = erp.Const.callServiceMethodSync('perchase/perchase.act?method=getLl_id');
										console.log(ll_id);
										var ls_gzgw_tj = erp.Const.callServiceMethodSync('perchase/perchase.act?method=getLs_gzgw_tj',{czygh:czygh});
										if(ls_gzgw_tj == null){
											ls_gzgw_tj = '';
										}
										console.log(ls_gzgw_tj);
										var ls_gzgw_tjdx = erp.Const.callServiceMethodSync('perchase/perchase.act?method=getLsGzgwTjdx',{czygh:tjdx});
										if(ls_gzgw_tjdx == null){
											ls_gzgw_tjdx = '';
										}
										console.log(ls_gzgw_tjdx);
										if (ls_gzgw_tjdx != ''){
											var result = erp.Const.callServiceMethodSync('perchase/perchase.act?method=getResult',{ll_id:ll_id,tjdh:rec.get('tjdh'),ls_gzgw_tj:ls_gzgw_tj,ls_gzgw_tjdx:ls_gzgw_tjdx});
//										    var data = Ext.decode(result);
//										    if(data.bool==false){
//										    	Ext.Msg.alert('提示',data.msg);
//										    }
										}

									win.close();
								}
							});
							win.show();
						}else{
							Ext.Ajax.request({
								// 将生成的xml发送到服务器端,需特别注意这个页面的地址
								url : 'perchase/perchase.act?method=update_bj',
								async : false,
								timeout : 600000,
								method : 'POST',
								waitMsg : '正在进行数据验证，请耐心等候...',
								success : function(response, opts) {
									store.reload();
								},
								params : {
									tjbj:tjbj,tjdh:rec.get('tjdh')
								}
							});
						}
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
					}else{
						if(rec.get('tjbj')==0){
							Ext.Msg.alert('提示','【'+rec.get('tjdh')+'】号记录未提交，不能签发！');
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
						});
					recordData += "]";
					var result = erp.Const.callServiceMethodSync(
							'perchase/perchase.act?method=check_bj', {
								recordData : recordData
							});
					var data = Ext.decode(result);
					if (data.suc == false) {
						store.reload();
						Ext.Msg.alert('提示', data.msg);
						break;
					}
					Ext.Msg.confirm('提示','是否'+bb+'签发【'+rec.get('tjdh')+'】号记录?',function(btn){
						if (btn=='yes'){
							Ext.Ajax.request({
								// 将生成的xml发送到服务器端,需特别注意这个页面的地址
								url : 'perchase/perchase.act?method=update_bj',
								async : false,
								timeout : 600000,
								method : 'POST',
								waitMsg : '正在进行数据验证，请耐心等候...',
								success : function(response, opts) {
									store.reload();
								},
								params : {
									qfbj:qfbj,qfrm:czym,qfsj:new Date(),tjdh:rec.get('tjdh')
								}
							});
						}			
					});
				break;
				case 'BTN_BACKUP':
					var store=mainGrid.getStore();
					var recs=mainGrid.getSelectionModel().getSelection();
					if(recs!=null&&recs.length>0)
					Ext.Msg.confirm('提示',"真的要归档/恢复所选记录?",function(btn){
						if (btn=="yes"){
							var recordData = "["; //参数
							var a=false;
							Ext.each(recs, function(rec) {
									if (a) {
										recordData += ",";
									}
									recordData += Ext.encode(rec.data);
									a = true;
								});
							recordData += "]";
							var result = erp.Const.callServiceMethodSync(
									'perchase/perchase.act?method=update_gdbj', {
										recordData : recordData
									});
							store.reload();
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
						Ext.apply(store.proxy.extraParams,{gdbj:1});
					}
					else{
						btnBackup.setText('归档');
						btnBackup.setIconCls('book_next');
						btn.setText('历史');
						Ext.apply(store.proxy.extraParams,{gdbj:0});
					}
					store.load();
				break;
    	}
    },
	onEdtClickButton:function(btn){
		var me = this;
		var mStore=this.getView().store;
		console.log(mStore);
		var dGrid=this.lookupReference('EdtPerchasepriceSouthDetail');
		var drecs=dGrid.getSelectionModel().getSelection();
		var dStore=dGrid.getStore();
		var edtPanel=this.getView();
		var form =this.lookupReference('EdtPerchasePriceForm');
		var formrec=form.getRecord();
		form.updateRecord(formrec);
		var s_csbh = form.down('#csbh').getValue();
		formrec.set('csbh',s_csbh);
		switch(btn.itemId){
			case 'imp_edit':
				if(drecs.length<1){
					Ext.toastInfo('请选择至少一条记录!');
					 return;
				}
				var rec = Ext.create('erp.view.master.perchasepriceadjust.model.PerchaseEdit',{thdj:drecs[0].get('thdj'),wbdj:drecs[0].get('wbdj')});
				var win=Ext.widget('PerchasePriceMaintainEdit',{
		    			wbhl:drecs[0].get('wbhl'),
		    			csbh:csbh,
		    			rec:rec,
		    			dstore:me.dStore
		    			});
		    	win.down('#btn_confirm').on({
		    		click:function(btn){
							var win=btn.up('window');
							var form = win.down('form');
							var record = form.getRecord();
							form.updateRecord(record);
							console.log(record);
							if(record.get('checkbox_thdj') && record.get('checkbox_wbdj')){
								Ext.toastInfo('为保证数据准确性，请任选【调后外币单价】或【调后单价】一项即可!');
							}
							if(record.get('checkbox_thdj')){
								Ext.each(drecs,function(rec){
									rec.set('thdj',record.get('thdj'));
									if(rec.get('wbhl')!=0&&rec.get('wbhl')!=null&&rec.get('wbhl')!=''){
									rec.set('wbdj',Ext.util.Format.round(record.get('thdj')/rec.get('wbhl'),5));
									rec.set('wbje',Ext.util.Format.round((record.get('thdj')*rec.get('rksl'))/rec.get('wbhl'),5));
									}
									rec.set('thje',Ext.util.Format.round(record.get('thdj')*rec.get('rksl'),5));
								})
							}
							if(record.get('checkbox_wbdj')){
								Ext.each(drecs,function(rec){
									rec.set('wbdj',record.get('wbdj'));
									rec.set('thdj',Ext.util.Format.round(record.get('wbdj')*rec.get('wbhl'),5));
									rec.set('wbje',Ext.util.Format.round(record.get('wbdj')*rec.get('rksl'),5));
									rec.set('thje',Ext.util.Format.round(record.get('wbdj')*rec.get('wbhl')*rec.get('rksl'),5));
								})
							}							
							win.close();
						}
		    	})
		    	win.show();
			break;
			case 'imp1':
			    if(formrec.get('csbh')==null || Ext.String.trim(formrec.get('csbh'))==''){
			         Ext.toastInfo('请选选择供货厂商!');
					 return;
			    }
				if(formrec.get('hsbm')!=null&&formrec.get('hsbm')!=''){
	    			var hsbm = formrec.get('hsbm');
	    			if(formrec.get('csbh')!=null&&formrec.get('csbh')!=''){
	    				var csbh = formrec.get('csbh');	
	    			}else{
	    				var csbh = '';
	    			}
		    		var win=Ext.widget('WareHouseImp',{
		    			hsbm:hsbm,
		    			csbh:csbh,
		    			dstore:me.dStore
		    			});
		    		
		    		win.down('#btn_confirm').on({
						click:function(btn){
							var win=btn.up('window');
							var bool=false;
							win.selStore.each(function(rec){
								console.log('rec');
								console.log(rec);
								var r=Ext.create('erp.view.master.perchasepriceadjust.model.Cgjgtzmxb',{
									tjxh:dStore.max('tjxh')==null?1:dStore.max('tjxh')+1,
									ckbh:rec.get('ckbh'),
									ckmc:rec.get('ckmc'),
									rkdh:rec.get('rkdh'),
									rkxh:rec.get('rkxh'),
									rkrq:rec.get('rkrq'),
									clhh:rec.get('clhh'),
									clmc:rec.get('clmc'),
									zcpbh:rec.get('zcpbh'),
									cpbh:rec.get('cpbh'),
									zcpmc:rec.get('zcpmc'),
									cpmc:rec.get('cpmc'),
									jldw:rec.get('jldw'),
									cltx1:rec.get('cltx1'),
									rksl:rec.get('rksl'),
									rkdj:rec.get('rkdj'),
									rkje:rec.get('rkje'),
									fzhm:rec.get('fzhm'),
									csbh:rec.get('csbh'),
									csmc:rec.get('csmc'),
									zzsl:rec.get('zzsl'),
									wbhl:rec.get('wbhl'),
									thdj:rec.get('rkdj'),
									thje:rec.get('rkje'),
									csdj:rec.get('csdj'),
									csje:rec.get('csje'),
									rkdb_yl_wbdj:rec.get('wbdj'),
									rkdb_yl_wbje:rec.get('wbje'),
									wbdj:rec.get('wbdj'),
									wbje:rec.get('wbje'),
									wbbh:rec.get('wbbh'),
									wbmc:rec.get('wbmc'),
									bzsm:'',//数据库字段不能为null
									qfbj:0,//
									qfrm:'',//
									sdbj:0,//
									sdrm:'',//
									tjbj:0,//
									tjdx:'',//
									tjrm:''//数据库字段不能为null
								});
								r.phantom=true;
								dStore.add(r);
							});
							if(bool){
									return ;
							}
							win.close();
						}
					});
					win.show();
				}else{
					Ext.Msg.alert('提示','请选择核算部门！');
				}
				break;
			case 'imp2':
			    if(formrec.get('csbh')==null || Ext.String.trim(formrec.get('csbh'))==''){
			         Ext.toastInfo('请选选择供货厂商!');
					 return;
			    }
				if(formrec.get('hsbm')!=null&&formrec.get('hsbm')!=''){
	    			var hsbm = formrec.get('hsbm');
		    		var win=Ext.widget('ProcurementImp',{
		    			hsbm:hsbm,
		    			dstore:me.dStore
		    			});
		    		win.down('#btn_confirm').on({
						click:function(btn){
							var win=btn.up('window');
							var bool=false;
							win.selStore.each(function(rec){
								var r=Ext.create('erp.view.master.perchasepriceadjust.model.Cgjgtzmxb',{
									tjxh:dStore.max('tjxh')==null?1:dStore.max('tjxh')+1,
									ckbh:rec.get('ckbh'),
									rkdh:rec.get('rkdh'),
									rkxh:rec.get('rkxh'),
									rkrq:rec.get('rkrq'),
									clhh:rec.get('clhh'),
									clmc:rec.get('clmc'),
									zcpbh:rec.get('zcpbh'),
									cpbh:rec.get('cpbh'),
									jldw:rec.get('jldw'),
									cltx1:rec.get('cltx1'),
									rksl:rec.get('rksl'),
									rkdj:rec.get('rkdj'),
									rkje:rec.get('rkje'),
									fzhm:rec.get('fzhm'),
									csbh:rec.get('csbh'),
									zzsl:rec.get('zzsl'),
									wbhl:rec.get('wbhl'),
									thdj:rec.get('rkdj'),
									thje:rec.get('rkje'),
									csdj:rec.get('csdj'),
									csje:rec.get('csje'),
									rkdb_yl_wbdj:rec.get('wbdj'),
									rkdb_yl_wbje:rec.get('wbje'),
									wbdj:rec.get('wbdj'),
									wbje:rec.get('wbje'),
									wbbh:rec.get('wbbh')
								});
								r.phantom=true;
								dStore.add(r);
							});
							if(bool){
									return ;
							}
							win.close();
						}
					});
					win.show();
				}else{
					Ext.Msg.alert('提示','请选择核算部门！');
				}
				break;
			case 'imp_delete':
				if(drecs!=null&&drecs.length>0){
					dStore.remove(drecs);
				}
			break;
			
			case 'imp_BTN':
				var flag=true;
				var arr=new Array();
				for (var i = 0;i < dStore.getCount();i++) {
					dr=dStore.getAt(i);
					if(dr.get('rkdj')==dr.get('thdj')){
						flag=false;
						Ext.Msg.alert('提示','第'+(i+1)+'行调后单价与入库单价一致，无需做调价单！');
						break;
					}
					arr.push(dr.get('ckbh')+'_'+dr.get('rkdh')+'_'+dr.get('rkxh'));
				}
				if(flag){
					var nary=arr.sort(); 
					for(var i=0;i<arr.length;i++){
						if (nary[i]==nary[i+1]){
							flag=false;
							Ext.Msg.alert('提示','第'+dr.get('rkxh')+'行有相同明细，不能保存');
							break;
						}
					}
				}
				if(flag){
					if(form.isValid()){
						Ext.Msg.confirm('提示','是否确认保存?',function(btn){
							if (btn=='yes'){
								formrec.set('czym',erp.Util.currentUser.userInfo.name);
								formrec.set('czsj',new Date());
								if(edtPanel.isAdd){
									mStore.add(formrec);
									mStore.sync({callback:function(batch,option){
										var nrecs=option.operations.create;
										if(nrecs.length>0){
											var nrec=nrecs[0];
											dStore.each(function(dr){
												dr.set('tjdh',nrec.get('tjdh'));
											});
											dStore.sync({
												callback:function(){
													dStore.load({params:{tjdh:nrec.get('tjdh')}});
												}
											});
											mStore.loadPage(1);
											edtPanel.close();
										}
									}});
								}else{
									mStore.sync({callback:function(batch,option){
										
									}});
									Ext.each(dStore.getNewRecords(),function(dr){
										dr.set('tjdh',formrec.get('tjdh'));
									});
									dStore.sync({
										callback:function(){
											dStore.load({params:{tjdh:nrec.get('tjdh')}});
										}
									});
									mStore.loadPage(1);
									edtPanel.close();
								}
							}			
						});
					break;
					}
				}
				break;	
		}
	
	},
	edtShow:function(rec,isAdd,isEdit){
		var me = this;
		var mainGrid=this.lookupReference('PerchasePriceGrid');
		if(rec.get('sdbj')==1){
			isEdit=false;
		}
		var vm=me.getViewModel();
		var vmData=vm.getData();
		erp.Util.addContentTab({
			xtype:'PerchasePriceMaintain',
			itemId:'PerchasePriceMaintain',
			title : '采购价格调整单编辑',
			isAdd : isAdd,
			isEdit : isEdit,
			vmData:vmData,
			mainPanel:this.getView(),
			store : mainGrid.getStore(),
			rec:rec,
			closable : true
		});
	}
});