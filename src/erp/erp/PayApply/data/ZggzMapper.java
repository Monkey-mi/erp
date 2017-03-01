package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Zggz;


public interface ZggzMapper {
	public List<Zggz> getZggzList(Map<String,Object> params);
	public void addZggz(Zggz obj);
	public void updateZggz(Zggz obj);
	public void deleteZggz(Zggz obj);
}
