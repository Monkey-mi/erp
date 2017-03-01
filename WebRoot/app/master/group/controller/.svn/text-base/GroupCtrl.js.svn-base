Ext.define('erp.master.group.controller.GroupCtrl',{
       extend: 'Ext.app.Controller',
       requires: ['erp.master.group.store.Group',
                  'erp.ux.FormKey',
                  'erp.ux.RemoteValidator',
                  'erp.master.group.store.GroupOperator'],
       alias : 'widget.mng_GroupCtrl',
       views : ['erp.master.group.view.EditGroup','erp.master.group.view.GroupManger','erp.master.operator.view.OperatorImp'],
       refs : [{ref: 'GroupWindow',selector : 'mng_GroupManger'},
               {ref: 'GrdGroup',selector : 'mng_GroupManger #grd_Group'},
               {ref: 'GrdOperator',selector: 'mng_GroupManger #grd_Operator'},
               {ref: 'AddOperator',selector: 'add_Operator #list_Operator'},
               {ref: 'EditGroup', selector:'edt_group #GroupForm'},
               {ref: 'OperatorImp', selector:'imp_OperatorImp' },
               {ref: 'OpSelData', selector:'imp_OperatorImp #grdSelData'}
       ],
       init : function(){
           var me = this;
        	if(me.isInited) return true;
        	me.control({
        		//采购组Grd初始化
        	      	'mng_GroupManger' : {
						afterrender : function() {
							var store = me.getGrdGroup().getStore();
							var grid = me.getGrdGroup();
							var opgrid = me.getGrdOperator();
							me.grdStore = grid.getStore();
							me.grdStore.load();
							
							var opstore = me.getGrdOperator().getStore();
							
							me.opStore = opgrid.getStore();
						}
					},
					'mng_GroupManger button' : {
					    click : me.doAction
					},
				/*	'edt_group button' : {
					    click : me.btnEditformAction
					},*/
					'mng_GroupManger #grd_Operator ' : {
					     selectionchange : function(grid, rec){
					     	  
					            if (rec.length > 0) {
					               me.setOpBtnStatus(false);
					            }else {
								me.setOpBtnStatus(true);
							}
					     }
					},
				 /*  	'imp_OperatorImp button':{
				   	      click : me.btnOpformAction
				   		
				   	},*/
					'mng_GroupManger #grd_Group' : {
					     selectionchange : function(grid, rec){
					        	if (rec.length > 0) {
					            var opgrd = me.getGroupWindow();
					            opgrd.loadGridData(rec[0]);
								me.setBtnStatus(false);
							} else {
								me.setBtnStatus(true);
							}
					     },
					     itemdblclick : function(grid, rec){
					           me.EditGroup(true);
					     }
					}
        	});
        	this.isInited = true;
		
       },
       doAction : function(btn){
          switch(btn.itemId){
              case erp.Const.FUNC_ITEMID_BTN_ADD : 
                 /* alert('添加');*/
                 this.doAddGroup();
                 break;
              case erp.Const.FUNC_ITEMID_BTN_EDT :
                 this.EditGroup(true);
                 break;
              case erp.Const.FUNC_ITEMID_BTN_DEL :
                 this.doDeleteGroup();
                 break;
              case erp.Const.FUNC_ITEMID_BTN_REFRESH :
				 this.grdStore.load();
				 break;
		       case 'Add_Op' : 
			     this.doAddGroupOperator();
			     break;		 
			  case 'Del_Op' : 
			     this.doDelGroupOperator();
			     break;
          }
       },
 /*      EditGroup : function(flg) {
		var me = this;
		var rec, isAdd, isEdit;
		var grid = me.getGrdGroup();
		
		switch (flg) {
			case erp.Const.FUNC_ITEMID_BTN_ADD :
				 rec = Ext.create('erp.master.group.model.Group');
				isAdd = true;
				isEdit = true;
			
				break;
			case erp.Const.FUNC_ITEMID_BTN_EDT :
				rec = grid.getSelectionModel().getSelection()[0];
				isAdd = false;
				isEdit = true;
				break;
                default :
				rec = grid.getSelectionModel().getSelection()[0];
		}
	    var edtWin = Ext.widget('edt_group',
	    	{isAdd:isAdd,
	    	isEdit:isEdit,
	    	store:me.grdStore,
	    	GroupRec : rec,
	    	itemId:'edt_group'});
	     edtWin.show();
		
	},*/
      //添加采购组 
      doAddGroup : function(){
           var me = this;
           //获取最大采购组号+1
           var newcgzh = null;
           Ext.Ajax.request({
						url: 'group/group.act?method=getGroupOne',
						async:false,//设置ajax同步
					    success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newcgzh=obj.data;
					    },
					    method:"POST",
					    scope:this
					});
		  
           var isAdd, isEdit;
           var rec = Ext.create('erp.master.group.model.Group',{
                           cgzh : parseInt(newcgzh)+1 
           });
           var edtWin = Ext.widget('edt_group',{isAdd:true,isEdit:true,store:me.grdStore,
	    	itemId:'edt_group'});
           edtWin.down('#GroupForm').loadRecord(rec);
           edtWin.show();
       },
      //添加操作员
       doAddGroupOperator : function() {
       	   var me = this;
       	   var win =Ext.create('erp.master.operator.view.OperatorImp');
       	   var opgrid = me.getGrdOperator();
       	   var grid = me.getGrdGroup();
		   var rec = grid.getSelectionModel().getSelection()[0];
		   if(rec==null){
		 	Ext.Msg.alert('提示','请选择一个采购组!');
		 		return;
		  }
		   var cgzh = rec.get('cgzh');
		   var cgzm = rec.get('cgzm');
		   var bzsm = rec.get('bzsm'); 
          win.down('#btn_confirm').on({
              	click:function(btn){
              	  var win=btn.up('window');
              	  recs=win.selStore.getRange();
						var recordData = "["; //参数
						var a=false;
						Ext.each(recs, function(rec) {
								if (a) {
									recordData += ",";
								}
								recordData += Ext.encode(rec.data);
								a = true;
							})
						recordData += "]";
						var result = erp.Const.callServiceMethodSync(
								'group/group.act?method=getLoadOperator', {
									recordData : recordData,cgzh:cgzh,cgzm:cgzm,bzsm:bzsm
								});
					      var data = Ext.decode(result);
						  opgrid.getStore().load({params:{cgzh:cgzh}});
						  win.close();
						  if(!Ext.isEmpty(data.msg)){
							 Ext.Msg.alert('提示', data.msg);
							 return ;
						}			
                	}
           })
           win.show();
       },
       EditGroup : function(isEdit){
       	   var me=this;
       	   var isAdd, isEdit;
       	   //验证
		   var selModel = this.getGrdGroup().getSelectionModel();
		 
		   if(!selModel.hasSelection()){
		 	Ext.Msg.alert('提示','请选择一个采购组!');
			return;
		}
		   var rec =selModel.getSelection()[0];
		   
		   var edtWin = Ext.widget('edt_group',{isAdd:false,isEdit:isEdit,store:me.grdStore,itemId:'edt_group'});
		   edtWin.down('#GroupForm').loadRecord(rec);
		   edtWin.show();
		},
	//删除采购组	
     doDeleteGroup : function() {
		   var me = this;
		   //Ext.Msg.alert('删除');
		   var grid = me.getGrdGroup();
		   var recs = grid.getSelectionModel().getSelection();
		   /*:【" + rec.get('cgzm') + "】*/
		   Ext.Msg.confirm("提醒", "真的要删除采购组?", function(btn) {
					if (btn == "yes") {
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
						var result = erp.Const.callServiceMethodSync('group/group.act?method=deleteGroup',{recordData:recordData})
						var data = Ext.decode(result);
		                
		                Ext.getBody().unmask();
		                if(data.bool == false){
		                   Ext.Msg.alert('提示',data.msg);
			               return ;
		                }
						/*var cn = erp.Const.callServiceMethodSync('group/group.act?method=beforeDel',{})
						me.grdStore.remove(rec);// 从 Store 中删除给定的记录,
												// 对每条删除的记录都会触发一次 'remove' 事件.
												// 在此次的所有数据删除完成后,会触发一次
												// 'datachanged' 事件.
*/						me.grdStore.reload();
					}
				});
					
	},
	//删除操作员
	doDelGroupOperator :  function() {
	      var me = this;
	      var grid = me.getGrdOperator();
	      var rec = grid.getSelectionModel().getSelection();
	      Ext.Msg.confirm("提醒", "真的要删除操作员?", function(btn) {
					if (btn == "yes") {		
						me.opStore.remove(rec);// 从 Store 中删除给定的记录,
												// 对每条删除的记录都会触发一次 'remove' 事件.
												// 在此次的所有数据删除完成后,会触发一次
												// 'datachanged' 事件.
						me.opStore.sync();
						/*me.opStore.reload();*/
					}
				})
	},
       /*修改按钮状态*/
     setBtnStatus : function(sts) {
		  var me = this;
		  var window = me.getGroupWindow();
		  window.down('#BTN_EDT').setDisabled(sts);
		  window.down('#BTN_DEL').setDisabled(sts);
	  },
	      setOpBtnStatus : function(sts) {
		  var me = this;
		  var window = me.getGroupWindow();
		  window.down('#Del_Op').setDisabled(sts);
	  }

   });