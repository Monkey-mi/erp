package erp.erp.materialInspection.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialInspection.data.MaterialApplyMapper;
import erp.erp.materialInspection.model.MaterialApply;


@Service
public class MaterialApplyService {
	@Autowired
	private MaterialApplyMapper mapper;


	public List<MaterialApply> getMaterialApplyList(Map<String,Object> params) {
		return mapper.getMaterialApplyList(params);
	}
	public void addMaterialApply(MaterialApply[] arr) {
		for(MaterialApply obj: arr) {
			mapper.addMaterialApply(obj);
		}
	}
	public void updateMaterialApply(MaterialApply[] arr) {
		for(MaterialApply obj: arr) {
			mapper.updateMaterialApply(obj);
		}
	}
	public void deleteMaterialApply(MaterialApply[] arr) {
		for(MaterialApply obj: arr) {
			mapper.deleteMaterialApply(obj);
		}
	}
}
