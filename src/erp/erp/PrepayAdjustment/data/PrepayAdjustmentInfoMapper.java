package erp.erp.PrepayAdjustment.data;

import java.util.List;
import java.util.Map;

import erp.erp.PrepayAdjustment.model.AgreementChoose;
import erp.erp.PrepayAdjustment.model.FeeChoose;
import erp.erp.PrepayAdjustment.model.InvoiceChoose;
import erp.erp.PrepayAdjustment.model.PrepayAdjustmentImp;
import erp.erp.PrepayAdjustment.model.PrepayAdjustmentInfo;
import erp.erp.PrepayAdjustment.model.PrepayAgreementChoose;

public interface PrepayAdjustmentInfoMapper {
	public List<PrepayAdjustmentInfo> getPrepayAdjustmentList(
			Map<String, Object> params);

	public List<PrepayAdjustmentInfo> getPrepayAdjustmentListByDate(
			Map<String, Object> params);

	String getPrepayAdjustmentOne(Map<String, Object> params);

	public void addPrepayAdjustment(PrepayAdjustmentInfo obj);

	public void deletePrepayAdjustment(PrepayAdjustmentInfo obj);

	public void updatePrepayAdjustment(PrepayAdjustmentInfo obj);

	public void lockPrepayAdjustment(Map<String, Object> params);

	public List<PrepayAdjustmentImp> getPrepayAdjustmentImpList(
			Map<String, Object> params);

	public List<AgreementChoose> getAgreementChooseList(
			Map<String, Object> params);

	public List<PrepayAgreementChoose> getPrepayAgreementChooseList(
			Map<String, Object> params);

	public List<FeeChoose> getFeeChooseList(Map<String, Object> params);

	public List<FeeChoose> getPrepayFeeChooseList(Map<String, Object> params);

	public List<InvoiceChoose> getInvoiceChooseList(Map<String, Object> params);
}
