package erp.util.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.ws.handler.LogicalHandler;
import javax.xml.ws.handler.LogicalMessageContext;
import javax.xml.ws.handler.MessageContext;

import org.apache.cxf.jaxws.handler.logical.LogicalMessageContextImpl;

public class SessionLogicalHandler implements LogicalHandler<LogicalMessageContext>{

		 public SessionLogicalHandler() {
			 super();
		 }

		 public static List<String> http_headers_cookie=null;//静态  所有的  SessionLogicalHandler  共享 一个 cookie
		 @SuppressWarnings({ "unchecked", "rawtypes" })
		 @Override
		 public boolean handleMessage(LogicalMessageContext context) {
		  // TODO Auto-generated method stub
		  // javax.xml.ws.handler.MessageContext.Scope s=
		  // context.getScope(MessageContext.HTTP_REQUEST_HEADERS);
		  // Set-Cookie=[JSESSIONID=48B10A68BB05F69F8ED82A33F566C5D8; Path=/myapp;
		  // HttpOnly]
		  
		  LogicalMessageContextImpl c = (LogicalMessageContextImpl) context;
		  
		  if (c.get(MessageContext.HTTP_RESPONSE_HEADERS) != null) {//response 时  记录服务端返回的session信息
			  Map<String, List> header = (Map<String, List>) c.get(MessageContext.HTTP_RESPONSE_HEADERS);
			  List<String> ls = header.get("Set-Cookie");//获取header 中cookie的信息
			  if(ls!=null){
				  SessionLogicalHandler.SetHttp_headers_cookie(ls);
			  }
		  }else if(c.get( MessageContext.HTTP_REQUEST_HEADERS)!=null && http_headers_cookie!=null){//request 请求的时候 把cookie信息设置进去
			  Map<String, List> header = (Map<String, List>) c.get( MessageContext.HTTP_REQUEST_HEADERS);
			  header.put("cookie", http_headers_cookie);
		  }else if(c.get( MessageContext.HTTP_REQUEST_HEADERS)==null && http_headers_cookie!=null){//request 请求的时候 把cookie信息设置进去
			  Map<String, List> header = new HashMap<String, List>();
			  header.put("cookie", http_headers_cookie);
			  c.put(MessageContext.HTTP_REQUEST_HEADERS, header);
		  }
		  return true;
		 }
		 

		 @Override
		 public boolean handleFault(LogicalMessageContext context) {
		  // TODO Auto-generated method stub
		  return false;
		 }

		 @Override
		 public void close(MessageContext context) {
		  // TODO Auto-generated method stub

		 }
		 private synchronized static void  SetHttp_headers_cookie(List<String> ls){
			 if(http_headers_cookie==null){
				 http_headers_cookie=ls;
			 }
		 }
}
