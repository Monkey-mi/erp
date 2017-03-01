package erp.erp.materialInventory.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialInventory.model.CkmcInventory;

public interface CkmcInventoryMapper {
	public List<CkmcInventory> getCkmcList(Map<String,Object> params);
	String getCkmc(Map<String,Object> params);
	int getCkCount(Map<String,Object> params);
}
 