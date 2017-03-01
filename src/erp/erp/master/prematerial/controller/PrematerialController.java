package erp.erp.master.prematerial.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.prematerial.service.CompanynameService;
import erp.erp.master.prematerial.service.MaterialnameService;
import erp.erp.master.prematerial.service.PrematerialService;
import erp.util.WebUtil;



@Controller
@RequestMapping("prematerial")
public class PrematerialController {
	@Autowired
	private  PrematerialService prematerialService;
	@Autowired
	private  CompanynameService  companynameService;
	@Autowired
	private  MaterialnameService  materialnameService;
	@RequestMapping(value="/prematerial.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> prematerial(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, prematerialService);
	}
	@RequestMapping(value="/companyname.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> companyname(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, companynameService);
	}
	@RequestMapping(value="/materialname.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> materialname(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, materialnameService);
	}
}
