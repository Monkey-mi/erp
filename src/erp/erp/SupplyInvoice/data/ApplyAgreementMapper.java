package erp.erp.SupplyInvoice.data;

import java.util.List;
import java.util.Map;

import erp.erp.SupplyInvoice.model.ApplyAgreement;

public interface ApplyAgreementMapper {
	public List<ApplyAgreement> getApplyAgreementList(Map<String,Object> params);
}
