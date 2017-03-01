package erp.erp.materialQualityTesting.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialQualityTesting.model.Clbmb;

public interface ClbmbMapper {
	public List<Clbmb> getClbmbList(Map<String,Object> params);
	public void addClbmb(Clbmb obj);
	public void updateClbmb(Clbmb obj);
	public void deleteClbmb(Clbmb obj);
}
