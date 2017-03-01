package erp.erp.materialInventory.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.FilterModel;
import erp.erp.materialInventory.data.CkmcInventoryMapper;
import erp.erp.materialInventory.data.MaterialInventoryDelMapper;
import erp.erp.materialInventory.data.MaterialInventoryManagerMapper;
import erp.erp.materialInventory.data.RklbInventoryMapper;
import erp.erp.materialInventory.data.RootMapper;
import erp.erp.materialInventory.data.UnitPriceCheckMapper;
import erp.erp.materialInventory.model.CkmcInventory;
import erp.erp.materialInventory.model.Htmxb;
import erp.erp.materialInventory.model.Lldbyl;
import erp.erp.materialInventory.model.MaterialInventoryManager;
import erp.erp.materialInventory.model.Rkdb_yl;
import erp.erp.materialInventory.model.RklbInventory;
import erp.erp.materialInventory.model.UnitPriceCheck;
import erp.erp.materialInventory.model.Wgcprkdb;
import erp.util.MyJsonUtil;
import erp.util.TransUtil;

/**
* <p>Title: MaterialInventoryManagerService</p>
* <p>Description: erp</p>
* <p>Company: topsun</p> 
* @author shufei
* @date 2016-5-19上午11:00:23
*/
@Service
public class MaterialInventoryManagerService {
	@Autowired
	private MaterialInventoryManagerMapper mapper;
    @Autowired
	private CkmcInventoryMapper ckmcInventoryMapper;
    @Autowired
    private RootMapper rootMapper;  
    @Autowired
    private RklbInventoryMapper rklbInventoryMapper;
    @Autowired
    private UnitPriceCheckMapper unitPriceCheckMapper;
    @Autowired 
    private MaterialInventoryDelMapper materialInventoryDelMapper;
    
	public List<MaterialInventoryManager> getMaterialInventory(Map<String,Object> params) {
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
		String s_ckbh = params.get("s_ckbh").toString();
		String r_ckbh[] = s_ckbh.split(",");
		StringBuilder ss_ckbh = new StringBuilder("");
		@SuppressWarnings({ "unchecked", "rawtypes" })
		List ckbh_list = new ArrayList(Arrays.asList(r_ckbh));
		for(int j=0;j<ckbh_list.size();j++){
			if(ckbh_list.get(j).equals("0")){
				ckbh_list.remove(j);
				j--;
			}else{
				ss_ckbh.append("'"+ckbh_list.get(j)+"',");
			}			
		}
		String sss_ckbh = ss_ckbh.toString();
		String ssss_ckbh = sss_ckbh.substring(0,sss_ckbh.lastIndexOf(","));	
		String v_condition = null;
//		String z_condition = null;
//		String y_condition = null;
//		String m_condition = null;
		if(r_ckbh.length==1){
			v_condition = "and rkdb_yl.ckbh = '"+ s_ckbh +"'";
//			z_condition = "and z.ckbh = '"+ s_ckbh +"'";
//			y_condition = "and y.ckbh = '"+ s_ckbh +"'";
//			m_condition = "and m.ckbh = '"+ s_ckbh +"'";
			
		}else{		
			v_condition = " and rkdb_yl.ckbh in (" + ssss_ckbh+")";
//			z_condition = "and z.ckbh in ("+ ssss_ckbh +")";
//			y_condition = "and y.ckbh in ("+ ssss_ckbh +")";
//			m_condition = "and m.ckbh in ("+ ssss_ckbh +")";
		}		
		params.put("v_condition", v_condition);	
//		params.put("z_condition", z_condition);
		List<MaterialInventoryManager> list = null;
		//信息更新
		if(params.containsKey("infoUpdate")){
			String infoUpdate = params.get("infoUpdate").toString();
			if("arrivalInfo".equals(infoUpdate)){
//				params.put("m_condition", m_condition);
				list = mapper.getAP_MaterialInventory(params);
			}			
			if("contactInfo".equals(infoUpdate)){
				list = mapper.getBP_MaterialInventory(params);
			}
            if("planInfo".equals(infoUpdate)){
//            	params.put("y_condition", y_condition);
            	list = mapper.getCP_MaterialInventory(params);
			}
		}else{
			list = mapper.getMaterialInventory(params);
		}
		return list;
	}
	public String getJzrq(Map<String,Object> params){
		String year1 = params.get("year").toString();
		 int year = Integer.parseInt(year1);
		 String month1 = params.get("month").toString();
		 int month = Integer.parseInt(month1);		
		 int maxDays = TransUtil.getDaysByYearMonth(year, month);
		 String jzrq = "";
		 if(month<10){
		 jzrq = year +"-0"+month+"-"+ maxDays +" 23:59:59";
		  }else{
			 jzrq = year +"-"+month+"-"+ maxDays +" 23:59:59";
	      }	
		 return jzrq;
	}
	public void addMaterialInventory(MaterialInventoryManager[] arr) {
		for(MaterialInventoryManager obj: arr) {
			mapper.addMaterialInventory(obj);
		}
	}
	public void updateMaterialInventory(MaterialInventoryManager[] arr) {
		for(MaterialInventoryManager obj: arr) {
			mapper.updateMaterialInventory(obj);
		}
	}
	public void deleteMaterialInventory(MaterialInventoryManager[] arr) {
		for(MaterialInventoryManager obj: arr) {
			mapper.deleteMaterialInventory(obj);
		}
	}
	//仓库名称List
	public List<CkmcInventory> getCkmcList(Map<String,Object> params){
		ArrayList<CkmcInventory> list = new ArrayList<CkmcInventory>();
		list = (ArrayList<CkmcInventory>) ckmcInventoryMapper.getCkmcList(params);
//		List<CkmcInventory> list = ckmcInventoryMapper.getCkmcList(params);
		CkmcInventory ckmcInventory = new CkmcInventory();
		ckmcInventory.setCkbh("0");
		ckmcInventory.setCkmc("全部");
		if(list.size()>0){
			ckmcInventory.setCzyh(list.get(0).getCzyh());
		}else{
			ckmcInventory.setCzyh(null);
		}		
		list.add(0,ckmcInventory);
		return list;
	}
	//仓库名称
	public String getCkmc(Map<String,Object> params){
		return ckmcInventoryMapper.getCkmc(params);
	}
	public int getCkCountMaterialTest(Map<String,Object> params){
		int count = ckmcInventoryMapper.getCkCount(params);
		return count;
	}
	//仓库权限
	public String getCkCount(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);
		String s_ckbh = params.get("s_ckbh").toString();
		String r_ckbh[] = s_ckbh.split(",");
		@SuppressWarnings({ "unchecked", "rawtypes" })
		List list = new ArrayList(Arrays.asList(r_ckbh));
		for(int j=0;j<list.size();j++){
			if(list.get(j).equals("0")){
				list.remove(j);
			}
		}
		@SuppressWarnings("unchecked")
		String arr_ckbh[] = (String[])list.toArray(new String[list.size()]);
		
		int count = 0;
		String arr_ckmc[] = new String[arr_ckbh.length];
		for(int i=0;i<arr_ckbh.length;i++){			
			String ckbh = arr_ckbh[i];
			params.put("ckbh", ckbh);
			count = ckmcInventoryMapper.getCkCount(params);
			String ckmc = ckmcInventoryMapper.getCkmc(params);
			arr_ckmc[i] = ckmc;			
			if(count==0){
				json.put("bool", false);
				json.put("msg", "没有该仓库【"+ckmc+"】的管理权限！");
			}
		}
		json.put("arr_ckmc", arr_ckmc);
		return json.toString();
	}
	//入库类别
	public List<RklbInventory> getRklbList(Map<String,Object> params){
		return rklbInventoryMapper.getRklbList(params);
	}
	//权限
	public String ifRoot(Map<String,Object> params){
		String year = params.get("year").toString();
		String month = params.get("month").toString();
		String ckbh = params.get("ckbh").toString();
		params.put("year", year);
		params.put("month", month);
		params.put("ckbh", ckbh);
		String result = mapper.ifRoot(params);
		return result;
	}
	//获取菜单编号
   public String getManuBH(Map<String,Object> params){
	   return rootMapper.getManuBH(params);
   }
    //读取增加权限
   public int setAddRoot(Map<String,Object> params){
	   int result = rootMapper.setAddRoot(params);
	   return result;
   }
   //读取删除权限
   public int setDeleteRoot(Map<String,Object> params){
	   int result = rootMapper.setDeleteRoot(params);
	   return result;
   }
 //读取打印权限
   public int setPrintRoot(Map<String,Object> params){
	   int result = rootMapper.setPrintRoot(params);
	   return result;
   }
 //读取锁定权限
   public int setLockRoot(Map<String,Object> params){
	   int result = rootMapper.setLockRoot(params);
	   return result;
   }
 //读取单价核查权限
   public int setPriceCheckRoot(Map<String,Object> params){
	   int result = rootMapper.setPriceCheckRoot(params);
	   return result;
   }
   public int getMaxWgbj(Map<String,Object> params){
	   int maxWgbj = mapper.getMaxWgbj(params);	
	   return maxWgbj;
   }
   public List<Wgcprkdb> getWgcprkdb(Map<String,Object> params){
	   return mapper.getWgcprkdb(params);
   }
   public String getWgcprkdbList(Map<String,Object> params){
	   JSONObject json = new JSONObject();
	   List<Wgcprkdb> wgcprkdbList = getWgcprkdb(params);
	   Wgcprkdb kdb = null;
	   for(int i = 0;i<wgcprkdbList.size();i++){		  
		   kdb = wgcprkdbList.get(i);		   
		   json.put("ckbh_cp", kdb.getCkbh_cp());
		   json.put("rkdh_cp", kdb.getRkdh_cp());
		   json.put("ckbh_cl", kdb.getCkbh_cl());
		   json.put("lldh_cl", kdb.getLldh_cl());
		   json.put("sjdh_cp", kdb.getSjdh_cp());
		   json.put("success", true);
		   System.out.println(kdb.getCkbh_cp());
		   System.out.println(kdb.getRkdh_cp());
	   }
	   return json.toString();
   }
   public List<MaterialInventoryManager> getWmsqy(Map<String,Object> params){
	   return mapper.getWmsqy(params);
   }
   public int getWmsqy1(Map<String,Object> params){
	   List<MaterialInventoryManager> wmsqyList = getWmsqy(params);
	   MaterialInventoryManager dbo;
	   int wmsqy = 0;
	   if(wmsqyList==null){
		   wmsqy = 0; 
	   }else{
		   for(int i=0;i<wmsqyList.size();i++){
			   dbo = wmsqyList.get(0);
			   wmsqy = dbo.getWmsqy();
		   }
	   }	   
	   return wmsqy;
   }

   public int getCountWG(Map<String,Object> params){
	   return mapper.getCountWG(params);
   }
   public int getCountLL(Map<String,Object> params){
	   return mapper.getCountLL(params);
   }
   /**
	 * 执行sql获取返回字符串	 
	 */
   public String getStringFromSql(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String a=mapper.getStringFromSql(params);
			json.put("val", a);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "执行sql时出现异常，请重试！");
		}
		return json.toString();
	}
   
   public int getSCount(Map<String,Object> params){
	   return mapper.getSCount(params);
   }
   public int getCountLL3(Map<String,Object> params){
	   return mapper.getCountLL3(params);
   }
   public int getCountLL4(Map<String,Object> params){
	   return mapper.getCountLL4(params);
   }
   public double getLDKzdj(Map<String,Object> params){
	   return mapper.getLDKzdj(params);
   }
   public double getLDKzdj2(Map<String,Object> params){
	   return mapper.getLDKzdj2(params);
   }
   public List<Htmxb> getCgkdja(Map<String,Object> params){
	   return mapper.getCgkdja(params);
   }

   public String getCgkdjaList(Map<String,Object> params){
	   JSONObject json = new JSONObject();
	   List<Htmxb> cgkdjaList = getCgkdja(params);
	   Htmxb mim;
	   for(int i=0;i<cgkdjaList.size();i++){
		   mim = cgkdjaList.get(i);
		   json.put("kzdj", mim.getKzdj());
		   json.put("wbdj", mim.getWbdj());
	   }
	   return json.toString();
   } 
   public List<Htmxb> getCgkdjb(Map<String,Object> params){
	   return mapper.getCgkdja(params);
   }
   
   public String getCgkdjbList(Map<String,Object> params){
	   JSONObject json = new JSONObject();
	   List<Htmxb> cgkdjbList = getCgkdjb(params);
	   Htmxb mim;
	   for(int i=0;i<cgkdjbList.size();i++){
		   mim = cgkdjbList.get(i);
		   json.put("kzdj", mim.getKzdj());
		   json.put("cgdj", mim.getCgdj());
	   }
	   return json.toString();
   } 
   public int getMjbz(Map<String,Object> params){
	   return mapper.getMjbz(params);
   }
   
   public List<UnitPriceCheck> getUnitPriceCheckList(Map<String,Object> params){
	   if(params.containsKey("usePaging")){
		   params.remove("usePaging");
	   }
	   return unitPriceCheckMapper.getUnitPriceCheckList(params);
   }
   public int getRelateBusinessCount(Map<String,Object> params){
	  return mapper.getRelateBusinessCount(params); 
   }
   public int getRelateInventoryCount(Map<String,Object> params){
	  return mapper.getRelateInventoryCount(params);
   }
   public long getWMSCount(Map<String,Object> params){
	  return mapper.getWMSCount(params);
   }
   public List<Lldbyl> getDelete1Result(Map<String,Object> params){
	   return mapper.getDelete1Result(params);
   }
   public String getDelete1Result_To_JSON(Map<String,Object> params){
	   JSONObject json = new JSONObject();
	   List<Lldbyl> lldbyl_list = getDelete1Result(params);
	   Lldbyl lldbyl;
	   for(int i=0;i<lldbyl_list.size();i++){
		   lldbyl = lldbyl_list.get(i);
		   json.put("ckbh_cp", lldbyl.getCkbh_cp());
		   json.put("rkdh_cp", lldbyl.getRkdh_cp());
		   json.put("ckbh_cl", lldbyl.getCkbh_cl());
		   json.put("lldh_cl", lldbyl.getLldh_cl());
		   json.put("sjdh_cp", lldbyl.getSjdh_cp());
		   json.put("ztdh_cp", lldbyl.getZtdh_cp());
	   }
	   return json.toString();
   }
   public long getS_clllsd(Map<String,Object> params){
	   return mapper.getS_clllsd(params);
   }
   public int getLs_wmsqy(Map<String,Object> params){
	   return mapper.getLs_wmsqy(params);
   }
   public int getS_cpsjsd(Map<String,Object> params){
	   return mapper.getS_cpsjsd(params);
   }
   public int getS_cprksd(Map<String,Object> params){
	   return mapper.getS_cprksd(params);
   }
   
   /**
	* @Title: getV_result 
	* @Description: 材料入库单管理界面，删除按钮删除事件
	* @param @param Map    设定文件 
	* @return void    返回类型 
	* @throws 
	* @author shufei
	 */
   @Transactional
   public void getV_result(Map<String,Object> params){
	   materialInventoryDelMapper.getV_result(params);
   }
   
   
   public String getH_result(Map<String,Object> params){
	   JSONObject json=new JSONObject();
	   json.put("bool", true);
	   //库存检测
	   String ckbh = params.get("ckbh").toString();
	   String rkdh = params.get("rkdh").toString();
	   List<MaterialInventoryManager> material_list = getMaterialInventory(params);
	   for(int i=0;i<material_list.size();i++){
		   MaterialInventoryManager materialInventoryManager = material_list.get(i);
		   double s_rkxh = materialInventoryManager.getRkxh();
		   String s_clhh = materialInventoryManager.getClhh();
		   String s_cltx1 = materialInventoryManager.getCltx1();
		   String s_cltx2 = materialInventoryManager.getCltx2();
		   String s_cltx3 = materialInventoryManager.getCltx3();
		   String s_hwbh = materialInventoryManager.getHwbh();
		   String s_pcbh = materialInventoryManager.getPcbh();
		   String s_ghpc = materialInventoryManager.getGhpc();
		   Map<String,Object> s_param = new HashMap<String,Object>();
		   s_param.put("ckbh", ckbh);
		   s_param.put("rkdh", rkdh);
		   s_param.put("rkxh", s_rkxh);
		   s_param.put("clhh", s_clhh);
		   s_param.put("cltx1", s_cltx1);
		   s_param.put("cltx2", s_cltx2);
		   s_param.put("cltx3", s_cltx3);
		   s_param.put("hwbh", s_hwbh);
		   s_param.put("pcbh", s_pcbh);
		   s_param.put("ghpc", s_ghpc);
		   int rkxh = (int)s_rkxh;
		   double s_mxrk_sum = getSum_rksl(s_param);
		   double s_dqkcsl = getSum_kcsl(s_param);
		   if(s_mxrk_sum>s_dqkcsl){
			   json.put("bool", false);
			   json.put("msg","若删除序号 "+rkxh+" 材料，则明细特性库存将出负!");
			   return json.toString();
		   }
		   double s_kyrk_sum = getSum_rksl2(s_param);
		   double s_dqkcsl2 = getSum_kcsl2(s_param);
		   if(s_kyrk_sum>s_dqkcsl2){
			   json.put("bool", false);
			   json.put("msg","若删除序号 "+rkxh+" 材料，则可用库存将出负!");
			   return json.toString();
		   }
	   }   
	   return json.toString();
   }
   public List<Rkdb_yl> getRkdb_yl_sc(Map<String,Object> params){
	   return mapper.getRkdb_yl_sc(params);
   }
   public double getSum_rksl(Map<String,Object> params){
	   Double d_sum_rksl = mapper.getSum_rksl(params);
	   double s_mxrk_sum;
	   if(d_sum_rksl == null){
		   s_mxrk_sum = 0;
	   }else{
		   s_mxrk_sum = d_sum_rksl;
	   }
	   return s_mxrk_sum;
   }
   public double getSum_kcsl(Map<String,Object> params){
	   Double d_sum_kcsl = mapper.getSum_kcsl(params);
	   double s_dqkcsl;
	   if(d_sum_kcsl == null){
		   s_dqkcsl = 0;
	   }else{
		   s_dqkcsl = d_sum_kcsl;
	   }
	   return s_dqkcsl;
   }
   public double getSum_rksl2(Map<String,Object> params){
	   Double d_sum_rksl = mapper.getSum_rksl2(params);
	   double s_kyrk_sum;
	   if(d_sum_rksl == null){
		   s_kyrk_sum = 0;
	   }else{
		   s_kyrk_sum = d_sum_rksl;
	   }
	   return s_kyrk_sum;
   }
   public double getSum_kcsl2(Map<String,Object> params){
	   Double d_sum_kcsl = mapper.getSum_kcsl2(params);
	   double s_dqkcsl;
	   if(d_sum_kcsl == null){
		   s_dqkcsl = 0;
	   }else{
		   s_dqkcsl = d_sum_kcsl;
	   }
	   return s_dqkcsl;
   }
   
}
