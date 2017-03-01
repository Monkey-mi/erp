package erp.erp.arrivalRegister.data;

import java.util.List;
import java.util.Map;

import erp.erp.arrivalRegister.model.OutSideImp;



public interface OutSideImpMapper {
	 public List<OutSideImp> getOutSideImpList(Map<String,Object> params);
}
