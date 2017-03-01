package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.purchaseCostDetial;


public interface purchaseCostDetialMapper {
	public List<purchaseCostDetial> getpurchaseCostDetialList(Map<String,Object> params);
	public void addpurchaseCostDetial(purchaseCostDetial obj);
	public void updatepurchaseCostDetial(purchaseCostDetial obj);
	public void deletepurchaseCostDetial(purchaseCostDetial obj);
}
