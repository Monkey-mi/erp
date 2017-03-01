package erp.erp.master.prematerial.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.prematerial.data.CompanynameMapper;
import erp.erp.master.prematerial.model.Companyname;

@Service
public class CompanynameService {
	@Autowired
	private CompanynameMapper mapper;


	public List<Companyname> getCompanynameList(Map<String,Object> params) {
		return mapper.getCompanynameList(params);
	}
	public void addCompanyname(Companyname[] arr) {
		for(Companyname obj: arr) {
			mapper.addCompanyname(obj);
		}
	}
	public void updateCompanyname(Companyname[] arr) {
		for(Companyname obj: arr) {
			mapper.updateCompanyname(obj);
		}
	}
	public void deleteCompanyname(Companyname[] arr) {
		for(Companyname obj: arr) {
			mapper.deleteCompanyname(obj);
		}
	}
}
