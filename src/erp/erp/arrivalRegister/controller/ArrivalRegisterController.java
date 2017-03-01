package erp.erp.arrivalRegister.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.arrivalRegister.service.ArrivalRegisterService;
import erp.util.WebUtil;

@Controller
@RequestMapping("arrivalregister")
public class ArrivalRegisterController {
	@Autowired
	private ArrivalRegisterService  arrivalRegisterService;
	@RequestMapping(value="/arrivalregister.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> arrivalRegister(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, arrivalRegisterService);
	}
}
