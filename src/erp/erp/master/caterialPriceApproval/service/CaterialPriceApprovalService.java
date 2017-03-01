package erp.erp.master.caterialPriceApproval.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.caterialPrice.data.CaterialPriceArgumentMapper;
import erp.erp.master.caterialPrice.model.CaterialPrice;
import erp.erp.master.caterialPrice.model.CaterialPriceArgument;
import erp.erp.master.caterialPriceApproval.data.CaterialPriceApprovalMapper;
import erp.erp.master.caterialPriceApproval.model.CaterialPriceApproval;
import erp.erp.master.company.data.CompanyMapper;
import erp.erp.master.company.model.CompanyShow;


@Service
public class CaterialPriceApprovalService {
	@Autowired
	private CaterialPriceApprovalMapper mapper;
	
	@Autowired
	private CaterialPriceArgumentMapper caterialPriceArgumentMapper;
	@Autowired
	private CompanyMapper companyMapper;
	/**
	 * 控价刷新
	 * Request caterialpriceapproval/caterialpriceapproval.act?method=getRefreshPrice  <br/><br/>
	 * @author wq
	 * @date 2016-01-20
	 */
	public String getRefreshPrice(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			mapper.getRefreshPrice(params);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "控价刷新时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	 * 控价刷新前验证
	 * Request caterialpriceapproval/caterialpriceapproval.act?method=getBeforRefreshPrice  <br/><br/>
	 * @author wq
	 * @date 2016-01-19
	 */
	public String getBeforRefreshPrice(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		try {
			CaterialPriceApproval [] arr=null;
			if(params.get("recordData")!=null){
				JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
				arr=(CaterialPriceApproval [])JSONArray.toArray(jsonArray,CaterialPriceApproval.class);
				for(CaterialPriceApproval obj:arr){
					params.put("gsbh", obj.getGsbh());
					if(mapper.getBeforRefreshPrice(params)>0){
						json.put("bool", false);
						json.put("msg", "公式名称已有记录刷新过，是否确认再次刷新?");
					}
				}
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "控价刷新前验证出现异常，请重试！");
		}
		return json.toString();
	}
	
	/**
	 * 签发前验证
	 * Request caterialpriceapproval/caterialpriceapproval.act?method=getBeforSign  <br/><br/>
	 * @author wq
	 * @date 2016-01-19
	 */
	public String getBeforSign(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		try {
			CaterialPriceApproval [] arr=null;
			if(params.get("recordData")!=null){
				JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
				arr=(CaterialPriceApproval [])JSONArray.toArray(jsonArray,CaterialPriceApproval.class);
				for(CaterialPriceApproval obj:arr){
					if(mapper.getCaterialPriceClddAndJgsp(obj)>0){
						json.put("bool", false);
						json.put("msg", "材料档案和价格审批不能同时维护厂商!");
						return json.toString();
					}
				}
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "签发前验证时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	* @Description: 厂商信息导入信息
	* Request caterialpriceapproval/caterialpriceapproval.act?method=getCompanyShowList
	* Response {data:[{List<CaterialPriceApproval>}]} <br/><br/>
	*/
	public List<CompanyShow> getCompanyShowList(Map<String,Object> params) {
		List<CompanyShow> companyShowList = null;
		if(params.containsKey("storeType")){
			if("clbm_gscsb".equals(params.get("storeType"))){
				companyShowList = companyMapper.getCompanyShowAList(params);
			}else if("csjjb".equals(params.get("storeType"))){
				companyShowList = companyMapper.getCompanyShowBList(params);
			}else{
				companyShowList = companyMapper.getCompanyShowList(params);
			}
		}else{
			companyShowList = companyMapper.getCompanyShowList(params);
		}
		return companyShowList;
	}
	
	/**
	* @Description: 材料审批价格CURD
	* Request caterialpriceapproval/caterialpriceapproval.act?method=******
	* Response {data:[{List<CaterialPriceApproval>}]} <br/><br/>
	*/
	public List<CaterialPriceApproval> getCaterialPriceApprovalList(Map<String,Object> params) {
		return mapper.getCaterialPriceApprovalList(params);
	}
	public void addCaterialPriceApproval(CaterialPriceApproval[] arr) {
		for(CaterialPriceApproval obj: arr) {
			mapper.addCaterialPriceApproval(obj);
		}
	}
	public void updateCaterialPriceApproval(CaterialPriceApproval[] arr) {
		for(CaterialPriceApproval obj: arr) {
			mapper.updateCaterialPriceApproval(obj);
		}
	}
	public void deleteCaterialPriceApproval(CaterialPriceApproval[] arr) {
		for(CaterialPriceApproval obj: arr) {
			mapper.deleteCaterialPriceApproval(obj);
			//级联删除
			Map<String,Object> params=new HashMap<String, Object>();
			params.put("jlbh", obj.getJlbh());
			mapper.deleteCaterialPriceDetailByKey(params);
			mapper.deleteCompanyByKey(params);
		}
	}
	
	/**
	 * 获取明细字段
	 * Request caterialpriceapproval/caterialpriceapproval.act?method=getColumnState  <br/><br/>
	 * @author wq
	 * @date 2016-01-12
	 */
	public String getColumnState(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		JSONObject col=new JSONObject();
		col.put("spjg1","{hidden:true,text:''}");
		col.put("spjg2","{hidden:true,text:''}");
		col.put("spjg3","{hidden:true,text:''}");
		col.put("spjg4","{hidden:true,text:''}");
		col.put("spjg5","{hidden:true,text:''}");
		try {
			if(params.get("gsbh")!=null){
				List<CaterialPrice> cp=mapper.getCaterialPriceFormula(params);
				if(cp.size()>0){
					String jggs=cp.get(0).getJggs();
					params.put("sql", "  select jggs  from cljggswhb where gsbh='"+params.get("gsbh").toString()+"' ");
					String y_jggs=mapper.getStringFromSql(params);
					col.put("jggs",y_jggs);
					String csmcArr[]=jggs.split("\\*");
					int count=0;
					for(String csmc:csmcArr){
						params.put("csmc", csmc);
						List<CaterialPriceArgument> cpaList=caterialPriceArgumentMapper.getCaterialPriceArgumentList(params);
						if(cpaList.size()>0){
							CaterialPriceArgument cpa=cpaList.get(0);
							if(cpa.getSpbj()==1){
								count++;
								switch(count){
									case 1:
										col.put("spjg1","{hidden:false,text:'"+csmc+"'}");
										break;
									case 2:
										col.put("spjg2","{hidden:false,text:'"+csmc+"'}");
										break;
									case 3:
										col.put("spjg3","{hidden:false,text:'"+csmc+"'}");
										break;
									case 4:
										col.put("spjg4","{hidden:false,text:'"+csmc+"'}");
										break;
									case 5:
										col.put("spjg5","{hidden:false,text:'"+csmc+"'}");
										break;
									default :
								}
							}
						}
					}
				}
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "获取明细字段时出现异常，请重试！");
		}
		json.put("column", col.toString());
		return json.toString();
	}
}
