package erp.cp;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.reflection.MetaObject;

import erp.common.model.UserDataPermit;
import erp.util.Const;
import erp.util.SessionUtil;


public class ContentFactory {
   private static final String AuthToken="AuthContent";
   private static final String DataPermitToken="DataPermitToken";
   public static void setProxy(Object target,Object[] arg,String methodName){
	   Method method=getMethodfromTarget(target,methodName);
	   ContentAuth contentAuth=createContentAuth(method);
	   //报表或统计图展示设置权限过滤
	   if(contentAuth!=null){
		   for(Object item:arg){
			   if(item instanceof Map){
				   Map<String,Object> msgMap=(Map<String,Object>)item;
				   msgMap.put(AuthToken,new AuthProxy(contentAuth,getCtr(method)));
			   }
		   }
	   }
	   List<UserDataPermit> dp=getUserPermit(method);
	   ContentAuth dataPermitAuth=createDataAuth(method,dp);
       if(dataPermitAuth!=null){
           for(Object item:arg){
               if(item instanceof Map){
                   Map<String,Object> msgMap=(Map<String,Object>)item;
                   msgMap.put(DataPermitToken,new AuthProxy(dataPermitAuth,dp));
               }
           }
       }
   }
   public static void invoke(Object metaStmtHandler, BoundSql boundSql){
	   Object paramObject=boundSql.getParameterObject();
	   Map<String,Object> paramMap=null;
	   if(paramObject instanceof Map){
		   paramMap=(Map<String, Object>) paramObject;
		   Object auth=paramMap.get(AuthToken);
			  if(auth!=null&&auth instanceof AuthProxy){
				  AuthProxy aupp=(AuthProxy) auth;
				  try{
					  aupp.invoke(metaStmtHandler,boundSql);
				  }catch(Exception e){
					  e.printStackTrace();
				  }
			  }
			  
			  auth=paramMap.get(DataPermitToken);
			  if(auth!=null&&auth instanceof AuthProxy){
                  AuthProxy aupp=(AuthProxy) auth;
                  try{
                      aupp.invoke(metaStmtHandler,boundSql);
                  }catch(Exception e){
                      e.printStackTrace();
                  }
              }
		   }
	   
	   }
   private static ContentPermit getCtr(Method method){
	   return method.getAnnotation(ContentPermit.class);
   }
   private static List<UserDataPermit> getUserPermit(Method method){
       List<UserDataPermit> retList=null;
       List<UserDataPermit> list=(List<UserDataPermit>)SessionUtil.getAttribute(Const.DATA_PERMIT);
       String methodName=method.getName();
       if (list!=null){
           retList=new ArrayList<UserDataPermit>();
           for (UserDataPermit permit:list){
                   if (permit.getRef_method_code().equalsIgnoreCase(methodName)){
                       retList.add(permit);
                   }
           }
           if (retList.size()<=0)
               return null;
       }
       return retList;
   }
   private static Method getMethodfromTarget(Object target,String methodName){
		Class<?>[] interfaces=target.getClass().getInterfaces();
		Method method=null;
		for(Class<?> item:interfaces){
			for(Method m:item.getMethods()){
				if(m.getName().equals(methodName)){
					method=m;
					return method;
				}
			}
		}
		return method;
	}
   //获取信息域权限
   private static ContentAuth createDataAuth(Method method,List<UserDataPermit>dp){
       ContentAuth contentAuth=null;
       if(method==null){
           return contentAuth;
       }
      
       if (dp==null)
            return null;
          try {
              //设置数据域权限类名
               String classType="tps.cp.DataPermitAuth";
                Class c=Class.forName(classType);
                Class<?>[] interfaces=c.getInterfaces();
                for(Class<?> item:interfaces){
                    if(item.equals(ContentAuth.class)){
                            contentAuth=(ContentAuth) c.newInstance();
                            break;
                    }
                }
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            return contentAuth;
        }  catch (InstantiationException e) {
            // TODO Auto-generated catch block
            return contentAuth;
        } catch (IllegalAccessException e) {
            // TODO Auto-generated catch block
            return contentAuth;
        }
        return contentAuth;
   }
   //报表配置
   private static ContentAuth createContentAuth(Method method){
	   ContentAuth contentAuth=null;
	   if(method==null){
		   return contentAuth;
	   }
	   ContentPermit annotation=method.getAnnotation(ContentPermit.class);
	   
	   if(annotation==null ){
		   return null;
	   }
        	   try {
        		   String classType=annotation.type();
        		if(classType!=null&&!classType.equals("")){
        			Class c=Class.forName(classType);
        			Class<?>[] interfaces=c.getInterfaces();
        			for(Class<?> item:interfaces){
        				if(item.equals(ContentAuth.class)){
        						contentAuth=(ContentAuth) c.newInstance();
        						break;
        				}
        			}
        		}
        	} catch (ClassNotFoundException e) {
        		// TODO Auto-generated catch block
        		return contentAuth;
        	}  catch (InstantiationException e) {
        		// TODO Auto-generated catch block
        		return contentAuth;
        	} catch (IllegalAccessException e) {
        		// TODO Auto-generated catch block
        		return contentAuth;
        	}
        	return contentAuth;
        	 }
}