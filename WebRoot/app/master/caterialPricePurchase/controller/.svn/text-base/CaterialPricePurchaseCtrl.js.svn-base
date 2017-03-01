Ext.define('erp.master.caterialPricePurchase.controller.CaterialPricePurchaseCtrl',{
      extend: 'Ext.app.Controller',
      requires : ['erp.ux.PagingBar',
                 'Ext.ux.TreePicker',
                 'Ext.window.MessageBox',
                 'erp.ux.FormKey',
                 'erp.ux.SelectField',
                 'erp.master.caterialPricePurchase.store.CaterialPricePurchase',
                  'erp.view.master.category.store.CategoryTree',
                  'erp.master.caterialPricePurchase.store.MaterialClass',
                  'erp.master.caterialPricePurchase.store.VendorPriceCtl',
                  'erp.master.prematerial.store.Companyname',
                  'erp.view.master.purchaseDetail.store.MaterialDetail',
                  'erp.ux.CommonTrigger',
                  'erp.ux.ComboxTree',
                  'erp.view.master.category.store.CategoryTree',
                  'erp.master.caterialPricePurchase.model.QueryParam',
                  'erp.master.caterialPricePurchase.model.MaterialQueryParam',
                  'erp.master.foreigncurrency.store.foreignCurrency',
                  'erp.master.caterialPricePurchase.store.CaterialHistoryPriceCtl',
                  'erp.master.caterialPricePurchase.store.VendorHistoryPriceCtl',
                  'erp.master.caterialPricePurchase.store.PurchasePrice',
                  'erp.master.caterialPricePurchase.store.HistroyQuote',
                  'erp.master.caterialPricePurchase.store.HistoryPriceCtl',
                  'erp.master.caterialPricePurchase.store.MaterialPrice',
                  'erp.view.master.category.store.CategoryTree'
                 /* 'erp.basicdata.materialClass.store.MaterialClass',
                  'erp.basicdata.materialClass.store.MaterialClassTree'*/
                 ],
      views : ['erp.master.caterialPricePurchase.view.CaterialPricePurchase',
               'erp.view.master.purchaseDetail.window.MateCombo',
               'erp.master.caterialPricePurchase.view.VendorPriceQuery',
               'erp.master.caterialPricePurchase.view.MaterialPriceQuery',
               'erp.master.caterialPricePurchase.view.BtnEdtCaterialPrice',
               'erp.master.caterialPricePurchase.view.HisPrice',
               'erp.master.caterialPricePurchase.view.HistoryEnquiry',
               'erp.master.caterialPricePurchase.view.EdtVendorPrice'],
      refs : [{ref: 'CaterialPricePurchase',selector : 'mng_CaterialPricePurchase'},
              {ref: 'VendorPriceCtl', selector : 'mng_CaterialPricePurchase #mng_VendorPriceCtl'},
              {ref: 'GrdVendorPriceCtl',selector : 'mng_CaterialPricePurchase #grd_VendorPriceCtl'},
              {ref: 'TabPanelVendorPriceCtl',selector : 'mng_CaterialPricePurchase #mng_VendorPriceCtl'},
              {ref: 'GrdCaterialPrice',selector: 'mng_CaterialPricePurchase #grd_CaterialPrice'},
      	      {ref: 'GrdVendorPrice',selector:'mng_CaterialPricePurchase #grd_VendorDescripe'},
      	      {ref: 'GrdVendorPriceDetial',selector: 'mng_CaterialPricePurchase #grd_VendorDescripeDetial'},
      	      {ref: 'VendorPriceTable',selector:'mng_CaterialPricePurchase #mng_VendorPrice' },
      	      {ref: 'GrdVendorPriceTable',selector:'mng_CaterialPricePurchase #grd_VendorDescripe' },
      	      {ref: 'BtnEdtCaterialPrice',selector:'edtbth_CaterialPrice'},
      	      {ref: 'treepanel',selector:'win_ChooseMaterialClass #tree_materialClass'},
      	      {ref: 'EdtVendorPrice', selector: 'edt_VendorPrice'},
      	      {ref: 'MainTab', selector:'mng_CaterialPricePurchase #main_tab'}
/*{ref: ,selector: },
      	      {ref: ,selector: },
      	      {ref: ,selector: }*/
      	      ],
      
      init : function(){
       var me = this;
        if (me.isInited)
			return;
			me.control({
			   'mng_CaterialPricePurchase' : {
			      afterrender : function(){
			      	me.panel = me.getCaterialPricePurchase();
			      	me.grdmain = me.getGrdCaterialPrice();
			      	me.grdStore = me.panel.store;
			      	me.grdStore.proxy.extraParams.usePaging=true;
			      	me.grdStore.load();
			      	me.grdSouth =  me.getGrdVendorPriceCtl();
			      	me.csSouth = me.getGrdVendorPriceDetial();
			      	me.clStore = me.getGrdVendorPriceDetial().getStore();
			        me.southStore = me.getGrdVendorPriceCtl().getStore();
			        me.tabpanel = me.getTabPanelVendorPriceCtl();
			        me.grdVp = me.getGrdVendorPrice();
			        me.vpStore = me.panel.vpStore;
			        me.mpStore = me.panel.mpStore;
			        me.vptStore= me.panel.vptStore;
			        me.bzStore = me.panel.bzStore;
			        me.query_rec=Ext.create('erp.master.caterialPricePurchase.model.QueryParam');
			        me.mquery_rec=Ext.create('erp.master.caterialPricePurchase.model.MaterialQueryParam');
			        me.rendermain = 1;
			        //材料与厂商Tab切换状态标记
			        var maintab = me.getMainTab();
			        var activeTab = maintab.getActiveTab();
			        me.maintab = 0;
			        if(activeTab.itemId =='panel_CaterialPrice'){
			         me.maintab = 0;
			        }else if(activeTab.itemId=='mng_VendorPrice'){
			         me.maintab = 1;
			         me.vptStore.proxy.extraParams.usePaging=true;
			         me.vptStore.proxy.extraParams.gdbj=0;
		             me.vptStore.loadPage(1);
			        }
			      }
			     ,beforedestroy:function(th){
			      	 me.rendermain = 0;
					 delete me.grdStore.proxy.extraParams.condition;
				}
			   },
			   //切换Tab 
			   'mng_CaterialPricePurchase #main_tab tab' : {
			   click:function(button,e,eOpts){
			     if(button.title=='材料价格表'){
			       me.maintab = 0;
			     }
			     else if(button.title=='厂商价格表'){
			       me.maintab = 1;
			       me.vptStore.proxy.extraParams.usePaging=true;
		           me.vptStore.loadPage(1);
			     }
			     
			   }
			   },
			   'mng_CaterialPricePurchase #menu_op' : {
			      click : me.menuOpButton
			   },
			   'win_ChooseMaterialClass' : {
			    beforerender : function(){
			     	var mywin = me.getChooseMaterialClass();
			         if(me.rendermain==1){
			       
			         }
			     }
			   },
			   'mng_CaterialPricePurchase button' : {
			       click : me.doAction
			   },
			   //材料类别选择
			   /*'win_ChooseMaterialClass button' : {
			       click : me.loadMainPanel
			   },*/
			   'mng_CaterialPricePurchase #grd_CaterialPrice' : {
			      selectionchange : function(grid,rec){
			         if (rec.length > 0) {
			         	  me.bzStore.load({params:{clhh:rec[0].get('clhh')}})
			              me.vpStore.load({params:{clhh:rec[0].get('clhh')}});
			         }
			      },
			      itemdblclick : function(grid, rec) {
			      	}
			   },
			   'mng_CaterialPricePurchase #grd_VendorPriceCtl' : {
			       itemdblclick : function(grid, rec) {
			      	me.EdtPriceCtl('btn_cl_edt')
			      	}
			   },
			   'edtbth_CaterialPrice button':{
			        click : me.btnEditByBatch		
			   },
			   'edt_VendorPrice' :{
			         afterrender : function(th){
			         	me.panel.down('#top_bar').disable();
			         	me.grdmain.disable();
			         	me.panel.can_use_btn=false;
			         },
			         beforedestroy:function(th){
			           me.panel.down('#top_bar').enable();
			           me.grdmain.enable();
					   me.panel.can_use_btn=true;
					   var sel_rec=me.grdmain.getSelectionModel().getSelection()[0];
					   me.grdmain.getSelectionModel().select(sel_rec);
			         }
			   },
			   'edt_VendorPrice button': {
			       click : me.doEditAction
			   },
			   'mng_CaterialPricePurchase #grd_VendorDescripeDetial' : {
			        itemdblclick : function(grid, rec) {
			      	   me.EdtPriceCtl('btn_vp_edt')
			      	}
			   },
			   'mng_CaterialPricePurchase #grd_VendorDescripe' : {
			     selectionchange : function(grid,rec){
			         if (rec.length > 0) {
			         	  Ext.apply(me.mpStore.proxy.extraParams,{
			         	  csbh:rec[0].get('csbh'),
			              gdbj:rec[0].get('gdbj')
			         	  })
			              me.mpStore.load();
			         }
			      },
			      itemdblclick : function(grid, rec) {
			      	}
			   }
			}
			
			);
			me.isInited = true;
       },
       doAction : function(btn){
           var me = this;
           var mng_VendorPriceCtl = me.getCaterialPricePurchase();
          /* var grd_detial = mng_VendorPriceCtl.down('#grd_CaterialPrice');
           */
           /*  
           var grd_VendorPriceCtl = mng_VendorPriceCtl.down('#grd_VendorPriceCtl');
           */
           var vpStore = mng_VendorPriceCtl.vpStore;
           var form = mng_VendorPriceCtl.down('form');
           
           switch(btn.itemId){
              /*  case 'btn_cl_add' :
                case 'btn_cl_edt' : 
                case 'btn_del' :*/
                case  'btn_cl_add':
                this.EdtPriceCtl(btn.itemId);
                break;
               /* var  newrec = Ext.create('erp.master.caterialPricePurchase.store.VendorPriceCtl',{
                });
                vpStore.add(newrec);*/
                case 'btn_cl_edt' : 
                this.EdtPriceCtl(btn.itemId);
                break;
                case 'btn_vp_add' :
                this.EdtPriceCtl(btn.itemId);
                break;
                case 'btn_vp_edt' :
                this.EdtPriceCtl(btn.itemId);
                break;
                case 'btn_cl_del':
                this.Delete(btn.itemId);
                break;
                case 'btn_vp_del' :
                this.Delete(btn.itemId);
                break;
                case 'btn_cl_sp' : 
                this.CompanyAppro();
                break;
                case 'btn_appro':
                this.doAppro();
                break;
                case 'refresh' : 
                if( me.maintab == 0){ 
                /*delete me.southStore.proxy.extraParams.condition;*/
			    me.grdStore.loadPage(1);
			   	}else if( me.maintab == 1){
			   	/*delete me.mpStore.proxy.extraParams.condition;*/
			   	me.vptStore.loadPage(1);
			   	} 
			   	break; 				    
                case 'BTN_SAVE':
                this.doComit();
                break;
                case 'btn_query':
                var sel_recs=me.grdmain.getSelectionModel().getSelection(); 
                   if(sel_recs.length==0){
		          	Ext.Msg.alert('提示','请先选中一条记录');
			        return;
		          }
                me.clhh = sel_recs[0].get('clhh');
                var win = Ext.widget('Query_VendorPrice',{
                    itemId:'Query_VendorPrice',
					mainstore:me.southStore,
					mainview:me.panel,
					rec:me.query_rec,
					clhh: me.clhh
                });
                   win.show();
				   break;
				case  'btn_vp_query':
				var sel_recs=me.grdVp.getSelectionModel().getSelection(); 
				 if(sel_recs.length==0){
		          	Ext.Msg.alert('提示','请先选中一条记录');
			        return;
		          }
		          me.csbh = sel_recs[0].get('cshh');
		          var win = Ext.widget('Query_MaterialPrice',{
                    itemId:'Query_MaterialPrice',
					mainstore:me.clStore,
					mainview:me.panel,
					rec:me.mquery_rec,
					cshh: me.cshh
                });
                 win.show();
                 break;
                case  'BTN_HISTORY':
			       var store =  me.grdStore;
			       var recs = me.grdmain.getSelectionModel().getSelection();
			       if(btn.getText()=='历史档案'){
			            btn.setText('档案');
			            if(me.maintab == 0){
			            Ext.apply(store.proxy.extraParams,{gdbj:1});
			            store.load()
			            } 
		             else if(me.maintab == 1){
		                  Ext.apply(me.vpStore.proxy.extraParams,{gdbj:1}); 
		                  me.vpStore.load()}
			       }else{
			           btn.setText('历史档案');
			           if(me.maintab == 0){
			            Ext.apply(store.proxy.extraParams,{gdbj:0});
			            store.load()
			            }
		             else if(me.maintab == 1){
		                Ext.apply(me.vpStore.proxy.extraParams,{gdbj:0}); 
		                me.vpStore.load()
		                }
		             //根据权限设置按钮显示，未完成
			       }
			       break;
                case 'btn_pricerefresh' : 
			      this.refreshPrice();
			      break;
                case 'btn_batch':
                  this.doModify();
                  break;
                case 'btn_hisprice': 
                  this.getHisPrice(btn.itemId);
                  break;
                case 'btn_enquiry':
                  this.getHisPrice(btn.itemId);
                  break;

       }
    },
    //加载
    /*loadMainPanel : function(btn){
      	  var me=this; 
      	  var panel = 
      	  switch(btn.itemId){
      	  case 'btn_confirm' :	  
          var store =  Ext.create('erp.master.caterialPricePurchase.store.CaterialPricePurchase');
          var treepanel=me.getTreepanel();
          var rec=treepanel.getSelectionModel().getSelection()[0];
          var lbbh = rec.get('nodeId');
           var win = me.getChooseMaterialClass();
           win.close();
           var panel = erp.Util.addContentTab({
                 xtype:'mng_CaterialPricePurchase',
                 itemId : 'CaterialPricePurchase',
                 title: '材料采购价格管理',
                  store:store.load({
                    params :{
                    	lbbh : lbbh,
                    	usePaging:true
                    }
                 }),
                 lbbh : lbbh,
                 closable : true 
         });
       }
    },*/
     Delete : function(type){
          var me =this;
           switch(type){
            case 'btn_vp_del': 
             var sel_recs = me.csSouth.getSelectionModel().getSelection();
             var clStore = me.clStore;
             var store = me.grdStore;
            if(Ext.isEmpty(sel_recs)){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		     }
		 Ext.Msg.confirm("提示","是否确认删除该控制单价?",function(btn){
		 	if (btn=="yes"){
		       var recordData = "["; //参数
			  var a=false;
			  Ext.each(sel_recs, function(rec) {
				if (a) {
				recordData += ",";
				}
				recordData += Ext.encode(rec.data);
				  a = true;
				});
				recordData += "]";
				var result = erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=deleteCtrlPrice',{recordData : recordData})
		        var data = Ext.decode(result);
		                Ext.getBody().unmask();
		                if(data.bool == false){
		                   Ext.Msg.alert('提示',data.msg);
			               return ;
		                }
		          clStore.reload(); 
		          store.reload();
		       }
		    }
		   );
		   break;
		   case 'btn_cl_del': 
		    var sel_recs = me.grdSouth.getSelectionModel().getSelection();
            var vpStore = me.vpStore;
            var store = me.grdStore;
            if(Ext.isEmpty(sel_recs)){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		     }
		 Ext.Msg.confirm("提示","是否确认删除所选记录的控制单价?",function(btn){
		   if (btn=="yes"){
		      var recordData = "["; //参数
			  var a=false;
			  Ext.each(sel_recs, function(rec) {
				if (a) {
				recordData += ",";
				}
				recordData += Ext.encode(rec.data);
				  a = true;
				});
				recordData += "]";
				var result = erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=deleteCtrlPrice',
				{recordData : recordData})
		        var data = Ext.decode(result);
		                Ext.getBody().unmask();
		                if(data.bool == false){
		                   Ext.Msg.alert('提示',data.msg);
			               return ;
		                }
		          vpStore.reload(); 
		          store.reload();
		     }
		 });
		   break;
  		 }
     },
     
     //Excl导入
     menuOpButton :function(menu,btn){
           var me=this; 
           var grid = me.grdmain;
           var store = me.grdStore;
           var czym=erp.Util.currentUser.userInfo.name;
           switch (btn.itemId){
           	   //材料控价导入
               case 'btn_Impkj' : 
                  var win=Ext.create('erp.view.purchaseUrge.window.UpFile');
                  win.down('#btn_save').on({
                       click : function(btn) {
                          var win = btn.up('window');
						  var form = win.down('form');
						  form.submit({
						      url : 'caterialpricepurchase/updateMaterialCtrlPriceFromExcel.act',
						      method : 'POST',
							  params : {
							  	newFileName : 'MaterialCtrlPriceImp',
							  	loginId : erp.Util.currentUser.userInfo.login_id,
								czym:czym
							  },
							  waitMsg : '正在上传解析文件...',
							  success : function(form, action){
							      Ext.Msg.alert('提示', action.result.msg);
							      store.reload();
								  win.close();
							  },
							  failure : function() {
								Ext.Msg.alert("提示", "文件保存失败");
							 }
						  });
                       }
                  })
                  win.show();
           break;
           case 'btn_Impcs' : 
                  var csStore = me.vptStore;
                  var mpStore = me.mpStore;
                  var win=Ext.create('erp.view.purchaseUrge.window.UpFile');
                  
                  win.down('#btn_save').on({
                       click : function(btn) {
                          var win = btn.up('window');
						  var form = win.down('form');
						  form.submit({
						      url : 'caterialpricepurchase/updateMaterialVendorCtrlPriceFromExcel.act',
						      method : 'POST',
							  params : {
							  	newFileName : 'MaterialVendorCtrlPriceImp',
							  	loginId : erp.Util.currentUser.userInfo.login_id,
								czsj : new Date(),
								czym:czym
							  },
							  waitMsg : '正在上传解析文件...',
							  success : function(form, action){
							      Ext.Msg.alert('提示', action.result.msg);
							      if(me.maintab==1){
							      csStore.reload();
							      mpStore.reload();
							      }
								  win.close();
							  },
							  failure : function() {
								Ext.Msg.alert("提示", "文件保存失败");
							 }
						  });
                       }
                  })
                    win.show();
           break;
           }
     },
     
     EdtPriceCtl : function(type){
           var me = this;
           var rec;
           var isAdd=isEdit=false;
           var isCl=isVp=false;
          switch(type){
                case 'btn_cl_add':
                  isAdd=true;
			      isEdit=false;
			      isCl=true;
			    var sel_recs = me.grdmain.getSelectionModel().getSelection()[0];
                if(Ext.isEmpty(sel_recs) ){
		          	Ext.Msg.alert('提示','请先选中一条记录');
			        return;
		          }
			      var clhh = sel_recs.get('clhh');
			      var clmc = sel_recs.get('clmc');
			      var rec = Ext.create('erp.master.caterialPricePurchase.model.VendorPriceCtl',
			         {clhh : clhh,
			          clmc : clmc});/*}
			      else if(sel_vendor.length!=0){
			      var csbh = sel_vendor.get('csbh');
			      var csmc = sel_vendor.get('csmc');
			      var rec = Ext.create('erp.master.caterialPricePurchase.model.VendorPriceCtl',
			        {csbh : csbh,
			         csmc : csmc}); 
			      }  */
			      break;
			    case 'btn_cl_edt':
			         isCl=true;
			         var sel_recs = me.grdmain.getSelectionModel().getSelection()[0];
                   if(Ext.isEmpty(sel_recs) ){
		          	Ext.Msg.alert('提示','请先选中一条记录');
			        return;
		          }
			      rec = me.grdSouth.getSelectionModel().getSelection()[0];
			      break;
                case  'btn_vp_add' :
                  isAdd=true;
			      isEdit=false;
			      isVp=true;
			    var sel_recs = me.grdVp.getSelectionModel().getSelection()[0];
                if(Ext.isEmpty(sel_recs)){
		          	Ext.Msg.alert('提示','请先选中一条记录');
			        return;
		          }
		          var csbh = sel_recs.get('csbh');
			      var csmc = sel_recs.get('csmc');
			      var rec = Ext.create('erp.master.caterialPricePurchase.model.VendorPriceCtl',
			        {csbh : csbh,
			         csmc : csmc}); 
			         break;
			     case 'btn_vp_edt' : 
			      isVp=true;
			      var sel_recs = me.grdVp.getSelectionModel().getSelection()[0];
                if(Ext.isEmpty(sel_recs) ){
		          	Ext.Msg.alert('提示','请先选中一条记录');
			        return;
		          }
		           rec = me.csSouth.getSelectionModel().getSelection()[0];
                   break;
              }
           if(Ext.isEmpty(rec)){
			   Ext.Msg.alert('提示','请先选中一条记录');
			   return;
		   } 
		   var win =Ext.widget('edt_VendorPrice',{
		       itemId : 'edt_VendorPrice',
		       title : '材料价格编辑',
		       isAdd : isAdd,
			   isEdit : isEdit,
			   isCl : isCl,
			   isVp : isVp,
			   rec:rec[0],
			   store: me.southStore
		   });
		   win.loadData(rec,isAdd,isEdit,isCl,isVp);
		   win.show();
     },
    
       //审批
     doAppro : function(){
          var me = this;
          if(me.maintab==0){
          var sel_recs=me.grdmain.getSelectionModel().getSelection();
          if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		 }
		 for(var i=0;i<sel_recs.length-1;i++){
		 	if(sel_recs[i].get('spbj_kj')!=sel_recs[i+1].get('spbj_kj')){
		 	      Ext.Msg.alert('提示','请选择相同审批状态的材料进行操作！');
				    return; 
		 	}
		 }
          var idarray=[];
		  var statusarray=[];
		  for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('clhh'));
			statusarray.push(sel_recs[i].get('spbj_kj'));
		}
		var status = sel_recs[0].get('spbj_kj');
		var alertmsg="";
		if(status==0){
			alertmsg="是否审批所选材料?";
		}else if(status==1){
			alertmsg="是否取消审批所选材料?";
		}else{
			Ext.Msg.alert('提示','操作无效');
			return;
		}
		Ext.Msg.confirm("提示",alertmsg,function(btn){
		if(btn=="yes")
		{
			erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=doAppro',{
			    idarray:idarray.join(','),
			    spsj_kj:new Date(),
			    sprm_kj:erp.Util.currentUser.userInfo.name,
			    spbj_kj:(status==0?1:0)
			});
			me.grdStore.reload();
		}
     })}
       else if(me.maintab==1){
          var sel_recs=me.csSouth.getSelectionModel().getSelection();
          if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		 }
		 for(var i=0;i<sel_recs.length-1;i++){
		 	if(sel_recs[i].get('spbj_kj')!=sel_recs[i+1].get('spbj_kj')){
		 	      Ext.Msg.alert('提示','请选择相同审批状态的材料进行操作！');
				    return; 
		 	}
		 }
          var idarray=[];
          var bharray=[];
		  var statusarray=[];
		  for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('clhh'));
			bharray.push(sel_recs[i].get('csbh'));
			statusarray.push(sel_recs[i].get('spbj_kj'));
		}
		var status = sel_recs[0].get('spbj_kj');
		var alertmsg="";
		if(status==0){
			alertmsg="是否审批所选材料?";
		}else if(status==1){
			alertmsg="是否取消审批所选材料?";
		}else{
			Ext.Msg.alert('提示','操作无效');
			return;
		}
		Ext.Msg.confirm("提示",alertmsg,function(btn){
		if(btn=="yes")
		{
			erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=doVpAppro',{
			    idarray:idarray.join(','),
			    bharray:bharray.join(','),
			    spsj_kj:new Date(),
			    sprm_kj:erp.Util.currentUser.userInfo.name,
			    spbj_kj:(status==0?1:0)
			});
			me.clStore.reload();
		}
     })         
        }
     },
       CompanyAppro : function(){
         var me = this;
         var grid = me.getGrdVendorPriceCtl();
         var sel_recs = grid.getSelectionModel().getSelection();
         if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		 }
		 for(var i=0;i<sel_recs.length-1;i++){
		 	if(sel_recs[i].get('spbj_kj')!=sel_recs[i+1].get('spbj_kj')){
		 	      Ext.Msg.alert('提示','请选择相同审批状态的材料进行操作！');
				    return; 
		 	}
		 }
          var idarray=[]; 
          var bharray=[];
          for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('csbh'));
		    bharray.push(sel_recs[i].get('clhh'));
		  }
		  var status = sel_recs[0].get('spbj_kj');
		  var alertmsg="";
		  if(status==0){
			 alertmsg="是否审批所选厂商控价?";
		  }else if(status==1){
			 alertmsg="是否取消审批所选厂商控价?";
		  }else{
			 Ext.Msg.alert('提示','操作无效');
			 return;
		   }
		   Ext.Msg.confirm("提示",alertmsg,function(btn){
		if(btn=="yes")
		{
			erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=doCompanyAppro',{
			    idarray:idarray.join(','),
			    bharray:bharray.join(','),
			    spsj_kj:new Date(),
			    sprm_kj:erp.Util.currentUser.userInfo.name,
			    spbj_kj:(status==0?1:0)
			});
			}
			me.vpStore.reload();
		  })
       },
       
       
       doModify : function(){
	      var grid = this.getGrdCaterialPrice();
	       var rec = grid.getSelectionModel().getSelection();
	      if(Ext.isEmpty(rec)){
			Ext.Msg.alert('提示','请先选中至少一条记录');
			return;
		 }
		  for(x in rec){
		  if(rec[x].get('spbj_kj') == "1"){
		        Ext.Msg.alert("Tips", "已经控价审批的材料不允许使用批量修改!");
			    return;
		  }}
		  var win = Ext.widget('edtbth_CaterialPrice',{
	           itemId: 'edtbth_CaterialPrice',
	           rec : rec
	      });
	      win.show();
	      },
	doEditAction : function(btn,rec_recs) {
		var me = this;
		switch (btn.itemId) {
			case 'BTN_SAVE' :
				var edt_VendorPrice = me.getEdtVendorPrice();
	            var form = edt_VendorPrice.down('form');
	            var sel_recs=null;
	            var rec = form.getRecord(); 
	            form.updateRecord(rec);
	            var clhh = rec.get('clhh');
	            var csbh = rec.get('csbh');
	            if(me.maintab==0){
	             sel_recs = me.grdmain.getSelectionModel().getSelection()[0];
	             if(csbh=='' || csbh==null){
	                 Ext.Msg.alert('提示','厂商名称不能为空!');
	                 return
	              }
				 }
	            else if(me.maintab==1){
	              sel_recs = me.grdVp.getSelectionModel().getSelection()[0];
	              if(clhh=='' || clhh==null){
	                 Ext.Msg.alert('提示','材料名称不能为空!');
	                 return
	              }
	            }  
	             var s_add =  edt_VendorPrice.isAdd;
	             var s_count = 0;
	             var sql = "select count(*)  from csjjb where clhh='"+clhh+"' and csbh='"+csbh+"';"
	             var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
			     if (!data.bool) {
					 Ext.toastErrorInfo(data.msg);
					 return;}
			    if(data.val!=null){
				s_count = data.val;
				}
				if(s_add==true){
				   if(s_count>0){
				   	  Ext.Msg.alert('提示','该产品+该厂商的控制单价已存在!');
				   	  return;
				   }
				}else if(s_count>1){
					Ext.Msg.alert('提示','该产品+该厂商的控制单价已存在!')
				}
				var isCl = edt_VendorPrice.isCl;
				var isVp = edt_VendorPrice.isVp;
				if (form.getForm().isValid() && form.getForm().isDirty()) {
					// Ext.data.Model 实例.
					Ext.Msg.confirm('提醒', '保存信息到数据库?', function(btn) {
						if (btn == "yes") {
							Ext.Ajax.setTimeout(120000);
		                    Ext.getBody().mask('正在进行保存，请等待......');
							if (form.store.indexOf(rec) < 0) {
								rec.set('czym',erp.UInfo.currentUser.name)//操作员
								rec.set('czsj',new Date())
								form.store.add(rec);
								var win = me.getEdtVendorPrice();
								win.close();
								form.store.sync({
									success : function(e, batch) {
										  erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=addCsjjxxb',{
										    csbh : csbh, clhh : clhh
										  })
										  if(isCl){
										  form.store.reload({
	  	                                    params : {
	  	                                       clhh : sel_recs.get('clhh')
	  	                                      }
	  	                                  });
	  	                                  }else if(isVp){
	  	                                  me.mpStore.reload({
	  	                                    params : {
	  	                                       csbh : sel_recs.get('csbh')
	  	                                      }
	  	                                  });
	  	                                  }
	  	                                Ext.getBody().unmask();  
										Ext.Msg.alert('Tips', '保存成功!');
									},
									failure : function(batch, options) {
										Ext.getBody().unmask();
										Ext.Msg.alert('Tips', '保存失败!');
									}
								});
							} else {
								form.updateRecord(rec);
								/*form.store.update(rec);*/
								var values = me.getEdtVendorPrice().getData();
								var clhh = values.clhh;
								var csbh = values.csbh;
								var kzdj = values.kzdj;
								var ghzq = values.ghzq;
								var zxbzl = values.zxbzl;
								var zdcgl = values.zdcgl;
								var csxh = values.csxh;
								var bzsm = values.bzsm;
								var fzkj = values.fzkj;
								rec.set('clhh',clhh,
								        'csbh',csbh,
								        'kzdj',kzdj,
								        'fzkj',fzkj,
								        'ghzq',ghzq,
								        'zxbzl',zxbzl,
								        'zdcgl',zdcgl,
								        'csxh',csxh,
								        'bzsm',bzsm)
								  rec.set('czym',erp.UInfo.currentUser.name)//操作员
								  rec.set('czsj',new Date())
								            
								var win = me.getEdtVendorPrice();
								win.close();
								form.store.sync({
									success : function(e, batch) {
										erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=addCsjjxxb',{
										    csbh : csbh, clhh : clhh
										  })
										if(isCl){  
										  form.store.reload({
	  	                                    params : {
	  	                                       clhh : sel_recs.get('clhh')
	  	                                      }
	  	                                  });
	  	                                }else if(isVp){
	  	                                  me.mpStore.reload({
	  	                                    params : {
	  	                                       csbh : sel_recs.get('csbh')
	  	                                      }
	  	                                  });
	  	                                  }
	  	                                Ext.getBody().unmask();  
										Ext.Msg.alert('Tips', '保存成功!');
									},
									failure : function(batch, options) {
										Ext.getBody().unmask();
										Ext.Msg.alert('Tips', '保存失败!');
									}
								});
							}
						}
					});
				}
				break;
		}
	},

	  btnEditByBatch : function(btn){
        var me = this;
        var win = me.getBtnEdtCaterialPrice();
        if(btn.action == "BTN_SAVE"){
           var values = me.getBtnEdtCaterialPrice().getData();
         
           var kzdj = values.kzdj;
           var fzkj = values.fzkj;
           var jhdj = values.jhdj;
           var qssxsj = win.getQssx();
           var jzsxsj = win.getJzsx();
           var grid = me.getGrdCaterialPrice();
           var recs = grid.getSelectionModel().getSelection();
           var yskzdj;var ysfzkj; var clhh; var ysjhdj;
           Ext.each(recs, function(rec){
           	    yskzdj = rec.get('kzdj');
           	    ysfzkj = rec.get('fzkj');
           	    clhh = rec.get('clhh');
           	    ysjhdj = rec.get('jhdj');
                if( kzdj != ""){
                    rec.set('kzdj',kzdj)};
                if( fzkj != "")
                    rec.set('fzkj',fzkj);
                if( jhdj != "")
                    rec.set('jhdj',jhdj);
                if( qssxsj !=""){
                    rec.set('qssxsj',qssxsj);}
                if( jzsxsj !=""){
                    rec.set('jzsxsj',jzsxsj);}
                //修改记录且标准单价不同于原来时，clcbdjjlb中形成一条记录    
                if( kzdj != "" && fzkj != "" ){
                    if(kzdj!=yskzdj || fzdj!=ysfzdj || jhdj!=ysjhdj){
                    	if(jhdj==""){
                    	   jhdj=0;
                    	}
                        var sql = "insert into clkzdjjlb(clhh,kzdj,fzkj,jhdj) values("+clhh+","+kzdj+","+fzkj+","+jhdj+");";
                        var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
					    var data = Ext.decode(result);
				        if (!data.bool) {
					         Ext.toastErrorInfo(data.msg);
					         return;
				        }
                    }else{
                       if(kzdj != ""){
                           if(kzdj!=yskzdj){
                              var sql = "insert into clkzdjjlb(clhh,kzdj) values("+clhh+","+kzdj+");";
                              var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						        {sql : sql});
					          var data = Ext.decode(result);
				              if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				               }
                           }
                       }
                       if(fzkj != ""){
                          if(fzkj != ysfzkj){
                              var sql = "insert into clkzdjjlb(clhh,fzkj) values("+clhh+","+fzkj+");";
                              var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						        {sql : sql});
					          var data = Ext.decode(result);
				              if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				               }
                          }
                       }
                       if(jhdj !=""){
                          if(jhdj!=ysjhdj){
                             var sql = "insert into clkzdjjlb(clhh,jhdj) values("+clhh+","+jhdj+");";
                              var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						        {sql : sql});
					          var data = Ext.decode(result);
				              if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				               } 
                          }
                       }
                    }
                }    
           });
           if(kzdj!= "" || fzkj != "" || jhdj !=""){
           Ext.each(recs,function(rec){
               if(!Ext.isEmpty(values)){
                  rec.set('jjczym',erp.UInfo.currentUser.name);
                  rec.set('jjczsj',new Date())
               }
            });
           }
           win.close();
           me.grdStore.sync();
		   me.grdStore.reload();
		   Ext.Msg.alert('Tips', '保存成功!');
        }
  },
      getHisPrice : function(type){
          var me = this;
      	  var grid = this.getGrdCaterialPrice();
	      var rec = grid.getSelectionModel().getSelection()[0];
	      if(Ext.isEmpty(rec)){
	      var bgrid = this.csSouth;
	      rec = bgrid.getSelectionModel().getSelection()[0];
	      }
	      if(Ext.isEmpty(rec)){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
	      }	
	      switch(type){
	         case 'btn_hisprice' :
		     me.clhh = rec.get('clhh');
		     var clmc = rec.get('clmc');
             var win = Ext.widget('mng_HisPrice',{
                    itemId:'mng_HisPrice',
					clhh: me.clhh,
					usePaging:true,
					title : '历史价格查询 【'+clmc+'】'
                });
             break;
            case 'btn_enquiry'  : 
              me.clhh = rec.get('clhh');
             var hpStore = Ext.create('erp.master.caterialPricePurchase.store.PurchasePrice');
             var bjStore = Ext.create('erp.master.caterialPricePurchase.store.HistroyQuote');
             var kjStore = Ext.create('erp.master.caterialPricePurchase.store.HistoryPriceCtl');
             var win = Ext.widget('mng_HistoryEnquiry',{
                    itemId:'mng_HistoryEnquiry',
					clhh: me.clhh,
					hpStore : hpStore,
					bjStore : bjStore,
					kjStore : kjStore,
					usePaging:true,
					title : '材料询价比价 【'+rec.get('clmc')+' 本次价格:'+rec.get('cbdj')+'】'
                });
            break;    
	      }
	         win.show();
      },
      //控价刷新
      refreshPrice : function(){
      	  var me = this;
          var store = me.grdStore;
       /*   var recs = me.grdmain.getSelectionModel().getSelection();
          if(recs==0){
		    Ext.Msg.alert('提示','请至少选择一条记录!');
			return;
		  }*/
		  Ext.Ajax.setTimeout(120000);
		  Ext.getBody().mask('正在进行刷新，请等待......');
		  var result = erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=getRefreshPrice')
		  var data = Ext.decode(result);
		  Ext.getBody().unmask();
		  if (data.bool == false) {
			Ext.Msg.alert('提示',data.msg);
			return ;
		  }
		  me.grdStore.loadPage(1);
      }
      
      
})