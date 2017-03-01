package erp.common.login.data;



import java.util.List;
import java.util.Map;

import erp.web.model.Menu;
import erp.web.model.Role;
import erp.web.model.UserInfo;

public interface LoginMapper {
	int getUserCount(Map<String,Object> paramsMap);
	List<UserInfo> getUserList(Map<String,Object> paramsMap);
	List<Role> getRoleListByLoginId(Map<String,Object> paramMap);
	void updateUser(UserInfo userInfo);
	List<Menu> getMenuList(Map<String,Object> paramsMap);
	
}
