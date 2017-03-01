package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Yfcx;


public interface YfcxMapper {
	public List<Yfcx> getYfcxList(Map<String,Object> params);
	public void addYfcx(Yfcx obj);
	public void updateYfcx(Yfcx obj);
	public void deleteYfcx(Yfcx obj);
}
