package erp.erp.master.category.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.category.model.Category;


public interface CategoryMapper {
	public List<Category> getCategoryList(Map<String,Object> params);
	public void addCategory(Category obj);
	public void updateCategory(Category obj);
	public void deleteCategory(Category obj);
	String getCategoryOne(Map<String,Object> params);
	String getCategoryTwo(Map<String,Object> params);
	//判断是否有子节点
	int getCategoryIsHaving(Category obj);
	//判断是否有操作员
	int getOperatorIsExist(Map<String,Object> params);
	//类别名称
	String getCategoryName(Map<String,Object> params);
}
