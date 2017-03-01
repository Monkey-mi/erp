package erp.erp.master.company.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.company.model.Company;
import erp.erp.master.company.model.CompanyShow;


public interface CompanyMapper {
	public List<Company> getCompanyList(Map<String,Object> params);
	public void addCompany(Company obj);
	public void updateCompany(Company obj);
	public void deleteCompany(Company obj);
	List<CompanyShow> getCompanyShowList(Map<String,Object> params);
	List<CompanyShow> getCompanyShowAList(Map<String,Object> params);
	List<CompanyShow> getCompanyShowBList(Map<String,Object> params);
}
