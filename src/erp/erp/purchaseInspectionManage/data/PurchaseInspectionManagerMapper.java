package erp.erp.purchaseInspectionManage.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.SubmitObject;
import erp.erp.purchaseInspectionManage.model.PurchaseInspectionManager;


public interface PurchaseInspectionManagerMapper {
	public List<PurchaseInspectionManager> getPurchaseInspectionManagerList(Map<String,Object> params);
	public void addPurchaseInspectionManager(PurchaseInspectionManager obj);
	public void updatePurchaseInspectionManager(PurchaseInspectionManager obj);
	public void deletePurchaseInspectionManager(Map<String,Object> params);
	public void updatePurchaseInspectionFpbj(Map<String,Object> params);
	public List<SubmitObject> getDistributeObjectList(Map<String,Object> params);
	public int getLl_id(Map<String,Object> params);
	public int getLlf_id(Map<String,Object> params);
	public String getLs_gzgw_fp(Map<String,Object> params);
	public String getLs_gzgw_fpdx(Map<String,Object> params);
	public void addT_inf_cpcgyhlcb(Map<String,Object> params);
	public void deleteT_inf_cpcgyhlcb(Map<String,Object> params);
	public void addDistributeObject(Map<String,Object> params);
	public void deleteDistributeObject(Map<String,Object> params);
	
	public List<PurchaseInspectionManager> getEditPurchaseInspectionList(Map<String,Object> params);
	public void addEditPurchaseInspection(PurchaseInspectionManager obj);
	public void updateEditPurchaseInspection(PurchaseInspectionManager obj);
	public void deleteEditPurchaseInspection(Map<String,Object> params);
	
	public int getMaxYhno(Map<String,Object> params);
}
