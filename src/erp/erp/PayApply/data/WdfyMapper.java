package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Wdfy;


public interface WdfyMapper {
	public List<Wdfy> getWdfyList(Map<String,Object> params);
	public void addWdfy(Wdfy obj);
	public void updateWdfy(Wdfy obj);
	public void deleteWdfy(Wdfy obj);
}
