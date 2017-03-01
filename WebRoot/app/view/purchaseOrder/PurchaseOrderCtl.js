Ext.define('erp.view.purchaseOrder.PurchaseOrderCtl', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'erp.ux.ComboxTree',
        'erp.view.purchaseOrder.window.*',
        'erp.view.purchaseOrder.view.EdtPurchaseOrder',
        'erp.view.purchaseOrder.window.DownSearch',
        'erp.view.purchaseOrder.window.PurPanelImp',
        'erp.view.master.purchaseDetail.window.UpImg',
        'erp.view.master.purchaseDetail.window.BatchChange',
        'erp.view.purchaseOrder.window.PurchaseOrderForWs',
        'erp.view.purchaseOrder.window.ChooseContractAttachment',
        'erp.view.purchaseOrder.window.SynergySignback',
        'erp.view.purchaseOrder.window.MaterialFactoryInfoHelp'
    ],
	control:{
		'PurchaseOrder':{
			beforerender:function(cmp){
				var bar2=cmp.down('#PurchaseBar');
				var recs=erp.Util.setMenuFunc(bar2.down('#BTN_PRINT'),cmp.modId,cmp);
				//将合同打印模版导入
				var outbu=bar2.down('#menu_syneout');
				Ext.each(recs,function(rec){
					if(rec.is_out=="true"){
						outbu.add({
				          	iconCls:'',
				          	text:rec.name,
				          	record:rec		//将打印模板记录保存在record中,用于那些需要选择模板的情况；
				        });
					}
				})
			}
		},
		'EdtPurchaseOrder':{
			close:function(cmp){
				if(cmp.mainPanel.store){
					cmp.mainPanel.store.load();
				}
			}
		},
		//数据更新
		'PurchaseOrder #menu_sync':{
			click:'onSyncClickButton'			
		},
		//筛选
		'PurchaseOrder #menu_Btnquery':{
			click:'onQueryClickButton'			
		},
		//合同协同
		'PurchaseOrder #menu_syne':{
		
			click : 'onSyneClickButton'
		},
		//合同外发
		'PurchaseOrder #menu_syneout':{
			click : 'onSyneOutClickButton'
		},
		//到货/入库
		'PurchaseOrder #menu_arrival':{
			click:'onArrivalClickButton'			
		},
		//按钮
		'PurchaseOrder #PurchaseBar button':{
			click:'onMainClickButton'
		},
		//编辑界面导入
		'EdtPurchaseOrder #menu_orderImp':{
			click:'onOrderImpButton'
		},
		//编辑界面按钮
		'EdtPurchaseOrder toolbar button':{
			click:'EdtButton'
		},
		//箱唛导入
		'EdtPurchaseOrder #menu_MarkImp':{
			click:'markImp'
		},
		//单价信息同步
		'EdtPurchaseOrder #menu_PriceSync':{
			click:'priceSync'
		}
	},
    alias: 'controller.PurchaseOrderCtl',
    onSyncClickButton:function(menu,btn){
    	var me=this;
    	var mainPanel=this.getView();
    	var store=mainPanel.store;
    	var grid=mainPanel.down('#PurchaseOrderGrid');
    	var recs=grid.getSelectionModel().getSelection();
    	var rec=recs[0];
    	var dGrid=mainPanel.down('#PurchaseDetail');
		var drecs=dGrid.getSelectionModel().getSelection();
		var myMask = new Ext.LoadMask({
			target : mainPanel
		});
    	switch(btn.itemId){
    		case 'btn_sync1':
    			if(recs.length==0){
    				Ext.toastInfo("请至少选择一条记录!");
					break;
    			}
    			myMask.mask('正在更新，请等待......');
    			var htbh='';
    			var aa=false;
    			Ext.each(recs,function(rec){
    				if(aa){
    					htbh +=","
    				}
    				htbh+="''"+rec.get('htbh')+"''";
    				aa=true;
    			})
    			var sql  =" exec proc_dateupdating_orderinfo  '"+htbh+"'";
				var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
				{sql : sql});
				myMask.unmask();
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				store.load();
    		break;
    		case 'btn_sync2':
    			if(recs.length==0){
    				Ext.toastInfo("请至少选择一条记录!");
					break;
    			}
    			var htbh='';
    			var aa=false;
    			Ext.each(recs,function(rec){
    				if(aa){
    					htbh +=","
    				}
    				htbh+="'"+rec.get('htbh')+"'";
    				aa=true;
    			})
    			var cglbmc=rec.get('cglbmc');
    			var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
    				width:300,
    				height:120,
    				title:'批量编辑',
    				item:[{
						fieldLabel:'采购类别',
			  			itemId:'cglb',
			  			name:'cglb',
			  			xtype:'comboxTree',
			  			allowBlank:false,
						forceSelection:false,
						columnWidth: .3,
						store : mainPanel.cateTreeStore,
						displayField : 'text',
						valueField: 'nodeId',
						listeners:{
						   	'select':function(obj,rec){
						   		//console.log(obj);
						   		//console.log(rec);
						   		if(rec!=null){
						   			cglbmc=rec.get('text');
						   		}
						   	}
						}
			  		}]
    			})
    			win.down('#BTN_YES').on({
    				click:function(btn){
	    				var win = btn.up('window');
						var cglb = win.down('#cglb').getValue();
						if (cglb == null) {
							Ext.Msg.alert('提示', '请选择采购类别！');
							return;
						}
						var sql  =" update cghtb set cglb='"+cglb+"' where htbh in  ("+htbh+")";
						var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						{sql : sql});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return ;
						}
						win.close();
						rec.set('cglb',cglb);
						rec.set('cglbmc',cglbmc);
						rec.commit();
						//store.load();
					}
				})
    			win.show();
    		break;
    		case 'btn_sync3':
    			var czym=erp.Util.currentUser.userInfo.name;
    			var grid1=mainPanel.down('#MaterialGrid1');
    			var recs1=grid1.getSelectionModel().getSelection();
    			if(recs1.length==0){
    				Ext.toastInfo("请至少选择一条记录!");
					break;
    			}
    			var htxh='';
    			var aa=false;
    			var xjqrbj=recs1[0].get('xjqrbj');
    			var bool=false;
    			Ext.each(recs1,function(rec){
    				if(aa){
    					htxh +=","
    				}
    				htxh+="'"+rec.get('htxh')+"'";
    				aa=true;
    				if(xjqrbj!=rec.get('xjqrbj')){
    					Ext.toastInfo("请选择标记状态一致的记录!");
    					bool=true;
    					return false;
    				}
    			})
    			if(bool){
    				break;
    			}
    			var bb='';
    			if(xjqrbj==1){
    				xjqrbj=0;
    				bb='取消';
    			}else{
    				xjqrbj=1;
    			}
    			Ext.Msg.confirm('提示', '是否'+bb+'确认该合同下所选明细的产品细节描述信息？', function(btn) {
					if (btn == 'yes') {
						var sql  =" update htmxb set xjqrbj="+xjqrbj+",xjqrrm='"+czym+"',xjqrsj=getdate() where htbh='"+recs1[0].get('htbh')+"' and htxh in ("+htxh+")  ";
						var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						{sql : sql});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return ;
						}
						grid1.getStore().load();
					}
    			})
    		break;
    	}
    },
    onSyneOutClickButton:function(menu,btn){
    	var me=this;
    	var mainPanel=this.getView();
    	var store=mainPanel.store;
    	var grid=mainPanel.down('#PurchaseOrderGrid');
    	var recs=grid.getSelectionModel().getSelection();
    	var rec=recs[0];
    	var dGrid=mainPanel.down('#PurchaseDetail');
		var drecs=dGrid.getSelectionModel().getSelection();
		var myMask = new Ext.LoadMask({
			target : mainPanel
		});
		//1、需要判断该合同的厂商是从平台导入 
    	if(recs.length==0){
    		Ext.toastInfo("请至少选择一条记录!");
			return ;
    	}
    	var store = mainPanel.store;
    	var csbh = recs[0].get('csbh');
    	var htbh = recs[0].get('htbh');
    	var qfbj = recs[0].get('qfbj');
    	var hqbj = recs[0].get('hqbj');
    	if(qfbj==0){
    	   Ext.Msg.alert('提示','该合同未签发，无法外抛！');
    	   return;
    	}
    	if(hqbj==1){
    	   Ext.Msg.alert('提示','订单已回签，无法外抛！');
    	   return;
    	}
    	var pid = erp.Util.getPlatformLoginId();
			if(pid == ''){
			    Ext.toastInfo('请分配平台对应账户！');
				return;
			}
    	    //1.获取对应的requersId
    	    //2t_supplier_file查找apply——style 15 
    	    //删除标记
    	    var sql = "select count(*) from t_supplier_file where csbh = "+csbh+" and apply_sts = '15' and is_delete = 0 and record_id is not null"
    	    var result = erp.Const.callServiceMethodSync(
						'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
						sql:sql
			});
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
						return;
			}
			console.log(data.val)
			if(data.val<=0){
			    Ext.Msg.alert('提示','该合同的厂商不是从平台导入或不符合条件');
			    return;
			}
			
			var res = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=IfHaveOrder',{
			    htbh : htbh
			})
			var da = Ext.decode(res);
			if (!da.bool) {
			Ext.Msg.alert('提示',da.msg);
			return;
			}
			/*var Counter = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=getDhrkCount',{
			    htbh : htbh
			})
			if(Counter>0){
			   Ext.Msg.alert('提示','合同明细中已存在到货入库数量,无法外抛!');
			   return;
			}*/
			//获取打印模版
			console.log(btn.record);
			var data=btn.record;
			data.isOrder=true;
			data.name='合同预览';
			erp.Util.doPrint(data,recs,null);
    },
    onSyneClickButton : function(menu,btn){
        var me=this;
    	var mainPanel=this.getView();
    	var store=mainPanel.store;
    	var grid=mainPanel.down('#PurchaseOrderGrid');
    	var recs=grid.getSelectionModel().getSelection();
    	var rec=recs[0];
    	var dGrid=mainPanel.down('#PurchaseDetail');
		var drecs=dGrid.getSelectionModel().getSelection();
		var myMask = new Ext.LoadMask({
			target : mainPanel
		});
    	switch(btn.itemId){
    	    case 'btn_syne_con' :
    	      //1、需要判断该合同的厂商是从平台导入 
    	    if(recs.length==0){
    				Ext.toastInfo("请至少选择一条记录!");
					break;
    			}
    	    var store = mainPanel.store;
    	    var csbh = recs[0].get('csbh');
    	    var htbh = recs[0].get('htbh');
    	    var qfbj = recs[0].get('qfbj');
    	    var hqbj = recs[0].get('hqbj');
    	    if(qfbj==0){
    	        Ext.Msg.alert('提示','该合同未签发，无法外抛！');
    	        return;
    	    }
    	    if(hqbj==1){
    	       Ext.Msg.alert('提示','订单已回签，无法外抛！');
    	       return;
    	    }
    	    var pid = erp.Util.getPlatformLoginId();
			if(pid == ''){
			    Ext.toastInfo('请分配平台对应账户！');
				return;
			}
    	    //1.获取对应的requersId
    	    //2t_supplier_file查找apply——style 15 
    	    //删除标记
    	    var sql = "select count(*) from t_supplier_file where csbh = "+csbh+" and apply_sts = '15' and is_delete = 0 and record_id is not null"
    	    var result = erp.Const.callServiceMethodSync(
						'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
						sql:sql
			});
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
						return;
			}
			console.log(data.val)
			if(data.val<=0){
			    Ext.Msg.alert('提示','该合同的厂商不是从平台导入或不符合条件');
			    return;
			}
			
			var res = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=IfHaveOrder',{
			    htbh : htbh
			})
			var da = Ext.decode(res);
			if (!da.bool) {
			Ext.Msg.alert('提示',da.msg);
			return;
			}
			/*var Counter = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=getDhrkCount',{
			    htbh : htbh
			})
			if(Counter>0){
			   Ext.Msg.alert('提示','合同明细中已存在到货入库数量,无法外抛!');
			   return;
			}*/
			//获取打印模版
			var printDate = erp.Const.callServiceMethodSync('report/SysReports.do?method=getSysPrintModelList',{
			    menu_id:mainPanel.modId,is_active:'true',mod_id:99
			});
			var data=printDate[0];
			data.isOrder=true;
			data.name='合同预览';
			erp.Util.doPrint(data,recs,null);
			return ;
			//采购要求
			var cgyq = rec.get('cgyq');    
			var httk = rec.get('httk');
			var win = Ext.create('erp.view.purchaseOrder.window.PurchaseOrderForWs');
			var htbhs=new Array();
			/*win.down('#btn_save').on({
			    'click' : function(btn){
			        var win =btn.up('window');
			        var form = btn.up('form').getForm();
			        var fileName=win.getfileName();
			        if(form.isValid()){
			            form.submit({
			                        url: 'purchaseorder/upOrderFileForWs.act',
		                    		method:'POST',
						            timeout : 90000,
						            params:  {
						                ptid:pid,
						                login_id : pid,
						                file_name:win.getfileName(),
						                htbh : htbh,
						                csbh : csbh,
						                cgyq : cgyq,
						                httk : httk,
						                czym : erp.Util.currentUser.userInfo.name
						            },
						            waitMsg : '正在上传文件，请等待...',
						            success : function(form, action) {
						                store.load();
						                if(!Ext.isEmpty(action.result.msg)){
				                    	    Ext.Msg.alert("提示", action.result.msg);
				                    	    win.close();
				                    		return;
				                    	}
			                            var result = erp.Const.callServiceMethodSync('purchaseorder/ordertows.act?method=getSubmitOrder',{
			                                htbh : htbh, csbh : csbh,ptid : pid,czym : erp.Util.currentUser.userInfo.name
			                             })
						            },
				                    failure : function() {
				                        Ext.Msg.alert("提示", action.result.msg);
				                        win.close();
				                    }
			            })
			        }
			    }
			})
			win.show();*/    
    	    break;
    	    case 'btn_syne_file' : 
    	     if(recs.length==0){
    				Ext.toastInfo("请至少选择一条记录!");
					break;
    			}
    	    var htbh = recs[0].get('htbh');
    	    var qfbj = recs[0].get('qfbj');
    	    var csbh = recs[0].get('csbh');
    	    if(qfbj==0){
    	        Ext.Msg.alert('提示','该合同未签发！');
    	        return;
    	    }
    	    var sql = "select count(*) from t_supplier_file where csbh = "+csbh+" and apply_sts = '15' and is_delete = 0 and record_id is not null"
    	    var result = erp.Const.callServiceMethodSync(
						'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
						sql:sql
			});
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
						return;
			}
			console.log(data.val)
			if(data.val<=0){
			    Ext.Msg.alert('提示','该合同的厂商不是从平台导入或不符合条件');
			    return;
			}
			var res = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=IfOutward',{
			    htbh : htbh
			})
			var da = Ext.decode(res);
			if (!da.bool) {
			Ext.Msg.alert('提示',da.msg);
			return;
			}
    	    var win = Ext.widget('ChooseAttachment',{
    	         htbh : htbh
    	    });
    	    var pid = erp.Util.getPlatformLoginId();
			        if(pid == ''){
			            Ext.toastInfo('请分配平台对应账户！');
						return;
			        }
    	    win.down('#btn_Sned').on({
			    'click' : function(btn){
			     myMask.mask('正在协同，请等待......');	
    	         var win =btn.up('window');
    	         var grid = win.down('#grd_ChooseAttachment');
    	         var recs = grid.getSelectionModel().getSelection();
    	         if(recs.length == 0){
    		              return;
    		           }
    		     var bools = false;      
    		     Ext.each(recs, function(rec) {
    		        if(rec.get('fjzt')!=0){
    		            Ext.Msg.alert('提示','只能发送未提交的附件!');
    		            bools = true;
    		        }
    		     })      
    		     if(bools){
    		         return;
    		     }
    	         var htbh = recs[0].get('htbh')
    	         var recordData = "[";
		         var a=false;
		         Ext.each(recs, function(rec) {
		          if(a){
		         	recordData += ",";
		          }
		          recordData += Ext.encode(rec.data);
		                a=true;
		          })
		          recordData += "]";
		          var result = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=UpOrderAttachment',{
		            recordData : recordData,ptid:pid,htbh : htbh
		          })
		          myMask.unmask();
		          var data = Ext.decode(result);
				  if (!data.bool) {
					    Ext.toastErrorInfo(data.msg);
					    return;
			    	 }else{
			    	    Ext.toastInfo('协同成功！');
			    	    win.close();
			    	    return;
			    	 }
    	         }
    	    });
    	    win.down('#btn_upAttachment').on({
			    'click' : function(btn){
			            var winf =Ext.create('erp.view.purchaseOrder.window.UpFile');
			   	  				winf.down('#btn_save').on('click',function(btn){
			   	  					var form = btn.up('form').getForm();
			   	  					var wjmc =winf.getfileName();
					                if (form.isValid()) {
					                    form.submit({
					                        url : 'common/uploadAttachement.action',
					                        method:'POST',
					                        timeout : 120000,
					                        params: {
					        					urlId: '/rzerp_hfpg/other/'//存储目录
					    					},
					                        waitMsg : '正在上传您的文件，请耐心等候...',
					                        success : function(form, action) {
					                        	Ext.Msg.alert('提示', action.result.msg);
					                        	var winf=btn.up('window');
					                        	var url=action.result.data;
					                        	if(url!=null){
						                        	var src='ftp://'+tp_ftpUrl+url;
						                        	wjbh=win.store.max('wjbh')==null?1:win.store.max('wjbh')+1;
						                        	var nModel=Ext.create('erp.view.purchaseOrder.model.PurchaseFile',{
						                        		htbh:rec.get('htbh'),
						                        		wjmc:wjmc,
						                        		wjbh:wjbh,
						                        		wjlj:url,
						                        		cjrq:new Date(),
						                        		cjrm: erp.Util.currentUser.userInfo.name
						                        	});
						                        	nModel.phantom=true;
						                        	win.store.add(nModel);
						                        	win.store.sync();
						                        	winf.close();
					                        	}
					                        },
					                        failure : function() {
					                            Ext.Msg.alert("提示", "图片上传失败！");
					                        }
					                    });
					                }
			   	  				})
			   	  				winf.show();
			    }
			});
			 win.down('#btn_Del').on({
    		      'click' : function(btn){
    		      	  var win =btn.up('window');
    	              var fielGrid = win.down('#grd_ChooseAttachment');
    				  var frecs=fielGrid.getSelectionModel().getSelection();
    				  var bools = false; 
    				  Ext.each(frecs,function(rec){
    				      if(rec.get('fjzt')!=0){
    				         Ext.Msg.alert('提示','只能删除未提交的附件!');
    				         bools = true;
    				      }
    				  })
    				  if(bools){
    				      return;
    				  }
    				  Ext.Msg.confirm('提示','是否确认删除本条明细?',function(btn){
							 if(btn=='yes'){
							 	//删除ftp文件
							 	Ext.each(frecs,function(rec){
							 		erp.Util.ftpDel(rec.get('wjlj'));
							 	})
							 	win.store.remove(frecs);
							 	win.store.sync();
							}
						})
    		      }  
    		 });
			 win.down('#btn_Cancel').on({
			    'click' : function(btn){
    	             var FGrid = win.down('#grd_ChooseAttachment');
    	             var rec = FGrid.getSelectionModel().getSelection()[0];
    	             var fjStore=win.store;
    	             if(Ext.isEmpty(rec)||rec.length == 0){
    	             Ext.Msg.alert('提示','请选择一条附件信息记录！');
    	               return;
    	             }
    	             if(rec.get('qxbj')==0&&rec.get('fjzt')!=1){
    	                Ext.Msg.alert('提示','该文件未提交，无法取消！');
    	                return;
    	             }
    	             var recordData = "["+Ext.encode(rec.data)+"]";
    	             var msg=""
    	             var qxbj = 0;
    	             if(rec.get('qxbj')==0){
    	               qxbj = 1;
    	               msg = "取消";
    	             }else{
    	                msg = "放弃取消";
    	                qxbj = 0;
    	              }
    	              console.log(qxbj);
    	              Ext.Msg.confirm('提示', '是否'+msg+'该附件？', function(btn) {
					    if (btn == 'yes') {
    	                  var result = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=updateFileStatus',{
    	                  recordData : recordData,status : qxbj
    	                  })
    	                var data = Ext.decode(result);
    		            if (!data.bool) {
					       Ext.toastErrorInfo(data.msg);
					       return;
			           }else{
			    	     Ext.toastInfo('已成功'+msg+'！');
			    	     fjStore.reload();
			    	     return;
			    	    }
			        }});
			      }
			    })
    	    win.show();
    	    break;
    	    case 'btn_syne_back' : 
    	      if(recs.length==0){
    				Ext.toastInfo("请至少选择一条记录!");
					break;
    			}
    		  var recs = grid.getSelectionModel().getSelection();
    	         var htbh = recs[0].get('htbh');
    	         var hqbj = recs[0].get('hqbj');
    	         var wcbj = recs[0].get('wcbj');
    	         if(hqbj==1){
    	            Ext.Msg.alert('提示',"该合同文件已回签！");
    	            return;
    	         }
    	         if(wcbj==1){
    	            Ext.Msg.alert('提示',"该合同文件已完成，无法签发！");
    	            return;
    	         }
    	         var Counter = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=getOrderDyCount',{
			         htbh : htbh
			     })
			     if(Counter==0){
			        Ext.Msg.alert('提示','没有对应订单，无法回签！');
			        return;
			     }
    	         var hqsj = recs[0].get('hqsj')
    		  var win  = Ext.widget('win_SynergySignback',{
    		      htbh : htbh,hqsj : hqsj
    		  });
    		  win.down('#btn_confirm').on({
    		       'click' : function(btn){
    		       	   /*Ext.Msg.confirm('提示',"是否回签该合同文件？",function(btn){
				       if (btn=="yes"){*/
    		       	   myMask.mask('正在协同，请等待......');	
    		       	   var win =btn.up('window');
    		           var recs = win.store.data.items;
    		           if(recs.length == 0){
    		              return;
    		           }
    		           var recordData = Ext.encode(recs[0].data);
    		            var result = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=SyneBack',{
    		                recordData : recordData,urlId: '/rzerp_hfpg/po_cght/',//存储目录
    		                hqbj : 1,htbh : htbh,czym : erp.Util.currentUser.userInfo.name
    		             })
    		             myMask.unmask();
    		             var data = Ext.decode(result);
    		             if (!data.bool) {
					       Ext.toastErrorInfo(data.msg);
					       return;
			    	      }else{
			    	    Ext.toastInfo('协同成功！');
			    	    win.close();
			    	    store.reload();
			    	    return;
			    	 }/*}})*/
    		       }
    		  });
    		  win.show();
    	    break;
    	  /*  case 'btn_file_cancel' : 
    	       var mainPanel=this.getView();
    	       var FGrid = mainPanel.down('#PurFile');
    	       var rec = FGrid.getSelectionModel().getSelection()[0];
    	       var fjStore=this.view.down('#mng_SouthTab').FileStore;
    	       if(Ext.isEmpty(rec)||rec.length == 0){
    	           Ext.Msg.alert('提示','请选择一条附件信息记录！');
    	           return;
    	       }
    	       console.log(rec);
    	       if(rec.get('qxbj')==0&&rec.get('fjzt')!=1){
    	           Ext.Msg.alert('提示','该文件未提交，无法取消！');
    	           return;
    	       }
    	       var recordData = "["+Ext.encode(rec.data)+"]";
    	       var msg=""
    	       var qxbj = 0;
    	       if(rec.get('qxbj')==0){
    	           qxbj = 1;
    	           msg = "取消";
    	       }else{
    	           msg = "放弃取消";
    	           qxbj = 0;
    	       }
    	       console.log(qxbj);
    	       Ext.Msg.confirm('提示', '是否'+msg+'该附件？', function(btn) {
					if (btn == 'yes') {
    	       var result = erp.Const.callServiceMethodSync('purchaseorder/ordertowsservice.act?method=updateFileStatus',{
    	           recordData : recordData,status : qxbj
    	       })
    	        var data = Ext.decode(result);
    		             if (!data.bool) {
					       Ext.toastErrorInfo(data.msg);
					       return;
			   }else{
			    	    Ext.toastInfo('已成功'+msg+'！');
			    	    fjStore.reload();
			    	    return;
			    	 }
			   }});
    	    break;*/
    	}
    },
    onArrivalClickButton:function(menu,btn){
    	var me=this;
    	var mainPanel=this.getView();
    	var store=mainPanel.store;
    	var grid=mainPanel.down('#PurchaseOrderGrid');
    	var recs=grid.getSelectionModel().getSelection();
    	var rec=recs[0];
    	var dGrid=mainPanel.down('#PurchaseDetail');
		var drecs=dGrid.getSelectionModel().getSelection();
		var myMask = new Ext.LoadMask({
			target : mainPanel
		});
    	switch(btn.itemId){
    		case 'btn_arrival1':
    			var win =Ext.create('erp.view.purchaseOrder.window.ArrivalOne',{
    				htbh:rec.get('htbh')
    			});
    			win.show();
    		break;
    		case 'btn_arrival2':
    			if(drecs.length==0){
    				Ext.toastInfo("请选择一条明细!");
					break;
    			}else{
    				var drec=drecs[0];
    				var win =Ext.create('erp.view.purchaseOrder.window.ArrivalTwo',{
	    				htbh:drec.get('htbh'),
	    				htxh:drec.get('htxh')
	    			});
	    			win.show();
    			}
    		break;
    		case 'btn_arrival3':
    			if(drecs.length==0){
    				Ext.toastInfo("请选择一条明细!");
					break;
    			}else{
    				var drec=drecs[0];
    				var win =Ext.create('erp.view.purchaseOrder.window.ArrivalThree',{
	    				rec:drec
	    			});
	    			win.show();
    			}
    		break;
    	}
    },
    priceSync:function(menu,btn){
    	var me=this;
    	var edtPanel=me.getView();
    	var s_htbh=edtPanel.down('#htbh').getValue();
    	var dStore=edtPanel.DetailStore;
    	var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
    	var csbh = edtPanel.down('#csbh').getValue();
    	//在单价信息同步前先 同步订单明细信息
    	erp.Util.storeSync(dStore);
    	switch (btn.itemId) {
			case 'PriceSync1' :
				var grid = edtPanel.down('#ContractDetailGrid');
				var recs = grid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.toastErrorInfo("请至少选择一条记录！！！");
					break;
				}
				//如果是全选从后台刷新数据
				if(recs.length==grid.getStore().getCount()){
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCtlPriceLoadList',
					{
						csbh : csbh,
						htbh :"'"+s_htbh+"'",
						ip:ip,
						login_id:login_id
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						break;
					}
					grid.getStore().load();
				}else{
					var recArr = new Array();
					Ext.each(recs, function(rec) {
						recArr.push(rec.data);
					})
					var recStr = Ext.encode(recArr);
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCtlPriceLoadList',
					{
						recstr : recStr,
						csbh : csbh
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return;
					}
					var cdList = data.cdList;
					if (cdList != null && cdList != '') {
						dStore.each(function(r) {
							Ext.each(cdList, function(rec) {
								if (r.get('htxh') == rec.htxh) {
									r.set('wbdj', rec.wbdj);
									r.set('wbje', rec.wbje);
									r.set('cgdj', rec.cgdj);
									r.set('cgje', rec.cgje);
									r.set('kzdj', rec.kzdj);
								}
							})
					   })
					}
				}
				Ext.toastInfo('以最新控制价格同步完成!');
			break;
			case 'PriceSync2' :
				var grid = edtPanel.down('#ContractDetailGrid');
				var recs = grid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.toastErrorInfo("请至少选择一条记录！！！");
					break;
				}
				//如果是全选从后台刷新数据
				if(recs.length==grid.getStore().getCount()){
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getSippingPriceLoadList',
					{
						csbh : csbh,
						htbh :"'"+s_htbh+"'",
						ip:ip,
						login_id:login_id
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						break;
					}
					grid.getStore().load();
				}else{
					var recArr = new Array();
					Ext.each(recs, function(rec) {
						recArr.push(rec.data);
					})
					var recStr = Ext.encode(recArr);
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getSippingPriceLoadList',
					{
						recstr : recStr,
						csbh : csbh
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return;
					}
					var cdList = data.cdList;
					if (cdList != null && cdList != '') {
						dStore.each(function(r) {
							Ext.each(cdList, function(rec) {
								if (r.get('htxh') == rec.htxh) {
									r.set('wbdj', rec.wbdj);
									r.set('wbje', rec.wbje);
									r.set('cgdj', rec.cgdj);
									r.set('cgje', rec.cgje);
								}
							})
						})
					}
				}
				Ext.toastInfo('以最新入库价格同步完成!');
			break;
			case 'PriceSync3' :
				var grid = edtPanel.down('#ContractDetailGrid');
				var recs = grid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.toastErrorInfo("请至少选择一条记录！！！");
					break;
				}
				//如果是全选从后台刷新数据
				if(recs.length==grid.getStore().getCount()){
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getPriceLoadList',
					{
						csbh : csbh,
						htbh :"'"+s_htbh+"'",
						ip:ip,
						login_id:login_id
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						break;
					}
					grid.getStore().load();
				}else{
					var recArr = new Array();
					if (recs.length == 0) {
						Ext.toastInfo('请选择所要同步的记录(可多选)！');
						return;
					}
					Ext.each(recs, function(rec) {
								recArr.push(rec.data);
							});
					var recStr = Ext.encode(recArr);
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getPriceLoadList',
					{
						recstr : recStr,
						csbh : csbh
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return;
					}
					var cdList = data.cdList;
					if (cdList != null && cdList != '') {
						dStore.each(function(r) {
							Ext.each(cdList, function(rec) {
								if (r.get('htxh') == rec.htxh) {
									r.set('wbdj', rec.wbdj);
									r.set('wbje', rec.wbje);
									r.set('cgdj', rec.cgdj);
									r.set('cgje', rec.cgje);
								}
							})
						})
					}
				}
				Ext.toastInfo('以最新合同价格同步完成!');
			break;
			case 'PriceSync4' :
				var grid = edtPanel.down('#ContractDetailGrid');
				var recs = grid.getSelectionModel().getSelection();
				if (csbh == null || Ext.String.trim(csbh) == '') {
					Ext.toastInfo('请选选择厂商!');
					break;
				}
				if(recs.length==0){
					Ext.toastErrorInfo("请至少选择一条记录！！！");
					break;
				}
				//如果是全选从后台刷新数据
				if(recs.length==grid.getStore().getCount()){
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getModelLoadList',
					{
						csbh : csbh,
						htbh :"'"+s_htbh+"'",
						ip:ip,
						login_id:login_id
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						break;
					}
					grid.getStore().load();
				}else{
					var recArr = new Array();
					Ext.each(recs, function(rec) {
						recArr.push(rec.data);
					})
					var recStr = Ext.encode(recArr);
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getModelLoadList',
					{
						recstr : recStr,
						csbh : csbh
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return;
					}
					var cdList = data.cdList;
					if (cdList != null && cdList != '') {
						dStore.each(function(r) {
							Ext.each(cdList, function(rec) {
								if (r.get('htxh') == rec.htxh) {
									r.set('mjh', rec.mjh);
								}
							})
						})
					}
				}
				Ext.toastInfo('模具号同步完成!');
			break;
			case 'PriceSync5' :
				var grid = edtPanel.down('#ContractDetailGrid');
				var recs = grid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.toastErrorInfo("请至少选择一条记录！！！");
					break;
				}
				//如果是全选从后台刷新数据
				if(recs.length==grid.getStore().getCount()){
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getNumberLoadList',
					{
						csbh : csbh,
						htbh :"'"+s_htbh+"'",
						ip:ip,
						login_id:login_id
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						break;
					}
					grid.getStore().load();
				}else{
					var recArr = new Array();
					Ext.each(recs, function(rec) {
								var recd = rec.copy();
								var cltx1 = rec.get('cltx1');
								var clgg = eval(cltx1.substr(0, cltx1.length - 2));
								recd.set('cltx1', clgg);
								recArr.push(recd.data);
							})
					var recStr = Ext.encode(recArr);
					var rowCount = edtPanel.subsidiaryStore.getCount();
					var dgyl = 0;
					if (rowCount > 0) {
						dgyl = edtPanel.subsidiaryStore.getAt(0).get('dgyl');
					}
					var csbh = edtPanel.down('#csbh').getValue();
					var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getNumberLoadList',
					{
						recstr : recStr,
						csbh : csbh,
						rowCount : rowCount,
						dgyl : dgyl
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return;
					}
					var cdList = data.cdList;
					if (cdList != null && cdList != '') {
						dStore.each(function(r) {
							Ext.each(cdList, function(rec) {
								if (r.get('htxh') == rec.htxh) {
									r.set('ycgl', rec.ycgl);
									r.set('cgsl', rec.cgsl);
									r.set('fzsl', rec.fzsl);
									r.set('cgdj', rec.cgdj);
									r.set('cgje', rec.cgje);
									r.set('wbje', rec.wbje);
									r.set('dlgs', rec.dlgs);
								}
							})
						})
					}
				}
				Ext.toastInfo('采计数量同步完成!');
			break;
    	}
    },
    markImp:function(menu,btn){
    	var me=this;
    	var edtPanel=me.getView();
    	var s_htbh=edtPanel.down('#htbh').getValue();
    	var dStore=edtPanel.DetailStore;
    	var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
    	switch(btn.itemId){
    		case 'MarkImp1' :
				var jhhs = new Array();
				dStore.each(function(r) {
					var jhh = r.get('jhh');
					if (jhh != null && jhh != '') {
						jhhs.push(r.get('jhh'));
					}
				})
				var jhhstr = Ext.encode(jhhs);
				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getShippingLoadList',{
					jhhs : jhhstr
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				if (data.cgyq != null && data.cgyq != '') {
					edtPanel.down('#cgyq').setValue(data.cgyq);
				}
			break;
			case 'MarkImp2':
				var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getMarkImp',{
					htbh : s_htbh,login_id:login_id,ip:ip
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
			break
    	}
    },
    //汇总调整
    doCollect:function(htbh,dstore){
    	var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
    	var cwin=Ext.create('erp.view.purchaseOrder.window.CollectAdjust',{
			htbh:htbh
		});
		cwin.down('#btn_confirm').on({
			click : function(btn) {
				//直接在后台刷新本合同所有数据
				var myMask = new Ext.LoadMask({
					target : cwin
				});
				myMask.mask('数据汇总中...');
		    	var result = erp.Const.callServiceMethodSync(
					'purchaseorder/purchaseorderdetail.act?method=getCollectAdjustState', {
					//recs:erp.Util.ModelsToJson(store.getRange()),
					login_id:login_id,
					ip:ip,
					htbh:htbh
				});
				myMask.unmask();
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				}
				dstore.load();
			}
		})
		cwin.show();
    	/*var swin=Ext.create('erp.view.purchaseOrder.window.DetailSelect',{
    		htbh:htbh
    	});
    	swin.down('#btn_confirm').on({
    		click:function(btn){
    			var win=btn.up('window');
    			var selStore=win.selStore;
    			var recs=selStore.getRange();
    			var htxhs=new Array();
    			if(recs.length>0){
    				Ext.each(recs,function(rec){
    					htxhs.push(rec.get('htxh'));
    				})
    				var sql="	update htmxb_tmp set xzbj=1 where htbh='"+recs[0].get('htbh')+"' and htxh in ("+htxhs.join(',')+") ";
    				sql+=" and ip ='"+ip+"' and login_id='"+login_id+"'";
			    	var result = erp.Const.callServiceMethodSync(
						'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
						sql:sql
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return;
					}
					var cwin=Ext.create('erp.view.purchaseOrder.window.CollectAdjust',{
						htbh:htbh
					});
					cwin.down('#btn_confirm').on({
						click:function(btn){
							var win=btn.up('window');
							var store=win.store;
							var result = erp.Const.callServiceMethodSync(
								'purchaseorder/purchaseorderdetail.act?method=getCollectAdjustState', {
								recs:erp.Util.ModelsToJson(store.getRange()),
								login_id:login_id,
								ip:ip,
								htbh:htbh
							});
							var data = Ext.decode(result);
							if (!data.bool) {
								Ext.toastErrorInfo(data.msg);
								return;
							}
							win.close();
							dstore.load();
						}
					})
					win.close();
					cwin.show();
    			}else{
    				Ext.toastInfo('请选择要汇总调整的材料！');
    			}
    		}
    	})
    	swin.show();*/
    },
    EdtButton:function(btn){
    	var me=this;
    	var edtPanel=me.getView();
    	var mainPanel=edtPanel.mainPanel;
    	var store=mainPanel.store;
    	var form=edtPanel.down('#PurchaseContractForm');
    	var rec=form.getRecord();
    	form=form.updateRecord(rec);
    	var zlbj=edtPanel.down('#zlbj').getValue();
    	if(zlbj){
    		rec.set('zlbj',1);
    	}else{
    		rec.set('zlbj',0);
    	}
    	var czym=erp.Util.currentUser.userInfo.name;
    	var dStore=edtPanel.DetailStore;
    	var tabPanel=edtPanel.down('#south');
    	var activeTab=tabPanel.activeTab;
    	var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
    	var myMask = new Ext.LoadMask({
			target : edtPanel
		});
		var dGrid=edtPanel.down('#ContractDetailGrid');
		var fileStore=edtPanel.FileStore;
		var dsrecs=dGrid.getSelectionModel().getSelection();
    	switch(btn.itemId){
    		case 'bomImp':
    			var grid=edtPanel.down('#MaterialGrid3');
    			var srecs=grid.getSelectionModel().getSelection();
    			if(srecs.length>0){
    				myMask.mask('数据导入中...');
    				var result = erp.Const.callServiceMethodSync(
						'purchaseorder/purchaseorderdetail.act?method=getBomImp', {
						recstr:erp.Util.ModelsToJson(srecs),login_id:login_id,ip:ip,czym:czym
					});
					myMask.unmask();
					edtPanel.djjs(srecs[0]);
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						break;
					}
					grid.getSelectionModel().deselectAll();
					grid.getSelectionModel().select(srecs[0]);
    			}else{
    				Ext.toastInfo('请选择合同明细!');
    			}
    		break;
    		case 'materialPaste':
    			var outSourceStore=edtPanel.outSourceStore;
    			var grid=edtPanel.down('#MaterialGrid4');
    			var srecs=grid.getSelectionModel().getSelection();
    			var srec=srecs[0];
    			var s_jgsl=srec.get('cgsl');
    			if(edtPanel.copy==null||edtPanel.copy.length==0){
		    		Ext.toastInfo('当前粘贴板无数据!');
		    	}
    			Ext.each(edtPanel.copy,function(rec){
    				var tzxh = outSourceStore.max('tzxh');
					if (tzxh == null) {
						tzxh = 1;
					} else {
						tzxh++;
					}
    				nrec = Ext.create('erp.view.purchaseOrder.model.OutSourcePicking',{
								htbh : rec.get('htbh'),
								htxh : srec.get('htxh'),
								tzxh : tzxh,
								lbbh : rec.get('lbbh'),
								lbmc : rec.get('lbmc'),
								clmc : rec.get('clmc'),
								cllbmc : rec.get('cllbmc'),
								clhh : rec.get('clhh'),
								jldw : rec.get('jldw'),
								jgbh : rec.get('jgbh'),
								jsbl : rec.get('jsbl'),
								jgyl : rec.get('jgyl'),
								tzll : rec.get('tzll'),
								login_id : login_id,
								ip : ip
					})
					nrec.phantom = true;
					outSourceStore.add(nrec);
    			})
    			outSourceStore.load({params:{htbh:srec.get('htbh'),htxh:srec.get('htxh')}});
    		break;
    		case 'materialCopy':
    			var grid=edtPanel.down('#outSourcePicking');
    			var outSourceStore=edtPanel.outSourceStore;
    			var srecs=grid.getSelectionModel().getSelection();
    			if(srecs.length==0){
    				Ext.toastInfo('请选中某行或多行再使用此功能！');
    				break;
    			}
    			edtPanel.copy=new Array();
    			Ext.each(srecs,function(rec){
					edtPanel.copy.push(rec.copy());
    			})
    			Ext.toastInfo('共复制 '+srecs.length+' 行材料!');
    		break;
    		case 'materialImp':
    			var grid=edtPanel.down('#MaterialGrid4');
    			var outSourceStore=edtPanel.outSourceStore;
    			var srecs=grid.getSelectionModel().getSelection();
    			if(srecs.length==0){
    				Ext.toastInfo('请选中某行或多行再使用此功能！');
    				break;
    			}
    			var srec=srecs[0];
    			var htbh=srec.get('htbh'),
    			htxh=srec.get('htxh'),
    			s_jgsl=srec.get('cgsl');
    			var sql = "	select count(*)  from jhmxb where jhbh='"+srec.get('jhbh')+"' and jhxh="+srec.get('jhxh')+"; ";
				var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',{
					sql : sql
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				if(data.val==0){
					Ext.toastInfo('该计划不存在!');
					break;
				}
    			var win=Ext.create('erp.view.purchaseOrder.window.OutSourceImp',{
    				jhh:srec.get('jhh')
    			});
    			win.down('#btn_confirm').on({
    				click:function(btn){
    					var win=btn.up('window');
    					var grid=win.down('#OutSourceImpDetailGrid');
    					var recs=grid.getSelectionModel().getSelection();
    					var nrec;
    					Ext.each(recs,function(rec){
    						if(rec.get('clhh')!=null&&Ext.String.trim(rec.get('clhh'))!=''){
	    						var tzxh = outSourceStore.max('tzxh');
								if (tzxh == null) {
									tzxh = 1;
								} else {
									tzxh++;
								}
	    						nrec = Ext.create('erp.view.purchaseOrder.model.OutSourcePicking',{
									htbh : htbh,
									htxh : htxh,
									tzxh : tzxh,
									lbbh : rec.get('lbbh'),
									cllbmc : rec.get('cllbmc'),
									clhh : rec.get('clhh'),
									jldw : rec.get('jldw'),
									jgbh : rec.get('jgbh'),
									jsbl : rec.get('jsbl'),
									jgyl : rec.get('bcyl'),
									tzll : rec.get('bcyl'),
									login_id : login_id,
									ip : ip
								})
								nrec.phantom = true;
								if(s_jgsl!=0){
									nrec.set('djyl',me.round(rec.get('bcyl')/s_jgsl,3))
								}
								outSourceStore.add(nrec)
    						}
    					})
    					outSourceStore.load({params:{htbh:nrec.get('htbh'),htxh:nrec.get('htxh')}});
    					win.close();
    				}
    			})
    			win.show();
    		break;
    		case 'priceSearch':
    			var win=Ext.create('erp.view.purchaseOrder.window.PriceSearch',{
    				htbh:rec.get('htbh')
    			});
    			win.show();
    		break;
    		case 'Collect':
    			var upRecs=dStore.getUpdatedRecords();
    			var newRecs=dStore.getNewRecords();
    			var delRecs=dStore.getRemovedRecords();
    			if(upRecs.length>0||newRecs.length>0||delRecs.length>0){
    				dStore.sync({callback:function(batch,options){
	    				me.doCollect(rec.get('htbh'),dStore);
	    			}});
    			}else{
    				me.doCollect(rec.get('htbh'),dStore);
    			}
    		break;
    		case 'descImp':
    			var win =Ext.create('erp.view.purchaseOrder.window.ProductDescImp',{
    				htbh:rec.get('htbh')
    			})
    			win.down('#btn_confirm').on({
    				click:function(btn){
    					var win=btn.up('window');
    					var grid=win.down('#ProductDescImp');
    					var recs=grid.getSelectionModel().getSelection();
    					var topright =win.down('#topright').getValue();
    					if(recs.length<=0){
    						Ext.toastInfo('请选中某行或多行再使用此功能！');
    						return ;
    					}else{
    						var cgyq=edtPanel.down('#cgyq').getValue();
    						var cpbz=recs[0].get('cpbz');
    						edtPanel.down('#cgyq').setValue(cgyq+cpbz);
    						edtPanel.down('#Material_Cpxj').setValue(topright);
    						win.close();
    					}
    				}
    			});
    			win.show();
    		break;
    		case 'template' :
				switch (activeTab.title) {
					case '材料描述':
						var win = Ext.create('erp.common.basic.view.TemplateHelp', {
							winParam : {mbbh : '0303'},
							title : '材料描述模版'
						});
						callback = function(value, target) {
							edtPanel.down('#Material_Clbz').setValue(value);
						};
						win.initWindow(callback, 'mbnr', 'Material_Clbz');
						win.show();
						break;
					case '合同条款' :
						var win = Ext.create('erp.common.basic.view.TemplateHelp', {
							winParam : {mbbh : '0301'},
							title : '合同条款模版'
						});
						callback = function(value, target) {
							edtPanel.down('#httk').setValue(value);
						};
						win.initWindow(callback, 'mbnr', 'httk');
						win.show();
						break;
					case '采购要求' :
						var win = Ext.create('erp.common.basic.view.TemplateHelp', {
							winParam : {mbbh : '0302'},
							title : '采购要求模版'
						});
						callback = function(value, target) {
							edtPanel.down('#cgyq').setValue(value);
						};
						win.initWindow(callback, 'mbnr', 'cgyq');
						win.show();
						break;
				}
				break;
    		case 'Del':
    			var outSourceStore=edtPanel.outSourceStore;
    			switch(activeTab.title){
    				case '领料明细':
    					var grid=edtPanel.down('#MaterialGrid4');
    					var srecs=grid.getSelectionModel().getSelection();
    					if(srecs.length==0){
    						Ext.toastInfo('请选中某行或多行再使用此功能！');
    						break;
    					}
    					Ext.Msg.confirm('提示', '是否确认删除所选明细?', function(btn) {
								if (btn == 'yes') {
									outSourceStore.remove(srecs);
		    					myMask.mask('数据保存中...');
		    					outSourceStore.sync({callback:function(){
		    						myMask.unmask();
		    					}});
								}
						})
    				break;
    				case '合同明细':
    					if(dsrecs.length>0){
    						//验证
    						myMask.mask('数据验证中...');
    						var htxh=new Array();
    						Ext.each(dsrecs,function(drec){
    							htxh.push("'"+drec.get('htxh')+"'");
    						})
					    	var result = erp.Const.callServiceMethodSync(
								'purchaseorder/purchaseorderdetail.act?method=getBeforDelPurchaseorderDetail', {
								 htbh:rec.get('htbh'),htxh:htxh.join(',')
							});
							myMask.unmask();
							var data = Ext.decode(result);
							if (!data.bool) {
								Ext.toastErrorInfo(data.msg);
								break;
							}
							Ext.Msg.confirm('提示', '是否确认删除所选明细?', function(btn) {
								if (btn == 'yes') {
									var result = erp.Const.callServiceMethodSync(
										'purchaseorder/purchaseorderdetail.act?method=getDelPurchaseorderDetail', {
										 htbh:rec.get('htbh'),htxh:htxh.join(','),login_id:login_id,ip:ip
									});
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return ;
									}
									dStore.load();
									outSourceStore.load();
									Ext.toastInfo('删除成功！');
								}
							})
    					}else{
    						Ext.toastInfo('请选中某行或多行再使用此功能！');
    						break;
    					}
    				break;
    				case '采购要求':
    					Ext.Msg.confirm('提示','是否取消原来的照片?',function(btn){
							 if(btn=='yes'){
								   	erp.Util.ftpDel(me.down('#http').getValue());
								   	edtPanel.down('#http').setValue('');
								    var src='ftp://'+tp_ftpUrl+url;
									edtPanel.down('#httpPic').setSrc('');
							}
						})
    				break;
    				case '附件信息':
    					var fielGrid=edtPanel.down('#PurFile');
    					var frecs=fielGrid.getSelectionModel().getSelection();
    					Ext.Msg.confirm('提示','是否确认删除本条明细?',function(btn){
							 if(btn=='yes'){
							 	//删除ftp文件
							 	Ext.each(frecs,function(rec){
							 		erp.Util.ftpDel(rec.get('wjlj'));
							 	})
							 	fileStore.remove(frecs);
							}
						})
    				break;
    				case '钢架计价':
    					var bomGrid=edtPanel.down('#BomGrid');
    					var bomRecs=bomGrid.getSelectionModel().getSelection();
    					if(bomRecs.length>0){
	    					Ext.Msg.confirm('提示','是否确认删除本条BOM材料明细?',function(btn){
								 if(btn=='yes'){
								 	bomGrid.getStore().remove(bomRecs);
								 	if(dsrecs.length>0){
								 		edtPanel.djjs(dsrecs[0]);
								 	}
								}
							})
    					}else{
    						Ext.toastInfo('请选中某行或多行再使用此功能！');
    					}
    				break;
    			}
    		break;
    		case 'Add':
    			switch(activeTab.title){
    				case '合同明细':
    					erp.Util.storeSync(dStore);
    					myMask.mask('数据验证中...');
				    	var result = erp.Const.callServiceMethodSync(
							'purchaseorder/purchaseorderdetail.act?method=getAddPurchaseorderDetail', {
							rec:Ext.encode(rec.data),login_id:login_id,ip:ip
						});
						myMask.unmask();
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						var pagingbar=dGrid.getDockedItems('pagingbar[dock = "bottom"]')[0];
						dStore.load({callback:function(recs){
							if(recs.length>=dStore.pageSize){
								pagingbar.moveLast();
							}
						}});
    				break;
    				case '采购要求':
    					var win =Ext.create('erp.view.master.purchaseDetail.window.UpImg');
			   	  				win.down('#savaPic').on('click',function(btn){
			   	  					var form = btn.up('form').getForm();
					                if (form.isValid()) {
					                    form.submit({
					                        url : 'common/uploadAttachement.action',
					                        method:'POST',
					                        timeout : 120000,
					                        params: {
					        					urlId: '/rzerp_hfpg/other/'//存储目录
					    					},
					                        waitMsg : '正在上传您的文件，请耐心等候...',
					                        success : function(form, action) {
					                        	Ext.Msg.alert('提示', action.result.msg);
					                        	var url=action.result.data;
					                        	if(url!=null){
						                        	edtPanel.down('#http').setValue(url);
						                        	var src='ftp://'+tp_ftpUrl+url;
						                        	tabPanel.down('#httpPic').setSrc(src);
						                        	btn.up('window').close();
					                        	}
					                        },
					                        failure : function() {
					                            Ext.Msg.alert("提示", "图片上传失败！");
					                        }
					                    });
					                }
			   	  				})
			   	  				win.show();
    				break;
    				case '附件信息':
    					var win =Ext.create('erp.view.purchaseOrder.window.UpFile');
			   	  				win.down('#btn_save').on('click',function(btn){
			   	  					var form = btn.up('form').getForm();
			   	  					var wjmc =win.getfileName();
					                if (form.isValid()) {
					                    form.submit({
					                        url : 'common/uploadAttachement.action',
					                        method:'POST',
					                        timeout : 120000,
					                        params: {
					        					urlId: '/rzerp_hfpg/other/'//存储目录
					    					},
					                        waitMsg : '正在上传您的文件，请耐心等候...',
					                        success : function(form, action) {
					                        	Ext.Msg.alert('提示', action.result.msg);
					                        	var win=btn.up('window');
					                        	var url=action.result.data;
					                        	if(url!=null){
						                        	var src='ftp://'+tp_ftpUrl+url;
						                        	wjbh=fileStore.max('wjbh')==null?1:fileStore.max('wjbh')+1;
						                        	var nModel=Ext.create('erp.view.purchaseOrder.model.PurchaseFile',{
						                        		htbh:rec.get('htbh'),
						                        		wjmc:wjmc,
						                        		wjbh:wjbh,
						                        		wjlj:url,
						                        		cjrq:new Date(),
						                        		cjrm:czym
						                        	});
						                        	nModel.phantom=true;
						                        	fileStore.add(nModel);
						                        	win.close();
					                        	}
					                        },
					                        failure : function() {
					                            Ext.Msg.alert("提示", "图片上传失败！");
					                        }
					                    });
					                }
			   	  				})
			   	  				win.show();
    				break;
    				case '领料明细':
    					var grid=edtPanel.down('#MaterialGrid4');
    					var outSourceStore=edtPanel.outSourceStore;
    					var srecs=grid.getSelectionModel().getSelection();
    					if(srecs.length==0){
    						Ext.toastInfo('请选中某行或多行再使用此功能！');
    						break;
    					}
    					var srec=srecs[0];
    					var htbh=srec.get('htbh'),
    					htxh=srec.get('htxh');
					    var s_jgsl=srec.get('cgsl')
    					var win =Ext.create('erp.view.purchaseOrder.window.MateSelect',{
    						onSubmit:function(rec,recs){
    							var nrec=null;
    							if(recs!=null&&recs.length!=0){
    								Ext.each(recs,function(rec){
    									var tzxh=outSourceStore.max('tzxh');
	    								if(tzxh==null){
	    									tzxh=1;
	    								}else{
	    									tzxh++;
	    								}
    									var ls_clhh=rec.get('clhh'),
    									ls_jldw=rec.get('jldw'),
    									ls_lbbh=rec.get('lbbh'),
    									ls_jgyl=rec.get('jgyl'),
    									ls_tzll=rec.get('tzll'),
    									ls_jsbl=rec.get('jsbl');
    									nrec=Ext.create('erp.view.purchaseOrder.model.OutSourcePicking',{
    										htbh:htbh,
    										htxh:htxh,
    										tzxh:tzxh,
    										lbbh:ls_lbbh,
    										clhh:ls_clhh,
    										jldw:ls_jldw,
    										login_id:login_id,ip:ip
    									})
    									if(ls_jgyl!=0){
    										nrec.set('jgyl',me.round(ls_jgyl,3));
    										nrec.set('tzll',me.round(ls_tzll,3));
    										if(s_jgsl!=0){
    											nrec.set('djyl',me.round(ls_jgyl/s_jgsl,3))
    										}
    									}else{
    										nrec.set('jgyl',me.round(s_jgsl,3));
    										nrec.set('tzll',me.round(s_jgsl,3));
    										if(s_jgsl!=0){
    											nrec.set('djyl',me.round(ls_jgyl/s_jgsl,3))
    										}
    									}
    									nrec.set('jsbl',me.round(ls_jsbl,4))
    									nrec.phantom=true;
    									outSourceStore.add(nrec)
    								})
    							}else{
    								var tzxh=outSourceStore.max('tzxh');
	    							if(tzxh==null){
	    								tzxh=1;
	    							}else{
	    								tzxh++;
	    							}
    								var ls_clhh=rec.get('clhh'),
    									ls_jldw=rec.get('jldw'),
    									ls_lbbh=rec.get('lbbh'),
    									ls_jgyl=rec.get('jgyl'),
    									ls_tzll=rec.get('tzll'),
    									ls_jsbl=rec.get('jsbl');
    									nrec=Ext.create('erp.view.purchaseOrder.model.OutSourcePicking',{
    										htbh:htbh,
    										htxh:htxh,
    										tzxh:tzxh,
    										lbbh:ls_lbbh,
    										clhh:ls_clhh,
    										jldw:ls_jldw,
    										login_id:login_id,ip:ip
    									})
    									if(ls_jgyl!=0){
    										nrec.set('jgyl',me.round(ls_jgyl,3));
    										nrec.set('tzll',me.round(ls_tzll,3));
    										if(s_jgsl!=0){
    											nrec.set('djyl',me.round(ls_jgyl/s_jgsl,3))
    										}
    									}else{
    										nrec.set('jgyl',me.round(s_jgsl,3));
    										nrec.set('tzll',me.round(s_jgsl,3));
    										if(s_jgsl!=0){
    											nrec.set('djyl',me.round(ls_jgyl/s_jgsl,3))
    										}
    									}
    									nrec.set('jsbl',me.round(ls_jsbl,4));
    									nrec.phantom=true;
    									outSourceStore.add(nrec)
    							}
    							outSourceStore.load({params:{htbh:nrec.get('htbh'),htxh:nrec.get('htxh')}});
    						}
    					});
    					
    					win.show();
    				break
    			}
    		break;
    		case 'BTN_SAVE':
    			var ll_cglx_fk=rec.get('cglx_fk');
    			var s_cglx=rec.get('cglx');
    			var s_htgz=rec.get('htgz');
    			var s_qzgz=rec.get('qzgz');
    			var s_cglb=rec.get('cglb');
    			var s_csbh=rec.get('csbh');
    			var s_ztdw=rec.get('ztdw');
    			var ls_cgybh=rec.get('cgym');
    			var s_zlcsbh=rec.get('zlcsbh');
    			var bool=false;
    			if(erp.Util.gettextlength(rec.get('cgbz'))>=60){
    				Ext.toastInfo('备注过长请调整！');
    				break;
    			}
    			if(rec.get('zlbj')==1&&(s_zlcsbh==null||Ext.String.trim(s_zlcsbh)=='')){
    				Ext.Msg.alert('提示','专利厂商不能为空！');
    				break;
    			}
    			if(ll_cglx_fk==null){
    				Ext.Msg.alert('提示','采购类型不能为空！');
    				break;
    			}
    			if(s_cglx==null||Ext.String.trim(s_cglx)==''){
    				Ext.Msg.alert('提示','合同类型不能为空！');
    				break;
    			}
    			if(s_htgz==null||Ext.String.trim(s_htgz)==''){
    				Ext.Msg.alert('提示','合同规则不能为空！');
    				break;
    			}
    			if(s_qzgz==null||Ext.String.trim(s_qzgz)==''){
    				Ext.Msg.alert('提示','取整规则不能为空！');
    				break;
    			}
    			if(s_csbh==null||s_csbh==''){
    				Ext.Msg.alert('提示','供货厂商不能为空！');
    				break;
    			}
    			if(s_cglb==null||s_cglb==''){
    				Ext.Msg.alert('提示','采购类别不能为空！');
    				break;
    			}
    			if(s_ztdw==null||Ext.String.trim(s_ztdw)==''){
    				Ext.Msg.alert('提示','主体单位不能为空！');
    				break;
    			}
    			var cgStore=edtPanel.down('#cgym').store;
    			ls_cgym='';
    			var cgrec=cgStore.findRecord('cgybh',ls_cgybh);
    			if(cgrec!=null){
    				ls_cgym=cgrec.get('cgyxm');
    			}
    			if(ls_cgybh==null||Ext.String.trim(ls_cgybh)==''){
    				Ext.Msg.alert('提示','采购员不能为空！');
    				break;
    			}else{
    				if(Ext.String.trim(ls_cgym)!=Ext.String.trim(czym)){
    					var bool=confirm('采购员与操作员不一致');
    					if(!bool){
    						break;
    					}
    				}
    			}
    			/*
    			 * 检测明细数据
    			 * 1.将当前数据保存进临时表(先判断是否有脏数据)
    			 * 2.调用保存方法
    			 * **/
    			/*var upRecs=dStore.getUpdatedRecords();
    			var newRecs=dStore.getNewRecords();
    			var delRecs=dStore.getRemovedRecords();
    			if(upRecs.length>0||newRecs.length>0||delRecs.length>0){
    				dStore.sync({callback:function(batch,options){
	    				me.saveAll(rec,czym,edtPanel,store);
	    			}});
    			}else{
    				me.saveAll(rec,czym,edtPanel,store);
    			}*/
    			erp.Util.storeSync(edtPanel.DetailStore);//保存明细数据
    			erp.Util.storeSync(edtPanel.outSourceStore);//保存外协数据
    			erp.Util.storeSync(edtPanel.subsidiaryStore);//保存附加信息
    			erp.Util.storeSync(edtPanel.BomStore);//保存附件信息
    			me.saveAll(rec,czym,edtPanel,store);
    		break;
    	}
    },
    saveAll:function(rec,czym,edtPanel,store){
    	//验证
    	var myMask = new Ext.LoadMask({
			target : edtPanel
		});
		var httk=edtPanel.down('#httk').getValue();
		var cgyq=edtPanel.down('#cgyq').getValue();
		rec.set('httk',httk);
		rec.set('cgyq',cgyq);
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		myMask.mask('数据验证中...');
    	var result = erp.Const.callServiceMethodSync(
			'purchaseorder/purchaseorderdetail.act?method=getBeforSave', {
			rec:Ext.encode(rec.data),login_id:login_id,ip:ip
		});
		edtPanel.isSave=true;//避免重复刷新厂商编号
		edtPanel.loadRecord(rec);
		edtPanel.isSave=false;//避免重复刷新厂商编号
		myMask.unmask();
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
		var fileStore=edtPanel.FileStore;
		rec.set('czym',czym);
		rec.set('czsj',new Date());
		var　oldHtbh=rec.get('htbh');
		Ext.Msg.confirm('提示', '是否确认保存?', function(btn) {
					if (btn == 'yes') {
						if (edtPanel.isAdd) {
							myMask.mask('数据保存中...');
							var result = erp.Const.callServiceMethodSync(
								'purchaseorder/purchaseorder.act?method=addPurchaseOrder', {
								data:'['+Ext.encode(rec.data)+']'
							});
							var data = result;
							var nrec=Ext.create('erp.view.purchaseOrder.model.PurchaseOrder',data[0]);
							if(nrec.get('htbh')<=0){
								Ext.toastInfo('保存异常请重试!');
								myMask.unmask();
								return;
							}
							//将临时表数据导入正式库
							var result = erp.Const.callServiceMethodSync(
								'purchaseorder/purchaseorderdetail.act?method=cacheTableToPurchaseOrderDetailFormal', {
								old_htbh:oldHtbh,htbh:nrec.get('htbh'),login_id:login_id,ip:ip,rec:Ext.encode(rec.data)
							});
							var data = Ext.decode(result);
							if (!data.bool) {
								myMask.unmask();
								Ext.toastErrorInfo(data.msg);
								return;
							}
							fileStore.each(function(dr) {
								dr.set('htbh',nrec.get('htbh'));
							})
							fileStore.sync({
								callback : function(batch,options) {
													
								}
							});
							myMask.unmask();
							Ext.toastInfo('保存完毕!');
							erp.Util.addTask(edtPanel,edtPanel.mainPanel.itemId,nrec.get('htbh'));
							edtPanel.bills_id=nrec.get('htbh');
							edtPanel.isAdd=false;
							edtPanel.loadRecord(nrec);
						}else{
							myMask.mask('数据保存中...');
							var result = erp.Const.callServiceMethodSync(
								'purchaseorder/purchaseorder.act?method=updatePurchaseOrder', {
								data:'['+Ext.encode(rec.data)+']'
							});
							//将临时表数据导入正式库
							var result = erp.Const.callServiceMethodSync(
								'purchaseorder/purchaseorderdetail.act?method=cacheTableToPurchaseOrderDetailFormal', {
								old_htbh:oldHtbh,htbh:rec.get('htbh'),login_id:login_id,ip:ip,rec:Ext.encode(rec.data)
							});
							var data = Ext.decode(result);
							if (!data.bool) {
								myMask.unmask();
								Ext.toastErrorInfo(data.msg);
								return;
							}
							myMask.unmask();
							Ext.toastInfo('保存完毕!');
							fileStore.sync({
								callback : function(batch,options) {
													
								}
							});
						}
					}
				})
    },
    onOrderImpButton:function(menu,btn){
    	var me=this;
    	var edtPanel=me.getView();
    	var dStore=edtPanel.DetailStore;
    	var csbh=edtPanel.down('#csbh').getValue();
    	var htbh=edtPanel.down('#htbh').getValue();
    	var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
    	switch(btn.itemId){
    		case 'orderImp1':
    			if(csbh==null||Ext.String.trim(csbh)==''){
    				Ext.toastInfo('请先选择供应厂商！');
    				break;
    			}
    			var win =Ext.create('erp.view.purchaseOrder.window.PurPanelImp',{csbh:csbh});
    			win.down('#btn_confirm').on({
    				click:function(btn){
    					var win =btn.up('window');
    					var selStore=win.selStore;
    					var recs=selStore.getRange();
    					var myMask = new Ext.LoadMask({
						    target : edtPanel
						});
						//首先保存当前数据
		    			dStore.sync({callback:function(batch,options){
			    		}});
						myMask.mask('数据导入中...');
    					var result = erp.Const.callServiceMethodSync(
							'purchaseorder/purchaseorderdetail.act?method=getPurPanelTransform', {
							recstr:erp.Util.ModelsToJson(recs),csbh:csbh,htbh:htbh,login_id:login_id,ip:ip
						});
						myMask.unmask();
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						win.close();
						edtPanel.DetailStore.load();
    				}
    			});
    			win.show();
    		break;
    		case 'orderImp3':
    			var win=Ext.create('erp.view.purchaseOrder.window.SalesOrderImp',{
    				
    			});
    			win.down('#btn_confirm').on({
    				click:function(btn){
    					var win =btn.up('window');
    					var selStore=win.selStore;
    					var recs=selStore.getRange();
    					var myMask = new Ext.LoadMask({
						    target : edtPanel
						});
						//首先保存当前数据
		    			dStore.sync({callback:function(batch,options){
			    		}});
						myMask.mask('数据导入中...');
    					var result = erp.Const.callServiceMethodSync(
							'purchaseorder/purchaseorderdetail.act?method=getSalesOrderTransform', {
							recstr:erp.Util.ModelsToJson(recs),csbh:csbh,htbh:htbh,login_id:login_id,ip:ip
						});
						myMask.unmask();
						var data = Ext.decode(result);
						if(data.cgbz!=''){
							edtPanel.down('#cgbz').setValue(data.cgbz);
						}
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						win.close();
						edtPanel.DetailStore.load();
    				}
    			});
    			win.show();
    		break;
    		case 'orderImp6':
    			var win=Ext.create('erp.view.purchaseOrder.window.ProPlanImp');
    			win.down('#btn_confirm').on({
    				click:function(btn){
    					var win =btn.up('window');
    					var selStore=win.selStore;
    					var recs=selStore.getRange();
    					var myMask = new Ext.LoadMask({
						    target : edtPanel
						});
						//首先保存当前数据
		    			dStore.sync({callback:function(batch,options){
			    		}});
						myMask.mask('数据导入中...');
    					var result = erp.Const.callServiceMethodSync(
							'purchaseorder/purchaseorderdetail.act?method=getProPlanTransform', {
							recstr:erp.Util.ModelsToJson(recs),csbh:csbh,htbh:htbh,login_id:login_id,ip:ip
						});
						myMask.unmask();
						var data = Ext.decode(result);
						if(data.cgbz!=''){
							edtPanel.down('#cgbz').setValue(data.cgbz);
						}
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						win.close();
						edtPanel.DetailStore.load();
    				}
    			});
    			win.show();
    		break;
    	}
    },
    onMainClickButton:function(btn){
    	var me=this;
    	var mainPanel=me.getView();
    	var grid=mainPanel.down('#PurchaseOrderGrid');
    	var recs=grid.getSelectionModel().getSelection();
    	var czym=erp.Util.currentUser.userInfo.name;
    	console.log(czym);
    	var s_czrq=new Date();
    	var myMask = new Ext.LoadMask({
			target : mainPanel
		});
		var rec=recs[0];
		var u_id=erp.Util.currentUser.userInfo.login_id;
		var u_name=erp.Util.currentUser.userInfo.name;
		var ip_add=erp.IP;
		var u_mac='';
		var store=grid.getStore();
		var dGrid=mainPanel.down('#PurchaseDetail');
		var drecs=dGrid.getSelectionModel().getSelection();
		var dstore=dGrid.getStore();
		if(rec!=null){
			var s_htbh=rec.get('htbh');
		}
    	switch (btn.itemId){
    		case 'BTN_DEL':
    			if(czym!=Ext.String.trim(rec.get('czym'))&&!erp.Util.currentUser.isAdmin){
    				Ext.toastInfo("非本合同操作员不能删除!");
					break;
    			}
    			var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorder.act?method=getBeforDel',{
						recstr : Ext.encode(rec.data),
						bills_id:s_htbh,bills_num:mainPanel.itemId
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				if(data.sync){
					store.load();
				}
				if(data.show){
					var bool=confirm(data.show);
    				if(!bool){
    					break;
    				}
				}
				Ext.Msg.confirm('提示', '是否确认删除？', function(btn) {
					if (btn == 'yes') {
						var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorder.act?method=getDelState',
						{
							htbh : s_htbh
						});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						store.load();
					}
				})
    		break;
    		case 'BTN_HISTORY':
				var btnBackup=mainPanel.down('#BTN_BACKUP');
				if (btn.getText()=="历史"){	
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
    		case 'BTN_BACKUP':
    			if(czym!=Ext.String.trim(rec.get('czym'))&&!erp.Util.currentUser.isAdmin){
    				Ext.toastInfo("非本合同操作员不能归档!");
					break;
    			}
    			var s_gdbj=rec.get('gdbj');
    			var s_wcbj=rec.get('wcbj');
    			var state=1;
    			var s_cglb=rec.get('cglb');
    			if(s_cglb==null){
    				s_cglb='';
    			}else{
    				s_cglb=Ext.String.trim(s_cglb);
    			}
    			if(s_gdbj==1){
    				Ext.Msg.confirm('提示', '是否确认恢复【 ' + rec.get('htbh')+ ' 】号合同？', function(btn) {
								if (btn == 'yes') {
									var sql = "	update cghtb set gdbj=0 where htbh='"+ s_htbh + "'; ";
									var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
									{sql : sql});
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return;
									}
									store.load();
								}
					})
    			}else{
    				if(s_wcbj==0){
    					Ext.toastInfo('【 '+s_htbh+' 】号合同未完成,不能归档!');
						break;
    				}
    				var win=Ext.create('erp.view.purchaseOrder.window.BackupType');
    				win.down('#btn_confirm').on({
    					click:function(btn){
    						var win=btn.up('window');
    						var from=win.down('#mainForm');
    						var gdlx=from.getValues().gdlx;
    						if(gdlx==1){
    							Ext.Msg.confirm('提示', '是否确认归档【 '+rec.get('htbh')+' 】号合同？', function(btn) {
									if (btn == 'yes') {
										var sql="	update cghtb set gdbj=1 where htbh='"+s_htbh+"'; ";
										if(s_cglb!=''){
											sql="	update cghtb set gdbj=1 where htbh='"+s_htbh+"' and left(cglb,len('"+s_cglb+"'))='"+s_cglb+"' ; ";
										}
										var result = erp.Const.callServiceMethodSync(
											'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
											sql:sql
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
										store.load();
										win.close();
									}
								})
    						}else{
    							Ext.Msg.confirm('提示', '是否归档所有已签发完成合同？', function(btn) {
									if (btn == 'yes') {
										var sql="	update cghtb set gdbj=1 where wcbj=1 ";
										if(s_cglb!=''){
											sql="	update cghtb set gdbj=1 where wcbj=1 and left(cglb,len('"+s_cglb+"'))='"+s_cglb+"' ; ";
										}
										var result = erp.Const.callServiceMethodSync(
											'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
											sql:sql
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
										store.load();
										win.close();
									}
								})
    						}
    					}
    				})
    				win.show();
    			}
    			
    		break;
    		case 'btn_ctl':
    			var s_kzbj=rec.get('kzbj');
    			var bb='';
    			var state=1;
    			if(s_kzbj==1){
    				bb='取消';
    				state=0;
    			}
    			Ext.Msg.confirm('提示', '是否确认'+bb+'控制【 '+rec.get('htbh')+' 】号合同？', function(btn) {
						if (btn == 'yes') {
							var sql="	update cghtb set kzbj='"+state+"',kzrm='"+czym+"',kzsj=getdate() where htbh="+rec.get('htbh')+"; ";
					    	var result = erp.Const.callServiceMethodSync(
								'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
								 sql:sql
							});
							var data = Ext.decode(result);
							if (!data.bool) {
								Ext.toastErrorInfo(data.msg);
								return;
							}
							rec.set('kzbj',state);
							rec.set('kzrm',czym);
							rec.set('kzsj',new Date());
							rec.commit();
							//store.load();
						}
    			})
    		break;
    		case 'btn_suspend':
				var bool = false;
				if(drecs.length==0){
					Ext.toastErrorInfo('请选择一条或多条合同明细!');
					break;
				}
				//判断合同是否有对应平台合同
				var drec=drecs[0];
				var bb='';
				var s_zzbj=drec.get('zzbj');
				if(s_zzbj==0){
					if(czym!=Ext.String.trim(rec.get('czym'))&&!erp.Util.currentUser.isAdmin){
	    				Ext.toastInfo("非本合同操作员不能中止该合同!");
						break;
	    			}
				}else{
					bb='取消';
				}
				myMask.mask('数据验证中...');
				var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorder.act?method=getBeforSuspend',
						{
							recstr : erp.Util.ModelsToJson(drecs)
						});
				myMask.unmask();
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				Ext.Msg.confirm('提示', '是否确认'+bb+'中止所选采购的合同明细？', function(btn) {
						if (btn == 'yes') {
							if(s_zzbj==0){
								var win=Ext.create('erp.view.purchaseOrder.window.Suspend');
								win.down('#btn_confirm').on({
									click:function(btn){
										var win=btn.up('window');
										var s_zzlx=win.down('#zzlx').getValue();
										var s_zzyy=win.down('#zzyy').getValue();
										if(s_zzyy==null){
											s_zzyy='';
										}
										if(s_zzlx==null){
											s_zzlx='';
										}
										if(s_zzlx==''){
											Ext.toastInfo("中止类型不允许为空!");
											return;
										}
										myMask.mask('合同中止...');
										var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorder.act?method=getSuspend',
												{
													recstr : erp.Util.ModelsToJson(drecs),zzlx:s_zzlx,zzyy:s_zzyy,u_name:u_name
												});
										myMask.unmask();
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return ;
										}
										win.close();
										if(data.ifupdate=="0"){//根据平台订单决定是否更新中止标记
										Ext.each(drecs,function(drec){
											drec.set('zzbj',1);
											drec.set('zzlx',s_zzlx);
											drec.commit();
										});
										}
										rec.set('wcbj',data.wcbj);
										rec.commit();
										//store.load();
										//dstore.load();
									}
								})
								win.show();
							}else{
								myMask.mask('合同取消中止...');
								var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorder.act?method=getSuspend',
								{
										recstr : erp.Util.ModelsToJson(drecs),zzlx:'',zzyy:'',u_name:u_name
								});
								myMask.unmask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return ;
								}
								Ext.each(drecs,function(drec){
									drec.set('zzbj',0);
									drec.set('zzlx','');
									drec.commit();
								});
								rec.set('wcbj',data.wcbj);
								rec.commit();
								//store.load();
								//dstore.load();
							}
						}
				})
    		break;
    		case 'btn_issueback':
    			var nrec=rec.copy();
    			var isEdit=true;
    			if(nrec.get('hqbj')==0){
    				nrec.set('hqbj',1);
    				nrec.set('hqsj',new Date());
    				isEdit=false;
    			}
    			win=Ext.create('erp.view.purchaseOrder.window.IssueBack',{rec:nrec,isEditOn:isEdit});
    			Ext.each(win.query('button'),function(btn){
    				btn.on({
	    				click:function(btn){
	    					var win=btn.up('window');
	    					var srecs=win.store.getRange();
	    					var form=win.down('#mainForm');
	    					var mrec=form.getRecord();
	    					form.updateRecord(mrec);
	    					switch(btn.itemId){
	    						case 'btn_confirm':
		    						Ext.Msg.confirm('提示', '是否确认保存?', function(btn) {
										if (btn == 'yes') {
			    							myMask.mask('数据保存中...');
											var result = erp.Const.callServiceMethodSync(
												'purchaseorder/purchaseorder.act?method=getIssueBack',{
												 recstr :erp.Util.ModelsToJson(srecs),
												 mrec:Ext.encode(mrec.data)
											});
											myMask.unmask();
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											win.close();
											rec.set('hqbj',1);
											rec.set('hqsj',mrec.get('hqsj'));
											rec.commit();
											//store.load();
										}
		    						})
	    						break;
	    						case 'btn_cancel':
	    							Ext.Msg.confirm('提示', '是否确认保存?', function(btn) {
										if (btn == 'yes') {
			    							myMask.mask('数据保存中...');
											var result = erp.Const.callServiceMethodSync(
												'purchaseorder/purchaseorder.act?method=getIssueBackCancel',{
												 recstr :erp.Util.ModelsToJson(srecs),
												 mrec:Ext.encode(mrec.data)
											});
											myMask.unmask();
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											win.close();
											rec.set('hqbj',0);
											rec.set('hqsj',null);
											rec.commit();
											//store.load();
										}
		    						})
	    						break;
	    					}
	    				}
	    			})
    			})
    			win.show()
    		break;
    		case 'btn_issue':
    			if(recs.length==0){
    				Ext.toastInfo("请至少选择一条明细!");
					break;
    			}
    			myMask.mask('数据验证中...');
				var result = erp.Const.callServiceMethodSync(
					'purchaseorder/purchaseorder.act?method=getBeforIssue',{
					 recstr :erp.Util.ModelsToJson(recs),
					 u_id:u_id,bills_num:mainPanel.itemId,ip_add:ip_add,u_mac:u_mac,u_name:u_name
				});
				myMask.unmask();
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				}
				if(data.show){
					var bool=confirm(data.show);
    				if(!bool){
    					break;
    				}
				}
				var htbh=new Array();
				Ext.each(recs,function(r){
					htbh.push("'"+r.get('htbh')+"'");
				})
				var s_qfbj=rec.get('qfbj');
				var state=1;
				var bb='确定';
				if(s_qfbj==1){
					bb='取消';
					state=0;
				}
				Ext.Msg.confirm('提示', '是否'+bb+'签发所选合同?', function(btn) {
					if (btn == 'yes') {
						myMask.mask('数据验证中...');
						var result = erp.Const.callServiceMethodSync(
							'purchaseorder/purchaseorder.act?method=updateIssue',{
							 recstr :erp.Util.ModelsToJson(recs),u_name:u_name
						});
						myMask.unmask();
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						//后台数据同步改为前台数据变更
						Ext.each(recs,function(r){
							if(Ext.isEmpty(r.get('cgrq_top'))){
								r.set('cgrq_top',new Date());
							}
							r.set('qfbj',state);
							r.set('qfrm',czym);
							r.set('qfsj',new Date());
							r.commit();
						})
						//store.load();
					}
				})
    		break;
    		case 'btn_lock':
    			if(recs.length==0){
    				Ext.toastInfo("请至少选择一条明细!");
					break;
    			}
    			if(czym!=Ext.String.trim(rec.get('czym'))&&!erp.Util.currentUser.isAdmin){
    				Ext.toastInfo("只有管理员和合同操作员能锁定该合同!");
					break;
    			}
				myMask.mask('数据验证中...');
				var result = erp.Const.callServiceMethodSync(
					'purchaseorder/purchaseorder.act?method=getBeforLock',{
					 recstr :erp.Util.ModelsToJson(recs),
					 u_id:u_id,bills_num:mainPanel.itemId,ip_add:ip_add,u_mac:u_mac,u_name:u_name
				});
				myMask.unmask();
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				}
				if(data.sync){
					store.load();
				}
				var htbh=new Array();
				Ext.each(recs,function(r){
					htbh.push("'"+r.get('htbh')+"'");
				})
				var sdbj=rec.get('sdbj');
    			var bool=false;
				var state=1;
				var bb='确定';
				if(sdbj==1){
					bb='取消';
					state=0;
				}
				Ext.Msg.confirm('提示', '是否'+bb+'锁定选中合同?', function(btn) {
					if (btn == 'yes') {
						var sql="	update cghtb set sdbj='"+state+"',sdrm='"+czym+"',sdsj=getdate() where htbh in ("+htbh.join(',')+"); ";
				    	var result = erp.Const.callServiceMethodSync(
							'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
							 sql:sql
						});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						//后台数据同步改为前台数据变更
						Ext.each(recs,function(r){
							r.set('sdbj',state);
							r.set('sdrm',czym);
							r.set('sdsj',new Date());
							r.commit();
						})
						//store.load();
					}
				})
    		break;
    		case 'btn_copy':
    			var nrec=recs[0].copy();
    			nrec.set('cgrq',s_czrq);
    			nrec.set('czsj',s_czrq);
    			nrec.set('czym',czym);
    			nrec.set('qfbj',0);
    			nrec.set('xkxj',0);
    			nrec.set('cglx_fk',0);
    			nrec.phantom=true;
    			var panel=me.showEdt(nrec,true,true,true);
    		break;
    		case 'BTN_ADD':
    			var s_czrq=new Date();
    			var mrec=Ext.create('erp.view.purchaseOrder.model.PurchaseOrder',{
    				htbh:0,
    				cglx:'常规',
    				cglb:mainPanel.cglb,
    				cgrq:s_czrq,
    				czym:czym,
    				czsj:s_czrq,
    				htgz:'常规',
    				qzgz:'常规',
    				xkxj:0,
    				cglx_fk:0
    			});
    			mrec.phantom=true;
    			me.showEdt(mrec,true,true,false);
    		break;
    	}
    },
    onQueryClickButton:function(menu,btn){
    	var view=this.getView();
    	var store=view.store;
    	var dstore=view.down('#mng_SouthTab').DetailStore;
    	switch(btn.itemId){
    		case 'btn_query1':
    			var win =Ext.create('erp.view.purchaseOrder.window.TopSearch',{
    				store:store,
    				search:view.search
    			});
    			win.show();
    		break;
    		case 'btn_query2':
    			var win =Ext.create('erp.view.purchaseOrder.window.DownSearch',{
    				store:dstore,
    				search:view.detailSearch
    			});
    			win.show();
    		break;
    	}
    },
    mainitemdblclick:function(v,rec){
    	var me=this;
    	var mainPanel=me.getView();
    	var czym=erp.Util.currentUser.userInfo.name;
    	var bool=erp.Util.checkExclusive(mainPanel.itemId,rec.get('htbh'));
    	if(bool){
			return ;    	
    	}
    	var myMask = new Ext.LoadMask({
				target : mainPanel
		});
		myMask.mask('数据验证中...');
		var result = erp.Const.callServiceMethodSync(
			'purchaseorder/purchaseorderdetail.act?method=getBeforEdt',{
				htbh : rec.get('htbh')
		});
		myMask.unmask();
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
    	var panel=me.showEdt(rec,false,true,false);
    },
    showEdt:function(rec,isAdd,isEdit,isCopy){
    	var me=this;
    	var mainPanel=me.getView();
    	var myMask = new Ext.LoadMask({
				target : mainPanel
		});
    	var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
    	var czym=erp.Util.currentUser.userInfo.name;
    	var s_qfbj=rec.get('qfbj');
    	var s_sdbj=rec.get('sdbj');
    	if(isEdit){
    		var result = erp.Const.callServiceMethodSync(
				'purchaseorder/purchaseorderdetail.act?method=addPurchaseOrderDetailToCacheTable', {
				htbh:rec.get('htbh'),login_id:login_id,ip:ip,isCopy:isCopy?1:0
			});
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
				return;
			}
			//根据操作员名映射采购员
			var rz_czy=erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;
			myMask.mask('正在更新，请等待......');
    		var sql  =" select cgybh  from cgyb where cgyb.czy_gh ='"+rz_czy+"'";
			var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
			{sql : sql});
			myMask.unmask();
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
				return ;
			}
			rec.set('cgym',data.val);
    	}
    	if(s_qfbj==1||s_sdbj==1||(Ext.String.trim(czym)!=Ext.String.trim(rec.get('czym'))&&!erp.Util.currentUser.isAdmin)){
    		isEdit=false;
    	}
    	if(isCopy){
    		rec.set('htbh',0);
    	}
    	var panel=erp.Util.addContentTab({
					xtype:'EdtPurchaseOrder',
					itemId:'EdtPurchaseOrder',
					title : '采购合同编辑',
					isAdd : isAdd,
					isEdit : isEdit,
					isCopy:isCopy,
					mainPanel:mainPanel,
					mrec:rec,
					bills_num:mainPanel.itemId,
					cateTreeStore:mainPanel.cateTreeStore,
					bills_id:rec.get('htbh'),
					//drecs:drecs,
					//screcs:screcs,
					closable : true
				});
		if(!isAdd&&isEdit){
			erp.Util.addTask(panel,mainPanel.itemId,rec.get('htbh'));
		}
		return panel;
    },
    init:function(){
    	
    },
    round:function(v,l){
		return Ext.util.Format.round(v,l);
	}
});