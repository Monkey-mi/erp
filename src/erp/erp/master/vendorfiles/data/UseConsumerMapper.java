package erp.erp.master.vendorfiles.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.vendorfiles.model.UseConsumer;

public interface UseConsumerMapper {
	public List<UseConsumer> getUseConsumerList(Map<String,Object> params);
}
