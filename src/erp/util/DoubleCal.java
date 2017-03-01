package erp.util;

import java.math.BigDecimal;

public class DoubleCal {
	/*BigDecimal.setScale()方法用于格式化小数点
	setScale(1)表示保留一位小数，默认用四舍五入方式 
	setScale(1,BigDecimal.ROUND_DOWN)直接删除多余的小数位，如2.35会变成2.3 
	setScale(1,BigDecimal.ROUND_UP)进位处理，2.35变成2.4 
	setScale(1,BigDecimal.ROUND_HALF_UP)四舍五入，2.35变成2.4
	setScaler(1,BigDecimal.ROUND_HALF_DOWN)四舍五入，2.35变成2.3，如果是5则向下舍
	*/
	public static double round(double value, int scale,int roundingMode) {  
       BigDecimal bd = new BigDecimal(value);  
       bd = bd.setScale(scale, roundingMode);  
       double d = bd.doubleValue();  
       bd = null;  
       return d;  
   }  
   public static double round(double value, int scale) {  
	       BigDecimal bd = new BigDecimal(value);  
	       bd = bd.setScale(scale, BigDecimal.ROUND_HALF_UP);  
	       double d = bd.doubleValue();  
	       bd = null;  
	       return d;  
	   }

   /*@加*/
   public static double sum(double d1,double d2){
       BigDecimal bd1 = new BigDecimal(Double.toString(d1));
       BigDecimal bd2 = new BigDecimal(Double.toString(d2));
       return bd1.add(bd2).doubleValue();
   }


   /*@减*/
   public static double sub(double d1,double d2){
       BigDecimal bd1 = new BigDecimal(Double.toString(d1));
       BigDecimal bd2 = new BigDecimal(Double.toString(d2));
       return bd1.subtract(bd2).doubleValue();
   }

   /*@乘*/
   public static double mul(double d1,double d2){
       BigDecimal bd1 = new BigDecimal(Double.toString(d1));
       BigDecimal bd2 = new BigDecimal(Double.toString(d2));
       return bd1.multiply(bd2).doubleValue();
   }


   /*@除*/
   public static double div(double d1,double d2,int scale){
       //  当然在此之前，你要判断分母是否为0，  
       //  为0你可以根据实际需求做相应的处理

       BigDecimal bd1 = new BigDecimal(Double.toString(d1));
       BigDecimal bd2 = new BigDecimal(Double.toString(d2));
       return bd1.divide
              (bd2,scale,BigDecimal.ROUND_HALF_UP).doubleValue();
   }
}
