package erp.erp.master.group.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.group.model.Group;

public interface GroupMapper {
    public List<Group> getGroupList(Map<String,Object> params);
    public void addGroup(Group obj);
    public void updateGroup(Group obj);
    public void deleteGroup(Group obj);
    public void deleteCzy(Group obj);
    int getOperatorIsExist(Map<String,Object> params);
    int beforeDel(Group obj);
    String getGroupOne(Map<String,Object> params);
}
