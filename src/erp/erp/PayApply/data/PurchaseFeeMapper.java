package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.PurchaseFee;
import erp.erp.PayApply.model.PurchaseFeeImp;

public interface PurchaseFeeMapper {
	public List<PurchaseFee> getPurchaseFeeList(Map<String, Object> params);
	public List<PurchaseFeeImp> getPurchaseFeeImpList(Map<String,Object> params);
	public void addPurchaseFee(PurchaseFee obj);
	public void updatePurchaseFee(PurchaseFee obj);
	public void deletePurchaseFee(PurchaseFee obj);
}
