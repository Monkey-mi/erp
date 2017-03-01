package erp.erp.SupplyInvoice.data;

import java.util.List;
import java.util.Map;

import erp.erp.SupplyInvoice.model.PrepayAdjustment;

public interface PrepayAdjustmentMapper {
	public List<PrepayAdjustment> getPrepayAdjustmentList(Map<String,Object> params);
}
