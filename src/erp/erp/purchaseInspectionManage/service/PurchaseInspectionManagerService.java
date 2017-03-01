package erp.erp.purchaseInspectionManage.service;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.CheckSFMapper;
import erp.erp.PayApply.model.SubmitObject;
import erp.erp.purchaseInspectionManage.data.PurchaseInspectionManagerMapper;
import erp.erp.purchaseInspectionManage.model.PurchaseInspectionManager;


@Service
public class PurchaseInspectionManagerService {
	@Autowired
	private PurchaseInspectionManagerMapper mapper;
	@Autowired
	private CheckSFMapper checkSFMapper;

	public List<PurchaseInspectionManager> getPurchaseInspectionManagerList(Map<String,Object> params) {
		return mapper.getPurchaseInspectionManagerList(params);
	}
	public void addPurchaseInspectionManager(PurchaseInspectionManager[] arr) {
		for(PurchaseInspectionManager obj: arr) {
			mapper.addPurchaseInspectionManager(obj);
		}
	}
	public void updatePurchaseInspectionManager(PurchaseInspectionManager[] arr) {
		for(PurchaseInspectionManager obj: arr) {
			mapper.updatePurchaseInspectionManager(obj);
		}
	}
	public void deletePurchaseInspectionManager(Map<String,Object> params) {
			mapper.deletePurchaseInspectionManager(params);
	}
	public void updatePurchaseInspectionFpbj(Map<String,Object> params) {
		mapper.updatePurchaseInspectionFpbj(params);
		if("1".equals(params.get("fpbj").toString())){
			int ll_id = mapper.getLl_id(params);
			params.put("ll_id", ll_id);
			String ls_gzgw_fp = mapper.getLs_gzgw_fp(params);
			String ls_gzgw_fpdx = mapper.getLs_gzgw_fpdx(params);
			if(ls_gzgw_fp==null){
				ls_gzgw_fp="";
			}
			if(ls_gzgw_fpdx==null){
				ls_gzgw_fpdx="";
			}
			if(!"".equals(ls_gzgw_fpdx)){
				ls_gzgw_fpdx = getLeftStr(ls_gzgw_fpdx.trim(),5);
				ls_gzgw_fp = getLeftStr(ls_gzgw_fp.trim(),5);
				params.put("ls_gzgw_fpdx", ls_gzgw_fpdx);
				params.put("ls_gzgw_fp", ls_gzgw_fp);
				mapper.addT_inf_cpcgyhlcb(params);
			}
		}else{
			int ll_requestid = mapper.getLlf_id(params);
			checkSFMapper.update_oainfo(ll_requestid);
			mapper.deleteT_inf_cpcgyhlcb(params);
		}
	}
	public static String getLeftStr(String name,int len){
		int l = name.length();
		String str = "";
		if(l<len){
		for(int i=0;i<len-l;i++){
			str +="0";
		}
		name = str+name;
		}
		return name;
	}
	public List<SubmitObject> getDistributeObjectList(Map<String,Object> params) {
		return mapper.getDistributeObjectList(params);
	}
	public void addDistributeObject(Map<String,Object> params){
		mapper.addDistributeObject(params);
	}
	public void deleteDistributeObject(Map<String,Object> params){
		mapper.deleteDistributeObject(params);
	}
	
	public List<PurchaseInspectionManager> getEditPurchaseInspectionList(Map<String,Object> params) {
		return mapper.getEditPurchaseInspectionList(params);
	}
	public void addEditPurchaseInspection(PurchaseInspectionManager[] arr) {
		for(PurchaseInspectionManager obj: arr) {
			mapper.addEditPurchaseInspection(obj);
		}
	}
	public void updateEditPurchaseInspection(PurchaseInspectionManager[] arr) {
		for(PurchaseInspectionManager obj: arr) {
			mapper.updateEditPurchaseInspection(obj);
		}
	}
	public void deleteEditPurchaseInspection(Map<String,Object> params) {
			mapper.deleteEditPurchaseInspection(params);
	}
	public String getMaxYhno(Map<String,Object> params){
		    int yhno = mapper.getMaxYhno(params);
		    JSONObject json = new JSONObject();
		    json.put("yhno", yhno);
			return json.toString();
	}
}
