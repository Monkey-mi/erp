package erp.erp.purchaseOrder.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseOrder.model.Ofpopinfo;


public interface OfpopinfoMapper {
	public List<Ofpopinfo> getOfpopinfoList(Map<String,Object> params);
	public void addOfpopinfo(Ofpopinfo obj);
	public void updateOfpopinfo(Ofpopinfo obj);
	public void deleteOfpopinfo(Ofpopinfo obj);
}
