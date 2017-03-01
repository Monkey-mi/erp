package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.CallinImp;


public interface CallinImpMapper {
	public List<CallinImp> getCallinImpList(Map<String,Object> params);
	public void addCallinImp(CallinImp obj);
	public void updateCallinImp(CallinImp obj);
	public void deleteCallinImp(CallinImp obj);
}
