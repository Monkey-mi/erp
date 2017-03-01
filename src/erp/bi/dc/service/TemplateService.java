package erp.bi.dc.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.bi.dc.data.TemplateMapper;
import erp.bi.dc.model.DateReportTemplate;
import erp.util.Const;



@Service
public class TemplateService {
	
	@Autowired
	private TemplateMapper templateMapper;
	
	public List<DateReportTemplate> getDatagridTplList(Map<String,Object> params) {
		return templateMapper.getDatagridTplList(params);
	}
	public List<DateReportTemplate> getDatagridTplWithXml(Map<String,Object> params) {
		return templateMapper.getDatagridTplWithXml(params);
	}
	public void addDatagridTpl(DateReportTemplate[] arr) {
		for(DateReportTemplate obj: arr) {
			templateMapper.addDatagridTpl(obj);
		}
	}
	public void updateDatagridTpl(DateReportTemplate[] arr) {
		for(DateReportTemplate obj: arr) {
			templateMapper.updateDatagridTpl(obj);
		}
	}
	public void deleteDatagridTpl(DateReportTemplate[] arr) {
		for(DateReportTemplate obj: arr) {
			templateMapper.deleteDatagridTpl(obj);
		}
	}
	/**
	 * 获取模板文件
	 * @param params
	 * @return
	 */
	public boolean getDatagridTplXml(Map<String,Object> params){
		try{			
			params.put(Const.SERVICE_CALL_RESULT, templateMapper.getDatagridTplXml(params));			
			return true;
		}catch(Exception e){
			params.put(Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}		
	}
	
	/**
	 * 获取模板文件
	 * @param params
	 * @return
	 */
	public boolean setDatagridTplXml(Map<String,Object> params){
		try{			
			templateMapper.setDatagridTplXml(params);
			params.put(Const.SERVICE_CALL_RESULT, "success");			
			return true;
		}catch(Exception e){
			params.put(Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}		
	}
	
}
