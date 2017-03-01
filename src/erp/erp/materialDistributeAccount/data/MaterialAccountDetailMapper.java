package erp.erp.materialDistributeAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialDistributeAccount.model.MaterialAccountDetail;


public interface MaterialAccountDetailMapper {
	public List<MaterialAccountDetail> getMaterialAccountDetailList(Map<String,Object> params);
	public void addMaterialAccountDetail(MaterialAccountDetail obj);
	public void updateMaterialAccountDetail(MaterialAccountDetail obj);
	public void deleteMaterialAccountDetail(MaterialAccountDetail obj);
}
