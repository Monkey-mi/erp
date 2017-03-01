package erp.erp.master.purchaseDetail.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseDetail.data.ContractDetailMapper;
import erp.erp.master.purchaseDetail.model.ContractDetail;


@Service
public class ContractDetailService {
	@Autowired
	private ContractDetailMapper mapper;

	/**
	 * 合同明细表CURD
	 * Request purchasedetail/contractdetail.act?method=getPurGroupManList <br/><br/>
	 * Response {data:[{ContractDetail}]} <br/><br/>
	 * @param ContractDetail {@link paramMap}
	 */
	public List<ContractDetail> getContractDetailList(Map<String,Object> params) {
		return mapper.getContractDetailList(params);
	}
	public void addContractDetail(ContractDetail[] arr) {
		for(ContractDetail obj: arr) {
			mapper.addContractDetail(obj);
		}
		if(arr.length>0){
			Map<String,Object> params=new HashMap<String, Object>();
			params.put("htbh", arr[0].getHtbh());
			mapper.updateContractTime(params);
			mapper.updatePurchasePlanCltx(params);
			mapper.updatePurchasePlanZzbj(params);
			mapper.updateContractWcbj(params);
		}
	}
	public void updateContractDetail(ContractDetail[] arr) {
		for(ContractDetail obj: arr) {
			mapper.updateContractDetail(obj);
		}
		if(arr.length>0){
			Map<String,Object> params=new HashMap<String, Object>();
			params.put("htbh", arr[0].getHtbh());
			mapper.updateContractTime(params);
			mapper.updatePurchasePlanCltx(params);
			mapper.updatePurchasePlanZzbj(params);
			mapper.updateContractWcbj(params);
		}
	}
	public void deleteContractDetail(ContractDetail[] arr) {
		for(ContractDetail obj: arr) {
			mapper.deleteContractDetail(obj);
		}
		if(arr.length>0){
			Map<String,Object> params=new HashMap<String, Object>();
			params.put("htbh", arr[0].getHtbh());
			mapper.updateContractTime(params);
			mapper.updatePurchasePlanCltx(params);
			mapper.updatePurchasePlanZzbj(params);
			mapper.updateContractWcbj(params);
		}
	}
}
