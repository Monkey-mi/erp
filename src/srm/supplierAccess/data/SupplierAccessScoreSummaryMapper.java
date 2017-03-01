package srm.supplierAccess.data;
import java.util.List;
import java.util.Map;
import srm.supplierAccess.model.SupplierAccessScoreSummary;
public interface SupplierAccessScoreSummaryMapper{
	public List<SupplierAccessScoreSummary> getSupplierAccessScoreSummaryList(Map<String,Object> params);
}
