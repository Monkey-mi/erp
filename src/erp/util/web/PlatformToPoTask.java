package erp.util.web;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.quartz.QuartzJobBean;

import erp.erp.purchaseOrder.service.OrderDeliveryRegisterService;
import erp.util.WebUtil;
public class PlatformToPoTask extends QuartzJobBean{
	private OrderDeliveryRegisterService orderDeliveryRegisterService;
	//判断作业是否执行的旗标  
    private boolean isRunning = false;
	public OrderDeliveryRegisterService getOrderDeliveryRegisterService() {
		return orderDeliveryRegisterService;
	}

	public void setOrderDeliveryRegisterService(
			OrderDeliveryRegisterService orderDeliveryRegisterService) {
		this.orderDeliveryRegisterService = orderDeliveryRegisterService;
	}

	@Override
	protected void executeInternal(JobExecutionContext arg0)throws JobExecutionException {
		if(!isRunning){
			isRunning = true;
			orderDeliveryRegisterService.SyncOrderDeliveryRegister();
			isRunning=false;
		}
	}

}
