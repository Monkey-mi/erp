package srm.supplier.data;

import java.util.List;
import java.util.Map;

import srm.supplier.model.InvoiceTitle;

public interface InvoiceTitleMapper {
	public List<InvoiceTitle> getInvoiceTitleList(Map<String,Object> params);
	public void addInvoiceTitle(InvoiceTitle obj);
	public void updateInvoiceTitle(InvoiceTitle obj);
	public void deleteInvoiceTitle(InvoiceTitle obj);
}