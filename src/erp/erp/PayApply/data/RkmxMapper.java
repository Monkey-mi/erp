package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Rkmx;


public interface RkmxMapper {
	public List<Rkmx> getRkmxList(Map<String,Object> params);
	public void addRkmx(Rkmx obj);
	public void updateRkmx(Rkmx obj);
	public void deleteRkmx(Rkmx obj);
}
