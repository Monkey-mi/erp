package erp.erp.purchaseInspectionManage.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseInspectionManage.model.ImpPurchaseInspetion;


public interface ImpPurchaseInspetionMapper {
	public List<ImpPurchaseInspetion> getImpPurchaseInspetionList(Map<String,Object> params);
	public void addImpPurchaseInspetion(ImpPurchaseInspetion obj);
	public void updateImpPurchaseInspetion(ImpPurchaseInspetion obj);
	public void deleteImpPurchaseInspetion(ImpPurchaseInspetion obj);
}
