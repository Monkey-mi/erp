package erp.cp;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.reflection.MetaObject;

import com.sybase.jdbc3.a.b.p;

import erp.common.model.UserDataPermit;
import erp.cp.AuthProxy.AuthSignature;
import erp.util.Const;
import erp.util.SessionUtil;
import erp.util.XmlUtil;

public class DataPermitAuth implements ContentAuth{
    private String sql;
    private String tbl_name;
	@Override
	public void invoke(AuthSignature target, Map<String, Object> param) {
		
		if(SessionUtil.isAdmin()){
			return;
		}
		String sql=target.getSql().trim();
		StringBuffer regx=new StringBuffer("where");
		String[] sqlPart=null;
		String[] tables=null;
		List<UserDataPermit> permitList=null;
		StringBuilder query=new StringBuilder();
		StringBuilder readQuery=new StringBuilder();
		StringBuilder writeQuery=new StringBuilder();
		StringBuilder invisiableQuery=new StringBuilder();
		MetaObject meta=target.getTarget();
		if(XmlUtil.isMatch(sql, regx.toString())){
			sqlPart=sql.split(regx.toString());
		}
		regx.replace(0, 6, "WHERE");
		if(XmlUtil.isMatch(sql, regx.toString())){
			sqlPart=sql.split(regx.toString());
		}
		Map<String,List<UserDataPermit>> map=(Map<String,List<UserDataPermit>>)target.getParams(Const.USER_DATA_CDT);
		if (map!=null)
		{
		  //1.可读
		    permitList=map.get(Const.READ_PERMIT);
		    if (permitList!=null&&permitList.size()>0){
		        readQuery.append(convertSql(sqlPart[0],permitList)); 
		    }
		   //2.可写
		    permitList=map.get(Const.WRITE_PERMIT);
		    if (permitList!=null&&permitList.size()>0){
		        writeQuery.append(convertSql(sqlPart[0],permitList)); 
            }
		  //3.不可见  
		    permitList=map.get(Const.INVISIABLE_PERMIT);
		    if (permitList!=null&&permitList.size()>0){
		        invisiableQuery.append(convertSql(sqlPart[0],permitList)); 
            }
		}
		
		//数据行信息域=（可读-不可见-可写）+可写+自创
		//若定义了可读权限
		if (readQuery.length()>0)
		    query.append(readQuery.toString());
		else
		    query.append(sql);
		 //定义了不可见权限
		if (invisiableQuery.length()>0){
		    query.append(" except "+invisiableQuery.toString());
		}
		//定义了可写权限
		if(writeQuery.length()>0){
		    query.append(" except "+writeQuery.toString()); 
		   
		}
		//完成可读记录权限查询
		String tmpSql=query.toString();
		query.delete(0, query.length());
		query.append("select * ,'+R' as ROW_PERMIT FROM ("+tmpSql+")  as x");
		//合并可写部分数据
		  if(writeQuery.length()>0){
	            query.append(" union select *,'+W' as ROW_PERMIT from ("+writeQuery.toString()+") as xx"); 
	        }
		//最后追加原先自带的权限
		  tmpSql=query.toString();
		  query.delete(0, query.length());
		  query.append( "Select * from ("+tmpSql+") as "+this.tbl_name+" where "+sqlPart[1]);
		if(query.length()>0){
			try{
				meta.setValue("delegate.boundSql.sql", query.toString());
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	}
	/**
	 * <pre>
	 *     将信息域权限List转换成SQL 的条件
	 * </pre>
	 * 
	 * @author 华慧
	 */
	private String convertSql(String sqlHeader,List<UserDataPermit> pl){
	    StringBuilder query=new StringBuilder();
	    String condition="(";
            query.append(sqlHeader);
                query.append(" WHERE ");
                for(int j=0;j<pl.size();j++){
                    UserDataPermit p=pl.get(j);
                    //记录表名
                    if (this.tbl_name==null)
                       this.tbl_name=p.getTbl_name();
                    //第一笔记录
                   if (j<=pl.size()-1)
                       condition+=p.getCondition() +p.getLog_flag();
                   else
                       condition+=p.getCondition();
                }
                query.append(condition+")");
                
	    return query.toString();
	}
	
}
