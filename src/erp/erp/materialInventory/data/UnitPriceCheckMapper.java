package erp.erp.materialInventory.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialInventory.model.UnitPriceCheck;

public interface UnitPriceCheckMapper {
	public List<UnitPriceCheck> getUnitPriceCheckList(Map<String,Object> params);
	public void addUnitPriceCheck(UnitPriceCheck obj);
	public void updateUnitPriceCheck(UnitPriceCheck obj);
	public void deleteUnitPriceCheck(UnitPriceCheck obj);
}
