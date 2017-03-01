package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.CgfyMapper;
import erp.erp.PayApply.model.Cgfy;


@Service
public class CgfyService {
	@Autowired
	private CgfyMapper mapper;


	public List<Cgfy> getCgfyList(Map<String,Object> params) {
		return mapper.getCgfyList(params);
	}
	public void addCgfy(Cgfy[] arr) {
		for(Cgfy obj: arr) {
			mapper.addCgfy(obj);
		}
	}
	public void updateCgfy(Cgfy[] arr) {
		for(Cgfy obj: arr) {
			mapper.updateCgfy(obj);
		}
	}
	public void deleteCgfy(Cgfy[] arr) {
		for(Cgfy obj: arr) {
			mapper.deleteCgfy(obj);
		}
	}
}
