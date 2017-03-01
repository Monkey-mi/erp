package srm.materialConfirmation.controller;
import java.io.File;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import net.sf.json.JSONObject;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import srm.materialConfirmation.model.MaterialCheckAccessory;
import erp.util.FileUtil;
import erp.util.FtpParam;
import erp.util.WebUtil;
import srm.materialConfirmation.service.*;
import sun.net.ftp.FtpClient;

@Controller
@RequestMapping("materialConfirmation")
public class MaterialConfirmationController{
	@Autowired
	private MaterialCheckclassService materialCheckclassService;
	@Autowired
	private MaterialCheckDetailService materialCheckDetailService;
	@Autowired
	private MaterialConfirmationService materialConfirmationService;
	@Autowired
	private MaterialSampleService materialSampleService;
	@Autowired
	private MaterialCheckAccessoryService materialCheckAccessoryService;
 
	//物料确认检测类目
	@RequestMapping(value="/MaterialCheckclass.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesMaterialCheckclass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialCheckclassService);
	}
	//物料确认申请部门对应OA部门
	@RequestMapping(value="/ApplyDepartment.oa",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ApplyDepartmentOA(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialCheckclassService);
	}
	//物料检测确认明细表
	@RequestMapping(value="/MaterialCheckDetail.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesMaterialCheckDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialCheckDetailService);
	}
	//物料确认主表
	@RequestMapping(value="/MaterialConfirmation.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialConfirmationService);
	}
	//物料确认明细表
	@RequestMapping(value="/MaterialSample.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesSample(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialSampleService);
	}
	//物料确认附件表
	@RequestMapping(value="/MaterialCheckAccessory.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> MaterialCheckAccessory(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialCheckAccessoryService);
	}
	//物料确认附件上传
	@RequestMapping(value="/upConfirmation.srm",method=RequestMethod.POST)
	@ResponseBody 
	public String upConfirmation(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
		CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");
		Map<String,Object> params=new HashMap<String, Object>();
		String file_name=request.getParameter("file_name");
		String originalName=file.getOriginalFilename();
    	String contentType= file.getContentType();
    	String cjrm = request.getParameter("cjrm");
    	String bzsm = request.getParameter("bzsm");
    	params.put("company_id", request.getParameter("company_id"));
    	params.put("originalFilename", originalName);
        params.put("file_name", file_name);
        params.put("contentType", contentType);
        params.put("cjrm", cjrm);
        params.put("bzsm", bzsm);
        InputStream inputStream = null;
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("msg", "文件太大，超过10M");
				return json.toString() ;	
			} 
        	inputStream = file.getInputStream();
        	byte[] buffer =  IOUtils.toByteArray(inputStream);
        	inputStream.close(); 
        	String urlId = "/rzerp_hfpg/erp_wlqr/";
		    String filename = file_name;
		    SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmssSSS");
	    	String originalFilename = filename;
	    	String fileName = "";
	    	if(originalFilename.contains(".")){
	    	fileName = (df.format(new Date()))+ originalFilename.substring(originalFilename.lastIndexOf("."));//文件名生成器
	    	}else{
	    	fileName = (df.format(new Date()))+ originalFilename;
	    	}
    	    FileUtil.byteToFtp(urlId, buffer, fileName);
    	    MaterialCheckAccessory pf = new MaterialCheckAccessory();
            pf.setCjrm(cjrm);
            pf.setCompany_id(Integer.parseInt(params.get("company_id").toString()));
            pf.setPtsc(0);
            pf.setScrq(new Date());
            pf.setWjmc(file_name);
            pf.setWjlj(urlId+fileName);
            pf.setWjbh(materialCheckAccessoryService.getMaxWjbh(params));
            pf.setFjzt(1);
            pf.setFjlx(0);
            pf.setBzsm(bzsm);
            materialCheckAccessoryService.addMaterialCheckAccessory(pf);
        }else{
        	json.put("msg", "文件不存在");
        	return json.toString();
        }
    	return json.toString();
	}
	/**按路径，删除服务器上面的附件**/
    @RequestMapping(value="/deleteAttchedByPath.srm",method = RequestMethod.POST)
    @ResponseBody
	public String deleteAttchedByPath(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	 String ftpHost = FtpParam.getFtpUrl();  
         int port = FtpParam.getFtpport();  
         String userName = FtpParam.getFtpUser();  
         String passWord = FtpParam.getFtpPsw(); 
         FtpClient ftpClient = new FtpClient(ftpHost, port);// ftpHost为FTP服务器的IP地址，port为FTP服务器的登陆端口,ftpHost为String型,port为int型。
         ftpClient.login(userName, passWord);// userName、passWord分别为FTP服务器的登陆用户名和密码  
         ftpClient.binary();
    	String arraystr=request.getParameter("patharray");
    	String be_path = request.getParameter("be_path");    	
    	String[] array= arraystr.split(",");
		for(int i=0;i<array.length;i++){
			String path = (array[i]).substring(0, array[i].lastIndexOf("/"));
			boolean fielset = WebUtil.isDirExist(path,ftpClient);
			String fileName = array[i].substring(array[i].lastIndexOf("/")+1);
			//TODO
			//判断ftp服务器上是否存在该文件
			if(fielset){
			ftpClient.cd(path);// path为FTP服务器上保存上传文件的路径。  
			ftpClient.sendServer("dele " + fileName + "\r\n");
			}
		}
		ftpClient.closeServer();  
		return json.toString();
	}
    
}