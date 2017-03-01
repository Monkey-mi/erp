/**  
* @Title: CategoryCooperteService.java
* @Package erp.erp.master.category.service
* @Description: TODO
* @author 舒飞
* @date 2016-8-27 上午10:07:37 
*/ 
package erp.erp.master.category.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.category.data.CategoryCooperteMapper;
import erp.erp.master.category.model.CategoryAuthority;
import erp.erp.master.operator.model.Operator;
@Service
public class CategoryCooperteService {
	@Autowired
	private CategoryCooperteMapper categoryCooperteMapper;
	
	public List<CategoryAuthority> getCooperateAuthority(Map<String,Object> params){
		return categoryCooperteMapper.getCooperateAuthority(params);
	}
	public void addCooperateAuthority(CategoryAuthority[] arr){
		for(CategoryAuthority obj: arr) {
			categoryCooperteMapper.addCooperateAuthority(obj);
		}
	}
	public void updateCooperateAuthority(CategoryAuthority[] arr){
		for(CategoryAuthority obj: arr) {
			categoryCooperteMapper.updateCooperateAuthority(obj);
		}
	}
	public void deleteCooperateAuthority(CategoryAuthority[] arr){
		for(CategoryAuthority obj: arr) {
			categoryCooperteMapper.deleteCooperateAuthority(obj);
		}
	}
		
}
