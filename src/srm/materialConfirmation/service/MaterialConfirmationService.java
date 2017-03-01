package srm.materialConfirmation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.materialConfirmation.data.MaterialConfirmationMapper;
import srm.materialConfirmation.model.MaterialConfirmation;
import srm.supplier.service.SupplierFileService;


@Service
public class MaterialConfirmationService {
	@Autowired
	private MaterialConfirmationMapper mapper;


	public List<MaterialConfirmation> getMaterialConfirmationList(Map<String,Object> params) {
		return mapper.getMaterialConfirmationList(params);
	}
	public void addMaterialConfirmation(MaterialConfirmation[] arr) {
		for(MaterialConfirmation obj: arr) {
			mapper.addMaterialConfirmation(obj);
		}
	}
	public void updateMaterialConfirmation(MaterialConfirmation[] arr) {
		for(MaterialConfirmation obj: arr) {
			mapper.updateMaterialConfirmation(obj);
		}
	}
	public void deleteMaterialConfirmation(MaterialConfirmation[] arr) {
		for(MaterialConfirmation obj: arr) {
			mapper.deleteMaterialConfirmation(obj);
		}
	}
	
	public String getStringFromSql(Map<String,Object> paramMap){
		JSONObject json = new JSONObject();
		json.put("bool", true);
		json.put("val", mapper.getStringFromSql(paramMap));
		return json.toString();
	}
	public String getMaterialComfirmation(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);		
		String sql = "update t_app_material_confirmation set final_confirrmor = '"+params.get("final_confirrmor").toString() +"',confirm_date = getdate() where confirmation_id ="+params.get("confirmation_id");
		params.put("sql", sql);
		mapper.getStringFromSql(params);
		return json.toString();
	}
	public String getConfirm_result(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);
		Integer confirm_result = Integer.valueOf(params.get("confirm_result").toString());
		String sql = "update t_app_material_sample set confirm_result=" + confirm_result +" where sample_id = "+params.get("sample_id");
		params.put("sql", sql);
		mapper.getStringFromSql(params);
		return json.toString();
	}
	public String getDeleteMaterialComfirmation(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);	
		try {
			List<Integer> sample_id_list = new ArrayList<Integer>();
			sample_id_list = mapper.getSampleIdFromMaterialsample(params);
			for(int i=0;i<sample_id_list.size();i++){
				params.put("sample_id", sample_id_list.get(i));
				mapper.deleteMaterialcheck_detail(params);
			}
			String sql = "delete from t_app_material_sample  where  confirmation_id ="+params.get("confirmation_id");
			params.put("sql", sql);
			mapper.getStringFromSql(params);			
		} catch (Exception e) {						
			e.printStackTrace();
			json.put("bool", false);	
			json.put("msg", "删除出错");	
		}
		
		return json.toString();
		
	}
}
