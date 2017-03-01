package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.CreatePayPlanGrid;

public interface CreatePayPlanGridMapper {
	public List<CreatePayPlanGrid> getCreatePayPlanGrid(Map<String,Object> params);
    public void addCreatePayPlanGrid(CreatePayPlanGrid obj);
    public void updateCreatePayPlanGrid(CreatePayPlanGrid obj);
    public void deleteCreatePayPlanGrid(CreatePayPlanGrid obj);
}
