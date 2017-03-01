package erp.common.main.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.common.main.service.BusinessObjectService;
import erp.common.main.service.ContentService;
import erp.common.main.service.DailyReportService;
import erp.common.main.service.OrgsService;
import erp.common.main.service.SerialGenRuleService;
import erp.common.main.service.UserService;
import erp.common.service.CodeService;
import erp.util.AppUtils;
import erp.util.Const;
import erp.util.SessionUtil;
import erp.util.WebUtil;
import erp.web.model.LoginUser;
import erp.web.model.UserInfo;
import erp.web.service.DSUtilService;
import erp.web.service.ModuleService;


@Controller
@RequestMapping("main")
public class Main {
	
  @Autowired
  	private UserService userService;
	
  @Autowired
  	private ModuleService moduleService;
  @Autowired
  	private CodeService codeService;
  
  @Autowired
  	private DSUtilService dsUtilService;
  @Autowired
  	private DailyReportService dailyService;
  
  @Autowired
    private ContentService contentService;
  
  //商业对象Service
  @Autowired
   private BusinessObjectService buzObjectService;
  
  @Autowired
  	private OrgsService orgsService; 
  
  @Autowired
      private SerialGenRuleService serialGenRuleService;
  
  
	@RequestMapping(value="/Modules.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, moduleService);
	}
	@RequestMapping(value="/DSUtil.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> DBUtil(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,dsUtilService);
	}
	
	@RequestMapping(value="/DSUtilService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> DBUtilService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request,response,dsUtilService);
	}
	
	@RequestMapping(value="/ModuleService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModuleService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, moduleService);
	}
	
	
	@RequestMapping(value="/doSessionTimeOut.do",method=RequestMethod.GET)
	@ResponseBody 
	public Map<String,Object> doSessionTimeOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_999_SessionTimeOut);
		respMap.put(Const.AJAX_COMPLETE_MSG, "登录已超时或尚未登录!");
		return respMap;		
	}
	
	@RequestMapping(value="/Users.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Users(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		return WebUtil.DynamicCallCURD(request,response, userService);
	}
	
	
	@RequestMapping(value="/Serial.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Serial(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, serialGenRuleService);
	}
	@RequestMapping(value="/SerialService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> SerialService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, serialGenRuleService);
	}
	
	@RequestMapping(value="/CodeCheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> CodeCheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCheck(request, response, codeService);
	}
	
	@RequestMapping(value="/UserCheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> UserCheck(HttpServletRequest request,HttpServletResponse response)throws Exception {
		return WebUtil.DynamicCallCheck(request, response, userService);
	}
	//编码序列管理
	@RequestMapping(value="/Codes.do",method=RequestMethod.POST)
    @ResponseBody 
    public Map<String,Object> Codes(HttpServletRequest request,HttpServletResponse response) throws Exception{
        return WebUtil.DynamicCallCURD(request, response, codeService);
    }
    @RequestMapping(value="/CodesService.do",method=RequestMethod.POST)
    @ResponseBody 
    public Map<String,Object> CodesService(HttpServletRequest request,HttpServletResponse response) throws Exception{
        return WebUtil.DynamicCallService(request, response, codeService);
    }
	/*
	 * 用户注销
	 */
	@RequestMapping(value="/Users/doLogout.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> doLogout(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String loginId = request.getParameter("login_id");
		loginId = loginId==null?"":loginId;
		UserInfo userInfo = (UserInfo)request.getSession(false).getAttribute("user");
		//只能注销他自己
		/*if(Const.users==null){
			Const.users=new LinkedList<LoginUser>();
		}
		LinkedList<LoginUser> users=Const.users;
		if(users!=null){
			for(LoginUser user:users){
				System.out.println(request.getSession().getId());
				if(request.getSession().getId().equals(user.getSession_id())){
					users.remove(user);
					break;
				}
			}
		}*/
		if(userInfo!=null&&userInfo.getLogin_id().equals(loginId)){
			SessionUtil.removeAllAttributes();
			request.getSession(false).removeAttribute("user");
			 request.getSession().invalidate();
		}
		return respMap;
	}
	
	/**
	 * 用于获取登录用户信息
	 */
	@RequestMapping(value="Users/getLoginInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object>  getLoginInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Object uInfos[]= new Object[9];
		uInfos[0]=(UserInfo)SessionUtil.getAttribute(Const.SESSION_USER);
		//如果指定了组织，那么切换一下
		String ou_code = request.getParameter("ou_code")!=null?request.getParameter("ou_code").toString().trim():"";
		if(uInfos[0]!=null){
			uInfos[1] = SessionUtil.getAttribute(Const.SESSION_ROLE);
			uInfos[2] = SessionUtil.getAttribute(Const.SESSION_PST);
			uInfos[3] = SessionUtil.getAttribute("odMap");
			uInfos[4] = SessionUtil.getAttribute(Const.SESSION_IP);
			
			uInfos[5] = SessionUtil.getAttribute(Const.SESSION_DEFAULT_ORG);
			uInfos[6] = SessionUtil.getAttribute(Const.SESSION_DEFAULT_DEPT);
			
			uInfos[7] = SessionUtil.getAttribute(Const.SESSION_CURRENT_ORG);
			uInfos[8] = SessionUtil.getAttribute(Const.SESSION_CHANGABLE_ORG);
			respMap.put(Const.AJAX_DATA_ROOT, uInfos);
		}
		return respMap;
	}
	
	@RequestMapping(value="/Content.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Content(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, contentService);
	}
	
	@RequestMapping(value="/ModuleCodeCheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModuleCodeCheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCheck(request, response, moduleService);
	}
	
	/*===================================组织定义等====================================================================================*/
	@RequestMapping(value="/Orgs.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Orgs(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, orgsService);
	}
	@RequestMapping(value="/OrgService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> OrgService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, orgsService);
	}
	
	@RequestMapping(value="/dailyreport.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> dailyService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, dailyService);
	}
	 @RequestMapping(value="/MakeExcel.do",method=RequestMethod.POST)
	 @ResponseBody
		public  String MakeExcelFile(@RequestBody HashMap<String,Object> map) throws Exception {
		    String data=map.get("data").toString();
		 	// 创建当前时刻
			Date date = new Date();
		    String responseStr="";
			// 格式化日期
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			// 格式化日期(产生文件名)
			String filename =sdf.format(date)+".xls";
			// 创建文件
			File file = new File("D://" +filename);
			file.createNewFile();
			try{
				AppUtils.writeExcel(new FileOutputStream(file), filename, data);
				responseStr="{name:\'"+filename+"\'}";
			} catch (Exception e) {
			// TODO Auto-generated catch block.
				responseStr = "{success: false}";
				return responseStr;
			}
			return String.format("{success: true, ajaxErrorCode: 200, data: [%s]}", responseStr);
			
		}
	@RequestMapping(value="/downloadExcel.do",method=RequestMethod.GET)
	public @ResponseBody void downloadToExcel(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		String filename=request.getParameter("filename");
		File file=new File("D://" +filename);
		OutputStream out = null;
        InputStream in = null;
        // 获得文件名
        // 定义输出类型(下载)
        response.setContentType("application/force-download");
        response.setHeader("Location", filename);

        // 定义输出文件头
        response.setHeader("Content-Disposition", "attachment;filename="
                + filename);
        out = response.getOutputStream();
        in = new FileInputStream(file.getPath());

        byte[] buffer = new byte[2048];
        int i = -1;
        while ((i = in.read(buffer)) != -1) {
            out.write(buffer, 0, i);
        }

        in.close();
        out.flush();
        out.close();
        // 删除文件,删除前关闭所有的Stream.
        file.delete();
	}
	//商业对象CRUD处理
	@RequestMapping(value="/Buzobj.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Buzobj(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		return WebUtil.DynamicCallCURD(request,response, buzObjectService);
	}
	
	/*排他表
	 *@author：伍恰
	 *时间：2016/3/22
	 * */
	@RequestMapping(value="/exclusive.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addExclusive(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, userService);
	}
	@RequestMapping(value="/downloadFile.do",method=RequestMethod.GET)
	@ResponseBody 
	public void downloadFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
		   String fileName=request.getParameter(Const.AJAX_SERVICE_FILENAME).toString();
		   File file=new File(Const.TEMPPATH+fileName);
		   InputStream fis = new BufferedInputStream(new FileInputStream(Const.TEMPPATH+fileName));
           byte[] buffer = new byte[fis.available()];
           fis.read(buffer);
           fis.close();
           //读完后删除临时文件
           file.delete();
		   response.reset();// 清空输出流        
		   response.setHeader("Content-disposition", "attachment; filename="+ new String(fileName.getBytes("GB2312"),"iso8859-1"));  
		// 设定输出文件头        
		   response.setContentType("application/msexcel");// 定义输出类型   
		   OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
		   toClient.write(buffer);
           toClient.flush();
           toClient.close();
		  } catch (IOException ex) {
	            ex.printStackTrace();
	     }  
	}
}
