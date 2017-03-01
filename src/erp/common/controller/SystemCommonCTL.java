package erp.common.controller;



import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.support.RequestContext;

import erp.common.main.service.OrgsService;
import erp.common.service.CommonService;
import erp.common.service.JsLogService;
import erp.util.Const;
import erp.util.FtpParam;
import erp.util.SecurityCode;
import erp.util.SecurityImage;
import erp.util.SessionUtil;
import erp.util.TansferData;
import erp.util.WebUtil;
import erp.util.web.SessionListener;
import erp.web.model.LoginUser;
import erp.web.model.UserInfo;



@Controller
@RequestMapping("common")
public class SystemCommonCTL {

	@Autowired
	private CommonService commonService;
	
	@Autowired
	private OrgsService orgsService;
	
	
	
	@RequestMapping(value="/getVerifyCode.action",method=RequestMethod.GET)
	public void getVerifyCode(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		
		//生成验证码，写入用户session
		String verifyCode=SecurityCode.getSecurityCode();
		SessionUtil.setAttribute("verify_code",verifyCode);
		
		//输出验证码给客户端
		response.setContentType("image/jpeg");
		BufferedImage bim=SecurityImage.createImage(verifyCode);
		ImageIO.write(bim, "JPEG",response.getOutputStream());			
	}
	/**
	 * 数据库连接测试
	 */
	@RequestMapping(value="/testDbConn.action",method=RequestMethod.GET)
	@ResponseBody 
	public Map<String,Object> testDbConn(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		StringBuilder sbErrMsg = new StringBuilder();
		respMap.put(Const.AJAX_DATA_ROOT, commonService.testDbConn(sbErrMsg));
		respMap.put(Const.AJAX_SERVICE_MESSAGE, sbErrMsg.toString());
		return respMap;		
	}
	@RequestMapping(value="/getNeedVCode.action",method=RequestMethod.GET)
	public void getNeedVCode(HttpServletRequest request,HttpServletResponse response)throws Exception{
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(String.valueOf(WebUtil.isNeedVCode())); 
	}
	/*
	 * 用户登录
	 */
	@RequestMapping(value="/Users/doLogin.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> doLogin(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		paramsMap.put("login_id",request.getParameter("login_id"));
		paramsMap.put("pwd",request.getParameter("pwd"));
		String vCode = request.getParameter("verify_code");
		if(erp.util.WebUtil.isEmpty(vCode))
			vCode ="";
		String vCodeInSession="";
		Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
		if(!erp.util.WebUtil.isEmpty(vCodeObjInSession))
			vCodeInSession =vCodeObjInSession.toString();
		if(!vCode.equalsIgnoreCase(vCodeInSession)&&WebUtil.isNeedVCode()){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
		}else{
			try{
				//先校验用户有效性
				Map<String,Object> paramsMap1 = new HashMap<String,Object>();
				paramsMap1.put("login_id",request.getParameter("login_id"));
				if(!commonService.isValidUser(paramsMap1)){
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "无效用户!");
				}else
					//校验通过
					if(commonService.chkUserPwd(paramsMap)){
						UserInfo uinfo = commonService.getUserList(paramsMap).get(0);
						//首次登陆必须先修改密码
						//华慧 
					   if (uinfo.getLast_login()!=null){
						   uinfo.setLast_login(new Date());
						   commonService.updateUser(new UserInfo[]{uinfo});
					   }
						SessionUtil.setAttribute(Const.SESSION_USER,uinfo);
						SessionUtil.setAttribute(Const.SESSION_ROLE,commonService.getRoleListByLoginId(paramsMap));
						//保存客户数据域权限
						SessionUtil.setAttribute(Const.DATA_PERMIT,commonService.getDataPermitByLoginId(paramsMap));
						//保存客户端登陆ip
						SessionUtil.setAttribute(Const.SESSION_IP, getClientIP(request));
						//drp中 yhbh='000001'
						SessionUtil.setAttribute(Const.DRP_YHBH,getYhbh() );
						
						/*↑↑↑↑取每个职位所在组织对应的人力树的or_id↑↑↑↑*/
						//初始化用户组织及部门权限表的缓存
						orgsService.initUserOrgCache();
						orgsService.initUserDeptCache();
						/*↓↓↓↓初始化人力资源树缓存↓↓↓↓*/
						orgsService.initOrTypeTreeCache(Const.DEFAULT_ORTYPE);
						/*↑↑↑↑初始化人力资源树缓存↑↑↑↑*/
						//初始化组织缓存
						orgsService.initOrgCache();
						//初始化部门树
						orgsService.initDeptCache();
						
						if(SessionListener.getSessionCount()==0)
							SessionListener.increaseSessionCount();
						respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
						respMap.put(Const.AJAX_SERVICE_MESSAGE, "成功登录!");
					}else{
						respMap.put(Const.AJAX_SERVICE_MESSAGE, "用户或密码输入错误!");
					}
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
			}
		}
		return respMap;
	}
	
	/**
	 * 获得一些js全局变量
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/getJSGlobalVars.action",method=RequestMethod.GET)
	public void getJSGlobalVars(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Content-Type","text/javascript;charset=UTF-8");
		StringBuilder sbVars = new StringBuilder();
		String loginId = SessionUtil.getCurrentUser()!=null?SessionUtil.getCurrentUser().getLogin_id():"";
		if(FtpParam.getFtpUrl()==null||FtpParam.getFtpUrl()==""){
			FtpParam ftpParam=new FtpParam();
		}
		String ftpUrl=FtpParam.getFtpUrl();
		sbVars.append(" var tp_debug_flag =").append(WebUtil.isDebug()).append(";")
				.append(" var tp_cookie='").append(SessionUtil.getCookieAll()).append("';")
		        .append(" var tp_login_id='").append(loginId).append("';")
		        .append("var tp_ftpUrl='").append(ftpUrl).append("';");
		response.getWriter().println(sbVars);
		response.flushBuffer();
	}
	private String getClientIP(HttpServletRequest httpReq) {
		String ip = httpReq.getHeader("x-forwarded-for");
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getHeader("Proxy-Client-IP");
		} else {
			String[] ips = ip.split(",");
			if (ips.length > 0)
				ip = ips[0];
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getHeader("WL-Proxy-Client-IP");
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getRemoteAddr();
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.indexOf("0:0:0:0:0:0:0:1") >= 0 || ip.indexOf("::1") >= 0)
			ip = "127.0.0.1";
		return ip;

	}
	private String getClientPcName(HttpServletRequest httpReq) {
		String ServerName= httpReq.getRemoteHost();
		return ServerName;
	}
	//经过一定的逻辑处理获取drp的 dlyhb 的用户编号
	private String getYhbh(){
		return "000001";
	}
	/*功能：获得当前在线用户
	 *author：伍恰
	 *时间：2015/1/15
	 * */
	@RequestMapping(value="/getCurUsers.action",method=RequestMethod.POST)
	@ResponseBody
	public String getCurUsers(HttpServletRequest request,HttpServletResponse response)throws Exception{
			//为了改善用户系统在更新过程中，用户系统还在主界面的情况。
			//在tomcat重启后，客户端通过这个线程判断是否用户是否有效；
			//获取Session中当前用户的值。如果为空，那么返回登录页面
			if(SessionUtil.getCurrentUser()==null){
				return Const.LOGIN_PAGE;
			}else{
				return	SessionListener.getSessionCount().toString();
			}
	}
	/*功能：上传文件到FTP指定路径
	 *author：伍恰
	 *时间：2015/2/11
	 * */
	@RequestMapping(value = "/uploadAttachement.action", method = RequestMethod.POST)
	@ResponseBody
	public String uploadAttachement(@RequestParam("fileName") MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
		if(FtpParam.getFtpUrl()==null||FtpParam.getFtpUrl().equals("")){
			FtpParam ftpParam=new FtpParam();
		}
		String urlId=request.getParameter("urlId");//ftp相对路径
		json.put("success", true);
				String ftpurl=FtpParam.getFtpUrl();//ftp服务器地址
				
				String ftppassword=FtpParam.getFtpPsw();//密码
				
				String ftpuser=FtpParam.getFtpUser();//用户名
				
				int port=FtpParam.getFtpport();//端口号
				
				SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmssSSS");
				String originalFilename = file.getOriginalFilename();
				System.out.println(originalFilename);
				System.out.println(file.getContentType());
				String fileName = (df.format(new Date()))+ originalFilename.substring(originalFilename.lastIndexOf("."));//文件名生成器
				String filePath = urlId+fileName;
				FTPClient ftpClient = new FTPClient(); 
		        InputStream fis = null;
		        boolean flag = false;
				if (!file.isEmpty()) {
					if (file.getSize() > 20097152) {
						json.put("msg", "文件太大");
						return json.toString() ;	
					} else {
							try { 
					            ftpClient.connect(ftpurl,port); 
					            ftpClient.login(ftpuser,ftppassword);
					            ftpClient.enterLocalPassiveMode();
					            ftpClient.makeDirectory(urlId);
					            fis =file.getInputStream(); 
					            //设置文件类型（二进制） 
					            ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE); 
					            flag = ftpClient.storeFile(filePath, fis); 
					        } catch (IOException e) { 
					            e.printStackTrace(); 
					            throw new RuntimeException("FTP客户端出错！", e); 
					        } finally { 
					            IOUtils.closeQuietly(fis); //关闭一个流忽略nulls和例外的情况。
					            try { 
					                ftpClient.disconnect(); 
					            } catch (IOException e) { 
					                e.printStackTrace(); 
					                throw new RuntimeException("关闭FTP连接发生异常！", e); 
					            } 
					        } 
							json.put("data",urlId+fileName);
							json.put("msg", "上传成功");
					}
				} else {
					json.put("msg", "文件不存在");
				}
				return json.toString();
	}
	/*功能：删除FTP指定路径下文件
	 *author：伍恰
	 *时间：2015/2/11
	 * */
	@RequestMapping(value = "/deleteAttachement.action", method = RequestMethod.POST)
	@ResponseBody
	public String deleteAttachement(HttpServletRequest request, HttpServletResponse response)  {
		JSONObject json = new JSONObject();
		String urlId=request.getParameter("urlId");//ftp相对路径
		if(FtpParam.getFtpUrl()==null||FtpParam.getFtpUrl()==""){
			FtpParam ftpParam=new FtpParam();
		}
				String ftpurl=FtpParam.getFtpUrl();//ftp服务器地址
				
				String ftppassword=FtpParam.getFtpPsw();//密码
				
				String ftpuser=FtpParam.getFtpUser();//用户名
				
				int port=FtpParam.getFtpport();//端口号
				
				boolean success = false;  
		       
				json.put("success", true);
				FTPClient ftp = new FTPClient();  
		        try  
		        {  
		            int reply;  
		              
		            // 连接FTP服务器  
		            if (port > -1)  
		            {  
		                ftp.connect(ftpurl, port);  
		            }  
		            else  
		            {  
		                ftp.connect(ftpurl);  
		            }  
		              
		            // 登录  
		            ftp.login(ftpuser, ftppassword);  
		            reply = ftp.getReplyCode();  
		            if (!FTPReply.isPositiveCompletion(reply))  
		            {  
		                ftp.disconnect();  
		                return json.toString() ;	  
		            }  
		            // 转移到FTP服务器目录  
		            success = ftp.deleteFile(urlId);  
		            ftp.logout();  
		        }  
		        catch (IOException e)  
		        {  
		        	e.printStackTrace();
		            success = false;  
		        }  
		        finally  
		        {  
		            if (ftp.isConnected())  
		            {  
		                try  
		                {  
		                    ftp.disconnect();  
		                }  
		                catch (IOException e)  
		                {  
		                	e.printStackTrace();
		                }
		            }  
		        }  
		        return json.toString();
	}
	/** 上传路径*/
	private final static String uploadFolderPath = WebUtil.getUpLoadFileRoot();
	/**上传文件,公用*/
    @RequestMapping(value="/uploadFile.do",method = RequestMethod.POST)
    @ResponseBody
    public String uploadFile(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	JSONObject json = new JSONObject();
    	json.put("success", true);
    	
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象       
        //中间部分路径
        String partPath=request.getParameter("partPath");
        boolean isimg=false;
        String strisimg=request.getParameter("isimg");
        if(strisimg!=null){
        	isimg=Boolean.valueOf(strisimg);
        }
        InputStream inputStream = null;
        OutputStream outputStream = null;
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("msg", "文件太大，超过10M");
				return json.toString() ;	
			} 
	        inputStream = file.getInputStream();
	       
           //文件存放路径
            String folder=uploadFolderPath+partPath+"/";
            File newFile = new File(folder);
            
            if(!newFile.exists()){
              newFile.mkdirs();
            }
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
            String originalName=file.getOriginalFilename();
            String newName=originalName;
            
            if(isimg){
            	boolean flag=false;//默认不 是图片
                //获取文件后缀，与传过来的参数file_name重新组装文件名
                if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
                	String this_suffix=originalName.substring(originalName.lastIndexOf("."));
                	
                	for(String suffix:Const.imgArray){
                		if(suffix.equalsIgnoreCase(this_suffix)){
                			flag=true;
                			break;
                        }
                	}
                	
                	newName=df.format(new Date())+originalName.substring(originalName.lastIndexOf("."));
                }
                if(!flag){
            		json.put("msg", "不是图片");
    				return json.toString() ;
            	}	
                
            }else{
            	//获取文件后缀，与传过来的参数file_name重新组装文件名
                if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
                	newName=df.format(new Date())+originalName.substring(originalName.indexOf("."));
                }
            }
          
            //完整文件对象
            String file_path=folder+newName;
            File finalFile = new File(file_path);
            finalFile.setReadable(true, false);
            finalFile.setWritable(true, false);
            outputStream = new FileOutputStream(finalFile);

            int readBytes = 0;
            byte[] buffer = new byte[1024];
            while ((readBytes = inputStream.read(buffer, 0, 1024)) != -1) {
                    outputStream.write(buffer, 0, readBytes);
            }
            //输出相对路径
            json.put("file_path", partPath+"/"+newName);
            outputStream.close();
            inputStream.close();          
        }else{
        	json.put("msg", "文件不存在");
        }
        return json.toString();
    }
	/**
     * javascript 发送
		var file_path=encodeURIComponent(encodeURIComponent(rec.get('attched')));
		
		java spring mvc接收
		String file_path=request.getParameter("encodePath");//解码一次
        file_path=java.net.URLDecoder.decode(encodePath,"UTF-8");//第二次解码*/
    @RequestMapping(value="/downloadFile.do",method=RequestMethod.GET)
    @ResponseBody
	public  void downloadFile(HttpServletRequest request,HttpServletResponse response ) throws Exception {
    	String file_path=request.getParameter("file_path");
    	
		if(file_path!=null){
			file_path=java.net.URLDecoder.decode(file_path,"UTF-8");
			File finalFile = new File(uploadFolderPath+file_path);
			String filename=file_path.substring(file_path.lastIndexOf("/")+1);
	       
	        if(finalFile.exists()){
	        	OutputStream out = null;
	            InputStream in = null;
	            boolean isimg=false;
	            String strisimg=request.getParameter("isimg");
	            if(strisimg!=null){
	            	isimg=Boolean.valueOf(strisimg);
	            }
	            response.setContentType("application/octet-stream; charset=utf-8");
	            if(isimg){
	            	boolean flag=false;//默认不 是图片
	                //获取文件后缀，与传过来的参数file_name重新组装文件名
	                if(file_path.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
	                	String this_suffix=file_path.substring(file_path.lastIndexOf("."));
	                	
	                	for(String suffix:Const.imgArray){
	                		if(suffix.equalsIgnoreCase(this_suffix)){
	                			flag=true;
	                			break;
	                        }
	                	}
	                }
	                if(flag){
	                	response.setContentType("image/*");
	                }
	            }
	            // 获得文件名
	            
	            if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0) {  
		            filename = URLEncoder.encode(filename, "UTF-8");  
		        } else {  
		            filename = new String(filename.getBytes("UTF-8"), "ISO8859-1");  
		        }
	            response.setHeader("Location", filename);

	            // 定义输出文件头
	            response.setHeader("Content-Disposition", "attachment;filename="
	                    + filename);
	            out = response.getOutputStream();
	            in = new FileInputStream(finalFile.getPath());

	            TansferData.limitSpeed(out, in,TansferData.getSpeed500kb(), null, false);

	            in.close();
	            out.flush();
	            out.close();
	            return;
	        }
		}
       	response.setContentType("text/html; charset=utf-8");
       	OutputStream out = response.getOutputStream();
       	out.write("文件不存在".getBytes("utf-8"));
       	out.flush();
        out.close();
       
	}
    /**按路径，删除服务器上面的附件**/
    @RequestMapping(value="/deleteFileByPath.do",method = RequestMethod.POST)
    @ResponseBody
	public String deleteFileByPath(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	String arraystr=request.getParameter("patharray");
    	String[] array= arraystr.split(",");
		for(int i=0;i<array.length;i++){
			File file = new File(uploadFolderPath+array[i]);
			if(file.exists()){
				file.delete();
			}
		}
		return json.toString();
	}
    @Autowired
    private JsLogService jsLogService;
    /**前端异常CURD**/
    @RequestMapping(value="/jslog.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> arrivalRegister(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, jsLogService);
	}
}
