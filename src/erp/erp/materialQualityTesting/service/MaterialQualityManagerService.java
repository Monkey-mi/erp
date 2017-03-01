package erp.erp.materialQualityTesting.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.FilterModel;
import erp.erp.materialQualityTesting.data.HistoryJudgmentMapper;
import erp.erp.materialQualityTesting.data.MaterialQualityManagerMapper;
import erp.erp.materialQualityTesting.model.MaterialQualityManager;
import erp.util.MyJsonUtil;


@Service
public class MaterialQualityManagerService {
	@Autowired
	private MaterialQualityManagerMapper mapper;
	@Autowired
	private HistoryJudgmentMapper historyJudgmentMapper;


	public List<MaterialQualityManager> getMaterialQualityManagerList(Map<String,Object> params) {
		String filterStr=params.get("filter")==null?"":params.get("filter").toString();
		String filterSearch="";
		List<FilterModel> filterList=new ArrayList<FilterModel>();
		if(!filterStr.equals("")){
			filterList=MyJsonUtil.str2list(filterStr, FilterModel.class);
		}
		if(filterList!=null){
			filterSearch=MyJsonUtil.FilterListToString(filterList);
		}
		if(!filterSearch.equals("")){
			params.put("filterSearch", filterSearch);
		}
		return mapper.getMaterialQualityManagerList(params);
	}
	public List<MaterialQualityManager> getCreateLeadList(Map<String,Object> params) {	
		//有筛选条件时
				if(params.containsKey("condition")){
					String condition = params.get("condition").toString();
				//筛选条件有到货号
					boolean a = condition.contains("dhh");
					if(a){
						String dhh = condition.substring(condition.indexOf("dhh"), condition.indexOf("^")+1);
						//货号格式为dhdh-dhxh时
						if(dhh.contains("-")){
							String dhdh = dhh.substring(dhh.indexOf("=")+2,dhh.indexOf("-"));
							String dhxh = dhh.substring(dhh.indexOf("-")+1,dhh.indexOf("^"));
							String s1 = "dhdjb_yl.dhdh = " + dhdh + " and dhdjb_yl.dhxh = " + dhxh;
							String s = condition.replace(dhh, s1 );
							params.put("condition", s);
						}else{
							//货号格式为dhdh时
							String dhdh = dhh.substring(dhh.indexOf("=")+2,dhh.indexOf("^"));
							String s1 = "dhdjb_yl.dhdh = " + dhdh;
							String s = condition.replace(dhh, s1 );
							params.put("condition", s);
						}
					}
				}
		return mapper.getCreateLeadList(params);
	}
	public void addMaterialQualityManager(MaterialQualityManager[] arr) {
		for(MaterialQualityManager obj: arr) {
			mapper.addMaterialQualityManager(obj);
		}
	}
	public void updateMaterialQualityManager(MaterialQualityManager[] arr) {
		for(MaterialQualityManager obj: arr) {
			mapper.updateMaterialQualityManager(obj);
		}
	}
	public void deleteMaterialQualityManager(MaterialQualityManager[] arr) {
		for(MaterialQualityManager obj: arr) {
			mapper.deleteMaterialQualityManager(obj);
		}
	}
	public int getMaxDhxh(Map<String,Object> params) {
		return mapper.getMaxDhxh(params);
	}
	
	
	
	public List<MaterialQualityManager> getHistoryJudgmentList(Map<String,Object> params) {
		return historyJudgmentMapper.getHistoryJudgmentList(params);
	}
	public void addHistoryJudgment(MaterialQualityManager[] arr) {
		for(MaterialQualityManager obj: arr) {
			historyJudgmentMapper.addHistoryJudgment(obj);
		}
	}
	public void updateHistoryJudgment(MaterialQualityManager[] arr) {
		for(MaterialQualityManager obj: arr) {
			historyJudgmentMapper.updateHistoryJudgment(obj);
		}
	}
	public void deleteHistoryJudgment(MaterialQualityManager[] arr) {
		for(MaterialQualityManager obj: arr) {
			historyJudgmentMapper.deleteHistoryJudgment(obj);
		}
	}
	public int getHistoryJudgmentCount(Map<String,Object> params) {
		return historyJudgmentMapper.getHistoryJudgmentCount(params);
	}
}
