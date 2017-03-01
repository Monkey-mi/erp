package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.AdjustmentDetail;


public interface AdjustmentDetailMapper {
	public List<AdjustmentDetail> getAdjustmentDetailList(Map<String,Object> params);
	public void addAdjustmentDetail(AdjustmentDetail obj);
	public void updateAdjustmentDetail(AdjustmentDetail obj);
	public void deleteAdjustmentDetail(AdjustmentDetail obj);
}
