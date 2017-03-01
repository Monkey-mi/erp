/**  
* @Title: AccessEvaluterOptionMapper.java
* @Package erp.erp.master.accessEvaluateOptions.data
* @Description: TODO
* @author 舒飞
* @date 2017-2-8 下午2:30:16 
*/ 
package erp.erp.master.accessEvaluateOptions.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.accessEvaluateOptions.model.AccessEvaluterOption;


public interface AccessEvaluterOptionMapper {
	
	public List<AccessEvaluterOption> getAccessEvaluterOptionList(Map<String,Object> params);
	public void addAccessEvaluterOption(AccessEvaluterOption obj);
	public void updateAccessEvaluterOption(AccessEvaluterOption obj);
	public void deleteAccessEvaluterOption(AccessEvaluterOption obj);
	//根据 上级id，获取记录数量
	int getXiajiCount(Map<String,Object> params);
	//根据 上级id和名称，获取记录数量
	int getCountForAdd(Map<String,Object> params);
	//根据 上级id和名称，并且不等于指定id，获取记录
	int getCountForUpdate(Map<String,Object> params);
	//根据 上级id，获取记录数量
	public List<AccessEvaluterOption> getAccessEvaluteOptionActive(Map<String,Object> params);
}
