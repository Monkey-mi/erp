package srm.basicdata.industryClass.controller;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.util.WebUtil;

import srm.basicdata.industryClass.service.IndustryClassService;
@Controller
@RequestMapping("industryClass")
public class IndustryClassController{
	@Autowired
	private IndustryClassService industryClassService;
	
	//物料确认检测类目
	@RequestMapping(value="/IndustryClass.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesMaterialCheckclass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,industryClassService);
	}
}
