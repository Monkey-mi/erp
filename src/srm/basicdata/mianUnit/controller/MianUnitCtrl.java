package srm.basicdata.mianUnit.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.util.WebUtil;

import srm.basicdata.mianUnit.service.MianUnitService;

@Controller
@RequestMapping("mianUnit")
public class MianUnitCtrl {
	@Autowired
	private MianUnitService mianUnitService;
	/**
	 *单位类目*/
	@RequestMapping(value="/mianUnit.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mianUnit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,mianUnitService);
	}

}
