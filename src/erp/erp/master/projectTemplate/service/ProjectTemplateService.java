package erp.erp.master.projectTemplate.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.projectTemplate.data.ProjectTemplateMapper;
import erp.erp.master.projectTemplate.model.ProjectTemplate;


@Service
public class ProjectTemplateService {
	@Autowired
	private ProjectTemplateMapper mapper;

	/**
	 * 模版CURD
	 * Request projecttemplate/projecttemplate.act?method=**** <br/><br/>
	 * Response {data:[{ProjectTemplate}]} <br/><br/>
	 * @param ProjectTemplate {@link paramMap}
	 */
	public List<ProjectTemplate> getProjectTemplateList(Map<String,Object> params) {
		return mapper.getProjectTemplateList(params);
	}
	public void addProjectTemplate(ProjectTemplate[] arr) {
		for(ProjectTemplate obj: arr) {
			mapper.addProjectTemplate(obj);
		}
	}
	public void updateProjectTemplate(ProjectTemplate[] arr) {
		for(ProjectTemplate obj: arr) {
			mapper.updateProjectTemplate(obj);
		}
	}
	public void deleteProjectTemplate(ProjectTemplate[] arr) {
		for(ProjectTemplate obj: arr) {
			mapper.deleteProjectTemplate(obj);
		}
	}
}
