package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.PurchaseAgreementMapper;
import erp.erp.PayApply.model.PurchaseAgreement;
import erp.erp.PayApply.model.PurchaseAgreementImp;
@Service
public class PurchaseAgreementService {
	@Autowired
	private PurchaseAgreementMapper purchaseAgreementMapper;
	
	public List<PurchaseAgreement> getPurchaseAgreementList(Map<String, Object> params){
		return purchaseAgreementMapper.getPurchaseAgreementList(params);
	}
	public void addPurchaseAgreement(PurchaseAgreement[] arr) {
		for (PurchaseAgreement obj : arr) {
			purchaseAgreementMapper.addPurchaseAgreement(obj);
		}
	}

	public void updatePurchaseAgreement(PurchaseAgreement[] arr) {
		for (PurchaseAgreement obj : arr) {
			purchaseAgreementMapper.updatePurchaseAgreement(obj);
		}
	}


	public void deletePurchaseAgreement(PurchaseAgreement[] arr) {
		for (PurchaseAgreement obj : arr) {
			purchaseAgreementMapper.deletePurchaseAgreement(obj);
		}
	}
	public List<PurchaseAgreementImp> getPurchaseAgreementImpList(Map<String,Object> params) {
		return purchaseAgreementMapper.getPurchaseAgreementImpList(params);
	}
}
