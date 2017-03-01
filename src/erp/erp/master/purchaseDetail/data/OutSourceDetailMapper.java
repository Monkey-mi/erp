package erp.erp.master.purchaseDetail.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseDetail.model.OutSourceDetail;


public interface OutSourceDetailMapper {
	public List<OutSourceDetail> getOutSourceDetailList(Map<String,Object> params);
	public void addOutSourceDetail(OutSourceDetail obj);
	public void updateOutSourceDetail(OutSourceDetail obj);
	public void deleteOutSourceDetail(OutSourceDetail obj);
	
	void updateOutSourceSync(OutSourceDetail obj);
}
