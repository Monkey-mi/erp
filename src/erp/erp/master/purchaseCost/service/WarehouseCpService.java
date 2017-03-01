package erp.erp.master.purchaseCost.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseCost.data.WarehouseCpMapper;
import erp.erp.master.purchaseCost.model.WarehouseCp;


@Service
public class WarehouseCpService {
	@Autowired
	private WarehouseCpMapper mapper;
	public List<WarehouseCp> getWarehouseCpList(Map<String,Object> params) {
		return mapper.getWarehouseCpList(params);
	}
}
