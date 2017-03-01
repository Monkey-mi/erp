package erp.erp.PrepayAdjustment.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PrepayAdjustment.data.PrepayAdjustmentInfoMapper;
import erp.erp.PrepayAdjustment.model.AgreementChoose;
import erp.erp.PrepayAdjustment.model.FeeChoose;
import erp.erp.PrepayAdjustment.model.InvoiceChoose;
import erp.erp.PrepayAdjustment.model.PrepayAdjustmentImp;
import erp.erp.PrepayAdjustment.model.PrepayAdjustmentInfo;
import erp.erp.PrepayAdjustment.model.PrepayAgreementChoose;

@Service
public class PrepayAdjustmentInfoService {
	@Autowired
	private PrepayAdjustmentInfoMapper prepayAdjustmentInfoMapper;

	public List<PrepayAdjustmentInfo> getPrepayAdjustmentList(
			Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getPrepayAdjustmentList(params);
	}

	public List<PrepayAdjustmentInfo> getPrepayAdjustmentListByDate(
			Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getPrepayAdjustmentListByDate(params);
	}

	public String getPrepayAdjustmentOne(Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getPrepayAdjustmentOne(params);

	}

	public void addPrepayAdjustment(PrepayAdjustmentInfo[] arr) {
		for (PrepayAdjustmentInfo obj : arr) {
			prepayAdjustmentInfoMapper.addPrepayAdjustment(obj);
		}
	}

	public void updatePrepayAdjustment(PrepayAdjustmentInfo[] arr) {
		for (PrepayAdjustmentInfo obj : arr) {
			prepayAdjustmentInfoMapper.updatePrepayAdjustment(obj);
		}
	}

	public void lockPrepayAdjustment(Map<String, Object> params) {
		if (params.get("sdbj") != null) {
			prepayAdjustmentInfoMapper.lockPrepayAdjustment(params);
		}
	}

	public void deletePrepayAdjustment(PrepayAdjustmentInfo[] arr) {
		for (PrepayAdjustmentInfo obj : arr) {
			prepayAdjustmentInfoMapper.deletePrepayAdjustment(obj);
		}
	}

	public List<PrepayAdjustmentImp> getPrepayAdjustmentImpList(
			Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getPrepayAdjustmentImpList(params);
	}

	public List<AgreementChoose> getAgreementChooseList(
			Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getAgreementChooseList(params);
	}

	public List<PrepayAgreementChoose> getPrepayAgreementChooseList(
			Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getPrepayAgreementChooseList(params);
	}

	public List<FeeChoose> getFeeChooseList(Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getFeeChooseList(params);
	}

	public List<FeeChoose> getPrepayFeeChooseList(Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getPrepayFeeChooseList(params);
	}

	public List<InvoiceChoose> getInvoiceChooseList(Map<String, Object> params) {
		return prepayAdjustmentInfoMapper.getInvoiceChooseList(params);
	}
}
