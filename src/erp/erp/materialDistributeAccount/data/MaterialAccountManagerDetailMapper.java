package erp.erp.materialDistributeAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialDistributeAccount.model.MaterialAccountManagerDetail;


public interface MaterialAccountManagerDetailMapper {
	public List<MaterialAccountManagerDetail> getMaterialAccountManagerDetailList(Map<String,Object> params);
	public void addMaterialAccountManagerDetail(MaterialAccountManagerDetail obj);
	public void updateMaterialAccountManagerDetail(MaterialAccountManagerDetail obj);
	public void deleteMaterialAccountManagerDetail(MaterialAccountManagerDetail obj);
}
