package erp.erp.master.prematerial.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.prematerial.model.Prematerial;


public interface PrematerialMapper {
	public List<Prematerial> getPrematerialList(Map<String,Object> params);
	public void addPrematerial(Prematerial obj);
	public void updatePrematerial(Prematerial obj);
	public void deletePrematerial(Prematerial obj);
	public String  getCsName(String params);
	List<String> getCkqx(Map<String,Object> params);
}
