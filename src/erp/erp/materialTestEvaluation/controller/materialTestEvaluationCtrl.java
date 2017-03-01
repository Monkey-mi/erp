/**  
* @Title: materialTestEvaluationCtrl.java
* @Package erp.erp.materialTestEvaluation.controller
* @Description: TODO
* @author 舒飞
* @date 2016-12-26 下午3:02:51 
*/ 
package erp.erp.materialTestEvaluation.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.materialTestEvaluation.service.MaterialTestEvaluationService;
import erp.util.WebUtil;

@Controller
@RequestMapping("materialTestEvaluation")
public class materialTestEvaluationCtrl {
	@Autowired
	private MaterialTestEvaluationService materialTestEvaluationService;
	
	@RequestMapping(value="/MaterialTestEvaluation.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> materialTestEvaluation(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response,materialTestEvaluationService);
	}
}
