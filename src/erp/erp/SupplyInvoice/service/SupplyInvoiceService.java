package erp.erp.SupplyInvoice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.SupplyInvoice.data.SupplyInvoiceMapper;
import erp.erp.SupplyInvoice.model.SupplyInvoice;
@Service
public class SupplyInvoiceService {
	@Autowired
	private SupplyInvoiceMapper supplyInvoiceMapper;
	
	public List<SupplyInvoice> getSupplyInvoiceList(Map<String,Object> params) {
		List<SupplyInvoice> siList=supplyInvoiceMapper.getSupplyInvoiceList(params);
		return siList;
	}
}
