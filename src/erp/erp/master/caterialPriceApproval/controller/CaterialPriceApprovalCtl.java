package erp.erp.master.caterialPriceApproval.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.caterialPriceApproval.service.CaterialPriceApprovalService;
import erp.erp.master.caterialPriceApproval.service.CaterialPriceCompanyService;
import erp.erp.master.caterialPriceApproval.service.CaterialPriceDetailService;
import erp.util.WebUtil;

@Controller
@RequestMapping("caterialpriceapproval")
public class CaterialPriceApprovalCtl {
	@Autowired
	private CaterialPriceApprovalService caterialPriceApprovalService;
	
	@Autowired
	private CaterialPriceDetailService caterialPriceDetailService;
	/*功能：材料审批价格表
	 *作者：伍恰
	 *时间：2016/01/14
	 * */
	@RequestMapping(value="/caterialpriceapproval.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> caterialPriceApproval(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, caterialPriceApprovalService);
	}
	
	/*功能：材料审批价格明细表
	 *作者：伍恰
	 *时间：2016/01/14
	 * */
	@RequestMapping(value="/caterialpricedetail.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> caterialPriceDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, caterialPriceDetailService);
	}
	
	@Autowired
	private CaterialPriceCompanyService caterialPriceCompanyService;
	/*功能：材料审批价格厂商表
	 *作者：伍恰
	 *时间：2016/01/14
	 * */
	@RequestMapping(value="/caterialpricecompany.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> caterialPriceCompany(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, caterialPriceCompanyService);
	}
}
