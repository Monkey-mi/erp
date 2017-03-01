package erp.erp.master.purchaseDetail.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseDetail.data.ContractSubsidiaryMapper;
import erp.erp.master.purchaseDetail.model.ContractSubsidiary;


@Service
public class ContractSubsidiaryService {
	@Autowired
	private ContractSubsidiaryMapper mapper;

	/**
	 * 合同明细辅助表CURD
	 * Request purchasedetail/contractsubsidiary.act?method=getContractSubsidiaryList <br/><br/>
	 * Response {data:[{ContractSubsidiary}]} <br/><br/>
	 * @param ContractSubsidiary {@link paramMap}
	 */
	public List<ContractSubsidiary> getContractSubsidiaryList(Map<String,Object> params) {
		return mapper.getContractSubsidiaryList(params);
	}
	public void addContractSubsidiary(ContractSubsidiary[] arr) {
		for(ContractSubsidiary obj: arr) {
			mapper.addContractSubsidiary(obj);
		}
	}
	public void updateContractSubsidiary(ContractSubsidiary[] arr) {
		for(ContractSubsidiary obj: arr) {
			mapper.updateContractSubsidiary(obj);
		}
	}
	public void deleteContractSubsidiary(ContractSubsidiary[] arr) {
		for(ContractSubsidiary obj: arr) {
			mapper.deleteContractSubsidiary(obj);
		}
	}
}
