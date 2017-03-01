package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.WdrkMapper;
import erp.erp.PayApply.model.Wdrk;


@Service
public class WdrkService {
	@Autowired
	private WdrkMapper mapper;


	public List<Wdrk> getWdrkList(Map<String,Object> params) {
		return mapper.getWdrkList(params);
	}
	public void addWdrk(Wdrk[] arr) {
		for(Wdrk obj: arr) {
			mapper.addWdrk(obj);
		}
	}
	public void updateWdrk(Wdrk[] arr) {
		for(Wdrk obj: arr) {
			mapper.updateWdrk(obj);
		}
	}
	public void deleteWdrk(Wdrk[] arr) {
		for(Wdrk obj: arr) {
			mapper.deleteWdrk(obj);
		}
	}
}
