package erp.erp.CostDetial.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.FilterModel;
import erp.erp.CostDetial.data.CostDetialMapper;
import erp.erp.CostDetial.model.CostDetial;
import erp.erp.PurchaseClearing.data.NoticeMapper;
import erp.util.MyJsonUtil;


@Service
public class CostDetialService {
	@Autowired
	private CostDetialMapper mapper;

	@Autowired
	private NoticeMapper dmapper;
	public List<CostDetial> getCostDetialList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String bmqx="and (";
		List<String> bmbhList = dmapper.getBmqx(pa);
		if(bmbhList.isEmpty()){
			return null;
		}
		for(String str:bmbhList){
			if(i==0){
				bmqx+="(cgfyb.hsbm='') or (left(cgfyb.hsbm,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				bmqx+=" or (left(cgfyb.hsbm,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		bmqx+=")";
		if(bmbhList.size()>0){
			params.put("bmqx", bmqx);
		}
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
		return mapper.getCostDetialList(params);
	}
	public void addCostDetial(CostDetial[] arr) {
		for(CostDetial obj: arr) {
			mapper.addCostDetial(obj);
		}
	}
	public void updateCostDetial(CostDetial[] arr) {
		for(CostDetial obj: arr) {
			mapper.updateCostDetial(obj);
		}
	}
	public void deleteCostDetial(CostDetial[] arr) {
		for(CostDetial obj: arr) {
			mapper.deleteCostDetial(obj);
		}
	}
}
