package erp.erp.master.purchaseDetail.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.perchasepriceadjust.model.Accountdept;
import erp.erp.master.purchaseDetail.model.AccountDeptOne;
import erp.erp.master.purchaseDetail.model.AogBps;
import erp.erp.master.purchaseDetail.model.BomChangeSearch;
import erp.erp.master.purchaseDetail.model.ContractSubsidiary;
import erp.erp.master.purchaseDetail.model.FunctionPurchaseCtl;
import erp.erp.master.purchaseDetail.model.MainUnit;
import erp.erp.master.purchaseDetail.model.ManufacturerPrice;
import erp.erp.master.purchaseDetail.model.MaterialCate;
import erp.erp.master.purchaseDetail.model.MaterialCoding;
import erp.erp.master.purchaseDetail.model.MaterialDetail;
import erp.erp.master.purchaseDetail.model.PanelDetailAndOrder;
import erp.erp.master.purchaseDetail.model.PlanCategory;
import erp.erp.master.purchaseDetail.model.PlanDetail;
import erp.erp.master.purchaseDetail.model.Production;
import erp.erp.master.purchaseDetail.model.ProductionType;
import erp.erp.master.purchaseDetail.model.PurGroupMan;
import erp.erp.master.purchaseDetail.model.PurSupplierSearch;
import erp.erp.master.purchaseDetail.model.PurchaseDetail;
import erp.erp.master.purchaseDetail.model.StoreQuote;


public interface PurchaseDetailMapper {
	public List<PurchaseDetail> getPurchaseDetailList(Map<String,Object> params);
	public void addPurchaseDetail(PurchaseDetail obj);
	public void updatePurchaseDetail(PurchaseDetail obj);
	public void deletePurchaseDetail(PurchaseDetail obj);
	
	//采购类别
	List<PlanCategory> getPlanCategoryList(Map<String,Object> params);
	//采购员编号
	List<String> getBuyerNumList(Map<String,Object> params);
	//计划类别权限
	List<String> getPanelAuthorityList(Map<String,Object> params);
	//采购权限
	List<String> getBuyerAuthorityList(Map<String,Object> params);
	//材料类别
	public List<MaterialCate> getMaterialCateList(Map<String,Object> params);
	
	//材料编码
	public List<MaterialDetail> getMaterialDetailList(Map<String,Object> params);
	//采购组员
	public List<PurGroupMan> getPurGroupManList(Map<String,Object> params);
	//主体单位
	public List<MainUnit> getMainUnitList(Map<String,Object> params);
	
	//获取计划明细中的订单号
	public List<PlanDetail> getPlanDetailForDdhList(Map<String,Object> params);
	
	//获取厂商进价数据
	public List<ManufacturerPrice> getManufacturerPriceList(Map<String,Object> params);
	
	//
	public List<FunctionPurchaseCtl> getFunctionPurchaseCtl(Map<String,Object> params);
	
	double getConversion(Map<String,Object> params);
	
	public List<MaterialCoding> getMaterialCodingList(Map<String,Object> params);
	
	public List<PanelDetailAndOrder> getPanelDetailAndOrderList(Map<String,Object> params);
	
	public String getPlanDetailForKhbh(Map<String,Object> params);
	
	double[] getExchangeRate(Map<String,Object> params);
	
	public String getStringFromSql(Map<String,Object> params);
	
	public List<AccountDeptOne> getAllAccountdeptList(Map<String,Object> params);
	
	public List<StoreQuote> getStoreQuoteList(Map<String,Object> params);
	
	public List<ContractSubsidiary> getContractSubsidiaryForLoadList(Map<String,Object> params);
	
	public List<String> getStringArrFromSql(Map<String,Object> params);
	
	//批量编辑
	void getBatchChange(Map<String,Object> params);
	
	//厂商批量编辑
	void getCsbhBatchChange(PurchaseDetail obj);
	
	//产品信息
	public List<Production> getProductionList(Map<String,Object> params);
	
	//产品类别
	public List<ProductionType> getProductionTypeList(Map<String,Object> params);
	//到货 入库
	public List<AogBps> getAogBpsList(Map<String,Object> params);
	
	//BOM更改查询
	public List<BomChangeSearch> getBomChangeSearchList(Map<String,Object> params);
	
	//批量分配
	void getBatchChangeSpbj(Map<String,Object> params);
	//批量中止
	void getBatchChangeZzbj(Map<String,Object> params);
	//完成标记
	void getChangeWcbj(Map<String,Object> params);
	//有误标记
	void getBatchChangeYwbj(Map<String,Object> params);
	//签发标记
	void getPurChangeQfbj(Map<String,Object> params);
	//供应厂商完成
	public List<PurSupplierSearch> getPurSupplierSearchList(Map<String,Object> params);
	
	List<PanelDetailAndOrder> getPanelDetailAndOrderFromZjbhList(Map<String,Object> params);
	//获取合计信息
	List<PurchaseDetail> getPurchaseDetailCount(Map<String,Object> params);
	
	//获取map数据
	Map<String,Object> getMapFromSql(Map<String,Object> params);
}
