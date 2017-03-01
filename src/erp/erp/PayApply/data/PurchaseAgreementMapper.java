package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.PurchaseAgreement;
import erp.erp.PayApply.model.PurchaseAgreementImp;

public interface PurchaseAgreementMapper {
	public List<PurchaseAgreement> getPurchaseAgreementList(Map<String,Object> params);
	public List<PurchaseAgreementImp> getPurchaseAgreementImpList(Map<String,Object> params);
	public void addPurchaseAgreement(PurchaseAgreement obj);
	public void updatePurchaseAgreement(PurchaseAgreement obj);
	public void deletePurchaseAgreement(PurchaseAgreement obj);
}
