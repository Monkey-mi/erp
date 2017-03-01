package erp.erp.master.projectTemplate.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.projectTemplate.service.ProjectTemplateService;
import erp.util.WebUtil;

@Controller
@RequestMapping("projecttemplate")
public class ProjectTemplateController {
	@Autowired
	private ProjectTemplateService projectTemplateService;
	
	@RequestMapping(value="/projecttemplate.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> projectTemplate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, projectTemplateService);
	}
}
