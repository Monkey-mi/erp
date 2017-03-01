package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Wdrk;


public interface WdrkMapper {
	public List<Wdrk> getWdrkList(Map<String,Object> params);
	public void addWdrk(Wdrk obj);
	public void updateWdrk(Wdrk obj);
	public void deleteWdrk(Wdrk obj);
}
