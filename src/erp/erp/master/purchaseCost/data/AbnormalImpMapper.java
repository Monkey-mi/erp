package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.AbnormalImp;


public interface AbnormalImpMapper {
	public List<AbnormalImp> getAbnormalImpList(Map<String,Object> params);
	
}
