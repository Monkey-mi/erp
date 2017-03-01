package erp.common.main.data;


import java.util.List;
import java.util.Map;

import erp.common.model.ContentPermit;



public interface ContentMapper {
	
	List<ContentPermit> getCPList(Map<String,Object> paramsMap);
	void addCP(ContentPermit cp);
	void updateCP(ContentPermit cp);
	void deleteCP(ContentPermit cp);
	void deleteCPById(ContentPermit cp);
}