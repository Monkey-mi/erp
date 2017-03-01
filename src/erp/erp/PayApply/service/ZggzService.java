package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.ZggzMapper;
import erp.erp.PayApply.model.Zggz;


@Service
public class ZggzService {
	@Autowired
	private ZggzMapper mapper;


	public List<Zggz> getZggzList(Map<String,Object> params) {
		return mapper.getZggzList(params);
	}
	public void addZggz(Zggz[] arr) {
		for(Zggz obj: arr) {
			mapper.addZggz(obj);
		}
	}
	public void updateZggz(Zggz[] arr) {
		for(Zggz obj: arr) {
			mapper.updateZggz(obj);
		}
	}
	public void deleteZggz(Zggz[] arr) {
		for(Zggz obj: arr) {
			mapper.deleteZggz(obj);
		}
	}
}
