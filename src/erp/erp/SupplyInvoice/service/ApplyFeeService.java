package erp.erp.SupplyInvoice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.SupplyInvoice.data.ApplyFeeMapper;
import erp.erp.SupplyInvoice.model.ApplyFee;
@Service
public class ApplyFeeService {
	@Autowired
	private ApplyFeeMapper applyFeeMapper;
	
	public List<ApplyFee> getApplyFeeList(Map<String,Object> params) {
		return applyFeeMapper.getApplyFeeList(params);
	}
}
