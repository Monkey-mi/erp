/**
 *  @date 2016-5-26下午5:29:45
 *  @file TransUtil.java
 *  @author:shufei
 *  
 */
package erp.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * <p>Title: TransUtil</p>
 * <p>Description: erp</p>
 * <p>Company: topsun</p> 
 * @author 舒飞
 * @date 2016-5-26下午5:29:45
 */
public class TransUtil {

		 // 获取当天是星期几  
		  public static int getNowMinute(long time){  
		         int week = 1;  
		         Date date = new Date(time);   
		         Calendar calendar = Calendar.getInstance();  
		         calendar.setTime(date);  
		         week = calendar.get(Calendar.MINUTE);  
		         return week;  
		  }  
		// 获取当天是这个月的第几天  
		  public static int getNowMonth(long time){  
		         int month = 1;  
		         Date date = new Date(time);   
		         Calendar calendar = Calendar.getInstance();   
		         calendar.setTime(date);  
		         month = calendar.get(Calendar.WEEK_OF_MONTH);  
		         return month;  
		  }  
		// 获取当天是第几个月  
		  public static int getNMonth(long time){  
		         int month = 1;  
		         Date date = new Date(time);   
		         TimeZone china=TimeZone.getTimeZone("GMT+08:00"); //时区设置  
		         Calendar calendar = Calendar.getInstance(china);   
		         calendar.setTime(date);  
		         month = calendar.get(Calendar.MONTH);  
		         return month;  
		}  
		// int转换为String类型
		  public static String intTransToString(int value){
			  String i = String.valueOf(value);
			  return i;
		  }
		// String转换为int类型
		  public static int stringTransToInt(String value){
			   int i = Integer.parseInt(value);
			   return i;
			  }
	    // repalce		  
		  public static String replaceOTO(String a,String b,String c){
			  String i = a.replace(b, c);
			  return i;
		  }
	    //根据年月获取当月最大天数
		  public static int getDaysByYearMonth(int year,int month){
			  Calendar a = Calendar.getInstance();//该方法返回一个日历Calendar
			  a.set(Calendar.YEAR, year);
			  a.set(Calendar.MONTH, month - 1); 
			  a.set(Calendar.DATE, 1); 			  
			  a.roll(Calendar.DATE, -1);
			  int maxDays = a.get(Calendar.DATE);
			  return maxDays;			  
		  }
		 //字符串日期转为Date类型
		  public static Date StringTransDate(String date){
			  SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");			  
				Date newDate;
				try {
					newDate = formatter.parse(date);
					return newDate;
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					return null;
				}
			
			   
		  }
		  //日期转换为字符串
		  public static String DateTransString(Date date,String Format) throws ParseException{
			 SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");		
			 if(!"".equals(Format)&&Format!=null) {
				 formatter=  new SimpleDateFormat(Format);
			 }
			 return formatter.format(date);
		  }
	     //获取截止日期(本年-本月-最大天数  23:59:59)
		  public static String getMaxJzrq(String year,String month){
			  int newYear = Integer.parseInt(year);
			  int newMonth = Integer.parseInt(month);
			  int maxDays = getDaysByYearMonth(newYear,newMonth);
			  String jzrq = "";
			  if(newMonth<10){
	             jzrq = year +"-0"+month+"-"+ maxDays +" 23:59:59";
		         }else{
				 jzrq = year +"-"+month+"-"+ maxDays +" 23:59:59";
			   }	
			  return jzrq;			 
		  }
		  /**
		   * 
		  * @Title: LeftOrRightFill左填充或右填充
		  * @Description: TransUtil
		  * @param a:原始字符串 b:填充字符串 WishLength:期望长度 leftOrRight:0代表左填充 1代表右填充
		  * @returnType String    
		  * @author 舒飞
		  * @date 2016-6-22上午10:01:57
		   */
		  public static String LeftOrRightFill(String a,String b,int WishLength,int leftOrRight){
			  int length = a.length();
			  StringBuffer c = null;
			  switch (leftOrRight){
			  case 0:
			  while(length<WishLength){
				  c = new StringBuffer();
				  c.append(b).append(a);
				  a = c.toString();
				  length = a.length();				  
			  }
			  break;
			  case 1:
			  while(length<WishLength){
				  c = new StringBuffer();
				  c.append(a).append(b);
				  a = c.toString();
				  length = a.length();				  
			  }
			  break;				  
			  }
			  return a;
		  }
}
