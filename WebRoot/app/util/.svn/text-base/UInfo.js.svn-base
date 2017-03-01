Ext.define('erp.util.UInfo',{
	currentUser:{},
	init:function(callbackFn){
		this.getLoginInfo(callbackFn);
	},
	getLoginInfo:function(callbackFn){
		var me=this;
		//取得上次的默认登陆的组织号
		var ou_code =''; 
	    try{
	    	ou_code = erp.Util.loadCurrentOuCode();
			ou_code = Ext.isEmpty(ou_code)?'':ou_code;
	    }catch(e){
	    	ou_code ='';
	    	Ext.log(e.message);
	    }
		
		//加载用户登录信息
		Ext.Ajax.request({
			url:'main/Users/getLoginInfo.do',
			method:'POST',
			async:false,
			params:{
				ou_code:ou_code
			},
			callback:function(options,success,resp){
				var retObj = Ext.decode(resp.responseText);
				if(retObj[erp.Const.AJAX_ERR_CODE] == erp.Const.AJAX_ERR_CODE_999_SessionTimeOut ){
				    //在未登录状态下执行的
					return;
				}
				if(retObj.success){
					var recs=retObj[erp.Const.AJAX_DATA_ROOT];
					if(recs[0]){
						me.currentUser =me.currentUser||{};
						me.currentUser.userInfo=recs[0];
						me.currentUser.loginId =recs[0].login_id;
						me.currentUser.name =recs[0].name;
						me.currentUser.u_id=recs[0].u_id;
						erp.Util.currentUser=me.currentUser;
					}
					//加载用户的角色信息
					if(recs[1]){
						me.currentUser.roleList = recs[1];
						//定义角色查询方法
						me.currentUser.hasRole = function(roleName){
							var ret = false;
							Ext.each(recs[1],function(roleData){
								 //Ext.log('role_name='+roleData.role_name+',roleName='+roleName);
							     if(roleData.role_name == roleName){
							     	ret = true;
                                    return false;
                                }
							});
							return ret;
						};
						//是否为管理员
						me.currentUser.isAdmin = me.currentUser.hasRole(erp.Const.SUPER_ROLE);
						me.isAdmin = me.currentUser.isAdmin;
					}
					//加载用户职位信息
					if(recs[2]){
						me.currentUser.pstList = recs[2];
						//先取第一行记录记录到当前用户所属的组织和部门
						if(recs[2].length > 0){
							me.currentUser.emp_code = recs[2][0].emp_code;
							me.currentUser.pst_code = recs[2][0].pst_code;
							me.currentUser.pst_name = recs[2][0].pst_name;
							me.currentUser.ou_code = recs[2][0].ou_code;
							me.currentUser.d_code = recs[2][0].d_code;
							me.currentUser.ou_name = recs[2][0].ou_name;
							me.currentUser.d_name = recs[2][0].d_name;
						}
						//定义职位查询方法
						me.currentUser.hasPst = function(pstcode, ou_code, d_code){
							for(var i = 0; i < recs[2].length; ++i){
								if(recs[2][i].type == 'A'){
									//A代表主职，默认取主职的
									me.currentUser.ou_code = recs[2][i].ou_code;
									me.currentUser.d_code = recs[2][i].d_code;
								}
								if(recs[2][i].pst_code != pstcode){
									continue;
								}
								if(ou_code){
									if(recs[2][i].ou_code != ou_code){
										continue;
									}
								}
								if(d_code){
									if(recs[2][i].d_code != d_code){
										continue;
									}
								}
								return true;
							}
							return false;
						};
						me.currentUser.hasPstAuthority = function(ou_code,d_code){
							for(var i=0;i<recs[2].length;i++){
								if(!me.currentUser.hasPst(recs[2][i].pst_code,ou_code,d_code)){
								   continue;	
								}
								return true;
							}
							return false;
						};
					}
					//加载用户所在职位的od_id
					me.currentUser.odMap = {};
					if(recs[3]){
						me.currentUser.odMap = recs[3];
						me.currentUser.getOrgUnit = function(ou_code){
							return me.currentUser.odMap[ou_code];
						};
						me.currentUser.getOuId = function(ou_code){
							var map = me.currentUser.odMap[ou_code || me.currentUser.ou_code];
							if(map){
								return map['ou_id'];
							}else{
								return '';
							}
						};
						me.currentUser.getOuName = function(ou_code){
							var map = me.currentUser.odMap[ou_code || me.currentUser.ou_code];
							if(map){
								return map['ou_name'];
							}else{
								return '';
							}
						};
						me.currentUser.getOdId = function(ou_code){
							var map = me.currentUser.odMap[ou_code || me.currentUser.ou_code];
							if(map){
								return map['od_id'];
							}else{
								return null;
							}
						};
					}
					//IP地址
					if(recs[4]){
						erp.IP = me.currentUser.IP = recs[4];
					}
					//默认组织
					me.currentUser.defaultOrg = recs[5] || {};
					erp.getDefaultOrg = me.currentUser.getDefaultOrg = function(){
						return me.currentUser.defaultOrg;
					};
					erp.getDefaultOuCode = me.currentUser.getDefaultOuCode = function(){
						return me.currentUser.getDefaultOrg().ou_code;
					};
					//默认部门
					me.currentUser.defaultDept = recs[6] || {};
					//获取指定组织下的默认部门
					erp.getDefaultDept = me.currentUser.getDefaultDept = function(ou_code){
						ou_code = ou_code || me.currentUser.getDefaultOuCode();
						return me.currentUser.defaultDept[ou_code] || {};
					};					
					//当前组织					
					me.currentUser.currentOrg = recs[7] = recs[7] || {};
					erp.getCurrentOrg = me.currentUser.getCurrentOrg = function(){
						return me.currentUser.currentOrg;
					};
					erp.getCurrentOuCode = me.currentUser.getCurrentOuCode = function(){
						return me.currentUser.getCurrentOrg().ou_code;
					};
					//兼容性考虑↓↓↓↓↓↓↓↓↓↓将当前组织号作为使用的首选
					me.currentUser.ou_code = me.currentUser.currentOrg.ou_code;
					//兼容性考虑↓↓↓↓↓↓↓↓↓↓ 根据当前所处的组织取该组织下默认的部门
					me.currentUser.d_code = erp.getDefaultDept(me.currentUser.ou_code).d_code || '';
					//可切换的组织					
					me.currentUser.changableOrg = recs[8] = recs[8] || {};					
					erp.getChangableOrg = me.currentUser.getChangableOrg = function(){
						var list = [];
						for(ou_code in recs[8]){
							list.push(recs[8][ou_code]);
						}
						return list;
					};
					//获取当前可切换组织的菜单
					erp.getChangableOrgMenu = function(){
						var ret = [];
						var list = erp.getChangableOrg();
						Ext.Array.forEach(list, function(item){
							var o = {};
							o.text = item.text;
							o.ou_code = item.ou_code;
							o.ou_id = item.ou_id;
							if(item.ou_code == erp.getCurrentOuCode()){
								o.checked = true;
								Ext.Array.insert(ret, 0, [o]);
							}else{
								o.checked = false;
								ret.push(o);
							}
						});
						return ret;
					};
				}
				//获取用户的菜单信息域字段权限
				Ext.Ajax.request({
						url:'main/Users.do?method=getDataPermitByLoginId',
						method:'POST',
						async:false,
						params:{
							login_id:me.currentUser.loginId,
							data_permit:erp.Const.COL_DATA_PERMIT
						},
					callback:function(options,success,resp){
						var retObj = Ext.decode(resp.responseText);
						if(retObj[erp.Const.AJAX_ERR_CODE] == erp.Const.AJAX_ERR_CODE_999_SessionTimeOut ){
						    //在未登录状态下执行的
							return;
						}	
						var recs=retObj[erp.Const.AJAX_DATA_ROOT];
						var p=[];
						//对所有非超级用户保存列授权信息
						if (!Ext.isEmpty(recs) && !me.currentUser.isAdmin){
							var map = new Ext.util.HashMap();
							var i=0;
							Ext.each(recs,function(rec){
								//根据菜单ID增加信息域权限
								if (Ext.isEmpty(map.get(rec.mod_id)))
								{
									p.push({column:rec.fd_name,fd_type:rec.fd_type,permit:rec.permit});
								}else
								{
									p=map.get(rec.mod_id);
									p.push({column:rec.fd_name,fd_type:rec.fd_type,permit:rec.permit});
								}
								map.add(rec.mod_id,p);
							});
						}
						me.currentUser.mapColPermit=map;
						//用户账号映射
						var result=erp.Const.callServiceMethodSync('main/Users.do?method=getUserMappingList',{u_id:me.currentUser.u_id});
						if(result!=null){
							if (result.length>0){
								me.currentUser.accountMap=result;
							}
						}
						if(!Ext.isEmpty(callbackFn)&&Ext.isFunction(callbackFn)){
									Ext.callback(callbackFn,me);
							}
						}
					});
					
				
			}
		});
		
		
		
	}
},function(){
    erp.UInfo = erp.util.UInfo = new this();
});