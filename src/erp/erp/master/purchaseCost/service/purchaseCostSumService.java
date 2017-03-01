package erp.erp.master.purchaseCost.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseCost.data.purchaseCostSumMapper;
import erp.erp.master.purchaseCost.model.purchaseCostSum;


@Service
public class purchaseCostSumService {
	@Autowired
	private purchaseCostSumMapper mapper;


	public List<purchaseCostSum> getpurchaseCostSumList(Map<String,Object> params) {
		return mapper.getpurchaseCostSumList(params);
	}
	public void addpurchaseCostSum(purchaseCostSum[] arr) {
		for(purchaseCostSum obj: arr) {
			mapper.addpurchaseCostSum(obj);
		}
	}
	public void updatepurchaseCostSum(purchaseCostSum[] arr) {
		for(purchaseCostSum obj: arr) {
			mapper.updatepurchaseCostSum(obj);
		}
	}
	public void deletepurchaseCostSum(purchaseCostSum[] arr) {
		for(purchaseCostSum obj: arr) {
			mapper.deletepurchaseCostSum(obj);
		}
	}
}
