package erp.erp.materialInspection.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialInspection.model.MaterialApply;


public interface MaterialApplyMapper {
	public List<MaterialApply> getMaterialApplyList(Map<String,Object> params);
	public void addMaterialApply(MaterialApply obj);
	public void updateMaterialApply(MaterialApply obj);
	public void deleteMaterialApply(MaterialApply obj);
}
