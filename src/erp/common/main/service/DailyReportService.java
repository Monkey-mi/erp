package erp.common.main.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.main.data.DailyReportMapper;
import erp.common.model.DailyReport;
import erp.common.model.UserDefineReport;


@Service
public class DailyReportService {
	@Autowired
	private DailyReportMapper mapper;
	
	public List<DailyReport> getDailyList(Map<String,Object> params){
		return mapper.getDailyList(params);		
	}
	
	public void addDailyReport(DailyReport[] arr){
		for(int i=0; i<arr.length;i++)
		{
			mapper.addDailyReport(arr[i]);	
		}
	}
	
	public void deleteDailyReport(DailyReport[] arr){
		for(int i=0; i<arr.length;i++)
		{
			mapper.deleteDailyReport(arr[i]);	
		}
	}
	
	
	public List<UserDefineReport> getUserReportList(Map<String,Object> params){
		return mapper.getUserReportList(params);
	}
	
	public void addUserReport(UserDefineReport[] reports){
		for (int i =0;i<reports.length;i++)
			mapper.addUserReport(reports[i]);
	}
	public void updateUserReport(UserDefineReport[] reports){
		for (int i =0;i<reports.length;i++)
			mapper.updateUserReport(reports[i]);
	}
	public void deleteUserReport(UserDefineReport[] reports){
		for (int i =0;i<reports.length;i++)
			mapper.deleteUserReport(reports[i]);
	}
	public boolean isExistsReport(Map<String,Object> params){
		return mapper.getUserReportList(params).size()>0;
	}
}
