package erp.erp.purchaseOrder.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.purchaseOrder.data.PurchaseFileMapper;
import erp.erp.purchaseOrder.model.PurchaseFile;


@Service
public class PurchaseFileService {
	@Autowired
	private PurchaseFileMapper mapper;

	/**
	* @Description: 采购文件CURD
	* Request purchaseorder/purchasefile.act?method=******
	* Response {data:[{List<PurchaseFile>}]} <br/><br/>
	*/
	public List<PurchaseFile> getPurchaseFileList(Map<String,Object> params) {
		return mapper.getPurchaseFileList(params);
	}
	public void addPurchaseFile(PurchaseFile[] arr) {
		for(PurchaseFile obj: arr) {
			mapper.addPurchaseFile(obj);
		}
	}
	public void updatePurchaseFile(PurchaseFile[] arr) {
		for(PurchaseFile obj: arr) {
			mapper.updatePurchaseFile(obj);
		}
	}
	public void deletePurchaseFile(PurchaseFile[] arr) {
		for(PurchaseFile obj: arr) {
			mapper.deletePurchaseFile(obj);
		}
	}
	public void updateFjzt(Map<String,Object> params) {
		mapper.updateFjzt(params);
	}
}
