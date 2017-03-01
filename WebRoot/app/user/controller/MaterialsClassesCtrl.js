Ext.define('erp.user.controller.MaterialsClassesCtrl',{
	extend: 'Ext.app.Controller',
	requires: [
	           'erp.def.Const',
	           'erp.util.Util',
	           'erp.user.store.MaterialTree',
	           'erp.user.store.RoleServices',
	           'erp.setup.store.Functions',
	           'erp.user.store.UserMaterial'
	           ],
	views: ['erp.user.view.MngMaterials',
	         'erp.user.view.EditUserRole',
	         'erp.user.view.ChooseUser'
	        ],
    refs: [
	       //创建角色信息列表的一个引用，根据规则调用函数为this.getRoleGrid()
          {ref:'Materials',selector:'mng_Materials'},
          {ref:'UserGrid',selector:'mng_Materials #user_grid'},
          {ref:'RoleGrid',selector:'mng_Materials #role_grid'},
          {ref:'EditUserRole',selector:'edt_UserRole'},
          {ref:'EditUserGrid',selector:'edt_UserRole #user_grid'},
          {ref:'MaterialsTree',selector:'mng_Materials #materials_tree'}
	      ],
	//moduleId:0,
	init: function(){
		var me = this;
		//controller只初始化一次
		if(this.isInited) return ;
		
		this.control({
			'mng_Materials':{
				beforerender:function(){
					//加载模块缺省树
					this.getMaterialsTree().getStore().getRootNode().expand();
				},
				afterrender:function(){
					var me = this;
					me.maintab = 0;
					//加载用户
					this.userStore = this.getUserGrid().getStore();
					this.rolegridStore = this.getRoleGrid().getStore();
					this.moduleStore = this.getMaterialsTree().getStore();
					this.userMaterialStore = Ext.create('erp.user.store.UserMaterial');
					this.roleMaterialStore = Ext.create('erp.user.store.RoleMaterial');
				    var hrecs = me.moduleStore.getRange();
	                /*Ext.suspendLayouts();
	                for(var i=0;i<hrecs.length-1;i++){
	                  console.log(!hrecs[i].isRoot())
	                  if(!hrecs[i].isRoot()){	
	                    me.getMaterialsTree().collapseNode(hrecs[i]);
	                    }
	                 }
	                Ext.resumeLayouts(true); */
				}
			},
			'mng_Materials button': {
			    click : this.onMngWinBtnClick
			},
			'mng_Materials #main_tab tab' : {
			    click:function(button,e,eOpts){
			     if(button.title=='用户'){
			       me.maintab = 0;
			       this.getMaterials().down('#addBtn').setDisabled(true);
			       this.getMaterials().down('#edtBtn').setDisabled(true);
			       this.getMaterials().down('#delBtn').setDisabled(true);
			     }
			     else if(button.title=='角色'){
			       me.maintab = 1;
			       this.getMaterials().down('#addBtn').setDisabled(false);
			      /* this.getMaterials().down('#edtBtn').setDisabled(false);
			       this.getMaterials().down('#delBtn').setDisabled(false);*/
			     }
			     
			   }
			},
			'mng_Materials #user_grid' : {
			    select:this.onUserSelect
			},
			'mng_Materials #materials_tree':{
				/*select:this.doPrivateServiceLoad,*/
				checkchange:this.doModuleSelect,
				afteritemexpand : this.doPrivateServiceLoad
			},
			'mng_Materials #role_grid':{
			   select:this.onRoleSelect,
			   itemdblclick:this.onGridItemdbclik
			},
			//响应服务选择事件
			'mng_Materials #private_service_grid':{
				selectionchange:this.selectPrivateService
			},
			'edt_UserRole button':{
			    click : this.onEdtWinBtnClick
			} 
		});
		//controller初始化完成
		this.isInited = true;
	},
	//展开子节点时查询相应权限
	doPrivateServiceLoad : function (node, index, item, eOpts){
		var me = this;
		if(me.getUserGrid().getSelectionModel().getSelection().length>0){
		me.userMaterialStore.load({
		     params : {
		         czy_gh : me.getUserGrid().getSelectionModel().getSelection()[0].get('czy_gh')
		     },callback:function(umRecs,opra,success){
		     	Ext.suspendLayouts();
		     	if(umRecs.length>0){
		     	     var root=me.moduleStore.getRootNode();
		     	     root.set('checked',true);
		     	}
		     	Ext.each(umRecs,function(umRec){
		     	    var node  = me.moduleStore.getNodeById(umRec.get('lbbh'));
		     	    if(node==null){
		     	    node  = me.moduleStore.getNodeById(umRec.get('lbbh'));
		     	    }
                 if(node){
						node.set('checked',true);
						node.commit();
					} 
		     	});
		     	Ext.resumeLayouts(true);
			}
		});}
	},
	onUserSelect : function(idx,eOpts){
	    var me = this;
	    this.modelId=0;
	    me.getMaterialsTree().enable();
	    var hrecs = me.moduleStore.getRange();
	    for(var i=0;i<hrecs.length-1;i++){
	    if(!hrecs[i].isRoot()){	
	    me.getMaterialsTree().collapseNode(hrecs[i]);
	    }
	    }
	    Ext.suspendLayouts();
	    me.moduleStore.getRootNode().cascadeBy(function(n){
			n.set('checked',false);
			n.commit();
		});
		Ext.resumeLayouts(true);
		Ext.Ajax.setTimeout(120000);
		Ext.getBody().mask('正在加载，请耐心等候...');
		this.userMaterialStore.load({
		     params : {
		         czy_gh : me.getUserGrid().getSelectionModel().getSelection()[0].get('czy_gh')
		     },callback:function(umRecs,opra,success){
		     	/*Ext.suspendLayouts();*/
		     	if(umRecs.length>0){
		     	     var root=me.moduleStore.getRootNode();
		     	     root.set('checked',true);
		     	}
		     	Ext.each(umRecs,function(umRec){
		     	    var node  = me.moduleStore.getNodeById(umRec.get('lbbh'));
                 if(node){
                 	    
						node.set('checked',true);
						node.commit();
					} 
		     	});
		     	Ext.resumeLayouts(true);
				Ext.getBody().unmask();
			}
		});
	},
	onRoleSelect : function(idx,eOpts){
	    var me = this;
	    this.modelId=0;
	    me.getMaterialsTree().enable();
	    var hrecs = me.moduleStore.getRange();
	    for(var i=0;i<hrecs.length-1;i++){
	    if(!hrecs[i].isRoot()){	
	    me.getMaterialsTree().collapseNode(hrecs[i]);
	    }
	    }
	    Ext.suspendLayouts();
	    me.moduleStore.getRootNode().cascadeBy(function(n){
			n.set('checked',false);
			n.commit();
		});
		Ext.resumeLayouts(true);
		Ext.Ajax.setTimeout(120000);
		Ext.getBody().mask('正在加载，请耐心等候...');
		this.roleMaterialStore.load({
		    params : {
		       role_id : me.getRoleGrid().getSelectionModel().getSelection()[0].get('role_id')
		    },callback:function(umRecs,opra,success){
		       if(umRecs.length>0){
		     	    var root=me.moduleStore.getRootNode();
		     	    root.set('checked',true);
		     	}
		     	Ext.each(umRecs,function(umRec){
		     	    var node  = me.moduleStore.getNodeById(umRec.get('lbbh'));
                 if(node){
						node.set('checked',true);
						node.commit();
					} 
		     	});
		     	Ext.resumeLayouts(true);
				Ext.getBody().unmask();
		    }
		})
	},
	//按钮监听
	onMngWinBtnClick: function(btn,event){
		switch(btn.action){
		    case 'ACT_SAVE':
		    this.doSaveMaterialAuth();
		    break;
		    case 'ACT_ADD':
		    this.doAddRole();
		    break;
		    case 'ACT_EDIT':
		    this.doEditRole(true);
		    break;
		    case 'ACT_DELETE':
		    this.DelRole();
		    break;
		    case 'ACT_REFRESH':
		    if(this.maintab==0){
		       this.userStore.reload();
		    }else if(this.maintab==1){
		      this.rolegridStore.reload(); 
		    }
		}
	},
	doAddRole : function(isEdit){
	  var me = this;
	  var rec = Ext.create('erp.user.model.OperatorRole',{
	        creator:erp.Util.currentUser.loginId
	  });
	  var edtWin = Ext.widget('edt_UserRole',{isAddNew:true,isEdit:false});
		edtWin.down('form').loadRecord(rec);
		edtWin.show();
	},
	DelRole : function(){
	  var me = this;
	  var selModel = me.getRoleGrid().getSelectionModel();
	  if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
	  var rec =selModel.getSelection()[0];
	  if(rec.get('role_name')==erp.Const.SUPER_ROLE){
			Ext.Msg.alert('提示','不能删除超级用户角色['+rec.get('role_name')+']!');
		    return;
	  }
	  Ext.Msg.confirm('提示','你确信要删除角色['+rec.get('role_name')+']吗?',
		     	function fn(id){
					if(id==Ext.Msg.buttonIds[1]){
						// TODO 删除前需要检查一下该角色是否已经被授权使用(user_role)
						// 目前还没有实现 2013-11-28 by mmc
						me.rolegridStore.remove(rec);
						me.rolegridStore.sync();
					}
					me.getMaterialsTree().setDisabled(true);
					me.rolegridStore.reload();
		}); 	
	},
	onEdtWinBtnClick : function(btn,event){
		var edtWin = btn.up('edt_UserRole');
		switch(btn.action){
		    case 'ACT_DELETE':
		    this.DeleteUserRoleRef();
		    break;
		    case 'ACT_ADD':
		    this.AddUserRoleRef();
		    break;
		    case 'ACT_SAVE':
		    this.doSaveRole(edtWin);
		    break;
		}
	},
	doSaveRole : function(edtWin){
	    var me=this;
		var edtForm = edtWin.down('form');
		if(edtForm.getForm().isValid() && edtForm.getForm().isDirty()){
		   //保存角色
			var rec = edtForm.getRecord();
			edtForm.updateRecord(rec);
			console.log(rec)
			if(me.rolegridStore.indexOf(rec) < 0){
			var roleExists =true;
			Ext.Ajax.request({
                    url:"materialarchive/materialarchive.act?method=getRoleExists",
                    actionMehtods:'post',
                    async: false,
                    params:{
                        role_name:rec.get('role_name'),
                        create_ou:rec.get('create_ou')
                    },
                    success:function(resp){
                        roleExists=Ext.decode(resp.responseText).data;
                    }
                });
                if(roleExists){
                    Ext.Msg.alert('提示','角色['+rec.get('role_name')+']已经存在,不能重复输入!');
                    return ;
                }
			       me.rolegridStore.add(rec);
		        }
		        this.rolegridStore.sync({
                   success:function(batch,options){
                   me.rolegridStore.sort();
                   erp.Util.showMsg('保存成功!');
                   edtWin.close();
                   me.rolegridStore.reload();
                },
                failure:function(batch,options){
                   Ext.Msg.alert('保存失败!');
                }
        });
		}
	},
	AddUserRoleRef : function(){
	   var me = this;
	   var win = Ext.widget('choose_User',{
	      role : me.getEditUserRole().role
	   });
	    win.down('#btn_confirm').on({
	                click : function(btn){
	                   var win = btn.up('window');
	                   var selModel = win.down('#grid_user').getSelectionModel();
	                   if(!selModel.hasSelection()){
			               Ext.Msg.alert('提示','请选择一条数据!');
			               return;
	                   }
	                   var recs =selModel.getSelection();
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
		                var store = me.getEditUserGrid().getStore();
	                    var role = win.role;
	                    var role_id = role.get('role_id');
	                    Ext.Msg.confirm("提示","是否确定保存？",function(btn){
	                        if(btn=='yes'){
	                           erp.Const.callServiceMethodSync('materialarchive/materialarchive.act?method=AddUserRoleRef',{
	                               role_id : role_id,recordData : recordData
	                            })
	                          store.add(recs);  
	                          win.close();
	                        }
	                    })
	                    }
	    })            
	   win.show();
	},
	DeleteUserRoleRef : function(){
	   var me = this;
	   var selModel = me.getEditUserGrid().getSelectionModel();
	   if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
	   }
	   var recs =selModel.getSelection();
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
	   var store = me.getEditUserGrid().getStore();
	   var role = me.getEditUserRole().role;
	   var role_id = role.get('role_id');
	   Ext.Msg.confirm("提示","是否确定要删除？",function(btn){
	      if(btn=='yes'){
	        store.remove(recs);
	        erp.Const.callServiceMethodSync('materialarchive/materialarchive.act?method=deleteUserRoleRef',{
	           role_id : role_id,recordData : recordData
	        })
	      }
	   })
	},
	doEditRole: function(isEdit){
		var me=this;
		var selModel = this.getRoleGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
        var rec =selModel.getSelection()[0];
        var edtWin = Ext.widget('edt_UserRole',{
           isAddNew:false,
		   isEdit:isEdit,
		   role:rec
        });
        edtWin.down('form').loadRecord(rec);
		edtWin.doInit();
		edtWin.show();
    },
	//保存授权
	doSaveMaterialAuth : function(){
	   var me=this;
	   if(me.maintab==0){
	   var userModel = this.getUserGrid().getSelectionModel();
	   var userRec = userModel.getSelection()[0];
	   /*me.getMaterialsTree().*/
	   var nodIdb = me.getMaterialsTree().getSelectionModel().getSelection()[0].get('id');
	   if(!userModel.hasSelection()){
			 Ext.Msg.alert('提示','请选择一条数据!');
			 return;
	   }
	   try{
				this.userMaterialStore.sync();
				Ext.Msg.alert("提示","保存成功");
			}catch(err){
				Ext.Msg.alert(err);
			}
	   }
	   else if(me.maintab==1){
	   var roleModel = this.getRoleGrid().getSelectionModel();
	   var roleRec = roleModel.getSelection()[0];
	   var nodIdb = me.getMaterialsTree().getSelectionModel().getSelection()[0].get('id');
	   if(!roleModel.hasSelection()){
			 Ext.Msg.alert('提示','请选择一条数据!');
			 return;
	   }    
	    try{
				this.roleMaterialStore.sync();
				Ext.Msg.alert("提示","保存成功");
		}catch(err){
				Ext.Msg.alert(err);
		}
	   }
	},
	doModuleSelect : function(model,checked,eopt){
	    var me  = this;
	    if(me.maintab==0){
	    var userModel = this.getUserGrid().getSelectionModel();
	    }
	    else if(me.maintab==1){
	    var userModel = this.getRoleGrid().getSelectionModel();
	    }
	    var select=function(model,checked){
	       var userRec = userModel.getSelection()[0];
	       if(Ext.isEmpty(userRec)){
	           return;
	       }
	       if (checked == true) {
	          model.checked = checked;
	           //获得父节点
		      pNode = model.parentNode;
		       //当checked == true通过循环将所有父节点选中
		      while(pNode != null){
		          if(!pNode.get('checked')){
		              if(!pNode.isRoot()){
		                 if(me.maintab==0){
	                       me.userMaterialStore.add(Ext.create('erp.user.model.UserMaterial',{
		                     czy_gh : userRec.get('czy_gh'),
		                     lbbh : pNode.get('id')
		                     }));
		                   }else if(me.maintab==1){
		                   me.roleMaterialStore.add(Ext.create('erp.user.model.RoleMaterial',{
		                     role_id : userRec.get('role_id'),
		                     lbbh : pNode.get('id')
		                    })); 
		                   }
		              }
		              pNode.set("checked",true);
		          }
		          pNode = pNode.parentNode;
		      }
	       }
	       //当该节点有子节点时
	       if (!model.isLeaf()){
	          model.cascadeBy(function(n){
	             n.set('checked',checked);
	                  if(checked){
	                      if(!n.isRoot()){
	                       if(me.maintab==0){
	                       me.userMaterialStore.add(Ext.create('erp.user.model.UserMaterial',{
		                     czy_gh : userRec.get('czy_gh'),
		                     lbbh : n.get('id')
		                     }));
		                   }else if(me.maintab==1){
		                   me.roleMaterialStore.add(Ext.create('erp.user.model.RoleMaterial',{
		                     role_id : userRec.get('role_id'),
		                     lbbh : n.get('id')
		                   })) 
		                   }
		                     }
	                  }else{
	                  	if(!n.isRoot()){
	                  	  if(me.maintab==0){	
		                  var rec = me.userMaterialStore.findRecord('lbbh',n.get('id'),0,false,false,true);
		                      me.userMaterialStore.remove(rec)
	                  	  }else if(me.maintab==1){
	                  	  var rec = me.roleMaterialStore.findRecord('lbbh',n.get('id'),0,false,false,true);
	                  	      me.roleMaterialStore.remove(rec)
	                  	  } 
		                  }
	                  }
	          });
	       }else{
	       	   model.cascadeBy(function(n){
	           if(checked){
	              if(!n.isRoot()){
	                  if(me.maintab==0){
	                       me.userMaterialStore.add(Ext.create('erp.user.model.UserMaterial',{
		                     czy_gh : userRec.get('czy_gh'),
		                     lbbh : n.get('id')
		                     }));
		                   }else if(me.maintab==1){
		                   me.roleMaterialStore.add(Ext.create('erp.user.model.RoleMaterial',{
		                     role_id : userRec.get('role_id'),
		                     lbbh : n.get('id')
		                    })); 
		                   }
		              }
	              }else{
	              	  if(!n.isRoot()){ 
	                  if(me.maintab==0){	
		                  var rec = me.userMaterialStore.findRecord('lbbh',n.get('id'),0,false,false,true);
		                      me.userMaterialStore.remove(rec)
	                  	  }else if(me.maintab==1){
	                  	  var rec = me.roleMaterialStore.findRecord('lbbh',n.get('id'),0,false,false,true);
	                  	      me.roleMaterialStore.remove(rec)
	                  	  } 
	              	  }        
	              }})
	         }
	    };
		    			  select(model,checked);  
	}
	
});