package srm.supplierAccess.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.supplierAccess.data.SupplierAccessScoreMapper;
import srm.supplierAccess.model.SupplierAccessScore;


@Service
public class SupplierAccessScoreService {
	@Autowired
	private SupplierAccessScoreMapper mapper;


	public List<SupplierAccessScore> getSupplierAccessScoreList(Map<String,Object> params) {
		return mapper.getSupplierAccessScoreList(params);
	}
	public void addSupplierAccessScore(SupplierAccessScore[] arr) {
		for(SupplierAccessScore obj: arr) {
			mapper.addSupplierAccessScore(obj);
		}
	}
	public void updateSupplierAccessScore(SupplierAccessScore[] arr) {
		for(SupplierAccessScore obj: arr) {
			mapper.updateSupplierAccessScore(obj);
		}
	}
	public void deleteSupplierAccessScore(SupplierAccessScore[] arr) {
		for(SupplierAccessScore obj: arr) {
			mapper.deleteSupplierAccessScore(obj);
		}
	}
}
