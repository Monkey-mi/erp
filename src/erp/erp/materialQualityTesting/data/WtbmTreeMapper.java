package erp.erp.materialQualityTesting.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialQualityTesting.model.Wtbm;

public interface WtbmTreeMapper {
	public List<Wtbm> getWtbmList(Map<String,Object> params);
	String getWtbmOne(Map<String,Object> params);
	String getWtbmTwo(Map<String,Object> params);
	//部门名称
	String getWtbmName(Map<String,Object> params);
}
