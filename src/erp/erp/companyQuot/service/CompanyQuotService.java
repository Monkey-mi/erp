package erp.erp.companyQuot.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.FilterModel;
import erp.erp.companyQuot.data.CompanyQuotFileMapper;
import erp.erp.companyQuot.data.CompanyQuotMapper;
import erp.erp.companyQuot.data.QuotDetailMapper;
import erp.erp.companyQuot.model.CompanyQuot;
import erp.erp.companyQuot.model.CompanyQuotFile;
import erp.erp.companyQuot.model.QuotDetail;
import erp.util.MyJsonUtil;



@Service
public class CompanyQuotService {
	@Autowired
	private CompanyQuotMapper mapper;
	@Autowired
	private QuotDetailMapper qmapper;
	@Autowired
	private CompanyQuotFileMapper fmapper;

	public List<CompanyQuot> getCompanyQuotList(Map<String,Object> params) {
		String filterStr=params.get("filter")==null?"":params.get("filter").toString();
		String filterSearch="";
		List<FilterModel> filterList=new ArrayList<FilterModel>();
		if(!filterStr.equals("")){
			filterList=MyJsonUtil.str2list(filterStr, FilterModel.class);
		}
		if(filterList!=null){
			filterSearch=MyJsonUtil.FilterListToString(filterList);
		}
		if(!filterSearch.equals("")){
			params.put("filterSearch", filterSearch);
		}
		return mapper.getCompanyQuotList(params);
	}
	//附件
	public List<CompanyQuotFile> getCompanyQuotFileList(Map<String,Object> params) {
		return fmapper.getCompanyQuotFile(params);
	}
	public void addCompanyQuot(CompanyQuot[] arr) {
		for(CompanyQuot obj: arr) {
			mapper.addCompanyQuot(obj);
		}
	}
	public void addCompanyQuotFile(CompanyQuotFile[] arr) {
		int maxbjdh =mapper.getCompanyQuotOne();
		for(CompanyQuotFile obj: arr) {
			double bjdh = obj.getBjdh();
			if(bjdh==0){
			    bjdh = maxbjdh;
			}
			obj.setBjdh(bjdh);
			fmapper.addCompanyQuotFile(obj);
		}
	}
	public void updateCompanyQuot(CompanyQuot[] arr) {
		for(CompanyQuot obj: arr) {
			mapper.updateCompanyQuot(obj);
		}
	}
	public void deleteCompanyQuot(CompanyQuot[] arr) {
		for(CompanyQuot obj: arr) {
			mapper.deleteCompanyQuot(obj);
			mapper.deleteDetail(obj);
		}
	}
	public void deleteCompanyQuotFile(CompanyQuotFile[] arr) {
		for(CompanyQuotFile obj: arr) {
			fmapper.deleteCompanyQuotFile(obj);
		}
	}
	public List<QuotDetail> getQuotDetailList(Map<String,Object> params) {
		return qmapper.getQuotDetailList(params);
	}
	public void addQuotDetail(QuotDetail[] arr) {
	    int maxbjdh =mapper.getCompanyQuotOne(); 
		for(QuotDetail obj: arr) {
			int bjdh = obj.getBjdh();
			if(bjdh==0){
			    bjdh = maxbjdh;
			}
			else{
			}
		   obj.setBjdh(bjdh);	
           qmapper.addQuotDetail(obj);
		}
	}
	public void updateQuotDetail(QuotDetail[] arr) {
		for(QuotDetail obj: arr) {
			qmapper.updateQuotDetail(obj);
		}
	}
	public void deleteQuotDetail(QuotDetail[] arr) {
		for(QuotDetail obj: arr) {
			qmapper.deleteQuotDetail(obj);
		}
	}
	public Integer getwbbjcp(){
	   return mapper.getwbbjcp();
	}
	public String getWbbh(Map<String,Object> params){
		return mapper.getWbbh(params);
	}
	public Integer getSpbj(Map<String,Object> params){
		return mapper.getSpbj(params);
	}
	//该报价单下明细是否已全部锁定
	public Integer ifAllsd(Map<String,Object> params){
		return mapper.ifAllsd(params);
	}
	public Integer ifAllsh(Map<String,Object> params){
		return mapper.ifAllsh(params);
	}
	public int getCompanyQuotOne(){
		return mapper.getCompanyQuotOne();
	}
	public void updateMainSdbj(Map<String,Object> params){
		mapper.updateMainSdbj(params);
	}
	public void updateMainShbj(Map<String,Object> params){
		mapper.updateMainShbj(params);
	}
	public void update_bj(Map<String,Object> params){
		String recordData=null;
		QuotDetail arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(QuotDetail [])JSONArray.toArray(jsonArray,QuotDetail.class);
			int sdbj = arr[0].getSdbj();
			if(sdbj==1){
				params.put("sdbj", 0);
			}else{
				params.put("sdbj", 1);
			}
			for(QuotDetail ps:arr){
				params.put("bjdh", ps.getBjdh());
				params.put("bjxh", ps.getBjxh());
				mapper.updateSdbj(params);
			}
	}
	public void update_sh(Map<String,Object> params){
		String recordData=null;
		QuotDetail arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(QuotDetail [])JSONArray.toArray(jsonArray,QuotDetail.class);
			int shbj = arr[0].getShbj();
			if(shbj==1){
				params.put("shbj", 0);
			}else{
				params.put("shbj", 1);
			}
			for(QuotDetail ps:arr){
				params.put("bjdh", ps.getBjdh());
				params.put("bjxh", ps.getBjxh());
				mapper.updateShbj(params);
			}
	}
	/**审批
	 * */
	public void doAppro(Map<String,Object> params){
		mapper.doAppro(params);
	}
	/**
	 * 价格更新
	 * */
	public String ctrlPrice(Map<String,Object> params){
		String recordData=null;
		QuotDetail arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(QuotDetail [])JSONArray.toArray(jsonArray,QuotDetail.class);
		JSONObject json=new JSONObject();
		json.put("bool", true);
		for(QuotDetail ps:arr){
			params.put("clhh", ps.getClhh());
			params.put("wbbh", ps.getWbbh());
			params.put("csbj", ps.getCsbj());
			params.put("wbbj", ps.getWbbj());
			params.put("fzkj", ps.getFzkj());
			params.put("bjxh", ps.getBjxh());
			params.put("bjdh", ps.getBjdh());
			/*System.out.println((ps.getBjdh()));
			System.out.println(params);*/
			Integer llcount = mapper.getllcount(params);
			double csbj = ps.getCsbj();
			double fzkj = ps.getFzkj();
			params.put("csbj", csbj);
			params.put("fzkj", fzkj);
		/*	System.out.println(llcount);*/
		if(llcount>0){
			mapper.updateCsjj(params);
			mapper.updateCsjjsp(params);
		}else{
			int bjdh = ps.getBjdh();	
			String bzsm = "由"+bjdh+"号报价单生成";	
			params.put("bzsm",bzsm);
			mapper.insertCsjjb(params);
		  }
		mapper.updateGxbj_jg(params);
		}
		return json.toString();
	}
	public int getWjbhOne(Map<String,Object> params){
		return fmapper.getWjbhOne(params);
	}
	public void updateGdbj(Map<String,Object> params){
		String recordData=null;
		CompanyQuot arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
	    arr = (CompanyQuot[])JSONArray.toArray(jsonArray,CompanyQuot.class);
	    	int gdbj = arr[0].getGdbj();
	    
	     if(gdbj==1){
				params.put("gdbj", 0);
		 }else{
				params.put("gdbj", 1);
		  }for(CompanyQuot ps:arr){
				params.put("bjdh", ps.getBjdh());
				mapper.updateGdbj(params);
			}
    }
}
