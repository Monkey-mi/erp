package erp.erp.SupplyInvoice.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.SupplyInvoice.service.ApplyAgreementService;
import erp.erp.SupplyInvoice.service.ApplyFeeService;
import erp.erp.SupplyInvoice.service.ApplyInvoiceService;
import erp.erp.SupplyInvoice.service.InventoryListService;
import erp.erp.SupplyInvoice.service.InvoiceDetailService;
import erp.erp.SupplyInvoice.service.PayDetailService;
import erp.erp.SupplyInvoice.service.PrepayAdjustmentService;
import erp.erp.SupplyInvoice.service.SupplyInvoiceService;
import erp.util.WebUtil;
@Controller
@RequestMapping("supplyinvoice")
public class SupplyInvoiceController {
	@Autowired
	private SupplyInvoiceService supplyInvoiceService;
	
	@Autowired
	private InvoiceDetailService invoiceDetailService;
	
	@Autowired
	private InventoryListService inventoryListService;
	
	@Autowired
	private PayDetailService payDetailService;
	
	@Autowired
	private ApplyInvoiceService applyInvoiceService;
	
	@Autowired
	private ApplyAgreementService applyAgreementService;
	
	@Autowired
	private ApplyFeeService applyFeeService;
	
	@Autowired
	private PrepayAdjustmentService prepayAdjustmentService;
	
	@RequestMapping(value="/supplyinvoice.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> supplyinvoice (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, supplyInvoiceService);
	}
	
	@RequestMapping(value="/invoicedetail.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> invoicedetail (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, invoiceDetailService);
	}
	
	@RequestMapping(value="/inventorylist.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> inventorylist (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, inventoryListService);
	}
	
	@RequestMapping(value="/paydetail.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> paydetail (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, payDetailService);
	}
	
	@RequestMapping(value="/applyinvoice.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> applyinvoice (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, applyInvoiceService);
	}
	
	@RequestMapping(value="/applyagreement.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> applyagreement (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, applyAgreementService);
	}
	
	@RequestMapping(value="/applyfee.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> applyfee (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, applyFeeService);
	}
	
	@RequestMapping(value="/prepayadjustment.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> prepayadjustment (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, prepayAdjustmentService);
	}
}
