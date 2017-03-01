package erp.util;



import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import erp.util.Const;
import erp.web.model.Role;
import erp.web.model.UserInfo;

public class SessionUtil {
	private static ThreadLocal<Map<String,Object>> threadLoal = new ThreadLocal<Map<String,Object>>();
	
	public static boolean isAdmin(){
		return hasRole(Const.SUPER_ROLE);
	}
	public static boolean hasRole(String roleName){
		List<Role> roleLst = getCurrentUserRoles();
		if(roleLst==null||roleLst.size()==0){
			return false;
		}else{
			for (Role role : roleLst) {
				if(role.getRole_name().equals(roleName)){
					return true;
				}
			}
			return false;
		}
	}
	
	@SuppressWarnings("unchecked")
	public static List<Role> getCurrentUserRoles(){
		try{
			HttpSession httpSession = getSession();
			if(httpSession != null){
				return (List<Role>)httpSession.getAttribute("role");
			}else{
				return (List<Role>)threadLoal.get().get("role");
			}
		}catch(Exception e){
			return null;
		}
	}
	/**
	 * 获得当前session(如果有的话)
	 * @return
	 */
	private static HttpSession getSession(){
		HttpServletRequest request = getHttpRequest();
		if(request!=null){
			//在Web环境下才有
			return request.getSession();
		}else{
			//非Web环境下只能模拟实现
			Map<String,Object> attrMap =threadLoal.get();
			if(attrMap==null){
				attrMap = new HashMap<String,Object>();
				threadLoal.set(attrMap);
			}
			return null;
		}
	}
	
	/**
	 * 获得当前http请求
	 * @return
	 */
	private static HttpServletRequest getHttpRequest(){
		//RequestContextHolder 要依赖于 org.springframework.web.context.request.RequestContextListener
		Object reqObj = RequestContextHolder.getRequestAttributes();
		return reqObj==null?null:((ServletRequestAttributes)reqObj).getRequest();
	}
	/**
	 * 获取当前用户信息
	 */
	public static UserInfo getCurrentUser(){
		try{
			HttpSession httpSession = getSession();
			if(httpSession != null){
				return (UserInfo)httpSession.getAttribute("user");
			}else{
				return (UserInfo)threadLoal.get().get("user");
			}
		}catch(Exception e){
			return null;
		}
	}
	
	public static Object getAttribute(String attrName){
		//从当前HttpSession中取值
		HttpSession httpSession=getSession();
		if(httpSession!=null)
			return httpSession.getAttribute(attrName);
		return threadLoal.get().get(attrName);
	}
	public static void setAttribute(String attrName,Object attr){
		//从当前HttpSession中设值
		HttpSession httpSession=getSession();
		if(httpSession!=null)
			httpSession.setAttribute(attrName, attr);
		else
			threadLoal.get().put(attrName, attr);
	}
	
	/**
	 * 取得当前请求包含所有cookie的字符串
	 * @return
	 */
	public static String getCookieAll(){
		StringBuilder sb = new StringBuilder();
		HttpServletRequest request = getHttpRequest();
		if(request!=null){
			Cookie[] cookies=request.getCookies();
			for (Cookie cookie : cookies) {
				sb.append(cookie.getName()).append("=").append(cookie.getValue());
			}
		}
		return sb.toString();
	}
	/**
	 * 
	 * @Description: TODO 获取当前的SessionID
	 * @param @return   
	 * @return String  
	 * @throws
	 * @author 华慧
	 * @date 2015-6-19
	 */
	public static String getSessionId(){
		HttpSession session=getSession();
		return session.getId();
	}
	
	public static void removeAllAttributes(){
		//从当前HttpSession中移除值
		HttpSession httpSession=getSession();
		if(httpSession!=null){
			Enumeration<String> attNames=httpSession.getAttributeNames();
			while(attNames.hasMoreElements()){
				String pName =attNames.nextElement();
				httpSession.removeAttribute(pName);
			}
		}else{
			Iterator<String> it=threadLoal.get().keySet().iterator();
			while(it.hasNext()){
				String attrName = it.next();
				threadLoal.get().remove(attrName);
			}
		}
	}
}
