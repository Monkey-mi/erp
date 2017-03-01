package erp.erp.master.purchaseDetail.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseDetail.data.OutSourceSubsidiaryMapper;
import erp.erp.master.purchaseDetail.model.OutSourceSubsidiary;


@Service
public class OutSourceSubsidiaryService {
	@Autowired
	private OutSourceSubsidiaryMapper mapper;

	/**
	 * 外协通知单
	 * Request purchasedetail/outsourcesubsidiary.act?method=******** <br/><br/>
	 * Response {data:[{OutSourceSubsidiary}]} <br/><br/>
	 * @param OutSourceSubsidiary {@link paramMap}
	 */
	public List<OutSourceSubsidiary> getOutSourceSubsidiaryList(Map<String,Object> params) {
		return mapper.getOutSourceSubsidiaryList(params);
	}
	public void addOutSourceSubsidiary(OutSourceSubsidiary[] arr) {
		for(OutSourceSubsidiary obj: arr) {
			mapper.addOutSourceSubsidiary(obj);
		}
	}
	public void updateOutSourceSubsidiary(OutSourceSubsidiary[] arr) {
		for(OutSourceSubsidiary obj: arr) {
			mapper.updateOutSourceSubsidiary(obj);
		}
	}
	public void deleteOutSourceSubsidiary(OutSourceSubsidiary[] arr) {
		for(OutSourceSubsidiary obj: arr) {
			mapper.deleteOutSourceSubsidiary(obj);
		}
	}
}
