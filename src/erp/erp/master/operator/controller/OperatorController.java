package erp.erp.master.operator.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.operator.service.OperatorService;
import erp.util.WebUtil;

@Controller
@RequestMapping("operator")
public class OperatorController {
	@Autowired
	private OperatorService operatorService;
	/*功能：操作员
	 *作者：伍恰
	 *时间：2016/01/12
	 * */
	@RequestMapping(value="/operator.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> category(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, operatorService);
	}
}
