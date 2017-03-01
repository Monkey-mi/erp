package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.SaleFeeMapper;
import erp.erp.PayApply.model.SaleFee;
import erp.erp.PayApply.model.SaleFeeImp;
import erp.erp.PayApply.model.SupplyInvoiceInfo;
@Service
public class SaleFeeService {
	
	@Autowired
	private SaleFeeMapper saleFeeMapper;
	
	public List<SaleFee> getSaleFeeList(Map<String, Object> params){
		return saleFeeMapper.getSaleFeeList(params); 
	}
	public void addSaleFee(SaleFee[] arr) {
		for (SaleFee obj : arr) {
			saleFeeMapper.addSaleFee(obj);
		}
	}

	public void updateSaleFee(SaleFee[] arr) {
		for (SaleFee obj : arr) {
			saleFeeMapper.updateSaleFee(obj);
		}
	}


	public void deleteSaleFee(SaleFee[] arr) {
		for (SaleFee obj : arr) {
			saleFeeMapper.deleteSaleFee(obj);
		}
	}
	public List<SaleFeeImp> getSaleFeeImpList(Map<String,Object> params) {
		return saleFeeMapper.getSaleFeeImpList(params);
	}
}
