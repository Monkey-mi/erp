package srm.basicdata.tradeClass.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.util.WebUtil;

import srm.basicdata.tradeClass.service.TradeClassService;

@Controller
@RequestMapping("tradeClass")
public class TradeClassCtrl {

	@Autowired
	private TradeClassService tradeClassService;
	
	/**
	 *行业类目 */
	@RequestMapping(value="/tradeClass.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> tradeClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,tradeClassService);
	}
}
