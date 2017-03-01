package erp.erp.materialQualityTesting.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialQualityTesting.data.WtjycssqbMapper;
import erp.erp.materialQualityTesting.model.Wtjycssqb;



@Service
public class WtjycssqbService {
	@Autowired
	private WtjycssqbMapper wtjycssqbMapper;


	public List<Wtjycssqb> getwtjycssqbList(Map<String,Object> params) {
		return wtjycssqbMapper.getwtjycssqbList(params);
	}
	public void addwtjycssqb(Wtjycssqb[] arr) {
		for(Wtjycssqb obj: arr) {
			wtjycssqbMapper.addwtjycssqb(obj);
		}
	}
	public void updatewtjycssqb(Wtjycssqb[] arr) {
		for(Wtjycssqb obj: arr) {
			wtjycssqbMapper.updatewtjycssqb(obj);
		}
	}
	public void deletewtjycssqb(Wtjycssqb[] arr) {
		for(Wtjycssqb obj: arr) {
			wtjycssqbMapper.deletewtjycssqb(obj);
		}
	}
	public int getMaxwtdh(Map<String,Object> params){
		return wtjycssqbMapper.getMaxwtdh(params);
	}
}
