package erp.erp.SupplyInvoice.data;

import java.util.List;
import java.util.Map;

import erp.erp.SupplyInvoice.model.InvoiceDetail;

public interface InvoiceDetailMapper {
	public List<InvoiceDetail> getInvoiceDetailList(Map<String,Object> params);
}
