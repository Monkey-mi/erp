package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.supplier.data.AppSupplierAccessLoopMapper;
import srm.supplier.model.AppSupplierAccessLoop;


@Service
public class AppSupplierAccessLoopService {
	@Autowired
	private AppSupplierAccessLoopMapper mapper;

	/**
	 * 流水表CURD
	 * Request supplier/appSupplierAccessLoop.srm?method=getAppSupplierAccessLoopList <br/><br/>
	 * @author wq
	 * @date 2016-08-15
	 */
	public List<AppSupplierAccessLoop> getAppSupplierAccessLoopList(Map<String,Object> params) {
		return mapper.getAppSupplierAccessLoopList(params);
	}
	public void addAppSupplierAccessLoop(AppSupplierAccessLoop[] arr) {
		for(AppSupplierAccessLoop obj: arr) {
			mapper.addAppSupplierAccessLoop(obj);
		}
	}
	public void updateAppSupplierAccessLoop(AppSupplierAccessLoop[] arr) {
		for(AppSupplierAccessLoop obj: arr) {
			mapper.updateAppSupplierAccessLoop(obj);
		}
	}
	public void deleteAppSupplierAccessLoop(AppSupplierAccessLoop[] arr) {
		for(AppSupplierAccessLoop obj: arr) {
			mapper.deleteAppSupplierAccessLoop(obj);
		}
	}
	public List<AppSupplierAccessLoop> getAppSupplierAccessLoopOutList(Map<String,Object> params){
		String assess_dt =  mapper.getMaxDate(params);		
		if(assess_dt == null){
			return null;
		}
		params.put("assess_dt", assess_dt);
		return mapper.getAppSupplierAccessLoopOutList(params);
	}
}
