package erp.bi.dc.data;


import java.util.List;
import java.util.Map;

import erp.bi.dc.model.DateReportTemplate;


public interface TemplateMapper {
	public List<DateReportTemplate> getDatagridTplList(Map<String,Object> params);
	public List<DateReportTemplate> getDatagridTplWithXml(Map<String,Object> params);
	
	public void addDatagridTpl(DateReportTemplate obj);
	public void updateDatagridTpl(DateReportTemplate obj);
	public void deleteDatagridTpl(DateReportTemplate obj);
	
	public String getDatagridTplXml(Map<String,Object> params);
	public void setDatagridTplXml(Map<String, Object> params);
}
