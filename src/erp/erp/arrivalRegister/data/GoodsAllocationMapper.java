package erp.erp.arrivalRegister.data;

import java.util.List;
import java.util.Map;

import erp.erp.arrivalRegister.model.GoodsAllocation;


public interface GoodsAllocationMapper {
	public List<GoodsAllocation> getGoodsAllocationList(Map<String,Object> params);
	public void addGoodsAllocation(GoodsAllocation obj);
	public void updateGoodsAllocation(GoodsAllocation obj);
	public void deleteGoodsAllocation(GoodsAllocation obj);
}
