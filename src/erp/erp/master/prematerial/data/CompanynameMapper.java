
package erp.erp.master.prematerial.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.prematerial.model.Companyname;


public interface CompanynameMapper {
	public List<Companyname> getCompanynameList(Map<String,Object> params);
	public void addCompanyname(Companyname obj);
	public void updateCompanyname(Companyname obj);
	public void deleteCompanyname(Companyname obj);
}