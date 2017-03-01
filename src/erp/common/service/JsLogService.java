package erp.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.web.data.JsLogMapper;
import erp.web.model.JsLog;



@Service
public class JsLogService {
	@Autowired
	private JsLogMapper mapper;


	public List<JsLog> getJsLogList(Map<String,Object> params) {
		return mapper.getJsLogList(params);
	}
	public void addJsLog(JsLog[] arr) {
		for(JsLog obj: arr) {
			mapper.addJsLog(obj);
		}
	}
	public void updateJsLog(JsLog[] arr) {
		for(JsLog obj: arr) {
			mapper.updateJsLog(obj);
		}
	}
	public void deleteJsLog(JsLog[] arr) {
		for(JsLog obj: arr) {
			mapper.deleteJsLog(obj);
		}
	}
}
