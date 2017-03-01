package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.TaskImp;


public interface TaskImpMapper {
	public List<TaskImp> getTaskImpList(Map<String,Object> params);
	
}
