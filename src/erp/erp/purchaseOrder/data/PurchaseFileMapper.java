package erp.erp.purchaseOrder.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseOrder.model.PurchaseFile;


public interface PurchaseFileMapper {
	public List<PurchaseFile> getPurchaseFileList(Map<String,Object> params);
	public void addPurchaseFile(PurchaseFile obj);
	public void updatePurchaseFile(PurchaseFile obj);
	public void deletePurchaseFile(PurchaseFile obj);
	int getMaxWjbh(Map<String,Object> params);//取wjbh
	void updateFjzt(Map<String,Object> params);
}
