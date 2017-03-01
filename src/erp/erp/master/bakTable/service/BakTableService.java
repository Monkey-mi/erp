package erp.erp.master.bakTable.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.bakTable.data.BakTableMapper;
import erp.erp.master.bakTable.model.BakTable;


@Service
public class BakTableService {
	@Autowired
	private BakTableMapper mapper;


	public List<BakTable> getBakTableList(Map<String,Object> params) {
		return mapper.getBakTableList(params);
	}
	public void addBakTable(BakTable[] arr) {
		for(BakTable obj: arr) {
			mapper.addBakTable(obj);
		}
	}
	public void updateBakTable(BakTable[] arr) {
		for(BakTable obj: arr) {
			mapper.updateBakTable(obj);
		}
	}
	public void deleteBakTable(BakTable[] arr) {
		for(BakTable obj: arr) {
			mapper.deleteBakTable(obj);
		}
	}
}
