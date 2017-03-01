package erp.erp.PayApply.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.FilterModel;
import erp.erp.PayApply.data.RkmxMapper;
import erp.erp.PayApply.model.Rkmx;
import erp.util.MyJsonUtil;


@Service
public class RkmxService {
	@Autowired
	private RkmxMapper mapper;


	public List<Rkmx> getRkmxList(Map<String,Object> params) {
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
		return mapper.getRkmxList(params);
	}
	public void addRkmx(Rkmx[] arr) {
		for(Rkmx obj: arr) {
			mapper.addRkmx(obj);
		}
	}
	public void updateRkmx(Rkmx[] arr) {
		for(Rkmx obj: arr) {
			mapper.updateRkmx(obj);
		}
	}
	public void deleteRkmx(Rkmx[] arr) {
		for(Rkmx obj: arr) {
			mapper.deleteRkmx(obj);
		}
	}
}
