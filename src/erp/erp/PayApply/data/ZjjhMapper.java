package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Zjjh;


public interface ZjjhMapper {
	public List<Zjjh> getZjjhList(Map<String,Object> params);
	public void addZjjh(Zjjh obj);
	public void updateZjjh(Zjjh obj);
	public void deleteZjjh(Zjjh obj);
}
