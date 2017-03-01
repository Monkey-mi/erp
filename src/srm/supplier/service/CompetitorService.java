package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.MyJsonUtil;

import srm.supplier.data.CompetitorMapper;
import srm.supplier.model.Competitor;


@Service
public class CompetitorService {
	@Autowired
	private CompetitorMapper mapper;
	@Autowired
	private SupplierInter supplierInter;

	public List<Competitor> getCompetitorList(Map<String,Object> params) {
		return mapper.getCompetitorList(params);
	}
	@Transactional
	public void addCompetitor(Competitor[] arr) {
		for(Competitor obj: arr) {
			String jsonmap = MyJsonUtil.obj2string(obj);
			String result = supplierInter.addAppCompetitorByWS(jsonmap);
			CXFResponse<Competitor> sf=MyJsonUtil.str2CXFResponse(result, Competitor.class);
		    String competitor_out_id = sf.getParams().get("competitor_out_id").toString();
		    obj.setCompetitor_out_id(Integer.valueOf(competitor_out_id));
			mapper.addCompetitor(obj);
			
		}
	}
	@Transactional
	public void updateCompetitor(Competitor[] arr) {
		for(Competitor obj: arr) {
			mapper.updateCompetitor(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updateAppCompetitorByWS(jsonmap);
		}
	}
	@Transactional
	public void deleteCompetitor(Competitor[] arr) {
		for(Competitor obj: arr) {
			mapper.deleteCompetitor(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.deleteAppCompetitorByWS(jsonmap);
		}
	}
}
