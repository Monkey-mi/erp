package erp.erp.manufacturer.payAccount.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.manufacturer.payAccount.service.BillDetailService;
import erp.erp.manufacturer.payAccount.service.CreatePayPlanGridService;
import erp.erp.manufacturer.payAccount.service.CslbService;
import erp.erp.manufacturer.payAccount.service.CsmcService;
import erp.erp.manufacturer.payAccount.service.ManufAccountService;
import erp.erp.manufacturer.payAccount.service.ManufactoryInvoiceDetailService;
import erp.erp.manufacturer.payAccount.service.NoUpToService;
import erp.erp.manufacturer.payAccount.service.SysxxbService;
import erp.erp.manufacturer.payAccount.service.UtilService;
import erp.util.WebUtil;

@Controller
@RequestMapping("manufacturer")
public class ManufAccountController {
    @Autowired
	private ManufAccountService manufAccountService;
    @Autowired
   	private UtilService utilService;
    @Autowired
    private SysxxbService sysxxbService;
    @Autowired
    private BillDetailService billDetailService;
    @Autowired
    private CslbService cslbService;
    @Autowired
    private CreatePayPlanGridService createPayPlanGridService;
    @Autowired
    private NoUpToService noUpToService;
    @Autowired
    private CsmcService csmcservice;
    @Autowired
    private ManufactoryInvoiceDetailService minvoiceDetailService;
	@RequestMapping(value="/manufaccountdetial.act",method=RequestMethod.POST)
    @ResponseBody	
	public Map<String,Object> manufacturer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response,manufAccountService);
    }
	
	@RequestMapping(value="/util.act",method=RequestMethod.POST)
    @ResponseBody	
	public Map<String,Object> util(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response,utilService);
    }
	
	@RequestMapping(value="/sysxxb.act",method=RequestMethod.POST)
    @ResponseBody
	public Map<String,Object> sysxxb(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	return WebUtil.DynamicCallCURD(request, response,sysxxbService);
    }
	@RequestMapping(value="/billdetial.act",method=RequestMethod.POST)
    @ResponseBody
	public Map<String,Object> billdetial(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	return WebUtil.DynamicCallCURD(request, response,billDetailService);
    }
	
	@RequestMapping(value="/invoicedetail.act",method=RequestMethod.POST)
    @ResponseBody
	public Map<String,Object> invoicedetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	return WebUtil.DynamicCallCURD(request, response,minvoiceDetailService);
    }
	
	@RequestMapping(value="/cslb.act",method=RequestMethod.POST)
    @ResponseBody
	public Map<String,Object> cslb(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	return WebUtil.DynamicCallCURD(request, response,cslbService);
    }
	
	@RequestMapping(value="/createPayPlanGrid.act",method=RequestMethod.POST)
    @ResponseBody	
	public Map<String,Object> createPayPlanGrid(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response,createPayPlanGridService);
    }
	
	@RequestMapping(value="/noupto.act",method=RequestMethod.POST)
    @ResponseBody	
	public Map<String,Object> noupto(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response,noUpToService);
    }
	
	@RequestMapping(value="/csmc.act",method=RequestMethod.POST)
    @ResponseBody
	public Map<String,Object> csmc(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	return WebUtil.DynamicCallCURD(request, response,csmcservice);
    }
	
}
