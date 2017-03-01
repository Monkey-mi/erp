package erp.erp.master.purchaseDetail.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseDetail.model.OutSourceSubsidiary;


public interface OutSourceSubsidiaryMapper {
	public List<OutSourceSubsidiary> getOutSourceSubsidiaryList(Map<String,Object> params);
	public void addOutSourceSubsidiary(OutSourceSubsidiary obj);
	public void updateOutSourceSubsidiary(OutSourceSubsidiary obj);
	public void deleteOutSourceSubsidiary(OutSourceSubsidiary obj);
}
