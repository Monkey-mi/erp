package erp.erp.materialInventory.data;

import java.util.Map;

public interface RootMapper {
	String getManuBH(Map<String,Object> params);
	public int setAddRoot(Map<String,Object> params);
	public int setDeleteRoot(Map<String,Object> params);
	public int setPrintRoot(Map<String,Object> params);
	public int setLockRoot(Map<String,Object> params);
	public int setPriceCheckRoot(Map<String,Object> params);
}
 