package erp.erp.master.caterialPricePurchase.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.master.caterialPricePurchase.data.CaterialPricePurchaseMapper;
import erp.erp.master.caterialPricePurchase.data.VendorPriceCtlMapper;
import erp.erp.master.caterialPricePurchase.model.CaterialHistoryPriceCtl;
import erp.erp.master.caterialPricePurchase.model.CaterialPricePurchase;
import erp.erp.master.caterialPricePurchase.model.HistoryPriceCtl;
import erp.erp.master.caterialPricePurchase.model.HistroyQuote;
import erp.erp.master.caterialPricePurchase.model.MaterialClass;
import erp.erp.master.caterialPricePurchase.model.PurchasePrice;
import erp.erp.master.caterialPricePurchase.model.VendorHistoryPriceCtl;
import erp.erp.master.caterialPricePurchase.model.VendorPriceCtl;


@Service
public class CaterialPricePurchaseService {
	@Autowired
	private CaterialPricePurchaseMapper mapper;
	@Autowired
	private VendorPriceCtlMapper vmapper;
 
	public List<CaterialPricePurchase> getCaterialPricePurchaseList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String lbqx="and (";
		List<String> cllbList = mapper.getClqx(pa);
		for(String str:cllbList){
			if(i==0){
				lbqx+="(clbmb.lbbh='') or (left(clbmb.lbbh,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				lbqx+=" or (left(clbmb.lbbh,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		lbqx+=")";
		if(cllbList.size()>0){
			params.put("lbqx", lbqx);
		}
		return mapper.getCaterialPricePurchaseList(params);
	}
	public List<CaterialHistoryPriceCtl> getCaterialHistoryPriceCtlList(Map<String,Object> params) {
		return mapper.getCaterialHistoryPriceCtlList(params);
	}
	public List<VendorHistoryPriceCtl> getVendorHistoryPriceCtlList(Map<String,Object> params) {
		return mapper.getVendorHistoryPriceCtlList(params);
	}
	public List<PurchasePrice> getHistoryPurchasePriceList(Map<String,Object> params) {
		return mapper.getHistoryPurchasePriceList(params);
	}
	public List<HistroyQuote> getHistroyQuoteList(Map<String,Object> params) {
		return mapper.getHistroyQuoteList(params);
	}
	public List<HistoryPriceCtl> getHistoryPriceCtlList(Map<String,Object> params) {
		return mapper.getHistoryPriceCtlList(params);
	}
	public void addCaterialPricePurchase(CaterialPricePurchase[] arr) {
		for(CaterialPricePurchase obj: arr) {
			mapper.addCaterialPricePurchase(obj);
		}
	}
	public void updateCaterialPricePurchase(CaterialPricePurchase[] arr) {
		for(CaterialPricePurchase obj: arr) {
			mapper.updateCaterialPricePurchase(obj);
		}
	}
	//增加厂商
	public void addCsjjxxb(Map<String,Object> params){
		mapper.addCsjjxxb(params);
	}
	//刷新控价
	public void refreshCtlPrice(Map<String,Object> params) {		
			mapper.refreshCtlPrice(params);
	}
	public void refreshNewPrice(Map<String,Object> params) {
			mapper.refreshNewPrice(params);
		
	}
	public String getClhh(Map<String,Object> params){
		   return  mapper.getClhh(params);
	}
	public void deleteCaterialPricePurchase(CaterialPricePurchase[] arr) {
		for(CaterialPricePurchase obj: arr) {
			mapper.deleteCaterialPricePurchase(obj);
		}
	}
	public List<VendorPriceCtl> getVendorPriceCtlList(Map<String,Object> params) {
		return vmapper.getVendorPriceCtlList(params);
	}
	public void addVendorPriceCtl(VendorPriceCtl[] arr) {
		for(VendorPriceCtl obj: arr) {
			vmapper.addVendorPriceCtl(obj);
		}
	}
	public void updateVendorPriceCtl(VendorPriceCtl[] arr) {
		for(VendorPriceCtl obj: arr) {
			vmapper.updateVendorPriceCtl(obj);
		}
	}
	
	public void doAppro(Map<String,Object> params){
		String idarrayString=params.get("idarray").toString();
		String[] idarray= idarrayString.split(",");
		for(int i=0;i<idarray.length;i++){
			params.put("clhh", idarray[i]);
			mapper.doAppro(params);
		}
	}
	/**
	 * 厂商控价审批
	 * */
	public void doCompanyAppro(Map<String,Object> params){
		String idarrayString=params.get("idarray").toString();
		String bharrayString=params.get("bharray").toString();
		String[] idarray= idarrayString.split(",");
		String[] bharray= bharrayString.split(",");
		for(int i=0;i<idarray.length;i++){
			params.put("csbh", idarray[i]);
			params.put("clhh", bharray[i]);
			mapper.doCompanyAppro(params);
		}
	}
	public void doVpAppro(Map<String,Object> params){
		String idarrayString=params.get("idarray").toString();
		String bharrayString=params.get("bharray").toString();
		String[] idarray= idarrayString.split(",");
		String[] bharray= bharrayString.split(",");
		for(int i=0;i<idarray.length;i++){
			params.put("clhh", idarray[i]);
			params.put("csbh", bharray[i]);
			mapper.doVpAppro(params);
		}
	}
	/**
	 * 控价刷新
	 * 最新单价刷新*/
	public String getRefreshPrice(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			mapper.refreshCtlPrice(params);
		}catch (Exception e) {
			json.put("bool", false);
		    e.printStackTrace();//实例化Exception类型的对象
			json.put("msg", "控价刷新时出现异常，请重试！");
		}
		try {
			mapper.refreshNewPrice(null);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "最新单价刷新时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	 * 删除控制单价
	 * @param params
	 * @return
	 */
	public String deleteCtrlPrice(Map<String,Object> params){
		String recordData=null;
		VendorPriceCtl arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(VendorPriceCtl [])JSONArray.toArray(jsonArray,VendorPriceCtl.class);
		JSONObject json=new JSONObject();
		json.put("bool", true);
			for(VendorPriceCtl ps:arr){
				params.put("clhh", ps.getClhh());
				params.put("csbh", ps.getCsbh());
				String csmc = mapper.getCsmc(params);
				vmapper.deleteVendorPriceCtl(params);
				vmapper.deleteCsjjxx(params);
		        int scount = mapper.getScount(params);
		       /* System.out.println(scount);*/
		        if(scount==1){
		        	float kzdj=mapper.getKzdj(params);
		        	params.put("kzdj", kzdj);
		        	float kzdjold=mapper.getKzdjold(params);
		        	//四舍五入保留四位小数
		        	BigDecimal  b  =  new  BigDecimal(kzdj);  
		        	float   f1   =   b.setScale(4,   BigDecimal.ROUND_HALF_UP).floatValue();
		        	BigDecimal  d  =  new  BigDecimal(kzdjold);
		        	float   f2   =   d.setScale(4,   BigDecimal.ROUND_HALF_UP).floatValue();
		            if(f1!=f2){
		            	mapper.updateKzdj(params);
		            	mapper.insertClkzdjjlb(params);
		            }
		        }else if(scount==0){
		        	params.put("kzdj", 0);
		        	mapper.updateKzdj(params);
		        	mapper.insertClkzdjjlb(params);
		        }
			}
		return json.toString();
		
	}
/*	
	public String deleteTbCtrlPrice(Map<String,Object> params){
		String recordData=null;
		CaterialPricePurchase arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(CaterialPricePurchase [])JSONArray.toArray(jsonArray,CaterialPricePurchase.class);
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try{
			for(CaterialPricePurchase ps:arr){
				params.put("clhh", ps.getClhh());
				String clmc = mapper.getClmc(params);
				vmapper.deleteVendorPriceCtl(params);
				vmapper.deleteCsjjxx(params);
		        int scount = mapper.getScount(params);
		        if(scount==1){
		        	float kzdj=mapper.getKzdj(params);
		        	params.put("kzdj", kzdj);
		        	float kzdjold=mapper.getKzdjold(params);
		        	//四舍五入保留四位小数
		        	BigDecimal  b  =  new  BigDecimal(kzdj);  
		        	float   f1   =   b.setScale(4,   BigDecimal.ROUND_HALF_UP).floatValue();
		        	BigDecimal  d  =  new  BigDecimal(kzdjold);
		        	float   f2   =   d.setScale(4,   BigDecimal.ROUND_HALF_UP).floatValue();
		            if(f1!=f2){
		            	mapper.updateKzdj(params);
		            	mapper.insertClkzdjjlb(params);
		            }
		        }else if(scount==0){
		        	params.put("kzdj", 0);
		        	mapper.updateKzdj(params);
		        	mapper.insertClkzdjjlb(params);
		        }
			}
		}
		catch (Exception e){
			json.put("bool", false);
		    e.printStackTrace();//实例化Exception类型的对象
			json.put("msg", "删除控价时出现异常，请重试！");
		}
		return json.toString();
		
	}*/
	/**
	 * 操作员是否有材料类别操作权限
	 * */
	/*public int hasPermission(Map<String,Object> params){
		int result = mapper.getClqx(params);
		return result;
	}*/
	public List<TreeModel> getCaterialTypeTree(Map<String,Object> params){
	    List<TreeModel> stlist=new ArrayList<TreeModel>();
	    int lbjc=1;
	    int parentId=0;
	    List<MaterialClass> list = mapper.getMaterialClassList(params);
	    if(params.get("node")!=null){
	    	lbjc=(params.get("node").toString().length()/2)+1;
	        parentId = Integer.valueOf(String.valueOf(params.get("node")));
	    } 
	        for(MaterialClass sa:list){
	        	if(sa.getLbjc()==lbjc){
	        		TreeModel st = new TreeModel();
	        		st.setNodeId(Integer.valueOf(sa.getLbbh().trim()));
	        		st.setParentId(parentId);
	        		st.setText(sa.getLbmc());
	        		if (!sa.isMjbz()){
						if(sa.getLbbh().length()<2){
							st.setExpanded("true");
						}else{
							st.setExpanded("false");
						}
						st.setLeaf("false");
					}
	        		else{
	        			st.setLeaf("true");
	        			st.setExpanded("true");
	        		}
	        		stlist.add(st);
	        	   }
	        	}
	    return stlist;
	}
}
