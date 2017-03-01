package erp.util;




import java.util.concurrent.ConcurrentLinkedQueue;

import erp.util.WebUtil;
import erp.web.model.TpsLog;
import erp.web.service.ModuleService;

public class TpsLogger implements Runnable {
	
	private Thread worker = null;
	private static ConcurrentLinkedQueue<TpsLog> logQueue= new ConcurrentLinkedQueue<TpsLog>(); 
	private boolean toRun=true; 
	private int timeCount=0;
	private int maxRowCount = 100;
	private int maxTimeCount = 60;
	//日志写入
	private void flush(){
		TpsLog log=null;
		if(timeCount%maxTimeCount==0||logQueue.size()>=maxRowCount)
			while((log=logQueue.poll())!=null){
				WebUtil.getAppCtx().getBean(ModuleService.class).addLog(log);
			}
	}
	
	//日志入队
	public void log(TpsLog log){
		logQueue.offer(log);
	}
	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true){
			flush();
			if(toRun==false)
				break;
			try {
				Thread.sleep(1000);
				this.timeCount++;
			} catch (InterruptedException e) {
			}
		}
	}

	public void start(){
		worker = new Thread(this);
		worker.start();
	}
	public void stop(){
		toRun = false;
		TpsLog log=null;
		while((log=logQueue.poll())!=null){
			WebUtil.getAppCtx().getBean(ModuleService.class).addLog(log);
		}
	}
	
}
