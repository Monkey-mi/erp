/**  
* @Title: MaterialDisAccountController.java
* @Package erp.erp.materialDistributeAccount.controller
* @Description: TODO
* @author 舒飞
* @date 2016-10-12 上午9:47:49 
*/ 
package erp.erp.materialDistributeAccount.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.materialDistributeAccount.service.MaterialAccountDetailService;
import erp.erp.materialDistributeAccount.service.MaterialAccountManagerService;
import erp.util.WebUtil;
@Controller
@RequestMapping("materialAccount") 
public class MaterialDisAccountController {

	@Autowired
	private MaterialAccountManagerService materialAccountManagerService;
	@Autowired
	private MaterialAccountDetailService materialAccountDetailService;
	
	@RequestMapping(value = "/materialAccountManager.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> MaterialAccountManager(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,materialAccountManagerService);
	}
	
	@RequestMapping(value = "/materialAccountDetail.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> materialAccountDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,materialAccountDetailService);
	}
}
