package erp.erp.companyQuot.data;

import java.util.List;
import java.util.Map;

import erp.erp.companyQuot.model.QuotDetail;


public interface QuotDetailMapper {
	public List<QuotDetail> getQuotDetailList(Map<String,Object> params);
	public void addQuotDetail(QuotDetail obj);
	public void firaddQuotDetail(QuotDetail obj);
	public void updateQuotDetail(QuotDetail obj);
	public void deleteQuotDetail(QuotDetail obj);
}
