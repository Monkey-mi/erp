package erp.util;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import net.java.dev.eval.Expression;

import erp.common.model.SortModel;


public class MyStringUtils {
	/**
	 * drp 添加yhbh到map*/
	public static void addYhbhToMap(Map<String,Object> params){
		if(stringIsEmpty((String)params.get("yhbh"))){
			String yhbh=getDrpYHBH();
			params.put("yhbh", yhbh);
		}
	}
	/**从session获取yhbh*/
	public static String getDrpYHBH(){
		return (String) SessionUtil.getAttribute(Const.DRP_YHBH);
	}
	/**
	 * string =null, "", "  "返回true,其余返回false*/
	public static boolean stringIsEmpty(String str){
		if(str==null || (str!=null && str.toString().trim().equals(""))){
			return true;
		}else{
			return false;
		}
	}
	/**功能：给MAP查询参数添加 order by参数**/
	public static void addOrderBySQL(Map<String,Object> params){
		if(params.get("sort")!=null && !"".equals(params.get("sort")) 
				&& params.get("sort").toString().contains("property") && params.get("sort").toString().contains("direction")){
			List<SortModel> sortList=MyJsonUtil.str2list(params.get("sort").toString(), SortModel.class);
			StringBuilder orderBySQL=new StringBuilder("");
			int length=sortList.size();
			for(int i=0;i<length-1;i++){
				orderBySQL.append(sortList.get(i).getProperty()).append(" ").append(sortList.get(i).getDirection()).append(",");
			}
			if(length>0){
				orderBySQL.append(sortList.get(length-1).getProperty()).append(" ").append(sortList.get(length-1).getDirection());
			}
			System.out.println("orderBySQL:"+orderBySQL.toString());
			params.put("orderBySQL", orderBySQL.toString());
		}
		
	}
	/**
	* @Title: getStrToNum 
	* @Description: 从字符串转换为数值 类似于 js 中eval 
	* @param @return    设定文件 
	* @return double    返回类型 
	* @throws 
	* @author wuqia
	 */
	public static double getStrToNum(String aa){
		double a=0;
		Expression exp1 = new Expression(aa.replaceAll("[A-Za-z]", ""));//替换所有字母之后计算
		a =exp1.eval().doubleValue();
		return a;
	}
	/**功能：给MAP查询参数添加 order by参数**/
	public static void addOrderBySQL2(Map<String,Object> params){
			if(params.get("sort")!=null && !"".equals(params.get("sort")) 
					&& params.get("sort").toString().contains("property") && params.get("sort").toString().contains("direction")){
				List<SortModel> sortList=MyJsonUtil.str2list(params.get("sort").toString(), SortModel.class);
				StringBuilder orderBySQL=new StringBuilder("");
				int length=sortList.size();
				for(int i=0;i<length-1;i++){
					orderBySQL.append(sortList.get(i).getProperty()).append(" ").append(sortList.get(i).getDirection()).append(",");
				}
				if(length>0){
					orderBySQL.append(sortList.get(length-1).getProperty()).append(" ").append(sortList.get(length-1).getDirection());
				}
				params.put("sort", orderBySQL.toString());
			}
	}
	/**判断是否是数字*/
	public static boolean isNumber(String value){
		//Pattern pattern = Pattern.compile("^\\d+$|-\\d+$"); // 就是判断是否为整数
		//Pattern pattern = Pattern.compile("\\d+\\.\\d+$|-\\d+\\.\\d+$");//判断是否为小数
		Pattern pattern = Pattern.compile("\\d+\\.\\d+$|-\\d+\\.\\d+$|^\\d+$|-\\d+$");//判断是否为数字
		Matcher isNum = pattern.matcher(value);
		if (!isNum.matches()) {
			return false;
		}
		return true;
	}
	//判断是否是整数
	public static boolean isInteger(String str) {
        int begin = 0;
        if (str == null || str.trim().equals("")) {
            return false;
        }
        str = str.trim();
        if (str.startsWith("+") || str.startsWith("-")) {
            if (str.length() == 1) {
                // "+" "-"
                return false;
            }
            begin = 1;
        }
        for (int i = begin; i < str.length(); i++) {
            if (!Character.isDigit(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }
	/**
	    * @Description: 判断excel是否2007版本的
	    * 注意：别改成传入inputstream is ,通过new XSSFWorkbook(is)来判断
	    * 说明见http://www.tuicool.com/articles/mi6VRv
	    * @param f 文件对象
	    * @return true /false
	    * @author xufeng
	    * @date 2016-7-27 
	    */
	    public static boolean isExcel2007(File f) {
	        try {
	          new XSSFWorkbook(new FileInputStream(f));
	        } catch (Exception e) {
	          return false;
	        }
	        return true;
	     }
}
