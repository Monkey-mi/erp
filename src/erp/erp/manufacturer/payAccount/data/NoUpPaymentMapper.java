package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.NoUpPayment;

public interface NoUpPaymentMapper {
	public List<NoUpPayment> getNoUpPayment(Map<String,Object> params);
}
