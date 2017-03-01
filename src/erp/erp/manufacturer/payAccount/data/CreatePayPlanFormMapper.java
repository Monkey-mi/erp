package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.CreatePayPlanForm;

public interface CreatePayPlanFormMapper {
	public List<CreatePayPlanForm> getCreatePayPlanForm(Map<String,Object> params);
	public int getMaxjhbh(Map<String,Object> params);
	public List<CreatePayPlanForm> getldt(Map<String,Object> params);
    public void addCreatePayPlanForm(CreatePayPlanForm obj);
    public void updateCreatePayPlanForm(CreatePayPlanForm obj);
    public void deleteCreatePayPlanForm(CreatePayPlanForm obj);
}
