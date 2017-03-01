package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Htmx;


public interface HtmxMapper {
	public List<Htmx> getHtmxList(Map<String,Object> params);
	public void addHtmx(Htmx obj);
	public void updateHtmx(Htmx obj);
	public void deleteHtmx(Htmx obj);
}
