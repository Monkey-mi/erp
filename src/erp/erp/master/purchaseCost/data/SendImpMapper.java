package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.SendImp;


public interface SendImpMapper {
	public List<SendImp> getSendImpList(Map<String,Object> params);
	public void addSendImp(SendImp obj);
	public void updateSendImp(SendImp obj);
	public void deleteSendImp(SendImp obj);
}
