package erp.erp.master.caterialPricePurchase.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.caterialPricePurchase.model.CaterialHistoryPriceCtl;
import erp.erp.master.caterialPricePurchase.model.CaterialPricePurchase;
import erp.erp.master.caterialPricePurchase.model.HistoryPriceCtl;
import erp.erp.master.caterialPricePurchase.model.HistroyQuote;
import erp.erp.master.caterialPricePurchase.model.MaterialClass;
import erp.erp.master.caterialPricePurchase.model.PurchasePrice;
import erp.erp.master.caterialPricePurchase.model.VendorHistoryPriceCtl;


public interface CaterialPricePurchaseMapper {
	public List<CaterialPricePurchase> getCaterialPricePurchaseList(Map<String,Object> params);
	public void addCaterialPricePurchase(CaterialPricePurchase obj);
	public void updateCaterialPricePurchase(CaterialPricePurchase obj);
	public void refreshCtlPrice(Map<String,Object> params);
	public void refreshNewPrice(Map<String,Object> params);
	public void deleteCaterialPricePurchase(CaterialPricePurchase obj);
    
	public List<MaterialClass> getMaterialClassList(Map<String,Object> params);
	void doAppro(Map<String,Object> params);
	void doVpAppro(Map<String,Object> params);
	public List<CaterialHistoryPriceCtl> getCaterialHistoryPriceCtlList(Map<String,Object> params);
	public List<VendorHistoryPriceCtl> getVendorHistoryPriceCtlList(Map<String,Object> params);
	public List<PurchasePrice> getHistoryPurchasePriceList(Map<String,Object> params);
	public List<HistroyQuote> getHistroyQuoteList(Map<String,Object> params);
	public List<HistoryPriceCtl> getHistoryPriceCtlList(Map<String,Object> params);
	
	String getCsmc(Map<String,Object> params);
	String getClmc(Map<String,Object> params);
	String getClhh(Map<String,Object> params);
	int getScount(Map<String,Object> params);
	List<String> getClqx(Map<String,Object> params);
	float getKzdj(Map<String,Object> params);
	float getKzdjold(Map<String,Object> params);
	void updateKzdj(Map<String,Object> params);
	void insertClkzdjjlb(Map<String,Object> params);
	void addCsjjxxb(Map<String,Object> params);
	void doCompanyAppro(Map<String,Object> params);
}
