package erp.erp.purchaseOrder.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.purchaseDetail.model.AogBps;
import erp.erp.master.purchaseDetail.model.BomChangeSearch;
import erp.erp.purchaseOrder.model.ERPSRMPODetial;
import erp.erp.purchaseOrder.model.ERPSRMpurchaseOrder;
import erp.erp.purchaseOrder.model.IssueBack;
import erp.erp.purchaseOrder.model.POOUTcd;
import erp.erp.purchaseOrder.model.ProcurementOrder;
import erp.erp.purchaseOrder.model.ProductDescImp;
import erp.erp.purchaseOrder.model.PurPanelImp;
import erp.erp.purchaseOrder.model.PurchaseOrderDetail;


public interface PurchaseOrderMapper {
	public List<ProcurementOrder> getPurchaseOrderList(Map<String,Object> params);
	List<ProcurementOrder> getPurchaseOrderSum(Map<String,Object> params);//汇总信息
	public void addPurchaseOrder(ProcurementOrder obj);
	public void updatePurchaseOrder(ProcurementOrder obj);
	public void deletePurchaseOrder(ProcurementOrder obj);
	
	List<String> getPurAuthorityList(Map<String,Object> params);
	//采计导入
	public List<PurPanelImp> getPurPanelImpList(Map<String,Object> params);
	//产品描述导入
	public List<ProductDescImp> getProductDescImpList(Map<String,Object> params);
	public List<ProductDescImp> getProductDescImpMsxx(Map<String,Object> params);
	public List<ProductDescImp> getProductDescImpMsxx2(Map<String,Object> params);
	//任务上线时间表
	void LoadTaskTime(Map<String,Object> params);
	//回签展示
	public List<IssueBack> getIssueBackList(Map<String,Object> params);
	//回签时间修改
	void updatePurchaseOrderForHqsj(ProcurementOrder obj);
	//合同到货/入库明细 
	public List<AogBps> getArrivalOneList(Map<String,Object> params);
	//BOM更改查询 
	List<BomChangeSearch> getBomChangeSearchOneList(Map<String,Object> params);
	//ERP_SRM_CGHT表数据
	List<ERPSRMpurchaseOrder> getERPSRMpurchaseOrderList(Map<String,Object> params);
	//ERP_SRM_htmxb明细数据
	List<ERPSRMPODetial> getERPSRMPODetialList(Map<String,Object> params);
    //订单总金额
	double getSumDetrialcost(Map<String,Object> params);
	String getCampany_id(Map<String,Object> params);
	int getRecord_id(Map<String,Object> params);
	String getPurchaseName(Map<String,Object> params);
	List<PurchaseOrderDetail> getContractDetial(Map<String,Object> params);
	void addPO_OUT_cd(POOUTcd obj);
	int getPur_Order_id(Map<String,Object> params);
	void updateHqbj(Map<String,Object> params);
	//与平台供应商匹配 
	String getRecordId(Map<String,Object> params);
	int getPooutcount(POOUTcd obj);
	int getTzHtxh(Map<String,Object> params);
	int getDhrkCount(Map<String,Object> params);
	int getOrderDyCount(Map<String,Object> params);
	void updateQxbj(Map<String,Object> params);
	List<Integer> getPurchaseOrderWcbj(Map<String,Object> params);
}
