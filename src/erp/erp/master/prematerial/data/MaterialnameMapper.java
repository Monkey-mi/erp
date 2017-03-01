package erp.erp.master.prematerial.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.prematerial.model.Materialname;


public interface MaterialnameMapper {
	public List<Materialname> getMaterialnameList(Map<String,Object> params);
	public void addMaterialname(Materialname obj);
	public void updateMaterialname(Materialname obj);
	public void deleteMaterialname(Materialname obj);
}
