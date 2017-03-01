package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Yfcxmx;


public interface YfcxmxMapper {
	public List<Yfcxmx> getYfcxmxList(Map<String,Object> params);
	public void addYfcxmx(Yfcxmx obj);
	public void updateYfcxmx(Yfcxmx obj);
	public void deleteYfcxmx(Yfcxmx obj);
}
