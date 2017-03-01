package erp.common.db;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import erp.common.db.DBUtil;
import erp.util.SessionUtil;
import erp.util.WebUtil;
import erp.web.model.ExtDataSource;
import erp.web.service.DSUtilService;


public class MultiDataSource implements DataSource,ApplicationContextAware,BeanFactoryAware  {
    private static final String DEFAULT_DATASOURCE ="default_datasource";
    private static final String CURRENT_DATASOURCE_NAME ="current_datasource";
    //private static final String CURRENT_DBTYPE = "current_dbtype";
	private static final Logger logger = Logger.getLogger("service");
	private ApplicationContext applicationContext = null;
	private DefaultListableBeanFactory beanFactory =null;
	private DataSource dataSource = null;
	/* (non-Javadoc)
	 * @see javax.sql.DataSource#getConnection()
	 */
	public Connection getConnection() throws SQLException {
		return getDataSource().getConnection();
	}
  
	/* (non-Javadoc)
	 * @see javax.sql.DataSource#getConnection(java.lang.String, java.lang.String)
	 */
	public Connection getConnection(String username, String password)
			throws SQLException {
		return getDataSource().getConnection(username, password);
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#getLogWriter()
	 */
	public PrintWriter getLogWriter() throws SQLException {
		return getDataSource().getLogWriter();
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#getLoginTimeout()
	 */
	public int getLoginTimeout() throws SQLException {
		return getDataSource().getLoginTimeout();
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#setLogWriter(java.io.PrintWriter)
	 */
	public void setLogWriter(PrintWriter arg0) throws SQLException {
		getDataSource().setLogWriter(arg0);
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#setLoginTimeout(int)
	 */
	public void setLoginTimeout(int arg0) throws SQLException {
		getDataSource().setLoginTimeout(arg0); 
	}

	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}
	
	public DataSource getDataSource(String dataSourceName) throws SQLException{
		DataSource ds = null;
		StringBuilder sbErrMsg = new StringBuilder();
		if((dataSourceName==null||dataSourceName.equals(""))&&this.dataSource!=null){
			ds= this.dataSource;
		}
		if(this.applicationContext.containsBean(dataSourceName))
			//已经注册的直接返回即可
			ds= (DataSource)this.applicationContext.getBean(dataSourceName);
		else{
			//可能需要重新注册
			if(dataSourceName.equals(DEFAULT_DATASOURCE)||WebUtil.isEmpty(dataSourceName)){
				//注册默认数据源
				ds = setDefaultDataSource(sbErrMsg);
			}else{
				//按照名称注册指定数据源
				String strArray[] = dataSourceName.split("_");
				String dsCode = strArray[0];
				String dbName = strArray[1];
				DSUtilService dsUtilSrv = WebUtil.getAppCtx().getBean(DSUtilService.class);
				
				ExtDataSource extDs = dsUtilSrv.getExtDataSourceByCode(dsCode);
				if(extDs==null){
					sbErrMsg.append(String.format("外部数据源[%s]未定义!", dsCode));
				}else
					ds = setCurDataSource(dsCode,dbName,sbErrMsg);
			}
		}
		if(ds==null)
			throw new SQLException("获取数据源出错:"+sbErrMsg.toString());
		return ds;
	}
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public DataSource getDataSource() throws SQLException{
		return getDataSource(this.getCurDataSourceName());
	}

	@Override
	public boolean isWrapperFor(Class<?> arg0) throws SQLException {
		return false;
	}

	@Override
	public <T> T unwrap(Class<T> arg0) throws SQLException {
		return null;
	}
	
	
	@Override
	public void setBeanFactory(BeanFactory arg0) throws BeansException {
		this.beanFactory = (DefaultListableBeanFactory)arg0;
	}
	
	/**
	 * 加载指定的数据源
	 * @param dbName 数据库名或者schema
	 * @param eds    数据源配置
	 * @param sbErrMsg
	 * @return
	 */
	protected DataSource regDataSource(String dsName,ExtDataSource eds,StringBuilder sbErrMsg){
		String drvClassName = DBUtil.getDbDrvClassName(eds.getDstype());
		String url = DBUtil.getDbSrvUrl(eds.getDstype(), eds.getSrvaddr(), eds.getSrvport(), eds.getDbname());
		Properties p = WebUtil.getJdbcProperties();
		//设置数据库连接参数
		if(p==null){
			try {
				p = PropertiesLoaderUtils.loadProperties(new ClassPathResource("sysconfig/jdbc.properties"));
				WebUtil.setJdbcProperties(p);
			} catch (IOException e1) {
				sbErrMsg.append("无法加载数据库连接参数文件[sysconfig/jdbc.properties]!"+e1.getMessage());
				return null;
			}
		}
		if(!this.applicationContext.containsBean(dsName)){
			try{
				BeanDefinitionBuilder beanDefBuilder =BeanDefinitionBuilder.genericBeanDefinition(Class.forName("org.apache.commons.dbcp.BasicDataSource"));
				beanDefBuilder.addPropertyValue("driverClassName", drvClassName);
				beanDefBuilder.addPropertyValue("url", url);
				beanDefBuilder.addPropertyValue("username", eds.getSrvlogin());
				beanDefBuilder.addPropertyValue("password", eds.getSrvpwd());
				beanDefBuilder.addPropertyValue("maxActive", p.getProperty("jdbc.maxActive"));
				beanDefBuilder.addPropertyValue("initialSize", p.getProperty("jdbc.initialSize"));
				beanDefBuilder.addPropertyValue("maxWait", p.getProperty("jdbc.maxWait"));
				beanDefBuilder.addPropertyValue("maxIdle", p.getProperty("jdbc.maxIdle"));
				beanDefBuilder.addPropertyValue("minIdle", p.getProperty("jdbc.minIdle"));
				
				//<!-- 只要下面两个参数设置成小于8小时，就能避免MySql的8小时自动断开连接问题 -->
				beanDefBuilder.addPropertyValue("timeBetweenEvictionRunsMillis",18000);
				beanDefBuilder.addPropertyValue("minEvictableIdleTimeMillis",10800);
				this.beanFactory.registerBeanDefinition(dsName, beanDefBuilder.setScope("singleton").getRawBeanDefinition());
			}catch(Exception e){
				sbErrMsg.append(e.getMessage());
				return null;
			}
		}
		return (DataSource)this.applicationContext.getBean(dsName);	
	}
	/**
	 * 注册默认数据源
	 * @param sbErrMsg
	 * @return
	 */
	protected DataSource regDefaultDataSource(StringBuilder sbErrMsg){
		String dsName =DEFAULT_DATASOURCE;
		Properties p = WebUtil.getJdbcProperties();
		//设置数据库连接参数
		if(p==null){
			try {
				p = PropertiesLoaderUtils.loadProperties(new ClassPathResource("sysconfig/jdbc.properties"));
				WebUtil.setJdbcProperties(p);
			} catch (IOException e1) {
				sbErrMsg.append("无法加载数据库连接参数文件[sysconfig/jdbc.properties]!"+e1.getMessage());
				return null;
			}
		}
		if(!this.applicationContext.containsBean(dsName)){
			try{
				BeanDefinitionBuilder beanDefBuilder =BeanDefinitionBuilder.genericBeanDefinition(Class.forName("org.apache.commons.dbcp.BasicDataSource"));
				beanDefBuilder.addPropertyValue("driverClassName", p.getProperty("jdbc.driverClassName"));
				beanDefBuilder.addPropertyValue("url",p.getProperty("jdbc.databaseurl"));
				beanDefBuilder.addPropertyValue("username", p.getProperty("jdbc.username"));
				beanDefBuilder.addPropertyValue("password", p.getProperty("jdbc.password"));
				beanDefBuilder.addPropertyValue("maxActive", p.getProperty("jdbc.maxActive"));
				beanDefBuilder.addPropertyValue("initialSize", p.getProperty("jdbc.initialSize"));
				beanDefBuilder.addPropertyValue("maxWait", p.getProperty("jdbc.maxWait"));
				beanDefBuilder.addPropertyValue("maxIdle", p.getProperty("jdbc.maxIdle"));
				beanDefBuilder.addPropertyValue("minIdle", p.getProperty("jdbc.minIdle"));
				//<!-- 只要下面两个参数设置成小于8小时，就能避免MySql的8小时自动断开连接问题 -->
				beanDefBuilder.addPropertyValue("timeBetweenEvictionRunsMillis",18000);
				beanDefBuilder.addPropertyValue("minEvictableIdleTimeMillis",10800);
				this.beanFactory.registerBeanDefinition(dsName, beanDefBuilder.setScope("singleton").getRawBeanDefinition());
			}catch(Exception e){
				sbErrMsg.append(e.getMessage());
				return null;
			}
		}
		return (DataSource)this.applicationContext.getBean(dsName);
	}
	
	
	private boolean isExistsDataSource(String dsName){
		if(WebUtil.isEmpty(dsName))
			dsName =DEFAULT_DATASOURCE;
		return this.applicationContext.containsBean(dsName);
	}
	private  void setCurDataSourceName(String dsName){
		if(WebUtil.isEmpty(dsName))
			dsName =DEFAULT_DATASOURCE;
		SessionUtil.setAttribute(CURRENT_DATASOURCE_NAME, dsName);
	}
	private  String getCurDataSourceName(){
		Object obj = SessionUtil.getAttribute(CURRENT_DATASOURCE_NAME);
		if(WebUtil.isEmpty(obj)){
			//如果没有设定过当前数据源名称，则设定PlatForm的默认数据源
			StringBuilder sbErrMsg = new StringBuilder();
			setDefaultDataSource(sbErrMsg);
			obj = new String(DEFAULT_DATASOURCE);
		}
	    return obj.toString();
	}
    
	/**
	 * 设定默认数据源为当前数据源
	 * @param sbErrMsg
	 * @return
	 * @throws SQLException 
	 */
	public DataSource setDefaultDataSource(StringBuilder sbErrMsg){
		this.dataSource =regDefaultDataSource(sbErrMsg);
		if(this.dataSource!=null){	
			setCurDataSourceName(DEFAULT_DATASOURCE);
			//setCurDbType(DBUtil.getDbType(dataSource));
		}
		return dataSource;
	}
	
	/**
	 * 设定当前数据源，并使用指定的库名
	 * @param dsCode
	 * @param dbName
	 * @param sbErrMsg
	 * @return
	 * @throws SQLException 
	 */
	public DataSource setCurDataSource(String dsCode,String dbName,StringBuilder sbErrMsg) throws SQLException{
		
		DSUtilService dsUtilSrv = WebUtil.getAppCtx().getBean(DSUtilService.class);
		
		ExtDataSource extDs = dsUtilSrv.getExtDataSourceByCode(dsCode);
		if(extDs==null){
			sbErrMsg.append(String.format("外部数据源[%s]未定义!", dsCode));
			return null;
		}
		String dsName = dsCode+"_"+dbName;
		extDs.setDbname(dbName);
		return setCurDataSource(dsName,extDs,sbErrMsg);	
	}
	
	/**
	 * 设定当前数据源,并使用默认的库名
	 * @param dsCode
	 * @param sbErrMsg
	 * @return
	 * @throws SQLException
	 */
	public DataSource setCurDataSource(String dsCode,StringBuilder sbErrMsg) throws SQLException{
		DSUtilService dsUtilSrv = WebUtil.getAppCtx().getBean(DSUtilService.class);
		
		ExtDataSource extDs = dsUtilSrv.getExtDataSourceByCode(dsCode);
		if(extDs==null){
			sbErrMsg.append(String.format("外部数据源[%s]未定义!", dsCode));
			return null;
		}
		String dbName = extDs.getDbname();
		String dsName = dsCode+"_"+dbName;
		return setCurDataSource(dsName,extDs,sbErrMsg);
	}
	
	/**
	 * 设定当前数据源,并使用默认的库名
	 * @param dsCode
	 * @param sbErrMsg
	 * @return
	 * @throws SQLException
	 */
	public DataSource setCurDataSource(int dsId,StringBuilder sbErrMsg) throws SQLException{
		DSUtilService dsUtilSrv = WebUtil.getAppCtx().getBean(DSUtilService.class);
		
		ExtDataSource extDs = dsUtilSrv.getExtDataSourceByCode(dsId);
		if(extDs==null){
			sbErrMsg.append(String.format("外部数据源[%s]未定义!", dsId));
			return null;
		}
		String dbName = extDs.getDbname();
		String dsName = dsId+"_"+dbName;
		return setCurDataSource(dsName,extDs,sbErrMsg);
	}
	
	private DataSource setCurDataSource(String dsName,ExtDataSource extDs,StringBuilder sbErrMsg) throws SQLException{
		DataSource datasource = null;
		//检查该数据源是否已经注册,已经注册的直接切换过去，否则要注册
		if(isExistsDataSource(dsName)){
			datasource = getDataSource(dsName);
			if(datasource!=null){
				setCurDataSourceName(dsName);
				//setCurDbType(DBUtil.getDbType(datasource));
			}
			return datasource;
		}
		//注册前先测试连接
		if(!DBUtil.testDbConn(extDs.getDstype(), extDs.getSrvaddr(), extDs.getSrvport(),
				extDs.getDbname(), extDs.getSrvlogin(), extDs.getSrvpwd(), sbErrMsg))
			return null;
		
		//注册数据源
		datasource = regDataSource(dsName, extDs, sbErrMsg);
		if(datasource==null)
			return null;
		setCurDataSourceName(dsName);
	    return datasource;	
	}
	

	public String getCurDbType() throws SQLException {
		return DBUtil.getDbType(this.getDataSource());
	}
	
}