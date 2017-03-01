package erp.common.main.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.login.data.LoginMapper;
import erp.common.model.UserDataPermit;
import erp.util.Const;
import erp.util.SessionUtil;
import erp.util.WebUtil;
import erp.web.data.ModuleMapper;
import erp.web.data.OrgMapper;
import erp.web.data.UsersMapper;
import erp.web.model.DeptTreeNode;
import erp.web.model.Exclusive;
import erp.web.model.Function;
import erp.web.model.Module;
import erp.web.model.OrgTreeNode;
import erp.web.model.Role;
import erp.web.model.RoleConfig;
import erp.web.model.RoleFunc;
import erp.web.model.RoleModule;
import erp.web.model.RoleService;
import erp.web.model.UserFunc;
import erp.web.model.UserInfo;
import erp.web.model.UserMapping;
import erp.web.model.UserModule;
import erp.web.model.UserRole;


@Service
public class UserService {
	@Autowired
	private ModuleMapper moduleMapper;
	
	@Autowired
	private UsersMapper usersMapper;
	
	@Autowired
	private OrgsService orgsService;
	
	@Autowired
	private OrgMapper orgMapper;
	
	public List<UserFunc> getUserFuncList(Map<String,Object> paramMap){
		return usersMapper.getUserFuncList(paramMap);
	}
	
	/**
	 * 获取用户列表
	 * Request main/Users.do?method=getUserList <br/><br/>
	 * Response {data:[{@link UserInfo}}]} <br/><br/>
	 * @param paramsMap
	 *            支持如下参数： login_id,u_type,login_type,name%
	 * @return UserInfo 列表
	 */
	public List<UserInfo> getUserList(Map<String, Object> paramsMap) {
		    return usersMapper.getUserList(paramsMap);
	}
	
	/**
	 * 新增用户
	 * Request main/Users.do?method=addUser <br/><br/>
	 * Response {data:[{UserInfo}]} <br/><br/>
	 * @param userInfo {@link UserInfo}
	 */
	public void addUser(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
		userInfo.setCreate_dt(new Date());
		usersMapper.addUser(userInfo);
		return;
		}
	}
	
	/**
	 * 更新用户
	 * Request main/Users.do?method=updateUser <br/><br/>
	 * Response {data:[{UserInfo}]} <br/><br/>
	 * @param userInfo {@link UserInfo}
	 */
	public void updateUser(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
		userInfo.setModify_dt(new Date());
		usersMapper.updateUser(userInfo);
		return;
		}
	}
	public void deleteUserRole(UserRole[] userrole){
		for(UserRole item:userrole){
			usersMapper.deleteUserRole(item);
		}
	}
	/**
	 * 删除用户 将同时删除用户角色授权
	 * Request main/Users.do?method=deleteUser <br/><br/>
	 * Response {} <br/><br/>
	 * @param userInfo {@link UserInfo}
	 */
	@Transactional
	public void deleteUser(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
			int uId = userInfo.getU_id();
			usersMapper.deleteUserMenuByUid(uId);    //用户菜单
			usersMapper.deleteUserRoleByUid(uId);    //用户角色
			usersMapper.deleteUserModuleByUid(uId);  //用户模块
			usersMapper.deleteUserFuncByUid(uId);    //用户功能
			usersMapper.deleteUserMapByUid(uId);    //用户映射
			orgMapper.deleteUserOrgByUid(uId);       //用户组织
			orgMapper.deleteUserDeptByUid(uId);      //用户部门
			
			Map<String,Object> param=new HashMap<String, Object>();
			param.put("login_id",userInfo.getLogin_id());
			// 最后删除用户信息
			usersMapper.deleteUser(userInfo);
		}
	}
	public void deleteUserByLoginId(Map<String,Object> params) {
		List<UserInfo> userLst = usersMapper.getUserList(params);
		if(userLst.size()<=0)
			return;
		UserInfo userInfo = userLst.get(0);
		WebUtil.getAppCtx().getBean(UserService.class).deleteUser(new UserInfo[]{userInfo});
	}
	
	public List<UserModule> getUserModuleList(Map<String,Object> paramMap){
		return usersMapper.getUserModuleList(paramMap);
	}
	public void addUserModule(UserModule[] userModule){
		for(UserModule item:userModule){
			usersMapper.addUserModule(item);
		}
	}
	public void deleteUserModule(UserModule[] userModule){
		for(UserModule item:userModule){
			usersMapper.deleteUserModule(item);
		}
	}
	public void addUserRole(UserRole[] userole){
		for(UserRole item:userole){
			usersMapper.addUserRoleList(item);
		}
	}
	/**
	 * 获得可选择配置角色清单
	 * @param params  u_id --用户id  ou_id --目标组织id
	 * @return
	 */
	public List<Role> getCanChooseRoleList(Map<String, Object> params){
		if(SessionUtil.isAdmin())
			params.put("is_admin", "true");
		return usersMapper.getCanChooseRoleList(params);		
	}
	
	/**
	 * 检查用户是否存在
	 * Request main/Users.do?method=isExistsUser <br/><br/>
	 * Response {data:true||false} <br/><br/>
	 * @param paramsMap 支持参数： login_id || name 等组合
	 * @return boolean
	 */
	public boolean isExistsUser(Map<String, Object> paramsMap) {
		return usersMapper.getUserCount(paramsMap)>0;
	}
	//角色配置
	/**
	 * 获取角色配置列表
	 * request main/Users.do?method=getRoleConList <br/><br/>
	 * response {data:[{@link RoleConfig}]} <br/><br/>
	 * @param paramMap role_id,con_id
	 * @return RoleConfig
	 */
	public List<RoleConfig> getRoleCfgList(Map<String,Object> paramMap){
		return usersMapper.getRoleCfgList(paramMap);
	}
	/**
	 * 增加角色
	 * Request main/Users.do?method=addRole <br/><br/>
	 * Response {data:[{@link Role}]}
	 * @param roles 参数为需要增加的角色数组 {@link Role}
	 */
	public void addRole(Role[] roles) {
		for(Role role:roles){
		usersMapper.addRole(role);
		}
	}
	/**
	 * 更新角色
	 * Request main/Users.do?method=updateRole <br/><br/>
	 * Response {data:[{@link Role}]}
	 * @param roles 参数为需要更新的角色数组 {@link Role}
	 */
	public void updateRole(Role[] roles) {
		for(Role role:roles){
		usersMapper.updateRole(role);
		}
	}
	/**
	 *  删除用户的角色信息
	 *  Request main/Users.do?method=deleteRole <br/><br/>
	 *  Response {data:[{@link Role}]}
	 * @param roles {@link Role}
	 */
	@Transactional
	public void deleteRole(Role[] roles) {
		for(Role role:roles){
		usersMapper.deleteRoleModuleByRId(role.getRole_id());
		usersMapper.deleteRoleFuncByRId(role.getRole_id());
		usersMapper.deleteRoleServiceByRId(role.getRole_id());
		usersMapper.deleteUserRoleByRoleId(role.getRole_id());
		usersMapper.deleteRole(role);
		}
	}
	/**
	 * 根据角色id查询用户列表
	 * Request main/Users.do?method=getUserListByRole <br/><br/>
	 * Response {data:[{@link UserInfo}}]} <br/><br/>
	 * @param paramsMap
	 *            支持如下参数：role_id,role_ids 可以是单个role_id,也可以是多个逗号隔开的role_ids
	 * @return UserInfo 列表
	 */
	public List<UserInfo> getUserListByRoles(Map<String,Object> paramsMap){
			return usersMapper.getUserListByRoles(paramsMap);
	}
	
	/**
	 * 根据用户角色ID获取左部菜单列表<br/><br/>
	 * Request main/GetMenu.action?method=getRoleListByLoginId <br/><br/>
	 * Response {data:[{@link Role}}]} <br/>
	 * @param role_id String 角色id
	 * @return {@link List<Menu>} 菜单列表
	 */
	public List<Module> getMenuList(Map<String,Object> paramsMap){
		return moduleMapper.getModuleList(paramsMap);
	}
	
	/**
	 * 通过用户模块获得角色功能列表
	 * Request main/Users.do?method=getFuncListByUserModule <br/><br/>
	 * Response {data:[@link {Function}]}
	 * @param paramMap login_id 登陆id,mod_id模块id
	 * @return Function清单
	 */
	public List<Function> getFuncListByUserModule(Map<String, Object> paramMap) {
		return usersMapper.getFuncListByUserModule(paramMap);
	}
	
	/**
	 * 登录校验
	 * Request main/Users.do?method=chkUserPwd<br/><br/>
	 * Response {data:true|false} <br/><br/>
	 * @param paramsMap
	 *            支持如下参数：login_id && pwd
	 * @return true-用户ID(login_id)/密码(pwd)正确    false-不正确
	 */
	public boolean chkUserPwd(Map<String, Object> paramsMap) {
		paramsMap.put("is_valid", "true");
		return usersMapper.getUserCount(paramsMap)>0;
	}
	
	/**
	 * 根据角色名称查找
	 * @param pararms role_name --角色名 create_ou --创建组织
	 * @return
	 */
	public boolean getRoleExists(Map<String,Object> params){
		params.put("mode", "exists");
		return usersMapper.getRoleList(params).size()>0;
	}
	
	/**
	 * 修改密码
	 * Request main/Users.do?method=updateUserPwd <br/><br/>
	 * Response {data:[{@link UserInfo}}]}
	 * @param  userInfo {@link UserInfo}
	 *            需提供userInfo.login_id和userInfo.pwd 两个参数
	 * 
	 */
	public void updateUserPwd(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
		userInfo.setModify_dt(new Date());
		usersMapper.updateUserPwd(userInfo);
		}
	}
	
	/**
	 * 增加角色模块关联权限
	 * Request main/Users.do?method=addRoleModule <br/><br/>
	 * Response {data:[@link addRoleModule]}
	 * @param RoleModule {@link RoleModule}
	 */
	@Transactional
	public void addRoleModule(RoleModule[] roleModule) {
		for (RoleModule rm : roleModule) {
			usersMapper.addRoleModule(rm);
		}
	}
	
	public List<UserRole> getUserRoleList(Map<String,Object> params){
		return usersMapper.getUserRoleList(params);
	}
	/**
	 * 查询角色
	 * Request main/Users.do?method=getRoleList <br/><br/>
	 * Response {data:[{@link Role}]} <br/><br/>
	 * @params Map 参数为map
	 * @return List<Role> 返回值为角色集合
	 */
	public List<Role> getRoleList(Map<String, Object> params) {
		String mode= params.get("mode")!=null?params.get("mode").toString():null;
		String condition= params.get("condition")!=null?params.get("condition").toString():"";
		
		if(mode!=null&&mode.equals("allSearch")){
			params.put("role_name","%"+condition+"%");
		}
		List<Role> roleList = usersMapper.getRoleList(params);
		return roleList;
	}
	
	/**
	 * 删除角色模块关联权限
	 * Request main/Users.do?method=deleteRoleModule <br/><br/>
	 * Response {} <br/><br/>
	 * @param roleModule {@link RoleModule}
	 */
	@Transactional
	public void deleteRoleModule(RoleModule[] roleModule) {
		for (RoleModule rm : roleModule) {
			usersMapper.deleteRoleModule(rm);
		}
	}
	
	/**
	 * 获取角色服务权限
	 * Request main/Users.do?method=getRoleServiceList <br/><br/>
	 * Response {data:[{@link RoleService}]} <br/><br/>
	 * @param paramMap role_id,s_id
	 * @return RoleService
	 */
	public List<RoleService> getRoleServiceList(Map<String, Object> paramMap) {
		return usersMapper.getRoleServiceList(paramMap);
	}
	
	/**
	 * 取得角色功能列表信息
	 * Request main/Users.do?method=getRoleFuncList <br/><br/>
	 * Response {data:[{@link RoleFunc}]} <br/><br/>
	 * @param paramMap r_id,f_id
	 * @return RoleFunc
	 */
	public List<RoleFunc> getRoleFuncList(Map<String, Object> paramMap) {
		return usersMapper.getRoleFuncList(paramMap);
	}
	
		/**
		 * 角色功能关联权限增加
		 * Request main/Users.do?method=addRoleFunc <br/><br/>
		 * Response {data:[{@link RoleFunc}]} <br/><br/>
		 * @param RoleFunc {@link RoleFunc}
		 */
		@Transactional
		public void addRoleFunc(RoleFunc[] roleFunc) {
			for (RoleFunc rf : roleFunc) {
				usersMapper.addRoleFunc(rf);
			}
		}
		/**
		 * 删除角色功能关联权限
		 * Request main/Users.do?method=deleteRoleFunc <br/><br/>
		 * Response {} <br/><br/>
		 * @param roleFunc {@link RoleFunc}
		 */
		@Transactional
		public void deleteRoleFunc(RoleFunc[] roleFunc) {
			for (RoleFunc rf : roleFunc) {
				usersMapper.deleteRoleFunc(rf);
			}
		}
		/**
		 * 根据r_id 删除角色功能权限
		 * Request main/Users.do?method=deleteRoleFuncByRId <br/><br/>
		 * Response {data:[]} <br/><br/>
		 * @param rId
		 */
		public void deleteRoleFuncByRId(int rId) {
			usersMapper.deleteRoleModuleByRId(rId);
		}
	
	/**
	 * 获得角色模块的列表信息
	 * Request main/Users.do?method=getRoleModuleList <br/><br/>
	 * Response {data:[{@link RoleModule}]} <br/><br/>
	 * @param paramMap
	 * @return RoleModule
	 */
	public List<RoleModule> getRoleModuleList(Map<String, Object> paramMap) {
		return usersMapper.getRoleModuleList(paramMap);
	}
	
	/**
	 * Request main/Users.do?method=getUserByDefault <br/><br/>
	 * Response {data:[{@link UserInfo}]} <br/><br/>
	 * @param paramMap [[ou_code --组织代码] [d_code --部门代码]]
	 * @return
	 */
	public List<UserInfo> getUserByDefault(Map<String,Object> paramMap){
		String incSubOrg = paramMap.get("inc_suborg")!=null?paramMap.get("inc_suborg").toString():"false";
		String ouCode = paramMap.get("ou_code") != null? paramMap.get("ou_code").toString().trim():"";
		String dCode = paramMap.get("d_code") != null? paramMap.get("d_code").toString().trim():"";
		if(ouCode.length()>0){
			StringBuilder sbOuCodes = new StringBuilder();
			if(incSubOrg.equals(Const.YESNO_TYPE_YES)){
				//如果需要包含下级，那么需要先计算出所有下级组织
				List<OrgTreeNode> otnList = orgsService.getAllOrTypeTreeSubOuByParent(Const.DEFAULT_ORTYPE,ouCode);
				sbOuCodes.append(String.format("'%s'", ouCode));
				for (OrgTreeNode orgTreeNode : otnList) {
					String tmpOuCode = orgTreeNode.getOu_code()!=null?orgTreeNode.getOu_code().trim():"";
					sbOuCodes.append(String.format(",'%s'", tmpOuCode));
				}
				paramMap.remove("inc_suborg");
				paramMap.remove("ou_code");
				paramMap.put("ou_codes", sbOuCodes.toString());
			}
			if(dCode.length()>0){
				//根据组织、部门筛选用户
				StringBuilder sbDCodes = new StringBuilder();
				if(incSubOrg.equals(Const.YESNO_TYPE_YES)){
					//如果需要包含下级，那么需要先计算出所有下级部门
					Map<String,Object> dParamMap = new HashMap<String,Object>();
					List<DeptTreeNode> dtnList = orgsService.getSubDept(dParamMap);
					sbDCodes.append(String.format("'%s'", dCode));
					for (DeptTreeNode dTreeNode : dtnList) {
						String tmpDCode = dTreeNode.getD_code()!=null?dTreeNode.getD_code().trim():"";
						sbDCodes.append(String.format(",'%s'", tmpDCode));
					}
					paramMap.remove("d_code");
					paramMap.put("d_codes", sbDCodes.toString());
				}
				return usersMapper.getUserByDefaultDept(paramMap);
			}else{
				//根据组织筛选用户
				return usersMapper.getUserByDefaultOu(paramMap);
				
			}
		}else{
			//哪些没有组织归属的用户
//			return usersMapper.getUserWithNoOu(paramMap);
			return usersMapper.getUserList(paramMap);
		}
	}
	public void addUserFunc(UserFunc[] userFunc){
		for(UserFunc item:userFunc){
			usersMapper.addUserFunc(item);
		}
	}
	public void deleteUserFunc(UserFunc[] userFunc){
		for(UserFunc item:userFunc){
			item.setU_id(0);
			item.setOu_id(0);
			usersMapper.deleteUserFunc(item);
		}
	}
	 /**
     * 根据用户登录id获得用户信息域权限 <br/><br/>
     * Request main/Users.do?method=getDataPermitByLoginId <br/><br/>
     * Response {data:[{@link   UserDataPermit}}]} <br/>
     * @param login_id String 用户登录id
     * @return {@link List<UserDataPermit>} 该用户的角色清单
     */
    public List<UserDataPermit> getDataPermitByLoginId(Map<String, Object> paramMap) {
        return usersMapper.getDataPermitByLoginId(paramMap);
    } 
    
    /**
    * 根据用户登录id获取其他系统的映射关系 <br/><br/>
    * Request main/Users.do?method=getUserMappingList <br/><br/>
    * Response {data:[{@link   UserMapping}}]} <br/>
    * @param u_id int 用户唯一ID
    * @return {@link List<UserMapping>} 该用户已关联系统清单
    */
    public List<UserMapping> getUserMappingList(Map<String,Object> params) {
        return usersMapper.getUserMappingList(params);
    }
    /**
    * 新增系统用户映射关系 <br/><br/>
    * Request main/Users.do?method=addUserMapping <br/><br/>
    * Response {data:[{@link   UserMapping}}]} <br/>
    * @param UserMapping 映射用户类
    */
    public void addUserMapping(UserMapping[] arr) {
        for(UserMapping obj: arr) {
            usersMapper.addUserMapping(obj);
        }
    }
    /**
    * 更新系统用户映射关系 <br/><br/>
    * Request main/Users.do?method=updateUserMapping <br/><br/>
    * @param UserMapping 映射用户类
    */
    public void updateUserMapping(UserMapping[] arr) {
        for(UserMapping obj: arr) {
            usersMapper.updateUserMapping(obj);
        }
    }
    /**
    * 删除用户映射关系 <br/><br/>
    * Request main/Users.do?method=deleteUserMapping <br/><br/>
    * @param UserMapping 映射用户类
    */
    public void deleteUserMapping(UserMapping[] arr) {
        for(UserMapping obj: arr) {
            usersMapper.deleteUserMapping(obj);
        }
    }
	
    /**
     * 新增系统排他表记录<br/><br/>
     * Request common/exclusive.action?method=addExclusive <br/><br/>
     * Response  <br/>
     * @param paramMap
     */
    public String addExclusive(Map<String, Object> paramMap) {
    	JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			usersMapper.addExclusive(paramMap);
			}catch (Exception e) {
				json.put("bool", false);
				e.printStackTrace();
				json.put("msg", "新增系统排他表记录时出现异常，请重试！");
		}
		return json.toString();
    }
    /**
     * 根据条件删除排他表信息<br/><br/>
     * Request common/exclusive.action?method=deleteExclusiveFromId <br/><br/>
     * Response  <br/>
     * @param paramMap
     */
    public String deleteExclusiveFromId(Map<String, Object> paramMap) {
    	JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			usersMapper.deleteExclusiveFromId(paramMap);
			}catch (Exception e) {
				json.put("bool", false);
				e.printStackTrace();
				json.put("msg", "删除排他表记录时出现异常，请重试！");
		}
		return json.toString();
    }
    /**
     *获取排他表信息<br/><br/>
     * Request common/exclusive.action?method=getExclusiveList <br/><br/>
     * Response  <br/>
     * @param paramMap
     */
    public List<Exclusive> getExclusiveList(Map<String, Object> paramMap) {
		return usersMapper.getExclusiveList(paramMap);
    }
}
