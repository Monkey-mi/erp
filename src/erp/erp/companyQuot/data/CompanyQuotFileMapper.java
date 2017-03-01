package erp.erp.companyQuot.data;

import java.util.List;
import java.util.Map;


import erp.erp.companyQuot.model.CompanyQuotFile;

public interface CompanyQuotFileMapper {
	public List<CompanyQuotFile> getCompanyQuotFile(Map<String,Object> params);
    int getWjbhOne(Map<String,Object> params);
	public void addCompanyQuotFile(CompanyQuotFile obj);
	public void updateCompanyQuotFile(CompanyQuotFile obj);
	public void deleteCompanyQuotFile(CompanyQuotFile obj);
	
}
