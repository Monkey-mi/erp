package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Manufacturer;

public interface ManufacturerMapper {
	public List<Manufacturer> getManufacturerList(Map<String, Object> params);
	public String getWbhl(Map<String, Object> params);
}
