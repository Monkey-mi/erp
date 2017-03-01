package erp.erp.master.purchaseDetail.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseDetail.model.PurchaseContract;
import erp.erp.purchaseOrder.model.ProcurementOrder;


public interface PurchaseContractMapper {
	public List<ProcurementOrder> getPurchaseContractList(Map<String,Object> params);
	public void addPurchaseContract(ProcurementOrder obj);
	public void updatePurchaseContract(ProcurementOrder obj);
	public void deletePurchaseContract(ProcurementOrder obj);
	
	//刷新选择标记
	void updateContractDetailXzbj(Map<String,Object> params);
	//刷新首次标记
	void updateContractDetailScbj(Map<String,Object> params);
}
