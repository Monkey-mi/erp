package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.ProductEntrustImp;


public interface ProductEntrustImpMapper {
	public List<ProductEntrustImp> getProductEntrustImpList(Map<String,Object> params);

}
