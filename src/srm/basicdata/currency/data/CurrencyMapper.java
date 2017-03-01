package srm.basicdata.currency.data;

import java.util.List;
import java.util.Map;

import srm.basicdata.currency.model.Currency;


public interface CurrencyMapper {
	public List<Currency> getCurrencyList(Map<String,Object> params);
	public void addCurrency(Currency obj);
	public void updateCurrency(Currency obj);
	public void deleteCurrency(Currency obj);
}
