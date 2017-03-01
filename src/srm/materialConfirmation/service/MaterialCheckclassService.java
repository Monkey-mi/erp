package srm.materialConfirmation.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.materialConfirmation.data.MaterialCheckclassMapper;
import srm.materialConfirmation.model.MaterialCheckclass;


@Service
public class MaterialCheckclassService {
	@Autowired
	private MaterialCheckclassMapper mapper;


	public List<MaterialCheckclass> getMaterialCheckclassList(Map<String,Object> params) {
		return mapper.getMaterialCheckclassList(params);
	}
	public void addMaterialCheckclass(MaterialCheckclass[] arr) {
		for(MaterialCheckclass obj: arr) {
			mapper.addMaterialCheckclass(obj);
		}
	}
	public void updateMaterialCheckclass(MaterialCheckclass[] arr) {
		for(MaterialCheckclass obj: arr) {
			mapper.updateMaterialCheckclass(obj);
		}
	}
	public void deleteMaterialCheckclass(MaterialCheckclass[] arr) {
		for(MaterialCheckclass obj: arr) {
			mapper.deleteMaterialCheckclass(obj);
		}
	}
	public String getOAdepartmentName(Map<String,Object> params){
		return mapper.getOAdepartmentName(params);
	}
}
