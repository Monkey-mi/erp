package erp.erp.master.contractStop.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.contractStop.data.ContractTypeMapper;
import erp.erp.master.contractStop.model.ContractType;


@Service
public class ContractTypeService {
	@Autowired
	private ContractTypeMapper mapper;


	public List<ContractType> getContractTypeList(Map<String,Object> params) {
		return mapper.getContractTypeList(params);
	}
	public void addContractType(ContractType[] arr) {
		for(ContractType obj: arr) {
			mapper.addContractType(obj);
		}
	}
	public void updateContractType(ContractType[] arr) {
		for(ContractType obj: arr) {
			mapper.updateContractType(obj);
		}
	}
	public void deleteContractType(ContractType[] arr) {
		for(ContractType obj: arr) {
			mapper.deleteContractType(obj);
		}
	}
	public String getContractTypeOne(Map<String,Object> params){
		return mapper.getContractTypeOne(params);
	}
}
