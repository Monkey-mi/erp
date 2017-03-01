package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.MyJsonUtil;

import srm.supplier.data.DevicelistMapper;
import srm.supplier.model.Devicelist;


@Service
public class DevicelistService {
	@Autowired
	private DevicelistMapper mapper;
	@Autowired
	private SupplierInter supplierInter;

	public List<Devicelist> getDevicelistList(Map<String,Object> params) {
		return mapper.getDevicelistList(params);
	}
	@Transactional
	public void addDevicelist(Devicelist[] arr) {
		for(Devicelist obj: arr) {
			String jsonmap = MyJsonUtil.obj2string(obj);
			String result = supplierInter.addDevicelistByWS(jsonmap);
		    CXFResponse<Devicelist> sf=MyJsonUtil.str2CXFResponse(result, Devicelist.class);
		    String device_out_id = sf.getParams().get("device_out_id").toString();
		    obj.setDevice_out_id(Integer.valueOf(device_out_id));
			mapper.addDevicelist(obj);
			
		}
	}
	@Transactional
	public void updateDevicelist(Devicelist[] arr) {
		for(Devicelist obj: arr) {
			mapper.updateDevicelist(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updateDevicelistByWS(jsonmap);
		}
	}
	@Transactional
	public void deleteDevicelist(Devicelist[] arr) {
		for(Devicelist obj: arr) {
			mapper.deleteDevicelist(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.deleteDevicelistByWS(jsonmap);
		}
	}
}
