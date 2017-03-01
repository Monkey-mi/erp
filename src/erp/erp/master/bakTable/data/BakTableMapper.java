package erp.erp.master.bakTable.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.bakTable.model.BakTable;


public interface BakTableMapper {
	public List<BakTable> getBakTableList(Map<String,Object> params);
	public void addBakTable(BakTable obj);
	public void updateBakTable(BakTable obj);
	public void deleteBakTable(BakTable obj);
}
