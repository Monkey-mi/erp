package srm.materialConfirmation.data;

import java.util.List;
import java.util.Map;

import srm.materialConfirmation.model.MaterialCheckclass;


public interface MaterialCheckclassMapper {
	public List<MaterialCheckclass> getMaterialCheckclassList(Map<String,Object> params);
	public void addMaterialCheckclass(MaterialCheckclass obj);
	public void updateMaterialCheckclass(MaterialCheckclass obj);
	public void deleteMaterialCheckclass(MaterialCheckclass obj);
	public String getOAdepartmentName(Map<String,Object> params);
}
