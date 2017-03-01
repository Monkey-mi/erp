package erp.erp.SupplyInvoice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.SupplyInvoice.data.ApplyInvoiceMapper;
import erp.erp.SupplyInvoice.model.ApplyInvoice;
@Service
public class ApplyInvoiceService {
	@Autowired
	private ApplyInvoiceMapper applyInvoiceMapper;
	
	public List<ApplyInvoice> getApplyInvoiceList(Map<String,Object> params) {
		return applyInvoiceMapper.getApplyInvoiceList(params);
	}
}
