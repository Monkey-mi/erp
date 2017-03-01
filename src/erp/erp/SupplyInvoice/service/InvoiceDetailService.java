package erp.erp.SupplyInvoice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.SupplyInvoice.data.InvoiceDetailMapper;
import erp.erp.SupplyInvoice.model.InvoiceDetail;

@Service
public class InvoiceDetailService {
	@Autowired
	private InvoiceDetailMapper invoiceDetailMapper;
	
	public List<InvoiceDetail> getInvoiceDetailList(Map<String,Object> params) {
		return invoiceDetailMapper.getInvoiceDetailList(params);
	}
	
	
}
