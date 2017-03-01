package srm.supplier.data;

import java.util.List;
import java.util.Map;

import srm.supplier.model.Metarial;

public interface MetarialMapper {
	public List<Metarial> getMetarialList(Map<String,Object> params);
	public void addMetarial(Metarial obj);
	public void updateMetarial(Metarial obj);
	public void deleteMetarial(Metarial obj);
}