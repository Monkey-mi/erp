package erp.erp.purchaseInspectionManage.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseInspectionManage.model.PurchaseInspectionPono;


public interface PurchaseInspectionPonoMapper {
	public List<PurchaseInspectionPono> getPurchaseInspectionPonoList(Map<String,Object> params);
	public void addPurchaseInspectionPono(PurchaseInspectionPono obj);
	public void updatePurchaseInspectionPono(PurchaseInspectionPono obj);
	public void deletePurchaseInspectionPono(PurchaseInspectionPono obj);
}
