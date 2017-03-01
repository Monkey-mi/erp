package erp.erp.materialQualityTesting.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialQualityTesting.model.MaterialQualityManager;


public interface MaterialQualityManagerMapper {
	public List<MaterialQualityManager> getMaterialQualityManagerList(Map<String,Object> params);
	public List<MaterialQualityManager> getCreateLeadList(Map<String,Object> params);
	public void addMaterialQualityManager(MaterialQualityManager obj);
	public void updateMaterialQualityManager(MaterialQualityManager obj);
	public void deleteMaterialQualityManager(MaterialQualityManager obj);
	public int getMaxDhxh(Map<String,Object> params);
}
