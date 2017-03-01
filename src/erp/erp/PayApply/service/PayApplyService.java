package erp.erp.PayApply.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.FilterModel;
import erp.common.TreeModel;
import erp.erp.PayApply.data.CheckSFMapper;
import erp.erp.PayApply.data.EmployeeSalaryMapper;
import erp.erp.PayApply.data.FeeReimbursementMapper;
import erp.erp.PayApply.data.PayApplyMapper;
import erp.erp.PayApply.data.PurchaseAgreementMapper;
import erp.erp.PayApply.data.PurchaseFeeMapper;
import erp.erp.PayApply.data.SaleFeeMapper;
import erp.erp.PayApply.data.SupplyInvoiceInfoMapper;
import erp.erp.PayApply.model.ContractDetail2;
import erp.erp.PayApply.model.EmployeeDept;
import erp.erp.PayApply.model.EmployeeSalary;
import erp.erp.PayApply.model.FeeReimbursement;
import erp.erp.PayApply.model.Hddw;
import erp.erp.PayApply.model.PayApply;
import erp.erp.PayApply.model.PurchaseAgreement;
import erp.erp.PayApply.model.PurchaseFee;
import erp.erp.PayApply.model.SaleFee;
import erp.erp.PayApply.model.SupplyInvoiceInfo;
import erp.erp.PayApply.model.ZtdwPayApply;
import erp.util.MyJsonUtil;
import erp.util.SessionUtil;

@Service
public class PayApplyService {
	@Autowired
	private PayApplyMapper payApplyMapper;
	@Autowired
	private CheckSFMapper checkSFMapper;	
	@Autowired
	private SupplyInvoiceInfoMapper supplyInvoiceInfoMapper;
	@Autowired
	private  PurchaseAgreementMapper purchaseAgreementMapper;	
	@Autowired
	private SaleFeeMapper saleFeeMapper;
	@Autowired
	private PurchaseFeeMapper purchaseFeeMapper;
	@Autowired
	private FeeReimbursementMapper feeReimbursementMapper;
	@Autowired
	private EmployeeSalaryMapper employeeSalaryMapper;
	public List<PayApply> getPayApplyList(Map<String, Object> params){
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
		return payApplyMapper.getPayApplyList(params);
	}
	
	public String getPayApplyOne(Map<String, Object> params) {
		return payApplyMapper.getPayApplyOne(params);

	}
	public void addPayApply(PayApply[] arr) {
		for (PayApply obj : arr) {
			payApplyMapper.addPayApply(obj);
		}
	}

	public void updatePayApply(PayApply[] arr) {
		for (PayApply obj : arr) {
			payApplyMapper.updatePayApply(obj);
		}
	}
	/**
	 * 
	* @Title: payapply/payapply.act?method=addPayApplyCustom
	* @Description: PayApplyService 付款申请单自定义新增，主从表事务管理
	* @param params
	* @returnType void    
	* @author 舒飞
	* @date 2017-2-21下午2:58:13
	 */
	@Transactional
	public String addPayApplyCustom(Map<String,Object> params){
		String payApply_data =params.get("data1").toString();
		String payApply_mx_data =params.get("data3").toString();
		JSONObject json=new JSONObject();
		json.put("bool", true);
		List<PayApply> list =  MyJsonUtil.str2list(payApply_data, PayApply.class) ;
		String sjly = "";
		double sqbh = 0;
		for(PayApply obj : list){			
			sjly = obj.getSjly();
			payApplyMapper.addPayApply(obj);
			sqbh = obj.getSqbh();
		}
		if("供应发票".equals(sjly)){
			List<SupplyInvoiceInfo> list_fp =  MyJsonUtil.str2list(payApply_mx_data, SupplyInvoiceInfo.class) ;
			for(SupplyInvoiceInfo obj : list_fp){
				obj.setSqbh(sqbh);
				supplyInvoiceInfoMapper.addSupplyInvoice(obj);
			}
		}
		if("采购合同".equals(sjly)){
			List<PurchaseAgreement> list_cg =  MyJsonUtil.str2list(payApply_mx_data, PurchaseAgreement.class) ;
			for(PurchaseAgreement obj : list_cg){
				obj.setSqbh(sqbh);
				purchaseAgreementMapper.addPurchaseAgreement(obj);
			}
		}
		if("销售费用".equals(sjly)){
			List<SaleFee> list_xs =  MyJsonUtil.str2list(payApply_mx_data, SaleFee.class) ;
			for(SaleFee obj : list_xs){
				obj.setSqbh(sqbh);
				saleFeeMapper.addSaleFee(obj);
			}
			
		}
		if("采购费用".equals(sjly)){
			List<PurchaseFee> list_cgf =  MyJsonUtil.str2list(payApply_mx_data, PurchaseFee.class) ;
			for(PurchaseFee obj : list_cgf){
				obj.setSqbh(sqbh);
				purchaseFeeMapper.addPurchaseFee(obj);
			}
			
		}
		if("费用报销".equals(sjly)){
			List<FeeReimbursement> list_bx =  MyJsonUtil.str2list(payApply_mx_data, FeeReimbursement.class) ;
			for(FeeReimbursement obj : list_bx){
				obj.setSqbh(sqbh);
				feeReimbursementMapper.addFeeReimbursement(obj);
			}
			
		}
		if("职工工资".equals(sjly)){
			List<EmployeeSalary> list_zg =  MyJsonUtil.str2list(payApply_mx_data, EmployeeSalary.class) ;
			for(EmployeeSalary obj : list_zg){
				obj.setSqbh(sqbh);
				employeeSalaryMapper.addEmployeeSalary(obj);
			}			
		}
		return json.toString();
	}
	/**
	 * 
	* @Title: 付款申请单自定义修改，主从表事务管理
	* @Description: payapply/payapply.act?method=updatePayApplyCustom
	* @param params
	* @return
	* @returnType String    
	* @author 舒飞
	* @date 2017-2-21下午3:09:23
	 */
	@Transactional
	public String updatePayApplyCustom(Map<String,Object> params){
		String payApply_data =params.get("data1").toString();
		String payApply_mx_data =params.get("data3").toString();
		JSONObject json=new JSONObject();
		json.put("bool", true);
		List<PayApply> list =  MyJsonUtil.str2list(payApply_data, PayApply.class) ;
		String sjly = "";
		double sqbh = 0;
		for(PayApply obj : list){		
			sjly = obj.getSjly();
			payApplyMapper.updatePayApply(obj);
			sqbh = obj.getSqbh();
		}
		if("供应发票".equals(sjly)){
			List<SupplyInvoiceInfo> list_fp =  MyJsonUtil.str2list(payApply_mx_data, SupplyInvoiceInfo.class) ;
			for(SupplyInvoiceInfo obj : list_fp){
				obj.setSqbh(sqbh);
				supplyInvoiceInfoMapper.updateSupplyInvoice(obj);
			}
		}
		if("采购合同".equals(sjly)){
			List<PurchaseAgreement> list_cg =  MyJsonUtil.str2list(payApply_mx_data, PurchaseAgreement.class) ;
			for(PurchaseAgreement obj : list_cg){
				obj.setSqbh(sqbh);
				purchaseAgreementMapper.updatePurchaseAgreement(obj);
			}
		}
		if("销售费用".equals(sjly)){
			List<SaleFee> list_xs =  MyJsonUtil.str2list(payApply_mx_data, SaleFee.class) ;
			for(SaleFee obj : list_xs){
				obj.setSqbh(sqbh);
				saleFeeMapper.updateSaleFee(obj);
			}
			
		}
		if("采购费用".equals(sjly)){
			List<PurchaseFee> list_cgf =  MyJsonUtil.str2list(payApply_mx_data, PurchaseFee.class) ;
			for(PurchaseFee obj : list_cgf){
				obj.setSqbh(sqbh);
				purchaseFeeMapper.updatePurchaseFee(obj);
			}
			
		}
		if("费用报销".equals(sjly)){
			List<FeeReimbursement> list_bx =  MyJsonUtil.str2list(payApply_mx_data, FeeReimbursement.class) ;
			for(FeeReimbursement obj : list_bx){
				obj.setSqbh(sqbh);
				feeReimbursementMapper.updateFeeReimbursement(obj);
			}
			
		}
		if("职工工资".equals(sjly)){
			List<EmployeeSalary> list_zg =  MyJsonUtil.str2list(payApply_mx_data, EmployeeSalary.class) ;
			for(EmployeeSalary obj : list_zg){
				obj.setSqbh(sqbh);
				employeeSalaryMapper.updateEmployeeSalary(obj);
			}			
		}
		return json.toString();
	}
	@Transactional
	public void deletePayApply(PayApply[] arr) {
		for (PayApply obj : arr) {
			if ("供应发票".equals(obj.getSjly())) {
				payApplyMapper.deletePayApply(obj);
				payApplyMapper.deleteSupplyInvoice(obj);
			}
			if ("采购合同".equals(obj.getSjly())) {
				payApplyMapper.deletePayApply(obj);
				payApplyMapper.deletePurchaseAgreement(obj);
			}
			if ("销售费用".equals(obj.getSjly())) {
				payApplyMapper.deletePayApply(obj);
				payApplyMapper.deleteSaleFee(obj);
			}
			if ("采购费用".equals(obj.getSjly())) {
				payApplyMapper.deletePayApply(obj);
				payApplyMapper.deletePurchaseFee(obj);
			}
			if ("费用报销".equals(obj.getSjly())) {
				payApplyMapper.deletePayApply(obj);
				payApplyMapper.deleteFeeReimbursement(obj);
			}
			if ("职工工资".equals(obj.getSjly())) {
				payApplyMapper.deletePayApply(obj);
				payApplyMapper.deleteEmployeeSalary(obj);
			}
		}
	}
	public void submitPayApply(Map<String, Object> params) {
		if (params.get("tjbj") != null) {
			payApplyMapper.submitPayApply(params);
			if (params.get("tjbj").equals("1")) {
				Map<String, Object> map=payApplyMapper.getTjdx(params);
				params.put("id", payApplyMapper.getId());
				params.put("gzgw_tj", SessionUtil.getCurrentUser().getLogin_id());
				params.put("gzgw_tjdx", map.get("gzgw"));
				params.put("gzgw_tj_xm", SessionUtil.getCurrentUser().getName());
				params.put("gzgw_tjdx_xm", map.get("czy_xm"));
				payApplyMapper.insertOa(params);
				Integer ll_counts = payApplyMapper.getLLcount(params);
				int ll_count;
				if(ll_counts == null){
					ll_count = 0;
				}else{
					ll_count = ll_counts.intValue();
				}
				if (ll_count <= 50){
					
			payApplyMapper.insertPaymentInfo(params);
			payApplyMapper.insertPaymentFee(params);
				} 
				  
			}
			//取消提交后要做以下操作			
			if(params.get("tjbj").equals("0")){
				String sql1 = "delete from  t_inf_payment_fee  where exists (select * From t_inf_payment_hdr  where  " +
						"sqbh = "+ params.get("sqbh")+" and spbj = 0 and t_inf_payment_hdr.id =t_inf_payment_fee.mainid )";
				params.put("sql", sql1);
				checkSFMapper.getStringFromSql(params);
				String sql2 = "delete from  t_inf_payment_info  where exists (select * From t_inf_payment_hdr  where  sqbh = "+ params.get("sqbh")+" and spbj = 0 " +
						"and t_inf_payment_hdr.id =t_inf_payment_info.mainid )";
				params.put("sql", sql2);
				checkSFMapper.getStringFromSql(params);
				String sql3 = "select (isnull(max(id),0)) from t_inf_payment_hdr where sqbh = "+ params.get("sqbh")+" and spbj = 0";
				params.put("sql", sql3);
				String ll_id = checkSFMapper.getStringFromSql(params);
				String sql4 = "select requestid from t_inf_payment_hdr where id = "+ll_id;
				params.put("sql", sql4);
				String requestid = checkSFMapper.getStringFromSql(params);
				Integer ll_requestid;
				if(requestid==null){
					ll_requestid = 0;
				}else{
					ll_requestid = Integer.valueOf(requestid);
				}
				checkSFMapper.update_oainfo(ll_requestid);
				/*String sql5 = "update view_workflow_requestbase set laststatus=status,status='撤销',currentstatus=1 where requestid= "+ll_requestid;
				params.put("sql", sql5);
				checkSFMapper.getStringFromSql(params);
				// 当前操作者表
				String sql6 = "delete view_workflow_currentoperator where requestid = "+ll_requestid;
				params.put("sql", sql6);
				checkSFMapper.getStringFromSql(params);
				// 工作流信息表
				String sql7 = "delete view_workflow_form where requestid = "+ll_requestid;
				params.put("sql", sql7);
				checkSFMapper.getStringFromSql(params);
				// 工作流批注表
				String sql8 = "delete view_workflow_requestLog where requestid = "+ll_requestid;
				params.put("sql", sql8);
				checkSFMapper.getStringFromSql(params);
				// 工作流查看日志表
				String sql9 = "delete view_workflow_requestViewLog where id = "+ll_requestid;
				params.put("sql", sql9);
				checkSFMapper.getStringFromSql(params);
				// 工作流主表
				String sql10 = "delete view_workflow_requestbase where requestid = "+ll_requestid;
				params.put("sql", sql10);
				checkSFMapper.getStringFromSql(params);*/
				
				String sql11 = "delete from  t_inf_payment_hdr  where  sqbh =" + params.get("sqbh") +" and  spbj = 0";
				params.put("sql", sql11);
				checkSFMapper.getStringFromSql(params);
			}
		}
	}
	public void reviewPayApply(Map<String, Object> params) {
		if (params.get("fhbj") != null) {
			payApplyMapper.reviewPayApply(params);
		}
	}
	public void archivePayApply(Map<String, Object> params) {
		if (params.get("gdbj") != null) {
			payApplyMapper.archivePayApply(params);
		}
	}
	public void approvalPayApply(Map<String, Object> params) {
		if (params.get("spbj") != null) {
			payApplyMapper.approvalPayApply(params);
		}
	}
	public void transferredPayApply(Map<String, Object> params) {
		if (params.get("yzbj") != null) {
			payApplyMapper.transferredPayApply(params);
		}
	}
	public void stopPayApply(Map<String, Object> params) {
		if (params.get("zzbj") != null) {
			payApplyMapper.stopPayApply(params);
		}
	}
	public List<TreeModel> getAllEmployeeDept(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		int bmjc=1;
		int parentId=0;
		List<EmployeeDept> list=payApplyMapper.getAllEmployeeDept(params);
		if(params.get("node")!=null){
			bmjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(EmployeeDept sa:list) 
		{
			if(sa.getBmjc()==bmjc){
				TreeModel st=new TreeModel();
				st.setNodeId(Integer.valueOf(sa.getBmbh()));
				st.setParentId(parentId);
				st.setText(sa.getBmmc());
				if (sa.getMjbz()==0){
					if(sa.getBmbh().length()<2){
						st.setExpanded("true");
					}else{
						st.setExpanded("false");
					}
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
	 * 
	* @Title: getZyze
	* @Description: PayApplyService
	* @param params
	* @return
	* @returnType double    
	* @author 舒飞
	* @date 2016-6-17下午3:47:12
	 */
	public Double getZyze(Map<String,Object> params){
		return checkSFMapper.getZyze(params);
	}
	/**
	 * 
	* @Title: getJznf
	* @Description: PayApplyService
	* @return
	* @returnType int    
	* @author 舒飞
	* @date 2016-6-17下午4:05:50
	 */
	public Double getJznf(Map<String,Object> params){
		return checkSFMapper.getJznf(params);
	}
	/**
	 * 
	* @Title: getCsyfze
	* @Description: PayApplyService
	* @param params
	* @return
	* @returnType Double    
	* @author 舒飞
	* @date 2016-6-17下午4:52:53
	 */
	public Double getCsyfze(Map<String,Object> params){
	    Calendar cal = Calendar.getInstance();
        int day = cal.get(Calendar.DATE);
        int month = cal.get(Calendar.MONTH) + 1;
        int year = cal.get(Calendar.YEAR);
        String ls_jzrq;
        if(month<10){
            ls_jzrq = year+"-0"+month+"-"+day+" 23:59:59";
        }else{
        	ls_jzrq = year+"-"+month+"-"+day+" 23:59:59";
        }
		params.put("ls_jzrq", ls_jzrq);
		return checkSFMapper.getCsyfze(params);
	}
	/**
	 * 
	* @Title: getYsqje
	* @Description: PayApplyService
	* @param params
	* @return
	* @returnType Double    
	* @author 舒飞
	* @date 2016-6-17下午4:54:28
	 */
	public Double getYsqje(Map<String,Object> params){
		return checkSFMapper.getYsqje(params);
	}
	/**
	 * 
	* @Title: getHddw
	* @Description: PayApplyService 付款申请单，编辑界面的还贷标记点上后，选择供应商的时候，此时的收款单位
	* @param params
	* @returnType String    
	* @author 舒飞
	* @date 2016-6-22下午4:44:14
	 */
	public String getHddw(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", false);
		List<Hddw> list = checkSFMapper.getHddw(params);
		if(list.size()>0){
			if(list.get(0).getCsbh()==null && list.get(0).getCsmc()==null){
				json.put("bool", false);
			}else{
				json.put("csbh", list.get(0).getCsbh());
				json.put("csmc", list.get(0).getCsmc());
				json.put("bool", true);
			}		
		}
		return json.toString();
	}
	/**
	 * 
	* @Title: getHddw2
	* @Description: PayApplyService 付款申请单，选择供应商后，编辑界面的还贷标记点上，此时的收款单位
	* @param params
	* @return
	* @returnType String    
	* @author 舒飞
	* @date 2016-6-22下午5:25:43
	 */
	public String getHddw2(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", false);
		List<Hddw> list = checkSFMapper.getHddw(params);
			if(list.size()>0){
			if(list.get(0).getCsbh()==null && list.get(0).getCsmc()==null){
				json.put("bool", false);
			}else{
				json.put("csbh", list.get(0).getCsbh());
				json.put("csmc", list.get(0).getCsmc());
				json.put("bool", true);
			}	
		}
		return json.toString();
	}
	
	public String getCsmc(Map<String,Object> params){
		return checkSFMapper.getCsmc(params);
	}
	/**
	 * 
	* @Title: getLLcount
	* @Description: PayApplyService
	* @param params
	* @returnType int    
	* @author 舒飞
	* @date 2016-6-28下午3:05:05
	 */
	public int getLLcount(Map<String,Object> params){
		return checkSFMapper.getLLcount(params);
	}
	/**
	 * 
	* @Title: getLsSpbj
	* @Description: PayApplyService 申请单打印获取审判标记
	* @param params
	* @returnType int    
	* @author 舒飞
	* @date 2016-6-28下午3:12:21
	 */
	public int getLsSpbj(Map<String,Object> params){
		int ls_spbj;
		Integer spbj = checkSFMapper.getLsSpbj(params);
		if(spbj == null){
			ls_spbj = 0;
		}else{
			ls_spbj = spbj;
		}
		return ls_spbj;
	}
	/**
	 * 
	* @Title: getStringFromSql
	* @Description: PayApplyService
	* @param params
	* @returnType void    
	* @author 舒飞
	* @date 2016-7-12上午8:56:19
	 */
	public String getStringFromSql(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String a=checkSFMapper.getStringFromSql(params);
			json.put("val", a);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "执行sql时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	 * 
	* @Title: getBjList
	* @Description: PayApplyService
	* @param params
	* @return
	* @returnType String    
	* @author 舒飞
	* @date 2016-7-20下午2:29:45
	 */
	public String getBjList(Map<String,Object> params){
		JSONObject json = new JSONObject();
		int s_yyfbj = checkSFMapper.getSyyfbj(params);
		int ls_yyfbj = checkSFMapper.getLSyyfbj(params);
		Map<String,Object> p = new HashMap<String, Object>();
		String sql = "SELECT czy_gly FROM czyb WHERE Rtrim(czy_gh) = '"+params.get("czy_gh")+"'";
		p.put("sql", sql);		
		String sys_manager = getStringFromSql(p);
		json.put("sys_manager", sys_manager);
		json.put("s_yyfbj", s_yyfbj);
		json.put("ls_yyfbj", ls_yyfbj);
		return json.toString();
	}
	/**
	 * 
	* @Title: getZtdwList 外币
	* @Description: PayApplyService
	* @param params
	* @return
	* @returnType List<ZtdwPayApply>    
	* @author 舒飞
	* @date 2016-7-21上午10:51:44
	 */
	public List<ZtdwPayApply> getZtdwList(Map<String,Object> params){
		return checkSFMapper.getZtdwList(params);
	}
	/**
	 * 
	* @Title: getSaveBefore
	* @Description: PayApplyService 保存前验证
	* @param params
	* @return
	* @returnType String    
	* @author 舒飞
	* @date 2016-7-21下午3:22:39
	 */
	public String getSaveBefore(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);
		String rec = params.get("rec").toString();
		PayApply pa = MyJsonUtil.str2obj(rec, PayApply.class);
//		params.put("sqbh", pa.getSqbh());
		return json.toString();
	}
	/**
	 * 
	* @Title: getCheckMsg
	* @Description: PayApplyService
	* @param params
	* @return
	* @returnType String    
	* @author 舒飞
	* @date 2016-7-26下午4:12:58
	 */
	public String getCheckMsg(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);
		String formrec = params.get("formrec").toString();
		PayApply pay = MyJsonUtil.str2obj(formrec,PayApply.class);
		//申请金额检验
		if(pay.getSqje()<0){
			json.put("bool", false);
			json.put("msg", "申请总额小于0，不允许保存!");
			return json.toString();
		}
		//外币金额检验
		if(pay.getWbje()<0){
			json.put("bool", false);
			json.put("msg", "外币申请总额小于0，不允许保存!");
			return json.toString();
		}
		//备注说明长度不超过250，前台控制
		//TODO
		//增加时检测是否重号
//		String sjly =  pay.getSjly().trim();
//		if("供应发票".equals(sjly)){
//			SupplyInvoiceInfo[] pp = (SupplyInvoiceInfo[]) params.get("ck_recs");
//			    for(SupplyInvoiceInfo obj:pp){
//			    	System.out.print(obj.getBmmc());
//			    }
//		}		
		String ck_recs = params.get("ck_recs").toString();
		return formrec;
	}
	public List<Hddw> getSkdwLists(Map<String,Object> params){
		return checkSFMapper.getSkdwLists(params);
	}
	public String getSkdwList(Map<String,Object> params){
		if(!params.containsKey("csbh") || params.get("csbh") == null || "".equals(params.get("csbh").toString().trim()) ){
			return null;
		}
		JSONObject json = new JSONObject();		
		List<Hddw> hddwList = checkSFMapper.getSkdwLists(params);
		Hddw hddw = hddwList.get(0);
        json.put("csmc", hddw.getCsmc());
        json.put("csbh", hddw.getCsbh());
        json.put("hddw", hddw.getHddw());
        json.put("hddw2", hddw.getHddw2());
		return json.toString();
	}

	/**
	 * 
	* @Title: getCheckApplyMoney
	* @Description: PayApplyService
	* @param params
	* @return
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-1下午3:12:55
	 */
	public String getCheckApplyMoney(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);
		//申请金额
		String wbbh = params.get("wbbh").toString().trim();
		if( "60".equals(wbbh) || "".equals(wbbh)){
		String sql1 = "select  view_gyfpmx_hsbm.rkje "+
        "- (select isnull(sum(gyfphtyfb.yfje),0) from gyfphtyfb where gyfphtyfb.fplb=view_gyfpmx_hsbm.fplb and gyfphtyfb.fphm=view_gyfpmx_hsbm.fphm and left(gyfphtyfb.hsbm,4)=view_gyfpmx_hsbm.hsbm) "+
		"- (select isnull(sum(gyfpfyyfb.yfje),0) from gyfpfyyfb where gyfpfyyfb.fplb=view_gyfpmx_hsbm.fplb and gyfpfyyfb.fphm=view_gyfpmx_hsbm.fphm and left(gyfpfyyfb.hsbm,4)=view_gyfpmx_hsbm.hsbm) "+
		"- (select isnull(sum(fksqspmxb.sqje),0) from fksqspmxb where fksqspmxb.fplb = view_gyfpmx_hsbm.fplb and fksqspmxb.fphm = view_gyfpmx_hsbm.fphm and fksqspmxb.hsbm = view_gyfpmx_hsbm.hsbm and fksqspmxb.sqbh <> "+params.get("sqbh")+") "+
		"from view_gyfpmx_hsbm "+
		"where view_gyfpmx_hsbm.fplb='"+params.get("fplb")+"' and view_gyfpmx_hsbm.fphm = '"+params.get("fphm")+"' and view_gyfpmx_hsbm.hsbm= '"+params.get("hsbm")+"'";
		params.put("sql", sql1);
		String ls_sqje_wq = checkSFMapper.getStringFromSql(params);
		double sqje_wq = 0;
		if(ls_sqje_wq == null){
			sqje_wq = 0; 
		}else{
			sqje_wq = Double.valueOf(ls_sqje_wq);
		}
		json.put("sqje_wq", sqje_wq);
		//总的发票金额
		String sql2 = "select sum(view_gyfpmx_hsbm.rkje) rkje_sum from view_gyfpmx_hsbm " +
				"where view_gyfpmx_hsbm.fphm='"+params.get("fphm")+"' and view_gyfpmx_hsbm.fplb='"+params.get("fplb")+"' and abs(view_gyfpmx_hsbm.rkje) " +
				"- (select abs(isnull(sum(gyfphtyfb.yfje),0)) from gyfphtyfb with (nolock) where " +
				"gyfphtyfb.fplb=view_gyfpmx_hsbm.fplb and gyfphtyfb.fphm=view_gyfpmx_hsbm.fphm and left(gyfphtyfb.hsbm,4)=view_gyfpmx_hsbm.hsbm)" +
				" -  (select abs(isnull(sum(gyfpfyyfb.yfje),0)) from gyfpfyyfb with (nolock) where gyfpfyyfb.fplb=view_gyfpmx_hsbm.fplb and gyfpfyyfb.fphm=view_gyfpmx_hsbm.fphm and left(gyfpfyyfb.hsbm,4)=view_gyfpmx_hsbm.hsbm)" +
				" - (select abs(isnull(sum(fksqspmxb.sqje),0)) from fksqspmxb with (nolock) where " +
				"fksqspmxb.fplb = view_gyfpmx_hsbm.fplb and fksqspmxb.fphm = view_gyfpmx_hsbm.fphm " +
				"and fksqspmxb.hsbm = view_gyfpmx_hsbm.hsbm) >= 0 group by view_gyfpmx_hsbm.fplb,view_gyfpmx_hsbm.fphm";
		params.put("sql", sql2);
		String ls_rkje_sum = checkSFMapper.getStringFromSql(params);
		double rkje_sum = 0;
		if(ls_rkje_sum == null){
			rkje_sum = 0;
		}else{
			rkje_sum = Double.valueOf(ls_rkje_sum);
		}
		json.put("rkje_sum", rkje_sum);
		//总的质押金额
		String sql3 = "select isnull(sum(sljzyb_fp.zyje),0) zyje from sljzyb_fp "+			
					  "left outer join sljzyb on sljzyb.zydh = sljzyb_fp.zydh "+
					  "where sljzyb_fp.fphm='"+params.get("fphm")+"' and sljzyb_fp.fplb='"+params.get("fplb")+"' and isnull(sljzyb.jybj,0)=0 group by sljzyb_fp.fplb,sljzyb_fp.fphm";
		params.put("sql", sql3);
		String ls_zyje = checkSFMapper.getStringFromSql(params);
		double zyje = 0;
		if(ls_zyje == null){
			zyje = 0;
		}else{
			zyje = Double.valueOf(ls_zyje);
		}
		json.put("zyje", zyje);
		//最大发票金额
		String sql4 = "select top 1 max(rkje) from view_gyfpmx_hsbm where fplb='"+params.get("fplb")+"' and fphm='"+params.get("fphm")+"' group by fplb,fphm,hsbm";
		params.put("sql", sql4);
		String ls_fpje_max = checkSFMapper.getStringFromSql(params);
		double fpje_max = 0;
		if(ls_fpje_max == null){
			fpje_max = 0;
		}else{
			fpje_max = Double.valueOf(ls_fpje_max);
		}
		json.put("fpje_max", fpje_max);
		//最大核算部门
		String sql5 = "select top 1 hsbm from view_gyfpmx_hsbm where fplb='"+params.get("fplb")+"' and fphm='"+params.get("fphm")+"' group by fplb,fphm,hsbm";
		params.put("sql", sql5);
		String ls_hsbm_max = checkSFMapper.getStringFromSql(params);
		String hsbm = params.get("hsbm").toString();
		if(hsbm.equals(ls_hsbm_max)){
			sqje_wq = sqje_wq - (zyje - (rkje_sum - fpje_max)/rkje_sum*zyje);//取最大的尾差
		}else{
			double fpje = Double.valueOf(params.get("fpje").toString());
			sqje_wq = sqje_wq - zyje*fpje/rkje_sum ;
		}
		double sqje_fp = Double.valueOf(params.get("sqje").toString());
		if(sqje_wq != 0 && sqje_fp != 0){
			if(sqje_wq/Math.abs(sqje_wq) != sqje_fp/Math.abs(sqje_fp)){
				json.put("bool", false);
				json.put("msg", "第"+params.get("rowCount").toString()+"行发票所申请的金额跟发票金额的未申请金额正负关系不一致！");
				return json.toString();
			}
		}
		double s = 0;
		if(sqje_wq < 0){
			if((sqje_wq - sqje_fp) > 0){
				s = sqje_wq - sqje_fp;
				json.put("bool", false);
				json.put("msg", "第"+params.get("rowCount").toString()+"行发票所申请的金额一旦生成则会大于发票金额!,超出"+Math.abs(s));
				return json.toString();
			}
		}else{
			if((sqje_wq - sqje_fp) < 0){
				s = sqje_wq - sqje_fp;
				json.put("bool", false);
				json.put("msg", "第"+params.get("rowCount").toString()+"行发票所申请的金额一旦生成则会大于发票金额!,超出"+Math.abs(s));
			}
		}
	  }else{
		  String s_wbje = params.get("wbje").toString();
		  if(s_wbje==null){
			  s_wbje = "0";
		  }
		  double wbje = Double.valueOf(s_wbje);
		  String s_wbsq = params.get("wbsq").toString();
		  if(s_wbsq==null){
			  s_wbsq = "0";
		  }
		  double wbsq = Double.valueOf(s_wbsq);
		  if(wbsq > wbje){
			  double k = wbsq - wbje;
			  json.put("bool", false);
			  json.put("msg", "第"+params.get("rowCount").toString()+"行发票外币申请金额一旦生成则会大于外币金额!,超出"+Math.abs(k));
		  }
	  }
		return json.toString();
	}
	/**
	 * 
	* @Title: getContractDetailList
	* @Description: PayApplyService //合同明细查询store
	* @param params
	* @return
	* @returnType List<ContractDetail>    
	* @author 舒飞
	* @date 2016-8-2上午10:29:18
	 */
	public List<ContractDetail2> getContractDetailList(Map<String,Object> params){
		return checkSFMapper.getContractDetailList(params);
	}
	public String getCheckCGMoney(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);		
		String fydh = params.get("fydh").toString();
		String fyxh = params.get("fyxh").toString();
		String sqbh = params.get("sqbh").toString();
		double s_fyje;
		if(params.get("sqje").toString() == null){
			s_fyje = 0;
		}else{
			s_fyje = Double.valueOf(params.get("sqje").toString());
		}
		if("1".equals(params.get("isAdd").toString())){
		String sql1 = "select fyje from cgfyb with (nolock) where fydh = "+fydh+" and fyxh = "+fyxh;
		params.put("sql", sql1);
		String s_fyje_xz = checkSFMapper.getStringFromSql(params);
		double s_fyje_fy;
		if(s_fyje_xz == null){
			s_fyje_fy = 0;
		}else{
			s_fyje_fy = Double.valueOf(s_fyje_xz);
		}
		
		String sql2 = "select sum(sqje) from fksqspfyb where fydh = "+fydh+" and fyxh = "+fyxh;
		params.put("sql", sql2);
		String s_fyje_xz2 = checkSFMapper.getStringFromSql(params);
		double s_fyje_yk;
		if(s_fyje_xz2 == null){
			s_fyje_yk = 0;
		}else{
			s_fyje_yk = Double.valueOf(s_fyje_xz2);
		}
		
		if(s_fyje_yk + s_fyje > s_fyje_fy){
			json.put("bool", false);
			json.put("msg", "第"+params.get("rowCount").toString()+"行采购费用的申请金额已大于费用金额！");
		}
		
		String sql3 = "select count(*) from cgfyb with (nolock) where cgfyb.fydh= "+fydh+" and cgfyb.fyxh = "+fyxh+" and cgfyb.hxbj=1";
		params.put("sql", sql3);
		String s_count = checkSFMapper.getStringFromSql(params);
		int count = Integer.valueOf(s_count);
		if(count>0){
			json.put("bool", false);
			json.put("msg", "第"+params.get("rowCount").toString()+"行采购费用已做核销,不允许再做付款申请单！");
		}	
		}else{
			
			String sql4 = "select fyje from cgfyb with (nolock) where fydh="+fydh+" and fyxh = "+fyxh;
			params.put("sql", sql4);
			String s_fyje_fy2x = checkSFMapper.getStringFromSql(params);
			double s_fyje_fy2;
			if(s_fyje_fy2x == null){
				s_fyje_fy2 = 0;
			}else{
				s_fyje_fy2 = Double.valueOf(s_fyje_fy2x);
			}
			
			String sql5 = "select sum(sqje) from fksqspfyb where fydh= "+fydh+" and fyxh = "+fyxh+" and sqbh<>"+sqbh;
			params.put("sql", sql5);
			String s_fyje_yk2x = checkSFMapper.getStringFromSql(params);
			double s_fyje_yk2;
			if(s_fyje_yk2x == null){
				s_fyje_yk2 = 0;
			}else{
				s_fyje_yk2 = Double.valueOf(s_fyje_yk2x);
			}
			if(s_fyje_yk2 + s_fyje > s_fyje_fy2){
				json.put("bool", false);
				json.put("msg", "第"+params.get("rowCount").toString()+"行采购费用的申请金额已大于费用金额！");
			}
		}
		
		return json.toString();
	}
	public String getCheckHTMoney(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("bool", true);
		String wbbh = params.get("wbbh").toString().trim();
		//新增时
		String htbh = params.get("htbh").toString();
		
		double s_htze;
		if(params.get("sqje").toString() == null){
			s_htze = 0;
		}else{
			s_htze = Double.valueOf(params.get("sqje").toString());
		}
		
		double s_wbze;
		if(params.get("wbje").toString() == null){
			s_wbze = 0;
		}else{
			s_wbze = Double.valueOf(params.get("wbje").toString());
		}
		
		if("1".equals(params.get("isAdd").toString())){
			
			//合同表中 合同金额
			String sql1 = "select htze from cghtb with (nolock) where htbh = '"+htbh+"'";
			params.put("sql", sql1);
			String s_htze_ht_St = checkSFMapper.getStringFromSql(params);
			double s_htze_ht;
			if(s_htze_ht_St == null){
				s_htze_ht = 0;
			}else{
				s_htze_ht = Double.valueOf(s_htze_ht_St);
			}
			
			//合同表中 外币总额
			String sql2 = "select wbze from cghtb with (nolock) where htbh = '"+htbh+"'";
			params.put("sql", sql2);
			String s_wbze_ht_St = checkSFMapper.getStringFromSql(params);
			double s_wbze_ht;
			if(s_wbze_ht_St == null){
				s_wbze_ht = 0;
			}else{
				s_wbze_ht = Double.valueOf(s_wbze_ht_St);
			}
			
			//已申请金额
			String sql3 = "select sum(sqje) from fksqsphtb where htbh = '"+htbh+"'";
			params.put("sql", sql3);
			String s_htze_yk_St = checkSFMapper.getStringFromSql(params);
			double s_htze_yk;
			if(s_htze_yk_St == null){
				s_htze_yk = 0;
			}else{
				s_htze_yk = Double.valueOf(s_htze_yk_St);
			}
			
			//已申请外币金额
			String sql4 = "select sum(wbje) from fksqsphtb where htbh = '"+htbh+"'";
			params.put("sql", sql4);
			String s_wbze_yk_St = checkSFMapper.getStringFromSql(params);
			double s_wbze_yk;
			if(s_wbze_yk_St == null){
				s_wbze_yk = 0;
			}else{
				s_wbze_yk = Double.valueOf(s_wbze_yk_St);
			}
			
			if("60".equals(wbbh) || "".equals(wbbh) || wbbh==null){
				if(s_htze_yk+s_htze > s_htze_ht){
					json.put("bool", false);
					json.put("msg", "第"+params.get("rowCount").toString()+"行合同的申请金额已大于合同金额！");
				}
			}else{
				if(s_wbze_yk+s_wbze > s_wbze_ht){
					json.put("bool", false);
					json.put("msg", "第"+params.get("rowCount").toString()+"行合同的外币金额已大于外币金额！");
				}
			}
			
			String sql5 = "select count(*) from rkdb_yl where rkdb_yl.htbh ='"+htbh+"' and rkdb_yl.hxbj=1";
			params.put("sql", sql5);
			String s_count = checkSFMapper.getStringFromSql(params);
			int count;
			if(s_count == null){
				count = 0;
			}else{
				count = Integer.valueOf(s_count);
			}
			
			if(count>0){
				json.put("bool", false);
				json.put("msg", "第"+params.get("rowCount").toString()+"行合同的已有对应的入库单核销,不允许再做付款申请单！");
			}

		}else{
			String sqbh = params.get("sqbh").toString();
//			double sqbh = Double.valueOf(s_sqbh);
			
			String sql6 = "select htze from cghtb with (nolock) where htbh='"+htbh+"'";
			params.put("sql", sql6);
			String s_htze_xg = checkSFMapper.getStringFromSql(params);
			double s_htze_ht;
			if(s_htze_xg == null){
				s_htze_ht = 0;
			}else{
				s_htze_ht = Double.valueOf(s_htze_xg);
			}
			
			
			String sql7 = "select wbze from cghtb with (nolock) where htbh='"+htbh+"'";
			params.put("sql", sql7);
			String s_wbze_xg = checkSFMapper.getStringFromSql(params);
			double s_wbze_ht;
			if(s_wbze_xg == null){
				s_wbze_ht = 0;
			}else{
				s_wbze_ht = Double.valueOf(s_wbze_xg);
			}
					
			String sql8 = "select sum(sqje) from fksqsphtb where htbh='"+htbh+"' and sqbh <> "+sqbh;
			params.put("sql", sql8);
			String s_htze_xg2 = checkSFMapper.getStringFromSql(params);
			double s_htze_yk;
			if(s_htze_xg2 == null){
				s_htze_yk = 0;
			}else{
				s_htze_yk = Double.valueOf(s_htze_xg2);
			}
			
			String sql9 = "select sum(wbje) from fksqsphtb where htbh='"+htbh+"' and sqbh <> "+sqbh;
			params.put("sql", sql9);
			String s_wbze_xg2 = checkSFMapper.getStringFromSql(params);
			double s_wbze_yk;
			if(s_wbze_xg2 == null){
				s_wbze_yk = 0;
			}else{
				s_wbze_yk = Double.valueOf(s_wbze_xg2);
			}
			
			if("60".equals(wbbh) || "".equals(wbbh)){
				if(s_htze_yk+s_htze > s_htze_ht){
					json.put("bool", false);
					json.put("msg", "第"+params.get("rowCount").toString()+"行合同的申请金额已大于合同金额！");
				}
			}else{
				if(s_wbze_yk+s_wbze > s_wbze_ht){
					json.put("bool", false);
					json.put("msg", "第"+params.get("rowCount").toString()+"行合同的外币金额已大于外币金额！");
				}
			}
		}						
		return json.toString();
	}
	
	
	public String getDeletePayApply(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("bool",true);
		try {
			if(params.get("sqbh").toString() != null && params.get("sjly") != null){
				int num = checkSFMapper.getDeletePayApply(params);
				if(num > 0){
					json.put("msg","删除成功");
				}else{
					json.put("msg","删除失败");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			json.put("bool",false);
			json.put("msg",e.getMessage());
			return json.toString();
		}						
		return json.toString();
	}
}
