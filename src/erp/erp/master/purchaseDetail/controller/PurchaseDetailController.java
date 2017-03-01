package erp.erp.master.purchaseDetail.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.purchaseDetail.model.PurchaseDetail;
import erp.erp.master.purchaseDetail.service.ContractDetailService;
import erp.erp.master.purchaseDetail.service.ContractSubsidiaryService;
import erp.erp.master.purchaseDetail.service.OutSourceDetailService;
import erp.erp.master.purchaseDetail.service.OutSourceService;
import erp.erp.master.purchaseDetail.service.OutSourceSubsidiaryService;
import erp.erp.master.purchaseDetail.service.PurchaseContractService;
import erp.erp.master.purchaseDetail.service.PurchaseDetailService;
import erp.util.MyJsonUtil;
import erp.util.WebUtil;

@Controller
@RequestMapping("purchasedetail")
public class PurchaseDetailController {
	
	@Autowired
	private OutSourceSubsidiaryService outSourceSubsidiaryService;
	/*功能：合同明细辅助表
	 *作者：伍恰
	 *时间：2016/01/20
	 * */
	@RequestMapping(value="/outsourcesubsidiary.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> outSourceSubsidiaryService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, outSourceSubsidiaryService);
	}
	@Autowired
	private ContractSubsidiaryService contractSubsidiaryService;
	/*功能：合同明细辅助表
	 *作者：伍恰
	 *时间：2016/01/20
	 * */
	@RequestMapping(value="/contractsubsidiary.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> contractSubsidiary(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, contractSubsidiaryService);
	}
	
	@Autowired
	private PurchaseDetailService purchaseDetailService;
	/*功能：采购计划明细外界面Supcan专用
	 *作者：伍恰
	 *时间：2016/01/20
	 * */
	@RequestMapping(value="/purchasedetailforSupcan.act",method=RequestMethod.POST)
	@ResponseBody 
	public String purchaseDetailforSupcan(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> paramMap = new HashMap<String,Object>();
		Enumeration<String> pNames = request.getParameterNames();
		while(pNames.hasMoreElements()){
			String pName =pNames.nextElement();
			paramMap.put(pName, request.getParameter(pName));
		}
		List<PurchaseDetail> purList=purchaseDetailService.getPurchaseDetailList(paramMap);
		return MyJsonUtil.obj2string(purList);
	}
	/*功能：采购明细总表
	 *作者：伍恰
	 *时间：2016/01/20
	 * */
	@RequestMapping(value="/purchasedetail.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchaseDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseDetailService);
	}
	
	@Autowired
	private PurchaseContractService purchaseContractService;
	
	/*功能：采购合同操作
	 *作者：伍恰
	 *时间：2016/01/27
	 * */
	@RequestMapping(value="/purchasecontract.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchaseContract(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseContractService);
	}
	
	@Autowired
	
	private ContractDetailService contractDetailService;
	/*功能：采购合同操作
	 *作者：伍恰
	 *时间：2016/01/27
	 * */
	@RequestMapping(value="/contractdetail.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> contractDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, contractDetailService);
	}
	
	@Autowired
	private OutSourceService outSourceService;
	/*功能：外协通知单操作
	 *作者：伍恰
	 *时间：2016/01/27
	 * */
	@RequestMapping(value="/outsource.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> outSource(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, outSourceService);
	}
	
	@Autowired
	private OutSourceDetailService outSourceDetailService;
	/*功能：外协通知单明细操作
	 *作者：伍恰
	 *时间：2016/01/27
	 * */
	@RequestMapping(value="/outSourceDetail.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> outSourceDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, outSourceDetailService);
	}
}
