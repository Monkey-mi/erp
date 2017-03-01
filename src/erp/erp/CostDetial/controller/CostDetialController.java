package erp.erp.CostDetial.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.CostDetial.service.CostDetialService;
import erp.util.WebUtil;

@Controller
@RequestMapping("costdetial")
public class CostDetialController {
	@Autowired
	private CostDetialService costDetialService;
	@RequestMapping(value="/costdetial.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> costDetial(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, costDetialService );
	}
	
}
