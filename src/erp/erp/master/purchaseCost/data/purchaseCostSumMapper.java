package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.purchaseCostSum;


public interface purchaseCostSumMapper {
	public List<purchaseCostSum> getpurchaseCostSumList(Map<String,Object> params);
	public void addpurchaseCostSum(purchaseCostSum obj);
	public void updatepurchaseCostSum(purchaseCostSum obj);
	public void deletepurchaseCostSum(purchaseCostSum obj);
}
