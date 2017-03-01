package erp.erp.plasticPartsPledge.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.plasticPartsPledge.service.PlasticPartsPledgeService;
import erp.util.WebUtil;

/** 
 * @ClassName: PlasticPartsPledgeCtl 
 * @Description:  塑料件质押管理
 * @author wuqia
 * @date 2016-6-1 下午1:45:11 
 * 
 *  
 */
@Controller
@RequestMapping("plasticpartspledge")
public class PlasticPartsPledgeCtl {
	@Autowired
	private PlasticPartsPledgeService plasticPartsPledgeService;
	/**
	* @Title: outSourcePicking 
	* @Description: 塑料件质押管理相关数据处理
	* @param @param request
	* @param @param response
	* @param @return
	* @param @throws Exception    设定文件 
	* @return Map<String,Object>    返回类型 
	* @throws 
	* @author wuqia
	 */
	@RequestMapping(value="/plasticpartspledge.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> outSourcePicking(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, plasticPartsPledgeService);
	}
}

