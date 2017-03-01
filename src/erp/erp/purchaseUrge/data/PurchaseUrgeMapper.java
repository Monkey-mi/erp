package erp.erp.purchaseUrge.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseUrge.model.CalForNumber;
import erp.erp.purchaseUrge.model.ConfirmTime;
import erp.erp.purchaseUrge.model.OrderDeliveryNoticedetails;
import erp.erp.purchaseUrge.model.ProcessCost;
import erp.erp.purchaseUrge.model.PurchaseUrge;
import erp.erp.purchaseUrge.model.PurchaseUrgeCollect;
import erp.erp.purchaseUrge.model.PurchaseUrgeDetail;
import erp.erp.purchaseUrge.model.PurchaseUrgeOth;
import erp.erp.purchaseUrge.model.RollOutput;
import erp.erp.purchaseUrge.model.SteelFrameDetail;
import erp.erp.purchaseUrge.model.SynergyUrge;


public interface PurchaseUrgeMapper {
	public List<PurchaseUrge> getPurchaseUrgeList(Map<String,Object> params);
	public List<PurchaseUrge> getPurchaseUrgeCount(Map<String,Object> params);
	public List<PurchaseUrgeDetail> getPurchaseUrgeDetailList(Map<String,Object> params);
	
	public List<PurchaseUrgeOth> getPurchaseUrgeOthList(Map<String,Object> params);
	
	public void updateAogState(Map<String,Object> params);
	
	public void updateAogSyncState(Map<String,Object> params);
	
	public List<ConfirmTime> getConfirmTimeList(Map<String,Object> params);
	
	public void updateConfirmTime(ConfirmTime obj);
	
	public List<RollOutput> getRollOutputList(Map<String,Object> params);
	
	public List<RollOutput> getRollOutputOneList(Map<String,Object> params);
	
	public List<PurchaseUrgeCollect> getPurchaseUrgeCollectList(Map<String,Object> params);
	
	public List<CalForNumber> getCalForNumberList(Map<String,Object> params);
	
	public List<SteelFrameDetail> getSteelFrameDetailList(Map<String,Object> params);
	
	public List<ProcessCost> getProcessCostList(Map<String,Object> params);
	//获取协同追催发送信息
	public List<SynergyUrge> getSynergyUrgeList(Map<String,Object> params);
	//回填中间表
	public void updatePoWithPlatform(Map<String,Object> params);
	//根据分组原则获取排列
	public List<String> getHtxhList(Map<String,Object> params);
	//刷新 确认交期
	public void updatePurchaseOrderTime(Map<String,Object> params);
	//获取汇总合计信息
	List<PurchaseUrgeCollect> getPurchaseUrgeCollectCount(Map<String,Object> params);
}
