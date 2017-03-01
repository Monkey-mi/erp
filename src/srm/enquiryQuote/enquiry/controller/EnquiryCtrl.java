package srm.enquiryQuote.enquiry.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.util.WebUtil;

import srm.enquiryQuote.enquiry.service.EnquiryService;

@Controller
@RequestMapping("enquiry")
public class EnquiryCtrl {

	@Autowired
	private EnquiryService enquiryService;
	
	/**
	 *询价 */
	@RequestMapping(value="/enquiry.srm",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> tradeClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,enquiryService);
	}
}
