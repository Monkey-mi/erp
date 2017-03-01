package srm.supplier.data;

import java.util.List;
import java.util.Map;

import srm.supplier.model.AppSupplierAccessLoop;


public interface AppSupplierAccessLoopMapper {
	public List<AppSupplierAccessLoop> getAppSupplierAccessLoopList(Map<String,Object> params);
	public List<AppSupplierAccessLoop> getAppSupplierAccessLoopOutList(Map<String,Object> params);
	public void addAppSupplierAccessLoop(AppSupplierAccessLoop obj);
	public void updateAppSupplierAccessLoop(AppSupplierAccessLoop obj);
	public void deleteAppSupplierAccessLoop(AppSupplierAccessLoop obj);
	String getStringFromSql(Map<String,Object> params);
	String getMaxDate(Map<String,Object> params);
}
