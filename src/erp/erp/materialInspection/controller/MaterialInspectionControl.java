package erp.erp.materialInspection.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.materialInspection.service.MaterialApplyService;
import erp.erp.materialInspection.service.MaterialDetailService;
import erp.erp.materialInspection.service.MaterialInspectionService;
import erp.util.WebUtil;


@Controller
@RequestMapping("erp")
public class MaterialInspectionControl {
	@Autowired
	private MaterialInspectionService materialInspectionService;
	@Autowired
	private MaterialDetailService materialDetailService;
	@Autowired
	private MaterialApplyService materialApplyService;
	@RequestMapping(value="/materialInspection.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> materialInspection(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response,materialInspectionService);
	}
	@RequestMapping(value="/materialDetail.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> materialDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response,materialDetailService);
	}
	@RequestMapping(value="/materialApply.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> materialApply(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response,materialApplyService);
	}
}
