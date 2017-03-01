package erp.erp.purchaseInspectionManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.purchaseInspectionManage.data.PurchaseInspectionPonoMapper;
import erp.erp.purchaseInspectionManage.model.PurchaseInspectionPono;


@Service
public class PurchaseInspectionPonoService {
	@Autowired
	private PurchaseInspectionPonoMapper mapper;


	public List<PurchaseInspectionPono> getPurchaseInspectionPonoList(Map<String,Object> params) {
		return mapper.getPurchaseInspectionPonoList(params);
	}
	public void addPurchaseInspectionPono(PurchaseInspectionPono[] arr) {
		for(PurchaseInspectionPono obj: arr) {
			mapper.addPurchaseInspectionPono(obj);
		}
	}
	public void updatePurchaseInspectionPono(PurchaseInspectionPono[] arr) {
		for(PurchaseInspectionPono obj: arr) {
			mapper.updatePurchaseInspectionPono(obj);
		}
	}
	public void deletePurchaseInspectionPono(PurchaseInspectionPono[] arr) {
		for(PurchaseInspectionPono obj: arr) {
			mapper.deletePurchaseInspectionPono(obj);
		}
	}
}
