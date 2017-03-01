package erp.erp.materialDistributeAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialDistributeAccount.model.MaterialAccountManager;


public interface MaterialAccountManagerMapper {
	public List<MaterialAccountManager> getMaterialAccountManagerList(Map<String,Object> params);
	int getMaterialAccountManagerCount(Map<String,Object> params);
	public void addMaterialAccountManager(MaterialAccountManager obj);
	public void updateMaterialAccountManager(MaterialAccountManager obj);
	public void deleteMaterialAccountManager(MaterialAccountManager obj);
	public String getClhh(Map<String,Object> params);
}
