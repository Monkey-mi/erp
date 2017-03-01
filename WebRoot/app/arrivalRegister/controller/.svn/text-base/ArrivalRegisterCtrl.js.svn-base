Ext.define('erp.arrivalRegister.controller.ArrivalRegisterCtrl',{
    extend : 'Ext.app.Controller',
    requires : ['erp.ux.PagingBar',
    'erp.arrivalRegister.store.EdtAr',
    'erp.arrivalRegister.store.ArrivalRegister',
    'erp.arrivalRegister.store.Warehouse',
    'erp.arrivalRegister.store.Rkd',
    'erp.arrivalRegister.model.QueryParam',
    'erp.arrivalRegister.model.HisLoadParam',
    'erp.arrivalRegister.store.GoodsAllocation',
    'erp.arrivalRegister.store.ContractImp',
    'erp.arrivalRegister.store.PlanImp',
    'erp.arrivalRegister.store.OutSideImp',
    'erp.arrivalRegister.store.HistoryArrival'],
    views : [
      'erp.arrivalRegister.view.ChooseWarehouse',
      'erp.arrivalRegister.view.ArrivalRegisterManger',
      'erp.arrivalRegister.view.EdtArrivalRegister',
      'erp.arrivalRegister.view.Return',
      'erp.arrivalRegister.view.QueryArrivalRegister',
      'erp.arrivalRegister.view.FilterArrivalRegister',
      'erp.arrivalRegister.view.ContractImp',
      'erp.arrivalRegister.view.PlanImp',
      'erp.arrivalRegister.view.OutSideImp',
      'erp.arrivalRegister.view.HisFilter',
      'erp.arrivalRegister.view.HistoryMaterial',
      'erp.arrivalRegister.view.QueryMain'
    ],
    refs : [
    	{ref : 'ChooseWarehouse',selector : 'Choose_Warehouse'},
    	{ref : 'ArrivalRegisterManger',selector : 'mng_ArrivalRegisterManger'},
    	{ref : 'GrdArrivalRegister',selector : 'mng_ArrivalRegisterManger #grd_ArrivalRegister'},
    	{ref : 'EdtArrivalRegister',selector : 'edt_ArrivalRegister' },
    	{ref : 'Return',selector : 'Return_goods'},
    	{ref : 'HistoryMaterial',selector : 'History_Material'}],
    init : function(){
         var me = this;
         if (me.isInited)
         return;
         me.control({
          /* 'Choose_Warehouse' : {
           	  afterrender : function(){
           	     me.win = me.getChooseWarehouse();
           	     me.win.store.load({params: {czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id}})
           	   }
           },*/
           'mng_ArrivalRegisterManger' : {
             afterrender : function(){
                 me.panel = me.getArrivalRegisterManger();
                 me.grdmain = me.getGrdArrivalRegister();
                 me.grdStore = me.panel.store;
           	     me.query_rec =  Ext.create('erp.arrivalRegister.model.QueryParam');
                 me.his_rec = Ext.create('erp.arrivalRegister.model.HisLoadParam')
             }
           },
           'mng_ArrivalRegisterManger button'  : {
                click:me.doAction
           },
           'mng_ArrivalRegisterManger #grd_ArrivalRegister' : {
               itemdblclick : function(grid, rec) {
                    me.EdtArrivalRegister('btn_edt')
               }           
           },

           'Return_goods button' : {
                click : me.Returngoods
           },
           'edt_ArrivalRegister button' : {
                click : me.doEdtArrivalRegister
           },
           'History_Material button' : {
                click : me.doHisAction
           }
          });
          me.isInited=true;
      },
          doAction : function(btn){
             var me = this;
             var recs = me.grdmain.getSelectionModel().getSelection();
             switch(btn.itemId){
                 case  'btn_add' : 
                 this.EdtArrivalRegister(btn.itemId);
                 break;
                 case 'btn_edt' : 
                 this.EdtArrivalRegister(btn.itemId);
                 break;
                 case 'btn_Return' :
                 this.Return();
                 break;
                 case 'btn_query' :
                 var win = Ext.widget('Query_Main',{
                         mainstore : me.grdStore,
                         rec : me.query_rec,
                         ckbh : me.panel.ckbh
                 })
                 win.show();
                 break;
                 case 'btn_del' : 
                 var rec = me.grdmain.getSelectionModel().getSelection()[0];
                 if(Ext.isEmpty(rec)){
                 Ext.Msg.alert('提示','请选择一条记录！');
                 return
                 }
                 var dhdh = rec.get('dhdh'); var czym = rec.get('czym');
                 
                 var count = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=IfAward',{
                    dhdh : dhdh,ckbh : me.panel.ckbh
                 });
                 if(count>0){
                    Ext.Msg.alert('提示',''+dhdh+'号到货单已有记录判定过，不能删除!')
                    return
                 }
                 var ll_gltk = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getGltk',{
                    dhdh : dhdh,ckbh : me.panel.ckbh
                 })
                 if(ll_gltk>0){
                    Ext.Msg.alert('提示',''+dhdh+'号到货单有关联退库生成，不能删除！');
                    return
                 }
                 if(Ext.String.trim(czym)!=erp.UInfo.currentUser.name&&erp.UInfo.currentUser.roleList[0].role_name!="admins"
                 &&erp.UInfo.currentUser.roleList[0].role_name!="管理员"){
                 	Ext.Msg.alert('提示','只有操作员本人或管理员才允许删除单据！');
                    return
                 }
                 Ext.Msg.confirm('提示','是否确认删除【'+dhdh+'】号到货单(Y/N)?',function(btn){
                     if(btn=='yes'){
                         /*me.grdStore.remove(rec);*/
                     	var result = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=deleteArrivalRegister',{
                     	     data:'['+Ext.encode(rec.data)+']'
                     	})
                         me.grdStore.reload()
                     }
                 })
                 break;
                 case 'btn_Stop' : 
                 if(recs.length==0){
                 Ext.Msg.alert('提示','请选择一条记录！');
                 return
                 }
                 var zzbj = recs[0].get('zzbj');
                 for(var i=0;i<recs.length-1;i++){
                     if(recs[i].get('zzbj')!=recs[i+1].get('zzbj')){
                        Ext.Msg.alert('提示','请选择中止标记一致的记录！');
                        return
                     }
                 }
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
                 var rzzbj;    var tmsg;
                 if(zzbj==0){
                 tmsg = '是否确认中止所选到货单(Y/N)?'; 	 
                 rzzbj = 1;
                 }else{
                 tmsg = '是否取消中止所选到货单(Y/N)?';
                 rzzbj = 0;
                 }
                 Ext.Msg.confirm('提示',tmsg,function(btn){
                    if(btn=="yes"){
                    	var zzrm = erp.Util.currentUser.userInfo.name;
                    	var zzsj = new Date();
                        var result = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=StopList',{
                           zzrm : zzrm,zzsj : zzsj,recordData : recordData,zzbj : rzzbj
                           })
                        var data = Ext.decode(result);
		                if (data.bool == false) {
			            Ext.Msg.alert('提示', data.msg)
		                return;
		                }else{
		                Ext.Msg.alert('提示','操作成功！') 	
		                me.grdStore.reload();}
                        }
                     })
                break;
                case 'btn_his' :
                var win = Ext.widget('filter_his',{
                	ckbh :  me.panel.ckbh,
                	ckmc : me.panel.ckmc,
                	rec : me.his_rec
                });
                win.show();
                break;
                case 'btn_rkdquery' : 
                var rec = me.grdmain.getSelectionModel().getSelection()[0];
                if(Ext.isEmpty(rec)){
                 Ext.Msg.alert('提示','请选择一条记录！');
                 return
                 }
                var ckmc = me.panel.ckmc
                var panel = erp.Util.addContentTab({
                	  xtype : 'Query_ArrivalRegister',
                	  itemId : 'QueryArrivalRegister',
                	  ckbh : me.panel.ckbh,
                	  dhdh : rec.get('dhdh'),
                	  dhxh : rec.get('dhxh'),
                	  title : '【仓库名称:'+ckmc+' 到货单号:'+rec.get('dhdh')+' 到货序号:'+rec.get('dhxh')+'】'
                })
                break;
                case 'btn_zjdqueryvqb' : 
                var rec = me.grdmain.getSelectionModel().getSelection()[0];
                if(Ext.isEmpty(rec)){
                 Ext.Msg.alert('提示','请选择一条记录！');
                 return
                 }
                 var zjdh = rec.get('zjdh');
                 if(zjdh!=null&&zjdh!=''){
                    var result =  erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getICQ',{
                       zjdh : zjdh
                    })  
                    if(result > 0){
                       
                    }else{
                    Ext.Msg.alert('提示','无相应的ICQ')
                    }
                 }
                break;
                case 'btn_ztsx' : 
                var recs = me.grdmain.getSelectionModel().getSelection();
                if(recs.length==0){
                 Ext.Msg.alert('提示','请选择一行或多行记录！');
                 return}
                Ext.Msg.confirm('提示','是否确认刷新所选到货单的到货状态(Y/N)?',function(btn){
                     if(btn=='yes'){
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
                         
                         var result = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=RefStatus',{
                            recordData : recordData
                         })
                         var data = Ext.decode(result);
		                  if (data.bool == false) {
			              Ext.Msg.alert('提示', data.msg)
		                    return;
		                  }
		                 else{
		                  Ext.Msg.alert('提示','状态更新完成!')
		                    me.grdStore.reload();
		                  }
                     }
                }) 
                break;
                case 'btn_sjsx' : 
                var recs = me.grdmain.getSelectionModel().getSelection();
                if(Ext.isEmpty(recs)){
                 Ext.Msg.alert('提示','请选择一行或多行记录！');
                 return}
                 Ext.Msg.confirm('提示','是否确认刷新所选到货单的入库时间和锁定时间(Y/N)?',function(btn){
                       if(btn=='yes'){
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
                         var result = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=TimeRefresh',{
                             recordData : recordData,ckbh : me.panel.ckbh
                         })
                         var data = Ext.decode(result);
		                  if (data.bool == false) {
			              Ext.Msg.alert('提示', data.msg)
		                    return;
		                  }
		                 else{
		                   Ext.Msg.alert('提示','时间更新完成!')
		                        me.grdStore.reload();
		                     }
                         }
                 })
                break;
             }
          },
          doEdtArrivalRegister : function(btn){
          	   var me = this;
          	   var edt_ArrivalRegister = me.getEdtArrivalRegister();
          	   var form = edt_ArrivalRegister.down('#fkForm');
          	   var grd_edtArrivalRegister = edt_ArrivalRegister.down('#grd_edtArrivalRegister');
          	   var arStore = edt_ArrivalRegister.arStore;
          	   switch(btn.itemId){
          	       case 'btn_save' : 
          	         var rec = form.getRecord();
          	          form.updateRecord(rec);
          	           rec.set('czym',erp.UInfo.currentUser.name);
	  	               rec.set('czsj',new Date());
          	          Ext.Msg.confirm('提示','是否确认保存！',function(btn){
                    if(btn=='yes'){
	  	               //部门检测
                      Ext.getBody().mask('正在验证和保存，请耐心等候...');	
          	          var recs = grd_edtArrivalRegister.getStore().data.items;
          	           if(form.getForm().isValid()&&form.getForm().isDirty()){
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
		                var recs = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=CheckBeforeSave',{
		                    recordData : recordData,s_add : edt_ArrivalRegister.isAdd
		                })
		                var data = Ext.decode(recs);
		                if (data.bool == false) {
			            Ext.Msg.alert('提示', data.msg)
			            Ext.getBody().unmask();
		                return;
		                }
          	           	  
		                if(edt_ArrivalRegister.isEdit&&rec.get('dhdh')>0){
		                    /*me.grdStore.sync({
								    success : function(e, batch) {
									   me.grdStore.reload();
								}
					        });*/
					        var nrecs = new Array();
					        arStore.each(function(record){
					             record.set('dhdh',rec.get('dhdh'));
					             record.set('dhrq',rec.get('dhrq'));
					             record.set('pjrq',rec.get('pjrq'));
					             record.set('csbh',rec.get('csbh'));
					             record.set('jkrm',rec.get('jkrm'));
					             record.set('czym',rec.get('czym'));
					             record.set('czsj',rec.get('czsj'));
					             record.set('ckbh',me.panel.ckbh);
					             nrecs.push(record.data);
					        });
					        /*arStore.sync({
					             success : function(){
					                 arStore.reload({
					                    params:{
					                       dhdh : rec.get('dhdh'), 
					                       ckbh : rec.get('ckbh')
					                           }
					                    })
					                 edt_ArrivalRegister.close();  
					                 Ext.Msg.alert('提示','保存成功');
					             }
					        });*/
					        var result = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=updateArrivalRegister',{
					            data : Ext.encode(nrecs)
					        })
					        Ext.getBody().unmask();
					        Ext.Msg.alert('提示','保存成功');
					        edt_ArrivalRegister.isEdit = false;
					        edt_ArrivalRegister.close(); 
		                  }else{
		                    /*rec.phantom =true;//表示新增
                            me.grdStore.add(rec);
		                    me.grdStore.sync({
		                          success : function(e,batch){
                                  var newRec = batch.operations.create[0];
                                  form.loadRecord(newRec);
						          me.grdStore.reload();
						          
						          }
		                      });*/
                            var ll_count;
                            /*var dhdh = rec.get('dhdh');*/
                           /* var sql = "select count(*) from dhdjb_yl where ckbh="+me.panel.ckbh+" and dhdh="+dhdh+";"
                            var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
						    var data = Ext.decode(result);
				             if (!data.bool) {
					         Ext.toastErrorInfo(data.msg);
					         return;
				             }
				            if(data.val!=null){
				             ll_count = data.val;}
				            if(ll_count>0){
				                Ext.Msg.alert('提示','该到货单号已存在,现取最大号代替!');
				                dhdh = rec.get('dhdh')+1;
				             }*/
				            var nrecs = new Array(); 
		                    arStore.each(function(record){
		                    	       record.set('dhrq',rec.get('dhrq'));
					                   record.set('pjrq',rec.get('pjrq'));
					                   record.set('csbh',rec.get('csbh'));
					                   record.set('jkrm',rec.get('jkrm'));
					                   record.set('czym',rec.get('czym'));
					                   record.set('czsj',rec.get('czsj'));
					                   record.set('ckbh',me.panel.ckbh);
						               record.set('jkrm',rec.get('jkrm'));
						               record.set('shdh',rec.get('shdh'));
						               record.set('ztbj',1);
					                   record.set('jyjg',1);
					                   nrecs.push(record.data);
						           });   
						      var result = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=addArrivalRegister',{
					            data: Ext.encode(nrecs)
					        })
					        Ext.getBody().unmask();
					        Ext.Msg.alert('提示','保存成功！');
					        me.panel.store.reload();
					        edt_ArrivalRegister.isEdit = false;
					        edt_ArrivalRegister.close();
		                   }
          	           }  
                    }})
          	       break;
          	       case 'btn_htdr' : 
          	        var recs = form.getRecord();
          	        form.updateRecord(recs);
          	        recs.set('czym',erp.UInfo.currentUser.name);
	  	            recs.set('czsj',new Date());
          	        var values = form.getValues();
          	        var csbh =  recs.get('csbh');
          	        var dhrq = recs.get('dhrq');
          	        var hsbm = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getHsbm',{
          	            ckbh : me.panel.ckbh
          	        });
          	        var htStore = Ext.create('erp.arrivalRegister.store.ContractImp');
          	        var win = Ext.widget('Imp_Contract',{
          	             csbh : csbh,
          	             dhrq : dhrq,
          	             ckbh : ckbh,
          	             dhdh : recs.get('dhdh'),
          	             hsbm : hsbm,
          	             htStore : htStore,
          	             title: '合同选择 【'+recs.get('csmc')+'】'
          	        });
          	        var maxdhxh; 
          	        win.down('#btn_confirm').on({
          	             click : function(btn){
          	                var win = btn.up('window');
				            var bool = false;
				            var fzsl;
				            var nrecs =new Array();
				            var dhxh = arStore.max('dhxh')==null?1:arStore.max('dhxh')+1;
				             win.selStore.each(function(rec){
				             	fzsl = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getFzsl',{
				                        htbh : rec.get('htbh'),htxh : rec.get('htxh'),fzsl : rec.get('fzsl')
				                    });
				                var ckbh = me.panel.ckbh;
				                var r = Ext.create('erp.arrivalRegister.model.ArrivalRegister',{
				                    ckbh : ckbh,
				                    dhdh : recs.get('dhdh'),
				                    dhxh : dhxh,
				                    csbh : csbh,
				                    dhrq : new Date(),
				                    pjrq : new Date(),
				                    clhh : rec.get('clhh'),
				                    clmc : rec.get('clmc'),
				                    dhsl : rec.get('cgsl'),
				                    htbh : rec.get('htbh'),
				                    htxh : rec.get('htxh'),
				                    jhbh : rec.get('jhbh'),
				                    jhxh : rec.get('jhxh'),
				                   /* wdsl : rec.get('wdsl'),*/
				                    cltx1 : rec.get('cltx1'),
				                    cltx2 : rec.get('cltx2'),
				                    cltx3 : rec.get('cltx3'),
				                    jldw : rec.get('jldw'),
				                    zjbj : rec.get('zjbj'),
				                    fzzbj : rec.get('fzzbj'),
				                    fzdw : rec.get('fzdw'),
				                    hth : rec.get('hth'),
				                    jhh : rec.get('jhh'),
				                    jkrm : recs.get('jkrm'),
				                    czym : recs.get('czym'),
				                    bzsm : rec.get('bzsm'),
				                    czsj : new Date(),
				                    fzsl : fzsl
				                });
				                nrecs.push(r);
				                dhxh++;
				             });
				              arStore.add(nrecs);
				              if(bool){return ;}
						      win.close();
          	             }
          	        });
          	        win.show();
          	        break;
          	       case 'btn_jhdr' : 
          	        var recs = form.getRecord();
          	        form.updateRecord(recs);
          	        recs.set('czym',erp.UInfo.currentUser.name);
	  	            recs.set('czsj',new Date());
          	        var csbh =  recs.get('csbh');
          	        var dhrq = recs.get('dhrq');
          	        var ckbh = me.panel.ckbh;
          	        var hsbm = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getHsbm',{
          	            ckbh : ckbh
          	        });
          	        var jhStore = Ext.create('erp.arrivalRegister.store.PlanImp');
          	        var win =  Ext.widget('Imp_Plan',{
          	             csbh : csbh,
          	             dhrq : dhrq,
          	             ckbh : ckbh,
          	             dhdh : recs.get('dhdh'),
          	             hsbm : hsbm,
          	             jhStore : jhStore,
          	             title : '计划选择【'+recs.get('csmc')+'】'
          	        })
          	        var maxdhxh;
          	        win.down('#btn_confirm').on({
          	            click : function(btn){
          	                var win = btn.up('window');
          	                var bool = false;
          	                var nrecs =new Array();
				            var dhxh = arStore.max('dhxh')==null?1:arStore.max('dhxh')+1;
          	                win.selStore.each(function(rec){
          	                	 if(!Ext.isEmpty(rec)&&rec.get('clhh')!=null){
          	                     maxdhxh = arStore.max('dhxh');
          	                     var r = Ext.create('erp.arrivalRegister.model.PlanImp',{
				                    ckbh : me.panel.ckbh,
				                    dhdh : recs.get('dhdh'),
				                    dhxh : Ext.isEmpty(maxdhxh)?1:(maxdhxh+1),
				                    csbh : csbh,
				                    dhrq : dhrq,
				                    pjrq : recs.get('pjrq'),
				                    jkrm : rec.get('jkrm'),
				                    clhh : rec.get('clhh'),
				                    clmc : rec.get('clmc'),
				                    clth : rec.get('clth'),
				                    zjbj : rec.get('zjbj'),
				                    dhsl : rec.get('wrsl'),
				                    jldw : rec.get('jldw'),
				                    fzzbj : rec.get('fzzbj'),
				                    jhbh : rec.get('jhbh'),
				                    jhxh : rec.get('jhxh'),
				                    jhh :  rec.get('jhh'),
				                    czym : recs.get('czym'),
          	                        czsj : new Date()
          	                     })
				                 nrecs.push(r);
				                 dhxh++;
          	                    }
          	                })
          	                 arStore.add(nrecs);
          	                 if(bool){return ;}
						      win.close();
          	             }
          	        })
          	        
          	        win.show()
          	        break;
          	       case 'btn_wxdr' :
          	        var recs = form.getRecord();
          	        form.updateRecord(rec);
          	        recs.set('czym',erp.UInfo.currentUser.name);
	  	            recs.set('czsj',new Date());
          	        var csbh =  recs.get('csbh');
          	        var dhrq = recs.get('dhrq');
          	        var ckbh = me.panel.ckbh;
          	        var hsbm = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getHsbm',{
          	            ckbh : ckbh
          	        });
          	        wxStore = Ext.create('erp.arrivalRegister.store.OutSideImp');
          	        var win = Ext.widget('Imp_OutSide',{
          	                  csbh : csbh,
          	                  dhrq : dhrq,
          	                  ckbh : ckbh,
          	                  dhdh : recs.get('dhdh'),
          	                  hsbm : hsbm,
          	                  wxStore : wxStore,
          	                  title : '外协导入'
          	        });
          	         var maxdhxh;
          	         var nrecs =new Array();
				     var dhxh = arStore.max('dhxh')==null?1:arStore.max('dhxh')+1;
          	        win.down('#btn_confirm').on({
          	            click : function(btn){
          	                var win = btn.up('window');
          	                var bool = false;
          	                var hrec =  win.selStore.getRange();
          	                for(var i=0;i<hrec.length-1;i++){
          	                    if(hrec[i].get('csbh')!=hrec[i+1].get('csbh')){
          	                         Ext.Msg.alert('提示','必须选中相同厂商的合同！')
          	                         return;
          	                    }
          	                } 
          	                var recs = form.getRecord();
          	                form.updateRecord(rec);
          	                recs.set('czym',erp.UInfo.currentUser.name);
	  	                    recs.set('czsj',new Date());
          	                win.selStore.each(function(rec){
          	                     if(!Ext.isEmpty(rec)&&rec.get('clhh')!=null){
          	                     fzsl = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getFzsl',{
				                        htbh : rec.get('wxdh'),htxh : rec.get('wxxh'),fzsl : rec.get('fzsl')
				                    }); 
          	                     var r =  Ext.create('erp.arrivalRegister.model.OutSideImp',{
          	                         ckbh : me.panel.ckbh,
				                     dhdh : recs.get('dhdh'), 
				                     dhxh : dhxh,
				                     csbh : recs.get('csbh'),
				                     dhrq : dhrq,
				                     clhh : rec.get('clhh'),
				                     cltx1 : rec.get('cltx1'),
				                     cltx2 : rec.get('cltx2'),
				                     cltx3 : rec.get('cltx3'),
				                     clmc : rec.get('clmc'),
				                     dhsl : rec.get('wdsl'),
				                     jldw : rec.get('jldw'),
				                     fzdw : rec.get('fzdw'),
				                     wxdh : rec.get('wxdh'),
				                     wxxh : rec.get('wxxh'),
				                     wxh : rec.get('wxh'),
				                     jhbh : rec.get('jhbh'),
				                     jhxh : rec.get('jhxh'),
				                     jhh : rec.get('jhh'),
				                     fzsl : fzsl,
				                     zjbj : rec.get('zjbj'),
				                     jkrm : recs.get('jkrm'),
				                     czym : recs.get('czym'),
				                     czsj : new Date()
          	                     }); 
          	                     	nrecs.push(r);
				                    dhxh++;
          	                     }
          	                 });
          	                  arStore.add(nrecs);
          	                  if(bool){return ;}
						      win.close();
          	            }
          	         })
          	        win.show(); 
          	        break;
          	       case 'btn_add' :
          	        var maxdhxh = arStore.max('dhxh');
          	        maxdhxh = Ext.isEmpty(maxdhxh)?1:(maxdhxh+1);
          	        var rec = form.getRecord();
          	        form.updateRecord(rec);
          	        var newrec = Ext.create('erp.arrivalRegister.store.EdtAr',{
          	            dhxh : maxdhxh,ckbh: me.panel.ckbh,dhdh:rec.get('dhdh'),
          	            dhrq : rec.get('dhrq'),pjrq : rec.get('pjrq'),
          	            csbh : rec.get('csbh'),jkrm : rec.get('jkrm'),
          	            czym : rec.get('czym'),czsj : rec.get('czsj')
          	        });
          	      
          	       arStore.add(newrec);
          	       break;
          	      case 'btn_del' :
          	       var edtpanel = me.getEdtArrivalRegister();
          	       var isAdd = edtpanel.isAdd;
          	       var recs = grd_edtArrivalRegister.getSelectionModel().getSelection();
          	       if(Ext.isEmpty(recs)){
                        Ext.Msg.alert('提示','请先选中至少一条明细');
			        return;
                    }
                    if(!isAdd){
                    for(x in recs){
                       if(recs[x].get('jyjg')!=1){
                          Ext.Msg.alert('提示','所选记录中有已检验的到货单，不能删除!');
                          return;
                       }
                    }
                    if(grd_edtArrivalRegister.getStore().getCount()==1){	 
                    Ext.Msg.alert('提示',"最后一条记录不能删除！");
                    return
                    }
                    else if(recs.length=grd_edtArrivalRegister.getStore().getCount()){
                    Ext.Msg.alert('提示','不能删除屏幕上所有记录！')
                    return
                    }
                    else{
                    arStore.remove(recs);
                    }
                    }else{
                    arStore.remove(recs); 	
                    }
          	      break;
          	   }
          },
          EdtArrivalRegister : function(btn){
               var me = this;
               var rec;
               var isAdd=isEdit=false;
               var isinit;
               var canedit=canedtgrd=true;
               var diswxdr = false;
               switch(btn){
                  case 'btn_add':
		             isAdd=true;
			         isEdit=false;
			         isinit = true;
			         /*var newdhdh = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getMaxdhdh',{
			            ckbh : me.panel.ckbh
			         })*/
			  /*   Ext.Ajax.request({
			         url: '',
			         async:false,
			         success: function(response,opts){
			               var obj = Ext.decode(response.responseText);
			               newdhdh=obj.data;
			         },
			         method:"POST",
			         scope:this
			     });*/
			        var rec = Ext.create('erp.arrivalRegister.model.ArrivalRegister',{
			           ckbh:me.ckbh,dhdh :0 ,pjrq : new Date(),dhrq : new Date(),
			           czym : erp.UInfo.currentUser.name, czsj : new Date(),jkrm : erp.UInfo.currentUser.name
			        })
			     break; 
			     case 'btn_edt':
			     isAdd=false;
			     isEdit=true;
			     isinit = false;
			     var rec = me.grdmain.getSelectionModel().getSelection()[0];
			   
			     if(rec.get('wxbj')==1){
			        diswxdr=true;
			     }
			     if(Ext.isEmpty(rec)){
			     Ext.Msg.alert('提示','请先选中一条记录');
			     return;
		         }
		         //核销标记
		         var s_count = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getHxbj',{
		            ckbh : rec.get('ckbh'),dhdh : rec.get('dhdh')
		         })
		         if(s_count>0){
		           canedtgrd = false;
		         }
		        
		         var gltk = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getGltk',{
		            ckbh : rec.get('ckbh'),dhdh : rec.get('dhdh')
		         })
		        
		         if(gltk>0){
		           canedtgrd = false;	
		           canedit = false;
		         }
		         break;
               }
               //缺少权限
               var hwStore = Ext.create('erp.arrivalRegister.store.GoodsAllocation');
               var panel =  erp.Util.addContentTab({
                   xtype : 'edt_ArrivalRegister',
                   itemId : 'EdtArrivalRegister',
                   isAdd : isAdd,
                   isEdit : isEdit,
                   canedit : canedit,
                   canedtgrd : canedtgrd,
                   diswxdr : diswxdr,
                   rec:rec[0],
                   ckbh : me.panel.ckbh,
                   mainPanel: me.panel,
                   isinit : isinit ,
                   hwStore : hwStore,
			       mainstore:me.grdStore,
			       title : '到货登记编辑【仓库名称:'+me.panel.ckmc+'】'
               })
               panel.loadData(rec,isEdit);
          },
          Return : function(){
             var me = this;
             var rec = me.grdmain.getSelectionModel().getSelection();
             if(Ext.isEmpty(rec)){
			     Ext.Msg.alert('提示','请选择要退货的记录(可多选)!');
			     return;
		         }
		    for(var i=0;i<rec.length;i++){
		       if(rec[i].get('ztbj')!=5||rec[i].get('shbj')==0){
		          Ext.Msg.alert('提示','只有已审核的待退记录方可进行退货处理!');
		          return;
		       }
		    }
		    var thdh = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getThdh');
		    var window = Ext.widget('Return_goods',{
		                      itemId :'Return_goods',
		                      rec : rec,
		                      thdh:thdh
		    })
		    window.show();
          },
          
          doHisAction : function(btn){
             var me = this;
             var win = me.getHistoryMaterial();
             var grid = win.down('#grdHistory');
             var lsStore = win.lsStore;
             switch(btn.itemId){
               case 'btn_cancelth' : 
                  var rec=grid.getSelectionModel().getSelection()[0];
                  if(Ext.isEmpty(rec)){
                    Ext.Msg.alert('提示','请选择一条记录');
                    return;
                  }else if(rec.get('ztbj')!=2){
                        Ext.Msg.alert('提示','只有已退状态的记录方可进行取消退货处理!');
                        return
                     }
                 /* for(x in rec){*/
                /*  }*/
                  Ext.Msg.confirm('提示','是否确认取消【'+rec.get('dhdh')+'-'+rec.get('dhxh')+'】号到货单的退货处理(Y/N)?',function(btn){
                     if(btn=='yes'){
                         erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=cancelReturn',{
                             ckbh : win.ckbh,dhdh: rec.get('dhdh'),dhxh : rec.get('dhxh')
                         })
                         lsStore.reload()
                     }
                  })
               break;
               case 'btn_cancelzz' : 
                 var recs=grid.getSelectionModel().getSelection();
                /* for(var i=0;i<recs.length-1;i++){
                     if(recs[i].get('zzbj')!=recs[i+1].get('zzbj')){
                         Ext.Msg.alert('提示','请选择中止标记一致的记录！');
                         return;
                     }
                 }*/
                 for(var i=0;i<recs.length;i++){
                    if(recs[i].get('zzbj')!=1){
                        Ext.Msg.alert('提示','请选择已经中止的记录！');
                        return;
                    }
                 }
                  Ext.Msg.confirm('提示','是否取消中止所选到货单(Y/N)?',function(btn){
                    if(btn=='yes'){
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
                      }
                      var zzrm = erp.Util.currentUser.userInfo.name;
                      var zzsj = new Date();
                      var res = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=StopList',{
                         zzrm : zzrm,zzsj : zzsj,recordData : recordData,zzbj : 0
                      })
                      lsStore.reload()
                    })
               break;
               case 'btn_rkdquery' :
                  var rec=grid.getSelectionModel().getSelection()[0];  
                  if(Ext.isEmpty(rec)){
                   Ext.Msg.alert('提示','请选择一条记录！');
                   return
                  }
                  var ckmc = me.panel.ckmc;
                  var panel = erp.Util.addContentTab({
                	  xtype : 'Query_ArrivalRegister',
                	  itemId : 'QueryArrivalRegister',
                	  ckbh : rec.get('ckbh'),
                	  dhdh : rec.get('dhdh'),
                	  dhxh : rec.get('dhxh'),
                	  title : '【仓库名称:'+ckmc+' 到货单号:'+rec.get('dhdh')+' 到货序号:'+rec.get('dhxh')+'】'
                })
               break;
               case 'btn_refreshtime' : 
                  var recs=grid.getSelectionModel().getSelection();
                  if(Ext.isEmpty(recs)){
                    Ext.Msg.alert('提示','请选择一行或多行记录！');
                  return}
                  Ext.Msg.confirm('提示','是否确认刷新所选到货单的入库时间和锁定时间(Y/N)?',function(btn){
                  if(btn=='yes'){
                     var recordData = "[";
		             var a=false;
		           Ext.each(recs, function(rec) {
		            if(a){
		         	   recordData += ",";}
		               recordData += Ext.encode(rec.data);
		               a=true;})
		               recordData += "]";  
                   var result = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=TimeRefresh',{
                   recordData : recordData,ckbh : me.panel.ckbh
                         })
                   var data = Ext.decode(result);
		               if (data.bool == false) {
			           Ext.Msg.alert('提示', data.msg)
		               return;
		           }else{
		               Ext.Msg.alert('提示','状态更新完成!')
		               me.grdStore.reload();
		               }
                    }
                 })
               break;
               case 'btn_query' : 
                var win = Ext.widget('Filter_ArrivalRegister',{
                         mainstore : lsStore,
                         rec : me.query_rec,
                         ckbh : me.panel.ckbh
                 })
                 win.show();
               break;
             }
          
          },
          //退货
          Returngoods : function(btn){
             var me = this;
             var win = me.getReturn();
             if(btn.action == "BTN_SAVE"){
                 var values = win.getData();
                 var thdh = values.thdh;
                 var thrq = new Date();
                 var rec = win.rec;
        		 var recordData = "[";
		         var a=false;
		         Ext.each(rec, function(rec) {
		         if(a){
		         	recordData += ",";
		         }
		         recordData += Ext.encode(rec.data);
		         a=true;
		         })
		         recordData += "]";       
		         var res = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=doReturnGoods',{
		             recordData : recordData,thdh:thdh,thrq:thrq,ckbh:me.panel.ckbh
		         })
		         var data = Ext.decode(res);
		         if (data.bool == false) {
			        Ext.Msg.alert('提示', data.msg)
		            return;
		           }
		           else{
		            Ext.Msg.alert('提示','操作成功!')
		            me.grdStore.reload();
		           }
		          win.close(); 
                 }
               }
})