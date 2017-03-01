package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.SupplyInvoiceInfoMapper;
import erp.erp.PayApply.model.PayApply;
import erp.erp.PayApply.model.SupplyInvoiceImp;
import erp.erp.PayApply.model.SupplyInvoiceInfo;

@Service
public class SupplyInvoiceInfoService {
	@Autowired
	private SupplyInvoiceInfoMapper supplyInvoiceInfoMapper;
	
	public List<SupplyInvoiceInfo> getSupplyInvoiceList(Map<String, Object> params){
		return supplyInvoiceInfoMapper.getSupplyInvoiceList(params);
	}
	public void addSupplyInvoice(SupplyInvoiceInfo[] arr) {
		for (SupplyInvoiceInfo obj : arr) {
			supplyInvoiceInfoMapper.addSupplyInvoice(obj);
		}
	}

	public void updateSupplyInvoice(SupplyInvoiceInfo[] arr) {
		for (SupplyInvoiceInfo obj : arr) {
			supplyInvoiceInfoMapper.updateSupplyInvoice(obj);
		}
	}


	public void deleteSupplyInvoice(SupplyInvoiceInfo[] arr) {
		for (SupplyInvoiceInfo obj : arr) {
			supplyInvoiceInfoMapper.deleteSupplyInvoice(obj);
		}
	}
	public List<SupplyInvoiceImp> getSupplyInvoiceImpList(Map<String,Object> params) {
		return supplyInvoiceInfoMapper.getSupplyInvoiceImpList(params);
	}
	public List<SupplyInvoiceImp> getSupplyInvoiceImpDetailList(Map<String,Object> params) {
		return supplyInvoiceInfoMapper.getSupplyInvoiceImpDetailList(params);
	}
}
