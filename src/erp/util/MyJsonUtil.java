package erp.util;

import java.io.StringWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.type.JavaType;

import com.outsideasy.ws.common.vo.CXFResponse;

import erp.common.FilterModel;

public class MyJsonUtil {
	private static ObjectMapper objectMapper=initObjectMapper();
	private static ObjectMapper initObjectMapper(){
		ObjectMapper objectMapper = new ObjectMapper();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		objectMapper.setDateFormat(dateFormat);
		//空对象不要抛出异常
		objectMapper.disable(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS);
		// 设置输入时忽略在JSON字符串中存在但Java对象实际没有的属性  
		//deserConfig.set(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,false);
		objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		return objectMapper;
	}
	/**
	 * 
	* @Title: FilterListToString 
	* @Description:将筛选数组转换为查询字符串
	* @param @param fm
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	public static String FilterListToString(List<FilterModel> fm){
		String params="";
		for(FilterModel obj:fm){
			if(obj.getOperator().equals("gt")){
				params+="and ("+obj.getProperty() +" > '"+obj.getValue()+"' )";
			}else if(obj.getOperator().equals("lt")){
				params+="and ("+obj.getProperty() +" < '"+obj.getValue()+"' )";
			}else if(obj.getOperator().equals("like")){
				params+="and ("+obj.getProperty() +"  "+obj.getOperator()+" '%"+obj.getValue()+"%' )";
			}else if(obj.getOperator().equals("=")&&obj.getValue().equals("")){
				params+="and ("+obj.getProperty() +"  "+obj.getOperator()+" '"+obj.getValue()+"' or "+obj.getProperty() +" is null )";
			}else if(obj.getOperator().equals("!=")&&obj.getValue().equals("")){
				params+="and ("+obj.getProperty() +"  "+obj.getOperator()+" '"+obj.getValue()+"' and "+obj.getProperty() +" is not null )";
			}else{
				if(obj.getValue().equals("true")){
					params+="and ("+obj.getProperty() +"  "+obj.getOperator()+" '"+1+"' )";
				}else if(obj.getValue().equals("false")){
					params+="and ("+obj.getProperty() +"  "+obj.getOperator()+" '"+0+"' )";
				}else{
					params+="and ("+obj.getProperty() +"  "+obj.getOperator()+" '"+obj.getValue()+"' )";
				}
			}
		}
		return params;
	}
	/**
	 * 将字符串转化成CXFResponse*/
	public static <T> CXFResponse<T> str2CXFResponse(String jsonStr, Class<T> cls) {
		CXFResponse<T> res = null;
		try {
			JavaType t = objectMapper.getTypeFactory().constructParametricType(CXFResponse.class, cls);
			res = objectMapper.readValue(jsonStr, t);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
	/**
	 * 将对象转换为json字符串
	 * 
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public static String obj2string(Object obj) {
		StringWriter sw = new StringWriter();
		try {
			objectMapper.writeValue(sw, obj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sw.toString();
	}

	/**
	 * 将字符串转list对象
	 * 
	 * @param <T>
	 * @param jsonStr
	 * @param cls
	 * @return
	 */
	public static <T> List<T> str2list(String jsonStr, Class<T> cls) {
		List<T> objList = null;
		try {
			JavaType t = objectMapper.getTypeFactory().constructParametricType(
					List.class, cls);
			objList = objectMapper.readValue(jsonStr, t);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return objList;
	}

	/**
	 * 将字符串转为对象
	 * 
	 * @param <T>
	 * @param jsonStr
	 * @param cls
	 * @return
	 */
	public static <T> T str2obj(String jsonStr, Class<T> cls) {
		T obj = null;
		try {
			obj = objectMapper.readValue(jsonStr, cls);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	/**  
     * 从一个JSON 对象字符格式中得到一个java对象，形如：  
     * {"id" : idValue, "name" : nameValue, "aBean" : {"aBeanId" : aBeanIdValue, ...}}  
     * @param object  
     * @param clazz  
     * @return  
     */  
    public static Object getDTO(String jsonString, Class clazz){   
        JSONObject jsonObject = null;   
        try{   
            setDataFormat2JAVA();    
            jsonObject = JSONObject.fromObject(jsonString);   
        }catch(Exception e){   
            e.printStackTrace();   
        }   
        return JSONObject.toBean(jsonObject, clazz);   
    }   
       
    /**  
     * 从一个JSON 对象字符格式中得到一个java对象，其中beansList是一类的集合，形如：  
     * {"id" : idValue, "name" : nameValue, "aBean" : {"aBeanId" : aBeanIdValue, ...},  
     * beansList:[{}, {}, ...]}  
     * @param jsonString  
     * @param clazz  
     * @param map 集合属性的类型 (key : 集合属性名, value : 集合属性类型class) eg: ("beansList" : Bean.class)  
     * @return  
     */  
    public static Object getDTO(String jsonString, Class clazz, Map map){   
        JSONObject jsonObject = null;   
        try{   
            setDataFormat2JAVA();    
            jsonObject = JSONObject.fromObject(jsonString);   
        }catch(Exception e){   
            e.printStackTrace();   
        }   
        return JSONObject.toBean(jsonObject, clazz, map);   
    }   
       
    private static void setDataFormat2JAVA() {
		// TODO Auto-generated method stub
    	JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
	}

	/**  
     * 从一个JSON数组得到一个java对象数组，形如：  
     * [{"id" : idValue, "name" : nameValue}, {"id" : idValue, "name" : nameValue}, ...]  
     * @param object  
     * @param clazz  
     * @return  
     */  
    public static Object[] getDTOArray(String jsonString, Class clazz){   
        setDataFormat2JAVA();   
        JSONArray array = JSONArray.fromObject(jsonString);   
        Object[] obj = new Object[array.size()];   
        for(int i = 0; i < array.size(); i++){   
            JSONObject jsonObject = array.getJSONObject(i);
            obj[i] = JSONObject.toBean(jsonObject, clazz);   
        }   
        return obj;   
    }   
       
    /**  
     * 从一个JSON数组得到一个java对象数组，形如：  
     * [{"id" : idValue, "name" : nameValue}, {"id" : idValue, "name" : nameValue}, ...]  
     * @param object  
     * @param clazz  
     * @param map  
     * @return  
     */  
    public static Object[] getDTOArray(String jsonString, Class clazz, Map map){   
        setDataFormat2JAVA();   
        JSONArray array = JSONArray.fromObject(jsonString);   
        Object[] obj = new Object[array.size()];   
        for(int i = 0; i < array.size(); i++){   
            JSONObject jsonObject = array.getJSONObject(i);   
            obj[i] = JSONObject.toBean(jsonObject, clazz, map);   
        }   
        return obj;   
    }   
       
    /**  
     * 从一个JSON数组得到一个java对象集合  
     * @param object  
     * @param clazz  
     * @return  
     */  
    public static <T>List<T> getDTOList(String jsonString, Class clazz){   
        setDataFormat2JAVA();   
        JSONArray array = JSONArray.fromObject(jsonString);   
        List list = new ArrayList();   
        for(Iterator iter = array.iterator(); iter.hasNext();){   
            JSONObject jsonObject = (JSONObject)iter.next();   
            list.add(JSONObject.toBean(jsonObject, clazz));   
        }   
        return list;   
    }   
       
    /**  
     * 从一个JSON数组得到一个java对象集合，其中对象中包含有集合属性  
     * @param object  
     * @param clazz  
     * @param map 集合属性的类型  
     * @return  
     */  
    public static List getDTOList(String jsonString, Class clazz, Map map){   
        setDataFormat2JAVA();   
        JSONArray array = JSONArray.fromObject(jsonString);   
        List list = new ArrayList();   
        for(Iterator iter = array.iterator(); iter.hasNext();){   
            JSONObject jsonObject = (JSONObject)iter.next();   
            list.add(JSONObject.toBean(jsonObject, clazz, map));   
        }   
        return list;   
    }   
       
    /**  
     * 从json HASH表达式中获取一个map，该map支持嵌套功能  
     * 形如：{"id" : "johncon", "name" : "小强"}  
     * 注意commons-collections版本，必须包含org.apache.commons.collections.map.MultiKeyMap  
     * @param object  
     * @return  
     */  
    public static Map getMapFromJson(String jsonString) {   
        setDataFormat2JAVA();   
        JSONObject jsonObject = JSONObject.fromObject(jsonString);   
        Map map = new HashMap();   
        for(Iterator iter = jsonObject.keys(); iter.hasNext();){   
            String key = (String)iter.next();   
            map.put(key, jsonObject.get(key));   
        }   
        return map;   
    }   
       
    /**  
     * 从json数组中得到相应java数组  
     * json形如：["123", "456"]  
     * @param jsonString  
     * @return  
     */  
    public static Object[] getObjectArrayFromJson(String jsonString) {   
        JSONArray jsonArray = JSONArray.fromObject(jsonString);   
        return jsonArray.toArray();   
    }   
  
  
    /**  
     * 把数据对象转换成json字符串  
     * DTO对象形如：{"id" : idValue, "name" : nameValue, ...}  
     * 数组对象形如：[{}, {}, {}, ...]  
     * map对象形如：{key1 : {"id" : idValue, "name" : nameValue, ...}, key2 : {}, ...}  
     * @param object  
     * @return  
     */  
    public static String getJSONString(Object object) throws Exception{   
        String jsonString = null;   
        //日期值处理器   
        JsonConfig jsonConfig = new JsonConfig();   
        jsonConfig.registerJsonValueProcessor(java.util.Date.class, new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));   
        if(object != null){   
            if(object instanceof Collection || object instanceof Object[]){   
                jsonString = JSONArray.fromObject(object, jsonConfig).toString();   
            }else{   
                jsonString = JSONObject.fromObject(object, jsonConfig).toString();   
            }   
        }   
        return jsonString == null ? "{}" : jsonString;   
    }
	/**
		 * 将字符串转Map对象,
		 * map的object只能是简单类型
		 * 
		 * @param jsonStr
		 * @param cls
		 * @return
		 */
		public static  Map<String,Object> str2map(String jsonStr) {
			Map<String,Object> map = null;
			try {
				JavaType t = objectMapper.getTypeFactory().constructParametricType(
						Map.class, String.class,Object.class);
				map = objectMapper.readValue(jsonStr, t);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return map;
		} 

		/**
		 * 将字符串转list对象
		 * 
		 * @param <T>
		 * @param jsonStr
		 * @param cls
		 * @return
		 *//*
		public static <T> List<T> str2list(String jsonStr, Class<T> cls) {
			ObjectMapper mapper = new ObjectMapper();
			List<T> objList = null;
			try {
				JavaType t = mapper.getTypeFactory().constructParametricType(
						List.class, cls);
				objList = mapper.readValue(jsonStr, t);
			} catch (Exception e) {
			}
			return objList;
		}*/

		/**
		 * 将字符串转为对象
		 * 
		 * @param <T>
		 * @param jsonStr
		 * @param cls
		 * @return
		 */
//		public static <T> T str2obj(String jsonStr, Class<T> cls) {
//			ObjectMapper mapper = new ObjectMapper();
//			T obj = null;
//			try {
//				obj = mapper.readValue(jsonStr, cls);
//			} catch (Exception e) {
//			}
//			return obj;
//		}
		

		
		/**
		 * 将字符串转为json节点
		 * @param jsonStr
		 * @return
		 */
//		public static JsonNode str2node(String jsonStr) {
//			ObjectMapper mapper = new ObjectMapper();
//			try {
//				return mapper.readTree(jsonStr);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//			return null;
//		}
}
