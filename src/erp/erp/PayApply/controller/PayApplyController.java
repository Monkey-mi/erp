package erp.erp.PayApply.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.PayApply.service.AdjustmentDetailService;
import erp.erp.PayApply.service.AgreementInfoService;
import erp.erp.PayApply.service.ApplayDepartmentTreeService;
import erp.erp.PayApply.service.CgfyService;
import erp.erp.PayApply.service.EmployeeSalaryService;
import erp.erp.PayApply.service.FeeReimbursementService;
import erp.erp.PayApply.service.FkjhService;
import erp.erp.PayApply.service.FpmxService;
import erp.erp.PayApply.service.FpwdService;
import erp.erp.PayApply.service.HtmxService;
import erp.erp.PayApply.service.LinkedInvoiceService;
import erp.erp.PayApply.service.ManufacturerService;
import erp.erp.PayApply.service.PayApplyService;
import erp.erp.PayApply.service.PayInfoService;
import erp.erp.PayApply.service.PurchaseAgreementService;
import erp.erp.PayApply.service.PurchaseFeeService;
import erp.erp.PayApply.service.RkmxService;
import erp.erp.PayApply.service.SaleFeeService;
import erp.erp.PayApply.service.SubmitObjectService;
import erp.erp.PayApply.service.SupplyInvoiceInfoService;
import erp.erp.PayApply.service.SysmjbService;
import erp.erp.PayApply.service.WdfyService;
import erp.erp.PayApply.service.WdrkService;
import erp.erp.PayApply.service.YfcxService;
import erp.erp.PayApply.service.YfcxmxService;
import erp.erp.PayApply.service.ZggzService;
import erp.erp.PayApply.service.ZjjhService;
import erp.util.WebUtil;

@Controller
@RequestMapping("payapply")
public class PayApplyController {
	@Autowired
	private PayApplyService payApplyService;
	
	@Autowired
	private SysmjbService sysmjbService;
	
	@Autowired
	private ApplayDepartmentTreeService applayDepartmentTreeService;
	
	@Autowired
	private SupplyInvoiceInfoService supplyInvoiceInfoService; 
	
	@Autowired
	private PurchaseAgreementService purchaseAgreementService;
	
	@Autowired
	private SaleFeeService saleFeeService;
	
	@Autowired
	private PurchaseFeeService purchaseFeeService;
	
	@Autowired
	private FeeReimbursementService feeReimbursementService;
	
	@Autowired
	private EmployeeSalaryService employeeSalaryService;
	
	@Autowired
	private AgreementInfoService agreementInfoService;
	
	@Autowired
	private PayInfoService payInfoService;
	
	@Autowired
	private LinkedInvoiceService linkedInvoiceService;
	
	@Autowired
	private AdjustmentDetailService adjustmentDetailService;
	
	@Autowired
	private SubmitObjectService submitObjectService;
	
	@Autowired
	private ManufacturerService manufacturerService;
	
	@Autowired
	private ZjjhService zjjhService;
	
	
	@Autowired
	private FkjhService fkjhService;
	
	@Autowired
	private YfcxService yfcxService;
	
	@Autowired
	private YfcxmxService yfcxmxService;
	
	@Autowired
	private FpmxService fpmxService;
	
	@Autowired
	private RkmxService rkmxService;
	
	@Autowired
	private FpwdService fpwdService;
	
	@Autowired
	private HtmxService htmxService;
	
	@Autowired
	private CgfyService cgfyService;
	
	@Autowired
	private ZggzService zggzService;
	
	@Autowired
	private WdrkService wdrkService;
	
	@Autowired
	private WdfyService wdfyService;
	
	@RequestMapping(value="/payapply.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> payapply(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, payApplyService);
	}
	
	@RequestMapping(value="/sysmjb.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> sysmjb(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, sysmjbService);
	}
	
	@RequestMapping(value="/applayDepartment.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> applayDepartment(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, applayDepartmentTreeService);
	}
	
	@RequestMapping(value="/supplyinvoice.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> supplyinvoice(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, supplyInvoiceInfoService);
	}
	
	@RequestMapping(value="/purchaseagreement.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> purchaseagreement(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseAgreementService);
	
	}
	
	@RequestMapping(value="/salefee.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salefee(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, saleFeeService);
	}
	
	@RequestMapping(value="/purchasefee.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> purchasefee(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseFeeService);
	}
	
	@RequestMapping(value="/feereimbursement.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> feereimbursement(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, feeReimbursementService);
	}
	
	@RequestMapping(value="/employeesalary.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> employeesalary(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, employeeSalaryService);
	}
	
	@RequestMapping(value="/agreementinfo.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> agreementinfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, agreementInfoService);
	}
	
	@RequestMapping(value="/payinfo.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> payinfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, payInfoService);
	}
	
	@RequestMapping(value="/linkedinvoice.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> linkedinvoice(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, linkedInvoiceService);
	}
	
	@RequestMapping(value="/adjustmentdetail.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> adjustmentdetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, adjustmentDetailService);
	}
	
	@RequestMapping(value="/submitobject.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> submitobject(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, submitObjectService);
	}
	
	@RequestMapping(value="/manufacturer.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> manufacturer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, manufacturerService);
	}
	
	@RequestMapping(value="/zjjh.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> zjjh(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, zjjhService);
	}
	
	@RequestMapping(value="/fkjh.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> fkjh(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, fkjhService);
	}
	
	@RequestMapping(value="/yfcx.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> yfcx(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, yfcxService);
	}
	
	@RequestMapping(value="/yfcxmx.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> yfcxmx(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, yfcxmxService);
	}
	
	@RequestMapping(value="/fpmx.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> fpmx(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, fpmxService);
	}
	
	@RequestMapping(value="/rkmx.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> rkmx(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, rkmxService);
	}
	
	@RequestMapping(value="/fpwd.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> fpwd(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, fpwdService);
	}
	
	@RequestMapping(value="/htmx.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> htmx(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, htmxService);
	}
	
	@RequestMapping(value="/cgfy.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> cgfy(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, cgfyService);
	}
	
	@RequestMapping(value="/zggz.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> zggz(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, zggzService);
	}
	
	@RequestMapping(value="/wdrk.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> wdrk(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, wdrkService);
	}
	
	@RequestMapping(value="/wdfy.act",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> wdfy(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, wdfyService);
	}
}
