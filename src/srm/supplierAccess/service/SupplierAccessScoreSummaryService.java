package srm.supplierAccess.service;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.util.MyJsonUtil;

import srm.supplier.data.SupplierFileMapper;
import srm.supplier.model.SupplierFile;
import srm.supplierAccess.data.SupplierAccessScoreSummaryMapper;
import srm.supplierAccess.model.SupplierAccessScoreSummary;;


@Service
public class SupplierAccessScoreSummaryService{
	@Autowired
	private SupplierAccessScoreSummaryMapper mapper;
	@Autowired
	private SupplierFileMapper supplierFileMapper;
	public List<SupplierAccessScoreSummary> getSupplierAccessScoreList(Map<String,Object> params) {
		return mapper.getSupplierAccessScoreSummaryList(params);
	}
	
	/**
	 * 获取13项评分总分等相关信息
	 * Request supplierAccess/SupplierAccessScoreSummary.srm?method=getSupplierScoreCorrelation  <br/><br/>
	 * @author wq
	 * @date 2016-03-15
	 */
	public String getSupplierScoreCorrelation(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			List<SupplierAccessScoreSummary> sassList=mapper.getSupplierAccessScoreSummaryList(params);
			double max=0;
			double keyMax=0;
			double keyreal=0;
			double real=0;
			String rank="优秀";
			for(SupplierAccessScoreSummary ss:sassList){
				max+=ss.getMaxmum();
				real+=ss.getRealmum();
				if(ss.getFitem_id()==7||ss.getFitem_id()==8||ss.getFitem_id()==11||ss.getFitem_id()==12){
					keyMax+=ss.getMaxmum();
					keyreal+=ss.getRealmum();
				}
			}
			double r=real/max;
			if(r>=0.85){
				rank="优秀";
			}else if(r>=0.7&&r<0.85){
				rank="良好";
			}else if(r>=0.6&&r<0.7){
				rank="合格";
			}else if(r<0.6){
				rank="不合格";
			}
			json.put("rank", rank);
			json.put("max", max);
			json.put("real", real);
			json.put("keyMax", keyMax);
			json.put("keyreal", keyreal);
			List<SupplierFile> sfList=supplierFileMapper.getSupplierFileByID(params);
			if(sfList.size()>0){
				json.put("rec", MyJsonUtil.obj2string(sfList.get(0)));
			}
			}catch (Exception e) {
				json.put("bool", false);
				e.printStackTrace();
				json.put("msg", "获取13项评分总分等相关信息时出现异常，请重试！");
		}
		return json.toString();
	}
}