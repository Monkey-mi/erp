package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.EmployeeSalaryMapper;
import erp.erp.PayApply.model.EmployeeSalary;
import erp.erp.PayApply.model.EmployeeSalaryImp;
import erp.erp.PayApply.model.SaleFeeImp;


@Service
public class EmployeeSalaryService {
	@Autowired
	private EmployeeSalaryMapper mapper;


	public List<EmployeeSalary> getEmployeeSalaryList(Map<String,Object> params) {
		return mapper.getEmployeeSalaryList(params);
	}
	public void addEmployeeSalary(EmployeeSalary[] arr) {
		for(EmployeeSalary obj: arr) {
			mapper.addEmployeeSalary(obj);
		}
	}
	public void updateEmployeeSalary(EmployeeSalary[] arr) {
		for(EmployeeSalary obj: arr) {
			mapper.updateEmployeeSalary(obj);
		}
	}
	public void deleteEmployeeSalary(EmployeeSalary[] arr) {
		for(EmployeeSalary obj: arr) {
			mapper.deleteEmployeeSalary(obj);
		}
	}
	public List<EmployeeSalaryImp> getEmployeeSalaryImpList(Map<String,Object> params) {
		return mapper.getEmployeeSalaryImpList(params);
	}
}
