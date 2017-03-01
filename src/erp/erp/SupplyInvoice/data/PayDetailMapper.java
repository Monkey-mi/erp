package erp.erp.SupplyInvoice.data;

import java.util.List;
import java.util.Map;

import erp.erp.SupplyInvoice.model.PayDetail;

public interface PayDetailMapper {
	public List<PayDetail> getPayDetailList(Map<String,Object> params);
}
