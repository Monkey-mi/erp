package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.MyJsonUtil;

import srm.supplier.data.MetarialMapper;
import srm.supplier.model.Metarial;


@Service
public class MetarialService {
	@Autowired
	private MetarialMapper mapper;
	@Autowired
	private SupplierInter supplierInter;

	public List<Metarial> getMetarialList(Map<String,Object> params) {
		return mapper.getMetarialList(params);
	}
	@Transactional
	public void addMetarial(Metarial[] arr) {
		for(Metarial obj: arr) {			
			String jsonmap = MyJsonUtil.obj2string(obj);
			String result = supplierInter.addMetarialByWS(jsonmap);
			CXFResponse<Metarial> sf=MyJsonUtil.str2CXFResponse(result, Metarial.class);
		    String metarial_out_id = sf.getParams().get("metarial_out_id").toString();
		    obj.setMetarial_out_id(Integer.valueOf(metarial_out_id));
			mapper.addMetarial(obj);
		}
	}
	@Transactional
	public void updateMetarial(Metarial[] arr) {
		for(Metarial obj: arr) {
			mapper.updateMetarial(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updateMetarialByWS(jsonmap);
		}
	}
	@Transactional
	public void deleteMetarial(Metarial[] arr) {
		for(Metarial obj: arr) {
			mapper.deleteMetarial(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.deleteMetarialByWS(jsonmap);
		}
	}
}
