package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.FeeReimbursementMapper;
import erp.erp.PayApply.model.FeeReimbursement;
import erp.erp.PayApply.model.FeeReimbursementImp;


@Service
public class FeeReimbursementService {
	@Autowired
	private FeeReimbursementMapper mapper;


	public List<FeeReimbursement> getFeeReimbursementList(Map<String,Object> params) {
		return mapper.getFeeReimbursementList(params);
	}
	public void addFeeReimbursement(FeeReimbursement[] arr) {
		for(FeeReimbursement obj: arr) {
			mapper.addFeeReimbursement(obj);
		}
	}
	public void updateFeeReimbursement(FeeReimbursement[] arr) {
		for(FeeReimbursement obj: arr) {
			mapper.updateFeeReimbursement(obj);
		}
	}
	public void deleteFeeReimbursement(FeeReimbursement[] arr) {
		for(FeeReimbursement obj: arr) {
			mapper.deleteFeeReimbursement(obj);
		}
	}
	public List<FeeReimbursementImp> getFeeReimbursementImpList(Map<String,Object> params) {
		return mapper.getFeeReimbursementImpList(params);
	}
}
