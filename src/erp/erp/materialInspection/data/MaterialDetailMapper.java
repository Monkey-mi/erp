package erp.erp.materialInspection.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialInspection.model.InspectionMaterialDetail;




public interface MaterialDetailMapper {
	public List<InspectionMaterialDetail> getMaterialDetailList(Map<String,Object> params);
	public void addMaterialDetail(InspectionMaterialDetail obj);
	public void updateMaterialDetail(InspectionMaterialDetail obj);
	public void deleteMaterialDetail(Map<String,Object> params);
}
