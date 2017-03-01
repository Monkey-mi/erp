package erp.util;

import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

public class OtherParam {
	private static int companyId;
	private static String purchaseOrderFileUrl;
	//初始化变量
	public OtherParam() {
		Properties myProperty = new Properties();
		try {
				myProperty=PropertiesLoaderUtils.loadProperties(new ClassPathResource("sysconfig/other.properties"));
				companyId=Integer.parseInt(myProperty.getProperty("companyId"));//平台映射公司id
				purchaseOrderFileUrl=myProperty.getProperty("purchaseOrderFileUrl");
			} catch (IOException e) {
				e.printStackTrace();
			};
	}
	
	public static String getPurchaseOrderFileUrl() {
		return purchaseOrderFileUrl;
	}

	public static void setPurchaseOrderFileUrl(String purchaseOrderFileUrl) {
		OtherParam.purchaseOrderFileUrl = purchaseOrderFileUrl;
	}

	public static int getCompanyId() {
		return companyId;
	}
	public static void setCompanyId(int companyId) {
		OtherParam.companyId = companyId;
	}
	

}
