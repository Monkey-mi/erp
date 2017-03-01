package erp.erp.master.purchaseDetail.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseDetail.model.OutSource;
import erp.erp.master.purchaseDetail.model.ProcessName;


public interface OutSourceMapper {
	public List<OutSource> getOutSourceList(Map<String,Object> params);
	public void addOutSource(OutSource obj);
	public void updateOutSource(OutSource obj);
	public void deleteOutSource(OutSource obj);
	public List<ProcessName> getProcessNameList(Map<String,Object> params);//获去工序名称
}
