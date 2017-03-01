package erp.erp.SupplyInvoice.data;

import java.util.List;
import java.util.Map;

import erp.erp.SupplyInvoice.model.ApplyInvoice;

public interface ApplyInvoiceMapper {
	public List<ApplyInvoice> getApplyInvoiceList(Map<String,Object> params);
}
