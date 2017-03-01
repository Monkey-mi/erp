package erp.erp.materialInventory.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.materialInventory.service.MaterialInventoryManagerService;
import erp.util.WebUtil;

@Controller
@RequestMapping("materialInventory") 
public class MaterialInventoryManagerController {
	@Autowired
	private MaterialInventoryManagerService materialInventoryManagerService;
	
	@RequestMapping(value = "/materialInventory.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> materialInventory(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,materialInventoryManagerService);
	}
}
