package srm.materialConfirmation.data;

import java.util.List;
import java.util.Map;

import srm.materialConfirmation.model.MaterialConfirmation;


public interface MaterialConfirmationMapper {
	public List<MaterialConfirmation> getMaterialConfirmationList(Map<String,Object> params);
	public void addMaterialConfirmation(MaterialConfirmation obj);
	public void updateMaterialConfirmation(MaterialConfirmation obj);
	public void deleteMaterialConfirmation(MaterialConfirmation obj);
	public String getStringFromSql(Map<String,Object> params);
	
	public List<Integer> getSampleIdFromMaterialsample(Map<String,Object> params);
	void deleteMaterialcheck_detail(Map<String,Object> params);
}
