package srm.basicdata.currency.controller;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.util.WebUtil;

import srm.basicdata.currency.service.CurrencyService;
@Controller
@RequestMapping("currency")
public class CurrencyController{
	@Autowired
	private CurrencyService currencyService;
	
	//币种
	@RequestMapping(value="/Currency.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,currencyService);
	}
}
