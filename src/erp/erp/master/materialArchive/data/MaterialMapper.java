package erp.erp.master.materialArchive.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.materialArchive.model.CtrlPrice;
import erp.erp.master.materialArchive.model.HisPrice;
import erp.erp.master.materialArchive.model.Jldw;
import erp.erp.master.materialArchive.model.Material;
import erp.erp.master.materialArchive.model.Plan;
import erp.erp.master.materialArchive.model.PriceParameter;
import erp.erp.master.materialArchive.model.Product;
import erp.erp.master.materialArchive.model.Rule;
import erp.erp.master.materialArchive.model.UserMaterial;


public interface MaterialMapper {
	public List<Material> getMaterialList(Map<String,Object> params);
	public void addMaterial(Material obj);
	public void addJgcs(PriceParameter obj);
	public void updateMaterial(Material obj);
	public void updateJgcs(PriceParameter obj);
	public void deleteMaterial(Material obj);
	public void deleteJgcs(PriceParameter obj);
	public List<Product> getProductList(Map<String,Object> params);
	public List<Plan> getPlanList(Map<String,Object> params);
	public List<CtrlPrice> getCtrlPriceList(Map<String,Object> params);
	public List<HisPrice> getHisPriceList(Map<String,Object> params);
	public List<PriceParameter> getJgcsList(Map<String,Object> params);
	public List<Jldw> getJldwList(Map<String,Object> params);
	public List<Rule> getRuleList(Map<String,Object> params);
	//审批
	public void doAppro(Map<String,Object> params);
	int getMaxjlxh(Map<String,Object> params);
	//一个厂商不能有多个价格参数
	int getCount(Map<String,Object> params);
	List<UserMaterial> getUserMaterialList(Map<String,Object> params);
    void addUserMaterial(UserMaterial obj);
    void deleteUserMaterial(UserMaterial obj);
}
