package erp.erp.materialInspection.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialInspection.data.MaterialDetailMapper;
import erp.erp.materialInspection.model.InspectionMaterialDetail;


@Service
public class MaterialDetailService {
	@Autowired
	private MaterialDetailMapper mapper;
	public List<InspectionMaterialDetail> getMaterialDetailList(Map<String,Object> params) {
		return mapper.getMaterialDetailList(params);
	}
	public void addMaterialDetail(InspectionMaterialDetail[] arr) {
		for(InspectionMaterialDetail obj: arr) {
			mapper.addMaterialDetail(obj);
		}
	}
	public void updateMaterialDetail(InspectionMaterialDetail[] arr) {
		for(InspectionMaterialDetail obj: arr) {
			mapper.updateMaterialDetail(obj);
		}
	}
	public void deleteMaterialDetail(Map<String,Object> params) {
			mapper.deleteMaterialDetail(params);
	}
}
