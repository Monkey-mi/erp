package erp.erp.purchaseUrge.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import srm.supplierAccess.model.SupplierFileOut;

import com.outsideasy.ws.common.vo.CXFRequestException;
import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.contract.SynergyUrgeSyncInter;


import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.purchaseUrge.data.PurchaseUrgeMapper;
import erp.erp.purchaseUrge.model.OrderDeliveryNotice;
import erp.erp.purchaseUrge.model.OrderDeliveryNoticedetails;
import erp.erp.purchaseUrge.model.SynergyUrge;
import erp.util.Const;
import erp.util.MyJsonUtil;
import erp.util.MyStringUtils;
import erp.util.OtherParam;

@Service
public class PurchaseUrgeServiceWs {
	@Autowired
	private SynergyUrgeSyncInter synergyUrgeSyncInter;
	@Autowired
	private PurchaseUrgeMapper mapper;
	/**
	* @Description: 追催接收
	* @param  平台映射帐号 login_id,
	* 		     通知单 suList List<OrderDeliveryNotice>
	* Request purchaseurge/purchaseurgews.act?method=getAccNotice
	* 
	* @author wq 
	* @date 2016-08-25
	*/
	@Transactional
	public String getAccNotice(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		if(params.get("recs")==null){
			json.put("bool", false);
			json.put("msg", "recs  参数缺失！！！");
			return json.toString();
		}
		String recs=params.get("recs").toString();
		List<OrderDeliveryNotice> odnList=MyJsonUtil.str2list(recs, OrderDeliveryNotice.class);
		for(OrderDeliveryNotice odn :odnList){
			Map<String,Object> para=new HashMap<String, Object>();
			para.put("delivery_notice_id", odn.getDelivery_notice_id());
			String jsonmap=MyJsonUtil.obj2string(para);
			String result=synergyUrgeSyncInter.getPfOrderDeliveryNoticedetailsList(jsonmap);
			CXFResponse<OrderDeliveryNoticedetails> sf=MyJsonUtil.str2CXFResponse(result, OrderDeliveryNoticedetails.class);
			if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
				params.putAll(sf.getParams());
			}else {
				throw new CXFRequestException(sf.getErrorMessage());
			}
			List<OrderDeliveryNoticedetails> odndList=sf.getList();
			//反刷平台确认标记
			para.put("notice_status", 2);
			jsonmap=MyJsonUtil.obj2string(para);
			result =synergyUrgeSyncInter.updatePfOrderDeliveryNotice(jsonmap);
			Map<String,Object> resultMap=MyJsonUtil.str2map(result);
			if(resultMap.get("bool")!=null&&resultMap.get("bool").toString().equals("false")){
				json.put("bool", false);
				json.put("msg", "平台 数据修改异常！！！");
				return json.toString();
			}
			//刷新本地和合同明细表
			for(OrderDeliveryNoticedetails odnd:odndList){
				para.clear();
				para.put("htbh", odnd.getHtbh());
				para.put("htxh", odnd.getHtxh());
				para.put("hqjq", odnd.getConfirm_delivery_time());
				para.put("zxqrrm", params.get("czym").toString());
				mapper.updatePurchaseOrderTime(para);
				//返写po-平台中间表
				para.put("tzbj", 2);
				mapper.updatePoWithPlatform(para);
			}
		}
		return json.toString();
	}
	/**
	* @Description: 追催发送
	* @param  平台映射帐号 login_id,
	* 		     通知明细信息 suList List<SynergyUrge>
	* Request purchaseurge/purchaseurgews.act?method=getPfSynergyUrge
	* 
	* @author wq 
	* @date 2016-08-25
	*/
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购
	@Transactional
	public String getPfSynergyUrge(Map<String,Object> params) {
		Map<String,Object> para=new HashMap<String, Object>();
		JSONObject json=new JSONObject();
		json.put("bool", true);
		if(params.get("csbh")==null){
			para.put("bool", false);
			para.put("msg", "与平台供应商匹配失败");
			return MyJsonUtil.obj2string(para);
		}
		String csbh=params.get("csbh").toString();
		para.put("sql", " select top 1 record_id from t_supplier_file where  ltrim(rtrim(isnull(record_id,'')))<>'' and csbh ='"+csbh+"' ");
		String record_id=purchaseDetailMapper.getStringFromSql(para);
		if(record_id==null){
			para.put("bool", false);
			para.put("msg", "与平台供应商匹配失败");
			return MyJsonUtil.obj2string(para);
		}
		params.put("record_id",record_id);
		if(OtherParam.getCompanyId()==0){
			new OtherParam();
		}
		params.put("pur_company_id",OtherParam.getCompanyId());
		List<SynergyUrge> list =mapper.getSynergyUrgeList(params);
		//发出前检验
		for(SynergyUrge obj:list){
			//判断该合同是否已经同步平台
			if(obj.getPur_order_id()==0){
				json.put("msg", "合同编号为【"+obj.getHtbh()+"】的合同尚未同步到平台！！！");
				json.put("bool", false);
				return json.toString();
			}
			//判断物控交期是否为空
			if(obj.getJhrq()==null){
				json.put("msg", "合同号为【"+obj.getHtbh()+"-"+obj.getHtxh()+"】的记录物控交期为空！！！");
				json.put("bool", false);
				return json.toString();
			}
			//判断记录是否已上传 未确认
			if(obj.getTzbj()==1){
				json.put("msg", "合同号为【"+obj.getHtbh()+"-"+obj.getHtxh()+"】的记录已发送，但是未确认不能重复发送！！！");
				json.put("bool", false);
				return json.toString();
			}
		}
		params.put("recs", MyJsonUtil.obj2string(list));
		//获取需要发送的明细信息
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=synergyUrgeSyncInter.getAddPfSynergyUrge(jsonmap);
		//返写po-平台中间表
		params.put("tzbj", 1);
		mapper.updatePoWithPlatform(params);
		return result;
	}
	/**
	* @Description: 获取通知单
	* @param  平台映射帐号 login_id,
	* 		     状态 notice_status
	* Request purchaseurge/purchaseurgews.act?method=getOrderDeliveryNoticeList
	* 
	* @author wq 
	* @date 2016-08-25
	*/
	public List<OrderDeliveryNotice> getOrderDeliveryNoticeList(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=synergyUrgeSyncInter.getPfOrderDeliveryNoticeList(jsonmap);
		CXFResponse<OrderDeliveryNotice> sf=MyJsonUtil.str2CXFResponse(result, OrderDeliveryNotice.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	
	/**
	* @Description: 获取通知单明细
	* @param  通知单号 delivery_notice_id,
	* Request purchaseurge/purchaseurgews.act?method=getOrderDeliveryNoticedetailsList
	* 
	* @author wq 
	* @date 2016-08-25
	*/
	public List<OrderDeliveryNoticedetails> getOrderDeliveryNoticedetailsList(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=synergyUrgeSyncInter.getPfOrderDeliveryNoticedetailsList(jsonmap);
		CXFResponse<OrderDeliveryNoticedetails> sf=MyJsonUtil.str2CXFResponse(result, OrderDeliveryNoticedetails.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
}
