package erp.erp.master.category.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.category.service.CategoryAuthorityService;
import erp.erp.master.category.service.CategoryCooperteService;
import erp.erp.master.category.service.CategoryService;
import erp.util.WebUtil;

@Controller
@RequestMapping("category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private CategoryAuthorityService categoryAuthorityService;
	
	@Autowired
	private CategoryCooperteService categoryCooperteService;
	/*功能：采购类别表
	 *作者：伍恰
	 *时间：2016/01/11
	 * */
	@RequestMapping(value="/category.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> category(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, categoryService);
	}
	
	/*功能：采购类别权限表
	 *作者：伍恰
	 *时间：2016/01/11
	 * */
	@RequestMapping(value="/categoryauthority.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> categoryAuthority(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, categoryAuthorityService);
	}
	
	/*功能：协同人员权限表
	 *作者：shufei
	 *时间：2016/08/27
	 * */
	@RequestMapping(value="/categorycooperate.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> categoryCooperate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, categoryCooperteService);
	}
}
