package erp.bi.form.controller;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.bi.form.service.FormService;
import erp.util.WebUtil;


@Controller
@RequestMapping("form")
public class Form {
	
	@Autowired
	private FormService formsService;
	
	@RequestMapping(value="/Forms.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Forms(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, formsService);
	}
	
	@RequestMapping(value="/FormService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> FormService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, formsService);
	}
	@RequestMapping(value="/FormCheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> FormCheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCheck(request, response, formsService);
	}
}
