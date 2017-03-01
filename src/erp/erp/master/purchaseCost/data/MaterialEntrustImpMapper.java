package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.MaterialEntrustImp;


public interface MaterialEntrustImpMapper {
	public List<MaterialEntrustImp> getMaterialEntrustImpList(Map<String,Object> params);

}
