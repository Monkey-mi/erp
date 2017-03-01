package erp.erp.SupplyInvoice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.SupplyInvoice.data.ApplyAgreementMapper;
import erp.erp.SupplyInvoice.model.ApplyAgreement;
@Service
public class ApplyAgreementService {
	@Autowired
	private ApplyAgreementMapper agreementMapper;
	
	public List<ApplyAgreement> getApplyAgreementList(Map<String,Object> params) {
		return agreementMapper.getApplyAgreementList(params);
	}
}
