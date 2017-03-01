package erp.cp;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.reflection.MetaObject;

import erp.common.model.UserDataPermit;
import erp.util.Const;


import net.sf.cglib.proxy.InvocationHandler;
import net.sf.cglib.proxy.Proxy;

public class AuthProxy{
		private AuthSignature auth;
		
	    public AuthProxy(ContentAuth contentAuth,ContentPermit cp){
	    	this.auth=new AuthSignature(contentAuth, cp);
	    }
	    public AuthProxy(ContentAuth contentAuth,List<UserDataPermit> dp){
            this.auth=new AuthSignature(contentAuth, dp);
        }
		public Object invoke(Object metament,BoundSql boundsql){
			this.auth.setSql(boundsql.getSql());
			this.auth.setMetaMent(metament);
			this.auth.getContentAuth().invoke(this.auth, null);
			return null;
		}
	class AuthSignature{
		private ContentPermit cp;
		private ContentAuth contentAuth;
		//信息域权限清单
		private List<UserDataPermit> dp;
		private String sql;
		private Object meta; 
		private Map<String,Object> paramMap;
		public AuthSignature(ContentAuth contentAuth,ContentPermit cp){
			this.contentAuth=contentAuth;
			this.cp=cp;
			this.paramMap=new HashMap<String, Object>();
			setParams();
		}
		  public AuthSignature(ContentAuth contentAuth, List<UserDataPermit> dp){
	            this.contentAuth=contentAuth;
	            this.dp=dp;
	            this.paramMap=new HashMap<String, Object>();
	            setdpParams();
	        }
		 public  List<UserDataPermit> getDataPermit(){
		         return this.dp;		     
		 }
		public ContentPermit getContentPermit(){
			return this.cp;
		}
		public ContentAuth getContentAuth(){
			return this.contentAuth;
		}
		private void setSql(String sql){
			this.sql=sql;
		}
		public String getSql(){
			return this.sql;
		}
		private void setMetaMent(Object meta){
			this.meta=meta;
		}
		public MetaObject getTarget(){
			return (MetaObject) this.meta;
		}
		public Object getParams(String fieldName){
			return paramMap.get(fieldName);
		}
		/**
		 * 
		 * <pre>
		 *    将用户对应的权限转换成SQL的where 条件
		 * </pre>
		 * @author 华慧
		 */
		public void setdpParams(){
//		    String dataCodition="(";
//		    String dataPermit="";
		    //可读
		    List<UserDataPermit> readList=new ArrayList<UserDataPermit>();
		    //不可见
		    List<UserDataPermit> invisibleList=new ArrayList<UserDataPermit>();
		    //可写
		    List<UserDataPermit> writeList=new ArrayList<UserDataPermit>();
		    Map<String,List<UserDataPermit>> mapConditon=new HashMap<String,List<UserDataPermit>>(); 
		      for ( int i=0;i<this.dp.size();i++){
		          //获取对应的权限列表
		              UserDataPermit d= dp.get(i);
		         //权限为行权限时处理     
		             if (d.getData_permit().equals(Const.ROW_DATA_PERMIT)){
		                     if (d.getPermit().equals(Const.READ_PERMIT))
		                         readList.add(d);
		                     else if (d.getPermit().equals(Const.INVISIABLE_PERMIT))
		                         invisibleList.add(d);
		                     else
		                         writeList.add(d);
		              }
		      }
		      //访问规则为不可见时
//		      if(dataPermit.equals(Const.INVISIABLE_PERMIT))
//		          dataCodition="not"+ dataCodition+")";
//		      else
//		          dataCodition+=")";
		      mapConditon.put(Const.READ_PERMIT, readList);
		      mapConditon.put(Const.INVISIABLE_PERMIT, invisibleList);
		      mapConditon.put(Const.WRITE_PERMIT, writeList);
		      //保存至参数列表中
		      paramMap.put(Const.USER_DATA_CDT,mapConditon );
		}
		private void setParams(){
			String param=this.cp.param();
			if(param!=null){
				String[] params=null;
				String[] paramsRegx=param.split(",");
				for(String item:paramsRegx){
					params=item.split("=");
					try{
						paramMap.put(params[0].replace("'",""),params[1].replace("'",""));
					}catch(Exception e){
						e.printStackTrace();
					}
					
				}
			}
		}
	}
}
