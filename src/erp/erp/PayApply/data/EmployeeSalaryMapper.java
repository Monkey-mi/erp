package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.EmployeeSalary;
import erp.erp.PayApply.model.EmployeeSalaryImp;


public interface EmployeeSalaryMapper {
	public List<EmployeeSalary> getEmployeeSalaryList(Map<String,Object> params);
	public List<EmployeeSalaryImp> getSaleFeeImpList(Map<String,Object> params);
	public void addEmployeeSalary(EmployeeSalary obj);
	public void updateEmployeeSalary(EmployeeSalary obj);
	public void deleteEmployeeSalary(EmployeeSalary obj);
	public List<EmployeeSalaryImp> getEmployeeSalaryImpList(
			Map<String, Object> params);
}
