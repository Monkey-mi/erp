package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.SupplyInvoiceImp;
import erp.erp.PayApply.model.SupplyInvoiceInfo;

public interface SupplyInvoiceInfoMapper {
	public List<SupplyInvoiceInfo> getSupplyInvoiceList(Map<String,Object> params);
	public List<SupplyInvoiceImp> getSupplyInvoiceImpList(Map<String,Object> params);
	public List<SupplyInvoiceImp> getSupplyInvoiceImpDetailList(Map<String,Object> params);
	public void addSupplyInvoice(SupplyInvoiceInfo obj);
	public void updateSupplyInvoice(SupplyInvoiceInfo obj);
	public void deleteSupplyInvoice(SupplyInvoiceInfo obj);
}
