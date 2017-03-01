package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.MyJsonUtil;

import srm.supplier.data.MainCustomerMapper;
import srm.supplier.model.MainCustomer;


@Service
public class MainCustomerService {
	@Autowired
	private MainCustomerMapper mapper;
	@Autowired
	private SupplierInter supplierInter;

	public List<MainCustomer> getMainCustomerList(Map<String,Object> params) {
		return mapper.getMainCustomerList(params);
	}
	@Transactional
	public void addMainCustomer(MainCustomer[] arr) {
		for(MainCustomer obj: arr) {			
			String jsonmap = MyJsonUtil.obj2string(obj);
			String result = supplierInter.addMainCustomerByWS(jsonmap);
			CXFResponse<MainCustomer> sf=MyJsonUtil.str2CXFResponse(result, MainCustomer.class);
		    String customer_out_id = sf.getParams().get("customer_out_id").toString();
		    obj.setCustomer_out_id(Integer.valueOf(customer_out_id));
			mapper.addMainCustomer(obj);
		}
	}
	@Transactional
	public void updateMainCustomer(MainCustomer[] arr) {
		for(MainCustomer obj: arr) {
			mapper.updateMainCustomer(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updateMainCustomerByWS(jsonmap);
		}
	}
	@Transactional
	public void deleteMainCustomer(MainCustomer[] arr) {
		for(MainCustomer obj: arr) {
			mapper.deleteMainCustomer(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.deleteMainCustomerByWS(jsonmap);
		}
	}
}
