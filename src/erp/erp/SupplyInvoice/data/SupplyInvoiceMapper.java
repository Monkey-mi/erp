package erp.erp.SupplyInvoice.data;

import java.util.List;
import java.util.Map;

import erp.erp.SupplyInvoice.model.SupplyInvoice;


public interface SupplyInvoiceMapper {
	public List<SupplyInvoice> getSupplyInvoiceList(Map<String,Object> params);
	public void addSupplyInvoice(SupplyInvoice obj);
	public void updateSupplyInvoice(SupplyInvoice obj);
	public void deleteSupplyInvoice(SupplyInvoice obj);
}
