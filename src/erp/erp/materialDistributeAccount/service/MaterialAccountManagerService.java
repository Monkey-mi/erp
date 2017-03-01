package erp.erp.materialDistributeAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialDistributeAccount.data.MaterialAccountManagerDetailMapper;
import erp.erp.materialDistributeAccount.data.MaterialAccountManagerMapper;
import erp.erp.materialDistributeAccount.model.MaterialAccountManager;
import erp.erp.materialDistributeAccount.model.MaterialAccountManagerDetail;


@Service
public class MaterialAccountManagerService {
	@Autowired
	private MaterialAccountManagerMapper mapper;
	@Autowired
	private MaterialAccountManagerDetailMapper detail_mapper;

	public List<MaterialAccountManager> getMaterialAccountManagerList(Map<String,Object> params) {
		
		//获取总条数total
		if(params.containsKey("usePaging")){
			params.remove("usePaging");}
		
		int count = mapper.getMaterialAccountManagerCount(params);
		params.put("total", count);
		int start = Integer.valueOf(params.get("start").toString())+1;
		params.put("start", start);
		int limit =  Integer.valueOf(params.get("limit").toString());
		params.put("limit", limit+start-1);
		List<MaterialAccountManager>  list = mapper.getMaterialAccountManagerList(params);
		return list;
	}
	public void addMaterialAccountManager(MaterialAccountManager[] arr) {
		for(MaterialAccountManager obj: arr) {
			mapper.addMaterialAccountManager(obj);
		}
	}
	public void updateMaterialAccountManager(MaterialAccountManager[] arr) {
		for(MaterialAccountManager obj: arr) {
			mapper.updateMaterialAccountManager(obj);
		}
	}
	public void deleteMaterialAccountManager(MaterialAccountManager[] arr) {
		for(MaterialAccountManager obj: arr) {
			mapper.deleteMaterialAccountManager(obj);
		}
	}
	public String getClhh(Map<String,Object> params){
		return mapper.getClhh(params);
	}
	public List<MaterialAccountManagerDetail> getMaterialAccountManagerDetailList(Map<String,Object> params) {
		return detail_mapper.getMaterialAccountManagerDetailList(params);
	}
}
