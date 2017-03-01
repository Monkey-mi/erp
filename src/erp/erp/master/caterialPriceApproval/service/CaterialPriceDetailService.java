package erp.erp.master.caterialPriceApproval.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.caterialPriceApproval.data.CaterialPriceDetailMapper;
import erp.erp.master.caterialPriceApproval.model.CaterialPriceDetail;


@Service
public class CaterialPriceDetailService {
	@Autowired
	private CaterialPriceDetailMapper mapper;

	/**
	* @Description: 材料审批价格明细CURD
	* Request caterialpriceapproval/caterialpricedetail.act?method=******
	* Response {data:[{List<CaterialPriceDetail>}]} <br/><br/>
	*/
	public List<CaterialPriceDetail> getCaterialPriceDetailList(Map<String,Object> params) {
		return mapper.getCaterialPriceDetailList(params);
	}
	public void addCaterialPriceDetail(CaterialPriceDetail[] arr) {
		for(CaterialPriceDetail obj: arr) {
			mapper.addCaterialPriceDetail(obj);
		}
	}
	public void updateCaterialPriceDetail(CaterialPriceDetail[] arr) {
		for(CaterialPriceDetail obj: arr) {
			mapper.updateCaterialPriceDetail(obj);
		}
	}
	public void deleteCaterialPriceDetail(CaterialPriceDetail[] arr) {
		for(CaterialPriceDetail obj: arr) {
			mapper.deleteCaterialPriceDetail(obj);
		}
	}
}
