package erp.erp.master.purchaseCost.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseCost.data.purchaseCostShareMapper;
import erp.erp.master.purchaseCost.model.purchaseCostShare;


@Service
public class purchaseCostShareService {
	@Autowired
	private purchaseCostShareMapper mapper;


	public List<purchaseCostShare> getpurchaseCostShareList(Map<String,Object> params) {
		return mapper.getpurchaseCostShareList(params);
	}
	public void addpurchaseCostShare(purchaseCostShare[] arr) {
		for(purchaseCostShare obj: arr) {
			mapper.addpurchaseCostShare(obj);
		}
	}
	public void updatepurchaseCostShare(purchaseCostShare[] arr) {
		for(purchaseCostShare obj: arr) {
			mapper.updatepurchaseCostShare(obj);
		}
	}
	public void deletepurchaseCostShare(purchaseCostShare[] arr) {
		for(purchaseCostShare obj: arr) {
			mapper.deletepurchaseCostShare(obj);
		}
	}
}
