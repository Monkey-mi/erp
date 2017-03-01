package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.SendoutImp;


public interface SendoutImpMapper {
	public List<SendoutImp> getSendoutImpList(Map<String,Object> params);
	
}
