package erp.erp.master.materialArchive.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.master.materialArchive.service.MaterialService;
import erp.util.WebUtil;

@Controller
@RequestMapping("materialarchive")
public class MaterialController {
	@Autowired
    private  MaterialService  materialService;
	@RequestMapping(value="/materialarchive.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getMaterialArchive(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, materialService);
	}
}
