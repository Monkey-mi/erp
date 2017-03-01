package erp.bi.dc.controller;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.bi.dc.service.DataCenterService;
import erp.bi.dc.service.TemplateService;
import erp.util.WebUtil;


@Controller
@RequestMapping("dc")
public class DataCenterController {
	
	@Autowired
	private DataCenterService dsService;
	@Autowired
	private TemplateService templateService;
	
	@RequestMapping(value="/dsCenterService.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> dsCenterService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, dsService);
	}
	@RequestMapping(value="/dsCenterCheck.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> dsCenterCheckService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCheck(request, response, dsService);
	}
	
	@RequestMapping(value="/Tpl.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> tpl(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, templateService);
	}
	
	@RequestMapping(value="/TplService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> tplService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, templateService);
	}
	@RequestMapping(value="/DataCenterService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> DataCenterService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, dsService);
	}
	//执行中心数据源sql
	@RequestMapping(value="/execSqlQuery.do",method=RequestMethod.GET)
	@ResponseBody
	public Object execSqlQuery(HttpServletRequest request, HttpServletResponse response) throws Exception{
		return dsService.execDsSqlQuery(WebUtil.getDefaultParamsMap(request));
	}
	
}
