package erp.erp.materialInspection.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialInspection.model.ArriveList;
import erp.erp.materialInspection.model.Csjgxsj;
import erp.erp.materialInspection.model.InspectionWareHouse;
import erp.erp.materialInspection.model.InspectionWtbm;
import erp.erp.materialInspection.model.MaterialInspection;
import erp.erp.materialInspection.model.MaterialTestPro;
import erp.erp.materialInspection.model.TestMethod;
import erp.erp.materialInspection.model.TestProject;


public interface MaterialInspectionMapper {
	public List<MaterialInspection> getMaterialInspectionList(Map<String,Object> params);
	public void addMaterialInspection(MaterialInspection obj);
	public void updateMaterialInspection(MaterialInspection obj);
	public void deleteMaterialInspection(Map<String,Object> params);
	public void deleteMaterialInspectionDetele(Map<String,Object> params);
	public void deleteMaterialDetail(Map<String,Object> params);
	void updateLoadingPlanBj(MaterialInspection obj);
	public String getStringFromSql(Map<String,Object> params);
    List<ArriveList> getArriveList(Map<String,Object> params);
    List<MaterialTestPro> getMaterialTestProList(Map<String,Object> params);
    int getXmbh(Map<String,Object> params);
    Csjgxsj getTgb(Map<String,Object> params);
	Csjgxsj getZeroTgb(Map<String,Object> params);
    List<TestMethod> getTestMethod(Map<String,Object> params);
    List<TestProject> getTestProject(Map<String,Object> params);
    List<InspectionWtbm> getWtbmList(Map<String,Object> params);
    int getCostCount(Map<String,Object> params);
    public List<InspectionWareHouse> getInspectionWareHouseList(Map<String,Object> params);
    double getJjdxs(Map<String,Object> params);
   List<InspectionWareHouse> getWareHouseTrList(Map<String,Object> params);	
}
