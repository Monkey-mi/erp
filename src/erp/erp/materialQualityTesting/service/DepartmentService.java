package erp.erp.materialQualityTesting.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialQualityTesting.data.DepartmentMapper;
import erp.erp.materialQualityTesting.model.Cllb;
@Service
public class DepartmentService {
	@Autowired
	private DepartmentMapper departmentMapper;
	
	public List<Cllb> getDepartment(Map<String,Object> params) {
		return departmentMapper.getDepartment(params);
	}
}
