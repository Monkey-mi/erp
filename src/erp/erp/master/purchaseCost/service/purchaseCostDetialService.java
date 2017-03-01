package erp.erp.master.purchaseCost.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseCost.data.purchaseCostDetialMapper;
import erp.erp.master.purchaseCost.model.purchaseCostDetial;


@Service
public class purchaseCostDetialService {
	@Autowired
	private purchaseCostDetialMapper mapper;


	public List<purchaseCostDetial> getpurchaseCostDetialList(Map<String,Object> params) {
		return mapper.getpurchaseCostDetialList(params);
	}
	public void addpurchaseCostDetial(purchaseCostDetial[] arr) {
		for(purchaseCostDetial obj: arr) {
			mapper.addpurchaseCostDetial(obj);
		}
	}
	public void updatepurchaseCostDetial(purchaseCostDetial[] arr) {
		for(purchaseCostDetial obj: arr) {
			mapper.updatepurchaseCostDetial(obj);
		}
	}
	public void deletepurchaseCostDetial(purchaseCostDetial[] arr) {
		for(purchaseCostDetial obj: arr) {
			mapper.deletepurchaseCostDetial(obj);
		}
	}
}
