package erp.erp.master.caterialPriceApproval.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.caterialPrice.model.CaterialPrice;
import erp.erp.master.caterialPriceApproval.model.CaterialPriceApproval;


public interface CaterialPriceApprovalMapper {
	public List<CaterialPriceApproval> getCaterialPriceApprovalList(Map<String,Object> params);
	public void addCaterialPriceApproval(CaterialPriceApproval obj);
	public void updateCaterialPriceApproval(CaterialPriceApproval obj);
	public void deleteCaterialPriceApproval(CaterialPriceApproval obj);
	//价格公式
	List<CaterialPrice> getCaterialPriceFormula(Map<String,Object> params);
	
	//级联删除
	void deleteCompanyByKey(Map<String,Object> params);
	void deleteCaterialPriceDetailByKey(Map<String,Object> params);
	
	int getCaterialPriceClddAndJgsp(CaterialPriceApproval obj);
	
	int getBeforRefreshPrice(Map<String,Object> params);
	
	//控价刷新
	void getRefreshPrice(Map<String,Object> params);
	
	String getStringFromSql(Map<String,Object> params);
}
