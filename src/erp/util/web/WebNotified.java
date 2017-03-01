package erp.util.web;


import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Properties;


import org.apache.log4j.Logger;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import erp.util.TpsLogger;
import erp.util.WebUtil;

@Component
public class WebNotified implements ApplicationListener<ApplicationEvent> {
	@Autowired
	private ApplicationContext appCtx;
	
	@Autowired
	private RequestMappingHandlerAdapter requestMappingHandlerAdapter;
	protected static Logger logger = Logger.getLogger("service");
	
	private ObjectMapper initObjectMapper(){
		//重新设置MappingJacksonHttpMessageConverter的ObjectMapper,
		//统一设定日期格式为yyyy-MM-dd HH:mm:ss
		
		ObjectMapper objectMapper = new ObjectMapper();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		SerializationConfig serConfig = objectMapper.getSerializationConfig(); 
		serConfig.setDateFormat(dateFormat); 
		serConfig.set(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false);
		DeserializationConfig deserConfig = objectMapper.getDeserializationConfig();  
		deserConfig.setDateFormat(dateFormat);
		//空对象不要抛出异常
		objectMapper.disable(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS);
		// 设置输入时忽略在JSON字符串中存在但Java对象实际没有的属性  
		//deserConfig.set(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,false);
		objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		//objectMapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);  

		//找到系统中已经加载的MappingJacksonHttpMessageConverter，并重新设置ObjectMapper
		//这是3.0.x支持的
		//HttpMessageConverter<?>[] httpMsgCvts=annotationMethodHandlerAdapter.getMessageConverters();
		//这是3.1.x支持的
		List<HttpMessageConverter<?>> httpMsgCvts =requestMappingHandlerAdapter.getMessageConverters();
		for(HttpMessageConverter<?> cvt:httpMsgCvts){
			if(cvt instanceof MappingJacksonHttpMessageConverter){
				((MappingJacksonHttpMessageConverter)cvt).setObjectMapper(objectMapper);
				break;
			}
		}
		return objectMapper;
	} 
	
	@Override
	public void onApplicationEvent(ApplicationEvent appEvent) {
		// TODO Auto-generated method stub
		
		
		StringBuilder sbErrMsg = new StringBuilder();
		logger.debug("---------------"+appCtx.getDisplayName());
		String AppCtxName ="UnKnown";
		if(appCtx.getDisplayName().indexOf("common")>=0){
			AppCtxName = "common";
		}else if(appCtx.getDisplayName().indexOf("tps")>=0){
				AppCtxName = "tps";
		}else if(appCtx.getDisplayName().indexOf("crm")>=0){
			AppCtxName = "crm";		
			
		}else if(appCtx.getDisplayName().indexOf("drp")>=0){
			AppCtxName = "drp";		
		}
		else if(appCtx.getDisplayName().indexOf("erp")>=0){
				AppCtxName = "erp";		
				
		}else if(appCtx.getDisplayName().indexOf("srm")>=0){
				AppCtxName = "srm";		
				
			}
		String appName ="";
		if(appEvent instanceof ContextRefreshedEvent){
			if(appCtx instanceof WebApplicationContext){
				appName=((WebApplicationContext)appCtx).getServletContext().getContextPath();
			}
			logger.info(String.format("应用程序(CtxName=[%s:%s]启动中...",appName,AppCtxName));
			if(!WebUtil.isEmpty(appCtx)){
				logger.info(String.format("应用程序(CtxName=[%s:%s]进行初始化设置...",appName,AppCtxName));
				//重新设置Json对象映射配置
				ObjectMapper objMapper = initObjectMapper();
				if (WebUtil.getObjectMapper()==null)
					WebUtil.setObjectMapper(objMapper);
					//设置jna类加载路径
					String loaderPath=Thread.currentThread().getContextClassLoader().getResource("").getPath();
//					System.out.println(loaderPath);
					loaderPath = loaderPath.substring(1, loaderPath.length()-1);
					System.setProperty("jna.library.path",System.getProperty("java.class.path")+";"+loaderPath);
					
					if(WebUtil.getJdbcProperties()==null){
						try {
							Properties p = PropertiesLoaderUtils.loadProperties(new ClassPathResource("sysconfig/jdbc.properties"));
							WebUtil.setJdbcProperties(p);
							
						} catch (IOException e1) {
							logger.info("无法加载数据库连接参数文件[sysconfig/jdbc.properties]!");
						}
					}
					logger.info(String.format("应用程序(CtxName=[%s:%s]启动完成...",appName,AppCtxName));
					
					if(AppCtxName.equals("common")/*||AppCtxName.equals("UnKnown")*/){
						if(WebUtil.getAppCtx()==null)
							WebUtil.setAppCtxCommon(appCtx);
					}
					else if (AppCtxName.equals("tps")){
							WebUtil.setAppCtx(appCtx);
							WebUtil.setDebug(true);
							//启动日志
							WebUtil.setLogger(new TpsLogger());
							WebUtil.getLogger().start();
						
					}else{
						//将额外的应用加入
						WebUtil.setAppCtx(AppCtxName, appCtx);
					}
				}else{
					logger.info(String.format("应用程序(CtxName=[%s:%s]上下文加载失败！请检查系统配置!",appName,AppCtxName));
				}
				
			}
				else if(appEvent instanceof ContextClosedEvent){
					//应用关闭时 
					WebUtil.getLogger().stop();
					logger.info(String.format("应用程序(CtxName=[%s:%s]关闭中...",appName,AppCtxName));
				}
		}
}
