package erp.web.data;






import java.util.List;
import java.util.Map;

import erp.web.model.Function;
import erp.web.model.HttpService;
import erp.web.model.Module;
import erp.web.model.TpsLog;

public interface ModuleMapper {
	int getCountByPId(Map<String,Object> params);
	List<Module> getModuleList(Map<String,Object> params);
	List<Module> getModuleWithParent(Map<String,Object> params);
	List<Function> getFuncList(Map<String,Object> params);
	int getCountByModCode(Map<String,Object> params);
	void addModule(Module module);
	void updateModule(Module module);
	void deleteModule(Module module);
	
	List<Module> getModuleWithCtrllerAndView(Map<String,Object> params);
	List<Module> getModuleListFilterRole(Map<String,Object> params);
	List<Function> getFuncListFilterUid(Map<String,Object> params);
	void deleteFuncByMid(int Mid);
	void addFunction(Function func);
	void updateFunction(Function func);
	void deleteFunction(Function func);
	
	List<HttpService> getHttpServiceList(Map<String,Object> params);
	List<HttpService> getHttpServiceByPathMethod(Map<String,Object> params);
	void deleteHttpServiceByMid(int Mid);
	void addHttpService(HttpService service);
	void updateHttpService(HttpService service);
	void deleteHttpService(HttpService service);
	
	//日志信息
    List<TpsLog> getLogList(Map<String,Object> paramMap);
    void addLog(TpsLog log);
    void updateLog(TpsLog log);
    void deleteLog(TpsLog log);
    void updateTSysLog(TpsLog log);
}
