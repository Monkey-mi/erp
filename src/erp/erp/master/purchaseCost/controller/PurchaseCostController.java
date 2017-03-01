package erp.erp.master.purchaseCost.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.purchaseCost.service.PurchaseCostService;
import erp.erp.master.purchaseCost.service.WarehouseCpService;
import erp.erp.master.purchaseCost.service.purchaseCostDetialService;
import erp.erp.master.purchaseCost.service.purchaseCostShareService;
import erp.erp.master.purchaseCost.service.purchaseCostSumService;
import erp.util.WebUtil;
/*采购费用*/
@Controller
@RequestMapping("purchasecost")
public class PurchaseCostController {
	@Autowired
	private  PurchaseCostService purchasecostService;
	@Autowired
	private  purchaseCostDetialService purchasecostdetialService;
	@Autowired
	private  purchaseCostSumService purchasecostsumService;
	@Autowired
	private purchaseCostShareService purchasecostshareService;
	@Autowired
	private WarehouseCpService warehousecpservice; 
	
	@RequestMapping(value="/purchasecost.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchasecost (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchasecostService);
	}
	@RequestMapping(value="/purchasecostdetial.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchasecostdetial (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchasecostdetialService);
	}
	@RequestMapping(value="/purchasecostsum.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchasecostsum (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchasecostsumService);
	}
	@RequestMapping(value="/purchasecostshare.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchasecostshare (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchasecostshareService);
	}
	@RequestMapping(value="/warehousecp.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> WarehouseCp (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, warehousecpservice);
	}
}
