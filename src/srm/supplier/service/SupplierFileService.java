package srm.supplier.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.common.TreeModel;
import erp.util.Const;
import erp.util.MyJsonUtil;
import erp.util.SessionUtil;

import srm.basicdata.area.model.Area;
import srm.basicdata.companyClass.model.CompanyClass;
import srm.basicdata.materialClass.model.MaterialClass;
import srm.supplier.data.BankAccountMapper;
import srm.supplier.data.SupplierFileMapper;
import srm.supplier.data.SupplierMaterialSub1Mapper;
import srm.supplier.model.BankAccount;
import srm.supplier.model.CustomerInfo;
import srm.supplier.model.FactoryInfo;
import srm.supplier.model.SupplierFile;
import srm.supplierAccess.data.OutsideInformationMapper;

@Service
public class SupplierFileService {
	@Autowired
	private SupplierFileMapper mapper;
	@Autowired
	private BankAccountMapper bankAccountMapper;
	@Autowired
	private SupplierInter supplierInter;
	@Autowired
	private SupplierMaterialSub1Mapper supplierMaterialSub1Mapper;
	@Autowired
	private OutsideInformationMapper outsideInformationMapper;
	public List<SupplierFile> getSupplierFileList(Map<String,Object> params) {
		return mapper.getSupplierFileList(params);
	}
	public List<SupplierFile> getSupplierFileListForHelp(Map<String,Object> params) {
		return mapper.getSupplierFileListForHelp(params);
	}
	public List<SupplierFile> getSupplierFileByID(Map<String,Object> params) {
		return mapper.getSupplierFileByID(params);
	}
	/**
	 * 获取客户信息,helpfield专用
	 * Request supplier/supplierFile.srm?method=getCustomerListForHelp <br/><br/>
	 * Response {data:[{CustomerInfo}]} <br/><br/>
	 * @param CustomerInfo {@link paramMap}
	 */
	public List<CustomerInfo> getCustomerListForHelp(Map<String,Object> paramMap){
		return mapper.getCustomerListForHelp(paramMap);
	}
	/**
	 * 执行sql 返回 String 
	 * Request supplier/supplierFile.srm?method=getStringFromSql <br/><br/>
	 * Response {data:[{String}]} <br/><br/>
	 * @param paramMap {@link paramMap}
	 */
	public String getStringFromSql(Map<String,Object> paramMap){
		JSONObject json = new JSONObject();
		json.put("bool", true);
		json.put("val", mapper.getStringFromSql(paramMap));
		return json.toString();
	}
	@Transactional
	public void addSupplierFile(SupplierFile[] arr) {
		Map<String,Object> params =new HashMap<String, Object>();
		Object clientip=SessionUtil.getAttribute(Const.SESSION_IP);
		for(SupplierFile obj: arr) {
			if(clientip!=null && !"".equals(clientip)){
				String ip_addr=clientip.toString();
				obj.setIp_addr(ip_addr);
				obj.setCreate_dt(new Date());
			}
			//更新t_supplier_file中h，turnover_currency_en
			params.put("wbbh", obj.getCurrency_id());
			String currency_en = outsideInformationMapper.getWbdh(params);
			params.put("wbbh", obj.getTurnover_currency_id());
			String turnover_currency_en = outsideInformationMapper.getWbdh(params);
			obj.setCurrency_en(currency_en);
			obj.setTurnover_currency_en(turnover_currency_en);
			mapper.addSupplierFile(obj);
		}
	}
	@Transactional
	public void updateSupplierFile(SupplierFile[] arr) {
		Map<String,Object> params =new HashMap<String, Object>();
		for(SupplierFile obj: arr) {
			//同步厂商类别到平台
			int record_id = obj.getRecord_id();			
			if(record_id!=0 && obj.getMc_id_1()!=0 && obj.getMc_id_2()!=""){
				int mc_id_1 = obj.getMc_id_1(); 
				String mc_id_2 = obj.getMc_id_2();
				String mc_id_3 = obj.getMc_id_3();
				int[] arry = new int[1];
				arry[0]=mc_id_1;
				String arry2[] = mc_id_2.split(",");
				String arry3[] = mc_id_3.split(",");
				List<String> list_mc = new ArrayList<String>();			
				String lbbh = "";
				lbbh = supplierMaterialSub1Mapper.getLbbhFromMaterialClass(mc_id_1);
				if(lbbh!=null){
					list_mc.add(lbbh);
				}
				if(mc_id_2!=null && mc_id_2.trim()!=""){
				for(int i=0;i<arry2.length;i++){
					lbbh = supplierMaterialSub1Mapper.getLbbhFromMaterialClass(Integer.valueOf(arry2[i]));
					if(lbbh!=null){
						list_mc.add(lbbh);
					}					
				}
				}
				if(mc_id_3!=null && mc_id_3.trim()!=""){
				for(int i=0;i<arry3.length;i++){
					lbbh = supplierMaterialSub1Mapper.getLbbhFromMaterialClass(Integer.valueOf(arry3[i]));
					if(lbbh!=null){
						list_mc.add(lbbh);
					}					
				}
				}
				JSONArray jsonArr = JSONArray.fromObject(list_mc);
				supplierInter.updatePurchaseCategoryByWs(jsonArr.toString(),record_id);
			}
			//更新t_supplier_file中currency_en，turnover_currency_en
			params.put("wbbh", obj.getCurrency_id());
			String currency_en = outsideInformationMapper.getWbdh(params);
			params.put("wbbh", obj.getTurnover_currency_id());
			String turnover_currency_en = outsideInformationMapper.getWbdh(params);
			obj.setCurrency_en(currency_en);
			obj.setTurnover_currency_en(turnover_currency_en);
			//同步更新ERP单据
			FactoryInfo fi=new FactoryInfo();
			params.put("company_id", obj.getCompany_id());
			List<BankAccount> baList=bankAccountMapper.getBankAccountList(params);
			if(baList.size()>0){
				BankAccount ba=baList.get(0);
				fi.setKhyh(ba.getAccount_name());
				fi.setCszh(ba.getAccount_code());
			}
			if(obj.getIs_archive()){
				fi.setGdbj(1);
				fi.setCzrm(obj.getOperator());
				fi.setCzsj(new Date());
			}else{
				fi.setGdbj(0);
				fi.setCzrm(obj.getOperator());
				fi.setCzsj(new Date());
			}
			fi.setYwmc(obj.getCpyname_en());
			fi.setHzcs(obj.getHzcs());
			fi.setHddw(obj.getHddw());
			fi.setHddw2(obj.getHddw2());
			if(obj.getApply_sts().equals("15")){
				fi.setSpbj(1);
				fi.setBzsm(obj.getBzsm());
				fi.setSprm(obj.getOperator());
				fi.setSpsj(obj.getOperater_dt());
				fi.setCsmc(obj.getCpyname_cn());
				fi.setYhbh("000001");
				fi.setPsbj(0);
				fi.setKhbh(obj.getKhbh());
				fi.setFzrq(obj.getAudit_dt());
				fi.setFkts(obj.getFkts());
				String sql="select  sysmjb.mjms  from t_app_material_class ";
				sql+=" left outer join  sysmjb  on sysmjb.mjbh='0103' and erp_id=sysmjb.mjxl ";
				sql+="	where mc_id='"+obj.getMc_id_1()+"'";
				params.put("sql", sql);
				String cslb=mapper.getStringFromSql(params);
				fi.setCslb(cslb);
				fi.setXyed(obj.getXyed());
				fi.setCsdh(obj.getF_phone());
				fi.setCscz(obj.getFax());
				fi.setLxrm(obj.getContacts());
				fi.setCsdz(obj.getContact_addr());
				fi.setCssh(obj.getTax_no());
				fi.setCzrm(obj.getOperator());
				fi.setCzsj(obj.getOperater_dt());
				fi.setWbbh(obj.getWbbh());
				fi.setZtdw(obj.getZtdw());
				fi.setXdbl(obj.getXdbl());
				fi.setFktj(obj.getFktj());
				fi.setCslx(obj.getFwlx());
				if(obj.getCsbh().trim().equals("")){
					mapper.addFactoryInfo(fi);
					obj.setCsbh(fi.getCsbh());
				}else{
					fi.setCsbh(obj.getCsbh());
					mapper.updateFactoryInfo(fi);
				}
			}else{
				if(obj.getApply_sts().equals("10")){
					fi.setSpbj(0);
					fi.setSprm(obj.getOperator());
					fi.setSpsj(obj.getOperater_dt());
				}
				fi.setBzsm(obj.getBzsm());
				fi.setCslx(obj.getFwlx());
				fi.setKhbh(obj.getKhbh());
				fi.setCsmc(obj.getCpyname_cn());
				fi.setYhbh("000001");
				fi.setPsbj(0);
				fi.setFzrq(obj.getAudit_dt());
				fi.setFkts(obj.getFkts());
				String sql="select  sysmjb.mjms  from t_app_material_class ";
				sql+=" left outer join  sysmjb  on sysmjb.mjbh='0103' and erp_id=sysmjb.mjxl ";
				sql+="	where mc_id='"+obj.getMc_id_1()+"'";
				params.put("sql", sql);
				String cslb=mapper.getStringFromSql(params);
				fi.setCslb(cslb);
				fi.setXyed(obj.getXyed());
				fi.setCsdh(obj.getF_phone());
				fi.setCscz(obj.getFax());
				fi.setLxrm(obj.getContacts());
				fi.setCsdz(obj.getContact_addr());
				fi.setCssh(obj.getTax_no());
				fi.setCzrm(obj.getOperator());
				fi.setCzsj(obj.getOperater_dt());
				fi.setWbbh(obj.getWbbh());
				fi.setZtdw(obj.getZtdw());
				fi.setXdbl(obj.getXdbl());
				fi.setCsbh(obj.getCsbh());
				fi.setFktj(obj.getFktj());
				mapper.updateFactoryInfo(fi);
			}
			mapper.updateSupplierFile(obj);
			int dd = obj.getRecord_id();
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updateAccessApplicationInfoByWS(jsonmap);
		}
	}
	@Transactional
	public void deleteSupplierFile(SupplierFile[] arr) {
		for(SupplierFile obj: arr) {
			mapper.deleteSupplierFile(obj);
		}
	}
	/**
	* @Description: 检测状态位的一致
	* @param apply_sts
			company_id
	* @return 0 不通过；1通过
	* @author xufeng
	* @date 2015-11-17 
	*/
	public String checkStatusSame(Map<String,Object> params){
		JSONObject json = new JSONObject();
		int count=mapper.checkStatusSame(params);
		json.put("result", count);
		json.put("success", true);
		return json.toString();
	}
	public List<CompanyClass> getCompanyClassList(Map<String,Object> params) {
		return mapper.getCompanyClassList(params);
	}
	
	public Integer getCountByIdAndName(Map<String,Object> params) {
		return mapper.getCountByIdAndName(params);
	}
	public Integer getCountByName(Map<String,Object> params) {
		return mapper.getCountByName(params);
	}
	public List<Area> getAreaList(Map<String,Object> params) {
		return mapper.getAreaList(params);
	}
	public List<MaterialClass> getMaterialClassList(Map<String,Object> params) {
		return mapper.getMaterialClassList(params);
	}
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request supplier/supplierFile.srm?method=getMaterialClassTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author xufeng
	* @date 2015-11-03
	*/
	public List<TreeModel> getMaterialClassTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<MaterialClass> list=getMaterialClassList(params);
		
		for(MaterialClass sa:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sa.getMc_id());
			st.setParentId(sa.getF_id());
			st.setText(sa.getMc_name());
			st.setLeaf(sa.getLeaf());
			st.setExpanded("false");
			
			st.setType("MaterialClass");
			stlist.add(st);
			
		}
		
		return stlist;
	}
	/**
	 * 修改供应商中审核信息
	 * Request supplier/supplierFile.srm?method=getUpdateSupplierFile <br/><br/>
	 * @author wq
	 * @date 2016-04-05
	 */
	public String getUpdateSupplierFile(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String rec=params.get("rec").toString();
			SupplierFile sfo=MyJsonUtil.str2obj(rec, SupplierFile.class);
			int coId=sfo.getCompany_id();
			params.clear();
			params.put("company_id", coId);
			List<SupplierFile> sfList=getSupplierFileByID(params);
			if(sfList.size()>0){
				mapper.updateSupplierFile(sfo);
			}else{
				mapper.addSupplierFile(sfo);
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "修改供应商中审核信息时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	 * 检测是否有名称重复的厂商
	 */
	public String ifRepeatName(Map<String,Object> params){
		JSONObject json = new JSONObject();
		String cpynamearrayString = params.get("cpynamearray").toString();
		String[] cpynamearray = cpynamearrayString.split(",");
		int count = 0;
		String result = "";
		for(int i=0;i<cpynamearray.length;i++){
			params.put("csmc", cpynamearray[i]);
			count = mapper.getRepeatCount(params);
			if(count>0){
				result=cpynamearray[i];
				break;
			}
		}
		json.put("result", result);
		json.put("success", true);
		return json.toString();
	}
}
