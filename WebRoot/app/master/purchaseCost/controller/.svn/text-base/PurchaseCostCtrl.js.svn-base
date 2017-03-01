Ext.define('erp.master.purchaseCost.controller.PurchaseCostCtrl',{
	 extend:  'Ext.app.Controller',
     requires : ['erp.ux.PagingBar',
                 'Ext.ux.TreePicker',
                 'Ext.window.MessageBox',
                 'erp.master.purchaseCost.store.PurchaseCost',
                 'erp.master.purchaseCost.model.QueryParam',
                 'erp.master.purchaseCost.model.purchaseCostSum',
                 'erp.master.purchaseCost.model.purchaseCostShare',
                 'erp.master.purchaseCost.model.PayCategory',
                 'erp.master.purchaseCost.model.BenefitDept',
                 'erp.master.purchaseCost.store.PayCategory',
                 'erp.master.purchaseCost.store.BenefitDept',
                 'erp.master.purchaseCost.store.PayCategoryTree',
                 'erp.master.purchaseCost.store.BenefitDeptTree',
                 'erp.view.master.perchasepriceadjust.store.AccountDeptTree',
                 'erp.master.prematerial.store.Companyname',
                 'erp.master.purchaseCost.store.Payfs',
                 'erp.master.purchaseCost.store.WarehouseCp'
                 ],
     views : ['erp.master.purchaseCost.view.TimeChooseWin',
              'erp.ux.ComboxTree',
              'erp.master.purchaseCost.view.PurchaseCostManger', 
              'erp.master.purchaseCost.view.EdtPurchaseCost',
              'erp.master.purchaseCost.view.PurchaseCostQuery',
              'erp.master.purchaseCost.view.EdtBthPurchaseCost',
              'erp.master.purchaseCost.view.UpPurchaseCostFile',
              'erp.payApply.view.SubmitObjectOam',
              'erp.master.purchaseCost.view.LossImp',
              'erp.master.purchaseCost.view.SendImp',
              'erp.master.purchaseCost.view.AbnormalImp',
              'erp.master.purchaseCost.view.CallinImp',
              'erp.master.purchaseCost.view.ImpDateChoose',
              'erp.master.purchaseCost.view.SendoutImp',
              'erp.master.purchaseCost.view.TransportCostImp',
              'erp.master.purchaseCost.view.ProductEntrustImp',
              'erp.master.purchaseCost.view.MaterialEntrustImp',
              'erp.master.purchaseCost.view.LoadingCostsImp',
              'erp.master.purchaseCost.view.TaskImp',
              'erp.master.purchaseCost.view.PatentImp',
              'erp.master.purchaseCost.view.SubmitObject'],
     refs : [{ref : 'TimeChoose',selector : 'win_TimeChoose'},
             {ref : 'PurchaseCostManger',selector : 'mng_PurchaseCost'},
             {ref : 'GrdPurchaseCost',selector : 'mng_PurchaseCost #grd_PurchaseCost'},
             {ref : 'TimeChooseForm',selector : 'win_TimeChoose #TimeChooseForm'},
             {ref : 'EdtPurchaseCost', selector: 'edt_PurchaseCost'},
             {ref : 'BthEdtPurchaseCost', selector:'edtbth_PurchaseCost'}],   
     init : function(){
        var me = this;
	     if (me.isInited)
			return;
			me.control({
			    'mng_PurchaseCost' : {
			    beforeclose:function(cmp){
			       var me = this;	
			       delete me.grdStore.proxy.extraParams.year;
			       delete me.grdStore.proxy.extraParams.month;
			    }, 
			    afterrender : function(){
			    	me.panel = me.getPurchaseCostManger();
			        me.grdmain = me.getGrdPurchaseCost();
			        me.grdStore = me.panel.store;
			        Ext.apply(me.grdStore.proxy.extraParams,{
		              year:me.panel.year,
		              month:me.panel.month,
		              /*hsbm : me.panel.hsbm,*/
		              usePaging:true});
			        /*me.grdStore.load();*/
			        me.year = me.panel.year;
			        me.month = me.panel.month;
			        me.bzStore = me.panel.bzStore;
			        me.fyStore = me.panel.fyStore;
			        me.ftStore = me.panel.ftStore;
			        me.fjStore = me.panel.fjStore;
			        me.query_rec=Ext.create('erp.master.purchaseCost.model.QueryParam');
			    }
			   },
			   'mng_PurchaseCost button' : {
			       click : me.doAction
			   },
			   'mng_PurchaseCost #menu_Btnupdate' : {
			      click:'InformationUp'
			   },
			   'mng_PurchaseCost #grd_PurchaseCost' : {
			     selectionchange : function(grid, rec) {
							if (rec.length > 0) {
								me.bzStore.load({params:{ fydh:rec[0].get('fydh')}});
								me.fyStore.load({params:{ fydh:rec[0].get('fydh')}});
								var fylx = rec[0].get('fylx');
								var cybh = rec[0].get('cybh');
								var fyje = rec[0].get('fyje');
								var fydh = rec[0].get('fydh');
								var ll_fydh = '';
								if(cybh!=''){
								var s_bj = 0;
								   if(Ext.String.trim(fylx)=='船务'){
								      var sql ="select min(fydh)  from cgfyb where cybh='"+cybh+"' and fylx='船务'; ";
	                                  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						                 {sql : sql});
		                              var data = Ext.decode(result);
		                              if(data.val!=null){
			                             ll_fydh = data.val;}	  
								      
								      if(ll_fydh == fydh){
								          s_bj = 1;
								          me.ftStore.load({params:{ cybh:cybh,fyje:fyje,bj:s_bj}});
								      }else{
								          s_bj = 0;
								      }
								   }else{
								      var sql ="select min(fydh)  from cgfyb where cybh='"+cybh+"' and fylx='单证'; ";
	                                  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						                 {sql : sql});
		                              var data = Ext.decode(result);
								      if(data.val!=null){
			                             ll_fydh = data.val;}	 
			                          if(ll_fydh == fydh){
								          s_bj = 1;
								          me.ftStore.load({params:{ cybh:cybh,fyje:fyje,bj:s_bj}});
								      }else{
								          s_bj = 0;
								      }  
								   } 
								}
								me.fjStore.load({params:{ fydh:rec[0].get('fydh')}});
							} else {
							}
						}, 
				itemdblclick : function(grid, rec) {
							me.EdtPurchaseCost('btn_edt');
						    
						}
				},
				'edt_PurchaseCost button':{
				           click:me.doEditAction
			   },
			    'edtbth_PurchaseCost button':{
			               click : me.btnEditByBatch		
			   },
			   //导入
			   'edt_PurchaseCost #menu_Btnlead' : {
			               click : me.doImpAction
			   }
			});
			me.isInited=true;
     },
	 doAction : function(btn){
	 	var me=this;
		if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}
	      switch(btn.itemId){
	           case 'btn_add' : 
	            this.EdtPurchaseCost(btn.itemId);
	            break;
	           case 'btn_edt' : 
	            this.EdtPurchaseCost(btn.itemId);
	            break;
	           case 'btn_del':
	            this.DeletePurchaseCost();
	            break;
	          case 'btn_commit' :
	            this.DoCommitPurchaseCost();
	            break;
	          case 'btn_appro':
	            this.ApproPurchaseCost();
	            break;
	          case 'btn_batch':
	            this.doModify();
	            break;
	          case 'maintenance' :
				var win = Ext.widget('SubmitObjectOam',{});
				win.show();
			    break;  
	          case 'btn_query':
	          var win=Ext.widget('win_PCQuery',{
					itemId:'win_PCQuery',
					mainstore:me.grdStore,
					mainview:me.panel,
					rec:me.panel.search
				});
				win.show();
				break;
	      }
	  },
	InformationUp : function(menu,btn){
	   var me = this;
	   var myMask = new Ext.LoadMask({
			target : me.panel
		});
	   var czy_gh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;	
	   var count=0;
	   var hsbm;
	   if(Ext.isEmpty(me.panel.hsbm)){
	      hsbm = 21;
	   }else{hsbm = me.panel.hsbm;}
	   switch(btn.itemId){
		case 'btn_update1' : 
		myMask.mask('正在进行更新，请等待......');   
		var sql ="select COUNT(*) from   tempdb..sysobjects where name='##khxx' and type='U'";
	    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		var data = Ext.decode(result);
		if(data.val!=null){
			count = data.val;}	 
		if(count>0){
		  sql = "drop table ##khxx";
		  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		}	
		sql=" SELECT	";
		sql+="	cgfyb.fydh,cgfyb.fyxh,";
		sql+="	case when isnull(jhmx_ddxxb.khbh,'') !='' then jhmx_ddxxb.khbh else";
		sql+="		case when  isnull(jhmxb.zjbh,0)!=0 then  c.khbh else '' end  end  as khbh,";
		sql+="	case when isnull(khxxb.khmc,'') !='' then khxxb.khmc else ";
		sql+="		case when  isnull(jhmxb.zjbh,0)!=0 then  d.khmc else '' end  end  as khmc";
		sql+=" into ##khxx from cgfyb with (nolock)";
		sql+=" left outer join jhmxb with(nolock) on jhmxb.jhbh=cgfyb.jhbh and jhmxb.jhxh=cgfyb.jhxh";
		sql+=" left outer join jhmxb a with (nolock) on a.jhbh=jhmxb.zjbh and a.jhxh=jhmxb.zjxh and jhmxb.zjbh!=0";
		sql+=" left outer join jhmx_ddxxb with (nolock) on jhmx_ddxxb.jhbh=jhmxb.jhbh and jhmx_ddxxb.jhxh=jhmxb.jhxh";
		sql+=" left outer join khxxb with (nolock) on khxxb.khbh=jhmx_ddxxb.khbh";
		sql+=" left outer join jhmx_ddxxb c with (nolock) on c.jhbh=a.jhbh and c.jhxh=a.jhxh";
		sql+=" left outer join khxxb d with (nolock) on d.khbh=c.khbh";
		sql+=" where year(fyrq)="+me.panel.year+" and month(fyrq)="+me.panel.month+"";
		sql+=" 	and (cgfyb.hsbm='' or (left(cgfyb.hsbm,len('"+hsbm+"')) = '"+hsbm+"' and exists (select * from hsbm_qxb where czy_gh = '"+czy_gh+"' and left(cgfyb.hsbm,len(hsbm_qxb.bmbh))=hsbm_qxb.bmbh)))";
		var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		myMask.unmask();
		me.grdStore.reload();
		break;
		case 'btn_update2' :
		myMask.mask('正在进行更新，请等待......');
		var sql ="select COUNT(*) from   tempdb..sysobjects where name='##yfbj' and type='U'";
	    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		var data = Ext.decode(result);
		if(data.val!=null){
			count = data.val;}	 
		if(count>0){
		  sql = "drop table ##yfbj";
		  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		}	
		
		sql = " SELECT	";
		sql+=" 	cgfyb.fydh,";
		sql+=" 	cgfyb.fyxh,";
		sql+=" 	case when (select count(*) from fksqspfyb left outer join fksqspb with (nolock) on fksqspb.sqbh=fksqspfyb.sqbh";
		sql+=" where fksqspb.tjbj=1 and fksqspfyb.fydh=cgfyb.fydh and (fksqspfyb.fyxh=cgfyb.fyxh or fksqspfyb.fyxh=cgfyb.cfxh))>0 then 1 else 0 end as yfbj";
		sql+=" into ##yfbj from cgfyb with (nolock)";
		sql+=" where year(fyrq)="+me.panel.year+" and month(fyrq)="+me.panel.month+"";
		sql+=" 	and (cgfyb.hsbm='' or (left(cgfyb.hsbm,len('"+hsbm+"')) = '"+hsbm+"' and exists (select * from hsbm_qxb where czy_gh = '"+czy_gh+"' and left(cgfyb.hsbm,len(hsbm_qxb.bmbh))=hsbm_qxb.bmbh)))";
		sql+="";
		var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		myMask.unmask();
		me.grdStore.reload()
		break;				    
		}					    
	},  
	doImpAction : function(menu,btn){
	    var me = this;
	    var view = me.getEdtPurchaseCost();
	    var store = view.mainstore;
	    var cgStore = view.cgStore;
	    var edt_PurchaseCost = me.getEdtPurchaseCost();
	  	var form = edt_PurchaseCost.down('#fyForm');
	    var frec =  form.getRecord();
	    var fydh = frec.get('fydh');
	  	form.updateRecord(frec);
	    switch(btn.itemId){
	        case 'btmn_shlead' : 
	           if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	           var store = Ext.create('erp.master.purchaseCost.store.OutMaterial');
	           var win = Ext.widget('Imp_Loss',{
	               store : store,
	               year : me.year,
	               month : me.month,
	               title : '损耗导入'
	           });
	           var maxxh;
	           var nrecs =new Array();
	           var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	           win.down('#btn_confirm').on({
	               click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   win.selStore.each(function(rec){
	                   var newRec  =  Ext.create('erp.master.purchaseCost.model.PurchaseCost');
	                   newRec.set('fydh',fydh);                      
	                   newRec.set('csbh',rec.get('csbh'));                      
	                   newRec.set('csmc',rec.get('csmc'));                      
	                   newRec.set('fyzy',rec.get('clmc'));                      
	                   newRec.set('fysl',rec.get('wrsl'));                      
	                   newRec.set('shdh',rec.get('shdh'));                      
	                   newRec.set('shxh',rec.get('shxh'));                      
	                   newRec.set('zzsl',0.17);                      
	                   newRec.set('fyxh',fyxh); 
	                   nrecs.push(newRec);
					   fyxh++;
	                  });
	                  
	                cgStore.add(nrecs);  
					win.close();
	               }
	           })
	           win.show();
	        break;
	        case 'btmn_rwlead' : 
	            if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	            if(Ext.String.trim(frec.get('fylx'))=='采购'){
	                if(me.panel.hasPay==1){
	                    return
	                }
	            }
	            var hsbm = frec.get('hsbm');
	            if(Ext.isEmpty(hsbm)){
	              hsbm='21'
	            }
	            var rwrecs = cgStore.data.items;
	            var recDate = "[";
		        var a=false;
		        Ext.each(rwrecs, function(rec) {
		          if(a){
		         	recDate += ",";
		          }
		          recDate += Ext.encode(rec.data);
		                a=true;
		          })
		        recDate += "]";
		        erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=beforeloadTaskImp',{
		           recDate : recDate
		        })
	            var win = Ext.widget('Imp_Task',{
	                 hsbm : hsbm,
	                 title : '任务导入'
	            })
	            var maxxh;
	            win.down('#btn_confirm').on({
	                 click : function(btn){
	                    var win = btn.up('window');
	                    var bool = false;
	                    var nrecs =new Array();
	                    var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1; 
	                    win.selStore.each(function(rec){
	                    var ybbh='';var cpth='';var zcpmc='';var bbbh='';var cpth;
	                    var zcpbh='';var bzgj = 0;var gjxs =0;var ftms = frec.get('ftms');
	                    var jhbh = 0; var jhxh = 0; var cpbh;
	                    jhbh =  rec.get('jhbh'); jhxh = rec.get('jhxh');
	                    cpbh = rec.get('cpbh'); 
	                    zcpbh = rec.get('zcpbh');
	                    gjxs = rec.get('gjxs'); bzgj = rec.get('bzgj');var wxdh = rec.get('rwdh');var wxxh = rec.get('rwxh')
	                  
	                    if(jhbh!=0 && jhxh!=0){
	                       var sql = "select bbbh  from jhdecpgxbbb where jhbh="+jhbh+" and jhxh="+jhxh+";"
	                       var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    bbbh = data.val;}
						    sql = "select cpth from cpgxdebbb where cpgxdebbb.cpbh="+cpbh+" and cpgxdebbb.bbbh='"+bbbh+"';"
						    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    cpth = data.val;}
						   if(Ext.String.trim(ybbh) == '' && (zcpbh !=null && Ext.String.trim(zcpbh)!= '')){ 
						    sql = "select ybbh  from cpgxdebbb where cpgxdebbb.cpbh="+cpbh+" and cpgxdebbb.bbbh='"+bbbh+"';"
						    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    ybbh = data.val;}
						   }
						    if(Ext.String.trim(cpth) == '' && (zcpbh !=null && Ext.String.trim(zcpbh)!= '')){
						       sql = "select cpth  from cpgxdebbb where cpgxdebbb.cpbh="+zcpbh+" and cpgxdebbb.bbbh='"+bbbh+"';";
						       var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						       {sql : sql});
						       var data = Ext.decode(result);
						       if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				                }
				                if(data.val!=null){
						        cpth = data.val;}
						       }
						    if(Ext.String.trim(ybbh) == ''&& (zcpbh !=null && Ext.String.trim(zcpbh)!= '')){
						       sql = "select ybbh from cpgxdebbb where cpgxdebbb.cpbh="+zcpbh+" and cpgxdebbb.bbbh='"+bbbh+"';";
						       var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						       {sql : sql});
						       var data = Ext.decode(result);
						       if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				                }
				                if(data.val!=null){
						        ybbh = data.val;}
						     }  
						    } 
	                    zcpmc = rec.get('zcpmc');
	                    var fyzy;
	                    if(Ext.String.trim(zcpmc)!='' && zcpmc!= null){
	                        if(Ext.String.trim(cpth)!= '' && cpth!=null){
	                          fyzy = ""+zcpmc+"\\"+ybbh+"("+cpth+")";
	                        }else{
	                          fyzy = ""+zcpmc+"\\"+ybbh+""
	                        }
	                    }else{
	                        if(Ext.String.trim(cpth)!='' && cpth!=null){
	                          fyzy = ""+rec.get('cpmc')+"\\"+ybbh+"("+cpth+")"
	                        }else{
	                          fyzy = ""+rec.get('cpmc')+"\\"+ybbh+""
	                        }
	                    }  
	                       var fydj = Ext.util.Format.round(rec.get('jsdj'),6);
	                       var fyje = Ext.util.Format.round(rec.get('drsl')*fydj,2);
	                       var csje = Ext.util.Format.round(fyje/1.17,2);
	                       var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                           fydh :  fydh,
	                       	   csbh :  rec.get('csbh'),
	                       	   csmc :  rec.get('csmc'),
	                           fyzy : fyzy,
	                           fysl : rec.get('drsl'),
	                           fydj : fydj,
	                           fyje : fyje,
	                           wxdh : rec.get('rwdh'),
	                           wxxh : rec.get('rwxh'),
	                           wxh  : rec.get('wxh'),
	                           jhbh : rec.get('jhbh'),
	                           jhxh : rec.get('jhxh'),
	                           jhh :  rec.get('jhbh')+'-'+rec.get('jhxh'),
	                           gxbh : rec.get('gxbh'),
	                           scgxmc : rec.get('gxmc'),
	                           bzsm : rec.get('bzsm'),
	                           jhbz : rec.get('jhbz'),
	                           kjbj : rec.get('kjbj'),
	                           fyxh : fyxh,
	                           ftxs : ftms == '分摊模式'?rec.get('bzgj'):0,
	                           csje : csje,
	                           csdj : rec.get('drsl')>0?Ext.util.Format.round(csje/rec.get('drsl'),6):0,
	                           zzse : fyje - csje,
	                           zzsl : 0.17
	                       })
	                       //修改就保存，不考虑主编辑界面是否保存
	                       /*var sql = "update scrwdmxb set gjxs="+gjxs+",jsdj=round(bzgj*"+gjxs+",4) where scrwdmxb.rwdh="+wxdh+" and scrwdmxb.rwxh="+wxxh+";"
	                       var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						       {sql : sql});
						       var data = Ext.decode(result);
						       if (!data.bool) {
					            Ext.toastErrorInfo('修改出现错误');
					            return;
				            } */
				            //导入之后不再出现在导入界面
				            /*sql = "insert into cgfygl_rwdr(rwdh,rwxh) values("+wxdh+","+wxxh+");";
				             var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						       {sql : sql});
						       var data = Ext.decode(result);
						       if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            } */
	                        nrecs.push(r);
								fyxh++;
	                      }) 
	                         cgStore.add(nrecs)
						     win.close();
	                     }
	                 })  
	            win.show();
	        break;
	        case 'btmn_dslead' :
	           if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	           var store = Ext.create('erp.master.purchaseCost.store.SendImp');
	           var win = Ext.widget('Imp_Send',{
	              store : store,
	              title : '递送导入'
	           });
	           var maxxh;
	            win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   var nrecs =new Array();
	                   var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1; 
	                   win.selStore.each(function(rec){
	                       var newRec=Ext.create('erp.master.purchaseCost.model.PurchaseCost');
	                       newRec.set('fydh',fydh);  
	                       newRec.set('fyzy',rec.get('sjdh')+'/'+rec.get('sjdw'));  
	                       newRec.set('bzsm',rec.get('wtrm')+' '+rec.get('jjrq'));  
	                       newRec.set('jlbh',rec.get('jlbh'));  
	                       newRec.set('fyje',rec.get('wdje'));  
	                       newRec.set('xslb',rec.get('xslb'));  
	                       newRec.set('csbh',rec.get('csbh'));  
	                       newRec.set('csmc',rec.get('csmc'));  
	                       newRec.set('jfzl',rec.get('jfzl'));  
	                       newRec.set('zzsl',0.17);  
	                       newRec.set('fffs',rec.get('fffs'));  
	                       newRec.set('fydj',rec.get('wdje'));  
	                       newRec.set('fydj',rec.get('wdje'));  
	                       newRec.set('fysl',1);  
	                       newRec.set('fyxh',fyxh);  
	                       newRec.set('csje',Ext.util.Format.round(rec.get('wdje')/(1.17),2));  
	                       newRec.set('csdj',Ext.util.Format.round(rec.get('wdje')/(1.17),6));  
	                       newRec.set('zzse',rec.get('wdje') - Ext.util.Format.round(rec.get('wdje')/(1.17),2));  
	                      	    nrecs.push(newRec);
								fyxh++;
	                    })  
	                          cgStore.add(nrecs)
						      win.close();
	                   }
	            })   
	           win.show();
	        break;
	       case  'btmn_yclead' :
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var store = Ext.create('erp.master.purchaseCost.store.AbnormalImp');
	           var win = Ext.widget('Imp_Abnormal',{
	              store : store,
	              title : '异常导入'
	           });
	           var nrecs =new Array();
	           var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	           win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   win.selStore.each(function(rec){
	                       var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                          fydh :  fydh,
	                          fyzy : rec.get('ycms'),
	                          ycdh : rec.get('ycdh'),
	                          jlxh : rec.get('jlxh'),
	                          ych : rec.get('ycdh')+'-'+rec.get('jlxh'),
	                          fyje : rec.get('ycje'),
	                          csbh : rec.get('csbh'),
	                          jhbh : rec.get('jhbh'),
	                          jhxh : rec.get('jhxh'),
	                          jhh : rec.get('jhbh')!=0?rec.get('jhbh')+'-'+rec.get('jhxh'):'',
	                          zzsl : 0.17,
	                          fyxh : fyxh,
	                          csmc : rec.get('csmc')
	                       })
	                          nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
						      win.close();
	                  }
	           })
	         win.show();
	       break;
	       case 'btmn_drlead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var store = Ext.create('erp.master.purchaseCost.store.CallinImp');
	          var win = Ext.widget('Imp_Callin',{
	             store : store,
	             title : '调入导入'
	          })
	          win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   var nrecs =new Array();
	                   var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	                   win.selStore.each(function(rec){
	                   	  var csje = Ext.util.Format.round(rec.get('wdje')/(1+0.17),2);
	                   	  var fysl = rec.get('wdtj');
	                      var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                          fydh :  fydh,
	                          fyzy : rec.get('cpmc'),
	                          fysl : fysl,
	                          fydj : rec.get('ysdj'),
	                          fyje : rec.get('wdje'),
	                          csje : csje,
	                          zzse : rec.get('wdje')-csje,
	                          csdj : fysl>0?Ext.util.Format.round(csje/fysl,6):0,
	                          ckbh : rec.get('dckh'),
	                          dcrq : rec.get('dcrq'),
	                          dbdh : rec.get('dbdh'),
	                          dbxh : rec.get('dbxh'),
	                          dbh :  rec.get('dbdh')+'-'+rec.get('dbxh'),
	                          dbxs : rec.get('dbxs'),
	                          ystj : rec.get('ystj'),
	                          bzsm : rec.get('bzsm'),
	                          sgtzh : rec.get('sgtzh'),
	                          zyrm : rec.get('zyrm'),
	                          zzsl : 0.17,
	                          fyxh : fyxh
	                      });
	                         nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
						      win.close();
	                }
	           })
	         win.show(); 
	       break;
	       case 'btmn_fhlead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var win = Ext.widget('win_ImpDate');
	          win.show();
	          win.down('#btn_confirm').on({
	             click : function(btn){ 
	          	  var iwin = btn.up('window');
	          	  var form  = win.down('#TimeChooseForm');
                  var values = win.getData();
                  var qsrq = win.getQsrq();
                  var jzrq = win.getJzrq();
                  win.close();
                  var store = Ext.create('erp.master.purchaseCost.store.SendoutImp');
                  var newwin = Ext.widget('Imp_Sendout',{
                       qsrq : qsrq,
                       jzrq : jzrq,
                       title : '发货导入',
                       store : store
                    })
                    newwin.down('#btn_confirm').on({
	                  click : function(btn){
	                var nrecs =new Array();
	                var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;  	
                    newwin.selStore.each(function(rec){
                    	var zzsl = 0.17;
                    	var csje = Ext.util.Format.round(rec.get('wtje')/(1+zzsl),2);
                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
                              fydh :  fydh,
                              fyzy : rec.get('cpmc'),
                              fysl : rec.get('wdtj'),
                              fhck : rec.get('ckbh'),
                              fhdh : rec.get('fhdh'),
                              fhxh : rec.get('fhxh'),
                              fhh : rec.get('fhdh')+'-'+rec.get('fhxh'),
                              bzsm : rec.get('bzsm'),
                              zzsl : 0.17,
                              fyxh : fyxh
                        })
	                         nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
                             newwin.close();
	                      }
                       })
                  newwin.show();
	          	}
	          })
	       break;
	       case 'btmn_clwtlead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var win = Ext.widget('win_ImpDate');
	          win.show();
	          win.down('#btn_confirm').on({
	             click : function(btn){ 
	          	  var iwin = btn.up('window');
	          	  var form  = win.down('#TimeChooseForm');
                  var values = win.getData();
                  var qsrq = iwin.getQsrq();
                  var jzrq = iwin.getJzrq();
                  win.close();
                  var store = Ext.create('erp.master.purchaseCost.store.MaterialEntrustImp');
                    var newwin = Ext.widget('Imp_MaterialEntrust',{
                          qsrq : qsrq,
                          jzrq : jzrq,
                          title : '材料委托导入',
                          store : store
                    })
                    newwin.down('#btn_confirm').on({
	                  click : function(btn){ 
	                var nrecs =new Array();
	                var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;    	
                    newwin.selStore.each(function(rec){
                    	var zzsl = 0.17;
                    	var csje = Ext.util.Format.round(rec.get('wtje')/(1+zzsl),2);
                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
                              fydh :  fydh,
                              csbh : rec.get('csjg'),
                              csmc : rec.get('csjgmc'),
                              fyzy : rec.get('clmc'),
                              fysl : rec.get('sjsl'),
                              fydj : rec.get('wtdj'),
                              fyje : rec.get('wtje'),
                              csje : csje,
                              zzse : rec.get('wtje') - csje,
                              csdj : rec.get('sjsl')>0?Ext.util.Format.round(csje/rec.get('sjsl'),6):0,
                              fhck : rec.get('ckbh'),
                              clwtdh : rec.get('wtdh'),
                              clwtxh : rec.get('wtxh'),
                              clwth : rec.get('wth'),
                              bzsm : rec.get('bzsm'),
                              zzsl : 0.17,
                              fyxh : fyxh
                        })
	                         nrecs.push(r);
								fyxh++;
	                    })
	                          cgStore.add(nrecs);
						      newwin.close();
	                      }
                       })
                    newwin.show();
                }
            })
	       break;
	       case 'btmn_cpwtlead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var win = Ext.widget('win_ImpDate');
	          win.show();
	          win.down('#btn_confirm').on({
	             click : function(btn){ 
	          	  var iwin = btn.up('window');
	          	  var bool = false;
	          	  var form  = win.down('#TimeChooseForm');
                  var values = win.getData();
                  var qsrq = iwin.getQsrq();
                  var jzrq = iwin.getJzrq();
                  win.close();
                  var store = Ext.create('erp.master.purchaseCost.store.ProductEntrustImp');
                  var newwin = Ext.widget('Imp_ProductEntrust',{
                          qsrq : qsrq,
                          jzrq : jzrq,
                          title : '产品委托导入',
                          store : store
                    })
                  var maxxh;  
                  newwin.down('#btn_confirm').on({
	                  click : function(btn){
	                var nrecs =new Array();
	                var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;    	
                    newwin.selStore.each(function(rec){
                        maxxh = cgStore.max('fyxh');
                        maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
                    	var zzsl = 0.17;
                    	var csje = Ext.util.Format.round(rec.get('wtje')/(1+zzsl),2);
                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
                              fydh :  fydh,
                              csbh : rec.get('csjg'),
                              fyzy : rec.get('cpmc'),
                              fysl : rec.get('sjsl'),
                              fydj : rec.get('wtdj'),
                              fyje : rec.get('wtje'),
                              csje : csje,
                              zzse : rec.get('wtje') - csje,
                              csdj : rec.get('sjsl')>0?Ext.util.Format.round(csje/rec.get('sjsl'),6):0,
                              fhck : rec.get('ckbh'),
                              cpwtdh : rec.get('wtdh'),
                              cpwtxh : rec.get('wtxh'),
                              cpwth : rec.get('wth'),
                              bzsm : rec.get('bzsm'),
                              zzsl : 0.17,
                              fyxh : fyxh
                        })
	                        nrecs.push(r);
								fyxh++;
	                    })
	                          cgStore.add(nrecs);
						      newwin.close();
	                      }
                       })
                       newwin.show();
                    }
	          })   
	       break;
	       case 'btmn_ysfylead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var store = Ext.create('erp.master.purchaseCost.store.TransportCostImp');
	          var win = Ext.widget('Imp_TransportCost',{
	             store : store,
	             title : '运输费用导入'
	          })
	          win.down('#btn_confirm').on({
	                click : function(btn){
	                	var win = btn.up('window');
	                    var bool = false;
	                    var nrecs =new Array();
	                    var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	                    win.selStore.each(function(rec){
	                    	var zccq=''; var zrcq='';
	                        zccq = rec.get('zccq');
	                        zrcq = rec.get('zrcq');
	                        var zccqmc = ''; var zrcqmc = '';
	                        var sql = "select cqmc from wms_cpcqmcb where cqbh="+zccq+";";
	                        var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    zccqmc = data.val;}
						    var sql = "select cqmc from wms_cpcqmcb where cqbh="+zrcq+";";
	                        var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    zrcqmc = data.val;}
	                        var wdje = rec.get('wdje');
	                        var fzsl = Ext.util.Format.round(rec.get('wdsl'),3);
	                        var csje = Ext.util.Format.round(wdje/(1+0.17),2);
	                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                          fydh :  fydh,
	                          fyzy : zccqmc+'->'+zrcqmc,
	                          fysl : rec.get('fysl'),
	                          fydj : rec.get('ysdj'),
	                          fyje : rec.get('wdje'),
	                          fydj : fysl!=0?Ext.util.Format.round(wdje/fysl,6):0,
	                          csje : csje,
	                          zzse : wdje-csje,
	                          fysl : rec.get('wdtj')>0?Ext.util.Format.round(csje/fysl,6):0,
	                          ysjldh_wms : rec.get('jldh'),
	                          ysjlxh_wms : rec.get('jlxh'),
	                          bzsm : rec.get('bzsm'),
	                          csbh : rec.get('csbh'),
                              zzsl : 0.17,
                              fyxh : fyxh
	                      });
	                        nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
						      win.close();
	                }
	                })
	         win.show(); 
	       break;
	       case 'btmn_zgfylead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var store = Ext.create('erp.master.purchaseCost.store.LoadingCostsImp');
	          var win = Ext.widget('Imp_LoadingCosts',{
	             store : store,
	             title : '装柜费用导入'
	          })
	           win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false; var wdfy; var wdtj; var fyzy;
	                   var nrecs =new Array();
	                   var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	                   win.selStore.each(function(rec){
	                        fyzy = rec.get('zgh');
	                        wdtj = rec.get('wdtj');
	                        wdfy = rec.get('wdfy');
	                        var csje = Ext.util.Format.round(wdfy/(1+0.17),2)
	                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                        fydh :  fydh,
	                        fyzy : fyzy,
	                        fysl : wdtj,
	                        fyje : wdfy,
	                        fydj : wdtj!=0?Ext.util.Format.round(wdfy/wdtj,6):0,
	                        csje : csje,
	                        zzse : wdfy - csje,
	                        csdj : wdtj>0?Ext.util.Format.round(csje/wdtj,6):0,
	                        zgbh : rec.get('zgbh'),
	                        zgxh : rec.get('zgxh'),
	                        zgfyxh : rec.get('fyxh'),
	                        csbh : rec.get('csbh'),
                            zzsl : 0.17,
                            fyxh : fyxh,
                            csmc : rec.get('csmc')
	                        })
	                        nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
						      win.close();
	                  }
	                })
	             win.show();   
	       break;  
	       case 'btmn_zlfylead' : 
	          var recs = cgStore.data.items;
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
	          var win = Ext.widget('Imp_Patent',{
	             recordData : recordData,
	             title : '专利费用导入'
	          })
	           var maxdhxh; 
	           win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false; 
	                   var nrecs =new Array();
	                   var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	                   win.selStore.each(function(rec){
	                   	  var wbbh = rec.get('wbbh') 
	                   	  if(wbbh=='' || wbbh ==null ||wbbh =='60' ){ 
	                      var r  = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                         fydh :  fydh,
	                         fyxh : fyxh,
	                         fyzy : '专利费',
	                         zlrkdh : rec.get('rkdh'),
	                         zlrkxh : rec.get('rkxh'),
	                         rkh : rec.get('rkh'),
	                         htbh : rec.get('htbh'),
	                         htxh : rec.get('htxh'),
	                         hth : rec.get('hth'),
	                         zlckbh : rec.get('ckbh'),
	                         csbh : rec.get('zlcsbh'),
	                         csmc : rec.get('zlcsmc'),
	                         fysl : rec.get('fzsl'),
	                         wbbh : wbbh,
	                         fydj : rec.get('zldj'),
	                         fyje : rec.get('zlje'),
	                         zzsl : 0.17,
	                         csje : rec.get('zlje'),
	                         csdj : Ext.util.Format.round((rec.get('zlje')/(1+0.17))/rec.get('fzsl'),6)
	                       })
	                      }else{
	                       var wbhl;
	                       var sql = "select wbhl  from wbhlb where nf=YEAR(GETDATE()) and yf = MONTH(GETDATE()) and wbbh = "+wbbh+";";
	                       var result = erp.Const.callServiceMethodSync(
						    'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
						    sql:sql
					       });
					       var data = Ext.decode(result);
					       if (!data.bool) {
						     Ext.toastErrorInfo(data.msg);
						   return;
					       }else{
					         wbhl = data.val
					       }
					       var fzsl = rec.get('fzsl'); var wbje = rec.get('zlje');
					       var hsje_wb = wbhl*wbje;//含税金额
	                       var hsdj_wb = hsje_wb/fzsl;//含税单价
					       var r  = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                         fydh :  fydh,
	                         fyzy : '专利费',
	                         fyxh : fyxh,
	                         zlrkdh : rec.get('rkdh'),
	                         zlrkxh : rec.get('rkxh'),
	                         rkh : rec.get('rkh'),
	                         htbh : rec.get('htbh'),
	                         htxh : rec.get('htxh'),
	                         hth : rec.get('hth'),
	                         zlckbh : rec.get('ckbh'),
	                         csbh : rec.get('zlcsbh'),
	                         csmc : rec.get('zlcsmc'),
	                         fysl : rec.get('fzsl'),
	                         wbbh : wbbh,
	                         wbdh : rec.get('wbdh'),
	                         wbdj : rec.get('zldj'),
	                         wbje : rec.get('zlje'),
	                         fydj : hsdj_wb,
	                         fyje : hsje_wb,
	                         zzsl : 0,
	                         wbhl : wbhl,
	                         csje : hsje_wb,
	                         csdj : Ext.util.Format.round(Ext.util.Format.round(hsje_wb,2)/rec.get('fzsl'),6)
	                         });
	                      }
	                       nrecs.push(r);
								fyxh++;
	                    })
	                          cgStore.add(nrecs);
						      win.close();
	                   }
	           })    
	          win.show();
	       break;
	    }
	},  
	EdtPurchaseCost : function(type){
	  	var me = this;
	  	var rec;
		var isAdd=isEdit=false;
		var isPlus=true;
		var isDelete=true;
		var canedit=true;
		var cansave = true;
		var candr = true;  
		switch(type){
		   case 'btn_add':
		       isAdd=true;
			   isEdit=false;
			   isPlus=isDelete=canedit=true;
			   var today=new Date();
			   var newfydh = null;
		   Ext.Ajax.request({
	           url: 'purchasecost/purchasecost.act?method=getPurchaseCostOne',
	           async:false,
	           success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newfydh=obj.data;
					    },
					    method:"POST",
					    scope:this
	      });
	           var rec = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	            fydh: parseInt(newfydh)+1,
	            fyrq : today,
	            zzsl : 0.17,
	            hsbm : me.panel.hsbm,
	            yhbh : '000001',
	            fylx : '采购',
	            ftms : '明细模式',
	            xkxj : 0,
	            cglx : 0,
	            czym : erp.UInfo.currentUser.name,
	            czsj : today
	         });
			   break;
		  case 'btn_edt':
			  var rec=me.grdmain.getSelectionModel().getSelection()[0]; 
			  var bool=erp.Util.checkExclusive(me.panel.itemId,rec.get('fydh'));
    	      if(bool){
			     return ;    	
    	      }
			  if(Ext.isEmpty(rec)){
			   Ext.Msg.alert('提示','请先选中一条记录');
			   return;
		      }
		      if(Ext.String.trim(rec.get('czym'))!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		        Ext.Msg.alert('提示','非本单据操作员不能操作!');
		        return;
		      }	
		      var tjbj = rec.get('tjbj');
			  isPlus=isDelete=canedit=cansave=true;
			  
			  if(Ext.util.Format.trim(rec.get('fylx'))=="船务"||Ext.util.Format.trim(rec.get('fylx'))=="单证"){
			    isPlus = false;
			  }
			  //检查锁定
			  var fydh = rec.get('fydh');
			  var sql = "select count(*)  from cgfyb   with (nolock)  where fydh="+fydh+" and (tjbj=1 or hxbj=1);"
			  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						{sql : sql});
			  var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return ;
			  }
			  var count;
			  if(data.val!=null){
			  var count = data.val}
			  if(count>0){
			      tjbj = 1;
			      isPlus = false;
			      isDelete = false;
			      cansave = false;
			      candr = false;
			      canedit = false;
			  }
			  if(me.panel.hasPay==1){
			      isPlus = false;
			      isDelete = false;
			      candr = false;
			      canedit = false;
			  }
			  var fylx = rec.get('fylx');
			  if(Ext.String.trim(fylx)!='采购'){
			     cansave = false;
			     canedit = false;
			  }
			  if(tjbj==1||rec.get('hxbj')==1){
			    isPlus = false;
			    isDelete = false;
			    canedit = false;
			  }
			  isAdd=false;
			  isEdit=true;
			  break;
		}
		     var panel  =  erp.Util.addContentTab({
		     	  xtype : 'edt_PurchaseCost',
		     	  itemId : 'EdtPurchaseCost',
		     	  isAdd : isAdd,
			      isDelete : isDelete,
			      canedit : canedit,
			      isEdit : isEdit,
			      isPlus : isPlus,
			      candr : candr,
			      cansave : cansave,
			      mainPanel: me.panel,
			      bills_num:me.panel.itemId,
			      bills_id:rec.get('fydh'),
			      rec:rec,
			      mainstore:me.grdStore
		     });
		     if(!isAdd&&isEdit){
			  erp.Util.addTask(panel,me.panel.itemId,rec.get('fydh'));
		     }
		 panel.loadData(rec,isEdit);    
		 panel.show();
	},
    BeforeDelete : function(rec){
       
    },	
 
	//删除
    DeletePurchaseCost : function(){
	       var me=this;
	       var rec = me.grdmain.getSelectionModel().getSelection()[0];
	       if(rec.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		//删除前验证
		  if(Ext.String.trim(rec.get('czym'))!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		        Ext.Msg.alert('提示','非本单据操作员不能删除!');
		        return;}
		  if(rec.get('spbj') == "1"){
		        Ext.Msg.alert("提示", "" + rec.get('fydh') + "号采购费用单已审批不能删除!");
			    return;
		  }else if(rec.get('tjbj') == "1"){
		        Ext.Msg.alert("提示", "" + rec.get('fydh') + "号采购费用单已提交不能删除!");
			    return;
		  }else if(rec.get('hxbj') == "1"){
		        Ext.Msg.alert("提示", "" + rec.get('fydh') + "号采购费用单已核销不能删除!");
			    return;}
		 
		var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=beforeDelete',{
		fydh :rec.get('fydh'),
		bills_id:rec.get('fydh'),
		bills_num:me.panel.itemId
		});
          var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				} 
		Ext.Msg.confirm("提示","确认删除记录?",function(btn){
		    if (btn=="yes")
		    Ext.Ajax.request({
					// 将生成的xml发送到服务器端,需特别注意这个页面的地址
					url : 'purchasecost/purchasecost.act?method=deleMainPurchaseCost',
					async : false,
					timeout : 600000,
					method : 'POST',
					waitMsg : '正在删除，请耐心等候...',
					success : function(response, opts) {
						me.refreshImpCost(rec.get('fydh'));
						me.grdStore.reload();
					},
					disableCaching : true,
					isUpload : true,
					params : {
						fydh :rec.get('fydh')
					}
				});
		})
	  },
	  
	doEditAction : function(btn){
	  	 var me=this;
	  	 var edt_PurchaseCost = me.getEdtPurchaseCost();
	  	 var form = edt_PurchaseCost.down('#fyForm');
	  	 var fkform = edt_PurchaseCost.down('#fkForm'); 
	  	 var krec = fkform.getValues();
	  	 var grid_detail = edt_PurchaseCost.down('#grdPurchasecost');
	  	 var cgStore = edt_PurchaseCost.cgStore;
	  	 var fyStore = edt_PurchaseCost.fyStore;
	  	 var fjStore = edt_PurchaseCost.fjStore;
	  	 var fkStore = Ext.create('erp.master.purchaseCost.store.Payfs');
	  	 switch(btn.itemId){
	  	    case 'BTN_SAVE':
            var rec =  form.getRecord();
	  	    form.updateRecord(rec);
	  	    var fkfs  = krec.fkfs;
	  	    var ztdw = krec.ztbh;
	  	    var fyrq = rec.get('fyrq');
	  	    var fyear = fyrq.getFullYear();
	  	    var fmonth = fyrq.getMonth()+1;
	  	    var myDate = new Date();
	  	    var year = me.year
		    var month = me.month;
	  	    var bool = true;
	  	    if(fyear != year||fmonth !=month){
	  	   	       Ext.Msg.alert('提示',"费用日期年份必须为当前工作年份和月份!")
	  	   	       return;
	  	   	}
	  	   	var fyhsbm = rec.get('hsbm');
	  	    if(fyhsbm=='' || fyhsbm==null){
	  	            Ext.Msg.alert('提示',"核算部门不能为空！");
	  	            bool = false;
	  	            return;
	  	         }
	  	    var czy_gh;
    		if(erp.Util.currentUser.isAdmin){
    				czy_gh = 'wj';
    		}else{
    				czy_gh = erp.Util.currentUser.accountMap[0].ref_u_id;
    		}
    		var qxsql = "select count(*) from hsbm_qxb ";
    		qxsql+= "where (left(bmbh,len("+fyhsbm+"))="+fyhsbm+" or bmbh=left("+fyhsbm+",len(bmbh))) and czy_gh = '"+czy_gh+"'";
    		var result = erp.Const.callServiceMethodSync(
    				'materialInventory/materialInventory.act?method=getStringFromSql', {
    			sql:qxsql
    		});
    		var data = Ext.decode(result);
    		if(data.val==0){
    			Ext.Msg.alert('提示','你没有该部门的权限,请重新选择核算部门');
    			return
    		}     
	  	    if(Ext.isEmpty(rec.get('xkxj'))){
	  	            Ext.Msg.alert('提示',"结算方式不能为空！");bool = false;return;
	  	            return;
	  	            }       
	  	    if(Ext.isEmpty(rec.get('cglx'))){
	  	            Ext.Msg.alert('提示',"采购类型不能为空！");bool = false;return;
	  	            return;
	  	         }
	  	     cgStore.each(function(record){
	  	          });
	  	     var recs = cgStore.data.items;
	  	     var recordData = "[";
		     var a=false;
		     var lb = false;
		     Ext.each(recs, function(rec) {
		     	  var sum = 0;
		     	  var fyzy = rec.get('fyzy');
			      for ( var i = 0; i < fyzy.length; i++) {
			         var c = fyzy.charCodeAt(i);
			      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			          sum++;
			      } else {
			         sum += 2;
			         }
			      }
				  if(sum>100){
				      Ext.Msg.alert('提示','序号为'+rec.get('fyxh')+'的费用单费用摘要超过指定长度100个字符！(汉字算2个)');
		     	     lb = true;
		     	     return false;
				  }
		          if(a){
		         	recordData += ",";
		          }
		          recordData += Ext.encode(rec.data);
		                a=true;
		          })
		      recordData += "]";
		      if(lb){
		          return
		      }
		      var sumrec = fyStore.data.items;
		      var sumData =  "[";
		      var a=false;
		      Ext.each(sumrec, function(rec) {
		           if(a){
		         	sumData += ",";
		          }
		          sumData += Ext.encode(rec.data);
		          a=true;
		      })
		      sumData += "]";
		      var recs = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=CheckBeforeSave',{
		                    recordData : recordData,sumData : sumData
		      })
		      var data = Ext.decode(recs);
		         if (data.bool == false) {
			       Ext.Msg.alert('提示', data.msg)
		           return;
		      }
	  	      if(data.bool){
	  	      	Ext.Msg.confirm('提示','是否确认保存！',function(btn){
                    if(btn=='yes'){
	  	          if(me.grdStore.indexOf(rec) >= 0&&rec.get('fydh')>0){
	  	          	  rec.set('czym',erp.UInfo.currentUser.name);
	  	         	  rec.set('czsj',new Date());
	  	              var fkrec = Ext.create('erp.master.purchaseCost.model.Payfs',{fydh:rec.get('fydh'),fkfs :fkfs, ztdw : ztdw});
	  	              var hasData = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=getPayfs',{
		              fydh:rec.get('fydh')});  
	  	              if(!Ext.isEmpty(hasData)){
	  	               erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=updatePayfs',{
		                fydh:rec.get('fydh'),fkfs:fkfs,ztdw:ztdw}); 
		                fkStore.reload();
		              }
	  	             else{
	  	               fkrec.phantom =true	
	  	               fkStore.add(fkrec);
	  	               fkStore.sync({
	  	         	   success : function(){
	  	         	  }   
	  	           }); 
	  	      }
	  	           cgStore.each(function(record){
	  	         	   record.set('fydh',rec.get('fydh'));
	  	         	   record.set('ftms',rec.get('ftms'));
	  	         	   record.set('fyrq',rec.get('fyrq'));
	  	         	   record.set('fylx',rec.get('fylx'));
	  	         	   record.set('hsbm',rec.get('hsbm'));
	  	         	   record.set('xkxj',rec.get('xkxj'));
	  	         	   record.set('cglx',rec.get('cglx'));
	  	         	   record.set('yhbh',rec.get('yhbh'));
	  	         	   record.set('czym',erp.UInfo.currentUser.name);
	  	         	   record.set('czsj',new Date());
	  	             })
	  	              cgStore.sync({
					     success : function(){
					     	 me.refreshImpCost(rec.get('fydh'));
					         me.grdStore.reload();
					     }
					});
					 fyStore.each(function(record){
	  	         	record.set('fydh',rec.get('fydh'));
	  	            })
	  	            fyStore.sync({
	  	             success : function(){
	  	               me.refreshImpCost(rec.get('fydh'));
	  	             }
	  	           });
	  	             Ext.Msg.alert('提示','保存成功');
	  	             edt_PurchaseCost.isEdit = false;
	  	             edt_PurchaseCost.close();
	  	          }else{
	  	          rec.phantom =true;//表示新增
	  	          //增加时检测是否重号
	  	           var ll_count;
                   var fydh = rec.get('fydh');
                      var newfydh = null;
		              Ext.Ajax.request({
	                     url: 'purchasecost/purchasecost.act?method=getPurchaseCostOne',
	                     async:false,
	                     success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newfydh=obj.data;
					    },
					    method:"POST",
					    scope:this
	               });
	               fydh = parseInt(newfydh)+1;
				  cgStore.each(function(record){
	  	         	record.set('fydh',fydh);
	  	         	record.set('ftms',rec.get('ftms'));
	  	         	record.set('fyrq',rec.get('fyrq'));
	  	         	record.set('fylx',rec.get('fylx'));
	  	         	record.set('hsbm',rec.get('hsbm'));
	  	         	record.set('xkxj',rec.get('xkxj'));
	  	         	record.set('cglx',rec.get('cglx'));
	  	         	record.set('yhbh',rec.get('yhbh'));
	  	         	record.set('czym',erp.UInfo.currentUser.name);
	  	         	record.set('czsj',new Date());
	  	            })
	  	              cgStore.sync({
					        success : function(batch, options){
					         me.refreshImpCost(fydh);
	  	                     me.grdStore.reload();
					            }
	  	                    });
					   	fyStore.each(function(record){
	  	               	record.set('fydh',fydh);
	  	            })
	  	                fyStore.sync({
	  	                success : function(){
	  	                me.refreshImpCost(fydh);
	  	             }
	  	          });
	  	          var fkrec = Ext.create('erp.master.purchaseCost.model.Payfs',{fydh:fydh,fkfs :fkfs, ztdw : ztdw});
	  	              var hasData = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=getPayfs',{
		              fydh:fydh});  
	  	              if(!Ext.isEmpty(hasData)){
	  	               erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=updatePayfs',{
		                fydh:fydh,fkfs:fkfs,ztdw:ztdw});
		                fkStore.reload();
		              }
	  	             else{
	  	               fkrec.phantom =true	
	  	               fkStore.add(fkrec);
	  	               fkStore.sync({
	  	         	   success : function(){
	  	                  fkStore.reload({
	  	                    params : 
	  	                   {
	  	                    fydh : fydh
	  	                   }
	  	                 });
	  	         	  }   
	  	           }); 
	  	      }
	  	            Ext.Msg.alert('提示','保存成功');
	  	            edt_PurchaseCost.close();
	  	        }
	  	        }})
	  	    }  
	  	  
     break;
     //分摊计算
     case 'btn_ftjs' : 
         var xmje_hz,xmje,fysl_hz,fysl,ftxs,ftbz,ftbz_hz;
         var rec =  form.getRecord();
	  	 form.updateRecord(rec);
	  	 var ftms = rec.get('ftms');
	  	 if(Ext.String.trim(ftms)=='明细模式'){
	  	    Ext.Msg.alert('提示','明细模式不能进行分摊计算!');
	  	    return
	  	 }
	  	 var fyStore = edt_PurchaseCost.fyStore;
	  	 for(var i=0;i<fyStore.getCount();i++){
	  	       xmje = 0;
	  	       xmje = fyStore.getAt(i).data.fyje;
	  	       if(Ext.isEmpty(fyStore.getAt(i).data.fyje)){
	  	           xmje = 0;
	  	       }
	  	       xmje_hz += xmje;
	  	 }
	  	 for(var i=0;i<cgStore.getCount();i++){
	  	       fysl = 0;
	  	       ftxs = 0;
	  	       fysl = cgStore.getAt(i).data.fysl;
	  	       ftxs = cgStore.getAt(i).data.ftxs;
	  	        if(Ext.isEmpty(fyStore.getAt(i).data.fysl)){
	  	           fysl = 0;
	  	       }
	  	        if(Ext.isEmpty(fyStore.getAt(i).data.ftxs)){
	  	           ftxs = 0;
	  	       }
	  	       ftbz = fysl*ftxs
	  	       if(Ext.isEmpty(fyStore.getAt(i).data.fyje)){
	  	           ftbz = 0;
	  	       }
	  	       ftbz_hz +=ftbz;
	  	 }
	  	 var hsdj,fysl_mx,ftxs_mx,ftbz_mx,ftje,csje_mx,csdj_mx,zzsl,fyje_mx,fyje_hz = 0;
	  	  for(var i=0;i<cgStore.getCount();i++){
	  	     hsdj = 0;
	  	     fyje_mx = 0;
	  	     fysl_mx = cgStore.getAt(i).data.fysl;
	  	     ftxs_mx = cgStore.getAt(i).data.ftxs;
	  	     zzsl = cgStore.getAt(i).data.zzsl;
	  	     if(Ext.isEmpty(fyStore.getAt(i).data.fysl)){
	  	           fysl_mx = 0;
	  	       }
	  	     if(Ext.isEmpty(fyStore.getAt(i).data.ftxs)){
	  	           ftxs_mx = 0;
	  	       } 
	  	     if(Ext.isEmpty(fyStore.getAt(i).data.zzsl)){
	  	           zzsl = 0;
	  	       }   
	  	       ftbz_mx = fysl_mx*ftxs_mx;
	  	       if(ftbz_hz != 0 && fysl_mx != 0){
	  	           if(i = cgStore.getCount()-1){
	  	              ftje = xmje_hz - fyje_hz;
	  	           }else{
	  	               ftje = Ext.util.Format.round((ftbz_mx/ftbz_hz)*xmje_hz,2);
	  	                 fyje_hz=fyje_hz + ftje;
	  	           }
	  	           hsdj = Ext.util.Format.round(ftje/fysl_mx,6);
	  	           cgStore.getAt(i).set('fyje',ftje);
	  	           cgStore.getAt(i).set('fydj',hsdj);
	  	           csje_mx = Ext.util.Format.round(ftje/(1+zzsl),2);
	  	           csdj_mx = Ext.util.Format.round(csje_mx/fysl_mx,6);
	  	           cgStore.getAt(i).set('csje',csje_mx);
	  	           cgStore.getAt(i).set('csdj',csdj_mx);
	  	           cgStore.getAt(i).set('zzse',ftje - csje_mx);
	  	       }
	  	  }
	  	  Ext.Msg.alert('提示','分摊计算完成!')
     break;
     case 'btn_purchasecostdetail_add':
       var rec =  form.getRecord();
	   form.updateRecord(rec);
       var maxxh = cgStore.max('fyxh');
       maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
       var newrec = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
             fydh:rec.get('fydh'),fyxh: maxxh,zzsl : 0.17,fyrq : rec.get('fyrq'),
             czym : erp.UInfo.currentUser.name,czsj : new Date(),
             cglb : rec.get('cglb'),yhbh : rec.get('yhbh'),
             fylx : rec.get('fylx'),hsbm : rec.get('hsbm'),
             xkxj : rec.get('xkxj'),cglx : rec.get('cglx'),
             ftms : rec.get('ftms')
        });
       cgStore.add(newrec);
       break;
     case  'btn_purchasecostdetail_del':
       var sel_recs = grid_detail.getSelectionModel().getSelection();
       if(Ext.isEmpty(sel_recs)){
			Ext.Msg.alert('提示','请先选中至少一条记录');
			return;
		 } 
	  if(grid_detail.getStore().getCount()>1){	 
       cgStore.remove(sel_recs);}
       else{
        Ext.Msg.alert('提示',"最后一条记录不能删除！");
        return
       }
       break;
     case 'btn_CostSum_add':
       var maxxh = fyStore.max('xmxh');
       maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
       var newrec = Ext.create('erp.master.purchaseCost.model.purchaseCostSum',{
             xmxh: maxxh,fydh : rec.get('fydh')
        });
       fyStore.add(newrec);
       break;
     case 'btn_CostSum_del':
       var sel_recs = edt_PurchaseCost.down('#grd_CostSum').getSelectionModel().getSelection();
	    if(Ext.isEmpty(sel_recs)){
			Ext.Msg.alert('提示','请先选中至少一条记录');
			return;
		 }
	   fyStore.remove(sel_recs);
	   break;
	case 'btn_AffixDetial_upload' : 
	    var rec =  form.getRecord();
	    form.updateRecord(rec);
	    var fydh = rec.get('fydh');
	    var sql ="select isnull(max(wjbh),0)+1 as wjbh from cgfy_fjb where fydh="+fydh+";";
	    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		 var data = Ext.decode(result);
		 if (!data.bool) {
		  Ext.toastErrorInfo(data.msg);
		  return;}
		 if(data.val!=null){
		 var wjbh = data.val;
		 var newrec=  Ext.create('erp.master.purchaseCost.model.purchaseCostDetial',{
	      wjbh : wjbh
	    })
	    fjStore.add(newrec);
	    var win=Ext.widget('UpPurchaseCostFile',{				
					itemId: 'UpPurchaseCostFile',
					fydh : fydh,
					wjbh : wjbh,
					newrec:newrec,
					closable: true
					});
					win.show();
			}
		break;
	  	 }
  },
  //刷新递送单的已导金额
  refreshImpCost : function(fydh){
   erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=refreshImpCost',{
		                fydh:fydh})
  },
  //批量修改
  doModify : function(){
	      var grid = this.getGrdPurchaseCost();
	      var rec = grid.getSelectionModel().getSelection();
	      if(Ext.isEmpty(rec)){
			Ext.Msg.alert('提示','请先选中至少一条记录');
			return;
		 }
		 //判断能否修改
		 for(x in rec){
		  if(rec[x].get('spbj') == "1"||rec[x].get('tjbj') =="1"){
		        Ext.Msg.alert("提示", "采购费用单已经审批/提交不能编辑!");
			    return;
		  }}
	      var win = Ext.widget('edtbth_PurchaseCost',{
	           itemId: 'edtbth_PurchaseCost',
	           rec : rec
	      });
	      win.show();
	  },
  //批量修改提交
  btnEditByBatch : function(btn){
        var me = this;
        var win = me.getBthEdtPurchaseCost();
        
        if(btn.action == "BTN_SAVE"){
           var values = me.getBthEdtPurchaseCost().getData();
           var lbbh = values.zflb;
           var bmbh = values.sybm;
           var checkbox_sybm = values.checkbox_sybm;
           var checkbox_zflb = values.checkbox_zflb;
           if(checkbox_zflb=='on' &&(Ext.String.trim(lbbh)=='' || lbbh==null)){
               Ext.Msg.alert('提示','支付类别不能为空!');
               return;
           }
           if(checkbox_sybm=='on' && (Ext.String.trim(bmbh)=='' || bmbh==null)){
               Ext.Msg.alert('提示','受益部门不能为空！');
               return;
           }
           var grid = me.getGrdPurchaseCost();
           var recs = grid.getSelectionModel().getSelection();
           var wxh;
           var s_rwbj;
           if(checkbox_zflb=='on'){
              for(x in recs){
                 wxh = recs[x].get('wxh');
                 var sql ="select rwbj from zjzflbb where lbbh="+lbbh+";";
	             var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		         var data = Ext.decode(result);
		         if(data.val!=null){
			     s_rwbj = data.val;}	
			     if(s_rwbj==1 && (Ext.String.trim(wxh)=='' || wxh==null)){
			         Ext.Msg.alert('提示','所选记录中存在没有任务号的，所以支付类别不能为打上任务标记的!');
			         return;
			     }
              }
           }
           Ext.each(recs, function(rec){
                if(Ext.String.trim(lbbh)!='' && lbbh!=null && checkbox_zflb=='on'){
                	rec.set('zflb',lbbh);
                    if(lbbh.length>=4){
                    a = lbbh.substring(0,2);
                    rec.set('sjfylb',a);}
                    else{
                    rec.set('sjfylb','');
                    }
                    }
                if(Ext.String.trim(bmbh)!='' && bmbh!=null && checkbox_sybm=='on'){
                    rec.set('fsbm',bmbh);}
           });
           win.close();
           me.grdStore.sync();
		   me.grdStore.reload();
		   Ext.Msg.alert('提示', '保存成功!');
        }
  },	  
  //提交标记
  DoCommitPurchaseCost :function(){
         var me = this;
         var sel_recs=me.grdmain.getSelectionModel().getSelection();
         var rec = sel_recs[0];
         if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var idarray=[];
		var statusarray=[];
		for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('fydh'));
			statusarray.push(sel_recs[i].get('tjbj'));
		}
		//提交前验证
		var recordData = "[";
		var a=false;
		Ext.each(sel_recs, function(rec) {
		      if(a){
		         	recordData += ",";
		      }
		      recordData += Ext.encode(rec.data);
		      a=true;
		})
		recordData += "]";
		
		var res = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=getBeforeCommit',{
		recordData : recordData});
		var data = Ext.decode(res);
		if (data.bool == false) {
			Ext.Msg.alert('提示', data.msg)
		    return;
		}
    	var result = me.checkStatusSame(sel_recs,idarray,statusarray);
		if(!result){
		    return;
		}
		var status = sel_recs[0].get('tjbj');
		var alertmsg="";
		if(status==0){
			alertmsg="是否提交"+sel_recs[0].get('fydh')+"号费用单?";
		}else if(status==1){
			alertmsg="是否取消提交"+sel_recs[0].get('fydh')+"号费用单?";
		}else{
			Ext.Msg.alert('提示','操作无效');
			return;
		}
		if(status==1){//取消提交时，如果已被领导审批，不可取消提交
	       var result=me.hasAppro(idarray);
	       if(result>0){//检查是否被审批
	       	  Ext.Msg.alert('提示','编号'+result+'已经审批通过，不能取消提交');
	       	  return;
	       }
		}
		Ext.Msg.confirm("提示",alertmsg,function(btn){
		if(btn=="yes")
		{   
			if(rec.get('tjbj')==0){
			   var tjdx='';
			   var win = Ext.widget('POSubmitMen',{});
			   win.down('#btn_confirm').on({
			      click : function(btn){Ext.define('erp.master.purchaseCost.controller.PurchaseCostCtrl',{
	 extend:  'Ext.app.Controller',
     requires : ['erp.ux.PagingBar',
                 'Ext.ux.TreePicker',
                 'Ext.window.MessageBox',
                 'erp.master.purchaseCost.store.PurchaseCost',
                 'erp.master.purchaseCost.model.QueryParam',
                 'erp.master.purchaseCost.model.purchaseCostSum',
                 'erp.master.purchaseCost.model.purchaseCostShare',
                 'erp.master.purchaseCost.model.PayCategory',
                 'erp.master.purchaseCost.model.BenefitDept',
                 'erp.master.purchaseCost.store.PayCategory',
                 'erp.master.purchaseCost.store.BenefitDept',
                 'erp.master.purchaseCost.store.PayCategoryTree',
                 'erp.master.purchaseCost.store.BenefitDeptTree',
                 'erp.view.master.perchasepriceadjust.store.AccountDeptTree',
                 'erp.master.prematerial.store.Companyname',
                 'erp.master.purchaseCost.store.Payfs',
                 'erp.master.purchaseCost.store.WarehouseCp'
                 ],
     views : ['erp.master.purchaseCost.view.TimeChooseWin',
              'erp.ux.ComboxTree',
              'erp.master.purchaseCost.view.PurchaseCostManger', 
              'erp.master.purchaseCost.view.EdtPurchaseCost',
              'erp.master.purchaseCost.view.PurchaseCostQuery',
              'erp.master.purchaseCost.view.EdtBthPurchaseCost',
              'erp.master.purchaseCost.view.UpPurchaseCostFile',
              'erp.payApply.view.SubmitObjectOam',
              'erp.master.purchaseCost.view.LossImp',
              'erp.master.purchaseCost.view.SendImp',
              'erp.master.purchaseCost.view.AbnormalImp',
              'erp.master.purchaseCost.view.CallinImp',
              'erp.master.purchaseCost.view.ImpDateChoose',
              'erp.master.purchaseCost.view.SendoutImp',
              'erp.master.purchaseCost.view.TransportCostImp',
              'erp.master.purchaseCost.view.ProductEntrustImp',
              'erp.master.purchaseCost.view.MaterialEntrustImp',
              'erp.master.purchaseCost.view.LoadingCostsImp',
              'erp.master.purchaseCost.view.TaskImp',
              'erp.master.purchaseCost.view.PatentImp',
              'erp.master.purchaseCost.view.SubmitObject'],
     refs : [{ref : 'TimeChoose',selector : 'win_TimeChoose'},
             {ref : 'PurchaseCostManger',selector : 'mng_PurchaseCost'},
             {ref : 'GrdPurchaseCost',selector : 'mng_PurchaseCost #grd_PurchaseCost'},
             {ref : 'TimeChooseForm',selector : 'win_TimeChoose #TimeChooseForm'},
             {ref : 'EdtPurchaseCost', selector: 'edt_PurchaseCost'},
             {ref : 'BthEdtPurchaseCost', selector:'edtbth_PurchaseCost'}],   
     init : function(){
        var me = this;
	     if (me.isInited)
			return;
			me.control({
			    'mng_PurchaseCost' : {
			    beforeclose:function(cmp){
			       var me = this;	
			       delete me.grdStore.proxy.extraParams.year;
			       delete me.grdStore.proxy.extraParams.month;
			    }, 
			    afterrender : function(){
			    	me.panel = me.getPurchaseCostManger();
			        me.grdmain = me.getGrdPurchaseCost();
			        me.grdStore = me.panel.store;
			        Ext.apply(me.grdStore.proxy.extraParams,{
		              year:me.panel.year,
		              month:me.panel.month,
		              /*hsbm : me.panel.hsbm,*/
		              usePaging:true});
			        /*me.grdStore.load();*/
			        me.year = me.panel.year;
			        me.month = me.panel.month;
			        me.bzStore = me.panel.bzStore;
			        me.fyStore = me.panel.fyStore;
			        me.ftStore = me.panel.ftStore;
			        me.fjStore = me.panel.fjStore;
			        me.query_rec=Ext.create('erp.master.purchaseCost.model.QueryParam');
			    }
			   },
			   'mng_PurchaseCost button' : {
			       click : me.doAction
			   },
			   'mng_PurchaseCost #menu_Btnupdate' : {
			      click:'InformationUp'
			   },
			   'mng_PurchaseCost #grd_PurchaseCost' : {
			     selectionchange : function(grid, rec) {
							if (rec.length > 0) {
								me.bzStore.load({params:{ fydh:rec[0].get('fydh'),fyxh:rec[0].get('fyxh')}});
								me.fyStore.load({params:{ fydh:rec[0].get('fydh')}});
								var fylx = rec[0].get('fylx');
								var cybh = rec[0].get('cybh');
								var fyje = rec[0].get('fyje');
								var fydh = rec[0].get('fydh');
								var ll_fydh = '';
								if(cybh!=''){
								var s_bj = 0;
								   if(Ext.String.trim(fylx)=='船务'){
								      var sql ="select min(fydh)  from cgfyb where cybh='"+cybh+"' and fylx='船务'; ";
	                                  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						                 {sql : sql});
		                              var data = Ext.decode(result);
		                              if(data.val!=null){
			                             ll_fydh = data.val;}	  
								      
								      if(ll_fydh == fydh){
								          s_bj = 1;
								          me.ftStore.load({params:{ cybh:cybh,fyje:fyje,bj:s_bj}});
								      }else{
								          s_bj = 0;
								      }
								   }else{
								      var sql ="select min(fydh)  from cgfyb where cybh='"+cybh+"' and fylx='单证'; ";
	                                  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						                 {sql : sql});
		                              var data = Ext.decode(result);
								      if(data.val!=null){
			                             ll_fydh = data.val;}	 
			                          if(ll_fydh == fydh){
								          s_bj = 1;
								          me.ftStore.load({params:{ cybh:cybh,fyje:fyje,bj:s_bj}});
								      }else{
								          s_bj = 0;
								      }  
								   } 
								}
								me.fjStore.load({params:{ fydh:rec[0].get('fydh')}});
							} else {
							}
						}, 
				itemdblclick : function(grid, rec) {
							me.EdtPurchaseCost('btn_edt');
						    
						}
				},
				'edt_PurchaseCost button':{
				           click:me.doEditAction
			   },
			    'edtbth_PurchaseCost button':{
			               click : me.btnEditByBatch		
			   },
			   //导入
			   'edt_PurchaseCost #menu_Btnlead' : {
			               click : me.doImpAction
			   }
			});
			me.isInited=true;
     },
	 doAction : function(btn){
	 	var me=this;
		if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}
	      switch(btn.itemId){
	           case 'btn_add' : 
	            this.EdtPurchaseCost(btn.itemId);
	            break;
	           case 'btn_edt' : 
	            this.EdtPurchaseCost(btn.itemId);
	            break;
	           case 'btn_del':
	            this.DeletePurchaseCost();
	            break;
	          case 'btn_commit' :
	            this.DoCommitPurchaseCost();
	            break;
	          case 'btn_appro':
	            this.ApproPurchaseCost();
	            break;
	          case 'btn_batch':
	            this.doModify();
	            break;
	          case 'maintenance' :
				var win = Ext.widget('SubmitObjectOam',{});
				win.show();
			    break;  
	          case 'btn_query':
	          var win=Ext.widget('win_PCQuery',{
					itemId:'win_PCQuery',
					mainstore:me.grdStore,
					mainview:me.panel,
					rec:me.query_rec
				});
				win.show();
				break;
	      }
	  },
	InformationUp : function(menu,btn){
	   var me = this;
	   var myMask = new Ext.LoadMask({
			target : me.panel
		});
	   var czy_gh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;	
	   var count=0;
	   var hsbm;
	   if(Ext.isEmpty(me.panel.hsbm)){
	      hsbm = 21;
	   }else{hsbm = me.panel.hsbm;}
	   switch(btn.itemId){
		case 'btn_update1' : 
		myMask.mask('正在进行更新，请等待......');   
		var sql ="select COUNT(*) from   tempdb..sysobjects where name='##khxx' and type='U'";
	    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		var data = Ext.decode(result);
		if(data.val!=null){
			count = data.val;}	 
		if(count>0){
		  sql = "drop table ##khxx";
		  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		}	
		sql=" SELECT	";
		sql+="	cgfyb.fydh,cgfyb.fyxh,";
		sql+="	case when isnull(jhmx_ddxxb.khbh,'') !='' then jhmx_ddxxb.khbh else";
		sql+="		case when  isnull(jhmxb.zjbh,0)!=0 then  c.khbh else '' end  end  as khbh,";
		sql+="	case when isnull(khxxb.khmc,'') !='' then khxxb.khmc else ";
		sql+="		case when  isnull(jhmxb.zjbh,0)!=0 then  d.khmc else '' end  end  as khmc";
		sql+=" into ##khxx from cgfyb with (nolock)";
		sql+=" left outer join jhmxb with(nolock) on jhmxb.jhbh=cgfyb.jhbh and jhmxb.jhxh=cgfyb.jhxh";
		sql+=" left outer join jhmxb a with (nolock) on a.jhbh=jhmxb.zjbh and a.jhxh=jhmxb.zjxh and jhmxb.zjbh!=0";
		sql+=" left outer join jhmx_ddxxb with (nolock) on jhmx_ddxxb.jhbh=jhmxb.jhbh and jhmx_ddxxb.jhxh=jhmxb.jhxh";
		sql+=" left outer join khxxb with (nolock) on khxxb.khbh=jhmx_ddxxb.khbh";
		sql+=" left outer join jhmx_ddxxb c with (nolock) on c.jhbh=a.jhbh and c.jhxh=a.jhxh";
		sql+=" left outer join khxxb d with (nolock) on d.khbh=c.khbh";
		sql+=" where year(fyrq)="+me.panel.year+" and month(fyrq)="+me.panel.month+"";
		sql+=" 	and (cgfyb.hsbm='' or (left(cgfyb.hsbm,len('"+hsbm+"')) = '"+hsbm+"' and exists (select * from hsbm_qxb where czy_gh = '"+czy_gh+"' and left(cgfyb.hsbm,len(hsbm_qxb.bmbh))=hsbm_qxb.bmbh)))";
		var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		myMask.unmask();
		me.grdStore.reload();
		break;
		case 'btn_update2' :
		myMask.mask('正在进行更新，请等待......');
		var sql ="select COUNT(*) from   tempdb..sysobjects where name='##yfbj' and type='U'";
	    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		var data = Ext.decode(result);
		if(data.val!=null){
			count = data.val;}	 
		if(count>0){
		  sql = "drop table ##yfbj";
		  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		}	
		
		sql = " SELECT	";
		sql+=" 	cgfyb.fydh,";
		sql+=" 	cgfyb.fyxh,";
		sql+=" 	case when (select count(*) from fksqspfyb left outer join fksqspb with (nolock) on fksqspb.sqbh=fksqspfyb.sqbh";
		sql+=" where fksqspb.tjbj=1 and fksqspfyb.fydh=cgfyb.fydh and (fksqspfyb.fyxh=cgfyb.fyxh or fksqspfyb.fyxh=cgfyb.cfxh))>0 then 1 else 0 end as yfbj";
		sql+=" into ##yfbj from cgfyb with (nolock)";
		sql+=" where year(fyrq)="+me.panel.year+" and month(fyrq)="+me.panel.month+"";
		sql+=" 	and (cgfyb.hsbm='' or (left(cgfyb.hsbm,len('"+hsbm+"')) = '"+hsbm+"' and exists (select * from hsbm_qxb where czy_gh = '"+czy_gh+"' and left(cgfyb.hsbm,len(hsbm_qxb.bmbh))=hsbm_qxb.bmbh)))";
		sql+="";
		var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		myMask.unmask();
		me.grdStore.reload()
		break;				    
		}					    
	},  
	doImpAction : function(menu,btn){
	    var me = this;
	    var view = me.getEdtPurchaseCost();
	    var store = view.mainstore;
	    var cgStore = view.cgStore;
	    var edt_PurchaseCost = me.getEdtPurchaseCost();
	  	var form = edt_PurchaseCost.down('#fyForm');
	    var frec =  form.getRecord();
	    var fydh = frec.get('fydh');
	  	form.updateRecord(frec);
	    switch(btn.itemId){
	        case 'btmn_shlead' : 
	           if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	           var store = Ext.create('erp.master.purchaseCost.store.OutMaterial');
	           var win = Ext.widget('Imp_Loss',{
	               store : store,
	               year : me.year,
	               month : me.month,
	               title : '损耗导入'
	           });
	           var maxxh;
	           var nrecs =new Array();
	           var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	           win.down('#btn_confirm').on({
	               click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   win.selStore.each(function(rec){
	                   var newRec  =  Ext.create('erp.master.purchaseCost.model.PurchaseCost');
	                   newRec.set('fydh',fydh);                      
	                   newRec.set('csbh',rec.get('csbh'));                      
	                   newRec.set('csmc',rec.get('csmc'));                      
	                   newRec.set('fyzy',rec.get('clmc'));                      
	                   newRec.set('fysl',rec.get('wrsl'));                      
	                   newRec.set('shdh',rec.get('shdh'));                      
	                   newRec.set('shxh',rec.get('shxh'));                      
	                   newRec.set('zzsl',0.17);                      
	                   newRec.set('fyxh',fyxh); 
	                   nrecs.push(newRec);
					   fyxh++;
	                  });
	                  
	                cgStore.add(nrecs);  
					win.close();
	               }
	           })
	           win.show();
	        break;
	        case 'btmn_rwlead' : 
	            if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	            if(Ext.String.trim(frec.get('fylx'))=='采购'){
	                if(me.panel.hasPay==1){
	                    return
	                }
	            }
	            var hsbm = frec.get('hsbm');
	            if(Ext.isEmpty(hsbm)){
	              hsbm='21'
	            }
	            var rwrecs = cgStore.data.items;
	            var recDate = "[";
		        var a=false;
		        Ext.each(rwrecs, function(rec) {
		          if(a){
		         	recDate += ",";
		          }
		          recDate += Ext.encode(rec.data);
		                a=true;
		          })
		        recDate += "]";
		        erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=beforeloadTaskImp',{
		           recDate : recDate
		        })
	            var win = Ext.widget('Imp_Task',{
	                 hsbm : hsbm,
	                 title : '任务导入'
	            })
	            var maxxh;
	            win.down('#btn_confirm').on({
	                 click : function(btn){
	                    var win = btn.up('window');
	                    var bool = false;
	                    var nrecs =new Array();
	                    var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1; 
	                    win.selStore.each(function(rec){
	                    var ybbh='';var cpth='';var zcpmc='';var bbbh='';var cpth;
	                    var zcpbh='';var bzgj = 0;var gjxs =0;var ftms = frec.get('ftms');
	                    var jhbh = 0; var jhxh = 0; var cpbh;
	                    jhbh =  rec.get('jhbh'); jhxh = rec.get('jhxh');
	                    cpbh = rec.get('cpbh'); 
	                    zcpbh = rec.get('zcpbh');
	                    gjxs = rec.get('gjxs'); bzgj = rec.get('bzgj');var wxdh = rec.get('rwdh');var wxxh = rec.get('rwxh')
	                  
	                    if(jhbh!=0 && jhxh!=0){
	                       var sql = "select bbbh  from jhdecpgxbbb where jhbh="+jhbh+" and jhxh="+jhxh+";"
	                       var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    bbbh = data.val;}
						    sql = "select cpth from cpgxdebbb where cpgxdebbb.cpbh="+cpbh+" and cpgxdebbb.bbbh='"+bbbh+"';"
						    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    cpth = data.val;}
						   if(Ext.String.trim(ybbh) == '' && (zcpbh !=null && Ext.String.trim(zcpbh)!= '')){ 
						    sql = "select ybbh  from cpgxdebbb where cpgxdebbb.cpbh="+cpbh+" and cpgxdebbb.bbbh='"+bbbh+"';"
						    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    ybbh = data.val;}
						   }
						    if(Ext.String.trim(cpth) == '' && (zcpbh !=null && Ext.String.trim(zcpbh)!= '')){
						       sql = "select cpth  from cpgxdebbb where cpgxdebbb.cpbh="+zcpbh+" and cpgxdebbb.bbbh='"+bbbh+"';";
						       var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						       {sql : sql});
						       var data = Ext.decode(result);
						       if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				                }
				                if(data.val!=null){
						        cpth = data.val;}
						       }
						    if(Ext.String.trim(ybbh) == ''&& (zcpbh !=null && Ext.String.trim(zcpbh)!= '')){
						       sql = "select ybbh from cpgxdebbb where cpgxdebbb.cpbh="+zcpbh+" and cpgxdebbb.bbbh='"+bbbh+"';";
						       var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						       {sql : sql});
						       var data = Ext.decode(result);
						       if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				                }
				                if(data.val!=null){
						        ybbh = data.val;}
						     }  
						    } 
	                    zcpmc = rec.get('zcpmc');
	                    var fyzy;
	                    if(Ext.String.trim(zcpmc)!='' && zcpmc!= null){
	                        if(Ext.String.trim(cpth)!= '' && cpth!=null){
	                          fyzy = ""+zcpmc+"\\"+ybbh+"("+cpth+")";
	                        }else{
	                          fyzy = ""+zcpmc+"\\"+ybbh+""
	                        }
	                    }else{
	                        if(Ext.String.trim(cpth)!='' && cpth!=null){
	                          fyzy = ""+rec.get('cpmc')+"\\"+ybbh+"("+cpth+")"
	                        }else{
	                          fyzy = ""+rec.get('cpmc')+"\\"+ybbh+""
	                        }
	                    }  
	                       var fydj = Ext.util.Format.round(rec.get('jsdj'),6);
	                       var fyje = Ext.util.Format.round(rec.get('drsl')*fydj,2);
	                       var csje = Ext.util.Format.round(fyje/1.17,2);
	                       var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                           fydh :  fydh,
	                       	   csbh :  rec.get('csbh'),
	                       	   csmc :  rec.get('csmc'),
	                           fyzy : fyzy,
	                           fysl : rec.get('drsl'),
	                           fydj : fydj,
	                           fyje : fyje,
	                           wxdh : rec.get('rwdh'),
	                           wxxh : rec.get('rwxh'),
	                           wxh  : rec.get('wxh'),
	                           jhbh : rec.get('jhbh'),
	                           jhxh : rec.get('jhxh'),
	                           jhh :  rec.get('jhbh')+'-'+rec.get('jhxh'),
	                           gxbh : rec.get('gxbh'),
	                           scgxmc : rec.get('gxmc'),
	                           bzsm : rec.get('bzsm'),
	                           jhbz : rec.get('jhbz'),
	                           kjbj : rec.get('kjbj'),
	                           fyxh : fyxh,
	                           ftxs : ftms == '分摊模式'?rec.get('bzgj'):0,
	                           csje : csje,
	                           csdj : rec.get('drsl')>0?Ext.util.Format.round(csje/rec.get('drsl'),6):0,
	                           zzse : fyje - csje,
	                           zzsl : 0.17
	                       })
	                       //修改就保存，不考虑主编辑界面是否保存
	                       /*var sql = "update scrwdmxb set gjxs="+gjxs+",jsdj=round(bzgj*"+gjxs+",4) where scrwdmxb.rwdh="+wxdh+" and scrwdmxb.rwxh="+wxxh+";"
	                       var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						       {sql : sql});
						       var data = Ext.decode(result);
						       if (!data.bool) {
					            Ext.toastErrorInfo('修改出现错误');
					            return;
				            } */
				            //导入之后不再出现在导入界面
				            /*sql = "insert into cgfygl_rwdr(rwdh,rwxh) values("+wxdh+","+wxxh+");";
				             var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						       {sql : sql});
						       var data = Ext.decode(result);
						       if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            } */
	                        nrecs.push(r);
								fyxh++;
	                      }) 
	                         cgStore.add(nrecs)
						     win.close();
	                     }
	                 })  
	            win.show();
	        break;
	        case 'btmn_dslead' :
	           if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	           var store = Ext.create('erp.master.purchaseCost.store.SendImp');
	           var win = Ext.widget('Imp_Send',{
	              store : store,
	              title : '递送导入'
	           });
	           var maxxh;
	            win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   var nrecs =new Array();
	                   var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1; 
	                   win.selStore.each(function(rec){
	                       var newRec=Ext.create('erp.master.purchaseCost.model.PurchaseCost');
	                       newRec.set('fydh',fydh);  
	                       newRec.set('fyzy',rec.get('sjdh')+'/'+rec.get('sjdw'));  
	                       newRec.set('bzsm',rec.get('wtrm')+' '+rec.get('jjrq'));  
	                       newRec.set('jlbh',rec.get('jlbh'));  
	                       newRec.set('fyje',rec.get('wdje'));  
	                       newRec.set('xslb',rec.get('xslb'));  
	                       newRec.set('csbh',rec.get('csbh'));  
	                       newRec.set('csmc',rec.get('csmc'));  
	                       newRec.set('jfzl',rec.get('jfzl'));  
	                       newRec.set('zzsl',0.17);  
	                       newRec.set('fffs',rec.get('fffs'));  
	                       newRec.set('fydj',rec.get('wdje'));  
	                       newRec.set('fydj',rec.get('wdje'));  
	                       newRec.set('fysl',1);  
	                       newRec.set('fyxh',fyxh);  
	                       newRec.set('csje',Ext.util.Format.round(rec.get('wdje')/(1.17),2));  
	                       newRec.set('csdj',Ext.util.Format.round(rec.get('wdje')/(1.17),6));  
	                       newRec.set('zzse',rec.get('wdje') - Ext.util.Format.round(rec.get('wdje')/(1.17),2));  
	                      	    nrecs.push(newRec);
								fyxh++;
	                    })  
	                          cgStore.add(nrecs)
						      win.close();
	                   }
	            })   
	           win.show();
	        break;
	       case  'btmn_yclead' :
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var store = Ext.create('erp.master.purchaseCost.store.AbnormalImp');
	           var win = Ext.widget('Imp_Abnormal',{
	              store : store,
	              title : '异常导入'
	           });
	           var nrecs =new Array();
	           var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	           win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   win.selStore.each(function(rec){
	                       var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                          fydh :  fydh,
	                          fyzy : rec.get('ycms'),
	                          ycdh : rec.get('ycdh'),
	                          jlxh : rec.get('jlxh'),
	                          ych : rec.get('ycdh')+'-'+rec.get('jlxh'),
	                          fyje : rec.get('ycje'),
	                          csbh : rec.get('csbh'),
	                          jhbh : rec.get('jhbh'),
	                          jhxh : rec.get('jhxh'),
	                          jhh : rec.get('jhbh')!=0?rec.get('jhbh')+'-'+rec.get('jhxh'):'',
	                          zzsl : 0.17,
	                          fyxh : fyxh,
	                          csmc : rec.get('csmc')
	                       })
	                          nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
						      win.close();
	                  }
	           })
	         win.show();
	       break;
	       case 'btmn_drlead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var store = Ext.create('erp.master.purchaseCost.store.CallinImp');
	          var win = Ext.widget('Imp_Callin',{
	             store : store,
	             title : '调入导入'
	          })
	          win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   var nrecs =new Array();
	                   var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	                   win.selStore.each(function(rec){
	                   	  var csje = Ext.util.Format.round(rec.get('wdje')/(1+0.17),2);
	                   	  var fysl = rec.get('wdtj');
	                      var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                          fydh :  fydh,
	                          fyzy : rec.get('cpmc'),
	                          fysl : fysl,
	                          fydj : rec.get('ysdj'),
	                          fyje : rec.get('wdje'),
	                          csje : csje,
	                          zzse : rec.get('wdje')-csje,
	                          csdj : fysl>0?Ext.util.Format.round(csje/fysl,6):0,
	                          ckbh : rec.get('dckh'),
	                          dcrq : rec.get('dcrq'),
	                          dbdh : rec.get('dbdh'),
	                          dbxh : rec.get('dbxh'),
	                          dbh :  rec.get('dbdh')+'-'+rec.get('dbxh'),
	                          dbxs : rec.get('dbxs'),
	                          ystj : rec.get('ystj'),
	                          bzsm : rec.get('bzsm'),
	                          sgtzh : rec.get('sgtzh'),
	                          zyrm : rec.get('zyrm'),
	                          zzsl : 0.17,
	                          fyxh : fyxh
	                      });
	                         nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
						      win.close();
	                }
	           })
	         win.show(); 
	       break;
	       case 'btmn_fhlead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var win = Ext.widget('win_ImpDate');
	          win.show();
	          win.down('#btn_confirm').on({
	             click : function(btn){ 
	          	  var iwin = btn.up('window');
	          	  var form  = win.down('#TimeChooseForm');
                  var values = win.getData();
                  var qsrq = win.getQsrq();
                  var jzrq = win.getJzrq();
                  win.close();
                  var store = Ext.create('erp.master.purchaseCost.store.SendoutImp');
                  var newwin = Ext.widget('Imp_Sendout',{
                       qsrq : qsrq,
                       jzrq : jzrq,
                       title : '发货导入',
                       store : store
                    })
                    newwin.down('#btn_confirm').on({
	                  click : function(btn){
	                var nrecs =new Array();
	                var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;  	
                    newwin.selStore.each(function(rec){
                    	var zzsl = 0.17;
                    	var csje = Ext.util.Format.round(rec.get('wtje')/(1+zzsl),2);
                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
                              fydh :  fydh,
                              fyzy : rec.get('cpmc'),
                              fysl : rec.get('wdtj'),
                              fhck : rec.get('ckbh'),
                              fhdh : rec.get('fhdh'),
                              fhxh : rec.get('fhxh'),
                              fhh : rec.get('fhdh')+'-'+rec.get('fhxh'),
                              bzsm : rec.get('bzsm'),
                              zzsl : 0.17,
                              fyxh : fyxh
                        })
	                         nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
                             newwin.close();
	                      }
                       })
                  newwin.show();
	          	}
	          })
	       break;
	       case 'btmn_clwtlead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var win = Ext.widget('win_ImpDate');
	          win.show();
	          win.down('#btn_confirm').on({
	             click : function(btn){ 
	          	  var iwin = btn.up('window');
	          	  var form  = win.down('#TimeChooseForm');
                  var values = win.getData();
                  var qsrq = iwin.getQsrq();
                  var jzrq = iwin.getJzrq();
                  win.close();
                  var store = Ext.create('erp.master.purchaseCost.store.MaterialEntrustImp');
                    var newwin = Ext.widget('Imp_MaterialEntrust',{
                          qsrq : qsrq,
                          jzrq : jzrq,
                          title : '材料委托导入',
                          store : store
                    })
                    newwin.down('#btn_confirm').on({
	                  click : function(btn){ 
	                var nrecs =new Array();
	                var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;    	
                    newwin.selStore.each(function(rec){
                    	var zzsl = 0.17;
                    	var csje = Ext.util.Format.round(rec.get('wtje')/(1+zzsl),2);
                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
                              fydh :  fydh,
                              csbh : rec.get('csjg'),
                              csmc : rec.get('csjgmc'),
                              fyzy : rec.get('clmc'),
                              fysl : rec.get('sjsl'),
                              fydj : rec.get('wtdj'),
                              fyje : rec.get('wtje'),
                              csje : csje,
                              zzse : rec.get('wtje') - csje,
                              csdj : rec.get('sjsl')>0?Ext.util.Format.round(csje/rec.get('sjsl'),6):0,
                              fhck : rec.get('ckbh'),
                              clwtdh : rec.get('wtdh'),
                              clwtxh : rec.get('wtxh'),
                              clwth : rec.get('wth'),
                              bzsm : rec.get('bzsm'),
                              zzsl : 0.17,
                              fyxh : fyxh
                        })
	                         nrecs.push(r);
								fyxh++;
	                    })
	                          cgStore.add(nrecs);
						      newwin.close();
	                      }
                       })
                    newwin.show();
                }
            })
	       break;
	       case 'btmn_cpwtlead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var win = Ext.widget('win_ImpDate');
	          win.show();
	          win.down('#btn_confirm').on({
	             click : function(btn){ 
	          	  var iwin = btn.up('window');
	          	  var bool = false;
	          	  var form  = win.down('#TimeChooseForm');
                  var values = win.getData();
                  var qsrq = iwin.getQsrq();
                  var jzrq = iwin.getJzrq();
                  win.close();
                  var store = Ext.create('erp.master.purchaseCost.store.ProductEntrustImp');
                  var newwin = Ext.widget('Imp_ProductEntrust',{
                          qsrq : qsrq,
                          jzrq : jzrq,
                          title : '产品委托导入',
                          store : store
                    })
                  var maxxh;  
                  newwin.down('#btn_confirm').on({
	                  click : function(btn){
	                var nrecs =new Array();
	                var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;    	
                    newwin.selStore.each(function(rec){
                        maxxh = cgStore.max('fyxh');
                        maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
                    	var zzsl = 0.17;
                    	var csje = Ext.util.Format.round(rec.get('wtje')/(1+zzsl),2);
                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
                              fydh :  fydh,
                              csbh : rec.get('csjg'),
                              fyzy : rec.get('cpmc'),
                              fysl : rec.get('sjsl'),
                              fydj : rec.get('wtdj'),
                              fyje : rec.get('wtje'),
                              csje : csje,
                              zzse : rec.get('wtje') - csje,
                              csdj : rec.get('sjsl')>0?Ext.util.Format.round(csje/rec.get('sjsl'),6):0,
                              fhck : rec.get('ckbh'),
                              cpwtdh : rec.get('wtdh'),
                              cpwtxh : rec.get('wtxh'),
                              cpwth : rec.get('wth'),
                              bzsm : rec.get('bzsm'),
                              zzsl : 0.17,
                              fyxh : fyxh
                        })
	                        nrecs.push(r);
								fyxh++;
	                    })
	                          cgStore.add(nrecs);
						      newwin.close();
	                      }
                       })
                       newwin.show();
                    }
	          })   
	       break;
	       case 'btmn_ysfylead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var store = Ext.create('erp.master.purchaseCost.store.TransportCostImp');
	          var win = Ext.widget('Imp_TransportCost',{
	             store : store,
	             title : '运输费用导入'
	          })
	          win.down('#btn_confirm').on({
	                click : function(btn){
	                	var win = btn.up('window');
	                    var bool = false;
	                    var nrecs =new Array();
	                    var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	                    win.selStore.each(function(rec){
	                    	var zccq=''; var zrcq='';
	                        zccq = rec.get('zccq');
	                        zrcq = rec.get('zrcq');
	                        var zccqmc = ''; var zrcqmc = '';
	                        var sql = "select cqmc from wms_cpcqmcb where cqbh="+zccq+";";
	                        var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    zccqmc = data.val;}
						    var sql = "select cqmc from wms_cpcqmcb where cqbh="+zrcq+";";
	                        var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
						    if (!data.bool) {
					            Ext.toastErrorInfo(data.msg);
					            return;
				            }
				            if(data.val!=null){
						    zrcqmc = data.val;}
	                        var wdje = rec.get('wdje');
	                        var fzsl = Ext.util.Format.round(rec.get('wdsl'),3);
	                        var csje = Ext.util.Format.round(wdje/(1+0.17),2);
	                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                          fydh :  fydh,
	                          fyzy : zccqmc+'->'+zrcqmc,
	                          fysl : rec.get('fysl'),
	                          fydj : rec.get('ysdj'),
	                          fyje : rec.get('wdje'),
	                          fydj : fysl!=0?Ext.util.Format.round(wdje/fysl,6):0,
	                          csje : csje,
	                          zzse : wdje-csje,
	                          fysl : rec.get('wdtj')>0?Ext.util.Format.round(csje/fysl,6):0,
	                          ysjldh_wms : rec.get('jldh'),
	                          ysjlxh_wms : rec.get('jlxh'),
	                          bzsm : rec.get('bzsm'),
	                          csbh : rec.get('csbh'),
                              zzsl : 0.17,
                              fyxh : fyxh
	                      });
	                        nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
						      win.close();
	                }
	                })
	         win.show(); 
	       break;
	       case 'btmn_zgfylead' : 
	          if(Ext.String.trim(frec.get('fylx'))==''){
	               Ext.Msg.alert('提示','请先选择费用类型!')
	               return;
	            }
	          var store = Ext.create('erp.master.purchaseCost.store.LoadingCostsImp');
	          var win = Ext.widget('Imp_LoadingCosts',{
	             store : store,
	             title : '装柜费用导入'
	          })
	           win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false; var wdfy; var wdtj; var fyzy;
	                   var nrecs =new Array();
	                   var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	                   win.selStore.each(function(rec){
	                        fyzy = rec.get('zgh');
	                        wdtj = rec.get('wdtj');
	                        wdfy = rec.get('wdfy');
	                        var csje = Ext.util.Format.round(wdfy/(1+0.17),2)
	                        var r = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                        fydh :  fydh,
	                        fyzy : fyzy,
	                        fysl : wdtj,
	                        fyje : wdfy,
	                        fydj : wdtj!=0?Ext.util.Format.round(wdfy/wdtj,6):0,
	                        csje : csje,
	                        zzse : wdfy - csje,
	                        csdj : wdtj>0?Ext.util.Format.round(csje/wdtj,6):0,
	                        zgbh : rec.get('zgbh'),
	                        zgxh : rec.get('zgxh'),
	                        zgfyxh : rec.get('fyxh'),
	                        csbh : rec.get('csbh'),
                            zzsl : 0.17,
                            fyxh : fyxh,
                            csmc : rec.get('csmc')
	                        })
	                        nrecs.push(r);
								fyxh++;
	                    }) 
	                          cgStore.add(nrecs);
						      win.close();
	                  }
	                })
	             win.show();   
	       break;  
	       case 'btmn_zlfylead' : 
	          var recs = cgStore.data.items;
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
	          var win = Ext.widget('Imp_Patent',{
	             recordData : recordData,
	             title : '专利费用导入'
	          })
	           var maxdhxh; 
	           win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false; 
	                   var nrecs =new Array();
	                   var fyxh = cgStore.max('fyxh')==null?1:cgStore.max('fyxh')+1;
	                   win.selStore.each(function(rec){
	                   	  var wbbh = rec.get('wbbh') 
	                   	  if(wbbh=='' || wbbh ==null ||wbbh =='60' ){ 
	                      var r  = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                         fydh :  fydh,
	                         fyxh : fyxh,
	                         fyzy : '专利费',
	                         zlrkdh : rec.get('rkdh'),
	                         zlrkxh : rec.get('rkxh'),
	                         rkh : rec.get('rkh'),
	                         htbh : rec.get('htbh'),
	                         htxh : rec.get('htxh'),
	                         hth : rec.get('hth'),
	                         zlckbh : rec.get('ckbh'),
	                         csbh : rec.get('zlcsbh'),
	                         csmc : rec.get('zlcsmc'),
	                         fysl : rec.get('fzsl'),
	                         wbbh : wbbh,
	                         fydj : rec.get('zldj'),
	                         fyje : rec.get('zlje'),
	                         zzsl : 0.17,
	                         csje : rec.get('zlje'),
	                         csdj : Ext.util.Format.round((rec.get('zlje')/(1+0.17))/rec.get('fzsl'),6)
	                       })
	                      }else{
	                       var wbhl;
	                       var sql = "select wbhl  from wbhlb where nf=YEAR(GETDATE()) and yf = MONTH(GETDATE()) and wbbh = "+wbbh+";";
	                       var result = erp.Const.callServiceMethodSync(
						    'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
						    sql:sql
					       });
					       var data = Ext.decode(result);
					       if (!data.bool) {
						     Ext.toastErrorInfo(data.msg);
						   return;
					       }else{
					         wbhl = data.val
					       }
					       var fzsl = rec.get('fzsl'); var wbje = rec.get('zlje');
					       var hsje_wb = wbhl*wbje;//含税金额
	                       var hsdj_wb = hsje_wb/fzsl;//含税单价
					       var r  = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	                         fydh :  fydh,
	                         fyzy : '专利费',
	                         fyxh : fyxh,
	                         zlrkdh : rec.get('rkdh'),
	                         zlrkxh : rec.get('rkxh'),
	                         rkh : rec.get('rkh'),
	                         htbh : rec.get('htbh'),
	                         htxh : rec.get('htxh'),
	                         hth : rec.get('hth'),
	                         zlckbh : rec.get('ckbh'),
	                         csbh : rec.get('zlcsbh'),
	                         csmc : rec.get('zlcsmc'),
	                         fysl : rec.get('fzsl'),
	                         wbbh : wbbh,
	                         wbdh : rec.get('wbdh'),
	                         wbdj : rec.get('zldj'),
	                         wbje : rec.get('zlje'),
	                         fydj : hsdj_wb,
	                         fyje : hsje_wb,
	                         zzsl : 0,
	                         wbhl : wbhl,
	                         csje : hsje_wb,
	                         csdj : Ext.util.Format.round(Ext.util.Format.round(hsje_wb,2)/rec.get('fzsl'),6)
	                         });
	                      }
	                       nrecs.push(r);
								fyxh++;
	                    })
	                          cgStore.add(nrecs);
						      win.close();
	                   }
	           })    
	          win.show();
	       break;
	    }
	},  
	EdtPurchaseCost : function(type){
	  	var me = this;
	  	var rec;
		var isAdd=isEdit=false;
		var isPlus=true;
		var isDelete=true;
		var canedit=true;
		var cansave = true;
		var candr = true;  
		switch(type){
		   case 'btn_add':
		       isAdd=true;
			   isEdit=false;
			   isPlus=isDelete=canedit=true;
			   var today=new Date();
			   var newfydh = null;
		   Ext.Ajax.request({
	           url: 'purchasecost/purchasecost.act?method=getPurchaseCostOne',
	           async:false,
	           success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newfydh=obj.data;
					    },
					    method:"POST",
					    scope:this
	      });
	           var rec = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
	            fydh: parseInt(newfydh)+1,
	            fyrq : today,
	            zzsl : 0.17,
	            hsbm : me.panel.hsbm,
	            yhbh : '000001',
	            fylx : '采购',
	            ftms : '明细模式',
	            xkxj : 0,
	            cglx : 0,
	            czym : erp.UInfo.currentUser.name,
	            czsj : today
	         });
			   break;
		  case 'btn_edt':
			  var rec=me.grdmain.getSelectionModel().getSelection()[0]; 
			  var bool=erp.Util.checkExclusive(me.panel.itemId,rec.get('fydh'));
    	      if(bool){
			     return ;    	
    	      }
			  if(Ext.isEmpty(rec)){
			   Ext.Msg.alert('提示','请先选中一条记录');
			   return;
		      }
		      if(Ext.String.trim(rec.get('czym'))!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		        Ext.Msg.alert('提示','非本单据操作员不能操作!');
		        return;
		      }	
		      var tjbj = rec.get('tjbj');
			  isPlus=isDelete=canedit=cansave=true;
			  
			  if(Ext.util.Format.trim(rec.get('fylx'))=="船务"||Ext.util.Format.trim(rec.get('fylx'))=="单证"){
			    isPlus = false;
			  }
			  //检查锁定
			  var fydh = rec.get('fydh');
			  var sql = "select count(*)  from cgfyb   with (nolock)  where fydh="+fydh+" and (tjbj=1 or hxbj=1);"
			  var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						{sql : sql});
			  var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return ;
			  }
			  var count;
			  if(data.val!=null){
			  var count = data.val}
			  if(count>0){
			      tjbj = 1;
			      isPlus = false;
			      isDelete = false;
			      cansave = false;
			      candr = false;
			      canedit = false;
			  }
			  if(me.panel.hasPay==1){
			      isPlus = false;
			      isDelete = false;
			      candr = false;
			      canedit = false;
			  }
			  var fylx = rec.get('fylx');
			  if(Ext.String.trim(fylx)!='采购'){
			     cansave = false;
			     canedit = false;
			  }
			  if(tjbj==1||rec.get('hxbj')==1){
			    isPlus = false;
			    isDelete = false;
			    canedit = false;
			  }
			  isAdd=false;
			  isEdit=true;
			  break;
		}
		     var panel  =  erp.Util.addContentTab({
		     	  xtype : 'edt_PurchaseCost',
		     	  itemId : 'EdtPurchaseCost',
		     	  isAdd : isAdd,
			      isDelete : isDelete,
			      canedit : canedit,
			      isEdit : isEdit,
			      isPlus : isPlus,
			      candr : candr,
			      cansave : cansave,
			      mainPanel: me.panel,
			      bills_num:me.panel.itemId,
			      bills_id:rec.get('fydh'),
			      rec:rec,
			      mainstore:me.grdStore
		     });
		     if(!isAdd&&isEdit){
			  erp.Util.addTask(panel,me.panel.itemId,rec.get('fydh'));
		     }
		 panel.loadData(rec,isEdit);    
		 panel.show();
	},
    BeforeDelete : function(rec){
       
    },	
 
	//删除
    DeletePurchaseCost : function(){
	       var me=this;
	       var rec = me.grdmain.getSelectionModel().getSelection()[0];
	       if(rec.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		//删除前验证
		  if(Ext.String.trim(rec.get('czym'))!=Ext.String.trim(erp.Util.currentUser.userInfo.name) && !erp.Util.currentUser.isAdmin){
		        Ext.Msg.alert('提示','非本单据操作员不能删除!');
		        return;}
		  if(rec.get('spbj') == "1"){
		        Ext.Msg.alert("提示", "" + rec.get('fydh') + "号采购费用单已审批不能删除!");
			    return;
		  }else if(rec.get('tjbj') == "1"){
		        Ext.Msg.alert("提示", "" + rec.get('fydh') + "号采购费用单已提交不能删除!");
			    return;
		  }else if(rec.get('hxbj') == "1"){
		        Ext.Msg.alert("提示", "" + rec.get('fydh') + "号采购费用单已核销不能删除!");
			    return;}
		 
		var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=beforeDelete',{
		fydh :rec.get('fydh'),
		bills_id:rec.get('fydh'),
		bills_num:me.panel.itemId
		});
          var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				} 
		Ext.Msg.confirm("提示","确认删除记录?",function(btn){
		    if (btn=="yes")
		    me.grdStore.remove(rec);
				me.grdStore.sync({
					success: function(batch,options) {
						 me.refreshImpCost(rec.get('fydh'));
						 me.grdStore.reload();
					}
				});	
		})
	  },
	  
	doEditAction : function(btn){
	  	 var me=this;
	  	 var edt_PurchaseCost = me.getEdtPurchaseCost();
	  	 var form = edt_PurchaseCost.down('#fyForm');
	  	 var fkform = edt_PurchaseCost.down('#fkForm'); 
	  	 var krec = fkform.getValues();
	  	 var grid_detail = edt_PurchaseCost.down('#grdPurchasecost');
	  	 var cgStore = edt_PurchaseCost.cgStore;
	  	 var fyStore = edt_PurchaseCost.fyStore;
	  	 var fjStore = edt_PurchaseCost.fjStore;
	  	 var fkStore = Ext.create('erp.master.purchaseCost.store.Payfs');
	  	 switch(btn.itemId){
	  	    case 'BTN_SAVE':
            var rec =  form.getRecord();
	  	    form.updateRecord(rec);
	  	    var fkfs  = krec.fkfs;
	  	    var ztdw = krec.ztbh;
	  	    var fyrq = rec.get('fyrq');
	  	    var fyear = fyrq.getFullYear();
	  	    var fmonth = fyrq.getMonth()+1;
	  	    var myDate = new Date();
	  	    var year = me.year
		    var month = me.month;
	  	    var bool = true;
	  	    if(fyear != year||fmonth !=month){
	  	   	       Ext.Msg.alert('提示',"费用日期年份必须为当前工作年份和月份!")
	  	   	       return;
	  	   	}
	  	   	var fyhsbm = rec.get('hsbm');
	  	    if(fyhsbm=='' || fyhsbm==null){
	  	            Ext.Msg.alert('提示',"核算部门不能为空！");
	  	            bool = false;
	  	            return;
	  	         }
	  	    var czy_gh;
    		if(erp.Util.currentUser.isAdmin){
    				czy_gh = 'wj';
    		}else{
    				czy_gh = erp.Util.currentUser.accountMap[0].ref_u_id;
    		}
    		var qxsql = "select count(*) from hsbm_qxb ";
    		qxsql+= "where (left(bmbh,len("+fyhsbm+"))="+fyhsbm+" or bmbh=left("+fyhsbm+",len(bmbh))) and czy_gh = '"+czy_gh+"'";
    		var result = erp.Const.callServiceMethodSync(
    				'materialInventory/materialInventory.act?method=getStringFromSql', {
    			sql:qxsql
    		});
    		var data = Ext.decode(result);
    		if(data.val==0){
    			Ext.Msg.alert('提示','你没有该部门的权限,请重新选择核算部门');
    			return
    		}     
	  	    if(Ext.isEmpty(rec.get('xkxj'))){
	  	            Ext.Msg.alert('提示',"结算方式不能为空！");bool = false;return;
	  	            return;
	  	            }       
	  	    if(Ext.isEmpty(rec.get('cglx'))){
	  	            Ext.Msg.alert('提示',"采购类型不能为空！");bool = false;return;
	  	            return;
	  	         }
	  	     cgStore.each(function(record){
	  	          });
	  	     var recs = cgStore.data.items;
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
		      
		      var sumrec = fyStore.data.items;
		      var sumData =  "[";
		      var a=false;
		      Ext.each(sumrec, function(rec) {
		           if(a){
		         	sumData += ",";
		          }
		          sumData += Ext.encode(rec.data);
		          a=true;
		      })
		      sumData += "]";
		      var recs = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=CheckBeforeSave',{
		                    recordData : recordData,sumData : sumData
		      })
		      var data = Ext.decode(recs);
		         if (data.bool == false) {
			       Ext.Msg.alert('提示', data.msg)
		           return;
		      }
	  	      if(data.bool){
	  	      	Ext.Msg.confirm('提示','是否确认保存！',function(btn){
                    if(btn=='yes'){
	  	          if(me.grdStore.indexOf(rec) >= 0&&rec.get('fydh')>0){
	  	          	  rec.set('czym',erp.UInfo.currentUser.name);
	  	         	  rec.set('czsj',new Date());
	  	              var fkrec = Ext.create('erp.master.purchaseCost.model.Payfs',{fydh:rec.get('fydh'),fkfs :fkfs, ztdw : ztdw});
	  	              var hasData = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=getPayfs',{
		              fydh:rec.get('fydh')});  
	  	              if(!Ext.isEmpty(hasData)){
	  	               erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=updatePayfs',{
		                fydh:rec.get('fydh'),fkfs:fkfs,ztdw:ztdw}); 
		                fkStore.reload();
		              }
	  	             else{
	  	               fkrec.phantom =true	
	  	               fkStore.add(fkrec);
	  	               fkStore.sync({
	  	         	   success : function(){
	  	         	  }   
	  	           }); 
	  	      }
	  	           cgStore.each(function(record){
	  	         	   record.set('fydh',rec.get('fydh'));
	  	         	   record.set('ftms',rec.get('ftms'));
	  	         	   record.set('fyrq',rec.get('fyrq'));
	  	         	   record.set('fylx',rec.get('fylx'));
	  	         	   record.set('hsbm',rec.get('hsbm'));
	  	         	   record.set('xkxj',rec.get('xkxj'));
	  	         	   record.set('cglx',rec.get('cglx'));
	  	         	   record.set('yhbh',rec.get('yhbh'));
	  	         	   record.set('czym',erp.UInfo.currentUser.name);
	  	         	   record.set('czsj',new Date());
	  	             })
	  	              cgStore.sync({
					     success : function(){
					     	 me.refreshImpCost(rec.get('fydh'));
					         me.grdStore.reload();
					     }
					});
					 fyStore.each(function(record){
	  	         	record.set('fydh',rec.get('fydh'));
	  	            })
	  	            fyStore.sync({
	  	             success : function(){
	  	               me.refreshImpCost(rec.get('fydh'));
	  	             }
	  	           });
	  	             Ext.Msg.alert('提示','保存成功');
	  	             edt_PurchaseCost.isEdit = false;
	  	             edt_PurchaseCost.close();
	  	          }else{
	  	          rec.phantom =true;//表示新增
	  	          //增加时检测是否重号
	  	           var ll_count;
                   var fydh = rec.get('fydh');
                      var newfydh = null;
		              Ext.Ajax.request({
	                     url: 'purchasecost/purchasecost.act?method=getPurchaseCostOne',
	                     async:false,
	                     success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newfydh=obj.data;
					    },
					    method:"POST",
					    scope:this
	               });
	               fydh = parseInt(newfydh)+1;
				  cgStore.each(function(record){
	  	         	record.set('fydh',fydh);
	  	         	record.set('ftms',rec.get('ftms'));
	  	         	record.set('fyrq',rec.get('fyrq'));
	  	         	record.set('fylx',rec.get('fylx'));
	  	         	record.set('hsbm',rec.get('hsbm'));
	  	         	record.set('xkxj',rec.get('xkxj'));
	  	         	record.set('cglx',rec.get('cglx'));
	  	         	record.set('yhbh',rec.get('yhbh'));
	  	         	record.set('czym',erp.UInfo.currentUser.name);
	  	         	record.set('czsj',new Date());
	  	            })
	  	              cgStore.sync({
					        success : function(batch, options){
					         me.refreshImpCost(fydh);
	  	                     me.grdStore.reload();
					            }
	  	                    });
					   	fyStore.each(function(record){
	  	               	record.set('fydh',fydh);
	  	            })
	  	                fyStore.sync({
	  	                success : function(){
	  	                me.refreshImpCost(fydh);
	  	             }
	  	          });
	  	          var fkrec = Ext.create('erp.master.purchaseCost.model.Payfs',{fydh:fydh,fkfs :fkfs, ztdw : ztdw});
	  	              var hasData = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=getPayfs',{
		              fydh:fydh});  
	  	              if(!Ext.isEmpty(hasData)){
	  	               erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=updatePayfs',{
		                fydh:fydh,fkfs:fkfs,ztdw:ztdw});
		                fkStore.reload();
		              }
	  	             else{
	  	               fkrec.phantom =true	
	  	               fkStore.add(fkrec);
	  	               fkStore.sync({
	  	         	   success : function(){
	  	                  fkStore.reload({
	  	                    params : 
	  	                   {
	  	                    fydh : fydh
	  	                   }
	  	                 });
	  	         	  }   
	  	           }); 
	  	      }
	  	            Ext.Msg.alert('提示','保存成功');
	  	            edt_PurchaseCost.close();
	  	        }
	  	        }})
	  	    }  
	  	  
     break;
     //分摊计算
     case 'btn_ftjs' : 
         var xmje_hz,xmje,fysl_hz,fysl,ftxs,ftbz,ftbz_hz;
         var rec =  form.getRecord();
	  	 form.updateRecord(rec);
	  	 var ftms = rec.get('ftms');
	  	 if(Ext.String.trim(ftms)=='明细模式'){
	  	    Ext.Msg.alert('提示','明细模式不能进行分摊计算!');
	  	    return
	  	 }
	  	 var fyStore = edt_PurchaseCost.fyStore;
	  	 for(var i=0;i<fyStore.getCount();i++){
	  	       xmje = 0;
	  	       xmje = fyStore.getAt(i).data.fyje;
	  	       if(Ext.isEmpty(fyStore.getAt(i).data.fyje)){
	  	           xmje = 0;
	  	       }
	  	       xmje_hz += xmje;
	  	 }
	  	 for(var i=0;i<cgStore.getCount();i++){
	  	       fysl = 0;
	  	       ftxs = 0;
	  	       fysl = cgStore.getAt(i).data.fysl;
	  	       ftxs = cgStore.getAt(i).data.ftxs;
	  	        if(Ext.isEmpty(fyStore.getAt(i).data.fysl)){
	  	           fysl = 0;
	  	       }
	  	        if(Ext.isEmpty(fyStore.getAt(i).data.ftxs)){
	  	           ftxs = 0;
	  	       }
	  	       ftbz = fysl*ftxs
	  	       if(Ext.isEmpty(fyStore.getAt(i).data.fyje)){
	  	           ftbz = 0;
	  	       }
	  	       ftbz_hz +=ftbz;
	  	 }
	  	 var hsdj,fysl_mx,ftxs_mx,ftbz_mx,ftje,csje_mx,csdj_mx,zzsl,fyje_mx,fyje_hz = 0;
	  	  for(var i=0;i<cgStore.getCount();i++){
	  	     hsdj = 0;
	  	     fyje_mx = 0;
	  	     fysl_mx = cgStore.getAt(i).data.fysl;
	  	     ftxs_mx = cgStore.getAt(i).data.ftxs;
	  	     zzsl = cgStore.getAt(i).data.zzsl;
	  	     if(Ext.isEmpty(fyStore.getAt(i).data.fysl)){
	  	           fysl_mx = 0;
	  	       }
	  	     if(Ext.isEmpty(fyStore.getAt(i).data.ftxs)){
	  	           ftxs_mx = 0;
	  	       } 
	  	     if(Ext.isEmpty(fyStore.getAt(i).data.zzsl)){
	  	           zzsl = 0;
	  	       }   
	  	       ftbz_mx = fysl_mx*ftxs_mx;
	  	       if(ftbz_hz != 0 && fysl_mx != 0){
	  	           if(i = cgStore.getCount()-1){
	  	              ftje = xmje_hz - fyje_hz;
	  	           }else{
	  	               ftje = Ext.util.Format.round((ftbz_mx/ftbz_hz)*xmje_hz,2);
	  	                 fyje_hz=fyje_hz + ftje;
	  	           }
	  	           hsdj = Ext.util.Format.round(ftje/fysl_mx,6);
	  	           cgStore.getAt(i).set('fyje',ftje);
	  	           cgStore.getAt(i).set('fydj',hsdj);
	  	           csje_mx = Ext.util.Format.round(ftje/(1+zzsl),2);
	  	           csdj_mx = Ext.util.Format.round(csje_mx/fysl_mx,6);
	  	           cgStore.getAt(i).set('csje',csje_mx);
	  	           cgStore.getAt(i).set('csdj',csdj_mx);
	  	           cgStore.getAt(i).set('zzse',ftje - csje_mx);
	  	       }
	  	  }
	  	  Ext.Msg.alert('提示','分摊计算完成!')
     break;
     case 'btn_purchasecostdetail_add':
       var rec =  form.getRecord();
	   form.updateRecord(rec);
       var maxxh = cgStore.max('fyxh');
       maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
       var newrec = Ext.create('erp.master.purchaseCost.model.PurchaseCost',{
             fydh:rec.get('fydh'),fyxh: maxxh,zzsl : 0.17,fyrq : rec.get('fyrq'),
             czym : erp.UInfo.currentUser.name,czsj : new Date(),
             cglb : rec.get('cglb'),yhbh : rec.get('yhbh'),
             fylx : rec.get('fylx'),hsbm : rec.get('hsbm'),
             xkxj : rec.get('xkxj'),cglx : rec.get('cglx'),
             ftms : rec.get('ftms')
        });
       cgStore.add(newrec);
       break;
     case  'btn_purchasecostdetail_del':
       var sel_recs = grid_detail.getSelectionModel().getSelection();
       if(Ext.isEmpty(sel_recs)){
			Ext.Msg.alert('提示','请先选中至少一条记录');
			return;
		 } 
	  if(grid_detail.getStore().getCount()>1){	 
       cgStore.remove(sel_recs);}
       else{
        Ext.Msg.alert('提示',"最后一条记录不能删除！");
        return
       }
       break;
     case 'btn_CostSum_add':
       var maxxh = fyStore.max('xmxh');
       maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
       var newrec = Ext.create('erp.master.purchaseCost.model.purchaseCostSum',{
             xmxh: maxxh,fydh : rec.get('fydh')
        });
       fyStore.add(newrec);
       break;
     case 'btn_CostSum_del':
       var sel_recs = edt_PurchaseCost.down('#grd_CostSum').getSelectionModel().getSelection();
	    if(Ext.isEmpty(sel_recs)){
			Ext.Msg.alert('提示','请先选中至少一条记录');
			return;
		 }
	   fyStore.remove(sel_recs);
	   break;
	case 'btn_AffixDetial_upload' : 
	    var rec =  form.getRecord();
	    form.updateRecord(rec);
	    var fydh = rec.get('fydh');
	    var sql ="select isnull(max(wjbh),0)+1 as wjbh from cgfy_fjb where fydh="+fydh+";";
	    var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		 var data = Ext.decode(result);
		 if (!data.bool) {
		  Ext.toastErrorInfo(data.msg);
		  return;}
		 if(data.val!=null){
		 var wjbh = data.val;
		 var newrec=  Ext.create('erp.master.purchaseCost.model.purchaseCostDetial',{
	      wjbh : wjbh
	    })
	    fjStore.add(newrec);
	    var win=Ext.widget('UpPurchaseCostFile',{				
					itemId: 'UpPurchaseCostFile',
					fydh : fydh,
					wjbh : wjbh,
					newrec:newrec,
					closable: true
					});
					win.show();
			}
		break;
	  	 }
  },
  //刷新递送单的已导金额
  refreshImpCost : function(fydh){
   erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=refreshImpCost',{
		                fydh:fydh})
  },
  //批量修改
  doModify : function(){
	      var grid = this.getGrdPurchaseCost();
	      var rec = grid.getSelectionModel().getSelection();
	      if(Ext.isEmpty(rec)){
			Ext.Msg.alert('提示','请先选中至少一条记录');
			return;
		 }
		 //判断能否修改
		 for(x in rec){
		  if(rec[x].get('spbj') == "1"||rec[x].get('tjbj') =="1"){
		        Ext.Msg.alert("提示", "采购费用单已经审批/提交不能编辑!");
			    return;
		  }}
	      var win = Ext.widget('edtbth_PurchaseCost',{
	           itemId: 'edtbth_PurchaseCost',
	           rec : rec
	      });
	      win.show();
	  },
  //批量修改提交
  btnEditByBatch : function(btn){
        var me = this;
        var win = me.getBthEdtPurchaseCost();
        
        if(btn.action == "BTN_SAVE"){
           var values = me.getBthEdtPurchaseCost().getData();
           var lbbh = values.zflb;
           var bmbh = values.sybm;
           var checkbox_sybm = values.checkbox_sybm;
           var checkbox_zflb = values.checkbox_zflb;
           if(checkbox_zflb=='on' &&(Ext.String.trim(lbbh)=='' || lbbh==null)){
               Ext.Msg.alert('提示','支付类别不能为空!');
               return;
           }
           if(checkbox_sybm=='on' && (Ext.String.trim(bmbh)=='' || bmbh==null)){
               Ext.Msg.alert('提示','受益部门不能为空！');
               return;
           }
           var grid = me.getGrdPurchaseCost();
           var recs = grid.getSelectionModel().getSelection();
           var wxh;
           var s_rwbj;
           if(checkbox_zflb=='on'){
              for(x in recs){
                 wxh = recs[x].get('wxh');
                 var sql ="select rwbj from zjzflbb where lbbh="+lbbh+";";
	             var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
		         var data = Ext.decode(result);
		         if(data.val!=null){
			     s_rwbj = data.val;}	
			     if(s_rwbj==1 && (Ext.String.trim(wxh)=='' || wxh==null)){
			         Ext.Msg.alert('提示','所选记录中存在没有任务号的，所以支付类别不能为打上任务标记的!');
			         return;
			     }
              }
           }
           Ext.each(recs, function(rec){
                if(Ext.String.trim(lbbh)!='' && lbbh!=null && checkbox_zflb=='on'){
                	rec.set('zflb',lbbh);
                    if(lbbh.length>=4){
                    a = lbbh.substring(0,2);
                    rec.set('sjfylb',a);}
                    else{
                    rec.set('sjfylb','');
                    }
                    }
                if(Ext.String.trim(bmbh)!='' && bmbh!=null && checkbox_sybm=='on'){
                    rec.set('fsbm',bmbh);}
           });
           win.close();
           me.grdStore.sync();
		   me.grdStore.reload();
		   Ext.Msg.alert('提示', '保存成功!');
        }
  },	  
  //提交标记
  DoCommitPurchaseCost :function(){
         var me = this;
         var sel_recs=me.grdmain.getSelectionModel().getSelection();
         var rec = sel_recs[0];
         if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var idarray=[];
		var statusarray=[];
		for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('fydh'));
			statusarray.push(sel_recs[i].get('tjbj'));
		}
		//提交前验证
		var recordData = "[";
		var a=false;
		Ext.each(sel_recs, function(rec) {
		      if(a){
		         	recordData += ",";
		      }
		      recordData += Ext.encode(rec.data);
		      a=true;
		})
		recordData += "]";
		
		var res = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=getBeforeCommit',{
		recordData : recordData});
		var data = Ext.decode(res);
		if (data.bool == false) {
			Ext.Msg.alert('提示', data.msg)
		    return;
		}
    	var result = me.checkStatusSame(sel_recs,idarray,statusarray);
		if(!result){
		    return;
		}
		var status = sel_recs[0].get('tjbj');
		var alertmsg="";
		if(status==0){
			alertmsg="是否提交"+sel_recs[0].get('fydh')+"号费用单?";
		}else if(status==1){
			alertmsg="是否取消提交"+sel_recs[0].get('fydh')+"号费用单?";
		}else{
			Ext.Msg.alert('提示','操作无效');
			return;
		}
		if(status==1){//取消提交时，如果已被领导审批，不可取消提交
	       var result=me.hasAppro(idarray);
	       if(result>0){//检查是否被审批
	       	  Ext.Msg.alert('提示','编号'+result+'已经审批通过，不能取消提交');
	       	  return;
	       }
		}
		Ext.Msg.confirm("提示",alertmsg,function(btn){
		if(btn=="yes")
		{   
			if(rec.get('tjbj')==0){
			   var tjdx='';
			   var win = Ext.widget('POSubmitMen',{});
			   win.down('#btn_confirm').on({
			      click : function(btn){
			         var win=btn.up('window');
					 var grid = win.down('#SubmitMenData');
					 var recs = grid.getSelectionModel().getSelection();
					 if(Ext.isEmpty(recs)||recs.length==0){
					   Ext.Msg.alert('提示','请选择提交对象！');
					   return;
					 }
					 if(recs!=null&&recs.length>0){
						tjdx=recs[0].get('czy_gh');
				     }
				     Ext.Ajax.request({
				        url : 'purchasecost/purchasecost.act?method=updateStatus',
				        async : false,
						timeout : 600000,
						method : 'POST',
						waitMsg : '正在进行数据验证，请耐心等候...',
						success : function(response, opts) {
							me.grdStore.reload();
						},
						params : {
						   idarray:idarray.join(','),
			               tjsj:new Date(),
			               tjrm:erp.Util.currentUser.userInfo.name,
			               tjbj:(status==0?1:0),
			               tjdx : tjdx
						}
				     });
				     var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=InsertFwoa',{
				          czy_gh : erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id,
				          f_spczy : tjdx,
				          tjbj:(status==0?1:0),
				          fydh : sel_recs[0].get('fydh')
				     })
				     win.close();
			      }
			   });
			   win.show();
			}else{
			     Ext.Ajax.request({
								// 将生成的xml发送到服务器端,需特别注意这个页面的地址
								url : 'purchasecost/purchasecost.act?method=updateStatus',
								async : false,
								timeout : 600000,
								method : 'POST',
								waitMsg : '正在进行数据验证，请耐心等候...',
								success : function(response, opts) {
									me.grdStore.reload();
								},
								params : {
									tjbj:0,idarray:idarray.join(',')
								}
							});
			     var myMask = new Ext.LoadMask({
			          target : me.panel
		         });		
		         myMask.mask('正在进行同步，请等待......'); 
				     var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=InsertFwoa',{
				          czy_gh : erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id,
				          f_spczy : '',
				          tjbj:(status==0?1:0),
				          fydh : sel_recs[0].get('fydh')
				     })		
				myMask.unmask();   
			}
		}
		})
  },
  //审批标记	  
  ApproPurchaseCost : function(){
         var me =this;
         var sel_recs=me.grdmain.getSelectionModel().getSelection();
         if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		for(var i=0;i<sel_recs.length-1;i++){
		     if(sel_recs[i].get('spbj')!=sel_recs[i+1].get('spbj')){
		           Ext.Msg.alert('提示','请选择相同审批状态的记录!');
				    return; 
		       }
		     }
		var sql;   var ll_count;  
		for(x in sel_recs){
		   if(sel_recs[x].get('fylx')!='船务' && sel_recs[x].get('fylx')!='单证'){
		      Ext.Msg.alert('提示','所选费用类型非船务或者单证,不允许直接审批!')
		      return
		   }
		   if(sel_recs[x].get('hxbj')==1 && sel_recs[x].get('spbj')==1){
		      Ext.Msg.alert('提示','所选费用单有单据已核销,不允许解除审批!')
		      return
		   }
		   
		   sql = "select count(*)  from fksqspfyb where fydh="+sel_recs[x].get('fydh')+";"
		   var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
			{sql : sql});
			var data = Ext.decode(result);
			if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;}
			if(data.val!=null){
			ll_count = data.val;}
			if(ll_count>0 && sel_recs[x].get('spbj')==1){
			  Ext.Msg.alert('提示','【'+sel_recs[x].get('fydh')+'】"号已做付款申请单，不允许解除审批!');
			  return
			}
		}
		var idarray=[];
		var statusarray=[];
		for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('fydh'));
			statusarray.push(sel_recs[i].get('spbj'));
		}
		var status = sel_recs[0].get('spbj');
		var alertmsg="";
		if(status==0){
			alertmsg="是否审批所选单据?";
		}else if(status==1){
			alertmsg="是否取消审批所选单据?";
		}else{
			Ext.Msg.alert('提示','操作无效');
			return;
		}
		Ext.Msg.confirm("提示",alertmsg,function(btn){
		if(btn=="yes")
		{
			erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=doAppro',{
			    idarray:idarray.join(','),
			    spsj:new Date(),
			    sprm:erp.Util.currentUser.userInfo.name,
			    spbj:(status==0?1:0)
			});
			me.grdStore.reload();
		}
		})
  },
  /**提交前验证**/
  checkBeforeCommit : function(){
      var me = this;
  },
  /**检查是否被审批**/
  hasAppro: function(idarray){
       var me = this;
       var json = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=hasAppro',{
             idarray:idarray.join(',')
       });
       json=Ext.decode(json);
       return json.result;
  },
   /**检查标记前后台一致**/
  checkStatusSame:function(sel_recs,idarray,statusarray){
		var me=this;
		var json=erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=checkStatusSame',{
			idarray:idarray.join(','),
			statusarray:statusarray.join(',')
		});
		json=Ext.decode(json);
		if(json.result==0){
			me.grdStore.relaod();
			Ext.Msg.alert('提示','数据不一致，请重新尝试');
			return false;
		}
		var status=sel_recs[0].get('tjbj');
		for(var i=0;i<sel_recs.length;i++){
			var temp_status=sel_recs[i].get('tjbj');
			if(status!=temp_status){
				Ext.Msg.alert('提示','所选记录的状态位存在不一致');
				return false;
			}
		}
		return true;
	}
})
			         var win=btn.up('window');
					 var grid = win.down('#SubmitMenData');
					 var recs = grid.getSelectionModel().getSelection();
					 if(Ext.isEmpty(recs)||recs.length==0){
					   Ext.Msg.alert('提示','请选择提交对象！');
					   return;
					 }
					 if(recs!=null&&recs.length>0){
						tjdx=recs[0].get('czy_gh');
				     }
				     Ext.Ajax.request({
				        url : 'purchasecost/purchasecost.act?method=updateStatus',
				        async : false,
						timeout : 600000,
						method : 'POST',
						waitMsg : '正在进行数据验证，请耐心等候...',
						success : function(response, opts) {
							me.grdStore.reload();
						},
						params : {
						   idarray:idarray.join(','),
			               tjsj:new Date(),
			               tjrm:erp.Util.currentUser.userInfo.name,
			               tjbj:(status==0?1:0),
			               tjdx : tjdx
						}
				     });
				     var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=InsertFwoa',{
				          czy_gh : erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id,
				          f_spczy : tjdx,
				          tjbj:(status==0?1:0),
				          fydh : sel_recs[0].get('fydh')
				     })
				     win.close();
			      }
			   });
			   win.show();
			}else{
			     Ext.Ajax.request({
								// 将生成的xml发送到服务器端,需特别注意这个页面的地址
								url : 'purchasecost/purchasecost.act?method=updateStatus',
								async : false,
								timeout : 600000,
								method : 'POST',
								waitMsg : '正在进行数据验证，请耐心等候...',
								success : function(response, opts) {
									me.grdStore.reload();
								},
								params : {
									tjbj:0,idarray:idarray.join(',')
								}
							});
			     var myMask = new Ext.LoadMask({
			          target : me.panel
		         });		
		         myMask.mask('正在进行同步，请等待......'); 
				     var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=InsertFwoa',{
				          czy_gh : erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id,
				          f_spczy : '',
				          tjbj:(status==0?1:0),
				          fydh : sel_recs[0].get('fydh')
				     })		
				myMask.unmask();   
			}
		}
		})
  },
  //审批标记	  
  ApproPurchaseCost : function(){
         var me =this;
         var sel_recs=me.grdmain.getSelectionModel().getSelection();
         if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		for(var i=0;i<sel_recs.length-1;i++){
		     if(sel_recs[i].get('spbj')!=sel_recs[i+1].get('spbj')){
		           Ext.Msg.alert('提示','请选择相同审批状态的记录!');
				    return; 
		       }
		     }
		var sql;   var ll_count;  
		for(x in sel_recs){
		   if(sel_recs[x].get('fylx')!='船务' && sel_recs[x].get('fylx')!='单证'){
		      Ext.Msg.alert('提示','所选费用类型非船务或者单证,不允许直接审批!')
		      return
		   }
		   if(sel_recs[x].get('hxbj')==1 && sel_recs[x].get('spbj')==1){
		      Ext.Msg.alert('提示','所选费用单有单据已核销,不允许解除审批!')
		      return
		   }
		   
		   sql = "select count(*)  from fksqspfyb where fydh="+sel_recs[x].get('fydh')+";"
		   var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
			{sql : sql});
			var data = Ext.decode(result);
			if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;}
			if(data.val!=null){
			ll_count = data.val;}
			if(ll_count>0 && sel_recs[x].get('spbj')==1){
			  Ext.Msg.alert('提示','【'+sel_recs[x].get('fydh')+'】"号已做付款申请单，不允许解除审批!');
			  return
			}
		}
		var idarray=[];
		var statusarray=[];
		for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('fydh'));
			statusarray.push(sel_recs[i].get('spbj'));
		}
		var status = sel_recs[0].get('spbj');
		var alertmsg="";
		if(status==0){
			alertmsg="是否审批所选单据?";
		}else if(status==1){
			alertmsg="是否取消审批所选单据?";
		}else{
			Ext.Msg.alert('提示','操作无效');
			return;
		}
		Ext.Msg.confirm("提示",alertmsg,function(btn){
		if(btn=="yes")
		{
			erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=doAppro',{
			    idarray:idarray.join(','),
			    spsj:new Date(),
			    sprm:erp.Util.currentUser.userInfo.name,
			    spbj:(status==0?1:0)
			});
			me.grdStore.reload();
		}
		})
  },
  /**提交前验证**/
  checkBeforeCommit : function(){
      var me = this;
  },
  /**检查是否被审批**/
  hasAppro: function(idarray){
       var me = this;
       var json = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=hasAppro',{
             idarray:idarray.join(',')
       });
       json=Ext.decode(json);
       return json.result;
  },
   /**检查标记前后台一致**/
  checkStatusSame:function(sel_recs,idarray,statusarray){
		var me=this;
		var json=erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=checkStatusSame',{
			idarray:idarray.join(','),
			statusarray:statusarray.join(',')
		});
		json=Ext.decode(json);
		if(json.result==0){
			me.grdStore.relaod();
			Ext.Msg.alert('提示','数据不一致，请重新尝试');
			return false;
		}
		var status=sel_recs[0].get('tjbj');
		for(var i=0;i<sel_recs.length;i++){
			var temp_status=sel_recs[i].get('tjbj');
			if(status!=temp_status){
				Ext.Msg.alert('提示','所选记录的状态位存在不一致');
				return false;
			}
		}
		return true;
	}
})