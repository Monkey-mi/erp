/**  
* @Title: MaterialCheckAccessoryService.java
* @Package srm.materialConfirmation.service
* @Description: TODO
* @author 舒飞
* @date 2016-9-28 下午1:55:27 
*/ 
package srm.materialConfirmation.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.materialConfirmation.data.MaterialCheckAccessoryMapper;
import srm.materialConfirmation.model.MaterialCheckAccessory;
@Service
public class MaterialCheckAccessoryService {
	@Autowired
	private MaterialCheckAccessoryMapper mapper;
	
	public List<MaterialCheckAccessory> getMaterialCheckAccessoryList(Map<String,Object> params) {
		return mapper.getMaterialCheckAccessoryList(params);
	}
	public void addMaterialCheckAccessory(MaterialCheckAccessory obj) {

			mapper.addMaterialCheckAccessory(obj);

	}
	public void updateMaterialCheckAccessory(MaterialCheckAccessory[] arr) {
		for(MaterialCheckAccessory obj: arr) {
			mapper.updateMaterialCheckAccessory(obj);
		}
	}
	public void deleteMaterialCheckAccessory(MaterialCheckAccessory[] arr) {
		for(MaterialCheckAccessory obj: arr) {
			mapper.deleteMaterialCheckAccessory(obj);
		}
	}
	public int getMaxWjbh(Map<String,Object> params){
		return mapper.getMaxWjbh(params);
	}
}
