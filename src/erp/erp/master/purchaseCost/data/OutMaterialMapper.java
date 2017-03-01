package erp.erp.master.purchaseCost.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseCost.model.OutMaterial;


public interface OutMaterialMapper {
	public List<OutMaterial> getOutMaterialList(Map<String,Object> params);
}
