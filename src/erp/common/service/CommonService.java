package erp.common.service;




import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.RequestContext;

import erp.common.login.data.LoginMapper;
import erp.common.model.UserDataPermit;
import erp.erp.purchaseOrder.model.PurchaseFile;
import erp.util.Const;
import erp.util.MyJsonUtil;
import erp.util.SessionUtil;
import erp.util.web.SessionListener;
import erp.web.data.UsersMapper;
import erp.web.model.Exclusive;
import erp.web.model.LoginUser;
import erp.web.model.Role;
import erp.web.model.UserInfo;



@Service
public class CommonService {
	
	@Autowired
	private UsersMapper userMapper;
	

	
	private static Logger logger = Logger.getLogger("service");
	
	


	public UsersMapper getUserMapper() {
		return userMapper;
	}

	public void setUserMapper(UsersMapper userMapper) {
		this.userMapper = userMapper;
	}

	/**
	 * 根据配置文件测试当前数据库连接状况
	 * @param sb
	 * @return
	 */
	public boolean testDbConn(StringBuilder sbErrMsg){
		boolean ret =false;
		sbErrMsg = sbErrMsg!=null?sbErrMsg:new StringBuilder();
		Properties p;
		try {
			p = PropertiesLoaderUtils.loadProperties(new ClassPathResource("sysconfig/jdbc.properties"));
			
		} catch (IOException e1) {
			sbErrMsg.append("未能找到数据库连接配置文件[sysconfig/jdbc.properties]!");
			return ret;
		}
		DriverManagerDataSource ds = new DriverManagerDataSource();
		ds.setDriverClassName(p.getProperty("jdbc.driverClassName"));
		ds.setUrl(p.getProperty("jdbc.databaseurl"));
		ds.setUsername(p.getProperty("jdbc.username"));
		ds.setPassword(p.getProperty("jdbc.password"));
		Connection conn=null;
		try {
			conn = DataSourceUtils.doGetConnection(ds);
			sbErrMsg.append("连接成功!");
			ret = true;
		} catch (SQLException e) {
			sbErrMsg.append("连接数据出错,错误信息:").append(e.getMessage());
		} finally{
			if(conn!=null)
				DataSourceUtils.releaseConnection(conn, ds);
		}
		return ret;
	}
	
	/**
	 * 登录校验
	 * Request main/Users.action?method=chkUserPwd<br/><br/>
	 * Response {data:true|false} <br/><br/>
	 * @param paramsMap
	 *            支持如下参数：login_id && pwd
	 * @return true-用户ID(login_id)/密码(pwd)正确    false-不正确
	 */
	public boolean chkUserPwd(Map<String, Object> paramsMap) {
		paramsMap.put("is_valid", "true");
		return userMapper.getUserCount(paramsMap)>0;
	}
	
	/**
	 * 校验是否有效用户
	 * Request main/Users.action?method=isValidUser<br/><br/>
	 * Response {data:true|false} <br/><br/>
	 * @param paramsMap
	 *            支持如下参数：login_id && pwd
	 * @return true-用户ID(login_id)/密码(pwd)有效    false-无效
	 */
	public boolean isValidUser(Map<String, Object> paramsMap) {
		paramsMap.put("is_valid", "true");
		return userMapper.getUserCount(paramsMap)>0;
	}
	
	
	/**
	 * 更新用户
	 * Request main/Users.action?method=updateUser <br/><br/>
	 * Response {data:[{UserInfo}]} <br/><br/>
	 * @param userInfo {@link UserInfo}
	 */
	public void updateUser(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
		userInfo.setModify_dt(new Date());
		userMapper.updateUser(userInfo);
		return;
		}
	}
	
	
	/**
	 * 获取用户列表
	 * Request main/Users.action?method=getUserList <br/><br/>
	 * Response {data:[{@link UserInfo}}]} <br/><br/>
	 * @param paramsMap
	 *            支持如下参数： login_id,u_type,login_type,name%
	 * @return UserInfo 列表
	 */
	public List<UserInfo> getUserList(Map<String, Object> paramsMap) {
		    return userMapper.getUserList(paramsMap);
	}
	
	/**
	 * 根据用户登录id获得用户的角色列表信息 <br/><br/>
	 * Request main/Users.action?method=getRoleListByLoginId <br/><br/>
	 * Response {data:[{@link Role}}]} <br/>
	 * @param login_id String 用户登录id
	 * @return {@link List<Role>} 该用户的角色清单
	 */
	public List<Role> getRoleListByLoginId(Map<String, Object> paramMap) {
		return userMapper.getRoleListByLoginId(paramMap);
	}
	
	   /**
     * 根据用户登录id获得用户信息域权限 <br/><br/>
     * Request main/Users.action?method=getDataPermitByLoginId <br/><br/>
     * Response {data:[{@link   UserDataPermit}}]} <br/>
     * @param login_id String 用户登录id
     * @return {@link List<UserDataPermit>} 该用户的角色清单
     */
    public List<UserDataPermit> getDataPermitByLoginId(Map<String, Object> paramMap) {
        return userMapper.getDataPermitByLoginId(paramMap);
    }
}
