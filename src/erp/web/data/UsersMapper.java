package erp.web.data;

import java.util.List;
import java.util.Map;

import erp.common.model.UserDataPermit;
import erp.web.model.Exclusive;
import erp.web.model.Function;
import erp.web.model.Menu;
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


public interface UsersMapper {
	List<Integer> getChangableOuByUser(int u_id);
	List<UserInfo> getUserWithNoOu(Map<String,Object> paramsMap);
	List<UserInfo> getUserByDefaultOu(Map<String,Object> paramsMap);
	List<UserInfo> getUserByDefaultDept(Map<String,Object> paramsMap);
	
	List<UserInfo> getUserListByRoles(Map<String,Object> paramsMap);
	void addUser(UserInfo userInfo);
	void deleteUser(UserInfo userInfo);
	void deleteUserByLoginId(Map<String,Object> params);
	void addUserByEmp(Map<String,Object> params);
	void updateUserNickPortrait(Map<String,Object> params);
	
	//用户模块权限
	List<UserModule> getUserModuleList(Map<String,Object> paramMap);
	void addUserModule(UserModule usermodule);
	void deleteUserModule(UserModule usermodule);
	void deleteUserModuleByUid(int u_id);
	void deleteUserModuleByModid(int mod_id);
	
	//角色归属关系
	List<RoleConfig> getRoleCfgList(Map<String,Object> paramMap);
	void addRoleCfg(RoleConfig role);
	void updateRoleCfg(RoleConfig role);
	void deleteRoleCfg(RoleConfig role);
	List<RoleConfig> getRoleCfgByUid(Map<String,Object> paramMap);
	
	//用户角色关联
	List<Role> getRoleListByLoginId(Map<String,Object> paramMap);
	List<UserRole> getUserRoleList(Map<String,Object> paramMap);
	void addUserRoleList(UserRole userRole);
	void deleteUserRole(UserRole userRole);
	void deleteUserRoleByUid(int uid);
	void deleteUserMenuByUid(int u_id);
	void deleteUserRoleByRoleId(int role_id);
	void deleteUserRoleByCondition(UserRole userRole);
	
	//用户功能权限
	List<UserFunc> getUserFuncList(Map<String,Object> paramMap);
	void addUserFunc(UserFunc uc);
	void deleteUserFunc(UserFunc userFunc);
	void deleteUserFuncByfid(int f_id);
	void  deleteUserFuncByUid(int u_id);
	//删除用户映射表
	void  deleteUserMapByUid(int u_id);
	//用户信息域权限
	 List<UserDataPermit> getDataPermitByLoginId(Map<String, Object> paramMap);
	//用户映射关系表
	  public List<UserMapping> getUserMappingList(Map<String,Object> params);
	    public void addUserMapping(UserMapping obj);
	    public void updateUserMapping(UserMapping obj);
	    public void deleteUserMapping(UserMapping obj);
	 
	//角色模块关联
	void addRoleModule(RoleModule roleModule);
	void deleteRoleModule(RoleModule roleModule);
	void deleteRoleModuleByRId(int rId);
	void deleteRoleModuleByMId(int mId);
	List<RoleModule> getRoleModuleList(Map<String,Object> paramMap);
	List<Integer> getRolesByModuleUser(Map<String,Object> paramMap);
	
	//角色功能关联
	void addRoleFunc(RoleFunc roleFunc);
	void deleteRoleFunc(RoleFunc roleFunc);
	void deleteRoleFuncByRId(int rId);
	void deleteRoleFuncByFId(int mId);
	List<RoleFunc> getRoleFuncList(Map<String,Object> paramMap);
	List<Function> getFuncListByUserModule(Map<String,Object> paramMap);
	void updateUserPwd(UserInfo userInfo);
	
	int getUserCount(Map<String,Object> paramsMap);
	List<UserInfo> getUserList(Map<String,Object> paramsMap);
	void updateUser(UserInfo userInfo);
	List<Menu> getMenuList(Map<String,Object> paramsMap);
	
	void deleteUserMenuByMid(int mod_id);
	
	
	//角色相关部分
	List<Role> getCanChooseRoleList(Map<String,Object> params);
	List<Role> getRoleList(Map<String,Object> params);
	List<Role> getRoleListByUsercando(Map<String,Object> params);
	void addRole(Role role);
	void updateRole(Role role);
	void deleteRole(Role role);
	int getRoleCount(Map<String,Object> params);
	
	//角色服务关联
	void addRoleService(RoleService roleService);
	void deleteRoleService(RoleService roleService);
	void deleteRoleServiceByRId(int rId);
	void deleteRoleServiceBySId(int mId);
	List<RoleService> getRoleServiceList(Map<String,Object> paramMap);
	//系统排他表新增
	void addExclusive(Map<String,Object> paramMap);
	//定时清空排他表
	void deleteExclusive(Map<String,Object> paramMap);
	//获取排他表信息
	public List<Exclusive> getExclusiveList(Map<String,Object> params);
	//根据条件删除排他表
	void deleteExclusiveFromId(Map<String,Object> params);
}
