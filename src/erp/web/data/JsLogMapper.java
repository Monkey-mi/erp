package erp.web.data;

import java.util.List;
import java.util.Map;

import erp.web.model.JsLog;




public interface JsLogMapper {
	public List<JsLog> getJsLogList(Map<String,Object> params);
	public void addJsLog(JsLog obj);
	public void updateJsLog(JsLog obj);
	public void deleteJsLog(JsLog obj);
}
