package erp.common.db;






import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import erp.bi.form.model.FrmFld;
import erp.common.db.DBUtil;
import erp.util.Const;
import erp.util.WebUtil;

public class DBUtil {
	protected static Logger logger = Logger.getLogger("service");
	public static boolean isDebug = true;
	
	public static final String DDL_TYPE_SCHEMA_ONLY   ="DDL_TYPE_SCHEMA_ONLY";
	public static final String DDL_TYPE_DATA_ONLY 	="DDL_TYPE_DATA_ONLY";
	public static final String DDL_TYPE_PROC_ONLY 	="DDL_TYPE_PROC_ONLY";
	public static final String DDL_TYPE_ALL			="DDL_TYPE_ALL";
	
	private static DriverManagerDataSource dms = new DriverManagerDataSource();
	
	public static String getDbDrvClassName(String dbType){
		String drvClassName =""; 
		if(dbType.equals(Const.DB_TYPE_MYSQL)){
			drvClassName ="com.mysql.jdbc.Driver";
		}else if(dbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			drvClassName ="com.microsoft.sqlserver.jdbc.SQLServerDriver";
		}else if(dbType.equals(Const.DB_TYPE_ORACLE)){
			drvClassName ="oracle.jdbc.driver.OracleDriver";
		}
		return drvClassName;
	}
	/**
	 * 获得当前数据源
	 * @return
	 * @throws SQLException
	 */
	public static DataSource getCurDataSource() throws SQLException{
		return WebUtil.getAppCtxCommon().getBean(MultiDataSource.class).getDataSource();
	}
	
	
	
	/**
	 * 获取当前数据源的一个连接
	 * @return
	 * @throws SQLException
	 */
	public static Connection getCurConnection() throws SQLException{
		return getCurDataSource().getConnection();
	}
	
	/**
	 * 设置当前数据源，并使用默认的数据库名
	 * @param dsCode 数据源编码
	 * @param errMsg 错误信息
	 * @return  true--成功   false--失败
	 * @throws SQLException 
	 */
	public static DataSource setCurDataSource(String dsCode,StringBuilder sbErrMsg) throws SQLException{
		MultiDataSource multiDs = WebUtil.getAppCtxCommon().getBean(MultiDataSource.class);
		DataSource curDataSource = null;
		if(!WebUtil.isEmpty(dsCode)){
			//这种情况下切换到指定的外部数据源
			//根据Id 指定 外部数据源，因为Dscode存在可重命名的情况
			//2014.09.01 华慧
			curDataSource = multiDs.setCurDataSource(Integer.parseInt(dsCode),sbErrMsg);
		}else{
			//这种情况下数据源是本地数据库
			curDataSource = multiDs.setDefaultDataSource(sbErrMsg);
		}
		return curDataSource;
	}
	
	public static boolean testDbConn(String dbType,String dbSrv,int port,String dbName,String uName,String pwd,StringBuilder sbErrMsg){
		Connection conn = DBUtil.openDbConn(dbType, dbSrv, port, dbName, uName, pwd, sbErrMsg);
		if(conn==null)
			return false;
		DBUtil.closeDbConn(conn);
		return true;
	}
	public static void closeDbConn(Connection conn){
		if(conn!=null)
			DataSourceUtils.releaseConnection(conn, dms);
	}
	
	public static Connection openDbConn(String dbType,String dbSrv,int port,String dbName,String uName,String pwd,StringBuilder sbErrMsg) {
		Connection conn=null;
		String drvClassName ="",url="";
		
		drvClassName = getDbDrvClassName(dbType);
		url = getDbSrvUrl(dbType,dbSrv,port,dbName);
		
		if(drvClassName.equals("")||url.equals("")){
			sbErrMsg.append(String.format("尚不支持此种数据库[%s]!",dbType));
			return conn;
		}
		dms.setDriverClassName(drvClassName);
		dms.setUrl(url);
		dms.setUsername(uName);
		dms.setPassword(pwd);
		int nCount =0;
		int nTotalCount =3;
		while(nCount != nTotalCount){
			//有时候加载驱动等动作较慢，需要多尝试几次
			try {
				nCount++;
				conn = DataSourceUtils.doGetConnection(dms);
				break;
			} catch (SQLException e) {
				if(nCount>=nTotalCount)
					sbErrMsg.append(e.getMessage());
				else{
					try {
						Thread.sleep(10);
					} catch (InterruptedException e1) {
						 //TODO Auto-generated catch block
						//e1.printStackTrace();
					}
				}
			}
		}
		return conn;
	}
	
	public static String getDbSrvUrl(String dbType,String dbSrv,int port,String dbName){
		String url=""; 
		if(dbType.equals(Const.DB_TYPE_MYSQL)){
			url =String.format("jdbc:mysql://%s:%d/%s?useUnicode=true&characterEncoding=UTF-8",dbSrv.trim(),port,dbName.trim());
		}else if(dbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			url =String.format("jdbc:sqlserver://%s:%d;DatabaseName=%s",dbSrv.trim(),port,dbName.trim());
		}else if(dbType.equals(Const.DB_TYPE_ORACLE)){
			//Oracle没有数据库名这种说法
			//这里借用这个变量来填实例名
			url =String.format("jdbc:oracle:thin:@%s:%d:%s",dbSrv.trim(),port,dbName);
		}
		return url;
	}
	
	public static String getDbType(Connection conn){
		String sDbType ="";
		if(conn!=null){
			try {
				sDbType = getDbType(conn.getMetaData().getURL());
			} catch (SQLException e) {
				
			}
		}
		return sDbType;
	}
	
	public static String getDbType(DataSource ds) {
		String sDbType ="";
		if(ds!=null){
			Connection conn;
			try {
				conn = DataSourceUtils.doGetConnection(ds);
				sDbType = getDbType(conn);
				DataSourceUtils.doReleaseConnection(conn,ds);
			} catch (SQLException e) {
				
			}
		}
		return sDbType;
	}
	
	public static String getDbType(String dbUrl){
		dbUrl = dbUrl.toLowerCase();
		String dbType = Const.DB_TYPE_MYSQL;
		if(dbUrl.indexOf("jdbc:mysql")>=0) 
			dbType = Const.DB_TYPE_MYSQL;
		else if(dbUrl.indexOf("jdbc:oracle")>=0) 
			dbType = Const.DB_TYPE_ORACLE;
		else if(dbUrl.indexOf("jdbc:sqlserver")>=0) 
			dbType = Const.DB_TYPE_MSSQLSERVER;
		return dbType;
	}

	
	/**
	 * 根据连接获取数据表清单
	 * @param conn 连接
	 * @param tblNamePattern 数据表名匹配条件，空串代表全匹配
	 * @return
	 * @throws Exception
	 */
	public static List<String> getTables(Connection conn,String tblNamePattern) throws Exception{
		tblNamePattern = tblNamePattern.trim();
		tblNamePattern = tblNamePattern.length()==0?"%":tblNamePattern;
		List<String> tblLst = new ArrayList<String>();
		try{
			DatabaseMetaData  dbmd = conn.getMetaData();
			ResultSet rs = dbmd.getTables(null, null, tblNamePattern, new String[]{"TABLE","VIEW"});
			while(rs.next()){
				String tblSchem = rs.getString("TABLE_SCHEM")==null?"":rs.getString("TABLE_SCHEM").toLowerCase();
				
				if(!(tblSchem.indexOf("sys")>=0)&&!(tblSchem.indexOf("schema")>=0))
					tblLst.add(rs.getString("TABLE_NAME"));
					/*logger.debug(String.format("cat=[%s],schem=[%s],\tname=[%s],\ttype=[%s]",
							rs.getString("TABLE_CAT"),
							rs.getString("TABLE_SCHEM"),
							rs.getString("TABLE_NAME"),
							rs.getString("TABLE_TYPE")
							));*/
			}
			rs.close();
			conn.close();
		}catch(Exception e){
			conn.close();
			throw new Exception(e.getMessage());
		}
		return tblLst;
	}
	
	
	/**
	 * 根据查询语句获得结果集的结构
	 * @param conn  连接
	 * @param querySQL  查询语句
	 * @return
	 * @throws SQLException
	 * JSON格式的表述的结构
	 * [{<br/>
			"code":"",	列名<br/>
			"name":"",	列标题<br/>
			"datatype":"",数据类型<br/>
			"len":"",	长度<br/>
			"prec":"",	精度<br/>
			"nullable":12,	可为null<br/>
		}]
	 */
	public static List<FrmFld> getFieldsBySQL(Connection conn,String qrySQL) throws Exception{
		List<FrmFld> fldLst = new ArrayList<FrmFld>();
		//只是为了拿到结果集的结构，没有必要查到真正的全部结果，所以需要加上条件使得没有查询结果
		//需要去除 group by ,order by 等影响
		String querySQL = qrySQL.toLowerCase().replaceAll("(^|\\s+)where(\\s+|$)"," where ")
											  .replaceAll("(^|\\s+)group by(\\s+|$)"," group by ")
											  .replaceAll("(^|\\s+)order by(\\s+|$)"," order by ");
		int instIdx = querySQL.lastIndexOf(" where ");
		int instLen = " where ".length();
		if(instIdx>=0){
			querySQL = querySQL.substring(0,instIdx+instLen )+" 1=2 and "+querySQL.substring(instIdx+instLen);
		}else{
			instIdx = querySQL.toLowerCase().lastIndexOf(" group by ");
			instLen = " group by ".length();
			if(instIdx>=0)
				//有group by 的则插在group by 之前
				querySQL = querySQL.substring(0,instIdx)+" where 1=2 "+querySQL.substring(instIdx);
			else{
				//否则插在order by 前
				instIdx = querySQL.toLowerCase().lastIndexOf(" order by ");
				instLen = " order by ".length();
				if(instIdx>=0)
					querySQL = querySQL.substring(0,instIdx)+" where 1=2 "+querySQL.substring(instIdx);
				else
					querySQL += " where 1=2 ";
			}
		}
		logger.debug("on get fields qrySql="+querySQL);
		try{
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(querySQL);
			ResultSetMetaData rsmd = rs.getMetaData();
			int nCols = rsmd.getColumnCount();
			for(int i=1;i<=nCols;i++){
				FrmFld frmFld = new FrmFld();
				fldLst.add(frmFld);
				frmFld.setCode(rsmd.getColumnName(i));
				frmFld.setName(rsmd.getColumnLabel(i));
				frmFld.setDatatype(getDataTypeStr(rsmd.getColumnType(i)));
				frmFld.setLen(rsmd.getPrecision(i));
				frmFld.setPrec(rsmd.getScale(i));
				frmFld.setNullable(String.valueOf(rsmd.isNullable(i)==DatabaseMetaData.columnNullable));
				if(frmFld.getCode().trim().length()==0){
					//发现查询语句中有未命名的列,这在分页处理时会出错，所以要事先警告
					throw new Exception(String.format("查询语句[%s]中存在匿名列",qrySQL));
				}
			}
			stmt.close();
			conn.close();
		}catch(Exception e){
			conn.close();
			throw new Exception(e.getMessage());
		}
		return fldLst;
	}
	
	/**
	 * 根据sqlType取得对应的DataTypeStr
	 * @param sqlType 
	 * @return
	 */
	public static String getDataTypeStr(int sqlType){
		logger.debug("---  sqlType="+sqlType);
		String typeStr = erp.bi.form.Const.DATA_TYPE_STRING;
		switch(sqlType){
		    //数字
			case java.sql.Types.INTEGER:
			case java.sql.Types.SMALLINT:
			case java.sql.Types.TINYINT:
			case java.sql.Types.BIGINT:
				typeStr = erp.bi.form.Const.DATA_TYPE_INTEGER;
				break;
			//文本
			case java.sql.Types.VARCHAR:
			case java.sql.Types.NVARCHAR:
			case java.sql.Types.CHAR:
			case java.sql.Types.NCHAR:
				typeStr = erp.bi.form.Const.DATA_TYPE_STRING;
				break;
			//数值
			case java.sql.Types.DECIMAL :
			case java.sql.Types.FLOAT :	
			case java.sql.Types.DOUBLE:
			case java.sql.Types.NUMERIC:
				typeStr = erp.bi.form.Const.DATA_TYPE_DEC;
				break;
			//日期
			case java.sql.Types.TIMESTAMP:
			case java.sql.Types.DATE :
				typeStr = erp.bi.form.Const.DATA_TYPE_DATETIME;
				break;
			//时间	
			case java.sql.Types.TIME :
				typeStr = erp.bi.form.Const.DATA_TYPE_TIME;
				break;		
			//大文本
			case java.sql.Types.LONGVARCHAR :
			case java.sql.Types.LONGNVARCHAR :
			case java.sql.Types.CLOB:
				typeStr = erp.bi.form.Const.DATA_TYPE_LONGTEXT;
				break;
			//默认为不支持的	
			default:
				typeStr = "[sqlType-"+sqlType+"]"+erp.bi.form.Const.DATA_TYPE_NOTSUPPORT;
				break;
		}
		
		return typeStr;
	}
	/**
	 * 构造表单数据类型
	 * @param frmFld
	 * @return String类型
	 */
	public static String makeDataTypeStr(String sDbType,FrmFld frmFld){
		String retStr = frmFld.getDatatype().trim();
		String dataType = retStr;
		if(dataType.equals(erp.bi.form.Const.DATA_TYPE_STRING)||dataType.equals(erp.bi.form.Const.DATA_TYPE_BOOL)){
			//处理文本字段
			if(sDbType.equals(erp.util.Const.DB_TYPE_MYSQL))
				retStr = erp.bi.form.Const.DATA_TYPE_STRING_MYSQL;
			else if(sDbType.equals(erp.util.Const.DB_TYPE_MSSQLSERVER))
				retStr = erp.bi.form.Const.DATA_TYPE_STRING_MSSQLSERVER;
			else if(sDbType.equals(erp.util.Const.DB_TYPE_ORACLE)){
				retStr = erp.bi.form.Const.DATA_TYPE_STRING_ORACLE;
			}
			retStr += "("+frmFld.getLen()+")";
		}else if(dataType.equals(erp.bi.form.Const.DATA_TYPE_DEC)){
			retStr += "("+frmFld.getLen()+","+frmFld.getPrec()+")";
		}else if(dataType.equals(erp.bi.form.Const.DATA_TYPE_LONGTEXT)){
			//处理大文本字段
			if(sDbType.equals(erp.util.Const.DB_TYPE_MYSQL))
				retStr = erp.bi.form.Const.DATA_TYPE_LONGTEXT_MYSQL;
			else if(sDbType.equals(erp.util.Const.DB_TYPE_MSSQLSERVER))
				retStr = erp.bi.form.Const.DATA_TYPE_LONGTEXT_MSSQLSERVER;
			else if(sDbType.equals(erp.util.Const.DB_TYPE_ORACLE)){
				retStr = erp.bi.form.Const.DATA_TYPE_LONGTEXT_ORACLE;
			}
		}else if(dataType.equals(erp.bi.form.Const.DATA_TYPE_DATETIME)&&sDbType.equals(erp.util.Const.DB_TYPE_ORACLE)){
			//处理日期时间字段，oracle只有date类型
			retStr = erp.bi.form.Const.DATA_TYPE_DATE;
		}
		return retStr;
	}
	
	/**
	 * 构造表单字段属性
	 * @param frmFld
	 * @return String类型
	 */
	public static String makeFieldAttrStr(String sDbType,FrmFld frmFld){
		String retStr="";
		retStr += !WebUtil.isEmpty(frmFld.getNullable())&& frmFld.getNullable().equals(erp.util.Const.YESNO_TYPE_NO)? " not null ":"";
		String sIspk = frmFld.getIspk();
		if(sIspk !=null && sIspk.equals(erp.util.Const.YESNO_TYPE_YES)){
			if(sDbType.equals(erp.util.Const.DB_TYPE_MYSQL))
				retStr += " auto_increment ";
			if(sDbType.equals(erp.util.Const.DB_TYPE_MSSQLSERVER))
				retStr += " identity ";
			if(sDbType.equals(erp.util.Const.DB_TYPE_ORACLE)){
				//oracle 的话实际上是需要给这个字段创建一个sequence
				//然后针对这个再建立一个触发器，或者用mybatis的selectkey处理
			}
			return retStr;
		}
		retStr += !WebUtil.isEmpty(frmFld.getDefault_value())? " default "+frmFld.getDefault_value():"";
		return retStr;
	}
}
