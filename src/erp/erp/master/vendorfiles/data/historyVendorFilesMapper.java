package erp.erp.master.vendorfiles.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.vendorfiles.model.HistoryVendorFiles;


public interface historyVendorFilesMapper {
	public List<HistoryVendorFiles> gethistoryVendorFilesList(Map<String,Object> params);
	public void addhistoryVendorFiles(HistoryVendorFiles obj);
	public void updatehistoryVendorFiles(HistoryVendorFiles obj);
	public void deletehistoryVendorFiles(HistoryVendorFiles obj);
}
