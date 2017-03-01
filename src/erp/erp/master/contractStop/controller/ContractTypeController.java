package erp.erp.master.contractStop.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.contractStop.service.ContractTypeService;
import erp.util.WebUtil;

@Controller
@RequestMapping("contracttype")
public class ContractTypeController {
	@Autowired
	private ContractTypeService contracttypeService;
	
	@RequestMapping(value="/contracttype.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> contracttype (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, contracttypeService);
	}
}
