package erp.util.web;

import java.util.Date;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

import erp.erp.purchaseOrder.service.TaskCommonService;
import erp.util.WebUtil;

public class PoToPlatformTask extends QuartzJobBean{
	private TaskCommonService taskCommon=WebUtil.getAppCtx("erp").getBean(TaskCommonService.class);
	//判断作业是否执行的旗标  
    private boolean isRunning = false;
	public TaskCommonService getTaskCommon() {
		return taskCommon;
	}
	public void setTaskCommon(TaskCommonService taskCommon) {
		this.taskCommon = taskCommon;
	}
	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		// TODO Auto-generated method stub
		if(!isRunning){
			isRunning=true;
			taskCommon.SyncPurchaseOrderDetail();
			taskCommon.SyncOrderQualitycheck();
			isRunning=false;
		}
	}

}
