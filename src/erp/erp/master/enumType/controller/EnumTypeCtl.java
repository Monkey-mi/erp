package erp.erp.master.enumType.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.enumType.service.EnumTypeService;
import erp.util.WebUtil;
@Controller
@RequestMapping("enumtype")
public class EnumTypeCtl {
	@Autowired
	private EnumTypeService enumTypeService;
	/*功能：系统枚举类型CURD
	 *作者：伍恰
	 *时间：2016/03/02
	 * */
	@RequestMapping(value="/enumtype.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> enumtype(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, enumTypeService);
	}
}
