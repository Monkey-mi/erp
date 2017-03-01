package erp.erp.PurchaseClearing.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.FilterModel;
import erp.erp.PurchaseClearing.data.NoticeMapper;
import erp.erp.PurchaseClearing.model.Cost;
import erp.erp.PurchaseClearing.model.CostBills;
import erp.erp.PurchaseClearing.model.JsFydbImp;
import erp.erp.PurchaseClearing.model.JsRkdbImp;
import erp.erp.PurchaseClearing.model.Notice;
import erp.erp.arrivalRegister.data.ArrivalRegisterMapper;
import erp.erp.arrivalRegister.model.ArrivalRegister;
import erp.erp.master.prematerial.data.PrematerialMapper;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.util.MyJsonUtil;
import erp.util.WebUtil;
import erp.web.data.UsersMapper;
import erp.web.model.Exclusive;


@Service
public class NoticeService {
	@Autowired
	private NoticeMapper mapper;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;
	@Autowired
	private ArrivalRegisterMapper armapper;
	@Autowired
	private PrematerialMapper ckmapper;
	private UsersMapper userMapper=WebUtil.getAppCtx("tps").getBean(UsersMapper.class);
	public List<Notice> getNoticeList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String bmqx="and (";
		List<String> bmbhList = mapper.getBmqx(pa);
		if(bmbhList.isEmpty()){
			return null;
		}
		for(String str:bmbhList){
			if(i==0){
				bmqx+="(kptzb.hsbm='') or (left(kptzb.hsbm,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				bmqx+=" or (left(kptzb.hsbm,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		bmqx+=")";
		if(bmbhList.size()>0){
			params.put("bmqx", bmqx);
		}
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
		return mapper.getNoticeList(params);
	}
	public List<CostBills> getCostBillsList(Map<String,Object> params) {
		return mapper.getCostBillsList(params);
	}
	public List<CostBills> getRkd(Map<String,Object> params) {
		return mapper.getRkd(params);
	}
	public List<Cost> getFyd(Map<String,Object> params) {
		return mapper.getFyd(params);
	}
	public List<Cost> getWdfy(Map<String,Object> params) {
		return mapper.getWdfy(params);
	}
	public List<CostBills> getWdrk(Map<String,Object> params) {
		return mapper.getWdrk(params);
	}
	@Transactional
	public void addNotice(Notice[] arr) {
		for(Notice obj: arr) {
			mapper.addNotice(obj);
		}
	}
	@Transactional
	public void addJsRkdbImp(JsRkdbImp[] arr) {
		for(JsRkdbImp obj: arr) {
			mapper.addJsRkdbImp(obj);
		}
	}
	@Transactional
	public void addRkd(CostBills[] arr) {
		for(CostBills obj: arr) {
			mapper.addRkd(obj);
		}
	}
	//selStore加载
	public List<JsRkdbImp> getJsRkdbImp(Map<String,Object> params){
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
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String ckqx="and (";
		List<String> ckbhList = ckmapper.getCkqx(pa);
		if(ckbhList.isEmpty()){
			return null;
		}
		for(String str:ckbhList){
			if(i==0){
				ckqx+="(rkdb_yl.ckbh='') or (left(rkdb_yl.ckbh,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				ckqx+=" or (left(rkdb_yl.ckbh,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		ckqx+=")";
		if(ckbhList.size()>0){
			params.put("ckqx", ckqx);
		}
		List<JsRkdbImp> a = mapper.getJsRkdbImp(params);
		String str = "";
		for(JsRkdbImp obj : a){
			str=obj.getClmc().replaceAll("[^\u0020-\u9FA5]", "");
			obj.setClmc(str);
		}
		return a;
	}
	//一次编辑导入过的不在出现
	public String beforeloadJsRkdbImp(Map<String,Object> params){
		int count;
		String tablename;
		String sql ="select COUNT(*) from sysobjects WHERE name='view_wxjght' and type='V';";
		params.put("sql",sql);
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			sql = "drop view view_wxjght";
			params.put("sql",sql);
			purchaseDetailMapper.getStringFromSql(params);
		}
		sql = "create view view_wxjght as select htbh,htxh,sum(clje) as clje  from gjjjbomb where clmc='外协加工费' group by htbh,htxh";
		params.put("sql",sql);
		purchaseDetailMapper.getStringFromSql(params);
		
		/*params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##jsrkdb' and type='U'");
		cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			params.put("createsql", "drop table ##jsrkdb");
			armapper.createTableSql(params);}*/
		UUID uuid = UUID.randomUUID();
		String uuid1=uuid.toString().replace("-","");
		tablename = "jsrkdb"+uuid1;
		params.put("createsql", "select rkdh,rkxh into "+tablename+" from rkdb_yl where 0=1");
		armapper.createTableSql(params);
		CostBills[] arr = null;
		if(params.get("recDate")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recDate").toString());
			arr = (CostBills[])JSONArray.toArray(jsonArray,CostBills.class);
			double rkdh,rkxh;
			for(CostBills obj:arr){
				rkdh = obj.getRkdh();
				rkxh = obj.getRkxh();
				sql = "insert into "+tablename+" values('"+rkdh+"',"+rkxh+");";
				params.put("sql",sql);
				String  result= purchaseDetailMapper.getStringFromSql(params);
			}
		}
		return tablename;
	}
	public void beforeloadJsRkdbImpsx(Map<String,Object> params){
		int count;
		String sql ="select COUNT(*) from sysobjects WHERE name='view_wxjght' and type='V';";
		params.put("sql",sql);
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			sql = "drop view view_wxjght";
			params.put("sql",sql);
			purchaseDetailMapper.getStringFromSql(params);
		}
		sql = "create view view_wxjght as select htbh,htxh,sum(clje) as clje  from gjjjbomb where clmc='外协加工费' group by htbh,htxh";
		params.put("sql",sql);
		purchaseDetailMapper.getStringFromSql(params);
		
	    String tablename = params.get("tablename").toString();
		JsRkdbImp[] arr = null;
		if(params.get("recDate")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recDate").toString());
			arr = (JsRkdbImp[])JSONArray.toArray(jsonArray,JsRkdbImp.class);
			double rkdh,rkxh;
			for(JsRkdbImp obj:arr){
				rkdh = obj.getRkdh();
				rkxh = obj.getRkxh();
				sql = "insert into "+tablename+" values('"+rkdh+"',"+rkxh+");";
				params.put("sql",sql);
				purchaseDetailMapper.getStringFromSql(params);
			}
		}
	}
	public void beforeloadRkdbImp(Map<String,Object> params){
		int count;
		
		params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##jsrkdb' and type='U'");
		String cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			params.put("createsql", "drop table ##jsrkdb");
			armapper.createTableSql(params);}
		params.put("createsql", "select rkdh,rkxh into ##jsrkdb from rkdb_yl where 0=1");
		armapper.createTableSql(params);
		JsRkdbImp[] arr = null;
		if(params.get("recDate")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recDate").toString());
			arr = (JsRkdbImp[])JSONArray.toArray(jsonArray,JsRkdbImp.class);
			double rkdh,rkxh;
			for(JsRkdbImp obj:arr){
				rkdh = obj.getRkdh();
				rkxh = obj.getRkxh();
				String sql = "insert into ##jsrkdb values('"+rkdh+"',"+rkxh+");";
				params.put("sql",sql);
				String  result= purchaseDetailMapper.getStringFromSql(params);
			}
		}
	}
	//删除临时表
	public void deleteJsrkdb(Map<String,Object> params){
		mapper.deleteJsrkdb(params);
		mapper.deleteJsfydb(params);
	}
	public String beforeloadJsFydbImp(Map<String,Object> params){
		/*int count;
		params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##jsfydb' and type='U'");
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			params.put("createsql", "drop table ##jsfydb");
			armapper.createTableSql(params);}*/
		UUID uuid = UUID.randomUUID();
		String uuid1=uuid.toString().replace("-","");	
		String tablename = "jsfydb"+uuid1;
		params.put("createsql", "select fydh,fyxh into "+tablename+" from cgfyb where 0=1");
		armapper.createTableSql(params);
		Cost[] arr = null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (Cost[])JSONArray.toArray(jsonArray,Cost.class);
			double fydh,fyxh;
			String sql;
			for(Cost obj:arr){
				fydh = obj.getFydh();
				fyxh = obj.getFyxh();
				sql = "insert into "+tablename+" values('"+fydh+"',"+fyxh+");";
				params.put("sql",sql);
				String  result= purchaseDetailMapper.getStringFromSql(params);
			}
		}
		return tablename;
	}
	public void beforeloadFydbImp(Map<String,Object> params){
		String tablename = "";
		if(params.get("tbname")==null){
		UUID uuid = UUID.randomUUID();
		String uuid1=uuid.toString().replace("-","");	
		tablename = "jsfydb"+uuid1;
		params.put("createsql", "select fydh,fyxh into "+tablename+" from cgfyb where 0=1");
		armapper.createTableSql(params);
		}else{
			tablename = params.get("tbname").toString();
		}
		JsFydbImp[] arr = null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (JsFydbImp[])JSONArray.toArray(jsonArray,JsFydbImp.class);
			double fydh,fyxh;
			String sql;
			for(JsFydbImp obj:arr){
				fydh = obj.getFydh();
				fyxh = obj.getFyxh();
				sql = "insert into "+tablename+" values('"+fydh+"',"+fyxh+");";
				params.put("sql",sql);
				String  result= purchaseDetailMapper.getStringFromSql(params);
			}
		}
	}
	public List<JsFydbImp> getJsFydbImp(Map<String,Object> params){
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String bmqx="and (";
		List<String> bmbhList = mapper.getBmqx(pa);
		if(bmbhList.isEmpty()){
			return null;
		}
		for(String str:bmbhList){
			if(i==0){
				bmqx+="(cgfyb.hsbm='') or (left(cgfyb.hsbm,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				bmqx+=" or (left(cgfyb.hsbm,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		bmqx+=")";
		if(bmbhList.size()>0){
			params.put("bmqx", bmqx);
		}
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
		return mapper.getJsFydbImp(params);
	}
	//view_htbh
	public void addHtbh(Map<String,Object> params){
		mapper.addHtbh(params);
	}
	//view_glht
	public void addGlht(Map<String,Object> params){
		mapper.addGlht(params);
	}
	public void addRkdb(Map<String,Object> params){
		mapper.addRkdb(params);
	}
	public int getHtbhCount(Map<String,Object> params){
		return mapper.getHtbhCount(params);
	}
	public int getGlhtCount(Map<String,Object> params){
		return mapper.getGlhtCount(params);
	}
	public float getMaxfyxh(Map<String,Object> params){
		return mapper.getMaxfyxh(params);
	}
	public void updateRkdhy(Map<String,Object> params){
		 mapper.updateRkdhy(params);
	}
	public void updateCgfyb(Map<String,Object> params){
		mapper.updateCgfyb(params);
	}
	public void updateFzhm(Map<String,Object> params){
		mapper.updateFzhm(params);
	}
	public void updateFyFzhm(Map<String,Object> params){
		mapper.updateFyFzhm(params);
	}
	public void updateNotice(Notice[] arr) {
		for(Notice obj: arr) {
			mapper.updateNotice(obj);
		}
	}
	public void updateJsRkdbImp(JsRkdbImp[] arr) {
		for(JsRkdbImp obj: arr) {
			mapper.updateJsRkdbImp(obj);
		}
	}
	//是否已核销开票
	public int ifHxkp(Map<String,Object> params){
		return mapper.ifHxkp(params);
	}
	
	public void deleteNotice(Notice[] arr) {
		for(Notice obj: arr) {
			mapper.deleteNotice(obj);
			mapper.afterDelRk(obj);
			mapper.afterDelCg(obj);
		}
	}
	public void deleteJsRkdbImp(JsRkdbImp[] arr) {
		for(JsRkdbImp obj: arr) {
			mapper.deleteJsRkdbImp(obj);
		}
	}
	public void deleteRkd(CostBills[] arr) {
		for(CostBills obj: arr) {
			mapper.deleteRkd(obj);
		}
	}
	public float getMaxTzdh(Map<String,Object> params){
		return mapper.getMaxTzdh(params);
	}
	public void doLock(Map<String,Object> params){
		mapper.doLock(params);
	}
	public void doSend(Map<String,Object> params){
		mapper.doSend(params);
	}
	public void doArc(Map<String,Object> params){
		mapper.doArc(params);
	}
	public void doAllArc(Map<String,Object> params){
		mapper.doAllArc(params);
	}
	public int getYfbj(Map<String,Object> params){
	    return  mapper.getYfbj(params);	
	}
	public int getLlcount(Map<String,Object> params){
		return  mapper.getLlcount(params);	
	}
	public float getRkxhcf(Map<String,Object> params){
		return  mapper.getRkxhcf(params);	
	}
	public Float getKzdj(Map<String,Object> params){
		Float kzdj =  mapper.getKzdj(params);	
		if(kzdj==null){
			kzdj = 0.0f;
		}
		return kzdj;
	}
	public Float getKzdjTwo(Map<String,Object> params){
		Float kzdj =  mapper.getKzdjTwo(params);	
		if(kzdj==null){
			kzdj = 0.0f;
		}
		return kzdj;
	}
	public String getCpdj(Map<String,Object> params){
		JSONObject json=new JSONObject();
		Map<String, Object> ap = mapper.getCpdj(params);
		if(ap!=null){
			BigDecimal cgkj = (BigDecimal) ap.get("cgkj");
			BigDecimal cgdj = (BigDecimal) ap.get("cgdj");
		json.put("cgkj",cgkj);
		json.put("cgdj",cgdj);}
		else{
	    json.put("cgkj",0);
		json.put("cgdj",0);
		}
		return json.toString();
	}
	public String getCpdjTwo(Map<String,Object> params){
		JSONObject json=new JSONObject();
		Map<String,Object > ap = mapper.getCpdjTwo(params);
		if(ap!=null){
	    Object kj =  ap.get("cgkj");
	    Object dj =  ap.get("cgdj");
	    float cgkj=Float.parseFloat(kj.toString());
	    float cgdj=Float.parseFloat(dj.toString());
		json.put("cgkj",cgkj);
		json.put("cgdj",cgdj);
		}else{
	    json.put("cgkj",0);
		json.put("cgdj",0);	
		}
		return json.toString();
	}
	public Map<String,Object> getFzzbj(Map<String,Object> params){
		return mapper.getFzzbj(params);
	}
	 //检测代客销售明细跟成品采购合同必须一并对账
	public String UpdateCgfyb(Map<String,Object> params){
		String recordData=null;
		String recData=null;
		Cost arra[]=null;
		CostBills arrb[]=null;
		if(params.get("recData")!=null){
			recData=params.get("recData").toString();
		}
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recData);
		arra=(Cost [])JSONArray.toArray(jsonArray,Cost.class);
		JSONArray jsonArrayb=net.sf.json.JSONArray.fromObject(recordData);
		arrb=(CostBills [])JSONArray.toArray(jsonArrayb,CostBills.class);
		JSONObject json=new JSONObject();
		json.put("bool", true);
			mapper.DelRk(params);
			mapper.DelCg(params);
			for(CostBills ps:arrb){
				String ckbh = ps.getCkbh();
				int rkdh = ps.getRkdh();
				int rkxh = ps.getRkxh();
				params.put("ckbh", ckbh);
				params.put("rkdh", rkdh);
				params.put("rkxh", rkxh);
				mapper.updateRkdhy(params);
			}
			
			for(Cost ps:arra){
				double fydh = ps.getFydh();
				double fyxh = ps.getFyxh();
				params.put("fydh", fydh);
				params.put("bills_id", fydh);
				params.put("fyxh", fyxh);
				List<Exclusive> excList=userMapper.getExclusiveList(params);
				if(excList.size()>0){
					json.put("msg", "该通知单下的费用单:【"+(int)ps.getFydh()+"】正在被【"+excList.get(0).getU_name()+"】编辑,请在其他人编辑退出后重新保存......");
					json.put("bool", false);
					return json.toString();
				}
				mapper.updateCgfyb(params);
			}
		return json.toString();
	}
	
	public String Test(Map<String,Object> params){
		String recordData=null;
		CostBills arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(CostBills [])JSONArray.toArray(jsonArray,CostBills.class);
		JSONObject json=new JSONObject();
		json.put("bool", true);
		ArrayList<Integer> htbhz = new ArrayList<Integer>(); 
			for(CostBills ps:arr){
				int htbh = ps.getHtbh();
				htbhz.add(htbh);
			}
			for(CostBills ps:arr){
				int htbh = ps.getHtbh();
				int glht = ps.getGlht();
				int cgbh = ps.getCgbh();
				params.put("htbh",htbh);
				params.put("glht",glht);
				params.put("cgbh",cgbh);
				if(htbh!=0){
				 int cou = mapper.getHtbhCount(params);
				 if(cou>0){
					  json.put("bool", false);
					  json.put("msg", "合同【"+htbh+"】存在代客采计材料明细，请确认是否需要一并进行对账!");
				 }
				}
				if(glht!=0){
					if(!htbhz.contains(glht)){
						 json.put("bool", false);	
						 json.put("msg", "关联合同【"+glht+"】为代客采计材料明细，请确认是否需要对其成品采购合同一并进行对账!");
					}
				}
			}
		return json.toString();
	}
	public String Split(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
			Map<String, Float> ap = mapper.getTjdh(params);
	        Float tjdh  =  ap.get("tjdh");
	        Float tjxh = ap.get("tjxh");
	        params.put("tjdh",tjdh);
	        params.put("tjxh",tjxh);
	        float tjdhnew =  mapper.getTjdhnew(params);
	        params.put("tjdh_new",tjdhnew);
	        mapper.addcgjgtzmxb(params);
	        mapper.updatecgjgtzmxb(params);
	        mapper.updateCfcgjgtzmxb(params);
		return json.toString();
	}
	
	public String Merge(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
			Map<String, Float> ap = mapper.getThjeOne(params);
			Map<String, Float> bp = mapper.getThjeTwo(params);
			Float ss_rkje  = ap.get("ss_rkje");
			Float ss_csje  = ap.get("ss_csje");
			Float ss_rkje_cf  = bp.get("ss_rkje");
			Float ss_csje_cf  = bp.get("ss_csje");
			Float ss_wbje_cf  = bp.get("ss_wbje");
			ss_rkje +=ss_rkje_cf;
			ss_csje +=ss_csje_cf;
			ss_wbje_cf += ss_wbje_cf;
			params.put("ss_rkje",ss_rkje);
			params.put("ss_csje",ss_csje);
			params.put("ss_wbje_cf",ss_wbje_cf);
			mapper.updateThje(params);
			mapper.delRkjgmx(params);
		return json.toString();
	}
	public List<JsRkdbImp> getRkImpSum(Map<String,Object> params){
		int count;
		params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##rkimpsum' and type='U'");
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			params.put("createsql", "drop table ##rkimpsum");
			armapper.createTableSql(params);}
		mapper.getRkImpSum(params);
		List<JsRkdbImp> pod = mapper.getSumRkd(params);
		if(pod.size()>0&&pod.get(0)!=null){
			return pod;
		}else{
			pod=new ArrayList<JsRkdbImp>();
			return pod;
		}
	}
	public List<JsFydbImp> getFydImpSum(Map<String,Object> params){
		List<JsFydbImp> pod=mapper.getFydImpSum(params);
		if(pod.size()>0&&pod.get(0)!=null){
			return pod;
		}else{
			pod=new ArrayList<JsFydbImp>();
			return pod;
		}
	}
	public List<ArrivalRegister> getArriveList(Map<String,Object> params){
		return mapper.getArriveList(params);
	}
}
