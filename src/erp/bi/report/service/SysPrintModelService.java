package erp.bi.report.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.bi.report.data.SysPrintModelMapper;
import erp.bi.report.model.SysPrintModel;



@Service
public class SysPrintModelService {
	@Autowired
	private SysPrintModelMapper mapper;


	public List<SysPrintModel> getSysPrintModelList(Map<String,Object> params) {
		return mapper.getSysPrintModelList(params);
	}
	public void addSysPrintModel(SysPrintModel[] arr) {
		for(SysPrintModel obj: arr) {
			mapper.addSysPrintModel(obj);
		}
	}
	public void updateSysPrintModel(SysPrintModel[] arr) {
		for(SysPrintModel obj: arr) {
			mapper.updateSysPrintModel(obj);
		}
	}
	public void deleteSysPrintModel(SysPrintModel[] arr) {
		for(SysPrintModel obj: arr) {
			mapper.deleteSysPrintModel(obj);
		}
	}
	public void setDatagridTplXml(Map<String,Object> params){
		
		 mapper.setDatagridTplXml(params);
	}
	/**
	 * 
	* @Title: getPayApplyPrintModelList
	* @Description: PayApplyService根据order_seq,menu_id获取相应的打印模板数据
	* @param params
	* @return
	* @returnType List<SysPrintModel>    
	* @author 舒飞
	* @date 2016-7-11上午8:37:31
	 */
	public List<SysPrintModel> getPayApplyPrintModelList(Map<String,Object> params){
		return mapper.getPayApplyPrintModelList(params);
	}
}
