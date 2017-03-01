package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.Csmc;


public interface CsmcMapper {
	public List<Csmc> getcsmcList(Map<String,Object> params);
	public void addcsmc(Csmc obj);
	public void updatecsmc(Csmc obj);
	public void deletecsmc(Csmc obj);
}
