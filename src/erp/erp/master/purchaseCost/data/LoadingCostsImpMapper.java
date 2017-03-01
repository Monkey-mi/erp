package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.LoadingCostsImp;


public interface LoadingCostsImpMapper {
	public List<LoadingCostsImp> getLoadingCostsImpList(Map<String,Object> params);

}
