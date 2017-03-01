package erp.bi.report.data;

import java.util.List;
import java.util.Map;

import erp.bi.report.model.SysPrintModel;



public interface SysPrintModelMapper {
	public List<SysPrintModel> getSysPrintModelList(Map<String,Object> params);
	public void addSysPrintModel(SysPrintModel obj);
	public void updateSysPrintModel(SysPrintModel obj);
	public void deleteSysPrintModel(SysPrintModel obj);
	public void setDatagridTplXml(Map<String,Object> params);
	public List<SysPrintModel> getPayApplyPrintModelList(Map<String,Object> params);
}
