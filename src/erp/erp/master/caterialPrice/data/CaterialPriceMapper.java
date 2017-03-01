package erp.erp.master.caterialPrice.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.caterialPrice.model.CaterialPrice;


public interface CaterialPriceMapper {
	public List<CaterialPrice> getCaterialPriceList(Map<String,Object> params);
	public void addCaterialPrice(CaterialPrice obj);
	public void updateCaterialPrice(CaterialPrice obj);
	public void deleteCaterialPrice(CaterialPrice obj);
	//判断价格公式是否被调用
	int getCaterialPriceIsQuote(CaterialPrice obj);
}
