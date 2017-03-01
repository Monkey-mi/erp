package erp.erp.materialDistributeAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialDistributeAccount.data.MaterialAccountDetailMapper;
import erp.erp.materialDistributeAccount.model.MaterialAccountDetail;


@Service
public class MaterialAccountDetailService {
	@Autowired
	private MaterialAccountDetailMapper mapper;


	public List<MaterialAccountDetail> getMaterialAccountDetailList(Map<String,Object> params) {
		return mapper.getMaterialAccountDetailList(params);
	}
	public void addMaterialAccountDetail(MaterialAccountDetail[] arr) {
		for(MaterialAccountDetail obj: arr) {
			mapper.addMaterialAccountDetail(obj);
		}
	}
	public void updateMaterialAccountDetail(MaterialAccountDetail[] arr) {
		for(MaterialAccountDetail obj: arr) {
			mapper.updateMaterialAccountDetail(obj);
		}
	}
	public void deleteMaterialAccountDetail(MaterialAccountDetail[] arr) {
		for(MaterialAccountDetail obj: arr) {
			mapper.deleteMaterialAccountDetail(obj);
		}
	}
}
