package erp.erp.materialQualityTesting.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialQualityTesting.data.CkmcMapper;
import erp.erp.materialQualityTesting.model.Ckmc;

@Service
public class CkmcService {
	@Autowired
	private CkmcMapper mapper;
	
	public List<Ckmc> getCkmcList(Map<String,Object> params) {
		return mapper.getCkmcList(params);
	}
	public List<Ckmc> getCkmc(Map<String,Object> params) {
		return mapper.getCkmc(params);
	}
}
