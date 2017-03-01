package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.HtmxMapper;
import erp.erp.PayApply.model.Htmx;


@Service
public class HtmxService {
	@Autowired
	private HtmxMapper mapper;


	public List<Htmx> getHtmxList(Map<String,Object> params) {
		return mapper.getHtmxList(params);
	}
	public void addHtmx(Htmx[] arr) {
		for(Htmx obj: arr) {
			mapper.addHtmx(obj);
		}
	}
	public void updateHtmx(Htmx[] arr) {
		for(Htmx obj: arr) {
			mapper.updateHtmx(obj);
		}
	}
	public void deleteHtmx(Htmx[] arr) {
		for(Htmx obj: arr) {
			mapper.deleteHtmx(obj);
		}
	}
}
