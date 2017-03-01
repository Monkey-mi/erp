package erp.erp.purchaseInspectionManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.purchaseInspectionManage.data.ImpPurchaseInspetionMapper;
import erp.erp.purchaseInspectionManage.model.ImpPurchaseInspetion;


@Service
public class ImpPurchaseInspetionService {
	@Autowired
	private ImpPurchaseInspetionMapper mapper;


	public List<ImpPurchaseInspetion> getImpPurchaseInspetionList(Map<String,Object> params) {
		return mapper.getImpPurchaseInspetionList(params);
	}
	public void addImpPurchaseInspetion(ImpPurchaseInspetion[] arr) {
		for(ImpPurchaseInspetion obj: arr) {
			mapper.addImpPurchaseInspetion(obj);
		}
	}
	public void updateImpPurchaseInspetion(ImpPurchaseInspetion[] arr) {
		for(ImpPurchaseInspetion obj: arr) {
			mapper.updateImpPurchaseInspetion(obj);
		}
	}
	public void deleteImpPurchaseInspetion(ImpPurchaseInspetion[] arr) {
		for(ImpPurchaseInspetion obj: arr) {
			mapper.deleteImpPurchaseInspetion(obj);
		}
	}
}
