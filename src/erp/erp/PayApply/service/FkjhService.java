package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.FkjhMapper;
import erp.erp.PayApply.model.Fkjh;


@Service
public class FkjhService {
	@Autowired
	private FkjhMapper mapper;


	public List<Fkjh> getFkjhList(Map<String,Object> params) {
		return mapper.getFkjhList(params);
	}
	public void addFkjh(Fkjh[] arr) {
		for(Fkjh obj: arr) {
			mapper.addFkjh(obj);
		}
	}
	public void updateFkjh(Fkjh[] arr) {
		for(Fkjh obj: arr) {
			mapper.updateFkjh(obj);
		}
	}
	public void deleteFkjh(Fkjh[] arr) {
		for(Fkjh obj: arr) {
			mapper.deleteFkjh(obj);
		}
	}
}
