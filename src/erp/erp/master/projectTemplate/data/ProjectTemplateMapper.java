package erp.erp.master.projectTemplate.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.projectTemplate.model.ProjectTemplate;


public interface ProjectTemplateMapper {
	public List<ProjectTemplate> getProjectTemplateList(Map<String,Object> params);
	public void addProjectTemplate(ProjectTemplate obj);
	public void updateProjectTemplate(ProjectTemplate obj);
	public void deleteProjectTemplate(ProjectTemplate obj);
}
