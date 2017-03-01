package srm.supplier.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.outsideasy.ws.common.vo.CXFRequestException;
import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.Const;
import erp.util.MyJsonUtil;
import erp.util.WebUtil;

import srm.supplier.model.SupplierCheckfactoryReport;
import srm.supplier.service.AppSupplierAccessLoopService;
import srm.supplier.service.AttchedService;
import srm.supplier.service.BankAccountService;
import srm.supplier.service.CompetitorService;
import srm.supplier.service.DevicelistService;
import srm.supplier.service.GoodsService;
import srm.supplier.service.InvoiceTitleService;
import srm.supplier.service.MainCustomerService;
import srm.supplier.service.MetarialService;
import srm.supplier.service.SupplierFileService;
import srm.supplier.service.SupplierMaterialSub1Service;

@Controller
@RequestMapping("supplier")
public class SupplierFileCtrl {
	@Autowired
	private SupplierFileService supplierFileSerivec;
	@Autowired
	private AttchedService attchedService; 
	@Autowired
	private InvoiceTitleService invoiceTitleService;
	@Autowired
	private DevicelistService devicelistService;
	@Autowired
	private MetarialService metarialService;
	@Autowired
	private MainCustomerService mainCustomerService;
	@Autowired
	private BankAccountService bankAccountService;
	@Autowired
	private CompetitorService competitorService;
	@Autowired
	private GoodsService goodsService;
	@Autowired
	private SupplierMaterialSub1Service supplierMaterialSub1Service;
	@Autowired
	private AppSupplierAccessLoopService appSupplierAccessLoopService;
	//准入评估流水
	@RequestMapping(value="/appSupplierAccessLoop.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> appSupplierAccessLoop(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,appSupplierAccessLoopService);
	}
	//供应商基本信息
	@RequestMapping(value="/supplierFile.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> supplierFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,supplierFileSerivec);
	}
	
	//公司注册附件 信息
	@RequestMapping(value="/attched.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> attched(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,attchedService);
	}
	
	/** 上传路径*/
	private final static String uploadFolderPath = WebUtil.getUpLoadFileRoot();
	@Autowired
	private SupplierInter supplierInter;
	/**
	* @Title: upAttchedFile 
	* @Description: 上传验厂报告和物料确认文档
	* @param @param request
	* @param @param response
	* @param @return
	* @param @throws Exception    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	@RequestMapping(value="/upAttchedFileForWs.srm",method = RequestMethod.POST)
    @ResponseBody
    public String upAttchedFileForWs(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	JSONObject json = new JSONObject();
    	json.put("success", true);
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台文件对象    
        String supplierAccessScore = request.getParameter("AccessScoreArray").toString();
        String company_id=request.getParameter("company_id");
        String file_name=request.getParameter("file_name");
        String record_id=request.getParameter("record_id");
        String login_id=request.getParameter("login_id");
        String bzsm=request.getParameter("bzsm");
        String type=request.getParameter("type");       
        String originalName=file.getOriginalFilename();
        String contentType= file.getContentType();
        Map<String,Object> params=new HashMap<String, Object>();
        if(type.equals("reportFile")){
        	String assess_dt = request.getParameter("assess_dt");//评估日期       
        	String company_out_id = request.getParameter("company_out_id");
            String head_audit = request.getParameter("head_audit");//主任审核人
            String zrdf = request.getParameter("zrdf");//准入得分
            params.put("assess_dt", assess_dt);
            params.put("head_audit", head_audit);
            params.put("zrdf", zrdf);
            params.put("supplierAccessScore", supplierAccessScore);
            params.put("company_out_id", company_out_id);
        }
        params.put("originalFilename", originalName);
        params.put("company_id", company_id);
        params.put("file_name", file_name);
        params.put("record_id", record_id);
        params.put("login_id", login_id);
        params.put("type", type);
        params.put("contentType", contentType);
        params.put("bzsm", bzsm);      
        String jsonmap=MyJsonUtil.obj2string(params);
        InputStream inputStream = null;
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("msg", "文件太大，超过10M");
				return json.toString() ;	
			} 
	        inputStream = file.getInputStream();
	        //获取文件字节
            byte[] buffer =  IOUtils.toByteArray(inputStream);
            inputStream.close();      
            String result=supplierInter.getSaveFileCommon(buffer, jsonmap);
            CXFResponse<SupplierCheckfactoryReport> sf=MyJsonUtil.str2CXFResponse(result, SupplierCheckfactoryReport.class);
    		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
    			params.putAll(sf.getParams());
    			
    		}else {
    			throw new CXFRequestException(sf.getErrorMessage());
    		}
        }else{
        	json.put("msg", "文件不存在");
        }
        return json.toString();
    }
    @RequestMapping(value="/upAttchedFile.srm",method = RequestMethod.POST)
    @ResponseBody
    public String upAttchedFile(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	JSONObject json = new JSONObject();
    	json.put("success", true);
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台文件对象       
        String company_id=request.getParameter("company_id");
        String file_name=request.getParameter("file_name");
        String partPath=request.getParameter("partPath");
        if(partPath==null||partPath=="")
        {
        	partPath="register";
        }
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
	        //中间部分自定义文件路径
            String partfolder=partPath+"/"+company_id+"/";//getpartPathfolder(company_id);
           //文件存放路径
            String folder=uploadFolderPath+partfolder;
            File newFile = new File(folder);
            if(!newFile.exists()){
              newFile.mkdirs();
            }
            String originalName=file.getOriginalFilename();
            String newName=originalName;
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmss");
            //上传的是图片，判断是否符合图片类型
            if(isimg)
            {
            	boolean flag=false;//默认不 是图片
            	if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            		String this_suffix=originalName.substring(originalName.lastIndexOf("."));
                	
                	for(String suffix:Const.imgArray){
                		if(suffix.equalsIgnoreCase(this_suffix)){
                			flag=true;
                			break;
                        }
                	}
                	newName=file_name+df.format(new Date())+originalName.substring(originalName.lastIndexOf("."));
            	}
            	//与常用的图片类型不匹配
            	if(!flag)
            	{
            		json.put("msg", "当前上传的不是图片");
    				return json.toString() ;
            	}
            }
            //其他类型文件
            else{
            	//获取文件后缀，与传过来的参数file_name重新组装文件名
                if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
                	newName=file_name+df.format(new Date())+originalName.substring(originalName.lastIndexOf("."));
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
            json.put("file_path", partfolder+newName);
            outputStream.close();
            inputStream.close();          
        }else{
        	json.put("msg", "文件不存在");
        }
        return json.toString();
    }
    @RequestMapping(value="/downloadAttched.srm",method=RequestMethod.GET)
    @ResponseBody
	public  void downloadAttched(HttpServletRequest request,HttpServletResponse response ) throws Exception {
    	//String id=request.getParameter("id");
		//获取文件对象，因为文件路径可能包含无法识别的字符，所以不传路径，传递附件id
		//Attched attched=attchedService.getFilePathByPathAndId(Integer.valueOf(id));
		//String file_path=attched.getFile_path();
		//因预览功能在保存之前，所有用ID不合适，改用file_path
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
	            // 获得文件名
	            // 定义输出类型(下载)
	            response.setContentType("application/octet-stream; charset=utf-8");
	            //如果是图片
	            if(isimg)
	            {
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
	                //文件类型为图片类型
	                if(flag){
	                	response.setContentType("image/*");
	                }
	            }
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

	            byte[] buffer = new byte[2048];
	            int i = -1;
	            while ((i = in.read(buffer)) != -1) {
	                out.write(buffer, 0, i);
	            }

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
    @RequestMapping(value="/deleteAttchedByPath.srm",method = RequestMethod.POST)
    @ResponseBody
	public String deleteAttchedByPath(HttpServletRequest request,HttpServletResponse response) throws Exception {
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
    
  //公司发票抬头 信息
  	@RequestMapping(value="/invoiceTitle.srm",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> invoiceTitle(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,invoiceTitleService);
  	}
  	
  //公司主要设备明细 信息
  	@RequestMapping(value="/devicelist.srm",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> devicelist(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,devicelistService);
  	}
  	
  //公司产品主要用料表
  	@RequestMapping(value="/metarial.srm",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> metarial(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,metarialService);
  	}
  	
  //公司主要客户
  	@RequestMapping(value="/mainCustomer.srm",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> mainCustomer(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,mainCustomerService);
  	}
  //公司银行账号
  	@RequestMapping(value="/bankAccount.srm",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> bankAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,bankAccountService);
  	}
  //公司主要竞争对手
  	@RequestMapping(value="/competitor.srm",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> competitor(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,competitorService);
  	}
  //公司产品表
  	@RequestMapping(value="/goods.srm",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> goods(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,goodsService);
  	}
  	//组装文件路径
	public static String getpartPathfolder(String company_id) {
		return "register/"+company_id+"/";
	}
	//厂商类别最末级子类别
	@RequestMapping(value="/SupplierMaterialSub1.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> supplierMaterialSub1(HttpServletRequest request,HttpServletResponse response) throws Exception{
			
		return WebUtil.DynamicCallCURD(request,response,supplierMaterialSub1Service);
	}
}

