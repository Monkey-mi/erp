package erp.erp.master.purchaseDetail.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseDetail.data.OutSourceDetailMapper;
import erp.erp.master.purchaseDetail.model.OutSourceDetail;


@Service
public class OutSourceDetailService {
	@Autowired
	private OutSourceDetailMapper mapper;

	/**
	 * 外协通知单明细CURD
	 * Request purchasedetail/outSourceDetail.act?method=***OutSourceDetail*** <br/><br/>
	 * Response {data:[{OutSourceDetail}]} <br/><br/>
	 * @param OutSourceDetail {@link paramMap}
	 */
	public List<OutSourceDetail> getOutSourceDetailList(Map<String,Object> params) {
		return mapper.getOutSourceDetailList(params);
	}
	public void addOutSourceDetail(OutSourceDetail[] arr) {
		for(OutSourceDetail obj: arr) {
			mapper.addOutSourceDetail(obj);
		}
		if(arr.length>0){
			mapper.updateOutSourceSync(arr[0]);
		}
	}
	public void updateOutSourceDetail(OutSourceDetail[] arr) {
		for(OutSourceDetail obj: arr) {
			mapper.updateOutSourceDetail(obj);
		}
		if(arr.length>0){
			mapper.updateOutSourceSync(arr[0]);
		}
	}
	public void deleteOutSourceDetail(OutSourceDetail[] arr) {
		for(OutSourceDetail obj: arr) {
			mapper.deleteOutSourceDetail(obj);
		}
		if(arr.length>0){
			mapper.updateOutSourceSync(arr[0]);
		}
	}
}
