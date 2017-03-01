package erp.erp.master.operator.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.operator.model.Operator;
import erp.erp.master.operator.model.OperatorDept;



public interface OperatorMapper {
	public List<Operator> getOperatorList(Map<String,Object> params);
	public void addOperator(Operator obj);
	public void updateOperator(Operator obj);
	public void deleteOperator(Operator obj);
	public Operator getByczy_gh(Map<String,Object> params);
	
	public List<OperatorDept> getOperatorDeptList(Map<String,Object> params);
	public void addOperatorDept(OperatorDept obj);
	public void updateOperatorDept(OperatorDept obj);
	public void deleteOperatorDept(OperatorDept obj);
}
