package erp.erp.materialQualityTesting.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialQualityTesting.data.ClbmbMapper;
import erp.erp.materialQualityTesting.model.Clbmb;


@Service
public class ClbmbService {
	@Autowired
	private ClbmbMapper mapper;


	public List<Clbmb> getClbmbList(Map<String,Object> params) {
		return mapper.getClbmbList(params);
	}
	public void addClbmb(Clbmb[] arr) {
		for(Clbmb obj: arr) {
			mapper.addClbmb(obj);
		}
	}
	public void updateClbmb(Clbmb[] arr) {
		for(Clbmb obj: arr) {
			mapper.updateClbmb(obj);
		}
	}
	public void deleteClbmb(Clbmb[] arr) {
		for(Clbmb obj: arr) {
			mapper.deleteClbmb(obj);
		}
	}
}
