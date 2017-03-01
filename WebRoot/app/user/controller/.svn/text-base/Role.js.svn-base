Ext.define('erp.user.controller.Role',{
	extend: 'Ext.app.Controller',
	requires: ['erp.def.Const',
	           'erp.util.Util',
	           'erp.user.model.RoleFunc',
	           'erp.user.model.RoleModule',
	           'erp.user.store.RoleModules',
	           'erp.user.store.RoleFuncs',
	           'erp.user.store.UserRoles',
	           'erp.user.store.RoleServices',
	           'erp.setup.store.Functions'
	           ],
	views: ['erp.user.view.MngRole'
	        ,'erp.user.view.EditRole'
	        ],
    refs: [
	       //创建角色信息列表的一个引用，根据规则调用函数为this.getRoleGrid()
	       {ref:'RoleGrid',selector:'mng_Role #role_grid'},
	       {ref:'ModuleTree',selector:'mng_Role #module_tree'},
	       {ref:'PublicServiceGrid',selector:'mng_Role #public_service_grid'},
	       {ref:'PrivateServiceGrid',selector:'mng_Role #private_service_grid'},
	       {ref:'WebTab',selector:'mng_Role #web_tab'},
	       {ref:'module_tree',selector:'mng_Role #module_tree'}
	      ],
	//moduleId:0,
	init: function(){
		//controller只初始化一次
		if(this.isInited) return ;
		
		this.control({
			'mng_Role':{
				beforerender:function(){
					//加载模块缺省树
					this.getModuleTree().getStore().getRootNode().expand();
				},
				afterrender:function(){
					var me = this;
					//加载角色
					this.rolegridStore = this.getRoleGrid().getStore();
					//this.gridLoad();
					this.moduleStore = this.getModuleTree().getStore();
					//角色模块
					this.roleModuleStore = Ext.create('erp.user.store.RoleModules');
					//角色功能
					this.roleFuncStore = Ext.create('erp.user.store.RoleFuncs');
					//角色服务相关
					this.roleUserStore=Ext.create('erp.user.store.UserRoles');
					this.serviceStore = this.getPublicServiceGrid().getStore();
					this.serviceStore.load({params:{mod_id:1000}});
					this.privateStore=this.getPrivateServiceGrid().getStore();
					this.modelId=0;
					this.parentId=0;
					this.roleServiceStoreGive=Ext.create('erp.user.store.RoleServices');
					
				}
			},
			'mng_Role #module_tree':{
				select:this.doPrivateServiceLoad,
				checkchange:this.doModuleSelect
			},
			'mng_Role #role_grid':{
				//双击角色列表时，打开角色信息维护窗口
				itemdblclick: this.onGridItemdbclik,
				//选中角色列表时
				select:this.onRoleSelect
			},
			'mng_Role button':{
				//响应角色信息窗口增、删、改按钮事件
				click: this.onMngWinBtnClick
			},
			'edt_Role button':{
				//响应角色信息维护窗口按钮事件
				click: this.onEdtWinBtnClick
			},
			//响应服务选择事件
			'mng_Role #private_service_grid':{
				selectionchange:this.selectPrivateService
			}
		});
		//controller初始化完成
		this.isInited = true;
	},
	onRoleSelect:function(roleSelModel,roleRec,idx,eOpts){
		var me = this;
		this.modelId=0;
		me.getWebTab().enable();
		me.getModuleTree().enable();
		me.getPublicServiceGrid().enable();
		Ext.suspendLayouts();
		me.moduleStore.getRootNode().cascadeBy(function(n){
			n.set('checked',false);
			n.commit();
		});
		Ext.resumeLayouts(true);
		var myMask = new Ext.LoadMask({
		    msg    : '数据加载中...',
		    target : me.getModule_tree()
		});
		myMask.show();
		this.roleUserStore.load({
			params:{
				role_id:me.getRoleGrid().getSelectionModel().getSelection()[0].get('role_id')
			},callback:function(){
			}
		});
		//处理模块授权
		//这个查找并勾选
		this.roleModuleStore.load(
			{
				params:{ role_id : roleRec.get('role_id')},
				callback:function(rmRecs,opra,success){
					Ext.suspendLayouts();
					if(rmRecs.length>0){
						var root=me.getModuleTree().getRootNode();
						root.set('checked',true);
					}
					Ext.each(rmRecs,function(rmRec){
						var node = me.moduleStore.getNodeById(rmRec.get('mod_id'));
						if(node){
							node.set('checked',true);
							node.commit();
						}
					});
					Ext.resumeLayouts(true);
					myMask.hide();
				}
			}
		);
		//处理功能授权
		this.roleFuncStore.load(
			{
				params:{role_id:roleRec.get('role_id')},
				callback:function(rfRecs,opra,success){
					Ext.suspendLayouts();
					Ext.each(rfRecs,function(rfRec){
						var node = me.moduleStore.getNodeById(rfRec.get('f_id')*1000000+rfRec.get('f_id'));
						if(node){
							node.set('checked',true);
							node.commit();
						}
					});
					Ext.resumeLayouts(true);
				}
			}
		);
		//处理Http服务授权
		var serviceSelModel = this.getPublicServiceGrid().getSelectionModel();
		if(serviceSelModel.getSelection().length>0) 
		      serviceSelModel.deselectAll();
		      
		this.privateStore.removeAll();
		var panel=this.getPublicServiceGrid();
		this.getWebTab().setActiveTab(panel);
		//这个查找并勾选
		this.roleServiceStoreGive.load(
			{
				params:{role_id:roleRec.get('role_id')},
				callback:function(rsRecs,opra,success){
				Ext.each(rsRecs,function(rsRec){
					Ext.suspendLayouts();
					var num = me.serviceStore.indexOfId(rsRec.get('s_id'));
					    if(num >=0){
					    	serviceSelModel.select(num,true);
					    }
					});
					Ext.resumeLayouts(true); 
		        }
		    }
		);
    },
	//双击角色信息列表时，打开角色信息维护窗口
	onGridItemdbclik: function(view, rec){
		this.doEditRole(false);
		
	},
	//响应角色信息窗口增、删、改按钮事件
	onMngWinBtnClick: function(btn,event){
		switch(btn.action){
			case 'ACT_ADD':
				this.doAddRole();
				break;
			case 'ACT_EDIT':
				this.doEditRole(true);
				break;
			case 'ACT_DELETE':
				this.doDelRole();
				break;
			case 'ACT_SAVE':
				this.doSaveRoleAuth();
				break;
			case 'ACT_REFRESH':
				this.gridLoad();
				break;
		}
	},
	//响应角色信息维护窗口按钮事件
	onEdtWinBtnClick: function(btn,event){
		var me=this;
		var rec=me.getRoleGrid().getSelectionModel().getSelection()[0];
		var edtWin = btn.up('edt_Role');
		switch(btn.action){
			case 'ACT_SAVE':
				this.doSaveRoleUser(edtWin);
				break;
			case 'ACT_CLOSE':
				edtWin.close();
				break;
			case erp.Const.FUNC_ITEMID_BTN_ADD:
				this.addRoleCon(edtWin);
				break;
			case erp.Const.FUNC_ITEMID_BTN_DEL:
				this.delRoleCon(edtWin);
				break;
			case erp.Const.FUNC_ITEMID_BTN_REFRESH:
				edtWin.down('mng_rolecon').store.load({
					params:{
						role_id:rec.get('role_id')
					}
				});
				break;
		}
		
	},
	doAddRole: function(){
		var rec=Ext.create('erp.user.model.Role',{
			creator:erp.Util.currentUser.loginId});
		var edtWin = Ext.widget('edt_Role',{isAddNew:true,isEdit:true});
		edtWin.down('form').loadRecord(rec);
		edtWin.show();
	},
	doEditRole: function(isEdit){
		var me=this;
		var selModel = this.getRoleGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		var edtWin = Ext.widget('edt_Role',{
			isAddNew:false,
			isEdit:isEdit,
			role:rec
			});
		edtWin.down('form').loadRecord(rec);
		edtWin.doInit();
		edtWin.show();
	},
	doDelRole: function(){
		//删除前需要做一些逻辑检查
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
					me.getModuleTree().setDisabled(true);
		});
	},
	doSaveRole: function(rec){
		var me = this;
		if(me.rolegridStore.indexOf(rec) < 0){
			me.rolegridStore.add(rec);
		}
		this.rolegridStore.sync({
            success:function(batch,options){
                me.rolegridStore.sort();
                erp.Util.showMsg('保存成功!');
            },
            failure:function(batch,options){
                Ext.Msg.alert('保存失败!');
            }
        });
	},
	doSaveRoleAuth: function(){
		var me=this;
		var roleSelModel =this.getRoleGrid().getSelectionModel();
		var roleRec = roleSelModel.getSelection()[0];
		if(roleSelModel.hasSelection()){
			var publicService=me.getPublicServiceGrid().getSelectionModel().getSelection();
			var publicModel=me.serviceStore.getRange();
			var length=publicService.length;
			if(publicService.length==0){
				Ext.each(publicModel,function(publicModel){
					if(me.roleServiceStoreGive.find('s_id',publicModel.get('s_id'),0,false,false,true)>=0){
					     var rec=me.roleServiceStoreGive.findRecord('s_id',publicModel.get('s_id'),0,false,false,true);
						me.roleServiceStoreGive.remove(rec);
					}
			   });
				
				}else{
					
	        Ext.each(publicModel,function(publicModel){
	        	Ext.each(publicService,function(publicService){
	        		var success=false;
	        		if(publicModel.get('s_id')==publicService.get('s_id')){
	        			success=true;
	        			if(me.roleServiceStoreGive.find('s_id',publicModel.get('s_id'),0,false,false,true)<0){
							me.roleServiceStoreGive.add(Ext.create('erp.user.model.RoleService',
									{
	   						     role_id:roleRec.get('role_id'),
	  						     s_id:publicModel.get('s_id')
	   						}			
							)
							);
	        			}
	        		}
	        		else{         
	        		if(publicService.get('s_id')==me.getPublicServiceGrid().getSelectionModel().getSelection()[length-1].get('s_id')){
	        			if(me.roleServiceStoreGive.find('s_id',publicModel.get('s_id'),0,false,false,true)>=0){
	    					var rec=me.roleServiceStoreGive.findRecord('s_id',publicModel.get('s_id'),0,false,false,true);
	    					me.roleServiceStoreGive.remove(rec);
	    						 success=true;
	    				}
	        		}}
	        		if(success){
	        			return false;
	        		}
	        	});});}
			try{
				this.roleModuleStore.sync();
				this.roleFuncStore.sync();
				this.roleServiceStoreGive.sync();
				Ext.Msg.alert("提示","保存成功");
			}catch(err){
				Ext.Msg.alert(err);
			}
		}	
		
	},
	//加载私有模块
	doPrivateServiceLoad:function(selModel, record,rsRecs,model){
		//if isLeaf
		//    看id 是否功能
		//else
		//    看firstchild id 是否 func
		var me=this;
		var module=this.getModuleTree().getSelectionModel().getSelection()[0];
		var user=this.getRoleGrid().getSelectionModel().getSelection()[0];
		var privateSelModel=this.getPrivateServiceGrid().getSelectionModel();
		var r=this.roleModuleStore;
		if(record.get("leaf")){
			if(record.get("id")>1000000){
				if(me.modelId!=0){
				if(me.parentId!=record.get("parentId")&&me.modelId<100){
					this.getPrivateServiceGrid().getStore().load({
						params:{mod_id:record.get('parentId')},
					    callback:function(rsRecs,opra,success){
							Ext.each(rsRecs,function(rsRecs){
								if(me.roleServiceStoreGive.find('s_id',rsRecs.get('s_id'),0,false,false,true)>=0){
								var num = me.privateStore.indexOf(rsRecs);
								    	privateSelModel.select(num,true,true);
								}
								});
					    }
					}
					);
				}
				}else{
					    	  this.getPrivateServiceGrid().getStore().load({
									params:{mod_id:record.get('parentId')},
								    callback:function(rsRecs,opra,success){
										Ext.each(rsRecs,function(rsRecs){
											if(me.roleServiceStoreGive.find('s_id',rsRecs.get('s_id'))>=0){
											var num = me.privateStore.indexOf(rsRecs);
											    	privateSelModel.select(num,true,true);
											}
											});
								    }
								}
								);
				}
			}else{
				this.getPrivateServiceGrid().getStore().load({
					params:{mod_id:record.get('id')},
				    callback:function(rsRecs,opra,success){
						Ext.each(rsRecs,function(rsRecs){
							if(me.roleServiceStoreGive.find('s_id',rsRecs.get('s_id'),0,false,false,true)>=0){
							var num = me.privateStore.indexOf(rsRecs);
							    	privateSelModel.select(num,true,true);
							}
							});
				    }
				});
			}
		}else{
			
			if(me.parentId!=record.get('id')){
			if(this.getModuleTree().getSelectionModel().getSelection()[0].firstChild==null||this.getModuleTree().getSelectionModel().getSelection()[0].firstChild.get('mod_type')==null){
				this.getPrivateServiceGrid().getStore().load({
					params:{mod_id:record.get('id')},
				    callback:function(rsRecs,opra,success){
				    	Ext.each(rsRecs,function(rsRecs){
							if(me.roleServiceStoreGive.find('s_id',rsRecs.get('s_id'),0,false,false,true)>=0){
							var num = me.privateStore.indexOf(rsRecs);
							    	privateSelModel.select(num,true,true);
							}
							});
						        }
						});
				    }
				}
		}
		me.parentId=record.get('parentId');
		me.modelId=me.getModuleTree().getSelectionModel().getSelection()[0].get('id');
		var panel=this.getPrivateServiceGrid();
		this.getWebTab().setActiveTab(panel);
		panel.show();
		panel.tab.show();
	},
	//私有模块授权
	selectPrivateService:function(){
		var module=this.getModuleTree().getSelectionModel().getSelection()[0];
		var roleSelModel =this.getRoleGrid().getSelectionModel();
		var roleRec = roleSelModel.getSelection()[0];
		var privateService=this.getPrivateServiceGrid().getSelectionModel().getSelection();
		var privateModel=this.getPrivateServiceGrid().getStore().getRange();
        var me=this;
        var length=privateService.length;
		if(me.modelId==module.get('id')){
		if(privateService.length==0){
			Ext.each(privateModel,function(privateModel){
				if(me.roleServiceStoreGive.find('s_id',privateModel.get('s_id'),0,false,false,true)>=0){
		     var rec=me.roleServiceStoreGive.findRecord('s_id',privateModel.get('s_id'),0,false,false,true);
			me.roleServiceStoreGive.remove(rec);
			 }
			});
			}
			 Ext.each(privateModel,function(privateModel){
		        	Ext.each(privateService,function(privateService){
		        		var success=false;
		        		if(privateModel.get('s_id')==privateService.get('s_id')){
		        			success=true;
		        					if(me.roleServiceStoreGive.find('s_id',privateModel.get('s_id'),0,false,false,true)<0){
		        						me.roleServiceStoreGive.add(Ext.create('erp.user.model.RoleService',{
			        						 role_id:roleRec.get('role_id'),
			       						     s_id:privateModel.get('s_id')
			        						}	)
		        						);
		        	}
		        					}else{
		        			if(privateService.get('s_id')==me.getPrivateServiceGrid().getSelectionModel().getSelection()[length-1].get('s_id')){
		        				if(me.roleServiceStoreGive.find('s_id',privateModel.get('s_id'),0,false,false,true)>=0){
		        					var rec=me.roleServiceStoreGive.findRecord('s_id',privateModel.get('s_id'),0,false,false,true);
		        						me.roleServiceStoreGive.remove(rec);
		        						 success=true;
		        				}
		        			}
		        		}
		        		if(success){
		        			return false;
		        		}
		        });
			 });
		}
            this.modelId=module.get('id');
	},
	doModuleSelect:function(model,checked,eopt){
		var me=this;
		var roleSelModel =this.getRoleGrid().getSelectionModel();
		 var select=function(model,checked){
				var roleRec = roleSelModel.getSelection()[0];
				if (checked == true) {
					model.checked = checked;
				    //获得父节点
				    pNode = model.parentNode;
					   //当checked == true通过循环将所有父节点选中
				    while(pNode != null ){
					    if(!pNode.get('checked')){
					    	 if(!pNode.isRoot()){
					    		me.roleModuleStore.add(Ext.create('erp.user.model.RoleModule',{
						    		role_id:roleRec.get('role_id'),
						    		mod_id:pNode.get('id')
					    		   }
					    		));
					    	 }
					    	pNode.set("checked",true);
					    }
				    	pNode = pNode.parentNode;
				    }
				}
				//当该节点有子节点时
			    if (!model.isLeaf()){
			    	model.cascadeBy(function(n){
				    n.set('checked', checked);
				    	  if(checked){
				    		 if(n.get('id') <1000000 && !n.isRoot()){
				    		  me.roleModuleStore.add(Ext.create('erp.user.model.RoleModule',{
				    			  role_id:roleRec.get('role_id'),
						    	  mod_id:n.get('id') 
				    		  }));}
				    		 else if(n.get('id')>1000000){
				    		 	 var r=Ext.create('erp.user.model.RoleFunc',{
				    				 role_id:roleRec.get('role_id'),
				    				 f_id:n.get('id')%1000000
				    			 });
				    			 me.roleFuncStore.add(r);
				    		 }
				    	  }else{  
				    		  if(n.get('id')<1000000 && !n.isRoot()){
				    		  var rec=me.roleModuleStore.findRecord('mod_id',n.get('id'),0,false,false,true);
				    		  me.roleModuleStore.remove(rec);
				    		  
				    		  }
				    		  else if(n.get('id')>1000000){
				    			  var rec=me.roleFuncStore.find('f_id',n.get('id')%1000000,0,false,false,true);
				    			  me.roleFuncStore.removeAt(rec);
				    		  }  
				    	  }
			    });
			    }else{
			    	 if(checked){
			    		 if(model.get('id') <1000000 && !n.isRoot()){
				    		  me.roleModuleStore.add(Ext.create('erp.user.model.RoleModule',{
				    			  role_id:roleRec.get('role_id'),
						    	  mod_id:model.get('id') 
				    		  }));}
				    		 else if(model.get('id')>1000000){
				    		 	var r=Ext.create('erp.user.model.RoleFunc',{
				    				 role_id:roleRec.get('role_id'),
				    				 f_id:model.get('id')%1000000
				    			 });
				    			 me.roleFuncStore.add(r);
				    		 }
			    	 }else{
			    		 if(model.get('id')<1000000 && !n.isRoot()){
				    		  var rec=me.roleModuleStore.findRecord('mod_id',model.get('id'),0,false,false,true);
				    		  me.roleModuleStore.remove(rec);
				    		  }
				    		  else if(model.get('id')>1000000){
				    			  var rec=me.roleFuncStore.find('f_id',model.get('id')%1000000,0,false,false,true);
				    			  me.roleFuncStore.removeAt(rec);
				    		  }  
			    	 }
			    } 
		 };
		    			  select(model,checked);  
	},
	doSaveRoleUser:function(edtWin){
		var me=this;
		var edtForm = edtWin.down('form');
        var userModel=edtWin.down('#user_grid').getStore().getRange();
        var userGetSelectionModel=edtWin.down('#user_grid').getSelectionModel();
		if(edtForm.getForm().isValid() && edtForm.getForm().isDirty()){
			//保存角色
			Ext.each(userModel,function(model){
				if(userGetSelectionModel.isSelected(model)){
					if(me.roleUserStore.find('u_id',model.get('u_id'),0,false,false,true)<0){
						me.roleUserStore.add(Ext.create('erp.user.model.UserGroupRole',{
							u_id:model.get('u_id'),
							role_id:me.getRoleGrid().getSelectionModel().getSelection()[0].get('role_id')
						}));
					}
				}else if(!userGetSelectionModel.isSelected(model)){
					if(me.roleUserStore.find('u_id',model.get('u_id'),0,false,false,true)>=0){
						var rec=me.roleUserStore.findRecord('u_id',model.get('u_id'),0,false,false,true);
						me.roleUserStore.remove(rec);
					}
				}
			});
			var rec = edtForm.getRecord();
			edtForm.updateRecord(rec);
			if(edtWin.isAddNew){
				var roleExists =true;
    			Ext.Ajax.request({
                    url:"main/Users.do?method=getRoleExists",
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
			}else{
			    edtWin.doSave();
			}
			this.doSaveRole(rec);
			edtWin.isEdit=false;
			edtWin.close();
		}
	},
	gridLoad:function(){
		var me=this;
		me.rolegridStore.load();
		/*var recs=[];
		var params={creator:tp.Util.currentUser.loginId};
		Ext.each(tp.Util.currentUser.roleList,function(role){
			if(role.role_name=="admin"){
				for(var item in params){
					delete params[item.toString()];
				}
			}else{
				var rec=Ext.create('tp.user.model.Role',role);
				recs.push(rec);
			}
		});
		me.rolegridStore.load({
			params:params,
			callback:function(){
				if(recs.length>0){
					if(tp.Util.currentUser.roleList[0]!="admin"){
						Ext.each(recs,function(rec){
							if(!me.rolegridStore.findRecord('role_id',rec.get('role_id'),0,false,false,true)){
								me.rolegridStore.loadData(rec,true);
							}
						});
						
					}
					
					me.rolegridStore.sync();
				}
			}
		});
		me.rolegridStore.proxy.extraParams=params;*/
	},
	addRoleCon:function(editWin){
		var me=this;
		var edtWin=editWin;
		edtWin.down('mng_rolecon').addModel();
	},
	delRoleCon:function(editWin){
	   var me=this;
	   var roleCon=editWin.down('mng_rolecon');
	   roleCon.delModel();
	}
	/*,
	traverseTree:function(node){
		node.set('checked',false);
		node.commit();
		if(node.isLeaf()){
			//如果是叶节点，那么加载功能
			var fStore = Ext.create('tp.setup.store.Functions');
			fStore.load({params:{mod_id:node.get('id')},callback:function(funcRecs){
				Ext.each(funcRecs,function(funcRec){
					var child = node.appendChild({
						id:+funcRec.get('f_id')+'_'+funcRec.get('f_id'),
						parentId:node.get('id'),
						text:funcRec.get('name'),
						checked:false,
						leaf:true,
						f_id:funcRec.get('f_id')
					});
					child.commit();
				});
				if(funcRecs.length>0){
					node.set('leaf',false);
					node.expand(true);
				}
			}});
		}
	}*/
});