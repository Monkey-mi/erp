package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Fkjh;


public interface FkjhMapper {
	public List<Fkjh> getFkjhList(Map<String,Object> params);
	public void addFkjh(Fkjh obj);
	public void updateFkjh(Fkjh obj);
	public void deleteFkjh(Fkjh obj);
}
