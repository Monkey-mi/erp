package erp.erp.materialInventory.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialInventory.model.RklbInventory;

public interface RklbInventoryMapper {
	public List<RklbInventory> getRklbList(Map<String,Object> params);

}
 