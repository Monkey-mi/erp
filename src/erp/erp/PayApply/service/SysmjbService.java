package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.SysmjbMapper;
import erp.erp.PayApply.model.Sysmjb;

@Service
public class SysmjbService {
	@Autowired
	private SysmjbMapper mapper;
	public List<Sysmjb> getsysmjbList(Map<String,Object> params) {
		return mapper.getsysmjbList(params);
	}	
}
