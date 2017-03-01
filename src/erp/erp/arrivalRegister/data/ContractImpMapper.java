package erp.erp.arrivalRegister.data;

import java.util.List;
import java.util.Map;

import erp.erp.arrivalRegister.model.ContractImp;

public interface ContractImpMapper {
    public List<ContractImp> getContractImpList(Map<String,Object> params);
    public String getHsbm(Map<String,Object> params);
}
