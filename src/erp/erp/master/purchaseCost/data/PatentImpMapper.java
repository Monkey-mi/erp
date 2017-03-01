package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.PatentImp;

public interface PatentImpMapper {
	public List<PatentImp> getPatentImpList(Map<String,Object> params);
}
