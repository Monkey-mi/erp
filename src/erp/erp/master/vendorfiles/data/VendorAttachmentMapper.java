package erp.erp.master.vendorfiles.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.vendorfiles.model.VendorAttachment;


public interface VendorAttachmentMapper {
	public List<VendorAttachment> getVendorAttachmentList(Map<String,Object> params);
	public void addVendorAttachment(VendorAttachment obj);
	public void updateVendorAttachment(VendorAttachment obj);
	public void deleteVendorAttachment(VendorAttachment obj);
}
