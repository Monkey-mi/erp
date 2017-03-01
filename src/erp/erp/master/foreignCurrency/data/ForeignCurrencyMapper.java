package erp.erp.master.foreignCurrency.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.foreignCurrency.model.ForeignCurrency;

public interface ForeignCurrencyMapper {
	public List<ForeignCurrency> getForeignCurrencyList(Map<String,Object> params);
	public void addForeignCurrency(ForeignCurrency obj);
	public void updateForeignCurrency(ForeignCurrency obj);
	public void deleteForeignCurrency(ForeignCurrency obj);
}
