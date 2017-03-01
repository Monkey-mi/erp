package erp.erp.master.purchaseDetail.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseDetail.model.ContractDetail;


public interface ContractDetailMapper {
	public List<ContractDetail> getContractDetailList(Map<String,Object> params);
	public void addContractDetail(ContractDetail obj);
	public void updateContractDetail(ContractDetail obj);
	public void deleteContractDetail(ContractDetail obj);
	void updateContractTime(Map<String,Object> params);
	void updatePurchasePlanCltx(Map<String,Object> params);
	void updatePurchasePlanZzbj(Map<String,Object> params);
	void deleteHtmxDdbzcfxxb(Map<String,Object> params);
	void updateContractWcbj(Map<String,Object> params);
}
