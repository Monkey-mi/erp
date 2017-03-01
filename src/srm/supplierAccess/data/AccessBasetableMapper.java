package srm.supplierAccess.data;

import java.util.List;
import java.util.Map;

import srm.supplierAccess.model.AccessBasetable;


public interface AccessBasetableMapper {
	public List<AccessBasetable> getAccessBasetableList(Map<String,Object> params);
	public void addAccessBasetable(AccessBasetable obj);
	public void updateAccessBasetable(AccessBasetable obj);
	public void deleteAccessBasetable(AccessBasetable obj);
	
}
