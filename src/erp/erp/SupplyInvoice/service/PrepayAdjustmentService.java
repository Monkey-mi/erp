package erp.erp.SupplyInvoice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.SupplyInvoice.data.PrepayAdjustmentMapper;
import erp.erp.SupplyInvoice.model.PrepayAdjustment;
@Service
public class PrepayAdjustmentService {
	@Autowired
	private PrepayAdjustmentMapper prepayAdjustmentMapper;
	
	public List<PrepayAdjustment> getPrepayAdjustmentList(Map<String,Object> params) {
		return prepayAdjustmentMapper.getPrepayAdjustmentList(params);
	}
}
