package erp.erp.SupplyInvoice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.SupplyInvoice.data.PayDetailMapper;
import erp.erp.SupplyInvoice.model.PayDetail;
@Service
public class PayDetailService {
	@Autowired
	private PayDetailMapper payDetailMapper;
	
	public List<PayDetail> getPayDetailList(Map<String,Object> params) {
		return payDetailMapper.getPayDetailList(params);
	}
}
