/**  
* @Title: CategoryCooperteMapper.java
* @Package erp.erp.master.category.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-27 上午10:03:05 
*/ 
package erp.erp.master.category.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.category.model.CategoryAuthority;

public interface CategoryCooperteMapper {

	public List<CategoryAuthority> getCooperateAuthority(Map<String,Object> params);
	public void addCooperateAuthority(CategoryAuthority obj);
	public void updateCooperateAuthority(CategoryAuthority obj);
	public void deleteCooperateAuthority(CategoryAuthority obj);
	
	void deleteCategoryCooperateLowerLevel(CategoryAuthority obj);
	int getCooperateIsExist(Map<String,Object> params);
}
