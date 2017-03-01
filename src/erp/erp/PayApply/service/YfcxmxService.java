package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.YfcxmxMapper;
import erp.erp.PayApply.model.Yfcxmx;


@Service
public class YfcxmxService {
	@Autowired
	private YfcxmxMapper mapper;


	public List<Yfcxmx> getYfcxmxList(Map<String,Object> params) {
		return mapper.getYfcxmxList(params);
	}
	public void addYfcxmx(Yfcxmx[] arr) {
		for(Yfcxmx obj: arr) {
			mapper.addYfcxmx(obj);
		}
	}
	public void updateYfcxmx(Yfcxmx[] arr) {
		for(Yfcxmx obj: arr) {
			mapper.updateYfcxmx(obj);
		}
	}
	public void deleteYfcxmx(Yfcxmx[] arr) {
		for(Yfcxmx obj: arr) {
			mapper.deleteYfcxmx(obj);
		}
	}
}
