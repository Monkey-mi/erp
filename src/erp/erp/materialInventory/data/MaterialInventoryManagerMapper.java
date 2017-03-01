package erp.erp.materialInventory.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialInventory.model.Htmxb;
import erp.erp.materialInventory.model.Lldbyl;
import erp.erp.materialInventory.model.MaterialInventoryManager;
import erp.erp.materialInventory.model.Rkdb_yl;
import erp.erp.materialInventory.model.Wgcprkdb;
 

public interface MaterialInventoryManagerMapper {
	public List<MaterialInventoryManager> getMaterialInventory(Map<String,Object> params);
	public List<MaterialInventoryManager> getAP_MaterialInventory(Map<String,Object> params);
	public List<MaterialInventoryManager> getBP_MaterialInventory(Map<String,Object> params);
	public List<MaterialInventoryManager> getCP_MaterialInventory(Map<String,Object> params);	
	public void addMaterialInventory(MaterialInventoryManager obj);
	public void updateMaterialInventory(MaterialInventoryManager obj);
	public void deleteMaterialInventory(MaterialInventoryManager obj);
	String ifRoot(Map<String,Object> params);
    int getMaxWgbj(Map<String,Object> params);
    public List<Wgcprkdb> getWgcprkdb(Map<String,Object> params);
    public List<MaterialInventoryManager> getWmsqy(Map<String,Object> params);
    int getCountWG(Map<String,Object> params);
    int getCountLL(Map<String,Object> params);
    public String getStringFromSql(Map<String,Object> params);
    int getSCount(Map<String,Object> params);
    int getCountLL3(Map<String,Object> params);
    int getCountLL4(Map<String,Object> params);
    double getLDKzdj(Map<String,Object> params);
    double getLDKzdj2(Map<String,Object> params);
    public List<Htmxb> getCgkdja(Map<String,Object> params);
    public List<Htmxb> getCgkdjb(Map<String,Object> params);
    int getMjbz(Map<String,Object> params);
    int getRelateBusinessCount(Map<String,Object> params);
    int getRelateInventoryCount(Map<String,Object> params);
    long getWMSCount(Map<String,Object> params);
    public List<Lldbyl> getDelete1Result(Map<String,Object> params);
    long getS_clllsd(Map<String,Object> params);
    int getLs_wmsqy(Map<String,Object> params);
    int getS_cpsjsd(Map<String,Object> params);
    int getS_cprksd(Map<String,Object> params);
    public List<Rkdb_yl> getRkdb_yl_sc(Map<String,Object> params);
    Double getSum_rksl(Map<String,Object> params);
    Double getSum_kcsl(Map<String,Object> params);
    Double getSum_rksl2(Map<String,Object> params);
    Double getSum_kcsl2(Map<String,Object> params);
}
