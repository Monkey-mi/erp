package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.WdfyMapper;
import erp.erp.PayApply.model.Wdfy;


@Service
public class WdfyService {
	@Autowired
	private WdfyMapper mapper;


	public List<Wdfy> getWdfyList(Map<String,Object> params) {
		return mapper.getWdfyList(params);
	}
	public void addWdfy(Wdfy[] arr) {
		for(Wdfy obj: arr) {
			mapper.addWdfy(obj);
		}
	}
	public void updateWdfy(Wdfy[] arr) {
		for(Wdfy obj: arr) {
			mapper.updateWdfy(obj);
		}
	}
	public void deleteWdfy(Wdfy[] arr) {
		for(Wdfy obj: arr) {
			mapper.deleteWdfy(obj);
		}
	}
}
