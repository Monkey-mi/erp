package erp.erp.master.group.data;

import java.util.List;
import java.util.Map;


import erp.erp.master.group.model.GroupOperator;

public interface GroupOperatorMapper {
     public List<GroupOperator> getGroupOperatorList(Map<String,Object> params);
     public void addGroupOperator(GroupOperator obj);
     public void deleteGroupOperator(GroupOperator obj);
    
}
