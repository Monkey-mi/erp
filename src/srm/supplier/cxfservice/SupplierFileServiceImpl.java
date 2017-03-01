package srm.supplier.cxfservice;

import java.util.List;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import erp.common.ListTAndMap;
import erp.common.MapObj;
import erp.common.TreeModel;

import srm.basicdata.area.model.Area;
import srm.basicdata.companyClass.model.CompanyClass;
import srm.basicdata.materialClass.model.MaterialClass;
import srm.supplier.model.SupplierFile;
import srm.supplier.service.SupplierFileService;
@WebService
@SOAPBinding(style = Style.RPC)
public class SupplierFileServiceImpl implements SupplierFileServiceInter {
	private SupplierFileService supplierFileService;
	
	public SupplierFileService getSupplierFileService() {
		return supplierFileService;
	}

	public void setSupplierFileService(SupplierFileService supplierFileService) {
		this.supplierFileService = supplierFileService;
	}
	@Override
	public ListTAndMap<SupplierFile> getSupplierFileList(MapObj mapObj) {
		ListTAndMap<SupplierFile> lam=new ListTAndMap<SupplierFile>();
		List<SupplierFile> list=supplierFileService.getSupplierFileList(mapObj.getParams());
		lam.setList(list);
		lam.setParams(mapObj.getParams());
		return lam;
	}
	
	@Override
	public ListTAndMap<SupplierFile> getSupplierFileByID(MapObj mapObj) {
		ListTAndMap<SupplierFile> lam=new ListTAndMap<SupplierFile>();
		List<SupplierFile> list=supplierFileService.getSupplierFileByID(mapObj.getParams());
		lam.setList(list);
		lam.setParams(mapObj.getParams());
		return lam;
	}

	@Override
	public SupplierFile[] addSupplierFile(SupplierFile[] arr) {
		supplierFileService.addSupplierFile(arr);
		return arr;
	}

	@Override
	public SupplierFile[] updateSupplierFile(SupplierFile[] arr) {
		supplierFileService.updateSupplierFile(arr);
		return arr;
	}

	@Override
	public void deleteSupplierFile(SupplierFile[] arr) {
		supplierFileService.deleteSupplierFile(arr);
	}

	@Override
	public String checkStatusSame(MapObj mapObj) {
		return supplierFileService.checkStatusSame(mapObj.getParams());
	}

	@Override
	public ListTAndMap<CompanyClass> getCompanyClassList(MapObj mapObj) {
		ListTAndMap<CompanyClass> lam=new ListTAndMap<CompanyClass>();
		List<CompanyClass> list=supplierFileService.getCompanyClassList(mapObj.getParams());
		lam.setList(list);
		lam.setParams(mapObj.getParams());
		return lam; 
	}

	@Override
	public Integer getCountByIdAndName(MapObj mapObj) {
		int count=supplierFileService.getCountByIdAndName(mapObj.getParams());
		return count;
	}

	@Override
	public ListTAndMap<Area> getAreaList(MapObj mapObj) {
		ListTAndMap<Area> lam=new ListTAndMap<Area>();
		List<Area> list=supplierFileService.getAreaList(mapObj.getParams());
		lam.setList(list);
		lam.setParams(mapObj.getParams());
		return lam; 
	}

	@Override
	public ListTAndMap<MaterialClass> getMaterialClassList(MapObj mapObj) {
		ListTAndMap<MaterialClass> lam=new ListTAndMap<MaterialClass>();
		List<MaterialClass> list=supplierFileService.getMaterialClassList(mapObj.getParams());
		lam.setList(list);
		lam.setParams(mapObj.getParams());
		return lam;  
	}

	@Override
	public ListTAndMap<TreeModel> getMaterialClassTree(MapObj mapObj) {
		ListTAndMap<TreeModel> lam=new ListTAndMap<TreeModel>();
		List<TreeModel> list= supplierFileService.getMaterialClassTree(mapObj.getParams());
		lam.setList(list);
		lam.setParams(mapObj.getParams());
		return lam; 
	}
}
