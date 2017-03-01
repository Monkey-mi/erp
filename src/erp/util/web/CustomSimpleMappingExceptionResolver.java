package erp.util.web;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;


import erp.common.model.BusinessException;
import erp.util.MyJsonUtil;
import erp.util.SessionUtil;
import erp.util.WebUtil;


/**自定义spring全局异常进行统一处理类
 * 如果是ajax请求或者一部请求，返回json.
 * 否则，进行页面跳转
 * @author Administrator
 * 参考：http://baalwolf.iteye.com/blog/2187823
 * 附加  除service层以外的的错误日志记录，service层的错误日志，按照BusinessException过滤，不记录
 */
public class CustomSimpleMappingExceptionResolver extends
		SimpleMappingExceptionResolver {

	private static Logger logger = Logger.getLogger(CustomSimpleMappingExceptionResolver.class);
    @Override  
    protected ModelAndView doResolveException(HttpServletRequest request,  
            HttpServletResponse response,  
            Object handler,  
            Exception ex) {  
      
    	//记录ctrl层的详细 错误日志,service层的错误日志由  util.web.ExceptionAdvisor记录
    	if(!ex.getClass().equals(BusinessException.class)){
    		//读取session中的用户    
            //String outUserName = SessionUtil.getCurrentPlateFormUser()!=null?SessionUtil.getCurrentPlateFormUser().getAcc_name():"";  
            String inUserName=SessionUtil.getCurrentUser()!=null?SessionUtil.getCurrentUser().getName():"";
            //获取请求ip    
            String ip = WebUtil.getIpAddr(request); 
            logger.error("===== 非service异常通知开始=====");
            logger.error("异常信息:" + ExceptionAdvisor.getExceptionStack(ex));    
            logger.error("请求人:" + inUserName);    
            logger.error("请求IP:" + ip);  
            logger.error("请求参数:" + MyJsonUtil.obj2string(request.getParameterMap()));    
            logger.error("===== 非service异常通知结束=====");
    	}
        // Expose ModelAndView for chosen error view.  
        String viewName = determineViewName(ex, request);  
        if (viewName != null) {//JSP格式返回  
            if(!(request.getHeader("accept").indexOf("application/json")>-1 
            		|| ( request.getHeader("X-Requested-With")!=null && request.getHeader("X-Requested-With").indexOf("XMLHttpRequest")>-1))){//如果不是异步请求  
                // Apply HTTP status code for error views, if specified.  
                // Only apply it if we're processing a top-level request.  
                Integer statusCode = determineStatusCode(request, viewName);  
                if (statusCode != null) {  
                    applyStatusCodeIfPossible(request, response, statusCode);  
                      
                }  
                return getModelAndView(viewName, ex, request);
            }else{//JSON格式返回  
            	
            	JSONObject json = new JSONObject();
            	json.put("ajaxErrorCode", 500);
            	json.put("success", false);  
            	try {  
            		String message=ex.getMessage();
            		/***如果是BusinessException,直接返回message；
            		 * 其他的，是ctrl层抛出的， 再判断一次，然后放到message，并返回*/
            		if(!ex.getClass().equals(BusinessException.class)){
            			String midMessage=ExceptionAdvisor.getMessageByExceptionClass(ex);
            			message="抱歉，"+midMessage+"请稍后再试或与管理员联系！";
            		}
                	json.put("message",message ); 
                	OutputStream out = response.getOutputStream();
                   	out.write(json.toString().getBytes("utf-8")); 
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
                return new ModelAndView();  
            }   
        }  
        else {  
            return null;  
        }  
    }
}
