package erp.erp.materialQualityTesting.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialQualityTesting.data.WtjycssqmxbMapper;
import erp.erp.materialQualityTesting.model.Wtjycssqmxb;


@Service
public class WtjycssqmxbService {
	@Autowired
	private WtjycssqmxbMapper wtjycssqmxbMapper;


	public List<Wtjycssqmxb> getwtjycssqmxbList(Map<String,Object> params) {
		return wtjycssqmxbMapper.getwtjycssqmxbList(params);
	}
	public void addwtjycssqmxb(Wtjycssqmxb[] arr) {
		for(Wtjycssqmxb obj: arr) {
			wtjycssqmxbMapper.addwtjycssqmxb(obj);
		}
	}
	public void updatewtjycssqmxb(Wtjycssqmxb[] arr) {
		for(Wtjycssqmxb obj: arr) {
			wtjycssqmxbMapper.updatewtjycssqmxb(obj);
		}
	}
	public void deletewtjycssqmxb(Wtjycssqmxb[] arr) {
		for(Wtjycssqmxb obj: arr) {
			wtjycssqmxbMapper.deletewtjycssqmxb(obj);
		}
	}
}
