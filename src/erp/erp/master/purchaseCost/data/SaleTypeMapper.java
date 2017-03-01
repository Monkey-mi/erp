package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.SaleType;


public interface SaleTypeMapper {
	public List<SaleType> getSaleTypeList(Map<String,Object> params);
}
