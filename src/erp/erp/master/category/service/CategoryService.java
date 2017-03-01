package erp.erp.master.category.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.master.category.data.CategoryAuthorityMapper;
import erp.erp.master.category.data.CategoryCooperteMapper;
import erp.erp.master.category.data.CategoryMapper;
import erp.erp.master.category.model.Category;
import erp.erp.master.category.model.CategoryAuthority;
import erp.erp.master.operator.model.Operator;


@Service
public class CategoryService {
	@Autowired
	private CategoryMapper mapper;
	@Autowired
	private CategoryAuthorityMapper categoryAuthorityMapper;
	@Autowired
	private CategoryCooperteMapper categoryCooperteMapper;
	/**
	* @Description: 采购类别CURD
	* Request category/category.act?method=******
	* Response {data:[{List<Category>}]} <br/><br/>
	*/
	public List<Category> getCategoryList(Map<String,Object> params) {
		return mapper.getCategoryList(params);
	}
	public void addCategory(Category[] arr) {
		for(Category obj: arr) {
			mapper.addCategory(obj);
		}
	}
	public void updateCategory(Category[] arr) {
		for(Category obj: arr) {
			mapper.updateCategory(obj);
		}
	}
	public void deleteCategory(Category[] arr) {
		for(Category obj: arr) {
			mapper.deleteCategory(obj);
		}
	}
	/**
	 * @Description:采购类别树
	 * Request category/category.act?method=getCategoryTreeList
	 * Response {data:[{List<TreeModel>}]} <br/><br/>
	 * modify:一级改成两级树
	 */
	public List<TreeModel> getCategoryTreeList(Map<String,Object> params) {
			List<TreeModel> stlist=new ArrayList<TreeModel>();
			List<Category> list=getCategoryList(params);
			int lbjc=1;
			int parentId=0;
			if(params.get("node")!=null){
				 lbjc=(params.get("node").toString().length()/2)+1;
				 parentId=Integer.valueOf(String.valueOf(params.get("node")));
			}
			for(Category sa:list) 
			{
				if(sa.getLbjc()==lbjc||lbjc==1){
					TreeModel st=new TreeModel();
					st.setNodeId(Integer.valueOf(sa.getLbbh()));
					st.setParentId(parentId);
					st.setText(sa.getLbmc());
					st.setExpanded("false");
					if (sa.getMjbz()==0){
						st.setLeaf("false");
					}else{
						st.setLeaf("true");
					}
						
					st.setType("category");
					stlist.add(st);
				}
			}
			return stlist;
		}
	/**
	 * 获取最新一级类别编号
	 * Request category/category.act?method=getCategoryOne <br/><br/>
	 * Response {data:[{json}]} <br/><br/>
	 * @param json {@link paramMap}
	 */
	public String getCategoryOne(Map<String,Object> params){
		return mapper.getCategoryOne(params);
	}
	/**
	 * 获取最新次级类别编号
	 * Request category/category.act?method=getCategoryTwo <br/><br/>
	 * Response {data:[{json]} <br/><br/>
	 * @param json {@link paramMap}
	 */
	public String getCategoryTwo(Map<String,Object> params){
			String bh=mapper.getCategoryTwo(params);
			if(bh==null){
				bh="00";
			}else if(bh.length()<2){
				bh="0"+bh;
			}
			return bh;
	}
	/**
	 * 删除前验证
	 * Request category/category.act?method=getBeforDelete  <br/><br/>
	 * @author wq
	 * @date 2016-01-12
	 */
	public String getBeforDelete(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			Category [] arr=null;
			if(params.get("recordData")!=null){
				JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
				arr=(Category [])JSONArray.toArray(jsonArray,Category.class);
				for(Category obj:arr){
					if(mapper.getCategoryIsHaving(obj)>1){
						json.put("bool", false);
						json.put("msg", "【"+obj.getLbmc()+"】存在下级类别,不能删除!");
						return json.toString();
					}
				}
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "删除验证时出现异常，请重试！");
		}
		return json.toString();
	}
	
	/**
	 * 导入操作员
	 * Request category/category.act?method=getLoadOperator  <br/><br/>
	 * @author wq
	 * @date 2016-01-12
	 */
	public String getLoadOperator(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String msg="";
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		try {
			Operator [] arr=null;
			if(params.get("recordData")!=null){
				JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
				arr=(Operator [])JSONArray.toArray(jsonArray,Operator.class);
				String lbbh=params.get("lbbh").toString();
				int lbjc=Integer.parseInt(params.get("lbjc").toString());
				for(Operator obj:arr){
					for(int i=1;i<=lbjc;i++){
						Map<String,Object> pa=new HashMap<String, Object>();
						pa.put("czy_gh", obj.getCzy_gh());
						pa.put("lbbh", lbbh);
						pa.put("len", i);
						if(mapper.getOperatorIsExist(pa)>0){
							pa.put("lbbh", lbbh.substring(0,i*2));
							String lbmc=mapper.getCategoryName(pa);
							msg+="操作员【"+obj.getCzy_xm()+"】已经有【"+lbmc+"】权限，请重新选择!<br/>";
						}else{
							CategoryAuthority ca=new CategoryAuthority();
							ca.setCzy_gh(obj.getCzy_gh());
							ca.setCzy_xm(obj.getCzy_xm());
							ca.setLbbh(lbbh);
							categoryAuthorityMapper.addCategoryAuthority(ca);
							//删除操作员在该类别的下级类别的权限
							categoryAuthorityMapper.deleteCategoryAuthorityLowerLevel(ca);
						}
					}
				}
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "导入操作员时出现异常，请重试！");
		}
		json.put("msg", msg);
		return json.toString();
	}
	public String getLoadCooperate(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String msg="";
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		try {
			Operator [] arr=null;
			if(params.get("recordData")!=null){
				JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
				arr=(Operator [])JSONArray.toArray(jsonArray,Operator.class);
				String lbbh=params.get("lbbh").toString();
				int lbjc=Integer.parseInt(params.get("lbjc").toString());
				for(Operator obj:arr){
					for(int i=1;i<=lbjc;i++){
						Map<String,Object> pa=new HashMap<String, Object>();
						pa.put("czy_gh", obj.getCzy_gh());
						pa.put("lbbh", lbbh);
						pa.put("len", i);
						if(categoryCooperteMapper.getCooperateIsExist(pa)>0){
							pa.put("lbbh", lbbh.substring(0,i*2));
							String lbmc=mapper.getCategoryName(pa);
							msg+="协同人员【"+obj.getCzy_xm()+"】已经有【"+lbmc+"】权限，请重新选择!<br/>";
						}else{
							CategoryAuthority ca=new CategoryAuthority();
							ca.setCzy_gh(obj.getCzy_gh());
							ca.setCzy_xm(obj.getCzy_xm());
							ca.setLbbh(lbbh);
							categoryCooperteMapper.addCooperateAuthority(ca);
							//协同人员在该类别的下级类别的权限
							categoryCooperteMapper.deleteCategoryCooperateLowerLevel(ca);
						}
					}
				}
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "导入操作员时出现异常，请重试！");
		}
		json.put("msg", msg);
		return json.toString();
	}
	
}
