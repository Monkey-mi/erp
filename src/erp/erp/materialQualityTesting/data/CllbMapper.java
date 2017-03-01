package erp.erp.materialQualityTesting.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialQualityTesting.model.Cllb;
import erp.erp.materialQualityTesting.model.Wtbm;

public interface CllbMapper {
	public List<Wtbm> getCllbList(Map<String,Object> params);
	String getCllbOne(Map<String,Object> params);
	String getCllbTwo(Map<String,Object> params);
	//类别名称
	String getCllbName(Map<String,Object> params);
}
