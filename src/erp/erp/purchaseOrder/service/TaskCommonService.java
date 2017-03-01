package erp.erp.purchaseOrder.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.contract.SynergyUrgeSyncInter;

import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.purchaseOrder.data.PurchaseOrderDetailMapper;
import erp.erp.purchaseOrder.data.PurchaseOrderMapper;
import erp.erp.purchaseOrder.model.OrderCheckDetails;
import erp.erp.purchaseOrder.model.OrderQualitycheck;
import erp.erp.purchaseOrder.model.PfPurchaseOrderDetails;
import erp.util.MyJsonUtil;
import erp.util.MyStringUtils;
import erp.util.OtherParam;

@Service
public class TaskCommonService {
	@Autowired
	private PurchaseOrderDetailMapper mapper;
	@Autowired
	private PurchaseOrderMapper purchaseOrderMapper;
	@Autowired
	private SynergyUrgeSyncInter synergyUrgeSyncInter;
	protected static Logger logger = Logger.getLogger("service");
	/**
	 * 平台 订单相关 信息回传
	 * 
	 * @author wq
	 * @date 2016-08-27
	 */
	public void SyncPurchaseOrderDetail(){
		logger.debug(new Date().toString()+"平台 数量信息开始回传！！！");
		Map<String,Object> params=new HashMap<String, Object>();
		int start=0;
		List<PfPurchaseOrderDetails> ppdList=mapper.getPurchaseOrderDetailListForSync(params);
		//每次提交100条
		CXFResponse<PfPurchaseOrderDetails> lam=new CXFResponse<PfPurchaseOrderDetails>();
		//新增 订单完成标记修改
		//1、获取完成的订单
		params.put("state", 1);
		List<Integer> re=purchaseOrderMapper.getPurchaseOrderWcbj(params);
		if(re.size()>0){
			String wcht= StringUtils.join(re, ",");
			params.put("wcht", wcht);
		}
		List<Integer> re1=purchaseOrderMapper.getPurchaseOrderWcbj(params);
		if(re1.size()>0){
			String wwcht= StringUtils.join(re1, ",");
			params.put("wwcht", wwcht);
		}
		params.remove("state");
		if(ppdList.size()>100){
			List<PfPurchaseOrderDetails> ppdList2=new ArrayList<PfPurchaseOrderDetails>();
			for(PfPurchaseOrderDetails ppd :ppdList){
				ppdList2.add(ppd);
				start++;
				if(start%100==0){
					if(start>0){
						params.remove("wcht");
						params.remove("wwcht");
					}
					lam.setSuccessResponseInfo(ppdList2, params);
					synergyUrgeSyncInter.getUpdatePfOrderDetailSync(MyJsonUtil.obj2string(lam));
					ppdList2.clear();
				}
			}
			if(ppdList2.size()>0){
				if(start>0){
					params.remove("wcht");
					params.remove("wwcht");
				}
				lam.setSuccessResponseInfo(ppdList2, params);
				synergyUrgeSyncInter.getUpdatePfOrderDetailSync(MyJsonUtil.obj2string(lam));
				ppdList2.clear();
			}
		}else{
			lam.setSuccessResponseInfo(ppdList, params);
			synergyUrgeSyncInter.getUpdatePfOrderDetailSync(MyJsonUtil.obj2string(lam));
		}
		logger.debug(new Date().toString()+"平台 数量信息回传完毕！！！");
	}
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购
	/**
	 * 质检 信息回传 
	 * 
	 * @author wq
	 * @date 2016-08-27
	 */
	public void SyncOrderQualitycheck(){
		logger.debug(new Date().toString()+"质检 信息开始回传！！！");
		Map<String,Object> params=new HashMap<String, Object>();
		List<OrderQualitycheck> list=mapper.getOrderQualitycheckList(params);
		for(OrderQualitycheck oqc :list){
			Map<String,Object> para=new HashMap<String, Object>();
			String csbh=oqc.getCsbh();
			para.put("sql", " select top 1 record_id from t_supplier_file where  ltrim(rtrim(isnull(record_id,'')))<>'' and csbh ='"+csbh+"' ");
			String record_id=purchaseDetailMapper.getStringFromSql(para);
			if(record_id==null){
				logger.debug("与平台供应商匹配失败");
			}
			params.put("record_id",record_id);
			if(OtherParam.getCompanyId()==0){
				new OtherParam();
			}
			params.put("pur_company_id",OtherParam.getCompanyId());
			CXFResponse<OrderCheckDetails> lam=new CXFResponse<OrderCheckDetails>();
			//将质检主表存入
			params.put("OrderQualitycheck", MyJsonUtil.obj2string(oqc));
			//将明细表存入list
			List<OrderCheckDetails> list2=mapper.getOrderCheckDetailsList(params);
			lam.setSuccessResponseInfo(list2, params);
			synergyUrgeSyncInter.getAddPfOrderQualitycheck(MyJsonUtil.obj2string(lam));
		}
		logger.debug(new Date().toString()+"质检 信息回传完毕！！！");
	}
}
