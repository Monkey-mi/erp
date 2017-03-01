package srm.supplier.data;

import java.util.List;
import java.util.Map;

import srm.basicdata.area.model.Area;
import srm.basicdata.companyClass.model.CompanyClass;
import srm.basicdata.materialClass.model.MaterialClass;
import srm.supplier.model.CustomerInfo;
import srm.supplier.model.FactoryInfo;
import srm.supplier.model.SupplierFile;

public interface SupplierFileMapper {
	public List<SupplierFile> getSupplierFileList(Map<String,Object> params);
	public List<SupplierFile> getSupplierFileByID(Map<String,Object> params);
	public List<SupplierFile> getSupplierFileListForHelp(Map<String,Object> params);
	public void addSupplierFile(SupplierFile obj);
	public void updateSupplierFile(SupplierFile obj);
	public void deleteSupplierFile(SupplierFile obj);
	int checkStatusSame(Map<String,Object> params);
	public List<CompanyClass> getCompanyClassList(Map<String,Object> params);
	Integer getCountByIdAndName(Map<String,Object> params);
	Integer getCountByName(Map<String,Object> params);
	public List<Area> getAreaList(Map<String,Object> params);
	
	public List<MaterialClass> getMaterialClassList(Map<String,Object> params);
	//根据sql获取对应值
	public String getStringFromSql(Map<String,Object> params);
	//ERP对应厂商信息
	public void addFactoryInfo(FactoryInfo obj);
	public void updateFactoryInfo(FactoryInfo obj);
	public void deleteFactoryInfo(FactoryInfo obj);
	//获取客户信息
	List<CustomerInfo> getCustomerListForHelp(Map<String,Object> paramMap);
	int getRepeatCount(Map<String,Object> paramMap);
}
