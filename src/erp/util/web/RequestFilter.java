package erp.util.web;




import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import erp.util.Const;
import erp.util.SessionUtil;
import erp.util.WebUtil;
import erp.web.model.TpsLog;
import erp.web.model.UserInfo;

public class RequestFilter implements Filter {
	private static Logger logger = Logger.getLogger("service");
	protected FilterConfig filterConfig;
	protected boolean filterEnabled;
	protected int logLevel;
	protected boolean needVCode;
	protected List<String> noFilerList =null;
	public RequestFilter() {
		this.filterConfig = null;
		this.filterEnabled = true;
		this.logLevel = -1;
	}
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		if(this.filterEnabled){
			HttpServletRequest httpReq = (HttpServletRequest)req;
			HttpServletResponse httpResp = (HttpServletResponse)resp;
			String ctxPath = httpReq.getContextPath();    		//与服务器根的相对路径,比如 : /GinPlus
			String requestUri = httpReq.getRequestURI();		//请求的全路径,比如:		 	/GinPlus/app/main/view/user/LoginDialog.js
			String uri = requestUri.substring(ctxPath.length());//全路径除去ctxPath,比如：	/app/main/view/user/LoginDialog.js
			String tarUri = uri.trim();
			UserInfo uInfo = SessionUtil.getAttribute("user")!=null?(UserInfo)SessionUtil.getAttribute("user"):null;
			if(!this.isInNoFilerList(tarUri)){
				if(tarUri.endsWith("/")||tarUri.endsWith(".html")||tarUri.endsWith(".htm")||tarUri.endsWith(".jsp")){
					//页面请求
					if(!tarUri.endsWith(Const.LOGIN_PAGE)&&(uInfo==null)){
						//只要不是登录页面都要处理
						httpResp.sendRedirect(ctxPath+"/"+Const.LOGIN_PAGE);
						return;
					}
				}else if(tarUri.endsWith(".srm")||tarUri.endsWith(".do")||tarUri.endsWith(".act")||tarUri.endsWith(".drp")||tarUri.endsWith(".erp")){
					//服务调用请求
					if(!(tarUri.endsWith(Const.LOGIN_SERVICE)||tarUri.endsWith(Const.LOGOUT_SERVICE)||tarUri.endsWith(Const.TIMEOUT_SERVICE)||tarUri.endsWith(Const.GET_GLOBAL_VARS)||tarUri.endsWith(Const.GET_DEFAULT_STYLECSS))
								&&uInfo==null){
						//只要不是登陆\验证码\超时服务都要处理
						httpResp.sendRedirect(ctxPath+"/"+Const.TIMEOUT_SERVICE);
						return;
					}
			   }
				//日志处理
				dowithLog(httpReq,tarUri,uInfo);
			}else if(tarUri.endsWith(".srm")||tarUri.endsWith(".do")||tarUri.endsWith(".act")||tarUri.endsWith(".drp")||tarUri.endsWith(".erp")){
				//日志处理
					dowithLog(httpReq,tarUri,uInfo);
			}
			
		}
		chain.doFilter(req, resp);
		
		
	}
	
	/**
	 * 处理系统日志
	 * @param httpReq
	 * @param tarUri
	 * @param uInfo
	 */
    private void dowithLog(HttpServletRequest httpReq,String tarUri,UserInfo uInfo){
    	String sMethod = httpReq.getParameter(Const.AJAX_SERVICE_METHOD); 
    	switch (this.logLevel) {
		case 0:
			//只记录登录/登出操作
			if(tarUri.endsWith(Const.LOGIN_SERVICE)||tarUri.endsWith(Const.LOGOUT_SERVICE))
				addLog(httpReq,tarUri,uInfo);
			break;
		case 1:
			//只记录登录/登出及所有数据更新操作
			if(tarUri.endsWith(Const.LOGIN_SERVICE)||tarUri.endsWith(Const.LOGOUT_SERVICE)){
				addLog(httpReq,tarUri,uInfo);
			}else if(sMethod!=null){
				String sm = sMethod.toLowerCase();
				if(sm.startsWith("add")||sm.startsWith("update")||sm.startsWith("delete")||sm.startsWith("set"))
					{
					addLog(httpReq,tarUri,uInfo);
					
					}
			}
			break;
		case 2:
			//记录所有操作
			addLog(httpReq,tarUri,uInfo);
			break;
		default:
			//什么都不记录
			break;
		}
    }
	
	private boolean isInNoFilerList(String uri){
		for (String str : this.noFilerList) {
			if(str.equals(uri))
				return true;
		}
		return false;
	}
	@Override
	public void init(FilterConfig cfg) throws ServletException {
		this.filterConfig = cfg;
		this.filterEnabled = true;
		this.logLevel = -1;
		this.needVCode = true;
		this.noFilerList = new ArrayList<String>();
		
		//取filterEnabled
		String paramValue = filterConfig.getInitParameter("filterEnabled");
		if(!WebUtil.isEmpty(paramValue)&&paramValue.equalsIgnoreCase("false"))
			this.filterEnabled = false;
		//取logLevel
		paramValue = filterConfig.getInitParameter("logLevel");
		if(!WebUtil.isEmpty(paramValue)){
			this.logLevel = Integer.parseInt(paramValue);
		}
		//取noFilerList
		paramValue = filterConfig.getInitParameter("noFilerList");
		if(!WebUtil.isEmpty(paramValue)){
			String[] sTmps = paramValue.split(";");
			for(String str : sTmps) {
				this.noFilerList.add(str);
			}
		}
		//取needVCode
		paramValue = filterConfig.getInitParameter("needVCode");
		if(!WebUtil.isEmpty(paramValue)&&paramValue.equalsIgnoreCase("false"))
			this.needVCode = false;
		WebUtil.setNeedVCode(this.needVCode);
		
	}
	
	private void addLog(HttpServletRequest httpReq,String tarUri,UserInfo uInfo){
		TpsLog log = new TpsLog();
		log.setLogdtm(new Date());
		log.setClientip(getClientIP(httpReq));
		String sLoginID = uInfo!=null?uInfo.getLogin_id():"";
		if(tarUri.endsWith(Const.LOGIN_SERVICE)){
			sLoginID = httpReq.getParameter("login_id");
		}
		log.setLogin_id(sLoginID);
		log.setS_path(tarUri);
		String sMethod = httpReq.getParameter(Const.AJAX_SERVICE_METHOD); 
		log.setS_method(sMethod);
		String sData = httpReq.getParameter(Const.AJAX_DATA_ROOT);
		log.setS_data(sData);
		WebUtil.getLogger().log(log);
	}
	
	/**
	 * 提取客户端的IP地址
	 * @param httpReq
	 * @return
	 */
	private String getClientIP(HttpServletRequest httpReq){
		String ip = httpReq.getHeader("x-forwarded-for");
		ip = ip == null?"":ip.trim();
        if(ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = httpReq.getHeader("Proxy-Client-IP");
        }else{
        	String[] ips = ip.split(",");
        	if(ips.length>0)
        		ip = ips[0];
        }
        ip = ip == null?"":ip.trim();
        if(ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = httpReq.getHeader("WL-Proxy-Client-IP");
        }
        ip = ip == null?"":ip.trim();
        if(ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = httpReq.getRemoteAddr();
        }
        ip = ip == null?"":ip.trim();
        if(ip.indexOf("0:0:0:0:0:0:0:1")>=0||ip.indexOf("::1")>=0)
        	ip = "127.0.0.1";
        return ip;

	}
	
	
}
