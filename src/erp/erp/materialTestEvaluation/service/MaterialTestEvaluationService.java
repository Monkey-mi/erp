package erp.erp.materialTestEvaluation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.materialTestEvaluation.data.MaterialTestEvaluationMapper;
import erp.erp.materialTestEvaluation.model.EntrustedInspectionCategory;
import erp.erp.materialTestEvaluation.model.MaterialTestEvaluation;


@Service
public class MaterialTestEvaluationService {
	@Autowired
	private MaterialTestEvaluationMapper mapper;


	public List<MaterialTestEvaluation> getMaterialTestEvaluationList(Map<String,Object> params) {
		return mapper.getMaterialTestEvaluationList(params);
	}
	public void addMaterialTestEvaluation(MaterialTestEvaluation[] arr) {
		for(MaterialTestEvaluation obj: arr) {
			mapper.addMaterialTestEvaluation(obj);
		}
	}
	public void updateMaterialTestEvaluation(MaterialTestEvaluation[] arr) {
		for(MaterialTestEvaluation obj: arr) {
			mapper.updateMaterialTestEvaluation(obj);
		}
	}
	public void deleteMaterialTestEvaluation(MaterialTestEvaluation[] arr) {
		for(MaterialTestEvaluation obj: arr) {
			mapper.deleteMaterialTestEvaluation(obj);
		}
	}
	public List<EntrustedInspectionCategory> getInspectionCategory(Map<String,Object> params){
		return mapper.getInspectionCategory(params);
	}
	public List<TreeModel> getInspectionCategoryList(Map<String,Object> params){
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<EntrustedInspectionCategory> list = getInspectionCategory(params);
		int lbjc=1;
		int parentId=0;
		if(params.get("node")!=null){
			 lbjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(EntrustedInspectionCategory sa:list ){
			if(sa.getLbjc()==lbjc){
				TreeModel st=new TreeModel();										
				st.setNodeId(Integer.valueOf(sa.getLbbh().trim()));															
				st.setParentId(parentId);
				st.setText(sa.getLbmc());
				st.setLbbh(sa.getLbbh().trim());
				st.setLbmc(sa.getLbmc().trim());
				st.setExpanded("false");
				if (sa.getMjbz()==0){
					st.setLeaf("false");
				}else{
					st.setLeaf("true");
				}						
				st.setType("InspectionCategory");
				stlist.add(st);
			}
		}
		return stlist;
	}
	public String getWtsjlbqxb(Map<String,Object> params){
		JSONObject json = new JSONObject();
		int count = mapper.getWtsjlbqxb(params);
		json.put("bool", true);
		if(count==0){
			json.put("bool", false);
			json.put("msg", "没有该委托送检类别的操作权限");
		}
		return json.toString();
	}
}
