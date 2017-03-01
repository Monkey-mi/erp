package erp.erp.purchaseUrge.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.purchaseUrge.service.PurchaseUrgeService;
import erp.erp.purchaseUrge.service.PurchaseUrgeServiceWs;
import erp.util.WebUtil;
@Controller
@RequestMapping("purchaseurge")
public class PurchaseUrgeCtl {
	@Autowired
	private PurchaseUrgeService purchaseUrgeService;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购明细
	@Autowired
	private PurchaseUrgeServiceWs purchaseUrgeServiceWs;//采购追催平台
	/*功能：采购追催平台
	 *作者：伍恰
	 *时间：2016/08/25
	 * */
	@RequestMapping(value="/purchaseurgews.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchaseUrgeWs(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseUrgeServiceWs);
	}
	/*功能：采购追崔
	 *作者：伍恰
	 *时间：2016/05/05
	 * */
	@RequestMapping(value="/purchaseurge.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchaseUrge(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseUrgeService);
	}
	//上传Excel
	private String tempFolderPath = "C:/ErpFile/Temp/";
	@RequestMapping(value="/updateConfirmTimeFromExcel.act",method = RequestMethod.POST)
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
	        		String cgzc_drb="cgzc_drb"+uuid1;
	        		String cgzc_drb_hz="cgzc_drb_hz"+uuid1;
	            	String sql="  select space(20) as cgym,htbh,htxh,clhh,cltx1,space(10) as wkjq,space(10) as qrjq,space(255) as zczy,cgsl as ztsl,0 as jltj into "+cgzc_drb+" from htmxb where 0=1 ";
	            	Map<String,Object> params = new HashMap<String, Object>();
	            	params.put("sql",sql);
	            	purchaseDetailMapper.getStringFromSql(params);
	            	
					try {
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
			            for(Row row: sheet) {  //获得行数据  	            	 
			                //跳过第一行，一般第一行是表头，
			            	Integer rowNum=row.getRowNum();
			            	Cell cellOne=row.getCell(0);
			            	if(rowNum==0){
			            		if(!cellOne.toString().trim().equals("确认交期导入")){
			            			json.put("msg","文件格式错误,请使用导入模版！");
			            			return json.toString();
			            		}
			            	}
			            	if(rowNum>1){
				            	Cell cell_A=row.getCell(0);//合同编号
				            	int htbh=0;
				            	if(cell_A!=null){
				            		htbh=Integer.parseInt(cell_A.toString().replace(".0",""));
				            	}
				            	
				            	Cell cell_B=row.getCell(1);//序号
				            	int htxh=0;
				            	if(cell_B!=null){
				            		htxh=Integer.parseInt(cell_B.toString().replace(".0",""));
				            	}
				            	
				            	Cell cell_C=row.getCell(2);//材料货号
				            	int clhh=0;
				            	if(cell_C!=null){
				            		clhh=Integer.parseInt(cell_C.toString().replace(".0",""));
				            	}
				            	
				            	Cell cell_D=row.getCell(3);//材料特性
				            	String cltx1="";
				            	if(cell_D!=null){
				            		cltx1=cell_D.toString();
				            	}
				            	
				            	Cell cell_E=row.getCell(4);//追催数量
				            	double ztsl=0;
				            	if(cell_E!=null){
				            		ztsl=Double.parseDouble(cell_E.toString());
				            	}
				            	
				            	Cell cell_F=row.getCell(5);//物控交期
				            	String wkjq="";
				            	if(cell_F!=null){
				            		wkjq=cell_F.toString();
				            	}
				            	
				            	Cell cell_G=row.getCell(6);//确认交期
				            	String qrjq="";
				            	if(cell_G!=null){
				            		qrjq=cell_G.toString();
				            	}
				            	if(qrjq.equals("")){
				            		json.put("msg", "导入文件中第"+rowNum+1+"行记录未输入确认交期，请重新确认！");
				            		return json.toString();
				            	}
				            	Cell cell_H=row.getCell(7);//追催摘要
				            	String zczy="";
				            	if(cell_H!=null){
				            		zczy=cell_H.toString();
				            	}
				            	
				            	Cell cell_I=row.getCell(8);//采购员名
				            	String cgym="";
				            	if(cell_I!=null){
				            		cgym=cell_I.toString().trim();
				            	}
				            	
				            	Cell cell_J=row.getCell(9);//记录条件
				            	long jltj=0;
				            	if(cell_J!=null){
				            		jltj=Long.parseLong(cell_J.toString());
				            	}
				            	
				            	//写入数据
				            	sql="  insert into "+cgzc_drb+"(cgym,htbh,htxh,clhh,cltx1,wkjq,qrjq,zczy,ztsl,jltj) values ('"+cgym+"','"+htbh+"','"+htxh+"','"+clhh+"','"+cltx1+"','"+wkjq+"','"+qrjq+"','"+zczy+"','"+ztsl+"','"+jltj+"'); ";
				            	params.put("sql",sql);
				            	purchaseDetailMapper.getStringFromSql(params);
				            	
				            	//刷新采购员
				            	sql="  update "+cgzc_drb+" set cgym=cgyb.cgybh from "+cgzc_drb+" a left outer join cgyb on cgyb.cgyxm=a.cgym; ";
				            	params.put("sql",sql);
				            	purchaseDetailMapper.getStringFromSql(params);
				            	
				            	
				            	sql=" select * into "+cgzc_drb_hz+" from "+cgzc_drb;
				            	params.put("sql",sql);
				            	purchaseDetailMapper.getStringFromSql(params);		
				            	
				            	sql=" delete from "+cgzc_drb+" where htxh=0; ";
				            	params.put("sql",sql);
				            	purchaseDetailMapper.getStringFromSql(params);	
				            	
				            	sql=" insert into "+cgzc_drb+"(htbh,htxh,clhh,cltx1,wkjq,qrjq,zczy,ztsl,jltj)  ";
				            	sql+="	select "+cgzc_drb_hz+".htbh,htmxb.htxh,"+cgzc_drb_hz+".clhh,"+cgzc_drb_hz+".cltx1,htmxb.wkjq,"+cgzc_drb_hz+".qrjq,"+cgzc_drb_hz+".zczy,case when isnull(htmxb.cgsl,0) - isnull(htmxb.dhrk,0)>0 then isnull(htmxb.cgsl,0) - isnull(htmxb.dhrk,0) else 0 end,"+cgzc_drb_hz+".jltj ";
				            	sql+=" from "+cgzc_drb_hz+" ";
				            	sql+=" inner join htmxb on "+cgzc_drb_hz+".htbh=htmxb.htbh and "+cgzc_drb_hz+".clhh=htmxb.clhh and "+cgzc_drb_hz+".cltx1=htmxb.cltx1 and "+cgzc_drb_hz+".wkjq=isnull(convert(char(10),htmxb.wkjq,102),'') ";
				            	sql+=" left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
				            	sql+=" left outer join view_qtqljlmx_maxht with (nolock) on view_qtqljlmx_maxht.htbh=htmxb.htbh and view_qtqljlmx_maxht.htxh=htmxb.htxh ";
				            	sql+=" left outer join qtqljlmxb with (nolock) on qtqljlmxb.qldh=view_qtqljlmx_maxht.qldh and qtqljlmxb.qlxh=view_qtqljlmx_maxht.qlxh ";
				            	sql+=" and "+cgzc_drb_hz+".cltx1=htmxb.cltx1 and "+cgzc_drb_hz+".wkjq=convert(char(10),htmxb.wkjq,102)";
				            	sql+=" where cghtb.gdbj=0 and htmxb.wcbj=0 and htmxb.zzbj=0 and htmxb.qdbj=0 and cghtb.cgym="+cgzc_drb_hz+".cgym and";
				            	sql+=" (("+cgzc_drb_hz+".jltj=0 and qtqljlmxb.hfyj is not null and qtqljlmxb.hfyj='' ) ";
				            	sql+=" or ("+cgzc_drb_hz+".jltj=1)); ";
				            	params.put("sql",sql);
				            	purchaseDetailMapper.getStringFromSql(params);	
				            	
				            	sql=" insert into cgzcjlb(htbh,htxh,jlxh,ztsl,yjdh,qrjq,lxbh,ycyy,czrm,czsj) ";
				            	sql+=" select htbh,htxh,(select isnull(max(jlxh),0)+1 from cgzcjlb where cgzcjlb.htbh = "+cgzc_drb+".htbh and  cgzcjlb.htxh = "+cgzc_drb+".htxh),ztsl,qrjq,qrjq,'',zczy,'"+czym+"',getdate()  "; 
				            	sql+=" from "+cgzc_drb+" where htxh<>0 ; ";
				            	params.put("sql",sql);
				            	purchaseDetailMapper.getStringFromSql(params);	
				            	
				            	sql=" update htmxb set qrjq="+cgzc_drb+".qrjq,zczy="+cgzc_drb+".zczy ,zxqrsj =getdate(),zxqrrm = '"+czym+"'  ";
				            	sql+="	from "+cgzc_drb+" where "+cgzc_drb+".htbh=htmxb.htbh and "+cgzc_drb+".htxh=htmxb.htxh; " ;
				            	params.put("sql",sql);
				            	purchaseDetailMapper.getStringFromSql(params);	
				            	
				            	json.put("msg","导入完成");
			            	}
			            }  	 
			            
					} catch (Exception e) {
						json.put("success", false);
						json.put("msg",e.getMessage());
						e.printStackTrace();
					}
		            finalFile.delete();
		            
		            sql="  drop table "+cgzc_drb;
	            	params.put("sql",sql);
	            	purchaseDetailMapper.getStringFromSql(params);
	            	
	            	sql=" drop table "+cgzc_drb_hz+" ";
	            	params.put("sql",sql);
	            	purchaseDetailMapper.getStringFromSql(params);
	            	
	            	
		        }else{
		        	json.put("msg", "文件不存在");
		        }
		        return json.toString();
		    }
}
