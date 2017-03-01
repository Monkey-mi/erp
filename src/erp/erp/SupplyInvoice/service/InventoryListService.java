package erp.erp.SupplyInvoice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.SupplyInvoice.data.InventoryListMapper;
import erp.erp.SupplyInvoice.model.InventoryList;
@Service
public class InventoryListService {
	@Autowired
	private InventoryListMapper inventoryListMapper;
	
	public List<InventoryList> getInventoryListList(Map<String,Object> params) {
		return inventoryListMapper.getInventoryListList(params);
	}
}
