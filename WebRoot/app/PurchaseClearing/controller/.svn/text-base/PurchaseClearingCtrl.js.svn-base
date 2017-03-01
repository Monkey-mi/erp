Ext.define('erp.PurchaseClearing.controller.PurchaseClearingCtrl',{
      extend : 'Ext.app.Controller',
      requires : ['erp.PurchaseClearing.store.Notice',
      'erp.view.master.perchasepriceadjust.store.AccountDeptTree',
      'erp.ux.PagingBar',
      'erp.PurchaseClearing.store.Storage',
      'erp.PurchaseClearing.store.CostBills',
      'erp.PurchaseClearing.store.Cost',
      'erp.PurchaseClearing.model.QueryParam',
      'erp.PurchaseClearing.model.RkQueryParam',
      'erp.PurchaseClearing.store.JsFydbImp',
      'erp.PurchaseClearing.store.JsRkdbImp',
      'erp.PurchaseClearing.store.Audit',
      'erp.ux.ComboxTree'
      ],
      views : ['erp.PurchaseClearing.view.PurchaseClearingManger',
              'erp.PurchaseClearing.view.EdtPurchaseClearing',
              'erp.PurchaseClearing.view.ChoseArc',
              'erp.PurchaseClearing.view.PurchaseClearingQuery',
              'erp.PurchaseClearing.view.MissCost',
              'erp.PurchaseClearing.view.UnDetialQuery',
              'erp.PurchaseClearing.view.PurchaseClearingImp',
              'erp.PurchaseClearing.view.FzhmChoose',
              'erp.PurchaseClearing.view.AuditWin',
              'erp.PurchaseClearing.view.DwChoose',
              'erp.PurchaseClearing.view.DrQuery',
              'erp.PurchaseClearing.view.GjClearing','erp.PurchaseClearing.view.ArriveQueryWin',
              'erp.PurchaseClearing.view.RkdSplit','erp.PurchaseClearing.view.FydMerge',
              'erp.PurchaseClearing.view.RkdMerge','erp.PurchaseClearing.view.FydSplit'],
      refs : [{ref : 'PurchaseClearing',selector : 'mng_PurchaseClearing'},
              {ref : 'GrdNotice',selector : 'mng_PurchaseClearing #grd_Notice'},
              {ref : 'EdtPurchaseClearing',selector : 'edt_PurchaseClearing'},
              {ref : 'GrdRkd',selector : 'edt_PurchaseClearing #grdRkd'},
              {ref : 'GrdFyd',selector : 'edt_PurchaseClearing #grdFyd'},
              {ref : 'ImpPurchaseClearing',selector : 'Imp_PurchaseClearing'},
              {ref : 'GrdRkdImp',selector : 'Imp_PurchaseClearing #grd_rkd'},
              {ref : 'GrdFydImp',selector : 'Imp_PurchaseClearing #grd_fyd'},
              {ref : 'MainTab',selector : 'Imp_PurchaseClearing #maintab'},
              {ref : 'FzhmChoose',selector : 'Choose_Fzhm'},
              {ref : 'DwChoose',selector : 'Choose_Dw'},
              {ref : 'RkdSplit',selector : 'win_RkdSplit'},
              {ref : 'FydSplit',selector : 'win_FydSplit'},
              {ref : 'RkdMerge',selector : 'win_RkdMerge'},              
              {ref : 'FydMerge',selector : 'win_FydMerge'}
              ],
      init : function(){
          var me = this;
          if (me.isInited)
			return;
			me.control({
			    'mng_PurchaseClearing' : {
			    	   beforerender:function(cmp){
			               var bar2 = cmp.down('#function_btn');
			               erp.Util.setMenuFunc(bar2.down('#BTN_PRINT'),cmp.modId,cmp);
			           }, 
			           afterrender : function(){
			               me.panel = me.getPurchaseClearing();
			               me.grdmain = me.getGrdNotice();
			               me.grdStore = me.panel.store;
			               me.cbStore = me.panel.cbStore;
			               me.grdStore.load();
			                /* me.Imp_GrdRkd = me.getGrdRkdImp();*/
			               me.query_rec =  Ext.create('erp.PurchaseClearing.model.QueryParam');
			               me.rkquery_rec = Ext.create('erp.PurchaseClearing.model.RkQueryParam');
			           }
			    },
			     'Imp_PurchaseClearing' : {
			         afterrender : function(){
			            var me= this;
			            me.impwin = me.getImpPurchaseClearing();
			            var maintab = me.getMainTab();
			            var activeTab = maintab.getActiveTab();
			            me.maintab = 0;
			            if(activeTab.itemId =='panel_rkd'){
			               me.maintab = 0;
			            }else if(activeTab.itemId=='panel_fyd'){
			              me.maintab = 1;
			            }
			     }
			     },
			     //切换Tab
			     'Imp_PurchaseClearing #maintab tab' : {
			         click : function(button,e,eOpts){
			            if(button.title=='入库单'){
			                me.maintab = 0;
			            }else if(button.title=='费用单'){
			                me.maintab = 1;
			            }
			         }
			     },
			     'Imp_PurchaseClearing #PurchaseClearingImpBar button' : {
			           click : me.doImpAction
			     },
			     'mng_PurchaseClearing button' : {
			          click : me.doAction
			     },
			     'edt_PurchaseClearing button' : {
			          click : me.doEdtPurchaseClearing
			     },
			     /*'Imp_PurchaseClearing button' : {
			          click : me.doImpAction
			     },*/
			     'Choose_Fzhm button' : {
			          click : me.doFz
			     },
			     'Choose_Dw button' : {
			          click : me.doDw
			     },
			     'win_RkdSplit button': {
			          click : me.addCf
			     }, 
			     'win_FydSplit button': {
			          click : me.FyCf
			     }, 
			     'win_FydMerge button': {
			          click : me.doFydhb
			     },
			     'win_RkdMerge button': {
			          click : me.doRkdhb
			     }, 
			     'mng_PurchaseClearing #grd_Notice' : {
			      selectionchange : function(grid, rec) {
			           if (rec.length > 0) {
			           	  Ext.apply(me.cbStore.proxy.extraParams, 
			                {
				            tzdh:rec[0].get('tzdh')
			                }
		                    );
			              me.cbStore.load();
			           }
			       },
			       itemdblclick : function(grid, rec) {
			           me.EdtNotice('btn_edt');
			       }
			     }
			});
		me.isInited=true;
      },
      doAction : function(btn){
          var me = this;
          if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}
		switch(btn.itemId){
			case  'btn_add'  :
			   this.EdtNotice(btn.itemId);
			   break;
			case  'btn_edt'  :
			   this.EdtNotice(btn.itemId);
			   break;
			case  'btn_del' :
			  var store =  me.grdStore;
			  var recs  = me.grdmain.getSelectionModel().getSelection()[0];
			  if(Ext.isEmpty(recs)){
		       Ext.Msg.alert('提示','请选择至少一条通知单');
				break;
		     }
		      var czym=recs.get('czym');
		      if(Ext.String.trim(czym)!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		         Ext.Msg.alert('',"非本通知单操作员不能删除!")
			     break;
		      }
			  var yfbj = recs.get('yfbj');
			  if(yfbj==1){
			   Ext.Msg.alert('提示',"已锁定的通知单不能删除!")
			   break;
			  }
			  var tzdh = recs.get('tzdh');
			  var hxkp = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=ifHxkp',{tzdh:tzdh})
			  if(hxkp==1){
			    Ext.Msg.alert('提示',"已核销开票通知不能删除!")
			  }
			   Ext.Msg.confirm('提示',"是否确认删除"+'【'+tzdh+'】'+"号通知单?",function(btn){
			      if(btn=='yes'){
			         store.remove(recs);
			         store.sync({
					   success: function() {
						  store.reload();
					}});
			      }
			   })
			   break;
			case  'btn_lock' : 
			 var store =  me.grdStore;
			 var recs  = me.grdmain.getSelectionModel().getSelection()[0];
		     if(Ext.isEmpty(recs)){
		       Ext.Msg.alert('提示','请选择至少一条通知单');
				break;}
			 var tzdh  =  recs.get('tzdh');
		     var czym = erp.Util.currentUser.userInfo.name;
      	     var czsj = new Date();
		     if(recs.get('yfbj')==0){
		     Ext.Msg.confirm('提示',"是否确认锁定"+'【'+tzdh+'】'+"号通知单？",function(btn){
		          if(btn=='yes'){       
      	               erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=doLock',{
      	                   tzdh : tzdh,
      	                   yfbj : 1,
      	                   czym  : czym,
      	                   czsj : czsj
      	               })
      	               store.reload();
      	          }
		     })
		   }
		   else if(recs.get('yfbj')==1){
		   	 if(recs.get('dsbj')==1){
      	        Ext.Msg.alert('提示',''+tzdh+'号通知单已递送不能解锁定!');
      	        return;
      	     }
      	     if(recs.get('hxbj')==1){
      	        Ext.Msg.alert('提示','已核销的通知单不能解锁定!');
      	        return;
      	     }
      	     var rczym = recs.get('czym')
		      if(Ext.String.trim(rczym)!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		         Ext.Msg.alert('',"非操作员本人及管理员,不能解除锁定!")
			     break;
		      }
		     Ext.Msg.confirm('提示','是否确认取消锁定'+tzdh+'号通知单？',function(btn){
		           if(btn=='yes'){
		               erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=doLock',{
      	                   tzdh : tzdh,
      	                   yfbj : 0,
      	                   czym  : czym,
      	                   czsj : czsj
      	               })
      	               store.reload();
		           }
		     })  
		     break;
		   }
		   break;
		     case  'btn_send' : 
		     var store = me.grdStore;
		     var recs=me.grdmain.getSelectionModel().getSelection()[0];
		     if(Ext.isEmpty(recs)){
		       Ext.Msg.alert('提示','请选择至少一条通知单');
				break;}
		     var tzdh  =  recs.get('tzdh');
		     if(recs.get('dsbj')==0){
		         if(recs.get('yfbj')==0){
		             Ext.Msg.alert('提示',''+recs.get('tzdh')+'号通知单还未锁定不允许递送!')
		             return;
		         }
		         Ext.Msg.confirm('提示','是否确认递送'+tzdh+'号通知单?',function(btn){
		         if(btn == 'yes'){	
		          erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=doSend',{
		                   dsbj : 1,
		                   tzdh : tzdh
		            })
		            store.reload();
		          }
		       })
		     }else{
		       Ext.Msg.confirm('提示','是否确认取消递送'+tzdh+'号通知单?',function(btn){
		        if(btn=='yes'){  
		       	erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=doSend',{
		                   dsbj : 0,
		                   tzdh : tzdh
		            })
		            store.reload();
		         }   
		       })
		     }
		    break;
		    case 'btn_arc' : 
		    var store = me.grdStore;
		    var recs=me.grdmain.getSelectionModel().getSelection()[0];
		     if(Ext.isEmpty(recs)){
		       Ext.Msg.alert('提示','请选择至少一条通知单');
				break;
		    }
		    var tzdh  =  recs.get('tzdh');
		    var hsbm  =  recs.get('hsbm');
		    if(recs.get('gdbj')==0){
		       var win = Ext.widget('chose_arc',{
		                  itemId : 'chose_arc',
		                  tzdh : tzdh,
		                  hsbm : hsbm,
		                  store : store
		       })
		       win.show();
		       break;
		    }else{
		     Ext.Msg.confirm('提示','是否取消归档'+tzdh+'号通知单?',function(btn){
		          if(btn =='yes'){
		            erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=doArc',{
		                   gdbj : 0,
		                   tzdh : tzdh
		            })
		            store.reload();    
		          }
		     })
		    }
		   break; 
		   case 'btn_his' :
		   var store = me.grdStore;
		   var btnBackup = me.panel.down('#btn_arc');
		   if(btn.getText()=='历史通知单'){
		       btn.setText('当前通知单');
		       btnBackup.setText('恢复');
		       btnBackup.setIconCls('book_previous');
		       me.panel.down('#btn_add').setDisabled(true);
		       me.panel.down('#btn_del').setDisabled(true);
		       Ext.apply(store.proxy.extraParams,{gdbj:1}); 
		   }else{
                 btn.setText('历史通知单');
                 btnBackup.setText('归档');
                 btnBackup.setIconCls('book_next');
                 me.panel.down('#btn_add').setDisabled(false);
		         me.panel.down('#btn_del').setDisabled(false);
                 Ext.apply(store.proxy.extraParams,{gdbj:0}); 
            }
            store.load();
            break;
            case 'btn_not' : 
            var store = me.grdStore;
            var recs=me.grdmain.getSelectionModel().getSelection()[0];
            if(Ext.isEmpty(recs)){
		       Ext.Msg.alert('提示','请选择至少一条通知单');
				break;
		    }
            var csbh = recs.get('csbh');
            var jzrq = recs.get('jzrq');
            var panel = erp.Util.addContentTab({
            	      xtype : 'list_MissCost',
                      itemId : 'list_MissCost',
                      csbh : csbh,
                      jzrq : jzrq
            });
            break;
            case 'btn_query' : 
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
            var win = Ext.widget('query_PurchaseClearing',{
                     itemId : 'query_PurchaseClearing',
                     mainstore: me.grdStore,
                     mainview:me.panel,
                     rec:me.query_rec
            });
            win.show();
            break;
		}
      },
      //导入界面编辑
      doImpAction : function(btn){
         var me = this;
         var ImpPC = me.getImpPurchaseClearing();
         var csbh = ImpPC.csbh;
         var hsbm = ImpPC.hsbm;
    	/* var myMask = new Ext.LoadMask({
			target : mainPanel
		 });*/
         var grdrkd = me.getGrdRkdImp();
         var grdfyd = me.getGrdFydImp();
         var fyStore = grdfyd.getStore();
         var fyrec  =  grdfyd.getSelectionModel().getSelection();
         var tab = me.getMainTab();
         var activeTab = tab.getActiveTab();
         me.maintab = 0;
         if(activeTab.itemId =='panel_rkd'){
	     me.maintab = 0;
	     }else if(activeTab.itemId=='panel_fyd'){
		 me.maintab = 1;}
        
		 switch(btn.itemId){
         	case 'btn_dr_query' :
         	var search = ImpPC.search;
         	var win = Ext.create('erp.PurchaseClearing.view.DrQuery',{
         	   mainGrid:grdrkd,
         	   mainPanel:ImpPC,
         	   search : search
         	});
         	win.show();
         	break;
            case 'btn_fzdz' :
            var rkrec = grdrkd.getSelectRow();
            if(rkrec.length>0){
            for(x in rkrec){
               if(rkrec[x].get('hxbj')==1){
                  Ext.Msg.alert('提示',"所选记录中有已核销的记录！");
                  return;
               }
            }}
            else{
               Ext.Msg.alert('提示','请选中某行或多行再使用此功能！');
               return
            }
            Ext.Msg.confirm('提示','是否确认对账入库单?',function(btn){
                if(btn=='yes'){
                  var win =  Ext.widget('Choose_Fzhm',{
                             itemId : 'Choose_Fzhm'
                  })
                  win.show();
                }
            })
            break;
            case 'btn_djhc' : 
            if(me.maintab == 0){
            var rkrec  =  grdrkd.getSelectRow();
              if(rkrec.length==0){
                  Ext.Msg.alert('提示','请选中某行或多行再使用此功能！');
                  return
              }
              var hcStore = Ext.create('erp.PurchaseClearing.store.Audit');
              var nrecs =new Array();
              for(x in rkrec){
                   var wbbh = rkrec[x].get('wbbh');var rkdj;var cgkj;var cgdj;
                   if(wbbh!="  "){
                   rkdj =  rkrec[x].get('wbdj');
                   var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getCpdj',{
                   htbh : rkrec[x].get('htbh'), htxh : rkrec[x].get('htxh')
                   })
                   var data = Ext.decode(result);
                   var cgkj = data.cgkj; var cgdj = data.cgdj; 
                  }else{ 
                   rkdj = rkrec[x].get('rkdj');
                   var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getCpdjTwo',{
                   htbh : rkrec[x].get('htbh'), htxh : rkrec[x].get('htxh')
                  })
                   var data = Ext.decode(result);
                   var cgkj = data.cgkj; var cgdj = data.cgdj; 
                   }
                   var kzdj = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getKzdj',{
                   csbh : rkrec[x].get('csbh'),clhh : rkrec[x].get('clhh'),pjrq:rkrec[x].get('pjrq')
                   })
                  if(kzdj==0){
                  var kzdj= erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getKzdjTwo',{
                     clhh : rkrec[x].get('clhh'),pjrq:rkrec[x].get('pjrq')
                   })
                  }
                  var r= Ext.create('erp.PurchaseClearing.model.Audit',{
				           ckbh : rkrec[x].get('ckbh'),
				           jldw : rkrec[x].get('jldw'),
                           ckmc : rkrec[x].get('ckmc'),
                           rkdh : rkrec[x].get('rkdh'),
                           rkxh : rkrec[x].get('rkxh'),
                           rkrq : rkrec[x].get('rkrq'),
                           csbh : rkrec[x].get('csbh'),
                           csmc : rkrec[x].get('csmc'),
                           wbbh : wbbh,
                           clhh : rkrec[x].get('clhh'),
                           clmc : rkrec[x].get('clmc'),
                           pjrq : rkrec[x].get('pjrq'),
                           htbh : rkrec[x].get('htbh'),
                           htxh : rkrec[x].get('htxh'),
                           rkdj : rkdj,
                           kzdj : kzdj,
                           cgkj : cgkj,
                           hth :  rkrec[x].get('hth'),
                           cgdj : cgdj })	
                           nrecs.push(r)
                 }
                hcStore.add(nrecs);
            	var win = Ext.widget('win_Audit',{
                       itemId : 'win_Audit',
                       hcStore : hcStore
              });
              win.show(); 
              }else{}
			break;
			/*case 'btn_dr_query' : 
			 var win = Ext.widget('query_Dr',{
			           itemId : 'query_Dr',
			           mainGrid: grdrkd,
			           mainview : me.panel,
			           csbh : csbh,
			           hsbm : hsbm,
			           rec :  me.rkquery_rec 
			 });
			 win.show()
			break;*/
			//合并
			case 'btn_Merge' : 
			switch (activeTab.title) {
			    case '入库单' : 
			      var recs = grdrkd.getSelectRow();
			      if(recs.length!=2){
			        Ext.toastInfo('入库单的合并必须是两条记录合并！');
			        return;
			      }
			      var recs1 =  recs[0];
			      var recs2 =  recs[1];
			      var ckbh1 =  recs1.get('ckbh');
			      var rkdh1 = recs1.get('rkdh');
			      var rkxh1 = recs1.get('rkxh');
			      var rkrq1 = recs1.get('rkrq');
			      var csbh1 = recs1.get('csbh');
			      var clhh1 = recs1.get('clhh');
			      var cltx11 = recs1.get('cltx1');
			      var cltx21 = recs1.get('cltx2');
			      var cltx31 = recs1.get('cltx3');
			      var rksl1 = recs1.get('rksl');
			      var rkdj1 = recs1.get('rkdj');
			      var rkje1 = recs1.get('rkje');
			      var csdj1 = recs1.get('csdj');
			      var wbdj1 = recs1.get('wbdj');
			      var zzsl1 = recs1.get('zzsl');
			      var hwbh1 = recs1.get('hwbh');
			      var pcbh1 = recs1.get('pcbh');
			      var ghpc1 = recs1.get('ghpc');
			      var wbbh1 = recs1.get('wbbh');
			      var wbhl1 = recs1.get('wbhl');
			      var rklb1 = recs1.get('rklb');
			      var jhbh1 = recs1.get('jhbh');
			      var jhxh1 = recs1.get('jhxh');
			      var htbh1 = recs1.get('htbh');
			      var htxh1 = recs1.get('htxh');
			      var dhdh1 = recs1.get('dhdh');
			      var dhxh1 = recs1.get('dhxh');
			      var sdbj1 = recs1.get('sdbj');
			      var zzrq1 = recs1.get('zzrq');
			      var hcbj1 = recs1.get('hcbj');
			      var hcdh1 = recs1.get('hcdh');
			      var hcxh1 = recs1.get('hcxh');
			      var wxbj1 = recs1.get('wxbj');
			      var wxdh1 = recs1.get('wxdh');
			      var wxxh1 = recs1.get('wxxh');
			      var hxbj1 = recs1.get('hxbj');
			      var cfxh1 = recs1.get('cfxh');
			      var fzsl1 = recs1.get('fzsl');
			      var tzdh1 = recs1.get('tzdh');
			      var zzsl1 = recs1.get('zzsl');
			      
			      var ckbh2 =  recs2.get('ckbh');
			      var rkdh2 = recs2.get('rkdh');
			      var rkxh2 = recs2.get('rkxh');
			      var rkrq2 = recs2.get('rkrq');
			      var csbh2 = recs2.get('csbh');
			      var clhh2 = recs2.get('clhh');
			      var cltx12 = recs2.get('cltx1');
			      var cltx22 = recs2.get('cltx2');
			      var cltx32 = recs2.get('cltx3');
			      var rksl2 = recs2.get('rksl');
			      var rkdj2 = recs2.get('rkdj');
			      var rkje2 = recs2.get('rkje');
			      var csdj2 = recs2.get('csdj');
			      var wbdj2 = recs2.get('wbdj');
			      var zzsl2 = recs2.get('zzsl');
			      var hwbh2 = recs2.get('hwbh');
			      var pcbh2 = recs2.get('pcbh');
			      var ghpc2 = recs2.get('ghpc');
			      var wbbh2 = recs2.get('wbbh');
			      var wbhl2 = recs2.get('wbhl');
			      var rklb2 = recs2.get('rklb');
			      var jhbh2 = recs2.get('jhbh');
			      var jhxh2 = recs2.get('jhxh');
			      var htbh2 = recs2.get('htbh');
			      var htxh2 = recs2.get('htxh');
			      var dhdh2 = recs2.get('dhdh');
			      var dhxh2 = recs2.get('dhxh');
			      var sdbj2 = recs2.get('sdbj');
			      var zzrq2 = recs2.get('zzrq');
			      var hcbj2 = recs2.get('hcbj');
			      var hcdh2 = recs2.get('hcdh');
			      var hcxh2 = recs2.get('hcxh');
			      var wxbj2 = recs2.get('wxbj');
			      var wxdh2 = recs2.get('wxdh');
			      var wxxh2 = recs2.get('wxxh');
			      var hxbj2 = recs2.get('hxbj');
			      var cfxh2 = recs2.get('cfxh');
			      var fzsl2 = recs2.get('fzsl');
			      var tzdh2 = recs2.get('tzdh');
			      var zzsl2 = recs2.get('zzsl');			      
			      if(hxbj1==1||hxbj2==1){
			         Ext.toastErrorInfo('待合并的入库单必须都未核销过!')
			         return;
			      }
			      if(ckbh1!=ckbh2){
			         Ext.toastErrorInfo('待合并的入库单必须属于同一仓库！')
			         return;
			      }
			      if(rkdh1!=rkdh2){
			         Ext.toastErrorInfo('待合并的入库单的入库单号必须相同！')
			         return;
			      }
			      if(Date(rkrq1)!=Date(rkrq2)){
			         Ext.toastErrorInfo('待合并的入库单的入库日期必须相同！')
			         return;
			      }
			      if(csbh1!=csbh2){
			         Ext.toastErrorInfo('待合并的入库单的入库日期必须相同！')
			         return;
			      }
			      if(clhh1!=clhh2||cltx11!=cltx12||cltx21!=cltx22||cltx31!=cltx32){
			         Ext.toastErrorInfo('待合并的入库单的材料名称与特性必须相同！')
			         return;
			      }
			      if(rkdj1!=rkdj2||csdj1!=csdj2||wbdj1!=wbdj2){
			         Ext.toastErrorInfo('待合并的入库单的含税单价、除税单价、外币单价必须相同！')
			         return;
			      }
			     if(hwbh1!=hwbh2||pcbh1!=pcbh2||ghpc1!=ghpc2||wbbh1!=wbbh2||wbhl1!=wbhl2
			      ||rklb1!=rklb2||jhbh1!=jhbh2||jhxh1!=jhxh2||htbh1!=htbh2||htxh1!=htxh2
			      ||dhdh1!=dhdh2||dhxh1!=dhxh2||sdbj1!=sdbj2||zzrq1!=zzrq2||hcbj1!=hcbj2
			      ||hcdh1!=hcdh2||hcxh1!=hcxh2||wxbj1!=wxbj2||wxdh1!=wxdh2||wxxh1!=wxxh2
			      ||tzdh1!=tzdh2||zzsl1!=zzsl2){
			      	Ext.toastErrorInfo('待合并的入库单的相关跟踪信息及辅助信息必须相同！')
			      	return;
			      }
			      //合并数量
			      var cfxx_ckbh = ckbh1; var cfxx_rkdh = rkdh1; var cfxx_csbh = csbh1;
			      var cfxx_clhh = clhh1; var rkxh_yd = rkxh1; var rksl_yd = parseFloat(rksl1);
			      var rkdj_yd = parseFloat(rkdj1); var rkje_yd = parseFloat(rkje1); var rkxh_sy = rkxh2;
			      var rksl_sy = parseFloat(rksl2); var rkdj_sy = parseFloat(rkdj2); var rkje = parseFloat(rkje2);
			      if(rkxh1<rkxh2){
			        row1 = recs1;row2 = recs2;rkxh_yd = rkxh1;
			      }else{
			        row1 = recs2;row2 = recs1;rkxh_yd = rkxh2;
			      }
			      var rksl_cf = rksl1=rksl2; var rkdj_cf = rkdj1;
			      var rkje_cf = Ext.util.Format.round((parseFloat(rksl1) + parseFloat(rksl2))*parseFloat(rkdj1),2);
			      var cfxx_cfbj = 0;
			      var win =  Ext.widget('win_RkdMerge',{
			       row1 : row1,
			       row2 : row2,
			       rec :  recs1,
			       recs2 : recs2,
			       cfxx_ckbh : cfxx_ckbh,
			       cfxx_rkdh : cfxx_rkdh,
			       rkxh_yd : rkxh_yd,
			       rksl_yd : rksl_yd,
			       rkdj_yd : rkdj_yd,
			       rkje_yd : rkje_yd
			       });
			       win.show();
			       break; 
			   case '费用单' : 
			    var frec = grdfyd.getSelectionModel().getSelection();
			      if(frec.length!=2){
			        Ext.toastInfo('费用单的合并必须是两条记录合并！');
			        return;
			      }
			    var frec1 =  grdfyd.getSelectionModel().getSelection()[0];
			    var frec2 =  grdfyd.getSelectionModel().getSelection()[1];
			    var fydh1 = frec1.get('fydh'); var fydh2 = frec2.get('fydh');
			    var fyxh1 = frec1.get('fyxh'); var fyxh2 = frec2.get('fyxh');
			    var fyrq1 = frec1.get('fyrq'); var fyrq2 = frec2.get('fyrq');
			    var csbh1 = frec1.get('csbh'); var csbh2 = frec2.get('csbh');
			    var fyzy1 = frec1.get('fyzy'); var fyzy2 = frec2.get('fyzy');
			    var fysl1 = frec1.get('fysl'); var fysl2 = frec2.get('fysl');
			    var fydj1 = frec1.get('fydj'); var fydj2 = frec2.get('fydj');
			    var fyje1 = frec1.get('fyje'); var fyje2 = frec2.get('fyje');
			    var zzsl1 = frec1.get('zzsl'); var zzsl2 = frec2.get('zzsl');
			    var csdj1 = frec1.get('csdj'); var csdj2 = frec2.get('csdj');
			    var jhbh1 = frec1.get('jhbh'); var jhbh2 = frec2.get('jhbh');
			    var jhxh1 = frec1.get('jhxh'); var jhxh2 = frec2.get('jhxh');
			    var sdbj1 = frec1.get('sdbj'); var sdbj2 = frec2.get('sdbj');
			    var hxbj1 = frec1.get('hxbj'); var hxbj2 = frec2.get('hxbj');
			    var cfxh1 = frec1.get('cfxh'); var cfhx2 = frec2.get('cfxh');
			    if(hxbj1==1||hxbj2==1){
			         Ext.toastErrorInfo('待合并的费用单必须都未核销过!')
			         return;
			      }
			    if(fydh1!=fydh2){
			         Ext.toastErrorInfo('待合并的费用单的费用单号必须相同！')
			         return;
			    }
			    if(Date(fyrq1)!=Date(fyrq2)){
			         Ext.toastErrorInfo('待合并的费用单的入库单号必须相同！')
			         return;
			    }
			    if(csbh1!=csbh2){
			         Ext.toastErrorInfo('待合并的费用单的供应厂商必须相同！')
			         return;
			    }
			    if(fyzy1!=fyzy2){
			         Ext.toastErrorInfo('待合并的费用单的费用摘要必须相同！')
			         return;
			    }
			    if(fydj1!=fydj2||csdj1!=csdj2){
			         Ext.toastErrorInfo('待合并的费用单的含税单价、除税单价必须相同！')
			         return;
			    }
			    if(zzsl1!=zzsl2 ||jhbh1!=jhbh2 ||jhxh1!=jhxh2 ||sdbj1!=sdbj2
			    ||tzdh1!=tzdh2){
			         Ext.toastErrorInfo('待合并的费用单的相关跟踪信息及辅助信息必须相同！')
			         return;
			    }
			    var cfxx_rkdh = fydh1; var cfxx_csbh = csbh1; var cfxx_clhh = fyzy1;
			    var cfxx_rkxh_yd = fyxh1; var cfxx_rksl_yd = fysl1;
			    var cfxx_rkdj_yd = fydj1; var cfxx_rkje_yd = fyje1;
			    var cfxx_rkxh_sy = fyxh2; var cfxx_rksl_sy = fysl2;
			    var cfxx_rkdj_sy = fydj2; var cfxx_rkje_yd = fyje2;
			    if(fyxh1<fyxh2){
			      var row1 = frec1;
			      var row2 = frec2;
			      var rkxh_cf = fyxh1 
			    }else{
			      var row1 = frec2;
			      var row2 = frec1;
			      var rkxh_cf = fyxh2 
			    }
			    var rksl_cf = fysl1+fysl2; var rkdj_cf = fydj1;
			    if(cfxx_rksl_yd!=0){
			       var rkje_cf = Ext.util.Format.round((fysl1+fysl2)*fydj1,2);
			    }else{
			       var rkje_cf = Ext.util.Format.round(fyje1+fyje2,2);
			    }
			     var win =  Ext.widget('win_FydMerge',{
			       rec :  frec1,
			       row1 : row1, row2 : row2,
			       recs2 :  frec2,csdj1 : csdj1,zzsl1 : zzsl1,
			       cfxx_ckbh : cfxx_ckbh,
			       cfxx_rkdh : cfxx_rkdh,
			       rkxh_yd : cfxx_rkxh_yd,
			       rksl_yd : cfxx_rksl_yd,
			       rkdj_yd : cfxx_rkdj_yd,
			       rkje_yd : cfxx_rkje_yd,
			       rkxh_cf : rkxh_cf
			       });
			       win.show();
			}
			break;
			//拆分
			case 'btn_split' :
				switch (activeTab.title) {
			    case '入库单' : 
			var krecs  =  grdrkd.getSelectRow();
			var krec = krecs[0];
			if(Ext.isEmpty(krec)){
			   Ext.Msg.alert('提示','请选择一条记录！');
			   return}
			var clhh = krec.get('clhh');
	
			var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getFzzbj',{
			   clhh : clhh
			});
			var fzzbj = result.fzzbj;
			var fzdw = result.fzdw;
			var jldw = result.jldw;
			var rkje_xghx = krec.get('rkje_hx');
			var csje_xghx = krec.get('csje_hx');
			var wbje_xghx = krec.get('wbje_hx');
			var xzdw = '';
			if(fzzbj==0){
			    var hxbj = krec.get('hxbj');
			    var sdbj = krec.get('sdbj');
			    var cfxx_ckbh = krec.get('ckbh');
			    var cfxx_rkdh = krec.get('rkdh');
			    var cfxx_csbh = krec.get('csbh');
			    var cfxx_clhh = krec.get('clhh');
			    var cfxx_rkxh_yd = krec.get('rkxh');
			    var cfxx_rkxh_sy = krec.get('rkxh');
			    var cfxx_rksl_yd = krec.get('rksl');
			    var cfxx_rkdj_yd = krec.get('rkdj_hx');
			    var cfxx_rkje_yd = krec.get('rkje_hx');
			    var cfxx_cfbj = 1;
			    me.doCf(xzdw,krec,hxbj,sdbj,cfxx_ckbh,cfxx_rkdh,cfxx_rkxh_yd,
			    cfxx_rksl_yd,cfxx_rkdj_yd,cfxx_rkje_yd);
			}else{
			var win = Ext.widget('Choose_Dw',{jldw : jldw,fzdw : fzdw,/*store: rkStore,*/
			     rec : krec});
			  win.show()
			 }
			 break;
			    case  '费用单' : 
			 var frec = grdfyd.getSelectionModel().getSelection()[0];
			 if(Ext.isEmpty(frec)){
			   Ext.Msg.alert('提示','请选择一条记录！');
			   return}
			   if(frec.get('hxbj')==1){
			       Ext.toastErrorInfo('记录拆分必须是没有核销的记录！')
			       return; 
			   }
			   var fyxh_cf = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getMaxfyxh',{
			      fydh : frec.get('fydh')
			   })
			   var win = Ext.widget('win_FydSplit',{
			       rec : frec,
			       fyxh_cf : fyxh_cf
			   });
			   win.show();
			 break;
			 }}
      },
      //单位选择
        doDw : function(btn){
      	 var me = this;
         var win = me.getDwChoose();  
         if(btn.action == "BTN_SAVE"){
           var values = win.getData();
           var krec = win.getRec();
           xzdw = values.jldw;
           var jldw = win.jldw;
           var fzdw = win.fzdw;
           if(xzdw=jldw ){
			      var cfxx_rksl_yd = krec.get('rksl');
			      var cfxx_rkdj_yd = krec.get('rkdj_hx');
			    }else if(xzdw = fzdw){
			      var cfxx_rksl_yd = krec.get('fzsl');
			      var cfxx_rkdj_yd = krec.get('fzdj');
			    }else{
			       return
			    }
		   var rksl= krec.get('rksl');
		   var fzsl= krec.get('fzsl');
		   var rkdj= krec.get('rkdj');
		   var fzdj= krec.get('fzdj');
		   var hxbj= krec.get('hxbj');
		   var sdbj= krec.get('sdbj');
		   var cfxx_ckbh= krec.get('ckbh');
		   var cfxx_rkdh= krec.get('rkdh');
		   var cfxx_csbh= krec.get('csbh');
		   var cfxx_clhh= krec.get('clhh');
		   var cfxx_rkxh_yd= krec.get('rkxh');
		   var cfxx_rkxh_sy= krec.get('rkxh');
		   var cfxx_rkje_yd= krec.get('rkje_hx');//入库金额
		   var cfxx_cfbj= 1;	    
           win.close();
           me.doCf(xzdw,krec,hxbj,sdbj,cfxx_ckbh,cfxx_rkdh,cfxx_rkxh_yd,
			    cfxx_rksl_yd,cfxx_rkdj_yd,cfxx_rkje_yd);
          }
      },
      //拆分信息
      doCf : function(xzdw,krec,hxbj,sdbj,cfxx_ckbh,cfxx_rkdh,cfxx_rkxh_yd,
			    cfxx_rksl_yd,cfxx_rkdj_yd,cfxx_rkje_yd){
		   if(hxbj==1){
			   Ext.Msg.alert('提示','记录拆分必须是没有核销的记录！')
			   return
			}
		  if(sdbj==0){
			  Ext.Msg.alert('提示','记录拆分必须是已经锁定的记录！')
			  return
			}
	      var llcount = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getLlcount',{
			   cfxx_ckbh : cfxx_ckbh, cfxx_rkdh :  cfxx_rkdh, cfxx_rkxh_yd : cfxx_rkxh_yd
			})
		  var rkxh_cf = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getRkxhcf',{
			   cfxx_ckbh : cfxx_ckbh, cfxx_rkdh :  cfxx_rkdh
			})
		  var win =  Ext.widget('win_RkdSplit',{
			       rec :  krec,
			       cfxx_ckbh : cfxx_ckbh,
			       cfxx_rkdh : cfxx_rkdh,
			       rkxh_yd : cfxx_rkxh_yd,
			       rksl_yd : cfxx_rksl_yd,
			       rkdj_yd : cfxx_rkdj_yd,
			       rkje_yd : cfxx_rkje_yd,
			       rkxh_cf : rkxh_cf,
			       llcount : llcount,
			       xzdw : xzdw
			});
			win.show();
      },
      FyCf : function(btn){
          var me = this;
          var win = me.getFydSplit();
          var grec = win.rec;
          var grdfyd = me.getGrdFydImp();
          var fyStore = grdfyd.getStore();
          var frec= grdfyd.getSelectionModel().getSelection()[0];
          var newrec = frec.copy();
          if(btn.action == "BTN_SAVE"){
          var values = win.getData();
          if(grec.get('fysl')>0){
             if(values.fysl_cf<=0||values.fysl_cf>=grec.get('fysl')){
                Ext.Msg.alert('提示','拆分的费用数量超过指定范围！');
                return;
             }
          }else{
             if(values.fysl_cf>=0||values.fysl_cf<=grec.get('fysl')){
                Ext.Msg.alert('提示','拆分的费用数量超过指定范围！');
                return;
             }
          }
          //原单相关值改变
          var fysl_yd = values.fysl_yd;
          var s_csdj = frec.get('csdj');var s_zzsl = frec.get('zzsl');
          frec.set('fysl',values.fysl_sy); 
          var s_fyje;var s_csje;
          if(fysl_yd!=0){
          	s_fyje = Ext.util.Format.round(values.fysl_sy*values.fydj_sy,2);
          	s_csje = Ext.util.Format.round(values.fysl_sy*s_csdj,2);
          }else{
            s_fyje = Ext.util.Format.round(values.fyje_sy,2);
            s_csje = Ext.util.Format.round(Ext.util.Format.round(values.fyje_sy,2)/(1+s_zzsl),2)
          }
          var s_zzse = s_fyje - s_csje;
          frec.set('fydj',Ext.util.Format.round(values.fydj_sy,6)); 
          frec.set('fyje',s_fyje); 
          frec.set('csdj',Ext.util.Format.round(s_csdj,6)); 
          frec.set('csje',s_csje); 
          frec.set('fydj_hx',Ext.util.Format.round(values.fydj_sy,6)); 
          frec.set('fyje_hx',s_fyje); 
          frec.set('csdj_hx',Ext.util.Format.round(s_csdj,6)); 
          frec.set('csje_hx',s_csje); 
          frec.set('zzse_hx',s_zzse); 
          
          //拆分单相关值的改变
          s_csdj = newrec.get('csdj');s_zzsl = newrec.get('zzsl');
          newrec.set('fydh',values.fydh);
          newrec.set('fyxh',values.fyxh_cf);
          newrec.set('cfxh',values.fyxh_yd);
          newrec.set('fysl',values.fysl_cf);
          if(fysl_yd!=0){
            s_fyje = Ext.util.Format.round(values.fysl_cf*values.fydj_cf,2);
          	s_csje = Ext.util.Format.round(values.fysl_cf*s_csdj,2);
          }else{
            s_fyje = Ext.util.Format.round(values.fyje_cf,2);
            s_csje = Ext.util.Format.round(Ext.util.Format.round(values.fyje_cf,2)/(1+s_zzsl),2)
          }
          s_zzse = s_fyje - s_csje;
          newrec.set('fydj',Ext.util.Format.round(values.fydj_cf,6));
          newrec.set('fyje',s_fyje);
          newrec.set('csdj',Ext.util.Format.round(s_csdj,6));
          newrec.set('csje',s_csje);
          newrec.set('fydj_hx',Ext.util.Format.round(values.fydj_cf,6));
          newrec.set('fyje_hx',s_fyje);
          newrec.set('csdj_hx',Ext.util.Format.round(s_csdj,6));
          newrec.set('csje_hx',s_csje);
          newrec.set('zzse_hx',s_zzse);
          newrec.phantom =true;//新增newrec
            var result = erp.Const.callServiceMethodSync(
            'purchasecost/purchasecost.act?method=addPurchaseCost',{
            data:'['+Ext.encode(newrec.data)+']'
            }
            )
            var result = erp.Const.callServiceMethodSync(
            'purchasecost/purchasecost.act?method=updatePurchaseCost',{
            data:'['+Ext.encode(frec.data)+']'
            }
            )
            fyStore.loadPage(1);
            win.close();
          }
      },
      addCf : function(btn){
          var me = this;
          var win = me.getRkdSplit();
          var grec = win.rec;
          var grdrkd = me.getGrdRkdImp();
         /* var rkStore = grdrkd.getStore();*/
          var krecs  =  grdrkd.getSelectRow();
          var krec = krecs[0];
          var newrec = krec.copy();
          var rkje_xghx = krec.get('rkje_hx');
		  var csje_xghx = krec.get('csje_hx');
		  var wbje_xghx = krec.get('wbje_hx');
		  var s_rksl = krec.get('rksl');
		  var s_fzsl = krec.get('fzsl');
		  var rkxh_yd = krec.get('rkxh');
          if(btn.action == "BTN_SAVE"){
              var values = win.getData();
              if(grec.get('rksl')>0){
              if(values.rksl_cf<=0||values.rksl_cf>=parseFloat(grec.get('rksl'))){
                Ext.Msg.alert('提示','拆分的入库数量超过指定范围！');
                return;
              }
              }else{
              if(values.rksl_cf>=0||values.rksl_cf<=parseFloat(grec.get('rksl'))){
                 Ext.Msg.alert('提示','拆分的入库数量超过指定范围！');
                 return;
                }
              }
              var llcount = win.llcount;
              var xzdw = win.xzdw;
              var s_cfxx_ckbh = win.cfxx_ckbh;
              var s_cfxx_rkdh = win.cfxx_rkdh;
              var clhh = krec.get('clhh');
			  var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getFzzbj',{
			   clhh : clhh
			  });
			  var fzzbj = result.fzzbj;
			  var fzdw = result.fzdw;
			  var jldw = result.jldw;
              var rksl_sy = values.rksl_sy;
              var rkje_sy = values.rkje_sy;
              var rkxh_cf = values.rkxh_cf;
              var rksl_cf = values.rksl_cf;
              var rkje_cf = values.rkje_cf;
            if(fzzbj==0){
            	//原单相关值的改变
              var rkdj = krec.get('rkdj');
              var csdj = krec.get('csdj');
              var wbdj = krec.get('wbdj');
              krec.set('rksl',rksl_sy);
              var rkje = Ext.util.Format.round(rksl_sy*rkdj,2);
              var csje = Ext.util.Format.round(rksl_sy*csdj,2);
              var wbje = Ext.util.Format.round(rksl_sy*wbdj,2);
              var zzse = rkje - csje;
                krec.set('rkje',rkje);
                krec.set('csje',csje);
                krec.set('wbje',wbje);
                if(llcount==0){
                  krec.set('rkdj_hx',Ext.util.Format.round(rkdj,6));  
                  krec.set('rkje_hx',rkje);  
                  krec.set('csdj_hx',Ext.util.Format.round(csdj,6));  
                  krec.set('csje_hx',csje);  
                  krec.set('zzse_hx',zzse);  
                  krec.set('wbdj_hx',Ext.util.Format.round(wbdj,6));  
                  krec.set('wbje_hx',wbje);
                }else{
                  krec.set('rkje_hx',Ext.util.Format.round(krec.get('rkdj_hx')*rksl_sy,2));
                  krec.set('csje_hx',Ext.util.Format.round(krec.get('csdj_hx')*rksl_sy,2));
                  krec.set('zzse_hx',krec.get('rkje_hx') - krec.get('csje_hx'));
                  krec.set('wbje_hx',Ext.util.Format.round(krec.get('wbdj_hx')*rksl_sy,2));
                }                 
                //拆分单相关值的改变
                 newrec.set('rkxh',rkxh_cf);
                 rkdj = newrec.get('rkdj');
                 csdj = newrec.get('csdj');
                 wbdj = newrec.get('wbdj');
                 //拆分序号
                 newrec.set('ckbh',s_cfxx_ckbh);
                 newrec.set('rkdh',s_cfxx_rkdh);
                 newrec.set('rkxh',rkxh_cf);
                 newrec.set('cfxh',rkxh_yd);
                 newrec.set('rksl',rksl_cf);
                 rkje = Ext.util.Format.round(rksl_cf*rkdj,2);
                 csje = Ext.util.Format.round(rksl_cf*csdj,2);
                 wbje = Ext.util.Format.round(rksl_cf*wbdj,2);
                 zzse = rkje - csje; 
                 newrec.set('rkdj_hx',Ext.util.Format.round(rkdj,6));
                 newrec.set('rkje_hx',rkje);
                 newrec.set('csdj_hx',Ext.util.Format.round(csdj,6));
                 newrec.set('csje_hx',csje);
                 newrec.set('zzse_hx',zzse);
                 newrec.set('wbdj_hx',Ext.util.Format.round(wbdj,6));
                 newrec.set('wbje_hx',wbje);
                
                 if(llcount==0){
                  newrec.set('rkdj_hx',Ext.util.Format.round(rkdj,6));  
                  newrec.set('rkje_hx',rkje);  
                  newrec.set('csdj_hx',Ext.util.Format.round(csdj,6));  
                  newrec.set('csje_hx',csje);  
                  newrec.set('zzse_hx',zzse);  
                  newrec.set('wbdj_hx',Ext.util.Format.round(wbdj,6));  
                  newrec.set('wbje_hx',wbje);
                }else{
                  newrec.set('rkje_hx',rkje_xghx - krec.get('rkje_hx'));
                  newrec.set('csje_hx',csje_xghx - krec.get('csje_hx'));
                  newrec.set('zzse_hx',(rkje_xghx - krec.get('rkje_hx'))-(csje_xghx - krec.get('csje_hx')));
                  newrec.set('wbje_hx',wbje_xghx - krec.get('wbje_hx') );
                }  
            var result = erp.Const.callServiceMethodSync(
            'purchaseclearing/purchaseclearing.act?method=addJsRkdbImp',{
            data:'['+Ext.encode(newrec.data)+']'
            }
            )
            var result = erp.Const.callServiceMethodSync(
            'purchaseclearing/purchaseclearing.act?method=updateJsRkdbImp',{
            data:'['+Ext.encode(krec.data)+']'
            }
            )
            grdrkd.load();
            /*rkStore.reload();*/
                 if(llcount>0){
                 var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=Split',{
		     	   cfxx_ckbh : s_cfxx_ckbh,cfxx_rkdh : s_cfxx_rkdh,rkxh_yd:rkxh_yd,rkxh_cf:rkxh_cf,
		     	   ss_rkje:krec.get('rkje_hx'), ss_csdj:krec.get('csdj_hx'),ss_csje:krec.get('csje_hx'),ss_wbdj:krec.get('wbdj_hx'),ss_wbje:krec.get('wbje'),
		     	   ss_rkje_cf :newrec.get('rkje_hx') ,ss_csdj_cf :newrec.get('csdj_hx') ,ss_csje_cf : newrec.get('csje_hx'),ss_wbdj_cf: newrec.get('wbdj_hx'),ss_wbje_cf : newrec.get('wbje_hx') 
		     	})	
		     	 var data = Ext.decode(result);
		         Ext.getBody().unmask();
		         if(data.bool == false){
		         Ext.Msg.alert('提示',data.msg);
			     return ;
		         }}
             win.close();
              }
           else if(xzdw = jldw){
              //原单相关值的改变
           	   var rkdj = krec.get('rkdj');
               var csdj = krec.get('csdj');
               var wbdj = krec.get('wbdj');
               var fzdj = krec.get('fzdj');
                  krec.set('rksl',rksl_sy);
               var rkje = Ext.util.Format.round(rksl_sy*rkdj,2);
               var csje = Ext.util.Format.round(rksl_sy*csdj,2);
               var wbje = Ext.util.Format.round(rksl_sy*wbdj,2);
               var zzse = rkje - csje;
                  krec.set('rkdj',Ext.util.Format.round(rkdj,6));  
                  krec.set('rkje',rkje);  
                  krec.set('csdj',Ext.util.Format.round(csdj,6));  
                  krec.set('csje',csje);  
                  krec.set('zzse',zzse);  
                  krec.set('wbdj',Ext.util.Format.round(wbdj,6));  
                  krec.set('wbje',wbje);
                 if(llcount==0){
                  krec.set('rkdj_hx',Ext.util.Format.round(rkdj,6));  
                  krec.set('rkje_hx',rkje);  
                  krec.set('csdj_hx',Ext.util.Format.round(csdj,6));  
                  krec.set('csje_hx',csje);  
                  krec.set('zzse_hx',zzse);  
                  krec.set('wbdj_hx',Ext.util.Format.round(wbdj,6));  
                  krec.set('wbje_hx',wbje);
                 }else{
                  krec.set('rkje_hx',Ext.util.Format.round(krec.get('rkdj_hx')*rksl_sy,2));
                  krec.set('csje_hx',Ext.util.Format.round(krec.get('csdj_hx')*rksl_sy,2));
                  krec.set('zzse_hx',krec.get('rkje_hx') - krec.get('csje_hx'));
                  krec.set('wbje_hx',Ext.util.Format.round(krec.get('wbdj_hx')*rksl_sy,2));
                 }
                 if(s_fzsl>0){
                    krec.set('fzsl',Ext.util.Format.round(rksl_sy*s_fzsl/s_rksl),3)
                    krec.set('fzdj',fzdj)
                 }
                 //拆分单相关值的改变
                 newrec.set('rkxh',rkxh_cf);
                 rkdj = newrec.get('rkdj');
                 csdj = newrec.get('csdj');
                 wbdj = newrec.get('wbdj');
                 newrec.set('ckbh',s_cfxx_ckbh);
                 newrec.set('rkdh',s_cfxx_rkdh);
                 newrec.set('rkxh',rkxh_cf);
                 newrec.set('cfxh',rkxh_yd);
                 newrec.set('rksl',rksl_cf);
                 rkje = Ext.util.Format.round(rksl_cf*rkdj,2);
                 csje = Ext.util.Format.round(rksl_cf*csdj,2);
                 wbje = Ext.util.Format.round(rksl_cf*wbdj,2);
                 zzse = rkje - csje; 
                 newrec.set('rkdj',Ext.util.Format.round(rkdj,6));
                 newrec.set('rkje',rkje);
                 newrec.set('csdj',Ext.util.Format.round(csdj,6));
                 newrec.set('csje',csje);
                 newrec.set('zzse',zzse);
                 newrec.set('wbdj',Ext.util.Format.round(wbdj,6));
                 newrec.set('wbje',wbje);
                
                 if(llcount==0){
                  newrec.set('rkdj_hx',Ext.util.Format.round(rkdj,6));  
                  newrec.set('rkje_hx',rkje);  
                  newrec.set('csdj_hx',Ext.util.Format.round(csdj,6));  
                  newrec.set('csje_hx',csje);  
                  newrec.set('zzse_hx',zzse);  
                  newrec.set('wbdj_hx',Ext.util.Format.round(wbdj,6));  
                  newrec.set('wbje_hx',wbje);
                }else{
                  newrec.set('rkje_hx',rkje_xghx - krec.get('rkje_hx'));
                  newrec.set('csje_hx',csje_xghx - krec.get('csje_hx'));
                  newrec.set('zzse_hx',(rkje_xghx - krec.get('rkje_hx'))-(csje_xghx - krec.get('csje_hx')));
                  newrec.set('wbje_hx',wbje_xghx - krec.get('wbje_hx') );
                }
                 if(s_rksl>0){
                    newrec.set('fzsl',s_fzsl - krec.get('fzsl'))
                    newrec.set('fzdj',fzdj)
                 }
                 var result = erp.Const.callServiceMethodSync(
            'purchaseclearing/purchaseclearing.act?method=addJsRkdbImp',{
            data:'['+Ext.encode(newrec.data)+']'
            }
            )
            var result = erp.Const.callServiceMethodSync(
            'purchaseclearing/purchaseclearing.act?method=updateJsRkdbImp',{
            data:'['+Ext.encode(krec.data)+']'
            }
            )
            grdrkd.load();
            /*rkStore.reload();*/
                 if(llcount>0){
                 var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=Split',{
		     	   cfxx_ckbh : s_cfxx_ckbh,cfxx_rkdh : s_cfxx_rkdh,rkxh_yd:rkxh_yd,rkxh_cf:rkxh_cf,
		     	   ss_rkje:krec.get('rkje_hx'), ss_csdj:krec.get('csdj_hx'),ss_csje:krec.get('csje_hx'),ss_wbdj:krec.get('wbdj_hx'),ss_wbje:krec.get('wbje'),
		     	   ss_rkje_cf :newrec.get('rkje_hx') ,ss_csdj_cf :newrec.get('csdj_hx') ,ss_csje_cf : newrec.get('csje_hx'),ss_wbdj_cf: newrec.get('wbdj_hx'),ss_wbje_cf : newrec.get('wbje_hx') 
		     	})	
		     	 var data = Ext.decode(result);
		         Ext.getBody().unmask();
		         if(data.bool == false){
		         Ext.Msg.alert('提示',data.msg);
			     return ;
		         }}
		         win.close();
            }
           else if(xzdw = fzdw){
           	   var rkdj = krec.get('rkdj');
               var csdj = krec.get('csdj');
               var wbdj = krec.get('wbdj');
               var fzdj = krec.get('fzdj');
                 krec.set('fzsl',rksl_sy);
                 krec.set('fzdj',fzdj);
               if(s_fzsl>0){
                 krec.set('rksl',Ext.util.Format.round(rksl_sy*s_rksl/s_fzsl),3)
                 krec.set('rkdj',rkdj)
               }  
               var rkje = Ext.util.Format.round(krec.get('rksl')*rkdj,2);
               var csje = Ext.util.Format.round(krec.get('rksl')*csdj,2);
               var wbje = Ext.util.Format.round(krec.get('rksl')*wbdj,2);
               var zzse = rkje - csje;
                krec.set('rkdj',Ext.util.Format.round(rkdj,6));  
                  krec.set('rkje',rkje);  
                  krec.set('csdj',Ext.util.Format.round(csdj,6));  
                  krec.set('csje',csje);  
                  krec.set('wbdj',Ext.util.Format.round(wbdj,6));  
                  krec.set('wbje',wbje);
                 if(llcount==0){
                  krec.set('rkdj_hx',Ext.util.Format.round(rkdj,6));  
                  krec.set('rkje_hx',rkje);  
                  krec.set('csdj_hx',Ext.util.Format.round(csdj,6));  
                  krec.set('csje_hx',csje);  
                  krec.set('zzse_hx',zzse);  
                  krec.set('wbdj_hx',Ext.util.Format.round(wbdj,6));  
                  krec.set('wbje_hx',wbje);
                 }else{
                  krec.set('rkje_hx',Ext.util.Format.round(krec.get('rkdj_hx')*rksl_sy,2));
                  krec.set('csje_hx',Ext.util.Format.round(krec.get('csdj_hx')*rksl_sy,2));
                  krec.set('zzse_hx',krec.get('rkje_hx') - krec.get('csje_hx'));
                  krec.set('wbje_hx',Ext.util.Format.round(krec.get('wbdj_hx')*rksl_sy,2));
                 }
                    
                //拆分单相关值的改变
                 rkdj = newrec.get('rkdj');
                 csdj = newrec.get('csdj');
                 wbdj = newrec.get('wbdj');
                 newrec.set('ckbh',s_cfxx_ckbh);
                 newrec.set('rkdh',s_cfxx_rkdh);
                 newrec.set('rkxh',rkxh_cf); 
                 newrec.set('cfxh',rkxh_yd);
                 newrec.set('rksl',s_rksl - krec.get('rksl'));
                 newrec.set('rkdj',rkdj);
                 rkje = Ext.util.Format.round(newrec.get('rksl')*rkdj,2);
                 csje = Ext.util.Format.round(newrec.get('rksl')*csdj,2);
                 wbje = Ext.util.Format.round(newrec.get('rksl')*wbdj,2);
                  zzse = rkje - csje; 
                 newrec.set('rkdj',Ext.util.Format.round(rkdj,6));
                 newrec.set('rkje',rkje);
                 newrec.set('csdj',Ext.util.Format.round(csdj,6));
                 newrec.set('csje',csje);
                 newrec.set('zzse',zzse);
                 newrec.set('wbdj',Ext.util.Format.round(wbdj,6));
                 newrec.set('wbje',wbje);
                 
                 if(llcount==0){
                  newrec.set('rkdj_hx',Ext.util.Format.round(rkdj,6));  
                  newrec.set('rkje_hx',rkje);  
                  newrec.set('csdj_hx',Ext.util.Format.round(csdj,6));  
                  newrec.set('csje_hx',csje);  
                  newrec.set('zzse_hx',zzse);  
                  newrec.set('wbdj_hx',Ext.util.Format.round(wbdj,6));  
                  newrec.set('wbje_hx',wbje);
                }else{
                  newrec.set('rkje_hx',rkje_xghx - krec.get('rkje_hx'));
                  newrec.set('csje_hx',csje_xghx - krec.get('csje_hx'));
                  newrec.set('zzse_hx',(rkje_xghx - krec.get('rkje_hx'))-(csje_xghx - krec.get('csje_hx')));
                  newrec.set('wbje_hx',wbje_xghx - krec.get('wbje_hx') );
                }
                 if(s_rksl>0){
                    newrec.set('fzsl',s_fzsl - krec.get('fzsl'))
                    newrec.set('fzdj',krec.get('fzdj'))
                 }
                 var result = erp.Const.callServiceMethodSync(
            'purchaseclearing/purchaseclearing.act?method=addJsRkdbImp',{
            data:'['+Ext.encode(newrec.data)+']'
            }
            )
            var result = erp.Const.callServiceMethodSync(
            'purchaseclearing/purchaseclearing.act?method=updateJsRkdbImp',{
            data:'['+Ext.encode(krec.data)+']'
            }
            )
            grdrkd.load();
            /*rkStore.reload();*/
                 if(llcount>0){
                 var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=Split',{
		     	   cfxx_ckbh : s_cfxx_ckbh,cfxx_rkdh : s_cfxx_rkdh,rkxh_yd:rkxh_yd,rkxh_cf:rkxh_cf,
		     	   ss_rkje:krec.get('rkje_hx'), ss_csdj:krec.get('csdj_hx'),ss_csje:krec.get('csje_hx'),ss_wbdj:krec.get('wbdj_hx'),ss_wbje:krec.get('wbje'),
		     	   ss_rkje_cf :newrec.get('rkje_hx') ,ss_csdj_cf :newrec.get('csdj_hx') ,ss_csje_cf : newrec.get('csje_hx'),ss_wbdj_cf: newrec.get('wbdj_hx'),ss_wbje_cf : newrec.get('wbje_hx') 
		     	})	
		     	 var data = Ext.decode(result);
		         Ext.getBody().unmask();
		         if(data.bool == false){
		         Ext.Msg.alert('提示',data.msg);
			     return ;
		         }}
		         win.close();
               }  
                
          }     
      },
      doRkdhb : function(){
          var me = this;
          var win = me.getRkdMerge();
          var row1 = win.row1;
          var row2 = win.row2;
          var grdrkd = me.getGrdRkdImp();
          /*var rkStore = grdrkd.getStore();*/
          var recs1 = win.rec;  var recs2 = win.recs2;
          var rksl1 = parseFloat(recs1.get('rksl'))+parseFloat(recs2.get('rksl'));
          var rkje1 = Ext.util.Format.round(parseFloat(rksl1)*parseFloat(recs1.get('rkdj')),2);
          var csje1 = Ext.util.Format.round(parseFloat(rksl1)*parseFloat(recs1.get('csdj')),2);
          var wbje1 = Ext.util.Format.round(parseFloat(rksl1)*parseFloat(recs1.get('wbdj')),2);
          var fzsl1 = parseFloat(recs1.get('fzsl')) + parseFloat(recs2.get('fzsl'));
          var zzse1 = parseFloat(rkje1) - parseFloat(csje1);
          row1.set('rksl',rksl1);
          row1.set('rkdj',Ext.util.Format.round(parseFloat(recs1.get('rkdj')),6));
          row1.set('rkje',rkje1);
          row1.set('csdj',Ext.util.Format.round(parseFloat(recs1.get('csdj')),6));
          row1.set('csje',csje1);
          row1.set('wbdj',Ext.util.Format.round(parseFloat(recs1.get('wbdj')),6));
          row1.set('wbje',wbje1);
          row1.set('fzsl',fzsl1);
          row1.set('rkdj_hx',Ext.util.Format.round(parseFloat(recs1.get('rkdj')),6));
          row1.set('rkje_hx',rkje1);
          row1.set('csdj_hx',Ext.util.Format.round(parseFloat(recs1.get('csdj')),6));
          row1.set('csje_hx',csje1);
          row1.set('wbdj_hx',Ext.util.Format.round(parseFloat(recs1.get('wbdj')),6));
          row1.set('wbje_hx',wbje1);
          row1.set('zzse_hx',zzse1);
           var result = erp.Const.callServiceMethodSync(
            'purchaseclearing/purchaseclearing.act?method=deleteJsRkdbImp',{
            data:'['+Ext.encode(row2.data)+']'
            }
            )
            var result = erp.Const.callServiceMethodSync(
            'purchaseclearing/purchaseclearing.act?method=updateJsRkdbImp',{
            data:'['+Ext.encode(row1.data)+']'
            }
            )
          grdrkd.load();
          win.close();
          var llcount =  erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=getLlcount',{
			   cfxx_ckbh : row1.get('ckbh'), cfxx_rkdh :row1.get('rkdh'), cfxx_rkxh_yd : row1.get('rkxh')
			})
		  if(llcount > 0){
		  var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=Merge',{
		      rkdh1 : recs1.get('rkdh'),rkxh1 : recs1.get('rkxh'),ckbh1: recs1.get('ckbh'), rkxh2: recs2.get('rkxh')
		  })
		  var data = Ext.decode(result);
		         Ext.getBody().unmask();
		         if(data.bool == false){
		         Ext.Msg.alert('提示',data.msg);
			     return ;
		  }
      }},
      doFydhb : function(btn){
          var me= this;
          var win = me.getFydMerge();
          var fydStore = me.getGrdFydImp().getStore();
          if(btn.action == "BTN_SAVE"){
            var values = win.getData();
            var row1 = win.row1; var row2 = win.row2;
            var fysl = row1.get('fysl')+row2.get('fysl');
            if(win.cfxx_rksl_yd!=0){
               var fyje1 = Ext.util.Format.round(fysl*values.fydj_yd,2);
               var csje1 = Ext.util.Format.round(fysl*win.csdj1,2);
            }else{
               var fyje1 = Ext.util.Format.round(values.fyje_cf+values.fyje_sy,2);
               var csje1 = Ext.util.Format.round(Ext.util.Format.round(values.fyje_cf+values.fyje_sy,2)/(1+win.zzsl1),2);
            }
            var zzse1 = fyje1 - csje1;
            row1.set('fysl',fysl);  
            row1.set('fydj',Ext.util.Format.round(values.fydj_yd,6));  
            row1.set('fyje',fyje1);  
            row1.set('csdj',Ext.util.Format.round(win.csdj1,6));  
            row1.set('csje',csje1);  
            row1.set('fydj_hx',Ext.util.Format.round(values.fydj_yd,6)); 
            row1.set('fyje_hx',fyje1);   
            row1.set('csdj_hx',Ext.util.Format.round(win.csdj1,6));  
            row1.set('csje_hx',csje1);  
            row1.set('zzse_hx',zzse1);  
            var result = erp.Const.callServiceMethodSync(
            'purchasecost/purchasecost.act?method=deletePurchaseCost',{
            data:'['+Ext.encode(row2.data)+']'
            }
            )
            var result = erp.Const.callServiceMethodSync(
            'purchasecost/purchasecost.act?method=updatePurchaseCost',{
            data:'['+Ext.encode(row1.data)+']'
            }
            )
            fydStore.loadPage(1);
            win.close();
          }
      },
      doFz : function(btn){
      	  var me = this;
          var win = me.getFzhmChoose();     	
      	  if(btn.action == "BTN_SAVE"){
          var values = win.getData();
          var fzhm = values.fzhm;
          var ImpPC = me.getImpPurchaseClearing();
          var grdrkd = me.getGrdRkdImp();
          var grdfyd = me.getGrdFydImp();
          /*var rkStore = grdrkd.getStore();*/
          var fyStore = grdfyd.getStore();
      	  var tab = me.getMainTab();
          var activeTab = tab.getActiveTab();
          me.maintab = 0;
          if(activeTab.itemId =='panel_rkd'){
	      me.maintab = 0;
	      }else if(activeTab.itemId=='panel_fyd'){
		  me.maintab = 1;}
		  if(me.maintab == 0){
		 	var recs  =  grdrkd.getSelectRow();
		 	var rkrec = recs[0];
		    erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=updateFzhm',{
		       fzhm: fzhm,ckbh : rkrec.get('ckbh'),rkdh: rkrec.get('rkdh'),rkxh:rkrec.get('rkxh')
		       });
		    /*rkStore.reload()*/
		      grdrkd.load(); 
      	  }else if(me.maintab == 1){
      	  	var fyrec  =  grdfyd.getSelectionModel().getSelection()[0];      
      	   erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=updateFyFzhm',{
		       fzhm: fzhm,fydh : fyrec.get('fydh'),fyxh : fyrec.get('fyxh')
		    })
		    fyStore.reload()
      	  }
      	 }
      	  win.close();
      },
      EdtNotice : function(type){
      	 var me = this;
      	 var rec;
      	 var isAdd = isEdit = canedit =false;
      	 var isinit;
      	 switch(type){
      	    case 'btn_add':
      	     isAdd = true;
      	     canedit = true;
      	     isEdit = false;
      	     var newtzdh = null
      	     isinit = true;
      	     Ext.Ajax.request({
      	      url : 'purchaseclearing/purchaseclearing.act?method=getMaxTzdh',
      	      async: false,
      	      success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newtzdh=obj.data;
					    },
					    method:"POST",
					    scope:this
      	   });   
      	      var rec = Ext.create('erp.PurchaseClearing.model.Notice',{
      	         tzdh : newtzdh+1,tzrq : new Date(), qsrq : new Date(), 
      	         jzrq : new Date()
      	      });
      	      break;
      	   case 'btn_edt':
      	       isinit = false;
      	       var rec = me.grdmain.getSelectionModel().getSelection()[0];
      	        if(Ext.isEmpty(rec)){
			   Ext.Msg.alert('提示','请先选中一条记录');
			   return;
		     }
		     var czym=rec.get('czym');
		     if(Ext.String.trim(czym)!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		         Ext.Msg.alert('',"非本通知单操作员不能编辑!")
			     return;
		      }
		     var sdbj = rec.get('yfbj');
		     var hxbj = rec.get('hxbj');
		     if(sdbj==1||hxbj==1){
		     	canedit =false;
		     }else{
		        canedit = true;
		     }
		      isAdd=false;
			  isEdit=true;
      	 }
      	  var  panel  =  erp.Util.addContentTab({
      	        xtype : 'edt_PurchaseClearing',
      	        itemId : 'edt_PurchaseClearing',
      	        isAdd : isAdd,
      	        isEdit : isEdit,
      	        canedit : canedit, 
      	        rec : rec[0],
      	        isinit : isinit,
      	        mainPanel: me.panel,
      	        mainstore : me.grdStore
      	  })
      	  panel.loadData(rec,isAdd,isEdit)
      },
      doEdtPurchaseClearing : function(btn){
      	var me = this;
      	var store = me.grdStore;
      	var edt_PurchaseClearing = me.getEdtPurchaseClearing();
      	var form  = edt_PurchaseClearing.down('#jsForm');
      	var frec = form.getRecord();
      	form.updateRecord(frec);
      	var tzdh = frec.get('tzdh');
      	var grid_rkd = edt_PurchaseClearing.down('#grdRkd');
      	var rkstore = edt_PurchaseClearing.rkStore;
      	var fystore = edt_PurchaseClearing.fyStore;
      	var grdRkd =  me.getGrdRkd();
      	
      	switch(btn.itemId){
      		 case 'btn_gjjs' : 
      		 var win = Ext.widget('win_Gjjs',{
      		      store : rkstore
      		 })
      		 win.show();
      		 break;
      		 case 'btn_del' :
      		 var grdRkd = me.getGrdRkd();
      	     var rkrecs = grdRkd.getSelectionModel().getSelection();
      	     var grdFyd = me.getGrdFyd();
      	     var fyrecs = grdFyd.getSelectionModel().getSelection();
      	     if(rkrecs.length==0 && fyrecs.length==0){
      	        Ext.Msg.alert('提示','请选择至少一条记录！');
      	        return;
      	     }
      	     Ext.Msg.confirm('提示','是否确认删除所选记录?',function(btn){
      	        if(btn=='yes'){
      	     if(rkrecs.length!=0 && fyrecs.length==0){
      	           rkstore.remove(rkrecs);
      	        }
      	     else if(rkrecs.length==0 && fyrecs.length!=0){
      	     	   fystore.remove(fyrecs);
      	     }else if(rkrecs.length!=0 && fyrecs.length!=0){
      	           rkstore.remove(rkrecs);
      	           fystore.remove(fyrecs);
      	        }
      	     }
      	     })
      		 break;
      		 case 'imp1':
      	         var csbh = form.getValues().csbh;
      	         var hsbm = form.getValues().hsbm;
      	         if(hsbm=='undefined' || hsbm == 0 || Ext.isEmpty(hsbm)){
      	            hsbm = '21'
      	         }
      		 if(Ext.isEmpty(csbh)){
      		     Ext.Msg.alert('提示','请输入要核对的厂商名称！');
      		     break;
      		 }
      		 var count = 0;
      		 /*var sql = "select COUNT(*) from sysobjects WHERE name='view_wxjght' and type='V';";
      		 var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
			if (!data.bool) {
					 Ext.toastErrorInfo(data.msg);
					 return;
				}
			 if(data.val!=null){
				count = data.val;}
			 if(count>0){
			     sql = "drop view view_wxjght";
			     var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
				 var data = Ext.decode(result);
			     if (!data.bool) {
					 Ext.toastErrorInfo(data.msg);
					 return;
				}
				var ssql = "create view view_wxjght as select htbh,htxh,sum(clje) as clje  from gjjjbomb where clmc='外协加工费' group by htbh,htxh";
				var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : ssql});
				var data = Ext.decode(result);
			    if (!data.bool) {
					 Ext.toastErrorInfo(data.msg);
					return;
				}
			 }	*/
			 var recs = fystore.data.items;
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
		      var tbname = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=beforeloadJsFydbImp',{
		           recordData : recordData
		      })
		      var rkrecss = rkstore.data.items;
			  var recDate = "[";
		      var a=false;
		      Ext.each(rkrecss, function(rec) {
		          if(a){
		         	recDate += ",";
		          }
		          recDate += Ext.encode(rec.data);
		                a=true;
		          })
		      recDate += "]";
		      var tablename = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=beforeloadJsRkdbImp',{
		           recDate : recDate
		      })
		      //防止编辑界面自动关闭
		      edt_PurchaseClearing.isEdit = false;
		      
		       var panel =   erp.Util.addContentTab({
		            xtype : 'Imp_PurchaseClearing',
		            itemId : 'Imp_PurchaseClearing',
		            csbh : csbh,
		            tablename : tablename,
		            tbname : tbname,
		            mainPanel : me.getEdtPurchaseClearing(),
      		 	    ckbh : me.panel.ckbh,
      		 	    hsbm : hsbm
		        })
      		 //1.将原来的入库单通知号设置为0
      		 //2.将导入的入库单通知号设置为当前通知号
      		 var myMask = new Ext.LoadMask({
			          target : me.getImpPurchaseClearing()
		           });	
		     var mainGrid = me.getGrdRkdImp();      
      		 panel.down('#btn_confirm').on({
      		     click : function(btn){
      		       myMask.mask('正在导入，请等待......');
      		       mainGrid.showMask();
      		       var win = btn.up('panel');
				   var bool = false;
				   var rkgrid = win.down('#grd_rkd');
				   var rkrecs = rkgrid.getSelectRow();
				   var fygrid = win.down('#grd_fyd');
				   var fyrecs = fygrid.getSelectionModel().getSelection();
				   var nrecs =new Array();
				   var nrecsfy =new Array();
				   var supcanGrid=win.down('#grd_sel_rkd');
				   var af=supcanGrid.getSupcan();
				   var xml = '';
				   var recs=[];
				   var row=supcanGrid.getRows();
				   var store = Ext.create('Ext.data.Store', {
						model: 'erp.PurchaseClearing.model.JsRkdbImp',
						proxy: {
						type: 'ajax',
//						url : xml,
//						type: 'memory',
						reader: {
						   type: 'json'
						   }
						  }
						});
					var reader=Ext.create('Ext.data.reader.Xml',{
					    type:'xml',
					    model:'erp.PurchaseClearing.model.JsRkdbImp',
					    record:'row',
					    rootProperty:'table'
					});
					    xml = af.func("Export","asData \r\n startRow = 0 \r\n endRow ="+row );
					    var json=af.func('toJson',xml);
						var result=reader.read(Ext.XmlUtil.loadXMLString(xml));//resultSet
						var rec=result.getRecords();
						recs.push(rec[0]);
					store.loadData(rec);
//					store.add(recs);
					var allRec=store.getRange();
				   /*var allRec=supcanGrid.getAllRow();*/
					for(x in allRec){
					     var r= Ext.create('erp.PurchaseClearing.model.CostBills',{
				            hth : allRec[x].get('hth'),
				            htbh : allRec[x].get('htbh'),
				            htxh : allRec[x].get('htxh'),
				            ckbh : allRec[x].get('ckbh'),
				            ckmc : allRec[x].get('ckmc'),
				            rkdh : allRec[x].get('rkdh'),
				            rkxh : allRec[x].get('rkxh'),
				            rkrq : allRec[x].get('rkrq'),
				            dhrq : allRec[x].get('dhrq'),
				            clhh : allRec[x].get('clhh'),
				            clmc : allRec[x].get('clmc'),
				            cltx1 : allRec[x].get('cltx1'),
				            jldw : allRec[x].get('jldw'),
				            cgsl : allRec[x].get('cgsl'),
				            jgdj : allRec[x].get('clje'),
				            jgje : allRec[x].get('wxjgje'),
				            dhsl : allRec[x].get('dhsl'),
				            rksl : allRec[x].get('rksl'),
				            rkdj : allRec[x].get('rkdj_hx'),
				            rkje : allRec[x].get('rkje_hx'),
				            wbbh : allRec[x].get('wbbh'),
				            wbdh : allRec[x].get('wbdh'),
				            wbhl : allRec[x].get('wbhl_hx'),
				            wbdj : allRec[x].get('wbdj_hx'),
				            wbje : allRec[x].get('wbje_hx'),
				            fzdw : allRec[x].get('fzdw'),
				            fzsl : allRec[x].get('fzsl'),
				            rklb : allRec[x].get('rklb'),
				            rklbmc : allRec[x].get('rklbmc'),
				            shdh : allRec[x].get('shdh'),
				            shsj : allRec[x].get('shsj'),
				            bzsm : allRec[x].get('bzsm'),
				            czym : allRec[x].get('czym'),
				            czsj : allRec[x].get('czsj'),
				            cgbh : allRec[x].get('cgbh'),
				            cgxh : allRec[x].get('cgxh'),
				            cgh : allRec[x].get('cgh'),
				            glht : allRec[x].get('glht'),
				            sxdy09 : allRec[x].get('sxdy09'),
				            tjbj : allRec[x].get('tjdh')!=0?1:0 
				       });
				         if(allRec[x].get('sdbj')!=1){
				         	 myMask.unmask();
				         	 mainGrid.closeMask();
				             Ext.toastInfo('存在未锁定记录，不允许导入');
				             return;
				         }
				         if(!Ext.isEmpty(allRec[x])){
				         nrecs.push(r);
				         }
					}
				 /*  panel.rkSelStore.each(function(rec){
				   	   
				       var r= Ext.create('erp.PurchaseClearing.model.CostBills',{
				            hth : rec.get('hth'),
				            htbh : rec.get('htbh'),
				            htxh : rec.get('htxh'),
				            ckbh : rec.get('ckbh'),
				            ckmc : rec.get('ckmc'),
				            rkdh : rec.get('rkdh'),
				            rkxh : rec.get('rkxh'),
				            rkrq : rec.get('rkrq'),
				            dhrq : rec.get('dhrq'),
				            clhh : rec.get('clhh'),
				            clmc : rec.get('clmc'),
				            cltx1 : rec.get('cltx1'),
				            jldw : rec.get('jldw'),
				            cgsl : rec.get('cgsl'),
				            jgdj : rec.get('clje'),
				            jgje : rec.get('wxjgje'),
				            dhsl : rec.get('dhsl'),
				            rksl : rec.get('rksl'),
				            rkdj : rec.get('rkdj_hx'),
				            rkje : rec.get('rkje_hx'),
				            wbbh : rec.get('wbbh'),
				            wbdh : rec.get('wbdh'),
				            wbhl : rec.get('wbhl_hx'),
				            wbdj : rec.get('wbdj_hx'),
				            wbje : rec.get('wbje_hx'),
				            fzdw : rec.get('fzdw'),
				            fzsl : rec.get('fzsl'),
				            rklb : rec.get('rklb'),
				            rklbmc : rec.get('rklbmc'),
				            shdh : rec.get('shdh'),
				            shsj : rec.get('shsj'),
				            bzsm : rec.get('bzsm'),
				            czym : rec.get('czym'),
				            czsj : rec.get('czsj'),
				            cgbh : rec.get('cgbh'),
				            cgxh : rec.get('cgxh'),
				            cgh : rec.get('cgh'),
				            glht : rec.get('glht'),
				            sxdy09 : rec.get('sxdy09'),
				            tjbj : rec.get('tjdh')!=0?1:0 
				       });
				         if(rec.get('sdbj')!=1){
				         	 myMask.unmask();
				         	 mainGrid.closeMask();
				             Ext.toastInfo('存在未锁定记录，不允许导入');
				             bool = true; 
				         }
				         if(!Ext.isEmpty(rec)&&rec.get('sdbj')==1){
				         nrecs.push(r);
				         }
				   });
				   if(bool){
				      return;
				   }*/
				  /* panel.rkSelStore.each(function(rec){
				       var r= Ext.create('erp.PurchaseClearing.model.CostBills',{
				            hth : rec.get('hth'),
				            htbh : rec.get('htbh'),
				            htxh : rec.get('htxh'),
				            ckbh : rec.get('ckbh'),
				            ckmc : rec.get('ckmc'),
				            rkdh : rec.get('rkdh'),
				            rkxh : rec.get('rkxh'),
				            rkrq : rec.get('rkrq'),
				            dhrq : rec.get('dhrq'),
				            clhh : rec.get('clhh'),
				            clmc : rec.get('clmc'),
				            cltx1 : rec.get('cltx1'),
				            jldw : rec.get('jldw'),
				            cgsl : rec.get('cgsl'),
				            jgdj : rec.get('clje'),
				            jgje : rec.get('wxjgje'),
				            dhsl : rec.get('dhsl'),
				            rksl : rec.get('rksl'),
				            rkdj : rec.get('rkdj_hx'),
				            rkje : rec.get('rkje_hx'),
				            wbbh : rec.get('wbbh'),
				            wbdh : rec.get('wbdh'),
				            wbhl : rec.get('wbhl_hx'),
				            wbdj : rec.get('wbdj_hx'),
				            wbje : rec.get('wbje_hx'),
				            fzdw : rec.get('fzdw'),
				            fzsl : rec.get('fzsl'),
				            rklb : rec.get('rklb'),
				            rklbmc : rec.get('rklbmc'),
				            shdh : rec.get('shdh'),
				            shsj : rec.get('shsj'),
				            bzsm : rec.get('bzsm'),
				            czym : rec.get('czym'),
				            czsj : rec.get('czsj'),
				            cgbh : rec.get('cgbh'),
				            cgxh : rec.get('cgxh'),
				            cgh : rec.get('cgh'),
				            glht : rec.get('glht'),
				            sxdy09 : rec.get('sxdy09'),
				            tjbj : rec.get('tjdh')!=0?1:0 
				       });
				         if(rec.get('sdbj')!=1){
				             Ext.toastInfo('存在未锁定记录，不允许导入');
				             return;
				         }
				         if(!Ext.isEmpty(rec)){
				         nrecs.push(r);
				         }
				   });    */
				   panel.fySelStore.each(function(rec){
				   	    var r= Ext.create('erp.PurchaseClearing.model.Cost',{
				   	         fydh : rec.get('fydh'), 
				   	         fyxh : rec.get('fyxh'), 
				   	         fyrq : rec.get('fyrq'),
				   	         hsbm : rec.get('hsbm'),
				   	         bmmc : rec.get('bmmc'),
				   	         cybh : rec.get('cybh'), 
				   	         fyzy : rec.get('fyzy'), 
				   	         fyxz : rec.get('fyxz'), 
				   	         fysl : rec.get('fysl'), 
				   	         fydj : rec.get('fydj'), 
				   	         fyje : rec.get('fyje'), 
				   	         wbbh : rec.get('wbbh'), 
				   	         wbdh : rec.get('wbdh'), 
				   	         wbhl : rec.get('wbhl'), 
				   	         wbdj : rec.get('wbdj'), 
				   	         wbje : rec.get('wbje'), 
				   	         jhh  : rec.get('jhh'), 
				   	         bzsm : rec.get('bzsm'), 
				   	         czym : rec.get('czym'), 
				   	         czsj : rec.get('czsj'), 
				   	         sdrm : rec.get('sdrm'), 
				   	         sdsj : rec.get('sdsj') 
				   	    });
				   	    if(rec.get('spbj')!=1){
				   	    	 myMask.unmask();
				   	    	 mainGrid.closeMask();
				             Ext.toastInfo('存在未审批记录，不允许导入');
				             bool = true;
				         }
				   	    if(!Ext.isEmpty(rec)){
				   	    nrecsfy.push(r)
				   	    }
				   })
				         if(bool){return ;}
				         rkstore.add(nrecs);
				         fystore.add(nrecsfy);
				         mainGrid.closeMask();
				         myMask.unmask();
						 win.close();
      		    }
      		 });
      		 panel.show();
      		 edt_PurchaseClearing.isEdit = true;
      		 break;
      	     case 'BTN_SAVE':
      	        var rec = form.getRecord();
      	        form.updateRecord(rec);
      	        var hsbm = rec.get('hsbm');
      	        var tzdh = rec.get('tzdh');
      	        rec.set('czym',erp.Util.currentUser.userInfo.name);
      	        rec.set('czsj',new Date());
      	        if(/*form.getForm().isValid()&&*/form.getForm().isDirty()){
      	        if(hsbm=='' || hsbm==null){
      	             Ext.Msg.alert('提示','核算部门不能为空!');
      	             return;
      	         }
      	        var ysyfbj=0;
      	        var sql = "select ysyfbj from hsbmb where bmbh="+hsbm+";" 
      	        var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
				 if (!data.bool) {
					 Ext.toastErrorInfo(data.msg);
					 return;
				}
				if(data.val!=null){
				ysyfbj = data.val;}
				if(ysyfbj==0){
				   Ext.Msg.alert('提示','核算部门必须为打上应收应付标记的核算部门!');
				   return;
				}
				var czy_gh;
    			if(erp.Util.currentUser.isAdmin){
    				czy_gh = 'wj';
    			}else{
    				czy_gh = erp.Util.currentUser.accountMap[0].ref_u_id;
    			}
    			var qxsql = "select count(*) from hsbm_qxb ";
    		    qxsql+= "where (left(bmbh,len("+hsbm+"))="+hsbm+" or bmbh=left("+hsbm+",len(bmbh))) and czy_gh = '"+czy_gh+"'";
    			var result = erp.Const.callServiceMethodSync(
    				'materialInventory/materialInventory.act?method=getStringFromSql', {
    				sql:qxsql
    			});
    			var data = Ext.decode(result);
    			if(data.val==0 && czy_gh!='wj'){
    				Ext.Msg.alert('提示','你没有该部门的权限,请重新选择核算部门');
    				return
    			}
				var win = me.getEdtPurchaseClearing();
      	        if(rkstore.getCount()==0 && fystore.getCount()==0){
      	          Ext.Msg.alert('提示','入库单和费用单记录都为空不能保存!')
      	        }  
      	       //检测代客销售明细跟成品采购合同必须一并对账
      	          var rkrecs = rkstore.getRange();
                  var recordData = "["; //参数
					    var a=false;
					 	Ext.each( rkrecs,function(rec) {
									if (a) {
										recordData += ",";
									}
									recordData += Ext.encode(rec.data);
									a = true;
					    });
					    recordData += "]"
		        Ext.Ajax.setTimeout(5500000);
		        Ext.getBody().mask('正在进行验证，请等待......');			    
				var result = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=Test',{
				    recordData : recordData
				})	  
				var data = Ext.decode(result);
		             Ext.getBody().unmask();
		             if(data.bool == false){
		                   Ext.Msg.alert('提示',data.msg);
			               return ;
		                }
                Ext.Msg.confirm('提示','是否确认保存！',function(btn){
                    if(btn=='yes'){
                     Ext.Ajax.setTimeout(9990000);
		             Ext.getBody().mask('正在保存，请等待......');			
                     if(edt_PurchaseClearing.isAdd){
                     	 rec.phantom =true;
                     	var newtzdh = null;
      	                Ext.Ajax.request({
      	                   url : 'purchaseclearing/purchaseclearing.act?method=getMaxTzdh',
      	                   async: false,
      	                   success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newtzdh=obj.data;
					        },
					        method:"POST",
					        scope:this
      	                });   
      	                 tzdh = newtzdh+1;
      	                 rec.set('tzdh',tzdh);
                     	 rec.set('czsj',new Date());
                         me.grdStore.add(rec);
                     	 me.grdStore.sync({
                          success : function(e, batch) {
                          	        var fyrecs = fystore.getRange();       
                                    var   recData =  "["; //参数
					                var a=false;
					 	            Ext.each( fyrecs,function(rec) {
									if (a) {
										recData += ",";
									}
									recData += Ext.encode(rec.data);
									a = true;
					                 });
					                 recData += "]"     
					                 var id = 'PurchaseCostManger';
                                   var ps = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=UpdateCgfyb',{
                                        recData : recData, recordData : recordData,tzdh : tzdh,bills_num:id
                                    }) 
                                    var data = Ext.decode(ps);
		                            Ext.getBody().unmask();
		                            if(data!=null){
		                            if(data.bool == false){
		                                 Ext.Msg.alert('提示',data.msg);
			                             return ;
		                             }
		                            Ext.getBody().unmask(); 
		                            Ext.Msg.alert('提示','保存成功！');
									me.grdStore.reload();
									edt_PurchaseClearing.isEdit = false;
					                edt_PurchaseClearing.close();
					                }else{
					                Ext.getBody().unmask();	
						            Ext.Msg.alert('提示','保存失败！');
						            }	
								}})			
                     }else{
                       rec.set('czsj',new Date());
                       me.grdStore.sync({
									success : function(e, batch) {
                          	        var fyrecs = fystore.getRange();       
                                    var   recData =  "["; //参数
					                var a=false;
					 	            Ext.each( fyrecs,function(rec) {
									if (a) {
										recData += ",";
									}
									recData += Ext.encode(rec.data);
									a = true;
					                 });
					                 recData += "]"         
                                   var ps = erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=UpdateCgfyb',{
                                        recData : recData, recordData : recordData,tzdh : tzdh
                                    }) 
                                    var data = Ext.decode(result);
		                            Ext.getBody().unmask();
		                            if(data!=null){
		                            if(data.bool == false){
		                                 Ext.Msg.alert('提示',data.msg);
			                             return ;
		                             }
		                            Ext.getBody().unmask(); 
		                            Ext.Msg.alert('提示','保存成功！'); 
									me.grdStore.reload();
									edt_PurchaseClearing.isEdit = false;
						            edt_PurchaseClearing.close();
						            }else{
						            Ext.getBody().unmask();	
						            Ext.Msg.alert('提示','保存失败！');
						            }	
								}
								});
                     }	
                    }
                })   
      	    }   
      	}
      }
})
