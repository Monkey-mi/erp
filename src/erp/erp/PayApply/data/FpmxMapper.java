package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Fpmx;


public interface FpmxMapper {
	public List<Fpmx> getFpmxList(Map<String,Object> params);
	public void addFpmx(Fpmx obj);
	public void updateFpmx(Fpmx obj);
	public void deleteFpmx(Fpmx obj);
}
