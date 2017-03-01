package erp.util;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import erp.common.model.Code;
import erp.common.service.CodeService;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.CellFormat;
import jxl.format.VerticalAlignment;
import jxl.write.DateTime;
import jxl.write.Label;
import jxl.write.NumberFormat;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import net.sf.json.JSONObject;
public class ExcelUtils {
	private static Workbook wb;
	private static WritableWorkbook workbook;
	private static WritableSheet sheet;
	
	private static CodeService codeService=WebUtil.getAppCtx().getBean(CodeService.class); 
	public  final static String  exportExcel2007(JSONObject filedTitle , List<?> listContent) throws Exception
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String fileName=sdf.format(new Date())+".xlsx";
		//路径不存在则创建路径
		if(!(new File(Const.TEMPPATH).isDirectory()))
			new File(Const.TEMPPATH).mkdir();
		FileOutputStream os = new FileOutputStream( Const.TEMPPATH+fileName); 
		String result=CreateExcelFile2007(os,fileName,filedTitle,listContent);
		if(result.equals("OK"))
			return fileName;
		else
			return result;
	}
	public  final static String  exportExcel(JSONObject filedTitle , List<?> listContent) throws Exception
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String fileName=sdf.format(new Date())+".xls";
		//路径不存在则创建路径
		if(!(new File(Const.TEMPPATH).isDirectory()))
			new File(Const.TEMPPATH).mkdir();
		FileOutputStream os = new FileOutputStream( Const.TEMPPATH+fileName); 
		String result=CreateExcelFile(os,fileName,filedTitle,listContent);
		if(result.equals("OK"))
			return fileName;
		else
			return result;
	}
	public final static String CreateExcelFile(FileOutputStream os,String fileName,JSONObject filedTitle , List<?> listContent){
		String result="OK";  
		//用于缓冲基本信息表的MAP
		Map<String,Object> codeMap=new HashMap<String,Object>();
		try {      
			   //定义输出流，以便打开保存对话框_______________________end  
			  
			   /** **********创建工作簿************ */  
			   WritableWorkbook workbook = Workbook.createWorkbook(os);  
			  
			   /** **********创建工作表************ */  
			   WritableSheet sheet = workbook.createSheet("Sheet1", 0);  
			   
			   /** **********设置纵横打印（默认为纵打）、打印纸***************** */  
			   jxl.SheetSettings sheetset = sheet.getSettings();  
			   sheetset.setProtected(false);  
			   
			  
			   /** ************设置单元格字体************** */  
			   WritableFont NormalFont = new WritableFont(WritableFont.ARIAL, 10);  
			   WritableFont BoldFont = new WritableFont(WritableFont.ARIAL, 11,WritableFont.BOLD);  
			  
			   /** ************以下设置三种单元格样式，灵活备用************ */  
			   // 用于标题居中  
			   WritableCellFormat wcf_center = new WritableCellFormat(BoldFont);  
			   wcf_center.setBorder(Border.ALL, BorderLineStyle.THIN); // 线条  
			   wcf_center.setBackground(jxl.format.Colour.YELLOW2);	//设置背景色
			   wcf_center.setVerticalAlignment(VerticalAlignment.CENTRE); // 文字垂直对齐  
			   wcf_center.setAlignment(Alignment.CENTRE); // 文字水平对齐  
			   wcf_center.setWrap(false); // 文字是否换行  
			   // 用于正文居左  
			   WritableCellFormat wcf_left = new WritableCellFormat(NormalFont);  
			   wcf_left.setBorder(Border.ALL, BorderLineStyle.THIN); // 线条  
			   wcf_left.setVerticalAlignment(VerticalAlignment.CENTRE); // 文字垂直对齐  
			   wcf_left.setAlignment(Alignment.LEFT); // 文字水平对齐  
			   wcf_left.setWrap(false); // 文字是否换行     
			   /** ***************以下是EXCEL开头大标题，暂时省略********************* */  
			   //sheet.mergeCells(0, 0, colWidth, 0);  
			   //sheet.addCell(new Label(0, 0, "XX报表", wcf_center));  
			   /** ***************以下是EXCEL第一行列标题********************* */  
			   int i=0;
			   String key;
			   Iterator it = filedTitle.keys();
			   while (it.hasNext()) {  
				  key= (String)it.next();
				  sheet.addCell(new Label(i++, 0,filedTitle.getString(key),wcf_center));  
				  
			   }     
			   /** ***************以下是EXCEL正文数据********************* */  
			   Field[] fields=null;  
			   i=1;  
			   int len=0;
			   for(Object obj:listContent){  
			       fields=obj.getClass().getDeclaredFields();  
			       int j=0;  
			       //按前台传入的次序写入Excel;
			       Iterator keys = filedTitle.keys();
			       //遍历字段头
			       while (keys.hasNext()) {  
			    	  key= (String)keys.next();
			    	  //已经标记位；
			    	  boolean sts=false;
			       for(Field v:fields){  
			    	   //若字段不相等
			    	   if(!key.equals(v.getName()))
			    		   continue;
			    	   //已经写过一次就不用再循环比较了
			    	   if(sts)
			    		   break;
			    	   //第一次相等的时候把标记位置成true
			    	   sts=true;
			    	   v.setAccessible(true);  
		    		   Object va=v.get(obj);
			    	   //若字段渲染属性不为空的情况
		    		   String render;
		    		   try{
		    		    render=filedTitle.get(v.getName()+"_render").toString();
		    		   }catch(NullPointerException e){
		    			   render="";
		    		   }
		    		   if(!WebUtil.isEmpty(render))
			    	   {
			    		   //为减少与数据库的多次交互，故设计在TYPE_CODE找不到的情况下，才把数据先缓冲到内存中
//			    		   params.put("value", va);
			    		   if(WebUtil.isEmpty(codeMap.get(render))){
			    			   Map<String,Object> params=new HashMap<String,Object>();
			    			   params.put("type_code", render);
			    			   codeMap.put(render, codeService.getCodeList(params));
			    		   }
			    		   List<Code> list=(List<Code>) codeMap.get(render);
			    		   for(Code cd : list){
			    			   if(cd.getValue().equals(va))
			    				   va=cd.getName();
			    		   }
//			    		   if(list.size()>0)
//			    		   	va=list.get(0).getName();
			    	   }
			    	   
			    	   if(va==null){  
			               va="";  
			           }  
			           len=filedTitle.get(v.getName()).toString().trim().length()*3;
			           int slen=va.toString().trim().length()*3;
			           sheet.setColumnView(j, slen<len?len:slen);
			    	   if(!"".equals(va)){
			    		   if(v.getName().equals("kjlx")){
			        		   if(Integer.valueOf(va.toString())==0){
			        			   sheet.addCell(new Label(j, i,"主控件"));  
			        		   }else{
			        			   sheet.addCell(new Label(j, i,"辅控价"));  
			        		   }
			        		   continue;
			        	   }
			           		//处理日期类型
				           if(v.getType().equals(java.util.Date.class))
				           {
				        	   SimpleDateFormat ds = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				        	   String aa=ds.format(va);
				        	   //解决时区问题
				        	   jxl.write.DateFormat df = new jxl.write.DateFormat("yyyy-MM-dd"); 
				        	   jxl.write.WritableCellFormat wcfDF = new jxl.write.WritableCellFormat(df); 
				        	   jxl.write.DateTime data=new DateTime(j, i,ds.parse(aa), wcfDF);
				        	   sheet.setColumnView(j,len);
				        	   sheet.addCell(data); 
				           }else  
				           //处理整形
				           if(v.getType().toString().equals("int")||v.getType().equals(java.lang.Integer.class)){
				        	   NumberFormat nf = new jxl.write.NumberFormat("###");
				        	   wcf_left=new WritableCellFormat(NormalFont, nf);
				        	   jxl.write.Number number = new jxl.write.Number(j, i,Integer.valueOf(va.toString()));
				        	   sheet.addCell(number);  
				           }else
				           //处理double和float
				           if(v.getType().toString().equals("double")||v.getType().equals(java.lang.Double.class)){
				        	   NumberFormat nf = new jxl.write.NumberFormat("###.#######");
				        	   wcf_left=new WritableCellFormat(NormalFont, nf);
				        	   jxl.write.Number number = new jxl.write.Number(j, i,Double.valueOf(va.toString()));
				        	   //number.setCellFormat(wcf_left);
				        	   sheet.addCell(number);  
				           }else{
				    		   sheet.addCell(new Label(j, i,va.toString(),wcf_left));  
				    	   }
			    	   }
			       }
			       	j++;
			       }
			       i++;  
			   }  
			   /** **********将以上缓存中的内容写到EXCEL文件中******** */  
			   workbook.write();  
			   /** *********关闭文件************* */  
			   workbook.close();   
			   os.close();
			  } catch (Exception e) {  
				   result="系统提示：Excel文件导出失败，原因："+ e.toString();  
				   System.out.println(result);   
				   e.printStackTrace();  
			  }  
			  return result;  
	}
		
	 /*************************************************************************** 
	  * @param fileName EXCEL文件名称 
	  * @param listTitle EXCEL文件第一行列标题集合 
	  * @param listContent EXCEL文件正文数据集合 
	  * @return 
	  */  
	public  final static String exportExcel(HttpServletResponse response,String fileName,JSONObject filedTitle , List<?> listContent) throws Exception{  
	  
	  // 以下开始输出到EXCEL  
	  //定义输出流，以便打开保存对话框______________________begin  
	   OutputStream os =response.getOutputStream();// 取得输出流        
	   response.reset();// 清空输出流        
	   response.setHeader("Content-disposition", "attachment; filename="+ new String(fileName.getBytes("GB2312"),"iso8859-1"));  
	// 设定输出文件头        
	   response.setContentType("application/msexcel");// 定义输出类型   
	   return CreateExcelFile((FileOutputStream) os,fileName,filedTitle,listContent);
	}
	/* 
	 * Java文件操作 获取不带扩展名的文件名 
	 * 
	 *  Created on: 2015-11-19 
	 *      Author: 华慧 
	 */  
	    public static String getFileNameNoEx(String filename) {   
	        if ((filename != null) && (filename.length() > 0)) {   
	            int dot = filename.lastIndexOf('.');   
	            if ((dot >-1) && (dot < (filename.length()))) {   
	                return filename.substring(0, dot);   
	            }   
	        }   
	        return filename;   
	    }   
	public static boolean getWorkBook(InputStream is,OutputStream os) throws Exception{
		try {
			wb = Workbook.getWorkbook(is);
			workbook = Workbook.createWorkbook(os, wb);
		} catch (Exception e) {
			e.printStackTrace();
			try {
				workbook.write();
				workbook.close();
				wb.close();
			} catch (WriteException e1) {
				e.printStackTrace();
			}
			return false;
		}
		return true;
	}
	public final static String CreateExcelFile2007(FileOutputStream os,String fileName,JSONObject filedTitle , List<?> listContent){
		String result="OK";  
		//用于缓冲基本信息表的MAP
		Map<String,Object> codeMap=new HashMap<String,Object>();
		try {      
			   //定义输出流，以便打开保存对话框_______________________end  
			  
			   /** **********创建工作簿************ */  
			   SXSSFWorkbook wb = new SXSSFWorkbook();  
			  
			   /** **********创建工作表************ */  
			   Sheet sheet = wb.createSheet();  
			   
			   /** ************样式设置************** */  
	           Font headFont = wb.createFont();
	           headFont.setFontHeightInPoints((short) 11);// 大小
	           //headFont.setBoldweight(Font.BOLDWEIGHT_BOLD);// 粗体显示
	           headFont.setFontName("Arial");
	 
	           CellStyle headStyle = wb.createCellStyle();
	 
	           headStyle.setFont(headFont);
	 
	           headStyle.setAlignment(CellStyle.ALIGN_CENTER);// 设置单元格水平方向对其方式
	           headStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER); // 设置单元格垂直方向对其方式
	           headStyle.setBorderTop(CellStyle.BORDER_THIN);
	           headStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
	           headStyle.setBorderLeft(CellStyle.BORDER_THIN); // 左边边框
	           headStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex()); // 左边边框颜色
	           headStyle.setBorderRight(CellStyle.BORDER_THIN); // 右边边框
	           headStyle.setRightBorderColor(IndexedColors.BLACK.getIndex()); // 右边边框颜色
	           headStyle.setBorderBottom(CellStyle.BORDER_THIN); // 下边框
	           headStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex()); // 下边框颜色
	           headStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
	           headStyle.setFillPattern(CellStyle.SOLID_FOREGROUND); // 前景色
	           headStyle.setWrapText(false);// 自动换行
	           //XLS内容样式  body style
	           //时间
	           CellStyle timeStyle = wb.createCellStyle();
	           Font bodyfont = wb.createFont();
	           bodyfont.setFontHeightInPoints((short) 10);
	           bodyfont.setFontName("Arial");
	           timeStyle.setFont(bodyfont);
	           timeStyle.setAlignment(CellStyle.ALIGN_CENTER);
	           timeStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
	           timeStyle.setBorderLeft(CellStyle.BORDER_THIN); // 左边边框
	           timeStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex()); // 左边边框颜色
	           timeStyle.setBorderRight(CellStyle.BORDER_THIN); // 右边边框
	           timeStyle.setRightBorderColor(IndexedColors.BLACK.getIndex()); // 右边边框颜色
	           timeStyle.setBorderBottom(CellStyle.BORDER_THIN); // 下边框
	           timeStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex()); // 下边框颜色
	           timeStyle.setWrapText(false);// 自动换行
	           timeStyle.setAlignment(CellStyle.ALIGN_CENTER);
	           
	           //数字
	           CellStyle numStyle = wb.createCellStyle();
	           numStyle.cloneStyleFrom(timeStyle);
	           numStyle.setAlignment(CellStyle.ALIGN_RIGHT);
	           
	           //字符串
	           CellStyle strStyle = wb.createCellStyle();
	           strStyle.cloneStyleFrom(numStyle);
	           strStyle.setAlignment(CellStyle.ALIGN_LEFT);
	           
			   /** ***************以下是EXCEL开头大标题，暂时省略********************* */  
			   //sheet.mergeCells(0, 0, colWidth, 0);  
			   //sheet.addCell(new Label(0, 0, "XX报表", wcf_center));  
			   /** ***************以下是EXCEL第一行列标题********************* */  
			   int i=0;
			   String key;
			   Iterator it = filedTitle.keys();
			   Row sheetHeadRow = sheet.createRow(0);// 头标题
			   long start2003 = System.currentTimeMillis();
			   while (it.hasNext()) {  
				  key= (String)it.next();
				  Cell cell = sheetHeadRow.createCell(i);
				  cell.setCellValue(filedTitle.getString(key));
	              cell.setCellStyle(headStyle);
		    	  int len=filedTitle.getString(key).trim().length()*600;
		    	  sheet.setColumnWidth(i, len);
	              i++;
			   }     
			   /** ***************以下是EXCEL正文数据********************* */  
			   Field[] fields=null;  
			   i=1;  
			   int len=0;
			   for(Object obj:listContent){  
			       fields=obj.getClass().getDeclaredFields();  
			       int j=0;  
			       Row sheetRow = sheet.createRow(i);// sheet页数据行
			       //按前台传入的次序写入Excel;
			       Iterator keys = filedTitle.keys();
			       //遍历字段头
			       len=0;
			       while (keys.hasNext()) {
			    	  Cell cell = sheetRow.createCell(j);
			    	  key= (String)keys.next();
			    	  //已经标记位；
			    	  boolean sts=false;
				      for(Field v:fields){  
				    	   //若字段不相等
				    	   if(!key.equals(v.getName()))
				    		   continue;
				    	   //已经写过一次就不用再循环比较了
				    	   if(sts)
				    		   break;
				    	   //第一次相等的时候把标记位置成true
				    	   sts=true;
				    	   v.setAccessible(true);  
			    		   Object va=v.get(obj);
				    	   //若字段渲染属性不为空的情况
			    		   String render;
			    		   try{
			    			   render=filedTitle.get(v.getName()+"_render").toString();
			    		   }catch(NullPointerException e){
			    			   render="";
			    		   }
			    		   if(!WebUtil.isEmpty(render))
				    	   {
				    		   //为减少与数据库的多次交互，故设计在TYPE_CODE找不到的情况下，才把数据先缓冲到内存中
	//			    		   params.put("value", va);
				    		   if(WebUtil.isEmpty(codeMap.get(render))){
				    			   Map<String,Object> params=new HashMap<String,Object>();
				    			   params.put("type_code", render);
				    			   codeMap.put(render, codeService.getCodeList(params));
				    		   }
				    		   List<Code> list=(List<Code>) codeMap.get(render);
				    		   for(Code cd : list){
				    			   if(cd.getValue().equals(va))
				    				   va=cd.getName();
				    		   }
	//			    		   if(list.size()>0)
	//			    		   	va=list.get(0).getName();
				    	   }
				    	   
				    	   if(va==null){  
				               va="";  
				           }
				    	   if(!"".equals(va)){
				    		   if(v.getName().equals("kjlx")){
				        		   if(Integer.valueOf(va.toString())==0){
				        			   cell.setCellValue("主控件");
				        			   cell.setCellStyle(strStyle);
				        		   }else{
				        			   cell.setCellValue("辅控价");
				        			   cell.setCellStyle(strStyle);
				        		   }
				        		   continue;
				        	   }
				           		//处理日期类型
					           if(v.getType().equals(java.util.Date.class))
					           {
					        	   SimpleDateFormat ds = new SimpleDateFormat("yyyy-MM-dd");
					        	   String aa=ds.format(va);
					        	   cell.setCellValue(aa);
					        	   cell.setCellStyle(timeStyle);
					           }else  
					           //处理整形
					           if(v.getType().toString().equals("int")||v.getType().equals(java.lang.Integer.class)){
					        	   cell.setCellValue(Integer.valueOf(va.toString()));
					        	   cell.setCellStyle(numStyle);
					           }else
					           //处理double和float
					           if(v.getType().toString().equals("double")||v.getType().equals(java.lang.Double.class)){
					        	   cell.setCellValue(Double.valueOf(va.toString()));
					        	   cell.setCellStyle(numStyle);
					           }else{
					        	   len=sheet.getColumnWidth(j);
						           int slen=va.toString().trim().getBytes().length*256;
						           if(len<slen&&slen<255*255){
						        	   len=slen;
						           };
						           // 设置列宽
					               sheet.setColumnWidth(j, len);
					        	   cell.setCellValue(va.toString().trim());
		                           cell.setCellStyle(strStyle);
					    	   }
				    	   }else{
				    		   cell.setCellValue("");
	                           cell.setCellStyle(strStyle);
				    	   }
				       }
				      //如果改字段在对象中不存在需要补空
				      if(!sts){
				    	  cell.setCellValue("");
                          cell.setCellStyle(strStyle);
				      }
			       	j++;
			       }
			       i++;  
			   }  
			   /** **********将以上缓存中的内容写到EXCEL文件中******** */  
			   wb.write(os);  
			   long end2003 = System.currentTimeMillis();
			   System.out.println("解析Excel2007完毕！共用时"+(end2003-start2003)+"毫秒！");
			   /** *********关闭文件************* */  
			   os.close();
			  } catch (Exception e) {  
				   result="系统提示：Excel文件导出失败，原因："+ e.toString();  
				   e.printStackTrace(); 
			  }  
			  return result;  
	}
}
