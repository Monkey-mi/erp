package erp.erp.materialTestEvaluation.data;

import java.util.List;
import java.util.Map;

import erp.common.TreeModel;
import erp.erp.materialTestEvaluation.model.EntrustedInspectionCategory;
import erp.erp.materialTestEvaluation.model.MaterialTestEvaluation;


public interface MaterialTestEvaluationMapper {
	public List<MaterialTestEvaluation> getMaterialTestEvaluationList(Map<String,Object> params);
	public void addMaterialTestEvaluation(MaterialTestEvaluation obj);
	public void updateMaterialTestEvaluation(MaterialTestEvaluation obj);
	public void deleteMaterialTestEvaluation(MaterialTestEvaluation obj);
	public List<EntrustedInspectionCategory> getInspectionCategory(Map<String,Object> params);
	int getWtsjlbqxb(Map<String,Object> params);
}
