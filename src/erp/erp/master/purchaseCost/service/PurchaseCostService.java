package erp.erp.master.purchaseCost.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.util.JSONUtils;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.FilterModel;
import erp.common.TreeModel;
import erp.erp.PayApply.data.CheckSFMapper;
import erp.erp.PurchaseClearing.data.NoticeMapper;
import erp.erp.arrivalRegister.data.ArrivalRegisterMapper;
import erp.erp.master.purchaseCost.data.AbnormalImpMapper;
import erp.erp.master.purchaseCost.data.CallinImpMapper;
import erp.erp.master.purchaseCost.data.LoadingCostsImpMapper;
import erp.erp.master.purchaseCost.data.MaterialEntrustImpMapper;
import erp.erp.master.purchaseCost.data.OutMaterialMapper;
import erp.erp.master.purchaseCost.data.PatentImpMapper;
import erp.erp.master.purchaseCost.data.ProductEntrustImpMapper;
import erp.erp.master.purchaseCost.data.PurchaseCostMapper;
import erp.erp.master.purchaseCost.data.SaleTypeMapper;
import erp.erp.master.purchaseCost.data.SendImpMapper;
import erp.erp.master.purchaseCost.data.SendoutImpMapper;
import erp.erp.master.purchaseCost.data.TaskImpMapper;
import erp.erp.master.purchaseCost.data.TransportCostImpMapper;
import erp.erp.master.purchaseCost.model.AbnormalImp;
import erp.erp.master.purchaseCost.model.BenefitDept;
import erp.erp.master.purchaseCost.model.CallinImp;
import erp.erp.master.purchaseCost.model.LoadingCostsImp;
import erp.erp.master.purchaseCost.model.MainCost;
import erp.erp.master.purchaseCost.model.MaterialEntrustImp;
import erp.erp.master.purchaseCost.model.OutMaterial;
import erp.erp.master.purchaseCost.model.PatentImp;
import erp.erp.master.purchaseCost.model.PayCategory;
import erp.erp.master.purchaseCost.model.Payfs;
import erp.erp.master.purchaseCost.model.ProductEntrustImp;
import erp.erp.master.purchaseCost.model.PurchaseCost;
import erp.erp.master.purchaseCost.model.SaleType;
import erp.erp.master.purchaseCost.model.SendImp;
import erp.erp.master.purchaseCost.model.SendoutImp;
import erp.erp.master.purchaseCost.model.TaskImp;
import erp.erp.master.purchaseCost.model.TransportCostImp;
import erp.erp.master.purchaseCost.model.purchaseCostSum;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.util.MyJsonUtil;
import erp.util.WebUtil;
import erp.web.data.UsersMapper;
import erp.web.model.Exclusive;


@Service
public class PurchaseCostService {
	@Autowired
	private PurchaseCostMapper mapper;
	@Autowired
	private OutMaterialMapper ommapper;
	@Autowired
	private NoticeMapper dmapper;
	@Autowired
	private SendImpMapper sendimpmapper;
	@Autowired
	private AbnormalImpMapper abnormalimpmapper;
	@Autowired
	private CallinImpMapper callinimpmapper;
	@Autowired
	private SendoutImpMapper sendoutimpmapper;
	@Autowired
	private MaterialEntrustImpMapper materialentrustimpMapper;
	@Autowired
	private ProductEntrustImpMapper productentrustimpmapper;
	@Autowired
	private TransportCostImpMapper transportcostimpMapper;
	@Autowired
	private LoadingCostsImpMapper loadingcostsimpMapper;
	@Autowired
	private TaskImpMapper taskimpmapper;
	@Autowired
    private PatentImpMapper patentimpmapper;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;
	@Autowired
	private ArrivalRegisterMapper armapper;
	//销售类别
	@Autowired
	private SaleTypeMapper stMapper;
	@Autowired
	private CheckSFMapper checkSFMapper;
	
	private UsersMapper userMapper=WebUtil.getAppCtx("tps").getBean(UsersMapper.class);
	public List<PurchaseCost> getPurchaseCostList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String bmqx="and (";
		List<String> bmbhList = dmapper.getBmqx(pa);
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
		return mapper.getPurchaseCostList(params);
	}
	public List<MainCost> getMainCostList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String bmqx="and (";
		List<String> bmbhList = dmapper.getBmqx(pa);
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
		return mapper.getMainCost(params);
	}
	/**
	 * 加载主界面前创建空的临时表#khxx ##yfbj
	 * @author dc
	 * @date 2016-04-25
	 */
	public void beforeLoadMain(Map<String,Object> params){
		int count;
		params.put("sql","select COUNT(*) from   tempdb..sysobjects where name='##khxx' and type='U'");
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			params.put("createsql", "drop table ##khxx");
			armapper.createTableSql(params);}
		String sql = " SELECT ";
		sql+= " 	cgfyb.fydh,cgfyb.fyxh,";
		sql+= " 	case when isnull(jhmx_ddxxb.khbh,'') !='' then jhmx_ddxxb.khbh else";
		sql+= "	case when  isnull(jhmxb.zjbh,0)<>0 then  c.khbh else '' end  end  as khbh,";
		sql+= "	case when isnull(khxxb.khmc,'') !='' then khxxb.khmc else ";
		sql+= "	case when  isnull(jhmxb.zjbh,0)<>0 then  d.khmc else '' end  end  as khmc";
		sql+= " into ##khxx from cgfyb with (nolock)";
		sql+= " left outer join jhmxb with(nolock) on jhmxb.jhbh=cgfyb.jhbh and jhmxb.jhxh=cgfyb.jhxh";
		sql+= " left outer join jhmxb a with (nolock) on a.jhbh=jhmxb.zjbh and a.jhxh=jhmxb.zjxh and jhmxb.zjbh!=0";
		sql+= " left outer join jhmx_ddxxb with (nolock) on jhmx_ddxxb.jhbh=jhmxb.jhbh and jhmx_ddxxb.jhxh=jhmxb.jhxh";
		sql+= " left outer join khxxb with (nolock) on khxxb.khbh=jhmx_ddxxb.khbh";
		sql+= " left outer join jhmx_ddxxb c with (nolock) on c.jhbh=a.jhbh and c.jhxh=a.jhxh";
		sql+= " left outer join khxxb d with (nolock) on d.khbh=c.khbh";
		sql+= " where 1=0";
		params.put("createsql",sql);
		armapper.createTableSql(params);
		
		params.put("sql","select COUNT(*) from   tempdb..sysobjects where name='##yfbj' and type='U'");
		cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			params.put("createsql", "drop table ##yfbj");
		armapper.createTableSql(params);}
		sql = " SELECT	";
		sql+=" 	cgfyb.fydh,";
		sql+=" 	cgfyb.fyxh,";
		sql+="	case when (select count(*) from fksqspfyb left outer join fksqspb with (nolock) on fksqspb.sqbh=fksqspfyb.sqbh where fksqspb.tjbj=1 and fksqspfyb.fydh=cgfyb.fydh and (fksqspfyb.fyxh=cgfyb.fyxh or fksqspfyb.fyxh=cgfyb.cfxh))>0 then 1 else 0 end as yfbj";
		sql+=" into ##yfbj from cgfyb with (nolock)";
		sql+=" where 1=0";
		params.put("createsql",sql);
		armapper.createTableSql(params);
	}  
	
	public List<Payfs> getPayfs(Map<String,Object> params){
		return mapper.getPayfs(params);
	}
	public void addPurchaseCost(PurchaseCost[] arr) {
		for(PurchaseCost obj: arr) {
			mapper.addPurchaseCost(obj);
		}
	}
	public void addPayfs(Payfs[] arr) {
		for(Payfs obj: arr) {
			mapper.addPayfs(obj);
		}
	}
	public void updatePurchaseCost(PurchaseCost[] arr) {
		for(PurchaseCost obj: arr) {
			mapper.updatePurchaseCost(obj);
		}
	}
	public void updatePayfs(Map<String,Object> params) {
		String fydh = params.get("fydh").toString();
		String fkfs = params.get("fkfs").toString();
		String ztdw = params.get("ztdw").toString();
		params.put("fydh", fydh);
		params.put("fkfs", fkfs);
		params.put("ztdw", ztdw);
		mapper.updatePayfs(params);
	}
	/**
	 * 
	* @Title: deleMainPurchaseCost
	* @Description: TODO(主界面删除)
	* @param @param params    设定文件
	* @return void    返回类型
	* @throws
	 */
	public void deleMainPurchaseCost(Map<String,Object> params){
		mapper.deletePurchaseCost(params);
		mapper.deleteCgfydzb(params);
		mapper.deleteCgfy_fjb(params);
		mapper.deleteCgfyb_fkb(params);
		mapper.deleteSplc_spjlb(params);
	}
	/**
	 * 
	* @Title: deletePurchaseCost
	* @Description: TODO(编辑界面删除)
	* @param @param arr    设定文件
	* @return void    返回类型
	* @throws
	 */
	public void deletePurchaseCost(PurchaseCost[] arr) {
		Map<String,Object> params = new HashMap<String,Object>();
		for(PurchaseCost obj: arr) {
			double fydh  = obj.getFydh();
			double fyxh  = obj.getFyxh();
			params.put("fydh", fydh);
			params.put("fyxh", fyxh);
			mapper.deletePurchaseCost(params);
			/*mapper.deleteCgfydzb(params);
			mapper.deleteCgfy_fjb(params);
			mapper.deleteCgfyb_fkb(params);
			mapper.deleteSplc_spjlb(params);*/
		}
	}
	public String getPurchaseCostOne(Map<String,Object> params){
		return mapper.getPurchaseCostOne(params);
		
	}
	public void updateStatus(Map<String,Object> params){
		String idarrayString=params.get("idarray").toString();
		String[] idarray= idarrayString.split(",");
		for(int i=0;i<idarray.length;i++){
			params.put("fydh", idarray[i]);
			mapper.updateStatus(params);
		}
	}
	public void doAppro(Map<String,Object> params){
		String idarrayString=params.get("idarray").toString();
		String[] idarray= idarrayString.split(",");
		for(int i=0;i<idarray.length;i++){
			params.put("fydh", idarray[i]);
			mapper.doAppro(params);
		}
	}
	public List<PayCategory> getPayCategoryList(Map<String,Object> params){
		return mapper.getPayCategoryList(params);
	}
	public List<BenefitDept> getBenefitDeptList(Map<String,Object> params){
		return mapper.getBenefitDeptList(params);
	}
	
	/**
	*检查标记是否一致
	*/
	public String checkStatusSame(Map<String,Object> params){
		JSONObject json = new JSONObject();
		String idarrayString=params.get("idarray").toString();
		String statusarrayString=params.get("statusarray").toString();
		String[] idarray= idarrayString.split(",");
		String[] statusarray= statusarrayString.split(",");
		int result=1;
		for(int i=0;i<idarray.length;i++){
			params.put("fydh",idarray[i]);
			params.put("tjbj", statusarray[i]);
			int count=mapper.checkStatusSame(params);
			if(count==0){
				result=0;
				break;
			}
		}
		json.put("result", result);
		json.put("success", true);
		return json.toString();
	}
	/**
	*检查是否已被审批
	*/
	public String hasAppro(Map<String,Object> params){
		JSONObject json = new JSONObject();
		String idarrayString=params.get("idarray").toString();
		String[] idarray= idarrayString.split(",");
		int result=0;
		for(int i=0;i<idarray.length;i++){
			params.put("fydh",idarray[i]);
			int count=mapper.hasAppro(params);
			if(count>0){
				result=Integer.valueOf(idarray[i]);
				break;
			}
		}
		json.put("result", result);
		json.put("success", true);
		return json.toString();
	}
	/**
	 * 刷新递送单的已导金额
	 */
	public void  refreshImpCost(Map<String,Object> params){
		List<String> list = mapper.getJlbhList(params);
		double fyje;
		for(String str :list){
			params.put("jlbh", str);
			fyje = mapper.getSumFyje(params);
			params.put("fyje", fyje);
			mapper.updateYdfy(params);
		}
	} 
	/**
	*检查结账状态
	*/
	public String ifPay(Map<String,Object> params) {
		String year = params.get("year").toString();
		String month = params.get("month").toString();
		params.put("year", year);
		params.put("month", month);
		String result=mapper.ifPay(params);
		return result;
	}
	/**
	 * 删除前检查是否已做费用申请单
	 * */
	public String beforeDelete(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String fydh =  params.get("fydh").toString(); 
	    int result = mapper.ifFksqd(params);
	    if(result>0){
	    	json.put("msg", "【"+fydh+"】号费用单有明细已做预付调整单，不能删除!");
			json.put("bool", false);
			return json.toString();
	    }
	    
	    List<Exclusive> excList=userMapper.getExclusiveList(params);
		if(excList.size()>0){
			json.put("msg", "该笔单据【"+excList.get(0).getU_name()+"】正在编辑,请稍候重试！");
			json.put("bool", false);
			return json.toString();
		}
	    return json.toString();
	}
	public int getRwbj(Map<String,Object> params){
		String zflb = params.get("zflb").toString();
		params.put("zflb", zflb);
	    int result = Integer.parseInt(mapper.getRwbj(params));
	    return result;		
	}
	public double getRwsl(Map<String,Object> params){
		String rwdh = params.get("rwdh").toString();
		String rwxh = params.get("rwxh").toString();
		params.put("sql"," select rwsl  from scrwdmxb  with (nolock) where rwdh='"+rwdh+"' and rwxh='"+rwxh+"'; ");
		String sqjeStr=purchaseDetailMapper.getStringFromSql(params);
		if(sqjeStr==null){
			sqjeStr="0";
		}
		double result = Double.parseDouble(sqjeStr);
		return result;		
	}
	public String getWbbh(Map<String,Object> params){
		String csbh = params.get("csbh").toString();
		params.put("csbh", csbh);
		String result = mapper.getWbbh(params);
		return result;		
	}
	public double getDsfy(Map<String,Object> params){
		int jlbh =  Integer.parseInt((String) params.get("jlbh"));
		params.put("jlbh", jlbh);
		double result = Double.parseDouble(mapper.getDsfy(params));
		return result;
	
	}
	public double getYdfy(Map<String,Object> params){
		int jlbh =  Integer.parseInt((String) params.get("jlbh"));
		String fydh = params.get("fydh").toString();
		params.put("jlbh", jlbh);
		params.put("fydh", fydh);
		double result=0;
		String res = mapper.getYdfy(params);
		if(res!=null){		
		 result= Double.parseDouble(mapper.getYdfy(params));
		 }
		return result;
	
	}
	public Integer getYdsl(Map<String,Object> params){
		String ckbh = params.get("ckbh").toString();
		String dbdh = params.get("dbdh").toString();
		String dbxh = params.get("dbxh").toString();
		String fydh = params.get("fydh").toString();
		params.put("ckbh", ckbh);
		params.put("dbdh", dbdh);
		params.put("dbxh", dbxh);
		params.put("fydh", fydh);
		Integer result = mapper.getYdsl(params);
		return result;		
	}
	
/*	public int getRwsl(Map<String,Object> params){
		String csbh = params.get("csbh").toString();
		params.put("csbh", csbh);
		int result = mapper.getWbbh(params);
		return result;		
	}*/
	/**
	* @Description: 获取支付类别树
	* @param params node 即支付类别编号
	* @date 2016-2-19 
	*/
	public List<TreeModel> getAllPayCategoryTree(Map<String,Object> params){
	    List<TreeModel> stlist=new ArrayList<TreeModel>();
	    int lbjc=1;
	    int parentId=0;
	    List<PayCategory> list = mapper.getPayCategoryList(params);
	    if(params.get("node")!=null){
	    	lbjc=(params.get("node").toString().length()/2)+1;
	        parentId = Integer.valueOf(String.valueOf(params.get("node")));
	    } 
	        for(PayCategory sa:list){
	        	if(sa.getLbjc()==lbjc){
	        		TreeModel st = new TreeModel();
	        		st.setNodeId(Integer.valueOf(sa.getLbbh().trim()));
	        		st.setParentId(parentId);
	        		st.setText(sa.getLbmc());
	        		if(!sa.isMjbz()){
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
	/**
	* @Description: 获取受益部门树
	* @param params node 即部门编号
	* @date 2016-2-19 
	*/
	public List<TreeModel> getAllBenefitDeptTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		int bmjc=1;
		int parentId=0;
		List<BenefitDept> list=mapper.getBenefitDeptList(params);
		if(params.get("node")!=null){
			bmjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(BenefitDept sa:list) 
		{
			if(sa.getBmjc()==bmjc){
				TreeModel st=new TreeModel();
				st.setNodeId(Integer.valueOf(sa.getBmbh()));
				st.setParentId(parentId);
				st.setText(sa.getBmmc());
				if (!sa.isMjbz()){
					if(sa.getBmbh().length()<2){
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
	/**
	 * 提交前验证
	 * @throws ParseException 
	 * */
	public String getBeforeCommit(Map<String,Object> params) throws ParseException{
		JSONObject json=new JSONObject();
		json.put("bool", true);
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
			MainCost [] arr=null;
			if(params.get("recordData")!=null ){
				JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			    arr = (MainCost [])JSONArray.toArray(jsonArray,MainCost.class);
			   for(MainCost  obj:arr){
				   params.put("fydh", obj.getFydh());
				   params.put("fyrq", obj.getFyrq());
				   params.put("cglx", obj.getCglx());
				   params.put("hsbm", obj.getHsbm());
				   double mfydj=0;double ykzdj=0;
				   Date fyrq = obj.getFyrq();
				   String hsbm = obj.getHsbm();
				   if(obj.getTjbj()==0){
				   if(mapper.CompeletePrice(params)>0){
					   String Maxfydj = mapper.getMaxfydj(params);
					   String yskzdj = mapper.getyskzdj(params);
					   if(Maxfydj!=null){
						   mfydj = Double.parseDouble(Maxfydj);
					   }
					   if(yskzdj!=null){
						   ykzdj = Double.parseDouble(yskzdj);
					   }
					   if(mfydj>ykzdj){
						   json.put("bool", false);
						   json.put("msg", "费用单的费用单价有大于预算控价，不能提交！");
					   }
				   }
				   Map<String,Object> map =  mapper.getJidu(params);
				   int month = (Integer) map.get("month");
				   int year = (Integer) map.get("year");
				   Calendar cal = Calendar.getInstance(); 
				   cal.setTime(fyrq);
				   String nyear = String.valueOf(cal.get(Calendar.YEAR));
				   String oyear = String.valueOf(cal.get(Calendar.YEAR)-1);
				   StringBuffer nowyear = new StringBuffer(nyear);
				   StringBuffer onowyear = new StringBuffer(oyear);
				   StringBuffer qsrq = null;
				   StringBuffer jzrq = null;
				   if(month>7){
					 qsrq = nowyear.append('-').append("07").append("-01 00:00:00");
				    year+=year;
				     jzrq = nowyear.append('-').append("06").append("-30 23:59:59");
					}else{
					 qsrq = onowyear.append('-').append("07").append("-01 00:00:00");
					 jzrq = nowyear.append('-').append("06").append("-30 23:59:59");
					}
				   SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				   Date zqsrq = sdf.parse(qsrq.toString());
				    Date zjzrq = sdf.parse(jzrq.toString()); 
				    params.put("year", year);
				    params.put("qsrq", zqsrq);
				    params.put("jzrq", zjzrq);
				    String sql = "select count(*) from  sybnysb_mxb  ";
				    sql+= "left outer join sybnysb on sybnysb.jlxh_zj =sybnysb_mxb.jlxh_zj and sybnysb.hsbm=sybnysb_mxb.hsbm and sybnysb.nf=sybnysb_mxb.nf ";
				    sql+= "where sybnysb.nf= "+year+" and qjbj =1 and sybnysb_mxb.kzbj =1 and sybnysb_mxb.cglx = 0  and  ywdx = '采购费用'and left(sybnysb_mxb.hsbm,4) =left("+hsbm+",4); ";
				    params.put("sql",sql);
					String Str=purchaseDetailMapper.getStringFromSql(params);
					int ll_count ;
					if(Str==null){
						ll_count=0;
					}else{
						ll_count = Integer.parseInt(Str);
					}
					if(ll_count>0){
				    double zffyhz = 0;
				    String s = mapper.getZffyhz(params);
				    if(s!=null){
				    	zffyhz = Double.parseDouble(s);
				    }else{
				    	zffyhz=0;
				    }
				    double htze = 0;
				    String sc= mapper.getHtze(params);
				    if(sc!=null){
				    	htze = Double.parseDouble(sc);
				    }else{
				    	htze=0;
				    }
				    double ldzffy = 0;
				    String sd= mapper.getfyjeSum(params);
				    if(sd!=null){
				    	ldzffy = Double.parseDouble(sd);
				    }else{
				    	ldzffy = 0;
				    }
				    double ldysje = 0;
				    if(mapper.ifhaveYsje(params)>0){
				    String sf = mapper.getYsje(params);
				    if(sf!=null){
				    	ldysje = Double.parseDouble(sf);
				    }
				    }
				    int  tfydh = obj.getFydh();
				    if(ldysje -zffyhz -ldzffy-htze <0){
				    	json.put("bool", false);
						json.put("msg", tfydh+"号费用单核算部门，所在事业部的费用金额已超过经营季预算金额!");
				    }
			      }}
					 int  tfydh = obj.getFydh(); 
					 int rspbj;
					 String str = mapper.getRealSpbj(params);
					 if(str ==null){
						 rspbj=0;
					 }else{
						 rspbj = Integer.parseInt(str);
					 }
					 if(rspbj!=0&&obj.getTjbj()==1){
						 json.put("bool", false);
					     json.put("msg", tfydh+"号单据已有领导审批，不能取消提交！");
					   }
			   }
			 }
		return json.toString();
	}
	/**
	 * f_insert_fwoa
	 * 提交WOA
	 * */
	public String InsertFwoa(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String f_tjbj = (String) params.get("tjbj");
		String czy_gh = (String) params.get("czy_gh");
		String f_spczy = (String) params.get("f_spczy");
		String fydh = (String) params.get("fydh");
		if(f_tjbj.trim().equals("1")){
			String sql = "select (isnull(max(id),0)+1) from t_inf_purchasefee_hdr;";
			params.put("sql", sql);
			String Str=purchaseDetailMapper.getStringFromSql(params);
			int ll_id;
			if(Str==null){
				ll_id=0;
			}else{
				ll_id = Integer.parseInt(Str);
			}
		    sql = "select gzgw from czyb where czy_gh = '"+czy_gh+"';";
		    params.put("sql", sql);
		    String ls_gzgw_tj = purchaseDetailMapper.getStringFromSql(params);
		    sql = "select czy_xm from czyb where czy_gh = '"+czy_gh+"';";
		    params.put("sql", sql);
		    String ls_gzgw_tj_xm = purchaseDetailMapper.getStringFromSql(params);
		    sql = "select gzgw from czyb where czy_gh = '"+f_spczy+"';";
		    params.put("sql", sql);
		    String ls_gzgw_tjdx = purchaseDetailMapper.getStringFromSql(params);
		    sql = "select czy_xm from czyb where czy_gh = '"+f_spczy+"';";
		    params.put("sql", sql);
		    String ls_gzgw_tjdx_xm = purchaseDetailMapper.getStringFromSql(params);
		    if(!ls_gzgw_tjdx.trim().equals("") && ls_gzgw_tjdx!=null){
		    	int num = Integer.parseInt(ls_gzgw_tjdx.trim());
		    	ls_gzgw_tjdx = String.format("%05d",num);
		    	int no = Integer.parseInt(ls_gzgw_tj.trim());
		    	ls_gzgw_tj = String.format("%05d", no);
		        sql = "insert into t_inf_purchasefee_hdr ";
		    	sql +="(id,requestid,ftriggerflag,stateflag,opt_id,opt_date,fydh,fyrq,ftms,fylx,czy,hsbm,csmc,fysl,fyje,csje,tjdx_id,xkxj,splx) ";
		    	sql +=" select "+ll_id+",0,0,-1,'"+ls_gzgw_tj.trim()+"',i.tjsj,i.fydh,i.fyrq,i.ftms,i.fylx,i.czym,h.bmmc,";
		    	sql +="	c.csmc,sum(i.fysl),sum(i.fyje),sum(csje) ,'"+ls_gzgw_tjdx+"',xkxj,'"+ls_gzgw_tj_xm.trim()+"' + '-->'+'"+ls_gzgw_tjdx_xm.trim()+"'";
		    	sql +="	FROM cgfyb i";
		    	sql +="	left outer join hsbmb h on h.bmbh=hsbm";
		    	sql +="	left outer join csxxb c on c.csbh=i.csbh";
		    	sql +="	where i.fydh = '"+fydh+"' ";
		    	sql +="	group by i.tjsj,i.fydh,i.fyrq,i.ftms,i.fylx,i.czym,h.bmmc,c.csmc,xkxj;";
		    	params.put("sql", sql);
		    	purchaseDetailMapper.getStringFromSql(params);
		    }
		    sql = "select count(*)  from cgfyb i  left outer join csxxb c on c.csbh=i.csbh ";
		    sql+= "left outer join clfbx_fsbmb f on f.bmbh=i.fsbm where i.fydh = '"+fydh+"';";
		    params.put("sql", sql);
		    Str=purchaseDetailMapper.getStringFromSql(params);
		    int ll_count;
			if(Str==null){
				ll_count=0;
			}else{
				ll_count = Integer.parseInt(Str);
			}
			if(ll_count<= 50){
			sql = "insert into t_inf_purchasefee_dtl( ";
			sql+=" mainid,fyxh,fysl,fydj";
			sql+=",fyje,zzsl,csdj,csje";
			sql+=",zzse,csmc,fyzy,jhbh,scdh";
			sql+=",htbh,hsdh,tzdh,fplb,fphm";
			sql+=",fylb,sybm,wbmc,";
			sql+="wbhl,wbje,bzsm,wbdj)";
			sql+="select "+ll_id+",fyxh,fysl,fydj,fyje,zzsl,csdj,csje,fyje-csje,c.csmc,";
			sql+="fyzy,i.jhbh,jhbz,htbh,hsdh,tzdh,fplb,fphm,fylb,f.bmmc ,isnull(wbmcb.wbmc,'RMB'),wbhl,wbje,i.bzsm,case when fysl=0 then 0 else round(wbje/ fysl,6) end ";
			sql+="from cgfyb i ";
			sql+=" left outer join csxxb c on c.csbh=i.csbh ";
			sql+=" left outer join clfbx_fsbmb f on f.bmbh=i.fsbm ";
			sql+=" left outer join jhmxb with (nolock) on jhmxb.jhbh=i.jhbh and jhmxb.jhxh=i.jhxh ";
			sql+=" left outer join wbmcb with (nolock) on wbmcb .wbbh  = i.wbbh ";
			sql+=" where i.fydh = '"+fydh+"';";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);}
		}else{
			String sql = "delete from  t_inf_purchasefee_dtl  where exists (select * From t_inf_purchasefee_hdr  ";
			sql+="where  fydh = '"+fydh+"' and spbj = 0 and t_inf_purchasefee_hdr.id =t_inf_purchasefee_dtl.mainid );";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);
			sql = "select (isnull(max(id),0)) from t_inf_purchasefee_hdr where fydh = '"+fydh+"';";
			params.put("sql", sql);
			String Str=purchaseDetailMapper.getStringFromSql(params);
		    int ll_id;
			if(Str==null){
				ll_id=0;
			}else{
				ll_id = Integer.parseInt(Str);
			}
			sql = "select requestid  from t_inf_purchasefee_hdr where id = "+ll_id+";";
			params.put("sql", sql);
			Str=purchaseDetailMapper.getStringFromSql(params);
		    int ll_requestid;
			if(Str==null){
				ll_requestid=0;
			}else{
				ll_requestid = Integer.parseInt(Str);
			}
			checkSFMapper.update_oainfo(ll_requestid);
			/*sql = "update view_workflow_requestbase set laststatus=status,status='撤销',currentstatus=1 where requestid= "+ll_requestid+";";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);
			sql = "delete view_workflow_currentoperator where requestid = "+ll_requestid+"; ";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);
			sql = "delete view_workflow_form where requestid = "+ll_requestid+";";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);
			sql = "delete view_workflow_requestLog where requestid = "+ll_requestid+";";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);
			sql = "delete view_workflow_requestViewLog where id = "+ll_requestid+";";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);
			sql = "delete view_workflow_requestbase where requestid = "+ll_requestid+";";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);*/
			sql = "delete from  t_inf_purchasefee_hdr  where  fydh = '"+fydh+"' and spbj = 0;";
			params.put("sql", sql);
			purchaseDetailMapper.getStringFromSql(params);
		 }
		
		return json.toString();
	}
	//保存前验证
	public String CheckBeforeSave(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		PurchaseCost[] arr = null;
		purchaseCostSum[] sumarr = null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (PurchaseCost[])JSONArray.toArray(jsonArray,PurchaseCost.class);
		}
		if(params.get("sumData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("sumData").toString());
			sumarr = (purchaseCostSum[])JSONArray.toArray(jsonArray,purchaseCostSum.class);
		}
		String ls_zflb,ls_cybh,ls_csbh,s_ckbh,sql,ls_fsbm,s_fylx,s_ftms = null;
		double ld_fydj,ld_csdj,ld_fyje,s_rwsl,s_ystj,s_ydsl,ld_wbje;
		double s_rwdh;
		double s_fyje_hj = 0;
		double s_rwxh,s_dbdh,s_dbxh,s_fysl,s_dsfy,s_ydfy,ls_jlbh;
		int fyxh,fydh;
		int fcount;
		params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##csbh' and type='U'");
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			fcount=0;
		}else{
			fcount=Integer.parseInt(cStr);
		}
		if(fcount>0){
			params.put("createsql", "drop table ##csbh");
			armapper.createTableSql(params);}
		params.put("createsql", "select wxdh,csbh into ##csbh from cgfyb with (nolock)  where 0=1");
		armapper.createTableSql(params);
			for(PurchaseCost obj:arr){
				ls_jlbh = obj.getJlbh();
				s_fylx = obj.getFylx();
				ls_zflb = obj.getZflb();
				ls_fsbm = obj.getFsbm();
				ld_fydj = obj.getFydj();
				ld_csdj = obj.getCsdj();
				ls_cybh = obj.getCybh();
				ld_fyje = obj.getFyje();
				ld_wbje = obj.getWbje();
				ls_csbh = obj.getCsbh();
				s_rwdh = obj.getWxdh();
				s_rwxh = obj.getWxxh();
				s_rwsl = obj.getFysl();
				s_ckbh = obj.getCkbh();
				s_dbdh = obj.getDbdh();
				s_dbxh = obj.getDbxh();
				s_fysl = obj.getFysl();
				s_ystj = obj.getYstj();
				s_ftms = obj.getFtms();
				fyxh = obj.getFyxh();
				fydh = obj.getFydh();
				s_fyje_hj += ld_fyje;
				if(ls_csbh.trim().equals("") || ls_csbh==null){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单供应厂商为空！");
					return json.toString();
				}else{
				 sql = "insert ##csbh (wxdh,csbh) values ("+s_rwdh+","+ls_csbh+");";
				 params.put("sql",sql);
				 purchaseDetailMapper.getStringFromSql(params);
				}
				if( ld_fydj < 0 ){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的含税单价不能小于0！");
					return json.toString();
				}
				if(ld_fydj == 0 && ld_wbje!=0){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单有外币金额，本币单价不能为0！");
					return json.toString();
				}
				if( ld_csdj < 0 ){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的除税单价不能小于0！");
					return json.toString();
				}
				if(ls_zflb.trim().equals("") || ls_zflb==null){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的支付类别不能为空!");
					return json.toString();
				}
				if( ls_fsbm.trim().equals("") || ls_fsbm==null){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的受益部门不能为空!");
					return json.toString();
				}
				params.put("lbbh", ls_zflb);
				int s_rwbj;
				String count = mapper.getRwbj(params);
				if( count ==null){
					s_rwbj =0;
				}else{
					s_rwbj = Integer.parseInt(count);
				}
				if( s_rwbj==1 && s_rwdh==0){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的支付类别有任务标记,任务号不能为空!");
					return json.toString();
				}
				if(!ls_cybh.trim().equals("") && s_fylx.trim().equals("储运费用")){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的费用类型与所选明细不一致!");
					return json.toString();
				}
				if(ls_csbh.trim().equals("") || ls_csbh==null){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的供应厂商不能为空!");
					return json.toString();
				}
				params.put("fydh",fydh);
				params.put("csbh",ls_csbh);
				String wbbh = mapper.getWbbh(params);
				if((!wbbh.trim().equals("") && wbbh !=null) && ld_wbje==0){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的厂商是外币厂商,外币金额不能为0!");
					return json.toString();
				}
				if((wbbh.trim().equals("") || wbbh ==null) && ld_fyje==0){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单的厂商是本币厂商,含税金额不能为0!");
					return json.toString();
				}
				params.put("rwdh", s_rwdh);
				params.put("rwxh", s_rwxh);
				params.put("sql"," select rwsl  from scrwdmxb  with (nolock) where rwdh='"+s_rwdh+"' and rwxh='"+s_rwxh+"'; ");
				String sqjeStr=purchaseDetailMapper.getStringFromSql(params);
				if(sqjeStr==null){
					sqjeStr="0";
				}
				double ld_rwsl;
				ld_rwsl= Double.parseDouble(sqjeStr);
				if(s_rwsl>ld_rwsl && s_rwdh!=0){
					json.put("bool", false);
					json.put("msg", fyxh+"号费用单电脑任务数量大于任务单任务数量!");
					return json.toString();
				}
				if(ls_jlbh!=0){
					params.put("jlbh",ls_jlbh);
					String s_d = mapper.getDsfy(params);
					if(s_d!=null){
						s_dsfy = Double.parseDouble(s_d);
					}else{
						s_dsfy = 0;
					}
					String s_y = mapper.getYdfy(params);
					if(s_y!=null){
						s_ydfy = Double.parseDouble(s_y);
					}else{
						s_ydfy = 0;
					}
					if(ld_fyje > s_dsfy - s_ydfy){
						json.put("bool", false);
						json.put("msg", fyxh+"号费用单的采购结算费用不能大于未导费用!");
						return json.toString();
					}
				}
				if(!s_ckbh.trim().equals("") && s_ckbh!=null){
					params.put("ckbh",s_ckbh);
					params.put("dbdh",s_dbdh);
					params.put("dbxh",s_dbxh);
					s_ydsl  = mapper.getYdsl(params);
					if(s_fysl+s_ydsl>s_ystj){
						json.put("bool", false);
						json.put("msg", fyxh+"号费用单的调拨导入数量大于调拨单未导体积!");
						return json.toString();
					}
				}
			}
			double s_xmje_hz,s_xmje;
			s_xmje = 0;
			s_xmje_hz = 0;
			for( purchaseCostSum obj: sumarr){
				s_xmje = obj.getFyje();
				s_xmje_hz += s_xmje;
			}
			if(s_ftms.trim().equals("分摊模式")){
				if(Math.round(s_fyje_hj*100)/100.00!=Math.round(s_xmje_hz*100)/100.00){
					json.put("bool", false);
					json.put("msg", "分摊模式下采购费用总和与费用汇总总和不相等!");
					return json.toString();
				}
			}
			double wxcount;
			sql = "select count(*)  from (select distinct csbh from ##csbh where isnull(wxdh,0)!=0 and isnull(csbh,'')!='') a;";
			params.put("sql",sql);
			String Str=purchaseDetailMapper.getStringFromSql(params);
			if(Str==null){
				wxcount = 0;
			}else{
				wxcount=Double.parseDouble(Str);
			}
			if(wxcount>1){
				json.put("bool", false);
				json.put("msg", "同一费用单任务导入时厂商必须相同!");
				return json.toString();
			}
		return json.toString();
	}
	//损耗导入
	public List<OutMaterial> getOutMaterialList(Map<String,Object> params){
		return ommapper.getOutMaterialList(params);
	}
	//递送导入
	public List<SendImp> getSendImpList(Map<String,Object> params){
		return sendimpmapper.getSendImpList(params);
	}
	//异常导入
	public List<AbnormalImp> getAbnormalImpList(Map<String,Object> params){
		return abnormalimpmapper.getAbnormalImpList(params);
	}
	//调入倒入
	public List<CallinImp> getCallinImpList(Map<String,Object> params){
		return callinimpmapper.getCallinImpList(params);
	}
	//发货导入
	public List<SendoutImp> getSendoutImpList(Map<String,Object> params){
		return sendoutimpmapper.getSendoutImpList(params);
	}
	//材料委托导入
	public List<MaterialEntrustImp> getMaterialEntrustImpList(Map<String,Object> params){
		String wth = " ";
		if(params.containsKey("wth")){
			 wth = params.get("wth").toString();
			if(!wth.trim().equals("")){
			if(wth.contains("-")){	
				String wtdh = wth.substring(0,wth.indexOf("-"));
				String wtxh = wth.substring(wth.indexOf("-")+1,wth.length());
				String s1 = " and wtjycssqb.wtdh = "+wtdh+" and wtjycssqclmxb.wtxh = "+wtxh+"";
			    params.put("s1",s1 );
			}else{
				String s1 = "  and left(wtjycssqb.wtdh,"+wth.length()+") = " + wth;
				params.put("s1",s1 );
			  }
			}
		}
		return materialentrustimpMapper.getMaterialEntrustImpList(params);
	}
	//产品委托导入
	public List<ProductEntrustImp> getProductEntrustImpList(Map<String,Object> params){
		String wth = " ";
		if(params.containsKey("wth")){
			 wth = params.get("wth").toString();
			if(!wth.trim().equals("")){
			if(wth.contains("-")){	
				String wtdh = wth.substring(0,wth.indexOf("-"));
				String wtxh = wth.substring(wth.indexOf("-")+1,wth.length());
				String s1 = " and wtjycssqb_cp.wtdh = "+wtdh+" and wtjycssqclmxb_cp.wtxh = "+wtxh+"";
			    params.put("s1",s1 );
			}else{
				String s1 = "  and left(wtjycssqb_cp.wtdh,"+wth.length()+") = " + wth;
				params.put("s1",s1 );
			  }
			}
		}
		return productentrustimpmapper.getProductEntrustImpList(params);
	}
	//运输费用导入
	public List<TransportCostImp> getTransportCostImpList(Map<String,Object> params){
		if(params.containsKey("jlh")){
			String jlh = params.get("jlh").toString();
	      	if(!jlh.trim().equals("")){
			if(jlh.contains("-")){
				String jldh = jlh.substring(0,jlh.indexOf("-"));
				String jlxh = jlh.substring(jlh.indexOf("-")+1,jlh.length());
				String s1 = " and erp_ysfymxb.jldh = " + jldh + " erp_ysfymxb.jlxh = " + jlxh;
				params.put("s1",s1 );
			}else{
	      	    String s1 = " and left(erp_ysfymxb.jldh,"+jlh.length()+") = " + jlh;
	      	    params.put("s1",s1 );
			}
		   }
	      }	
		return transportcostimpMapper.getTransportCostImpList(params);
	}
	//装柜费用导入
	public List<LoadingCostsImp> getLoadingCostsImpList(Map<String,Object> params){
		if(params.containsKey("zgh")){
			String zgh = params.get("zgh").toString();
	      	if(!zgh.trim().equals("")){
			if(zgh.contains("-")){
				String zgbh = zgh.substring(0,zgh.indexOf("-"));
				String zgxh = zgh.substring(zgh.indexOf("-")+1,zgh.length());
				String s1 = " and wmdz_zgfymxb.zgbh = " + zgbh + " and wmdz_zgfymxb.zgxh = " + zgxh;
				params.put("s1",s1 );
			}else{
	      	    String s1 = " and left(wmdz_zgfymxb.zgbh,"+zgh.length()+") = " + zgh;
	      	    params.put("s1",s1 );
			}
		   }
	      }	
		return loadingcostsimpMapper.getLoadingCostsImpList(params);
	}
	//导入过的任务单不在出现
	public void beforeloadTaskImp(Map<String,Object> params){
		int count;
		params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##cgfygl_rwdr' and type='U'");
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
		params.put("createsql", "drop table ##cgfygl_rwdr");
		armapper.createTableSql(params);}
		params.put("createsql", "select rwdh,rwxh into ##cgfygl_rwdr from scrwdmxb where 0=1");
		armapper.createTableSql(params);
		PurchaseCost[] arr = null;
		if(params.get("recDate")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recDate").toString());
			arr = (PurchaseCost[])JSONArray.toArray(jsonArray,PurchaseCost.class);
			double rwdh,rwxh;
			String sql;
			for(PurchaseCost obj:arr){
				rwdh = obj.getWxdh();
				rwxh = obj.getWxxh();
				sql = "insert into ##cgfygl_rwdr values('"+rwdh+"',"+rwxh+");";
				params.put("sql",sql);
				String  result= purchaseDetailMapper.getStringFromSql(params);
			}
		}
	}
	//任务导入
	public List<TaskImp> getTaskImpList(Map<String,Object> params){
		String condition = " ";
		if(params.containsKey("rwh")){
			String rwh = params.get("rwh").toString();
	      	if(!rwh.trim().equals("")){
			if(rwh.contains("-")){
				String rwdh = rwh.substring(0,rwh.indexOf("-"));
				String rwxh = rwh.substring(rwh.indexOf("-")+1,rwh.length());
				String s1 = " and scrwdmxb.rwdh = " + rwdh + " and scrwdmxb.rwxh = " + rwxh;
				condition+=s1;
			}else{
	      	    String s1 = " and left(scrwdmxb.rwdh,"+rwh.length()+") = " + rwh;
	      	    condition+=s1;
			}
		   }
	      }	
		if(params.containsKey("jhbz")){
			String jhbz = params.get("jhbz").toString();
			if(!jhbz.trim().equals("")){
				condition+=" and jhmxb.jhbz like ''%"+jhbz+"%''";
			}
		}
		//产品名称筛选
		if(params.containsKey("cpmc")){
			String cpmc = params.get("cpmc").toString();
			if(!cpmc.trim().equals("")){
				condition+=" and left(cpbmb.cpmc,"+cpmc.length()+") = '"+cpmc +"'  or left(scrwdmxb.cpbh,"+cpmc.length()+") ='"+cpmc +"'";
			}
		}
		//外协厂商筛选
		if(params.containsKey("csmc")){
			String csmc = params.get("csmc").toString();
			if(!csmc.trim().equals("")){
				condition+="  and csxxb.csmc like '%"+csmc+"%'";
			}
		}
		params.put("condition", condition);
		return taskimpmapper.getTaskImpList(params);
	}
	//专利费导入
	public List<PatentImp> getPatentImpList(Map<String,Object> params){
		int count;
		params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##cgfyb1' and type='U'");
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
			params.put("createsql", "drop table ##cgfyb1");
			armapper.createTableSql(params);}
		params.put("createsql", "select zlckbh,zlrkdh,zlrkxh into ##cgfyb1 from cgfyb where 0=1");
		armapper.createTableSql(params);
		PurchaseCost[] arr = null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (PurchaseCost[])JSONArray.toArray(jsonArray,PurchaseCost.class);
			double s_zlrkdh,s_zlrkxh;
			String s_zlckbh,sql;
			for(PurchaseCost obj:arr){
				s_zlckbh = obj.getZlckbh();
				s_zlrkdh = obj.getZlrkdh();
				s_zlrkxh = obj.getZlrkxh();
				if(s_zlckbh!=null){
				sql = "insert into ##cgfyb1 values('"+s_zlckbh+"',"+s_zlrkdh+","+s_zlrkxh+");";
				params.put("sql",sql);
				String  result= purchaseDetailMapper.getStringFromSql(params);
				}
			}
		}
		return patentimpmapper.getPatentImpList(params);
	}
	//xslbb
	public List<SaleType> getSaleTypeList(Map<String,Object> params){
		return stMapper.getSaleTypeList(params);
	}
}
