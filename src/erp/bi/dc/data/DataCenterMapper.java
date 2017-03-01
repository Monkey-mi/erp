package erp.bi.dc.data;


import java.util.List;
import java.util.Map;

import erp.bi.dc.model.DataCenter;
import erp.bi.dc.model.DataCenterDesc;
import erp.bi.dc.model.DataCenterParam;


public interface DataCenterMapper {
	
	  public List<DataCenter> getDsCenterList(Map<String,Object> params);
	  public List<DataCenter> getDsCenterListForSpe(Map<String,Object> params);
	  public void addDataCenter(DataCenter ds);
	  public void updateDataCenter(DataCenter ds);
	  public void deleteDsCenter(DataCenter ds);
	  
	  public List<DataCenterDesc> getDsDescList(Map<String,Object> params);
	  public void addDataCenterDesc(DataCenterDesc dsdesc);
	  public void updateDataCenterDesc(DataCenterDesc dsdesc);
	  public void deleteDataCenterDesc(DataCenterDesc dsdesc);
	  public void deleteDataCenterDescByDs(int ds_id);
	  
	  public List<DataCenterParam> getDsParamList(Map<String,Object> params);
	  public void addDataCenterParam(DataCenterParam dsParam);
	  public void updateDataCenterParam(DataCenterParam dsParam);
	  public void deleteDataCenterParam(DataCenterParam dsParam);
	  public void deleteDataCenterParamByDs(int ds_id);
}
