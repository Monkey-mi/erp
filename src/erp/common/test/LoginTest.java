package erp.common.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("../../../sysconfig/common-servlet.xml")
public class LoginTest {

	public Connection getConn(){
		 String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";  //加载JDBC驱动
		  String dbURL = "jdbc:sqlserver://192.168.1.40:1433; DatabaseName=tps_platform";  //连接服务器和数据库
		  String userName = "sa";  //默认用户名
		  String userPwd = "topsun@dmin68";  //密码
		  Connection dbConn=null;
		  try {
		   Class.forName(driverName);
		   dbConn = DriverManager.getConnection(dbURL, userName, userPwd);
		   System.out.println("Connection Successful!");  //如果连接成功 控制台输出Connection Successful!
		  } catch (Exception e) {
		   e.printStackTrace();
		  }
		  return dbConn;
	}
	@Test
	public void readList(){
		 Connection con = getConn();    
	        Statement stmt = null;    
	        ResultSet rs = null; 
		 try {      
	            String SQL = "SELECT TOP 3 * FROM t_sys_frm_fld";    
	            stmt = con.createStatement();    
	            rs = stmt.executeQuery(SQL);    
	    
	            while (rs.next()) {    
	                System.out.println(rs.getString(3) + " " + rs.getString(4));    
	            }    
	        }    
	    
	        catch (Exception e) {    
	            e.printStackTrace();    
	        }    
		 	finally {    
	            if (rs != null)    
	                try {    
	                    rs.close();    
	                } catch (Exception e) {    
	                }    
	            if (stmt != null)    
	                try {    
	                    stmt.close();    
	                } catch (Exception e) {    
	                }    
	            if (con != null)    
	                try {    
	                    con.close();    
	                } catch (Exception e) {    
	          }    
	        }    
	}
}
