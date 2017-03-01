Ext.define('erp.master.vendorFiles.controller.VendorFilesCtrl',{
     extend : 'Ext.app.Controller',
      requires : ['erp.ux.PagingBar',
                 'Ext.ux.TreePicker',
                 'Ext.window.MessageBox',
                 'erp.ux.FormKey',
                 'erp.ux.SelectField',
                 'erp.master.vendorFiles.store.VendorFiles',
                 'erp.master.vendorFiles.model.VendorFiles',
                 'erp.master.vendorFiles.model.QueryParams',
                 'erp.master.vendorFiles.model.historyVendorFiles',
                 'erp.master.foreigncurrency.store.foreignCurrency',
                 'erp.master.vendorFiles.model.UseVendorFiles',
                 'erp.master.vendorFiles.store.UseVendorFiles',
                 'erp.master.vendorFiles.store.historyVendorFiles',
                 'erp.master.vendorFiles.store.VendorAttachment',
                 'erp.master.vendorFiles.model.VendorAttachment'
                 ],
      views : ['erp.master.vendorFiles.view.VendorFilesManger',
               'erp.master.vendorFiles.view.VendorFilesForm',
               'erp.master.vendorFiles.view.VendorFilesQuery',
               'erp.master.vendorFiles.view.VendorFilesMaintain'
       ],
      refs : [{ref : 'VendorFilesManger', selector : 'mng_VendorFiles'},
      	      {ref : 'VendorFilesMaintain', selector : 'edt_vendorfiles'},
      	      {ref : 'GrdVendorFiles', selector : 'mng_VendorFiles #grd_VendorFiles'},
      	      {ref : 'VendorFilesForm',selector : 'edt_vendorfilesform'}],
      init : function(){
         var me = this;
	     if (me.isInited)
			return; 
		me.control({
		    'mng_VendorFiles' : {
		      afterrender : function(){
		          me.panel = me.getVendorFilesManger();
		          me.grdmain = me.getGrdVendorFiles();
		          /*me.grdStore = me.panel.store;
		          me.grdStore.load();*/
		          me.grdStore = me.getGrdVendorFiles().getStore();
		          me.grdStore.load();
		          me.fjStore = me.panel.fjStore;
		          me.hisStore = me.panel.hisStore;
		          me.useStore = me.panel.useStore;
		          me.query_rec=Ext.create('erp.master.vendorFiles.model.QueryParams');
		      }
		    },
		     'mng_VendorFiles #grd_VendorFiles' : {
		      selectionchange : function(grid, rec) {
		            if (rec.length > 0) {
		            	 me.fjStore.load({params:{ csbh:rec[0].get('csbh')}});
		                 me.useStore.load({params:{ csbh:rec[0].get('csbh')}});
		                 me.hisStore.load({params:{ csbh:rec[0].get('csbh')}});
		            }     
		      },
		      itemdblclick : function(grid,rec){
		                me.EdtVendorFiles('btn_edt');
		      }
		     },
		    'mng_VendorFiles button' : {
		        click : me.doAction
		    }
		    
		});	
		this.isInited=true;
      },
      doAction : function(btn){
	 	var me=this;
	/*	if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}*/
		  switch(btn.itemId){
	           case 'btn_add' : 
	           this.EdtVendorFiles(btn.itemId);
	           break;
	           case 'btn_edt' : 
	           this.EdtVendorFiles(btn.itemId);
	           break;
	           case 'btn_del' : 
	           this.DeleteVendorFiles();
	           break;
	           case 'btn_recover' :
	           this.doVendorFiles();
	           break;
	           case 'btn_archive' :
	           this.doArachive();
	           break;
	           case 'btn_appro' : 
	           this.doAppro();
	           break;
	           case 'btn_query' :
	            var win=Ext.widget('win_VFQuery',{
					itemId:'win_VFQuery',
					mainstore:me.grdStore,
					mainview:me.panel,
					rec:me.query_rec
				});
				win.show();
				break;
		  }
      },
      EdtVendorFiles : function(type){
          var me = this;
          var rec;
          var isAdd=isEdit=false;
         
        switch(type){
          case 'btn_add':
          	  isAdd=true;
          	  isEdit=false;
          	  canEdit=false;
          	  var today = new Date();
          	  var newcsbh = null;
           Ext.Ajax.request({
               url: 'vendorfiles/vendorfiles.act?method=getVendorFilesOne',
               async:false,
               success:  function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newcsbh=obj.data;
					    },
					    method:"POST",
					    scope:this
           });
           var rec = Ext.create('erp.master.vendorFiles.model.VendorFiles',{
           csbh: parseInt(newcsbh)+1,
           fzrq : today 
           });
           break;
         case 'btn_edt':
           var rec = me.grdmain.getSelectionModel().getSelection()[0];
           	if (rec.get('spbj') == "true" || rec.get('spbj') == "1") {
           	canEdit = true
           	}else{
           	canEdit = false
           	}
           isAdd=false;
		   isEdit=true;
	  	   break;
          }
       /*   if(Ext.isEmpty(rec)){
			   Ext.Msg.alert('提示','请先选中一条记录');
			   return;
		  }*/
		  var panel = erp.Util.addContentTab({
		  	          xtype: 'edt_vendorfiles',
		  	          itemId : 'vendorFilesMaintain',
		  	          title : '厂商档案编辑',
		  	          vendorFilesRec : rec,
		  	          isAdd : isAdd,
		  	          isEdit : isEdit,
		  	          canEdit : canEdit,
		  	          store : me.grdStore,
		  	          closable : true
		  });
      },
      DeleteVendorFiles : function(){
          var me = this;
          var sel_recs = me.grdmain.getSelectionModel().getSelection();
           if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		Ext.Msg.confirm("提示","确认删除记录?",function(btn){
		   if (btn=="yes")
		   me.grdStore.remove(sel_recs);
				me.grdStore.sync({
					success: function(batch,options) {
						 me.grdStore.reload();
					}
				});	
		})
      },
      //审批
      doAppro : function(){
           var me = this;
           var sel_recs=me.grdmain.getSelectionModel().getSelection();
           if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var idarray=[];
		var statusarray=[];
		for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('csbh'));
			statusarray.push(sel_recs[i].get('spbj'));
		}
	/*	var result = me.checkStatusSame(sel_recs,idarray,statusarray);
		if(!result){
		    return;
		}*/
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
			erp.Const.callServiceMethodSync('vendorfiles/vendorfiles.act?method=updateApproStatus',{
			    idarray:idarray.join(','),
			    spsj:new Date(),
			    sprm:erp.Util.currentUser.userInfo.name,
			    spbj:(status==0?1:0)
			});
			me.grdStore.reload();
		}
		})
      }
      
})