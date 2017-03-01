package erp.erp.purchaseOrder.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.purchaseOrder.data.OutSourcePickingMapper;
import erp.erp.purchaseOrder.model.OutSourceDetailImp;
import erp.erp.purchaseOrder.model.OutSourceImp;
import erp.erp.purchaseOrder.model.OutSourcePicking;


@Service
public class OutSourcePickingService {
	@Autowired
	private OutSourcePickingMapper mapper;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购
	/**
	* @Description: 采购外协导入明细
	* Request purchaseorder/outsourcepicking.act?method=getOutSourceDetailImpList
	* Response {data:[{List<OutSourceDetailImp>}]} <br/><br/>
	*/
	public List<OutSourceDetailImp> getOutSourceDetailImpList(Map<String,Object> params) {
		Map<String,Object> params1= new HashMap<String, Object>();
		//取有投产标记的的工序的任务单的投产数量
		params1.put("sql"," select top 1 gxbh  from lsx_gxmcb where tcbj=1; ");
		String gxbh =purchaseDetailMapper.getStringFromSql(params1);
		if(gxbh==null){
			gxbh="0";
		}
		//System.out.println(1/0);
		params.put("gxbh", gxbh);
		return mapper.getOutSourceDetailImpList(params);
	}
	/**
	* @Description: 采购外协导入
	* Request purchaseorder/outsourcepicking.act?method=getOutSourceImpList
	* Response {data:[{List<OutSourceImp>}]} <br/><br/>
	*/
	public List<OutSourceImp> getOutSourceImpList(Map<String,Object> params) {
		return mapper.getOutSourceImpList(params);
	}
	/**
	* @Description: 采购外协领料单编辑界面查询
	* Request purchaseorder/outsourcepicking.act?method=getOutSourcePickingForEdtList
	* Response {data:[{List<OutSourcePicking>}]} <br/><br/>
	*/
	public List<OutSourcePicking> getOutSourcePickingForEdtList(Map<String,Object> params) {
		return mapper.getOutSourcePickingForEdtList(params);
	}
	
	/**
	* @Description: 采购外协领料单CURD
	* Request purchaseorder/outsourcepicking.act?method=******
	* Response {data:[{List<OutSourcePicking>}]} <br/><br/>
	*/
	public List<OutSourcePicking> getOutSourcePickingList(Map<String,Object> params) {
		return mapper.getOutSourcePickingList(params);
	}
	public void addOutSourcePicking(OutSourcePicking[] arr) {
		for(OutSourcePicking obj: arr) {
			mapper.addOutSourcePicking(obj);
		}
	}
	public void updateOutSourcePicking(OutSourcePicking[] arr) {
		for(OutSourcePicking obj: arr) {
			mapper.updateOutSourcePicking(obj);
		}
	}
	public void deleteOutSourcePicking(OutSourcePicking[] arr) {
		for(OutSourcePicking obj: arr) {
			mapper.deleteOutSourcePicking(obj);
		}
	}
}
