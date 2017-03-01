package erp.bi.report.controller;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.bi.report.service.ReportService;
import erp.bi.report.service.SysPrintModelService;
import erp.util.WebUtil;


@Controller
@RequestMapping("report")
public class Report {
	@Autowired
	private ReportService reportService;
	
	@Autowired
	private SysPrintModelService sysPrintService;
		
	private static Logger logger = Logger.getLogger("service");
	@RequestMapping(value="/Reports.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Reports(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, reportService);
	}
	
	@RequestMapping(value="/ReportService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ReportService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, reportService);
	}
	
	@RequestMapping(value="/SysReports.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> SysReports(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, sysPrintService);
	}
	
	@RequestMapping(value="/SysReportService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> SysReportService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, sysPrintService);
	}
	
}
