package erp.erp.companyQuot.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.companyQuot.service.CompanyQuotService;
import erp.util.WebUtil;

@Controller
@RequestMapping("companyquot")
public class CompanyQuotController {
	@Autowired
	private CompanyQuotService companyQuotService;
	@RequestMapping(value="/companyquot.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> companyQuot(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, companyQuotService);
	}
}
