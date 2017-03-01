package erp.erp.master.foreignCurrency.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.foreignCurrency.data.ForeignCurrencyMapper;

import erp.erp.master.foreignCurrency.model.ForeignCurrency;



@Service
public class ForeignCurrencyService {
	@Autowired
	private ForeignCurrencyMapper mapper;


	public List<ForeignCurrency> getForeignCurrencyList(Map<String,Object> params) {
		return mapper.getForeignCurrencyList(params);
	}
	public void addForeignCurrency(ForeignCurrency[] arr) {
		for(ForeignCurrency obj: arr) {
			mapper.addForeignCurrency(obj);
		}
	}
	public void updateForeignCurrency(ForeignCurrency[] arr) {
		for(ForeignCurrency obj: arr) {
			mapper.updateForeignCurrency(obj);
		}
	}
	public void deleteForeignCurrency(ForeignCurrency[] arr) {
		for(ForeignCurrency obj: arr) {
			mapper.deleteForeignCurrency(obj);
		}
	}
}
