package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.BenefitDept;
import erp.erp.master.purchaseCost.model.MainCost;
import erp.erp.master.purchaseCost.model.PayCategory;
import erp.erp.master.purchaseCost.model.Payfs;
import erp.erp.master.purchaseCost.model.PurchaseCost;


public interface PurchaseCostMapper {
	public List<PurchaseCost> getPurchaseCostList(Map<String,Object> params);
	public void addPurchaseCost(PurchaseCost obj);
	public void addPayfs(Payfs obj);
	public void updatePurchaseCost(PurchaseCost obj);
	public void updatePayfs(Map<String,Object> params);
	public void deletePurchaseCost(Map<String,Object> params);
	public void deleteCgfydzb(Map<String,Object> params);
	public void deleteCgfy_fjb(Map<String,Object> params);
	public void deleteSplc_spjlb(Map<String,Object> params);
	public void deleteCgfyb_fkb(Map<String,Object> params);
	int heckStatusSame(Map<String,Object> params);
	String getPurchaseCostOne(Map<String,Object> params);
	void updateStatus(Map<String,Object> params);
	void doAppro(Map<String,Object> params);
	int hasAppro(Map<String,Object> params);
	String ifPay(Map<String,Object> params);
	String hasPermission(Map<String,Object> params);
	String getMaxfydj(Map<String,Object> params);
	String getyskzdj(Map<String,Object> params);
	int ifFksqd(Map<String,Object> params);
	String getRwbj(Map<String,Object> params);
	Integer getYdsl(Map<String,Object> params);
	Integer ifhaveYsje(Map<String,Object> params);
	String getRealSpbj(Map<String,Object> params);
	String getWbbh(Map<String,Object> params);
	String getYsje(Map<String,Object> params);
	String getDsfy(Map<String,Object> params);
	String getYdfy(Map<String,Object> params);
	String getZffyhz(Map<String,Object> params);
    String getHtze(Map<String,Object> params);
    String getfyjeSum(Map<String,Object> params);
	int CompeletePrice(Map<String,Object> params);
	int checkStatusSame(Map<String,Object> params);
	//支付类别树
	public List<PayCategory> getPayCategoryList(Map<String,Object> params);
	public List<BenefitDept> getBenefitDeptList(Map<String,Object> params);
    //该月费用单是否已付款
	public List<Payfs> getPayfs(Map<String,Object> params);
	Map<String,Object> getJidu(Map<String,Object> params);
	List<String> getJlbhList(Map<String,Object> params);
	double getSumFyje(Map<String,Object> params);
	void updateYdfy(Map<String,Object> params);
	List<MainCost> getMainCost(Map<String,Object> params);
}
