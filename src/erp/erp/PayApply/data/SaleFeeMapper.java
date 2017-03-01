package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.SaleFee;
import erp.erp.PayApply.model.SaleFeeImp;

public interface SaleFeeMapper {
	public List<SaleFee> getSaleFeeList(Map<String, Object> params);
	public List<SaleFeeImp> getSaleFeeImpList(Map<String,Object> params);
	public void addSaleFee(SaleFee obj);
	public void updateSaleFee(SaleFee obj);
	public void deleteSaleFee(SaleFee obj);
}
