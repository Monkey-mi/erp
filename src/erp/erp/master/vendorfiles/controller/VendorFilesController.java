package erp.erp.master.vendorfiles.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.vendorfiles.service.VendorFilesService;
import erp.util.WebUtil;

@Controller
@RequestMapping("vendorfiles")
public class VendorFilesController{
	
	@Autowired
	private VendorFilesService vendorFilesService;
	
	@RequestMapping(value="/vendorfiles.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> contractSubsidiary(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, vendorFilesService);
	}
}