package erp.util;

import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

public class FtpParam {
	private static String ftpUrl;
	private static String ftpUser;
	private static String ftpPsw;
	private static int ftpport;
	//初始化变量
	public FtpParam() {
		Properties myProperty = new Properties();
		try {
			myProperty=PropertiesLoaderUtils.loadProperties(new ClassPathResource("sysconfig/ftp.properties"));
			ftpUrl=myProperty.getProperty("ftpurl");//ftp服务器地址
			
			ftpPsw=myProperty.getProperty("ftppassword");//密码
			
			ftpUser=myProperty.getProperty("ftpuser");//用户名
			
			ftpport=Integer.parseInt(myProperty.getProperty("port"));//端口号
		} catch (IOException e) {
			e.printStackTrace();
		};
	}
	public static String getFtpUrl() {
		return ftpUrl;
	}
	public static void setFtpUrl(String ftpUrl) {
		FtpParam.ftpUrl = ftpUrl;
	}
	public static String getFtpUser() {
		return ftpUser;
	}
	public static void setFtpUser(String ftpUser) {
		FtpParam.ftpUser = ftpUser;
	}
	public static String getFtpPsw() {
		return ftpPsw;
	}
	public static void setFtpPsw(String ftpPsw) {
		FtpParam.ftpPsw = ftpPsw;
	}
	public static int getFtpport() {
		return ftpport;
	}
	public static void setFtpport(int ftpport) {
		FtpParam.ftpport = ftpport;
	}
	
}
