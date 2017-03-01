package  erp.erp.master.contractStop.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.contractStop.model.ContractType;


public interface ContractTypeMapper{
	public List<ContractType> getContractTypeList(Map<String,Object> params);
	public void addContractType(ContractType obj);
	public void updateContractType(ContractType obj);
	public void deleteContractType(ContractType obj);
	public String getContractTypeOne(Map<String,Object> params);
}
