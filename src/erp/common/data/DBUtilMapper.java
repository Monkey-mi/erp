package erp.common.data;

import java.util.List;
import java.util.Map;

public interface DBUtilMapper {
	List<Map<String,Object>> executeQuery(Map<String,Object> paramsMap);
	//int getCountData(Map<String,Object> paramsMap);
	List<Map<String,Object>> selectData(Map<String,Object> paramsMap);
	List<Map<String,Object>> selectChartData(Map<String,Object> paramsMap);
	List<Map<String,Object>> selectDateData(Map<String,Object> paramsMap);
	
	List<Map<String,Object>> testSelect(Map<String,Object> paramsMap);
	
	void insertData(Map<String,Object> paramsMap);
	void updateData(Map<String,Object> paramsMap);
	void deleteData(Map<String,Object> paramsMap);
	
	
	String showTable(Map<String,Object> paramsMap);
	void createTable(Map<String,Object> paramsMap);
	void dropTable(Map<String,Object> paramsMap);
}
