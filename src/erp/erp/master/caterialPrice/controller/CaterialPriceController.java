package erp.erp.master.caterialPrice.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.caterialPrice.service.CaterialPriceArgumentService;
import erp.erp.master.caterialPrice.service.CaterialPriceService;
import erp.util.WebUtil;

@Controller
@RequestMapping("caterialprice")
public class CaterialPriceController {
	@Autowired
	private CaterialPriceService caterialPriceService;
	
	@Autowired
	private CaterialPriceArgumentService caterialPriceArgumentService;
	/*功能：材料价格公式维护
	 *作者：伍恰
	 *时间：2016/01/12
	 * */
	@RequestMapping(value="/caterialprice.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> category(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, caterialPriceService);
	}
	/*功能：材料价格公式参数维护
	 *作者：伍恰
	 *时间：2016/01/12
	 * */
	@RequestMapping(value="/caterialpriceargument.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> caterialPriceArgument(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, caterialPriceArgumentService);
	}
}
