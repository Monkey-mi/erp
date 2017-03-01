/**  
* @Title: PurchaseInspectionManagerCtrl.java
* @Package erp.erp.purchaseInspectionManage.controller
* @Description: TODO
* @author 舒飞
* @date 2017-1-17 上午10:18:39 
*/ 
package erp.erp.purchaseInspectionManage.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.purchaseInspectionManage.service.ImpPurchaseInspetionService;
import erp.erp.purchaseInspectionManage.service.PurchaseInspectionManagerService;
import erp.erp.purchaseInspectionManage.service.PurchaseInspectionPonoService;
import erp.util.WebUtil;
@Controller
@RequestMapping("purchaseInspection")
public class PurchaseInspectionManagerCtrl {
	@Autowired
	private PurchaseInspectionManagerService inspectionManagerService;
	@Autowired
	private ImpPurchaseInspetionService impPurchaseInspetionService;
	@Autowired
	private PurchaseInspectionPonoService purchaseInspectionPonoService;
	
	@RequestMapping(value="/purchaseInspection.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> notice(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, inspectionManagerService );
	}
	@RequestMapping(value="/imPurchaseInspection.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> imPurchaseInspection(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, impPurchaseInspetionService );
	}
	@RequestMapping(value="/inspectionPono.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> inspectionPono(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseInspectionPonoService );
	}
}
