package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.WarehouseCp;


public interface WarehouseCpMapper {
	public List<WarehouseCp> getWarehouseCpList(Map<String,Object> params);

}
