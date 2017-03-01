Ext.define('erp.materialTestEvaluation.controller.MaterialTestEvaluationCtrl',{
    extend : 'Ext.app.Controller',
    requires : ['erp.ux.FormKey',
				'erp.ux.ComboxTree',
				'erp.ux.RemoteValidator',
				'erp.ux.GridSearchField'],
    views : [
    'erp.materialTestEvaluation.view.MaterialTestEvaluation',
    'erp.materialTestEvaluation.view.MaterialTestEvaluationChoose',
    'erp.materialTestEvaluation.view.MaterialTestEvaluationQuery'
    ],
     refs : [
     {ref : 'mng_MaterialTestEvaluation',selector : 'mng_MaterialTestEvaluation'},
     {ref : 'materialTestEvaluationGrid',selector : 'mng_MaterialTestEvaluation #MaterialTestEvaluation'},
     {ref : 'querywin',selector : 'query_MaterialTest'}
     ],
      init : function() {
		// controller只初始化一次runMode:'win'
		var me = this;
		if (me.isInited)
			return;
	    me.control({
	        'mng_MaterialTestEvaluation' : {
	             afterrender : function(cmp) {
	                 me.grid = me.getMaterialTestEvaluationGrid();
	                 me.panel = me.getMng_MaterialTestEvaluation();
	             }
	        },
		     'mng_MaterialTestEvaluation button' : {
		         click:me.doAction
		     },
		     'query_MaterialTest button' : {
		        click:function(btn){
						var win=me.getQuerywin();
						var strWhere='';
						if (btn.itemId=='btn_confirm' || btn.itemId=='btn_reset'){
						if (btn.itemId=='btn_confirm'){
								strWhere=win.getQueryCondition();					
						}else if (btn.itemId=='btn_reset'){
							strWhere='';
						}
						if(strWhere==''){
						   me.grid.querywin='';
						}else{
						   me.grid.querywin=strWhere;
						}
						me.grid.filterOnAll();
						win.close();
			      }
			    }
		     }
	    });
		this.isInited = true;
	},
	doAction:function(btn){
	    var me=this;
		var grid = me.grid;	
		var rows = me.grid.getCurrentRow();
		var recs=grid.getSelectRow();
		var rec;
		if(recs[0]){
			rec = recs[0];
		}
		switch (btn.itemId){		   
		    case 'btn_query':
		    var rec = Ext.create('erp.materialInspection.model.QueryParams');
		      var win  = Ext.widget('query_MaterialTest',{
		      	  rec : rec
		      });
		      win.show();
		   break;
		   case 'BTN_MHISTORY':
		       var btnBackup=me.panel.down('#BTN_BACKUP');
		       if (btn.getText()=="历史"){
		            btn.setText('当前');
		            me.panel.setTitle('历史材料委托判定评审总表')
					Ext.apply(me.panel.params,{gdbj:1});
		       }else{
		            me.panel.setTitle('材料委托判定评审总表')
					btn.setText('历史');
					me.panel.params.gdbj=0;
		       }
		           me.grid.load();
		   break;
		   case erp.Const.FUNC_ITEMID_BTN_REFRESH:
		        me.grid.load();
		   break;
		}
	},
	doEditAction : function(btn){
	    var me=this;
		var grid = me.grid;
		var edtpanel = me.getEditPanel();
		var isEdit = edtpanel.isEdit;
		var form = edtpanel.down('#mainform');
		var rec = form.getRecord();
		form.updateRecord(rec);
		console.log(rec.data)
		var csbh = rec.get('csbh');
		var deStore = edtpanel.deStore;
		var testStore = edtpanel.testStore;
		var wtdh = rec.get('wtdh');
		var nrecs =new Array();
		switch (btn.itemId){
		    case 'btn_lead' :
		        if(Ext.isEmpty(csbh)||csbh.trim()==''){
	              Ext.Msg.alert('提示',"客户名称不能为空!");
	              return;
	            }
	             var win = Ext.widget('Imp_Arrive',{
	              csbh : csbh
	             });
	             win.down('#btn_confirm').on({
	               click : function(btn){
	                   var win = btn.up('window');
	                   var bool = false;
	                   var wtxh = deStore.max('wtxh')==null?1:deStore.max('wtxh')+1;
	                   win.selStore.each(function(rec){
	                      var r = Ext.create('erp.materialInspection.model.MaterialApply',{
	                          wtdh : wtdh,
	                          wtxh : wtxh,
	                          htbh :rec.get('htbh'), 
	                          htxh :rec.get('htxh'), 
	                          clhh :rec.get('clhh'),
	                          clmc :rec.get('clmc'),
	                          hth :rec.get('hth'),
	                          dhdh :rec.get('dhdh'),
	                          dhxh :rec.get('dhxh'),
	                          dhh : rec.get('dhh'),
	                          ckbh :rec.get('ckbh'),
	                          ckmc :rec.get('ckmc'),
	                          llrq :rec.get('dhrq'),
	                          sjsl :rec.get('wrsl'),
	                          jldw :rec.get('jldw')
	                      });
	                       nrecs.push(r);
						   wtxh++		
	                   })
	                   deStore.add(nrecs)
	                   win.close();
	               }
	          })     
	             win.show();
		    break;
		    case 'btn_add':
	         var maxxh = deStore.max('wtxh');
	         maxxh = Ext.isEmpty(maxxh)?1:(maxxh+1);
	         var newrec = Ext.create('erp.materialInspection.model.MaterialApply',{
	            wtxh : maxxh,wtdh : wtdh
	         });
	         deStore.add(newrec);
	        break;
	        case 'btn_del':
	         var sel_recs =  edtpanel.down('#EditDetial').getSelectionModel().getSelection();
	         if(Ext.isEmpty(sel_recs)){
			   Ext.Msg.alert('提示','请先选中至少一条记录');
			   return;
		     }
		     Ext.Msg.confirm('提示','是否确认删除该记录(Y/N)?',function(btn){
			  if(btn=='yes'){
			  	Ext.each(sel_recs,function(rec){
			  	    testStore.filterBy(function(record){
				             return record.get('wtxh') == rec.get('wtxh');
				    })
				    testStore.removeAll();
			  	})
			  	deStore.remove(sel_recs);
			    }
			  })
	       break;
	        case 'btn_detailadd':
	          var sel_recs =  edtpanel.down('#EditDetial').getSelectionModel().getSelection();
	          if(sel_recs.length>0){
	          var maxh = testStore.max('wtsqxh');
	          maxh = Ext.isEmpty(maxh)?1:(maxh+1);
	          console.log(maxh)
	          var newrec = Ext.create('erp.materialInspection.model.MaterialDetail',{
	            wtdh : wtdh,wtxh:sel_recs[0].get('wtxh'),jjd:1,
	            wtsqxh : maxh
	          })
	          testStore.add(newrec);
	          }else{
	          	Ext.Msg.alert('提示','请选择一条申请明细!');
	          	return;
	          }
	       break; 
	        case 'btn_detaildel' :
	          var trecs = edtpanel.down('#TestDetail').getSelectionModel().getSelection();
	          if(Ext.isEmpty(trecs)){
			   Ext.Msg.alert('提示','请先选中至少一条记录');
			   return;
		     }
		     Ext.Msg.confirm('提示','是否确认删除该记录(Y/N)?',function(btn){
			  if(btn=='yes'){
			  	testStore.remove(trecs);
			    }
			  })
	       break;
	       case 'btn_detailcopy':
	         var grid = edtpanel.down('#TestDetail');
	         var recs = grid.getSelectionModel().getSelection();
    		 if(recs.length==0){
    				Ext.Msg.alert('提示','请选中某行或多行再使用此功能！');
    				break;
    		 }
    		 edtpanel.copy=new Array();
    		 Ext.each(recs,function(rec){
					edtpanel.copy.push(rec.copy());
    			})
    	   Ext.Msg.alert('提示','共复制 '+recs.length+' 行!');
	       break;
	       case 'btn_detailparse':
	          var sel_recs =  edtpanel.down('#EditDetial').getSelectionModel().getSelection();
	          if(sel_recs.length==0){
    				Ext.Msg.alert('提示','请选中某行或多行再使用此功能！');
    				break;
    		  }
    		  if(edtpanel.copy==null||edtpanel.copy.length==0){
		    		Ext.Msg.alert('提示','当前粘贴板无数据!');
		      }
		      var c_wtxh = sel_recs[0].get('wtxh');
		      Ext.each(edtpanel.copy,function(rec){
		           var maxh = testStore.max('wtsqxh');
	               maxh = Ext.isEmpty(maxh)?1:(maxh+1);
	               nrec = rec.copy();
	               nrec.set('wtxh',c_wtxh);
	               nrec.set('wtsqxh',maxh);
	               nrec.phantom = true;
	               testStore.add(nrec);
		      })
	       break;
	      case 'BTN_SAVE' : 
	         var s_wtdh = rec.get('wtdh');
	         var s_wtlb = rec.get('wtlb');  
	         var ls_csbh = rec.get('csbh');
	         var s_add = "1";
	         if(isEdit){
	            s_add = "0";
	         }
	         Ext.getBody().mask('正在验证，请耐心等候...');	
	         if(Ext.isEmpty(s_wtlb)||s_wtlb==''){
	             Ext.Msg.alert('提示',"委托部门不能为空,请重新选择!");
	             Ext.getBody().unmask();
	             return;
	         }
	         var derecs = deStore.getRange();
	         console.log(derecs);
	         var recordData = "[";
	         var a=false;
		     Ext.each(derecs, function(rec) {
		      if(a){
		         	recordData += ",";
		      }
		      recordData += Ext.encode(rec.data);
		      a=true;
		      })
		      recordData += "]";
		      console.log(recordData);
		      var result = erp.Const.callServiceMethodSync('erp/materialInspection.act?method=BeforeSave',{
		      recordData:recordData,
			  csbh : ls_csbh,
			  s_add : s_add
		      });
		      var data = Ext.decode(result);
		      console.log(data);
		      if (data.bool == false) {
			            Ext.Msg.alert('提示', data.msg)
			            Ext.getBody().unmask();
		                return;
		      }
		      Ext.getBody().unmask();
		      Ext.Msg.confirm('提示','是否确认保存(Y/N)?',function(btn){
		           if(btn=='yes'){
		               rec.set('czym',erp.Util.currentUser.userInfo.name);
		               var bool = true;
		               if(s_add!="0"){
		                   var result = erp.Const.callServiceMethodSync('erp/materialInspection.act?method=addMaterialInspection',{
		                       data : '['+Ext.encode(rec.data)+']'
		                   })
		                   console.log(result);
		                   s_wtdh = result[0].wtdh
		                   if(Ext.isEmpty(s_wtdh)||s_wtdh==null){
		                      bool  = false;
						      Ext.Msg.alert('提示', '保存失败！');
		                   }
		                   deStore.each(function(record){
						   	   record.set('wtdh',s_wtdh)
						   })
						    deStore.sync({
						      failure : function(batch, options) {
						          bool  = false;
						          Ext.Msg.alert('提示', '明细保存失败！');
						      },
						      success : function(batch, options){
						         me.grid.load();
						      }
						   });
						   testStore.filterBy(function(record){
				             return record.get('wtxh') !='';
				           })
				           console.log(testStore)
				           var bo = false;
				           testStore.each(function(record){
						   	   record.set('wtdh',s_wtdh);
						   	   if(Ext.isEmpty(record.get('csxm'))||Ext.isEmpty(record.get('csbz'))){
						   	      Ext.Msg.alert('提示',"测试项目和名称不能为空！");
						   	      bo = true;
						   	      return false;
						   	   }
						   })
						   if(bo){
						      return
						   }
				           testStore.sync({
						      failure : function(batch, options) {
						      	  bool  = false;
						          Ext.Msg.alert('提示', '明细保存失败！');
						      }
						   });
		               }else{
		                 erp.Const.callServiceMethodSync('erp/materialInspection.act?method=updateMaterialInspection',{
		                       data : '['+Ext.encode(rec.data)+']'
		                 })
		                 deStore.sync({
						      failure : function(batch, options) {
						        bool  = false; 
						      	Ext.Msg.alert('提示', '明细保存失败！');
						      },
						      success : function(batch, options){
						         me.grid.load();
						      }
						   });
						   testStore.filterBy(function(record){
				             return record.get('wtdh') == s_wtdh;
				           })
				           var bo = false;
				           testStore.each(function(record){
						   	   if(Ext.isEmpty(record.get('csxm'))||Ext.isEmpty(record.get('csbz'))){
						   	      Ext.Msg.alert('提示',"测试项目和名称不能为空！");
						   	      bo = true;
						   	      return false;
						   	   }
						   })
						   if(bo){
						      return
						   }
				           testStore.sync({
						      failure : function(batch, options) {
						          bool  = false;
						          Ext.Msg.alert('提示', '申请明细保存失败！');
						      }
						   });
		               }
		               if(bool){
						Ext.Msg.alert('提示',"保存成功！")
						}
						/*edtpanel.isAdd=false;
						edtpanel.isEdit=true;*/
						edtpanel.close();
		           }
		      })
		}
	},
	doEdit:function(type){
	    var me = this;
	    var isEdit=false;
	    switch(type){
	    	case erp.Const.FUNC_ITEMID_BTN_ADD :
	    	   isAdd = true;
	    	   var wtdh = 0;
	    	   var today=new Date();
	    	   var canedt = false;//false 界面可编辑
	    	   var sts = false;//按钮可用
	    	   var rec = Ext.create('erp.materialInspection.model.MaterialInspection',{
	    	       wtdh : 0,
	    	       wtrq : today,
	    	       czym : erp.Util.currentUser.userInfo.name,
	    	       wtrm : erp.Util.currentUser.userInfo.name,
	    	       czsj : today,
	    	       cslx : '内部测试'
	    	   })
	    	   var panel = erp.Util.addContentTab({
	    	       xtype : 'edit_MaterialInspection',
	    	       itemId : 'edit_MaterialInspection',
	    	       title : '材料委托检验测试申请编辑',
	    	       rec : rec,
	    	       isEdit : isEdit,
	    	       isCopy : false,
	    	       canedt : canedt,
	    	       sts : sts
	    	   });
	    	   panel.loadData(rec,isEdit)
	    	break;
	    	case 'BTN_COPY' :
	    	isAdd = true;
	    	var today=new Date();
	    	var canedt = false;//false 界面可编辑
	    	var sts = false;//按钮可用
	    	var rec = me.grid.getSelectRow()[0];
	    	if(rec.length==0){
	    	   Ext.Msg.alert('提示','请选择一条记录！');
	    	   return;
	    	}
	    	var wtdh = rec.get('wtdh');
	    	rec.set('wtdh',0);
	    	rec.set('shbj',0);
	    	rec.set('qfbj',0);
	    	rec.set('jybj',0);
	    	rec.set('sdbj',0);
	    	rec.set('sdrm','');
	    	rec.set('sdsj',null);
	    	rec.set('qfrm','');
	    	rec.set('qfsj',null);
	    	rec.set('jyrm','');
	    	rec.set('jysj',null);
	    	rec.phantom =true;//表示新增
	    	var panel = erp.Util.addContentTab({
	    	       xtype : 'edit_MaterialInspection',
	    	       itemId : 'edit_MaterialInspection',
	    	       title : '材料委托检验测试申请编辑',
	    	       rec : rec,
	    	       wtdh : wtdh,
	    	       isCopy : true,
	    	       isEdit : isEdit,
	    	       canedt : canedt,
	    	       sts : sts
	    	   });
	    	panel.loadData(rec,isEdit)
	    	break;
	    }
	},
	updateLoadingPlanBj:function(recs,rows,field,value){
		var rowArr=rows.split(',');
		var recordData = "["; // 参数
			var a = false;
			var me=this;
			var af=me.grid.getSupcan();
			Ext.each(recs, function(rec) {
				console.log(rec);
								if (a) {
									recordData += ",";
								}
								recordData += Ext.encode(rec.data);
								a = true;
						})
			recordData += "]";
			if (a) {
				Ext.Ajax.request({
					// 将生成的xml发送到服务器端,需特别注意这个页面的地址
					url : 'erp/materialInspection.act?method=updateLoadingPlanBj',
					async : false,
					timeout : 600000,
					method : 'POST',
					waitMsg : '正在进行数据验证，请耐心等候...',
					success : function(response, opts) {
						Ext.each(rowArr,function(r){
						   if(field=='sdbj'){
						   me.grid.setCellData(r,'sdbj',value);
						   me.grid.setCellData(r,'sdrm',erp.Util.currentUser.name);
						   me.grid.setCellData(r,'sdsj',Ext.Date.format(new Date(),'Y.m.d H:i:s'));
						   }
						   else if(field=='qfbj'){
						   me.grid.setCellData(r,'qfbj',value);
						   me.grid.setCellData(r,'qfrm',erp.Util.currentUser.name);
						   me.grid.setCellData(r,'qfsj',Ext.Date.format(new Date(),'Y.m.d H:i:s'));
						   }
						   else{
						      me.grid.load();
						   }
						})
					},
					disableCaching : true,
					isUpload : true,
					params : {
						dd : recordData
					}
				});
			}
		}
})