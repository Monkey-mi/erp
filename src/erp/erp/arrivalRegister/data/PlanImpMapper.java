package erp.erp.arrivalRegister.data;

import java.util.List;
import java.util.Map;

import erp.erp.arrivalRegister.model.PlanImp;

public interface PlanImpMapper {
    public List<PlanImp> getPlanImpList(Map<String,Object> params);
}
