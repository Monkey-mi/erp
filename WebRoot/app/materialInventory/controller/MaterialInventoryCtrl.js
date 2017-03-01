Ext.define('erp.materialInventory.controller.MaterialInventoryCtrl',{
	extend:  'Ext.app.Controller',
	requires : ['erp.ux.PagingBar',
	            'Ext.ux.TreePicker',
                'Ext.window.MessageBox',
                'erp.materialInventory.model.MaterialInventoryManager',
                'erp.materialInventory.store.MaterialInventoryManager',
                'erp.materialInventory.store.MaterialInventoryManagerBufferrd',
                'erp.materialInventory.model.Ckmc',
                'erp.materialInventory.store.Ckmc',
                'erp.materialInventory.model.UnitPriceCheck',
                'erp.materialInventory.store.UnitPriceCheck'],
    views : ['erp.materialInventory.view.MaterialInventoryManager',
             'erp.materialInventory.view.WarehouseDateChoose',
             'erp.materialInventory.view.MaterialInventoryQuery',
             'erp.materialInventory.view.UnitPriceCheck'],
    refs : [{ref : 'warehouseDate',selector : 'win_WarehouseDate'},
            {ref : 'materialInventoryManager',selector : 'mng_MaterialInventoryManager'},
            {ref : 'grdMaterialInventoryManager',selector : 'mng_MaterialInventoryManager #grd_MaterialInventory'},
            {ref : 'unitPrice',selector : 'mng_unitPrice'}
            ],
    init : function(){
    	var me = this;
    	 if (me.isInited)
 			return;
    	 me.control({
    		 'mng_MaterialInventoryManager' : {
    			 afterrender : function(){
    				 me.panel = me.getMaterialInventoryManager();
    				 me.gridmain = me.getGrdMaterialInventoryManager();
    				 me.grdStore = me.panel.store;
    				 me.year = me.panel.year;
 			         me.month = me.panel.month;
 			        me.query_rec = Ext.create('erp.materialInventory.model.QueryParams'); 			        
    			 }
    		 },
    		 'mng_MaterialInventoryManager button' : {
    			 click : me.doAction
    		 },
    		 'mng_MaterialInventoryManager #menu_lock' : {
    			 click : me.doManuLockButton
    		 },
    		 'mng_MaterialInventoryManager #grd_MaterialInventory' : {
    			 selectionchange : function(grid, rec) {},
    			 itemdblclick : function(grid, rec) {}
    		 }
    	 });
    	 me.isInited=true;
    },
    doManuLockButton : function(menu,btn){
    	var me=this;
    	var mainPanel = me.panel;
    	var jzzt = mainPanel.jzzt; 	
    	var grid = mainPanel.down('#grd_MaterialInventory');
    	var recs = grid.getSelectionModel().getSelection();
    	if(recs.length==0){
  		  Ext.Msg.alert('提示','请先选中一条记录');  
  		  return;
  		  }
    	var czym=erp.Util.currentUser.userInfo.name;
    	var czrq=new Date();
    	var rec=recs[0]; 	
    	var u_id=erp.Util.currentUser.userInfo.login_id;
		var u_name=erp.Util.currentUser.userInfo.name;
		var ip_add=erp.IP;
		var u_mac='';
		var store=grid.getStore();	
		var rkdh = rec.get('rkdh');
	    var rkxh = rec.get('rkxh');
	    var ckbh = rec.get('ckbh');
	    var tzdh = rec.get('tzdh');
	    var sdbj = rec.get('sdbj');
	    var sdrm = rec.get('sdrm');
	    var result = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getWgcprkdbList',
	    			{ckbh:ckbh,rkdh:rkdh});
	   //decode方法，这个方法是将json字符串转换成对象的
	    var data = Ext.decode(result);   		  
	    var s_ckbh_cp = data.ckbh_cp;
	    var s_sjdh_cp = data.sjdh_cp;
	    var ls_wgbj = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getMaxWgbj',
    			{ckbh:ckbh,rkdh:rkdh});
	    if(ls_wgbj==null){
		  ls_wgbj=0;
	      }	
	   var wmsqy = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getWmsqy1',
    			{ckbh:s_ckbh_cp});
    	switch(btn.itemId){
    	  case 'btn_lock1' :    		     		      		  
    		  var boo2 = false;
    		  if(ls_wgbj = 1){
    			  var ls_count_wg = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCountWG',
    	  	    			{ckbh:ckbh,rkdh:rkdh});
    			  if(ls_count_wg == null){
    				  ls_count_wg = 0;
    			  }
    			 if(ls_count_wg = 0){
    				 boo2 = true;
    				 Ext.Msg.alert('提示','该外购材料入库单有异常，没有同步生成材料领料单和成品送检单!');
    				 return;
    			 } 
    		  }
    		  if(boo2){return;}
    		  if(sdbj = 1){
    			  Ext.Msg.confirm('提示', '是否确认解锁【'+rkdh+'】号入库单(Y/N)?',
    						function(btn) {
    				  if (btn == 'yes') {
    					  var boo = false;
    					  if (jzzt = 1){
    						  boo = true;
    						  Ext.Msg.alert('提示','该月入库单已结账，不能解锁！'); 
    						  return;
    					  }
    					  var ll_count = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCountLL',
    	    	  	    			{ckbh:ckbh,rkdh:rkdh});
    					  if(ll_count > 0){
    						  boo = true;
    						  Ext.Msg.alert('提示','该入库单已做调价单，不允许解锁！'); 
    						  return;
    					  }
    					  if(boo){return;}
    					  if(recs.length > 0){
    					  var sql= " update rkdb_yl set sdbj=0,sdrm= '"+ czym+ "',sdsj=getdate() where rkdb_yl.ckbh= '"+ckbh+"' and rkdb_yl.rkdh= "+ rkdh +" and rkdb_yl.rkxh="+rkxh+";" ;
    					  var result = erp.Const.callServiceMethodSync(
    								'materialInventory/materialInventory.act?method=getStringFromSql', {
    								 sql:sql
    							});
    					  var data = Ext.decode(result);
  						  if (!data.bool) {
  							Ext.toastErrorInfo(data.msg);
  							return;
  						   }
    					  }
    					  if(ls_wgbj = 1 &&  wmsqy == 1){
    					  var sql2 = " update wms_cpsjdb set jyjg=0,ztbj=1,zjrq=getdate(),zjrm= '"+ czym+ "' where sjdh= '"+s_sjdh_cp+"' using SQLCH;" ;
    					  var result2 = erp.Const.callServiceMethodSync(
  								'materialInventory/materialInventory.act?method=getStringFromSql', {
  								 sql:sql2
  							});
  					      var data2 = Ext.decode(result2);
						  if (!data2.bool) {
							Ext.toastErrorInfo(data2.msg);
							return;
						   }
						  var sql3 = " update cpsjdb set jyjg=0,ztbj=1,zjrq=getdate(),zjrm= '"+ czym+ "' where sjdh_wms= '"+s_sjdh_cp+"' and sjdh_wms<>0;" ;
						  var result3 = erp.Const.callServiceMethodSync(
	  								'materialInventory/materialInventory.act?method=getStringFromSql', {
	  								 sql:sql3
	  							});
	  					      var data3 = Ext.decode(result3);
							  if (!data3.bool) {
								Ext.toastErrorInfo(data3.msg);
								return;
							   }
    					  }
  						store.load();
    				  }else{return;}
    			  });
    		  }else{
    			  Ext.Msg.confirm('提示', '是否确认锁定【'+rkdh+'】号入库单(Y/N)?',
  						function(btn) {
    				  if (btn == 'yes') {
    					  var s_count = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getSCount',
  	    	  	    			{ckbh:ckbh,rkdh:rkdh});
    					  if(s_count>0){
    						  Ext.Msg.confirm('提示', '该入库单中存在入库单价=0的记录，是否继续(Y/N)?',
    			  			  function(btn) {
    							  if(btn=='yes'){
    								 var sql4 =  " update rkdb_yl set sdbj=1,sdsj="+czrq+",sdrm= '"+ czym+ "' where rkdb_yl.ckbh= '"+ckbh+"' and rkdb_yl.rkdh="+rkdh+" and rkdb_yl.rkxh="+rkxh+";" ;
    								 var result4 = erp.Const.callServiceMethodSync(
    			  								'materialInventory/materialInventory.act?method=getStringFromSql', {
    			  								 sql:sql4
    			  							});
    			  					      var data4 = Ext.decode(result4);
    									  if (!data4.bool) {
    										Ext.toastErrorInfo(data4.msg);
    										return;
    									   }
    								store.load();
    								if(ls_wgbj = 1 &&  wmsqy == 1){
    			    					  var sql5 = " update wms_cpsjdb set jyjg=2,ztbj=4,zjrq=getdate(),zjrm= '"+ czym+ "' where sjdh= "+s_sjdh_cp+" using SQLCH;" ;
    			    					  var result5 = erp.Const.callServiceMethodSync(
    			  								'materialInventory/materialInventory.act?method=getStringFromSql', {
    			  								 sql:sql5
    			  							});
    			  					      var data5 = Ext.decode(result5);
    									  if (!data5.bool) {
    										Ext.toastErrorInfo(data5.msg);
    										return;
    									   }
    									  var sql6 = " update cpsjdb set jyjg=2,ztbj=4,zjrq=getdate(),zjrm= '"+ czym+ "' where sjdh_wms= "+s_sjdh_cp+" and sjdh_wms<>0;" ;
    									  var result6 = erp.Const.callServiceMethodSync(
    				  								'materialInventory/materialInventory.act?method=getStringFromSql', {
    				  								 sql:sql6
    				  							});
    				  					      var data6 = Ext.decode(result6);
    										  if (!data6.bool) {
    											Ext.toastErrorInfo(data6.msg);
    											return;
    										   }
    			    					  }
    							  }else{return;}
    						  }); 
    					  }
    				  }
    			  });  
    		  }
        break;
    	case 'btn_lock2' :
    		if(sdbj == 0){
    			Ext.Msg.confirm('提示', '是否确认锁定【'+rkdh+'】号入库单(Y/N)?',
  						function(btn) {
    				  if (btn == 'yes') {
    					  var boo3 = false;
    					  if(ls_wgbj = 1){
    		    			  var ls_count_wg2 = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCountWG',
    		    	  	    			{ckbh:ckbh,rkdh:rkdh});
    		    			  if(ls_count_wg2 == null){
    		    				  ls_count_wg2 = 0;
    		    			  }
    		    			 if(ls_count_wg2 = 0){
    		    				 boo3 = true;
    		    				 Ext.Msg.alert('提示','该外购材料入库单有异常，没有同步生成材料领料单和成品送检单!');
    		    				 return;
    		    			 } 
    		    		  }
    					  if(boo3){
    						  return;
    					  }
    					  if(ls_wgbj == 1 &&  wmsqy == 1){
	    					  var sql7 = " update wms_cpsjdb set jyjg=2,ztbj=4,zjrq=getdate(),zjrm= '"+ czym+ "' where sjdh= "+s_sjdh_cp+" and sjxh"+rkxh+" using SQLCH;" ;
	    					  var result7 = erp.Const.callServiceMethodSync(
	  								'materialInventory/materialInventory.act?method=getStringFromSql', {
	  								 sql:sql7
	  							});
	  					      var data7 = Ext.decode(result7);
							  if (!data7.bool) {
								Ext.toastErrorInfo(data7.msg);
								return;
							   }
							  var sql8 = " update cpsjdb set jyjg=2,ztbj=4,zjrq=getdate(),zjrm= '"+ czym+ "' where sjdh_wms= "+s_sjdh_cp+" and sjxh"+rkxh+" and sjdh_wms<>0;" ;
							  var result8 = erp.Const.callServiceMethodSync(
		  								'materialInventory/materialInventory.act?method=getStringFromSql', {
		  								 sql:sql8
		  							});
		  					      var data8 = Ext.decode(result8);
								  if (!data8.bool) {
									Ext.toastErrorInfo(data8.msg);
									return;
								   }
	    					  }
    					  var sql9 =  " update rkdb_yl set sdbj=1,sdsj="+czrq+",sdrm= '"+ czym+ "' where rkdb_yl.ckbh= '"+ckbh+"' and rkdb_yl.rkdh="+rkdh+" and rkdb_yl.rkxh="+rkxh+";" ;
							 var result9 = erp.Const.callServiceMethodSync(
		  								'materialInventory/materialInventory.act?method=getStringFromSql', {
		  								 sql:sql9
		  							});
		  					      var data9 = Ext.decode(result9);
								  if (!data9.bool) {
									Ext.toastErrorInfo(data9.msg);
									return;
								   }
							store.load();
    					  
    					  
    				  } else{
    					  return;
    				  }  				  
    			});
    		}else{
    			if(jzzt == 1){
    				Ext.Msg.alert('提示','该月入库单已结账，不能解锁！'); 
					  return;
    			}
    			if(rkdh==null){rkdh=0;}
    			if(rkxh==null){rkxh=0;}
    			if(tzdh==null){tzdh=0;}
    			Ext.Msg.confirm('提示', '是否确认解锁入库单(Y/N)?',
						function(btn) {
				  if (btn == 'yes') {
					  var boo4 = false;
					  if(tzdh != 0){
						  boo4 = ture;
						  Ext.Msg.alert('提示','入库单【'+string(s_rkdh)+'-'+string(s_rkxh)+'】已生成开票通知单,不能解锁!');
						  return;
					  }
					  var ll_count2 = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCountLL',
	    	  	    			{ckbh:ckbh,rkdh:rkdh,rkxh:rkxh});
					  if(ll_count2 > 0){
						  boo4 = true;
						  Ext.Msg.alert('提示','该入库单已做调价单，不允许解锁！'); 
						  return;
					  }
					  var ll_count3 = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCountLL3',
	    	  	    			{ckbh:ckbh,rkdh:rkdh,rkxh:rkxh});
					  if(ll_count3 > 0){
						  boo4 = true;
						  Ext.Msg.alert('提示','该入库单已核销,不允许解除锁定!'); 
						  return;
					  }
					  if(boo4){return;}
					  if(ls_wgbj == 1 &&  wmsqy == 1){
						  var ll_count4 = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCountLL4',
		    	  	    			{sjdh:sjdh,rkxh:rkxh});
						  if(ll_count4 > 0){
							  boo4 = true;
							  Ext.Msg.alert('提示','该入库单关联生成的送检单已做入库通知,不允许解除锁定!'); 
							  return;
						  } 
						  if(boo4){return;}
						  var sql10 = " update wms_cpsjdb set jyjg=0,ztbj=1,zjrq=getdate(),zjrm= '"+ czym+ "' where sjdh= "+s_sjdh_cp+" and sjxh="+rkxh+" using SQLCH;" ;
    					  var result10 = erp.Const.callServiceMethodSync(
  								'materialInventory/materialInventory.act?method=getStringFromSql', {
  								 sql:sql10
  							});
  					      var data10 = Ext.decode(result10);
						  if (!data10.bool) {
							Ext.toastErrorInfo(data10.msg);
							return;
						   }
						  var sql11 = " update cpsjdb set jyjg=0,ztbj=1,zjrq=getdate(),zjrm= '"+ czym+ "' where sjdh_wms= "+s_sjdh_cp+" and sjxh="+rkxh+" and sjdh_wms<>0;" ;
						  var result11 = erp.Const.callServiceMethodSync(
	  								'materialInventory/materialInventory.act?method=getStringFromSql', {
	  								 sql:sql11
	  							});
	  					      var data11 = Ext.decode(result11);
							  if (!data11.bool) {
								Ext.toastErrorInfo(data11.msg);
								return;
							   }
						  
					  }
					  
					     var sql12 =  " update rkdb_yl set sdbj=0,sdsj="+czrq+",sdrm= '"+ czym+ "' where rkdb_yl.ckbh= '"+ckbh+"' and rkdb_yl.rkdh="+rkdh+" and rkdb_yl.rkxh="+rkxh+";" ;
						 var result12 = erp.Const.callServiceMethodSync(
	  								'materialInventory/materialInventory.act?method=getStringFromSql', {
	  								 sql:sql12
	  							});
	  					      var data12 = Ext.decode(result12);
							  if (!data12.bool) {
								Ext.toastErrorInfo(data12.msg);
								return;
							   }
						store.load();
					  
					  
				  }
			  });
    		}
    	break;
    	}
    },
    doAction : function(btn){
	 	var me=this;
		if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}
		switch(btn.itemId){
		case 'btn_add' : 
			Ext.Msg.alert('提示',"增加");
		break;
		case 'btn_del' : 
			var recs = me.gridmain.getSelectionModel().getSelection();
			if(recs.length==0){
				Ext.Msg.alert('提示','请选择一条记录！');
				return;
			}
			var qsrq = me.panel.qsrq;
			var jzrq = me.panel.jzrq;
			var rec = recs[0];
			var ckbh = rec.get('ckbh');
			var rkdh = rec.get('rkdh');
			var sdbj = rec.get('sdbj');
			var hxbj = rec.get('hxbj');
			var wgbj = rec.get('wgbj');
			var czym = rec.get('czym');
			if(sdbj==1){
				Ext.Msg.alert('提示','【 '+rkdh+' 】 号入库单已经锁定，不能删除!');
				return;
			}
			if(hxbj==1){
				Ext.Msg.alert('提示','【 '+rkdh+' 】 号入库单已经核销，不能删除!');
				return;
			}
			var s_count = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getRelateBusinessCount',
	    			{ckbh:ckbh,rkdh:rkdh});	
			if(s_count>0){
				Ext.Msg.alert('提示','【 '+rkdh+' 】 号入库单是关联交易生成的，不能删除!');
				return;
			}
			var l_count = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getRelateInventoryCount',
	    			{ckbh:ckbh,rkdh:rkdh});
			if(l_count>0){
				Ext.Msg.alert('提示','【 '+rkdh+' 】 号入库单是关联入库生成的，不能删除!');
				return;
			}
			var sys_user = erp.Util.currentUser.name;
			if(sys_user != czym && !erp.Util.currentUser.isAdmin){
				Ext.Msg.alert('提示','【 '+rkdh+' 】 只有操作员本人或管理员才允许修改单据!');
				return;
			}
			var ll_count_wg = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getWMSCount',
	    			{ckbh:ckbh,rkdh:rkdh});
			if(ll_count_wg>0){
				Ext.Msg.alert('提示','【 '+rkdh+' 】 号入库单是WMS成品外购关联生成的，不允许删除!');
				return;
			}
			if(wgbj==1){
				var result = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getDelete1Result_To_JSON',
		    			{ckbh:ckbh,rkdh:rkdh});
				var data = Ext.decode(result);//json字符串转为Object
				var ckbh_cp = data.ckbh_cp;
				var rkdh_cp = data.rkdh_cp;
				var ckbh_cl = data.ckbh_cl;
				var lldh_cl = data.lldh_cl;
				var sjdh_cp = data.sjdh_cp;
				var ztdh_cp = data.ztdh_cp;
				var s_clllsd = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getS_clllsd',
		    			{ckbh:ckbh_cl,lldh:lldh_cl});
				var ls_wmsqy = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getLs_wmsqy',
		    			{ckbh:ckbh_cp});
				if(ls_wmsqy==1){
					var sys_ztfs_wms = 1 ;//select ztfs_wms into sys_ztfs_wms from sysxxb;数据库中只有一个1，此处不做定义   
					if(sys_ztfs_wms==1){
						var s_cpsjsd = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getS_cpsjsd',
				    			{tzdh:ztdh_cp});
					}else{}
				}else{
					var s_cprksd = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getS_cprksd',
			    			{ckbh:ckbh_cp,rkdh:rkdh_cp});
				}
				if(s_clllsd>0 || s_cprksd>0 || s_cpsjsd>0){
					Ext.Msg.alert('提示','【 '+rkdh+' 】 号入库单是外购成品入库，生成其中两份单中有锁定的单子，不能删除!');
					return;
				}
			}
            //库存校验
			if(wgbj==0){			
				var h_result = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getH_result',
		    			{ckbh:ckbh,rkdh:rkdh}					
				);
				var data = Ext.decode(h_result);
				if(!data.bool){
					Ext.Msg.alert('提示',data.msg);
					return;
				}
			}
			Ext.Msg.confirm('提示','是否确认删除【 '+rkdh+' 】号入库单(Y/N)?',function(btn){
				if(btn=='yes'){
					var v_result = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getV_result',
			    			{wgbj:wgbj,ckbh:ckbh,rkdh:rkdh});
				}
				me.grdStore.reload();
			});
		break;
		case 'btn_query' : 
		var win=Ext.widget('MaterialInventory_Search',{
			itemId:'win_MIQuery',
			mainstore:me.grdStore,
			mainview:me.panel,
			rec:me.query_rec
		});
		win.show();			
		break;
		// 单价核查
		case 'btn_price' : 
		var recs = me.gridmain.getSelectionModel().getSelection();
		var rec = recs[0];		
		var store = Ext.create('erp.materialInventory.store.UnitPriceCheck');
		var rkdh = rec.get('rkdh');
		var rkxh = rec.get('rkxh');
		var ckbh = rec.get('ckbh');
		var rkrq = rec.get('rkrq');
		var csbh = rec.get('csbh');
		var wbbh = rec.get('wbbh');
		var clhh = rec.get('clhh');
		var pjrq = rec.get('pjrq');
		var htbh = rec.get('htbh');
		var htxh = rec.get('htxh');
		var rkdj = rec.get('rkdj');
		var wbdj = rec.get('wbdj');
		if(csbh==null){csbh='';}
		if(wbbh==null){wbbh='';}
		if(clhh==null){clhh='';}
		if(htbh==null){htbh=0;}
		if(htxh==null){htxh=0;}
//		var ld_rkdj;
//		if(wbbh!=''){
//			ld_rkdj = rec.get('wbdj');
//		}else{
//			ld_rkdj = rec.get('rkdj');
//		}
//		if(ld_rkdj==null){
//			ld_rkdj = 0;
//		}
//		var ld_kzdj = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getLDKzdj',
//	    			{csbh:csbh,clhh:clhh,pjrq:pjrq});
//		if(ld_kzdj==null){ld_kzdj=0;}
//		if(ld_kzdj==0){
//			ld_kzdj = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getLDKzdj2',
//	    			{clhh:clhh,pjrq:pjrq});
//		}
//		if(ld_kzdj==null){ld_kzdj=0;}
//		console.log(ld_kzdj);
//		var ld_cgkj;
//		var ld_cgdj;
//		var result;
//		if(wbbh!=''){
//			result = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCgkdjaList',
//	    			{htbh:htbh,htxh:htxh});	
//			var data = Ext.decode(result);   		  
//		    console.log(data);
//		    ld_cgkj = data.kzdj;
//			ld_cgdj = data.wbdj;
//		}else{
//			result = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCgkdjbList',
//	    			{htbh:htbh,htxh:htxh});		
//			var data = Ext.decode(result);   		  
//		    console.log(data);
//		    ld_cgkj = data.kzdj;
//			ld_cgdj = data.cgdj;
//			console.log(ld_cgkj);
//			console.log(ld_cgdj);
//		}
//		if(ld_cgdj==null){
//			ld_cgdj = 0;
//		}
//		if(ld_cgkj==null){
//			ld_cgkj = 0;
//		}
//		console.log(ld_cgkj);
//		console.log(ld_cgdj);
		var unt_rec = Ext.create('erp.materialInventory.model.UnitPriceCheck',{
			ckbh: ckbh,
        	rkdh: rkdh,
            rkxh: rkxh,
            rkrq: rkrq,
            csbh: csbh,
            clhh: clhh,
            htbh: htbh,
            htxh: htxh,
            rkdj: rkdj,
            pjrq: pjrq,
            wbbh: wbbh,
            wbdj: wbdj
		});
		var win = Ext.widget('mng_unitPrice', {
            itemId: 'win_unitPrice',
            title: '入库单核查',
            unt_rec: unt_rec
        });
		win.loadData(unt_rec);
		win.show();
		break;
		case 'btn_payment' : 
			Ext.Msg.alert('提示',"费用补录");
		break;
		case 'btn_spec' : 
			Ext.Msg.alert('提示',"短料规格");
		break;
		}
    }
	
});