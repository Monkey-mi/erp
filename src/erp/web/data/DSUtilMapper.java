package erp.web.data;


import java.util.List;
import java.util.Map;

import erp.web.model.DBVerList;
import erp.web.model.ExtDataSource;

public interface DSUtilMapper {
	List<ExtDataSource> getExtDataSourceList(Map<String,Object> paramsMap);
	void addExtDataSource(ExtDataSource extDataSource);
	void updateExtDataSource(ExtDataSource extDataSource);
	void deleteExtDataSource(ExtDataSource extDataSource);	
	
	
	List<DBVerList> getDBVerList(Map<String,Object> paramsMap);

}
