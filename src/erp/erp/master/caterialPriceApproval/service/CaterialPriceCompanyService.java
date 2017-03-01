package erp.erp.master.caterialPriceApproval.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.caterialPriceApproval.data.CaterialPriceCompanyMapper;
import erp.erp.master.caterialPriceApproval.model.CaterialPriceCompany;


@Service
public class CaterialPriceCompanyService {
	@Autowired
	private CaterialPriceCompanyMapper mapper;

	/**
	* @Description: 材料审批价格CURD
	* Request caterialpriceapproval/caterialpricecompany.act?method=******
	* Response {data:[{List<CaterialPriceCompany>}]} <br/><br/>
	*/
	public List<CaterialPriceCompany> getCaterialPriceCompanyList(Map<String,Object> params) {
		return mapper.getCaterialPriceCompanyList(params);
	}
	public void addCaterialPriceCompany(CaterialPriceCompany[] arr) {
		for(CaterialPriceCompany obj: arr) {
			mapper.addCaterialPriceCompany(obj);
		}
	}
	public void updateCaterialPriceCompany(CaterialPriceCompany[] arr) {
		for(CaterialPriceCompany obj: arr) {
			mapper.updateCaterialPriceCompany(obj);
		}
	}
	public void deleteCaterialPriceCompany(CaterialPriceCompany[] arr) {
		for(CaterialPriceCompany obj: arr) {
			mapper.deleteCaterialPriceCompany(obj);
		}
	}
}
