package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.TransportCostImp;


public interface TransportCostImpMapper {
	public List<TransportCostImp> getTransportCostImpList(Map<String,Object> params);
}
