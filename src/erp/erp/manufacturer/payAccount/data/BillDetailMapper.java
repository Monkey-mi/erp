package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.BillDetail;

public interface BillDetailMapper {
	public List<BillDetail> getBillDetailList(Map<String,Object> params);
}
