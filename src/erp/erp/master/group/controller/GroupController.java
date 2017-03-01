package erp.erp.master.group.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.group.service.GroupOperatorService;
import erp.erp.master.group.service.GroupService;
import erp.util.WebUtil;

@Controller
@RequestMapping("group")
public class GroupController {
	@Autowired
	private GroupService groupService;
	
	@Autowired
	private GroupOperatorService groupOperatorService;
	
	@RequestMapping(value="/group.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> group(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, groupService);
	}
	@RequestMapping(value="/groupoperator.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> groupoperator (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, groupOperatorService);
	}
}
