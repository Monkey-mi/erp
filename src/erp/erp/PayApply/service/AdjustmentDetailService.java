package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.AdjustmentDetailMapper;
import erp.erp.PayApply.model.AdjustmentDetail;


@Service
public class AdjustmentDetailService {
	@Autowired
	private AdjustmentDetailMapper mapper;


	public List<AdjustmentDetail> getAdjustmentDetailList(Map<String,Object> params) {
		return mapper.getAdjustmentDetailList(params);
	}
	public void addAdjustmentDetail(AdjustmentDetail[] arr) {
		for(AdjustmentDetail obj: arr) {
			mapper.addAdjustmentDetail(obj);
		}
	}
	public void updateAdjustmentDetail(AdjustmentDetail[] arr) {
		for(AdjustmentDetail obj: arr) {
			mapper.updateAdjustmentDetail(obj);
		}
	}
	public void deleteAdjustmentDetail(AdjustmentDetail[] arr) {
		for(AdjustmentDetail obj: arr) {
			mapper.deleteAdjustmentDetail(obj);
		}
	}
}
