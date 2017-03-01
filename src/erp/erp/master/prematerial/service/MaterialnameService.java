package erp.erp.master.prematerial.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.prematerial.data.MaterialnameMapper;
import erp.erp.master.prematerial.model.Materialname;


@Service
public class MaterialnameService {
	@Autowired
	private MaterialnameMapper mapper;


	public List<Materialname> getMaterialnameList(Map<String,Object> params) {
		return mapper.getMaterialnameList(params);
	}
	public void addMaterialname(Materialname[] arr) {
		for(Materialname obj: arr) {
			mapper.addMaterialname(obj);
		}
	}
	public void updateMaterialname(Materialname[] arr) {
		for(Materialname obj: arr) {
			mapper.updateMaterialname(obj);
		}
	}
	public void deleteMaterialname(Materialname[] arr) {
		for(Materialname obj: arr) {
			mapper.deleteMaterialname(obj);
		}
	}
}
