package erp.erp.master.purchaseDetail.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseDetail.model.ContractSubsidiary;


public interface ContractSubsidiaryMapper {
	public List<ContractSubsidiary> getContractSubsidiaryList(Map<String,Object> params);
	public void addContractSubsidiary(ContractSubsidiary obj);
	public void updateContractSubsidiary(ContractSubsidiary obj);
	public void deleteContractSubsidiary(ContractSubsidiary obj);
}
