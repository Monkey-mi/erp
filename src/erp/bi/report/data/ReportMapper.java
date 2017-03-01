package erp.bi.report.data;



import java.util.List;
import java.util.Map;

import erp.bi.report.model.CurrentTreeRPT;
import erp.bi.report.model.ReportDocTree;


public interface ReportMapper {
	List<CurrentTreeRPT> getCurrentTree(Map<String,Object> params);
	List<CurrentTreeRPT> getCurrentTreeCombo(Map<String,Object> params);
	List<CurrentTreeRPT> getCurrentTreeIncludeReport(Map<String,Object> params);
	void addCurrentTree(CurrentTreeRPT item);
	void deleteCurrentTree(Map<String,Object> params);
	void updateCurrentTree(CurrentTreeRPT item);
	void updateCurrentTreeStatus(CurrentTreeRPT item);
	int getDocLeafCount(Map<String,Object> params);
	
	int getCurrentContent(Map<String,Object> params);
	
	List<ReportDocTree> getReportDocTree(Map<String,Object> params);
	void addReportDocTree(ReportDocTree item);
	void deleteReportDocTree(Map<String,Object> params);
	void updateReportDocTree(ReportDocTree item);
	
	int getReportDocContent(Map<String,Object> params);
	
	
	
	List<String> getCurrentTreeNode(Map<String,Object> params);
}
