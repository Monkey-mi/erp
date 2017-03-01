package erp.erp.PrepayAdjustment.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erp.erp.PrepayAdjustment.service.PrepayAdjustmentInfoService;
import erp.util.WebUtil;

@Controller
@RequestMapping("prepay")
public class PrepayAdjustmentInfoController {
	@Autowired
	private PrepayAdjustmentInfoService prepayAdjustmentInfoService;

	@RequestMapping(value = "/prepayadjustment.act", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> prepayadjustment(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return WebUtil.DynamicCallCURD(request, response,
				prepayAdjustmentInfoService);
	}
}
