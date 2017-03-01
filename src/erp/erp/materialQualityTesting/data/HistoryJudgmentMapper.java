package erp.erp.materialQualityTesting.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialQualityTesting.model.MaterialQualityManager;

public interface HistoryJudgmentMapper {
	public List<MaterialQualityManager> getHistoryJudgmentList(Map<String,Object> params);
	public void addHistoryJudgment(MaterialQualityManager obj);
	public void updateHistoryJudgment(MaterialQualityManager obj);
	public void deleteHistoryJudgment(MaterialQualityManager obj);
	public int getHistoryJudgmentCount(Map<String,Object> params);
}
