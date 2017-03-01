package erp.util;



import java.io.File;
import java.lang.reflect.Array;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.context.ApplicationContext;

import erp.common.FilterModel;
import erp.util.Const;
import erp.util.TpsLogger;
import erp.util.web.IServiceLog;
import sun.net.ftp.FtpClient;

public class WebUtil {
	private static final String BuildNo = "erp-20151215";
	private static final String QRY_PARAMS = "QRY_PARAMS";
	private static final String IS_URDMETHOD = "IS_URDMETHOD";
	protected static Logger logger1 = Logger.getLogger("service");
	private static TpsLogger logger =null;
	private static ObjectMapper objectMapper = null;
	private static boolean needVCode;
	private static ApplicationContext appCtx;
	private static ApplicationContext appCtxCommon;
	private static Map<String, ApplicationContext> appCtxMap = new HashMap<String, ApplicationContext>();
	private static Properties jdbcProperties;
	private static boolean debug;
	public static  <T> Map<String,Object> DynamicCallCURD(HttpServletRequest request,HttpServletResponse response,T bizService) throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		Map<String,Object> paramMap = new HashMap<String,Object>();
		
		//需要指定服务方法名
		String callMethod = request.getParameter(Const.AJAX_SERVICE_METHOD);
		if(WebUtil.isEmpty(callMethod)){
			WebUtil.makeErrorMsg(new Exception("服务方法[method]未指定或不正确!"), respMap);
			return respMap;
		}else
			paramMap.put(Const.AJAX_SERVICE_METHOD,callMethod);
		
		//U.C.D服务方法必须指定data参数
		String callData = request.getParameter(Const.AJAX_DATA_ROOT);
		boolean isCUDMethod = callData==null?false:true;
		paramMap.put(IS_URDMETHOD,isCUDMethod);
		if(isCUDMethod){
			if(WebUtil.isEmpty(callData)){
				WebUtil.makeErrorMsg(new Exception("U.C.D服务方法所需参数[data]未指定或不正确!"), respMap);
				return respMap;
			}else
				paramMap.put(Const.AJAX_DATA_ROOT,callData);
		}
				
		//制造查询参数Map
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		//非CUD添加排序方法
		MyStringUtils.addOrderBySQL2(qryParam);
		// 添加全局筛选参数
		String filterStr = qryParam.get("filter") == null ? "" : qryParam.get("filter").toString();
		String filterSearch = "";
		List<FilterModel> filterList = new ArrayList<FilterModel>();
		if (!filterStr.equals("")) {
			filterList = MyJsonUtil.str2list(filterStr, FilterModel.class);
		}
		if (filterList != null) {
			filterSearch = MyJsonUtil.FilterListToString(filterList);
		}
		if (!filterSearch.equals("")) {
			qryParam.put("filterSearch", filterSearch);
		}
		paramMap.put(QRY_PARAMS, qryParam);
		IServiceLog serviceLog = null;
		Object logResult = null;
		try{
			//获取业务日志接口如果存在的话
			if(WebUtil.getAppCtx().getBean("serviceLog")!=null){
				serviceLog = (IServiceLog)WebUtil.getAppCtx().getBean("serviceLog");
			}
			if(serviceLog != null){
				logResult = serviceLog.beforeServiceStart(request,qryParam);
				qryParam.put(Const.SERVICE_LOG, logResult);
			}
		}catch(Exception e){
			//不处理
			//e.printStackTrace();
		}
		
		boolean callRsult = WebUtil.DynamicCall(bizService,paramMap, respMap);
		
		try{
			if(serviceLog != null){
				if(callRsult == false)
					//处理服务失败情况下的业务日志
					serviceLog.afterServiceFailure(request, logResult,respMap);
				else
					//处理服务成功情况下的业务日志
					serviceLog.afterServiceSuccess(request, logResult,respMap);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		/*JsonGenerator jg = WebUtil.getObjectMapper().getJsonFactory().createJsonGenerator(response.getOutputStream(),JsonEncoding.UTF8);
		jg.writeObject(respMap);
		jg.flush();*/
		return respMap;
	}
	
	
	@SuppressWarnings("unchecked")
	private static  <T>  boolean DynamicCall(Object bizService,Map<String,Object> paramMap,Map<String,Object> respMap)throws Exception{
		String callMethod =paramMap.get(Const.AJAX_SERVICE_METHOD)!=null?paramMap.get(Const.AJAX_SERVICE_METHOD).toString():"";
		boolean isCUDMethod = paramMap.get(IS_URDMETHOD)!=null?(Boolean)paramMap.get(IS_URDMETHOD):false;
		//找到目标方法，
		//这里约定: 	1.所需的服务的方法都只有一个Map类型的参数
		//         	2.C.U.D方法建议分别以add/update/delete开头
		Class<T[]> modelArrayType = null;
		Method tarMethod = null;
		boolean isArrayParam = false;
		//根据方法名和参数类型查找服务方法
		Method[] mArray=bizService.getClass().getMethods();
		for(Method method:mArray){
			if(method.getName().equals(callMethod)){
				Class<?>[] pClassArray= method.getParameterTypes();
				if(pClassArray.length ==1){
					//只能一个参数
					if(isCUDMethod){
						//C.U.D方法
						if(pClassArray[0].isArray()){
							modelArrayType = (Class<T[]>)pClassArray[0];
							isArrayParam = true;
						}
						else{
							modelArrayType = (Class<T[]>)Array.newInstance(pClassArray[0],0).getClass();
						}
						tarMethod = method;	
					}else if(pClassArray[0].equals(Map.class))
						//查询方法必须是Map为参数
						tarMethod = method;
					break;
				}
			}
		}
		if(WebUtil.isEmpty(tarMethod)){
			WebUtil.makeErrorMsg(new Exception("指定的服务方法[method="+callMethod+"]不存在或参数不匹配."), respMap);
			return false;
		}
		if(!isCUDMethod){
			//非C.U.D 类的方法
			try{
				Map<String,Object> qryParams = paramMap.get(QRY_PARAMS)!=null?(Map<String,Object>)paramMap.get(QRY_PARAMS):null;
				Object result = null;
				result =tarMethod.invoke(bizService,new Object[]{qryParams});
				if(result instanceof Integer||result instanceof Long)
					respMap.put(Const.AJAX_SERVICE_TOTAL, result);
				else if(qryParams.get(Const.AJAX_SERVICE_TOTAL)!=null){
					respMap.put(Const.AJAX_SERVICE_TOTAL, qryParams.get(Const.AJAX_SERVICE_TOTAL));
				} 
				boolean isExcelDownload=qryParams.get(Const.USE_EXCEL)!=null;
				//如果是下载文件的情况
				if(isExcelDownload){
					String fieldTitle=(String)qryParams.get(Const.FIELDTITLE);
					JSONObject jsonObj= JSONObject.fromObject(fieldTitle);
					String fileName=ExcelUtils.exportExcel(jsonObj, (List<?>) result);
					respMap.put(Const.AJAX_SERVICE_FILENAME, fileName);
				}else
					respMap.put(Const.AJAX_DATA_ROOT, result);	
			}catch(InvocationTargetException e){
				respMap.put(Const.AJAX_SERVICE_MESSAGE,makeErrorMsgForCtrl(e.getTargetException(),respMap));
				//throw new Exception(e.getMessage());
				//logger1.error(e.getMessage());
				return false;
			}
		}else{
			//C.U.D 类的方法
			try{
				String postData = paramMap.get(Const.AJAX_DATA_ROOT)!=null?paramMap.get(Const.AJAX_DATA_ROOT).toString():null;
				if(WebUtil.isEmpty(postData)){
					throw new Exception("提交的数据不符合标准!正确的样例如下{data=[{xxxx:yyyy}]}");
				}
				T[] paramArray =WebUtil.getObjectMapper().readValue(postData,modelArrayType);
				
				//插入一个数据库类型参数
				//for (T t : paramArray) {
				//	if(t instanceof gp.common.Model){
				//		((gp.common.Model)t).setDB_TYPE(WebUtil.getDB_TYPE());
				//	}
				//}
				//支持两种模式调用，
				//如果服务方法本身支持数组那么直接调用
				//否则根据数组循环调用服务方法
					if(isArrayParam)
						tarMethod.invoke(bizService,new Object[]{paramArray});
					else{
						for(T item:paramArray){
							tarMethod.invoke(bizService,new Object[]{item});
						}
					}
				respMap.put(Const.AJAX_DATA_ROOT, paramArray);
			}catch(InvocationTargetException e){
				respMap.put(Const.AJAX_SERVICE_MESSAGE,makeErrorMsgForCtrl(e.getTargetException(),respMap));
				return false;
			}
		}				
		
		return true ;
	}
	
	
public static <T> Map<String,Object> DynamicCallService(HttpServletRequest request,HttpServletResponse response,T bizService)throws Exception{
		
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		//需要指定服务方法名
		String callMethod = request.getParameter(Const.AJAX_SERVICE_METHOD);
		if(WebUtil.isEmpty(callMethod)){
			respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "服务方法[method]未指定或不正确!");
			return respMap;
		}
		//根据方法名和参数类型查找服务方法
		Method tarMethod = null;
		for(Method method:bizService.getClass().getMethods()){
			if(method.getName().equals(callMethod) && method.getReturnType().equals(Boolean.TYPE)){
					Class<?>[] pClassArray= method.getParameterTypes();
					if(pClassArray.length ==1 && pClassArray[0].equals(Map.class)){
						tarMethod = method;					
						break;
					}
			}
		}
		if(WebUtil.isEmpty(tarMethod)){
			respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "指定的服务方法[method="+callMethod+"]不存在或参数及返回值不匹配.\r\n正确的定义应该形如 public boolean srvMethod(Map<String,Object> paramsMap)!");
			return respMap;
		}
		try{
			//制造参数Map,一般把客户端提交的参数原封不动地提交给服务方法,由服务方法自行处理
			Map<String,Object> qryParams = WebUtil.getServiceParamsMap(request);
			//业务逻辑日志
			IServiceLog serviceLog = null;
			Object logResult = null;
			try{
				//获取业务日志接口如果存在的话
				serviceLog = (IServiceLog)WebUtil.getAppCtx().getBean("serviceLog");
			}catch(Exception e){
				//不处理
			}
			if(serviceLog != null){
				logResult = serviceLog.beforeServiceStart(request,qryParams);
				qryParams.put(Const.SERVICE_LOG, logResult);
			}
			//呼叫服务
			Object result = null;
			try{
				result =tarMethod.invoke(bizService,new Object[]{qryParams});
			}catch(InvocationTargetException e){
				String errMsg = e.getTargetException().getMessage();
				if(serviceLog != null){
					//处理服务失败情况下的业务日志
					serviceLog.afterServiceFailure(request, logResult,respMap);
				}
				respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
				throw new Exception(errMsg);
			}
			if(result==null){
				respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
				throw new Exception(String.format("调用服务方法[%s]返回空值",callMethod));
			}else{
				if(result instanceof Boolean){
					if(!(Boolean)result){
						//服务方法执行有误					
						respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
					}
					//把服务方法的实际运行结果返回给客户端
					if(qryParams.get(Const.AJAX_SERVICE_TOTAL)!=null)
						respMap.put(Const.AJAX_SERVICE_TOTAL,qryParams.get(Const.AJAX_SERVICE_TOTAL));
					respMap.put(Const.AJAX_DATA_ROOT,qryParams.get(Const.SERVICE_CALL_RESULT));
					respMap.put(Const.AJAX_SERVICE_MESSAGE, qryParams.get(Const.SERVICE_CALL_ERROR_MSG));
					
					if(serviceLog != null){
						int sAjax_err_code = respMap.get(Const.AJAX_ERR_CODE)==null?Const.AJAX_ERR_CODE_300_ERROR:(Integer)respMap.get(Const.AJAX_ERR_CODE);
						if(sAjax_err_code==Const.AJAX_ERR_CODE_300_ERROR)
							//处理服务失败情况下的业务日志
							serviceLog.afterServiceFailure(request, logResult,respMap);
						else
							//处理服务成功情况下的业务日志
							serviceLog.afterServiceSuccess(request, logResult,respMap);
					}
					
				}else{
					respMap.put(Const.AJAX_DATA_ROOT, result);
					//处理服务失败情况下的业务日志
					if(serviceLog != null)
						serviceLog.afterServiceFailure(request, logResult,respMap);
				}
			}
		}catch(InvocationTargetException e){
			respMap.put(Const.AJAX_SERVICE_MESSAGE,makeErrorMsgForCtrl(e.getTargetException(),respMap));
		}	
		return respMap;
	}
	
	//从Request中一次读取参数到Map中
	public static Map<String,Object> getServiceParamsMap(HttpServletRequest request){
		Map<String,Object> paramMap = new HashMap<String,Object>();
		Enumeration<String> pNames = request.getParameterNames();
		while(pNames.hasMoreElements()){
			String pName =pNames.nextElement();
			paramMap.put(pName, request.getParameter(pName));
		}
		//清除掉几个参数
		paramMap.remove(Const.AJAX_SERVICE_METHOD);
		paramMap.remove(Const.AJAX_SERVICE_MODEL);
		paramMap.remove(Const.VALIDATE_VTEXT0);
		paramMap.remove(Const.VALIDATE_VTEXT1);
		paramMap.remove(Const.VALIDATE_FIELDS);
		return paramMap;
	}

	
	//从Request中一次读取参数到Map中
	public static Map<String,Object> getDefaultParamsMap(HttpServletRequest request){
		Map<String,Object> paramMap = new HashMap<String,Object>();
		Enumeration<String> pNames = request.getParameterNames();
		while(pNames.hasMoreElements()){
			String pName =pNames.nextElement();
			paramMap.put(pName, request.getParameter(pName));
		}
		//清除掉几个非查询参数
		paramMap.remove(Const.AJAX_SERVICE_METHOD);
		paramMap.remove(Const.AJAX_SERVICE_MODEL);
		paramMap.remove(Const.VALIDATE_VTEXT0);
		paramMap.remove(Const.VALIDATE_VTEXT1);
		paramMap.remove(Const.VALIDATE_FIELDS);
		paramMap.remove(Const.AJAX_DATA_ROOT);
		return paramMap;
	}
	
	/**
	 * 判断对象是否Empty(null或元素为0)<br>
	 * 实用于对如下对象做判断:String Collection及其子类 Map及其子类
	 * 
	 * @param pObj
	 *            待检查对象
	 * @return boolean 返回的布尔值
	 */
	public static <T> boolean isEmpty(T pObj) {
		if (pObj == null)
			return true;
		if (pObj == "")
			return true;
		if (pObj instanceof String) {
			if (((String) pObj).length() == 0) {
				return true;
			}
		} else if (pObj instanceof Collection<?>) {
			if (((Collection<?>) pObj).size() == 0) {
				return true;
			}
		} else if (pObj instanceof Map<?,?>) {
			if (((Map<?,?>) pObj).size() == 0) {
				return true;
			}
		}
		return false;
	}

	//产生标准错误消息
	public static void makeErrorMsg(Exception e,Map<String,Object> respMap){
		StringBuilder sb = new StringBuilder();
		sb.append("错误发生在:<br/>");
		StackTraceElement[] stacks = e.getStackTrace();
		for(StackTraceElement stack:stacks){
			sb.append(stack.toString()).append("<br/>");
		}
		sb.append("错误详情:<br/>");
		sb.append(e.getMessage());
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,sb.toString());
	}
	public static Map<String,Object> getDefaultResponseMap(){
		Map<String,Object> respMap = new HashMap<String,Object>();
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,Const.AJAX_COMPLETE_MSG);
		respMap.put(Const.AJAX_SERVICE_TOTAL,0);
		respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_200_OK);
		respMap.put(Const.AJAX_DATA_ROOT, "");
		return respMap;
	}
	
	
	public static <T> Map<String,Object> DynamicCallCheck(HttpServletRequest request,HttpServletResponse response,T bizService/*,Map<String,Object> paramMap,String[] validTexts*/) throws Exception{
		Map<String,Object> paramMap = new HashMap<String,Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		//需要指定服务方法名
		//String callMethod = paramMap.get(Const.AJAX_SERVICE_METHOD)!=null?paramMap.get(Const.AJAX_SERVICE_METHOD).toString():"";
		String callMethod = request.getParameter(Const.AJAX_SERVICE_METHOD);
		if(WebUtil.isEmpty(callMethod)){
			WebUtil.makeErrorMsg(new Exception("服务方法[method]未指定或不正确!"), respMap);
			return respMap;
		}else
			paramMap.put(Const.AJAX_SERVICE_METHOD,callMethod);
		
		String strVField = request.getParameter(Const.VALIDATE_FIELDS);
		if(WebUtil.isEmpty(strVField)){
			WebUtil.makeErrorMsg(new Exception("未提供所需校验的相关字段信息["+Const.VALIDATE_FIELDS+"]!"), respMap);
		}else{
			//提取客户端提供的校验提示信息
			String vTexts[] ={"",""};
			vTexts[0]=request.getParameter(Const.VALIDATE_VTEXT0);
			vTexts[1]=request.getParameter(Const.VALIDATE_VTEXT1);
			vTexts[0]=erp.util.WebUtil.isEmpty(vTexts[0])?"校验通过":vTexts[0];
			vTexts[1]=erp.util.WebUtil.isEmpty(vTexts[1])?"校验未通过":vTexts[1];
				
			//制造查询参数Map
			 Map<String,Object> qryParam=WebUtil.getDefaultParamsMap(request);
			ValidField[] vFields = WebUtil.getObjectMapper().readValue(strVField,ValidField[].class);
			for(ValidField vf:vFields){
				qryParam.put(vf.getField(), vf.getValue());
			}
			paramMap.put(QRY_PARAMS, qryParam);
			//根据执行结果判断校验值
			if(WebUtil.DynamicCall(bizService,paramMap,respMap)){
				if((Boolean)respMap.get(Const.AJAX_DATA_ROOT)==true){
					respMap.put(Const.AJAX_SERVICE_MESSAGE,vTexts[0]);
				}else{
					respMap.put(Const.AJAX_SERVICE_MESSAGE,vTexts[1]);
				}
			}
		}
		return respMap;
	}
	
	public static boolean isNeedVCode() {
		return needVCode;
	}

	public static void setNeedVCode(boolean needVCode) {
		WebUtil.needVCode = needVCode;
	}

	public static TpsLogger getLogger() {
		return logger;
	}

	public static void setLogger(TpsLogger logger) {
		WebUtil.logger = logger;
	}

	public static ApplicationContext getAppCtx() {
		return appCtx;
	}


	public static ObjectMapper getObjectMapper() {
		return objectMapper;
	}


	public static void setObjectMapper(ObjectMapper objectMapper) {
		WebUtil.objectMapper = objectMapper;
	}


	public static Properties getJdbcProperties() {
		return jdbcProperties;
	}


	public static void setJdbcProperties(Properties jdbcProperties) {
		WebUtil.jdbcProperties = jdbcProperties;
	}

	public static String getBuildno() {
		return BuildNo;
	}

	public static boolean isDebug() {
		return debug;
	}

	public static void setDebug(boolean debug) {
		WebUtil.debug = debug;
	}

	public static ApplicationContext getAppCtxCommon() {
		return appCtxCommon;
	}


	public static void setAppCtxCommon(ApplicationContext appCtxCommon) {
		WebUtil.appCtxCommon = appCtxCommon;
		WebUtil.appCtxMap.put("common", appCtx);
	}
	public static void setAppCtx(ApplicationContext appCtx) {
		WebUtil.appCtx = appCtx;
		WebUtil.appCtxMap.put("tps", appCtx);
	}

	public static void setAppCtx(String key, ApplicationContext appCtx) {
		WebUtil.appCtxMap.put(key, appCtx);
	}
	
	public static ApplicationContext getAppCtx(String key) {
		return WebUtil.appCtxMap.get(key);
	}
	/**
	 * 获取项目在服务其中的真实路径的工具类
	 * 
	 * 这是在web项目中，获取项目实际路径的最佳方式，在windows和linux系统下均可正常使用
	 * 
	 */
	public static String getRootPath() {
		
		String classPath = WebUtil.class.getClassLoader().getResource("/").getPath();
		String rootPath = "";
		//windows下
		if("\\".equals(File.separator)){
		rootPath = classPath.substring(1,classPath.indexOf("/WEB-INF/classes"));
		rootPath = rootPath.replace("/", "\\");
		}
		//linux下
		if("/".equals(File.separator)){
		rootPath = classPath.substring(0,classPath.indexOf("/WEB-INF/classes"));
		rootPath = rootPath.replace("\\", "/");
		}
		return rootPath;
	}
	public static String getUpLoadFileRoot(){
		//windows下 "\\".equals(File.separator)
		String root="D:/srmfile/";
		//linux下
		if("/".equals(File.separator)){
			root= "/home/srmfile/";
		}
		return root;
	}
	public static String getPartPath(){
		return "register";
	}
	public static String getIpAddr(HttpServletRequest request) {
		if (request == null) {
			return null;
		}
		
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
	//产生概要错误消息
  	public static String makeErrorMsgForCtrl(Throwable e,Map<String,Object> respMap){
  		StringBuilder sb = new StringBuilder();
  		sb.append("错误详情:\r\n\t");
  		sb.append(e.getMessage());
  		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
  		return sb.toString();
  	}
	/**  
	  * 检查文件夹是否存在  
	  * @param dir  
	  * @param ftpClient  
	  * @return  
	  */   
	    public static boolean isDirExist(String dir, FtpClient ftpClient) {   
	         try {   
	            ftpClient.cd(dir);   
	        } catch (Exception e) {   
	      
	            return false;   
	        }   
	        return true;   
	    } 
}
