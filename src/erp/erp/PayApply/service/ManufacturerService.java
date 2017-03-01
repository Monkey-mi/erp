package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.ManufacturerMapper;
import erp.erp.PayApply.model.Manufacturer;
@Service
public class ManufacturerService {
	@Autowired
	private ManufacturerMapper mapper;


	public List<Manufacturer> getManufacturerList(Map<String,Object> params) {
		return mapper.getManufacturerList(params);
	}
	public String getWbhl(Map<String, Object> params){
		
		return mapper.getWbhl(params);
	}
}
