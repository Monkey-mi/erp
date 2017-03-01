Ext.define('erp.companyQuot.controller.CompanyQuotCtrl',{
    extend : 'Ext.app.Controller',
    requires : ['erp.ux.PagingBar',
                'Ext.ux.TreePicker',
                'Ext.window.MessageBox',
               'erp.companyQuot.store.CompanyQuot',
               'erp.companyQuot.store.QuotDetail',
               'erp.master.foreigncurrency.store.foreignCurrency',
               'erp.view.master.company.store.CompanyShow',
               'erp.master.caterialPricePurchase.store.PurchasePrice',
               'erp.master.caterialPricePurchase.store.HistoryPriceCtl',
               'erp.master.caterialPricePurchase.store.HistroyQuote',
               'erp.view.master.purchaseDetail.store.MaterialDetail',
               'erp.companyQuot.store.CompanyQuotFile',
               'erp.companyQuot.model.QueryParam'],
    views : ['erp.companyQuot.view.CompanyQuotManger',
             'erp.companyQuot.view.EditCompanyQuot',
             'erp.companyQuot.view.CompanyQuotQuery',
             'erp.companyQuot.view.QuotFileUpload',
             'erp.master.caterialPricePurchase.view.HistoryEnquiry',
             'erp.view.master.purchaseDetail.window.MateCombo',
             'erp.companyQuot.view.CompanyQuotDetialQuery'],
    refs : [{ref : 'CompanyQuot',selector :'mng_CompanyQuot' },
            {ref : 'GrdCompanyQuot',selector :'mng_CompanyQuot #grd_CompanyQuot' },
            {ref : 'GrdQuotDetail',selector :'mng_CompanyQuot #grd_QuotDetail' },
            {ref : 'EdtCompanyQuot',selector:'edt_CompanyQuot'},
            {ref : 'FileList',selector:'edt_CompanyQuot #grd_QuotFile'}],
    init : function(){
       var me = this;
       if (me.isInited)
			return;
       me.control({
          'mng_CompanyQuot' : {
           beforerender:function(cmp){
			        var bar2 = cmp.down('#function_btn');
			        erp.Util.setMenuFunc(bar2.down('#BTN_PRINT'),cmp.modId,cmp);
			    }, 	
           afterrender : function(){
                me.panel = me.getCompanyQuot();
                me.grdmain = me.getGrdCompanyQuot();
                me.grdStore = me.panel.store;
                me.grdStore.load();
                me.grdDetail = me.getGrdQuotDetail();
                me.deStore = me.panel.deStore;
                me.fileStore = me.panel.fileStore;
                me.query_rec = Ext.create('erp.companyQuot.model.QueryParam');
                
              }
          },
          'mng_CompanyQuot button' : {
			       click : me.doAction
		   },
		   'mng_CompanyQuot #grd_CompanyQuot' : {
		      selectionchange : function(grid, rec) {
							if (rec.length > 0) {
								me.deStore.load({params: {bjdh : rec[0].get('bjdh')}});
							    me.fileStore.load({params: {bjdh : rec[0].get('bjdh')}});
							}else {
							}
			},
			itemdblclick : function(grid, rec) {
							me.EdtCompanyQuot('btn_edt');
						    
						}
		   },
		   'edt_CompanyQuot' : {
		         afterrender : function(th){
		            me.panel.down('#function_btn').disable();
                    me.grdmain.disable();
                    me.panel.can_use_btn=false;
		         },
		         beforedestroy:function(th){
					me.panel.down('#function_btn').enable();
					me.grdmain.enable();
					me.panel.can_use_btn=true;
					var sel_rec=me.grdmain.getSelectionModel().getSelection()[0];
					me.grdmain.getSelectionModel().select(sel_rec);
				}  
		   },
		    'edt_CompanyQuot button':{
		        click : me.doEdtCompanyQuot
		    }  
       });
       me.isInited = true;
     },
     doAction : function(btn){
        var me =this;
        switch(btn.itemId){
           case 'btn_add' : 
           this.EdtCompanyQuot(btn.itemId);
           break;
           case 'btn_edt' : 
           this.EdtCompanyQuot(btn.itemId);
           break;
           case 'btn_del' : 
           this.DeleteEdtCompanyQuot();
           break;
           case 'btn_lock' :
           var store = me.deStore;
           var mainstore = me.grdStore;
           var recs=me.grdDetail.getSelectionModel().getSelection();
           if(recs.length==0){
				Ext.Msg.alert('提示','请选择至少一条明细记录(可多选)!');
				break;
		   }else{
		   for(var i=0;i<recs.length-1;i++){
		    if(recs[i].get('sdbj')!=recs[i+1].get('sdbj')){
		           Ext.Msg.alert('提示','所选报价明细锁定标记应一致!');
				    return; 
		       }
		    } 
		    for(var i=0;i<recs.length;i++){
		          if(recs[i].get('sdbj')==1&&recs[i].get('shbj')==1){
		           Ext.Msg.alert('提示','所选明细中有已审核的记录，不允许解锁定!');
				   return; 
		     }
		   }}
		   
		   var rc=recs[0];
		   var czym = erp.Util.currentUser.userInfo.name;
		   var czrq = new Date(); 
		   var bjdh = rc.get('bjdh');
		   Ext.Msg.confirm('提示','是否是否确认锁定/解锁所选中的报价明细?',function(btn){
					if (btn=='yes'){
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
									'companyquot/companyquot.act?method=update_bj', {
										recordData : recordData,sdrm:czym,sdsj:czrq
									});
						    store.reload();
					      //该报价单下明细是否已全部锁定，如果已全部锁定，更新上界面锁定标志，否则取消锁定标志
		                  var ifallsd = erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=ifAllsd',{
		                   bjdh : bjdh
		                  })
		                   if(ifallsd == 0){
		                   erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=updateMainSdbj',{
		                   bjdh : bjdh,sdbj : 1
		                   });
		                   mainstore.reload();
		                 }else{
		                   erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=updateMainSdbj',{
		                   bjdh : bjdh,sdbj : 0
		                   });
		                   mainstore.reload();
		                 }	    
					}			
				});	
			//如果ifallsd = 0 说明报价单明细全部已锁定，则在上界面对应报价单打上锁定标记	
           break;
           //审核
           case  'btn_aud' : 
           var store = me.deStore;
           var mainstore = me.grdStore;
           var recs=me.grdDetail.getSelectionModel().getSelection();
           var mainrec = me.grdmain.getSelectionModel().getSelection()[0];
            if(recs.length==0){
				Ext.Msg.alert('提示','请选择至少一条明细记录(可多选)!');
				break;
		   }else{
		     for(var i=0;i<recs.length-1;i++){
		     if(recs[i].get('shbj')!=recs[i+1].get('shbj')){
		           Ext.Msg.alert('提示','所选报价明细锁定标记应一致!');
				    return; 
		       }
		     }
		     for(var i=0;i<recs.length;i++){
		      if(recs[i].get('sdbj')==0&&recs[i].get('shbj')==0){
		          Ext.Msg.alert('提示','所选明细中有还未锁定的记录,不允许审核!');
				  return; 
		      }
		      if(mainrec.get('spbj')==1&&recs[i].get('shbj')==1){
		          Ext.Msg.alert('提示','该报价单已经审批，不允许解除审核!');
				  return;  
		      }
		      if(recs[i].get('shbj')==1&&Ext.String.trim(recs[i].get('shrm'))!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		          Ext.Msg.alert('提示','非管理员或审核人不允许解除审核!');
		          return;
		      }
		     }
		   }
		   var rc=recs[0];
		   var czym = erp.Util.currentUser.userInfo.name;
		   var czrq = new Date(); 
		   var bjdh = rc.get('bjdh');
           Ext.Msg.confirm('提示','是否确认审核/解除审核所选中的报价明细?',function(btn){
                if (btn=='yes'){
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
									'companyquot/companyquot.act?method=update_sh', {
										recordData : recordData,shrm:czym,shsj:czrq
									});
						    var status = 0;			
							/*Ext.each(recs, function(rec) {
							    status = rec.get('shbj');
							    console.log(status)
							    rec.set('shbj',status==0?1:0);
							    rec.set('shrm',czym);
							    rec.set('shsj',czrq);
							})*/
						     var ifallsh = erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=ifAllsh',{
		                   bjdh : bjdh
		                  })
		                   if(ifallsh == 0){
		                   erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=updateMainShbj',{
		                   bjdh : bjdh,shbj : 1
		                   });
		                   mainrec.set('shbj',1)
		                 }else{
		                   erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=updateMainShbj',{
		                   bjdh : bjdh,shbj : 0
		                   });
		                   mainrec.set('shbj',0)
		                 }	
		                 me.deStore.reload({params:{bjdh:mainrec.get('bjdh')}})
                }
           })
           break;
           //审批
           case 'btn_appro' : 
            var store = me.grdStore;
            var recs=me.grdmain.getSelectionModel().getSelection()[0];
            var bjdh = recs.get('bjdh');
            var status = recs.get('spbj');
            var alertmsg="";
            if(status==0){
              if(recs.get('shbj'==0)){
                Ext.Msg.alert('提示','该报价单还未审核，不允许审批!');
				break;
              }else{
                alertmsg="是否确认审批该报价单?";
              }
            }else if(status==1){
			alertmsg="是否确认解审批该报价单?";
		    }else{
			Ext.Msg.alert('提示','操作无效');
			return;
		    }
            Ext.Msg.confirm('提示',alertmsg,function(btn){
                 if(btn=='yes'){
                    erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=doAppro',{
                         bjdh:bjdh,
                         spbj:(status==0?1:0),
                         sprm:erp.Util.currentUser.userInfo.name,
                         spsj:new Date()
                    })
                    store.reload();
                 }
              })
           break;
           case 'btn_detialSerch' :
              var win = Ext.widget('DetialQuery');
              win.show();
           break;
           //询价比价
           case 'btn_enquiry' :
             var store = me.deStore;
             var recs=me.grdDetail.getSelectionModel().getSelection()[0];
             if(Ext.isEmpty(recs)){
                 Ext.Msg.alert('提示','请选择一条报价明细');
                 return;
             }
             var clhh = recs.get('clhh');
             var clmc = recs.get('clmc');
             var csbj = recs.get('csbj');
             var hpStore = Ext.create('erp.master.caterialPricePurchase.store.PurchasePrice');
             var bjStore = Ext.create('erp.master.caterialPricePurchase.store.HistroyQuote');
             var kjStore = Ext.create('erp.master.caterialPricePurchase.store.HistoryPriceCtl');
             var win = Ext.widget('mng_HistoryEnquiry',{
                    itemId:'mng_HistoryEnquiry',
					clhh: clhh,
					hpStore : hpStore,
					bjStore : bjStore,
					kjStore : kjStore,
					usePaging:true,
					title : '材料询价比价 【'+clmc+' 本次价格: '+csbj+'】'
                });
               win.show();  
           break;
           
           //生成控制单价
           case 'btn_refPrice' : 
            var store = me.grdStore;
            var recs=me.grdmain.getSelectionModel().getSelection();
            var derecs = me.grdDetail.getSelectionModel().getSelection();
            var destore = me.deStore;
            if(derecs.length==0){
				Ext.Msg.alert('提示','请选择至少一条明细记录(可多选)!');
				break;
		     }else{
		      for(var i=0;i<recs.length;i++){
		         if(recs[i].get('spbj')==0){
		             Ext.Msg.alert('提示','该报价单未审批，不能生成控制单价!');
		             return;
		         }
		         if(Ext.isEmpty(recs[i].get('csbh'))||recs[i].get('csbh')==""){
		             Ext.Msg.alert('提示','档案中没有维护该厂商,不能生成控制单价!');
		             return;
		         } 
		      }
		      for(var i=0;i<derecs.length;i++){
		         if(derecs[i].get('shbj')==0){
		              Ext.Msg.alert('提示','只有通过审核的商品才能生成控制单价');
		              return;
		         }
		      }
		     }
		     var csbh = recs[0].get('csbh');
		     var czym = erp.Util.currentUser.userInfo.name;
		     var czsj = new Date(); 
		     Ext.Msg.confirm('提示','是否确认进行生成控制单价?',function(btn){
		             if (btn=='yes'){
		                Ext.Ajax.setTimeout(120000);
		             	Ext.getBody().mask('正在生成控制单价，请耐心等候...');
		             	var recordData = "["; //参数
					    var a=false;
					 	Ext.each(derecs, function(rec) {
									if (a) {
										recordData += ",";
									}
									recordData += Ext.encode(rec.data);
									a = true;
					    });
					    recordData += "]";
		                var result = erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=ctrlPrice',
		                {recordData : recordData,csbh:csbh,czym:czym,czsj:czsj})
		                var data = Ext.decode(result);
		                Ext.getBody().unmask();
		                if(data.bool == false){
		                   Ext.Msg.alert('提示',data.msg);
			               return ;
		                }
		                destore.reload();
		             }    
		     });
		     //价格更新过的材料明细，打上价格更新标记
           break;
           
           //归档
           case 'btn_arc' : 
           var store = me.grdStore;
           var recs=me.grdmain.getSelectionModel().getSelection();
           if(recs!=null&&recs.length>0){
           Ext.Msg.confirm('提示',"真的要归档/恢复所选记录?",function(btn){
                 if(btn=="yes"){
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
									'companyquot/companyquot.act?method=updateGdbj', {
										recordData : recordData
									});
							store.reload();
                 }
           })}
           break
           case 'btn_serch' : 
            var isCgy=false;
					Ext.each(erp.Util.currentUser.roleList,function(role){
						if(role.role_name=='采购员'){
							isCgy=true;
							return false;
						}
					})
			if(!erp.Util.currentUser.isAdmin&&isCgy){
		    			//判断当前操作员是否为采购员
							me.query_rec.set('czym',erp.Util.currentUser.name);
							me.query_rec.set('checkbox_czym',1);
					}		
           var win = Ext.widget('win_CQQuery',{
                itemId : 'win_CQQuery',
                mainstore:me.grdStore,
				mainview:me.panel,
				rec:me.query_rec
           })
           win.show();
           break;
           case 'btn_his' : 
           var store = me.grdStore;
           var recs =  me.grdmain.getSelectionModel().getSelection();
           var btnBackup =  me.panel.down('#btn_arc');
            if(btn.getText()=='历史报价'){
                 btn.setText('当前报价');
                 btnBackup.setText('恢复');
                 btnBackup.setIconCls('book_previous');
                 me.grdStore.loadPage(1,{
                    params : {gdbj:1}
                 })
            }else{
                 btn.setText('历史报价');
                 btnBackup.setText('归档');
                 btnBackup.setIconCls('book_next');
                 me.grdStore.loadPage(1,{
                    params : {gdbj:0}
                 })
            }
        }
     },
     EdtCompanyQuot : function(type){
       var me = this;
       var rec;
       var isAdd=isEdit=false;
       var isPlus=true;
	   var isDelete=true;
	   var canedit=true;
	   var editwbbh;
	   switch(type){
	      case 'btn_add' :
	           isAdd=true;
			   isEdit=false;
			   isPlus=isDelete=canedit=true;
			   editwbbh=false;
	      var rec = Ext.create('erp.companyQuot.model.CompanyQuot',{
	         bjdh : 0,bjrq : new Date()
	      });
	       break;
	    case 'btn_edt':
	      var rec = me.grdmain.getSelectionModel().getSelection()[0];
	      if(Ext.isEmpty(rec)){
	      	 Ext.Msg.alert('提示','请先选中一条记录');
			   return;
	      }
	       isPlus=isDelete=canedit=true;
	       isAdd=false;
		   isEdit=true;
	   }
	     var ifsp = erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=getSpbj',{
	      bjdh : rec.get('bjdh')
	     })
	     if(ifsp=="1"){
	       isPlus = false;
		   isDelete = false;
		   canedit = false;
	     }
	     var lswbbh = erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=getWbbh',{
	      csbh : rec.get('wbbh')
	     })
	     if(Ext.isEmpty(lswbbh)||lswbbh==""){
	      editwbbh = true
	     }
	    var win = Ext.widget('edt_CompanyQuot',{
	         itemId : 'edt_CompanyQuot',
	         title : '厂商报价单编辑',
	         isAdd : isAdd,
	         isDelete : isDelete,
	         isEdit : isEdit,
			 isPlus : isPlus,
	         rec : rec[0],
	         mainstore : me.grdStore,
	         canedit : canedit
	    });
	    win.loadData(rec,isEdit);
	    win.show();
     },
     DeleteEdtCompanyQuot : function(){
        var me = this;
        var rec = me.grdmain.getSelectionModel().getSelection();
	       if(rec.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		for(x in rec){
			if(rec[x].get('sdbj') == "1"){
			     Ext.Msg.alert("提示",""+ rec[x].get('bjdh') +"号报价单已锁定，不允许删除！");
			     return
			}
			if(Ext.String.trim(rec[x].get('czym'))!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		        Ext.Msg.alert('提示','非本单据操作员不能删除!');
		        return;
		    }
		}
		Ext.Msg.confirm("提示","确认删除记录?",function(btn){
		    if (btn=="yes")
		    for(x in rec){
		    var sql = "delete from csbjmxb where bjdh="+rec[x].get('bjdh')+";"
            var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		    
		    var sql = "delete from csbjfjb where bjdh="+rec[x].get('bjdh')+";"
            var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		    }
		    me.grdStore.remove(rec);
				me.grdStore.sync({
					success: function(batch,options) {
						 me.grdStore.reload();
					}
				});	
		})
     },
     doEdtCompanyQuot :function(btn){
        var me=this;
        var edt_CompanyQuot = me.getEdtCompanyQuot();
        var form = edt_CompanyQuot.down('#bjForm');
        var grid_detail = edt_CompanyQuot.down('#grdQuotDetail');
        var deStore = edt_CompanyQuot.deStore;
        var fileStore = edt_CompanyQuot.fileStore;
        switch(btn.itemId){
           case 'BTN_SAVE' :
              var rec = form.getRecord();
              form.updateRecord(rec);
              rec.set('czym',erp.UInfo.currentUser.name);
	  	      rec.set('czsj',new Date());
              if(form.getForm().isValid()&&form.getForm().isDirty()){
                if(Ext.isEmpty(rec.get('csmc'))||Ext.String.trim(rec.get('csmc'))==''){
                        Ext.Msg.alert('提示',"厂商名称不能为空");
						return;
                }    
              	if(rec.get('bzsm')!=null&&erp.Util.gettextlength(rec.get('bzsm'))>100){
                        Ext.Msg.alert('提示',"最大长度100字符");
						return;
                }
               Ext.Msg.confirm('提示','是否确认保存！',function(btn){
                    if(btn=='yes'){ 
               if(me.grdStore.indexOf(rec) >= 0&&rec.get('bjdh')>0){
                   me.grdStore.sync({
								success : function(e, batch) {
								}
					});
					fileStore.each(function(record){
					     record.set('bjdh',rec.get('bjdh')); 
					});
					fileStore.sync();
					deStore.each(function(record){
					     record.set('bjdh',rec.get('bjdh')); 
					});
					deStore.sync({
					     success : function(){
					     	var ifallsd = erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=ifAllsd',{
		                   bjdh : rec.get('bjdh')
		            })
		            if(ifallsd == 0){
		            erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=updateMainSdbj',{
		                   bjdh : rec.get('bjdh'),sdbj : 1
		            });
		            me.grdStore.reload();
		            }else{
		            erp.Const.callServiceMethodSync('companyquot/companyquot.act?method=updateMainSdbj',{
		                   bjdh : rec.get('bjdh'),sdbj : 0
		            });
		            me.grdStore.reload();
		            }	    
					     }
					});
					Ext.Msg.alert('提示','保存成功');
					edt_CompanyQuot.isEdit = false;
					edt_CompanyQuot.close();
                }else{
                   rec.phantom =true;//表示新增
                   me.grdStore.add(rec);
                   me.grdStore.sync({
                         success : function(e,batch){
				         fileStore.sync();
				         deStore.sync({
					           success : function(){
					           	Ext.Msg.alert('提示','保存成功!');
					           	edt_CompanyQuot.isEdit = false;
                                edt_CompanyQuot.close();
                                me.grdStore.reload();
					           }
					       });
                         }
                   });
                }
               }})
              }
              break;
          case 'btn_quotdetail_add'  :
             var maxxh = deStore.max('bjxh');
             maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
             var rec = form.getRecord();
              form.updateRecord(rec);
              var bjdh = rec.get('bjdh');
              var csbh = rec.get('csbh');
              var wbbh;
              var sql = "select wbbh  from csxxb where csbh="+csbh+";"
              var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
			  var data = Ext.decode(result);
			  if (!data.bool) {
					 Ext.toastErrorInfo(data.msg);
					 return;
				}
			 if(data.val!=null){
				wbbh = data.val;}	
			 if(wbbh==null||Ext.String.trim(wbbh)==''){
                 wbbh = 60;
              }		
             var newrec = Ext.create('erp.companyQuot.model.QuotDetail',{
               bjdh:bjdh,bjxh : maxxh,wbbh : wbbh
             });
             deStore.add(newrec);
             break;
         case 'btn_quotdetail_del' : 
            var recs = grid_detail.getSelectionModel().getSelection();
            if(Ext.isEmpty(recs)){
               Ext.Msg.alert('提示','请先选中至少一条明细');
			  return;
            }
            for(x in recs){
			if(recs[x].get('sdbj') == "1"){
			     Ext.Msg.alert("提示",""+ recs[x].get('bjdh') +"号报价单已锁定，不允许删除！");
			     return
			   }
		    }
            deStore.remove(recs);
            break;
          case 'btn_QuotFile_upload' :
             var rec = form.getRecord();
              form.updateRecord(rec);
             var bjdh = rec.get('bjdh');
             var newrec = Ext.create('erp.companyQuot.model.CompanyQuotFile');
             var win=Ext.widget('QuotFileUpload',{				
					itemId: 'QuotFileUpload',
					bjdh : bjdh,
					newrec : newrec,
					closable: true,
					fileStore  : fileStore
					});
					win.show();
		   break;
		  case 'btn_QuotFile_download':
		  
		   break;
        }
     }
})