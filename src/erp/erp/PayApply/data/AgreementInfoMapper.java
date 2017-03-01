package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.AgreementInfo;


public interface AgreementInfoMapper {
	public List<AgreementInfo> getAgreementInfoList(Map<String,Object> params);
	public void addAgreementInfo(AgreementInfo obj);
	public void updateAgreementInfo(AgreementInfo obj);
	public void deleteAgreementInfo(AgreementInfo obj);
}
