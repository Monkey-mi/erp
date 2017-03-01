package erp.erp.master.group.service;


import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.group.data.GroupOperatorMapper;
import erp.erp.master.group.model.GroupOperator;

@Service
public class GroupOperatorService {
	 @Autowired
	 private GroupOperatorMapper mapper;
    
	 public List<GroupOperator> getGroupOperatorList(Map<String,Object> params) {
			return mapper.getGroupOperatorList(params);
		}
	 public void addGroupOperator(GroupOperator[] arr) {
			for(GroupOperator obj: arr) {
				mapper.addGroupOperator(obj);
			}
		}
	
	 public void deleteGroupOperator(GroupOperator[] arr) {
			for(GroupOperator obj: arr) {
				mapper.deleteGroupOperator(obj);
			}
		}
	
}
