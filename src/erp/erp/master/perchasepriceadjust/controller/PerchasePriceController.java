package erp.erp.master.perchasepriceadjust.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.perchasepriceadjust.service.CgjgtzbService;
import erp.util.WebUtil;

@Controller
@RequestMapping("perchase")
public class PerchasePriceController {
	@Autowired
	private CgjgtzbService cgjgtzbService;
	/*功能：操作员
	 *作者：wzg
	 *时间：2016/01/12
	 * */
	@RequestMapping(value="/perchase.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> perchasePrice(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, cgjgtzbService);
	}
}
