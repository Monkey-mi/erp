Ext.define('erp.master.materialArchive.controller.MaterialArchiveCtrl',{
     extend: 'Ext.app.Controller',
     requires : ['erp.master.materialArchive.store.Material',
                 'erp.master.materialArchive.store.Product',
                 'erp.master.materialArchive.store.Plan',
                 'erp.master.materialArchive.store.CtrlPrice',
                 'erp.master.materialArchive.store.PriceParameter',
                 'erp.master.materialArchive.store.HisPrice',
                 'erp.master.materialArchive.store.ProductBufferrd',
                 'erp.master.materialArchive.model.QueryParams',
                 'erp.view.master.company.store.CompanyShow',
                 'erp.master.caterialPricePurchase.store.MaterialClass',
                 'erp.master.materialArchive.store.Jldw',
                 'erp.master.group.store.Group'],
     views : ['erp.master.materialArchive.view.MaterialArchiveManger',
              'erp.view.master.purchaseDetail.window.MateCombo',
              'erp.master.materialArchive.view.MaterialQuery',
              'erp.master.materialArchive.view.BatchEdit',
              'erp.master.materialArchive.view.EdtPriceParameter'
              ],
     refs : [{ref:'MaterialArchiveManger',selector:'mng_MaterialArchiveManger'},
     	     {ref:'GrdMaterialArchive',selector:'mng_MaterialArchiveManger #grd_MaterialArchive'},
     	     {ref:'GrdPriceParameter',selector:'mng_MaterialArchiveManger #grd_Jgcs'},
     	     {ref:'BatchEdit',selector: 'batchedt_Material'},
     	     {ref:'EdtPriceParameter',selector:'EdtPriceParameter'}],
              
     init : function(){
        var me = this;
        if (me.isInited)
			return;
			me.control({
			   'mng_MaterialArchiveManger' : {
			   	 afterrender : function(){
			       me.panel = me.getMaterialArchiveManger();
			       me.grdmain = me.getGrdMaterialArchive();
			       me.grdPP = me.getGrdPriceParameter();
			   	   me.grdStore = me.panel.store;
			   	   me.proStore = me.panel.proStore;
			   	   me.planStore = me.panel.planStore;
			   	   me.cpStore = me.panel.cpStore;
			   	   me.hisStore = me.panel.hisStore;
			   	   me.jgcsStore = me.panel.jgcsStore;
			   	   me.grdStore.load();
			   	    me.query_rec=Ext.create('erp.master.materialArchive.model.QueryParams');
			   	   }
			    },
			    'mng_MaterialArchiveManger button' : {
			       click : me.doAction
			    },
			    'batchedt_Material button' : {
			       click : me.doBatch
			    },
			    'EdtPriceParameter' : {
			        afterrender : function(th){
			         	/*me.panel.down('#top_bar').disable();*/
			         	me.grdmain.disable();
			         	/*me.panel.can_use_btn=false;*/
			         },
			         beforedestroy:function(th){
			       /*    me.panel.down('#top_bar').enable();*/
			           me.grdmain.enable();
					/*   me.panel.can_use_btn=true;*/
					   var sel_rec=me.grdmain.getSelectionModel().getSelection()[0];
					   me.grdmain.getSelectionModel().select(sel_rec);
			         } 
			    },
			    'EdtPriceParameter button' : {
			      click : me.doEditAction
			    },
			    'mng_MaterialArchiveManger #grd_MaterialArchive' : {
			       selectionchange : function(grid, rec) {
			           if (rec.length > 0) {
			           	  Ext.apply(me.proStore.proxy.extraParams,{
			           	      clhh:rec[0].get('clhh')
			           	  })
			           	  me.proStore.load();
			           	  me.planStore.load({params : {clhh:rec[0].get('clhh')}});
			              me.cpStore.load({params : {clhh:rec[0].get('clhh')}});
			              me.hisStore.load({params : {clhh:rec[0].get('clhh')}});
			              me.jgcsStore.load({params : {clhh:rec[0].get('clhh')}});
			           	  }else{
			           }
			       }
			    }
			});
			me.isInited = true;
     },
    doAction : function(btn){
      var me =this;
      var store =  me.grdStore;
   
      switch(btn.itemId){
      /*   case 'btn_pos' : */
         case 'btn_query' : 
         var win = Ext.widget('MaterialQuery',{
              itemId : 'MaterialQuery',
              store  : me.grdStore,
              mainview  :  me.panel,
              rec:me.query_rec
         });
          win.show();
          break;
         case 'btn_appro' : 
          var store  = me.grdStore;
          var recs = me.grdmain.getSelectionModel().getSelection();
          if(recs.length==0){
              Ext.Msg.alert('提示','请选择至少一条明细记录(可多选)!');
				break;
          }else{
             for(var i=0;i<recs.length-1;i++){
		     if(recs[i].get('shbj')!=recs[i+1].get('shbj')){
		           Ext.Msg.alert('提示','请选择相同审批状态的材料进行操作！');
				    return; 
		       }
		     }
		   var rc=recs[0];
		   var czym = erp.Util.currentUser.userInfo.name;
		   var czrq = new Date(); 
		   Ext.Msg.confirm('提示','是否确认审批所选材料?',function(btn){
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
									'materialarchive/materialarchive.act?method=doAppro', {
										recordData : recordData,sprm:czym,spsj:czrq
									});
						store.reload();
                }
		   })  
          }
          break;
         case 'btn_batch' : 
          this.doModify();
         break;
         case 'btn_jgcs_add' :
        /* newrec = Ext.create('erp.master.materialArchive.model.PriceParameter');
          me.jgcsStore.add(newrec);*/
         var isEdit =  false;
         var recs = me.grdmain.getSelectionModel().getSelection()[0];
         if(Ext.isEmpty(recs) ){
		          	Ext.Msg.alert('提示','请先选中一条记录');
			        return;
		          }
		 var clhh = recs.get('clhh');
		 var maxxh = erp.Const.callServiceMethodSync('materialarchive/materialarchive.act?method=getMaxjlxh',{clhh:clhh});
		 var rec = Ext.create('erp.master.materialArchive.model.PriceParameter',{clhh: clhh,jlxh:maxxh+1});
		 var win = Ext.widget('EdtPriceParameter',{
		         itemId : 'EdtPriceParameter',
		         rec:rec[0],
		         isEdit : isEdit,
		         store :  me.jgcsStore
		 });
		 win.loadData(rec,isEdit);
		 win.show();
         break;
         case 'btn_jgcs_edt' : 
         var isEdit = true;
         var recs = me.grdmain.getSelectionModel().getSelection()[0];
         if(Ext.isEmpty(recs) ){
		          	Ext.Msg.alert('提示','请先选中一条记录');
			        return;
		          }
		 var rec = me.grdPP.getSelectionModel().getSelection()[0];
		 console.log(rec)
		  var win = Ext.widget('EdtPriceParameter',{
		         itemId : 'EdtPriceParameter',
		         rec:rec,
		         /*isEdit : isEdit,*/
		         store :  me.jgcsStore
		 });
		 win.loadData(rec);
		 win.show();
         break;
         case 'btn_jgcs_del' : 
         var recs = me.grdPP.getSelectionModel().getSelection();
         var ppstore = me.getGrdPriceParameter().getStore();
         if(Ext.isEmpty(recs)){
               Ext.Msg.alert('提示','请先选中至少一条价格参数');
			  return;
            }
           
         Ext.Msg.confirm("提示","是否确认删除该控制单价?",function(btn){
           if (btn=="yes"){
           ppstore.remove(recs);
            ppstore.sync({
					success: function() {
						  ppstore.reload();
					}
				});	}
         })   
         break;
         case 'BTN_SAVE':
         break;
         case  'btn_his':
         var store = me.grdStore;
         var recs =  me.grdmain.getSelectionModel().getSelection();
        /* var btnBackup = me.panel.down('')*/
         if(btn.getText()=='历史记录'){
             btn.setText('当前材料');
           Ext.apply(store.proxy.extraParams,{gdbj:1}); 
          }else{
             btn.setText('历史记录');
              Ext.apply(store.proxy.extraParams,{gdbj:0}); 
           }
           store.load();
        }
     },
     doModify : function(){
     	var grid = this.getGrdMaterialArchive();
     	var rec = grid.getSelectionModel().getSelection();
     	  if(Ext.isEmpty(rec)){
			Ext.Msg.alert('提示','请先选中至少一条记录');
			return;
		 }
		 var win = Ext.widget('batchedt_Material',{
	           itemId: 'batchedt_Material',
	           rec : rec
	      });
	      win.show();
     },
     doEditAction : function(btn,rec_recs){
        var me = this;
        switch (btn.itemId){
          case 'BTN_SAVE' :
            var edt_PP = me.getEdtPriceParameter();
            var form = edt_PP.down('form');
            var sel_recs = me.grdmain.getSelectionModel().getSelection()[0];
            	if (form.getForm().isValid() && form.getForm().isDirty()) {
            	    var rec = form.getRecord();// 返回当前通过 loadRecord 加载的
					// Ext.data.Model 实例.
            	}
            	Ext.Msg.confirm('提醒', '保存信息到数据库?', function(btn) {
            	      if (btn == "yes") {
            	      	 form.updateRecord(rec);
            	      	 var clhh = sel_recs.get('clhh');
            	      	 var gycs = rec.get('gycs');
            	      	 
            	      	 if (form.store.indexOf(rec) < 0) {
            	      	  	var count  =  erp.Const.callServiceMethodSync('materialarchive/materialarchive.act?method=getCount',{clhh:clhh,gycs:gycs});
            	            if(count>0){
            	              Ext.Msg.alert('提示','同个厂商不能有两个参数！');
            	               return;
            	             }
            	              form.store.add(rec);
							  var win = me.getEdtPriceParameter();
							  win.close();
							 form.store.sync({
									success : function(e, batch) {
										  form.store.reload({
	  	                                    params : {
	  	                                       clhh : sel_recs.get('clhh')
	  	                                      }
	  	                                  });
										Ext.Msg.alert('Tips', '保存成功!');
									},
									failure : function(batch, options) {
										Ext.Msg.alert('Tips', '保存失败!');
									}
								});
            	          }else{
            	            var values  = me.getEdtPriceParameter().getData();
            	            rec.set('csbh',values.csbh,
            	                    'gscs',values.gscs,
            	                    'gycs',values.gycs 
            	            )
            	         /*   var result = */
            	            var win = me.getEdtPriceParameter();
            	            win.close();
            	            form.store.sync({
									success : function(e, batch) {
										form.store.reload({
	  	                                    params : {
	  	                                       clhh : sel_recs.get('clhh')
	  	                                      }
	  	                                  });
										Ext.Msg.alert('Tips', '保存成功!');
									},
									failure : function(batch, options) {
										Ext.Msg.alert('Tips', '保存失败!');
									}
								});
            	          }
            	      }
            	})
            
         }
     },
     //批量修改提交
     doBatch : function(btn){
      var me = this;
      var win =  me.getBatchEdit();
      if(btn.action == "BTN_SAVE"){
            var values = me.getBatchEdit().getData(); 
            var grid = me.getGrdMaterialArchive();
            var recs = grid.getSelectionModel().getSelection();
            Ext.each(recs,function(rec){
                if(values.zhgs!=""){
                   rec.set('zhgs',values.zhgs)}
                if(values.txgz!=""){
                   rec.set('txgz',values.txgz)}
                
                   rec.set('cgbj',values.cgbj)
                if(values.zdcgl!=""){
                   rec.set('zdcgl',values.zdcgl)}
                if(values.zxbzl!=""){
                   rec.set('zxbzl',values.zxbzl)}
                if(values.ghzq!=""){
                   rec.set('ghzq',values.ghzq)}
                if(values.cgtqq!=""){
                   rec.set('cgtqq',values.cgtqq)}
                if(values.cgzh!=""){
                   rec.set('cgzh',values.cgzh)}
                if(values.cgym!=""){
                   rec.set('cgym',values.cgym)}	
                   rec.set('aqlbj',values.aqlbj)
                if(values.gsbh!=""){
                   rec.set('gsbh',values.gsbh)}
                if(values.yzws!=""){
                   rec.set('yzws',values.yzws)}
                if(values.djyz!=""){
                   rec.set('djyz',values.djyz)}
            });
            Ext.each(recs,function(rec){
               if(!Ext.isEmpty(values)){
                  rec.set('czym',erp.UInfo.currentUser.name);
                  rec.set('czsj',new Date())
               }
            });
            win.close();
            me.grdStore.sync();
            me.grdStore.reload();
		    Ext.Msg.alert('Tips', '保存成功!');
      }
     }
     
})