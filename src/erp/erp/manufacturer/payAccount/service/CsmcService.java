package erp.erp.manufacturer.payAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.CsmcMapper;
import erp.erp.manufacturer.payAccount.model.Csmc;


@Service
public class CsmcService {
	@Autowired
	private CsmcMapper mapper;

	public List<Csmc> getcsmcList(Map<String,Object> params) {
		return mapper.getcsmcList(params);
	}
	public void addcsmc(Csmc[] arr) {
		for(Csmc obj: arr) {
			mapper.addcsmc(obj);
		}
	}
	public void updatecsmc(Csmc[] arr) {
		for(Csmc obj: arr) {
			mapper.updatecsmc(obj);
		}
	}
	public void deletecsmc(Csmc[] arr) {
		for(Csmc obj: arr) {
			mapper.deletecsmc(obj);
		}
	}
}
