package erp.erp.materialQualityTesting.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialQualityTesting.model.Ckmc;


public interface CkmcMapper {
	public List<Ckmc> getCkmcList(Map<String,Object> params);
	public List<Ckmc> getCkmc(Map<String,Object> params);
}
