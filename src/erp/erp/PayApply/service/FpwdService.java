package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.FpwdMapper;
import erp.erp.PayApply.model.Fpwd;


@Service
public class FpwdService {
	@Autowired
	private FpwdMapper mapper;


	public List<Fpwd> getFpwdList(Map<String,Object> params) {
		return mapper.getFpwdList(params);
	}
	public void addFpwd(Fpwd[] arr) {
		for(Fpwd obj: arr) {
			mapper.addFpwd(obj);
		}
	}
	public void updateFpwd(Fpwd[] arr) {
		for(Fpwd obj: arr) {
			mapper.updateFpwd(obj);
		}
	}
	public void deleteFpwd(Fpwd[] arr) {
		for(Fpwd obj: arr) {
			mapper.deleteFpwd(obj);
		}
	}
}
