package erp.erp.master.vendorfiles.data;

import java.util.List;
import java.util.Map;


import erp.erp.master.vendorfiles.model.VendorFiles;


public interface VendorFilesMapper {
	public List<VendorFiles> getVendorFilesList(Map<String,Object> params);
	public void addVendorFiles(VendorFiles obj);
	public void updateVendorFiles(VendorFiles obj);
	public void deleteVendorFiles(VendorFiles obj);
	
	String getVendorFilesOne(Map<String,Object> params);
	void updateApproStatus(Map<String,Object> params);
	/*List<UseVendorFiles> getUseConsumerList(Map<String,Object> params);*/
}
