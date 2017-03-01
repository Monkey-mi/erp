package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.AgreementInfoMapper;
import erp.erp.PayApply.model.AgreementInfo;


@Service
public class AgreementInfoService {
	@Autowired
	private AgreementInfoMapper mapper;


	public List<AgreementInfo> getAgreementInfoList(Map<String,Object> params) {
		return mapper.getAgreementInfoList(params);
	}
	public void addAgreementInfo(AgreementInfo[] arr) {
		for(AgreementInfo obj: arr) {
			mapper.addAgreementInfo(obj);
		}
	}
	public void updateAgreementInfo(AgreementInfo[] arr) {
		for(AgreementInfo obj: arr) {
			mapper.updateAgreementInfo(obj);
		}
	}
	public void deleteAgreementInfo(AgreementInfo[] arr) {
		for(AgreementInfo obj: arr) {
			mapper.deleteAgreementInfo(obj);
		}
	}
}
