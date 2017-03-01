package erp.erp.master.caterialPricePurchase.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import erp.common.model.WebReturnObject;
import erp.erp.arrivalRegister.data.ArrivalRegisterMapper;
import erp.erp.master.caterialPricePurchase.service.CaterialPricePurchaseService;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.util.WebUtil;

@Controller
@RequestMapping("caterialpricepurchase")
public class CaterialPricePurchaseCtl {
	@Autowired
	private CaterialPricePurchaseService  caterialPricePurchaseService;
	/*功能：材料价格表
	 *作者：杜超
	 *时间：2016/03/01
	 * */
	@RequestMapping(value="/caterialpricepurchase.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getCaterialPricePurchase(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, caterialPricePurchaseService);
	}
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;
	@Autowired
	private ArrivalRegisterMapper amapper;
	//上传Excel
	private String tempFolderPath = "C:/ErpFile/Temp/";
	@RequestMapping(value="/updateMaterialCtrlPriceFromExcel.act",method = RequestMethod.POST)
	@ResponseBody
	public String upFileAndParseToExcel(HttpServletRequest request,HttpServletResponse response) throws IOException {
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("msg", "上传成功");
		   MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;      
		   CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台name 
		   String loginId=request.getParameter("loginId");
	       String czym=request.getParameter("czym");
	       InputStream inputStream = null;
	       OutputStream outputStream = null;
	       if(file!=null && file.getSize()>0){
	    	   if (file.getSize() > 1024*1024) {
					json.put("msg", "文件太大");
					return json.toString() ;	
				} 
	    	   inputStream = file.getInputStream();
	    	   
	    	   File newFile = new File(tempFolderPath);
	    	   if(!newFile.exists()){
		          newFile.mkdirs();
		       }
	    	   String OriginalFilename=file.getOriginalFilename();
	    	   //判断后缀
	    	   String suffix=OriginalFilename.substring(OriginalFilename.lastIndexOf("."));
	    	   if(!suffix.equalsIgnoreCase(".xls") && !suffix.equalsIgnoreCase(".xlsx")){
	    		    json.put("msg", "不是Excel文件");
					return json.toString() ;
	    	   }
	    	   File finalFile = new File(tempFolderPath+OriginalFilename);
	           outputStream = new FileOutputStream(finalFile);
	           
	           int readBytes = 0;
	           byte[] buffer = new byte[1024];
	           while ((readBytes = inputStream.read(buffer, 0, 1024)) != -1) {
	                    outputStream.write(buffer, 0, readBytes);
	            }
	            outputStream.close();
	            inputStream.close();
	            
	            WebReturnObject wro=new WebReturnObject();
	            UUID uuid = UUID.randomUUID(); 
        		String uuid1=uuid.toString().replace("-","");
        		Map<String,Object> params = new HashMap<String, Object>();
        		try{
	            	String fileName=finalFile.getName(); 
	            	boolean isE2007 = false;    //判断是否是excel2007格式  
	            	if(fileName.endsWith("xlsx")){
			        	isE2007 = true;
			        }
	            	InputStream input =new FileInputStream(finalFile);
	            	 Workbook wb  = null;
	            	//根据文件格式(2003或者2007)来初始化  
			         if(isE2007){  
			           wb = new XSSFWorkbook(input);  
			         }else{  
			           wb = new HSSFWorkbook(input);  
			         }    
			         Sheet sheet = wb.getSheetAt(0);     //获得第一个表单  
			         if(!sheet.iterator().hasNext()){
			            	json.put("msg", "数据为空");
			            	return json.toString(); 
			            }
			         for(Row row: sheet) {//获得行数据  	            	 
			                //跳过第一行，一般第一行是表头，
			        	 Integer rowNum=row.getRowNum();
			             Cell cellOne=row.getCell(0);
			             if(rowNum==0){
			            	 if(!cellOne.toString().trim().equals("材料控价导入")){
			            		 json.put("msg","文件格式错误,请使用导入模版！");
			            		 return json.toString();
			            	 }
			             }
			             //第三行开始
			             if(rowNum>1){
			            	 Cell cell_A=row.getCell(0);//材料货号
			            	 String clhh="";
			            	 if(cell_A!=null && !cell_A.toString().trim().equals("")){
			            		 clhh=cell_A.toString().replace(".0","");
			            	 }
			            	 
			            	 Cell cell_B=row.getCell(1);
			            	 double kzdj =0;
			            	 if(cell_B!=null && !cell_B.toString().trim().equals("")){
			            		 kzdj=Double.parseDouble(cell_B.toString());
			            	 }
			            	 
			            	 Cell cell_C=row.getCell(2);
			            	 double fzkj = 0;
			            	 if(cell_C!=null && !cell_C.toString().trim().equals("")){
			            		 fzkj = Double.parseDouble(cell_C.toString());
			            	 }
			            	 double yskzdj=0;
			            	 double ysfzkj=0;
			            	 int scount;
			            	 params.put("sql", "select COUNT(*) from clbmb where clhh ='"+clhh+"';");
			            	 String count = purchaseDetailMapper.getStringFromSql(params);
			            	 if(count==null){
			            		 scount = 0;
			            	 }else{
			            		 scount=Integer.parseInt(count);
			            	 }
			            	 if(scount>0){
			            	 String sql = " select kzdj from clbmb where clhh='"+clhh+"';";
			            	 params.put("sql",sql);
			            	 yskzdj = amapper.getdoubleFromSql(params);
			            	 sql = " select fzkj from clbmb where clhh='"+clhh+"';";
			            	 params.put("sql",sql);
			            	 ysfzkj = amapper.getdoubleFromSql(params);
			            	
			            	 if(kzdj!=yskzdj || fzkj!=ysfzkj){
			            		 sql = " insert into clkzdjjlb(clhh,kzdj,fzkj) values('"+clhh+"','"+kzdj+"','"+fzkj+"'); ";
			            		 params.put("sql",sql);
					             purchaseDetailMapper.getStringFromSql(params);
			            	 }
			            	 if(!clhh.trim().equals("")){
			            		 sql = "update clbmb set kzdj="+kzdj+",fzkj="+fzkj+" where clhh='"+clhh+"';";
			            		 params.put("sql",sql);
					             purchaseDetailMapper.getStringFromSql(params);
			            	 }
			            	}else{
			            		json.put("msg","Excel的材料货号不存在!");
			            		 return json.toString();
			            	}
			             }
			         } 
	            } catch (Exception e) {
					json.put("success", false);
					json.put("msg",e.getMessage());
					e.printStackTrace();
				}
	            finalFile.delete();
	       }else{
	        	json.put("msg", "文件不存在");
	        }
	       return json.toString();
	}
	@RequestMapping(value="/updateMaterialVendorCtrlPriceFromExcel.act",method = RequestMethod.POST)
	@ResponseBody
	public String upVendorFileAndParseToExcel(HttpServletRequest request,HttpServletResponse response) throws IOException {
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("msg", "上传成功");
		   MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;      
		   CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台name 
		   String loginId=request.getParameter("loginId");
	       String czym=request.getParameter("czym");

	       InputStream inputStream = null;
	       OutputStream outputStream = null;
	       if(file!=null && file.getSize()>0){
	    	   if (file.getSize() > 1024*1024) {
					json.put("msg", "文件太大");
					return json.toString() ;	
				} 
	    	   inputStream = file.getInputStream();
	    	   
	    	   File newFile = new File(tempFolderPath);
	    	   if(!newFile.exists()){
		          newFile.mkdirs();
		       }
	    	   String OriginalFilename=file.getOriginalFilename();
	    	   //判断后缀
	    	   String suffix=OriginalFilename.substring(OriginalFilename.lastIndexOf("."));
	    	   if(!suffix.equalsIgnoreCase(".xls") && !suffix.equalsIgnoreCase(".xlsx")){
	    		    json.put("msg", "不是Excel文件");
					return json.toString() ;
	    	   }
	    	   File finalFile = new File(tempFolderPath+OriginalFilename);
	           outputStream = new FileOutputStream(finalFile);
	           
	           int readBytes = 0;
	           byte[] buffer = new byte[1024];
	           while ((readBytes = inputStream.read(buffer, 0, 1024)) != -1) {
	                    outputStream.write(buffer, 0, readBytes);
	            }
	            outputStream.close();
	            inputStream.close();
	            
	            WebReturnObject wro=new WebReturnObject();
	            UUID uuid = UUID.randomUUID(); 
     		    String uuid1=uuid.toString().replace("-","");
      		    Map<String,Object> params = new HashMap<String, Object>();
      		  try{
      			String fileName=finalFile.getName();
				boolean isE2007 = false;    //判断是否是excel2007格式  
		        if(fileName.endsWith("xlsx")){
		        	isE2007 = true;
		        }                	         
				InputStream input =new FileInputStream(finalFile);
	            Workbook wb  = null;  
	            //根据文件格式(2003或者2007)来初始化  
	            if(isE2007){  
	                wb = new XSSFWorkbook(input);  
	            }else{  
	                wb = new HSSFWorkbook(input);  
	            }
	            Sheet sheet = wb.getSheetAt(0); 
	            if(!sheet.iterator().hasNext()){
	            	json.put("msg", "数据为空");
	            	return json.toString(); 
	            }
	            for(Row row: sheet) {  //获得行数据 
	            	Integer rowNum=row.getRowNum();
	            	Cell cellOne=row.getCell(0);
	            	if(rowNum==0){
	            		if(!cellOne.toString().trim().equals("材料厂商控价导入")){
	            			json.put("msg","文件格式错误,请使用导入模版！");
	            			return json.toString();
	            		}
	            	}
	            	if(rowNum>1){
	            		Cell cell_A=row.getCell(0);
	            		String clhh = "";
	            		if(cell_A!=null && !cell_A.toString().trim().equals("")){
		            		 clhh=cell_A.toString().replace(".0","");
		            	}
	            		Cell cell_B=row.getCell(1);
	            		String csbh = "";
	            		if(cell_B!=null && !cell_B.toString().trim().equals("")){
	            			csbh = cell_B.toString().replace(".0","");
	            		}
	            		Cell cell_C=row.getCell(2);
	            		double kzdj =0;
		            	if(cell_C!=null && !cell_C.toString().trim().equals("")){
		            		kzdj=Double.parseDouble(cell_C.toString());
		            	}
		            	Cell cell_D=row.getCell(3);
		            	double fzkj = 0;
		            	if(cell_D!=null && !cell_D.toString().trim().equals("")){
		            	    fzkj = Double.parseDouble(cell_D.toString());
		            	}
		            	int scount;int lcount;
		            	params.put("sql", "select count(*) from csxxb where csbh='"+csbh+"';");
		            	String count = purchaseDetailMapper.getStringFromSql(params);
		            	if(count==null){
		            		 scount = 0;
		            	}else{
		            		 scount=Integer.parseInt(count);
		            	}
		            	if(!clhh.equals("") && !csbh.equals("") &&(kzdj!=0 || fzkj!=0) && scount>0){
		            		params.put("sql", "select count(*)  from csjjb where clhh='"+clhh+"' and csbh='"+csbh+"';");
		            		count = purchaseDetailMapper.getStringFromSql(params);
		            		if(count==null){
		            			lcount = 0;
			            	}else{
			            		lcount=Integer.parseInt(count);
			            	}
		            		if(lcount>0){
		            			params.put("sql", "update csjjb set kzdj="+kzdj+",fzkj="+fzkj+",czym='"+czym+"',czsj=getdate() where clhh='"+clhh+"' and csbh='"+csbh+"';");
		            			purchaseDetailMapper.getStringFromSql(params);
		            		}else{
		            			params.put("sql", "insert into csjjb(clhh,csbh,kzdj,fzkj,czym,czsj) values ("+clhh+","+csbh+","+kzdj+","+fzkj+",'"+czym+"',getdate());");
		            			purchaseDetailMapper.getStringFromSql(params);
		            		}
		            		    params.put("sql", "insert csjjxxb(clhh,csbh,kzdj,fzkj,ghzq,zxbzl,zdcgl,csxh,bzsm,xgsj) select clhh,csbh,kzdj,fzkj,ghzq,zxbzl,zdcgl,csxh,bzsm,getdate() from csjjb where csbh='"+csbh+"' and clhh='"+clhh+"';");
		            		    purchaseDetailMapper.getStringFromSql(params);
		            	}
	            	}
	            }
      		  }catch (Exception e) {
					json.put("success", false);
					json.put("msg",e.getMessage());
					e.printStackTrace();
				}
	            finalFile.delete();
	       }else{
	        	json.put("msg", "文件不存在");
	        }
	       return json.toString();
	    }
}
