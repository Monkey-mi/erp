package erp.erp.SupplyInvoice.data;

import java.util.List;
import java.util.Map;

import erp.erp.SupplyInvoice.model.InventoryList;

public interface InventoryListMapper {
	public List<InventoryList> getInventoryListList(Map<String,Object> params);
}
