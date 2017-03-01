package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.supplier.data.SupplierMaterialSub1Mapper;
import srm.supplier.model.SupplierMaterialSub1;


@Service
public class SupplierMaterialSub1Service {
	@Autowired
	private SupplierMaterialSub1Mapper mapper;
	public List<SupplierMaterialSub1> getSupplierMaterialSub1List(Map<String,Object> params) {
		return mapper.getSupplierMaterialSub1List(params);
	}
	public void addSupplierMaterialSub1(SupplierMaterialSub1[] arr) {
		for(SupplierMaterialSub1 obj: arr) {
			mapper.addSupplierMaterialSub1(obj);
			/*int mc_id = obj.getMc_id();
			String lbbh = mapper.getLbbhFromMaterialClass(mc_id);
			if(lbbh != null){//对应的材料类别为null则平台不做修改
			obj.setLbbh(lbbh);
			String jsonmap = MyJsonUtil.obj2string(obj);			
			supplierInter.updatePurchaseCategoryByWs(jsonmap);
			}*/
		}
	}
	public void updateSupplierMaterialSub1(SupplierMaterialSub1[] arr) {
		for(SupplierMaterialSub1 obj: arr) {
			mapper.updateSupplierMaterialSub1(obj);
			/*int mc_id = obj.getMc_id();
			String lbbh = mapper.getLbbhFromMaterialClass(mc_id);
			if(lbbh != null){
			obj.setLbbh(lbbh);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updatePurchaseCategoryByWs(jsonmap);
			}*/			
		}
	}
	public void deleteSupplierMaterialSub1(SupplierMaterialSub1[] arr) {
		/*Integer record_id = 0;
		if(arr[0].getRecord_id()!= 0){
			record_id = arr[0].getRecord_id();		    
		}else{
			int company_id = arr[0].getCompany_id();
		    record_id = mapper.getRecord_Id(company_id);
		}*/
		for(SupplierMaterialSub1 obj: arr) {			
			mapper.deleteSupplierMaterialSub1(obj);
			/*int mc_id = obj.getMc_id();
			String lbbh = mapper.getLbbhFromMaterialClass(mc_id);			
			if(lbbh != null && record_id !=0){//对应的材料类别为null则平台不做修改
			obj.setLbbh(lbbh);
			obj.setRecord_id(record_id);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.deletePurchaseCategoryByWs(jsonmap);
			}*/
			
		}
	}
}
