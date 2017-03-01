package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.FeeReimbursement;
import erp.erp.PayApply.model.FeeReimbursementImp;


public interface FeeReimbursementMapper {
	public List<FeeReimbursement> getFeeReimbursementList(Map<String,Object> params);
	public List<FeeReimbursementImp> getFeeReimbursementImpList(Map<String,Object> params);
	public void addFeeReimbursement(FeeReimbursement obj);
	public void updateFeeReimbursement(FeeReimbursement obj);
	public void deleteFeeReimbursement(FeeReimbursement obj);
}
