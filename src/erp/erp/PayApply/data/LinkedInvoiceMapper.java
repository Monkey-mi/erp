package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.LinkedInvoice;


public interface LinkedInvoiceMapper {
	public List<LinkedInvoice> getLinkedInvoiceList(Map<String,Object> params);
	public void addLinkedInvoice(LinkedInvoice obj);
	public void updateLinkedInvoice(LinkedInvoice obj);
	public void deleteLinkedInvoice(LinkedInvoice obj);
}
