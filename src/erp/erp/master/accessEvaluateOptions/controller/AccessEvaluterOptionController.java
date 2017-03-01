/**  
* @Title: AccessEvaluterOptionCtrol.java
* @Package erp.erp.master.accessEvaluateOptions.controller
* @Description: TODO
* @author 舒飞
* @date 2017-2-8 下午3:01:46 
*/ 
package erp.erp.master.accessEvaluateOptions.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.accessEvaluateOptions.service.AccessEvaluterOptionService;
import erp.util.WebUtil;

@Controller
@RequestMapping("accessEvalute")
public class AccessEvaluterOptionController {
	@Autowired
	private AccessEvaluterOptionService accessEvaluterOptionService;
	
	/**
	 *省市区*/
	@RequestMapping(value="/accessEvalute.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> accessEvalute(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,accessEvaluterOptionService);
	}
}
