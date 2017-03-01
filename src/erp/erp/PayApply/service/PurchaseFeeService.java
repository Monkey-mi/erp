package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.PurchaseFeeMapper;
import erp.erp.PayApply.model.PurchaseFee;
import erp.erp.PayApply.model.PurchaseFeeImp;
import erp.erp.PayApply.model.SupplyInvoiceInfo;
@Service
public class PurchaseFeeService {
	
	@Autowired
	private PurchaseFeeMapper purchaseFeeMapper;
	
	public List<PurchaseFee> getPurchaseFeeList(Map<String, Object> params){
		return purchaseFeeMapper.getPurchaseFeeList(params); 
	}
	public void addPurchaseFee(PurchaseFee[] arr) {
		for (PurchaseFee obj : arr) {
			purchaseFeeMapper.addPurchaseFee(obj);
		}
	}

	public void updatePurchaseFee(PurchaseFee[] arr) {
		for (PurchaseFee obj : arr) {
			purchaseFeeMapper.updatePurchaseFee(obj);
		}
	}


	public void deletePurchaseFee(PurchaseFee[] arr) {
		for (PurchaseFee obj : arr) {
			purchaseFeeMapper.deletePurchaseFee(obj);
		}
	}
	public List<PurchaseFeeImp> getPurchaseFeeImpList(Map<String,Object> params) {		
		return purchaseFeeMapper.getPurchaseFeeImpList(params);
	}
}
