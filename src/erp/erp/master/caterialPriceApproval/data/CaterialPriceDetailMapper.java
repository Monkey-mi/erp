package erp.erp.master.caterialPriceApproval.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.caterialPriceApproval.model.CaterialPriceDetail;


public interface CaterialPriceDetailMapper {
	public List<CaterialPriceDetail> getCaterialPriceDetailList(Map<String,Object> params);
	public void addCaterialPriceDetail(CaterialPriceDetail obj);
	public void updateCaterialPriceDetail(CaterialPriceDetail obj);
	public void deleteCaterialPriceDetail(CaterialPriceDetail obj);
}
