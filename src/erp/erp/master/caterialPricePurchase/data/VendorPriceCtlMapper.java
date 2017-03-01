package erp.erp.master.caterialPricePurchase.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.caterialPricePurchase.model.VendorPriceCtl;


public interface VendorPriceCtlMapper {
	public List<VendorPriceCtl> getVendorPriceCtlList(Map<String,Object> params);
	public void addVendorPriceCtl(VendorPriceCtl obj);
	public void updateVendorPriceCtl(VendorPriceCtl obj);
	public void deleteVendorPriceCtl(Map<String,Object> params);
	public void deleteCsjjxx(Map<String,Object> params);
}
