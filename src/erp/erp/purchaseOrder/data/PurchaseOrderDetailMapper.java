package erp.erp.purchaseOrder.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.company.model.CompanyShow;
import erp.erp.purchaseOrder.model.BomSearch;
import erp.erp.purchaseOrder.model.CollectAdjust;
import erp.erp.purchaseOrder.model.Component;
import erp.erp.purchaseOrder.model.DetailSummarize;
import erp.erp.purchaseOrder.model.IssueBack;
import erp.erp.purchaseOrder.model.OrderCheckDetails;
import erp.erp.purchaseOrder.model.OrderDescribe;
import erp.erp.purchaseOrder.model.OrderQualitycheck;
import erp.erp.purchaseOrder.model.OrderSubsidiary;
import erp.erp.purchaseOrder.model.PfPurchaseOrderDetails;
import erp.erp.purchaseOrder.model.PriceSearch;
import erp.erp.purchaseOrder.model.ProPlanImp;
import erp.erp.purchaseOrder.model.PurBom;
import erp.erp.purchaseOrder.model.PurPanelSubsidiary;
import erp.erp.purchaseOrder.model.PurchaseChange;
import erp.erp.purchaseOrder.model.PurchaseOrderDetail;
import erp.erp.purchaseOrder.model.SalesOrder;
import erp.erp.purchaseOrder.model.SalesOrderImp;
import erp.erp.purchaseOrder.model.SplitDetailForPur;


public interface PurchaseOrderDetailMapper {
	public List<PurchaseOrderDetail> getPurchaseOrderDetailList(Map<String,Object> params);
	public List<PurchaseOrderDetail> getPurchaseOrderDetailListForCheck(Map<String,Object> params);
	//编辑界面获取
	public List<PurchaseOrderDetail> getPurchaseOrderDetailListForEdt(Map<String,Object> params);
	public void addPurchaseOrderDetail(PurchaseOrderDetail obj);
	public void updatePurchaseOrderDetail(PurchaseOrderDetail obj);
	public void updatePurchaseOrderDetailForHqjq(IssueBack obj);
	public void deletePurchaseOrderDetail(PurchaseOrderDetail obj);
	
	//明细汇总
	public List<DetailSummarize> getDetailSummarizeList(Map<String,Object> params);
	//产品描述
	public List<OrderDescribe> getOrderDescribeList(Map<String,Object> params);
	//采购辅助
	public List<OrderSubsidiary> getOrderSubsidiaryList(Map<String,Object> params);
	List<OrderSubsidiary> getOrderSubsidiaryForEdtList(Map<String,Object> params);
	//新增正式表合同辅助
	void addPurPanelSubsidiaryForSplit(OrderSubsidiary obj);
	void updateOrderSubsidiaryForSplit(OrderSubsidiary obj);
	public void updateOrderSubsidiary(OrderSubsidiary obj);
	public void deleteOrderSubsidiary(OrderSubsidiary obj);
	//采购更改
	public List<PurchaseChange> getPurchaseChangeList(Map<String,Object> params);
	
	//钢架计价bom
	public List<PurBom> getPurBomList(Map<String,Object> params);
	public List<PurBom> getPurBomForEdtList(Map<String,Object> params);
	public void addPurBom(PurBom obj);
	public void updatePurBom(PurBom obj);
	public void deletePurBom(PurBom obj);
	//构件清单
	public List<Component> getComponentList(Map<String,Object> params);
	
	//明细合计项
	List<PurchaseOrderDetail> getPurchaseOrderDetailSum(Map<String,Object> params);
	//拆分明细调用
	public List<SplitDetailForPur> getSplitDetailForPurList(Map<String,Object> params);
	
	//获取
	public List<PurchaseOrderDetail> getPurchaseOrderDetailLast(Map<String,Object> params);
	
	//采购计划辅助表
	public List<PurPanelSubsidiary> getPurPanelSubsidiaryList(Map<String,Object> params);
	
	public void addPurPanelSubsidiary(OrderSubsidiary obj);
	
	//
	public Map<String,Object> addPurchaseOrderDetailToCacheTable(Map<String,Object> params);
	
	Map<String,Object> cacheTableToPurchaseOrderDetailFormal(Map<String,Object> params);
	
	//销售订单
	List<SalesOrder> getSalesOrderList(Map<String,Object> params);
	//汇总调整
	public List<CollectAdjust> getCollectAdjustList(Map<String,Object> params);
	
	//单价查询
	public List<PriceSearch> getPriceSearchList(Map<String,Object> params);
	//订单导入
	public List<SalesOrderImp> getSalesOrderImpList(Map<String,Object> params);
	//计划导入
	public List<ProPlanImp> getProPlanImpList(Map<String,Object> params);
	
	//获取多级bom
	List<BomSearch> getBomExpand(Map<String,Object> params);
	
	//获取需要回传的订单
	List<PfPurchaseOrderDetails> getPurchaseOrderDetailListForSync(Map<String,Object> params);
	
	public List<OrderQualitycheck> getOrderQualitycheckList(Map<String,Object> params);
	
	public List<OrderCheckDetails> getOrderCheckDetailsList(Map<String,Object> params);
	
	//根据材料货号获取材料类别编号
	String getMaterialGridLbbh(Map<String,Object> params);
	int getMaterialGridCount(Map<String,Object> params);
	public List<CompanyShow> getMaterialGridCsbh(Map<String,Object> params);
	int getMaterialGridCountb(Map<String,Object> params);
	String getMaterialGridCsbhb(Map<String,Object> params);
}
