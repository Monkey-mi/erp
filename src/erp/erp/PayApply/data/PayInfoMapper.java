package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.PayInfo;


public interface PayInfoMapper {
	public List<PayInfo> getPayInfoList(Map<String,Object> params);
	public void addPayInfo(PayInfo obj);
	public void updatePayInfo(PayInfo obj);
	public void deletePayInfo(PayInfo obj);
}
