package erp.erp.materialQualityTesting.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.materialQualityTesting.service.CkmcService;
import erp.erp.materialQualityTesting.service.ClbmbService;
import erp.erp.materialQualityTesting.service.CllbService;
import erp.erp.materialQualityTesting.service.DepartmentService;
import erp.erp.materialQualityTesting.service.MaterialQualityManagerService;
import erp.erp.materialQualityTesting.service.WtbmTreeService;
import erp.erp.materialQualityTesting.service.WtjycssqbService;
import erp.erp.materialQualityTesting.service.WtjycssqclmxbService;
import erp.erp.materialQualityTesting.service.WtjycssqmxbService;
import erp.util.WebUtil;

@Controller
@RequestMapping("materialQuality")
public class MaterialQualityTestController {

	@Autowired
	private CkmcService ckmcService;
	@Autowired
	private CllbService cllbService;
	@Autowired
	private DepartmentService departmentService;
	@Autowired
	private WtbmTreeService wtbmTreeService;
	@Autowired
	private ClbmbService clbmbService;
	@Autowired
	private MaterialQualityManagerService materialQualityManagerService;
	@Autowired
	private WtjycssqbService wtjycssqbService;
	@Autowired
	private WtjycssqclmxbService wtjycssqclmxbService;
	@Autowired
	private WtjycssqmxbService wtjycssqmxbService;
	
	@RequestMapping(value = "/ckmc.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> ckmc(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,ckmcService);
	}
	
	@RequestMapping(value = "/clbmb.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> clbmb(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,clbmbService);
	}
	
	@RequestMapping(value = "/cllb.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> cllb(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,cllbService);
	}
	
	@RequestMapping(value = "/department.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> department(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,departmentService);
	}
	
	@RequestMapping(value = "/wtbm.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> wtbm(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,wtbmTreeService);
	}
	
	@RequestMapping(value = "/materialquality.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> materialquality(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,materialQualityManagerService);
	}
	
	@RequestMapping(value = "/wtjycssqb.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> wtjycssqb(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,wtjycssqbService
				);
	}
	
	@RequestMapping(value = "/wtjycssqclmxb.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> wtjycssqclmxb(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,wtjycssqclmxbService
				);
	}
	
	@RequestMapping(value = "/wtjycssqmxb.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> wtjycssqmxb(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,wtjycssqmxbService
				);
	}
}
