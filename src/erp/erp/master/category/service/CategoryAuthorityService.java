package erp.erp.master.category.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.category.data.CategoryAuthorityMapper;
import erp.erp.master.category.model.CategoryAuthority;


@Service
public class CategoryAuthorityService {
	@Autowired
	private CategoryAuthorityMapper mapper;

	/**
	* @Description: 采购类别权限CURD
	* Request category/categoryauthority.act?method=******
	* Response {data:[{List<CategoryAuthority>}]} <br/><br/>
	*/
	public List<CategoryAuthority> getCategoryAuthorityList(Map<String,Object> params) {
		return mapper.getCategoryAuthorityList(params);
	}
	public void addCategoryAuthority(CategoryAuthority[] arr) {
		for(CategoryAuthority obj: arr) {
			mapper.addCategoryAuthority(obj);
		}
	}
	public void updateCategoryAuthority(CategoryAuthority[] arr) {
		for(CategoryAuthority obj: arr) {
			mapper.updateCategoryAuthority(obj);
		}
	}
	public void deleteCategoryAuthority(CategoryAuthority[] arr) {
		for(CategoryAuthority obj: arr) {
			mapper.deleteCategoryAuthority(obj);
		}
	}
}
