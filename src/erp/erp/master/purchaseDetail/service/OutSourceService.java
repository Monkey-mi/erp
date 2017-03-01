package erp.erp.master.purchaseDetail.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.master.purchaseDetail.data.OutSourceMapper;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.master.purchaseDetail.model.FunctionPurchaseCtl;
import erp.erp.master.purchaseDetail.model.MaterialDetail;
import erp.erp.master.purchaseDetail.model.OutSource;
import erp.erp.master.purchaseDetail.model.OutSourceDetail;
import erp.erp.master.purchaseDetail.model.OutSourceSubsidiary;
import erp.erp.master.purchaseDetail.model.ProcessName;
import erp.erp.master.purchaseDetail.model.PurchaseDetail;
import erp.util.DateJsonValueProcessor;
import erp.util.DoubleCal;
import erp.util.MyJsonUtil;


@Service
public class OutSourceService {
	@Autowired
	private OutSourceMapper mapper;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购
	/**
	 * 工序名称树
	 * Request purchasedetail/outsource.act?method=getProcessNameTree <br/><br/>
	 * Response {data:[{TreeModel}]} <br/><br/>
	 * @param TreeModel {@link paramMap}
	 */
	public List<TreeModel> getProcessNameTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<ProcessName> list=mapper.getProcessNameList(params);
		int lbjc=1;
		int parentId=0;
		if(params.get("node")!=null){
			 lbjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(ProcessName sa:list) 
		{
			if(sa.getGxjc()==lbjc){
				TreeModel st=new TreeModel();
				st.setNodeId(Integer.valueOf(sa.getGxbh().trim()));
				st.setParentId(parentId);
				st.setText(sa.getGxmc());
				st.setExpanded("false");
				if (sa.getMjbz()==0){
					st.setLeaf("false");
				}else{
					st.setLeaf("true");
				}
				st.setType("ProcessName");
				stlist.add(st);
			}
		}
		return stlist;
	}
	/**
	 * 外协通知单CURD
	 * Request purchasedetail/outsource.act?method=***OutSource*** <br/><br/>
	 * Response {data:[{OutSource}]} <br/><br/>
	 * @param OutSource {@link paramMap}
	 */
	public List<OutSource> getOutSourceList(Map<String,Object> params) {
		return mapper.getOutSourceList(params);
	}
	public void addOutSource(OutSource[] arr) {
		for(OutSource obj: arr) {
			mapper.addOutSource(obj);
		}
	}
	public void updateOutSource(OutSource[] arr) {
		for(OutSource obj: arr) {
			mapper.updateOutSource(obj);
		}
	}
	public void deleteOutSource(OutSource[] arr) {
		for(OutSource obj: arr) {
			mapper.deleteOutSource(obj);
		}
	}
	/**
	 * 外协通知单生成
	 * Request purchasedetail/outsource.act?method=getBeforCreate  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-03-10
	 */
	public String getBeforCreate(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));
		json.put("bool", true);
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		List<OutSourceDetail> osdList=new ArrayList<OutSourceDetail>();
				String s_csbh=params.get("csbh").toString();
				String recordData=params.get("recordData").toString();
				JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
				PurchaseDetail arr[]=(PurchaseDetail [])JSONArray.toArray(jsonArray,PurchaseDetail.class);
				int wxxh=1;
				for(PurchaseDetail pd:arr){
					double ld_cgdj=0;
					OutSourceDetail osd=new OutSourceDetail();
					osd.setJsbl(1);
					osd.setWxxh(wxxh);
					wxxh++;
					osd.setClhh(pd.getClhh());
					osd.setClmc(pd.getClmc());
					osd.setCltx1(pd.getCltx1());
					osd.setCltx2(pd.getCltx2());
					osd.setCltx3(pd.getCltx3());
					osd.setJldw(pd.getJldw());
					osd.setTcsl(pd.getCjwz());
					osd.setJgsl(pd.getCjwz());
					osd.setJhbh(pd.getJhxh());
					osd.setJhxh(pd.getJhxh());
					osd.setJhh(pd.getJhh());
					osd.setCgbh(pd.getCgbh());
					osd.setCgxh(pd.getCgxh());
					osd.setCgh(pd.getCgh());
					
					params.put("csbh", s_csbh);
					params.put("clhh", pd.getClhh());
					params.put("cgsl", 0);
					params.put("wbbh", "");
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						FunctionPurchaseCtl fpc=fpcList.get(0);
						ld_cgdj=fpc.getKzdj();
					}
					osd.setJgje(ld_cgdj);
					osd.setSqbh(pd.getSqbh());
					osd.setSqxh(pd.getSqxh());
					osd.setSqh(pd.getSqh());
					osd.setJgje(pd.getCjwz());
					osdList.add(osd);
				}
				json.put("ConDetList", MyJsonUtil.getJSONString(osdList));
		return json.toString();
	}
	/**
	 * 材料导入
	 * Request purchasedetail/outsource.act?method=getOutSourceSubsidiaryImp  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-03-11
	 */
	public String getOutSourceSubsidiaryImp(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));
		json.put("bool", true);
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		List<OutSourceSubsidiary> subList=new ArrayList<OutSourceSubsidiary>();
		String sql="";
				String s_wxdh=params.get("wxdh").toString();
				String s_wxxh=params.get("wxxh").toString();
				int ll_bootom_count=Integer.parseInt(params.get("oscount").toString());
				int maxtzxh=Integer.parseInt(params.get("maxtzxh").toString());
				String recordData=params.get("recstr").toString();
				JSONArray jsonArray=JSONArray.fromObject(recordData);
				MaterialDetail arr[]=(MaterialDetail [])JSONArray.toArray(jsonArray,MaterialDetail.class);
				for(MaterialDetail pd:arr){
				   	int ll_max_tzxh=0;
				   	int ll_max_tzxh1=0;
				   	int ll_tzxh=0;
				   	sql=" select max(tzxh)  from wxlltzdb  with (nolock) where wxdh='"+s_wxdh+"' and wxxh='"+s_wxxh+"' ";
				   	params.put("sql", sql);
				   	String count=purchaseDetailMapper.getStringFromSql(params);
				   	if(count==null){
				   		count="0";
				   	}
				   	ll_max_tzxh=Integer.parseInt(count);
				   	if(ll_bootom_count>0){
				   		ll_max_tzxh1=maxtzxh;
				   	}
				   	if(ll_max_tzxh>=ll_max_tzxh1){
				   		ll_tzxh=ll_max_tzxh+1;
				   	}else{
				   		ll_tzxh=ll_max_tzxh1+1;
				   	}
				   	OutSourceSubsidiary sub=new OutSourceSubsidiary();
				   	sub.setTzxh(ll_tzxh);
				   	sub.setLbbh(pd.getLbbh());
				   	sub.setClhh(pd.getClhh());
				   	sub.setJldw(pd.getJldw());
				   	sub.setLbmc(pd.getLbmc());
				   	sub.setClmc(pd.getClmc());
				   	sub.setJgyl(DoubleCal.round(pd.getJgyl(), 3));
				   	sub.setJsbl(DoubleCal.round(pd.getJsbl(), 4));
				   	sub.setTzll(DoubleCal.round(pd.getTzll(), 3));
				   	sub.setWxdh(Integer.parseInt(s_wxdh.trim()));
				   	sub.setWxxh(Integer.parseInt(s_wxxh.trim()));
				   	subList.add(sub);
				   	maxtzxh++;
				   	ll_bootom_count++;
				}
				json.put("SubList", MyJsonUtil.getJSONString(subList));
		return json.toString();
	}
}
