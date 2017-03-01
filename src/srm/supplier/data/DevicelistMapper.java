package srm.supplier.data;

import java.util.List;
import java.util.Map;

import srm.supplier.model.Devicelist;

public interface DevicelistMapper {
	public List<Devicelist> getDevicelistList(Map<String,Object> params);
	public void addDevicelist(Devicelist obj);
	public void updateDevicelist(Devicelist obj);
	public void deleteDevicelist(Devicelist obj);
}
