package srm.supplierAccess.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.outsideasy.ws.erp.supplier.SupplierAccessInter;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.Const;
import erp.util.WebUtil;

import srm.supplierAccess.service.AccessBasetableService;
import srm.supplierAccess.service.OutsideInformationService;
import srm.supplierAccess.service.SupplierAccessScoreService;
import srm.supplierAccess.service.SupplierAccessUploadImgService;
import srm.supplierAccess.service.SupplierAccessScoreSummaryService;
import srm.supplierAccess.service.SupplierAccessScoreDetailsService;
import srm.supplierAccess.service.WsCommonService;

@Controller
@RequestMapping("supplierAccess")
public class SupplierAccessController {
	@Autowired
	private AccessBasetableService accessBasetableService;
	@Autowired
	private SupplierAccessScoreService supplierAccessScoreService;
	@Autowired
	private SupplierAccessUploadImgService supplierAccessUploadImgService;
	@Autowired
	private SupplierAccessScoreSummaryService supplierAccessScoreSummaryService;
	@Autowired
	private SupplierAccessScoreDetailsService supplierAccessScoreDetailsService;
	@Autowired
	private WsCommonService wsCommonService;
	@Autowired
	private SupplierInter supplierInter;
	@Autowired
	private SupplierAccessInter supplierAccessInter;
	@Autowired
	private OutsideInformationService outsideInformationService;
	/***
	 * 从wsMongdb获取文件
	 * @param request
	 * @param response
	 * @throws Exception
	 */
    @RequestMapping(value="/downloadFromMongdbAttched.srm",method=RequestMethod.GET)
    @ResponseBody
	public  void downloadFromMongdbAttched(HttpServletRequest request,HttpServletResponse response ) throws Exception {
    	String objID=request.getParameter("file_path");
    	boolean isimg=false;
        String strisimg=request.getParameter("isimg");
        String fileName=request.getParameter("fileName");
        if(fileName==null){
        	fileName="";
        }
        if(strisimg!=null){
        	isimg=Boolean.valueOf(strisimg);
        }
		if(objID!=null){
	            // 获得文件名
	            // 定义输出类型(下载)
	            //response.setContentType("application/octet-stream; charset=utf-8");
	            response.setContentType("application/octet-stream");
	            response.setHeader("Location", fileName);
	            //如果是图片
	            if(isimg)
	            {
	                //文件类型为图片类型
	                response.setContentType("image/*");
	            }else{
	            	 if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0) {  
	 	            	fileName = URLEncoder.encode(fileName, "UTF-8");  
	 		        } else {  
	 		        	fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1");  
	 		        }
	            	// 定义输出文件头
	 	            response.setHeader("Content-Disposition", "attachment;filename="+ fileName);
	            }
	            OutputStream out = null;
	            out = response.getOutputStream();
	            byte[] in1=supplierAccessInter.retrieveFileOne(objID);
	            if(in1!=null){
		            out.write(in1);
		            out.flush();
		            out.close();
		            return;
	            }else{
	            	response.setContentType("text/html; charset=utf-8");
	               	out.write("文件不存在".getBytes("utf-8"));
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
	/***
	 * 从ws获取文件
	 * @param request
	 * @param response
	 * @throws Exception
	 */
    @RequestMapping(value="/downloadAttched.srm",method=RequestMethod.GET)
    @ResponseBody
	public  void downloadAttched(HttpServletRequest request,HttpServletResponse response ) throws Exception {
    	String file_path=request.getParameter("file_path");
    	String uploadFolderPath=WebUtil.getUpLoadFileRoot();
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

	            byte[] buffer = new byte[2048];
	            byte[] in1=supplierInter.downloadAttched(file_path, isimg);
	            int i = -1;
	            if(in1!=null){
		            out.write(in1);
		            out.flush();
		            out.close();
		            return;
	            }else{
	            	response.setContentType("text/html; charset=utf-8");
	               	out.write("文件不存在".getBytes("utf-8"));
	               	out.flush();
	                out.close();
	                return;
	            }
	        }
		}
       	response.setContentType("text/html; charset=utf-8");
       	OutputStream out = response.getOutputStream();
       	out.write("文件不存在".getBytes("utf-8"));
       	out.flush();
        out.close();
	}
	/**
	 *ws通用*/
	@RequestMapping(value="/common.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Common(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,wsCommonService);
	}
	//新供应商准入评估模板表
	@RequestMapping(value="/AccessBasetable.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,accessBasetableService);
	}
	//新供应商准入细则评估打分表
	@RequestMapping(value="/SupplierAccessScore.srm",method=RequestMethod.POST)
	@ResponseBody 
		public Map<String,Object> ModulesAccessScore(HttpServletRequest request,HttpServletResponse response) throws Exception{
			return WebUtil.DynamicCallCURD(request,response,supplierAccessScoreService);
		}
	//准入评估图片上传表
	@RequestMapping(value="/SupplierAccessUploadImg.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesUploadImg(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,supplierAccessUploadImgService);
	}
	//准入评估分数汇总信息
	@RequestMapping(value="/SupplierAccessScoreSummary.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesAccessScoreSummary(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,supplierAccessScoreSummaryService);
	}
	//准入评估明细查看，多表组合
	@RequestMapping(value="/SupplierAccessScoreDetails.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesAccessScoreDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,supplierAccessScoreDetailsService);
	}
	@RequestMapping(value="/currencyName.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> CurrencyName(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,outsideInformationService);
	}
}
