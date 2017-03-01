package srm.basicdata.taxmanClass.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.basicdata.taxmanClass.data.TaxmanClassMapper;
import srm.basicdata.taxmanClass.model.TaxmanClass;


@Service
public class TaxmanClassService {
	@Autowired
	private TaxmanClassMapper mapper;


	public List<TaxmanClass> getTaxmanClassList(Map<String,Object> params) {
		return mapper.getTaxmanClassList(params);
	}
	public void addTaxmanClass(TaxmanClass[] arr) {
		for(TaxmanClass obj: arr) {
			mapper.addTaxmanClass(obj);
		}
	}
	public void updateTaxmanClass(TaxmanClass[] arr) {
		for(TaxmanClass obj: arr) {
			mapper.updateTaxmanClass(obj);
		}
	}
	public void deleteTaxmanClass(TaxmanClass[] arr) {
		for(TaxmanClass obj: arr) {
			mapper.deleteTaxmanClass(obj);
		}
	}
}
