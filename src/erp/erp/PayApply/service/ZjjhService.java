package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.ZjjhMapper;
import erp.erp.PayApply.model.Zjjh;


@Service
public class ZjjhService {
	@Autowired
	private ZjjhMapper mapper;


	public List<Zjjh> getZjjhList(Map<String,Object> params) {
		return mapper.getZjjhList(params);
	}
	public void addZjjh(Zjjh[] arr) {
		for(Zjjh obj: arr) {
			mapper.addZjjh(obj);
		}
	}
	public void updateZjjh(Zjjh[] arr) {
		for(Zjjh obj: arr) {
			mapper.updateZjjh(obj);
		}
	}
	public void deleteZjjh(Zjjh[] arr) {
		for(Zjjh obj: arr) {
			mapper.deleteZjjh(obj);
		}
	}
}
