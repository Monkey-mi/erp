package erp.erp.master.caterialPriceApproval.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.caterialPriceApproval.model.CaterialPriceCompany;


public interface CaterialPriceCompanyMapper {
	public List<CaterialPriceCompany> getCaterialPriceCompanyList(Map<String,Object> params);
	public void addCaterialPriceCompany(CaterialPriceCompany obj);
	public void updateCaterialPriceCompany(CaterialPriceCompany obj);
	public void deleteCaterialPriceCompany(CaterialPriceCompany obj);
}
