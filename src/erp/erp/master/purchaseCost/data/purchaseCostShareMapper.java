package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.purchaseCostShare;


public interface purchaseCostShareMapper {
	public List<purchaseCostShare> getpurchaseCostShareList(Map<String,Object> params);
	public void addpurchaseCostShare(purchaseCostShare obj);
	public void updatepurchaseCostShare(purchaseCostShare obj);
	public void deletepurchaseCostShare(purchaseCostShare obj);
}
