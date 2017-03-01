package erp.erp.SupplyInvoice.data;

import java.util.List;
import java.util.Map;

import erp.erp.SupplyInvoice.model.ApplyFee;

public interface ApplyFeeMapper {
	public List<ApplyFee> getApplyFeeList(Map<String,Object> params);
}
