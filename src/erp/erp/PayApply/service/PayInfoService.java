package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.PayInfoMapper;
import erp.erp.PayApply.model.PayInfo;


@Service
public class PayInfoService {
	@Autowired
	private PayInfoMapper mapper;


	public List<PayInfo> getPayInfoList(Map<String,Object> params) {
		return mapper.getPayInfoList(params);
	}
	public void addPayInfo(PayInfo[] arr) {
		for(PayInfo obj: arr) {
			mapper.addPayInfo(obj);
		}
	}
	public void updatePayInfo(PayInfo[] arr) {
		for(PayInfo obj: arr) {
			mapper.updatePayInfo(obj);
		}
	}
	public void deletePayInfo(PayInfo[] arr) {
		for(PayInfo obj: arr) {
			mapper.deletePayInfo(obj);
		}
	}
}
