package erp.common.main.data;

import java.util.List;
import java.util.Map;

import erp.common.model.DailyReport;
import erp.common.model.UserDefineReport;

public interface DailyReportMapper {
	List<DailyReport> getDailyList(Map<String,Object> params);
	void addDailyReport(DailyReport obj);
	void deleteDailyReport(DailyReport obj);
	
	
	List<UserDefineReport> getUserReportList(Map<String,Object> params);
	void addUserReport(UserDefineReport obj);
	void updateUserReport(UserDefineReport obj);
	void deleteUserReport(UserDefineReport obj);
	
}
