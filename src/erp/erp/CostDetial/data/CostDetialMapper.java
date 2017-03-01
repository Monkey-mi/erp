package erp.erp.CostDetial.data;

import java.util.List;
import java.util.Map;

import erp.erp.CostDetial.model.CostDetial;


public interface CostDetialMapper {
	public List<CostDetial> getCostDetialList(Map<String,Object> params);
	public void addCostDetial(CostDetial obj);
	public void updateCostDetial(CostDetial obj);
	public void deleteCostDetial(CostDetial obj);
}
