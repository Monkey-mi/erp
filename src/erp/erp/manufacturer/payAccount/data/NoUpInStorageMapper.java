package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.Ckmcb_yl;
import erp.erp.manufacturer.payAccount.model.NoUpInStorage;

public interface NoUpInStorageMapper {
	public List<NoUpInStorage> getNoUpInStorage(Map<String,Object> params);
	public List<Ckmcb_yl> getCkmc(Map<String,Object> params);
}
