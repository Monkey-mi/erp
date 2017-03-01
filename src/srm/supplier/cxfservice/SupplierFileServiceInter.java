package srm.supplier.cxfservice;

import javax.jws.WebService;

import erp.common.ListTAndMap;
import erp.common.MapObj;
import erp.common.TreeModel;

import srm.basicdata.area.model.Area;
import srm.basicdata.companyClass.model.CompanyClass;
import srm.basicdata.materialClass.model.MaterialClass;
import srm.supplier.model.SupplierFile;

@WebService
public interface SupplierFileServiceInter {
	public ListTAndMap<SupplierFile> getSupplierFileList(MapObj mapObj);
	public ListTAndMap<SupplierFile> getSupplierFileByID(MapObj mapObj);
	public SupplierFile[] addSupplierFile(SupplierFile[] arr);
	public SupplierFile[] updateSupplierFile(SupplierFile[] arr);
	public void deleteSupplierFile(SupplierFile[] arr);
	
	public String checkStatusSame(MapObj mapObj);
	public ListTAndMap<CompanyClass> getCompanyClassList(MapObj mapObj);
	public Integer getCountByIdAndName(MapObj mapObj);
	public ListTAndMap<Area> getAreaList(MapObj mapObj);
	public ListTAndMap<MaterialClass> getMaterialClassList(MapObj mapObj);
	public ListTAndMap<TreeModel> getMaterialClassTree(MapObj mapObj);
}
