package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.YfcxMapper;
import erp.erp.PayApply.model.Yfcx;


@Service
public class YfcxService {
	@Autowired
	private YfcxMapper mapper;


	public List<Yfcx> getYfcxList(Map<String,Object> params) {
		return mapper.getYfcxList(params);
	}
	public void addYfcx(Yfcx[] arr) {
		for(Yfcx obj: arr) {
			mapper.addYfcx(obj);
		}
	}
	public void updateYfcx(Yfcx[] arr) {
		for(Yfcx obj: arr) {
			mapper.updateYfcx(obj);
		}
	}
	public void deleteYfcx(Yfcx[] arr) {
		for(Yfcx obj: arr) {
			mapper.deleteYfcx(obj);
		}
	}
}
