package erp.erp.master.category.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.category.model.CategoryAuthority;


public interface CategoryAuthorityMapper {
	public List<CategoryAuthority> getCategoryAuthorityList(Map<String,Object> params);
	public void addCategoryAuthority(CategoryAuthority obj);
	public void updateCategoryAuthority(CategoryAuthority obj);
	public void deleteCategoryAuthority(CategoryAuthority obj);
	
	void deleteCategoryAuthorityLowerLevel(CategoryAuthority obj);
}
