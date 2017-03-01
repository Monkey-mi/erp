package srm.supplierAccess.data;

import java.util.List;
import java.util.Map;

import srm.supplierAccess.model.SupplierAccessScoreDetails;


public interface SupplierAccessScoreDetailsMapper {
	public List<SupplierAccessScoreDetails> getSupplierAccessScoreDetailsList(Map<String,Object> params);
	
}
