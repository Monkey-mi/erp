package srm.supplierAccess.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.supplierAccess.data.SupplierAccessScoreDetailsMapper;
import srm.supplierAccess.model.SupplierAccessScoreDetails;


@Service
public class SupplierAccessScoreDetailsService {
	@Autowired
	private SupplierAccessScoreDetailsMapper mapper;


	public List<SupplierAccessScoreDetails> getSupplierAccessScoreDetailsList(Map<String,Object> params) {
		return mapper.getSupplierAccessScoreDetailsList(params);
	}
	
}
