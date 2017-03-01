package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.FpmxMapper;
import erp.erp.PayApply.model.Fpmx;


@Service
public class FpmxService {
	@Autowired
	private FpmxMapper mapper;


	public List<Fpmx> getFpmxList(Map<String,Object> params) {
		return mapper.getFpmxList(params);
	}
	public void addFpmx(Fpmx[] arr) {
		for(Fpmx obj: arr) {
			mapper.addFpmx(obj);
		}
	}
	public void updateFpmx(Fpmx[] arr) {
		for(Fpmx obj: arr) {
			mapper.updateFpmx(obj);
		}
	}
	public void deleteFpmx(Fpmx[] arr) {
		for(Fpmx obj: arr) {
			mapper.deleteFpmx(obj);
		}
	}
}
