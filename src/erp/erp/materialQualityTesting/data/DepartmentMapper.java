package erp.erp.materialQualityTesting.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialQualityTesting.model.Cllb;

public interface DepartmentMapper {
	public List<Cllb> getDepartment(Map<String,Object> params);
}
