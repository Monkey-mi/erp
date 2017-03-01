package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.EmployeeDept;
import erp.erp.PayApply.model.PayApply;
import erp.erp.PayApply.model.PurchaseAgreement;
import erp.erp.PayApply.model.SaleFee;
import erp.erp.master.perchasepriceadjust.model.Accountdept;

public interface PayApplyMapper {
	public List<PayApply> getPayApplyList(Map<String, Object> params);
	public void addPayApply(PayApply obj);
	public void updatePayApply(PayApply obj);
	public void deletePayApply(PayApply obj);
	public void deleteSupplyInvoice(PayApply obj);
	public void deletePurchaseAgreement(PayApply obj);
	public void deleteSaleFee(PayApply obj);
	public void deletePurchaseFee(PayApply obj);
	public void deleteFeeReimbursement(PayApply obj);
	public void deleteEmployeeSalary(PayApply obj);
	public String getPayApplyOne(Map<String, Object> params);
	public void submitPayApply(Map<String, Object> params);
	public void reviewPayApply(Map<String, Object> params);
	public void approvalPayApply(Map<String, Object> params);
	public void transferredPayApply(Map<String, Object> params);
	public void stopPayApply(Map<String, Object> params);
	public List<EmployeeDept> getAllEmployeeDept(Map<String, Object> params);
	public void archivePayApply(Map<String, Object> params);
	public void insertOa(Map<String, Object> params);
	public Integer getId();
	public Map<String, Object> getTjdx(Map<String, Object> params);
	public Integer getLLcount(Map<String, Object> params);
	public void insertPaymentInfo(Map<String, Object> params);
	public void insertPaymentFee(Map<String, Object> params);
}
