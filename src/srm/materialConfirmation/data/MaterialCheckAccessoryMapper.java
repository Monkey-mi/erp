/**  
* @Title: MaterialCheckAccessoryMapper.java
* @Package srm.materialConfirmation.data
* @Description: TODO
* @author 舒飞
* @date 2016-9-28 下午1:58:45 
*/ 
package srm.materialConfirmation.data;

import java.util.List;
import java.util.Map;

import srm.materialConfirmation.model.MaterialCheckAccessory;

public interface MaterialCheckAccessoryMapper {

	public List<MaterialCheckAccessory> getMaterialCheckAccessoryList(Map<String,Object> params);
	public void addMaterialCheckAccessory(MaterialCheckAccessory arr);
	public void updateMaterialCheckAccessory(MaterialCheckAccessory arr);
	public void deleteMaterialCheckAccessory(MaterialCheckAccessory arr);
	public int getMaxWjbh(Map<String,Object> params);
}
