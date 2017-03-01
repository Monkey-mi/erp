package erp.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;

import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

/**   
* @Title: FileUtil.java 
* @Package erp.util 
* @Description:文件通用类
* @author wuqia
* @date 2016-8-19 下午7:35:31 
* @version V1.0   
*/
public class FileUtil {
	/**
	 * Description: 将byte 数组存到指定路径
	 * @Version1.0  wuqia 创建
	 * @param byte[] b
	 * @param String path 下载后保存到本地的路径
	 * @return
	 */
	public static void byteToFile(byte[] b,String path) throws IOException{
		OutputStream outputStream = null;
        File finalFile = new File(path);
        finalFile.setReadable(true, false);
        finalFile.setWritable(true, false);
        File file=new File(finalFile.getParent());
        if(!file.exists()){
        	file.mkdirs();
          }
        outputStream = new FileOutputStream(finalFile);
        if(b!=null){
        	outputStream.write(b);
        	outputStream.flush();
        	outputStream.close();
        }
	}
	/**
	 * Description: 将byte 数组存到Ftp服务器指定路径
	 * @Version1.0  wuqia 创建
	 * @param byte[] b
	 * @param String path 下载后保存到本地的路径
	 * @return
	 */
	public static String byteToFtp(String url,byte[] b,String fileName){
		FTPClient ftpClient = new FTPClient(); 
		if(FtpParam.getFtpUrl()==null){
			new FtpParam();
		}
		String ftpurl=FtpParam.getFtpUrl();//ftp服务器地址
		String ftppassword=FtpParam.getFtpPsw();//密码
		String ftpuser=FtpParam.getFtpUser();//用户名
		String urlId=url;
		String filePath = urlId+fileName;
		int port=FtpParam.getFtpport();//端口号
		InputStream fis = null;
		boolean flag = false;
		try { 
            ftpClient.connect(ftpurl,port); 
            ftpClient.login(ftpuser,ftppassword);
            ftpClient.enterLocalPassiveMode();
            ftpClient.makeDirectory(urlId);
            fis =new ByteArrayInputStream(b);
            ftpClient.setControlEncoding("UTF-8");
            //设置文件类型（二进制） 
            ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE); 
            flag = ftpClient.storeFile(filePath, fis); 
        } catch (IOException e) { 
            e.printStackTrace(); 
            throw new RuntimeException("FTP客户端出错！", e); 
        } finally { 
            IOUtils.closeQuietly(fis); //关闭一个流忽略nulls和例外的情况。
            try { 
                ftpClient.disconnect(); 
            } catch (IOException e) { 
                e.printStackTrace(); 
                throw new RuntimeException("关闭FTP连接发生异常！", e); 
            } 
        } 
		return filePath;
	} 
	/**
	 * Description: 从FTP服务器下载文件 返回 byte []
	 * @Version1.0 Jul 27, 2008 5:32:36 PM by 崔红保（cuihongbao@d-heaven.com）创建
	 * @param remotePath FTP服务器上的相对路径
	 * @param fileName 要下载的文件名
	 * @param localPath 下载后保存到本地的路径
	 * @return
	 */
	public static byte [] FtpToByte(String url,String fileName) {
		boolean success = false;
		FTPClient ftpClient = new FTPClient(); 
		if(FtpParam.getFtpUrl()==null){
			new FtpParam();
		}
		String ftpurl=FtpParam.getFtpUrl();//ftp服务器地址
		String ftppassword=FtpParam.getFtpPsw();//密码
		String ftpuser=FtpParam.getFtpUser();//用户名
		String urlId=url;
		String filePath = urlId+fileName;
		int port=FtpParam.getFtpport();//端口号
		try {
			int reply;
			System.out.println("00");
			ftpClient.connect(ftpurl, port);
			System.out.println("01");
			ftpClient.login(ftpuser, ftppassword);//登录
			reply = ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				ftpClient.disconnect();
			}
			ftpClient.changeWorkingDirectory(url);//转移到FTP服务器目录
			System.out.println("02");
			FTPFile[] fs = ftpClient.listFiles();
			for(FTPFile ff:fs){
				if(ff.getName().equals(fileName)){
					ByteArrayOutputStream b = new ByteArrayOutputStream();
					OutputStream is=null;
					
					return b.toByteArray();
				}
			}
			ftpClient.logout();
			success = true;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (ftpClient.isConnected()) {
				try {
					ftpClient.disconnect();
				} catch (IOException ioe) {
				}
			}
		}
		return null;
	}
   public static byte[] getBytes(String filePath){  
        byte[] buffer = null;  
        try {  
            File file = new File(filePath);  
            FileInputStream fis = new FileInputStream(file);  
            ByteArrayOutputStream bos = new ByteArrayOutputStream(1000);  
            byte[] b = new byte[1000];  
            int n;  
            while ((n = fis.read(b)) != -1) {  
                bos.write(b, 0, n);  
            }  
            fis.close();  
            bos.close();  
            buffer = bos.toByteArray();  
        } catch (FileNotFoundException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        return buffer;  
    }   
}

