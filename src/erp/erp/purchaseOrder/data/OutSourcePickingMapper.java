package erp.erp.purchaseOrder.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseOrder.model.OutSourceDetailImp;
import erp.erp.purchaseOrder.model.OutSourceImp;
import erp.erp.purchaseOrder.model.OutSourcePicking;


public interface OutSourcePickingMapper {
	public List<OutSourcePicking> getOutSourcePickingList(Map<String,Object> params);
	public List<OutSourcePicking> getOutSourcePickingForEdtList(Map<String,Object> params);
	public void addOutSourcePicking(OutSourcePicking obj);
	public void updateOutSourcePicking(OutSourcePicking obj);
	public void deleteOutSourcePicking(OutSourcePicking obj);
	//外协导入
	public List<OutSourceImp> getOutSourceImpList(Map<String,Object> params);
	public List<OutSourceDetailImp> getOutSourceDetailImpList(Map<String,Object> params);
}
