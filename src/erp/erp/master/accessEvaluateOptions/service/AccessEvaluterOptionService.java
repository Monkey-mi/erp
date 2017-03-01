/**  
* @Title: AccessEvaluterOptionService.java
* @Package erp.erp.master.accessEvaluateOptions.service
* @author 舒飞
* @date 2017-2-8 下午2:42:46 
*/ 
package erp.erp.master.accessEvaluateOptions.service;

import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.erp.master.accessEvaluateOptions.data.AccessEvaluterOptionMapper;
import erp.erp.master.accessEvaluateOptions.model.AccessEvaluterOption;
@Service
public class AccessEvaluterOptionService {
	@Autowired
	private AccessEvaluterOptionMapper mapper;


	public List<AccessEvaluterOption> getAccessEvaluterOptionList(Map<String,Object> params) {
		return mapper.getAccessEvaluterOptionList(params);
	}
	@Transactional
	public void addAccessEvaluterOption(AccessEvaluterOption[] arr) {
		for(AccessEvaluterOption obj: arr) {
			mapper.addAccessEvaluterOption(obj);
		}
	}
	@Transactional
	public void updateAccessEvaluterOption(AccessEvaluterOption[] arr) {
		for(AccessEvaluterOption obj: arr) {
			mapper.updateAccessEvaluterOption(obj);
		}
	}
	@Transactional
	public void deleteAccessEvaluterOption(AccessEvaluterOption[] arr) {
		for(AccessEvaluterOption obj: arr) {
			mapper.deleteAccessEvaluterOption(obj);
		}
	}
	/**
	* @Description: 判断记录是否可以新增
	* @param  f_id 上级id; class_name 类别名
	* Request area/area.do?method=checkForAdd
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-11-03
	*/
	public String checkForAdd(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getCountForAdd(params);
		json.put("status", count==0);
		return json.toString();
				
	}
	/**
	* @Description: 判断记录是否可以更新
	* @param  f_id 上级id; class_name 类别名;class_id 类别id
	* Request area/area.do?method=checkForUpdate
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-11-03
	*/
	public String checkForUpdate(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getCountForUpdate(params);
		json.put("status", count==0);
		return json.toString();
	}
	
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getXiajiCount(params);
		json.put("status", count==0);
		return json.toString();
	}
	public List<AccessEvaluterOption> getAccessEvaluteOptionActive(Map<String,Object> params){
		return mapper.getAccessEvaluteOptionActive(params);
	}
}
